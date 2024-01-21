casse tete using backtracking

start with

- an empty board (representation tbc but needs to represent the current free slots)
- list of available pieces

get a piece and add it to the current board in all possible valid configurations (ie oriented vertically/horizontally, and also flipped)

after adding in the piece to the board, recursively do the same to add the next available piece
if the current piece cannot be added into the current board in a valid configuration then return failure, ie we dont need to consider more
back track to other configurations
