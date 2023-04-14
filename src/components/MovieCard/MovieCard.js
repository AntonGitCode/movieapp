import React, { Component } from 'react'
import 'antd/dist/reset.css'
import './MovieCard.css'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Rate } from 'antd'
import { TabContext } from '../TabContext/TabContext'

export default class MovieCard extends Component {
  onChangeStar = (number) => {
    const { movies, setMovies, ratedMovies } = this.context
    const { movie } = this.props
    const newMovies = [...movies]
    let currentMovieId

    newMovies.forEach((item) => {
      if (item.id === movie.id) {
        item['rated'] = number
        currentMovieId = item.id
      }
      return item
    })

    let newRatedMovie = []
    let newRatedMovies = []
    newRatedMovie[0] = movie
    newRatedMovie[0]['rated'] = number

    if (ratedMovies) {
      let newRatedMovies = [...ratedMovies]

      let indx = newRatedMovies.findIndex((obj) => obj.id === currentMovieId)

      if (indx >= 0) {
        newRatedMovies[indx]['rated'] = number

        setMovies(newMovies, newRatedMovies)
      } else setMovies(newMovies, newRatedMovies)
    } else {
      newRatedMovies[0] = newRatedMovie[0]
      setMovies(newMovies, newRatedMovies)
    }
  }

  render() {
    const { movie } = this.props
    const { movies } = this.context

    let ratedStars = 0
    movies.forEach((item) => {
      if (item.id === movie.id) ratedStars = item['rated']
      return item
    })

    const { title, overview, release_date, poster_path, vote_average } = movie
    const posterUrl = 'https://image.tmdb.org/t/p/w185/' + poster_path
    const releaseDate = format(new Date(release_date), 'MMMM dd, yyyy', { locale: enGB })
    let circleColorRate = ''
    if (vote_average <= 3) circleColorRate = 'border-bad'
    if (vote_average > 3 && vote_average <= 5) circleColorRate = 'border-good'
    if (vote_average > 5 && vote_average <= 7) circleColorRate = 'border-best'
    if (vote_average > 7) circleColorRate = 'border-genius'
    return (
      <div className="card">
        <img className="card-poster" src={posterUrl} alt={title} />
        <div className="card-info">
          <div className={`circle ${circleColorRate}`}>{vote_average.toFixed(1)}</div>
          <div className="card-title">{title}</div>
          <div className="card-date">{releaseDate}</div>
          <div className="card-description">{overview}</div>
          <Rate className="rate" count={10} value={ratedStars} onChange={this.onChangeStar} />
        </div>
      </div>
    )
  }
}

MovieCard.contextType = TabContext
