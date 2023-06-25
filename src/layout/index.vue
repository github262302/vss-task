<template>
    <div class="container">
        <div class="header">
            <div class="title">VS Code-Task管理器</div>
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
            <Menu />
        </div>
        <div class="main">
            <Main />
        </div>
    </div>
</template>
<script setup>
import Menu from './menu.vue';
import Main from '../Main.vue';
import { winMinimize, winClose } from '@/utils/index';
import { Close, Minus } from '@element-plus/icons-vue';
function handleSmall () {
    winMinimize();
}
function handleClose () {
    winClose();
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
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
    padding: 4px 12px;
    cursor: pointer;
    display: flex;

    .title {
        -webkit-app-region: drag;
        // margin-right: auto;
        flex: 1;

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

    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    overflow: auto;

}

.el-icon {
    &+.el-icon {
        margin-left: 10px;
    }
}
</style>
