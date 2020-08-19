//Game States
//"WIN" - Player robot has defeated all enemy robots
//  * Fight all enemy robots
//  * Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less

//function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

//FIGHT or SKIP Function
var fightOrSkip = function() {
    //ask user if they'd like to fight or skip using function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    //conditional recursive function call
    //if the 'promptFight' is NOT a valid value, then execute the following statements.
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.")
        return fightOrSkip();
    }

    //if user picks "skip", confirm, and stop the loop
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        //confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");
        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            //return true if user wants to leave
            return true;
        }
    }
    return false;
}

//FIGHT Function
var fight = function(enemy) {
    //repeat and execute as long as the enemy robot is alive
    while (enemy.health > 0 && playerInfo.health > 0) {
            //ask user if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                //if true, leave fight by breaking loop
                break;
            }
            //generate random damage based on PLAYER'S ATTACK POWER
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            //remove enemy's health by subtracting the amount set in the playerInfo.attack variable enemy.health = enemy.health - playerInfo.attack;
            enemy.health = Math.max(0, enemy.health - damage);
            //Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + "." + enemy.name + " now has " + enemy.health + " health remaining."
            );

            //check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                //award player money for winning
                playerInfo.money = playerInfo.money + 20;
                //leave while() loop since enemy is DEAD
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            //random damage value based on enemy.attack
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            // remove player's health by subtracting amount set in the enemy.attack damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            //Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                //leave while() loops if player is dead
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            };
        };
    };

//function to start a NEW game
var startGame = function () {
    //reset player stats
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        //check player robot's health status
        if (playerInfo.health > 0) {
            //let user know what round they're in, remember that arrays start w index 0 so needs to have 1 added to it to calculate correct round number
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //pick new enemy to fight based on the index of enemy.names array
            var pickedEnemyObj = enemyInfo[i];
            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            //if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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
            playerInfo.refillHealth();
            break;
        case "UPGRADE": //new case
        case "upgrade":
            playerInfo.upgradeAttack();
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

//Let player name their robot. Must enter valid name.
//function to SET PLAYER ROBOT NAME
    var getPlayerName = function() {
        var name = "";
        while (name === "" || name === null) {
            name = prompt("What is your robot's name?");
        }
        console.log("Your robot's name is " + name);
        return name;
    }
    
// GAME INFO / VARIABLES

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >=7) {
            window.alert("Refilling player's health by 20 for $7.");
            this.health +=20;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money, honey!");
        }
    },
    upgradeAttack: function() {
        if (this.money >=7) {
            window.alert("Upgrading player's attack by 6 for $7.");
            this.attack +=6;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money, bunny!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

//start the game when the page loads
startGame();