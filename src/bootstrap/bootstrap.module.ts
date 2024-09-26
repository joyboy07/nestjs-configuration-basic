import { Module } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';
import { UsuarioModule } from 'src/service/usuario/usuario.module';


@Module({
  imports: [
    UsuarioModule
  ],
  providers: [BootstrapService],
  exports: [BootstrapService]
})
export class BootstrapModule {}

