import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/auth.dto";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";
import { UserService } from "../user/user.service";

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      user_id: user.user_id,
      username: user.username,
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: "30d",
          secret: process.env.JWT_SECRET_KEY
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: "7d",
          secret: process.env.JWT_REFRESH_TOKEN_KEY
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      }
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByUsername(dto.username);

    if (user && (await compare(dto.password, user.password_hash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: "20s",
        secret: process.env.JWT_SECRET_KEY
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: "7d",
        secret: process.env.JWT_REFRESH_TOKEN_KEY
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
