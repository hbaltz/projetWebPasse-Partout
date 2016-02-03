// Variables globales :

var vam = 600; // Vitesse de defilement des murs
var tap = 120; // Taille des portes maximales
var pm = 250; // Aide au positionnement des portes
var pop = 400; // Aide au positionnement des murs
var vdf = 360; // Vitesse de defilement du fond
var hdj = 60; // Taille en pixel en dehors de la taille du jeu
var zdj = 320; // Taille en pixel en dehors de la taille du jeu
var tcur = 20; // Taille en px du curseur
var pom = -10; // Position du mur par défaut


$(function() {

	var ok = 1;
	function obstacle(){

		//Déplacement et apparation des murs :
		$('#mur').animate({top: '+=' + vam}, 2500, 'linear', function(){

			var porteW = Math.floor(Math.random()*tap)+20;

			var porteX = Math.floor(Math.random()*pm);

			$('#mur').css('top', 0);

			$('#porte').css('width',porteW);
			$('#porte').css('margin-left',porteX);

			ok = 1;

		});
	};

	function deplace(){
		// Animation du fond :
		$('.fond').animate({
			top: '+='+vdf
			},
			1000, //Temps du deplacement
			'linear', // Mode de deplacement


			// On relance la fonction une fois que le deplacement est fini :
			function(){
				$('.fond').css('top', -vdf);
				deplace();
				obstacle();
			});
		}

		// Ajout evenement pour faire bouger la voiture rouge a l'aide des touches droite et gauche :
		$(document).keydown(function(e){
			if (e.which == 39){
				pptX = parseInt($('#ppt').css('left'));
				if (pptX < zdj)
				$('#ppt').css('left', pptX + tcur);
			}

			if (e.which == 37){
				pptX = parseInt($('#ppt').css('left'));
				if (pptX > hdj)
				$('#ppt').css('left', pptX - tcur);
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