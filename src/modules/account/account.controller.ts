import { Controller, Post, Body, Query, Param, HttpStatus, Req, Res, BadRequestException, Get, HttpException, UseFilters } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ResponseModel } from "src/common/models/response.model";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";
import { EmailService } from "src/shared/mailer/email.service";
import { SmtpException } from "src/common/exceptions/smtp.exception";
import { RegisterUserDto } from "./dto/register.dto";
import { AccountService } from "./account.service";

@ApiTags('账户控制器')
@Controller('account')
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

        const { email } =  registerUserDot;
        const defaultUsername = registerUserDot.email.split('@')[0];
        
        const existedUser = await this.accountService.findUserByUniqueField({ email });

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
                password: registerUserDot.password
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

    @Post('reset-password')
    @ApiOperation({ summary: '重置密码' })
    async resetPassword() {

    }


}
