import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/user.dto";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { RefreshJwtGuard } from "./guards/refresh.guard";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  @Post("register")
  async registerUser(@Body() dto: CreateUserDto) {
    console.log("dto =", dto)
    return await this.userService.create(dto);
  }

  @Post("login")
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refreshToken(@Req() req: any) {
    return await this.authService.refreshToken(req.user);
  }
}
