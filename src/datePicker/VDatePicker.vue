<template>
    <div class="v-date-picker" ref="reference">
        <v-input ref="input" v-model="inputValue" placeholder="选择日期" @input="onInput" @focus="onFocus" />
        <div class="v-date-picker-panel" v-if="popperVisible" v-show="visible" ref="popper">
            <v-date-panel :data="data"
                          :current="current"
                          :panel="panel"
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
            },
            visible: false
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
    created () {
    },
    beforeDestroy () {
        document.removeEventListener('click', this.handleDocumentClick)
    },
    methods: {
        onInput () {
            console.log(this.inputValue)
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
            if (Array.isArray(val)) {
                if (this.type === 'daterange') {
                    // todo
                }
            } else {
                let date = dayjs(val)
                if (!date.isValid()) date = dayjs()
                this.inputValue = date.format(this.format)
                const { current } = this
                current.year = date.year()
                current.month = date.month()
                current.date = date.date()
                this.changePanel(current)
                this._currentDayjs = date
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
                    isToday: _year === _nowYear && _month === _nowMonth && _date === _nowDate
                })
            }
            this.data = dateArr
        },
        changePanel ({ year, month, date }) {
            const { panel } = this
            panel.year = year
            panel.month = month
            panel.monthStr = (month + 1).toString().padStart(2, '0')
            panel.date = date
            panel.dateStr = date.toString().padStart(2, '0')
            this.getDate(panel)
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
        onSelect (data) {
            let date = data.date
            if (this.valueFormat) date = dayjs(date).format(this.valueFormat)
            this.$emit('change', date)
            this.visible = false
            this.$refs.input.$el.querySelector('input').blur()
        },
        onFocus () {
            if (!this.popperVisible) {
                this.popperVisible = true
            } else {
                this.open()
            }
        },
        open () {
            this.visible = true
        },
        close () {
            this.visible = false
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
}
</style>
