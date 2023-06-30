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
                <el-icon @click="handleGithub" class="hover">
                    <img style="width:16px" :src="github" />
                </el-icon>
                <el-icon @click="handleSmall" class="hover">
                    <Minus />
                </el-icon>
                <el-icon @click="handleClose" class="hover">
                    <Close />
                </el-icon>
            </div>
        </div>
        <div class="menu">
            <Menu />
        </div>
        <div class="main">
            <Main />
        </div>
        <div class="tool">
            <el-button title="打开控制台" link @click.stop="Dev">

                <SvgIcon icon="bug" />

            </el-button>
            <el-button link title="3张背景图">

                <SvgIcon icon="picture" />

                3
            </el-button>
            <el-button link title="3张动图">

                <SvgIcon icon="bim_donghua" />

                3
            </el-button>
        </div>
    </div>
</template>
<script setup>
import Menu from './menu.vue';
import Main from '../Main.vue';
import github from '@/assets/icons/github.svg';
import Light from '@/../images/icon.png';
import { winMinimize, winClose, openFolder, openDev } from '@/utils/index';
import { Close, Minus, Picture, Files, DataLine } from '@element-plus/icons-vue';
function handleSmall () {
    winMinimize();
}
function handleClose () {
    winClose();
}
function openUrl (src) {
    openFolder(src);
}
function handleGithub () {
    openUrl('https://github.com/github262302/vss-task')
}
function Dev () {
    openDev()
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
    z-index:1;
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

.tool {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 990px;
    box-sizing: border-box;
    // height: 24px;
    padding: 4px;
    box-shadow: 0 -1px 20px 0 rgba(0, 0, 0, 0.1);
    text-align: right;
    padding-right: 24px;

    svg.icon {
        width: 1.2em;
        height: 1.2em;
        margin-right: 2px;
    }
}
</style>
