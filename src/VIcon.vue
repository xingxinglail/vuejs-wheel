<template>
    <svg class="v-icon" aria-hidden="true">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>

export default {
    name: 'VIcon',
    beforeMount () {
        import('./svg')
    },
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.v-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>
