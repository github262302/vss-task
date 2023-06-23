const runing = []
const subscriber = []

export function projectOn (data) {
    subscriber.push(data)
}
export function publish () {
    for (const item of subscriber) {
        item()
    }
}
