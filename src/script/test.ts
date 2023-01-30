import {find} from "./kiwi.js";

function rangedDice(x: number): string {
    if (x <= 4) return "1D4";
    if (x <= 6) return "1D6";
    x = Math.ceil((x - 6) / 2);
    let nFour = 0;
    let nSix = 2 + Math.floor((x - 1) / 4);
    const e = (m: number) => !((x - m) % 3);
    if (e(1)) {
        nFour = 2;
        nSix -= 2;
    } else if (e(2)) {
        nFour = 1;
        nSix -= 1;
    }
    if (!nFour) return `${nSix}D6`;
    if (!nSix) return `${nFour}D4`;
    return `${nFour}D4 + ${nSix}D6`;
}

function macro(input: HTMLInputElement): string {
    let s = "";
    const value = input.valueAsNumber;
    if (value > 0) s = rangedDice(value);
    console.log(s)
    return s;
}


export default function test() {
    find('#dice')!.addEventListener('input', ev => {
        find('#target')!.innerHTML = macro(ev.target as HTMLInputElement);
    });
}