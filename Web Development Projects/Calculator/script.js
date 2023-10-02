// DOM Elements vars

const hour = document.querySelector(".hour")
const minutes = document.querySelector(".minutes")

const display = document.querySelector(".display")

const AC = document.querySelector(".ac")
const plusMinus = document.querySelector(".pm")
const percent = document.querySelector(".percent")
const decimal = document.querySelector(".decimal")

const division = document.querySelector(".division")
const addition = document.querySelector(".addition")
const subtraction = document.querySelector(".subtraction")
const multiplication = document.querySelector(".multiplication")
const equal = document.querySelector(".equal")

const nineNo = document.querySelector(".number-9")
const eightNo = document.querySelector(".number-8")
const sevenNo = document.querySelector(".number-7")
const sixNo = document.querySelector(".number-6")
const fiveNo = document.querySelector(".number-5")
const fourNo = document.querySelector(".number-4")
const threeNo = document.querySelector(".number-3")
const twoNo = document.querySelector(".number-2")
const oneNo = document.querySelector(".number-1")
const zeroNo = document.querySelector(".number-0")

const numbersArray = [zeroNo, oneNo, twoNo, threeNo, fourNo, fiveNo, sixNo, sevenNo, eightNo, nineNo]

// Vars to store previous values in memory

let operationInMemory = null;
let valueStrInMemory = null;

// Updating Current Time

const updateTime = () => {
    const time = new Date();

    const currentHour = time.getHours();
    const currentMinute = time.getMinutes();

    hour.textContent = currentHour.toString();
    minutes.textContent = currentMinute.toString().padStart(2, '0');
}

setInterval(updateTime, 1500);
updateTime();

// Function to Operate operations

const getResult = () => {
    const currentValueNum = getDisplayValueInt();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if (operationInMemory === "addition") {
        newValueNum = valueNumInMemory + currentValueNum;
    } else if (operationInMemory === "subtraction") {
        newValueNum = valueNumInMemory - currentValueNum;
    } else if (operationInMemory === "multiplication") {
        newValueNum = valueNumInMemory * currentValueNum;
    } else if (operationInMemory === "division") {
        newValueNum = valueNumInMemory / currentValueNum;
    }
    return newValueNum.toString();
}

const handleOperation = (operation) => {
    const currentValueStr = getDisplayValueStr();

    if (!valueStrInMemory) {
        valueStrInMemory = currentValueStr;
        operationInMemory = operation;
        setStrAsValue("0");
        return
    }
    valueStrInMemory = getResult();
    operationInMemory = operation;
    setStrAsValue("0");
}


// Functions to display decimal, ',' & DOM elements 

getDisplayValueStr = () => {
    const currentDisplayNumber = display.textContent;
    return currentDisplayNumber.split(',').join('');
}

getDisplayValueInt = () => {
    return parseFloat(getDisplayValueStr());
}

setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        display.textContent += '.';
        return
    }

    const [wholeNoPart, decimalNoPart] = valueStr.split('.');
    if (decimalNoPart) {
        display.textContent = parseFloat(wholeNoPart).toLocaleString() + '.' + decimalNoPart;
    } else {
        display.textContent = parseFloat(wholeNoPart).toLocaleString();
    }
}

const numberClick = (numStr) => {
    const currentDisplayNumber = getDisplayValueStr();
    if (currentDisplayNumber === "0") {
        setStrAsValue(numStr)
    } else {
        setStrAsValue(currentDisplayNumber + numStr)
    }
}

// Event Listener (Numbers & Decimal)

for (let i = 0; i < numbersArray.length; i++) {
    const num = numbersArray[i];
    num.addEventListener('click', () => {
        numberClick(i.toString())
    })
}

decimal.addEventListener('click', () => {
    const currentDisplayNumber = getDisplayValueStr();
    if (!currentDisplayNumber.includes('.')) {
        setStrAsValue(currentDisplayNumber + '.')
    }
})

// Event Listeners (Functions)

AC.addEventListener('click', () => {
    setStrAsValue("0");
    operationInMemory = null;
    valueStrInMemory = null;
})

plusMinus.addEventListener('click', () => {
    const currentValueNum = getDisplayValueInt();
    const currentValueStr = getDisplayValueStr();

    if (currentValueStr === '-0') {
        setStrAsValue("0");
        return
    }

    if (currentValueNum >= 0) {
        setStrAsValue('-' + currentValueStr)
    } else {
        setStrAsValue(currentValueStr.substring(1))
    }
})

percent.addEventListener('click', () => {
    const currentValueNum = getDisplayValueInt();
    const newValue = currentValueNum / 100;
    setStrAsValue(newValue.toString());
    operationInMemory = null;
    valueStrInMemory = null;
})

// Event Listeners (Operators)

division.addEventListener('click', () => {
    handleOperation('division')
})

addition.addEventListener('click', () => {
    handleOperation('addition')
})

subtraction.addEventListener('click', () => {
    handleOperation('subtraction')
})

multiplication.addEventListener('click', () => {
    handleOperation('multiplication')
})

equal.addEventListener('click', () => {
    if (valueStrInMemory) {
        setStrAsValue(getResult());
        valueStrInMemory = null;
        operationInMemory = null;
    }
})