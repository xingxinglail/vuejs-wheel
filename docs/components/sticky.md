---
title: Sticky 粘性布局
---

### Sticky 粘性布局

#### 基础用法

<Sticky-Basis />
``` vue
<v-sticky @change="change">
    <v-button>固定在最顶部</v-button>
</v-sticky>

<script>

export default {
    methods: {
        change (val) {
            console.log(val)
        }
    }
}
</script>
```

#### 吸顶距离

<Sticky-Distance />
``` vue
<v-sticky :distance="50">
    <v-button>固定在距离顶部 50px 的位置</v-button>
</v-sticky>

```

#### 指定容器

<Sticky-Container />

``` vue
<div class="container" ref="container">
    <v-sticky :container="container">
        <v-button>指定容器</v-button>
    </v-sticky>
</div>

<script>

export default {
    data () {
        return {
            container: null
        }
    },
    mounted () {
        this.container = this.$refs.container
    }
}
</script>

<style lang="scss" scoped>
.container {
    height: 300px;
    background-color: #eaeaea;
}
</style>
```

#### Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| distance   | 吸顶时与顶部的距离，单位```px```  | number | - | 0
| container  | 容器对应的 HTML 节点       | HTMLElement | - | -

#### Events

| 事件名称           | 说明         | 回调参数    
| ----------|--------------| -------
| change   | 在粘性状态发生改变时触发 | true / false | 

