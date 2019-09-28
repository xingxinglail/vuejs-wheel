---
title: Table 表格
---

### Table 表格

#### 基础表格

<Table-Basis />
``` vue
<v-table
    :data="data">
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

<script>
export default {
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
            }]
        }
    }
}
</script>
```

#### 带斑马纹表格

<Table-Stripe />
``` vue
<v-table
    :data="data"
    stripe>
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

<script>
export default {
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
            }]
        }
    }
}
</script>
```

#### 带边框表格

<Table-Bordered />
``` vue
<v-table
    :data="data"
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

<script>
export default {
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
            }]
        }
    }
}
</script>
```

#### 固定表头

<Table-FixedHeader />
``` vue
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

<script>
export default {
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
    }
}
</script>
```

#### 固定列

<Table-FixedCol />
``` vue
<v-table
    :data="data"
    bordered>
    <v-table-column
        field="date"
        label="日期"
        fixed
        width="150" />
    <v-table-column
        field="name"
        label="姓名"
        width="180" />
    <v-table-column
        field="province"
        label="省份"
        width="120">
    </v-table-column>
    <v-table-column
        field="city"
        label="市区"
        width="120">
    </v-table-column>
    <v-table-column
        field="address"
        label="地址"
        width="300" />
    <v-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
            <v-button @click="handleClick(scope.row)">查看</v-button>
        </template>
    </v-table-column>
</v-table>

<script>
export default {
    data () {
        return {
            data: [{
                key: 1,
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                key: 2,
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                key: 3,
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                key: 4,
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        handleClick (row) {
            console.log(row)
        }
    }
}
</script>
```

#### 固定列和表头

<Table-FixedAll />
``` vue
<v-table
    :data="data"
    height="220"
    bordered>
    <v-table-column
        field="date"
        label="日期"
        fixed
        width="150" />
    <v-table-column
        field="name"
        label="姓名"
        width="180" />
    <v-table-column
        field="province"
        label="省份"
        width="120">
    </v-table-column>
    <v-table-column
        field="city"
        label="市区"
        width="120">
    </v-table-column>
    <v-table-column
        field="address"
        label="地址"
        width="300" />
    <v-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
            <v-button @click="handleClick(scope.row)">查看</v-button>
        </template>
    </v-table-column>
</v-table>

<script>
export default {
    data () {
        return {
            data: [{
                key: 1,
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                key: 2,
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                key: 3,
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                key: 4,
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                key: 5,
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                key: 6,
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                key: 7,
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        handleClick (row) {
            console.log(row)
        }
    }
}
</script>
```

#### 多选

<Table-Selection />
```vue
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

<v-button @click="toggleSelection([1, 3])">选中第一行和第三行</v-button>
<v-button @click="toggleSelection([])">取消选择</v-button>

<script>
export default {
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
    }
}
</script>
```

#### 排序

<Table-Sort />
```vue
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

<script>
export default {
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
    }
}
</script>
```

#### 展开行

<Table-Expand />
```vue
<v-table
    :data="data"
    row-key="id">
    <v-table-column type="expand">
        <template v-slot="props">
            <div>
                <p>商品名称： {{ props.row.name }}</p>
                <p>所属店铺： {{ props.row.shop }}</p>
                <p>商品 ID： {{ props.row.id }}</p>
                <p>店铺 ID： {{ props.row.shopId }}</p>
                <p>商品分类： {{ props.row.category }}</p>
                <p>店铺地址： {{ props.row.address }}</p>
                <p>商品描述： {{ props.row.desc }}</p>
            </div>
        </template>
    </v-table-column>
    <v-table-column
        field="id"
        label="商品 ID"
        width="180" />
    <v-table-column
        field="name"
        label="商品名称"
        width="180" />
    <v-table-column
        field="desc"
        label="描述" />
</v-table>

<script>
export default {
    data () {
        return {
            data: [{
                id: '12987122',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987123',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987125',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987126',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }]
        }
    }
}
</script>
```

#### Table Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| data      | 数据数组       | array |-     |-
| rowKey    | 表格行 key 的取值   | string |-     | 'key'
| bordered  | 是否展示外边框和列边框  | boolean |  | false
| loading   | 页面是否加载中   | boolean | - | false
| stripe    |  是否为斑马纹 table | boolean | - | false
| height   |  Table 的高度 | number / string | - | -
| sorter   |  排序规则    | object | - | -
| selection  | 选中行的 key 对象  | object | - | -
| defaultExpandAll  | 展开所有行  | boolean | - | false
| expandRowKeys  | 展开行的 key 数组  | array | - | -

#### Table Events

| 事件名称           | 说明         | 回调参数    
| ----------------- |--------------| -------
| select            | 当用户手动勾选数据行的 Checkbox 时触发的事件 | row, selected, selectedRows, nativeEvent | 
| select-all        | 当用户手动勾选全选 Checkbox 时触发的事件 | selected, selectedRows | 
| selection-change  | 当选择项发生变化时会触发该事件  |  selectedKeys, selectedRows | 
| sort-change       | 当表格的排序条件发生变化的时候会触发该事件   |  { field, order } | 

#### Table-column Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| type      | 对应列的类型。如果设置了 ```selection``` 则显示多选框；如果设置了 ```expand``` 则显示为一个可展开的按钮  | string |  selection/expand     |-
| label      | 显示的标题	 | string |-     |-
| field      | 对应列内容的字段名       | string |-     |-
| width      | 对应列的宽度   | string |-     |-
| min-width  | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列   | string |-     |-
| fixed      | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean |true, left, right     |-
| align      | 对齐方式	  | string | left/center/right      |-

#### Table-column Scoped Slot
| name        | 说明         | 
| ---------- |--------------| 
| - |自定义列的内容，参数为 { $index, column, row }| 
