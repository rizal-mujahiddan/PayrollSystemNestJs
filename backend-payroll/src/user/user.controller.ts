import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('create-for-employee')
  @Roles('hr', 'admin')
  async createUserForEmployee(
    @Body()
    createUserDto: {
      employeeId: string;
      email: string;
      password: string;
      role: string;
    },
  ) {
    return this.authService.createUserForEmployee(createUserDto.employeeId, {
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
    });
  }

  @Get()
  @Roles('hr', 'admin')
  async getAllUsers() {
    // You would inject a UsersService here to get all users
    // For now, returning a placeholder
    return { message: 'Get all users - implement this method' };
  }

  @Patch(':id/deactivate')
  @Roles('hr', 'admin')
  async deactivateUser(@Param('id') id: string) {
    // Implement deactivation logic
    return { message: `User ${id} deactivated` };
  }

  @Patch(':id/reset-password')
  @Roles('hr', 'admin')
  async resetPassword(
    @Param('id') id: string,
    @Body() resetDto: { newPassword: string },
  ) {
    // Implement password reset logic
    return { message: `Password reset for user ${id}` };
  }
}
