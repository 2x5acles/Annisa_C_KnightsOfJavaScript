// Track the state of the game, including how many players, whose turn, and if it's over
let gameState = {
    players: 2, // total players in the game
    whoseTurn: 1, // starts with Player 1
    gameOver: false // flag to track if game has ended
  };
  
  // Function triggered when Player 1 attacks Player 2
  function attackPlayerTwo() {
    if (gameState.whoseTurn !== 1 || gameState.gameOver) return;
    const playerTwoHealth = document.getElementById("playerTwoHealth");
    const randomDamage = Math.floor(Math.random() * 11) + 5;
    let newHealth = Math.max(0, Number(playerTwoHealth.innerText) - randomDamage);
    playerTwoHealth.innerText = newHealth;
  
    // Show damage popup
    showDamage("playerTwo", randomDamage);
  
    animateAttack("playerOneSprite", "playerTwoSprite");
    if (newHealth <= 0) {
      gameOver();
      return;
    }
    changePlayer();
  }
  
  // Function triggered when Player 2 attacks Player 1
  function attackPlayerOne() {
    if (gameState.whoseTurn !== 2 || gameState.gameOver) return;
    const playerOneHealth = document.getElementById("playerOneHealth");
    const randomDamage = Math.floor(Math.random() * 11) + 5;
    let newHealth = Math.max(0, Number(playerOneHealth.innerText) - randomDamage);
    playerOneHealth.innerText = newHealth;
  
    // Show damage popup
    showDamage("playerOne", randomDamage);
  
    animateAttack("playerTwoSprite", "playerOneSprite");
    if (newHealth <= 0) {
      gameOver();
      return;
    }
    changePlayer();
  }
  
  // Function to display damage popup text above the player
  function showDamage(playerId, damageAmount) {
    const playerDiv = document.getElementById(playerId);
    const damageText = document.createElement("div");
    damageText.className = "damage-popup";
    damageText.innerText = `-${damageAmount}`;
    playerDiv.appendChild(damageText);
  
    setTimeout(() => {
      playerDiv.removeChild(damageText);
    }, 800);
  }
  
  // Function that visually handles the attack and damage animations
  function animateAttack(attackerId, defenderId) {
    const attacker = document.getElementById(attackerId);
    const defender = document.getElementById(defenderId);
    const sound = document.getElementById("SFX_PlayerDamage");
  
    if (attackerId === "playerOneSprite") {
      attacker.src = "R_Attack.png";
    } else if (attackerId === "playerTwoSprite") {
      attacker.src = "L_Attack.png";
    }
  
    attacker.classList.remove("idle");
    attacker.classList.add("attack");
    defender.classList.remove("idle");
    defender.classList.add("damage");
    sound.play();
  
    setTimeout(() => {
      attacker.classList.remove("attack");
      attacker.classList.add("idle");
      defender.classList.remove("damage");
      defender.classList.add("idle");
  
      if (attackerId === "playerOneSprite") {
        attacker.src = "R_Idle.png";
      } else if (attackerId === "playerTwoSprite") {
        attacker.src = "L_Idle.png";
      }
    }, 350);
  }
  
  // Function to switch turns between players
  function changePlayer() {
    gameState.whoseTurn = gameState.whoseTurn === 1 ? 2 : 1;
    document.getElementById("playerName").innerText = `Player ${gameState.whoseTurn}`;
    const playerOneAttack = document.getElementById("playerOneAttack");
    const playerTwoAttack = document.getElementById("playerTwoAttack");
  
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
    gameState.gameOver = true;
    document.getElementById("title").style.display = "none";
    document.getElementById("playerTurn").style.display = "none";
    document.getElementById("fightingSpace").style.display = "none";
    const gameOverScreen = document.getElementById("gameOverScreen");
    const winningPlayer = document.getElementById("winningPlayer");
    gameOverScreen.style.display = "flex";
    gameOverScreen.style.flexDirection = "column";
    winningPlayer.innerText = `Player ${gameState.whoseTurn} wins!`;
    const winnerImage = document.createElement("img");
    winnerImage.src = gameState.whoseTurn === 1 ? "winner.png" : "winner2.png";
    winnerImage.alt = "Winner Image";
    winnerImage.style.width = "300px";
    winnerImage.style.marginTop = "20px";
    gameOverScreen.appendChild(winnerImage);
    document.getElementById("playerOneAttack").disabled = true;
    document.getElementById("playerTwoAttack").disabled = true;
  } 
  