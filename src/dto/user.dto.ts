import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class UserDto {
    
    @ApiProperty({
        type: String,
        description: 'Name of user'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Email of user'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

}