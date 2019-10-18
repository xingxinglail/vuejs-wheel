<template>
    <div class="v-date-picker" ref="reference">
        <v-input v-if="type === 'date'"
                 ref="startInput"
                 v-model="inputValue"
                 :placeholder="placeholder"
                 @focus="onFocus"
                 @blur="onBlur"
                 @change="onChange"/>
        <div v-else
             class="v-date-picker-range-wrapper"
             @click="onInputWrapperClick">
            <input type="text"
                   ref="startInput"
                   v-model="inputValue"
                   :placeholder="startPlaceholder"
                   @click.stop
                   @focus="onFocus"
                   @blur="onBlur"
                   @change="onChange('start')" />
            <span class="v-date-picker-separator">{{ separator }}</span>
            <input type="text"
                   ref="endInput"
                   v-model="endInputValue"
                   :placeholder="endPlaceholder"
                   @click.stop
                   @focus="onFocus"
                   @blur="onBlur"
                   @change="onChange('end')" />
            <div class="icon-wrapper" :class="{ closed: rangeClearVisible }">
                <div class="calendar">
                    <v-icon name="calendar" />
                </div>
                <div class="close" @click.stop="clear">
                    <v-icon name="close-circle-fill" />
                </div>
            </div>
        </div>
        <div class="v-date-picker-panel"
             :class="{ 'v-date-picker-panel-range': type === 'daterange' }"
             v-if="popperVisible"
             v-show="visible"
             ref="popper">
            <v-date-panel :data="data"
                          :current="current"
                          :panel="panel"
                          :other-panel="endPanel"
                          :unlink-panels="unlinkPanels"
                          @hover="onHover"
                          @select="onSelect"
                          @change-date="onChangeDate($event, 'left')" />
            <v-date-panel v-if="type === 'daterange'"
                          :data="endData"
                          :current="endCurrent"
                          :panel="endPanel"
                          :other-panel="panel"
                          :unlink-panels="unlinkPanels"
                          @hover="onHover"
                          @select="onSelect"
                          @change-date="onChangeDate($event, 'right')" />
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import Input from '../input/VInput'
import Icon from '../icon/VIcon'
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
        },
        unlinkPanels: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        separator: {
            type: String,
            default: '~'
        },
        placeholder: {
            type: String,
            default: ''
        },
        startPlaceholder: {
            type: String,
            default: ''
        },
        endPlaceholder: {
            type: String,
            default: ''
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
    computed: {
        clearVisible ({ clearable, value }) {
            return clearable && value
        },
        rangeClearVisible ({ clearable, value }) {
            return clearable && value instanceof Array && value.length > 0
        }
    },
    beforeCreate () {
        const now = new Date()
        this._nowYear = now.getFullYear()
        this._nowMonth = now.getMonth()
        this._nowDate = now.getDate()
        this._now = now
        this._copyInputValue = ''
        this._copyEndInputValue = ''
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
        clearMarkRange () {
            if (!this.dateRange) return
            const allData = this.data.concat(this.endData)
            for (let i = 0; i < allData.length; i++) {
                const data = allData[i]
                data.isRange = false
                data.isStart = false
                data.isEnd = false
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
                    }
                    this.inputValue = this._copyInputValue
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
                if (!val) {
                    this.inputValue = ''
                } else {
                    const [start, end] = val
                    if (!start || !dayjs(start).isValid()) {
                        this.inputValue = ''
                    } else {
                        let date = dayjs(start)
                        this.inputValue = date.format(this.format)
                        this._copyInputValue = this.inputValue
                        if (end && dayjs(end).isValid()) {
                            let endDate = dayjs(end)
                            this.endInputValue = endDate.format(this.format)
                            this._copyEndInputValue = this.endInputValue
                            let panelEndDate = endDate
                            if (date.isSame(endDate, 'month')) {
                                panelEndDate = endDate.add(1, 'month')
                            } else {
                                if (endDate.isBefore(date, 'month')) [date, panelEndDate] = [panelEndDate, date]
                            }
                            if (!this.unlinkPanels) {
                                panelEndDate = date.add(1, 'month')
                            }
                            this.changePanel(
                                { year: date.year(), month: date.month(), date: date.date() },
                                { year: panelEndDate.year(), month: panelEndDate.month(), date: panelEndDate.date() }
                            )
                        } else {
                            const endDate = date.add(1, 'month')
                            this.changePanel(
                                { year: date.year(), month: date.month(), date: date.date() },
                                { year: endDate.year(), month: endDate.month(), date: endDate.date() }
                            )
                        }
                    }
                }

                const { _copyInputValue, _copyEndInputValue } = this
                if (_copyInputValue === '' && _copyEndInputValue === '') {
                    this.inputValue = _copyInputValue
                    this.endInputValue = _copyEndInputValue
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
        onChangeDate ({ type, unit }, panel) {
            if (panel === 'left') {
                const { year, month, date } = this.panel
                let newDate = new Date(year, month, date)
                if (type === 'next') {
                    newDate = dayjs(newDate).add(1, unit)
                } else {
                    newDate = dayjs(newDate).subtract(1, unit)
                }
                if (this.type === 'daterange' && !this.unlinkPanels) {
                    const endDate = dayjs(newDate).add(1, 'month')
                    this.changePanel(
                        { year: newDate.year(), month: newDate.month(), date: newDate.date() },
                        { year: endDate.year(), month: endDate.month(), date: endDate.date() }
                    )
                } else {
                    this.changePanel({ year: newDate.year(), month: newDate.month(), date: newDate.date() })
                }
            } else {
                const { year, month, date } = this.endPanel
                let newDate = new Date(year, month, date)
                if (type === 'next') {
                    newDate = dayjs(newDate).add(1, unit)
                } else {
                    newDate = dayjs(newDate).subtract(1, unit)
                }
                if (this.unlinkPanels) {
                    this.changePanel(
                        null,
                        { year: newDate.year(), month: newDate.month(), date: newDate.date() }
                    )
                } else {
                    const startDate = dayjs(newDate).subtract(1, 'month')
                    this.changePanel(
                        { year: startDate.year(), month: startDate.month(), date: startDate.date() },
                        { year: newDate.year(), month: newDate.month(), date: newDate.date() }
                    )
                }
            }
            if (this.type === 'daterange' && !this.dateRange) {
                this.checkRangeValue(this.value, (startDate, endDate) => {
                    this.markRange(startDate.toDate(), endDate.toDate())
                })
            }
        },
        onInputWrapperClick () {
            this.onFocus()
        },
        onSelect ({ date }) {
            if (this.type === 'date') {
                this.emitDate(date)
                this.close()
            } else {
                if (this.dateRange) {
                    const time = this.dateRange.getTime()
                    const time2 = date.getTime()
                    ;[this.dateRange, date] = [Math.min(time, time2), Math.max(time, time2)]
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
            this.$emit('focus', this)
        },
        onBlur () {
            this.$emit('blur', this)
        },
        open () {
            if (this.type === 'daterange') {
                if (this.visible) return
                this.checkRangeValue(this.value, (startDate, endDate) => {
                    this.markRange(startDate.toDate(), endDate.toDate())
                })
                this.dateRange = undefined
            }
            this.visible = true
        },
        close () {
            this.visible = false
            this.afterClose()
        },
        afterClose () {
            const { startInput, endInput } = this.$refs
            if (this.type === 'date') {
                startInput.$el.querySelector('input').blur()
            } else {
                startInput.blur()
                endInput.blur()
                const { inputValue, endInputValue } = this
                if ((!inputValue || !dayjs(inputValue).isValid()) || (!endInputValue || !dayjs(endInputValue).isValid())) {
                    this.inputValue = ''
                    this.endInputValue = ''
                    this._copyInputValue = ''
                    this._copyEndInputValue = ''
                }
            }
        },
        onChange (type) {
            if (this.type === 'date') {
                const { _copyInputValue } = this
                this.formatVal(this.inputValue)
                if (this.inputValue === _copyInputValue) return
                this.emitDate(this.inputValue)
                // this.close()
            } else {
                const { inputValue, endInputValue } = this
                if (type === 'start') {
                    if (!inputValue || !dayjs(inputValue).isValid()) {
                        this.inputValue = this._copyInputValue
                    } else {
                        const date = dayjs(inputValue)
                        this.inputValue = date.format(this.format)
                        let _date = date.toDate()
                        // 如果有结束日期
                        if (endInputValue && dayjs(endInputValue).isValid()) {
                            const endDate = dayjs(endInputValue).toDate()
                            this.markRange(_date, endDate)
                            this.emitDate(_date, endDate)
                            this.close()
                        } else {
                            let endDate = null
                            if (!this.unlinkPanels) {
                                endDate = date.add(1, 'month')
                                endDate = {
                                    year: endDate.year(),
                                    month: endDate.month(),
                                    date: endDate.date()
                                }
                            }
                            this.changePanel(
                                { year: date.year(), month: date.month(), date: date.date() },
                                endDate
                            )
                            this.markRange(_date)
                            this.dateRange = _date
                        }
                    }
                } else {
                    if (inputValue && dayjs(inputValue).isValid() && endInputValue && dayjs(endInputValue).isValid()) {
                        const date = dayjs(inputValue).toDate()
                        const endDate = dayjs(endInputValue).toDate()
                        this.markRange(date, endDate)
                        this.emitDate(date, endDate)
                        this.close()
                    } else if (!endInputValue || !dayjs(endInputValue).isValid()) {
                        this.endInputValue = this._copyEndInputValue
                    }
                }
            }
        },
        emitDate (val, endVal) {
            const { valueFormat } = this
            val = dayjs(val)
            if (valueFormat) {
                val = val.format(valueFormat)
                if (endVal) endVal = dayjs(endVal).format(valueFormat)
            } else {
                val = val.toDate()
                if (endVal) endVal = dayjs(endVal).toDate()
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
            this.clearMarkRange()
            return false
        },
        clear () {
            this.inputValue = ''
            this.endInputValue = ''
            this.$emit('change', null)
            this.close()
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
        'v-icon': Icon,
        'v-date-panel': VDatePanel
    }
}
</script>

<style lang="scss" scoped>
@import '../_var.scss';

$color: #409eff;

.v-date-picker {

    .v-date-picker-range-wrapper {
        display: flex;
        align-items: center;
        width: 310px;
        padding: 3px 10px;
        box-sizing: border-box;
        height: $height;
        border: 1px solid #999;
        border-radius: $border-radius;

        &:hover {
            border-color: #666;
        }

        .icon-wrapper {
            position: relative;
            width: $height;
            height: $height;

            & > div {
                width: 14px;
                height: 14px;
                background-color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -7px 0 0 -7px;
                opacity: 1;

                .v-icon {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.25);
                    vertical-align: top;
                }

                &.close {
                    transition: opacity .4s ease;
                    z-index: 1;
                    display: none;
                    cursor: pointer;
                    opacity: 0;

                    .v-icon {
                        transition: color .4s ease;
                        font-size: 16px;
                    }

                    &:hover {

                        .v-icon {
                            color: rgba(0, 0, 0, 0.45);
                        }
                    }
                }
            }

            &.closed .close {
                display: block;
            }
        }

        input {
            border: 0;
            outline: 0;
            text-align: center;
            height: 100%;
        }

        &:hover {

            .closed .close {

                opacity: 1;
            }
        }
    }
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
