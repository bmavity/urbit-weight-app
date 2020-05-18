/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative } from "svelte-native";

import SvgImageElement from './svg'

import App from  "./App.svelte";
import createLoginFlow from './Login/loginFlow'
import { getConnection } from './util/connection'
import { getIdentity } from './identity'

SvgImageElement.register()

const identity = getIdentity()
const connection = getConnection()

if(identity.hasIdentityState && connection.canConnect()) {
  svelteNative(App, {
    connection,
    identity,
  });
} else {
  createLoginFlow(identity, connection)
}
