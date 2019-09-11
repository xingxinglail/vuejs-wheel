<template>
    <div class="container">
        &nbsp;&nbsp;&nbsp;&nbsp;
        <v-icon name="left" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <v-icon name="right" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <v-button icon="setting">设置</v-button>
    </div>
</template>

<script>
import VIcon from '../../../../src/VIcon'
import Button from '../../../../src/VButton'

export default {
    name: 'IconBasis',
    components: {
        'v-button': Button,
        'v-icon': VIcon
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    padding-top: 16px;
}
</style>
