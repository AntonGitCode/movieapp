import React, { Component } from 'react'
import { TabContext } from '../TabContext/TabContext'

class TabProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { activeTab: 0, inputSearch: '' }
    this.setActiveTab = this.setActiveTab.bind(this)
  }

  setActiveTab(index) {
    this.setState({ activeTab: index })
  }

  render() {
    const { activeTab, inputSearch } = this.state
    const { children } = this.props

    const contextValue = {
      activeTab,
      inputSearch,
      setActiveTab: this.setActiveTab,
    }

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  }
}

export default TabProvider
