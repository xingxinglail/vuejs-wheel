---
title: DatePicker 日期选择器
---

### DatePicker 日期选择器

#### 基础用法

<DatePicker-Basis />
``` vue
<v-date-picker v-model="date" @change="onChange" />

<script>

export default {
    data () {
        return {
            date: ''
        }
    },
    methods: {
        onChange (e) {
            console.log(e)
        }
    }
}
</script>
```

#### 选择日期范围

<DatePicker-Range />

``` vue
<v-date-picker
    v-model="date"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    separator="至"
    @change="onChange" />
<v-date-picker
    v-model="date2"
    type="daterange"
    unlink-panels
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    separator="至"
    @change="onChange" />
    
<script>

export default {
    data () {
        return {
            date: '',
            date2: ''
        }
    },
    methods: {
        onChange (e) {
            console.log(e)
        }
    }
}
</script>
```

#### Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| v-model      | 绑定值  | string / number / date / array | -     |-
| type      | 显示类型  | string | date / daterange     | date
| format     | 显示在输入框中的格式。配置参考 [dayjs](https://github.com/iamkun/dayjs) | string | -     | YYYY-MM-DD
| value-format    | 可选，绑定值的格式。配置参考 [dayjs](https://github.com/iamkun/dayjs) | string | -     | -
| placeholder	| 非范围选择时的占位内容 | string | -     | -
| start-placeholder	| 范围选择时开始日期的占位内容 | string | -     | -
| end-placeholder	| 范围选择时结束日期的占位内容 | string | -     | -
| clearable	| 是否显示清除按钮 | boolean | -     | true
| unlink-panels	| 在范围选择器里取消两个日期面板之间的联动 | boolean | -     | false
| separator	| 选择范围时的分隔符 | string | -     | ~

#### Events

| 事件名称        | 说明         | 回调参数    
| ---------- |--------------| -------
| change   | 用户确认选定的值时触发  | 组件绑定值。格式与绑定值一致，可受 ```value-format``` 控制 | 
| blur   | 当 input 失去焦点时触发  | 组件实例 | 
| focus   | 当 input 获得焦点时触发  | 组件实例 | 
