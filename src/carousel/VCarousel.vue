<template>
    <div class="v-carousel"
         :class="{ 'v-carousel-vertical': direction === 'vertical' }"
         @mouseenter="onMouseenter"
         @mouseleave="onMouseleave">
        <div class="v-carousel-item-wrapper">
            <slot />
        </div>
        <div class="v-carousel-indicator">
            <div class="v-carousel-dot v-carousel-dot-prev"
                 v-if="direction === 'horizontal'"
                 @click="prev">
                <v-icon name="left" />
            </div>
            <div class="v-carousel-dot v-carousel-dot-prev"
                 v-else
                 @click="prev">
                <v-icon name="up" />
            </div>
            <div class="v-carousel-dot"
                 v-for="n in carouselItemLength"
                 :key="n"
                 @click="changeSlide(n - 1)"
                 :class="{ active: currentIndex + 1 === n }">{{ n }}</div>
            <div class="v-carousel-dot v-carousel-dot-next"
                 v-if="direction === 'horizontal'"
                 @click="next">
                <v-icon name="right" />
            </div>
            <div class="v-carousel-dot v-carousel-dot-next"
                 v-else
                 @click="next">
                <v-icon name="down" />
            </div>
        </div>
    </div>
</template>

<script>
import VIcon from '../VIcon'

export default {
    name: 'VCarousel',
    props: {
        autoplay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 3000
        },
        activeName: {
            type: String,
            default: ''
        },
        direction: {
            type: String,
            default: 'horizontal',
            validator (value) {
                return ['horizontal', 'vertical'].includes(value)
            }
        }
    },
    data () {
        return {
            currentIndex: 0,
            carouselItemLength: 0
        }
    },
    created () {
        this._timer = null
        this._carouselItems = []
    },
    mounted () {
        const carouselItems = this.$children.filter(c => c.$options.name === 'VCarouselItem')
        this.carouselItemLength = carouselItems.length
        this._carouselItems = carouselItems
        this.init(carouselItems)
    },
    beforeDestroy () {
        if (this.autoplay || this._timer) {
            this.clearTimeout()
        }
    },
    methods: {
        init (carouselItems) {
            if (carouselItems.length <= 0) return
            const active = this.activeName
            const vertical = this.direction === 'vertical'
            if (active) {
                carouselItems.forEach((vm, i) => {
                    if (vm.name === active) {
                        vm.visible = true
                        this.currentIndex = i
                    } else {
                        vm.visible = false
                    }
                    vm.isVertical = vertical
                })
            } else {
                carouselItems.forEach((vm, i) => {
                    vm.isVertical = vertical
                })
                carouselItems[0].visible = true
            }
            if (this.autoplay) this.playAutomatically()
        },
        next () {
            const nextIndex = this.currentIndex + 1
            this.changeSlide(nextIndex)
        },
        prev () {
            const nextIndex = this.currentIndex - 1
            this.changeSlide(nextIndex)
        },
        changeSlide (index) {
            const { _carouselItems } = this
            const isReverse = index < this.currentIndex
            if (index < 0) index = _carouselItems.length - 1
            if (index > _carouselItems.length - 1) index = 0
            this.currentIndex = index
            const vm = _carouselItems[index]
            vm.visible = true
            _carouselItems.forEach(child => {
                if (vm !== child) child.visible = false
                child.reverse = isReverse
            })
            this.$emit('update:activeName', vm.name)
            this.$emit('change', index)
        },
        playAutomatically () {
            if (this._timer) return
            const run = () => {
                this._timer = setTimeout(() => {
                    this.next()
                    run()
                }, this.interval)
            }
            run()
        },
        clearTimeout () {
            clearTimeout(this._timer)
            this._timer = null
        },
        onMouseenter () {
            this.clearTimeout()
        },
        onMouseleave () {
            if (this.autoplay) this.playAutomatically()
        }
    },
    watch: {
        autoplay (v) {
            if (v) {
                this.playAutomatically()
            } else {
                this.clearTimeout()
            }
        }
    },
    components: {
        'v-icon': VIcon
    }
}
</script>

<style lang="scss" scoped>
.v-carousel {
    width: 100%;
    position: relative;
    display: inline-block;

    .v-carousel-item-wrapper {
        position: relative;
        overflow: hidden;
    }

    .v-carousel-indicator {
        position: absolute;
        z-index: 1;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        display: flex;
        align-items: flex-start;

        .v-carousel-dot {
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            background-color: #d8d8d8;
            margin: 0 8px;
            border-radius: 50%;

            &.v-carousel-dot-prev .v-icon,
            &.v-carousel-dot-next .v-icon {
                width: 10px;
                height: 10px;
                line-height: 22px;
            }

            &:hover {
                cursor: pointer;
            }

            &.active {
                cursor: default;
                color: #fff;
                background-color: #4cc0ff;
            }
        }
    }

    &.v-carousel-vertical {

        .v-carousel-indicator {
            top: 50%;
            right: 20px;
            left: inherit;
            bottom: inherit;
            transform: translateY(-50%);
            flex-direction: column;

            .v-carousel-dot {
                margin: 8px 0;
            }
        }
    }
}
</style>
