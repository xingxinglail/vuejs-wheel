---
title: Input 输入框
---
### Input 输入框

#### 基础用法

<Input-Basis />
``` vue
<v-input v-model="input"></v-input>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```

#### 禁用状态

<Input-Disabled />
``` vue
<v-input v-model="input" disabled></v-input>

<script>
export default {
  data() {
    return {
      input: '内容'
    }
  }
}
</script>
```

#### 只读状态

<Input-Readonly />
``` vue
<v-input v-model="input" readonly></v-input>

<script>
export default {
  data() {
    return {
      input: '内容'
    }
  }
}
</script>
```

#### 错误提示

<Input-Error />
``` vue
<v-input v-model="input" error="请输入内容"></v-input>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
#### Input Attributes

| 参数        | 说明         | 类型    | 默认值  | 
| ---------- |--------------| -------| -----|
| value      | 绑定值       | string |-
| disabled   | 禁用         | boolean | false
| readonly   | 只读         | boolean | false
| error      | 错误提示     | boolean / string | false

#### Input Events

| 事件名称    | 说明                    | 回调参数  | 
| ---------- |-------------------------| -------|
| input      | 在 Input 输入时          | (value: string) |-
| change     | 在 Input 值改变时触发    | (value: string) |-
| focus      | 在 Input 获得焦点时触发  | (value: string) |-
| blur       | 在 Input 失去焦点时触发  | (value: string) |-
