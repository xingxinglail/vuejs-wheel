<template>
    <svg class="v-icon" aria-hidden="true" @click="$emit('click', $event)">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
import '../svg'

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
.v-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>
