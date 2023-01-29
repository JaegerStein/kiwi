export function fori(startEnd, endCallback, stepCallback, callback) {
    let start = 0;
    let end;
    let step = 1;
    let uptoEquals = false;
    if (endCallback && typeof endCallback === 'function') {
        end = startEnd;
        callback = endCallback;
    }
    else {
        end = endCallback;
        start = startEnd;
        uptoEquals = true;
    }
    if (stepCallback && typeof stepCallback === 'function')
        callback = stepCallback;
    else if (stepCallback)
        step = stepCallback;
    if (callback) {
        for (let i = start; uptoEquals ? i <= end : i < end; i += step) {
            callback(i);
        }
    }
    else
        return;
}
//# sourceMappingURL=utils.js.map