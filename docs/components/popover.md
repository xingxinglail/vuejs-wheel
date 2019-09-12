---
title: Popover 弹出框
---

### Popover 弹出框

#### 基础用法

<Popover-Basis />

``` vue
<v-popover>
    <template slot="content">
        <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
    </template>
    <v-button>click 激活</v-button>
</v-popover>

<v-popover trigger="hover">
    <template slot="content">
        <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
    </template>
    <v-button>hover 激活</v-button>
</v-popover>
```

#### 方向

<Popover-Placement />

```vue
<div class="wrapper">
    <div class="top">
        <v-popover trigger="hover" placement="top-start">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>上左</v-button>
        </v-popover>
        <v-popover trigger="hover" placement="top">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>上边</v-button>
        </v-popover>
        <v-popover trigger="hover" placement="top-end">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>上右</v-button>
        </v-popover>
    </div>
    <div class="left">
        <v-popover trigger="hover" placement="left-start">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>左上</v-button>
        </v-popover>
        <v-popover trigger="hover" placement="left">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>左边</v-button>
        </v-popover>
        <v-popover trigger="hover" placement="left-end">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>左下</v-button>
        </v-popover>
    </div>
    <div class="right">
        <v-popover trigger="hover" placement="right-start">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>右上</v-button>
        </v-popover>
        <v-popover trigger="hover" placement="right">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>右边</v-button>
        </v-popover>
        <v-popover trigger="hover" placement="right-end">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>右下</v-button>
        </v-popover>
    </div>
    <div class="bottom">
        <v-popover trigger="hover" placement="bottom-start">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>下左</v-button>
        </v-popover>
        <v-popover trigger="hover" placement="bottom">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>下边</v-button>
        </v-popover>
        <v-popover trigger="hover" placement="bottom-end">
            <template slot="content">
                <p>这是一段内容。</p>
            </template>
            <v-button>下右</v-button>
        </v-popover>
    </div>
</div>

<style lang="scss" scoped>
.wrapper {
    width: 400px;

    .top, .bottom {
        text-align: center;
        clear: both;
    }

    .left {
        width: 58px;
        float: left;
    }

    .right {
        width: 58px;
        float: right;
    }
}
</style>
```

#### 嵌套信息

<Popover-Content />

```vue
<v-popover placement="right" width="550px">
    <template slot="content">
        <v-layout>
            <v-header>Header</v-header>
            <v-layout>
                <v-aside width="200px">Aside</v-aside>
                <v-layout>
                    <v-content>Content</v-content>
                    <v-footer>Footer</v-footer>
                </v-layout>
            </v-layout>
        </v-layout>
    </template>
    <v-button>click 激活</v-button>
</v-popover>
<style lang="scss" scoped>
.v-layout {
    text-align: center;
    color: #333;

    .v-header, .v-footer {
        background-color: #b3c0d1;
        line-height: 60px;
    }

    .v-content {
        background-color: #e9eef3;
        line-height: 160px;
    }

    .v-aside {
        background-color: #d3dce6;
        line-height: 200px;
    }
}
</style>

```

#### 嵌套操作

<Popover-Control />

```vue
<v-popover v-model="visible">
    <template slot="content" slot-scope="{ close }">
        <p>这是一段内容,这是一段内容,这是一段内容。</p>
        <div style="text-align: right;">
            <v-button @click="visible = false">关闭</v-button>
            <v-button @click="close">关闭</v-button>
        </div>
    </template>
    <v-button>click 激活</v-button>
</v-popover>

<script>
export default {
    data () {
        return {
            visible: false
        }
    }
}
</script>
```

#### Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| value      | 状态是否可见  | boolean |-     | false
| trigger   | 触发方式  | string | click/hover | click
| width     |  宽度     | string | - | 150px
| popperClass   |  为 popper 添加类名   | string | - | -
| placement  | 出现位置     | String | top-start/top/top-end/bottom-start/bottom/bottom-end/left-start/left/left-end/right-start/right/right-end | top

#### Slot

| 参数        | 说明          
| ---------- |--------------
| -        | 触发 Popover 显示的 HTML 元素  
| content  | Popover 内嵌 HTML 文本

#### Events

| 参数        | 说明         | 回调参数
| ---------- |--------------| -------
| show       | 显示时触发   /  -
| hide       | 隐藏时触发   /  -
  
