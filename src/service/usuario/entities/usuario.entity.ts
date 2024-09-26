import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {
	@PrimaryColumn({ length: 8 })
	dni: string;

	@Column()
	nombre: string;

	@Column()
	a_paterno: string;

	@Column()
	a_materno: string;

	@Column()
	password: string;
	
	@CreateDateColumn()
	at_create: Date;

	@UpdateDateColumn()
	at_update: Date;

	@DeleteDateColumn({ nullable: true })
	at_delete: Date;
}
