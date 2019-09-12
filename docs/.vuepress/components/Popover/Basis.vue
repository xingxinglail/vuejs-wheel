<template>
    <div class="wrapper">
        <v-popover>
            <template slot="content">
                <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
            </template>
            <v-button>click 激活</v-button>
        </v-popover>
        &nbsp;&nbsp;&nbsp;
        <v-popover trigger="hover">
            <template slot="content">
                <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
            </template>
            <v-button>hover 激活</v-button>
        </v-popover>
    </div>
</template>

<script>
import Popover from '../../../../src/popover/VPopover'
import Button from '../../../../src/button/VButton'

export default {
    name: 'PopoverBasis',
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
