<template>
    <div style="margin-top: 200px;margin-left: 200px;padding: 20px">
        <v-date-picker v-model="date" type="date" />
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
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
</style>
