// Track the state of the game, including how many players, whose turn, and if it's over
let gameState = {
    players: 2, // total players in the game
    whoseTurn: 1, // starts with Player 1
    gameOver: false // flag to track if game has ended
  };
  
  // Function triggered when Player 1 attacks Player 2
  function attackPlayerTwo() {
    // Only allow this if it's Player 1's turn and the game is not over
    if (gameState.whoseTurn !== 1 || gameState.gameOver) return;
    
    // Get the current health of Player 2
    const playerTwoHealth = document.getElementById("playerTwoHealth");
    
    // Subtract 10 from current health but keep it above 0
    let newHealth = Math.max(0, Number(playerTwoHealth.innerText) - 10);
    
    // Update the health display for Player 2
    playerTwoHealth.innerText = newHealth;
  
    // Play attack animation and sound
    animateAttack("playerOneSprite", "playerTwoSprite");
  
    // If Player 2's health is 0 or below, end the game
    if (newHealth <= 0) {
      gameOver();
      return;
    }
  
    // Otherwise, switch to Player 2's turn
    changePlayer();
  }
  
  // Function triggered when Player 2 attacks Player 1
  function attackPlayerOne() {
    // Only allow this if it's Player 2's turn and the game is not over
    if (gameState.whoseTurn !== 2 || gameState.gameOver) return;
  
    // Get the current health of Player 1
    const playerOneHealth = document.getElementById("playerOneHealth");
  
    // Subtract 10 from current health but keep it above 0
    let newHealth = Math.max(0, Number(playerOneHealth.innerText) - 10);
  
    // Update the health display for Player 1
    playerOneHealth.innerText = newHealth;
  
    // Play attack animation and sound
    animateAttack("playerTwoSprite", "playerOneSprite");
  
    // If Player 1's health is 0 or below, end the game
    if (newHealth <= 0) {
      gameOver();
      return;
    }
  
    // Otherwise, switch to Player 1's turn
    changePlayer();
  }
  
  // Function that visually handles the attack and damage animations
  function animateAttack(attackerId, defenderId) {
    // Get attacking and defending player image elements
    const attacker = document.getElementById(attackerId);
    const defender = document.getElementById(defenderId);
  
    // Get the sound effect for damage
    const sound = document.getElementById("SFX_PlayerDamage");
  
    // Change image to attack pose based on which player is attacking
    if (attackerId === "playerOneSprite") {
      attacker.src = "R_Attack.png";
    } else if (attackerId === "playerTwoSprite") {
      attacker.src = "L_Attack.png";
    }
  
    // Remove idle class and add attack/damage animations
    attacker.classList.remove("idle");
    attacker.classList.add("attack");
    defender.classList.remove("idle");
    defender.classList.add("damage");
  
    // Play the sound effect
    sound.play();
  
    // After 350ms, reset both sprites to idle pose and image
    setTimeout(() => {
      attacker.classList.remove("attack");
      attacker.classList.add("idle");
      defender.classList.remove("damage");
      defender.classList.add("idle");
  
      // Reset sprite image back to idle version
      if (attackerId === "playerOneSprite") {
        attacker.src = "R_Idle.png";
      } else if (attackerId === "playerTwoSprite") {
        attacker.src = "L_Idle.png";
      }
    }, 350);
  }
  
  // Function to switch turns between players
  function changePlayer() {
    // Toggle whose turn it is between 1 and 2
    gameState.whoseTurn = gameState.whoseTurn === 1 ? 2 : 1;
  
    // Update the UI to show whose turn it is
    document.getElementById("playerName").innerText = `Player ${gameState.whoseTurn}`;
  
    // Get both attack buttons
    const playerOneAttack = document.getElementById("playerOneAttack");
    const playerTwoAttack = document.getElementById("playerTwoAttack");
  
    // Enable Player 1 button if it's their turn, otherwise disable it
    if (gameState.whoseTurn === 1) {
      playerOneAttack.disabled = false;
      playerTwoAttack.disabled = true;
      playerOneAttack.classList.add("active");
      playerOneAttack.classList.remove("inactive");
      playerTwoAttack.classList.add("inactive");
      playerTwoAttack.classList.remove("active");
    } else {
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
    // Set the gameOver flag to true to stop gameplay
    gameState.gameOver = true;
  
    // Hide the title, turn tracker, and battle area
    document.getElementById("title").style.display = "none";
    document.getElementById("playerTurn").style.display = "none";
    document.getElementById("fightingSpace").style.display = "none";
  
    // Show the Game Over screen with winner message
    const gameOverScreen = document.getElementById("gameOverScreen");
    const winningPlayer = document.getElementById("winningPlayer");
    gameOverScreen.style.display = "flex";
    gameOverScreen.style.flexDirection = "column";
    winningPlayer.innerText = `Player ${gameState.whoseTurn} wins!`;
  
    // Display winner image depending on who won
    const winnerImage = document.createElement("img");
    winnerImage.src = gameState.whoseTurn === 1 ? "winner.png" : "winner2.png";
    winnerImage.alt = "Winner Image";
    winnerImage.style.width = "300px";
    winnerImage.style.marginTop = "20px";
    gameOverScreen.appendChild(winnerImage);
  
    // Disable both attack buttons so no one can continue playing
    document.getElementById("playerOneAttack").disabled = true;
    document.getElementById("playerTwoAttack").disabled = true;
  } 
  