<template>
    <div class="v-menu-item" :class="{ 'v-menu-item-active' : isActive }" @click="onClick">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'VMenuItem',
    inject: ['root'],
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            isActive: false
        }
    },
    created () {
        this.root.addItem(this)
    },
    methods: {
        onClick () {
            if (this.isActive) return
            this.$emit('menu-item-click', this.name)
        },
        updateNamePath () {
            this.root.namePath = []
            const { updateNamePath } = this.$parent
            if (updateNamePath) {
                updateNamePath(this.name)
            } else {
                this.root.namePath.unshift(this.name)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
