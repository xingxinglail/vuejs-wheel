---
title: 快速上手
---

### 快速上手

在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import App from './App.vue';
import VuejsWheel from 'vuejs-wheel';
import 'vuejs-wheel/dist/vuejs-wheel.css';


Vue.use(VuejsWheel)

new Vue({
  render: h => h(App)
}).$mount('#app')

```
