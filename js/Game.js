class Game {
  constructor() {
    this.texto = createElement("h2");
    this.botao = createButton("");

    this.lugar1 = createElement("h2");
    this.lugar2 = createElement("h2");
  }

 

  showLeaderBoard(){
    //criar duas variáveis
    var lugar1, lugar2;
    //transformar os valores do objeto allPlayers em uma 
    //matriz

    var players = Object.values(allPlayers);

    //se o rank do jogador 0  for 0 e o rank do jogador 1 for 0, ou o rank do jogador 0 for igual a 1 

    if((players[0].rank == 0 && players[1].rank ==0)||players[0].rank ==1){
      lugar1 = players[0].rank + "&nbsp;" + players[0].name + "&nbsp;" + players[0].score;
      lugar2 = players[1].rank + "&nbsp; "+ players[1].name + "&nbsp;" + players[1].score;
    }

    if(players[1].rank ==1){
      lugar1 = 
      players[1].rank + 
      "&nbsp; "
      + players[1].name + 
      "&nbsp;" 
      + players[1].score;

      lugar2 = 
      players[0].rank + 
      "&nbsp;" 
      + players[0].name 
      + "&nbsp;" 
      + players[0].score;
    }
    this.lugar1.html(lugar1);
    this.lugar2.html(lugar2);
     
  }


  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.lugar1.position(width/3, 100);
    this.lugar2.position(width/3, 200);
    
    //fazer o botão Reiniciar

  }
 

  play() {
    this.handleElements();

  
    
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height *5, width, height * 6);
      this.showLeaderBoard();
      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          //alterar a posição da câmera na direção y
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }

  handlePlayerControls() {
    // manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
   
   
  }
}
