let backendUrl = ''

if (process.env.NODE_ENV === 'production')
  backendUrl = process.env.BACKEND_URL

export default backendUrl