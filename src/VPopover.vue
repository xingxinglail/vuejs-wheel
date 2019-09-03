<template>
    <div class="v-popover" ref="popover">
        <div ref="contentWrapper"
             class="v-popover-content"
             :style="{ width }"
             :class="[
                `v-popover-placement-common-${placement.split('-')[0]}`,
                `v-popover-placement-${placement}`,
                popperClass
             ]"
             v-show="visible">
            <slot name="content" :close="close"></slot>
        </div>
        <div ref="triggerWrapper"
             class="trigger">
            <slot></slot>
        </div>
    </div>
</template>

<script>

const placementMap = {
    'top-start': 'top-start',
    'top': 'top',
    'top-end': 'top-end',
    'bottom-start': 'bottom-start',
    'bottom': 'bottom',
    'bottom-end': 'bottom-end',
    'left-start': 'left-start',
    'left': 'left',
    'left-end': 'left-end',
    'right-start': 'right-start',
    'right': 'right',
    'right-end': 'right-end'
}

export default {
    name: 'VPopover',
    model: {
        prop: 'value',
        event: 'input'
    },
    data () {
        return {
            visible: false
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        popperClass: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '150px'
        },
        placement: {
            type: String,
            default: 'top',
            validator (value) {
                return placementMap[value] !== undefined
            }
        },
        trigger: {
            type: String,
            default: 'click',
            validator (value) {
                return ['click', 'hover'].includes(value)
            }
        }
    },
    created () {
        this._closeDelay = 200
        this._timer = null
    },
    mounted () {
        const { popover, triggerWrapper, contentWrapper } = this.$refs
        this._popover = popover
        this._triggerWrapper = triggerWrapper
        this._contentWrapper = contentWrapper
        this.addEvent()
    },
    destroyed () {
        this.removeEvent()
        this.close()
        this.cleanup()
        this.removeChild()
    },
    deactivated () {
        this.cleanup()
    },
    methods: {
        doToggle () {
            this.visible = !this.visible
        },
        handleMouseEnter () {
            clearTimeout(this._timer)
            this.visible = true
        },
        handleMouseLeave () {
            clearTimeout(this._timer)
            this._timer = setTimeout(() => {
                this.visible = false
            }, this._closeDelay)
        },
        addEvent () {
            const { trigger, _popover, _contentWrapper } = this
            if (trigger === 'click') {
                _popover.addEventListener('click', this.doToggle)
            }
            if (trigger === 'hover') {
                _popover.addEventListener('mouseenter', this.handleMouseEnter)
                _popover.addEventListener('mouseleave', this.handleMouseLeave)
                _contentWrapper.addEventListener('mouseenter', this.handleMouseEnter)
                _contentWrapper.addEventListener('mouseleave', this.handleMouseLeave)
            }
        },
        removeEvent () {
            const { trigger, _popover, _contentWrapper } = this
            if (trigger === 'click') {
                _popover.removeEventListener('click', this.doToggle)
                document.removeEventListener('click', this.handleDocumentClick)
            }
            if (trigger === 'hover') {
                _popover.removeEventListener('mouseenter', this.handleMouseEnter)
                _popover.removeEventListener('mouseleave', this.handleMouseLeave)
                _contentWrapper.removeEventListener('mouseenter', this.handleMouseEnter)
                _contentWrapper.removeEventListener('mouseleave', this.handleMouseLeave)
            }
        },
        showPopover () {
            this.$nextTick(() => {
                document.body.appendChild(this._contentWrapper)
                this.calcPlacement()
                if (this.trigger === 'click') document.addEventListener('click', this.handleDocumentClick)
            })
        },
        close () {
            this.visible = false
            if (this.trigger === 'click') document.removeEventListener('click', this.handleDocumentClick)
        },
        handleDocumentClick ({ target }) {
            const { _contentWrapper } = this
            if (
                this._popover.contains(target) ||
                target === _contentWrapper ||
                _contentWrapper.contains(target)
            ) return
            this.close()
        },
        calcPlacement () {
            const { placement } = this
            const { contentWrapper } = this.$refs
            const { top: tTop, left: tLeft, width, height } = this._triggerWrapper.getBoundingClientRect()
            const cWidth = contentWrapper.offsetWidth
            const cHeight = contentWrapper.offsetHeight
            const scrollTop = document.scrollingElement.scrollTop
            const scrollLeft = document.scrollingElement.scrollLeft
            let top = tTop + scrollTop
            let left = tLeft + scrollLeft
            switch (placement) {
                case placementMap['top']:
                    left = left - (cWidth - width) / 2
                    break
                case placementMap['top-end']:
                    left = left - (cWidth - width)
                    break
                case placementMap['bottom-start']:
                    top = top + height
                    break
                case placementMap['bottom']:
                    top = top + height
                    left = left - (cWidth - width) / 2
                    break
                case placementMap['bottom-end']:
                    top = top + height
                    left = left - (cWidth - width)
                    break
                case placementMap['left']:
                    top = top - (cHeight - height) / 2
                    break
                case placementMap['left-end']:
                    top = top - (cHeight - height)
                    break
                case placementMap['right-start']:
                    left = left + width
                    break
                case placementMap['right']:
                    left = left + width
                    top = top - (cHeight - height) / 2
                    break
                case placementMap['right-end']:
                    left = left + width
                    top = top - (cHeight - height)
                    break
                default:
                    break
            }
            contentWrapper.style.top = `${top}px`
            contentWrapper.style.left = `${left}px`
        },
        cleanup () {
            clearTimeout(this._timer)
        },
        removeChild () {
            if (this._contentWrapper.parentNode === document.body) {
                document.body.removeChild(this._contentWrapper)
            }
        }
    },
    watch: {
        visible (val) { // value因为是immediate，所以必须要写在下面才能触发第一次visible改变
            if (val) {
                this.showPopover()
                this.$emit('show')
            } else {
                this.close()
                this.$emit('hide')
            }
            this.$emit('input', val)
        },
        value: {
            immediate: true,
            handler (val) {
                this.visible = val
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-popover {
    display: inline-block;
    vertical-align: top;
}

.v-popover-content {
    position: absolute;
    z-index: 999;
    word-break: break-all;
    padding: 12px;
    background-color: #fff;
    border-radius: 6px;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, .2));
    border: 1px solid #999;

    &::before, &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 6px solid transparent;
    }

    &.v-popover-placement-common-top {
        margin-top: -10px;
        transform: translateY(-100%);

        &::before, &::after {
            border-bottom: none;
        }

        &::before {
            top: 100%;
            border-top: 6px solid #999;
        }

        &::after {
            top: calc(100% - 1px);
            border-top: 6px solid #fff;
        }

        &.v-popover-placement-top-start {

            &::before, &::after {
                left: 16px;
            }
        }

        &.v-popover-placement-top {

            &::before, &::after {
                left: 50%;
                margin-left: -6px;
            }
        }

        &.v-popover-placement-top-end {
            transform: translate(0, -100%);

            &::before, &::after {
                right: 16px;
            }
        }
    }

    &.v-popover-placement-common-bottom {
        margin-top: 10px;

        &::before, &::after {
            border-top: none;
        }

        &::before {
            bottom: 100%;
            border-bottom: 6px solid #999;
        }

        &::after {
            bottom: calc(100% - 1px);
            border-bottom: 6px solid #fff;
        }

        &.v-popover-placement-bottom-start {

            &::before, &::after {
                left: 16px;
            }
        }

        &.v-popover-placement-bottom {

            &::before, &::after {
                left: 50%;
                margin-left: -6px;
            }
        }

        &.v-popover-placement-bottom-end {

            &::before, &::after {
                right: 16px;
            }
        }
    }

    &.v-popover-placement-common-left {
         margin-left: -10px;

        &::before, &::after {
            border-right: none;
        }

         &::before {
             left: 100%;
             border-left: 6px solid #999;
         }

         &::after {
             left: calc(100% - 1px);
             border-left: 6px solid #fff;
         }

         &.v-popover-placement-left-start {
             transform: translateX(-100%);

             &::before, &::after {
                 top: 12px;
             }
         }

         &.v-popover-placement-left {
             transform: translateX(-100%);

             &::before, &::after {
                 top: 50%;
                 margin-top: -6px;
             }
         }

         &.v-popover-placement-left-end {
             transform: translateX(-100%);

             &::before, &::after {
                 bottom: 12px;
             }
         }
     }

    &.v-popover-placement-common-right {
        margin-left: 10px;

        &::before, &::after {
            border-left: none;
        }

        &::before {
            right: 100%;
            border-right: 6px solid #999;
        }

        &::after {
            right: calc(100% - 1px);
            border-right: 6px solid #fff;
        }

        &.v-popover-placement-right-start {

            &::before, &::after {
                top: 12px;
            }
        }

        &.v-popover-placement-right {

            &::before, &::after {
                top: 50%;
                margin-top: -6px;
            }
        }

        &.v-popover-placement-right-end {

            &::before, &::after {
                bottom: 12px;
            }
        }
    }
}
</style>
