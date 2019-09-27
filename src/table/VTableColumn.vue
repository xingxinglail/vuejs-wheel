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
        minWidth: String,
        fixed: {
            type: [Boolean, String],
            default: false,
            validator (value) {
                return [true, false].includes(value) || ['left', 'right'].includes(value)
            }
        }
    },
    created () {
        const { type, label, field, width, minWidth, align, fixed } = this
        const data = {
            type,
            label,
            field,
            width,
            minWidth,
            align,
            fixed
        }
        if (type === 'selection' || type === 'expand') {
            if (!align) data.align = 'center'
            if (!width && !minWidth) data.width = 50
        }
        const realWidth = data.width !== undefined ? parseFloat(data.width) : undefined
        if (realWidth) data.realWidth = realWidth
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
