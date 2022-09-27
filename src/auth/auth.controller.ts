import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('yow')
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Get('Hello')
    signup() {
        return "Hello";
    }
}
