// let newDeckBtn = document.getElementById("new-deck-btn")
let deckId = ""
let computerScore = 0
let myScore = 0

const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck-btn")
const drawCardBtn = document.getElementById("draw-cards")
let messageDisplay = document.getElementById("message")
let remainingCardsDisplay = document.getElementById("remaining-cards")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

function getNewDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remainingCardsDisplay.textContent = data.remaining
        })
    // let popAudio = new Audio(audio/"Pop_A.wav")
    // popAudio.play()
}

newDeckBtn.addEventListener("click", getNewDeck)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML =`
            <img src=${data.cards[0].image} />
            `
            cardsContainer.children[1].innerHTML =`
            <img src=${data.cards[1].image} />
            `
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            messageDisplay.textContent = winnerText
            remainingCardsDisplay.textContent = data.remaining

            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if(computerScore > myScore) {
                    messageDisplay.textContent = "The Cats win the bag!"
                } else if (computerScore < myScore) {
                    messageDisplay.textContent = "Congratulations! Emma Wins!"
                } else {
                    messageDisplay.textContent = "Tied Game. Play another round?"
                }
            }
        })
        let popAudio = new Audio("audio/pop.mp3")
        popAudio.play()
})

function determineCardWinner(card1, card2) {
    const cardValuesArr = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = cardValuesArr.indexOf(card1.value)
    const card2ValueIndex = cardValuesArr.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = computerScore
        return "The Cats Win!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = myScore
        return "Emma Wins!"
    } else {
        return "WAR!"
    }
}
