import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entity/user.entity';

export class TokenCreator {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public createTokens(user: User) {
    const accessToken = this.jwt.sign(
      //payload
      {
        id: user.id,
      },
      //options
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '1m',
      },
    );

    const refreshToken = this.jwt.sign(
      //payload
      {
        id: user.id,
      },
      //options
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '3d',
      },
    );

    return { user, accessToken, refreshToken };
  }
}
/** 
Feature             Access Token 🔑                                                         Refresh Token 🔄

Purpose             Used to access protected resources (API, user data, etc.).              Used to generate a new access token when the old one expires.

Expiration          Short-lived (e.g., 5-15 minutes).                                       Long-lived (e.g., days or weeks).

Storage             Stored in memory, HTTP-only cookies, or localStorage (less secure).     Stored securely, typically in HTTP-only cookies.

Security Risk       If stolen, it can be used to access APIs immediately.                   Less risky because it can't directly access resources.

Usage               Sent with every API request (Authorization: Bearer <token>).            Sent only when requesting a new access token.

Where Used?         APIs, web apps, mobile apps.                                            Authentication servers.

How They Work Together
1. User Logs In
- Server generates both access and refresh tokens.
- The access token is returned to the client.
- The refresh token is securely stored.

2. User Makes API Requests
- The client sends the access token in the Authorization header.
- If the token is valid, the server processes the request.

3. Access Token Expires ⏳
- The client sends the refresh token to request a new access token.

4. Server Verifies Refresh Token ✅
- If valid, a new access token is issued.
- If invalid (stolen or expired), the user is logged out.
*/
