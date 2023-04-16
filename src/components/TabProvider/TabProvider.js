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
    guestSessionId: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputSearch !== this.state.inputSearch && this.state.currentPage > 1)
      this.setState({ currentPage: 1 })
    if (prevProps.guestSessionId !== this.props.guestSessionId)
      this.setState({ guestSessionId: this.props.guestSessionId })
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

  debounceOnChange = debounce((value) => this.searchMovies(value), 400)

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
    const { activeTab, inputSearch, currentPage, movies, ratedMovies, currentPageRated, guestSessionId } = this.state
    const { children } = this.props

    const contextValue = {
      activeTab,
      setActiveTab: this.setActiveTab,
      inputSearch,
      debounceOnChange: this.debounceOnChange,
      currentPage,
      onChangePage: this.onChangePage,
      movies,
      setMovies: this.setMovies,
      ratedMovies,
      currentPageRated,
      onChangePageRated: this.onChangePageRated,
      guestSessionId,
    }

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  }
}

export default TabProvider
