import Vue from 'vue'
import VCollapse from '../src/VCollapse'
import VCollapseItem from '../src/VCollapseItem'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VCollapseItem', () => {

    it('存在.', () => {
        expect(VCollapse).to.be.exist
        expect(VCollapseItem).to.be.exist
    })

    it('可接收字符串value', (done) => {
        Vue.component('v-collapse', VCollapse)
        Vue.component('v-collapse-item', VCollapseItem)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-collapse ref="collapse" v-model="active">
                <v-collapse-item title="标题一" name="1">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                <v-collapse-item title="标题二" name="2">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                <v-collapse-item title="标题三" name="3">标题三的内容标题三的内容标题三的内容</v-collapse-item>
            </v-collapse>
        `
        const vm = new Vue({
            el: div,
            data: {
                active: '2'
            }
        })
        setTimeout(() => {
            const collapse = vm.$refs.collapse
            expect(getComputedStyle(collapse.$children[1].$el.querySelector('.content')).display).to.be.equal('block')
            collapse.$children[2].$el.querySelector('.title').click()
            expect(vm.active).to.be.equal('3')
            vm.$nextTick(() => {
                expect(getComputedStyle(collapse.$children[2].$el.querySelector('.content')).display).to.be.equal('block')
                vm.$destroy()
                done()
            })
        }, 100)
    })

    it('可接收数组value', (done) => {
        Vue.component('v-collapse', VCollapse)
        Vue.component('v-collapse-item', VCollapseItem)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-collapse ref="collapse" v-model="active">
                <v-collapse-item title="标题一" name="1">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                <v-collapse-item title="标题二" name="2">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                <v-collapse-item title="标题三" name="3">标题三的内容标题三的内容标题三的内容</v-collapse-item>
            </v-collapse>
        `
        const vm = new Vue({
            el: div,
            data: {
                active: ['1', '2']
            }
        })
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
                vm.$destroy()
                done()
            })
        }, 100)
    })

    it('可接收数组accordion', (done) => {
        Vue.component('v-collapse', VCollapse)
        Vue.component('v-collapse-item', VCollapseItem)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-collapse ref="collapse" v-model="active" accordion>
                <v-collapse-item title="标题一" name="1">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                <v-collapse-item title="标题二" name="2">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                <v-collapse-item title="标题三" name="3">标题三的内容标题三的内容标题三的内容</v-collapse-item>
            </v-collapse>
        `
        const vm = new Vue({
            el: div,
            data: {
                active: '1'
            }
        })
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
                vm.$destroy()
                done()
            })
        }, 100)
    })

    it('不设置value和name', (done) => {
        Vue.component('v-collapse', VCollapse)
        Vue.component('v-collapse-item', VCollapseItem)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-collapse ref="collapse">
                <v-collapse-item title="标题一">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                <v-collapse-item title="标题二">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                <v-collapse-item title="标题三">标题三的内容标题三的内容标题三的内容</v-collapse-item>
            </v-collapse>
        `
        const vm = new Vue({
            el: div
        })
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
                vm.$destroy()
                done()
            })
        }, 100)
    })

    it('可触发change事件', (done) => {
        Vue.component('v-collapse', VCollapse)
        Vue.component('v-collapse-item', VCollapseItem)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-collapse ref="collapse" v-model="active" @change="collapseChange">
                <v-collapse-item title="标题一" name="1">标题一的内容标题一的内容标题一的内容</v-collapse-item>
                <v-collapse-item title="标题二" name="2">标题二的内容标题二的内容标题二的内容</v-collapse-item>
                <v-collapse-item title="标题三" name="3">标题三的内容标题三的内容标题三的内容</v-collapse-item>
            </v-collapse>
        `
        const callback = sinon.fake();
        const vm = new Vue({
            el: div,
            data: {
                active: '1'
            },
            methods: {
                collapseChange (e) {
                    callback(e)
                }
            }
        })
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
                    vm.$destroy()
                    done()
                }, 100)
            }, 100)
        }, 100)
    })
})
