import { sendCommand, sendQuery } from './connection'

export async function addWeight(weight) {
  return sendCommand('add-weight', weight)
}

export async function getWeights() {
  return sendQuery('state')
}
