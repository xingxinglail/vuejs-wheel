<template>
    <div class="v-tab-head">
        <slot></slot>
        <div class="line" :style="lineStyle"></div>
        <div class="control">
            <slot name="control"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VTabHead',
    inject: ['eventBus'],
    data () {
        return {
            lineStyle: null
        }
    },
    mounted () {
        this.eventBus.$on('tab-click', name => {
            this.moveLine(name)
        })
    },
    methods: {
        moveLine (name) {
            this.$children.forEach(vm => {
                if (vm.name === name) {
                    const width = vm.$el.offsetWidth
                    const left = vm.$el.offsetLeft
                    this.lineStyle = {
                        width: `${width}px`,
                        left: `${left}px`
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.v-tab-head {
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #ddd;

    .line {
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: -1px;
        height: 1px;
        background-color: #09f;
        transition: .4s ease;
    }

    .control {
        margin-left: auto;
    }
}
</style>
