<template>
    <div class="v-date-picker" ref="reference">
        <v-input ref="input"
                 v-model="inputValue"
                 placeholder="选择日期"
                 @change="onChange"
                 @focus="onFocus" />
        <v-input ref="input"
                 v-if="type === 'daterange'"
                 v-model="endInputValue"
                 placeholder="选择日期"
                 @focus="onFocus" />
        <div class="v-date-picker-panel"
             :class="{ 'v-date-picker-panel-range': type === 'daterange' }"
             v-if="popperVisible"
             v-show="visible"
             ref="popper">
            <v-date-panel :data="data"
                          :current="current"
                          :panel="panel"
                          :end-date="endCurrent"
                          @hover="onHover"
                          @select="onSelect"
                          @change-date="onChangeDate" />
            <v-date-panel v-if="type === 'daterange'"
                          :data="endData"
                          :current="endCurrent"
                          :panel="endPanel"
                          :start-date="current"
                          @hover="onHover"
                          @select="onSelect"
                          @change-date="onChangeDate" />
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import Input from '../input/VInput'
import VDatePanel from './VDatePanel'
import Popper from '../mixins/popper'

export default {
    name: 'VDatePicker',
    model: {
        prop: 'value',
        event: 'change'
    },
    mixins: [Popper],
    props: {
        value: [String, Number, Date, Array],
        type: {
            type: String,
            default: 'date'
        },
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        valueFormat: String,
        popperOptions: {
            type: Object,
            default () {
                return {
                    removeOnDestroy: true,
                    placement: 'bottom-start',
                    onCreate: () => {
                        document.body.appendChild(this.$refs.popper)
                        this.open()
                        this.initClickOutside()
                    }
                }
            }
        }
    },
    data () {
        return {
            data: [],
            endData: [],
            inputValue: '',
            endInputValue: '',
            current: {
                year: 0,
                month: 0,
                date: 0
            },
            endCurrent: undefined,
            panel: {
                year: 0,
                month: 0,
                monthStr: '0',
                date: 0,
                dateStr: '0'
            },
            endPanel: {
                year: 0,
                month: 0,
                monthStr: '0',
                date: 0,
                dateStr: '0'
            },
            visible: false,
            dateRange: undefined
        }
    },
    beforeCreate () {
        const now = new Date()
        this._nowYear = now.getFullYear()
        this._nowMonth = now.getMonth()
        this._nowDate = now.getDate()
        this._now = now
        this._copyInputValue = ''
    },
    created () {
        if (this.type === 'daterange') {
            this.endCurrent = {
                year: 0,
                month: 0,
                date: 0
            }
        }
    },
    beforeDestroy () {
        document.removeEventListener('click', this.handleDocumentClick)
    },
    methods: {
        onHover (date) {
            if (!this.dateRange) return
            this.markRange(this.dateRange, date)
        },
        markRange (minDate, maxDate) {
            minDate = minDate.getTime()
            maxDate = maxDate ? maxDate.getTime() : minDate
            ;[minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)]
            const allData = this.data.concat(this.endData)
            for (let i = 0; i < allData.length; i++) {
                const data = allData[i]
                const time = data.date.getTime()
                data.isRange = minDate && data.isNextMonth === false && data.isPrevMonth === false && minDate <= time && maxDate >= time
                data.isStart = minDate && minDate === time
                data.isEnd = maxDate && maxDate === time
            }
        },
        initClickOutside () {
            document.addEventListener('click', this.handleDocumentClick)
        },
        handleDocumentClick ({ target }) {
            const { reference, popper } = this.$refs
            if (reference.contains(target) || target === popper || popper.contains(target)) return
            this.close()
        },
        formatVal (val) {
            if (this.type === 'date') {
                if (!dayjs(val).isValid()) {
                    if (this._copyInputValue === '') {
                        const date = dayjs()
                        this.changePanel({ year: date.year(), month: date.month(), date: date.date() })
                    } else {
                        this.inputValue = this._copyInputValue
                    }
                } else {
                    const date = dayjs(val)
                    this.inputValue = date.format(this.format)
                    this._copyInputValue = this.inputValue
                    const { current } = this
                    current.year = date.year()
                    current.month = date.month()
                    current.date = date.date()
                    this.changePanel(current)
                }
            } else {
                if (this.type === 'daterange') {
                    if (Array.isArray(val) && val.length >= 2) {
                        const isValid = this.checkRangeValue(val, (startDate, endDate) => {
                            this.inputValue = startDate.format(this.format)
                            this.endInputValue = endDate.format(this.format)
                            let panelEndDate = endDate
                            if (startDate.isSame(endDate, 'month')) {
                                panelEndDate = endDate.add(1, 'month')
                            }
                            this.changePanel(
                                { year: startDate.year(), month: startDate.month(), date: startDate.date() },
                                { year: panelEndDate.year(), month: panelEndDate.month(), date: panelEndDate.date() }
                            )
                        })
                        if (isValid) return
                    }
                    const startDate = dayjs()
                    const endDate = startDate.add(1, 'month')
                    this.changePanel(
                        { year: startDate.year(), month: startDate.month(), date: startDate.date() },
                        { year: endDate.year(), month: endDate.month(), date: endDate.date() }
                    )
                }
            }
        },
        getDate (panel) {
            const { year: cYear, month: cMonth, date: cDate } = this.current
            const { year, month } = panel
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
                    isCurrent: _year === cYear && _month === cMonth && _date === cDate,
                    isPrevMonth: _month < month,
                    isNextMonth: _month > month,
                    isToday: _year === _nowYear && _month === _nowMonth && _date === _nowDate,
                    isRange: false,
                    isStart: false,
                    isEnd: false
                })
            }
            return dateArr
        },
        changePanel (startDate, endDate) {
            if (startDate) {
                const { year, month, date } = startDate
                const { panel } = this
                panel.year = year
                panel.month = month
                panel.monthStr = (month + 1).toString().padStart(2, '0')
                panel.date = date
                panel.dateStr = date.toString().padStart(2, '0')
                this.data = this.getDate(panel)
            }
            if (endDate) {
                const { year, month, date } = endDate
                const { endPanel } = this
                endPanel.year = year
                endPanel.month = month
                endPanel.monthStr = (month + 1).toString().padStart(2, '0')
                endPanel.date = date
                endPanel.dateStr = date.toString().padStart(2, '0')
                this.endData = this.getDate(endPanel)
            }
        },
        onChangeDate (type, unit) {
            const { year, month, date } = this.panel
            let newDate = new Date(year, month, date)
            if (type === 'next') {
                newDate = dayjs(newDate).add(1, unit)
            } else {
                newDate = dayjs(newDate).subtract(1, unit)
            }
            this.changePanel({ year: newDate.year(), month: newDate.month(), date: newDate.date() })
        },
        onSelect ({ date }) {
            if (this.type === 'date') {
                this.emitDate(date)
                this.$refs.input.$el.querySelector('input').blur()
                this.close()
            } else {
                if (this.dateRange) {
                    this.emitDate(this.dateRange, date)
                    this.close()
                    return
                }
                this.markRange(date)
                this.dateRange = date
            }
        },
        onFocus () {
            if (!this.popperVisible) {
                this.popperVisible = true
            } else {
                this.open()
            }
        },
        open () {
            if (this.type === 'daterange') {
                this.dateRange = undefined
                this.checkRangeValue(this.value, (startDate, endDate) => {
                    this.markRange(startDate.toDate(), endDate.toDate())
                })
            }
            this.visible = true
        },
        close () {
            this.visible = false
        },
        onChange () {
            const { _copyInputValue } = this
            this.formatVal(this.inputValue)
            if (this.inputValue === _copyInputValue) return
            this.$emit('change', this.inputValue)
        },
        emitDate (val, endVal) {
            const { valueFormat } = this
            if (valueFormat) {
                val = dayjs(val).format(valueFormat)
                if (endVal) endVal = dayjs(endVal).format(valueFormat)
            }
            let data = val
            if (endVal) data = [val, endVal]
            this.$emit('change', data)
        },
        checkRangeValue (val, cb) {
            if (Array.isArray(val) && val.length >= 2) {
                const startDate = dayjs(val[0])
                const endDate = dayjs(val[1])
                if (startDate.isValid() && endDate.isValid()) {
                    cb(startDate, endDate)
                    return true
                }
            }
            return false
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
        'v-date-panel': VDatePanel
    }
}
</script>

<style lang="scss" scoped>
@import '../_var.scss';

$color: #409eff;

.v-date-picker {
}

.v-date-picker-panel {
    color: #606266;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
    font-size: 12px;

    &.v-date-picker-panel-range {
        display: flex;
        align-items: flex-start;

        .v-date-picker-date-panel:first-child {
            border-right: 1px solid #e4e4e4;
        }
    }
}
</style>
