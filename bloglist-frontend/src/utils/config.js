let prod = false

if (process.env.NODE_ENV === 'production')
  prod = true

const backendUrl = () => prod ? process.env.BACKEND_URL : ''

export default backendUrl
