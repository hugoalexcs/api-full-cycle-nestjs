import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/api-doc/user.response';
import { UserDto } from 'src/dto/user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {}
    @Get()
    index(): Promise<User[]>{
        return this.userRepo.find()
    }
    @ApiOkResponse({
        type: UserResponse
    })
    @Get(':id')
    show(@Param('id') id: string): Promise<User>{
        return this.userRepo.findOneOrFail(id);
    }

    @ApiCreatedResponse({
        type: UserResponse
    })
    @Post()
    async store(@Body(new ValidationPipe({
        errorHttpStatusCode: 422
    })) body: UserDto): Promise<UserDto>{
        const user = this.userRepo.create(body);
        return this.userRepo.save(user);
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: User): Promise<User>{
        const user = await this.userRepo.findOneOrFail(+id);
        this.userRepo.update({id:+id}, body)
        return  this.userRepo.findOneOrFail(+id);
        
    }
    @Delete(':id')
    @HttpCode(204)
    async destroy(@Param('id') id: string): Promise<void>{
        const user = await this.userRepo.findOneOrFail(+id);
        this.userRepo.delete(+id)              
    }
}
