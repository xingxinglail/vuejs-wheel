import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM, wait } from '../util'

const expect = chai.expect
chai.use(sinonChai)

const data = [{
    key: '12987122',
    name: '好滋好味鸡蛋仔',
    age: 23,
    date: '2016-05-02',
    category: '江浙小吃、小吃零食',
    desc: '荷兰优质淡奶，奶香浓而不腻',
    address: '上海市普陀区真北路',
    shop: '王小虎夫妻店',
    shopId: '10333'
}, {
    key: '12987123',
    name: '好滋好味鸡蛋仔',
    age: 22,
    date: '2018-08-02',
    category: '江浙小吃、小吃零食',
    desc: '荷兰优质淡奶，奶香浓而不腻',
    address: '上海市普陀区真北路',
    shop: '王小虎夫妻店',
    shopId: '10333'
}, {
    key: '12987125',
    name: '好滋好味鸡蛋仔',
    age: 18,
    date: '2016-10-02',
    category: '江浙小吃、小吃零食',
    desc: '荷兰优质淡奶，奶香浓而不腻',
    address: '上海市普陀区真北路',
    shop: '王小虎夫妻店',
    shopId: '10333'
}, {
    key: '12987126',
    name: '好滋好味鸡蛋仔',
    age: 30,
    date: '2016-05-12',
    category: '江浙小吃、小吃零食',
    desc: '荷兰优质淡奶，奶香浓而不腻',
    address: '上海市普陀区真北路',
    shop: '王小虎夫妻店',
    shopId: '10333'
}]

