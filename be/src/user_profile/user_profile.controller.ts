import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UserProfileService } from "./user_profile.service";
import { JwtGuard } from "../auth/guards/jwt.guard";

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService:UserProfileService) {}


  @UseGuards(JwtGuard)
  @Get(":id")
  async getUserProfile(@Param("id") id:number){
    return this.userProfileService
  }
}
