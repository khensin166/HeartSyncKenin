// main.ts
import 'flowbite'
import 'aos/dist/aos.css'
import './assets/main.css'
// import './assets/styles.css'
// import './assets/output.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
