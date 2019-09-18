<template>
    <div>
        <v-pagination :total="7" :current="current" @change="change" />
        <br>
        <br>
        <v-pagination :total="79" :current="current" />
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            current: 3,
            current2: -9
        }
    },
    methods: {
        change (val) {
            this.current = val
        },
        change2 (val) {
            this.current2 = val
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
