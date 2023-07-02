<template>
    <div class="tool">
        <el-button title="github" link @click.stop="dispatchName('Main', 'handleGithub')">
            <el-icon class="hover">
                <img style="width:16px" :src="github" />
            </el-icon>
        </el-button>
        <el-button title="打开控制台" link @click.stop="dispatchName('Main', 'Dev')">

            <SvgIcon icon="bug" />

        </el-button>
        <el-button v-if="settingsValue.bgCustom" link :title="`${bgDataValue.length}背景图`">

            <SvgIcon icon="picture" />

            {{ bgDataValue.length }}
        </el-button>
        <el-button v-if="settingsValue.animationCustom" link :title="`${animationDataValue.length}张动图`">

            <SvgIcon icon="bim_donghua" />

            {{ animationDataValue.length }}

        </el-button>
        <el-button link title="通知" @click="dispatchName('Main','noticeOpen')">
            <SvgIcon icon="tongzhi" />
        </el-button>
    </div>
</template>
<script >
import emitter from "@/mixin/emitter"
import github from '@/assets/icons/github.svg';
import { useSettings } from "@/stores/settings";
import { storeToRefs } from "pinia";

export default {
    mixins: [emitter],
    setup () {
        const us = useSettings()
        const { settingsValue, bgDataValue, animationDataValue } = storeToRefs(us)
        return {
            github,
            settingsValue,
            bgDataValue,
            animationDataValue
        }
    }
}
</script>
<style lang="scss" scoped>
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
