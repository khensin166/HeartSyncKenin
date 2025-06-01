<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from './components/Header.vue'
</script>

<template>
  <MainHeader />
  <div class="container mx-auto mt-6">
    <RouterView />
    <div class="bg-soft-pink h-10 w-full">Test warna</div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
