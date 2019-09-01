<template>
    <div>
        <v-button>按钮</v-button>
        <v-button>按钮2</v-button>
        <v-button icon="setting" disabled>设置</v-button>
        <v-button icon="download" icon-position="left">下载</v-button>
        <v-button icon="upload" icon-position="right">上传</v-button>
        <v-button loading icon-position="right">上传中...</v-button>
        <v-button loading>加载中...</v-button>
        <div>
            <v-button-group>
                <div>
                    <v-button icon="download" icon-position="left">下载</v-button>
                </div>
                <v-button icon="download" icon-position="left">下载</v-button>
                <v-button icon="upload" icon-position="right">上传</v-button>
            </v-button-group>
        </div>
        <div>
            <v-button-group>
                <v-button icon="download" icon-position="left">下载</v-button>
                <v-button icon="upload" icon-position="right">上传</v-button>
                <v-button icon="setting" icon-position="right">设置</v-button>
            </v-button-group>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App'
}
</script>
