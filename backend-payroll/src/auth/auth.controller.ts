import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Request, 
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Delete
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }

  @Post('refresh')
  async refreshToken(@Request() req) {
    // In a real scenario, you'd validate the refresh token from body or cookies
    return this.authService.refreshToken(req.user);
  }

  @Post('logout')
  async logout(@Request() req) {
    // Implement logout logic (e.g., blacklist token, clear refresh token)
    return { message: 'Logged out successfully' };
  }

  @Get('profile')
  getProfile(@Request() req) {
    // Returns the current user's profile
    return req.user;
  }
}