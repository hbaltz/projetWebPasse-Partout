$(function() {

	var ok = 1;
	function deplace(){

	//Déplacement et apparation des murs :
	$('#mur').animate({top: '+=600'}, 2500, 'linear', function(){

		var murW = Math.floor(Math.random()*320)+40;

		var murX = Math.floor(Math.random()*(400-murW))+30;
		var murY = 0;

		$('#mur').css('top',murY);
		$('#mur').css('left',murX);
		$('#mur').css('width',murX);

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
		$('.fond').css('top', -360);
		deplace();
		});
	}

	// Ajout evenement pour faire bouger la voiture rouge a l'aide des touches droite et gauche :
	$(document).keydown(function(e){
		if (e.which == 39){
			pptX = parseInt($('#ppt').css('left'));
			if (pptX < 320)
			$('#ppt').css('left', pptX+20);
		}

		if (e.which == 37){
			pptX = parseInt($('#ppt').css('left'));
			if (pptX > 60)
			$('#ppt').css('left', pptX-20);
		}
	});

	// Fonction pour surveiller la collision entre les deux voitures :
	function collision(){
		pptX = parseInt($('#ppt').css('left'));
		cleX = parseInt($('#cle').css('left'));
		pptY = 390;
		cleY = parseInt($('#cle').css('top'));
		/* if (((pptX > cleX) && (pptX < (cleX+66)) && (pptY > (cleY+120)) && (pptY < (cleY+150)) &&(ok == 1)) || ((pptX > cleX) && (pptX < (cleX+66)) && (pptY > (cleY+120)) && (pptY < (cleY+150)) && (ok == 1))){
			collision = parseInt($('#info').text()) + 1;
			$('#info').text(collision);
			ok = 0;
		}  */
	}

	deplace();
	setInterval(collision, 1); // Verification des collisons toutes les 20ms
}); 