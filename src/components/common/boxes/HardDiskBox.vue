<script setup>
</script>

<template>
  <DetailsBox>
    <div>
      <div class="flex justify-between">
        <div class="flex flex-col gap-1">
          <span>/</span>
          <span class="secondary-text">/dev/nvme0n1p2</span>
        </div>
        <StorageBar />
      </div>
      <n-divider />
      <div class="grid grid-cols-5 grid-rows-3">
        <!-- first line -->
        <div class="secondary-text">
          <!-- TODO: change to an animated logo -->
          logo
        </div>
        <div class="secondary-text">
          SPEED
        </div>
        <div class="secondary-text">
          BYTES
        </div>
        <div class="secondary-text">
          IOPS
        </div>
        <div class="secondary-text">
          WAIT
        </div>
        <!-- second line -->
        <div class="secondary-text">
          R
        </div>
        <NumWithUnit
          :num="0"
          unit="B/s"
        />
        <NumWithUnit
          :num="23"
          unit="M"
        />
        <NumWithUnit
          :num="0"
        />
        <NumWithUnit
          :num="0"
        />
        <!-- third line -->
        <div class="secondary-text">
          W
        </div>
        <NumWithUnit
          :num="0"
          unit="B/s"
        />
        <NumWithUnit
          :num="5"
          unit="K"
        />
        <NumWithUnit
          :num="0"
        />
        <NumWithUnit
          :num="0"
        />
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>

</style>
