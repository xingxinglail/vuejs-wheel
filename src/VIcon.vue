<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
export default {
    name: 'VIcon',
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>
