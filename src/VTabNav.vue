<template>
    <div class="v-tab-nav" :class="[{ disabled }, className]" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VTabNav',
    inject: ['eventBus'],
    data () {
        return {
            className: ''
        }
    },
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
    created () {
        this.eventBus.$on('tab-click', name => {
            this.className = name === this.name ? 'actived' : ''
        })
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
@import './_var';

.v-tab-nav {
    height: $height;
    line-height: $height;
    padding: 0 14px;
    font-size: $font-size;
    cursor: pointer;

    &.actived {
        color: #4A90E2;
    }

    &:hover {
        color: #4A90E2;
    }

    &.disabled {
        cursor: not-allowed;
    }
}
</style>
