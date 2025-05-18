import { JwtService } from "@nestjs/jwt";
import { UsersService } from "users/users.service";
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const token = this.jwtService.sign({
            sub: user.id,
            email,
        });

        return {
            access_token: token
        };
    }
}