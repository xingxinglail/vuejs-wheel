<template>
    <div class="v-layout" :class="layoutClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VLayout',
    data () {
        return {
            layoutClass: {
                'v-layout-has-aside': false
            }
        }
    },
    mounted () {
        this.$children.forEach(vm => {
            if (vm.$options.name === 'VAside') {
                this.layoutClass['v-layout-has-aside'] = true
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.v-layout {
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    &.v-layout-has-aside {
        flex-direction: row;
    }
}
</style>
