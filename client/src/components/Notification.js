import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification !== null) {
    return (
      <div className={notification.type}>
        {notification.message}
      </div>
    )
  }
  return (
    <div></div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification