import React, { Component } from 'react'
import { TabContext } from '../TabContext/TabContext'

class TabProvider extends Component {
  state = {
    activeTab: 0,
    inputSearch: '',
    currentPage: 1,
  }

  setActiveTab = (index) => {
    console.log('setActiveTab to', index)
    this.setState({ activeTab: index })
  }

  //////////////////////////////////
  onChangePage = (page) => {
    this.setState({ currentPage: page })
  }

  /////////////////////////////

  render() {
    const { activeTab, inputSearch } = this.state
    const { children } = this.props

    const contextValue = {
      activeTab,
      setActiveTab: this.setActiveTab,
      inputSearch, ///////////////////////////////////////
    }

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  }
}

export default TabProvider
