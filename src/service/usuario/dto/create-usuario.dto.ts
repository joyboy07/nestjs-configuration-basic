import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUsuarioDto {
	@ApiProperty({
		type: String,
		default: '76934958'
	})
	@IsNotEmpty()
	dni: string;

	@ApiProperty({
		type: String,
		default: '76934958'
	})
	@IsNotEmpty()
	password: string;

	@ApiProperty({
		type: String,
		default: 'Julio'
	})
	@IsOptional()
	nombre: string;

	@ApiProperty({
		type: String,
		default: 'Porlles'
	})
	@IsOptional()
	a_paterno: string;

	@ApiProperty({
		type: String,
		default: 'Pardo'
	})
	@IsOptional()
	a_materno: string;

}
