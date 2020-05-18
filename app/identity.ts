import { lensProp } from 'ramda'
import { isValidPatp } from 'urbit-ob'

import { get, set } from './app-state'
import * as fileSystem from './util/fileSystem'
import createSigilFactory from './util/createSigilFactory'

const identityLens = lensProp('identity')

export async function addUrbitId(urbitId) {
  return new Promise(async resolve => {
    try {
      if(!isValidUrbitId(urbitId)) {
        resolve({
          wasSuccessful: false,
          reason: `Not a valid urbit id: "${urbitId}".`
        })
      }

      const currentIdentity = getIdentity()
      if(currentIdentity.hasIdentityState && currentIdentity.urbitId === urbitId) {
        resolve({ wasSuccessful: true })
      }

      await createIdentity(urbitId)
      resolve({ wasSuccessful: true })
    } catch (ex) {
      console.log(ex.stack)
      resolve({
        wasSuccessful: false,
        reason: ex.stack,
      })
    }
  })
}

export function createIdentity(urbitId) {
  return new Promise(async (resolve, reject) => {
    try {
      const createSigil = createSigilFactory(urbitId, fileSystem)

      const defaultSigil = await createSigil('default-sigil', 'white', 'black')
      const connectedSigil = await createSigil('connected-sigil', '#00ff00', 'white')

      set(identityLens, {
        connectedSigil,
        defaultSigil,
        urbitId,
      })
      resolve()
    }
    catch (ex) {
      console.log(ex.stack)
      reject(ex)
    }
  })
}

export function normalizeUrbitId(proposedUrbitId) {
  return proposedUrbitId.indexOf('~') === 0
    ? proposedUrbitId
    : `~${proposedUrbitId}`
}

export function textOnlyUrbitId(urbitId) {
  return urbitId.indexOf('~') === 0
    ? urbitId.slice(1)
    : urbitId
}

export function isValidUrbitId(proposedUrbitId) {
  return isValidPatp(proposedUrbitId)
}

export function getIdentity() {
  const identityState = get(identityLens)
  return {
    ... identityState,

    hasIdentityState: !!identityState,
  }
}
