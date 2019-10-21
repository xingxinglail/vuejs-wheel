<template>
    <div>
        <br />
        <v-date-picker v-model="date" placeholder="选择日期" @change="onChange" />
        <br />
    </div>
</template>

<script>
import DatePicker from '../../../../src/datePicker/VDatePicker'

export default {
    name: 'DatePickerBasis',
    data () {
        return {
            date: ''
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
