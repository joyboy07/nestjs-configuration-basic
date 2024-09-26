<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS

## Instalación

```bash
# Instalamos los paquetes node_moudles
$ npm install
```

## Configuracion

```bash
# modificamos json para los diferentes configuraciones

"start:dev": "cross-env NODE_ENV=development nest start --watch",
"start:debug": "cross-env NODE_ENV=debug nest start --debug --watch",
"start:prod": "cross-env NODE_ENV=production node dist/main",
```

```bash
# env
  creamos los diferentes  env, env.development y env.production
```

## Estrutura del env

```bash
NAME_PROYECT=#
PORT_BASE_DATOS=#
BASE_DATOS=#
HOST=#
USER_DB=#
PASSWORD_DB=#
PORT_APLICATION=#
SYNCHRONIZE=#
```

## Ejecutar la aplicación

```bash
# watch developer
$ yarn run start:dev
```

```bash
# watch production
$ yarn run start:dev
```



## Comandos de apoyo

```bash
# genera modulo
$ nest g resource api/[nombre del modulo]

```

# Documentacion

## Requerimientos
- Instalar node js y npm https://nodejs.org/es
- Instalar yarn https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

## Bibliotecas

- Typeorm https://docs.nestjs.com/techniques/database
- cross-env https://www.npmjs.com/package/cross-env





