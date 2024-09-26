import { Injectable, Logger } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioBootstrap {
    private readonly logger: Logger;

    constructor(private readonly service: UsuarioService,) {
        this.logger = new Logger(UsuarioBootstrap.name)
    }
    async loadData(): Promise<void> {
        const dto: CreateUsuarioDto = {
            dni:'root',
            password: '12345678',
            nombre: 'root',
            a_paterno: 'root',
            a_materno: 'root',
        };
        await this.create(dto);
    }

    private async create(dto:CreateUsuarioDto ) {
        const exist: Boolean = await this.service.existByName(dto.dni);
        if (exist) {
            this.logger.debug(` ${dto.dni} already exists.`);
        } else {
            await this.service.create(dto);
            this.logger.debug(` ${dto.dni} was created succesfully.`);
        }
    }

}
