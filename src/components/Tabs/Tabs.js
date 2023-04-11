import React, { useContext } from 'react'
import { TabContext } from '../TabContext/TabContext'
import './Tabs.css'

const Tabs = ({ children }) => {
  const tabContext = useContext(TabContext)

  const { activeTab } = tabContext
  const setActiveTab = tabContext.setActiveTab
  // const { activeTab, setActiveTab } = useContext(TabContext)
  // const currentTab = children[activeTab]

  return (
    <div>
      <div className="tabs-container">
        {React.Children.map(children, (child, index) => (
          <button className="tabs" onClick={() => setActiveTab(index)}>
            {child.props.label}
          </button>
        ))}
      </div>
      <div>{children[activeTab]}</div>
      {/* {React.cloneElement(currentTab, { activeTab })} */}
      {/* <div>{children[activeTab]}</div> */}
    </div>
  )
}

export default Tabs
