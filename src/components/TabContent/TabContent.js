import './TabContent.css'
import React, { useContext, useState, useEffect } from 'react'
import 'antd/dist/reset.css'
import ApiMovies from '../../api/ApiMovies/ApiMovies'
import Content from '../Content/Content'
import { Spin } from 'antd'
import ErrorIndicator from '../error-indicator'
import { TabContext } from '../TabContext/TabContext'
import { GuestSessionContext } from '../../GuestSessionContext'

const TabContent = () => {
  const { inputSearch, currentPage, setMovies } = useContext(TabContext)
  const { guestSessionId } = useContext(GuestSessionContext)

  const [state, setState] = useState({
    totalItems: null,
    loading: true,
    error: false,
  })

  const apiMovies = new ApiMovies()

  const onError = (err) => {
    setState({ error: true, loading: false })
  }

  const updateMovies = () => {
    const headers = { Authorization: `Bearer ${guestSessionId}` }
    const ratedMoviesLS = JSON.parse(localStorage.getItem('ratedMovies'))

    apiMovies
      .getAllMovies(inputSearch, currentPage, headers)
      .then(({ returnArr, totalItems }) => {
        if (ratedMoviesLS) {
          if (ratedMoviesLS.length > 0 && returnArr.length > 0) {
            returnArr.forEach((item) => {
              const matchingItem = ratedMoviesLS.find((element) => element.id === item.id)
              if (matchingItem) item['rated'] = matchingItem.rated
            })
          }
        }
        setMovies(returnArr)
        setState({ totalItems: totalItems, loading: false, error: false })
      })
      .catch(onError)
  }

  const { loading, error, totalItems } = state

  useEffect(() => {
    updateMovies()
  }, [])

  const hasData = !(loading || error)
  const errorMessage = error ? <ErrorIndicator error={error} /> : null
  const spinner = loading ? <Spin className="spinner" size="large" /> : null

  return (
    <div>
      {errorMessage}
      {spinner}
      {hasData ? (
        <Content
          currentPage={currentPage}
          inputSearch={inputSearch}
          totalItems={totalItems}
          updateMovies={updateMovies}
        ></Content>
      ) : null}
    </div>
  )
}

export default TabContent
