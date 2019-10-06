<template>
    <div class="v-scrollbar"
         ref="wrapper"
         :class="[wrapperClass]">
        <div class="v-scrollbar-bar horizontal"
             v-if="isRenderHorizontal"
             @click="_onClickHandle('horizontal', $event)">
            <div class="inner"
                 :style="{ width: barWidth + '%', transform: `translate3d(${barX}%, 0, 0)` }"
                 @click.stop
                 @mousedown="_onMousedownHandle('horizontal', $event)"></div>
        </div>
        <div class="v-scrollbar-bar vertical"
             v-if="isRenderVertical"
             @click="_onClickHandle('vertical', $event)">
            <div class="inner"
                 :style="{ height: barHeight + '%', transform: `translate3d(0, ${barY}%, 0)` }"
                 @click.stop
                 @mousedown="_onMousedownHandle('vertical', $event)"></div>
        </div>
        <div class="v-scrollbar-inner-wrapper"
             ref="innerWrapper"
             :class="[viewClass]"
             @scroll="_onScrollHandle">
            <slot />
        </div>
    </div>
</template>

<script>
import { getPosition } from '../helper/dom'

export default {
    name: 'VScrollBar',
    props: {
        wrapperClass: String,
        viewClass: String
    },
    data () {
        return {
            isRenderHorizontal: false,
            isRenderVertical: false,
            barWidth: 0,
            barHeight: 0,
            barX: 0,
            barY: 0
        }
    },
    beforeCreate () {
        this._innerWrapperDom = null
        this._x = 1
        this._maxWidth = 0
        this._maxHeight = 0
        this._scrollWidth = 0
        this._scrollHeight = 0
        this._isCursorType = ''
        this._startPos = {
            x: 0,
            y: 0,
            top: 0
        }
    },
    mounted () {
        this.update()
        document.addEventListener('mousemove', this._onMousemoveHandle)
        document.addEventListener('mouseup', this._onMouseupHandle)
    },
    beforeDestroy () {
        document.removeEventListener('mousemove', this._onMousemoveHandle)
        document.removeEventListener('mouseup', this._onMouseupHandle)
    },
    methods: {
        update () {
            this._innerWrapperDom = this.$refs.innerWrapper
            const { scrollHeight, offsetHeight, scrollWidth, offsetWidth } = this._innerWrapperDom
            this._scrollWidth = scrollWidth
            this._scrollHeight = scrollHeight
            this.isRenderVertical = scrollHeight > offsetHeight
            this.barHeight = offsetHeight / scrollHeight * 100
            this._maxHeight = offsetHeight
            this.isRenderHorizontal = scrollWidth > offsetWidth
            this.barWidth = offsetWidth / scrollWidth * 100
            this._maxWidth = offsetWidth
        },
        _onScrollHandle ({ target }) {
            this.barX = target.scrollLeft / this._maxWidth * 100
            this.barY = target.scrollTop / this._maxHeight * 100
        },
        _onMousedownHandle (type, e) {
            this._isCursorType = type
            const { pageX, pageY } = e
            this._startPos = {
                x: pageX,
                y: pageY,
                top: (this.barY / 100 * (this.barHeight / 100 * this._maxHeight)).toFixed(4) * 1,
                left: (this.barX / 100 * (this.barWidth / 100 * this._maxWidth)).toFixed(4) * 1
            }
        },
        _onMousemoveHandle (e) {
            e.preventDefault()
            if (this._isCursorType) {
                const { pageX, pageY } = e
                if (pageY < 0) return
                const { _startPos, _maxHeight, _scrollHeight } = this
                const moveY = pageY - _startPos.y + _startPos.top
                const maxY = _maxHeight - this.barHeight / 100 * _maxHeight
                let y = moveY / _maxHeight * _scrollHeight
                if (moveY > maxY) y = maxY / _maxHeight * _scrollHeight
                if (this._isCursorType === 'vertical') this._innerWrapperDom.scrollTop = y
                if (pageX < 0) return
                const { _maxWidth, _scrollWidth } = this
                const moveX = pageX - _startPos.x + _startPos.left
                const maxX = _maxWidth - this.barWidth / 100 * _maxWidth
                let x = moveX / _maxWidth * _scrollWidth
                if (moveX > maxX) x = maxX / _maxWidth * _scrollWidth
                if (this._isCursorType === 'horizontal') this._innerWrapperDom.scrollLeft = x
            }
        },
        _onMouseupHandle () {
            this._isCursorType = ''
        },
        _onClickHandle (type, e) {
            const { pageX, pageY, target } = e
            const { top, left } = getPosition(target)
            if (type === 'horizontal') {
                const x = (pageX - left) / this._maxWidth * this._scrollWidth
                this._innerWrapperDom.scrollLeft = x
            }
            if (type === 'vertical') {
                const y = (pageY - top) / this._maxHeight * this._scrollHeight
                this._innerWrapperDom.scrollTop = y
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-scrollbar {
    height: 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;

    &-inner-wrapper {
        overflow: scroll;
        height: 100%;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    &-bar {
        position: absolute;
        right: 2px;
        bottom: 2px;
        opacity: 0;
        z-index: 1;
        transition: opacity .2s ease-out;

        &.horizontal {
            left: 2px;
            height: 6px;

            .inner {
                height: 100%;
            }
        }

        &.vertical {
            top: 2px;
            width: 6px;
        }

        .inner {
            border-radius: 4px;
            cursor: pointer;
            background-color: rgba(144, 147, 153, .3);
            transition: background-color .3s;

            &:hover {
                background-color: rgba(144, 147, 153, .5);
            }
        }
    }

    &:hover, &:active {

        .v-scrollbar-bar {
            opacity: 1;
        }
    }
}
</style>
