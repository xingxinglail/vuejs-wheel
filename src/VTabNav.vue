<template>
    <div class="v-tab-nav" :class="{ disabled }" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VTabNav',
    inject: ['eventBus'],
    props: {
        name: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick (e) {
            if (this.disabled) return
            this.eventBus.$emit('tab-click', this.name, e)
        }
    }
}
</script>

<style lang="scss" scoped>
.v-tab-nav {
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    font-size: 14px;
    cursor: pointer;

    &.disabled {
        cursor: not-allowed;
    }
}
</style>
