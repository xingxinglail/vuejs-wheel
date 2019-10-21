<template>
    <div>
        <br />
        <div class="wrapper">
            <v-date-picker
                v-model="date"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                separator="至"
                @change="onChange" />
            <v-date-picker
                v-model="date2"
                type="daterange"
                unlink-panels
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                separator="至"
                @change="onChange" />
        </div>

        <br />
    </div>
</template>

<script>
import DatePicker from '../../../../src/datePicker/VDatePicker'

export default {
    name: 'DatePickerRange',
    data () {
        return {
            date: '',
            date2: ''
        }
    },
    methods: {
        onChange (e) {
            console.log(e)
        }
    },
    components: {
        'v-date-picker': DatePicker
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    margin-right: 70px;
}
</style>
