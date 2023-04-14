import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Content.css'
import { Alert, Pagination } from 'antd'

export default class Content extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputSearch !== this.props.inputSearch || prevProps.currentPage !== this.props.currentPage) {
      this.props.updateMovies()
    }
  }

  render() {
    const { inputSearch, currentPage, totalItems, debounceOnChange, onChangePage, movies, activeTab, ratedMovies } =
      this.props

    let moviesArr = [...movies]
    let ratedMoviesArr = [...ratedMovies]

    return (
      <>
        <div className="wrapper">
          {activeTab === 0 && (
            <input
              type="text"
              className="search"
              placeholder="Type to search..."
              onChange={(e) => debounceOnChange(e.target.value)}
              value={inputSearch}
              autoFocus
            />
          )}

          {activeTab === 0 && !movies.length && inputSearch && (
            <Alert className="info-message" type="info" message="Oops" description="Can't find any movie" banner />
          )}
          {activeTab === 1 && !ratedMovies.length && (
            <Alert
              className="info-message"
              type="info"
              message="Storage for rated movies"
              description="Here you can save your rated movies"
              banner
            />
          )}

          {activeTab === 0 && (
            <div className="container">
              {moviesArr.map((movie) => {
                const { id } = movie
                return <MovieCard movie={movie} key={id} />
              })}
            </div>
          )}

          {activeTab === 1 && (
            <div className="container">
              {ratedMoviesArr.map((movie) => {
                const { id } = movie
                return <MovieCard movie={movie} key={id} />
              })}
            </div>
          )}

          {activeTab === 0 && movies.length ? (
            <Pagination
              defaultCurrent={1}
              className="pagination"
              current={currentPage}
              onChange={(page) => onChangePage(page)}
              total={totalItems}
            />
          ) : null}
        </div>
      </>
    )
  }
}
