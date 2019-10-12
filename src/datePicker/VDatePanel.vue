<template>
    <div class="v-date-picker-date-panel">
        <div class="v-date-picker-date-head">
            <div class="left">
                <v-icon class="double"
                        v-if="unlinkPanels || (!unlinkPanels && disabled !== 1)"
                        :class="{ disabled: calcPrevYearDisabled() }"
                        name="doubleleft"
                        @click="changeDate('prev', 'year')"
                        @mousedown.native.prevent></v-icon>
                <v-icon class="single"
                        v-if="unlinkPanels || (!unlinkPanels && disabled !== 1)"
                        :class="{ disabled: calcPrevMonthDisabled() }"
                        name="left"
                        @click="changeDate('prev', 'month')"
                        @mousedown.native.prevent></v-icon>
            </div>
            <div class="center">
                <span>{{ panel.year }}&nbsp;年&nbsp;</span>
                <span>{{ panel.monthStr }}&nbsp;月</span>
            </div>
            <div class="right">
                <v-icon class="single"
                        v-if="unlinkPanels || (!unlinkPanels && disabled !== -1)"
                        :class="{ disabled: calcNextMonthDisabled() }"
                        name="right"
                        @click="changeDate('next', 'month')"
                        @mousedown.native.prevent></v-icon>
                <v-icon class="double"
                        v-if="unlinkPanels || (!unlinkPanels && disabled !== -1)"
                        :class="{ disabled: calcNextYearDisabled() }"
                        name="doubleright"
                        @click="changeDate('next', 'year')"
                        @mousedown.native.prevent></v-icon>
            </div>
        </div>
        <div class="v-date-picker-date-body">
            <div class="week-wrapper">
                <div class="item">日</div>
                <div class="item">一</div>
                <div class="item">二</div>
                <div class="item">三</div>
                <div class="item">四</div>
                <div class="item">五</div>
                <div class="item">六</div>
            </div>
            <div class="date-wrapper">
                <div
                    class="item"
                    v-for="item in data"
                    :key="item.str"
                    :aa="item.date"
                    :class="{
                        current: item.isCurrent,
                        today: item.isToday,
                        'next-month': item.isNextMonth,
                        'prev-month': item.isPrevMonth,
                        'in-range': item.isRange,
                        'start-date': item.isStart,
                        'end-date': item.isEnd
                    }"
                    @click="onDateClick(item)"
                    @mouseenter="onMouseenter(item.date)"
                    @mousedown.prevent>
                    <div class="inner">
                        <span>{{ item.day }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import Icon from '../icon/VIcon'

export default {
    name: 'VDatePanel',
    props: {
        data: {
            type: Array,
            required: true
        },
        current: {
            type: Object,
            required: true
        },
        panel: {
            type: Object,
            required: true
        },
        otherPanel: {
            type: Object,
            required: true
        },
        unlinkPanels: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        disabled ({ panel, otherPanel }) {
            const { year: oYear, month: oMonth } = otherPanel
            if (oYear === 0) return Number.MAX_SAFE_INTEGER
            const { year, month } = panel
            const startDate = dayjs(new Date(year, month))
            const endDate = dayjs(new Date(oYear, oMonth))
            return startDate.diff(endDate, 'month')
        }
    },
    methods: {
        calcPrevYearDisabled () {
            const { disabled } = this
            return disabled !== Number.MAX_SAFE_INTEGER && disabled > 0 && disabled < 13
        },
        calcPrevMonthDisabled () {
            const { disabled } = this
            return disabled !== Number.MAX_SAFE_INTEGER && disabled === 1
        },
        calcNextYearDisabled () {
            const { disabled } = this
            return disabled !== Number.MAX_SAFE_INTEGER && disabled < 0 && disabled > -13
        },
        calcNextMonthDisabled () {
            const { disabled } = this
            return disabled !== Number.MAX_SAFE_INTEGER && disabled === -1
        },
        changeDate (type, unit) {
            if (type === 'prev') {
                if (unit === 'year' && this.calcPrevYearDisabled()) return
                if (unit === 'month' && this.calcPrevMonthDisabled()) return
            }
            if (type === 'next') {
                if (unit === 'year' && this.calcNextYearDisabled()) return
                if (unit === 'month' && this.calcNextMonthDisabled()) return
            }
            this.$emit('change-date', { type, unit })
        },
        onDateClick (data) {
            this.$emit('select', data)
        },
        onMouseenter (date) {
            this.$emit('hover', date)
        }
    },
    components: {
        'v-icon': Icon
    }
}
</script>

<style lang="scss" scoped>
$color: #409eff;

.v-date-picker-date-panel {

    .v-date-picker-date-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 12px;

        .center {
            font-size: 16px;
            font-weight: 500;

            span {
                cursor: pointer;

                &:hover {
                    color: $color;
                }
            }
        }

        .left, .right {

            .double, .single {
                vertical-align: middle;
                padding: 8px;
                cursor: pointer;

                &:hover {
                    color: $color;
                }

                &.disabled {
                    color: #ddd;
                    cursor: not-allowed;
                }
            }

            .single {
                width: 10px;
                height: 10px;
            }
        }
    }

    .v-date-picker-date-body {
        width: 308px;
        margin: 15px;

        .item {
            text-align: center;
            width: 44px;
            height: 44px;
            line-height: 44px;
            padding: 4px 0;
            box-sizing: border-box;

            .inner {
                height: 100%;
            }
        }

        .date-wrapper, .week-wrapper {
            display: flex;

            &.week-wrapper {
                border-bottom: 1px solid #ebeef5;
            }
        }

        .date-wrapper {
            flex-wrap: wrap;

            .item {
                position: relative;
                cursor: pointer;

                span {
                    display: block;
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    z-index: 1;
                    top: 50%;
                    left: 50%;
                    margin: -12px 0 0 -12px;
                    line-height: 24px;
                }

                &:hover span {
                    color: $color;
                }

                &.today span {
                    color: $color;
                    font-weight: 700;
                }

                &.current span {
                    border-radius: 50%;
                    color: #fff;
                    background-color: $color;
                }

                &.start-date, &.end-date {

                    &.start-date .inner {
                        border-top-left-radius: 20px;
                        border-bottom-left-radius: 20px;
                        margin-left: 3px;
                    }

                    &.end-date .inner {
                        border-top-right-radius: 20px;
                        border-bottom-right-radius: 20px;
                        margin-right: 3px;
                    }

                    span {
                        border-radius: 50%;
                        color: #fff;
                        background-color: $color;
                    }
                }

                &.in-range .inner {
                    background-color: #f2f6fc;
                }

                &.prev-month, &.next-month {

                    .inner {

                        span {
                            color: #c0c4cc;
                            background-color: transparent;
                        }
                    }
                }
            }
        }
    }
}
</style>
