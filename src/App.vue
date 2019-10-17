<template>
    <div style="margin-top: 50px;margin-left: 200px;padding: 20px">
        <v-date-picker v-model="date" type="date" value-format="YYYY-MM-DD" @change="change" />
        <br>
        <br>
        <br>
        2019-08-01
        <v-date-picker v-model="date2" type="daterange" value-format="YYYY-MM-DD" @change="change2" />
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            date: '',
            date2: ['2019-10-01', '2019-7-11'], // '2019-10-01', '2019-10-11'
            container: null
        }
    },
    created () {
        setTimeout(() => {
            // this.date = '2018-12-11'
        }, 2000)
    },
    mounted () {
    },
    methods: {
        change (e) {
            console.log(e)
            console.log(this.date)
        },
        change2 (e) {
            console.log('app change', e)
            console.log('app change', this.date2)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
