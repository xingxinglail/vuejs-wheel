<template>
    <div style="margin-top: 200px;margin-left: 200px;padding: 20px">
        <v-date-picker v-model="date" type="date" value-format="YYYY-MM-DD" @change="change" />
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            date: '2018-12-08',
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
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
