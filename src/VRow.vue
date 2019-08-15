<template>
    <div class="v-row"
         :style="{ marginLeft: `-${gutter / 2}px`, marginRight: `-${gutter / 2}px` }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VRow',
    props: {
        gutter: {
            type: [Number, String]
        }
    },
    mounted () {
        const { gutter } = this
        if (gutter) {
            this.$children.forEach(vm => {
                vm.gutter = gutter
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.v-row {
    display: flex;
    flex-wrap: wrap;
}
</style>
