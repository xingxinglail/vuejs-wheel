<template>
    <div class="layout">
        <br />
        <v-row :gutter="10">
            <v-col :span="6" :ipad="{ span: 8 }" :narrow-pc="{ span: 6 }" :wide-pc="{ span: 4 }">
                <div class="content dark"></div>
            </v-col>
            <v-col :span="6" :ipad="{ span: 4 }" :narrow-pc="{ span: 6 }" :wide-pc="{ span: 8 }">
                <div class="content light"></div>
            </v-col>
            <v-col :span="6" :ipad="{ span: 4 }" :narrow-pc="{ span: 6 }" :wide-pc="{ span: 8 }">
                <div class="content dark"></div>
            </v-col>
            <v-col :span="6" :ipad="{ span: 8 }" :narrow-pc="{ span: 6 }" :wide-pc="{ span: 4 }">
                <div class="content light"></div>
            </v-col>
        </v-row>
        <br />
    </div>
</template>

<script>
import Row from '../../../../src/VRow'
import Col from '../../../../src/VCol'

export default {
    name: 'LayoutResponsive',
    components: {
        'v-row': Row,
        'v-col': Col
    }
}
</script>

<style lang="scss">
.layout {

    .content {
        height: 36px;
        border-radius: 4px;
    }

    .dark {
        background-color: #d3dce6;
    }

    .light {
        background-color: #e5e9f2;
    }
}
</style>
