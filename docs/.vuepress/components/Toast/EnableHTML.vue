<template>
    <div class="wrapper">
        <v-button @click="open">使用HTML片段</v-button>
    </div>
</template>

<script>
import Vue from 'vue'
import Toast from '../../../../src/plugins/toast'
import Button from '../../../../src/button/VButton'

Vue.use(Toast)

export default {
    name: 'ToastEnableHTML',
    methods: {
        open () {
            this.$toast({
                message: `<p style="padding: 0; margin: 0;">使用<b>HTML</b>片段</p>`,
                enableHTML: true,
                position: 'middle',
                onClose () {
                    console.log('关闭了')
                }
            })
        }
    },
    components: {
        'v-button': Button
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 16px;
}
</style>
