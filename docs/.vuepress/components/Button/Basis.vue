<template>
    <div>
        <br />
        <v-button>默认按钮</v-button>
        <br />
    </div>
</template>

<script>
import Button from '../../../../src/button/VButton'

export default {
    name: 'ButtonBasis',
    components: {
        'v-button': Button
    }
}
</script>
