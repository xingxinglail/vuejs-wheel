<template>
    <div class="layout">
        <br />
        <v-row>
            <v-col :span="24">
                <div class="content dark"></div>
            </v-col>
        </v-row>
        <v-row>
            <v-col :span="12">
                <div class="content dark"></div>
            </v-col>
            <v-col :span="12">
                <div class="content light"></div>
            </v-col>
        </v-row>
        <v-row>
            <v-col :span="8">
                <div class="content dark"></div>
            </v-col>
            <v-col :span="8">
                <div class="content light"></div>
            </v-col>
            <v-col :span="8">
                <div class="content dark"></div>
            </v-col>
        </v-row>
        <v-row>
            <v-col :span="6">
                <div class="content dark"></div>
            </v-col>
            <v-col :span="6">
                <div class="content light"></div>
            </v-col>
            <v-col :span="6">
                <div class="content dark"></div>
            </v-col>
            <v-col :span="6">
                <div class="content light"></div>
            </v-col>
        </v-row>
        <v-row>
            <v-col :span="4">
                <div class="content dark"></div>
            </v-col>
            <v-col :span="4">
                <div class="content light"></div>
            </v-col>
            <v-col :span="4">
                <div class="content dark"></div>
            </v-col>
            <v-col :span="4">
                <div class="content light"></div>
            </v-col>
            <v-col :span="4">
                <div class="content dark"></div>
            </v-col>
            <v-col :span="4">
                <div class="content light"></div>
            </v-col>
        </v-row>
        <br />
    </div>
</template>

<script>
import Row from '../../../../src/layout/VRow'
import Col from '../../../../src/layout/VCol'

export default {
    name: 'LayoutBasis',
    components: {
        'v-row': Row,
        'v-col': Col
    }
}
</script>

<style lang="scss">
.layout {

    .v-row:not(:last-of-type) {
        margin-bottom: 20px;
    }

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
