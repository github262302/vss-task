
class Cache {
    constructor(key) {
        this.key = key;
    }

    get () {
        return localStorage.getItem(this.key);
    }

    set (value) {
        localStorage.setItem(this.key, value);
    }

    clear () {
        localStorage.removeItem(this.key);
    }
}
const cache = {
    project: new Cache('project'),
};

export default cache
