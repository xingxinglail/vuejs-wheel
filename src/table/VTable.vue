<template>
    <div class="v-table"
         ref="tableWrapper"
         :class="{ 'v-table-bordered': bordered, 'v-table-stripe': stripe }">
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
                                       :class="{ disabled: innerData.length === 0 }"
                                       type="checkbox"
                                       ref="checkboxes"
                                       :checked="allChecked"
                                       :disabled="innerData.length === 0"
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
        <div class="v-table-body"
             ref="bodyWrapper"
             :class="scrollingClassName"
             :style="{ height: parseFloat(height) + 'px' }">
            <table :style="{ width: maxWidth }">
                <colgroup>
                    <col v-for="item in columns"
                         :key="item.field"
                         :style="{ width: item.realWidth + 'px' }" />
                </colgroup>
                <tbody ref="tbody">
                    <tr class="v-table-row"
                        v-for="(row, index) in innerData"
                        :key="row[rowKey]"
                        ref="bodyRows"
                        :class="{ 'v-table-row-expanded': row.$expand, striped: stripe && index % 2 === 1, 'hover-row': row.isHover }"
                        @mouseenter="onMouseenterRow(row)"
                        @mouseleave="onMouseleaveRow(row)">
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
                                    <vnodes :vnodes="col.render({ $index: index, column: col, row: data[index] })" />
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
        <div class="v-table-fixed"
             v-if="fixedLeftCount > 0"
             :style="{ width: fixedLeftWidth + 'px' }">
            <div class="v-table-header"
                 ref="fixedHeaderWrapper">
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
                                       :class="{ disabled: innerData.length === 0 }"
                                       type="checkbox"
                                       ref="checkboxes"
                                       :checked="allChecked"
                                       :disabled="innerData.length === 0"
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
            <div class="v-table-body"
                 ref="fixedBodyWrapper"
                 :style="{ height: parseFloat(height) + 'px' }">
                <table :style="{ width: maxWidth }">
                    <colgroup>
                        <col v-for="item in columns"
                             :key="item.field"
                             :style="{ width: item.realWidth + 'px' }" />
                    </colgroup>
                    <tbody>
                        <tr class="v-table-row"
                            ref="fixedRows"
                            v-for="(row, index) in innerData"
                            :key="row[rowKey]"
                            :class="{ 'v-table-row-expanded': row.$expand, striped: stripe && index % 2 === 1, 'hover-row': row.isHover }"
                            @mouseenter="onMouseenterRow(row)"
                            @mouseleave="onMouseleaveRow(row)">
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
        </div>
        <div class="v-table-fixed v-table-fixed-right"
             v-if="fixedRightCount > 0"
             :style="{ width: fixedRightWidth + 'px' }">
            <div class="v-table-header v-table-header-fixed v-table-header-fixed-right"
                 ref="fixedRightHeaderWrapper"
                 :style="{ height: fixedHeaderHeight + 'px' }">
                <div class="inner-wrapper">
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
                                               :class="{ disabled: innerData.length === 0 }"
                                               type="checkbox"
                                               ref="checkboxes"
                                               :checked="allChecked"
                                               :disabled="innerData.length === 0"
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
            </div>
            <div class="v-table-body v-table-body-fixed v-table-body-fixed-right"
                 ref="fixedRightBodyWrapper"
                 :style="{ height: parseFloat(height) + 'px', top: fixedHeaderHeight + 'px' }">
                <div class="inner-wrapper">
                    <table :style="{ width: maxWidth }">
                        <colgroup>
                            <col v-for="item in columns"
                                 :key="item.field"
                                 :style="{ width: item.realWidth + 'px' }" />
                        </colgroup>
                        <tbody>
                            <tr class="v-table-row"
                                ref="fixedRightRows"
                                v-for="(row, index) in innerData"
                                :key="row[rowKey]"
                                :class="{ 'v-table-row-expanded': row.$expand, striped: stripe && index % 2 === 1, 'hover-row': row.isHover }"
                                @mouseenter="onMouseenterRow(row)"
                                @mouseleave="onMouseleaveRow(row)">
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
            </div>
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
        stripe: {
            type: Boolean,
            default: false
        },
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
            innerData: Object.create(null),
            columns: [],
            innerSorter: Object.create(null),
            sortRule,
            allChecked: false,
            maxWidth: null,
            fixedLeftCount: 0,
            fixedRightCount: 0,
            fixedHeaderHeight: 45,
            fixedBodyHeight: 300,
            scrollingClassName: 'is-scrolling-none'
        }
    },
    computed: {
        fixedLeftWidth ({ columns, fixedLeftCount }) {
            if (fixedLeftCount > 0) {
                const fixedColumns = columns.filter(col => col.fixed === true || col.fixed === 'left')
                let width = 0
                fixedColumns.forEach(col => {
                    width += col.realWidth
                })
                return width
            } else {
                return 0
            }
        },
        fixedRightWidth ({ columns, fixedRightCount }) {
            if (fixedRightCount > 0) {
                const fixedColumns = columns.filter(col => col.fixed === 'right')
                let width = 0
                fixedColumns.forEach(col => {
                    width += col.realWidth
                })
                return width
            } else {
                return 0
            }
        }
    },
    beforeCreate () {
        this._maxScrollY = 0
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
            const { checkboxes, fixedBodyWrapper, fixedRightBodyWrapper } = this.$refs
            this._checkboxes = checkboxes
            this._fixedBodyWrapper = fixedBodyWrapper
            this._fixedRightBodyWrapper = fixedRightBodyWrapper
        })
        setTimeout(this.onBodyWrapperScrollHandle, 0, { target: bodyWrapper })
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
    updated () {
        // 表格内容变化，重新计算高度
        if (this.fixedLeftCount > 0 || this.fixedRightCount > 0) {
            const { _tableWrapper, _headerWrapper, _bodyWrapper } = this
            const headerHeight = _headerWrapper.offsetHeight
            const containerHeight = _tableWrapper.offsetHeight
            this.fixedHeaderHeight = headerHeight
            this.fixedBodyHeight = containerHeight - headerHeight
            this._maxScrollY = _bodyWrapper.children[0].offsetWidth - _bodyWrapper.offsetWidth
        }
    },
    methods: {
        expandAll () {
            if (!this.defaultExpandAll) return
            this.$nextTick(() => {
                this.innerData.forEach((row, rowIndex) => {
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
                this.innerData.forEach((row, rowIndex) => {
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
            const { innerData, rowKey, _innerSelectedKeys } = this
            if (select) {
                if (checked) {
                    _innerSelectedKeys.push(key)
                } else {
                    const index = _innerSelectedKeys.indexOf(key)
                    if (index >= 0) _innerSelectedKeys.splice(index, 1)
                }
                const rows = []
                _innerSelectedKeys.forEach(key => {
                    const row = innerData.find(c => c[rowKey] === key)
                    if (row) rows.push(row)
                })
                this.$emit('select', row, checked, rows, e)
            } else {
                const rows = []
                _innerSelectedKeys.forEach(key => {
                    const row = innerData.find(c => c[rowKey] === key)
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
            const { innerData, rowKey } = this
            let keys = []
            let _data = []
            if (checked) {
                keys = innerData.map(c => c[rowKey])
                _data = innerData
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
            const { scrollLeft } = target
            this._headerWrapper.scrollLeft = scrollLeft
            if (this.fixedLeftCount > 0) this._fixedBodyWrapper.scrollTop = target.scrollTop
            if (this.fixedRightCount > 0) this._fixedRightBodyWrapper.scrollTop = target.scrollTop
            const { _maxScrollY } = this
            let className = 'is-scrolling-none'
            if (_maxScrollY > 0) {
                if (scrollLeft === 0) {
                    className = 'is-scrolling-left'
                } else if (scrollLeft === _maxScrollY) {
                    className = 'is-scrolling-right'
                } else if (scrollLeft > 0 && scrollLeft < _maxScrollY) {
                    className = 'is-scrolling-center'
                }
            }
            this.scrollingClassName = className
        },
        onResizeHandle () {
            this.calcColumnsWidth()
            this.$nextTick(() => {
                const { _bodyWrapper } = this
                this._maxScrollY = _bodyWrapper.children[0].offsetWidth - _bodyWrapper.offsetWidth
                this.onBodyWrapperScrollHandle({ target: _bodyWrapper })
            })
        },
        calcColumnsWidth () {
            const { columns, _tableWrapper, _sizeData } = this
            let maxWidth = _tableWrapper.offsetWidth
            const columnLen = columns.length
            const surplusMeanWidth = maxWidth - _sizeData.maxColumnWidth // 可分配的最大宽度
            const surplusColumnsCount = columnLen - _sizeData.hasWidthColumnCount // 没有width属性的列个数
            const realWidth = Math.floor(surplusMeanWidth / surplusColumnsCount) // 实际宽度平均值
            // 平均值除不尽，如要把小数抹平，剩余宽度补在最后一列
            const lastColumnWidth = surplusMeanWidth - realWidth * surplusColumnsCount
            maxWidth = 0
            for (let i = 0; i < columnLen; i++) {
                const { width, minWidth } = columns[i]
                if (width === undefined) {
                    let mWidth = _sizeData.minWidth
                    if (minWidth) mWidth = parseFloat(minWidth)
                    const data = columns[i]
                    data.realWidth = realWidth < mWidth ? mWidth : realWidth
                    this.$set(columns, i, data)
                }
                maxWidth += columns[i].realWidth
            }
            if (lastColumnWidth > 0) {
                // 找到最后一个没有设置width的列补全宽度
                let minWidthLastIndex = -1
                for (let i = columnLen - 1; i >= 0; i--) {
                    const { width, minWidth } = columns[i]
                    if (minWidth) {
                        minWidthLastIndex = i
                    }
                    if (width === undefined && !minWidth) {
                        minWidthLastIndex = -1
                        columns[i].realWidth += lastColumnWidth
                        break
                    }
                }
                // 如果没有找到就找最后一个带有minWidth的列补全宽度
                if (minWidthLastIndex !== -1) {
                    columns[minWidthLastIndex].realWidth += lastColumnWidth
                }
                maxWidth += lastColumnWidth
            }
            this.maxWidth = `${maxWidth}px`
        },
        insertColumn (data, scopedSlots, index) {
            const { columns } = this
            if (scopedSlots.default) data.render = scopedSlots.default
            if (data.fixed) {
                if (data.fixed === 'right') {
                    columns.push(data)
                    this.fixedRightCount += 1
                } else {
                    columns.splice(this.fixedLeftCount, 0, data)
                    this.fixedLeftCount += 1
                }
            } else {
                columns.splice(index - this.fixedRightCount, 0, data)
            }
            const { _sizeData } = this
            if (data.realWidth) {
                _sizeData.maxColumnWidth += data.realWidth
                _sizeData.hasWidthColumnCount += 1
            }
            _sizeData.minTableWidth = _sizeData.maxColumnWidth + ((columns.length - _sizeData.hasWidthColumnCount) * _sizeData.minWidth)
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
                                    col.render({ $index: rowIndex, column: col, row: this.data[rowIndex] })
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
        },
        onMouseenterRow (row) {
            this.$set(row, 'isHover', true)
        },
        onMouseleaveRow (row) {
            this.$set(row, 'isHover', false)
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
                    this.checkAllCheckedState(this.innerData, v)
                }, 50)
            }
        },
        data: {
            immediate: true,
            handler (v) {
                this.innerData = deepClone(v)
                this.$nextTick(() => {
                    this.checkAllCheckedState(v, this._innerSelectedKeys)
                })
            }
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

.v-table-stripe {

    .striped {
        background-color: #fafafa;
    }
}

.v-table {
    position: relative;
    overflow: hidden;

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
                z-index: 3;
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

            &::-webkit-scrollbar {
                display: none;
                width: 0;
                height: 0;
            }
        }

        &.v-table-body-fixed {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            z-index: 1;
            overflow: hidden;
            background-color: #fff;

            &.v-table-body-fixed-right {
                left: auto;
                right: 0;

                .inner-wrapper {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }

            &::after {
                display: none;
            }
        }

        &.v-table-header-fixed {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 2;
            height: 44px;
            overflow: hidden;
            background-color: #fff;

            &.v-table-header-fixed-right {
                left: auto;
                right: 0;

                .inner-wrapper {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }
        }

        &.is-scrolling-left~.v-table-fixed {
            box-shadow: none;

            &.v-table-fixed-right {
                box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);
            }
        }

        &.is-scrolling-center~.v-table-fixed {
            box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.15);

            &.v-table-fixed-right {
                box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);
            }
        }

        &.is-scrolling-right~.v-table-fixed {
            box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.15);

            &.v-table-fixed-right {
                box-shadow: none;
            }
        }

        &.is-scrolling-none~.v-table-fixed {
            box-shadow: none;
        }
    }

    .v-table-fixed {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        height: 100%;
        background-color: #fff;
        transition: box-shadow .3s ease;

        .v-table-body {
            overflow: hidden;
        }

        &.v-table-fixed-right {
            left: auto;
            right: 0;
        }
    }

    table {
        border-collapse: separate;
        border-spacing: 0;
        font-size: $font-size;
        color: #606266;

        .v-table-column {
            display: flex;
            align-items: center;
            padding: 0 10px;
            word-break: break-all;

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

            &.hover-row {
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

    .v-table-col {
        border-bottom: 1px solid #e8e8e8;
    }

    &.v-table-bordered {
        position: relative;
        border-top: 1px solid #e8e8e8;

        .v-table-col, /deep/ .v-table-expand-cell {
            border-right: 1px solid #e8e8e8;
            border-bottom: 1px solid #e8e8e8;
        }

        &::before, &::after {
            content: '';
            position: absolute;
            top: 0;
            width: 1px;
            height: 100%;
            z-index: 3;
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
