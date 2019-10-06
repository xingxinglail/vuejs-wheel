<template>
    <div style="margin-top: 200px;margin-left: 200px;padding: 20px">
        <v-scrollbar wrapper-class="wrapper" view-class="view">
            <div class="content">
                <p>第一行</p>
                <p>asdsflks2djflk水电费水电费是否水电费水电费</p>
                <p>asdsf3lk12sdjflk</p>
                <p>asdsf34lksdjflk</p>
                <p>asdsertflewrksdjflk</p>
                <p>asdsft3hrtylksdjflk</p>
                <p>asdsflktyutyuisdjflk</p>
                <p>asdsertertflksdjflk</p>
                <p>asdsfltyuty1uiksdjflk</p>
                <p>asdsft3hrtylksdjflk</p>
                <p>asdsflktyutyuisdjflk</p>
                <p>asdsertertflksdjflk</p>
                <p>asdsft3hrtylksdjflk</p>
                <p>asdsflktyutyuisdjflk</p>
                <p>asdsertertflksdjflk</p>
                <p>最后一行</p>
            </div>
        </v-scrollbar>
        <br>
        <br>
        <br>
        <v-scrollbar wrapper-class="wrapper" view-class="view">
            <div class="content">
                <p>第一行</p>
                <p class="ddd">asdsflks2djflk水电费水电费是否水电费水电费</p>
                <p>asdsf3lk12sdjflk</p>
                <p>asdsf34lksdjflk</p>
                <p>asdsertflewrksdjflk</p>
                <p>asdsft3hrtylksdjflk</p>
                <p>asdsflktyutyuisdjflk</p>
                <p>asdsertertflksdjflk</p>
                <p>asdsfltyuty1uiksdjflk</p>
                <p>asdsft3hrtylksdjflk</p>
                <p>asdsflktyutyuisdjflk</p>
                <p>asdsertertflksdjflk</p>
                <p>asdsft3hrtylksdjflk</p>
                <p>asdsflktyutyuisdjflk</p>
                <p>asdsertertflksdjflk</p>
                <p>最后一行</p>
            </div>
        </v-scrollbar>
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
.wrapper {
    width: 330px;
    background-color: #fff4c2;

    /deep/ .view {
        max-height: 274px;
    }

    .content {
        font-size: 28px;
        line-height: 2;

        p.ddd {
            width: 500px;
        }
    }
}
</style>
