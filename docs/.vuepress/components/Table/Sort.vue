<template>
    <div class="table-wrapper">
        <p>对表格进行排序，可快速查找或对比数据。</p>
        <v-table
            :data="data"
            :sorter="sorter"
            @sort-change="onSortChange">
            <v-table-column
                field="date"
                label="日期"
                width="180" />
            <v-table-column
                field="name"
                label="姓名"
                width="180" />
            <v-table-column
                field="age"
                label="年龄"
                width="180" />
            <v-table-column
                field="address"
                label="地址" />
        </v-table>
        <br />
    </div>
</template>

<script>
import Table from '../../../../src/table/VTable'
import TableColumn from '../../../../src/table/VTableColumn'

export default {
    name: 'TableSort',
    data () {
        return {
            sorter: {
                age: 'descend',
                date: false
            },
            data: [{
                key: 1,
                age: 22,
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                key: 2,
                age: 30,
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                key: 3,
                age: 18,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                key: 4,
                age: 26,
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
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
    },
    components: {
        'v-table': Table,
        'v-table-column': TableColumn
    }
}
</script>

<style lang="scss">
.table-wrapper {

    table {
        margin: 0;

        th, td {
            border: 0;
        }
    }
}
</style>
