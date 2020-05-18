<script>
  import { alert } from '@nativescript/core/ui/dialogs'

  export let addUrbitId
  export let normalizeUrbitId
  export let urbitId
  export let validateUrbitId

  let tempUrbitId = urbitId || '~zod'

  function attemptAdd(potentialUrbitId) {
    if(validateUrbitId(potentialUrbitId)) {
      addUrbitId(potentialUrbitId)
    } else {
      alert(`${normalizeUrbitId(potentialUrbitId)} is not a valid urbit id.`)
    }
  }
</script>

<page actionBarHidden={true}>
  <gridLayout columns="*" rows="2*, *">
    <svgImage
      col="0"
      row="0"
      width="50%"
      height="50%"
      horizontalAlignment="center"
      verticalAlignment="center"
      src="~/images/urbit-logo.svg"
    />

    <gridLayout col="0" row="1" columns="*" rows="70, 70">
      <textField
        col="0"
        row="0"
        bind:text="{tempUrbitId}"
        hint="~binzod-dopzod"
        editable="true"
        on:returnPress="{() => attemptAdd(tempUrbitId)}"
        horizontalAlignment="center"
        width="80%"
      />
      <button
        col="0"
        row="1"
        horizontalAlignment="center"
        text="Add your Urbit Id"
        on:tap="{() => attemptAdd(tempUrbitId)}" class="-primary"
        width="80%"
      />
    </gridLayout>
  </gridLayout>
</page>

<style>
</style>
