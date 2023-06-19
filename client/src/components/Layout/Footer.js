import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (

    <footer className='bg-dark text-light p-3' >
        <h4 className='text-center' >All rights Reserved &copy; kiranaking </h4>
        <p className='text-center mt-3'>
            <Link className='footer-link' to={'/about'}>About</Link>
            <Link className='footer-link' to={'/contact'}>Contact</Link>
            <Link className='footer-link' to={'/policy'}>Privacy</Link>
        </p>
    </footer>

  )
}

export default Footer