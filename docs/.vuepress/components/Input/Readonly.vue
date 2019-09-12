<template>
    <div>
        <br />
        <v-input v-model="value" readonly></v-input>
        <br />
    </div>
</template>

<script>
import Input from '../../../../src/input/VInput'

export default {
    name: 'InputReadonly',
    data () {
        return {
            value: '内容'
        }
    },
    components: {
        'v-input': Input
    }
}
</script>
