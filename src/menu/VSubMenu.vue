<template>
    <div class="v-sub-menu" v-click-body-outside="close">
        <div class="v-sub-menu-title" :class="{ 'v-sub-menu-title-active': isActive }" @click="toggle">
            <slot name="title"></slot>
        </div>
        <div class="v-sub-menu-popover" v-show="visible">
            <slot />
        </div>
    </div>
</template>

<script>
import clickBodyOutside from '../directives/clickBodyOutside'

export default {
    name: 'VSubMenu',
    inject: ['root'],
    directives: {
        'click-body-outside': clickBodyOutside
    },
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            visible: false
        }
    },
    computed: {
        isActive ({ root, name }) {
            return root.namePath.includes(name)
        }
    },
    methods: {
        toggle () {
            this.visible = !this.visible
        },
        close () {
            this.visible = false
        },
        updateNamePath (name) {
            this.root.namePath.unshift(name)
            const { updateNamePath } = this.$parent
            if (updateNamePath) {
                updateNamePath(this.name)
            } else {
                this.root.namePath.unshift(this.name)
            }
            this.close()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../var';
</style>
