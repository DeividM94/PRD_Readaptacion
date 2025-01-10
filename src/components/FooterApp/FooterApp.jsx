import React from 'react'
import './footerApp.scss'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export const FooterApp = () => {
  return (
    <div className='footer'>
      <div className='social-icons'>
        <a href='https://www.linkedin.com/in/david-montes-gonzalez/' target='_blank' rel='noopener noreferrer'>
          <FaLinkedin />
        </a>
        <a href='https://github.com/david-montes' target='_blank' rel='noopener noreferrer'>
          <FaGithub />
        </a>
        <a href='https://twitter.com/davidmontes' target='_blank' rel='noopener noreferrer'>
          <FaTwitter />
        </a>
      </div>
      <div className='footer-text'>
        <p>&copy; 2024 Hecho por <a href='https://www.linkedin.com/in/david-montes-gonzalez/' target='_blank' rel='noopener noreferrer'>David Montes González</a></p>
      </div>
    </div>
  )
}
