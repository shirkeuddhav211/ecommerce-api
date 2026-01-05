import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const user = await this.repo.save({
      email,
      password: hashed,
    });

    // ✅ Return safe response only
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }


  async login(email: string, password: string) {
    const user = await this.repo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'], // 🔑 REQUIRED
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        role: user.role,
      }),
    };
  }

}
