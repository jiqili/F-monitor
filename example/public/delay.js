let sum = 1
for(let i = 1; i < 10000; i++) {
    for(let j = 1; j < 100000; j++) {
        sum += i + j
    }
}
console.log(sum)