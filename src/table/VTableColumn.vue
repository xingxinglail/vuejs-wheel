<template>
    <div></div>
</template>

<script>
export default {
    name: 'VTableColumn',
    props: {
        type: String,
        align: String,
        label: {
            type: String,
            default: ''
        },
        field: String,
        width: String,
        minWidth: String
    },
    created () {
        const { type, label, field, width, minWidth, align } = this
        const relaWidth = width !== undefined ? parseFloat(width) : undefined
        const data = {
            type,
            label,
            field,
            width,
            minWidth,
            align
        }
        if (type === 'selection' || type === 'expand') {
            if (!align) data.align = 'center'
            if (!width && !minWidth) data.width = 50
        }
        if (relaWidth) data.relaWidth = relaWidth
        this.columnConfig = data
    },
    mounted () {
        const { $parent } = this
        const children = $parent.$refs.hiddenColumns.children
        const columnIndex = this.getColumnIndex(children)
        $parent.insertColumn(this.columnConfig, this.$scopedSlots, columnIndex)
    },
    methods: {
        getColumnIndex (children) {
            return [].indexOf.call(children, this.$el)
        }
    }
}
</script>
