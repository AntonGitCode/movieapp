import React, { Component } from 'react'
import TabProvider from '../TabProvider'
import Tabs from '../Tabs'
import Tab from '../Tab'
import App from '../App'
import { GuestSessionContext } from '../../GuestSessionContext'

export default class GeneralApp extends Component {
  render() {
    const { guestSessionId, genres } = this.context
    return (
      <TabProvider guestSessionId={guestSessionId} genres={genres}>
        <Tabs>
          <Tab label="Search">
            <App />
          </Tab>
          <Tab label="Rated">
            <App />
          </Tab>
        </Tabs>
      </TabProvider>
    )
  }
}

GeneralApp.contextType = GuestSessionContext
