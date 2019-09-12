---
title: Toast 轻提示
---

### Toast 轻提示

#### 基础用法

<Toast-Basis />

``` vue
<v-toast @close="onClose">这是一段内容</v-toast>
<v-toast :duration="0" position="middle" close-btn-text="关闭" @close="onClose">这是一段内容</v-toast>
<v-toast position="bottom" @close="onClose">这是一段内容</v-toast>

<script>
export default {
    methods: {
        onClose () {
            console.log('关闭了')
        }
    }
}
</script>
```

#### 使用HTML片段

<Toast-EnableHTML />

```vue
<v-button @click="open">使用HTML片段</v-button>

<script>
export default {
    methods: {
        open () {
            this.$toast({
                message: `<p style="padding: 0; margin: 0;">使用<b>HTML</b>片段</p>`,
                enableHTML: true,
                position: 'middle',
                onClose () {
                    console.log('关闭了')
                }
            })
        }
    }
}
</script>
```

#### Attributes/Options

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| className      | toast类名       | string |-     |-
| enableHTML   | 是否将 message 属性作为 HTML 片段处理 | boolean | - | false
| duration   | 显示时间, 毫秒。设为 0 则不会自动关闭   | number | - | 3000
| closeBtnText  | 关闭按钮文字描述   | string | - | -
| position  | 显示位置   | string | top/middle/bottom | top

#### Events

| 事件名称        | 说明         | 回调参数    
| ---------- |--------------| -------
| close      | 关闭时触发   | -
