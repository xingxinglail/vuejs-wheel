<template>
    <div class="wrapper">
        <div class="top">
            <v-popover trigger="hover" placement="top-start">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>上左</v-button>
            </v-popover>
            &nbsp;&nbsp;
            <v-popover trigger="hover" placement="top">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>上边</v-button>
            </v-popover>
            &nbsp;&nbsp;
            <v-popover trigger="hover" placement="top-end">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>上右</v-button>
            </v-popover>
        </div>
        <div class="left">
            <v-popover trigger="hover" placement="left-start">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>左上</v-button>
            </v-popover>
            &nbsp;&nbsp;
            <v-popover trigger="hover" placement="left">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>左边</v-button>
            </v-popover>
            &nbsp;&nbsp;
            <v-popover trigger="hover" placement="left-end">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>左下</v-button>
            </v-popover>
        </div>
        <div class="right">
            <v-popover trigger="hover" placement="right-start">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>右上</v-button>
            </v-popover>
            &nbsp;&nbsp;
            <v-popover trigger="hover" placement="right">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>右边</v-button>
            </v-popover>
            &nbsp;&nbsp;
            <v-popover trigger="hover" placement="right-end">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>右下</v-button>
            </v-popover>
        </div>
        <div class="bottom">
            <v-popover trigger="hover" placement="bottom-start">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>下左</v-button>
            </v-popover>
            &nbsp;&nbsp;
            <v-popover trigger="hover" placement="bottom">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>下边</v-button>
            </v-popover>
            &nbsp;&nbsp;
            <v-popover trigger="hover" placement="bottom-end">
                <template slot="content">
                    <p>这是一段内容。</p>
                </template>
                <v-button>下右</v-button>
            </v-popover>
        </div>
    </div>
</template>

<script>
import Popover from '../../../../src/popover/VPopover'
import Button from '../../../../src/button/VButton'

export default {
    name: 'PopoverPlacement',
    components: {
        'v-popover': Popover,
        'v-button': Button
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 16px;
    width: 400px;

    .top, .bottom {
        text-align: center;
        clear: both;
    }

    .left {
        width: 58px;
        float: left;
    }

    .right {
        width: 58px;
        float: right;
    }
}
</style>
