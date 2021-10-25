let timeInterval = null
let isStart = false
let mainTime = 0
let splitTime = 0
let laps = []

const mainTimer = document.querySelector(".main-timer")
const splitTimer = document.querySelector(".split-time")

const startButton = document.querySelector(".start-btn")
const splitButton = document.querySelector(".split-btn")
const resetButton = document.querySelector(".reset-btn")
const lapsContainer = document.querySelector(".laps-container")


const timeStringGenerator = time => {
    return `${("0" + Math.floor((time / 360000) % 60)).slice(-2)}:${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:${("0" + Math.floor((time / 1000) % 60)).slice(-2)}.${("0" + ((time / 10) % 1000)).slice(-2)}`
}

const pushLap = lapType => {
    laps.push({
        srNo: laps.length + 1,
        type: lapType,
        time: timeStringGenerator(mainTime)
    })
    let lastLap = laps[laps.length - 1]

    lapsContainer.innerHTML += `
                                <div class="lap">
                                    <span class="lap-sr-no">#${lastLap.srNo}</span>
                                    <span class=${lastLap.type} lap-time}>
                                        ${lastLap.time}
                                    </span>
                                    <span className="lap-type">${lastLap.type}</span>
                                </div>
    `

    splitTime = 0
}

startButton.addEventListener("click", () => {
    if (isStart) {
        isStart = false
        clearInterval(timeInterval)
        startButton.innerText = 'Start'
        splitButton.disabled = true
        resetButton.disabled = false
        pushLap('pause')
        return
    }

    isStart = true
    startButton.innerText = 'Pause'
    splitButton.disabled = false
    resetButton.disabled = true
    timeInterval = setInterval(() => {
        mainTime += 10
        splitTime += 10
        mainTimer.innerText = timeStringGenerator(mainTime)
        splitTimer.innerText = timeStringGenerator(splitTime)
    }, 10)


})

splitButton.addEventListener("click", () => {
    pushLap('split')
})

resetButton.addEventListener("click", () => {
    mainTimer.innerText = "00:00:00.00"
    splitTimer.innerText = "00:00:00.00"
    lapsContainer.innerHTML = ""

    mainTime = 0
    splitTime = 0
    laps = []
})