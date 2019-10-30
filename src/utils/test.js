function mod(y) {
    return function forX(x) {
        return x % y
    }
}
function eq(y) {
    return function forX(x) {
        return x === y
    }
}
function isOdd(x) {
    return eq1(mod2(x))
}
function compose(fn2, fn1) {
    return function composed(v) {
        return fn2(fn1(v))
    }
}
// const iOdd = compose( eq(1), mod(2))