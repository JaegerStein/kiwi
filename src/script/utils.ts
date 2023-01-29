export function fori(end: number, callback: (i: number) => void): void;
export function fori(start: number, end: number, callback: (i: number) => void): void;
export function fori(start: number, end: number, step: number, callback: (i: number) => void): void;

export function fori(startEnd: number,
                     endCallback?: number | ((i: number) => void),
                     stepCallback?: number | ((i: number) => void),
                     callback?: (i: number) => void): void {

    let start = 0;
    let end: number;
    let step = 1;
    let uptoEquals = false;

    if (endCallback && typeof endCallback === 'function') {
        end = startEnd;
        callback = endCallback;
    } else {
        end = endCallback as number;
        start = startEnd;
        uptoEquals = true;
    }

    if (stepCallback && typeof stepCallback === 'function') callback = stepCallback;
    else if (stepCallback) step = stepCallback as number;

    if (callback) {
        for (let i = start; uptoEquals ? i <= end : i < end; i += step) {
            callback(i);
        }
    } else return;
}