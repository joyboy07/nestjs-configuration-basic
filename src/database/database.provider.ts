
import { DynamicModule, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DataSource, DataSourceOptions } from "typeorm"

const logger = new Logger('Database');

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
	inject:[ConfigService],
	async useFactory(config: ConfigService){
		const dbConfig ={
			type: "mssql",
			port: parseInt(config.get('PORT_BASE_DATOS')),
			host: config.get('HOST'),
			database: config.get('BASE_DATOS'),
			username: config.get('USER_DB'),
			password: config.get('PASSWORD_DB'),
			autoLoadEntities: true,
			synchronize: config.get('SYNCHRONIZE') == "true"? true : false,
			entities: [],
			logging: false,
			migrations: [],
			extra: {
				encrypt: false,
        trustServerCertificate: true,
      },
		} as DataSourceOptions;

		const dataSource = new DataSource(dbConfig);
		try {
			await dataSource.initialize();
			logger.debug('Conexión a la base de datos exitosa');
		} catch (error) {
			logger.error('Error al conectar a la base de datos:', error);
		}

		return dbConfig
	}
})