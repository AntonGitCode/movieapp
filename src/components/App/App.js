import './App.css'
import React, { Component } from 'react'
import 'antd/dist/reset.css'
import apiMovies from '../ApiMovies/ApiMovies'
import Content from '../Content/Content'
import { Spin } from 'antd'
import ErrorIndicator from '../error-indicator'
import { TabContext } from '../TabContext/TabContext'

export default class App extends Component {
  state = {
    movies: [],
    totalItems: null,
    loading: true,
    error: false,
  }

  apiMovies = new apiMovies()

  componentDidMount() {
    this.updateMovies()
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateMovies = () => {
    const { inputSearch, currentPage } = this.context

    this.apiMovies
      .getAllMovies(inputSearch, currentPage)
      .then(({ returnArr, totalItems }) => {
        this.setState({ movies: returnArr, totalItems: totalItems })
        this.setState({ loading: false, error: false })
      })
      .catch(this.onError)
  }

  render() {
    let { inputSearch, currentPage, debounceOnChange, onChangePage } = this.context
    const { movies, loading, error, totalItems } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErrorIndicator error={error} /> : null
    const spinner = loading ? <Spin className="spinner" size="large" /> : null
    console.log(this.state.movies)
    return (
      <TabContext.Consumer>
        {({ activeTab }) => (
          <div>
            {activeTab === 0 && (
              <>
                {errorMessage}
                {spinner}
                {hasData ? (
                  <Content
                    movies={movies}
                    debounceOnChange={debounceOnChange}
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                    inputSearch={inputSearch}
                    totalItems={totalItems}
                    updateMovies={this.updateMovies}
                  ></Content>
                ) : null}
              </>
            )}
          </div>
        )}
      </TabContext.Consumer>
    )
  }
}

App.contextType = TabContext
