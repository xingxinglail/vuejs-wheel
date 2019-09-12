<template>
    <div class="wrapper">
        <v-popover v-model="visible">
            <template slot="content" slot-scope="{ close }">
                <p>这是一段内容,这是一段内容,这是一段内容。</p>
                <div style="text-align: right;">
                    <v-button @click="visible = false">关闭</v-button>
                    <v-button @click="close">关闭</v-button>
                </div>
            </template>
            <v-button>click 激活</v-button>
        </v-popover>
    </div>
</template>

<script>
import Popover from '../../../../src/popover/VPopover'
import Button from '../../../../src/button/VButton'

export default {
    name: 'PopoverControl',
    data () {
        return {
            visible: false
        }
    },
    components: {
        'v-popover': Popover,
        'v-button': Button
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 16px;
}
</style>
