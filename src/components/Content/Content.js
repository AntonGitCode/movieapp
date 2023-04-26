import React, { Component } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import PropTypes from 'prop-types'
import { Alert, Pagination } from 'antd'

import ErrorIndicator from '../error-indicator'
import MovieCard from '../MovieCard/MovieCard'
import { TabContext } from '../TabContext/TabContext'

import './Content.css'

export default class Content extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.inputSearch !== this.props.inputSearch || prevProps.currentPage !== this.props.currentPage) {
      this.props.updateMovies()
    }
  }

  render() {
    const { inputSearch, currentPage, totalItems, isLocalStorageSupported } = this.props
    const { handleChange, onChangePage, movies, activeTab, currentPageRated, onChangePageRated, ratedMovies } =
      this.context

    let moviesArr = [...movies]

    let ratedMoviesArr = isLocalStorageSupported ? JSON.parse(localStorage.getItem('ratedMovies')) : [...ratedMovies]

    const isEmptyMovies = activeTab === 0 && !movies.length && inputSearch
    const isEmptyRatedMovies = activeTab === 1 && ratedMoviesArr.length > 0

    return (
      <ErrorBoundary fallbackRender={({ error }) => <ErrorIndicator error={error} />}>
        <div className="wrapper">
          {activeTab === 0 && (
            <input type="text" className="search" placeholder="Type to search..." onChange={handleChange} autoFocus />
          )}

          {isEmptyMovies && (
            <Alert className="info-message" type="info" message="Oops" description="Can't find any movie" banner />
          )}

          {activeTab === 1 && (!ratedMoviesArr || (Array.isArray(ratedMoviesArr) && ratedMoviesArr.length === 0)) && (
            <Alert
              className="info-message"
              type="info"
              message="This is place for your rated movies"
              description="Here you can save your rated movies. Just mark some movies with stars!"
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

          {activeTab === 1 && ratedMoviesArr && (
            <div className="container">
              {ratedMoviesArr.map((movie) => {
                const { id } = movie
                return <MovieCard movie={movie} key={id} />
              })}
            </div>
          )}

          {activeTab === 0 && movies.length > 0 && (
            <Pagination
              defaultCurrent={1}
              className="pagination"
              current={currentPage}
              onChange={(page) => onChangePage(page)}
              total={totalItems}
            />
          )}

          {isEmptyRatedMovies && (
            <Pagination
              defaultCurrent={1}
              className="pagination"
              currentPageRated={currentPageRated}
              onChangePageRated={(page) => onChangePageRated(page)}
              total={ratedMoviesArr.length}
            />
          )}
        </div>
      </ErrorBoundary>
    )
  }
}

Content.contextType = TabContext

Content.propTypes = {
  currentPage: PropTypes.number.isRequired,
  inputSearch: PropTypes.string.isRequired,
  totalItems: PropTypes.number.isRequired,
  updateMovies: PropTypes.func.isRequired,
}

Content.defaultProps = {
  currentPage: 1,
  inputSearch: '',
  updateMovies: () => {},
}
