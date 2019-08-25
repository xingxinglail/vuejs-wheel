<template>
    <div>
        <br />
        <v-button-group>
            <v-button>上一页</v-button>
            <v-button>下一页</v-button>
        </v-button-group>
        <v-button-group>
            <v-button>下载</v-button>
            <v-button>上传</v-button>
            <v-button>设置</v-button>
        </v-button-group>
    </div>
</template>

<script>
import ButtonGroup from '../../../../src/VButtonGroup'
import Button from '../../../../src/VButton'

export default {
    name: 'ButtonGroup',
    components: {
        'v-button-group': ButtonGroup,
        'v-button': Button
    }
}
</script>

<style lang="scss" scoped>

</style>
