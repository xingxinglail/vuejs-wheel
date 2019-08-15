<template>
    <div class="v-col" :class="[span && `v-col-${span}`, offset && `v-col-offset-${offset}`]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VCol',
    props: {
        span: {
            type: [Number, String]
        },
        offset: {
            type: [Number, String]
        }
    }
}
</script>

<style lang="scss" scoped>
.v-col {
    width: 50%;
    height: 50px;
    border: 1px solid red;

    @for $n from 1 through 24 {
        &.v-col-#{$n} {
            width: $n / 24 * 100%;
        }

        &.v-col-offset-#{$n} {
            margin-left: $n / 24 * 100%;
        }
    }
}
</style>
