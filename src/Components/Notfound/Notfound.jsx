import React from 'react';
import styles from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';

export default function Notfound() {

  const navigate = useNavigate();
  function goToHome() {
    navigate('/home');
  }

  return (
    <>
      <div className="container">
        <div className={`d-flex align-items-center justify-content-center w-100 ${styles.height}`}>
          <div className="text-center">
            <h2 className='h1 fw-bold'>lost your way?</h2>
            <p className='text-capitalize h5 my-4'>sorry, we csn't find that page. You'll find lots to explore on the home page.</p>
            <button onClick={goToHome} className='btn btn-info'>Go To Home</button>
            <p className='text-white-50 pt-4'>Error Code <span className="fw-bold text-white">NSES-404</span></p>
          </div>
        </div>
      </div>
    </>
  )
}
