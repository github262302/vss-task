import cache from "@/utils/cache";
import { loadImgs } from "@/utils/index";
import { loadSettings } from "@/utils/settings";
import { pipe, set } from "ramda";
const defaultConfig = {
    animationCustom: false,
    animationPath: "",
    animationSuffix: "gif",
    bgCustom: false,
    bgPath: "",
    bgSuffix: "png",
    nodePackageTools: "pnpm"
}
export function loadBackground () {
    let settings = loadSettings()
    if (!settings.bgCustom || !settings.bgPath) {
        return
    }
    loadImgs({
        path: settings.bgPath,
        suffix: settings.bgSuffix
    }).then(res => {
        if (res.length > 0) {
            let urls = res.map(e => uint8ToFile(e))
            // console.log("loadBackground", urls);
            arrToBg(urls)
        }
    })
}
export function loadAnimation () {
    let settings = JSON.parse(cache.settings.get() || '{}')
    if (!settings.animationCustom || !settings.animationPath) {
        return
    }
    loadImgs({
        path: settings.animationPath,
        suffix: settings.animationSuffix
    }).then(res => {
        if (res.length > 0) {
            let urls = res.map(e => uint8ToFile(e)).map(e => `url('${e}')`)
            window.setImgs(urls)
            const startAnimation = document.querySelector('.start-animation')
            startAnimation.style.backgroundImage = urls[Math.floor(Math.random() * urls.length)]

        }
    })
}
export function uint8ToFile (data) {
    let blob = new Blob([data], { type: "image/png" });
    let url = URL.createObjectURL(blob);
    return url
}
/**
 * @param {string[]} arr
 */
export function arrSelectOne (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
export function setBodyBg (url) {
    document.body.style.backgroundImage = `url(${url})`
}
const arrToBg = pipe(arrSelectOne, setBodyBg)
