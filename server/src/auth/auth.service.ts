import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        // Check if user with email exists in database
        let user: User;
        try {
            user = await this.usersService.findByEmail(email);
        } catch (err) {
            err.status = HttpStatus.UNAUTHORIZED
            err.response.status = HttpStatus.UNAUTHORIZED
            throw err           
        }

        // Check if password from client matches password associated with
        // the user retrieved from database
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }
        else {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Invalid password',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    async createJwt(user: User) {
        const {password,accept_terms, ...payload} = user;
        return this.jwtService.sign(payload);
    }
}
