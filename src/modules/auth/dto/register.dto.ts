import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
    @ApiProperty()
    @IsEmail({},{
        message: '请输入有效的电子邮件地址'
    })
    @IsNotEmpty({
        message: '邮箱是必填项，请勿留空'
    })
    email: string;
}
