<template>
    <div class="v-content">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VContent'
}
</script>

<style lang="scss" scoped>
.v-content {
    padding: 20px;
    flex-grow: 1;
}
</style>
