$(function() {
      var ok = 1;
	function deplace()
	{

		// Deplacement et apparation de la voiture rouge :

		$('#vr').animate({top: '-=600'}, 2500, 'linear', function(){

	    var vrX = Math.floor(Math.random()*194)+70;
	    var vrY = 400;

	    $('#vr').css('top',vrY);
	    $('#vr').css('left',vrX);

	    ok = 1;

	  });

		// Animation du fond :
	  $('.fond').animate({
	    top: '-=360'
	  },
	  1000, //Temps du deplacement
	  'linear', // Mode de deplacement


	  // On relance la fonction une fois que le deplacement est fini :
	  function(){
	    $('.fond').css('top', 0);
	    deplace();
	  });
	}

	// Ajout evenement pour faire bouger la voiture jaune a l'aide des touches droite et gauche :
	$(document).keydown(function(e){
		if (e.which == 39)
		{
		  vjX = parseInt($('#vj').css('left'));
		  if (vjX < 280)
		    $('#vj').css('left', vjX+30);
		}

		if (e.which == 37)
		{
		  vjX = parseInt($('#vj').css('left'));
		  if (vjX > 70)
		    $('#vj').css('left', vjX-30);
		}
	});

	// Fonction pour surveiller la collision entre les deux voitures :
	function collision()
	{
	  vjX = parseInt($('#vj').css('left'));
	  vrX = parseInt($('#vr').css('left'));
	  vjY = 10;
	  vrY = parseInt($('#vr').css('top'));
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