export default function captcha(){
    const firstNumber: number = Math.floor(Math.random() * 10 + 1)
    const lastNumber: number = Math.floor(Math.random() * 10 + 1)
    const arrayPos: string[] = ["+", "-", "*"]
    const operation = arrayPos[Math.floor(Math.random() * arrayPos.length)]

    let result: number = firstNumber + lastNumber

    switch(operation){
        case "-":
            result = firstNumber - lastNumber
            break
        case "*":
            result = firstNumber * lastNumber
            break
    }

    return {
        firstNumber,
        lastNumber,
        operation,
        result
    }
}