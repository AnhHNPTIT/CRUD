import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
  CommentFilterDto,
} from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async indexComments({
    postId,
    userId,
    limit = 10,
    offset = 0,
    startingId = 1,
  }: CommentFilterDto) {
    const findParams = {
      where: {
        ...(postId && { post_id: +postId }),
        ...(userId && { user_id: +userId }),
      },
      take: limit,
      skip: offset,
      cursor: {
        id: startingId ?? 1,
      },
    };
    const [totalItem, items] = await this.prisma.$transaction([
      this.prisma.comment.count(findParams),
      this.prisma.comment.findMany({
        ...findParams,
        include: {
          post: {
            select: {
              title: true,
              content: true,
            },
          },
          user: {
            select: {
              email: true,
              username: true,
            },
          },
        },
      }),
    ]);

    return {
      items,
      totalItem,
    };
  }

  async createComment(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
      } as any,
    });
  }

  async readComment(id: number) {
    const findComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!findComment) {
      throw new NotFoundException('Comment not found');
    }
    return findComment;
  }

  async updateComment(
    id: number,
    commentUpdateInput: UpdateCommentDto,
    userId: number,
  ) {
    const findComment = await this.readComment(id);
    if (findComment.user_id !== userId) {
      throw new BadRequestException(
        "You don't have permission to update this comment",
      );
    }
    return this.prisma.comment.update({
      data: commentUpdateInput,
      where: {
        id,
      },
    });
  }

  async deleteComment(id: number, userId: number) {
    const findComment = await this.readComment(id);
    if (findComment.user_id !== userId) {
      throw new BadRequestException(
        "You don't have permission to delete this comment",
      );
    }
    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
