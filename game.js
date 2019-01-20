/*
game.js for Perlenspiel 3.3.x
Last revision: 2018-10-14 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-18 Worcester Polytechnic Institute.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
By default, all event-handling function templates are COMMENTED OUT (using block-comment syntax), and are therefore INACTIVE.
Uncomment and add code to the event handlers required by your project.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these lines.
*/

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

var currDim = 1; //current  dimension
var currLev = 0; //current level

 var PUZZLE  = {

     GRID_SIZE: 8,

     //grid colors
     GOAL_GRID: 0x7A0ACF, //grid with goal 0
     ENEMY_GRID: 0x000000, //grid with enemy 2
     WALL_GRID: 0xFFB305, //grid with wall 1
     WALL_GRID2: 0XFF5105, //another color for grid with goal
     CURRENT_BACKGROUND: 0x7A0ACF,

     //sprite colors
     GOAL_COLOR: 0XF8FF01, //color of goal
     PLAYER_COLOR: 0X57C493, //color of player
     ENEMY_COLOR: 0XFF0000, //enemy color
     WALL_COLOR: 0X897CA1, //wall color

     playerx: 0, //player x value
     playery: 0, //player y value

     //variables for walls
     data: 0, //will hold current value in array

     gridSize: 8,

     movePlayer : function ( x, y ) //move player
     {

         let nx = PUZZLE.playerx + x;
         let ny = PUZZLE.playery + y;

         // If we are trying to move outside, the grid, abort the function
         if( ( 0 >  nx ) || ( PUZZLE.GRID_SIZE-1 <= nx )  || ( 0 > ny ) || ( PUZZLE.GRID_SIZE <= ny ) )
         {
             return;
         }

         // move the player to the desired square
         PS.color( PUZZLE.playerx, PUZZLE.playery, PUZZLE.CURRENT_BACKGROUND );
         PS.color( nx, ny, PUZZLE.PLAYER_COLOR );
         PUZZLE.playerx = nx;
         PUZZLE.playery = ny;

     },

     DrawMap : function(currDim){
        //change color of entire grif
         PS.gridColor( PUZZLE.CURRENT_BACKGROUND );
         PS.color(PS.ALL, PS.ALL, PUZZLE.CURRENT_BACKGROUND );
         PS.borderColor( PS.ALL, PS.ALL, PUZZLE.CURRENT_BACKGROUND);

         if (currDim=== 0){ //grid with goal
            PS.statusColor(PS.COLOR_WHITE); //change status color



         } else if (currDim=== 1){ //grid with wall

            PS.statusColor(PS.COLOR_BLACK); //change status color


            //draw walls based on level
            switch(currLev){
                case 0: //level 0

                    //2d array for wall positions
                    map8 = [ //1 represents where walls are going to be positioned
                        0,0,0,0,1,0,0,0,
                        0,0,0,0,1,0,0,0,
                        0,0,0,0,1,0,0,0,
                        0,0,1,0,1,0,1,0,
                        0,0,1,0,1,0,1,0,
                        0,0,1,0,2,0,1,0, //2 signifies an enemy
                        0,0,1,0,0,0,1,0,
                        0,0,1,0,0,0,1,0,
                    ];

                    //iterate through map array
                    for(curry = 0; curry < PUZZLE.gridSize; curry+=1){
                        for(currx = 0; currx < PUZZLE.gridSize; currx+= 1){
                            PUZZLE.data = map8[(curry*PUZZLE.gridSize) + currx]; //get current position in array
                            if(PUZZLE.data === 1){
                                //make the walls appear
                                PS.color(currx, curry, PUZZLE.WALL_COLOR);
                                PS.borderColor(currx, curry, PUZZLE.WALL_COLOR);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }


         } else { //grid with enemy
            PS.statusColor(PS.COLOR_WHITE); //change status color
        }
        PS.color( PUZZLE.playerx, PUZZLE.playery, PUZZLE.PLAYER_COLOR );

     }
};


PS.init = function( system, options ) {
	"use strict"; // Do not remove this directive!

    //grid size
    PS.gridSize( 8, 8 );

    //instructions
    PS.statusText( "Press Arrow Keys or Space" );

    PUZZLE.DrawMap(currLev);


};



/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.touch() event handler:

/*

PS.touch = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches
	// over a bead.
};

*/

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.release() event handler:

/*

PS.release = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

*/

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.enter() event handler:

/*

PS.enter = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

*/

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exit() event handler:

/*

PS.exit = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

*/

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exitGrid() event handler:

/*

PS.exitGrid = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

*/

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyDown() event handler:



PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	switch( key )
	{
		case PS.KEY_ARROW_UP:
		case 87:
		case 119:
		{
			PUZZLE.movePlayer( 0, -1 );
			break;
		}
		case PS.KEY_ARROW_RIGHT:
		case 83:
		case 115:
		{
			PUZZLE.movePlayer( 1, 0 );
			break;
		}
		case PS.KEY_ARROW_DOWN:
		case 65:
		case 97:
		{
			PUZZLE.movePlayer( 0, 1 );
			break;
		}
		case PS.KEY_ARROW_LEFT:
		case 68:
		case 100:
		{
			PUZZLE.movePlayer( -1, 0 );
			break;
		}
        case 32:
            switch( currLev ) {
                case 0:
                    currLev = 1;
                    PUZZLE.CURRENT_BACKGROUND = PUZZLE.WALL_GRID;
                    break;
                case 1:
                    currLev = 2;
                    PUZZLE.CURRENT_BACKGROUND = PUZZLE.ENEMY_GRID;
                    break;
                case 2:
                    currLev = 0;
                    PUZZLE.CURRENT_BACKGROUND = PUZZLE.GOAL_GRID;
                    break;
            }
            PUZZLE.DrawMap(currDim);
            break;
		default:
		{
			break;
		}
	}
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};



/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyUp() event handler:

/*

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

*/

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, an d only when the mouse cursor is positioned directly over the grid.
*/

// UNCOMMENT the following code BLOCK to expose the PS.input() event handler:

/*

PS.input = function( sensors, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

*/

/*
PS.shutdown ( options )
Called when the browser window running Perlenspiel is about to close.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: This event is generally needed only by applications utilizing networked telemetry.
*/

// UNCOMMENT the following code BLOCK to expose the PS.shutdown() event handler:

/*

PS.shutdown = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "“Dave. My mind is going. I can feel it.”\n" );

	// Add code here to tidy up when Perlenspiel is about to close.
};

*/
