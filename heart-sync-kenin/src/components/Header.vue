<template>
  <nav class="bg-primary">
    <div class="max-w-screen-xl mx-auto border-b border-gray-300 px-5">
      <div class="flex flex-wrap items-center justify-between py-4">
        <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="@/assets/logo.svg" class="h-15" alt="Flowbite Logo" />
          <span
            class="font-primary self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white"
          >
            KaiNest
          </span>
        </RouterLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg md:hidden hover:bg-tosca/50 focus:outline-none focus:ring-2 focus:ring-soft-pink/50 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border-gray-100 rounded-lg bg-tosca/50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent bg-primary md:ng-primary dark:border-gray-700"
          >
            <li>
              <RouterLink
                to="/"
                class="block py-2 px-3 text-gray-900 rounded bg-tosca/70 md:bg-transparent md:text-gray-900 md:p-0 dark:text-white md:dark:text-gray-100"
              >
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-tosca/70 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-white md:dark:hover:text-gray-300"
              >
                About
              </RouterLink>
            </li>
            <li v-if="isAuthenticated">
              <RouterLink
                to="/dashboard"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-tosca/70 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-white md:dark:hover:text-gray-300"
              >
                Dashboard
              </RouterLink>
            </li>
            <li v-if="!isAuthenticated">
              <RouterLink
                to="/register"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-tosca/70 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-white md:dark:hover:text-gray-300"
              >
                Register
              </RouterLink>
            </li>
            <li v-if="!isAuthenticated">
              <RouterLink
                to="/login"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-tosca/70 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-white md:dark:hover:text-gray-300"
              >
                Login
              </RouterLink>
            </li>
            <li v-if="isAuthenticated">
              <a
                @click="authStore.logout()"
                class="block py-2 px-3 text-gray-900 cursor-pointer rounded hover:bg-tosca/70 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-white md:dark:hover:text-gray-300"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/features/auth/presentation/stores/authStore'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>
