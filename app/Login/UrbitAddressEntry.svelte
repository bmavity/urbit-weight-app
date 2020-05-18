<script>
  export let addUrbitAddress
  export let defaultSigil
  export let suggestedUrbitAddress
  export let urbitAddress

  function attemptAddAddress(potentialUrbitAddress) {
    validationResult = addUrbitAddress(potentialUrbitAddress)
  }

  $: tempUrbitAddress = urbitAddress || suggestedUrbitAddress
  $: validationResult = null
</script>

<page actionBarHidden={true}>
  <gridLayout columns="*" rows="2*, *">
    <svgImage
      width="50%"
      height="50%"
      horizontalAlignment="center"
      verticalAlignment="center"
      src={defaultSigil}
    />

    <gridLayout col="0" row="1" columns="*" rows="70, 70">
    {#await validationResult}
      <label
        text="Loading..."
        textAlignment="center"
      />
    {:then result}
      <textField
        col="0"
        row="0"
        bind:text="{tempUrbitAddress}"
        hint="suggestedUrbitAddress"
        editable="true"
        on:returnPress="{() => attemptAddAddress(tempUrbitAddress)}"
        horizontalAlignment="center"
        width="80%"
      />
      <button
        col="0"
        row="1"
        horizontalAlignment="center"
        text="Add your Urbit Address"
        on:tap="{() => attemptAddAddress(tempUrbitAddress)}" class="-primary"
        width="80%"
      />
    {/await}
    </gridLayout>
  </gridLayout>
</page>

<style>
</style>
