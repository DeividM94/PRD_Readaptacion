import React from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="seccion1">
        <img src="./logo-pide-cita.png" className="imagen" alt="Logo" />
        <button className="boton" onClick={()=>navigate('/pide-cita')}>Pedir cita</button>
      </div>

      <div className="seccion2">
        <div className="foto">
          <img src="./foto-seccion.jpg" alt="Sección" className="imagen-foto" />
        </div>
        <div className="articulo m-5">
          <h2>¿Qué es PRD?</h2>
          <p>
            Es una marca especializada en la readaptación y rehabilitación de
            lesiones de deportistas. Especialmente aquellos/as dedicados/as a
            deportes de fuerza como powerlifting, halterofilia, bodybuilding y
            crosstraining. Si tu objetivo es superar una lesión o cirugía, si
            sufres dolor entrenando o en tu vida diaria o, si deseas optimizar y
            mejorar tu rendimiento deportivo, sea cual sea tu deporte, podemos
            ayudarte.
          </p>
          <div className="lema">
            <p>
              BUSCAMOS DARLE UN NUEVO ENFOQUE A LA REHABILITACIÓN DE LAS
              LESIONES DEPORTIVAS, CAMBIANDO EL CONCEPTO CLÁSICO DE LA
              REHABILITACIÓN DE CAMILLA Y REPOSO. POR ELLO, NACE NUESTRA FRASE:
              “Rehab Through Strength”
            </p>
          </div>
        </div>
      </div>

      <div className="seccion3" id="sobre-mi">
        <div className="articulo m-5">
          <h2>Sobre mí</h2>
          <h3>Alejandro Hernández Cerezo</h3>
          <p>
            Más conocido como "Pipo"
            <br />
            <br />
            Graduado en CCAFYD por la Universidad de Granada. Apasionado de los
            deportes de fuerza y del Cross Training. Formador, entrenador y
            readaptador.
          </p>
          <p>
            Con la creación de PRD busca promover un nuevo enfoque en la
            readaptación de lesiones. Acercando herramientas útiles a todos los
            atletas para poder conseguir una vida deportiva más larga, sana y
            con menos dolor mediante la readaptación en base el entreno de la
            fuerza.
          </p>
          
          <p>
            A lo largo de su carrera, desde hace más de 8 años, cuenta con la
            experiencia de haber podido trabajar codo con codo con todo tipo de
            atletas y lesiones. Acompañando a muchos de ellos a competiciones
            nacionales e internacionales tales como la fase semifinal de los
            Crossfit Games.
          </p>
        </div>
        <div className="foto-centro">
          <img
            src="./pipo.jpg"
            alt="Alejandro Hernández Cerezo"
            className="imagen-centro"
          />
        </div>
        <div className="articulo formacion">
          <h2>Formación</h2>
          <ul>
            <li>GRADUADO CCAFYD (UGR)</li>
            <li>MASTER ENTRENAMIENTO PERSONAL (UGR)</li>
            <li>MASTERING SQUAT & DEADLIFT (QUALIS MOTUS)</li>
            <li>HUMAN PERFORMANCE SPECIALIST</li>
            <li>DYNAMIC NEUROMUSCULAR STABILIZATION I, DNS II</li>
            <li>ESPECIALISTA EN MECÁNICA DE CARRERA (QUALIS MOTUS)</li>
            <li>NEUROKINETIC THERAPY I</li>
            <li>CONOR HARRIS BIOMECHANICHS PROGRAM</li>
            <li>ENTRENADOR SUPERIOR DE NATACIÓN NIVEL III (RFEN)</li>
            <li>KETTLEBELL PERFORMANCE</li>
            <li>EXPERTO EN VALORACIÓN FUNCIONAL</li>
            <li>ENTRENADOR HALTEROFILIA (RFEH)</li>
            <li>CURSO EN NEUROFISIOLOGÍA DEL DOLOR</li>
            <li>FORMACIÓN EN NEUROLOGÍA APLICADA A LA READAPTACIÓN</li>
            <li>INTEGRATED KINETIC NEUROLOGY NIVEL 1</li>
          </ul>
        </div>
      </div>
      <div className="seccion4">
        <img src="./contacto-cita.jpg" alt="" />
        <div className="botones">
          <button className="boton" onClick={()=>navigate('/pide-cita')}>Pide cita</button>
          <button className="boton">Contacto</button>
        </div>
      </div>
    </>
  );
};
