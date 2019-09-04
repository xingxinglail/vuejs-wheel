---
title: Container 布局容器
---

### Container 布局容器

#### 常见页面布局

<Container-Basis />
``` vue
<v-layout>
    <v-header>Header</v-header>
    <v-content>Content</v-content>
</v-layout>

<v-layout>
    <v-header>Header</v-header>
    <v-content>Content</v-content>
    <v-footer>Footer</v-footer>
</v-layout>

<v-layout>
    <v-aside width="200px">Aside</v-aside>
    <v-content>Content</v-content>
</v-layout>

<v-layout>
    <v-header>Header</v-header>
    <v-layout>
        <v-aside width="200px">Aside</v-aside>
        <v-content>Content</v-content>
    </v-layout>
</v-layout>

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

<v-layout>
    <v-aside width="200px">Aside</v-aside>
    <v-layout>
        <v-header>Header</v-header>
        <v-content>Content</v-content>
    </v-layout>
</v-layout>

<v-layout>
    <v-aside width="200px">Aside</v-aside>
    <v-layout>
        <v-header>Header</v-header>
        <v-content>Content</v-content>
        <v-footer>Footer</v-footer>
    </v-layout>
</v-layout>

<style lang="scss">
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

#### Header Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| height    | 顶栏高度     | string  | -     | 60px

#### Aside Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| width    | 侧边栏宽度     | string  | -     | 300px

#### Footer Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| height    | 底栏高度     | string  | -     | 60px
