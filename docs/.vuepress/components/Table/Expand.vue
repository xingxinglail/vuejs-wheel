<template>
    <div class="table-wrapper">
        <p>当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。</p>
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
        <br />
    </div>
</template>

<script>
import Table from '../../../../src/table/VTable'
import TableColumn from '../../../../src/table/VTableColumn'

export default {
    name: 'TableExpand',
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

        p {
            margin: 0;
        }
    }
}
</style>
