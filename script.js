let currentPlayer = 'X'
const board = ['', '', '', '', '', '', '', '', '']

$().ready(() => {
  $('#refreshButton').hide()
})

const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ]

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true
    }
  }

  return false
}

checkDraw = () => {
  return board.every(cell => cell !== '')
}

handleMove = index => {
  if (board[index] === '') {
    board[index] = currentPlayer
    document.getElementById(index.toString()).innerText = currentPlayer

    if (checkWinner()) {
      botMessage(currentPlayer + ' wins!')
      $('#refreshButton').show()
    } else if (checkDraw()) {
      botMessage("It's a draw!")
      $('#refreshButton').show()
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      botMessage("It's " + currentPlayer + "'s turn.")
    }
  }
}

resetGame = () => {
  board.fill('')
  currentPlayer = 'X'
  Array.from(document.getElementsByClassName('cell')).forEach(cell => (cell.innerText = ''))
  botMessage("Let's play Tic Tac Toe!")
  $('#refreshButton').hide()
}

document.getElementById('board').addEventListener('click', event => {
  const cellIndex = event.target.id
  handleMove(cellIndex)
})

botMessage = message => {
  document.getElementById('chatMessage').innerText = message
}
