import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.service.register(dto.email, dto.password);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.service.login(dto.email, dto.password);
  }
}
