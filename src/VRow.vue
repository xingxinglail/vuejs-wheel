<template>
    <div class="v-row"
         :class="rowClass"
         :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script>

const alignMap = {
    left: 'v-row-align-left',
    center: 'v-row-align-center',
    right: 'v-row-align-right'
}

export default {
    name: 'VRow',
    props: {
        gutter: {
            type: [Number, String]
        },
        align: {
            type: String,
            validator (value) {
                return alignMap[value] !== undefined
            }
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
        },
        rowClass ({ align }) {
            const val = alignMap[align]
            return val ? val : ''
        }
    }
}
</script>

<style lang="scss" scoped>
.v-row {
    display: flex;
    flex-wrap: wrap;

    &.v-row-align-left {
        justify-content: flex-start;
    }

    &.v-row-align-center {
        justify-content: center;
    }

    &.v-row-align-right {
        justify-content: flex-end;
    }
}
</style>
