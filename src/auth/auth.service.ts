import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async register(user: SignupDto) {
        const { email_address, password } = user

        const userExists = await this.prisma.users.findUnique({
            where: { email_address }
        })

        if(userExists) {
            throw new BadRequestException('User already exists!')
        }

        const hashedPassword = await this.hashPassword(password)

        await this.prisma.users.create({
            data: {
                email_address,
                password: hashedPassword
            }
        })

        return { message: 'Signup was successful' };
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
}
