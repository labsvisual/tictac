/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
*
*/

const GRID_LENGTH = 3;
const grid = new Array( GRID_LENGTH ).fill( -1 ).map( el => new Array( GRID_LENGTH ).fill( -1 ) );

function getRowBoxes( colIndex ) {

    const rowDivs = [];

    const renderRow = ( { colIndex, rowIndex, additionalClass, content } ) => (
        `<div data-col-index="${ colIndex }" data-row-index="${ rowIndex }" ` +
        `class="${ [ 'box', additionalClass ].join( ' ' ) }">` +
        `${ content }</div>`
    );

    for ( let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++ ) {

        const additionalClass = ( colIndex + rowIndex ) % 2 === 0 ? 'light-background' : 'dark-background';
        const boxValue = grid[ rowIndex ][ colIndex ];

        const content = `<span class="cross">${
            boxValue === 0 ? 'X' :
                boxValue === 1 ? 'O' : ''
        }</span>`;

        rowDivs.push( renderRow( { colIndex, rowIndex, additionalClass, content } ) );
    }

    return rowDivs.join( '' );

}

function getColumns() {

    const columnDivs = [];

    for ( let colIndex = 0; colIndex < GRID_LENGTH; colIndex++ ) {

        columnDivs.push( `<div class="row-style">${ getRowBoxes( colIndex ) }</div>` );

    }

    return columnDivs.join( '' );
}

function renderMainGrid() {

    const parent = document.getElementById( 'grid' );
    const columnsNode = document.createElement( 'div' );

    columnsNode.className = 'columns-style';
    columnsNode.innerHTML = getColumns();

    // If you are recursively adding event listeners, it's better
    // to remove either the root object (child nodes) and/or the
    // the child node.

    const innerGrid = parent.childNodes[ 0 ];

    if ( innerGrid ) {

        innerGrid.removeEventListener( 'click', onBoxClick );

    }

    parent.removeChild( innerGrid || null );
    parent.appendChild( columnsNode );

}

let currentMoves = 0;
const currentMoveSet = [];

function isValidMove( row, col ) {

    for ( let i = 0; i < currentMoveSet.length; i++ ) {

        const [ rowInSet, colInSet ] = currentMoveSet[ i ];
        if ( rowInSet === row && colInSet === col ) {

            return false;

        }

    }

    return true;

}
//  R,C
// (0,0) (0,1) (0,2)
// (1,0) (1,1) (1,2)
// (2,0) (2,1) (2,2)

function checkWin() {

    console.clear();

    const winningMatrix = [

        // Horizontals
        [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ],
        [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ],
        [ [ 2, 0 ], [ 2, 1 ], [ 2, 2 ] ],

        // Verticals
        [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ],
        [ [ 0, 1 ], [ 1, 1 ], [ 2, 1 ] ],
        [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ] ],

        // Diagonals
        [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ] ],
        [ [ 0, 2 ], [ 1, 1 ], [ 2, 0 ] ]

    ];

    let winner = -1;
    [ 0, 1 ].forEach( player => {

        winningMatrix.forEach( matrix => {

            let didWin = true;

            matrix.forEach( ( [ row, col ] ) => {

                console.log( 'Checking at row %d, col %d', row, col );
                didWin &= grid[ row ][ col ] === player;
                console.log( 'For player %d, (%s)', player, !!didWin );
                console.log( 'Looking for %s but got %s', player, grid[ row ][ col ] );
                console.log( '\r\n' );

            } );

            if ( didWin ) {

                winner = player;
                return;

            }

        } );

    } );

    return winner;

}

function onBoxClick() {

    const rowIndex = this.getAttribute( 'data-row-index' );
    const colIndex = this.getAttribute( 'data-col-index' );

    if ( isValidMove( rowIndex, colIndex ) ) {

        grid[ rowIndex ][ colIndex ] = 0;

        currentMoves++;
        currentMoveSet.push( [ rowIndex, colIndex ] );

        if ( checkWin() === 0 ) {

            alert( 'You won! The game will now reload.' );
            window.location.reload();

        }

        renderMainGrid();

        // Possible memory leak if you don't remove
        // the reference to the child node.
        addClickHandlers();

    }

}

function addClickHandlers() {

    if ( currentMoves === 9 ) {

        alert( 'No one won! The game will reload.' );
        window.location.reload();

    }

    Array.from( document.getElementsByClassName( 'box' ) ).forEach( el => {

        el.addEventListener( 'click', onBoxClick );

    } );

}

renderMainGrid();
addClickHandlers();
