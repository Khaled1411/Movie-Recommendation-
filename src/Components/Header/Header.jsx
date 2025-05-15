import React from 'react';
import styles from './Header.module.css';
import ImgItem1 from '../../images/item1.jpg';
import ImgItem2 from '../../images/item2.jpg';
import ImgItem3 from '../../images/item3.jpg';
import ImgItem4 from '../../images/item4.jpg';


export default function Header () {

  return (
    <>
        <header className={`${styles.homeHeader}`}>
          <div className={`${styles.bgFilter} d-flex align-items-center`}>
            <div className="container">
              <div className="row">
                <div className="col-md-7 col-lg-8 my-3 flex-column d-flex justify-content-center text-center">
                  <p className="h5 text-capitalize pt-3">welcome to </p>
                  <h3 className='text-uppercase my-3'>our special <span className='text-danger fw-bold'>movies and tv shows</span></h3>
                  <p className='text-white-50'>Whether you're a die-hard movie buff or just looking for something to watch on a lazy Sunday afternoon, we've got you covered.</p>
                </div>
                <div className="slider col-md-5 col-lg-4">
                  <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className={`carousel-item active ${styles.cursoulImg}`}>
                        <img src={ImgItem2} className={`d-block w-100 rounded rounded-2 ${styles.cursoulImg}`} alt="carousel image" />
                      </div>
                      <div className={`carousel-item ${styles.cursoulImg}`}>
                        <img src={ImgItem1} className={`d-block w-100 rounded rounded-2 ${styles.cursoulImg}`} alt="carousel image" />
                      </div>
                      <div className={`carousel-item ${styles.cursoulImg}`}>
                        <img src={ImgItem3} className={`d-block w-100 rounded rounded-2 ${styles.cursoulImg}`} alt="carousel image" />
                      </div>
                      <div className={`carousel-item ${styles.cursoulImg}`}>
                        <img src={ImgItem4} className={`d-block w-100 rounded rounded-2 ${styles.cursoulImg}`} alt="carousel image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
    </>
  )
}
