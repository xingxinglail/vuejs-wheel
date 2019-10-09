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

const getClasses = (obj, clsPrefix) => {
    if (!obj) return []
    const classes = []
    const { span, offset } = obj
    if (span) classes.push(`${clsPrefix}${span}`)
    if (offset) classes.push(`${clsPrefix}offset-${offset}`)
    return classes
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
            return [
                ...getClasses({ span, offset }, 'v-col-'),
                ...getClasses(ipad, 'v-col-ipad-'),
                ...getClasses(narrowPc, 'v-col-narrow-pc-'),
                ...getClasses(widePc, 'v-col-wide-pc-')
            ]
        },
        colStyle ({ gutter }) {
            if (gutter) {
                const val = gutter / 2
                return {
                    paddingLeft: `${val}px`,
                    paddingRight: `${val}px`
                }
            }
            return undefined
        }
    }
}
</script>

<style lang="scss" scoped>
.v-col {
    box-sizing: border-box;

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
