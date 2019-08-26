<template>
    <div>
        <br />
        <v-input v-model="value"></v-input>
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
