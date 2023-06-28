import cache from "@/utils/cache";
import { loadImgs } from "@/utils/index";
import { pipe } from "ramda";
try {
    JSON.parse(cache.settings.get('{"nodePackageTools":"pnpm"}'))
} catch {
    cache.settings.set('{"nodePackageTools":"pnpm"}')
}

export function loadBackground () {
    let settings = JSON.parse(cache.settings.get() || '{}')
    if (!settings.bgCustom) {
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
    if (!settings.animationCustom) {
        return
    }
    loadImgs({
        path: settings.animationPath,
        suffix: settings.animationSuffix
    }).then(res => {
        if (res.length > 0) {
            let urls = res.map(e => uint8ToFile(e)).map(e => `url('${e}')`)
            window.setImgs(urls)
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
