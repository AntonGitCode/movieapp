import React, { Component } from 'react'
import { TabContext } from '../TabContext/TabContext'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'

class TabProvider extends Component {
  state = {
    activeTab: 0,
    inputSearch: '',
    currentPage: 1,
    movies: [],
    // ratedMovies: [],
    guestSessionId: null,
    genres: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputSearch !== this.state.inputSearch && this.state.currentPage > 1)
      this.setState({ currentPage: 1 })
    if (prevProps.guestSessionId !== this.props.guestSessionId)
      this.setState({ guestSessionId: this.props.guestSessionId })
    if (prevProps.genres === null && this.props.genres) this.setState({ genres: this.props.genres })
  }

  componentDidMount() {
    console.log('****** did MOUNT TabProvider****', localStorage)
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

  handleChange = (e) => {
    const value = e.target.value
    this.setState({ inputSearch: value }, () => {
      this.debounceOnChange(this.state.inputSearch)
    })
  }

  searchMovies = (value) => {
    if (value.charAt(0) === ' ') {
      this.setState({ inputSearch: '' })
      return
    }
    if (value !== '') this.setState({ inputSearch: value })
    else this.setState({ inputSearch: '' })
  }

  setMovies = (newMovies, genres = this.props.genres) => {
    console.log('--- TabProvider - setMovies -- newMovies, genres', newMovies, genres)
    this.setState({ movies: newMovies, genres: genres })
  }

  render() {
    const { activeTab, inputSearch, currentPage, movies, currentPageRated, guestSessionId, genres } = this.state
    const { children } = this.props

    const contextValue = {
      activeTab,
      setActiveTab: this.setActiveTab,
      inputSearch,
      handleChange: this.handleChange,
      currentPage,
      onChangePage: this.onChangePage,
      movies,
      setMovies: this.setMovies,
      currentPageRated,
      onChangePageRated: this.onChangePageRated,
      guestSessionId,
      genres,
    }

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  }
}

TabProvider.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object),
}

export default TabProvider
