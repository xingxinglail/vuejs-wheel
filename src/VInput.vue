<template>
    <div class="wrapper" :class="{ error }">
        <input type="text"
               :value="value"
               :disabled="disabled"
               :readonly="readonly"
               @input="emitEvent('input', $event)"
               @change="emitEvent('change', $event)"
               @focus="emitEvent('focus', $event)"
               @blur="emitEvent('blur', $event)" />
        <template v-if="error">
            <v-icon class="icon-error" name="info-circle"></v-icon>
            <span class="error-message">{{ error }}</span>
        </template>
    </div>
</template>

<script>
import VIcon from './VIcon'

export default {
    name: 'VInput',
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        error: {
            type: [Boolean, String],
            default: false
        }
    },
    methods: {
        emitEvent (eventName, event) {
            this.$emit(eventName, event.target.value)
        }
    },
    components: {
        VIcon
    }
}
</script>

<style lang="scss" scoped>
@import './_var';

$border-color: #999;
$border-color-hover: #666;
$border-radius: 4px;
$font-size: 12px;
$box-shadow-color: rgba(0, 0, 0, 0.5);
$red: #F1453D;
.wrapper {
    font-size: $font-size;
    display: inline-flex;
    align-items: center;

    > :not(:last-child) {
        margin-right: .5em;
    }

    > input {
        height: $height;
        border: 1px solid $border-color;
        border-radius: 4px;
        padding: 0 8px;
        font-size: inherit;

        &:hover {
            border-color: $border-color-hover;
        }

        &:focus {
            box-shadow: inset 0 1px 3px $box-shadow-color; outline: none;
        }

        &[disabled], &[readonly] {
            border-color: #bbb;
            color: #bbb;
            cursor: not-allowed;
        }
    }

    &.error {

        > input {
            border-color: $red;

            &:focus {
                box-shadow: inset 0 1px 3px rgba(241, 69, 61, 0.5); outline: none;
            }
        }
    }

    .icon-error {
        fill: $red;
    }

    .error-message {
        color: $red;
    }
}
</style>
