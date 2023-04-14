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
    const { inputSearch, currentPage, setMovies, ratedMovies } = this.context

    this.apiMovies
      .getAllMovies(inputSearch, currentPage)
      .then(({ returnArr, totalItems }) => {
        returnArr.forEach((item) => {
          const matchingItem = ratedMovies.find((element) => element.id === item.id)
          if (matchingItem) {
            item['rated'] = matchingItem.rated
          }
        })

        setMovies(returnArr, ratedMovies)
        this.setState({ totalItems: totalItems, loading: false, error: false })
        // this.setState({ movies: returnArr, totalItems: totalItems })
        // this.setState({ loading: false, error: false })
      })
      .catch(this.onError)
  }

  render() {
    let { inputSearch, currentPage, debounceOnChange, onChangePage, movies } = this.context
    const { loading, error, totalItems } = this.state

    const hasData = !(loading || error)
    const errorMessage = error ? <ErrorIndicator error={error} /> : null
    const spinner = loading ? <Spin className="spinner" size="large" /> : null
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
