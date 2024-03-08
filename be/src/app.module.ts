import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { PrismaService } from "./prisma.service";
import { AppController } from "./app.controller";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user/user.service";
import { UserProfileModule } from './user_profile/user_profile.module';
import { CommentModule } from "./comment/comment.module";
import { CommentService } from "./comment/comment.service";

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, UserProfileModule, CommentModule],
  controllers: [AppController],
  providers: [AuthService, UserService, PrismaService, JwtService, CommentService]
})
export class AppModule {
}
