---
title: Layout 布局
---

### Layout 布局

#### 基础用法

<Layout-Basis />
``` vue
<v-row>
    <v-col :span="24">
        <div class="content dark"></div>
    </v-col>
</v-row>
<v-row>
    <v-col :span="12">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="12">
        <div class="content light"></div>
    </v-col>
</v-row>
<v-row>
    <v-col :span="8">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="8">
        <div class="content light"></div>
    </v-col>
    <v-col :span="8">
        <div class="content dark"></div>
    </v-col>
</v-row>
<v-row>
    <v-col :span="6">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="6">
        <div class="content light"></div>
    </v-col>
    <v-col :span="6">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="6">
        <div class="content light"></div>
    </v-col>
</v-row>
<v-row>
    <v-col :span="4">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="4">
        <div class="content light"></div>
    </v-col>
    <v-col :span="4">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="4">
        <div class="content light"></div>
    </v-col>
    <v-col :span="4">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="4">
        <div class="content light"></div>
    </v-col>
</v-row>

<style lang="scss">
.v-row:not(:last-of-type) {
    margin-bottom: 20px;
}
.content {
    height: 36px;
    border-radius: 4px;
}
.dark {
    background-color: #d3dce6;
}
.light {
    background-color: #e5e9f2;
}
</style>
```

#### 分栏偏移

<Layout-Offset />
```vue
<v-row :gutter="20">
    <v-col :span="6">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="6" :offset="6">
        <div class="content light"></div>
    </v-col>
</v-row>
<v-row :gutter="20">
    <v-col :span="6" :offset="6">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="6" :offset="6">
        <div class="content light"></div>
    </v-col>
</v-row>
<v-row :gutter="20">
    <v-col :span="12" :offset="6">
        <div class="content dark"></div>
    </v-col>
</v-row>

<style lang="scss">
.v-row:not(:last-of-type) {
    margin-bottom: 20px;
}
.content {
    height: 36px;
    border-radius: 4px;
}
.dark {
    background-color: #d3dce6;
}
.light {
    background-color: #e5e9f2;
}
</style>
```

#### 对齐方式

<Layout-Align />
``` vue
<v-row>
    <v-col :span="6">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="6">
        <div class="content light"></div>
    </v-col>
    <v-col :span="6">
        <div class="content dark"></div>
    </v-col>
</v-row>
<v-row align="center">
    <v-col :span="6">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="6">
        <div class="content light"></div>
    </v-col>
    <v-col :span="6">
        <div class="content dark"></div>
    </v-col>
</v-row>
<v-row align="right">
    <v-col :span="6">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="6">
        <div class="content light"></div>
    </v-col>
    <v-col :span="6">
        <div class="content dark"></div>
    </v-col>
</v-row>

<style lang="scss">
.v-row {
    padding: 10px 0;
    background-color: #f9fafc;

    &:not(:last-of-type) {
        margin-bottom: 20px;
    }
}
.content {
    height: 36px;
    border-radius: 4px;
}
.dark {
    background-color: #d3dce6;
}
.light {
    background-color: #e5e9f2;
}
</style>
```

#### 响应式布局

<Layout-Responsive />
``` vue
<v-row :gutter="10">
    <v-col :span="6" :ipad="{ span: 8 }" :narrow-pc="{ span: 6 }" :wide-pc="{ span: 4 }">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="6" :ipad="{ span: 4 }" :narrow-pc="{ span: 6 }" :wide-pc="{ span: 8 }">
        <div class="content light"></div>
    </v-col>
    <v-col :span="6" :ipad="{ span: 4 }" :narrow-pc="{ span: 6 }" :wide-pc="{ span: 8 }">
        <div class="content dark"></div>
    </v-col>
    <v-col :span="6" :ipad="{ span: 8 }" :narrow-pc="{ span: 6 }" :wide-pc="{ span: 4 }">
        <div class="content light"></div>
    </v-col>
</v-row>

<style lang="scss">
.content {
    height: 36px;
    border-radius: 4px;
}
.dark {
    background-color: #d3dce6;
}
.light {
    background-color: #e5e9f2;
}
</style>
```

#### Row Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| gutter      | 栅格间隔     | string / number | -     | -
| align   | flex 布局下的垂直排列方式  | string | right / left / center | -

#### Col Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| span      | 栅格占据的列数     | string / number | - | -
| offset   | 栅格左侧的间隔格数  | string / number | - | -
| ipad     | ```≥577px``` 响应式栅格数或者栅格属性对象  | object（例如： {span: 4, offset: 4}） | - | -
| narrowPc | ```≥769px``` 响应式栅格数或者栅格属性对象  | object（例如： {span: 4, offset: 4}） | - | -
| widePc   | ```≥1201px``` 响应式栅格数或者栅格属性对象  | object（例如： {span: 4, offset: 4}） | - | -
