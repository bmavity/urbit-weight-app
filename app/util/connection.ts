// @ts-ignore
import * as http from 'http'
import { lensProp } from 'ramda'

import { get, set } from '../app-state'

const connectionLens = lensProp('connection')

export async function addUrbitAccessCode(proposedUrbitAccessCode) {
  const connection = getConnection()

  const result = await authorizeClient(connection.urbitAddress, proposedUrbitAccessCode)
  // @ts-ignore
  if(result.wasSuccessful) {
    set(connectionLens, {
      ... connection,
      urbitAccessCode: proposedUrbitAccessCode,
      // @ts-ignore
      cookie: result.cookie,
    })
  }
  return result
}

export async function addUrbitAddress(proposedUrbitAddress) {
  const connection = getConnection()
  if(connection.hasConnectionState && connection.urbitAddress === proposedUrbitAddress) {
    return { wasSuccessful: true }
  }

  const result = await verifyServer(proposedUrbitAddress)
  // @ts-ignore
  if(result.wasSuccessful) {
    set(connectionLens, {
      ... connection,
      urbitAddress: proposedUrbitAddress,
    })
  }
  return result
}

export function getConnection() {
  const connectionState = get(connectionLens)
  return {
    ... connectionState,

    hasConnectionState: !!connectionState,
    canConnect() {
      return this.urbitAddress && this.cookie
    }
  }
}

export function getSuggestedUrbitAddress(urbitId, env) {
  // Use 'http://10.0.2.2:8080' in the android emulator
  /*
  return !!env
    ? `https://${urbitId}.arvo.network`
    : 'http://10.0.2.2:8080'
  */
  return `https://${urbitId}.arvo.network`
}




export async function authorizeClient(urbitAddress, urbitCode) {
  return new Promise(async resolve => {
    try {
      const headers = { "Content-Type": "application/x-www-form-urlencoded" }
      const res = await http.request({
        url: `${urbitAddress}/~/login`,
        method: 'POST',
        content: `password=${urbitCode}`,
        headers,
      })

      if(res.statusCode === 200) {
        const cookieHeader = res.headers['set-cookie']
        resolve({
          wasSuccessful: true,
          cookie: cookieHeader.split(';')[0],
        })
      } else {
        resolve({
          wasSuccessful: false,
          reason: 'Authorization failed.'
        })
      }
    } catch (ex) {
      console.log(ex.stack)
      resolve({
        wasSuccessful: false,
        reason: ex.stack,
      })
    }
  })
}

export async function verifyServer(urbitAddress) {
  return new Promise(async (resolve) => {
    try {
      const res = await http.request({
        url: `${urbitAddress}/~/login`,
        method: 'GET',
      })

      if(res.statusCode === 200) {
        resolve({ wasSuccessful: true })
      } else {
        resolve({ wasSuccessful: false })
      }
    } catch (ex) {
      console.log(ex.stack)
      resolve({ wasSuccessful: false })
    }
  })
}

export async function sendCommand(command, params = {}) {
  const { urbitAddress, cookie } = getConnection()

  return new Promise(async (resolve, reject) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        cookie,
      }
      const res = await http.request({
        url: `${urbitAddress}/~weight-app/${command}`,
        method: 'POST',
        content: JSON.stringify(params),
        headers,
      })

      if(res.statusCode === 200) {
        resolve(JSON.parse(res.content))
      } else {
        reject('Authorization failed.')
      }
    } catch (ex) {
      console.log(ex.stack)
      reject(ex)
    }
  })
}

export async function sendQuery(query) {
  const { urbitAddress, cookie } = getConnection()

  return new Promise(async (resolve, reject) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        cookie,
      }
      const res = await http.request({
        url: `${urbitAddress}/~weight-app/${query}`,
        method: 'GET',
        headers,
      })

      if(res.statusCode === 200) {
        resolve(JSON.parse(res.content))
      } else {
        reject('Authorization failed.')
      }
    } catch (ex) {
      console.log(ex.stack)
      reject(ex)
    }
  })
}
