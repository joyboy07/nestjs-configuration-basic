import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsuarioBootstrap } from './usuario.bootstrap';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: "AGK$SECRET&TOKEN",
      // signOptions: {
      //   expiresIn: 3600*23,
      // }
    })

  ],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    JwtModule,
    JwtStrategy,
    UsuarioBootstrap
  ],
  exports:[
    JwtStrategy,
    PassportModule,
    UsuarioModule,
    UsuarioBootstrap
  ]
})
export class UsuarioModule {}
