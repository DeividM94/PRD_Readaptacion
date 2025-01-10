import React from 'react';
import './pidecita.scss'

export const PideCita = () => {
  return (
    <div className='pide-cita'>
      <iframe
        title="Calendly Widget"
        src="https://calendly.com/prdreadaptacion?embed_type=Inline"
      ></iframe>
    </div>
  );
};