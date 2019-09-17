<template>
    <div class="v-pagination">
        <div class="item icon" :class="{ disabled: current === 1 }" @click="prev">
            <v-icon name="left" />
        </div>
        <div class="item" :class="{ active: current === 1 }" @click="jump({ key: 1 })">1</div>
        <div class="item ellipsis" v-if="total > 7" v-show="current > 4" @click="onMoreLeft">
            <v-icon name="ellipsis" />
            <v-icon name="doubleleft" />
        </div>
        <div class="item"
             v-for="item in pages"
             :key="item.key"
             :class="{ active: item.key === current }"
             @click="jump(item)">{{ item.key }}</div>
        <div class="item ellipsis" v-if="total > 7" v-show="total - current >= 4" @click="onMoreRight">
            <v-icon name="ellipsis" />
            <v-icon name="doubleright" />
        </div>
        <div class="item" :class="{ active: current === total }" @click="jump({ key: total })">{{ total }}</div>
        <div class="item icon" :class="{ disabled: current === total }" @click="next">
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
        }
    },
    computed: {
        pages ({ total, current }) {
            const pages = []
            if (total > 7) {
                if (current <= 4) {
                    for (let i = 2; i <= 6; i++) {
                        pages.push({ key: i })
                    }
                } else {
                    if (total - current < 1) {
                        pages.push({ key: current - 5 })
                    }
                    if (total - current < 2) {
                        pages.push({ key: current - 4 })
                    }
                    if (total - current < 3) {
                        pages.push({ key: current - 3 })
                    }
                    pages.push({ key: current - 2 })
                    pages.push({ key: current - 1 })
                    if (current !== total) pages.push({ key: current }) // 不填充最大页码
                    if (current + 1 < total) {
                        pages.push({ key: current + 1 })
                        if (current + 2 < total) {
                            pages.push({ key: current + 2 })
                        }
                    }
                }
                return pages
            } else {
                for (let i = 2; i < total; i++) {
                    pages.push({ key: i })
                }
                return pages
            }
        }
    },
    methods: {
        prev () {
            if (this.current > 1) this.changeCurrent(this.current - 1)
        },
        next () {
            if (this.current < this.total) this.changeCurrent(this.current + 1)
        },
        jump ({ key }) {
            switch (key) {
                case 'prev-omit':
                    break
                case 'next-omit':
                    break
                default:
                    if (key !== this.current) {
                        this.changeCurrent(key)
                    }
                    break
            }
        },
        onMoreLeft () {
            const cur = this.current - 5
            this.changeCurrent(cur < 1 ? 1 : cur)
        },
        onMoreRight () {
            const { current, total } = this
            const cur = current + 5
            this.changeCurrent(cur > total ? total : cur)
        },
        changeCurrent (val) {
            this.$emit('change', val)
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
        font-size: $font-size;
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

        &.ellipsis {

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
