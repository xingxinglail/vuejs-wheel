---
title: Carousel 走马灯
---

### Carousel 走马灯

#### 基础用法

<Carousel-Basis />
``` vue
<v-carousel @change="onChange">
    <v-carousel-item name="first">
        <div class="carousel-box">
            1
        </div>
    </v-carousel-item>
    <v-carousel-item name="second">
        <div class="carousel-box">
            2
        </div>
    </v-carousel-item>
    <v-carousel-item name="third">
        <div class="carousel-box">
            3
        </div>
    </v-carousel-item>
</v-carousel>

<script>
export default {
    methods: {
        onChange (val) {
            console.log(val)
        }
    }
}
</script>

<style lang="scss" scoped>
.carousel-box {
    line-height: 200px;
    height: 200px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    background-color: #d0e6ff;
}
</style>
```

#### 方向

<Carousel-Vertical />
```vue
<v-carousel :autoplay="false" direction="vertical">
    <v-carousel-item name="first">
        <div class="carousel-box">
            1
        </div>
    </v-carousel-item>
    <v-carousel-item name="second">
        <div class="carousel-box">
            2
        </div>
    </v-carousel-item>
    <v-carousel-item name="third">
        <div class="carousel-box">
            3
        </div>
    </v-carousel-item>
</v-carousel>

<style lang="scss" scoped>
.carousel-box {
    line-height: 200px;
    height: 200px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    background-color: #d0e6ff;
}
</style>
```


#### Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| activeName  | 初始状态激活的幻灯片的name | string |-     |-
| autoplay   | 是否自动切换  | boolean | - | true
| interval   | 自动切换的时间间隔，单位为毫秒 | number | - | 3000
| direction  | 走马灯展示的方向  | string | horizontal/vertical	 | horizontal

#### Carousel Events

| 事件名称        | 说明         | 回调参数    
| ---------- |--------------| -------
| change  | 幻灯片切换时触发 | 目前激活的幻灯片的索引 

#### Carousel-Item Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| name  | 幻灯片的名字 | string |-     |-
