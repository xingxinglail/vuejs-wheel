<template>
    <div>
        <br>
        <v-collapse accordion>
            <v-collapse-item title="一致性 Consistency">
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </v-collapse-item>
            <v-collapse-item title="反馈 Feedback">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </v-collapse-item>
            <v-collapse-item title="效率 Efficiency">
                <p>简化流程：设计简洁直观的操作流程；</p>
                <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</p>
                <p>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</p>
            </v-collapse-item>
        </v-collapse>
    </div>
</template>

<script>
import VCollapse from '../../../../src/collapse/VCollapse'
import VCollapseItem from '../../../../src/collapse/VCollapseItem'

export default {
    name: 'CollapseBasis',
    components: {
        'v-collapse': VCollapse,
        'v-collapse-item': VCollapseItem
    }
}
</script>

<style lang="scss" scoped>

</style>
