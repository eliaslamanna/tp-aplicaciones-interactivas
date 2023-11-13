import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../Home/home";
import AboutUs from "../AboutUs/aboutus";
import Error404 from "../Error/error404";
import NavBar from "./navbar";
import NuevoReclamo from "../Reclamos/NuevoReclamo/nuevoReclamo";
import ListadoReclamos from "../Reclamos/ListadoReclamos/listadoReclamos";

function Navigation() {
    return (
        <Router>
            <div>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/acerca-de" element={<AboutUs />} />

                    {/*Ruta de manejo de error 404 */}
                    <Route path="*" element={<Error404 />} />
                    <Route path="/Reclamos/Nuevo" element={<NuevoReclamo />} />
                    <Route path="/Reclamos/Listado" element={<ListadoReclamos />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Navigation;