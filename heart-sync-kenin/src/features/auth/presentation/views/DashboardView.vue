<!-- features/auth/presentation/views/DashboardView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Selamat Datang, {{ authStore.user?.displayName || 'Pengguna' }}!</h2>
      <p class="text-gray-600 mb-4">Anda telah berhasil login. Ini adalah dashboard Anda.</p>
      <button
        @click="authStore.logout()"
        class="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/features/auth/presentation/stores/authStore';

const authStore = useAuthStore();
</script>