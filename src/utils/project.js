import cache from "./cache";


export function loadProject () {
    let res = cache.project.get()
    if (res) {
        return JSON.parse(res)
    }
    return []
}
export class useProjectStorage {
    data = [];
    constructor() {
        this._load()
    }
    update (singleData) {
        this._load()
        this.data = singleData
        this.storage()
    }
    add (d) {
        this._load()
        this.data.push(d)
        this.storage()
    }
    remove (name) {
        this._load()
        let index = this.data.findIndex(item => item.name == name)
        if (index != -1) {
            this.data.splice(index, 1)
        }
        this.storage()
    }
    storage () {
        cache.project.set(JSON.stringify(this.data))
    }
    get () {
        return this.data
    }
    _load () {
        let d = cache.project.get("[]")
        try {
            let s = JSON.parse(d)
            if (s instanceof Array) {
                this.data = s
            } else {
                throw new Error("no a array!")
            }
        } catch {
            this.data = []
        }
    }
    load () {
        this._load()
        return this.get()
    }
}
export const ups = new useProjectStorage();
