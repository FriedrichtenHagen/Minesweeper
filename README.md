# Minesweeper Game

A remake of the classic windows minesweeper game. Includes all the well known features of the original. 

Here is a link to a live demo: https://friedrichtenhagen.github.io/Minesweeper/

![game screenshot](/minesweeper-screenshot.png)

## How it's made:

### Tech used: HTML, CSS, Javascript

I originally started with the idea to make a drawing board. The idea was to allow the user to color fields of a grid by click. Eventually the idea to turn the grid into the field for a minesweeper game arose. 
Creating the function for randomly spreading the bombs and the logic for winning and losing was relatively easy. The problem that arose was that all the fields with zero surrounding bombs needed to be clicked individually. This is annoying since every surrounding field can safely be clicked. Applying this process automatically greatly increases the fun of the game. 
To clear all connected fields with zero surrounding bombs, I created a recursive function that goes through all neighboring fields with a surrounding bomb count of zero. 

## Lessons learned:

This project was a great practice in manipulating the DOM via Javascript and also my first recursive algorithm. 
The fields are organized in one big array. This means, that there is no immediate distinction between rows and column. This could have been done in a cleaner way with the use of a two dimensional array as well as the use of objects. Both of which i was not familiar with at this time. Anywas it works and maybe I will refactor it in the future.
I was able to play around with some new css properties and also add sound effects. 