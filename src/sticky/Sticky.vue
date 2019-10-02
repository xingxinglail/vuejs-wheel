<template>
    <div class="v-sticky"
         ref="wrapper"
         :style="{ height }">
        <div class="v-sticky-inner"
             ref="inner"
             :class="{ sticky }"
             :style="{ top, left, width, transform: translateY }">
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
        },
        container: HTMLElement
    },
    data () {
        return {
            sticky: false,
            top: undefined,
            left: undefined,
            width: undefined,
            height: undefined,
            translateY: undefined
        }
    },
    created () {
        this._initTop = 0
        this._initContainerHeight = 0
    },
    mounted () {
        this.$nextTick(() => {
            console.log(this.container)
        })
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
            const { distance, _initTop, _initContainerHeight } = this
            if (scrollY + distance >= _initTop) {
                const { width, left, height } = this._innerDom.getBoundingClientRect()
                this.width = `${width}px`
                this.left = `${left}px`
                this.top = `${distance}px`
                this.height = `${height}px`
                this.sticky = true
                let y
                if (_initContainerHeight > 0 && _initContainerHeight - (scrollY - _initTop) - distance <= height) {
                    y = height - (_initContainerHeight - (scrollY - _initTop))
                    if (y < height) {
                        y = `translate3d(0, ${-y - distance}px, 0)`
                    } else {
                        this.sticky = false
                        y = undefined
                    }
                }
                this.translateY = y
            } else {
                this.sticky = false
                this.width = undefined
                this.left = undefined
                this.top = undefined
                this.height = undefined
                this.translateY = undefined
            }
        }
    },
    watch: {
        sticky (v) {
            this.$emit('change', v)
        },
        container (v) {
            let height = 0
            if (v) height = v.offsetHeight
            this._initContainerHeight = height
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
