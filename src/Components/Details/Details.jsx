import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Details() {

  let [searchParams, setSearchParams] = useSearchParams();
  let [datails,setDetails]=useState({});
  let currentId=searchParams.get('id');
  let [loading,setLoading] = useState(false);
  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';

  async function getMovieDetails() {
    setLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${currentId}?api_key=b116c6cff13d226f2cb7a9a6253b930b&language=en`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE2YzZjZmYxM2QyMjZmMmNiN2E5YTYyNTNiOTMwYiIsInN1YiI6IjYyOTc2OWNlNTUwN2U5MTQ5MjVlZTFmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r7hptV2G5FwzNnzGQ_3NWcvBHuIeWOL7d7lBYuh5IHY'
      }
    })
    setLoading(false);
    setDetails(data);
  }

  useEffect(() => {
    getMovieDetails();
  }, []);


  return (
    <>
      <div className="container">
        {loading ? 
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <i className='fa fa-spinner fa-spin h1 text-white'></i>
          </div>
        : 
        <>
          <div className="row gap- my-5">
            <div className="col-lg-4 col-md-6">
              <img className='w-100 mb-2' src={baseImgUrl + datails.poster_path} alt="movie name" />
            </div>
            <div className="col-lg-8 col-md-6 d-flex flex-column justify-content-evenly p-lg-5">
              <h2 className='h2'>{datails.title}</h2>
              <p className='h5'>Vote : <span className="ms-3">{datails.vote_average}</span></p>
              <p className='h5'>Vote count : <span className="ms-3">{datails.vote_count}</span></p>
              <p className='h5'>popularity : <span className="ms-3">{datails.popularity}</span></p>
              <p className='h5'>release date : <span className="ms-3">{datails.release_date}</span></p>
              <p className='my-3 text-white-50'>{datails.overview}</p>
            </div>
          </div>
        </>
        }
      </div>
    </>
  )
}
