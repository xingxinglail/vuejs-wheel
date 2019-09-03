<template>
    <div class="v-cascader-panel">
        <div class="v-cascader-menu" v-for="(data, index) in selectValue" :key="index">
            <div class="v-cascader-menu-item"
                 v-for="menu in data.menus"
                 :key="menu.value"
                 :class="{ 'v-cascader-menu-item-selected': data.value === menu.value }"
                 @click="handleSelect(index, menu)">
                <span class="text">{{ menu.label }}</span>
                <v-icon name="right" v-if="rightIconVisible(menu)" />
            </div>
        </div>
    </div>
</template>

<script>
import VIcon from '../VIcon'

const aryStringEqual = (arrA = [], arrB = []) => {
    const aLen = arrA.length
    if (aLen !== arrB.length) return false
    for (let i = 0; i < aLen; i++) {
        if (arrA[i] !== arrB[i]) return false
    }
    return true
}

export default {
    name: 'VCascaderPanel',
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            selectValue: [{
                value: '',
                label: '',
                menus: this.options
            }],
            checkValue: []
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
        }
    },
    methods: {
        rightIconVisible ({ leaf, children }) {
            return leaf ? false : Array.isArray(children) && children.length > 0
        },
        handleSelect (index, { value, label, leaf, children }) {
            const { selectValue } = this
            selectValue.splice(index + 1)
            selectValue[index].value = value
            selectValue[index].label = label
            if (leaf) {
                this.leafHandle(selectValue)
            } else {
                if (Array.isArray(children)) {
                    selectValue.push({
                        value: '',
                        label: '',
                        menus: children
                    })
                } else {
                    this.leafHandle(selectValue)
                }
            }
        },
        leafHandle (selectValue) {
            const values = []
            const labels = []
            selectValue.forEach(({ value, label }) => {
                values.push(value)
                labels.push(label)
            })
            this.checkValue = values
            this.$emit('change', values)
            this.parentHandle(labels)
        },
        parentHandle (labels) {
            const { $parent } = this
            if ($parent.$options.name === 'VCascader') {
                $parent.inputValueHandle(labels)
            }
        },
        updateSelectValue (options, value) {
            this.selectValue = []
            let _tmp = options
            for (let i = 0; i < value.length; i++) {
                const node = _tmp.find(c => value[i] === c.value)
                if (node) {
                    const { value, label, children } = node
                    const data = {
                        value,
                        label,
                        menus: _tmp
                    }
                    this.selectValue.splice(i, 1, data)
                    if (Array.isArray(children) && children.length > 0) _tmp = children
                }
            }
            this.parentHandle(this.selectValue.map(c => c.label))
        }
    },
    watch: {
        value: {
            immediate: true,
            handler (v) {
                if (aryStringEqual(v, this.checkValue)) {
                    return
                }
                this.checkValue = v
                this.updateSelectValue(this.options, v)
            }
        },
        options (v) {
            this.selectValue = [{
                value: '',
                label: '',
                menus: v
            }]
            this.updateSelectValue(v, this.value)
        }
    },
    components: {
        VIcon
    }
}
</script>

<style lang="scss" scoped>
@import '../_var';

.v-cascader-panel {
    display: flex;
    align-items: flex-start;
    background-color: #fff;

    .v-cascader-menu {
        min-width: 180px;
        height: 204px;
        border: 1px solid #e4e7ed;
        box-sizing: border-box;
        padding: 12px 0;
        overflow: scroll;

        &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        & + .v-cascader-menu {
            margin-left: -1px;
        }

        .v-cascader-menu-item {
            height: $height;
            line-height: $height;
            padding: 0 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: $font-size;

            .text {
                flex: 1;
                padding-right: 14px;
                white-space: nowrap;
            }

            .v-icon {
                width: 10px;
                height: 10px;
                color: #606266;
            }

            &:hover {
                background-color: #eee;
            }

            &.v-cascader-menu-item-selected {
                background-color: #eee;
            }
        }
    }
}
</style>
