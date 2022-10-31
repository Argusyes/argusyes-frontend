<script setup>
</script>

<template>
  <DetailsBox>
    <div>
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="40"
          unit="G"
          title="FREE"
        />
        <DataWithTitle
          :num="50"
          unit="G"
          title="USED"
          color="green"
        />
        <DataWithTitle
          :num="161"
          unit="G"
          title="PAGE CACHE"
          color="gray"
        />
        <!-- TODO: circle bar -->
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>

</style>
