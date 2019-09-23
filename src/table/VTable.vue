<template>
    <div class="v-table" :class="{ 'v-table-bordered': bordered }">
        <table>
            <thead>
                <tr>
                    <th v-for="item in columns" :key="item.field">
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
            <tbody>
                <tr v-for="row in data" :key="row[rowKey]">
                    <td v-for="col in columns" :key="col.field">
                        {{ row[col.field] }}
                    </td>
                </tr>
            </tbody>
        </table>
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
        }
    },
    data () {
        return {
            innerSorter: Object.create(null),
            sortRule
        }
    },
    methods: {
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
        }
    },
    watch: {
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

    table {
        width: 100%;
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
        }

        th .v-table-column, td {
            padding: 16px;
            text-align: left;
        }

        tr {
            border-bottom: 1px solid #e8e8e8;
        }

        tbody tr {
            transition: background-color .3s;

            &:hover {
                background-color: #f5f7fa;
            }
        }
    }

    &.v-table-bordered table {

        th, td {
            border: 1px solid #e8e8e8;
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
