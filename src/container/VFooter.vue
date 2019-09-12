<template>
    <div class="v-footer" :style="{ height }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VFooter',
    props: {
        height: {
            type: String,
            default: '60px'
        }
    }
}
</script>

<style lang="scss" scoped>
.v-footer {
    padding: 0 20px;
}
</style>
