import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  let [trendingMovies,setTrendingMovies] = useState([]);
  let [trendingTvshows,setTrendingTvshows] = useState([]);
  let [trendingPeople,setTrendingPeople] = useState([]);
  let [loading,setLoading] = useState(false);

  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';

  function roundToOneDecimalPlace(number) {
    return Number(number.toFixed(1));
  }

  async function getTrendingItems(mediaType, callback) {
    setLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=b116c6cff13d226f2cb7a9a6253b930b`, {
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
    getTrendingItems('tv', setTrendingTvshows);
    getTrendingItems('person', setTrendingPeople);
    
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
      <Header />
      <div className="container">
        {loading ? 
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
          <i className='fa fa-spinner fa-spin h1 text-white'></i>
        </div>
      : 
        <>
        <div className="row my-4">
          <div className="col-md-4">
            <div className="welcome">
              <div className={`${styles.brdr} my-4 w-25`}></div>
              <h2>Trending</h2>
              <h2>Movies</h2>
              <h2>To watch now</h2>
              <p className='text-white-50'>most watched movies by day</p>
              <div className={`${styles.brdr} my-4 w-100`}></div>
            </div>
          </div>
        {trendingMovies.map((movie) => 
          <div key={movie.id} className="col-md-3 col-lg-2 my-3">
            <div className="movie position-relative">
              <img className='w-100 mb-2' src={baseImgUrl+movie.poster_path} alt="movie name" />
              <h2 onClick={()=>goToDetails(movie.id)} className={`h5 ${styles.cursorPointer}`}>{movie.title}</h2>
              <p className="h4 bg-info rounded rounded-3 p-2 position-absolute top-0 start-50 translate-middle">{roundToOneDecimalPlace(movie.vote_average)}</p>
            </div>
          </div>
        )}
      </div>

      <div className={`${styles.brdr} w-50 mx-auto mb-5`}></div>

      <div className="row my-4">
        <div className="col-md-4">
          <div className="welcome">
            <div className={`${styles.brdr} my-4 w-25`}></div>
            <h2>Trending</h2>
            <h2>Tv shows</h2>
            <h2>To watch now</h2>
            <p className='text-white-50'>most watched tv shows by day</p>
            <div className={`${styles.brdr} my-4 w-100`}></div>
          </div>
        </div>
        {trendingTvshows.map((tv) => 
          <div key={tv.id} className="col-md-3 col-lg-2 my-3">
            <div className="tv">
              <img className='w-100 mb-2' src={baseImgUrl+tv.poster_path} alt="tv show name" />
              <h2 onClick={()=>goToDetails(tv.id)} className={`h5 ${styles.cursorPointer}`}>{tv.name}</h2>
              {/* <p className="h4 bg-info rounded rounded-3 p-2 position-absolute top-0 start-50 translate-middle">{roundToOneDecimalPlace(tv.vote_average)}</p> */}
            </div>
          </div>
        )}
      </div>

      <div className={`${styles.brdr} w-50 mx-auto mb-5`}></div>

      <div className="row my-4">
        <div className="col-md-4">
          <div className="welcome">
            <div className={`${styles.brdr} my-4 w-25`}></div>
            <h2>Trending</h2>
            <h2>People</h2>
            <h2>To watch now</h2>
            <p className='text-white-50'>most watched people by day</p>
            <div className={`${styles.brdr} my-4 w-100`}></div>
          </div>
        </div>
        {trendingPeople.map((person) => 
          <div key={person.id} className="col-md-3 col-lg-2 my-3">
            <div className="person">
              <img className='w-100 mb-2' src={baseImgUrl+person.profile_path} alt="person name" />
              <h2 onClick={()=>goToDetails(person.id)} className={`h5 ${styles.cursorPointer}`}>{person.name}</h2>
              {/* <p className="h4 bg-info rounded rounded-3 p-2 position-absolute top-0 start-50 translate-middle">{roundToOneDecimalPlace(person.vote_average)}</p> */}
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
