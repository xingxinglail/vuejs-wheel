<template>
    <div class="v-collapse">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VCollapse',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: [String, Array],
            default: '',
            validator (value) {
                return typeof value === 'string' || Array.isArray(value)
            }
        },
        accordion: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this._children = []
    },
    mounted () {
        const { value } = this
        const valueIsArray = Array.isArray(value)
        this.$slots.default.filter(vnode => vnode.componentInstance).forEach((vnode, index) => {
            const componentInstance = vnode.componentInstance
            if (componentInstance.$options.name === 'VCollapseItem') {
                this._children.push(componentInstance)
                let { name } = componentInstance
                if (!name) name = `${index + 1}`
                componentInstance.relaName = name
                console.log(componentInstance);
                if (valueIsArray) {
                    if (value.includes(name)) componentInstance.visible = true
                } else {
                    if (value === name) componentInstance.visible = true
                }
                componentInstance.onClick = this.onClick
            }
        })
    },
    methods: {
        onClick (v) {
            const { value, _children, accordion } = this
            _children.forEach(vm => {
                if (v === vm.relaName) {
                    vm.visible = !vm.visible
                } else {
                    if (accordion) vm.visible = false
                }
            })
            let _value = v
            if (Array.isArray(value)) {
                _value = _children.filter(vm => vm.visible).map(vm => vm.relaName)
            }
            this.$emit('change', _value)
        }
    }
}
</script>

<style lang="scss" scoped>
.v-collapse {
    border: 1px solid #999;
    border-radius: 4px;
}
</style>
