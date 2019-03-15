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

function onBoxClick() {

    const rowIndex = this.getAttribute( 'data-row-index' );
    const colIndex = this.getAttribute( 'data-col-index' );

    let newValue = 0;

    grid[ rowIndex ][ colIndex ] = newValue;
    renderMainGrid();

    // Possible memory leak if you don't remove
    // the reference to the child node.
    addClickHandlers();
}

function addClickHandlers() {

    Array.from( document.getElementsByClassName( 'box' ) ).forEach( el => {

        el.addEventListener( 'click', onBoxClick );

    } );

}

renderMainGrid();
addClickHandlers();
