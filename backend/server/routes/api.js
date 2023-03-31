const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'APP',
  password: '12345',
  port: 5432,
});

const app = express();
app.use(bodyParser.json());

// Obtener todos los permisos
app.get('/permisos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM permisos');
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Obtener todos los permisos
app.get('/tipopermiso', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tipopermiso');
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Obtener un tipopermiso por ID
app.get('/tipopermiso/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM tipopermiso WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Obtener un permiso por ID
app.get('/permisos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM permisos WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Insertar un nuevo permiso
app.post('/insertpermisos', async (req, res) => {
  const { nombre, apellidos, tipo_permiso, fecha_permiso } = req.body;
  if (!nombre || !apellidos || !tipo_permiso || !fecha_permiso) {
    console.log('Faltan datos en el body');
    res.sendStatus(400);
  } else {
    try {
      const result = await pool.query(
        'INSERT INTO permisos (nombreempleado, apellidosempleado, tipopermisoid, fechapermiso) VALUES ($1, $2, $3, $4) RETURNING id',
        [nombre, apellidos, tipo_permiso, fecha_permiso],
      );
      console.log('Permiso insertado exitosamente');
      res.status(201).send({ id: result.rows[0].id });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

// Actualizar un permiso existente
app.put('/actpermisos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, tipo_permiso, fecha_permiso } = req.body;
  if (!nombre || !apellidos || !tipo_permiso || !fecha_permiso) {
    res.sendStatus(400);
  } else {
    try {
      const result = await pool.query(
        'UPDATE permisos SET nombreempleado = $1, apellidosempleado = $2, tipopermisoid = $3, fechapermiso = $4 WHERE id = $5',
        [nombre, apellidos, tipo_permiso, fecha_permiso, id],
      );
      if (result.rowCount === 0) {
        console.log(`No se encontró el permiso con id ${id}`);
        res.sendStatus(404);
      } else {
        console.log(`Permiso actualizado con éxito: ${id}`);
        res.sendStatus(204);
      }
    } catch (error) {
      console.log(`Error al actualizar permiso con id ${id}: ${error}`);
      res.sendStatus(500);
    }
  }
});

// Eliminar un permiso existente
app.delete('/deletpermisos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM permisos WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send(`Permiso con ID ${id} no encontrado`);
    } else {
      console.log(`Permiso con ID ${id} eliminado exitosamente`);
      res.status(204).send(`Permiso con ID ${id} eliminado exitosamente`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

  
  module.exports = app;