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
      <n-divider />
      <CPUCoresUsage />
      <n-divider />
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="8"
          title="CORES"
        />
        <DataWithTitle
          :num="72"
          unit="%"
          title="IDLE"
        />
        <DataWithTitle
          :num="52"
          unit="D"
          title="UPTIME"
        />
        <!--  TODO: load 1/5/15m -->
        <DataWithTitle
          :num="0"
          unit="%"
          title="LOAD"
        />
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>

</style>
