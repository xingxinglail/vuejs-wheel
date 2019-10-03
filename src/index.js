import Icon from './icon/VIcon'
import Button from './button/VButton'
import ButtonGroup from './button/VButtonGroup'
import Input from './input/VInput'
import Row from './layout/VRow'
import Col from './layout/VCol'
import Aside from './container/VAside'
import Content from './container/VContent'
import Header from './container/VHeader'
import Footer from './container/VFooter'
import Layout from './container/VLayout'
import Collapse from './collapse/VCollapse'
import CollapseItem from './collapse/VCollapseItem'
import Cascader from './cascader/VCascader'
import CascaderPanel from './cascader/VCascaderPanel'
import Carousel from './carousel/VCarousel'
import CarouselItem from './carousel/VCarouselItem'
import Popover from './popover/VPopover'
import Tabs from './tabs/VTabs'
import TabPane from './tabs/VTabPane'
import TabBody from './tabs/VTabBody'
import TabHead from './tabs/VTabHead'
import TabNav from './tabs/VTabNav'
import Toast from './plugins/toast/src/Main'
import ToastFn from './plugins/toast'
import Menu from './menu/VMenu'
import MenuItem from './menu/VMenuItem'
import SubMenu from './menu/VSubMenu'
import Pagination from './pagination/VPagination'
import Table from './table/VTable'
import TableColumn from './table/VTableColumn'
import Sticky from './sticky/VSticky'

export default {
    install (Vue) {
        Vue.component(Icon.name, Icon)
        Vue.component(Button.name, Button)
        Vue.component(ButtonGroup.name, ButtonGroup)
        Vue.component(Input.name, Input)
        Vue.component(Row.name, Row)
        Vue.component(Col.name, Col)
        Vue.component(Aside.name, Aside)
        Vue.component(Content.name, Content)
        Vue.component(Header.name, Header)
        Vue.component(Footer.name, Footer)
        Vue.component(Layout.name, Layout)
        Vue.component(Collapse.name, Collapse)
        Vue.component(CollapseItem.name, CollapseItem)
        Vue.component(Cascader.name, Cascader)
        Vue.component(CascaderPanel.name, CascaderPanel)
        Vue.component(Carousel.name, Carousel)
        Vue.component(CarouselItem.name, CarouselItem)
        Vue.component(Popover.name, Popover)
        Vue.component(Tabs.name, Tabs)
        Vue.component(TabPane.name, TabPane)
        Vue.component(TabBody.name, TabBody)
        Vue.component(TabHead.name, TabHead)
        Vue.component(TabNav.name, TabNav)
        Vue.component(Toast.name, Toast)
        Vue.component(Menu.name, Menu)
        Vue.component(MenuItem.name, MenuItem)
        Vue.component(SubMenu.name, SubMenu)
        Vue.component(Pagination.name, Pagination)
        Vue.component(Table.name, Table)
        Vue.component(TableColumn.name, TableColumn)
        Vue.component(Sticky.name, Sticky)
        Vue.use(ToastFn)
    }
}
