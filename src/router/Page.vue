<template>
    <div>
        <v-popover
                v-model="popover"
                placement="top-start"
                popper-class="popover-class"
                @show="popoverShow"
                @hide="popoverHide">
            <template slot="content" slot-scope="{ close }">
                <div>
                    <p>点击设置触发事件</p>
                    <v-button icon="setting" @click="close">关闭</v-button>
                </div>
            </template>
            <v-button>按钮</v-button>
        </v-popover>
        <v-popover v-model="popover2"
                   trigger="hover"
                   placement="top-start"
                   popper-class="popover-class">
            <template slot="content">
                <div>
                    <p>点击设置触发事件</p>
                    <v-button icon="setting" @click="popover2 = false">关闭</v-button>
                </div>
            </template>
            <v-button>按钮</v-button>
        </v-popover>
        <br />
        <br />
        <br />
        <v-popover placement="top-start" @show="popoverShow" @hide="popoverHide">
            <template slot="content">
                <p>aaaaaaaaaaasdasdasdsfsdfdsfsdfsdfsdf</p>
            </template>
            <v-button>按钮</v-button>
        </v-popover>
        <v-popover>
            <template slot="content">
                <p>索fsd发斯蒂芬法索fsd发斯蒂芬法索fsd发斯蒂芬法索fsd发斯蒂芬法索fsd发斯蒂芬法</p>
            </template>
            <v-button icon="setting">设置</v-button>
        </v-popover>
        <v-popover placement="top-end">
            <template slot="content">
                <p>水费是范德萨的士大夫</p>
            </template>
            <v-button icon="setting">设置</v-button>
        </v-popover>
        <br />
        <br />
        <br />
        <br />
        <v-popover placement="bottom-start">
            <template slot="content">
                <p>aaaa</p>
            </template>
            <v-button>按钮</v-button>
        </v-popover>
        <v-popover placement="bottom">
            <template slot="content">
                <p>索fsd发斯蒂芬法索fsd发斯蒂芬法索fsd发斯蒂芬法索fsd发斯蒂芬法索fsd发斯蒂芬法</p>
            </template>
            <v-button>舒服</v-button>
        </v-popover>
        <v-popover placement="bottom-end" trigger="hover">
            <template slot="content">
                <p>设是</p>
            </template>
            <v-button>设是水电费水电费水电费水电费</v-button>
        </v-popover>
        <br />
        <br />
        <br />
        <br />
        <div>
            <v-popover placement="left-start">
                <template slot="content">
                    <p>asd</p>
                </template>
                <v-button>按钮</v-button>
            </v-popover>
        </div>
        <br />
        <div>
            <v-popover placement="left" trigger="hover">
                <template slot="content">
                    <p>索尼奥术大师阿双方是否改善电饭锅电饭锅是的发生大事大法索尼奥术大师阿双方是否改善电饭锅电饭锅是的发生大事大法索尼奥术大师阿双方是锅电饭锅是的发生大事大法</p>
                </template>
                <v-button icon="setting">设置</v-button>
            </v-popover>
        </div>
        <br />
        <div>
            <v-popover placement="left-end">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <v-button icon="setting">设置</v-button>
            </v-popover>
        </div>
        <br />
        <br />
        <br />
        <div>
            <v-popover placement="right-start">
                <template slot="content">
                    <p>水电费</p>
                </template>
                <v-button>按钮</v-button>
            </v-popover>
        </div>
        <br />
        <div>
            <v-popover placement="right" trigger="hover">
                <template slot="content">
                    <p>术大师阿双方是否改善电饭锅电饭锅是的发生大事大法术大师阿双方是否改善电饭锅电饭锅是的发生大事大法</p>
                </template>
                <v-button icon="setting">术大生大事大法</v-button>
            </v-popover>
        </div>
        <br />
        <div>
            <v-popover placement="right-end">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <v-button icon="setting">设置</v-button>
            </v-popover>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Page',
    data () {
        return {
            popover: true,
            popover2: false
        }
    },
    methods: {
        popoverShow () {
            console.log('popoverShow')
        },
        popoverHide () {
            console.log('popoverHide')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
