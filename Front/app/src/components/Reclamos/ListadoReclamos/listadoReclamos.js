import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

async function get_edificio(id_edificio) {
  const response = await fetch(
    "http://localhost:8080/edificios/" + id_edificio,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "htpp://localhost:3000/",
        "Access-Control-Allow-Methods": "POST, GET, PUT",
        "Access-Control-Allow-Headers": "Content-Type",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "cache-control": "no-cache",
      },
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects
}

async function get_reclamos(id_edificio) {
  const response = await fetch(
    "http://localhost:8080/reclamos?edificioId=" + id_edificio,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "htpp://localhost:3000/",
        "Access-Control-Allow-Methods": "POST, GET, PUT",
        "Access-Control-Allow-Headers": "Content-Type",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "cache-control": "no-cache",
      },
    }
  );
  return response.json();
}

const ListadoReclamos = () => {
  const [datosEdificio, setDatosEdificio] = useState([]);
  const [datosListadoReclamos, setDatosListadoReclamos] = useState([]);
  const [searchParams] = useSearchParams();
  const [filtro, setFiltro] = useState("SIN_FILTROS");

  useEffect(() => {
    let id_elegido = parseInt(searchParams.get("edificio_id"));
    get_edificio(id_elegido)
      .then((data) => {
        setDatosEdificio(data);
        //console.log("GET OK");
        get_reclamos(id_elegido)
          .then((data) => {
            //console.log("GET II OK");
            setDatosListadoReclamos(data);
          })
          .catch((err) => {
            alert("No se pudo obtener reclamos del edificio");
          });
      })
      .catch((err) => {
        alert("No se pudo obtener datos del edificio");
      });
  }, [searchParams]);

  return (
    <div className="container">
      <h1>Listado de Reclamos</h1>
      <div className="form-group">
        <label>Edificio:</label>
        <ul>
          <li>
            <label>
              Dirección: 
              {datosEdificio
                ? datosEdificio["direccion"]
                : "No se encontraron edificios..."}
            </label>
          </li>
        </ul>
      </div>
      <hr />
      <div className="form-group">
        <label>Filtrar por estado:</label>
        <select
          className="form-select"
          name="ac"
          size="3"
          onChange={(e) => setFiltro(e.target.value)}
          defaultValue="SIN_FILTROS" 
        >
          <option value="SIN_FILTROS">SIN FILTROS</option>
          <option value="NUEVO">NUEVO</option>
          <option value="ABIERTO">ABIERTO</option>
          <option value="EN_PROCESO">EN_PROCESO</option>
          <option value="DESESTIMADO">DESESTIMADO</option>
          <option value="ANULADO">ANULADO</option>
          <option value="TERMINADO">TERMINADO</option>
        </select>
      </div>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Descripción</th>
            <th scope="col">Motivo</th>
            <th scope="col">Estado</th>
            <th scope="col">Ver Detalles</th>
          </tr>
        </thead>
        <tbody>
          {datosListadoReclamos ? (
            datosListadoReclamos.map((reclamo, index) => {
              return filtro === "SIN_FILTROS" || filtro === reclamo["estado"] ? (
                <tr key={reclamo["id"]}>
                  <th scope="row">{reclamo["id"]}</th>
                  <td>{reclamo["descripcion"]}</td>
                  <td>{reclamo["motivo"]}</td>
                  <td>{reclamo["estado"]}</td>
                  <td>
                    <Link
                      to="/Reclamos/Detalle"
                      state={{ rec: reclamo, edi: datosEdificio }}
                    >
                      <button type="button" className="btn btn-primary">
                        Ver detalles
                      </button>
                    </Link>
                  </td>
                </tr>
              ) : (
                <tr key={index}></tr>
              );
            })
          ) : (
            <h2>Sin Datos...</h2>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoReclamos;
