//Game States
//"WIN" - Player robot has defeated all enemy robots
//  * Fight all enemy robots
//  * Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less

//Let player name their robot. Defines points player robot starts with.

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roboto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max-min+1) + min);

    return value;
}

var fight = function (enemyName) {
    //repeat and execute as long as the enemy robot is alive
    while (enemyHealth > 0 && playerHealth > 0) {
        // ask user if they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        //if player chooses to skip, confirm and stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = Math.max(0,playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        else if (promptFight === "fight" || promptFight === "FIGHT") {
        //generate random damage based on PLAYER'S ATTACK POWER
        var damage = randomNumber(playerAttack - 3, playerAttack);
        //remove enemy's health by subtracting the amount set in the playerAttack variable enemyHealth = enemyHealth - playerAttack;
        enemyHealth = Math.max(0,enemyHealth - damage);
        //Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + "." + enemyName + " now has " + enemyHealth + " health remaining."
        );

        //check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            //award player money for winning
            playerMoney = playerMoney + 20;
            //leave while() loop since enemy is DEAD
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        //random damage value based on enemyATTACK
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        // remove player's health by subtracting amount set in the enemyAttack damage variable
        playerHealth = Math.max(0, playerHealth - damage);
        //Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        //check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            //leave while() loops if player is dead
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        };
    };
};
};

//function to start a NEW game
var startGame = function () {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        //check player robot's health status
        if (playerHealth > 0) {
            //let user know what round they're in, remember that arrays start w index 0 so needs to have 1 added to it to calculate correct round number
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //pick new enemy to fight based on the index of enemyNames array
            var pickedEnemyName = enemyNames[i];
            //reset enemyHealth before starting new fight
            enemyHealth = randomNumber(40, 60);

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            //if player is still alive and we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                //ask if user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?")
                //if yes, take them to the shop() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

//function to end the entire game
var endGame = function () {
    //if player is still alive, player WINS
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle. Loser.");
    }
    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("That you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your sttack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": //new case
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                //increase health, decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money, bunny!");
            }
            break;

        case "UPGRADE": //new case
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                //increase attach, decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money honeyyyy!");
            }
            break;

        case "LEAVE": //new case
        case "leave":
            window.alert("Leaving the store");
            //do nothing, so function will END
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a valid option
            shop();
            break;
    };
};

//start the game when the page loads
startGame();