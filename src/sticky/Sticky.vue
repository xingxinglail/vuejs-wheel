<template>
    <div class="v-sticky" ref="wrapper" :style="{ height }">
        <div class="v-sticky-inner" ref="inner" :class="{ sticky }" :style="{ top, left, width }">
            <slot />
        </div>
    </div>
</template>

<script>
import { getPosition } from '../helper/dom'

export default {
    name: 'Sticky',
    props: {
        distance: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            sticky: false,
            top: undefined,
            left: undefined,
            width: undefined,
            height: undefined
        }
    },
    created () {
        this._initTop = 0
        this._initLeft = 0
    },
    mounted () {
        const { wrapper, inner } = this.$refs
        this._innerDom = inner
        this._initTop = getPosition(wrapper).top
        window.addEventListener('scroll', this.onScrollHandle)
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.onScrollHandle)
    },
    methods: {
        onScrollHandle () {
            const scrollY = window.scrollY
            const { distance, _initTop } = this
            if (scrollY + distance >= _initTop) {
                const { width, left, height } = this._innerDom.getBoundingClientRect()
                this.width = `${width}px`
                this.left = `${left}px`
                this.top = `${distance}px`
                this.height = `${height}px`
                this.sticky = true
            } else {
                this.sticky = false
                this.width = undefined
                this.left = undefined
                this.top = undefined
                this.height = undefined
            }
        }
    },
    watch: {
        sticky (v) {
            this.$emit('change', v)
        }
    }
}
</script>

<style lang="scss" scoped>
.v-sticky {

    .v-sticky-inner {

        &.sticky {
            position: fixed;
            z-index: 10;
        }
    }
}
</style>
