import { Controller, Post, Body } from "@nestjs/common";
import type { AccountService } from "../services/account.controller";

@Controller('users')
export class AccountController {
    constructor(private readonly accountService: AccountService) {};

    @Post('register')
    async register(
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        
    }
}