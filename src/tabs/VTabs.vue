<template>
    <div class="v-tabs">
        <slot></slot>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'VTabs',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    provide () {
        return {
            eventBus: this._eventBus
        }
    },
    beforeCreate () {
        this._eventBus = new Vue()
    },
    mounted () {
        this._eventBus.$on('tab-click', (name, event) => {
            if (event) this.$emit('tab-click', name, event)
            this.$emit('input', name)
        })
        this._eventBus.$emit('tab-click', this.value)
    }
}
</script>

<style scoped>

</style>
