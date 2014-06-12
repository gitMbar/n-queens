/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  var searchNext = function(depth, board){
    //board.togglePiece(depth, column)
    //debugger
    depth++;
      //for loop
    for( var i=0; i < n; i++){
      //always toggle piece
      board.togglePiece(depth, i);
      //check for conflicts
      if(board.hasAnyRooksConflicts()){
        board.togglePiece(depth, i);
      } else {
      //find solutions
        if(depth === n-1){
          solutionCount++;
          board.togglePiece(depth, i);
        } else {
          searchNext(depth, board);
          board.togglePiece(depth, i);
        }
      }
    }

  };

  var board = new Board({n:n});

  searchNext(-1, board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  if(n === 0){
    return 1;
  }

  var searchNext = function(depth, board){
    //board.togglePiece(depth, column)
    //debugger
    depth++;
      //for loop
    for( var i=0; i < n; i++){
      //always toggle piece
      board.togglePiece(depth, i);
      //check for conflicts
      if(board.hasAnyQueensConflicts()){
        board.togglePiece(depth, i);
      } else {
      //find solutions
        if(depth === n-1){
          solutionCount++;
          board.togglePiece(depth, i);
        } else {
          searchNext(depth, board);
          board.togglePiece(depth, i);
        }
      }
    }

  };

  var board = new Board({n:n});

  searchNext(-1, board);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
