<template>
    <div class="table-wrapper">
        <p>选择多行数据时使用 Checkbox。</p>
        <v-table
            :data="data"
            :selection="selection"
            @selection-change="onSelectionChange">
            <v-table-column type="selection" />
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
        <v-button @click="toggleSelection([1, 3])">选中第一行和第三行</v-button>
        &nbsp;
        <v-button @click="toggleSelection([])">取消选择</v-button>
    </div>
</template>

<script>
import Table from '../../../../src/table/VTable'
import TableColumn from '../../../../src/table/VTableColumn'
import Button from '../../../../src/button/VButton'

export default {
    name: 'TableBasis',
    data () {
        return {
            selection: {
                selectedKeys: []
            },
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
            }]
        }
    },
    methods: {
        onSelectionChange (selectedKeys) {
            this.selection.selectedKeys = selectedKeys
        },
        toggleSelection (keys) {
            this.selection.selectedKeys = keys
        }
    },
    components: {
        'v-table': Table,
        'v-table-column': TableColumn,
        'v-button': Button
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
