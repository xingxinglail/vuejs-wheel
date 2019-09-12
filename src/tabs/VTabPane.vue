<template>
    <div class="v-tab-pane" v-show="show">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VTabPane',
    inject: ['eventBus'],
    data () {
        return {
            show: false
        }
    },
    props: {
        name: {
            type: String,
            require: true
        }
    },
    created () {
        this.eventBus.$on('tab-click', name => {
            this.show = name === this.name
        })
    }
}
</script>

<style lang="scss" scoped>

</style>
