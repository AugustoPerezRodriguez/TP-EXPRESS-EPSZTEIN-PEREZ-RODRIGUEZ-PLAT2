import axios from "axios";


const APIKEY = "37dd8d8e";


const OMDBSearchByPage = async (searchText, page = 1) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : []

    };
    try
    {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`);

      if(response.data.Response === "True")
      {
        returnObject.respuesta = true;
        returnObject.cantidadTotal = parseInt(response.data.totalResults);
        returnObject.datos = response.data.Search;
      }
    }
    catch
    {

    }

  return returnObject;

};


const OMDBSearchComplete = async (searchText) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : []

    };

    const primerResultado = await OMDBSearchByPage(searchText, 1);
    try
    {
      if(primerResultado.respuesta === false)
      {
        return returnObject;
      }
      returnObject.respuesta = true;
      returnObject.cantidadTotal = primerResultado.cantidadTotal;
      returnObject.datos = primerResultado.datos;

      const cantidadDePaginas = Math.ceil(primerResultado.cantidadTotal / 10);
      for(let i = 2; i <= cantidadDePaginas; i++)
      {
        const resultado = await OMDBSearchByPage(searchText, i);
        returnObject.datos.push(...resultado.datos);
      }

    }
    catch
    {

    }

  return returnObject;
  }



const OMDBGetByImdbID = async (imdbID) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : {}

    };

    try
    {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`);

      if(response.data.Response === "True")
      {
        returnObject.respuesta = true;
        returnObject.datos = response.data;
      }
    }
    catch
    {

    }

  return returnObject;

};

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};