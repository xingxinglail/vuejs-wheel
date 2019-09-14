<template>
    <div class="v-sub-menu" v-click-body-outside="outSideHide">
        <div class="v-sub-menu-title"
             :class="{ 'v-sub-menu-title-active': isActive }"
             ref="subMenuTitle">
            <slot name="title"></slot>
        </div>
        <div class="v-sub-menu-popover" ref="subMenuPopover" v-show="visible">
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
            visible: false
        }
    },
    computed: {
        isActive ({ root, name }) {
            return root.namePath.includes(name)
        }
    },
    created () {
        const { root } = this
        this._isClick = (root.menuTrigger === 'click' || root.mode === 'vertical')
        this._hoverTimer = null
    },
    mounted () {
        this._subMenuTitle = this.$refs.subMenuTitle
        this._subMenuPopover = this.$refs.subMenuPopover
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
            if (!this._isClick) return
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
            this.hide()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../var';
</style>
