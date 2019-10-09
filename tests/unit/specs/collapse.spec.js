import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM } from '../util'
import Collapse from '../../../src/collapse/VCollapse'

const expect = chai.expect
chai.use(sinonChai)

describe('CollapseItem', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可接收字符串value', (done) => {
        vm = createVue({
            template: `
                <v-collapse ref="collapse" v-model="active">
                    <v-collapse-item title="标题一" name="1">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                    <v-collapse-item title="标题二" name="2">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                    <v-collapse-item title="标题三" name="3">标题三的内容标题三的内容标题三的内容</v-collapse-item>
                </v-collapse>
            `,
            data: {
                active: '2'
            }
        }, true)
        setTimeout(() => {
            const collapse = vm.$refs.collapse
            expect(getComputedStyle(collapse.$children[1].$el.querySelector('.content')).display).to.be.equal('block')
            collapse.$children[2].$el.querySelector('.title').click()
            expect(vm.active).to.be.equal('3')
            vm.$nextTick(() => {
                expect(getComputedStyle(collapse.$children[2].$el.querySelector('.content')).display).to.be.equal('block')
                done()
            })
        }, 100)
    })

    it('可接收数组value', (done) => {
        vm = createVue({
            template: `
                <v-collapse ref="collapse" v-model="active">
                    <v-collapse-item title="标题一" name="1">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                    <v-collapse-item title="标题二" name="2">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                    <v-collapse-item title="标题三" name="3">标题三的内容标题三的内容标题三的内容</v-collapse-item>
                </v-collapse>
            `,
            data: {
                active: ['1', '2']
            }
        }, true)
        setTimeout(() => {
            const collapse = vm.$refs.collapse
            const children = collapse.$children
            expect(getComputedStyle(children[0].$el.querySelector('.content')).display).to.be.equal('block')
            expect(getComputedStyle(children[1].$el.querySelector('.content')).display).to.be.equal('block')
            expect(getComputedStyle(children[2].$el.querySelector('.content')).display).to.be.equal('none')
            collapse.$children[1].$el.querySelector('.title').click()
            expect(vm.active).to.deep.equal(['1'])
            vm.$nextTick(() => {
                expect(getComputedStyle(children[1].$el.querySelector('.content')).display).to.be.equal('none')
                done()
            })
        }, 100)
    })

    it('可接收数组accordion', (done) => {
        vm = createVue({
            template: `
                <v-collapse ref="collapse" v-model="active" accordion>
                    <v-collapse-item title="标题一" name="1">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                    <v-collapse-item title="标题二" name="2">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                    <v-collapse-item title="标题三" name="3">标题三的内容标题三的内容标题三的内容</v-collapse-item>
                </v-collapse>
            `,
            data: {
                active: '1'
            }
        }, true)
        setTimeout(() => {
            const collapse = vm.$refs.collapse
            const children = collapse.$children
            expect(getComputedStyle(children[0].$el.querySelector('.content')).display).to.be.equal('block')
            collapse.$children[1].$el.querySelector('.title').click()
            expect(vm.active).to.be.equal('2')
            vm.$nextTick(() => {
                expect(getComputedStyle(children[0].$el.querySelector('.content')).display).to.be.equal('none')
                expect(getComputedStyle(children[1].$el.querySelector('.content')).display).to.be.equal('block')
                expect(getComputedStyle(children[2].$el.querySelector('.content')).display).to.be.equal('none')
                done()
            })
        }, 100)
    })

    it('不设置value和name', (done) => {
        vm = createVue({
            template: `
                <v-collapse ref="collapse">
                    <v-collapse-item title="标题一">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                    <v-collapse-item title="标题二">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                    <v-collapse-item title="标题三">标题三的内容标题三的内容标题三的内容</v-collapse-item>
                </v-collapse>
            `
        }, true)
        setTimeout(() => {
            const collapse = vm.$refs.collapse
            const children = collapse.$children
            expect(getComputedStyle(children[0].$el.querySelector('.content')).display).to.be.equal('none')
            expect(getComputedStyle(children[1].$el.querySelector('.content')).display).to.be.equal('none')
            expect(getComputedStyle(children[2].$el.querySelector('.content')).display).to.be.equal('none')
            collapse.$children[1].$el.querySelector('.title').click()
            vm.$nextTick(() => {
                expect(getComputedStyle(children[0].$el.querySelector('.content')).display).to.be.equal('none')
                expect(getComputedStyle(children[1].$el.querySelector('.content')).display).to.be.equal('block')
                expect(getComputedStyle(children[2].$el.querySelector('.content')).display).to.be.equal('none')
                done()
            })
        }, 100)
    })

    it('可触发change事件', (done) => {
        const callback = sinon.fake();
        vm = createVue({
            template: `
                <v-collapse ref="collapse" v-model="active" @change="collapseChange">
                    <v-collapse-item title="标题一" name="1">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                    <v-collapse-item title="标题二" name="2">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                    <v-collapse-item title="标题三" name="3">标题三的内容标题三的内容标题三的内容</v-collapse-item>
                </v-collapse>
            `,
            data: {
                active: '1'
            },
            methods: {
                collapseChange (e) {
                    callback(e)
                }
            }
        }, true)
        setTimeout(() => {
            const collapse = vm.$refs.collapse
            const children = collapse.$children
            children[2].$el.querySelector('.title').click()
            expect(callback).to.have.been.calledWith('3')
            setTimeout(() => {
                expect(getComputedStyle(collapse.$children[0].$el.querySelector('.content')).display).to.be.equal('block')
                expect(getComputedStyle(collapse.$children[1].$el.querySelector('.content')).display).to.be.equal('none')
                expect(getComputedStyle(collapse.$children[2].$el.querySelector('.content')).display).to.be.equal('block')
                children[1].$el.querySelector('.title').click()
                expect(callback).to.have.been.calledWith('2')
                setTimeout(() => {
                    expect(getComputedStyle(collapse.$children[0].$el.querySelector('.content')).display).to.be.equal('block')
                    expect(getComputedStyle(collapse.$children[1].$el.querySelector('.content')).display).to.be.equal('block')
                    expect(getComputedStyle(collapse.$children[2].$el.querySelector('.content')).display).to.be.equal('block')
                    children[1].$el.querySelector('.title').click()
                    done()
                }, 100)
            }, 100)
        }, 100)
    })

    it('value 错误验证', () => {
        expect(Collapse.props.value.validator(1)).to.false
    })
})
