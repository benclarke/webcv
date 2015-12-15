// game engine

//original code from Udacity Front End Developer Nanodegree Project 3

var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 1300;
    canvas.height = 700;
    canvas.tabIndex = 1;

    var wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.setAttribute('id', 'wrapper');
    doc.body.appendChild(wrapper);
    wrapper.appendChild(canvas);

    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;


        update(dt);
        render();

        lastTime = now;


        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        createCharacters();
        main();
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {

        addEnemies(dt);

        allPieces.forEach(function(piece) {
            piece.update(dt);
        });

        addedEnemies.forEach(function(piece) {
            piece.update(dt);
        });

        player.update(dt);
    }

    function render(dt) {

        //draw the gameboard
        ctx.drawImage(Resources.get('images/gameboard-flag.jpg'), 0, offsetY ) ;

        renderEntities();


    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
         allPieces.forEach(function(piece) {
            piece.render();
         });

        addedEnemies.forEach(function(piece) {
            piece.render();
        });

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/ben-carson.png',
        'images/jeb-bush.png',
        'images/marco-rubio.png',
        'images/carly-fiorina.png',
        'images/ted-cruz.png',
        'images/enemy-trump.png',
        'images/enemy-nut.png',
        'images/enemy-nut-b.png',
        'images/enemy-hillary-right.png',
        'images/enemy-hillary-left.png',
        'images/enemy-romney.png',
        'images/enemy-skeleton-red.png',
        'images/enemy-skeleton-red-hit.png',
        'images/enemy-skeleton-black.png',
        'images/enemy-skeleton-black-hit.png',
        'images/enemy-gaffe.png',
        'images/enemy-gaffe-hit.png',
        'images/setup-screen.jpg',
        'images/go-button.jpg',
        'images/gameboard.jpg',
        'images/gameboard-flag.jpg',
        'images/goodie-koch.png',
        'images/goodie-koch-hit.png',
        'images/goodie-uscc.png',
        'images/goodie-uscc-hit.png',
        'images/goodie-disaster.png',
        'images/goodie-cash-hit.png',
        'images/goodie-inflame.png',
        'images/enemy-bill.png',
        'images/blank-piece.png',
        'images/jeb-bush-selected.png',
        'images/marco-rubio-selected.png',
        'images/ted-cruz-selected.png',
        'images/carly-fiorina-selected.png',
        'images/ben-carson-selected.png',
        'images/go-button-deselected.png',
        'images/gameover.png',
        'images/playAgain.png',
        'images/youWin.png',
        'images/goodie-reagan.png',
        'images/back-button.png',
        'images/info-page.jpg',
        'images/info-button.png'
    ]);

    Resources.onReady(setup);

    function setup() {

        // display set up / intro overlay on Resource load

        function drawPlayers(go) {
            ctx.drawImage(Resources.get('images/setup-screen.jpg'), 0, 0);
            ctx.drawImage(Resources.get('images/go-button-deselected.png'), 750, 460);
            ctx.drawImage(Resources.get('images/ben-carson.png'), 510, 240);
            ctx.drawImage(Resources.get('images/ted-cruz.png'), 660, 240);
            ctx.drawImage(Resources.get('images/carly-fiorina.png'), 820, 240);
            ctx.drawImage(Resources.get('images/marco-rubio.png'), 980, 240);
            ctx.drawImage(Resources.get('images/jeb-bush.png'), 1150, 240, 100, 150);
            ctx.drawImage(Resources.get('images/info-button.png'), 1000, 480);

            if (go === true) {
                ctx.drawImage(Resources.get('images/go-button.jpg'), 750, 460);
                document.getElementById('wrapper').addEventListener('click', startGame);
            }
        }
        drawPlayers();

        document.getElementById('wrapper').addEventListener('click', setPlayer);

        function setPlayer() {
            if (event.clientY > 480 && event.clientY < 510) {
                if (event.clientX > 1000  && event.clientX < 1150) {
                    document.getElementById('wrapper').removeEventListener('click', setPlayer);
                    ctx.drawImage(Resources.get('images/info-page.jpg'), 0 , 0);
                    ctx.drawImage(Resources.get('images/back-button.png'), 1100, 510);
                    document.getElementById('wrapper').addEventListener('click', goBack);
                    function goBack() {
                        drawPlayers();
                        document.getElementById('wrapper').removeEventListener('click', goBack);
                        document.getElementById('wrapper').addEventListener('click', setPlayer);
                    }
                }
            }
            if (event.clientY > 250 && event.clientY < 425) {
                if (event.clientX > 1150) {
                    player = new JebBush();
                    drawPlayers(true);
                    ctx.drawImage(Resources.get('images/jeb-bush-selected.png'), 1150, 240, 100, 150);
                }
                else if (event.clientX > 980) {
                    player = new MarcoRubio();
                    drawPlayers(true);
                    ctx.drawImage(Resources.get('images/marco-rubio-selected.png'), 980, 240);
                }
                else if (event.clientX > 820) {
                    player = new CarlyFiorina();
                    drawPlayers(true);
                    ctx.drawImage(Resources.get('images/carly-fiorina-selected.png'), 820, 240);
                }
                else if (event.clientX > 660) {
                    player = new TedCruz();
                    drawPlayers(true);
                    ctx.drawImage(Resources.get('images/ted-cruz-selected.png'), 660, 240);

                }
                else if (event.clientX > 510) {
                    player = new BenCarson();
                    drawPlayers(true);
                    ctx.drawImage(Resources.get('images/ben-carson-selected.png'), 510, 240);
                }

            }
        }
        function startGame() {
            if (event.clientX >= 750 && event.clientX <= 950){
                if (event.clientY >= 460 && event.clientY <= 530) {
                    document.getElementById('wrapper').removeEventListener('click', setPlayer);
                    init();
                }
            }
        }
    }

    global.ctx = ctx;
})(this);
