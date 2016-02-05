// Variables globales :

var tm = 2500; // Temps de déplacement des murs
var tf = 1000; // Temps de déplacement du fond

var vam = 500; // Vitesse de defilement des murs
var vdf = 360; // Vitesse de defilement du fond

var am = 0; // Pour faire accélere les murs
var af = 0;	// Pour faire accélere le fond

var tap = 120; // Taille des portes maximales
var pop = 400; // Aide au positionnement des murs
var pom = -10; // Position du mur par défaut
var pm = 250; // Aide au positionnement des portes

var hdj = 60; // Taille en pixel en dehors de la taille du jeu
var zdj = 320; // Taille en pixel en dehors de la taille du jeu
var tcur = 20; // Taille en px du curseur

var rfc = 1; // Temps sépérant la vérification des collisions

var pptX, pptY, pptH, pptW, murX, murY, murH, porteX, porteY, porteH, porteW, testPor, testMur;
var score; 

$(function() {

	var ok = 1;
	function obstacle(){
		// Gestion de l'accélération :
		vam += am;
		am += 1;

		//Déplacement et apparation des murs :
		$('#mur').animate({top: '+=' + vam}, tm, 'linear', function(){

			var porteW = Math.floor(Math.random()*tap)+20;

			var porteX = Math.floor(Math.random()*pm);

			$('#mur').css('top', 0);

			$('#porte').css('width',porteW);
			$('#porte').css('margin-left',porteX);

			ok = 1;
			

		});
	};

	function deplace(){
		// Gestion de l'accélération :
		/*
		vdf += af;
		af += 1;
		*/

		// Animation du fond :
		$('.fond').animate({
			top: '+='+vdf
			},
			tf, //Temps du deplacement
			'linear', // Mode de deplacement


			// On relance la fonction une fois que le deplacement est fini :
			function(){
				$('.fond').css('top', -vdf);
				deplace();
				obstacle();
			});
		}

		// Ajout evenement pour faire bouger passe-partout a l'aide des touches droite et gauche :
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

	// Fonction pour surveiller la collision entre passe-partout et les murs :
	function collision(){

		pptY = parseInt($('#ppt').css('top'));
		pptH = parseInt($('#ppt').css('height'));

		murY = parseInt($('#mur').css('top'));
		murH = parseInt($('#mur').css('height'));
		
		porteY = parseInt($('#mur').css('top'));
		porteH = parseInt($('#porte').css('height'));

		testMur = intersection(pptY, pptH, murY, murH, ok);
		
		if (testMur){
			pptX = parseInt($('#ppt').css('left'));
			pptW = parseInt($('#ppt').css('width'));

			murX = parseInt($('#mur').css('left'));

			porteX = parseInt($('#porte').css('margin-left')) + murX;
			porteW = parseInt($('#porte').css('width'));

			testPor = dansPorte(pptX, pptW, porteX, porteW);

			if(testPor){
				score = parseInt($('#score').text()) + 1;
				$('#score').text(score);
				ok = 0;
			} else {
				finJeu();
			}
		}  
	}

	function finJeu(){
		$('#partie').hide();
		$('#partie').html('');
		$('#fin').show();
		$('#inf_score').text(score);
	}

	deplace();
	setInterval(collision, rfc); // Verification des collisons toutes les rfc ms
}); 