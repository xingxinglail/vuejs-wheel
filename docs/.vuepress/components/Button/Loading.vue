<template>
    <div>
        <br />
        <v-button loading>加载中...</v-button>
        <br />
    </div>
</template>

<script>
import Button from '../../../../src/VButton'

export default {
    name: 'ButtonLoading',
    components: {
        'v-button': Button
    }
}
</script>
