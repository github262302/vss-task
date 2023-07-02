import { pipe } from "ramda";

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
export const bgToBody = pipe(arrSelectOne, setBodyBg)
export function animationToBody (data) {
    window.setImgs(data)
    const startAnimation = document.querySelector('.start-animation')
    startAnimation.style.backgroundImage = data[Math.floor(Math.random() * data.length)]
}
