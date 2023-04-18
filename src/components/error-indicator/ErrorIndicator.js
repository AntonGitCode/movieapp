import React from 'react'
import './ErrorIndicator.css'
import { Alert } from 'antd'
import errorPoster from './img/crash_img.jpg'

const ErrorIndicator = (error) => {
  console.log(error)
  return (
    <div className="error-container">
      <Alert
        className="error-indicator"
        type="error"
        message="Error"
        description="Something went wrong! Despite everything Tom Cruise and Chip & Dale are already rushing to fix it!"
        banner
      />
      <img className="error-poster" src={errorPoster} alt="funny poster"></img>
    </div>
  )
}

export default ErrorIndicator
