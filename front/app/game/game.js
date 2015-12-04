"use strict";

/**
 * This should work, but it doesn't and i don't know why, so there is a panda <3
 *
                              _,add8ba,
                            ,d888888888b,
                           d8888888888888b                        _,ad8ba,_
                          d888888888888888)                     ,d888888888b,
                          I8888888888888888 _________          ,8888888888888b
                __________`Y88888888888888P"""""""""""baaa,__ ,888888888888888,
            ,adP"""""""""""9888888888P""^                 ^""Y8888888888888888I
         ,a8"^           ,d888P"888P^                           ^"Y8888888888P'
       ,a8^            ,d8888'                                     ^Y8888888P'
      a88'           ,d8888P'                                        I88P"^
    ,d88'           d88888P'                                          "b,
   ,d88'           d888888'                                            `b,
  ,d88'           d888888I                                              `b,
  d88I           ,8888888'            ___                                `b,
 ,888'           d8888888          ,d88888b,              ____            `b,
 d888           ,8888888I         d88888888b,           ,d8888b,           `b
,8888           I8888888I        d8888888888I          ,88888888b           8,
I8888           88888888b       d88888888888'          8888888888b          8I
d8886           888888888       Y888888888P'           Y8888888888,        ,8b
88888b          I88888888b      `Y8888888^             `Y888888888I        d88,
Y88888b         `888888888b,      `""""^                `Y8888888P'       d888I
`888888b         88888888888b,                           `Y8888P^        d88888
 Y888888b       ,8888888888888ba,_          _______        `""^        ,d888888
 I8888888b,    ,888888888888888888ba,_     d88888888b               ,ad8888888I
 `888888888b,  I8888888888888888888888b,    ^"Y888P"^      ____.,ad88888888888I
  88888888888b,`888888888888888888888888b,     ""      ad888888888888888888888'
  8888888888888698888888888888888888888888b_,ad88ba,_,d88888888888888888888888
  88888888888888888888888888888888888888888b,`"""^ d8888888888888888888888888I
  8888888888888888888888888888888888888888888baaad888888888888888888888888888'
  Y8888888888888888888888888888888888888888888888888888888888888888888888888P
  I888888888888888888888888888888888888888888888P^  ^Y8888888888888888888888'
  `Y88888888888888888P88888888888888888888888888'     ^88888888888888888888I
   `Y8888888888888888 `8888888888888888888888888       8888888888888888888P'
    `Y888888888888888  `888888888888888888888888,     ,888888888888888888P'
     `Y88888888888888b  `88888888888888888888888I     I888888888888888888'
       "Y8888888888888b  `8888888888888888888888I     I88888888888888888'
         "Y88888888888P   `888888888888888888888b     d8888888888888888'
            ^""""""""^     `Y88888888888888888888,    888888888888888P'
                             "8888888888888888888b,   Y888888888888P^
                              `Y888888888888888888b   `Y8888888P"^
                                "Y8888888888888888P     `""""^
                                  `"YY88888888888P'
 */

/**
 * This is the game
 * @constructor
 */
var Game = function () {

    /**
     * Whether game is running
     * @type {boolean}
     * @private
     */
    this._running = false;

    /**
     * Event listeners
     * @type {Map}
     */
    this._listeners = {};

    /**
     * Canvas which display game
     * @type {Element}
     * @private
     */
    this._canvas = null;

    // Game elements
    this._spaceship = null;
    this._moveTimer = null;
    this._attackTimer = null;
    this._eAttackTimer = null;
    this._projectiles = [];
    this._eProjectiles = [];
    this._enemies = [];

    Object.defineProperty(this, "running", {
       get: function () {
           return this._running;
       }
    });

    Object.defineProperty(this, "spaceshipLeftOffset", {
        get: function () {
            return (parseInt(this._spaceship.style.left) || 0)
        }
    });
};

/**
 * Run game
 */
