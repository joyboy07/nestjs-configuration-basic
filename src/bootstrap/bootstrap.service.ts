import { Injectable, Logger } from '@nestjs/common';
import { UsuarioBootstrap } from 'src/service/usuario/usuario.bootstrap';

@Injectable()
export class BootstrapService {

  constructor(
		private readonly usuarioBootstrap: UsuarioBootstrap,
  ) {}

  async loadData() {
		await Promise.all([
			await this.usuarioBootstrap.loadData(),
		]);
  }
}
