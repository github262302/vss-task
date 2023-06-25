import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
import "element-plus/dist/index.css"
import App from './App.vue'

// import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')
console.log("vue:start");
