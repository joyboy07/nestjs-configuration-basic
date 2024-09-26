module.exports = {
	apps: [
	  {
		name: 'nombre-de-tu-app',
		script: 'dist/main.js',
		env: {
		  NODE_ENV: 'development',  // Configuración para desarrollo
		},
		env_production: {
		  NODE_ENV: 'production',    // Configuración para producción
		},
	  },
	],
  };