// Track the state of the game
const gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false,
};

// --- Player Health Elements ---
const playerOneHealthEl = document.getElementById("playerOneHealth");
const playerTwoHealthEl = document.getElementById("playerTwoHealth");

// --- Player Sprite Elements ---
const playerOneSpriteEl = document.getElementById("playerOneSprite");
const playerTwoSpriteEl = document.getElementById("playerTwoSprite");

// --- Attack Button Elements ---
const playerOneAttackBtn = document.getElementById("playerOneAttack");
const playerTwoAttackBtn = document.getElementById("playerTwoAttack");

// --- Audio Element ---
const damageSfx = document.getElementById("SFX_PlayerDamage");

/**
 * Handles an attack from one player to another.
 * @param {number} attacker - The player number who is attacking (1 or 2).
 */
function attack(attacker) {
    // Exit if it's not the attacker's turn or if the game is over
    if (gameState.whoseTurn !== attacker || gameState.gameOver) {
        return;
    }

    // Determine who the defender is and which elements to use
    const isPlayerOneAttacking = attacker === 1;
    const defenderHealthEl = isPlayerOneAttacking ? playerTwoHealthEl : playerOneHealthEl;
    const attackerSpriteEl = isPlayerOneAttacking ? playerOneSpriteEl : playerTwoSpriteEl;
    const defenderSpriteEl = isPlayerOneAttacking ? playerTwoSpriteEl : playerOneSpriteEl;
    const defenderId = isPlayerOneAttacking ? "playerTwo" : "playerOne";

    // Calculate random damage
    const randomDamage = Math.floor(Math.random() * 11) + 5; // Damage between 5 and 15
    const currentHealth = Number(defenderHealthEl.innerText);
    const newHealth = Math.max(0, currentHealth - randomDamage);

    // Update health and display damage
    defenderHealthEl.innerText = newHealth;
    showDamage(defenderId, randomDamage);
    animateAttack(attackerSpriteEl, defenderSpriteEl);

    // Check for game over condition
    if (newHealth <= 0) {
        endGame();
    } else {
        changePlayer();
    }
}

/**
 * Creates a temporary popup to show the damage dealt.
 * @param {string} playerId - The ID of the player element receiving damage.
 * @param {number} damageAmount - The amount of damage.
 */
function showDamage(playerId, damageAmount) {
    const playerDiv = document.getElementById(playerId);
    if (!playerDiv) return;

    const damageText = document.createElement("div");
    damageText.className = "damage-popup";
    damageText.innerText = `-${damageAmount}`;
    playerDiv.appendChild(damageText);

    // Remove the damage text after a short delay
    setTimeout(() => {
        damageText.remove();
    }, 800);
}

/**
 * Animates the attack and damage sprites.
 * @param {HTMLElement} attackerEl - The attacker's sprite element.
 * @param {HTMLElement} defenderEl - The defender's sprite element.
 */
function animateAttack(attackerEl, defenderEl) {
    const isPlayerOneAttacking = attackerEl.id === "playerOneSprite";
    
    // Change sprite to attack animation
    attackerEl.src = isPlayerOneAttacking ? "R_Attack.png" : "L_Attack.png";
    
    // Add animation classes
    attackerEl.classList.remove("idle");
    attackerEl.classList.add("attack");
    defenderEl.classList.remove("idle");
    defenderEl.classList.add("damage");
    damageSfx.play();

    // Revert to idle animation after a delay
    setTimeout(() => {
        attackerEl.classList.remove("attack");
        attackerEl.classList.add("idle");
        defenderEl.classList.remove("damage");
        defenderEl.classList.add("idle");

        attackerEl.src = isPlayerOneAttacking ? "R_Idle.png" : "L_Idle.png";
    }, 350);
}

/**
 * Switches the turn to the next player and updates the UI.
 */
function changePlayer() {
    gameState.whoseTurn = gameState.whoseTurn === 1 ? 2 : 1;
    document.getElementById("playerName").innerText = `Player ${gameState.whoseTurn}`;

    const isPlayerOneTurn = gameState.whoseTurn === 1;

    // Toggle button disabled state and active/inactive classes
    playerOneAttackBtn.disabled = !isPlayerOneTurn;
    playerTwoAttackBtn.disabled = isPlayerOneTurn;

    playerOneAttackBtn.classList.toggle("active", isPlayerOneTurn);
    playerOneAttackBtn.classList.toggle("inactive", !isPlayerOneTurn);
    playerTwoAttackBtn.classList.toggle("active", !isPlayerOneTurn);
    playerTwoAttackBtn.classList.toggle("inactive", isPlayerOneTurn);
}

/**
 * Ends the game and displays the winner.
 */
function endGame() {
    gameState.gameOver = true;

    // Hide gameplay UI and show the game over screen
    document.getElementById("title").style.display = "none";
    document.getElementById("playerTurn").style.display = "none";
    document.getElementById("fightingSpace").style.display = "none";
    
    const gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style.display = "flex";
    
    // Display the winner's name
    document.getElementById("winningPlayer").innerText = `Player ${gameState.whoseTurn} wins!`;

    // Create and display the winner's image if it doesn't already exist
    if (!gameOverScreen.querySelector(".winner-img")) {
        const winnerImage = document.createElement("img");
        winnerImage.src = gameState.whoseTurn === 1 ? "winner.png" : "winner2.png";
        winnerImage.alt = "Winner Image";
        winnerImage.className = "winner-img";
        gameOverScreen.appendChild(winnerImage);
    }

    // Ensure both attack buttons are disabled
    playerOneAttackBtn.disabled = true;
    playerTwoAttackBtn.disabled = true;
}

// --- Event Listeners ---
// Assign the single attack function to both buttons
playerOneAttackBtn.addEventListener('click', () => attack(1));
playerTwoAttackBtn.addEventListener('click', () => attack(2));