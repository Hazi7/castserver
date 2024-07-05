import { Controller, Post, Body, Query, HttpStatus, Req, Res, BadRequestException, Get, HttpException, UseFilters, Param, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ResponseModel } from "src/common/models/response.model";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";
import { EmailService } from "src/shared/mailer/email.service";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "src/common/guards/auth.guard";

@UseGuards(AuthGuard)
@ApiTags('认证控制器')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(
        private readonly accountService: AuthService,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService
    ) {};

    @Get('confirm-authentication')
    @ApiOperation({
         summary: '激活账号' 
    })
    async confirmAuthentication(
        @Query('token') token: string,
        @Query('redirectUrl') redirectUrl: string,
        @Req() req: FastifyRequest, 
        @Res() res: FastifyReply
    ) {
        const { email } = await this.emailService.verifyCode(token);
        const user = await this.accountService.findUserByUniqueField({ email });

        if (!user) {
            throw new BadRequestException('🎗️该邮箱不存在关联账户，请先创建账户🎗️'); 
        }
        if (user.isVerified) {
            throw new BadRequestException('🎐该邮箱关联账户已认证，请登录🎐');
        }
        const updatedUser = await this.accountService.updateUserByUniqueField(
          {
            email,
          },
          {
            isVerified: true,
          },
        );
        
        if (updatedUser) {
            // res.status(HttpStatus.OK).send(ResponseModel.success(HttpStatus.OK, '❄️注册成功, enjoy it!❄️', req.url));
            const payload = { email: updatedUser.email, sub: updatedUser.id };
            const token = this.jwtService.sign(payload);

            res.setCookie('auth_token', token, { 
                httpOnly: true,
                path: '/',
            });

            res.redirect(redirectUrl, HttpStatus.MOVED_PERMANENTLY);

        }

    }

    @Post('login')
    @ApiOperation({ summary: '登录' })
    async login(
        @Body() loginDto: LoginDto,
        @Req() req: FastifyRequest,
        @Res() res: FastifyReply
    ) {
        const { accountIdentifier, password } = loginDto;

        const isValid = await this.accountService.validateUser(accountIdentifier, password)

        if (isValid) {
            res.setCookie('auth_token', accountIdentifier, {
                httpOnly: true,
                path: '/'
            })
            res.status(HttpStatus.OK).send(ResponseModel.success(HttpStatus.OK, '😉登录成功😉', req.url));
        } else {
            throw new BadRequestException('🙄账号或密码错误🙄');
        }
    }

    @Get('authenticate-with-github')
    @ApiOperation({ summary: 'Github登录' })
    async authenticateWithGitHub() {

    }

    @Get('authenticate-with-alipay')
    @ApiOperation({ summary: '支付宝登录' })
    async authenticateWithAlipay() {

    }

    @Get('logout')
    @ApiOperation({ summary: '登出' })
    async logout() {
        
    }
}
