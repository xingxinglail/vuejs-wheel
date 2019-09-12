<template>
    <div class="v-aside" :style="{ width }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VAside',
    props: {
        width: {
            type: String,
            default: '300px'
        }
    }
}
</script>
