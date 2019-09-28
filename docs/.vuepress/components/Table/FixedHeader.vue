<template>
    <div class="table-wrapper">
        <p>纵向内容过多时，可选择固定表头。</p>
        <v-table
            :data="data"
            height="220"
            bordered>
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
        <br />
    </div>
</template>

<script>
import Table from '../../../../src/table/VTable'
import TableColumn from '../../../../src/table/VTableColumn'

export default {
    name: 'TableFixedHeader',
    data () {
        return {
            data: [{
                key: 1,
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                key: 2,
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                key: 3,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                key: 4,
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                key: 5,
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                key: 6,
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                key: 7,
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
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

        tr:nth-child(2n) {
            background-color: transparent;
        }

        th, td {
            border: 0;
        }
    }
}
</style>
