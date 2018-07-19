const backendUrl = () => {
  if (process.env.NODE_ENV === 'production')
    return process.env.BACKEND_URL
  else
    return ''
}

export default backendUrl
