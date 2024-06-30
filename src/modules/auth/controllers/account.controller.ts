import { Controller, Post, Body, Query, Param, HttpStatus } from "@nestjs/common";
import { AccountService } from "../services/account.service";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "../dto/register-user.dto";

@ApiTags('users')
@Controller('users')
export class AccountController {
    constructor(private readonly accountService: AccountService) {};

    @Post('register')
    @ApiOperation({ summary: '注册' })
    @ApiBody({ type: RegisterUserDto })
    async register(@Body() registerUserDot: RegisterUserDto) {

        const defaultUsername = registerUserDot.email.split('@')[0];

        try {
            const userId = this.accountService.createUser({
                email: registerUserDot.email,
                username: `caster-${defaultUsername}`,
            });

            return {
                statusCode: HttpStatus.CREATED,
                message: '注册成功',
                data: {
                    userId
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    @Post('login')
    @ApiOperation({ summary: '登录' })
    async login() {
        
    }


}
