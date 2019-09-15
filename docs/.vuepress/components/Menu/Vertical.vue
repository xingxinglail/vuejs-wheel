<template>
    <div class="wrapper">
        <v-menu default-active="/javascript" :default-openeds="['/programming-language', '/framework']" :styles="{ width: '240px' }">
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
</template>

<script>
import Menu from '../../../../src/menu/VMenu'
import MenuItem from '../../../../src/menu/VMenuItem'
import SubMenu from '../../../../src/menu/VSubMenu'

export default {
    name: 'MenuVertical',
    components: {
        'v-menu': Menu,
        'v-menu-item': MenuItem,
        'v-sub-menu': SubMenu
    }
}
</script>

<style lang="scss">
.wrapper {
    padding-top: 16px;
}
</style>
