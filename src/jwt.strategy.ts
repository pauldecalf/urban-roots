import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
                return request?.cookies?.jwt;  // Récupère le token à partir du cookie
            }]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'), // Utilisez la clé secrète pour vérifier le token
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };  // Retourne les informations utilisateur à partir du payload du token
    }
}
