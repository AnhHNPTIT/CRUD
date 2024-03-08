import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Put,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  CommentFilterDto,
  CreateCommentDto,
  UpdateCommentDto,
} from './dto/comment.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { UserDataJwtProperties } from 'src/shared/constants';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Get()
  @ApiOperation({
    operationId: 'getAllComment',
    description: 'Get All Comment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
    isArray: true,
  })
  async getAllComment(@Query() filters: CommentFilterDto) {
    return this.commentService.indexComments(filters);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiOperation({
    operationId: 'getComment',
    description: 'Get Comment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async getComment(@Param('id') id: number) {
    return this.commentService.readComment(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({
    operationId: 'createComment',
    description: 'Create Comment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async createComment(
    @Body() createCommentInput: CreateCommentDto,
    @User(UserDataJwtProperties.USERID) userId: number,
  ) {
    return await this.commentService.createComment({
      ...createCommentInput,
      user_id: userId,
    });
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiOperation({
    operationId: 'updateComment',
    description: 'Update Comment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async updateComment(
    @Param('id') id: number,
    @Body() commentUpdateInput: UpdateCommentDto,
    @User(UserDataJwtProperties.USERID) userId: number,
  ) {
    return this.commentService.updateComment(id, commentUpdateInput, userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteComment',
    description: 'Delete Comment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async deleteComment(
    @Param('id') id: number,
    @User(UserDataJwtProperties.USERID) userId: number,
  ) {
    return this.commentService.deleteComment(id, userId);
  }
}
