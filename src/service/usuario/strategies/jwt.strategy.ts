import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor( configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "AGK$SECRET&TOKEN",
            // secretOrKey: configService.get("jwt_secret"),
            passReqToCallback: false
        });
    }
    async validate(payload: JwtPayload) {
        const { username } = payload;
        const { rol } = payload;
        // const user = await this.userDao.findByUsername(username);
        // if (!user) throw new UnauthorizedException();
        // if (user.rol != rol ) throw new UnauthorizedException();

        return payload
    }

}
