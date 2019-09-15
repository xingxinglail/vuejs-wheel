---
title: NavMenu 导航菜单
---

### NavMenu 导航菜单

#### 顶栏

<Menu-Horizontal />
``` vue
<v-menu mode="horizontal" default-active="/home" @select="onSelect">
    <v-menu-item name="/home">首页</v-menu-item>
    <v-sub-menu name="/programming-language">
        <template v-slot:title>编程语言</template>
        <v-menu-item name="/java">Java</v-menu-item>
        <v-menu-item name="/javascript">Javascript</v-menu-item>
        <v-menu-item name="/go">Go</v-menu-item>
        <v-sub-menu name="/framework">
            <template v-slot:title>框架</template>
            <v-menu-item name="/jquery">jQuery</v-menu-item>
            <v-menu-item name="/express">express</v-menu-item>
            <v-menu-item name="/vue">vue</v-menu-item>
        </v-sub-menu>
    </v-sub-menu>
    <v-menu-item name="/about">关于我</v-menu-item>
</v-menu>

<script>
export default {
    methods: {
        onSelect (name, namePath) {
            console.log(name)
            console.log(namePath)
        }
    }
}
</script>

<style lang="scss">
.v-menu .v-sub-menu .v-sub-menu-popover {
    z-index: 101;
}
</style>
```

#### 侧栏

<Menu-Vertical />

#### Menu Attribute

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| mode      | 模式   | string |  horizontal / vertical | vertical
| default-active | 当前激活菜单的 name | string | - | -
| default-openeds | 当前打开的 sub-menu 的 name 的数组  | array | - | -
| menu-trigger | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) | string | hover / click | click
| router | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean | - | false
| styles | 根节点样式 | object | - | -

#### Menu Events

| 事件名称        | 说明         | 回调参数    
| ---------- |--------------| -------
| select     | 菜单激活回调   | name: 选中菜单项的 name, namePath: 选中菜单项的 name path 

#### SubMenu Attribute

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| name      | 唯一标志   | string |  - | -
| show-timeout | 展开 sub-menu 的延时 | number | - | 300
| hide-timeout | 收起 sub-menu 的延时 | number | - | 300
| default-active | 当前激活菜单的 name | string | - | -

#### MenuItem Attribute

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| name      | 唯一标志   | string |  - | -
