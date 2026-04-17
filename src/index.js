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


// === Arranca el servidor ===
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

