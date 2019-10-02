<template>
    <div class="wrapper">
        <br />
        <v-sticky :distance="50">
            <v-button>固定在距离顶部 50px 的位置</v-button>
        </v-sticky>
        <br />
    </div>
</template>

<script>
import Sticky from '../../../../src/sticky/Sticky'
import Button from '../../../../src/button/VButton'

export default {
    name: 'StickyDistance',
    components: {
        'v-sticky': Sticky,
        'v-button': Button
    }
}
</script>
