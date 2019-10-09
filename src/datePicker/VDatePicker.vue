<template>
    <div class="v-date-picker">
        <v-input v-model="inputValue" placeholder="选择日期" />
        <div class="v-date-picker-panel">
            <div class="v-date-picker-date">
                <div class="v-date-picker-date-head">

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
                             :class="{ 'next-month': item.isNextMonth, 'prev-month': item.isPrevMonth }">
                            <span>{{ item.date.getDate() }}</span>
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

export default {
    name: 'VDatePicker',
    props: {
        type: {
            type: String,
            default: 'date'
        }
    },
    data () {
        return {
            inputValue: '',
            now: dayjs().hour(0).minute(0).second(0).millisecond(0).toDate(),
            data: []
        }
    },
    created () {
        this.getDate()
    },
    methods: {
        getDate () {
            const dateArr = []
            const firstDate = dayjs(this.now).date(1).hour(0).minute(0).second(0).millisecond(0)
            const startIndex = this.getStartWeekIndex(firstDate)
            if (startIndex > 0) {
                for (let i = 1; i <= startIndex; i++) {
                    const date = firstDate.subtract(i, 'day')
                    dateArr.unshift({
                        str: date.format('YYYY-MM-DD'),
                        date: date.toDate(),
                        isPrevMonth: true,
                        isNextMonth: false
                    })
                }
            }
            const days = firstDate.daysInMonth()
            for (let i = 0; i < days; i++) {
                const date = firstDate.add(i, 'day')
                dateArr.push({
                    str: date.format('YYYY-MM-DD'),
                    date: date.toDate()
                })
            }
            if (dateArr.length < 42) {
                const days = 42 - dateArr.length
                const nextMonth = firstDate.add(1, 'month')
                for (let i = 0; i < days; i++) {
                    const date = nextMonth.add(i, 'day')
                    dateArr.push({
                        str: date.format('YYYY-MM-DD'),
                        date: date.toDate(),
                        isPrevMonth: false,
                        isNextMonth: true
                    })
                }
            }
            this.data = dateArr
        },
        getStartWeekIndex (date) {
            return date.day()
        }
    },
    components: {
        'v-input': Input
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
                margin: 12px;
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
