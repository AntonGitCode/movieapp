import React from 'react'

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
      throw new Error(`Couldnt get SESSION while fetching ${url}, recieved ${res.status}`)
    }
    return await res.json()
  }

  async getSession() {
    const session = await this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=a0ebd979d0247d439d1914491e74f506`
    ).catch((err) => {
      console.error('Status:', err.status, 'Error:', err)
      this.setState({ error: true })
    })

    if (session.success) {
      // Get the genres if they haven't been cached yet
      if (this.state.genres === null) {
        const genres = await this.getResource(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=a0ebd979d0247d439d1914491e74f506&language=en-US'
        ).catch((err) => {
          console.error('Status:', err.status, 'Error:', err)
        })
        console.log('******* GuEST SESSION ***** genres ***', genres)
        this.setState({ genres: genres.genres })
      }

      this.setState({
        guestSessionId: session.guest_session_id,
        loading: false,
      })
    } else {
      this.setState({ error: true })
    }
  }

  componentDidMount() {
    this.getSession()
  }

  render() {
    return <GuestSessionContext.Provider value={this.state}>{this.props.children}</GuestSessionContext.Provider>
  }
}
