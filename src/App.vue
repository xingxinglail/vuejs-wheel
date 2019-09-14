<template>
    <div>
        <v-menu router mode="horizontal" :default-active="$route.path" :default-openeds="['programming-language']">
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
        <div style="margin-top: 300px;">
            <v-menu mode="horizontal" menu-trigger="click" :default-active="$route.path" :default-openeds="['/programming-language', '/framework']">
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
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    methods: {
        test (val) {
            console.log(val)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
