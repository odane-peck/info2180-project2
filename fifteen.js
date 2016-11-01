var puzzlearea;
var squares;
var shufflebutton;
var validMoves=[];
var emptySpaceX = '300px'; // Initial values for the empty space
var emptySpaceY = '300px';

window.onload = function()
{
	puzzlearea = document.getElementById("puzzlearea");
	squares = puzzlearea.getElementsByTagName("div");
	shufflebutton = document.getElementById("shufflebutton");
	
	initializeGrid();
	shufflebutton.onclick = shufflePieces;
	
	// Used to initialize the validMoves array with possible moves
	calcValidMoves();
}

// Used to initialize the grid when the game first starts
function initializeGrid()
{
	// This for-loop arranges the numbers into a puzzle grid and 
	// attaches event-handler functions to make the game logic work
	for (var i=0; i<squares.length; i++)
	{
		// Assigns the puzzlepiece css class styling to each of the pieces 
		squares[i].className = "puzzlepiece";

		// Used to arrange the pieces into a grid formation
		squares[i].style.left = (i % 4 * 100) + "px";
		squares[i].style.top = (parseInt(i / 4) * 100) + "px";

		// Evaluates to "-XXX px -YYY px" to position the image on the squares using X and Y coordinates
		squares[i].style.backgroundPosition = "-" + squares[i].style.left + " " + "-" + squares[i].style.top;
		
		
		// Assignment of event-handler functions to each of the pieces

		// Used to move a piece if it can be moved when clicked
		squares[i].onclick = function()
		{
			// Code to check if the piece can be moved
			if (isValidMove(this.style.left, this.style.top))
			{
				switchPieces(parseInt(this.innerHTML-1));

				// Resets and updates the validMoves array each time 
				// a piece is moved with new possible valid moves
				calcValidMoves();
			}
			
		}

		// Used to show the user if a piece can be moved when hovered
		// by changing the colour of the piece
		squares[i].onmouseover = function()
		{
			// Code to check if the piece can be moved
			if (isValidMove(this.style.left, this.style.top))
			{
				this.classList.add("movablepiece");
			}
			
		}

		// Used to revert the colour of the piece back to default 
		// when the user's cursor leaves the piece
		squares[i].onmouseout = function()
		{
			this.classList.remove("movablepiece");
		}
	}
}

// Function used to shuffle pieces on the grid when called
function shufflePieces() 
{
	var rndNum;
	
	// This loop moves the pieces randomly 250 times when executed
	for (var i = 0; i < 250; i++) 
	{
		// Used to randomly select a piece to move from the valid moves array
		rndNum = Math.floor(Math.random() * validMoves.length);

		// Searches through the puzzle pieces array for the randomly selected piece above to move.
		// It searches based on the piece's X and Y coordinates through the puzzle pieces array.
		// When the correct piece is found, this for loop terminates and it goes back into the main 
		// for loop for another iteration until it completes enough random movements
		for (var x = 0; x < squares.length; x++)
		{
			if ((validMoves[rndNum][0] === parseInt(squares[x].style.left)) 
				&& (validMoves[rndNum][1] === parseInt(squares[x].style.top)))
			{
				// When the piece is found, it is moved and the valid moves are
				// recalculated for another iteration of randomly selected movements
				switchPieces(parseInt(squares[x].innerHTML-1));
				calcValidMoves();
				break; // Terminates this for loop when the piece has been moved
			}
		}
	}
}

// This switches the pieces by swapping the X and Y coordinates 
// between the empty space and the puzzle piece passed as an argument
function switchPieces(puzzlePiece)
{
	// Swap X positions
	var temp = squares[puzzlePiece].style.left;
	squares[puzzlePiece].style.left = emptySpaceX;
	emptySpaceX = temp;

	// Swap Y positions
	temp = squares[puzzlePiece].style.top;
	squares[puzzlePiece].style.top = emptySpaceY;
	emptySpaceY = temp;
}

// Checks in a clockwise manner for all the valid moves
// in relation to the position of the empty space and
// stores the valid moves' X and Y coordinates in the
// validMoves array for later use in the game
function calcValidMoves()
{
	// Converted the position of the empty space variables
	// to integers to be able to easily manipulate them later
	tempX = parseInt(emptySpaceX);
	tempY = parseInt(emptySpaceY);

	// Resets the array and clears the previous valid moves
	validMoves = [];

	// Check Up
	// Check if there's a piece above the empty space
	if (tempY != 0)
	{
		validMoves.push([tempX, tempY - 100]);
	}

	// Check Right
	// Check if there's a piece to the right of the empty space
	if (tempX != 300)
	{
		validMoves.push([tempX + 100, tempY]);
	}

	// Check Down 
	// Checks if there's a piece below the empty space
	if (tempY != 300)
	{
		validMoves.push([tempX, tempY + 100]);
	}

	// Check Left
	// Checks if there's a piece to the left of the empty space
	if (tempX != 0)
	{
		validMoves.push([tempX - 100, tempY]);
	}
}

// Checks the validMoves array for the puzzle piece's X and Y position passed 
// as an argument and sees if the piece is a valid move then returns true or false
function isValidMove(pieceX, pieceY)
{
	pieceX = parseInt(pieceX);
	pieceY = parseInt(pieceY);

	for (var i = 0; i < validMoves.length; i++)
	{
		if ((validMoves[i][0] === pieceX) && (validMoves[i][1] === pieceY))
		{
			return true;
		}
	}
	return false;	
}