$(function() {
      var ok = 1;
	function deplace()
	{

		// Deplacement et apparation de la voiture rouge :

		$('#vj').animate({top: '+=600'}, 2500, 'linear', function(){

	    var vjX = Math.floor(Math.random()*194)+70;
	    var vjY = 0;

	    $('#vj').css('top',vjY);
	    $('#vj').css('left',vjX);

	    ok = 1;

	  });

		// Animation du fond :
	  $('.fond').animate({
	    top: '+=360'
	  },
	  1000, //Temps du deplacement
	  'linear', // Mode de deplacement


	  // On relance la fonction une fois que le deplacement est fini :
	  function(){
	    $('.fond').css('top', 0);
	    deplace();
	  });
	}

	// Ajout evenement pour faire bouger la voiture rouge a l'aide des touches droite et gauche :
	$(document).keydown(function(e){
		if (e.which == 39)
		{
		  vrX = parseInt($('#vr').css('left'));
		  if (vrX < 280)
		    $('#vr').css('left', vrX+30);
		}

		if (e.which == 37)
		{
		  vrX = parseInt($('#vr').css('left'));
		  if (vrX > 70)
		    $('#vr').css('left', vrX-30);
		}
	});

	// Fonction pour surveiller la collision entre les deux voitures :
	function collision()
	{
	  vrX = parseInt($('#vr').css('left'));
	  vjX = parseInt($('#vj').css('left'));
	  vrY = 10;
	  vjY = parseInt($('#vj').css('top'));
	  if (((vrX > vjX) && (vrX < (vjX+66)) && (vrY > (vjY+120)) && (vrY < (vjY+150)) &&(ok == 1)) || ((vrX > vjX) && (vrX < (vjX+66)) && (vrY > (vjY+120)) && (vrY < (vjY+150)) && (ok == 1)))
	  {
	    collision = parseInt($('#info').text()) + 1;
	    $('#info').text(collision);
	    ok = 0;
	  }  
	}

	deplace();
	setInterval(collision, 20); // Verification des collisons toutes les 20ms
});