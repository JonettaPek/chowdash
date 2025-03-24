import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  ActivateAccountResponse,
  LoginResponse,
  RegisterResponse,
} from './type/user.type';
import { ActivateAccountDto, LoginDto, RegisterDto } from './dto/user.dto';
import { Response } from 'express';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { User } from './entity/user.entity';
import { AuthenticatedRequest, AuthGuard } from './guard/auth.guard';

@Resolver('User')
// @UseFilters()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (
      !registerDto.name ||
      !registerDto.email ||
      !registerDto.password ||
      !registerDto.phone_number
    ) {
      throw new BadRequestException('Please fill in all the fields');
    }
    const data = await this.userService.register(registerDto, context.res);
    const activationToken = data.activationToken;

    return { activation_token: activationToken };
  }

  @Mutation(() => ActivateAccountResponse)
  async activateAccount(
    @Args('activateAccountDto') activateAccountDto: ActivateAccountDto,
    @Context() context: { res: Response },
  ): Promise<ActivateAccountResponse> {
    const data = await this.userService.activateAccount(
      activateAccountDto,
      context.res,
    );
    const user = data.persistedUser;
    return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginDto') loginDto: LoginDto,
    @Context() context: { res: Response },
  ): Promise<LoginResponse> {
    const data = await this.userService.login(loginDto, context.res);
    const { user, accessToken, refreshToken, error } = data;
    return { user, accessToken, refreshToken, error };
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  getLoggedInUser(
    @Context()
    context: {
      req: AuthenticatedRequest;
    },
  ) {
    const user = context.req.user;
    const accessToken = context.req.headers.authorization?.split(' ')[1];
    const refreshToken = context.req.headers.refreshtoken;
    return { user, accessToken, refreshToken };
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
