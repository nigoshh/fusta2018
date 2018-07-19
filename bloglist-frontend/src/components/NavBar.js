import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const NavBar = ({ loginInfo, logoutButton }) => {
  const baseStyle = { padding: '15px 10px' }
  const style = { ...baseStyle, backgroundColor: '#33cccc' }
  const active = {
    ...baseStyle,
    backgroundColor: '#006699',
    color: 'white',
    fontStyle: 'italic'
  }
  return (
    <div style={style}>
      <NavLink exact to="/blogs" style={style} activeStyle={active}>
        blogs
      </NavLink>&nbsp;
      <NavLink exact to="/users" style={style} activeStyle={active}>
        users
      </NavLink>&nbsp;
      {loginInfo}
      {logoutButton}
    </div>
  )
}

NavBar.propTypes = {
  loginInfo: PropTypes.object.isRequired,
  logoutButton: PropTypes.object.isRequired
}

export default NavBar
