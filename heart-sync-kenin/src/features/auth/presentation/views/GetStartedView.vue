<template>
  <div class="min-h-screen bg-primary flex flex-col items-center justify-center px-4">
    <!-- Konten utama -->
    <div class="text-center max-w-xl w-full">
      <h1 class="font-primary text-3xl md:text-4xl text-white italic mb-10">
        Let’s Start To The New Memories
      </h1>

      <!-- Gambar sebagai tombol -->
      <button @click="handleStart" class="focus:outline-none">
        <img
          src="@/assets/started-button.png"
          alt="Start"
          class="w-48 md:w-56 transition-transform duration-100 ease-in-out hover:scale-150"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleStart = () => {
  router.push('/login')
}
</script>
