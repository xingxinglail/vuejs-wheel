import Popper from 'popper.js'

export default {
    props: {
        popperOptions: {
            type: Object,
            default () {
                return Object.create(null)
            }
        }
    },
    data () {
        return {
            popperVisible: false
        }
    },
    created () {
        this._popperJS = null
        const unwatch = this.$watch('popperVisible', v => {
            if (v) {
                unwatch()
                this.$nextTick(this.createPopper)
            }
        }, { immediate: true })
    },
    beforeDestroy () {
        this._popperJS && this._popperJS.destroy()
    },
    methods: {
        createPopper () {
            const { reference, popper } = this.$refs
            this._popperJS = new Popper(reference, popper, this.popperOptions)
        }
    }
}
