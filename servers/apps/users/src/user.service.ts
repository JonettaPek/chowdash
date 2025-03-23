import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActivateAccountDto, LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';

interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number: number;
}

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  // register account service
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;

    const isExistingEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (isExistingEmail) {
      throw new BadRequestException('This email address is already in use.');
    }
    const isExistingPhoneNumber = await this.prisma.user.findUnique({
      where: {
        phone_number,
      },
    });

    if (isExistingPhoneNumber) {
      throw new BadRequestException('This phone number is already in use.');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      password: encryptedPassword,
      phone_number,
    };

    const { activationCode, activationToken } =
      this.createActivationCodeAndToken(user);

    await this.emailService.sendAccountActivationEmail({
      recipientEmail: email,
      subject: 'Activate your acount',
      // template: './account-activation',
      name,
      activationCode,
    });

    console.log(`register ${activationCode} ${activationToken}`);
    return { activationToken, response };
  }

  createActivationCodeAndToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString(); // generate four-digit activation code (One-Time Password, OTP)

    const activationToken = this.jwtService.sign(
      // payload
      {
        user, // public claims
        activationCode, // private claims
      },
      // option
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '5m', // registered claims
      },
    );

    return { activationCode, activationToken };
  }

  // activate account
  async activateAccount(
    accountActivationDto: ActivateAccountDto,
    response: Response,
  ) {
    console.log(
      `activate before: ${accountActivationDto.activationCode} ${accountActivationDto.activationToken}`,
    );
    const { user, activationCode } = this.jwtService.verify<{
      user: UserData;
      activationCode: string;
    }>(accountActivationDto.activationToken, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    console.log(`activate after: ${activationCode}`);

    if (activationCode !== accountActivationDto.activationCode) {
      throw new BadRequestException('Invalid activation code');
    }

    const { name, email, password, phone_number } = user;
    const persistedUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        phone_number,
      },
    });
    return { persistedUser, response };
  }

  // login service
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = {
      email,
      password,
    };
    return user;
  }

  // get all users service
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
