<template>
    <div class="v-row">
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
    }
}
</script>

<style lang="scss" scoped>
.v-row {
    display: flex;
    flex-wrap: wrap;
}
</style>
