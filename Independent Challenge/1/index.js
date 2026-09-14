function calcDiscount(subtotal, isMember) {
    if (subtotal < 0)
        return 0

    totalDisc = 0
    if (subtotal >= 200000)
        totalDisc = 0.20
    else if (subtotal >= 100000)
        totalDisc = 0.10

    if (isMember)
        totalDisc += 0.05

    return totalDisc
}

const subtotal = 2000000;
const isMember = true;
console.log(subtotal - (subtotal * calcDiscount(subtotal, isMember))) // contoh penggunaan