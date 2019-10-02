<template>
    <div class="wrapper">
        <br />
        <div class="container" ref="container">
            <v-sticky :container="container">
                <v-button>指定容器</v-button>
            </v-sticky>
        </div>
        <br />
    </div>
</template>

<script>
import Sticky from '../../../../src/sticky/Sticky'
import Button from '../../../../src/button/VButton'

export default {
    name: 'StickyContainer',
    data () {
        return {
            container: null
        }
    },
    mounted () {
        this.container = this.$refs.container
    },
    components: {
        'v-sticky': Sticky,
        'v-button': Button
    }
}
</script>

<style lang="scss" scoped>
.wrapper {

    .container {
        height: 300px;
        background-color: #eaeaea;
    }
}
</style>
