var squares = document.getElementsByClassName("square");
var letters = document.getElementsByClassName("letter");
var vsComp = document.getElementById("vsComp");
var pvp = document.getElementById("vsPlayer");
var reset = document.getElementById("reset");
var X = "X";
var O = "O";
var gameWon = 0;
var grid = [["","",""],["","",""],["","",""]];

var rows = [ [letters[0], letters[1], letters[2]],
			 [letters[3], letters[4], letters[5]],
			 [letters[6], letters[7], letters[8]] ];

var columns = [ [letters[0], letters[3], letters[6]],
			    [letters[1], letters[4], letters[7]],
			    [letters[2], letters[5], letters[8]] ];


$(pvp).click(function(){
	start();
	swal({
		title: "P1 Vs P2",
		button: "Begin!"
	})
	var i = 0;
	for(i = 0; i < squares.length; i++){
		(function(sq){
			$(squares[sq]).click(function(){
				if(i === 0 || i % 2 === 0){
					$(letters[sq]).text(O);
					$(squares[sq]).css({pointerEvents: "none"});
				}else{
					$(letters[sq]).text(X);
					$(squares[sq]).css({pointerEvents: "none"});
				}
				check();
				i++;
			});
		})(i)
	}
})

$(vsComp).click(function(){
	start();
	swal({
		title: "X or O?",
		buttons: {
			X: true,
			O: true,
		},
	})
	.then(function(val){
		switch(val){
			case "X":
			for(i = 0; i < squares.length; i++){
				(function(sq){
					$(squares[sq]).click(function(){
						$(letters[sq]).text(X);
						$(squares[sq]).css({pointerEvents: "none"});
						check();
						if(gameWon > 0){
							return;
						}else{
							compTurnO();
						}
					})
				})(i)
			}
			break;

			case "O":
			compTurnX();
			for(i = 0; i < squares.length; i++){
				(function(sq){
					$(squares[sq]).click(function(){
						$(letters[sq]).text(O);
						$(squares[sq]).css({pointerEvents: "none"});
						check();
						if(gameWon > 0){
							return;
						}else{
							compTurnX();
						}
					})
				})(i)
			}
		}
	})
});

$(reset).click(function(){
	location.reload();
})

function start(){
	$(reset).css("visibility", "visible");
	$(vsComp).prop("disabled", true);
	$(pvp).prop("disabled", true);
	$(squares).css({pointerEvents: "auto"});	
}

function checkRows(){
	for(i = 0; i < grid.length; i++){
		for(j = 0; j < 3; j++){
			grid[i][j] = rows[i][j].textContent
			if(grid[i][j]){
				if($(rows[i][0]).text() === $(rows[i][1]).text() &&
				   $(rows[i][1]).text() === $(rows[i][2]).text()){
					if(rows[i][0].textContent === X){
						gameWon++;
						xWins();
					}else{
						gameWon++;
						oWins();
					}
				}
			}
		}
	}
}

function checkColumns(){
	for(i = 0; i < grid.length; i++){
		for(j = 0; j < 3; j++){
			grid[i][j] = columns[i][j].textContent
			if(grid[i][j]){
				if($(columns[i][0]).text() === $(columns[i][1]).text() &&
				   $(columns[i][1]).text() === $(columns[i][2]).text()){
					if(columns[i][0].textContent === X){
						gameWon++;
						xWins();
					}else{
						gameWon++;
						oWins();
					}
				}
			}
		}
	}
}

function checkDiag(){
	for(i = 0; i < grid.length; i++){
		for(j = 0; j < 3; j++){
			grid[i][j] = rows[i][j].textContent
			if(grid[i][j]){
				if( $(rows[0][0]).text() === $(rows[1][1]).text() &&
				    $(rows[1][1]).text() === $(rows[2][2]).text() ||
				    
				    $(rows[0][2]).text() === $(rows[1][1]).text() &&
				    $(rows[1][1]).text() === $(rows[2][0]).text() ){
					if(rows[1][1].textContent === X){
						gameWon++;
						xWins();
					}else if(rows[1][1].textContent === O){
						gameWon++;
						oWins();
					}
				}
			}
		}
	}
}

function check(){
	checkRows();
	checkColumns();
	checkDiag();
}

function xWins(){
	swal({
		title: "X Wins!!",
		button: "Play Again?"
	})
	.then(function(val){
		location.reload();
	})
}

function oWins(){
	swal({
		title: "O Wins!!",
		button: "Play Again?"
	})
	.then(function(val){
		location.reload();
	})
}

function compTurnO(){
	var interval = setInterval(function(){
		var random = Math.floor(Math.random()*9);
		if($(letters[random]).text().length === 0){
			$(letters[random]).text(O);
			$(squares[random]).css({pointerEvents: "none"});
			check();
			clearInterval(interval);
		}
	}, 50);
}

function compTurnX(){
	var interval = setInterval(function(){
		var random = Math.floor(Math.random()*9);
		if($(letters[random]).text().length === 0){
			$(letters[random]).text(X);
			$(squares[random]).css({pointerEvents: "none"});
			check();
			clearInterval(interval);
		}
	}, 50);
}