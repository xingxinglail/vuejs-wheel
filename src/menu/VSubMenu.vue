<template>
    <div class="v-sub-menu"
         :class="{ 'v-sub-menu-opened': visible }"
         v-click-body-outside="outSideHide">
        <div class="v-sub-menu-title"
             :class="{ 'v-sub-menu-title-active': isActive }"
             ref="subMenuTitle">
            <slot name="title"></slot>
            <v-icon name="down" />
        </div>
        <transition :name="isVerticalMode ? 'click-transition' : 'hover-transition'"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave"
                    @leave-cancelled="leaveCancelled">
            <div class="v-sub-menu-popover"
                 ref="subMenuPopover"
                 v-show="visible">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script>
import VIcon from '../icon/VIcon'
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
        },
        showTimeout: {
            type: Number,
            default: 300
        },
        hideTimeout: {
            type: Number,
            default: 300
        }
    },
    data () {
        return {
            visible: false,
            isVerticalMode: this.root.mode === 'vertical'
        }
    },
    computed: {
        isActive ({ root, name }) {
            return root.namePath.includes(name)
        }
    },
    created () {
        const { root } = this
        this._isClick = (root.menuTrigger === 'click' || this.isVerticalMode)
        this._hoverTimer = null
        this.root.addSub(this)
    },
    mounted () {
        this._subMenuTitle = this.$refs.subMenuTitle
        this._subMenuPopover = this.$refs.subMenuPopover
        this.setPaddingStyle()
        this.bindEvent()
    },
    beforeDestroy () {
        const { _subMenuTitle } = this
        if (this._isClick) {
            _subMenuTitle.removeListener('click', this.clickHandle)
        } else {
            const { _subMenuPopover, mouseenterHandle, mouseleaveHandle, clearHoverTimer } = this
            _subMenuTitle.removeListener('mouseenter', mouseenterHandle)
            _subMenuTitle.removeListener('mouseleave', mouseleaveHandle)
            _subMenuPopover.removeListener('mouseenter', clearHoverTimer)
            _subMenuPopover.removeListener('mouseleave', mouseleaveHandle)
        }
    },
    methods: {
        setPaddingStyle () {
            if (!this.isVerticalMode) return
            let parent = this.$parent
            let paddingLeft = 40
            while (parent.$options.name === 'VSubMenu') {
                paddingLeft += 20
                parent = parent.$parent
            }
            this.$children.forEach(vm => {
                const { name } = vm.$options
                if (name === 'VMenuItem') {
                    vm.$el.style.paddingLeft = `${paddingLeft}px`
                }
                if (name === 'VSubMenu') {
                    vm.$el.querySelector('.v-sub-menu-title').style.paddingLeft = `${paddingLeft}px`
                }
            })
        },
        bindEvent () {
            const { _subMenuTitle } = this
            if (this._isClick) {
                _subMenuTitle.addEventListener('click', this.clickHandle)
            } else {
                const { _subMenuPopover, mouseenterHandle, mouseleaveHandle, clearHoverTimer } = this
                _subMenuTitle.addEventListener('mouseenter', mouseenterHandle)
                _subMenuTitle.addEventListener('mouseleave', mouseleaveHandle)
                _subMenuPopover.addEventListener('mouseenter', clearHoverTimer)
                _subMenuPopover.addEventListener('mouseleave', mouseleaveHandle)
            }
        },
        toggle () {
            this.visible = !this.visible
        },
        show () {
            this.visible = true
        },
        hide () {
            this.visible = false
        },
        outSideHide () {
            if (!this._isClick || this.isVerticalMode) return
            this.hide()
        },
        clickHandle () {
            this.toggle()
        },
        mouseenterHandle () {
            this.clearHoverTimer()
            this._hoverTimer = setTimeout(() => {
                this.show()
            }, this.showTimeout)
        },
        mouseleaveHandle () {
            this.clearHoverTimer()
            this._hoverTimer = setTimeout(() => {
                this.hide()
            }, this.hideTimeout)
        },
        clearHoverTimer () {
            clearTimeout(this._hoverTimer)
        },
        updateNamePath (name) {
            this.root.namePath.unshift(name)
            const { updateNamePath } = this.$parent
            if (updateNamePath) {
                updateNamePath(this.name)
            } else {
                this.root.namePath.unshift(this.name)
            }
            if (!this.isVerticalMode) this.hide()
        },
        enter (el) {
            if (!this.isVerticalMode) return
            const { height } = el.getBoundingClientRect()
            el.style.height = 0
            el.getBoundingClientRect()
            el.style.height = `${height}px`
        },
        afterEnter (el) {
            if (!this.isVerticalMode) return
            el.style.height = ''
        },
        leave (el) {
            if (!this.isVerticalMode) return
            const { height } = el.getBoundingClientRect()
            el.style.height = `${height}px`
            el.getBoundingClientRect()
            el.style.height = 0
        },
        afterLeave (el) {
            if (!this.isVerticalMode) return
            el.style.height = ''
        },
        leaveCancelled (el) {
            if (!this.isVerticalMode) return
            el.style.height = ''
        }
    },
    components: {
        VIcon
    }
}
</script>

<style lang="scss" scoped>
@import '../var';

.v-sub-menu {

    .hover-transition-enter-active,
    .hover-transition-leave-active  {
        transform-origin: top;
        transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1);
    }

    .hover-transition-enter,
    .hover-transition-leave-to {
        opacity: 0;
        transform: scale3d(1, 0, 1);
    }

    .click-transition-enter-active,
    .click-transition-leave-active  {
        transition: height .3s;
    }

    .v-sub-menu-title {
        display: flex;
        align-items: center;

        .v-icon {
            margin-left: 8px;
            width: 8px;
            height: 8px;
            color: #909399;
            transition: transform .3s;
        }
    }
}
</style>
