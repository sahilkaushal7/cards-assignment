const getRandomNumberOfNDigits = (digit: number) => Math.random().toFixed(digit).split('.')[1]
const getRandomNumberBetweenNumbers = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

const generateCardDetails = () => {
    const cardNumber = `44${getRandomNumberOfNDigits(14)}`
    const cvv = getRandomNumberOfNDigits(3)
    const expMonth = getRandomNumberBetweenNumbers(0, 12)
    const expDate = `${expMonth < 10 ? `0${expMonth}` : expMonth}/${getRandomNumberBetweenNumbers(
        23,
        30
    )}`
    return {
        cardNumber,
        cvv,
        expDate
    }
}

export default {
    generateCardDetails
}