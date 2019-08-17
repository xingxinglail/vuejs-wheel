<template>
    <div class="v-header" :style="{ height }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VHeader',
    props: {
        height: {
            type: String,
            default: '60px'
        }
    }
}
</script>

<style lang="scss" scoped>
.v-header {
    padding: 0 20px;
}
</style>
