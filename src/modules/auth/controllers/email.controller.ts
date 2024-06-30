import { Body, Controller, HttpException, HttpStatus, Post, Req, Res, UseFilters, UsePipes } from "@nestjs/common";
import { EmailService } from "../services/email.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SendCodeDto } from "../dto/send-code.dto";
import { HttpExceptionFilter } from "src/common/filters/http.filter";
import { ResponseModel } from "src/common/models/response.model";
import type { FastifyReply, FastifyRequest } from "fastify";

@ApiTags('users')
@Controller('emails')
@UseFilters(HttpExceptionFilter)
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('send-code')
    @ApiOperation({ summary: '发送验证码' })
    @UsePipes(HttpExceptionFilter)
    async sendCode(@Body() sendCodeDto: SendCodeDto, @Req() req: FastifyRequest, @Res() res: FastifyReply) {
        await this.emailService.sendVerificationCode(sendCodeDto.email);
        res.status(HttpStatus.OK).send(ResponseModel.success(res.statusCode, '发送成功', req.url));
    }
}