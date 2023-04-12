import React, { Component } from 'react'
import { TabContext } from '../TabContext/TabContext'
import { debounce } from 'lodash'

class TabProvider extends Component {
  state = {
    activeTab: 0,
    inputSearch: '',
    currentPage: 1,
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.currentPage !== this.state.currentPage) {
    // this.updateMovies(this.state.inputValue, this.state.currentPage)
    // }
    console.log('==== TabProvide === did UPDATE == TabProvider STATE=', this.state)
    if (prevState.inputSearch !== this.state.inputSearch && this.state.currentPage > 1)
      this.setState({ currentPage: 1 })
    // if (prevState.inputSearch !== this.state.inputSearch) this.updateMovies()
  }

  componentDidMount() {
    console.log('===== TabProvider === did MOUNT ===\n *')
  }

  setActiveTab = (index) => {
    console.log('setActive Tab to', index)
    this.setState({ activeTab: index })
  }

  //////////////////////////////////
  onChangePage = (page) => {
    console.log('setActive PAGE to', page)
    this.setState({ currentPage: page })
  }
  /////////////////////////////

  debounceOnChange = debounce((value) => {
    console.log('----- in debounce --value--', value)
    this.searchMovies(value)
  }, 400)

  searchMovies = (value) => {
    console.log('== TabProvider == searchMovies(value) value = ', value)
    if (value.charAt(0) === ' ') {
      this.setState({ inputSearch: '' })
      return
    }
    if (value !== '') this.setState({ inputSearch: value })
    // else this.setState({ inputSearch: '', movies: [] })
    else this.setState({ inputSearch: '' })
  }
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  // apiMovies = new apiMovies()

  // updateMovies = () => {
  //   const { inputSearch, currentPage } = this.state
  //   console.log('==== Tab Provider === updateMovies () ===')
  //   console.log('==== Tab Provider === updateMovies (inputSearch, currentPAge) ===', inputSearch, currentPage)
  //   // this.apiMovies
  //   this.getAllMovies(inputSearch, currentPage)
  //     .then(({ returnArr, totalItems }) => {
  //       this.setState({ movies: returnArr, totalItems: totalItems })
  //       this.setState({ loading: false, error: false })
  //     })
  //     .catch(this.onError)
  // }

  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////

  render() {
    const { activeTab, inputSearch, currentPage } = this.state
    const { children } = this.props

    const contextValue = {
      activeTab,
      setActiveTab: this.setActiveTab,
      inputSearch,
      debounceOnChange: this.debounceOnChange,
      currentPage,
      onChangePage: this.onChangePage,
    }

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  }
}

export default TabProvider
