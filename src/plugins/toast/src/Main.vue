<template>
    <div class="v-toast" :class="classes">
        <div class="inner" :class="innerClass">
            <div class="message">
                <div v-if="enableHTML" v-html="$slots.default"></div>
                <slot v-else></slot>
            </div>
            <div class="close-btn" v-if="closeBtnText" @click="close">
                <span>{{ closeBtnText }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VToast',
    data () {
        return {
            innerClass: ''
        }
    },
    props: {
        className: {
            type: String,
            default: ''
        },
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
        classes ({ position, closeBtnText, className }) {
            return [
                `v-toast-position-${position}`,
                closeBtnText && 'v-toast-has-close-btn',
                className
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
            this.innerClass = 'leave'
            this.$el.addEventListener('animationend', this.animationend)
        },
        animationend () {
            this.$el.removeEventListener('animationend', this.animationend)
            this.$el.remove()
            this.$emit('close')
            this.$destroy()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../_var';

$animation-duration: .3s;

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes slide-in-up {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-out-up {
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-100%);
    }
}

@keyframes slide-in-bottom {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-out-bottom {
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(100%);
    }
}

.v-toast {
    position: fixed;
    z-index: 200;
    left: 50%;
    transform: translateX(-50%);

    .inner {
        display: flex;
        align-items: center;
        max-width: 70vw;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.75);
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
        border-radius: 4px;

        .message {
            padding: 10px 16px;
            font-size: $font-size;
        }

        .close-btn {
            flex-shrink: 0;
            align-self: stretch;
            padding: 0 16px;
            display: flex;
            align-items: center;
            border-left: 1px solid #656565;
            cursor: pointer;
        }
    }

    &.v-toast-position-top {
        top: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;

        .inner {
            animation: slide-in-up $animation-duration;

            &.leave {
                animation: slide-out-up $animation-duration;
            }
        }
    }

    &.v-toast-position-middle {
        top: 50%;
        transform: translate(-50%, -50%);

        .inner {
            animation: fade-in $animation-duration;

            &.leave {
                animation: fade-out $animation-duration;
            }
        }
    }

    &.v-toast-position-bottom {
        bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .inner {
            animation: slide-in-bottom $animation-duration;

            &.leave {
                animation: slide-out-bottom $animation-duration;
            }
        }
    }

    &.v-toast-has-close-btn .inner .message {
        padding-right: 0;
    }
}
</style>
