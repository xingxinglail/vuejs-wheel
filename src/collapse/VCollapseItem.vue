<template>
    <div class="v-collapse-item">
        <div class="title" @click="onClick(relaName)">
            {{ title }}
        </div>
        <div class="content" v-show="visible">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VCollapseItem',
    data () {
        return {
            visible: false,
            relaName: ''
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        name: {
            type: [String, Number]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../var';

.v-collapse-item {

    .title {
        padding: 0 6px;
        font-size: $font-size;
        height: 40px;
        line-height: 40px;
        margin-top: -1px;
        border-top: 1px solid #999;
        border-bottom: 1px solid #999;
        cursor: pointer;
    }

    .content {
        padding: 6px;
    }

    &:first-child {

        .title {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }
    }

    &:last-child {

        .content {
            border-top: 1px solid #999;
        }

        .title {
            border-bottom: none;
        }
    }
}
</style>
