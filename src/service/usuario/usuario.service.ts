import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)  private readonly repository: Repository<Usuario>,
    private dataSource: DataSource,
    private readonly jwtService: JwtService,
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const existingUsuario = await this.repository.findOne({ where: { dni: createUsuarioDto.dni } });
    if (existingUsuario) throw new BadRequestException('Usuario con este DNI ya existe');

    const newUsuario = {
      ...createUsuarioDto,
      password: await bcrypt.hash(createUsuarioDto.password, 10),
    };

    await this.repository.save(newUsuario)

    return 'Operacion Exitosa';
  }

  async login(createUsuarioDto: CreateUsuarioDto) {

    const user = await this.repository.findOneBy({dni:createUsuarioDto.dni});
    const usuario = await this.repository.createQueryBuilder('q')
    .select(['q.dni', 'q.nombre', 'q.a_paterno', 'q.a_materno', 'r.id', 'r.descripcion'])
    .innerJoin('q.id_rol', 'r')
    .where('q.dni = :dni', { dni: createUsuarioDto.dni})
    .getOne();

    if (!user) throw new BadRequestException('El usuario introducido no se encuentra registrado')
    let isValidPassword = await bcrypt.compare(createUsuarioDto.password, user.password);
    if (!isValidPassword) throw new BadRequestException('Usuario no autorizado')
    let token = this.jwtService.sign({usuario});
    return token;
  }

  async findAll() {
    return await this.repository.find({select:['dni']});
  }



  async existByName(id: string): Promise<Boolean> {
    const o = await this.repository.findOneBy({ dni: id });
    return o !== null;
  }

}
