<template>
    <div class="v-pagination" v-show="!(hideIfOnePage && total < 2)">
        <div class="item icon" :class="{ disabled: cur === 1 }" @click="prev">
            <v-icon name="left" />
        </div>
        <div class="item" :class="{ active: cur === 1 }" @click="jump({ key: 1 })">1</div>
        <div class="item quick-jump" v-if="total > 7" v-show="cur > 4" @click="onMoreLeft">
            <v-icon name="ellipsis" />
            <v-icon name="doubleleft" />
        </div>
        <div class="item"
             v-for="item in pages"
             :key="item.key"
             :class="{ active: item.key === cur }"
             @click="jump(item)">{{ item.key }}</div>
        <div class="item quick-jump" v-if="total > 7" v-show="total - cur >= 4" @click="onMoreRight">
            <v-icon name="ellipsis" />
            <v-icon name="doubleright" />
        </div>
        <div class="item" :class="{ active: cur === total }" @click="jump({ key: total })">{{ total }}</div>
        <div class="item icon" :class="{ disabled: cur === total }" @click="next">
            <v-icon name="right" />
        </div>
    </div>
</template>

<script>
import VIcon from '../icon/VIcon'

export default {
    name: 'VPagination',
    props: {
        total: {
            type: Number,
            require: true
        },
        current: {
            type: Number,
            require: true
        },
        hideIfOnePage: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            pages: [],
            cur: null
        }
    },
    created () {
        this.getPages(this.current)
    },
    methods: {
        getPages (val) {
            const { total, cur } = this
            let _cur = val
            if (_cur > total) {
                _cur = total
                this.changeCurrent(_cur)
                return
            }
            if (_cur < 0) {
                _cur = 1
                this.changeCurrent(_cur)
                return
            }
            this.cur = _cur
            if (val === cur) return
            const pages = []
            if (total > 7) {
                if (_cur <= 4) {
                    for (let i = 2; i <= 6; i++) {
                        pages.push({ key: i })
                    }
                } else {
                    if (total - _cur < 1) {
                        pages.push({ key: _cur - 5 })
                    }
                    if (total - _cur < 2) {
                        pages.push({ key: _cur - 4 })
                    }
                    if (total - _cur < 3) {
                        pages.push({ key: _cur - 3 })
                    }
                    pages.push({ key: _cur - 2 })
                    pages.push({ key: _cur - 1 })
                    if (_cur !== total && _cur <= total) pages.push({ key: _cur }) // 不填充最大页码
                    if (_cur + 1 < total) {
                        pages.push({ key: _cur + 1 })
                        if (_cur + 2 < total) {
                            pages.push({ key: _cur + 2 })
                        }
                    }
                }
            } else {
                for (let i = 2; i < total; i++) {
                    pages.push({ key: i })
                }
            }
            this.pages = pages
        },
        prev () {
            if (this.cur > 1) this.changeCurrent(this.cur - 1)
        },
        next () {
            if (this.cur < this.total) this.changeCurrent(this.cur + 1)
        },
        jump ({ key }) {
            if (key !== this.cur) {
                this.changeCurrent(key)
            }
        },
        onMoreLeft () {
            const cur = this.cur - 5
            this.changeCurrent(cur < 1 ? 1 : cur)
        },
        onMoreRight () {
            const { cur, total } = this
            const current = cur + 5
            this.changeCurrent(current > total ? total : current)
        },
        changeCurrent (val) {
            this.getPages(val)
            this.$emit('update:current', val)
            this.$emit('change', val)
        }
    },
    watch: {
        current (v) {
            this.getPages(v)
        },
        total () {
            this.getPages(this.current)
        }
    },
    components: {
        'v-icon': VIcon
    }
}
</script>

<style lang="scss" scoped>
@import '../var';

.v-pagination {
    display: flex;
    align-items: center;
    user-select: none;

    .item {
        padding: 0 6px;
        margin: 0 4px;
        min-width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #E1E1E1;
        font-size: 13px;
        color: #333;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: $border-radius;

        .v-icon {
            width: 10px;
            height: 10px;
        }

        &.icon {

            &.disabled {
                border-color: #eee;
                cursor: not-allowed;

                .v-icon {
                    color: #c3c3c3;
                }
            }
        }

        &.active {
            cursor: default;
            border-color: #4b90e2;
        }

        &.quick-jump {

            .v-icon:last-child {
                display: none;
            }

            &:hover {

                .v-icon:first-child {
                    display: none;
                }

                .v-icon:last-child {
                    display: initial;
                }
            }
        }
    }
}
</style>
