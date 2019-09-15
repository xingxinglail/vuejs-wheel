<template>
    <div class="v-menu" :class="classes" :style="styles">
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
        },
        router: {
            type: Boolean,
            default: false
        },
        styles: {
            type: Object,
            default () {
                return Object.create(null)
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
            const { _itemVmChildren, active, afterUpdateChildren } = this
            _itemVmChildren.forEach(vm => {
                vm.$on('menu-item-click', afterUpdateChildren)
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
        afterUpdateChildren (name) {
            this.updateChildren(name)
            if (this.router && this.$router) this.$router.push(this.active)
            this.$emit('select', this.active, this.namePath)
        },
        updateChildren (name) {
            this.active = name
            this._itemVmChildren.forEach(vm => {
                if (vm.name === name) {
                    this.active = name
                    vm.isActive = true
                    vm.updateNamePath()
                } else {
                    vm.isActive = false
                }
            })
        }
    },
    watch: {
        defaultActive (v, oldV) {
            if (v !== oldV) this.updateChildren(v)
        }
    }
}
</script>

<style lang="scss">
@import '../var';

$active-color: #303133;

.v-menu {
    font-size: $font-size;
    user-select: none;

    .v-menu-item, .v-sub-menu .v-sub-menu-title {
        cursor: pointer;
        padding: 0 20px;
    }

    &.v-menu-horizontal {
        display: flex;
        border-bottom: 1px solid #e6e6e6;
        color: #909399;

        .v-menu-item, .v-sub-menu .v-sub-menu-title {
            height: 60px;
            line-height: 60px;
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

            .v-sub-menu .v-sub-menu-title {
                display: flex;
                justify-content: space-between;

                .v-icon {
                    margin-right: 8px;
                    transform: rotate(270deg);
                }
            }

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
                z-index: 1;
                border-radius: $border-radius;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                margin-top: 6px;
                background-color: #fff;

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

            &.v-sub-menu-opened > .v-sub-menu-title .v-icon {
                transform: rotate(180deg);
            }

            .v-sub-menu.v-sub-menu-opened > .v-sub-menu-title .v-icon {
                transform: rotate(450deg);
            }
        }
    }

    &.v-menu-vertical {
        border-right: 1px solid #e6e6e6;
        color: #303133;

        .v-menu-item, .v-sub-menu .v-sub-menu-title {
            height: 56px;
            line-height: 56px;
            transition: color .3s, background-color .3s;

            &:hover {
                background-color: #ecf5ff;
            }

            &.v-menu-item-active {
                color: #409eff;
            }

            &.v-sub-menu-title {
                display: flex;
                justify-content: space-between;
            }
        }

        .v-sub-menu {

            .v-sub-menu-popover {
                overflow-y: hidden;
            }

            &.v-sub-menu-opened > .v-sub-menu-title .v-icon {
                transform: rotate(180deg);
            }
        }
    }
}
</style>
