import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private configService;
    private jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    private readonly saltRounds;
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, storedPasswordHash: string): Promise<boolean>;
    generateToken(user: any): Promise<string>;
}
