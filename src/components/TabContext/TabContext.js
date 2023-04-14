import React from 'react'

export const TabContext = React.createContext({
  activeTab: 0,
  setActiveTab: () => {},
  inputSearch: '',
  currentPage: 1,
  onChangePage: () => {},
  debounceOnChange: () => {},
  movies: [],
  setMovies: () => {},
  ratedMovies: [],
})

// export const TabProvider = TabContext.Provider
// export const TabConsumer = TabContext.Consumer
