<script setup>
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
</script>


<template>
  <router-view />
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
