import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM } from '../util'

const expect = chai.expect
chai.use(sinonChai)

describe('Carousel', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置activeName', done => {
        vm = createVue({
            template: `
                <v-carousel :autoplay="false" active-name="second">
                    <v-carousel-item name="first">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="second">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="third">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                </v-carousel>
            `
        }, true)
        const items = vm.$el.querySelectorAll('.v-carousel-item')
        vm.$nextTick(() => {
            expect(getComputedStyle(items[0]).display).to.eq('none')
            expect(getComputedStyle(items[1]).display).to.eq('block')
            expect(getComputedStyle(items[2]).display).to.eq('none')
            done()
        })
    })

    it('可以自动轮播', done => {
        vm = createVue({
            template: `
                <v-carousel :active-name.sync="activeName" :interval="100">
                    <v-carousel-item name="first">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="second">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="third">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                </v-carousel>
            `,
            data: {
                activeName: 'second'
            }
        }, true)
        setTimeout(() => {
            expect(vm.$data.activeName).to.eq('third')
            setTimeout(() => {
                expect(vm.$data.activeName).to.eq('first')
                done()
            }, 100)
        }, 100)
    })

    it('可以设置竖向轮播', done => {
        vm = createVue({
            template: `
                <v-carousel :autoplay="false" direction="vertical">
                    <v-carousel-item name="first">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="second">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="third">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                </v-carousel>
            `,
            data: {
                activeName: 'second'
            }
        }, true)
        vm.$nextTick(() => {
            expect(vm.$el.classList.contains('v-carousel-vertical')).to.eq(true)
            done()
        }, 100)
    })

    it('可以点击按钮左右轮播', done => {
        vm = createVue({
            template: `
                <v-carousel :autoplay="false">
                    <v-carousel-item name="first">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="second">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="third">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                </v-carousel>
            `
        }, true)
        vm.$nextTick(() => {
            const prevBtn = vm.$el.querySelector('.v-carousel-dot-prev')
            const nextBtn = vm.$el.querySelector('.v-carousel-dot-next')
            prevBtn.click()
            setTimeout(() => {
                const items = vm.$el.querySelectorAll('.v-carousel-item')
                expect(getComputedStyle(items[0]).display).to.eq('none')
                expect(getComputedStyle(items[1]).display).to.eq('none')
                expect(getComputedStyle(items[2]).display).to.eq('block')
                prevBtn.click()
                nextBtn.click()
                setTimeout(() => {
                    const items = vm.$el.querySelectorAll('.v-carousel-item')
                    expect(getComputedStyle(items[0]).display).to.eq('none')
                    expect(getComputedStyle(items[1]).display).to.eq('none')
                    expect(getComputedStyle(items[2]).display).to.eq('block')
                    done()
                }, 600)
            }, 600)
        })
    })

    it('可以触发change事件', done => {
        const cb = sinon.fake()
        vm = createVue({
            template: `
                <v-carousel active-name="second" :interval="100" @change="onCarouselChange">
                    <v-carousel-item name="first">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="second">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                    <v-carousel-item name="third">
                        <div class="carousel-box"></div>
                    </v-carousel-item>
                </v-carousel>
            `,
            methods: {
                onCarouselChange (val) {
                    cb(val)
                }
            }
        }, true)
        setTimeout(() => {
            expect(cb).to.have.been.calledWith(2)
            done()
        }, 150)
    })
})
