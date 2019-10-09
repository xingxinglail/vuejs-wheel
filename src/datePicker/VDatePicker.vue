<template>
    <div class="v-date-picker">
        <v-input v-model="inputValue" placeholder="选择日期" />
        <div class="v-date-picker-panel">
            <div class="v-date-picker-date">
                <div class="v-date-picker-date-head">
                    <div class="left">
                        <v-icon class="double"
                                name="doubleleft"
                                @mousedown.native.prevent></v-icon>
                        <v-icon class="single"
                                name="left"
                                @click="changeMonth('prev')"
                                @mousedown.native.prevent></v-icon>
                    </div>
                    <div class="center">
                        <span>{{ panel.year }}&nbsp;年&nbsp;</span>
                        <span>{{ panel.monthStr }}&nbsp;月</span>
                    </div>
                    <div class="right">
                        <v-icon
                            class="single"
                            name="right"
                            @click="changeMonth('next')"
                            @mousedown.native.prevent></v-icon>
                        <v-icon class="double" name="doubleright" @mousedown.native.prevent></v-icon>
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
                        <div class="item"
                             v-for="item in data"
                             :key="item.str"
                             :aa="item.date"
                             :class="{ current: item.isCurrent, today: item.isToday, 'next-month': item.isNextMonth, 'prev-month': item.isPrevMonth }">
                            <span>{{ item.day }}</span>
                        </div>
<!--                        <div class="item today">6</div>-->
<!--                        <div class="item current"><span>7</span></div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import Input from '../input/VInput'
import Icon from '../icon/VIcon'

export default {
    name: 'VDatePicker',
    props: {
        value: [String, Number, Date, Array],
        type: {
            type: String,
            default: 'date'
        },
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        }
    },
    data () {
        return {
            inputValue: '',
            current: {
                year: 0,
                month: 0,
                date: 0
            },
            panel: {
                year: 0,
                month: 0,
                monthStr: '0',
                date: 0,
                dateStr: '0'
            }
        }
    },
    beforeCreate () {
        this._currentDayjs = null
        const now = new Date()
        this._nowYear = now.getFullYear()
        this._nowMonth = now.getMonth()
        this._nowDate = now.getDate()
        this._now = now
    },
    computed: {
        data ({ panel }) {
            const { year, month, date } = panel
            const dateArr = []
            const { _nowYear, _nowMonth, _nowDate } = this
            const firstDateOfMonth = new Date(year, month, 1)
            const firstWeek = firstDateOfMonth.getDay()
            const firstDate = firstDateOfMonth - (firstWeek * 86400000)
            for (let i = 0; i < 42; i++) {
                const _dateObj = new Date(firstDate + i * 86400000)
                const _year = _dateObj.getFullYear()
                const _month = _dateObj.getMonth()
                const _date = _dateObj.getDate()
                dateArr.push({
                    date: _dateObj,
                    day: _date,
                    str: dayjs(_dateObj).format('YYYY-MM-DD'),
                    isCurrent: _year === year && _month === month && _date === date,
                    isPrevMonth: _month < month,
                    isNextMonth: _month > month,
                    isToday: _year === _nowYear && _month === _nowMonth && _date === _nowDate
                })
            }
            return dateArr
        }
    },
    methods: {
        formatVal (val) {
            if (Array.isArray(val)) {
                if (this.type === 'daterange') {
                    // todo
                }
            } else {
                let date = dayjs(val)
                if (!date.isValid()) date = dayjs()
                this.inputValue = date.format(this.format)
                const { current, panel } = this
                current.year = date.year()
                current.month = date.month()
                current.date = date.date()
                panel.year = current.year
                panel.month = current.month
                panel.date = current.date
                this.changePanel(current)
                this._currentDayjs = date
            }
        },
        changePanel ({ year, month, date }) {
            const { panel } = this
            panel.year = year
            panel.month = month
            panel.monthStr = (month + 1).toString().padStart(2, '0')
            panel.date = date
            panel.dateStr = date.toString().padStart(2, '0')
        },
        changeMonth (type) {
            // todo bug
            if (type === 'next') {
                const nextDate = this._currentDayjs.add(1, 'month')
                console.log(nextDate.format('YYYY-MM-DD'))
                this.changePanel({ year: nextDate.year(), month: nextDate.month(), date: nextDate.date() })
            }
        }
    },
    watch: {
        value: {
            immediate: true,
            handler (v) {
                this.formatVal(v)
            }
        }
    },
    components: {
        'v-input': Input,
        'v-icon': Icon
    }
}
</script>

<style lang="scss" scoped>
@import '../_var.scss';

$color: #409eff;

.v-date-picker {

    .v-date-picker-panel {
        position: absolute;
        color: #606266;
        border: 1px solid #e4e7ed;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #fff;
        border-radius: 4px;
        line-height: 30px;
        margin: 5px 0;
        font-size: 12px;

        .v-date-picker-date {

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

                        &.prev-month, &.next-month {

                            span {
                                color: #c0c4cc;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
