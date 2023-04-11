import React from 'react'

export const TabContext = React.createContext({
  activeTab: 0,
  setActiveTab: () => {},
})

// export const TabProvider = TabContext.Provider
// export const TabConsumer = TabContext.Consumer
