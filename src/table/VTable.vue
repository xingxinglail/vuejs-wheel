<template>
    <div class="v-table"
         ref="tableWrapper"
         :class="{ 'v-table-bordered': bordered }">
        <div class="v-table-header" ref="headerWrapper">
            <table :style="{ width: maxWidth }">
                <colgroup>
                    <col v-for="item in innerColumns"
                         :key="item.field"
                         :style="{ width: item.relaWidth + 'px' }" />
                </colgroup>
                <thead>
                    <tr>
                        <th v-if="selection">
                            <div class="v-table-column">
                                <input class="checkbox"
                                       :class="{ disabled: data.length === 0 }"
                                       type="checkbox"
                                       ref="allCheckbox"
                                       :checked="allChecked"
                                       :disabled="data.length === 0"
                                       @click="onSelectAll"
                                       @change="onAllCheckedChange">
                            </div>
                        </th>
                        <th v-for="item in innerColumns" :key="item.field">
                            <div class="v-table-column"
                                 :class="{ 'v-table-column-has-sorters': item.field in innerSorter }"
                                 @click="onTableColumnClick(item)">
                                <span>{{ item.title }}</span>
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
                    <col v-for="item in innerColumns"
                         :key="item.field"
                         :style="{ width: item.relaWidth + 'px' }" />
                </colgroup>
                <tbody>
                    <tr v-for="row in data" :key="row[rowKey]">
                        <th v-if="selection">
                            <div class="v-table-column">
                                <input class="checkbox"
                                       type="checkbox"
                                       :checked="selection.selectedKeys.indexOf(row[rowKey]) >= 0"
                                       @click="onSelect(row, row[rowKey], $event)"
                                       @change="onCheckboxChange(row, row[rowKey], $event)">
                            </div>
                        </th>
                        <td v-for="col in innerColumns" :key="col.field">
                            {{ row[col.field] }}
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
        columns: {
            type: Array,
            default () {
                return []
            }
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
            default: null
        }
    },
    data () {
        return {
            innerColumns: [],
            innerSorter: Object.create(null),
            sortRule,
            allChecked: false,
            maxWidth: null
        }
    },
    beforeCreate () {
        this._x = {
            minWidth: 80,
            minTableWidth: 0,
            maxColumnWidth: 0,
            hasWidthColumnCount: 0
        }
        this._innerSelectedKeys = []
    },
    mounted () {
        const { tableWrapper, allCheckbox, headerWrapper, bodyWrapper } = this.$refs
        this._tableWrapper = tableWrapper
        this._headerWrapper = headerWrapper
        this._bodyWrapper = bodyWrapper
        this._allCheckedDom = allCheckbox
        window.addEventListener('resize', this.onResizeHandle)
        headerWrapper.addEventListener('scroll', this.onHeaderWrapperScrollHandle)
        bodyWrapper.addEventListener('scroll', this.onBodyWrapperScrollHandle)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.onResizeHandle)
        const { _headerWrapper, _bodyWrapper } = this
        if (_headerWrapper) _headerWrapper.removeEventListener('scroll', this.onHeaderWrapperScrollHandle)
        if (_bodyWrapper) _bodyWrapper.removeEventListener('scroll', this.onBodyWrapperScrollHandle)
    },
    methods: {
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
            if (!this.selection) return
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
            this._allCheckedDom.indeterminate = indeterminate
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
            const { innerColumns, _tableWrapper, _x } = this
            let maxWidth = _tableWrapper.offsetWidth
            if (this.bordered) maxWidth -= 2
            const surplusMeanWidth = maxWidth - _x.maxColumnWidth
            const surplusColumnsCount = innerColumns.length - _x.hasWidthColumnCount
            const relaWidth = surplusMeanWidth / surplusColumnsCount
            maxWidth = 0
            for (let i = 0; i < innerColumns.length; i++) {
                const { width, minWidth } = innerColumns[i]
                if (width === undefined) {
                    let mWidth = _x.minWidth
                    if (minWidth) mWidth = parseFloat(minWidth)
                    innerColumns[i].relaWidth = relaWidth < mWidth ? mWidth : relaWidth
                }
                maxWidth += innerColumns[i].relaWidth
            }
            this.maxWidth = `${maxWidth}px`
        }
    },
    watch: {
        columns: {
            deep: true,
            immediate: true,
            handler (v) {
                const { _x } = this
                this.innerColumns = v.map(c => {
                    const { width } = c
                    const relaWidth = width !== undefined ? parseFloat(width) : undefined
                    const data = { ...c }
                    if (relaWidth) {
                        _x.maxColumnWidth += relaWidth
                        _x.hasWidthColumnCount += 1
                        data.relaWidth = relaWidth
                    }
                    return data
                })
                _x.minTableWidth = _x.maxColumnWidth + ((v.length - _x.hasWidthColumnCount) * _x.minWidth)
                this.$nextTick(this.calcColumnsWidth)
            }
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
                this._innerSelectedKeys = Array.isArray(v) ? deepClone(v) : []
                this.$nextTick(() => {
                    this.checkAllCheckedState(this.data, v)
                })
            }
        },
        data (v) {
            this.$nextTick(() => {
                this.checkAllCheckedState(v, this._innerSelectedKeys)
            })
        }
    },
    components: {
        'v-icon': Icon
    }
}
</script>

<style lang="scss" scoped>
@import '../var';

.v-table {
    position: relative;
    border-bottom: 1px solid #e8e8e8;

    /*.v-table-header {*/
    /*    overflow: hidden;*/
    /*}*/

    .v-table-body, .v-table-header {
        overflow: auto;

        &.v-table-body {

            table tr:not(:last-child) {
                border-bottom: 1px solid #e8e8e8;
            }
        }

        &.v-table-header {
            border-bottom: 1px solid #e8e8e8;

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
        }

        th .v-table-column, td {
            padding: 16px;
            text-align: left;
        }

        tbody tr {
            transition: background-color .3s;

            &:hover {
                background-color: #f5f7fa;
            }
        }
    }

    &.v-table-bordered {
        border: 1px solid #e8e8e8;
        box-sizing: border-box;

        th:not(:last-child), td:not(:last-child) {
            border-right: 1px solid #e8e8e8;
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
