new Vue({
    el: '#app',
    data: {
        gamePlaying: false,
        activePlayerO: true,
        showWinner: false,
        state: {},
        wins: {O: 0, X: 0}
    },
    methods: {
        checkActiveO() {
            return this.activePlayerO && this.gamePlaying? 'player--active' : null; 
        },
        checkActiveX() {
            return !this.activePlayerO && this.gamePlaying? 'player--active' : null; 
        },
        move(event) {
            if (this.gamePlaying) {
                const activePlayer = this.activePlayerO? 'O' : 'X';
                const turn = this.activePlayerO? 'radio-unchecked' : 'cross';
                const icon = `
                    <i class="icon-big icon-${turn}"></i>
                `;
                const elTest = event.target.closest('.box');
                if (elTest) {
                    const el = elTest.className.split(' ')[1];
                    if (!this.state[el]) {
                        this.state[el] = icon;
                        this.addMove(activePlayer, el.split('')[3]);
                        this.checkWin(activePlayer);
                        this.checkDraw();
                        this.activePlayerO = !this.activePlayerO;
                    }
                }
                // console.log(this.state);
            }
        },
        newGame() {
            this.startGame();
        },
        startGame() {
            this.activePlayerO = true;
            this.gamePlaying = true;
            this.state = {};
            this.state.X = [];
            this.state.O = [];
            this.state.winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
            this.state.winner = '';
            this.showWinner = false;
        },
        addMove(activePlayer, squareNo) {
            this.state[activePlayer].push(squareNo);
        },
        checkWin(activePlayer) {
            const moves = (this.state[activePlayer].sort((a,b) => a-b)).join('');
            this.state.winCombos.forEach(cur => {
                const replaceRegex = `.*${cur[0]}.*${cur[1]}.*${cur[2]}.*`;
                const regexWin = new RegExp(replaceRegex);
                const result = regexWin.test(moves);
                if (result) {
                    this.state.winner = `player ${activePlayer} wins!!!`
                    this.showWinner = true;
                    this.gamePlaying = false;
                    this.wins[activePlayer]++;
                }
            });
        },
        checkDraw() {
            if (this.state.X.length + this.state.O.length == 9 && this.state.winner == '') {
                this.state.winner = 'draw';
                this.showWinner = true;
                this.gamePlaying = false;
            }
        },
        resetWins() {
            this.wins = {O:0,X:0};
        }
    }
}); 