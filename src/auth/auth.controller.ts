import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    async login(@Body() requestBody: { 
        username: string, 
        password: string 
    }) {
        const user = await this.authService.validateUser(requestBody.username, requestBody.password);
        if(!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }
        
        return this.authService.login(user);
    }
}