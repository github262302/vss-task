<template>
    <div class="container">
        <div class="header">
            <div class="title">
                <img class="logo scaleBM" style="width:18px" :src="Light" />
                <div class="title-content">
                    VSS-Task 管理器
                </div>
            </div>
            <div class="right">

                <el-icon @click="handleSmall" class="hover">
                    <Minus />
                </el-icon>
                <el-icon @click="handleClose" class="hover">
                    <Close />
                </el-icon>
            </div>
        </div>
        <div class="menu">
            <MenuContent />
        </div>
        <div class="main">
            <MainContent />
        </div>
        <statusBar />
        <NoticeVue @register="noticeRegister" />

    </div>
</template>
<script>
import emitter from "@/mixin/emitter"
import statusBar from "./statusBar.vue"
import MenuContent from './menu.vue';
import MainContent from '../Main.vue';
import { winMinimize, winClose, openFolder, openDev } from '@/utils/index';
import { Close, Minus } from '@element-plus/icons-vue';
import Light from "@/../images/icon.png"
import NoticeVue from "@/components/Notice/index.vue"
import { useNotice } from "@/components/Notice/index.js"
export default {
    mixins: [emitter],
    components: {
        MenuContent, statusBar, MainContent, Close, Minus, NoticeVue
    },
    methods: {
        handleGithub () {
            this.openUrl('https://github.com/github262302/vss-task')
        },
        Dev () {
            openDev()
        }
        , handleSmall () {
            winMinimize();
        }
        , handleClose () {
            winClose();
        }
        , openUrl (src) {
            openFolder(src);
        },
    },
    mounted () {
        this.on$("handleGithub", this.handleGithub)
        this.on$("Dev", this.Dev)
        this.on$("noticeOpen", this.noticeAction.open)
        console.log("Main:this", this);

    },
    name: "Main",
    data () {
        return { Light }
    },
    setup () {
        const [noticeRegister, noticeAction] = useNotice()
        return { noticeRegister, noticeAction }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 210px 1fr;
    grid-template-areas:
        "header header"
        "menu main";
    grid-template-rows: auto 1fr;
    /* 定义行高 */
    overflow: hidden;
}

.header {
    grid-area: header;
    padding: 8px 12px;
    cursor: pointer;
    display: flex;
    background-color: #fff;
    z-index: 1;

    .title {
        // margin-right: auto;
        flex: 1;
        font-size: 16px;
        color: rgba(0, 0, 0, .85);
        display: flex;
        gap: 8px;
    }

    .title-content {
        -webkit-app-region: drag;
        flex: 1
    }

    .right {}
}

.main {
    grid-area: main;
    height: calc(100vh - 32px);
}

.menu {
    grid-area: menu;

    background-color: #fff;

    box-shadow: 1px 0 4px 0 rgba(0, 0, 0, .1);
    overflow: auto;

}

.logo {
    vertical-align: -2px;
    display: inline-block;
}

.el-icon {
    &+.el-icon {
        margin-left: 10px;
    }
}
</style>
