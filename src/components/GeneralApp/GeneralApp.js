import React, { Component } from 'react'
import TabProvider from '../TabProvider'
import Tabs from '../Tabs'
import Tab from '../Tab'
import App from '../App'

export default class GeneralApp extends Component {
  render() {
    return (
      <TabProvider>
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
