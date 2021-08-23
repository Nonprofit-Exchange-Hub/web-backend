import { Catch, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
// @Catch(QueryFailedError)
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const hashedPw = await bcrypt.hash(createUserDto.password, parseInt(process.env.BCRYPT_WORK_FACTOR));
            createUserDto.password = hashedPw;
            return await this.usersRepository.save(createUserDto);            
        } catch (err) {
            throw new HttpException({status:HttpStatus.CONFLICT, message: 'Email already exists' }, HttpStatus.CONFLICT)
            
        }
    }

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOne(id);
    }

    // Search database for user with matching email.
    // Returns user on success, throws 404 error if user does not exist
    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
        if (!user) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Email not found' }, HttpStatus.NOT_FOUND);
        }
        return user;
    }
    //Change to whatever the display name ends up being.
    findByUsername(first_name: string) {
        return this.usersRepository.findOne({ first_name });
    }

    //TODO: Assess if there is a better way than making two requests.
    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.usersRepository.update(id, updateUserDto);
        return this.usersRepository.findOne(id);
    }

    remove(id: number) {
        return this.usersRepository.delete(id);
    }
}
