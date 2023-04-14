import React, { Component } from 'react'
import 'antd/dist/reset.css'
import './MovieCard.css'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Rate } from 'antd'
import { TabContext } from '../TabContext/TabContext'

export default class MovieCard extends Component {
  onChangeStar = (number) => {
    const { movies, ratedMovies, setMovies } = this.context
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

    console.log('сформировался обн эл для Rated', newRatedMovie)
    console.log(' if (ratedMovies.length ', ratedMovies.length, '>0')
    if (ratedMovies.length > 0) {
      console.log('да перебираем ratedMovies из контекста ', ratedMovies)
      let newRatedMovies = [...ratedMovies]
      console.log('проверка CurrnetMovieId = ', currentMovieId)
      let indx = newRatedMovies.findIndex((obj) => obj.id === currentMovieId)
      console.log('есть ли уже в Rated этот фильм ', indx)

      if (indx >= 0) {
        newRatedMovies[indx]['rated'] = number
        console.log('===== SET MOVIES (New Movies', newMovies, ', newRatedMovies ', newRatedMovies, ')')
        setMovies(newMovies, newRatedMovies)
      } else {
        console.log('в рейтет фильма не было и надо его добавить')
        newRatedMovies = [...newRatedMovies, ...newRatedMovie]
        console.log('подготовили массив для Rated: ', newRatedMovies)
        console.log('===== SET MOVIES (New Movies', newMovies, ', newRatedMovies ', newRatedMovies, ')')
        setMovies(newMovies, newRatedMovies)
      }
    } else {
      console.log('====== избранное пусто было')
      newRatedMovies[0] = newRatedMovie[0]
      console.log('===== SET MOVIES ====', newRatedMovies)
      setMovies(newMovies, newRatedMovies)
    }
  }

  render() {
    const { movie } = this.props
    const { movies, activeTab } = this.context

    let ratedStars = 0
    if (activeTab === 0) {
      movies.forEach((item) => {
        if (item.id === movie.id) ratedStars = item['rated']
        return item
      })
    }
    if (activeTab === 1) ratedStars = movie['rated']

    const { title, overview, release_date, poster_path, vote_average } = movie
    const posterUrl = 'https://image.tmdb.org/t/p/w185/' + poster_path
    const releaseDate = format(new Date(release_date), 'MMMM dd, yyyy', { locale: enGB })
    let circleColorRate = ''
    if (vote_average <= 3) circleColorRate = 'border-bad'
    if (vote_average > 3 && vote_average <= 5) circleColorRate = 'border-good'
    if (vote_average > 5 && vote_average <= 7) circleColorRate = 'border-best'
    if (vote_average > 7) circleColorRate = 'border-genius'

    return (
      <>
        {(activeTab === 0 || (activeTab === 1 && movie['rated'] > 0)) && (
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
        )}
      </>
    )
  }
}

MovieCard.contextType = TabContext
