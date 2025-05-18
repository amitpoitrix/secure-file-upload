import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "users/users.module";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({ 
            secret: 'secret',
            signOptions: {
                expiresIn: '1h'
            }
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtModule]
})
export class AuthModule {}