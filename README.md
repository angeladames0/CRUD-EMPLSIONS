<b>Para hacer funcionar el proyecto en Visual Studio, debe seguir los siguientes pasos:</b>

- Descargar e instalar PostgreSQL: La aplicación utiliza PostgreSQL como la base de datos. Puede descargar la versión adecuada para su sistema operativo desde el sitio web oficial de PostgreSQL. También debe asegurarse de tener los derechos necesarios para crear una base de datos.

- Descargar e instalar Visual Studio: La aplicación utiliza Visual Studio como IDE. Puede descargar la versión adecuada para su sistema operativo desde el sitio web oficial de Visual Studio.

- Clonar el repositorio del proyecto: El código del proyecto está alojado en GitHub o simplemente descargarlo.

- Configurar la base de datos: Cree una nueva base de datos en PostgreSQL y configure las credenciales de acceso. Luego, cree las tablas necesarias utilizando los scripts SQL proporcionados en el proyecto.

- Ejecutar en la terminal`npm install` desde el backend y frontend, para instalar todas las dependencias necesarias del proyecto.

- Configurar la API: Abra el proyecto en Visual Studio y configure la conexión a la base de datos en `server/db/db.js` y `server/routes/api.js`. Asegúrese de tener la cadena de conexión correcta con las credenciales de acceso.

- Ejecutar la API: En Visual Studio, seleccione el proyecto de backend y ejecute en la terminar: npm run dev para ejecutar el backend. Esto iniciará la API y la hará disponible en `http://localhost:3000`.

- Ejecutar el frontend: En Visual Studio, seleccione el proyecto de frontend y ejecute en la terminar: npm run serve para ejecutar el frontend. Esto iniciará el frontend y lo hará disponible en `http://localhost:8080`.

Una vez completados estos pasos, debería poder acceder a la aplicación en `http://localhost:8080` y utilizarla para registrar solicitudes de permisos y mantener un registro de ellas.


<br><br>
<b>Codigo de tablas DB:</b>
<details>

```

CREATE TABLE tipopermiso (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE permisos (
  id SERIAL PRIMARY KEY,
  nombreempleado VARCHAR(50) NOT NULL,
  apellidosempleado VARCHAR(50) NOT NULL,
  tipopermisoId INT NOT NULL,
  fechapermiso DATE NOT NULL,
  FOREIGN KEY (tipopermisoid) REFERENCES tipopermiso(id)
);

```

</details>
