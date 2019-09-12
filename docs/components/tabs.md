---
title: Tabs 标签页
---

### Tabs 标签页

#### 基础用法

<Tabs-Basis />

``` vue
<v-tabs v-model="tabsActive" @tab-click="handleTabClick">
    <v-tab-head>
        <v-tab-nav name="first">用户</v-tab-nav>
        <v-tab-nav name="second">配置管理</v-tab-nav>
        <v-tab-nav name="third">角管理</v-tab-nav>
        <v-tab-nav name="fourth">定时任务补偿</v-tab-nav>
        <template v-slot:control>
            <v-icon name="setting"></v-icon>
        </template>
    </v-tab-head>
    <v-tab-body>
        <v-tab-pane name="first">用户管理用户管理</v-tab-pane>
        <v-tab-pane name="second">配置管理配置管理</v-tab-pane>
        <v-tab-pane name="third">角色管理角色管理</v-tab-pane>
        <v-tab-pane name="fourth">定时任务补偿定时任务补偿</v-tab-pane>
    </v-tab-body>
</v-tabs>

<script>
export default {
    data () {
        return {
            tabsActive: 'first'
        }
    },
    methods: {
        handleTabClick (val) {
            console.log(val)
        }
    }
}
</script>

<style lang="scss" scoped>
.v-tabs {
    color: #000;

    .v-icon {
        cursor: pointer;
    }
}
</style>
```

#### 禁用状态

<Tabs-Disabled />

```vue
<v-tabs v-model="tabsActive" @tab-click="handleTabClick">
    <v-tab-head>
        <v-tab-nav name="first">用户</v-tab-nav>
        <v-tab-nav name="second" disabled>配置管理</v-tab-nav>
        <v-tab-nav name="third">角管理</v-tab-nav>
        <v-tab-nav name="fourth" disabled>定时任务补偿</v-tab-nav>
    </v-tab-head>
    <v-tab-body>
        <v-tab-pane name="first">用户管理用户管理</v-tab-pane>
        <v-tab-pane name="third">角色管理角色管理</v-tab-pane>
    </v-tab-body>
</v-tabs>

<script>
export default {
    data () {
        return {
            tabsActive: 'first'
        }
    },
    methods: {
        handleTabClick (val) {
            console.log(val)
        }
    }
}
</script>

<style lang="scss" scoped>
.v-tabs {
    color: #000;
}
</style>
```

#### Tabs Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| value / v-mode | 绑定值，选中选项卡的 name | string |-     |-

#### Tabs Events

| 事件名称        | 说明         | 回调参数    
| ---------- |--------------| -------
| tab-click   | tab 被选中时触发  | 被选中的标签 name | 

#### TabsNav Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| name   | 与选项卡绑定值 value 对应的标识符，表示选项卡别名  | string | - | -
| disabled   | 是否禁用       | boolean | - | false

#### TabsPane Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| name   | 与选项卡绑定值 value 对应的标识符，表示选项卡别名  | string | - | -
| label   | 是否禁用       | boolean | - | false
