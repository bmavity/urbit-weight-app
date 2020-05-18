<script>
  export let addUrbitAccessCode
  export let defaultSigil
  export let urbitAccessCode

  let tempUrbitAccessCode = urbitAccessCode || 'lidlut-tabwed-pillex-ridrup'

  function attemptAddUrbitAccessCode(potentialUrbitAccessCode) {
    addUrbitAccessCode(potentialUrbitAccessCode)
  }
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
      <textField
        col="0"
        row="0"
        bind:text="{tempUrbitAccessCode}"
        hint="binzod-dopzod-hanryc-hodler"
        editable="true"
        on:returnPress="{() => attemptAddUrbitAccessCode(tempUrbitAccessCode)}"
        horizontalAlignment="center"
        width="80%"
      />
      <button
        col="0"
        row="1"
        horizontalAlignment="center"
        text="Add your Urbit Access Code"
        on:tap="{() => attemptAddUrbitAccessCode(tempUrbitAccessCode)}" class="-primary"
        width="80%"
      />
    </gridLayout>
  </gridLayout>
</page>

<style>
</style>
