---
title: Pagination 分页
---

### Pagination 分页

#### 基础用法

<Pagination-Basis />
``` vue
<p>页数较少时的效果</p>
<v-pagination :total="7" :current="current" @change="onChange"></v-pagination>
<p>大于 7 页时的效果</p>
<v-pagination :total="100" :current.sync="current2"></v-pagination>

<script>
export default {
    data () {
        return {
            current: 1,
            current2: 1
        }
    },
    methods: {
        onChange (val) {
            console.log(val)
            this.current = val
        }
    }
}
</script>
```

#### Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| total      | 总页数       | number |-     |-
| current   | 当前页数，支持 .sync 修饰符  | number | - | -
| hide-if-one-page   | 只有一页时是否隐藏  | boolean | - | true

#### Events

| 事件名称    | 说明     | 回调参数    
| ---------- |--------------| -------
| change    | current 改变时会触发 | 当前页 
