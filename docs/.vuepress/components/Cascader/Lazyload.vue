<template>
    <div class="container">
        <br />
        <v-cascader v-model="value" :props="props" :options="options" @change="handleChange"></v-cascader>
        <br />
    </div>
</template>

<script>
import VCascader from '../../../../src/cascader/VCascader'

export default {
    name: 'CascaderLazyload',
    data () {
        let id = 0
        return {
            value: [],
            options: [
                {
                    value: 'zhinan',
                    label: '指南',
                    leaf: false
                },
                {
                    value: 'zujian',
                    label: '组件',
                    leaf: false
                },
                {
                    value: 'ziyuan',
                    label: '资源',
                    leaf: false
                }
            ],
            props: {
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level } = node
                    setTimeout(() => {
                        const nodes = Array.from({ length: level + 1 })
                            .map(() => {
                                return {
                                    value: ++id,
                                    label: `选项${id}`,
                                    leaf: id > 3
                                }
                            })
                        resolve(nodes)
                    }, 1000)
                }
            }
        }
    },
    methods: {
        handleChange (val) {
            console.log(val)
        }
    },
    components: {
        'v-cascader': VCascader
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    z-index: 4;
}
</style>
