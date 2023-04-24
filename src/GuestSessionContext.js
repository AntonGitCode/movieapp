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
    isLocalStorageSupported: false,
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
    this.setState({ isLocalStorageSupported: Boolean(window.localStorage) })
    await this.sessionId
      .getSession()
      .then(({ guest_session_id }) => {
        this.setState({ guestSessionId: guest_session_id })
      })
      .catch(this.onError)
    await this.genresArray
      .getGenres()
      .then(({ genres }) => {
        this.setState({ genres, loading: false })
      })
      .catch(this.onError)
  }

  render() {
    const { loading, error, guestSessionId, genres, isLocalStorageSupported } = this.state
    return (
      <>
        {error && <ErrorIndicator error={error} />}
        {loading && <Spin className="spinner" size="large" />}
        {!loading && !error && (
          <GuestSessionContext.Provider value={{ guestSessionId, genres, isLocalStorageSupported }}>
            {this.props.children}
          </GuestSessionContext.Provider>
        )}
      </>
    )
  }
}
