<template>
    <div style="margin-top: 50px;margin-left: 200px;padding: 20px">
        <v-date-picker v-model="date" type="date" @change="change" />
        <br>
        <br>
        <br>
        2019-08-01
        <div style="display: flex">
            <v-date-picker v-model="date2"  type="daterange" @change="change2" />
            <v-date-picker v-model="date2" unlink-panels type="daterange" @change="change2" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            date: '2019-07-01',
            date2: '', // '2019-10-01', '2019-10-11'
            container: null
        }
    },
    methods: {
        change (e) {
            console.log(e)
        },
        change2 (e) {
            console.log('app change', e)
            console.log('app change', this.date2)
        }
    }
}
</script>
