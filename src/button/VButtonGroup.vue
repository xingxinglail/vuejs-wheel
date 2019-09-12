<template>
    <div class="v-button-group">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'VButtonGroup',
    mounted () {
        for (let node of this.$el.children) {
            let name = node.nodeName.toLowerCase()
            if (name !== 'button') {
                console.warn(`v-button-group 的子元素应该全是 g-button，但是你写的是 ${name}`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$border-radius: 4px;

.v-button-group {
    display: inline-flex;
    vertical-align: middle;

    .v-button {
        border-radius: 0;

        &:not(:first-child) {
            margin-left: -1px;
        }

        &:first-child {
            border-radius: $border-radius 0 0 $border-radius;
        }

        &:last-child {
            border-radius: 0 $border-radius $border-radius 0;
        }

        &:hover {
            position: relative;
            z-index: 1;
        }
    }
}
</style>
