import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guards/jwt.guard";

@Controller("user")
export class UserController {
  constructor(private userService:UserService) {}

  @UseGuards(JwtGuard)
  @Get(":id")
  async getUser(@Param("id") id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password_hash, ...result}= await this.userService.findByID(id);
    return result
  }
}
