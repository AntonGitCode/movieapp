import React, { Component } from 'react'
import { TabContext } from '../TabContext/TabContext'
import { debounce } from 'lodash'

class TabProvider extends Component {
  state = {
    activeTab: 0,
    inputSearch: '',
    currentPage: 1,
    movies: [],
    ratedMovies: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputSearch !== this.state.inputSearch && this.state.currentPage > 1)
      this.setState({ currentPage: 1 })
  }

  setActiveTab = (index) => {
    this.setState({ activeTab: index })
  }

  onChangePage = (page) => {
    this.setState({ currentPage: page })
  }

  onChangePageRated = (page) => {
    this.setState({ currentPageRated: page })
  }

  debounceOnChange = debounce((value) => {
    this.searchMovies(value)
  }, 400)

  handleChange = (e) => {
    this.debounceOnChange(e.target.value)
  }

  searchMovies = (value) => {
    if (value.charAt(0) === ' ') {
      this.setState({ inputSearch: '' })
      return
    }
    if (value !== '') this.setState({ inputSearch: value })
    else this.setState({ inputSearch: '' })
  }

  setMovies = (newMovies, newRatedMovies) => {
    this.setState({ movies: newMovies, ratedMovies: newRatedMovies })
  }

  render() {
    const { activeTab, inputSearch, currentPage, movies, currentPageRated, ratedMovies } = this.state

    const { children } = this.props

    const contextValue = {
      activeTab,
      setActiveTab: this.setActiveTab,
      inputSearch,
      handleChange: this.handleChange,
      currentPage,
      onChangePage: this.onChangePage,
      movies,
      ratedMovies,
      setMovies: this.setMovies,
      currentPageRated,
      onChangePageRated: this.onChangePageRated,
    }

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  }
}

export default TabProvider
