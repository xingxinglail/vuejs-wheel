<template>
    <div class="wrapper">
        <v-popover placement="right" width="550px">
            <template slot="content">
                <v-layout>
                    <v-header>Header</v-header>
                    <v-layout>
                        <v-aside width="200px">Aside</v-aside>
                        <v-layout>
                            <v-content>Content</v-content>
                            <v-footer>Footer</v-footer>
                        </v-layout>
                    </v-layout>
                </v-layout>
            </template>
            <v-button>click 激活</v-button>
        </v-popover>
    </div>
</template>

<script>
import Popover from '../../../../src/popover/VPopover'
import Button from '../../../../src/button/VButton'
import VLayout from '../../../../src/container/VLayout'
import VHeader from '../../../../src/container/VHeader'
import VAside from '../../../../src/container/VAside'
import VContent from '../../../../src/container/VContent'
import VFooter from '../../../../src/container/VFooter'

export default {
    name: 'PopoverContent',
    components: {
        'v-popover': Popover,
        'v-button': Button,
        'v-layout': VLayout,
        'v-header': VHeader,
        'v-aside': VAside,
        'v-content': VContent,
        'v-footer': VFooter
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 16px;
}
.v-layout {
    text-align: center;
    color: #333;

    .v-header, .v-footer {
        background-color: #b3c0d1;
        line-height: 60px;
    }

    .v-content {
        background-color: #e9eef3;
        line-height: 160px;
    }

    .v-aside {
        background-color: #d3dce6;
        line-height: 200px;
    }
}
</style>
