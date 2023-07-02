import cache from "@/utils/cache";
export const defaultConfig = {
    animationCustom: false,
    animationPath: "",
    animationSuffix: "gif",
    bgCustom: false,
    bgPath: "",
    bgSuffix: "png",
    nodePackageTools: "pnpm"
}
export function loadSettings () {
    let settings
    try {
        settings = JSON.parse(cache.settings.get(JSON.stringify(defaultConfig)))
        Object.assign(defaultConfig, settings)

    } catch (error) {
        settings = defaultConfig
    }
    return settings
}
export function saveSettings (settings) {
    cache.settings.set(JSON.stringify(settings))
}
