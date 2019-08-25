<template>
    <button class="v-button"
            :disabled="disabled"
            :class="{ [`icon-${iconPosition}`]: true , loading, disabled }"
            @click="$emit('click')">
        <v-icon class="loading icon" v-if="loading" name="loading"></v-icon>
        <v-icon class="icon" v-if="icon && !loading" :name="icon"></v-icon>
        <span class="text"><slot /></span>
    </button>
</template>

<script>
import VIcon from './VIcon'

export default {
    name: 'VButton',
    props: {
        icon: {
            type: String,
            default: ''
        },
        iconPosition: {
            type: String,
            default: 'left',
            validator (val) {
                return val === 'left' || val === 'right'
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    components: {
        VIcon
    }
}
</script>

<style lang="scss" scoped>
$button-height: 32px;
$font-size: 14px;
$button-bg: #fff;
$button-active-bg: #eee;
$border-radius: 4px;
$color: #333;
$border-color: #999;
$border-color-hover: #666;
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.v-button {
    font-size: $font-size;
    height: $button-height;
    padding: 0 1em;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background-color: $button-bg;
    display: inline-flex;
    align-items: center;
    vertical-align: top;
    cursor: pointer;

    .text {
        order: 1;
    }

    .icon {
        margin-right: 4px;

        &.loading {
            animation: spin 2s infinite linear;
        }
    }

    &.icon-right .icon {
        order: 2;
        margin-right: 0;
        margin-left: 4px;
    }

    &:hover {
        border-color: $border-color-hover;
    }

    &:active {
        background-color: $button-active-bg;
    }

    &:focus {
        outline: none;
    }

    &.disabled {
        cursor: not-allowed;
        color: #b4b4b4;
        border-color: #a2a2a2;
        background-color: #d8d8d8;
    }

    &.loading {
        cursor: auto;
        color: #797979;
        border-color: #a2a2a2;
        background-color: #d8d8d8;
    }
}
</style>
