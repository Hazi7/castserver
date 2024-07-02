import { Controller, Post, Body, Query, Param, HttpStatus, Req, Res, BadRequestException, Get, HttpException, UseFilters } from "@nestjs/common";
import { AccountService } from "../services/account.service";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "../dto/register.dto";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ResponseModel } from "src/common/models/response.model";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";
import { EmailService } from "src/shared/mailer/email.service";
import { SmtpException } from "src/common/exceptions/smtp.exception";

@ApiTags('users')
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class AccountController {
    constructor(
        private readonly accountService: AccountService,
        private readonly emailService: EmailService
    ) {};

    @Post('register')
    @ApiOperation({ 
        summary: '注册账号',
        description: ''
    })
    @ApiBody({ type: RegisterUserDto })
    async register(
        @Body() registerUserDot: RegisterUserDto, 
        @Req() req: FastifyRequest, 
        @Res() res: FastifyReply
    ) {
        const defaultUsername = registerUserDot.email.split('@')[0];
        const existedUser = await this.accountService.findUserByEmail(registerUserDot.email);

        if (existedUser) {
            if (existedUser.isVerified) {
                res.status(HttpStatus.OK).send(ResponseModel.success(HttpStatus.OK, '🌼该邮箱已关联现有账户，每个邮箱仅能注册一次🌼', req.url))
            } else {
                await this.emailService.sendVerificationCode(registerUserDot.email);

                res.status(HttpStatus.OK).send(ResponseModel.success(HttpStatus.OK, '💌该邮箱存在未激活账户，验证邮件已发送💌', req.url));
            }
        } else {
            const user = await this.accountService.createUser({
                email: registerUserDot.email,
                username: `caster-${defaultUsername}`,
            })

            if (user) {
                try {
                    await this.emailService.sendVerificationCode(registerUserDot.email);
                } catch (error) {
                    throw new SmtpException(error);
                }
                res.status(HttpStatus.OK).send(ResponseModel.success(HttpStatus.OK, '💌创建账户成功，验证邮件已发送💌', req.url));
            }
        }
    }

    @Get('confirm-authentication/:token')
    @ApiOperation({
         summary: '激活账号' 
    })
    async confirmAuthentication(
        @Param('token') token: string, 
        @Req() req: FastifyRequest, 
        @Res() res: FastifyReply
    ) {
        const email = await this.accountService.verifyCode(token);
        const user = await this.accountService.findUserByEmail(email);

        if (!user) {
            throw new BadRequestException('🎗️该邮箱不存在关联账户，请先创建账户🎗️'); 
        }

        if (user.isVerified) {
            throw new BadRequestException('🎐该邮箱关联账户已认证，请登录🎐');
        }

        const updatedUser = await this.accountService.updateUserVerificationStatus(email);

        updatedUser && res.status(HttpStatus.OK).send(ResponseModel.success(HttpStatus.OK, '❄️注册成功, enjoy it!❄️', req.url));
    }

    @Post('login')
    @ApiOperation({ summary: '登录' })
    async login() {
        
    }


}
