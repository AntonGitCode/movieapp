import React, { Component } from 'react'
import { Alert } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'

import TabProvider from '../TabProvider'
import Tabs from '../Tabs'
import Tab from '../Tab'
import TabContent from '../TabContent'
import { GuestSessionContext } from '../../GuestSessionContext'
import ErrorIndicator from '../error-indicator'

export default class App extends Component {
  render() {
    const { isLocalStorageSupported } = this.context
    return (
      <ErrorBoundary fallbackRender={({ error }) => <ErrorIndicator error={error} />}>
        <TabProvider>
          <Tabs>
            <Tab label="Search">
              <TabContent />
            </Tab>
            <Tab label="Rated">
              <TabContent />
              {!isLocalStorageSupported && (
                <Alert
                  className="error-indicator"
                  type="info"
                  message=""
                  description="It's just reminder: your Rated movies will dissapear after reloading page"
                  banner
                />
              )}
            </Tab>
          </Tabs>
        </TabProvider>
      </ErrorBoundary>
    )
  }
}

App.contextType = GuestSessionContext
