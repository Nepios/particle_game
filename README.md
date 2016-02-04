#particle_game
This is a browser-based game employing javascript canvas to draw the circlular bomb elements and the randomly-generated particles. The object is to place a bomb on the screen and take out as many of the particles as possible. The game ends when the bomb radius reaches a maximum value.

##Features
* Scoreboard for two players
* High score overall is stored using local storage
* Scoreboard background color changes to red to indicate player turn
* Winner is determined and displayed in a pop-up

##Credits
* [jQuery](https://jquery.com/)
* [Sweet Alert](http://t4t5.github.io/sweetalert/)
* [Bootstrap](http://getbootstrap.com/)

##Known Issues
The particles are destroyed based on the placement of the original bomb, not the subsequent explosions, so some particles pass through the edge of the mass of circles.
