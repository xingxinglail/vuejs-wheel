<template>
    <div>
        <br />
        <v-button>默认按钮</v-button>
        <br />
    </div>
</template>

<script>
import Button from '../../../../src/VButton'

export default {
    name: 'demo',
    components: {
        'v-button': Button
    }
}
</script>
