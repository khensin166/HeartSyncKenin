<template>
  <div
    class="min-h-screen bg-primary flex flex-col items-center justify-center px-4 overflow-hidden"
  >
    <div class="text-center max-w-xl w-full">
      <!-- Typing Animation -->
      <h1
        ref="typingText"
        class="font-primary text-2xl md:text-4xl text-white italic mb-10 border-r-2 border-white overflow-hidden animate-typing"
      >
        Let’s Start To The New Memories
      </h1>

      <!-- Button muncul dari bawah -->
      <transition name="fade-up">
        <button v-if="showButton" @click="handleStart" class="focus:outline-none mt-4 btn-start">
          <img src="@/assets/started-button.png" alt="Start" class="w-48 md:w-56" />
        </button>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showButton = ref(false)

const handleStart = () => {
  router.push('/login')
}

onMounted(() => {
  setTimeout(() => {
    showButton.value = true
  }, 3000)
})
</script>

<style scoped>
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.animate-typing {
  animation: typing 3s steps(30, end) forwards;
  white-space: wrap; /* Tetap satu baris */
  width: 0;
  display: inline-block;
}

/* Fade-up animation */
.fade-up-enter-active {
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(50px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.btn-start {
  outline: none;
  transition: transform 0.3s ease-in-out;
  display: inline-block; /* pastikan bisa di-scale */
}

.btn-start:hover {
  transform: scale(1.2); /* 200% */
}
</style>
