import { SecureStorage } from "nativescript-secure-storage"
import { view, set as setValue } from 'ramda'

const storage = new SecureStorage()
const storedState = storage.getSync({ key: "app-state" });
let appState = storedState ? JSON.parse(storedState) : {}

export function get(lens) {
  return view(lens, appState)
}

export function set(lens, value) {
  const updatedAppState = setValue(lens, value, appState)
  storage.setSync({
    key: 'app-state',
    value: JSON.stringify(updatedAppState),
  })
  appState = updatedAppState
}
