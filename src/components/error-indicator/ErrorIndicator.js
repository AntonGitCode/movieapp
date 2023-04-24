import React from 'react'
import './ErrorIndicator.css'
import { Alert } from 'antd'

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
    </div>
  )
}

export default ErrorIndicator
