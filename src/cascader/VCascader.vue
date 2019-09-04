<template>
    <div class="v-cascader" v-click-body-outside="close">
        <v-input :value="inputValue" readonly @click.native="toggle" />
        <div class="popover" v-show="visible">
            <v-cascader-panel :value="value"
                              :props="props"
                              :options="options"
                              @change="onChange" />
        </div>
    </div>
</template>

<script>
import VInput from '../VInput'
import VCascaderPanel from './VCascaderPanel'
import clickBodyOutside from '../directives/clickBodyOutside'

export default {
    name: 'VCascader',
    model: {
        prop: 'value',
        event: 'change'
    },
    directives: {
        'click-body-outside': clickBodyOutside
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
        },
        props: {
            type: Object,
            default () {
                return Object.create(null)
            }
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
    display: inline-block;

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
