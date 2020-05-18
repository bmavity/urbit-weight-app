import { navigate, svelteNative } from "svelte-native";
import { pipe } from 'ramda';

import { addUrbitAccessCode, addUrbitAddress, getConnection, getSuggestedUrbitAddress } from '../util/connection'
import { addUrbitId, getIdentity, isValidUrbitId, normalizeUrbitId, textOnlyUrbitId } from '../identity'

import App from '../App.svelte'
import UrbitAccessCodeEntry from './UrbitAccessCodeEntry.svelte'
import UrbitAddressEntry from './UrbitAddressEntry.svelte'
import UrbitIdEntry from './UrbitIdEntry.svelte'

const start = (Component, props) => svelteNative(Component, props)
const changeTo = (Component, props) => navigate({
  page: Component,
  props
})

function showUrbitIdEntry(go) {
  go(UrbitIdEntry, {
    async addUrbitId(proposedUrbitId) {
      const urbitId = normalizeUrbitId(proposedUrbitId)
      if(isValidUrbitId(urbitId)) {
        await addUrbitId(urbitId)
        showUrbitAddressEntry(changeTo)
      }
    },
    normalizeUrbitId,
    validateUrbitId: pipe(
      normalizeUrbitId,
      isValidUrbitId
    )

  })
}

function showUrbitAddressEntry(go) {
  const identity = getIdentity()
  console.log('showing address entry', identity)
  go(UrbitAddressEntry, {
    async addUrbitAddress(proposedUrbitAddress) {
      const result = await addUrbitAddress(proposedUrbitAddress)
      //@ts-ignore
      if(result.wasSuccessful) {
        showUrbitAccessCodeEntry(changeTo)
      } else {
        return result
      }
    },
    defaultSigil: identity.defaultSigil,
    suggestedUrbitAddress: getSuggestedUrbitAddress(textOnlyUrbitId(identity.urbitId), null),
    urbitAddress: getConnection().urbitAddress,
  })
}

function showUrbitAccessCodeEntry(go) {
  go(UrbitAccessCodeEntry, {
    async addUrbitAccessCode(proposedUrbitAccessCode) {
      const result = await addUrbitAccessCode(proposedUrbitAccessCode)
      //@ts-ignore
      if(result.wasSuccessful) {
        navigate({ page: App, props: {
          connection: getConnection(),
          identity: getIdentity(),
        } })
      } else {
        return result
      }
    },
    defaultSigil: getIdentity().defaultSigil,
    urbitAccessCode: getConnection().urbitAccessCode,
  })
}

export default function(identity, connection) {
  !identity.hasIdentityState
    ? showUrbitIdEntry(start)
    : !connection.urbitAddress
      ? showUrbitAddressEntry(start)
      : showUrbitAccessCodeEntry(start)

}
