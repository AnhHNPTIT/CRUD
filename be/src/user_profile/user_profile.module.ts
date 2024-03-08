import { Module } from '@nestjs/common';
import { UserProfileService } from './user_profile.service';
import { UserProfileController } from './user_profile.controller';
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [UserProfileService, PrismaService, JwtService],
  controllers: [UserProfileController]
})
export class UserProfileModule {

}
