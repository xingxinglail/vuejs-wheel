<template>
    <div>
        <br />
        <v-button disabled>默认按钮</v-button>
        <br />
    </div>
</template>

<script>
import Button from '../../../../src/VButton'

export default {
    name: 'ButtonDisabled',
    components: {
        'v-button': Button
    }
}
</script>
