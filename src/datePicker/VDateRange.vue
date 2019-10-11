<template>
    <div class="v-date-picker-date-range">
        <v-input ref="startInput"
                 v-model="startValue"
                 placeholder="选择日期" />
        <v-input ref="endInput"
                 v-model="endValue"
                 placeholder="选择日期" />
        <div class="v-date-picker-panel"
             v-if="popperVisible"
             v-show="visible"
             ref="popper">
            <v-date-panel :data="data"
                          :current="current"
                          :panel="panel"
                          @select="onSelect"
                          @change-date="onChangeDate" />
        </div>
    </div>
</template>

<script>
import VDatePanel from './VDatePanel'
import Popper from '../mixins/popper'

export default {
    name: 'VDateRange',
    mixins: [Popper],
    data () {
        return {
            startValue: '',
            endValue: '',
            data: [],
            inputValue: '',
            current: {
                year: 0,
                month: 0,
                date: 0
            },
            panel: {
                year: 0,
                month: 0,
                monthStr: '0',
                date: 0,
                dateStr: '0'
            },
            visible: false
        }
    },
    components: {
        'v-date-panel': VDatePanel
    }
}
</script>

<style lang="scss" scoped>

</style>
