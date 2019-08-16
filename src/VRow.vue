<template>
    <div class="v-row"
         :style="rowStyle">
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
    },
    computed: {
        rowStyle ({ gutter }) {
            if (gutter) {
                const val = gutter / 2
                return {
                    marginLeft: `-${val}px`,
                    marginRight: `-${val}px`
                }
            }
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
