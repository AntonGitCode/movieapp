import React from 'react'
import ErrorIndicator from './components/error-indicator'
import { Spin } from 'antd'

export const GuestSessionContext = React.createContext()

export class GuestSessionProvider extends React.Component {
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
    const session = await this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=a0ebd979d0247d439d1914491e74f506`
    ).catch(this.onError)
    if (session) {
      if (session.success) {
        if (this.state.genres === null) {
          const genres = await this.getResource(
            'https://api.themoviedb.org/3/genre/movie/list?api_key=a0ebd979d0247d439d1914491e74f506&language=en-US'
          ).catch(this.onError)
          if (genres) this.setState({ genres: genres.genres })
          else this.onError()
        }
        this.setState({
          guestSessionId: session.guest_session_id,
          loading: false,
        })
      } else this.onError()
    } else this.onError()
  }

  componentDidMount() {
    this.getSession()
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
