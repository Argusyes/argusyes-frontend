<script setup>
</script>

<template>
  <DetailsBox>
    <div>
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="8"
          unit="K/s"
          title="↑/S"
        />
        <DataWithTitle
          :num="72"
          unit="K/s"
          title="↓/S"
        />
        <DataWithTitle
          :num="104"
          unit="G"
          title="↑"
          color="yellow"
        />
        <DataWithTitle
          :num="98"
          unit="G"
          title="↓"
          color="green"
        />
        <!-- TODO: circle bar -->
      </div>
      <n-divider />
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="8"
          unit="%"
          title="RETRANS"
        />
        <DataWithTitle
          :num="1032397799"
          title="ACTIVE"
        />
        <DataWithTitle
          :num="159890"
          title="PASSIVE"
        />
        <DataWithTitle
          :num="1032397799"
          title="FAILS"
        />
      </div>
      <n-divider />
      <div class="flex flex-col gap-4">
        <NetworkInterfaceInfo
          v-for="i in 2"
          :key="i"
        />
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>

</style>
