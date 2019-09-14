<template>
    <div class="v-menu" :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'VMenu',
    provide () {
        return {
            root: this
        }
    },
    props: {
        defaultActive: {
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default: 'vertical',
            validator (value) {
                return ['horizontal', 'vertical'].includes(value)
            }
        },
        menuTrigger: {
            type: String,
            default: 'hover',
            validator (value) {
                return ['click', 'hover'].includes(value)
            }
        },
        defaultOpeneds: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            active: this.defaultActive,
            namePath: []
        }
    },
    computed: {
        classes ({ mode }) {
            return [`v-menu-${mode}`]
        }
    },
    created () {
        this._itemVmChildren = []
        this._subVmChildren = []
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            this.initItemVmChildrenHandle()
            this.initSubVmChildrenHandle()
        },
        initItemVmChildrenHandle () {
            const { _itemVmChildren, active, updateChildren } = this
            _itemVmChildren.forEach(vm => {
                vm.$on('menu-item-click', updateChildren)
                if (vm.name === active) {
                    vm.isActive = true
                    vm.updateNamePath()
                }
            })
        },
        initSubVmChildrenHandle () {
            const { defaultOpeneds, _subVmChildren } = this
            if (defaultOpeneds.length > 0 && _subVmChildren.length > 0) {
                defaultOpeneds.forEach(name => {
                    _subVmChildren.forEach(vm => {
                        if (name === vm.name) {
                            vm.show()
                        }
                    })
                })
            }
        },
        addItem (vm) {
            this._itemVmChildren.push(vm)
        },
        addSub (vm) {
            this._subVmChildren.push(vm)
        },
        updateChildren (curVm) {
            this._itemVmChildren.forEach(vm => {
                if (curVm === vm) {
                    this.active = vm.name
                    vm.isActive = true
                } else {
                    vm.isActive = false
                }
            })
            console.log(this.active)
            console.log(this.namePath)
            this.$emit('select', this.active, this.namePath)
        }
    }
}
</script>

<style lang="scss">
@import '../var';

$active-color: #303133;

.v-menu {
    font-size: $font-size;

    .v-menu-item, .v-sub-menu .v-sub-menu-title {
        cursor: pointer;
    }

    &.v-menu-horizontal {
        display: flex;
        border-bottom: 1px solid #e6e6e6;
        color: #909399;

        .v-menu-item, .v-sub-menu .v-sub-menu-title {
            height: 60px;
            line-height: 60px;
            padding: 0 20px;
            border-bottom: 2px solid transparent;
            transition: color .3s, border-color .3s;

            &:hover {
                color: $active-color;
            }

            &.v-menu-item-active, &.v-sub-menu-title-active {
                color: $active-color;
                border-bottom: 2px solid #409eff;
            }
        }

        .v-sub-menu {
            position: relative;

            .v-menu-item, .v-sub-menu .v-sub-menu-title {
                padding: 0 10px;
                height: 36px;
                line-height: 36px;
            }

            .v-sub-menu-popover {
                min-width: 200px;
                position: absolute;
                top: 60px;
                left: 0;
                border-radius: $border-radius;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                margin-top: 6px;

                .v-menu-item, .v-sub-menu-title {
                    border-bottom: none;
                }

                .v-sub-menu-popover {
                    top: 0;
                    left: 100%;
                    margin-top: 0;
                    margin-left: 6px;
                }
            }
        }
    }
}
</style>
