<template>
    <div class="v-cascader">
        <v-input :value="inputValue" readonly @click.native="toggle" />
        <div class="popover">
            <v-cascader-panel v-show="visible"
                              :value="value"
                              :options="options"
                              @change="onChange" />
        </div>
<!--        <div class="v-cascader-panel" v-show="visible">-->
<!--            <div class="v-cascader-menu" v-for="(data, index) in selectValue" :key="data.value">-->
<!--                <div class="v-cascader-menu-item"-->
<!--                     v-for="menu in data.menus"-->
<!--                     :key="menu.value"-->
<!--                     :class="{ 'v-cascader-menu-item-selected': data.value === menu.value }"-->
<!--                     @click="handleSelect(index, menu)">-->
<!--                    <span class="text">{{ menu.label }}</span>-->
<!--                    <v-icon name="right" v-if="rightIconVisible(menu)" />-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
import VInput from '../VInput'
import VCascaderPanel from './VCascaderPanel'

export default {
    name: 'VCascader',
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            visible: false,
            inputValue: ''
        }
    },
    props: {
        value: {
            type: Array,
            default: () => ([])
        },
        options: {
            type: Array,
            default: () => ([])
        },
        separator: {
            type: String,
            default: '/'
        }
    },
    methods: {
        open () {
            this.visible = true
        },
        close () {
            this.visible = false
        },
        toggle () {
            this.visible ? this.close() : this.open()
        },
        onChange (value) {
            this.$emit('change', value)
            this.close()
        },
        inputValueHandle (labels) {
            this.inputValue = labels.join(this.separator)
        }
    },
    components: {
        VInput,
        VCascaderPanel
    }
}
</script>

<style lang="scss" scoped>
.v-cascader {
    position: relative;
    z-index: 1;

    /deep/ .v-input input {
        cursor: pointer;
    }

    .popover {
        position: absolute;
        left: 0;
        top: 44px;
    }
}
</style>
