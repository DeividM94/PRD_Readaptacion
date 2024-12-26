import React from 'react'
import './contacto.scss';

export const Contacto = () => {
  

const handleWhatsAppClick = () => {
  const phoneNumber = '611875588'; 
  const message = 'Hola Pipo, estoy tieso. Ayuda'; 
  const encodedMessage = encodeURIComponent(message);  
  window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
};


  return (
    <section className="contacto">
      <div className="contacto-container">
        <h1>PRD Readaptación</h1>
        <p>Calle Natalia 12, 29009 Málaga</p>
        <div className="mapa-container">
          <iframe
            title="Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.968628198172!2d-4.435673623732898!3d36.723314672029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f7142bb126f1%3A0x8afced1b60aa43f6!2sPRD%20Readaptaci%C3%B3n!5e0!3m2!1ses!2ses!4v1735214818822!5m2!1ses!2ses" 
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <button className="whatsapp-btn mx-auto" onClick={handleWhatsAppClick}>
          <img src="/whatsapp.png" alt="WhatsApp" />Escríbeme
        </button>
      </div>
    </section>
  );
};