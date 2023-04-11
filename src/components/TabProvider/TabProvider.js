import React, { Component } from 'react'
// import { TabProvider } from '../TabContext/TabContext'
// import TabContext from '../TabContext'
import { TabContext } from '../TabContext/TabContext'

class TabProvider extends Component {
  // class MyTabProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { activeTab: 0 }
    this.setActiveTab = this.setActiveTab.bind(this)
  }

  setActiveTab(index) {
    this.setState({ activeTab: index })
  }

  render() {
    const { activeTab } = this.state
    const { children } = this.props

    const contextValue = {
      activeTab,
      setActiveTab: this.setActiveTab,
    }

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
    // return (
    //   <TabProvider value={{ activeTab: this.state.activeTab, setActiveTab: this.setActiveTab }}>
    //     {this.props.children}
    //   </TabProvider>
    // )
  }
}

export default TabProvider
