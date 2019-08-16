<template>
    <div class="v-col"
         :class="colClasses"
         :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
const validator = value => {
    const keys = Object.keys(value)
    if (keys.length === 0) return false
    let vaild = true
    keys.forEach(key => {
        if (!['span', 'offset'].includes(key)) vaild = false
    })
    return vaild
}

export default {
    name: 'VCol',
    props: {
        span: {
            type: [Number, String]
        },
        offset: {
            type: [Number, String]
        },
        ipad: {
            type: Object,
            validator
        },
        narrowPc: {
            type: Object,
            validator
        },
        widePc: {
            type: Object,
            validator
        }
    },
    data () {
        return {
            gutter: 0
        }
    },
    computed: {
        colClasses ({ span, offset, ipad, narrowPc, widePc }) {
            const ipadClasses = []
            if (ipad) {
                ipadClasses.push(`v-col-ipad-${ipad.span}`)
                ipadClasses.push(`v-col-ipad-offset-${ipad.offset}`)
            }
            const narrowPcClasses = []
            if (narrowPc) {
                narrowPcClasses.push(`v-col-narrow-pc-${narrowPc.span}`)
                narrowPcClasses.push(`v-col-narrow-pc-offset-${narrowPc.offset}`)
            }
            const widePcClasses = []
            if (widePc) {
                widePcClasses.push(`v-col-wide-pc-${widePc.span}`)
                widePcClasses.push(`v-col-wide-pc-offset-${widePc.offset}`)
            }
            return [
                span && `v-col-${span}`,
                offset && `v-col-offset-${offset}`,
                ...ipadClasses,
                ...narrowPcClasses,
                ...widePcClasses
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

    @for $n from 1 through 24 {

        &.v-col-#{$n} {
            width: $n / 24 * 100%;
        }

        &.v-col-offset-#{$n} {
            margin-left: $n / 24 * 100%;
        }
    }

    @media (min-width: 577px) {

        @for $n from 1 through 24 {
            $class-frefix: v-col-ipad-;
            &.#{$class-frefix}#{$n} {
                width: $n / 24 * 100%;
            }

            $class-frefix: v-col-ipad-offset-;
            &.#{$class-frefix}#{$n} {
                margin-left: $n / 24 * 100%;
            }
        }
    }

    @media (min-width: 769px) {

        @for $n from 1 through 24 {
            $class-frefix: v-col-narrow-pc-;
            &.#{$class-frefix}#{$n} {
                width: $n / 24 * 100%;
            }

            $class-frefix: v-col-narrow-pc-offset-;
            &.#{$class-frefix}#{$n} {
                margin-left: $n / 24 * 100%;
            }
        }
    }

    @media (min-width: 1201px) {

        @for $n from 1 through 24 {
            $class-frefix: v-col-wide-pc-;
            &.#{$class-frefix}#{$n} {
                width: $n / 24 * 100%;
            }

            $class-frefix: v-col-wide-pc-offset-;
            &.#{$class-frefix}#{$n} {
                margin-left: $n / 24 * 100%;
            }
        }
    }
}
</style>
