
class Cache {
    constructor(key) {
        this.key = key;
    }

    get (data) {
        let d = localStorage.getItem(this.key);
        if (!d) {
            if (data) {
                this.set(data);
                return data;
            } else {
                this.set("{}");
                return "{}";
            }

        }
        return d;
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
    settings: new Cache('settings'),
};

export default cache
