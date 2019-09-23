<template>
    <div style="padding: 20px">
        <v-table :columns="columns" :data="data" :sorter="sorter" bordered :loading="loading" @sort-change="onSortChange" />
        <br>
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
    }
]

export default {
    name: 'App',
    data () {
        return {
            columns: [
                {
                    title: '姓名',
                    field: 'name'
                },
                {
                    title: '年龄',
                    field: 'age'
                },
                {
                    title: '出生日期',
                    field: 'date'
                }
            ],
            data: [],
            sorter: {
                age: 'descend',
                date: false
            },
            loading: false
        }
    },
    methods: {
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
                this.loading = false
            }, 500)
        },
        change2 (val) {
            this.current2 = val
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
