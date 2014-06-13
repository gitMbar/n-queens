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
  var solutionCount = 0; //fixme
  var solution = new Board({n:n});


  var makeArray = function(obj){
    var results = [];
    for(var i = 0; i < n; i++){
      results.push(obj.rows()[i]);
    }
    return results;
  };
  solution = makeArray(solution);

  var searchNext = function(depth, board){
    //board.togglePiece(depth, column)
    //debugger
    depth++;
      //for loop
    for( var i=0; i < n && solutionCount < 1; i++){
      //always toggle piece
      board.togglePiece(depth, i);
      //check for conflicts
      if(board.hasAnyQueensConflicts()){
        board.togglePiece(depth, i);
      } else {
      //find solutions
        if(depth === n-1){
          solutionCount++;
          solution = makeArray(board);// Does not exist yet
          //board.togglePiece(depth, i);
        } else if (solutionCount < 1){
          searchNext(depth, board);
          board.togglePiece(depth, i);
        }
      }
    }

  };

  var board = new Board({n:n});

  searchNext(-1, board);


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var checkConflicts = function(depth, i, board){
    var fail = false;
    if (board.hasRowConflictAt(depth) || board.hasColConflictAt(i)){
      fail = true;
    }
    return fail;
  };

  var searchNext = function(depth, board){
    //board.togglePiece(depth, column)
    //debugger
    depth++;
      //for loop
    for( var i=0; i < n; i++){
      //always toggle piece
      board.togglePiece(depth, i);
      //check for conflicts
      if(checkConflicts(depth, i, board)){
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
  var solutionCount = 0; //fixme
  var solution = new Board({n:n});


  var makeArray = function(obj){
    var results = [];
    for(var i = 0; i < n; i++){
      results.push(obj.rows()[i]);
    }
    return results;
  };
  solution = makeArray(solution);

  var searchNext = function(depth, board){
    //board.togglePiece(depth, column)
    //debugger
    depth++;
      //for loop
    for( var i=0; i < n && solutionCount < 1; i++){
      //always toggle piece
      board.togglePiece(depth, i);
      //check for conflicts
      if(board.hasAnyQueensConflicts()){
        board.togglePiece(depth, i);
      } else {
      //find solutions
        if(depth === n-1){
          solutionCount++;
          solution = makeArray(board);// Does not exist yet
          //board.togglePiece(depth, i);
        } else if (solutionCount < 1){
          searchNext(depth, board);
          board.togglePiece(depth, i);
        }
      }
    }

  };

  var board = new Board({n:n});

  searchNext(-1, board);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  //case of zero is nonsensical in the test,
  //case of one is an edge case when starting at depth = 1
  if(n === 0 || n === 1){
    return 1;
  }

  //check conflics on each new toggle on
  //i-depth and i+depth find the starting point for the diagonal tests
  var checkConflicts = function(depth, i, board){
    var fail = false;
    if (board.hasRowConflictAt(depth) ||
      board.hasColConflictAt(i) ||
      board.hasMajorDiagonalConflictAt(i - depth) ||
      board.hasMinorDiagonalConflictAt(i + depth)){
      fail = true;
    }
    return fail;
  };

  //recursive function for checking each node
  //in the decision tree
  var searchNext = function(depth, board){
    //iterate through columns
    for( var i=0; i < n; i++){
      //always toggle piece
      board.togglePiece(depth, i);
      //check for conflicts
      if(checkConflicts(depth, i, board)){
        board.togglePiece(depth, i);
      //if there are no conflicts, check for a solution
      } else {
        if(depth === n-1){
          solutionCount++;
          board.togglePiece(depth, i);
        //if there is no solution, continue down the branch
        } else {
          searchNext(depth + 1, board);
          board.togglePiece(depth, i);
        }
      }
    }

  };
  //create a board object
  var board = new Board({n:n});
  //search through the first half of the initial row
  //search one extra if odd
  for(var meta = 0; meta < Math.ceil(n/2); meta++){
  //if n is odd, double solution count and seed the last starting value
    if(n % 2 === 1 && meta === Math.floor(n/2)){
      solutionCount = solutionCount * 2;
    }
    board.togglePiece(0, meta);
    searchNext(1, board);
    board.togglePiece(0, meta);
  }
  //if n is even, after the first half of the tree has run,
  //double the solution count to optimize for the fact that
  //a reflected board has the same starting solutions
  if(n % 2 === 0){
    solutionCount = solutionCount * 2;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
