let backendUrl = ''

if (process.env.NODE_ENV === 'production')
  backendUrl = process.env.REACT_APP_BACKEND_URL

module.exports = { backendUrl }
