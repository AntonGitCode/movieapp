import React, { Component } from 'react'
import TabProvider from '../TabProvider'
import Tabs from '../Tabs'
import Tab from '../Tab'
import TabContent from '../TabContent'
import { GuestSessionContext } from '../../GuestSessionContext'

export default class App extends Component {
  render() {
    const { guestSessionId } = this.context
    return (
      <TabProvider guestSessionId={guestSessionId}>
        <Tabs>
          <Tab label="Search">
            <TabContent />
          </Tab>
          <Tab label="Rated">
            <TabContent />
          </Tab>
        </Tabs>
      </TabProvider>
    )
  }
}

App.contextType = GuestSessionContext
