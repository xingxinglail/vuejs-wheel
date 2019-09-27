<template>
    <div class="v-table"
         ref="tableWrapper"
         :class="{ 'v-table-bordered': bordered }">
        <div class="hidden-columns" ref="hiddenColumns"><slot /></div>
        <div class="v-table-header" ref="headerWrapper">
            <table :style="{ width: maxWidth }">
                <colgroup>
                    <col v-for="item in columns"
                         :key="item.field"
                         :style="{ width: item.realWidth + 'px' }" />
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="item in columns"
                            :key="item.field"
                            class="v-table-col"
                            :class="{ 'column-center': item.align === 'center', 'column-right': item.align === 'right' }">
                            <div class="v-table-column"
                                 v-if="item.type === 'selection'">
                                <input class="checkbox"
                                       :class="{ disabled: data.length === 0 }"
                                       type="checkbox"
                                       ref="checkboxes"
                                       :checked="allChecked"
                                       :disabled="data.length === 0"
                                       @click="onSelectAll"
                                       @change="onAllCheckedChange">
                            </div>
                            <div class="v-table-column"
                                 v-else
                                 :class="{ 'v-table-column-has-sorters': item.field in innerSorter }"
                                 @click="onTableColumnClick(item)">
                                <span>{{ item.label }}</span>
                                <div class="v-table-column-sorters"
                                     :class="{ [sortRule.ascend]: innerSorter[item.field] === sortRule.ascend, [sortRule.descend]: innerSorter[item.field] === sortRule.descend }">
                                    <v-icon name="caret-up" />
                                    <v-icon name="caret-down" />
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="v-table-body" ref="bodyWrapper" :style="{ height: parseFloat(height) + 'px' }">
            <table :style="{ width: maxWidth }">
                <colgroup>
                    <col v-for="item in columns"
                         :key="item.field"
                         :style="{ width: item.realWidth + 'px' }" />
                </colgroup>
                <tbody ref="tbody">
                    <tr class="v-table-row"
                        v-for="(row, index) in data"
                        :key="row[rowKey]"
                        ref="bodyRows"
                        :class="{ 'v-table-row-expanded': row.$expand }">
                        <td v-for="col in columns" :key="col.field" class="v-table-col" :class="{ 'column-center': col.align === 'center', 'column-right': col.align === 'right' }">
                            <template v-if="col.type === 'selection'">
                                <div class="v-table-column">
                                    <input class="checkbox"
                                           type="checkbox"
                                           :checked="selection.selectedKeys.indexOf(row[rowKey]) >= 0"
                                           @click="onSelect(row, row[rowKey], $event)"
                                           @change="onCheckboxChange(row, row[rowKey], $event)">
                                </div>
                            </template>
                            <template v-if="col.type === 'expand'">
                                <div class="v-table-column v-table-column-expand"
                                     :class="{ 'expand-icon': row.$expand }"
                                     @click="toggleExpandRow(row, col, index)">
                                    <v-icon class="v-table-expand-icon" name="right" />
                                </div>
                            </template>
                            <template v-else>
                                <div class="v-table-column" v-if="col.render">
                                    <vnodes :vnodes="col.render({ $index: index, column: col, row })" />
                                </div>
                                <div class="v-table-column">
                                    {{ row[col.field] }}
                                </div>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <transition name="fade">
            <div v-if="loading" class="v-table-loading">
                <v-icon name="loading" />
                加载中...
            </div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'
import { deepClone } from '../helper'
import Icon from '../icon/VIcon'

const sortRule = {
    ascend: 'ascend',
    descend: 'descend',
    default: false
}

