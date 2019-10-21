import dayjs from 'dayjs'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM, wait } from '../util'

const expect = chai.expect
chai.use(sinonChai)

describe('DatePicker', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以选择日期', async () => {
        let _date
        const cb = sinon.fake()
        vm = createVue({
            template: `
                <v-date-picker v-model="date" @change="change" @focus="focus" @blur="blur" />
            `,
            data () {
                return {
                    date: ''
                }
            },
            methods: {
                change (val) {
                    _date = val
                },
                focus () {
                    cb()
                }
            }
        }, true)
        await wait()
        const inputDom = vm.$el.querySelector('input')
        const event = new Event('focus')
        inputDom.dispatchEvent(event)
        await wait()
        expect(cb).to.have.been.called
        const popoverWrapper = document.querySelector('.v-date-picker-panel')
        const btn = popoverWrapper.querySelector('.date-wrapper').children[5]
        btn.click()
        await wait()
        expect(vm.date).to.deep.eq(_date)
        expect(btn.classList.contains('current')).to.true
        expect(getComputedStyle(popoverWrapper).display).to.eq('none')
    })

    it('可以点击切换日期', async () => {
        vm = createVue({
            template: `
                <v-date-picker ref="datePicker" v-model="date" />
            `,
            data () {
                return {
                    date: ''
                }
            }
        }, true)
        await wait()
        const datePicker = vm.$refs.datePicker
        const { year: firstYear, month: firstMonth } = datePicker.panel
        const firstDate = dayjs(new Date(firstYear, firstMonth))
        const inputDom = vm.$el.querySelector('input')
        const event = new Event('focus')
        inputDom.dispatchEvent(event)
        await wait()
        const popoverWrapper = document.querySelector('.v-date-picker-panel')
        const head = popoverWrapper.querySelector('.v-date-picker-date-head')
        const left = head.querySelector('.left')
        const lDouble = left.children[0]
        const lSingle = left.children[1]
        const clickEvent = new Event('click')
        lSingle.dispatchEvent(clickEvent)
        await wait()
        lSingle.dispatchEvent(clickEvent)
        const right = head.querySelector('.right')
        const rSingle = right.querySelector('.single')
        const rDouble = right.querySelector('.double')
        let nextDate = dayjs(new Date(datePicker.panel.year, datePicker.panel.month))
        expect(nextDate.isBefore(firstDate, 'month')).to.true
        expect(nextDate.diff(firstDate, 'month')).to.eq(-2)
        lDouble.dispatchEvent(clickEvent)
        await wait()
        nextDate = dayjs(new Date(datePicker.panel.year, datePicker.panel.month))
        expect(nextDate.isBefore(firstDate, 'year')).to.true
        expect(nextDate.diff(firstDate, 'year')).to.eq(-1)
        rSingle.dispatchEvent(clickEvent)
        await wait()
        rSingle.dispatchEvent(clickEvent)
        await wait()
        rSingle.dispatchEvent(clickEvent)
        await wait()
        nextDate = dayjs(new Date(datePicker.panel.year, datePicker.panel.month))
        expect(nextDate.isBefore(firstDate, 'month')).to.true
        expect(nextDate.diff(firstDate, 'month')).to.eq(-11)
        rDouble.dispatchEvent(clickEvent)
        await wait()
        nextDate = dayjs(new Date(datePicker.panel.year, datePicker.panel.month))
        expect(nextDate.isAfter(firstDate, 'month')).to.true
        expect(nextDate.diff(firstDate, 'month')).to.eq(1)
    })

    it('可以手动输入设置日期', async () => {
        let _date
        const cb = sinon.fake()
        vm = createVue({
            template: `
                <v-date-picker ref="datePicker" v-model="date" />
            `,
            data () {
                return {
                    date: ''
                }
            },
            methods: {
                change (val) {
                    _date = val
                },
                focus () {
                    cb()
                }
            }
        }, true)
        await wait()
        const datePicker = vm.$refs.datePicker
        const inputDom = vm.$el.querySelector('input')
        const event = new Event('focus')
        inputDom.dispatchEvent(event)
        await wait()
        const event2 = document.createEvent("HTMLEvents");
        event2.initEvent('change', true, true);
        inputDom.dispatchEvent(event2)
        await wait()
        datePicker.inputValue = 'sdfsdf'
        inputDom.dispatchEvent(new Event('change'))
        await wait()
        expect(datePicker.inputValue).to.eq('')
        datePicker.inputValue = '2018-02-03'
        inputDom.dispatchEvent(new Event('change'))
        await wait()
        let { year, month, date } = datePicker.panel
        expect(year).to.eq(2018)
        expect(month).to.eq(1)
        expect(date).to.eq(3)
        datePicker.inputValue = 'sdfsdf'
        inputDom.dispatchEvent(new Event('change'))
        await wait()
        year = datePicker.panel.year
        month = datePicker.panel.month
        date = datePicker.panel.date
        expect(year).to.eq(2018)
        expect(month).to.eq(1)
        expect(date).to.eq(3)
    })

    it('可以选择开始结束日期', async () => {
        let _date
        vm = createVue({
            template: `
                <v-date-picker v-model="date" type="daterange" @change="change" />
            `,
            data () {
                return {
                    date: ''
                }
            },
            methods: {
                change (val) {
                    _date = val
                }
            }
        }, true)
        await wait()
        const inputWrapper = vm.$el.querySelector('.v-date-picker-range-wrapper')
        inputWrapper.click()
        await wait()
        const popoverWrapper = document.querySelector('.v-date-picker-panel')
        expect(popoverWrapper.children.length).to.eq(2)
        const leftBtn = popoverWrapper.children[0].querySelector('.date-wrapper').children[5]
        const rightBtn = popoverWrapper.children[1].querySelector('.date-wrapper').children[5]
        leftBtn.click()
        await wait()
        rightBtn.click()
        expect(vm.date).to.deep.eq(_date)
    })

    it('可以点击切换开始结束日期', async () => {
        vm = createVue({
            template: `
                <v-date-picker ref="datePicker" v-model="date" type="daterange" />
            `,
            data () {
                return {
                    date: ''
                }
            }
        }, true)
        await wait()
        const datePicker = vm.$refs.datePicker
        const inputWrapper = vm.$el.querySelector('.v-date-picker-range-wrapper')
        inputWrapper.click()
        await wait()
        const clickEvent = new Event('click')
        const popoverWrapper = document.querySelector('.v-date-picker-panel')
        const startHead = popoverWrapper.children[0].querySelector('.v-date-picker-date-head')
        const startLeft = startHead.querySelector('.left')
        const startLDouble = startLeft.children[0]
        const startLSingle = startLeft.children[1]
        startLSingle.dispatchEvent(clickEvent)
        await wait()
        startLSingle.dispatchEvent(clickEvent)
        await wait()
        startLDouble.dispatchEvent(clickEvent)
        await wait()
        startLSingle.dispatchEvent(clickEvent)
        await wait()
        let startDate = dayjs(new Date(datePicker.panel.year, datePicker.panel.month))
        let endDate = dayjs(new Date(datePicker.endPanel.year, datePicker.endPanel.month))
        expect(startDate.isBefore(endDate, 'month')).to.true
        expect(startDate.diff(endDate, 'month')).to.eq(-1)
        const endHead = popoverWrapper.children[1].querySelector('.v-date-picker-date-head')
        const endRight = endHead.querySelector('.right')
        const endRSingle = endRight.children[0]
        const endRDouble = endRight.children[1]
        endRSingle.dispatchEvent(clickEvent)
        await wait()
        endRSingle.dispatchEvent(clickEvent)
        await wait()
        endRDouble.dispatchEvent(clickEvent)
        await wait()
        endRSingle.dispatchEvent(clickEvent)
        await wait()
        startDate = dayjs(new Date(datePicker.panel.year, datePicker.panel.month))
        endDate = dayjs(new Date(datePicker.endPanel.year, datePicker.endPanel.month))
        expect(startDate.isBefore(endDate, 'month')).to.true
        expect(startDate.diff(endDate, 'month')).to.eq(-1)
    })

    it('可以点击切换开始结束日期 unlink-panels ', async () => {
        vm = createVue({
            template: `
                <v-date-picker ref="datePicker" unlink-panels v-model="date" type="daterange" />
            `,
            data () {
                return {
                    date: ''
                }
            }
        }, true)
        await wait()
        const datePicker = vm.$refs.datePicker
        const { year: firstEndYear, month: firstEndMonth } = datePicker.endPanel
        const firstEndDate = dayjs(new Date(firstEndYear, firstEndMonth))
        const inputWrapper = vm.$el.querySelector('.v-date-picker-range-wrapper')
        inputWrapper.click()
        await wait()
        const popoverWrapper = document.querySelector('.v-date-picker-panel')
        const startHead = popoverWrapper.children[0].querySelector('.v-date-picker-date-head')
        const startLeft = startHead.querySelector('.left')
        const startLDouble = startLeft.children[0]
        const startLSingle = startLeft.children[1]

        const startRight = startHead.querySelector('.right')
        const startRSingle = startRight.children[0]
        const startRDouble = startRight.children[1]

        const endHead = popoverWrapper.children[1].querySelector('.v-date-picker-date-head')
        const endLeft = endHead.querySelector('.left')
        const endLDouble = endLeft.children[0]
        const endLSingle = endLeft.children[1]

        const endRight = endHead.querySelector('.right')
        const endRSingle = endRight.children[0]
        const endRDouble = endRight.children[1]

        const clickEvent = new Event('click')

        startRSingle.dispatchEvent(clickEvent)
        startRDouble.dispatchEvent(clickEvent)
        endLDouble.dispatchEvent(clickEvent)
        endLSingle.dispatchEvent(clickEvent)
        expect(startRSingle.classList.contains('disabled')).to.true
        expect(startRDouble.classList.contains('disabled')).to.true
        expect(endLDouble.classList.contains('disabled')).to.true
        expect(endLSingle.classList.contains('disabled')).to.true

        startLSingle.dispatchEvent(clickEvent)
        await wait()
        expect(startRSingle.classList.contains('disabled')).to.false
        expect(startRDouble.classList.contains('disabled')).to.true
        expect(endLDouble.classList.contains('disabled')).to.true
        expect(endLSingle.classList.contains('disabled')).to.false
        startLSingle.dispatchEvent(clickEvent)
        await wait()
        expect(startRSingle.classList.contains('disabled')).to.false
        expect(startRDouble.classList.contains('disabled')).to.true
        expect(endLDouble.classList.contains('disabled')).to.true
        expect(endLSingle.classList.contains('disabled')).to.false
        startLDouble.dispatchEvent(clickEvent)
        await wait()
        expect(startRSingle.classList.contains('disabled')).to.false
        expect(startRDouble.classList.contains('disabled')).to.false
        expect(endLDouble.classList.contains('disabled')).to.false
        expect(endLSingle.classList.contains('disabled')).to.false
        startRDouble.dispatchEvent(clickEvent)
        await wait()
        expect(startRSingle.classList.contains('disabled')).to.false
        expect(startRDouble.classList.contains('disabled')).to.true
        expect(endLDouble.classList.contains('disabled')).to.true
        expect(endLSingle.classList.contains('disabled')).to.false
        startRSingle.dispatchEvent(clickEvent)
        startRSingle.dispatchEvent(clickEvent)
        await wait()

        expect(firstEndDate.isSame(dayjs(new Date(datePicker.endPanel.year, datePicker.endPanel.month)), 'month')).to.true

        expect(startRSingle.classList.contains('disabled')).to.true
        expect(startRDouble.classList.contains('disabled')).to.true
        expect(endLDouble.classList.contains('disabled')).to.true
        expect(endLSingle.classList.contains('disabled')).to.true
        endRDouble.dispatchEvent(clickEvent)
        endRDouble.dispatchEvent(clickEvent)
        await wait()
        expect(startRSingle.classList.contains('disabled')).to.false
        expect(startRDouble.classList.contains('disabled')).to.false
        expect(endLDouble.classList.contains('disabled')).to.false
        expect(endLSingle.classList.contains('disabled')).to.false
        startRDouble.dispatchEvent(clickEvent)
        startRDouble.dispatchEvent(clickEvent)
        await wait()
        expect(startRSingle.classList.contains('disabled')).to.true
        expect(startRDouble.classList.contains('disabled')).to.true
        expect(endLDouble.classList.contains('disabled')).to.true
        expect(endLSingle.classList.contains('disabled')).to.true
    })

    it('可以手动输入开始结束日期', async () => {
        vm = createVue({
            template: `
                <v-date-picker ref="datePicker" v-model="date" type="daterange" value-format="YYYY-MM-DD" />
            `,
            data () {
                return {
                    date: ''
                }
            }
        }, true)
        await wait()
        const datePicker = vm.$refs.datePicker
        const inputs = vm.$el.querySelector('.v-date-picker-range-wrapper').querySelectorAll('input')
        const startInput = inputs[0]
        const endInput = inputs[1]
        const event = new Event('focus')
        startInput.dispatchEvent(event)
        await wait()
        datePicker.inputValue = 'sdfsdf'
        startInput.dispatchEvent(new Event('change'))
        await wait()
        expect(datePicker.inputValue).to.eq('')
        await wait()
        datePicker.endInputValue = 'sdfsdf'
        endInput.dispatchEvent(new Event('change'))
        await wait()
        expect(datePicker.endInputValue).to.eq('')
        await wait()
        datePicker.inputValue = '2019-01-01'
        startInput.dispatchEvent(new Event('change'))
        await wait()
        datePicker.endInputValue = '2019-01-10'
        endInput.dispatchEvent(new Event('change'))
        await wait()
        expect(datePicker.visible).to.false
        expect(vm.date).to.deep.eq(['2019-01-01', '2019-01-10'])

        startInput.dispatchEvent(event)
        await wait()
        expect(datePicker.visible).to.true
        datePicker.inputValue = '2019-01-03'
        startInput.dispatchEvent(new Event('change'))
        await wait()
        expect(datePicker.visible).to.false
        expect(vm.date).to.deep.eq(['2019-01-03', '2019-01-10'])

        endInput.dispatchEvent(event)
        await wait()
        expect(datePicker.visible).to.true
        datePicker.endInputValue = '2019-11-03'
        endInput.dispatchEvent(new Event('change'))
        await wait()
        expect(datePicker.visible).to.false
        expect(vm.date).to.deep.eq(['2019-01-03', '2019-11-03'])

        startInput.dispatchEvent(event)
        await wait()
        expect(datePicker.visible).to.true
        datePicker.inputValue = 'dsf'
        startInput.dispatchEvent(new Event('change'))
        await wait()
        expect(datePicker.visible).to.true
        expect(vm.date).to.deep.eq(['2019-01-03', '2019-11-03'])

        endInput.dispatchEvent(event)
        await wait()
        expect(datePicker.visible).to.true
        datePicker.endInputValue = 'dfg'
        endInput.dispatchEvent(new Event('change'))
        await wait()
        expect(datePicker.visible).to.true
        expect(vm.date).to.deep.eq(['2019-01-03', '2019-11-03'])

        datePicker.endInputValue = '2019-11-04'
        endInput.dispatchEvent(new Event('change'))
        await wait()
        expect(datePicker.visible).to.false
        expect(vm.date).to.deep.eq(['2019-01-03', '2019-11-04'])
    })

    it('clearMarkRange', async () => {
        vm = createVue({
            template: `
                <v-date-picker ref="datePicker" v-model="date" type="daterange" value-format="YYYY-MM-DD" />
            `,
            data () {
                return {
                    date: ''
                }
            }
        }, true)
        await wait()
        const datePicker = vm.$refs.datePicker
        const inputs = vm.$el.querySelector('.v-date-picker-range-wrapper').querySelectorAll('input')
        const startInput = inputs[0]
        const event = new Event('focus')
        startInput.dispatchEvent(event)
        await wait()
        datePicker.inputValue = '2019-01-01'
        startInput.dispatchEvent(new Event('change'))
        document.body.click()
        await wait()
        expect(datePicker.inputValue).to.eq('')
        expect(datePicker.visible).to.false
        startInput.dispatchEvent(event)
        await wait()
        expect(datePicker.visible).to.true
    })

    it('可以清空开始结束日期', async () => {
        vm = createVue({
            template: `
                <v-date-picker ref="datePicker" v-model="date" type="daterange"" />
            `,
            data () {
                return {
                    date: ''
                }
            }
        }, true)
        await wait()
        const datePicker = vm.$refs.datePicker
        const inputs = vm.$el.querySelector('.v-date-picker-range-wrapper').querySelectorAll('input')
        const startInput = inputs[0]
        const endInput = inputs[1]
        const event = new Event('focus')
        startInput.dispatchEvent(event)
        await wait()
        datePicker.inputValue = '2019-01-01'
        startInput.dispatchEvent(new Event('change'))
        await wait()
        datePicker.endInputValue = '2019-01-10'
        endInput.dispatchEvent(new Event('change'))
        await wait()
        const closeBtn = vm.$el.querySelector('.v-date-picker-range-wrapper').querySelector('.close')
        expect(getComputedStyle(closeBtn).display).to.eq('block')
        closeBtn.click()
        await wait()
        expect(datePicker.visible).to.false
        expect(vm.date).to.eq(null)
    })
})
