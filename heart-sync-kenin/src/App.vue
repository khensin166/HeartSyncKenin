<!-- App.vue -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/features/auth/presentation/stores/authStore'
import { computed } from 'vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>

<template>
  <header class="bg-white shadow-md p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-xl font-bold text-gray-800">HeartSync-Kenin</div>
      <nav class="flex space-x-4">
        <RouterLink v-if="!isAuthenticated" to="/" class="text-gray-600 hover:text-gray-800">
          Login
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          to="/register"
          class="text-gray-600 hover:text-gray-800"
        >
          Register
        </RouterLink>
        <RouterLink
          v-if="isAuthenticated"
          to="/dashboard"
          class="text-gray-600 hover:text-gray-800"
        >
          Dashboard
        </RouterLink>
        <a
          v-if="isAuthenticated"
          @click="authStore.logout()"
          class="text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          Logout
        </a>
      </nav>
    </div>
  </header>

  <div class="container mx-auto mt-6">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 10;
}

nav a.router-link-exact-active {
  color: #1e40af;
  font-weight: 500;
}

.container {
  max-width: 1200px;
}
</style>
