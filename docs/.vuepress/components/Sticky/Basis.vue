<template>
    <div class="wrapper">
        <br />
        <v-sticky @change="change">
            <v-button>固定在最顶部</v-button>
        </v-sticky>
        <br />
    </div>
</template>

<script>
import Sticky from '../../../../src/sticky/Sticky'
import Button from '../../../../src/button/VButton'

export default {
    name: 'StickyBasis',
    methods: {
        change (val) {
            console.log(val)
        }
    },
    components: {
        'v-sticky': Sticky,
        'v-button': Button
    }
}
</script>

<style>
    .v-sticky-inner {
        z-index: 20 !important;
    }
</style>
