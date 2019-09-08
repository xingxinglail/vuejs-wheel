<template>
    <transition :name="transition">
        <div class="v-carousel-item"
             :class="{ reverse }"
             v-show="visible">
            <slot />
        </div>
    </transition>
</template>

<script>
export default {
    name: 'VCarouselItem',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            transition: '',
            visible: false,
            reverse: false,
            isVertical: false
        }
    },
    created () {
        this.$nextTick(() => {
            this.transition = this.isVertical ? 'v-carousel-item-vertical' : 'v-carousel-item'
        })
    }
}
</script>

<style lang="scss" scoped>
.v-carousel-item-enter-active,
.v-carousel-item-leave-active,
.v-carousel-item-vertical-enter-active,
.v-carousel-item-vertical-leave-active {
    transition: transform .5s linear;

    &.v-carousel-item-leave-active,
    &.v-carousel-item-vertical-leave-active {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
}

.v-carousel-item-enter {
    transform: translate3d(100%, 0, 0);

    &.reverse {
        transform: translate3d(-100%, 0, 0);
    }
}

.v-carousel-item-vertical-enter {
    transform: translate3d(0, 100%, 0);

    &.reverse {
        transform: translate3d(0, -100%, 0);
    }
}

.v-carousel-item-leave-to {
    transform: translate3d(-100%, 0, 0);

    &.reverse {
        transform: translate3d(100%, 0, 0);
    }
}

.v-carousel-item-vertical-leave-to {
    transform: translate3d(0, -100%, 0);

    &.reverse {
        transform: translate3d(0, 100%, 0);
    }
}
</style>
