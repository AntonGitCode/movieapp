import React from 'react'
import ErrorIndicator from './components/error-indicator'
import { Spin } from 'antd'
import GetSession from './api/GetSession'
import GetGenres from './api/GetGenres'

export const GuestSessionContext = React.createContext()

export class GuestSessionProvider extends React.Component {
  _genreUrl = '/genre/movie/list'

  state = {
    guestSessionId: null,
    genres: null,
    error: false,
    loading: true,
  }

  sessionId = new GetSession()
  genresArray = new GetGenres()

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  async componentDidMount() {
    await this.sessionId
      .getSession()
      .then(({ guest_session_id }) => {
        this.setState({ guestSessionId: guest_session_id })
      })
      .catch(this.onError)
    await this.genresArray
      .getGenres()
      .then(({ genres }) => this.setState({ genres, loading: false }))
      .catch(this.onError)
  }

  render() {
    const { loading, error } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErrorIndicator error={error} /> : null
    const spinner = loading ? <Spin className="spinner" size="large" /> : null

    return (
      <>
        {errorMessage}
        {spinner}
        {hasData ? (
          <GuestSessionContext.Provider value={this.state}>{this.props.children}</GuestSessionContext.Provider>
        ) : null}
      </>
    )
  }
}
