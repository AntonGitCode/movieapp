import React, { useContext, useState } from 'react'
import 'antd/dist/reset.css'
import './MovieCard.css'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Rate, Tag } from 'antd'
import PropTypes from 'prop-types'
import { ErrorBoundary } from 'react-error-boundary'

import { TabContext } from '../TabContext/TabContext'
import { GuestSessionContext } from '../../GuestSessionContext'
import ErrorIndicator from '../error-indicator'

import errorPoster from './images/no-poster-found.png'

const MovieCard = ({ movie }) => {
  const { movies, activeTab, setMovies, ratedMovies } = useContext(TabContext)
  const { genres, isLocalStorageSupported } = useContext(GuestSessionContext)

  const updateRatedMovies = (newRatedMovies) => {
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
    if (number === 0) {
      let ratedMoviesLS
      if (isLocalStorageSupported) {
        ratedMoviesLS = JSON.parse(localStorage.getItem('ratedMovies')).filter((obj) => obj.id !== movie.id)
      } else {
        ratedMoviesLS = ratedMovies ? ratedMovies.filter((obj) => obj.id !== movie.id) : []
      }
      updateRatedMovies(ratedMoviesLS)
    } else {
      const ratedMovie = { ...movie, rated: number }
      let indx
      if (newRatedMovies) {
        indx = newRatedMovies.findIndex((obj) => obj.id === movie.id)

        if (indx >= 0) {
          newRatedMovies[indx] = ratedMovie
        } else {
          newRatedMovies.push(ratedMovie)
        }
      } else {
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
  const [imageUrl, setImageUrl] = useState(posterUrl)

  const handlePosterError = () => {
    setImageUrl(errorPoster)
  }

  const poster = <img className="card-poster" src={imageUrl} alt={title} onError={handlePosterError} />

  const releaseDate = release_date ? format(new Date(release_date), 'MMMM dd, yyyy', { locale: enGB }) : null

  let descriptionLines

  if (title.length > 19) descriptionLines = 'clamp--four'
  if (title.length > 35) descriptionLines = 'clamp--three'
  if (title.length > 50) descriptionLines = 'clamp--two'
  if (title.length > 19 && genre_ids.length > 3) descriptionLines = 'clamp--three'
  if (title.length > 35 && genre_ids.length > 3) descriptionLines = 'clamp--two'
  if (title.length > 50 && genre_ids.length > 3) descriptionLines = 'clamp--one'

  let circleColorRate
  if (vote_average <= 7) circleColorRate = 'border-best'
  if (vote_average <= 5) circleColorRate = 'border-good'
  if (vote_average <= 3) circleColorRate = 'border-bad'

  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorIndicator error={error} />}>
      <>
        {(activeTab === 0 || (activeTab === 1 && movie['rated'] > 0)) && (
          <div className="card">
            {poster}
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
    </ErrorBoundary>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object,
}

export default MovieCard
