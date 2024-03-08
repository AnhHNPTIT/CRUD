import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateUserDto } from "./dto/user.dto";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async create(dto: CreateUserDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        OR: [
          {
            email: dto.email
          },
          {
            username: dto.username
          }
        ]
      }
    });
    if (user) throw new ConflictException("email duplicated");

    const newUser = await this.prisma.users.create({
      data: {
        ...dto,
        password_hash: await hash(dto.password_hash, 10)
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email: email
      }
    });
  }

  async findByUsername(username: string) {
    return this.prisma.users.findUnique({
      where: {
        username: username
      }
    });
  }

  async findByID(id: number) {
    return this.prisma.users.findUnique({
      where: {
        user_id: id
      }
    });
  }
}
