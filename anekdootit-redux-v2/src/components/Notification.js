import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ text }) => {
  if (!text)
    return null
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {text}
    </div>
  )
}

const mapStateToProps = state => ({ text: state.notification.text })

export default connect(mapStateToProps)(Notification)
