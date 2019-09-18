<template>
    <div class="wrapper">
        <p>页数较少时的效果</p>
        <v-pagination :total="7" :current="current" @change="onChange"></v-pagination>
        <p>大于 7 页时的效果</p>
        <v-pagination :total="100" :current.sync="current2"></v-pagination>
    </div>
</template>

<script>
import Pagination from '../../../../src/pagination/VPagination'

export default {
    name: 'PaginationBasis',
    data () {
        return {
            current: 1,
            current2: 1
        }
    },
    methods: {
        onChange (val) {
            console.log(val)
            this.current = val
        }
    },
    components: {
        'v-pagination': Pagination
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 16px;
}
</style>
