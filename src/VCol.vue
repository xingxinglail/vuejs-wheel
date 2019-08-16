<template>
    <div class="v-col"
         :class="colClasses"
         :style="colStyle">
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
    },
    data () {
        return {
            gutter: 0
        }
    },
    computed: {
        colClasses ({ span, offset }) {
            return [
                span && `v-col-${span}`,
                offset && `v-col-offset-${offset}`
            ]
        },
        colStyle ({ gutter }) {
            if (gutter) {
                if (gutter) {
                    const val = gutter / 2
                    return {
                        paddingLeft: `${val}px`,
                        paddingRight: `${val}px`
                    }
                }
            }
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
