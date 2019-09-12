<template>
    <div>
        <v-toast @close="onClose">这是一段内容</v-toast>
        <v-toast :duration="0" position="middle" close-btn-text="关闭" @close="onClose">这是一段内容</v-toast>
        <v-toast position="bottom" @close="onClose">这是一段内容</v-toast>
    </div>
</template>

<script>
import Toast from '../../../../src/plugins/toast/src/Main'

export default {
    name: 'ToastBasis',
    methods: {
        onClose () {
            console.log('关闭了')
        }
    },
    components: {
        'v-toast': Toast
    }
}
</script>
