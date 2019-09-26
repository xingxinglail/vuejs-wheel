<template>
    <div style="padding: 20px">
        <v-table :data="data2"
                 bordered
                 height="200"
                 :selection="selection"
                 @selection-change="onSelectionChange"
                 @select="onSelect"
                 @select-all="onSelectAll"
                 @sort-change="onSortChange">
            <v-table-column type="selection" width="60" />
            <v-table-column
                v-for="item in columns"
                :key="item.field"
                :label="item.label"
                :align="item.align"
                :field="item.field"
                :width="item.width"
                :min-width="item.minWidth"></v-table-column>
            <v-table-column label="操作" align="center" min-width="130">
                <template v-slot="slotProps">
                    <v-button @click="test(slotProps)">查看详情</v-button>
                </template>
            </v-table-column>
            <v-table-column label="操作2" align="center" min-width="200">
                <template v-slot="slotProps">
                    <v-input v-model="slotProps.row.name"></v-input>
                </template>
            </v-table-column>
        </v-table>
        <br>
        <br>
        <br>
<!--        <v-table :data="data2"-->
<!--                 height="200"-->
<!--                 @selection-change="onSelectionChange"-->
<!--                 @select="onSelect"-->
<!--                 @select-all="onSelectAll"-->
<!--                 @sort-change="onSortChange">-->
<!--            <v-table-column-->
<!--                v-for="item in columns"-->
<!--                :key="item.field"-->
<!--                :label="item.label"-->
<!--                :field="item.field"-->
<!--                :width="item.width"-->
<!--                :min-width="item.minWidth"></v-table-column>-->
<!--        </v-table>-->
<!--        <v-table :columns="columns"-->
<!--                 :data="data2"-->
<!--                 bordered-->
<!--                 :selection="selection"-->
<!--                 @selection-change="onSelectionChange"-->
<!--                 @select="onSelect"-->
<!--                 @select-all="onSelectAll"-->
<!--                 @sort-change="onSortChange" />-->
<!--        <br>-->
<!--        <br><br>-->
<!--        <br>-->
<!--        <v-table :columns="columns" :data="data" :sorter="sorter" bordered :loading="loading" @sort-change="onSortChange" />-->
<!--        <br>-->
        <br>
    </div>
</template>

<script>
const data = [
    {
        key: '1',
        name: '星星',
        age: 25,
        date: '1994-12-08'
    },
    {
        key: '2',
        name: '星星来了',
        age: 18,
        date: '1996-05-03'
    },
    {
        key: '3',
        name: '张三',
        age: 22,
        date: '2001-01-03'
    },
    {
        key: '4',
        name: '李四',
        age: 15,
        date: '1999-10-11'
    },
    {
        key: '5',
        name: '李5四',
        age: 55,
        date: '1999-10-11'
    },
    {
        key: '6',
        name: '李66四',
        age: 2,
        date: '1999-10-11'
    },
    {
        key: '7',
        name: '李777四',
        age: 12,
        date: '1999-10-11'
    }
]

export default {
    name: 'App',
    data () {
        return {
            columns: [
                {
                    label: '姓名',
                    field: 'name',
                    width: '200px',
                    align: 'right'
                },
                {
                    label: '年龄',
                    field: 'age',
                    align: 'left'
                },
                {
                    label: '出生日期',
                    field: 'date',
                    minWidth: '130'
                }
                // {
                //     label: 'key',
                //     field: 'key',
                //     align: 'center'
                // }
            ],
            data: [],
            data2: data,
            sorter: {
                age: 'descend',
                date: false
            },
            loading: false,
            selection: {
                selectedKeys: []
            }
        }
    },
    created () {
        // setTimeout(() => {
        //     this.data2.push({
        //         key: '5',
        //         name: '王五',
        //         age: 31,
        //         date: '1984-10-08'
        //     })
        // }, 1000)
        // let i = 1
        // setTimeout(() => {
        //     this.columns.push({
        //         title: i,
        //         field: i + '6543'
        //     })
        //     this.columns.push({
        //         title: i + 1,
        //         field: i + 1 + '6543'
        //     })
        // }, 1000)
    },
    methods: {
        test (val) {
            console.log(val)
        },
        onSortChange ({ field, order }) {
            this.loading = true
            setTimeout(() => {
                const clone = JSON.parse(JSON.stringify(data))
                if (field === 'age' && order) {
                    clone.sort((a, b) => {
                        if (order === 'ascend') return a.age - b.age
                        if (order === 'descend') return b.age - a.age
                    })
                }
                if (field === 'date' && order) {
                    clone.sort((a, b) => {
                        if (order === 'ascend') return new Date(a.date) - new Date(b.date)
                        if (order === 'descend') return new Date(b.date) - new Date(a.date)
                    })
                }
                this.data = clone
                this.data2 = clone
                this.loading = false
            }, 500)
        },
        onSelectionChange (selectedKeys, selectedRows) {
            this.selection.selectedKeys = selectedKeys
            console.log('selectedKeys change', selectedKeys)
            // console.log('selectedRows change', selectedRows)
        },
        onSelect (row, selected, selectedRows, nativeEvent) {
            console.log('onselect', row)
            console.log('onselect', selected)
            console.log('onselect', selectedRows)
            console.log('onselect', nativeEvent)
        },
        onSelectAll (selected, selectedRows) {
            console.log('onSelectAll', selected)
            console.log('onSelectAll', selectedRows)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
