<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from './components/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-primary">
    <MainHeader />
    <div class="max-w-[1200px] mx-auto mt-1 p-4">
      <RouterView />
    </div>
  </div>
</template>
