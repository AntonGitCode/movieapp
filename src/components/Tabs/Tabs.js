import React, { useContext } from 'react'
import { TabContext } from '../TabContext/TabContext'
import './Tabs.css'

const Tabs = ({ children }) => {
  const tabContext = useContext(TabContext)

  const { activeTab } = tabContext
  const setActiveTab = tabContext.setActiveTab

  return (
    <div className="main-container">
      <div className="tabs-container">
        <div className="tabs-wrapper">
          {React.Children.map(children, (child, index) => (
            <button className={`tabs ${activeTab === index ? 'active' : ''}`} onClick={() => setActiveTab(index)}>
              {child.props.label}
            </button>
          ))}
        </div>
      </div>
      <div>{children[activeTab]}</div>
    </div>
  )
}

export default Tabs
