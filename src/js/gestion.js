function deplace()
{
  $('.fond').animate({
    top: '-=360'
  },
  1000,
  'linear',
  function(){
    $('.fond').css('top', 0);
    deplace();
  });
 console.log("Dans deplace !");
}

deplace();