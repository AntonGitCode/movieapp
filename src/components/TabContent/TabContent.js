import './TabContent.css'
import React, { Component } from 'react'
import 'antd/dist/reset.css'
import ApiMovies from '../ApiMovies/ApiMovies'
import Content from '../Content/Content'
import { Spin } from 'antd'
import ErrorIndicator from '../error-indicator'
import { TabContext } from '../TabContext/TabContext'

export default class TabContent extends Component {
  state = {
    totalItems: null,
    loading: true,
    error: false,
  }

  apiMovies = new ApiMovies()

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
    const { inputSearch, currentPage, setMovies, ratedMovies, guestSessionId } = this.context

    const headers = { Authorization: `Bearer ${guestSessionId}` }
    this.apiMovies
      .getAllMovies(inputSearch, currentPage, headers)
      .then(({ returnArr, totalItems, genres }) => {
        returnArr.forEach((item) => {
          const matchingItem = ratedMovies.find((element) => element.id === item.id)
          if (matchingItem) {
            item['rated'] = matchingItem.rated
          }
        })
        setMovies(returnArr, ratedMovies, genres)
        this.setState({ totalItems: totalItems, loading: false, error: false })
      })
      .catch(this.onError)
  }

  render() {
    let { inputSearch, currentPage } = this.context
    const { loading, error, totalItems } = this.state

    const hasData = !(loading || error)
    const errorMessage = error ? <ErrorIndicator error={error} /> : null
    const spinner = loading ? <Spin className="spinner" size="large" /> : null
    return (
      <TabContext.Consumer>
        {() => (
          <div>
            {errorMessage}
            {spinner}
            {hasData ? (
              <Content
                currentPage={currentPage}
                inputSearch={inputSearch}
                totalItems={totalItems}
                updateMovies={this.updateMovies}
              ></Content>
            ) : null}
          </div>
        )}
      </TabContext.Consumer>
    )
  }
}

TabContent.contextType = TabContext
