import './App.css'
import React, { Component } from 'react'
import 'antd/dist/reset.css'
import apiMovies from '../ApiMovies/ApiMovies'
import MovieCardsList from '../MovieCardsList/MovieCardsList'
import { Spin } from 'antd'
import ErrorIndicator from '../error-indicator'

// debounce = (...args) => {
//   let timer
//   let argValue = args
//   return function () {
//     if (timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//       timer = null
//       this.searchMovies.apply(this, argValue)
//     }, 500)
//   }
// }

// function debounceFunc(callback, delay) {
//   let timeout
//   return fun9ction () {
//     clearTimeout(timeout)
//     timeout = setTimeout(callback, delay)
//   }
// }

// optimizedFn = () => useCallback(this.debounce(this.searchMovies), [])

export default class App extends Component {
  state = {
    movies: null,
    loading: true,
    currentPage: 1,
    totalItems: null,
    inputValue: '',
  }

  componentDidMount() {
    this.updateMovies(this.state.inputValue, this.state.currentPage)
  }

  apiMovies = new apiMovies()

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateMovies = (value, page) => {
    this.apiMovies
      .getAllMovies(value, page)
      .then(({ returnArr, totalItems }) => {
        this.setState({ movies: returnArr, totalItems: totalItems })
        this.setState({ loading: false, error: false })
      })
      .catch(this.onError)
  }

  searchMovies = (value) => {
    if (value.charAt(0) === ' ') {
      this.setState({ inputValue: '' })
      return
    }
    this.setState({ currentPage: 1 })
    if (value !== '') {
      this.setState({ inputValue: value })
      this.updateMovies(value, 1)
    } else this.setState({ inputValue: '', movies: [] })
  }

  onChangePage = (page) => {
    this.setState({ currentPage: page })
    this.updateMovies(this.state.inputValue, page)
  }

  render() {
    const { movies, loading, error, currentPage, inputValue, totalItems } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErrorIndicator error={error} /> : null
    const spinner = loading ? <Spin className="spinner" size="large" /> : null
    const content = hasData ? (
      <MovieCardsList
        movies={movies}
        searchMovies={this.searchMovies}
        currentPage={currentPage}
        onChangePage={this.onChangePage}
        inputValue={inputValue}
        totalItems={totalItems}
      />
    ) : null
    return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    )
  }
}