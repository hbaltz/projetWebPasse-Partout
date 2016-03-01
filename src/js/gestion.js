// ! Nécéssite jQuery

/**
Gestion du jeu avec Passe-partout
**/

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

var rfc = 0.05; // Temps séparant la vérification des collisions
var rfo = 100; // Temps séparant la demande d'apparition des obstacles
var alea;

var pptX, pptY, pptH, pptW, murX, murY, murH, porteX, porteY, porteH, porteW, testPor, testMur;
var score=0; // Stocke le score du joueur
var X; 
var ok = 1;

var murLib = '#mur';

// Pour lancer une partie :
$( "#lancer_partie").click(function(e){
	$('#debut').hide();
	$('#partie').show();
	debut_partie();
});

// Function pour initialiser la partie :
function debut_partie(){
	//Réinisiallition des variables au cas où ce ne serai pas la première partie (bouton resseayer) :
	vam = 500;
	vdf = 360;
	am = 0;
	af = 0;

	// Initialisation du jeu :
	$('#partie').html('<p> Score : <span id="score">0</span> </p>');
	$('<div id="jeu">').appendTo('#partie');
	$('<img id="fond1" class="fond" src="img/route.png"><img id="fond2" class="fond" src="img/route.png">').appendTo('#jeu');
	$('<img id="ppt" src="img/ppt.png">').appendTo('#jeu');
	$('<div class = "mur"></div>').appendTo('#jeu');
	$('<div class = "porte"></div>').appendTo('.mur');
	
	// Lancement du jeu :
	deplace();
	setInterval(collision, rfc);
	setInterval(obstacle, rfo);
}

// Gestion des obstacles :
function obstacle(){
	alea = Math.floor((Math.random() * 10) + 1); 
	if(alea == 7){
		// Gestion de l'accélération :
		vam += am;
		am += 1;

		//Déplacement et apparation des murs :
		$('.mur').animate({top: '+=' + vam}, tm, 'linear', function(){

			var porteW = Math.floor(Math.random()*tap)+25;

			var porteX = Math.floor(Math.random()*pm);

			$('.mur').css('top', -15);

			$('.mur .porte').css('width',porteW);
			$('.mur .porte').css('margin-left',porteX);

			ok = 1;
		});
	}
};


// Gestion du déplacement du fond
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
		}
	);
}

// Fonction pour surveiller la collision entre passe-partout et les murs :
function collision(){
	pptY = parseInt($('#ppt').css('top'));
	pptH = parseInt($('#ppt').css('height'));

	murY = parseInt($('.mur').css('top'));
	murH = parseInt($('.mur').css('height'));
	
	porteY = parseInt($('.mur').css('top'));
	porteH = parseInt($('.mur .porte').css('height'));

	testMur = intersection(pptY, pptH, murY, murH, ok);
	
	if (testMur){
		pptX = parseInt($('#ppt').css('left'));
		pptW = parseInt($('#ppt').css('width'));

		murX = parseInt($('.mur').css('left'));

		porteX = parseInt($('.mur .porte').css('margin-left')) + murX;
		porteW = parseInt($('.mur .porte').css('width'));

		testPor = dansPorte(pptX, pptW, porteX, porteW);

		if(!testPor){
			finJeu();
		} 

		score = parseInt($('#score').text()) + 1;
		$('#score').text(score);
		ok = 0;
	}
}

// Gestion du game over :
function finJeu(){
	$('#partie').hide();
	$('#partie').html('');
	$('#fin').show();
	$('#inf_score').text(score);
}

// Pour relancer une partie :
$("#nouvelle_partie").click(function(e){
	$('#fin').hide();
	$('#partie').show();
	debut_partie();
});

/**
Gestion des déplacement
**/

// Au clavier :

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

// A la souris :

// Ajout evenement pour faire bouger passe-partout a l'aide de la souris :
$('#partie').mousemove(function(e){
	X = e.pageX;
	if (X < zdj && X > hdj){
		$('#ppt').css('left', X);
	}
});