export default {
    name: 'VTable',
    props: {
        height: {
            type: String
        },
        data: {
            type: Array,
            default () {
                return []
            }
        },
        sorter: {
            type: Object,
            default () {
                return Object.create(null)
            }
        },
        rowKey: {
            type: String,
            default: 'key'
        },
        bordered: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        selection: {
            type: Object,
            default () {
                return {
                    selectedKeys: []
                }
            }
        },
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        expandRowKeys: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            columns: [],
            innerSorter: Object.create(null),
            sortRule,
            allChecked: false,
            maxWidth: null
        }
    },
    beforeCreate () {
        this._sizeData = {
            minWidth: 80,
            minTableWidth: 0,
            maxColumnWidth: 0, // 带有width属性的总列宽
            hasWidthColumnCount: 0 // 带有width属性的总列数
        }
    },
    mounted () {
        const { tableWrapper, headerWrapper, bodyWrapper } = this.$refs
        this._tableWrapper = tableWrapper
        this._headerWrapper = headerWrapper
        this._bodyWrapper = bodyWrapper
        this.$nextTick(() => {
            this._checkboxes = this.$refs.checkboxes
        })
        window.addEventListener('resize', this.onResizeHandle)
        headerWrapper.addEventListener('scroll', this.onHeaderWrapperScrollHandle)
        bodyWrapper.addEventListener('scroll', this.onBodyWrapperScrollHandle)
        if (this.expandRowKeys.length > 0) {
            this.expandByRowKeys()
        } else {
            this.expandAll()
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.onResizeHandle)
        const { _headerWrapper, _bodyWrapper } = this
        if (_headerWrapper) _headerWrapper.removeEventListener('scroll', this.onHeaderWrapperScrollHandle)
        if (_bodyWrapper) _bodyWrapper.removeEventListener('scroll', this.onBodyWrapperScrollHandle)
    },
    methods: {
        expandAll () {
            if (!this.defaultExpandAll) return
            this.$nextTick(() => {
                this.data.forEach((row, rowIndex) => {
                    this.columns.forEach((col) => {
                        if (col.type === 'expand') {
                            this.toggleExpandRow(row, col, rowIndex, true)
                        }
                    })
                })
            })
        },
        expandByRowKeys () {
            this.$nextTick(() => {
                const { columns, rowKey, expandRowKeys } = this
                this.data.forEach((row, rowIndex) => {
                    columns.forEach((col) => {
                        if (col.type === 'expand') {
                            if (expandRowKeys.indexOf(row[rowKey]) >= 0) {
                                this.toggleExpandRow(row, col, rowIndex, true)
                            } else {
                                this.closeExpandRow(row)
                            }
                        }
                    })
                })
            })
        },
        onSelect (row, key, e) {
            this.onCheckboxChange(row, key, e, true)
        },
        onCheckboxChange (row, key, e, select) {
            const { checked } = e.target
            const { data, rowKey, _innerSelectedKeys } = this
            if (select) {
                if (checked) {
                    _innerSelectedKeys.push(key)
                } else {
                    const index = _innerSelectedKeys.indexOf(key)
                    if (index >= 0) _innerSelectedKeys.splice(index, 1)
                }
                const rows = []
                _innerSelectedKeys.forEach(key => {
                    const row = data.find(c => c[rowKey] === key)
                    if (row) rows.push(row)
                })
                this.$emit('select', row, checked, rows, e)
            } else {
                const rows = []
                _innerSelectedKeys.forEach(key => {
                    const row = data.find(c => c[rowKey] === key)
                    if (row) rows.push(row)
                })
                this.$emit('selection-change', _innerSelectedKeys, rows)
            }
        },
        onSelectAll (e) {
            this.onAllCheckedChange(e, true)
        },
        onAllCheckedChange ({ target }, select) {
            const checked = target.checked
            this.allChecked = checked
            const { data, rowKey } = this
            let keys = []
            let _data = []
            if (checked) {
                keys = data.map(c => c[rowKey])
                _data = data
            }
            this.$emit('selection-change', keys, _data)
            if (select) this.$emit('select-all', checked, _data)
        },
        onTableColumnClick ({ field }) {
            const { innerSorter } = this
            if (field in innerSorter) {
                let order
                switch (innerSorter[field]) {
                    case sortRule.ascend:
                        order = sortRule.descend
                        break
                    case sortRule.descend:
                        order = sortRule.default
                        break
                    default:
                        order = sortRule.ascend
                        break
                }
                innerSorter[field] = order
                this.$emit('sort-change', { field, order })
                for (let k in innerSorter) {
                    if (k !== field) {
                        innerSorter[k] = false
                    }
                }
            }
        },
        checkAllCheckedState (data, keys) {
            if (!this._checkboxes) return
            let indeterminate = false
            this.allChecked = false
            if (data.length > 0 && keys.length > 0) {
                const keyLen = keys.length
                if (keyLen === data.length) { // 判断是否全选
                    let allChecked = true
                    const { rowKey } = this
                    for (let i = 0; i < keyLen; i++) {
                        allChecked = data.some(c => keys[i] === c[rowKey])
                        if (!allChecked) break
                    }
                    this.allChecked = allChecked
                } else {
                    indeterminate = true
                }
            }
            this._checkboxes.forEach(checkbox => {
                checkbox.indeterminate = indeterminate
            })
        },
        onHeaderWrapperScrollHandle ({ target }) {
            this._bodyWrapper.scrollLeft = target.scrollLeft
        },
        onBodyWrapperScrollHandle ({ target }) {
            this._headerWrapper.scrollLeft = target.scrollLeft
        },
        onResizeHandle () {
            this.calcColumnsWidth()
        },
        calcColumnsWidth () {
            const { columns, _tableWrapper, _sizeData } = this
            let maxWidth = _tableWrapper.offsetWidth
            const surplusMeanWidth = maxWidth - _sizeData.maxColumnWidth // 可分配的最大宽度
            const surplusColumnsCount = columns.length - _sizeData.hasWidthColumnCount // 没有width属性的列个数
            const realWidth = Math.floor(surplusMeanWidth / surplusColumnsCount) // 实际宽度平均值
            // 平均值除不尽，如要把小数抹平，剩余宽度补在最后一列
            const lastColumnWidth = surplusMeanWidth - realWidth * surplusColumnsCount
            maxWidth = 0
            for (let i = 0; i < columns.length; i++) {
                const { width, minWidth } = columns[i]
                if (width === undefined) {
                    let mWidth = _sizeData.minWidth
                    if (minWidth) mWidth = parseFloat(minWidth)
                    const data = columns[i]
                    data.realWidth = realWidth < mWidth ? mWidth : realWidth
                    if (i === columns.length - 1) data.realWidth += lastColumnWidth
                    this.$set(columns, i, data)
                }
                maxWidth += columns[i].realWidth
            }
            this.maxWidth = `${maxWidth}px`
        },
        insertColumn (data, scopedSlots, index) {
            if (scopedSlots.default) data.render = scopedSlots.default
            this.columns.splice(index, 0, data)
            const { _sizeData } = this
            if (data.realWidth) {
                _sizeData.maxColumnWidth += data.realWidth
                _sizeData.hasWidthColumnCount += 1
            }
            _sizeData.minTableWidth = _sizeData.maxColumnWidth + ((this.columns.length - _sizeData.hasWidthColumnCount) * _sizeData.minWidth)
            this.$nextTick(this.calcColumnsWidth)
        },
        toggleExpandRow (row, col, rowIndex, isExpand) {
            const { bodyRows, tbody } = this.$refs
            isExpand = isExpand !== undefined ? isExpand : !row.$expand
            this.$set(row, '$expand', isExpand)
            if (row.$expandDom) {
                row.$expandDom.style.display = isExpand ? '' : 'none'
            } else {
                const vm = new Vue({
                    functional: true,
                    render: createElement => {
                        return createElement(
                            'tr',
                            [
                                createElement(
                                    'td',
                                    {
                                        class: ['v-table-expand-cell'],
                                        attrs: {
                                            colspan: this.columns.length
                                        }
                                    },
                                    col.render({ $index: rowIndex, column: col, row })
                                )
                            ]
                        )
                    }
                }).$mount()
                const trDom = vm.$el
                row.$expandDom = trDom
                if (rowIndex + 1 === bodyRows.length) {
                    tbody.appendChild(trDom)
                } else {
                    tbody.insertBefore(trDom, bodyRows[rowIndex + 1])
                }
            }
        },
        closeExpandRow (row) {
            if (row.$expand && row.$expandDom) {
                this.$set(row, '$expand', false)
                row.$expandDom.style.display = 'none'
            }
        }
    },
    watch: {
        expandRowKeys () {
            this.expandByRowKeys()
        },
        sorter: {
            deep: true,
            immediate: true,
            handler (v) {
                const innerSorter = deepClone(v)
                for (let k in innerSorter) {
                    if (innerSorter[k]) {
                        this.$emit('sort-change', { field: k, order: innerSorter[k] })
                        break
                    }
                }
                this.innerSorter = innerSorter
            }
        },
        'selection.selectedKeys': {
            immediate: true,
            handler (v) {
                this._innerSelectedKeys = Array.isArray(v) ? [...v] : []
                setTimeout(() => {
                    this.checkAllCheckedState(this.data, v)
                }, 50)
            }
        },
        data (v) {
            this.$nextTick(() => {
                this.checkAllCheckedState(v, this._innerSelectedKeys)
            })
        }
    },
    components: {
        'v-icon': Icon,
        Vnodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../var';

.v-table {
    position: relative;

    .v-table-body, .v-table-header {
        overflow: auto;

        &.v-table-body {

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 1px;
                background-color: #e8e8e8;
            }

            .v-table-row {
                border-top: 1px solid #e8e8e8;
            }

            .v-table-row-expanded {
                border-bottom: 1px solid #e8e8e8;
            }

            /deep/ .v-table-expand-cell {
                padding: 20px 50px;
            }
        }

        &.v-table-header {
            border-bottom: 1px solid #e8e8e8;
            margin-bottom: -1px;

            &::-webkit-scrollbar {
                display: none;
                width: 0;
                height: 0;
            }
        }
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
        font-size: $font-size;
        color: #606266;

        .v-table-column {
            display: flex;
            align-items: center;
            padding: 0 10px;

            .v-table-column-sorters {
                display: none;
            }

            &.v-table-column-has-sorters {
                cursor: pointer;
                transition: background-color .3s;
                user-select: none;

                &:hover {
                    background-color: #f5f5f5;
                }

                .v-table-column-sorters {
                    display: flex;
                    flex-direction: column;
                    padding-left: 8px;

                    .v-icon {
                        width: 8px;
                        height: 9px;
                        position: relative;
                        color: #bfbfbf;

                        &:first-child {
                            bottom: -1px;
                        }

                        &:last-child {
                            top: -1px;
                        }
                    }

                    &.ascend {

                        .v-icon:first-child {
                            color: #409eff;
                        }
                    }

                    &.descend {

                        .v-icon:last-child {
                            color: #409eff;
                        }
                    }
                }
            }

            .checkbox {
                font-size: 16px;
                cursor: pointer;

                &.disabled {
                    cursor: not-allowed;
                }
            }

            &.v-table-column-expand {
                cursor: pointer;
                padding: 6px;

                .v-table-expand-icon {
                    color: #666;
                    width: 10px;
                    height: 10px;
                    transition: transform .3s;
                }

                &.expand-icon .v-table-expand-icon {
                    transform: rotate(90deg);
                }
            }
        }

        th, td {
            padding: 12px 0;
        }

        tbody tr {
            transition: background-color .3s;

            &:hover {
                background-color: #f5f7fa;
            }
        }

        th.column-center, td.column-center {

            .v-table-column {
                justify-content: center;
            }
        }

        th.column-right, td.column-right {

            .v-table-column {
                justify-content: flex-end;
            }
        }
    }

    &.v-table-bordered {
        position: relative;
        border-top: 1px solid #e8e8e8;

        .v-table-col:not(:last-child) {
            border-right: 1px solid #e8e8e8;
        }

        &::before, &::after {
            content: '';
            position: absolute;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: #e8e8e8;
        }

        &::before {
            left: 0;
        }

        &::after {
            right: 0;
        }
    }

    .v-table-loading {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        color: #888;
        background-color: rgba(255, 255, 255, 0.8);

        .v-icon {
            font-size: 20px;
            margin-right: 4px;
            animation: spin 2s infinite linear;
        }
    }

    .fade-enter-active {
        animation: fade-in .2s ease;
    }

    .fade-leave-active {
        animation: fade-out .2s ease;
    }
}
</style>
