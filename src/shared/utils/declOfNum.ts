export const declOfNum = (number: number, titles: string[], full = false) => {
    const cases = [2, 0, 1, 1, 1, 2]

    const result =
        titles[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[number % 10 < 5 ? number % 10 : 5]
        ]

    return full ? `${number} ${result}` : result
}
