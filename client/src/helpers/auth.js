import { Buffer } from 'buffer'

export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('videoclips-token')
}

export const getPayload = () => {
  //Getting the token
  const token = getTokenFromLocalStorage()

  //check token is not undefined
  if (!token) return 
  //split token in three parts
  const splitToken = token.split('.')
  //Check token is in correct format
  if (splitToken.length !==3) return 
  //return the payload
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const userIsAuthenticated = () => {
  const payload = getPayload()

  //check to see if payload exists
  if (!payload) return 
  //Get the current time (checked against the expiry date on the payload)
  const currentTime = Math.round(Date.now() / 1000)

  return currentTime < payload.exp
}