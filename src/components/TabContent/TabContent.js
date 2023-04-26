import React, { useContext, useState, useEffect } from 'react'
import { Spin } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'

import ApiMovies from '../../api/database/ApiMovies/ApiMovies'
import Content from '../Content/Content'
import ErrorIndicator from '../error-indicator'
import { TabContext } from '../TabContext/TabContext'
import { GuestSessionContext } from '../../GuestSessionContext'

import './TabContent.css'
import 'antd/dist/reset.css'

const TabContent = () => {
  const { inputSearch, currentPage, setMovies, ratedMovies } = useContext(TabContext)
  const { guestSessionId, isLocalStorageSupported } = useContext(GuestSessionContext)

  const [state, setState] = useState({
    totalItems: null,
    loading: true,
    error: false,
  })

  const apiMovies = new ApiMovies()

  const onError = () => {
    setState({ error: true, loading: false })
  }

  const updateMovies = () => {
    const headers = { Authorization: `Bearer ${guestSessionId}` }
    const ratedMoviesLS = isLocalStorageSupported ? JSON.parse(localStorage.getItem('ratedMovies')) : [...ratedMovies]

    apiMovies
      .getAllMovies(inputSearch, currentPage, headers)
      .then(({ returnArr, totalItems }) => {
        console.log('Total Items:', totalItems)
        if (ratedMoviesLS) {
          if (ratedMoviesLS.length > 0 && returnArr.length > 0) {
            returnArr.forEach((item) => {
              const matchingItem = ratedMoviesLS.find((element) => element.id === item.id)
              if (matchingItem) item['rated'] = matchingItem.rated
            })
          }
        }
        setMovies(returnArr, ratedMoviesLS)
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
    <ErrorBoundary fallbackRender={({ error }) => <ErrorIndicator error={error} />}>
      <div>
        {errorMessage}
        {spinner}
        {hasData ? (
          <Content
            currentPage={currentPage}
            inputSearch={inputSearch}
            totalItems={Math.ceil(totalItems / 20)}
            updateMovies={updateMovies}
            isLocalStorageSupported={isLocalStorageSupported}
          ></Content>
        ) : null}
      </div>
    </ErrorBoundary>
  )
}

export default TabContent
