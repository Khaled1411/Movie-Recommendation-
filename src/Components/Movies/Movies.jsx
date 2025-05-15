import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Movies.module.css';

export default function Home() {

  let [trendingMovies,setTrendingMovies] = useState([]);
  let [loading,setLoading] = useState(false);

  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';

  async function getTrendingItems(mediaType, callback) {
    setLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=b116c6cff13d226f2cb7a9a6253b930b`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE2YzZjZmYxM2QyMjZmMmNiN2E5YTYyNTNiOTMwYiIsInN1YiI6IjYyOTc2OWNlNTUwN2U5MTQ5MjVlZTFmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r7hptV2G5FwzNnzGQ_3NWcvBHuIeWOL7d7lBYuh5IHY'
      }
    })
    callback(data.results);
    setLoading(false);
  }
  
  useEffect(() => {
    getTrendingItems('movie', setTrendingMovies);
    
  }, []);

  let navigate = useNavigate();
  function goToDetails(id) {
    navigate({
      pathname:'/details',
      search:`?id=${id}`
    });
  }



  return (
    <>
      <div className="container">
        {loading ? 
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <i className='fa fa-spinner fa-spin h1 text-white'></i>
          </div>
        : 
          <>
            <div className="row my-4">
            {trendingMovies.map((movie) =>
              <div key={movie.id} className="col-md-3 col-lg-2 my-2">
                <div className="movie">
                  <img className='w-100 mb-2' src={baseImgUrl+movie.poster_path} alt="" />
                  <h2 onClick={()=>goToDetails(movie.id)} className={`h5 ${styles.cursorPointer}`}>{movie.title}</h2>
                </div>
              </div>
            )}
          </div>
          </>
        }
      </div>
    </>
  )
}
