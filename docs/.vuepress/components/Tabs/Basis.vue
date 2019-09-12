<template>
    <div class="wrapper">
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
    </div>
</template>

<script>
import Tabs from '../../../../src/tabs/VTabs'
import TabHead from '../../../../src/tabs/VTabHead'
import TabBody from '../../../../src/tabs/VTabBody'
import TabNav from '../../../../src/tabs/VTabNav'
import TabPane from '../../../../src/tabs/VTabPane'
import Icon from '../../../../src/icon/VIcon'

export default {
    name: 'TabsBasis',
    data () {
        return {
            tabsActive: 'first'
        }
    },
    methods: {
        handleTabClick (val) {
            console.log(val)
        }
    },
    components: {
        'v-tabs': Tabs,
        'v-tab-head': TabHead,
        'v-tab-body': TabBody,
        'v-tab-nav': TabNav,
        'v-tab-pane': TabPane,
        'v-icon': Icon
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 16px;
}

.v-tabs {
    color: #000;

    .v-icon {
        cursor: pointer;
    }
}
</style>
