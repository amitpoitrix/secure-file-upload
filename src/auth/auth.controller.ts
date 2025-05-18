import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.validateUser(loginDto.email, loginDto.password);
    }
}