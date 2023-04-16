import React from 'react'

export const GuestSessionContext = React.createContext()

export class GuestSessionProvider extends React.Component {
  state = {
    guestSessionId: null,
  }

  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Couldnt get SESSION while fetching ${url}, recieved ${res.status}`)
    }
    return await res.json()
  }

  async getSession() {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=a0ebd979d0247d439d1914491e74f506`
    ).catch((err) => {
      console.error(' Status: ', err.status, ' Error:', err)
    })
    this.setState({ guestSessionId: res.guest_session_id })
  }

  componentDidMount() {
    this.getSession()
  }

  render() {
    return <GuestSessionContext.Provider value={this.state}>{this.props.children}</GuestSessionContext.Provider>
  }
}
