<script>
  import { Template } from 'svelte-native/components'
  import { addWeight, getWeights } from './util/serverApi'

  export let identity
  export let connection

  let currentWeight
  let enteredWeight
  let pastWeights = []
  let unit = 'lbs'

  async function enterWeight() {
    const weight = parseInt(enteredWeight, 10)
    if (enteredWeight === "") return;

    const toSubmit = {
      weight: `${weight}`,
      unit,
      date: Date.now(),
    }

    console.log('would have submitted', toSubmit)
    // await addWeight(toSubmit)
  }

  let weights = getWeights()
    .then(r => {
      currentWeight = r['current-weight']
      pastWeights = r['past-weights']
      console.log(r)
    })

</script>

<page>
  <actionBar title="My Weight" />

  <gridLayout columns="*" rows="*" padding="10">
    {#await weights}
      <label
        text="Loading..."
        horizontalAlignment="center"
        verticalAlignment="center"
        col="0"
        row="0"
      />
    {:then}
    <gridLayout colspan="0" row="0" columns="*" rows="50,35,*">
      {#if currentWeight}
        <label
          text="{`${currentWeight.value} ${currentWeight.unit}`}"
          style="font-size: 36"
          col="0"
          row="0"
          horizontalAlignment="center"
        />

        <label text="Previous" style="font-size: 16; font-weight: bold; margin-top: 10;" colspan="2" row="1"/>

        {#if pastWeights.length > 0}
        <listView items="{pastWeights}" col="0" row="2">
          <Template let:item>
            <gridLayout columns="75,*" rows="30">
              <label
                text="{`${item.value} ${item.unit}`}"
                style="font-size: 16"
                col="0"
                row="1"
                verticalAlignment="bottom"
              />
              <label
                text="{new Date(item.date).toLocaleDateString()}"
                style="font-size: 14; font-style: italic;"
                col="1"
                row="1"
                horizontalAlignment="right"
                verticalAlignment="bottom"
              />
            </gridLayout>
          </Template>
        </listView>
        {:else}
          <label
            text="You have only entered one weight. Weights will appear here once enter another one."
            col="0"
            row="2"
            horizontalAlignment="center"
            verticalAlignment="center"
            padding="25"
            textWrap="true"
          />
        {/if}
      {:else}
        <label
          text="First time? Let's set your baseline weight."
          col="0"
          rowSpan="3"
          horizontalAlignment="center"
          verticalAlignment="center"
        />
      {/if}
    </gridLayout>
    {/await}
  </gridLayout>
</page>

<style>
  textField {
      font-size: 18;
    }

.todo-item-completed {
  color: #939393;
  text-decoration: line-through;
}
</style>
