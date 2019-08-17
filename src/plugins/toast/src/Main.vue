<template>
    <div class="v-toast" :class="classes">
        <div class="message">
            <div v-if="enableHTML" v-html="$slots.default"></div>
            <slot v-else></slot>
        </div>
        <div class="close-btn" v-if="closeBtnText" @click="close">
            <span>{{ closeBtnText }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VToast',
    props: {
        enableHTML: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 3000
        },
        closeBtnText: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'top',
            validator (value) {
                return ['top', 'middle', 'bottom'].includes(value)
            }
        }
    },
    created () {
        this.closeTimer = null
    },
    mounted () {
        this.autoClose()
    },
    beforeDestroy () {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer)
            this.closeTimer = null
        }
    },
    computed: {
        classes ({ position, closeBtnText }) {
            return [
                `v-toast-position-${position}`,
                closeBtnText && 'v-toast-has-close-btn'
            ]
        }
    },
    methods: {
        autoClose () {
            const { duration } = this
            if (duration > 0) {
                this.closeTimer = setTimeout(() => {
                    this.close()
                }, duration)
            }
        },
        close () {
            this.$el.remove()
            this.$emit('close')
            this.$destroy()
        }
    }
}
</script>

<style lang="scss" scoped>
.v-toast {
    position: fixed;
    z-index: 10;
    left: 50%;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.75);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    max-width: 70vw;
    color: #fff;
    transform: translateX(-50%);

    .message {
        padding: 10px 16px;
        font-size: 14px;
    }

    &.v-toast-position-top {
        top: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    &.v-toast-position-middle {
        top: 50%;
        transform: translate(-50%, -50%);
    }

    &.v-toast-position-bottom {
        bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .close-btn {
        flex-shrink: 0;
        align-self: stretch;
        padding: 0 16px;
        display: flex;
        align-items: center;
        border-left: 1px solid #656565;
    }

    &.v-toast-has-close-btn .message {
        padding-right: 0;
    }
}
</style>
