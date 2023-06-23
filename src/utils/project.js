import cache from "./cache";


export function loadProject () {
    let res = cache.project.get()
    if (res) {
        return JSON.parse(res)
    }
    return []
}
