import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Content.css'
import { Alert, Pagination } from 'antd'

function Content({ movies, searchMovies, currentPage, onChangePage, inputValue, totalItems }) {
  if (!movies) return null
  let moviesArr = [...movies]

  const movieCardList = moviesArr.map((movie) => {
    const { id } = movie
    return <MovieCard movie={movie} key={id} />
  })

  return (
    <>
      <div className="wrapper">
        <input
          type="text"
          className="search"
          placeholder="Type to search..."
          onChange={(e) => searchMovies(e.target.value)}
          value={inputValue}
          autoFocus
        />

        {!moviesArr.length && inputValue && (
          <Alert className="info-message" type="info" message="Oops" description="Can't find any movie" banner />
        )}

        <div className="container">{movieCardList}</div>

        {moviesArr.length ? (
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

export default Content
