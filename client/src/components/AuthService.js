import axios from 'axios'
import decode from 'jwt-decode'

const setToken = token => {
  window.localStorage.setItem('token', token)
}

export function getToken () {
  return window.localStorage.getItem('token')
}

const isTokenExpired = token => {
  try {
    const decoded = decode(token)
    // TODO: Does this even work?
    if (decoded.exp < Date.now() / 999) return true
    return false
  } catch (e) {
    return false
  }
}

export function login (username, password) {
  return axios.post('/api/login', {
    username: username,
    password: password
  })
    .then(data => {
      setToken(data.data.token)
      return Promise.resolve(data)
    }).catch(e => {
      return Promise.reject(e)
    })
}

export function signup (username, password, email) {
  return axios.post('/api/signup', {
    username: username,
    password: password,
    email: email
  })
    .then(data => {
      console.log('Signed up')
      return Promise.resolve(data)
    })
    .catch(e => {
      return Promise.reject(e.response.data.error)
    })
}

export function logout () {
  console.log('Running logout!')
  window.localStorage.removeItem('token')
  window.location = '/'
}

export function loggedIn () {
  const token = getToken()
  return !!token && isTokenExpired(token)
}
