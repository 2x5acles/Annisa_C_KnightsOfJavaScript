

// Track the state of the game, including how many players, whose turn, and if it's over
let gameState = {
    players: 2, // total players in the game
    whoseTurn: 1, // starts with Player 1
    gameOver: false // flag to track if game has ended
  };
  
  // Function triggered when Player 1 attacks Player 2
  function attackPlayerTwo() {
    // Only allow this if it's Player 1's turn and the game isn't over
    if (gameState.whoseTurn !== 1 || gameState.gameOver) return;
  
    // Grab Player 2's health element
    const playerTwoHealth = document.getElementById("playerTwoHealth");
    // Parse the number value of health and reduce by 10, ensuring it doesn't go below 0
    let newHealth = Math.max(0, Number(playerTwoHealth.innerText) - 10);
    playerTwoHealth.innerText = newHealth; // update the health visually
  
    // Trigger visual and sound effects
    animateAttack("playerOneSprite", "playerTwoSprite");
  
    // If Player 2's health drops to 0 or below, end the game
    if (newHealth <= 0) {
      gameOver();
      return;
    }
  
    // Change to Player 2's turn
    changePlayer();
  }
  
  // Function triggered when Player 2 attacks Player 1
  function attackPlayerOne() {
    // Only allow if it's Player 2's turn and game isn't over
    if (gameState.whoseTurn !== 2 || gameState.gameOver) return;
  
    // Grab Player 1's health element
    const playerOneHealth = document.getElementById("playerOneHealth");
    // Reduce Player 1's health by 10, ensuring it stays >= 0
    let newHealth = Math.max(0, Number(playerOneHealth.innerText) - 10);
    playerOneHealth.innerText = newHealth;
  
    // Trigger attack animation and sound
    animateAttack("playerTwoSprite", "playerOneSprite");
  
    // Check if Player 1 has been defeated
    if (newHealth <= 0) {
      gameOver();
      return;
    }
  
    // Change to Player 1's turn
    changePlayer();
  }
  
  // Function that visually handles the attack and damage animations
  function animateAttack(attackerId, defenderId) {
    const attacker = document.getElementById(attackerId); // attacker sprite
    const defender = document.getElementById(defenderId); // defender sprite
    const sound = document.getElementById("SFX_PlayerDamage"); // hit sound
  
    // Update classList for animation
    attacker.classList.remove("idle");
    attacker.classList.add("attack");
    defender.classList.remove("idle");
    defender.classList.add("damage");
    sound.play(); // play sound
  
    // After short delay, reset both sprites to idle state
    setTimeout(() => {
      attacker.classList.remove("attack");
      attacker.classList.add("idle");
      defender.classList.remove("damage");
      defender.classList.add("idle");
    }, 350);
  }
  
  // Function to switch turns between players
  function changePlayer() {
    // Toggle turn value
    gameState.whoseTurn = gameState.whoseTurn === 1 ? 2 : 1;
  
    // Update the text that shows whose turn it is
    document.getElementById("playerName").innerText = `Player ${gameState.whoseTurn}`;
  
    // Grab both attack buttons
    const playerOneAttack = document.getElementById("playerOneAttack");
    const playerTwoAttack = document.getElementById("playerTwoAttack");
  
    // If it's Player 1's turn...
    if (gameState.whoseTurn === 1) {
      playerOneAttack.disabled = false; // enable Player 1's attack button
      playerTwoAttack.disabled = true;  // disable Player 2's attack button
      playerOneAttack.classList.add("active");
      playerOneAttack.classList.remove("inactive");
      playerTwoAttack.classList.add("inactive");
      playerTwoAttack.classList.remove("active");
    }
    // If it's Player 2's turn...
    else {
      playerOneAttack.disabled = true;
      playerTwoAttack.disabled = false;
      playerOneAttack.classList.add("inactive");
      playerOneAttack.classList.remove("active");
      playerTwoAttack.classList.add("active");
      playerTwoAttack.classList.remove("inactive");
    }
  }
  
  // Function that displays the Game Over screen and disables both buttons
  function gameOver() {
    gameState.gameOver = true; // mark game as over
  
    // Hide title and turn indicator
    document.getElementById("title").style.display = "none";
    document.getElementById("playerTurn").style.display = "none";
  
    // Reveal game over message and winner
    const gameOverScreen = document.getElementById("gameOverScreen");
    const winningPlayer = document.getElementById("winningPlayer");
    gameOverScreen.style.display = "flex";
    gameOverScreen.style.flexDirection = "column";
    winningPlayer.innerText = `Player ${gameState.whoseTurn} wins!`;
  
    // Disable both attack buttons
    document.getElementById("playerOneAttack").disabled = true;
    document.getElementById("playerTwoAttack").disabled = true;
  }
  
  