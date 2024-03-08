import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const req = await context.switchToHttp().getRequest();
    const token = this.extractTokenFormHeader(req);
    if (!token) throw new UnauthorizedException();
    try {
      req["user"] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFormHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === "Refresh" ? token : undefined;
  }
}