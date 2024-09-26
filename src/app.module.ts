import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioModule } from './service/usuario/usuario.module';
import { BootstrapService } from './bootstrap/bootstrap.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}` || '.env',
    }),
    DatabaseModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [BootstrapService],
})
export  class AppModule {
  static port:number
  static nameproyect:string
  static conexion:string
  constructor(
    private readonly configService: ConfigService,
    private readonly bootstrap: BootstrapService,
  ){
    this.onModuleInit()
  }
  async onModuleInit() {
    AppModule.port = parseInt(this.configService.get('PORT_APLICATION'));
    AppModule.nameproyect = this.configService.get<string>('NAME_PROYECT', '?');
  }
  async onApplicationBootstrap() {
    await this.bootstrap.loadData();
  }
}
