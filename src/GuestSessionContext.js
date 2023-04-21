import React from 'react'
import ErrorIndicator from './components/error-indicator'
import { Spin } from 'antd'

const BASE_URL = 'https://api.themoviedb.org/3'

export const GuestSessionContext = React.createContext()

export class GuestSessionProvider extends React.Component {
  _genreUrl = '/genre/movie/list'

  state = {
    guestSessionId: null,
    genres: null,
    error: false,
    loading: true,
  }

  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Couldnt get SESSION while fetching: ${url}, recieved ${res.status}`)
    }
    return await res.json()
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  async getSession() {
    try {
      const sessionUrl = new URL(`${BASE_URL}/authentication/guest_session/new`)
      sessionUrl.searchParams.set('api_key', 'a0ebd979d0247d439d1914491e74f506')
      const session = await this.getResource(sessionUrl.toString())
      if (!session || !session.success) throw new Error('Failed to get session')

      this.setState({ guestSessionId: session.guest_session_id })
    } catch (error) {
      this.onError(error)
    }
  }

  async getGenres() {
    try {
      const genreUrl = new URL(`${BASE_URL}${this._genreUrl}`)
      genreUrl.searchParams.set('api_key', 'a0ebd979d0247d439d1914491e74f506')
      genreUrl.searchParams.set('language', 'en-US')
      const genres = await this.getResource(genreUrl.toString())
      if (!genres) throw new Error('Failed to get genres')
      this.setState({ genres: genres.genres, loading: false })
    } catch (error) {
      this.onError(error)
    }
  }

  async componentDidMount() {
    await this.getSession()
    await this.getGenres()
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
