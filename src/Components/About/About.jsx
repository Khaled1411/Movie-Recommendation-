import React from 'react';
import styles from './About.module.css';

export default function About() {
  return (
    <>
      <div className="container">
        <div className={`my-4 p-3 ${styles.about} rounded rounded-3`}>
          <h2 className="text-center text-capitalize">about us</h2>
          <div className="my-5 w-75 text-center mx-auto">
            <p>One popular movie trending app is IMDb, which stands for Internet Movie Database. IMDb is a 
                comprehensive database of information about movies, TV shows, and celebrities.</p>
          <p className='my-4'> The app allows 
                users to browse through a vast collection of movies, read reviews and ratings, 
                and watch trailers. Users can also create lists of their favorite movies and rate and review 
                films they have watched.</p>
            <p>movie trending apps provide a convenient way for users to stay up-to-date on the latest movie
               releases and discover..</p>
          </div>
        </div>
      </div>
    </>
  )
}
