import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
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

  // register user service
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

    const { activationCode, token } = this.createActivationToken(user);

    await this.emailService.sendAccountActivationEmail({
      recipientEmail: email,
      subject: 'Activate your acount',
      template: 'account-activation',
      name,
      activationCode,
    });

    return { user, response };
  }

  createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString(); // generate four-digit activation code (One-Time Password, OTP)

    const token = this.jwtService.sign(
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

    return { activationCode, token };
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
