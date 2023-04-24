import React from 'react'

export const TabContext = React.createContext({
  activeTab: 0,
  setActiveTab: () => {},
  inputSearch: '',
  currentPage: 1,
  currentPageRated: 1,
  onChangePage: () => {},
  handleChange: () => {},
  movies: [],
  setMovies: () => {},
  onChangePageRated: () => {},
  ratedMovies: [],
})
