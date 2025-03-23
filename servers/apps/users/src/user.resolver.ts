import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ActivateAccountResponse, RegisterResponse } from './types/user.type';
import { ActivateAccountDto, RegisterDto } from './dto/user.dto';
import { Response } from 'express';
import { BadRequestException, UseFilters } from '@nestjs/common';
import { User } from './entities/user.entity';

@Resolver('User')
// @UseFilters()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
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
    @Args('activateAccountInput') activateAccountDto: ActivateAccountDto,
    @Context() context: { res: Response },
  ): Promise<ActivateAccountResponse> {
    const data = await this.userService.activateAccount(
      activateAccountDto,
      context.res,
    );
    const user = data.persistedUser;
    return { user };
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
