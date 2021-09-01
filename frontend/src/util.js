export function importAll(r) {
    let _ = {};
    r.keys().map((item, index) => { _[item.replace('./', '')] = r(item); });
    return _;
}
