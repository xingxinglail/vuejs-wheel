<template>
    <div class="container">
        <div class="wrapper">
            <div class="item" v-for="item in icons" :key="item.val">
                <v-icon :name="item.key" />
                <p>{{ item.val }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import VIcon from '../../../../src/icon/VIcon'
import Button from '../../../../src/button/VButton'

export default {
    name: 'IconList',
    data () {
        return {
            icons: [
                {
                    key: 'info-circle',
                    val: 'i-info-circle'
                },
                {
                    key: 'loading',
                    val: 'i-loading'
                },
                {
                    key: 'download',
                    val: 'i-download'
                },
                {
                    key: 'upload',
                    val: 'i-upload'
                },
                {
                    key: 'down',
                    val: 'i-down'
                },
                {
                    key: 'up',
                    val: 'i-up'
                },
                {
                    key: 'left',
                    val: 'i-left'
                },
                {
                    key: 'right',
                    val: 'i-right'
                },
                {
                    key: 'setting',
                    val: 'i-setting'
                }
            ]
        }
    },
    components: {
        'v-icon': VIcon
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 16px;


    .wrapper {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        border: 1px solid #eee;
        border-radius: 4px;

        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 0 0 16.666666%;
            width: 16.666666%;
            height: 120px;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            margin: -1px 0 -1px 0;

            &:nth-child(6n) {
                border-right: 0;
            }

            p, .v-icon {
                padding: 0;
                margin: 0;
            }

            .v-icon {
                font-size: 22px;
                margin-bottom: 16px;
            }
        }
    }
}
</style>
