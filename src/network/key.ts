var key: null | string = null;
export function setKey(k: string) {
    key = k;
}
export function getKey() {
    return key
}

setKey("API-KEY")