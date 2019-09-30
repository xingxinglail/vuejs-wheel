<template>
    <div style="padding: 20px">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
<!--        <v-table :data="data2"-->
<!--                 height="200"-->
<!--                 stripe-->
<!--                 bordered-->
<!--                 :selection="selection"-->
<!--                 @selection-change="onSelectionChange"-->
<!--                 @select="onSelect"-->
<!--                 @select-all="onSelectAll"-->
<!--                 @sort-change="onSortChange">-->
<!--            <v-table-column type="selection" fixed width="60" />-->
<!--            <v-table-column-->
<!--                v-for="item in columns"-->
<!--                :key="item.field"-->
<!--                :label="item.label"-->
<!--                :fixed="item.fixed"-->
<!--                :align="item.align"-->
<!--                :field="item.field"-->
<!--                :width="item.width"-->
<!--                :min-width="item.minWidth"></v-table-column>-->
<!--            <v-table-column label="操作" align="center" min-width="200">-->
<!--                <template v-slot="slotProps">-->
<!--                    <v-button @click="test(slotProps)">查看详情</v-button>&nbsp;&nbsp;-->
<!--                    <v-button @click="test(slotProps)">删除</v-button>-->
<!--                </template>-->
<!--            </v-table-column>-->
<!--            <v-table-column label="操作2" align="center" min-width="200">-->
<!--                <template v-slot="{ row }">-->
<!--                    <v-input v-model="row.name"></v-input>-->
<!--                </template>-->
<!--            </v-table-column>-->
<!--        </v-table>-->
<!--        <br>-->
<!--        <br>-->
<!--        <v-table :data="data2"-->
<!--                 bordered-->
<!--                 stripe-->
<!--                 default-expand-all-->
<!--                 :expand-row-keys="expandRowKeys"-->
<!--                 :selection="selection"-->
<!--                 @selection-change="onSelectionChange"-->
<!--                 @select="onSelect"-->
<!--                 @select-all="onSelectAll"-->
<!--                 @sort-change="onSortChange">-->
<!--            <v-table-column type="expand">-->
<!--                <template v-slot="parentSlotProps">-->
<!--                    <v-table :data="data2" bordered>-->
<!--                        <v-table-column label="姓名" field="name"></v-table-column>-->
<!--                        <v-table-column label="年龄" field="age"></v-table-column>-->
<!--                        <v-table-column label="操作" align="center" width="130">-->
<!--                            <template v-slot="slotProps">-->
<!--                                <v-button @click="test2(parentSlotProps, slotProps)">查看</v-button>-->
<!--                            </template>-->
<!--                        </v-table-column>-->
<!--                    </v-table>-->
<!--                </template>-->
<!--            </v-table-column>-->
<!--            <v-table-column type="selection" width="60" />-->
<!--            <v-table-column-->
<!--                v-for="item in columns"-->
<!--                :key="item.field"-->
<!--                :label="item.label"-->
<!--                :align="item.align"-->
<!--                :field="item.field"-->
<!--                :width="item.width"-->
<!--                :min-width="item.minWidth"></v-table-column>-->
<!--            <v-table-column label="操作" align="center" min-width="130">-->
<!--                <template v-slot="slotProps">-->
<!--                    <v-button @click="test(slotProps)">查看详情</v-button>-->
<!--                    <v-button @click="test(slotProps)">删除</v-button>-->
<!--                </template>-->
<!--            </v-table-column>-->
<!--            <v-table-column label="操作2" align="center" min-width="200">-->
<!--                <template v-slot="{ row }">-->
<!--                    <v-input v-model="row.name"></v-input>-->
<!--                </template>-->
<!--            </v-table-column>-->
<!--        </v-table>-->
        <br>
        <br>
        <br>
        <v-table :data="data2"
                 stripe
                 height="250"
                 bordered
                 :selection="selection"
                 @selection-change="onSelectionChange">
            <v-table-column type="selection" fixed width="60" />
            <v-table-column type="selection" fixed width="60" />
            <v-table-column
                v-for="item in columns"
                :key="item.field"
                :label="item.label"
                :field="item.field"
                :width="item.width"
                :min-width="item.minWidth"></v-table-column>
            <v-table-column type="selection" fixed="right" width="160" />
            <v-table-column type="selection" fixed="right" width="160" />
        </v-table>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>

<script>
// todo hover-row 测试用例

const data = new Array(10)
for (let i = 0; i < data.length; i++) {
    data[i] = {
        key: `${i + 1}`,
        name: `星星${i + 1}`,
        age: 25,
        date: '1994-12-08'
    }
}
// const data = [
//     {
//         key: '1',
//         name: '星星',
//         age: 25,
//         date: '1994-12-08'
//     },
//     {
//         key: '2',
//         name: '星星来了',
//         age: 18,
//         date: '1996-05-03'
//     },
//     {
//         key: '3',
//         name: '张三',
//         age: 22,
//         date: '2001-01-03'
//     },
//     {
//         key: '4',
//         name: '李四',
//         age: 15,
//         date: '1999-10-11'
//     },
//     {
//         key: '5',
//         name: '李5四',
//         age: 55,
//         date: '1999-10-11'
//     },
//     {
//         key: '6',
//         name: '李66四',
//         age: 2,
//         date: '1999-10-11'
//     },
//     {
//         key: '7',
//         name: '李777四',
//         age: 12,
//         date: '1999-10-11'
//     }
// ]

export default {
    name: 'App',
    data () {
        return {
            expandRowKeys: ['3', '5'],
            columns: [
                {
                    label: '姓名',
                    field: 'name',
                    width: '100px',
                    fixed: true
                },
                {
                    label: '年龄',
                    field: 'age',
                    align: 'left',
                    fixed: 'right'
                },
                {
                    label: 'key',
                    field: 'key',
                    align: 'center',
                    fixed: 'right',
                    width: '200px'
                },
                {
                    label: '出生日期',
                    field: 'date',
                    minWidth: '130',
                    fixed: 'left'
                }
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
        //     this.expandRowKeys = ['1']
        // }, 1000)
        // setTimeout(() => {
        //     this.data2.push({
        //         key: '532',
        //         name: '王五',
        //         age: 31,
        //         date: '1984-10-08'
        //     })
        // }, 2000)
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
        test2 (val, val2) {
            console.log(val)
            console.log(val2)
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
