import React from 'react'

export const TabContext = React.createContext({
  activeTab: 0,
  setActiveTab: () => {},
  inputSearch: '',
  currentPage: 1,
  currentPageRated: 1,
  onChangePage: () => {},
  debounceOnChange: () => {},
  movies: [],
  ratedMovies: [],
  setMovies: () => {},
  onChangePageRated: () => {},
  guestSessionId: null,
})
