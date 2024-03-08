import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";
import * as httpContext from 'express-http-context';

@Injectable()
export class JwtGuard implements CanActivate {
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
        secret: process.env.JWT_SECRET_KEY
      });
      httpContext.set('user', req["user"]);
    } catch(e) {
      console.log(e)
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFormHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === "Bearer" ? token : undefined;
  }
}