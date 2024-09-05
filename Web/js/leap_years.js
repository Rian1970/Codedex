
for (let years = 2000; years < 3001; years++) {
    if (years % 4 == 0 && years % 100 != 0) {
        console.log(years)
    } else if (years % 400 == 0) {
        console.log(years)
    }
}