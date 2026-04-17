import express from "express";  // npm i express
import cors    from "cors";     // npm i cors
import Alumno from "./models/alumno.js";
import { sumar, restar, multiplicar, dividir } from "./modules/matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./modules/omdb-wrapper.js";

const app  = express();
const port = 3000;               // http://localhost:3000

// === Middlewares ===
app.use(cors());                 // Habilita CORS (permite llamadas cross-origin)
app.use(express.json());         // Parsea bodies en formato JSON

// === Endpoints ===
app.get('/', (req, res) => {
  res.status(200).send('¡Ya estoy respondiendo!');
});

app.get('/saludar', (req, res) => {
  res.send('Hello World!');
});

//a2
app.get('/saludar/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  res.status(200).send(`Hola ${nombre}`);
});

//a3
app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
  const ano = req.params.ano;
  const mes = req.params.mes;
  const dia = req.params.dia;

  const fechaStr = `${ano}-${mes}-${dia}`;
  const timestamp = Date.parse(fechaStr);

  if (isNaN(timestamp)) {
    return res.status(400).send('Fecha inválida');
  }

  return res.status(200).send('Fecha válida');
});

//b1
app.get('/matematica/sumar', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);

  if (isNaN(n1) || isNaN(n2)) 
  {
    return res.status(400).send('Parámetros inválidos');
  }

  res.status(200).send(String(sumar(n1, n2)));
});

app.get('/matematica/restar', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  
  if (isNaN(n1) || isNaN(n2)) 
  {
    return res.status(400).send('Parámetros inválidos');
  }

  res.status(200).send(String(restar(n1, n2)));
});

app.get('/matematica/multiplicar', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  if (isNaN(n1) || isNaN(n2)) 
  {
    return res.status(400).send('Parámetros inválidos');
  }

  res.status(200).send(String(multiplicar(n1, n2)));
});

app.get('/matematica/dividir', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) 
    {
    return res.status(400).send('Parámetros inválidos');
    }

  res.status(200).send(String(dividir(n1, n2)));
});

//c

app.get('/omdb/searchbypage', async (req, res) => {
  const search = req.query.search;
  const p = req.query.p;

  try {
    const data = await OMDBSearchByPage(search, p);
    res.status(200).send(armarEnvelope(data));
  } catch (error) {
    console.log(error.message);
    res.status(500).send(armarEnvelope(null));
  }
});

app.get('/omdb/searchcomplete', async (req, res) => {
  const search = req.query.search;

  try {
    const data = await OMDBSearchComplete(search);
    res.status(200).send(armarEnvelope(data));
  } catch (error) {
    console.log(error.message);
    res.status(500).send(armarEnvelope(null));
  }
});

app.get('/omdb/getbyomdbid', async (req, res) => {
  const imdbID = req.query.imdbID;

  try {
    const data = await OMDBGetByImdbID(imdbID);
    res.status(200).send(armarEnvelope(data));
  } catch (error) {
    console.log(error.message);
    res.status(500).send(armarEnvelope(null));
  }
});

function armarEnvelope(datos) {
  if (!datos) {
    return { respuesta: false, cantidadTotal: 0, datos: [] };
  }

  if (Array.isArray(datos)) {
    return {
      respuesta: datos.length > 0,
      cantidadTotal: datos.length,
      datos: datos
    };
  }
  return {
    respuesta: true,
    cantidadTotal: 1,
    datos: datos
  };
}

//d

const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido",   "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao",     "32623391", 18));

app.get('/alumnos', (req, res) => {
  res.status(200).send(alumnosArray);
});

app.get('/alumnos/:dni', (req, res) => {
  const dniBuscado = req.params.dni;

  const alumno = alumnosArray.find(item => item.dni === dniBuscado);
  if(!alumno)
  return res.status(404).send('Alumno Not Found')

  res.status(200).send(alumno);
});

app.post('/alumnos/:username/:dni/:edad', (req, res) => {
  const { username, dni, edad } = req.body;
  if (!username || !dni || !edad) {
    return res.status(400).send('Faltan datos');
  }

  const nuevoAlumno = new Alumno(username, dni, edad);
  alumnosArray.push(nuevoAlumno);

  res.status(201).send(nuevoAlumno);
});


// === Arranca el servidor ===
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

