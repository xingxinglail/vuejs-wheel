<template>
    <div></div>
</template>

<script>
export default {
    name: 'VTableColumn',
    props: {
        type: String,
        label: {
            type: String,
            default: ''
        },
        field: String,
        width: String,
        minWidth: String
    },
    created () {
        const { type, label, field, width, minWidth } = this
        const relaWidth = width !== undefined ? parseFloat(width) : undefined
        const data = {
            type,
            label,
            field,
            width,
            minWidth
        }
        if (relaWidth) data.relaWidth = relaWidth
        this.columnConfig = data
    },
    mounted () {
        const { $parent } = this
        const children = $parent.$refs.hiddenColumns.children
        const columnIndex = this.getColumnIndex(children)
        $parent.insertColumn(this.columnConfig, columnIndex)
    },
    methods: {
        getColumnIndex (children) {
            return [].indexOf.call(children, this.$el)
        }
    }
}
</script>
