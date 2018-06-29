import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, className }) => {
  if (message)
    return <div className={className}>{message}</div>
  return null
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default Notification
