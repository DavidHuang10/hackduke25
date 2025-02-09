import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, SignupDto } from '../../dtos/login.dto'

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    async signup(@Body() body: SignupDto){
        return await this.authService.signup(body);
    }

    @Post("login")
    async login(@Body() body: LoginDto) {
        return this.authService.login(body.email, body.password);
    }
}
