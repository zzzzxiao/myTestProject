export function parseBarWidth(barLength) {
    switch (barLength){
        case 1:return '25%';
        case 2:return '20%';
        case 3:return '20%';
        default: return '15%';
    }
}

export function parseNumber(nStr) {
    nStr += '';
    const isFushu = nStr.indexOf('-') !== -1;
    nStr = isFushu ? nStr.replace(/-/g, '') : nStr;
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    let str = (x1 + x2).indexOf('.') !== -1 ? (x1 + x2).substring(0, (x1 + x2).indexOf('.') + 3) : (x1 + x2);
    str = isFushu ? '-' + str : str;
    return str;
}