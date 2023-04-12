import React from 'react'
import 'antd/dist/reset.css'
import './MovieCard.css'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Rate } from 'antd'

function MovieCard({ movie }) {
  const { title, overview, release_date, poster_path } = movie
  const posterUrl = 'https://image.tmdb.org/t/p/w185/' + poster_path
  const releaseDate = format(new Date(release_date), 'MMMM dd, yyyy', { locale: enGB })

  return (
    <div className="card">
      <img className="card-poster" src={posterUrl} alt={title} />
      <div className="card-info">
        <Rate value={3} tooltips={['bad', 'not bad', 'good', 'very good', 'excellent']} />
        <div className="card-title">{title}</div>
        <div className="card-date">{releaseDate}</div>
        <div className="card-description">{overview}</div>
      </div>
    </div>
  )
}

export default MovieCard