describe('Table', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置stripe', () => {
        vm = createVue({
            template: `
                <v-table :data="data" stripe>
                    <v-table-column
                        field="date"
                        label="日期"
                        width="180" />
                    <v-table-column
                        field="name"
                        label="姓名"
                        width="180" />
                    <v-table-column
                        field="address"
                        label="地址" />
                </v-table>
            `,
            data () {
                return {
                    data
                }
            }
        })
        expect(vm.$el.classList.contains('v-table-stripe')).to.eq(true)
        const trs = vm.$el.querySelectorAll('.v-table-row')
        Array.from(trs).forEach((tr, index) => {
            if (index % 2 === 1) {
                expect(tr.classList.contains('striped')).to.eq(true)
            }
        })
    })

    it('可以设置bordered', () => {
        vm = createVue({
            template: `
                <v-table :data="data" bordered>
                    <v-table-column
                        field="date"
                        label="日期"
                        width="180" />
                </v-table>
            `,
            data () {
                return {
                    data
                }
            }
        })
        expect(vm.$el.classList.contains('v-table-bordered')).to.eq(true)
    })

    it('可以设置height', () => {
        vm = createVue({
            template: `
                <v-table :data="data" height="200">
                    <v-table-column
                        field="date"
                        label="日期"
                        width="180" />
                </v-table>
            `,
            data () {
                return {
                    data
                }
            }
        }, true)
        expect(getComputedStyle(vm.$el).height).to.eq('200px')
    })

    it('可以固定列', async () => {
        vm = createVue({
            template: `
                <v-table :data="data">
                    <v-table-column
                        field="key"
                        label="id"
                        fixed
                        width="180" />
                    <v-table-column
                        field="date"
                        label="日期"
                        width="180" />
                    <v-table-column
                        field="name"
                        label="姓名"
                        width="180" />
                    <v-table-column
                        field="name"
                        label="姓名"
                        width="180" />
                    <v-table-column
                        field="desc"
                        label="描述" />
                    <v-table-column
                        field="address"
                        label="地址"
                        fixed="right"
                        width="180" />
                </v-table>
            `,
            data () {
                return {
                    data
                }
            }

        }, true)
        await wait()
        expect(vm.$el.querySelectorAll('.v-table-fixed').length).to.eq(2)
    })

    it('可以多选', async () => {
        const selectCb = sinon.fake()
        const selectAllCb = sinon.fake()
        vm = createVue({
            template: `
                <v-table
                    :data="data"
                    :selection="selection"
                    @selection-change="onSelectionChange"
                    @select="onSelect"
                    @select-all="onSelectAll">
                    <v-table-column
                     type="selection"
                     width="60" />
                    <v-table-column
                        field="date"
                        label="日期"
                        width="180" />
                </v-table>
            `,
            data () {
                return {
                    data,
                    selection: {
                        selectedKeys: []
                    }
                }
            },
            methods: {
                onSelectionChange (selectedKeys) {
                    this.selection.selectedKeys = selectedKeys
                },
                onSelect () {
                    selectCb()
                },
                onSelectAll () {
                    selectAllCb()
                }
            }
        }, true)
        await wait()
        const checkboxs = vm.$el.querySelectorAll('.checkbox')
        checkboxs[0].click()
        await wait(100)
        expect(selectAllCb).to.have.been.called
        expect(vm.selection.selectedKeys).to.deep.equal(['12987122', '12987123', '12987125', '12987126'])
        checkboxs[1].click()
        expect(selectCb).to.have.been.called
        await wait(100)
        expect(vm.selection.selectedKeys).to.deep.equal(['12987123', '12987125', '12987126'])
        expect(checkboxs[0].indeterminate).to.true
        vm.selection.selectedKeys = []
        await wait(100)
        expect(checkboxs[0].checked).to.false
        expect(checkboxs[0].indeterminate).to.false
        vm.selection.selectedKeys = ['12987122', '12987123', '12987125', '12987126']
        await wait(100)
        expect(vm.selection.selectedKeys).to.deep.equal(['12987122', '12987123', '12987125', '12987126'])
        expect(checkboxs[0].checked).to.true
        expect(checkboxs[0].indeterminate).to.false
    })

    it('可以排序', async () => {
        vm = createVue({
            template: `
                <v-table
                    :data="data"
                    :sorter="sorter"
                    @sort-change="onSortChange">
                    <v-table-column
                        field="date"
                        label="日期"
                        width="180" />
                    <v-table-column
                        field="age"
                        label="年龄"
                        width="180" />
                    <v-table-column
                        field="address"
                        label="地址" />
                </v-table>
            `,
            created () {
                this.data = JSON.parse(JSON.stringify(data))
            },
            data () {
                return {
                    data,
                    sorter: {
                        age: 'descend',
                        date: false
                    }
                }
            },
            methods: {
                onSortChange ({ field, order }) {
                    if (field === 'age' && order) {
                        this.data.sort((a, b) => {
                            if (order === 'ascend') return a.age - b.age
                            if (order === 'descend') return b.age - a.age
                        })
                    }
                    if (field === 'date' && order) {
                        this.data.sort((a, b) => {
                            if (order === 'ascend') return new Date(a.date) - new Date(b.date)
                            if (order === 'descend') return new Date(b.date) - new Date(a.date)
                        })
                    }
                }
            }
        }, true)
        await wait()
        const sorterThs = vm.$el.querySelectorAll('.v-table-column-has-sorters')
        const dateSorteWrapper = sorterThs[0].querySelector('.v-table-column-sorters')
        const ageSorteWrapper = sorterThs[1].querySelector('.v-table-column-sorters')
        expect(dateSorteWrapper.classList.contains('descend')).to.false
        expect(dateSorteWrapper.classList.contains('ascend')).to.false
        expect(ageSorteWrapper.classList.contains('descend')).to.true
        sorterThs[1].click()
        await wait()
        expect(ageSorteWrapper.classList.contains('ascend')).to.false
        expect(ageSorteWrapper.classList.contains('descend')).to.false
        sorterThs[0].click()
        await wait()
        expect(dateSorteWrapper.classList.contains('ascend')).to.true
        sorterThs[1].click()
        await wait()
        expect(dateSorteWrapper.classList.contains('ascend')).to.false
        expect(ageSorteWrapper.classList.contains('ascend')).to.true
    })

    it('可展开行', async () => {
        vm = createVue({
            template: `
                <v-table :data="data">
                    <v-table-column type="expand">
                        <template v-slot="props">
                            <p>{{ props.row.key }}</p>
                        </template>
                    </v-table-column>
                    <v-table-column
                        field="date"
                        label="日期"
                        width="180" />
                    <v-table-column
                        field="age"
                        label="年龄"
                        width="180" />
                    <v-table-column
                        field="address"
                        label="地址" />
                </v-table>
            `,
            data () {
                return {
                    data
                }
            }
        }, true)
        await wait()
        const rows = vm.$el.querySelectorAll('.v-table-row')
        const expandBtn = vm.$el.querySelectorAll('.v-table-column-expand')
        expandBtn[0].click()
        await wait()
        expect(vm.$el.querySelector('.v-table-body').querySelectorAll('tr').length).to.eq(5)
        expandBtn[1].click()
        await wait()
        expect(rows[1].nextSibling.querySelector('p').innerHTML).to.eq('12987123')
        expandBtn[2].click()
        await wait()
        expect(vm.$el.querySelector('.v-table-body').querySelectorAll('tr').length).to.eq(7)
        expandBtn[0].click()
        await wait()
        expect(getComputedStyle(rows[0].nextSibling).display).to.eq('none')
        expandBtn[2].click()
        await wait()
        expect(getComputedStyle(rows[2].nextSibling).display).to.eq('none')
        expandBtn[2].click()
        await wait()
        expect(getComputedStyle(rows[2].nextSibling).display).to.not.eq('none')
    })

    it('可配置展开行', async () => {
        vm = createVue({
            template: `
                <v-table
                    :data="data"
                    default-expand-all
                    :expand-row-keys="expandRowKeys">
                    <v-table-column type="expand">
                        <template v-slot="props">
                            <p>{{ props.row.key }}</p>
                        </template>
                    </v-table-column>
                    <v-table-column
                        field="date"
                        label="日期"
                        width="180" />
                    <v-table-column
                        field="age"
                        label="年龄"
                        width="180" />
                    <v-table-column
                        field="address"
                        label="地址" />
                </v-table>
            `,
            data () {
                return {
                    data,
                    expandRowKeys: []
                }
            }
        }, true)
        await wait()
        const rows = vm.$el.querySelectorAll('.v-table-row')
        const expandBtn = vm.$el.querySelectorAll('.v-table-column-expand')
        expect(vm.$el.querySelector('.v-table-body').querySelectorAll('tr').length).to.eq(8)
        vm.expandRowKeys.push('12987123', '12987125')
        await wait()
        expect(getComputedStyle(rows[0].nextSibling).display).to.eq('none')
        expect(getComputedStyle(rows[1].nextSibling).display).to.not.eq('none')
        expect(getComputedStyle(rows[2].nextSibling).display).to.not.eq('none')
        expect(getComputedStyle(rows[3].nextSibling).display).to.eq('none')
        vm.expandRowKeys = ['12987126']
        await wait()
        expect(getComputedStyle(rows[0].nextSibling).display).to.eq('none')
        expect(getComputedStyle(rows[1].nextSibling).display).to.eq('none')
        expect(getComputedStyle(rows[2].nextSibling).display).to.eq('none')
        expect(getComputedStyle(rows[3].nextSibling).display).to.not.eq('none')
        vm.expandRowKeys = ['12987122', '12987123', '12987125', '12987126']
        await wait()
        expect(getComputedStyle(rows[0].nextSibling).display).to.not.eq('none')
        expect(getComputedStyle(rows[1].nextSibling).display).to.not.eq('none')
        expect(getComputedStyle(rows[2].nextSibling).display).to.not.eq('none')
        expect(getComputedStyle(rows[3].nextSibling).display).to.not.eq('none')
    })
})
