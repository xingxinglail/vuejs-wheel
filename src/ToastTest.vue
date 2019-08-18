<template>
    <div class="toast-test">
        <v-toast :duration="0" class-name="kk">hello</v-toast>
    </div>
</template>

<script>
export default {
    name: 'ToastTest'
}
</script>

<style lang="scss">
.toast-test {
    height: 200px;

    .kk .inner {
        color: red;
    }
}
</style>
