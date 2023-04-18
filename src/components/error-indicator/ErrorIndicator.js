import React from 'react'
import './ErrorIndicator.css'
import { Alert } from 'antd'
import './crash_img.jpg'

const ErrorIndicator = (error) => {
  console.log(error)
  return (
    <>
      <Alert
        className="error-indicator"
        type="error"
        message="Error"
        description="Something went wrong! Despite everything Tom Cruise and Chip & Dale are already rushing to fix it!"
        banner
      />
      <img className="error-poster" src="../error-indicator/crash_img.jpg" alt="funny poster"></img>
    </>
  )
}

export default ErrorIndicator
