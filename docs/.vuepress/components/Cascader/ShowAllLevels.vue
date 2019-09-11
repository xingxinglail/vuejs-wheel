<template>
    <div class="container">
        <br />
        <v-cascader :options="options" :show-all-levels="false"></v-cascader>
        <br />
    </div>
</template>

<script>
import VCascader from '../../../../src/cascader/VCascader'
import VCascaderPanel from '../../../../src/cascader/VCascaderPanel'

export default {
    name: 'CascaderShowAllLevels',
    data () {
        return {
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }]
            }]
        }
    },
    components: {
        'v-cascader': VCascader,
        'v-cascader-panel': VCascaderPanel
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    z-index: 4;
}
</style>
