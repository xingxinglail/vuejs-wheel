<template>
    <div style="padding: 20px">
        <p>bmsdf423435kjhdskjf</p>
        <p>bmsdf345kjhdskjf</p>
        <br>
        <br>
        <br>
        <p>bmsdf423435kjhdskjf</p>
        <p>bmsdf345kjhdskjf</p>
        <div style="height: 500px;background-color: #eaeaea" ref="container">
            <v-sticky :container="container" @change="change(1, $event)">
                <h1 class="title" style="width: 200px;height: 50px;">hello world</h1>
            </v-sticky>
        </div>
        <div style="height: 500px;position: relative">
            <div style="position: absolute;top: 200px;left: 50px;">
                <v-sticky :distance="50" @change="change(2, $event)">
                    <h1 class="title" style="width: 200px;height: 50px;background-color: #4a90e2">hello world</h1>
                </v-sticky>
            </div>
        </div>
        <br>
        <br>
        <br>
        <p>bmsdf423435kjhdskjf</p>
        <p>bmsdf345kjhdskjf</p>
        <v-sticky :distance="130" @change="change(3, $event)">
            <h1 class="title">hello world</h1>
        </v-sticky>
        <p>bmsdfkj123hdskjf</p>
        <p>bmsd435fkjhdskjf</p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p>bmsdf423423435kjhdskjf</p>
        <p>bmsdf345kjhdskjf</p>
        <p>bmsdfkjhdskjf</p>
        <p>bmsd435fkjhdskjf</p>
        <br>
        <br>
        <br>
        <p>bmsdfkjhdskjf</p>
        <p>bmsdfka1sdjhdskjf</p>
        <p>bmsdf123kjhdskjf</p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p>bmsdfasdkjhdskjf</p>
        <p>bmsd543kjhdskjf</p>
        <p>bmsdfk234jhdskjf</p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p>bmsdf423435kjhdskjf</p>
        <p>bmsdf345kjhdskjf</p>
        <p>bmsdfkjhdskjf</p>
        <p>bmsd435fkjhdskjf</p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p>bmsdf423435kjhdskjf</p>
        <p>bmsdf345kjhdskjf</p>
        <p>bmsdfkjhdskjf</p>
        <p>bmsd435fkjhdskjf</p>
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            container: null
        }
    },
    created () {

    },
    mounted () {
        this.container = this.$refs.container
    },
    methods: {
        change (type, v) {
            console.log(type, v)
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    width: 60vh;
    padding: 40px;
    background-color: #f68;
    color: #fff;
}
</style>
