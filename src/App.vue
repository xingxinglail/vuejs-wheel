<template>
    <div>
        1
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            tabsActive: 'second'
        }
    },
    methods: {
        handleTabClick (val) {
            console.log(val)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