Game.prototype.run = function() {
    if (this._running) {
        return null;
    }

    this._life = 5;

    this._canvas = document.createElement("div");
    this._canvas.id = "game";
    document.body.appendChild(this._canvas);

    this._spaceship = document.createElement("div");
    this._spaceship.id = "spaceship";
    this._canvas.appendChild(this._spaceship);

    this._addEnemies();

    this._running = true;

    this._moveTimer = setInterval(function () {
        // move spaceship projectiles
        for (var i=0; i < this._projectiles.length; i++) {
            var projectile = this._projectiles[i],
                top = parseInt(projectile.style.top) - 5;
            if (0 > (top + 15)) {
                this._projectiles.splice(i--, 1);
                this._canvas.removeChild(projectile);
            } else {
                projectile.style.top = top;

                var px = projectile.offsetLeft,
                    py = projectile.offsetTop,
                    pl = 3,
                    ph = 15;

                // Calculate collisions
                for (var j = 0; j < this._enemies.length; j++) {
                    var enemy = this._enemies[j],
                        ex = enemy.offsetLeft,
                        ey = enemy.offsetTop,
                        es = (window.innerWidth * 0.01);

                    if (ex <= (px + pl) && (ex + es) >= px && ey <= (py + ph) && (ey + es) >= py) {
                        this._projectiles.splice(i--, 1);
                        this._canvas.removeChild(projectile);

                        this._enemies.splice(j--, 1);
                        this._canvas.removeChild(enemy);

                        if (0 === this._enemies.length) {
                            this._onVictory();
                            return;
                        }

                        break;
                    }
                }
            }
        }

        // Move enemies projectiles
        var sx = this._spaceship.offsetLeft,
            sy = this._spaceship.offsetTop,
            ss = (window.innerWidth * 0.01);

        for (var k=0; k < this._eProjectiles.length; k++) {
            var eProjectile = this._eProjectiles[k],
                eTop = eProjectile.offsetTop + 5;
            if (window.innerHeight < eTop) {
                this._eProjectiles.splice(k--, 1);
                this._canvas.removeChild(eProjectile);
            } else {
                eProjectile.style.top = eTop;

                var epx = eProjectile.offsetLeft,
                    epy = eProjectile.offsetTop,
                    epl = 3,
                    eph = 15;
                if (sx <= (epx + epl) && (sx + ss) >= epx && sy <= (epy + eph) && (sy + ss) >= epy) {
                    this._eProjectiles.splice(k--, 1);
                    this._canvas.removeChild(eProjectile);
                    this._life--;

                    if (0 >= this._life) {
                        this._onDefeat();
                        return;
                    }
                }
            }
        }
    }.bind(this), 50);

    this._attackTimer = setInterval(function () {

        // Send spaceship projectiles
        var left = Math.round(this.spaceshipLeftOffset + ((window.innerWidth * 0.01) / 2)) - 1,
            projectile = document.createElement("div");

        projectile.className = "projectile";
        projectile.style.left = left;
        projectile.style.top = window.innerHeight - (window.innerWidth * 0.035);
        this._canvas.appendChild(projectile);
        this._projectiles.push(projectile);
    }.bind(this), 500);

    this._eAttackTimer = setInterval(function () {
        // Send enemy projectiles
        for (var i=0; i < this._enemies.length; i++) {
            var enemy = this._enemies[i],
                canFire = Math.random() < 0.08;

            if (canFire) {
                var eLeft = enemy.offsetLeft + (window.innerWidth * 0.01 / 2),
                    eProjectile = document.createElement("div");

                eProjectile.className = "projectile ep";
                eProjectile.style.left = eLeft;
                eProjectile.style.top = window.innerWidth * 0.025;
                this._canvas.appendChild(eProjectile);
                this._eProjectiles.push(eProjectile);
            }
        }
    }.bind(this), 400)
};


/**
 * Stop game
 */
Game.prototype.stop = function () {
    clearInterval(this._moveTimer);
    clearInterval(this._attackTimer);
    clearInterval(this._eAttackTimer);

    while (this._projectiles.length) {
        this._canvas.removeChild(this._projectiles[0]);
        this._projectiles.splice(0, 1);
    }

    while (this._eProjectiles.length) {
        this._canvas.removeChild(this._eProjectiles[0]);
        this._eProjectiles.splice(0, 1);
    }

    while (this._enemies.length) {
        this._canvas.removeChild(this._enemies[0]);
        this._enemies.splice(0, 1);
    }

    if (this._canvas.hasChildNodes()) {
        this._canvas.removeChild(this._spaceship);
    }

    document.body.removeChild(this._canvas);
    this._running = false;
};

/**
 * Add enemies
 * @private
 */
Game.prototype._addEnemies = function () {
    for (var i=1; i < 100; i+=2) {
        var left = (window.innerWidth / 100) * i - (window.innerWidth / 100) * 0.5,
            enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.style.left = left;
        this._canvas.appendChild(enemy);
        this._enemies.push(enemy);
    }
};


/**
 * Player has won
 * @private
 */
Game.prototype._onVictory = function () {
    this.stop();
    this._emit("victory", 1);
};

/**
 * Player has lost
 * @private
 */
Game.prototype._onDefeat = function () {
    this.stop();
    this._emit("defeat", 0);
};

/**
 * Trigger an action
 * @param key
 */
Game.prototype.triggerAction = function(key) {
    if (!this._running) {
        return null;
    }

    var left = this.spaceshipLeftOffset;
    if (37 === key) {
        left -= (window.innerWidth / 100);
        this._spaceship.style.left = left < 0 ? 0 : left;
    } else if (39 === key) {
        left += (window.innerWidth / 100);
        this._spaceship.style.left = left > (window.innerWidth * 0.99) ? (window.innerWidth * 0.99) : left;
    }
};

/**
 * Register event listener
 */
Game.prototype.on = function(event, listener) {
    if (!this._listeners.hasOwnProperty(event)) {
        this._listeners[event] = [];
    }
    this._listeners[event].push(listener);
};

/**
 * Register event listener
 */
Game.prototype._emit = function(event) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (this._listeners.hasOwnProperty(event)) {
        this._listeners[event].forEach(function (e) {
            e.apply(null, args);
        });
    }
};

(function () {

    window.game = new Game();

    /*game.on("defeat", function (level) {
        console.log("defeat");
        console.log(level);
    });

    game.on("victory", function (level) {
        console.log("victory");
        console.log(level);
    });*/

    //game.run();

    /**
     * Konami Code listener
     */
    var onKonamiCode = function () {
        game.run();
    };


    var keySequence = [],
        konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];

    document.addEventListener("keydown", function (e) {
        if (game.running) {
            game.triggerAction(e.keyCode);
            return;
        }
        keySequence.push(e.keyCode);

        if (konamiCode.length < keySequence.length) {
            keySequence.shift(); // remove first item of the array
        }

        if (konamiCode.toString() === keySequence.toString()) {
            onKonamiCode();
        }
    });
})();