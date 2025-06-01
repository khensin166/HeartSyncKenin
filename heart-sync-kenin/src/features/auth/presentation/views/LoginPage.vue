<!-- presentation/pages/LoginPage.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan email Anda"
            :class="{ 'border-red-500': v$.email.$error }"
            @blur="v$.email.$touch"
            required
          />
          <p v-if="v$.email.$error" class="text-red-500 text-sm mt-1">
            {{ v$.email.$errors[0].$message }}
          </p>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Kata Sandi</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan kata sandi Anda"
            :class="{ 'border-red-500': v$.password.$error }"
            @blur="v$.password.$touch"
            required
          />
          <p v-if="v$.password.$error" class="text-red-500 text-sm mt-1">
            {{ v$.password.$errors[0].$message }}
          </p>
        </div>
        <div v-if="authStore.error" class="mb-4 text-red-500 text-sm text-center">
          {{ authStore.error }}
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          :disabled="authStore.loading || v$.$invalid"
        >
          {{ authStore.loading ? 'Sedang masuk...' : 'Masuk' }}
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Belum punya akun?
        <router-link to="/register" class="text-blue-500 hover:underline">Daftar</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/presentation/stores/authStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { AuthBloc } from '@/features/auth/presentation/bloc/AuthBloc'
import { LoginUserUseCase } from '@/features/auth/domain/use-cases/login'
import { RegisterUserUseCase } from '@/features/auth/domain/use-cases/Register'
import { AuthRepository } from '@/features/auth/data/repository/AuthRepository'
import { AuthRemoteSource } from '@/features/auth/data/source/AuthRemoteSource'

const authStore = useAuthStore()
const router = useRouter()
const authBloc = new AuthBloc({
  store: authStore,
  router,
  LoginUserUseCase: new LoginUserUseCase(new AuthRepository(new AuthRemoteSource())),
  RegisterUserUseCase: new RegisterUserUseCase(new AuthRepository(new AuthRemoteSource())),
})

const form = ref({
  email: '',
  password: '',
})

const rules = {
  email: {
    required,
    email,
    $errors: [{ $message: 'Email harus valid' }],
  },
  password: {
    required,
    minLength: minLength(8),
    $errors: [{ $message: 'Kata sandi minimal 8 karakter' }],
  },
}

const v$ = useVuelidate(rules, form)

const handleLogin = async () => {
  v$.value.$touch()
  if (v$.value.$error) return
  await authBloc.login(form.value.email, form.value.password)
}
</script>
