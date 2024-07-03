import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterUserDto {
    @ApiProperty()
    @IsEmail({},{
        message: '请输入有效的电子邮件地址'
    })
    @IsNotEmpty({
        message: '邮箱是必填项，请勿留空'
    })
    email: string;
    @ApiProperty()
    @IsNotEmpty({
        message: '密码是必填项，请勿留空'
    })
    @Length(8, 20, {
        message: '密码长度在8到20个字符之间'
    })
    password: string;
}
