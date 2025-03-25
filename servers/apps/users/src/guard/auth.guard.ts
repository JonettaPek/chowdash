import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Request } from 'express';
import { User } from '../entity/user.entity';

export interface AuthenticatedRequest extends Request {
  user?: User | null;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext<{ req: Request }>();

    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(' ')[1];
    const refreshToken = req.headers.refreshtoken;

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Please login to access this resource');
    }

    try {
      this.jwtService.verify(accessToken, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        await this.getNewAccessToken(req);
        return true;
      }
      throw new UnauthorizedException('Invalid access token');
    }
    return true;
  }

  private async getNewAccessToken(req: AuthenticatedRequest): Promise<void> {
    try {
      const decoded = this.jwtService.verify<{ id: string }>(
        req.headers.refreshtoken as string,
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        },
      );

      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        console.warn(
          `User ID ${decoded.id} decoded from refresh token not found`,
        ); // for debugging
        throw new UnauthorizedException('Invalid refresh token'); // for production
      }

      const accessToken = this.jwtService.sign(
        { id: user.id },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '15m',
        },
      );

      const refreshToken = this.jwtService.sign(
        { id: user.id },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      );

      req.user = user; // attaching the authenticated user object to req so that downstream resolver can access the authenticated user without needing to decode the token again
      req.headers.authorization = `Bearer ${accessToken}`;
      req.headers.refreshtoken = refreshToken;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Please login to access this resource');
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
