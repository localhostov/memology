export const readableDate = (ts: number): string => {
    const date = new Date(ts)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const monthName = months[month - 1]
    let readableDate = `${day} ${monthName} ${year} в ${
        hours < 10 ? "0" + hours : hours
    }:${minutes < 10 ? "0" + minutes : minutes}`

    const now = new Date()
    const diff = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    )

    if (diff === 0) {
        readableDate = `сегодня в ${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }`
    } else if (diff === 1) {
        readableDate = `вчера в ${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }`
    }

    return readableDate
}

const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
]
