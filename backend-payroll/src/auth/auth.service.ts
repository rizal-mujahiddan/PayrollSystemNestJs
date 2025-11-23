import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['employee'],
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        'Invalid credentials or account inactive',
      );
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new ForbiddenException(
        'Account temporarily locked due to failed login attempts',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      await this.handleFailedLogin(user);
      throw new UnauthorizedException('invalid credentials');
    }

    await this.usersRepository.update(user.id, {
      failedLoginAttempts: 0,
      lockUntil: null,
      lastLogin: new Date(),
    });

    const { password: _, ...result } = user;
    return result;
  }

  private async handleFailedLogin(user: User): Promise<void> {
    const failedAttempts = user.failedLoginAttempts + 1;
    let lockUntil: Date | null = null;

    if (failedAttempts >= 5) {
      // Lock account for 30 minutes
      lockUntil = new Date(Date.now() + 30 * 60 * 1000);
    }

    // FIXED: Use type assertion for null values
    await this.usersRepository.update(user.id, {
      failedLoginAttempts: failedAttempts,
      lockUntil: lockUntil as any,
    });
  }

  private async handleFailedLoginAlternative(user: User): Promise<void> {
    const failedAttempts = user.failedLoginAttempts + 1;

    if (failedAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 30 * 60 * 1000);
    } else {
      user.lockUntil = null;
    }

    user.failedLoginAttempts = failedAttempts;
    await this.usersRepository.save(user);
  }

  async createUserForEmployee(
    employeeId: string,
    userData: { email: string; password: string; role: string },
  ) {
    const employee = await this.employeesRepository.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new BadRequestException('Employee not found');
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      employeeId: employee.id,
    });

    await this.usersRepository.save(user);

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      employeeId: user.employeeId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        employee: user.employee,
      },
    };
  }

  // Add this method to src/auth/auth.service.ts
  async refreshToken(user: any) {
    const userEntity = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['employee'],
    });

    if (!userEntity) {
      throw new UnauthorizedException('User not found');
    }

    const payload = {
      email: userEntity.email,
      sub: userEntity.id,
      role: userEntity.role,
      employeeId: userEntity.employeeId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
