<template>
    <div>
        <br />
        <v-input v-model="value" disabled></v-input>
        <br />
    </div>
</template>

<script>
import Input from '../../../../src/input/VInput'

export default {
    name: 'InputDisabled',
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
