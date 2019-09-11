<template>
    <div>
        <br />
        <v-input v-model="value" placeholder="请输入内容"></v-input>
        <br />
    </div>
</template>

<script>
import Input from '../../../../src/VInput'

export default {
    name: 'InputBasis',
    data () {
        return {
            value: ''
        }
    },
    components: {
        'v-input': Input
    }
}
</script>
