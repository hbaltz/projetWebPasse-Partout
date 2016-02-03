$(function() {

	var ok = 1;
	function deplace(){

	// Deplacement et apparation de la voiture jaune :

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
		vjX = parseInt($('#vj').css('left'));
		pptY = 390;
		vjY = parseInt($('#vj').css('top'));
		if (((pptX > vjX) && (pptX < (vjX+66)) && (pptY > (vjY+120)) && (pptY < (vjY+150)) &&(ok == 1)) || ((pptX > vjX) && (pptX < (vjX+66)) && (pptY > (vjY+120)) && (pptY < (vjY+150)) && (ok == 1))){
			collision = parseInt($('#info').text()) + 1;
			$('#info').text(collision);
			ok = 0;
		}  
	}

	deplace();
	setInterval(collision, 1); // Verification des collisons toutes les 20ms
}); 