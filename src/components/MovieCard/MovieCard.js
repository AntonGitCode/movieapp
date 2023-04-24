import React, { useContext } from 'react'
import 'antd/dist/reset.css'
import './MovieCard.css'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Rate, Tag } from 'antd'
import { TabContext } from '../TabContext/TabContext'
import { GuestSessionContext } from '../../GuestSessionContext'
import PropTypes from 'prop-types'
import errorPoster from './images/no-poster-found.png'

const MovieCard = ({ movie }) => {
  const { movies, activeTab, setMovies, ratedMovies } = useContext(TabContext)
  const { genres, isLocalStorageSupported } = useContext(GuestSessionContext)

  const updateRatedMovies = (newRatedMovies) => {
    console.log('---MovieCard -- updateRatedMovies -- ratedMovies ', newRatedMovies)
    console.log('---MovieCard -- updateRatedMovies -- isLocalStorageSupported ', isLocalStorageSupported)
    isLocalStorageSupported && localStorage.setItem('ratedMovies', JSON.stringify(newRatedMovies))
    setMovies([...movies], newRatedMovies)
  }

  const onChangeStar = (number) => {
    const newMovies = [...movies]

    if (newMovies.length) {
      newMovies.forEach((item) => {
        if (item.id === movie.id) item['rated'] = number
        return item
      })
    }

    let newRatedMovies = isLocalStorageSupported ? JSON.parse(localStorage.getItem('ratedMovies')) : [...ratedMovies]
    console.log('--------------------------ratedMovies', newRatedMovies)
    if (number === 0) {
      let ratedMoviesLS
      if (isLocalStorageSupported) {
        ratedMoviesLS = JSON.parse(localStorage.getItem('ratedMovies')).filter((obj) => obj.id !== movie.id)
      } else {
        if (ratedMovies) ratedMoviesLS = ratedMovies.filter((obj) => obj.id !== movie.id)
        else ratedMoviesLS = []
      }
      updateRatedMovies(ratedMoviesLS)
    } else {
      const ratedMovie = { ...movie, rated: number }
      console.log('-----ratedMovie--', ratedMovie)
      let indx
      if (newRatedMovies) {
        indx = newRatedMovies.findIndex((obj) => obj.id === movie.id)

        if (indx >= 0) {
          newRatedMovies[indx] = ratedMovie
        } else {
          newRatedMovies.push(ratedMovie)
        }
      } else {
        console.log('-------хитрый консоль -----')
        newRatedMovies = [ratedMovie]
      }
      updateRatedMovies(newRatedMovies)
    }
  }

  let ratedStars = 0
  if (activeTab === 0) {
    movies.forEach((item) => {
      if (item.id === movie.id) ratedStars = item['rated']
      return item
    })
  }

  if (activeTab === 1) ratedStars = movie['rated']

  const { title, overview, release_date, poster_path, vote_average, genre_ids } = movie
  const posterUrl = poster_path ? 'https://image.tmdb.org/t/p/w185/' + poster_path : errorPoster
  const releaseDate = release_date ? format(new Date(release_date), 'MMMM dd, yyyy', { locale: enGB }) : null

  const descriptionLines =
    title.length > 50 && genre_ids.length > 3
      ? 'clamp--one'
      : title.length > 35 && genre_ids.length > 3
      ? 'clamp--two'
      : title.length > 19 && genre_ids.length > 3
      ? 'clamp--three'
      : title.length > 50
      ? 'clamp--two'
      : title.length > 35
      ? 'clamp--three'
      : title.length > 19
      ? 'clamp--four'
      : ''

  const circleColorRate =
    vote_average <= 3
      ? 'border-bad'
      : vote_average <= 5
      ? 'border-good'
      : vote_average <= 7
      ? 'border-best'
      : 'border-genius'

  return (
    <>
      {(activeTab === 0 || (activeTab === 1 && movie['rated'] > 0)) && (
        <div className="card">
          <img className="card-poster" src={posterUrl} alt={title} />
          <div className="card-info">
            <div className={`circle ${circleColorRate}`}>{vote_average.toFixed(1)}</div>
            <div className="card-title">{title}</div>

            {genres && genres.length > 0 && (
              <div className="genres">
                {genre_ids
                  .map((id) => genres.find((obj) => obj.id === id)?.name)
                  .filter((name) => name)
                  .map((genreItem, index) => (
                    <Tag key={index} className="genre">
                      {genreItem}
                    </Tag>
                  ))}
              </div>
            )}
            <div className="card-date">{releaseDate}</div>
            <div className={`card-description ${descriptionLines}`}>{overview}</div>
            <Rate className="rate" count={10} value={ratedStars} onChange={onChangeStar} />
          </div>
        </div>
      )}
    </>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object,
}

export default MovieCard
