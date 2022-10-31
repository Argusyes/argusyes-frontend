<script setup>
</script>

<template>
  <DetailsBox>
    <div>
      <div class="flex justify-between items-center">
        <NumWithUnit
          :num="75"
          unit="%"
          font-size="text-4xl"
        />
        <DataWithTitle
          :num="24"
          unit="%"
          title="SYS"
          color="red"
        />
        <DataWithTitle
          :num="52"
          unit="%"
          title="USER"
          color="green"
        />
        <DataWithTitle
          :num="0"
          unit="%"
          title="IOWAIT"
          color="purple"
        />
        <DataWithTitle
          :num="0"
          unit="%"
          title="STEAL"
          color="yellow"
        />
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>

</style>
