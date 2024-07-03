import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: '用户名/邮箱/手机号',
        example: 'username@example.com',
    })    
    accountIdentifier: string;
    @ApiProperty({
        description: '密码'
    })
    password: string;
}