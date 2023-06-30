import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
import "element-plus/dist/index.css"
import App from './App.vue'
import globalInstall from '@/components/globalInstall';
import { onProcess } from '@/utils/process';
import { updateProcess } from '@/stores/process';
onProcess(updateProcess)
const app = createApp(App)
app.use(globalInstall)
app.use(createPinia())
app.use(ElementPlus)
// throw 'test'
app.mount('#app')
console.log("vue:start");
