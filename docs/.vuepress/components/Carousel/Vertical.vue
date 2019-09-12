<template>
    <div class="wrapper">
        <v-carousel :autoplay="false" direction="vertical">
            <v-carousel-item name="first">
                <div class="carousel-box">
                    1
                </div>
            </v-carousel-item>
            <v-carousel-item name="second">
                <div class="carousel-box">
                    2
                </div>
            </v-carousel-item>
            <v-carousel-item name="third">
                <div class="carousel-box">
                    3
                </div>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
import VCarousel from '../../../../src/carousel/VCarousel'
import VCarouselItem from '../../../../src/carousel/VCarouselItem'

export default {
    name: 'CarouselVertical',
    components: {
        'v-carousel': VCarousel,
        'v-carousel-item': VCarouselItem
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 16px;
}

.carousel-box {
    line-height: 200px;
    height: 200px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    background-color: #d0e6ff;
}
</style>
