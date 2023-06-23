<template>
    <div class="container">
        <div class="header">
            VS Code-Task管理器
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
    -webkit-app-region: drag;
    padding: 4px 12px;
    cursor: pointer;
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
</style>
