
var init = function(){
  message(mWellcome);
  qCount = 0;
  lvlCount = 1;
  qAns = 0;
  quest = getQuestions(qPerLevel,'nivel'+lvlCount);
  putQuestion(quest[qCount]);
  /*console.log("asdfasdfasdfasdfsdfasdfasdfasdf");*/
  $('.point').removeClass('pointPlay');
  $($('.point').get().reverse()[qAns]).addClass("pointPlay");
  $("#btn5050").removeClass('btn5050I').addClass('btn5050A');
  $("#btnPublic").removeClass('btnPublicI').addClass('btnPublicA');
  $("#btnFriend").removeClass('btnFriendI').addClass('btnFriendA');
   
   $("#btn5050").unbind();

    $("#btnFriend").unbind();

    $("#btnPublic").unbind();
   
    $("#btn5050").bind("click",function() {
      message(m5050);

    });

    $("#btnFriend").bind("click",function() {
      message(mLlamada);

    });

    $("#btnPublic").bind("click",function() {
      message(mPublic);

    });

};

var helps = {
  "v5050":0,
  "friend":0,
  "publics":0
};

var h5050 = function(){
  helps.v5050 = 1;
  var answers = $(".answer[right=0]")
  var x = 0;
  var indexes = [];

  x = randNotInArray(2,indexes);
  indexes.push(x);
  $(answers[x]).css("color","#000d4c");
 /* console.log(x,indexes, answers);*/
  
  x = randNotInArray(2,indexes);
  indexes.push(x);
  $(answers[x]).css("color","#000d4c");
  //console.log(x,indexes,answers);

  $("#btn5050").removeClass('btn5050A').addClass('btn5050I');
  $("#btn5050").unbind();

};

var hCall = function(){
  helps.friend = 1;
  var right = $(".answer[right=1]").parent();
  $(right).addClass('callRight');
  $(".answer[right=1]").css("color","#000d4c");

  //console.log(x,indexes,answers);

  $("#btnFriend").removeClass('btnFriendA').addClass('btnFriendI');
  $("#btnFriend").unbind();

};

var hPublic = function(){
  helps.publics = 1;
  $(".answer").each( function(index) {
    if($(this).attr("right")=="1")
    {
      value = Math.floor(Math.random()*(200-150+1)+150);
    }
    else
    {
      value  = Math.floor(Math.random()*(110-10+1)+10);
    }
    /*console.log(value);*/
    var toBar = "#"+$(this).attr("bar");
    $(toBar).animate({ height: value }, 1500);
    
  });
  $("#btn1").removeClass();
  $("#btn2").removeClass().toggle();
  $("#btn1").addClass('btnContinuar').html("CONTINUAR");
  $("#btn1").unbind();
  $("#btn1").bind('click', function(event) {
    messageToggle();
    $("#btn1").unbind();
    $(".bar").animate({ height: 0 }, 5);
  });
  //console.log(x,indexes,answers);

  $("#btnPublic").removeClass('btnPublicA').addClass('btnPublicI');
  $("#btnPublic").unbind();

};

var mWellcome = {
  "type":1,
  "char":"charIntro",
  "tit":"bienvenido a Quien quiere ser millonario"
};

var mCongrat = {
  "type":2,
  "tit":"Felicitaciones, respuesta correcta"
};

var mError = {
  "type":3,
  "tit":"Respuesta Errada, lo sentimos",
  "callback":init
};

var m5050 = {
  "type":4,
  "tit":"esta a punto de utilizar la ayuda de 5050, desea continuar?",
  "callback":h5050
};

var mLlamada = {
  "type":5,
  "tit":"esta a punto de utilizar la ayuda de Llamada a un amigo, desea continuar?",
  "callback":hCall
};

var mPublic = {
  "type":6,
  "tit":"esta a punto de utilizar la ayuda del publico, desea continuar?",
  "callback":hPublic
};

var mNewLvl = {
  "type":7,
  "tit":"Felicitaciones, respuesta correcta"
};

var mLast = {
  "type":8,
  "tit":"ultima pregunta"
};

var mWinner = {
  "type":9,
  "tit":"ultima pregunta",
  "callback":init
};

var qPerLevel = 5;
var qCount = 0;
var lvlCount = 1;
var qMax = 11;
var qAns = 0;

var messageToggle = function(callback){
  if(callback){
    /*console.log("has callback");*/
    $("#modal").fadeToggle(500,function(){callback()});
    //$(".mess").animate({height: "toggle"},500,function(){callback()});
    
  }
  else{
    $("#modal").fadeToggle(500);
    //$(".mess").animate({height: "toggle"},500);

  }
};

var message = function(info){
  /*console.log(info);*/
  var btn1 = $("#btn1");
  var btn2 = $("#btn2");

  $("#modal").removeClass();
  $("#char").removeClass();
  $("#infocenter").removeClass();
  $("#infotext").removeClass();
  $("#btn1").removeClass();
  $("#btn2").removeClass();
  $("#bars").removeClass();
  $(".lettersBars").hide();
  

  btn1.unbind();
  btn2.unbind();
  btn1.hide();
  btn2.hide();

  if(info.type==1){
    $("#modal").addClass('messIntro');
    $("#char").addClass('charIntro');
    $("#infocenter").addClass('logoIntro');
    $("#btn1").addClass('btnJugar').html("JUGAR");
    /*console.log("bienvenida");*/
    btn1.bind("click",function(event) {
      
      if(info.callback){
        messageToggle(info.callback);
      }
      else{
        messageToggle();

      }
    });
    btn1.toggle();
  };

  if(info.type==2){
    $("#modal").addClass('messIntro');
    $("#char").addClass('charIntro');
    $("#infocenter").addClass('logoIntro');
    $("#infotext").addClass('textNivel');
    $("#btn1").addClass('btnJugar').html("CONTINUAR");
    /*console.log("respuesta Correcta");*/
    btn1.bind("click",function(event) {
      if(info.callback){
        messageToggle(info.callback);
      }
      else{
        messageToggle();
      }
    });
    btn1.toggle();
  };

  if(info.type==3){
    $("#modal").addClass('messIntro');
    $("#char").addClass('charLost');
    $("#infocenter").addClass('logoLost');
    $("#infotext").addClass('textLost');
    $("#btn1").addClass('btnLost').html("VOLVER A JUGAR");
    /*console.log("respuesta Incorrecta");*/
    btn1.bind("click",function(event) {
      if(info.callback){
        messageToggle(info.callback);
      }
      else{
        messageToggle();
      }
    });
    btn1.toggle();
  };

  if(info.type==4){
    $("#modal").addClass('mess');
    $("#infocenter").addClass('text5050');
    $("#btn1").addClass('btnSi').html("SI");
    $("#btn2").addClass('btnNo').html("NO");
    /*console.log("5050");*/
    btn1.bind("click",function(event) {
      messageToggle(info.callback);
    });
    btn2.bind("click",function(event) {
      messageToggle();
    });
    btn1.toggle();
    btn2.toggle();
  };

  if(info.type==5){
    $("#modal").addClass('mess');
    $("#char").addClass('charCall');
    $("#infocenter").addClass('globoAyuda');
    $("#infotext").addClass('textQHelp');
    $("#btn1").addClass('btnSi').html("SI");
    $("#btn2").addClass('btnNo').html("NO");
    /*console.log("5050");*/
    btn1.bind("click",function(event) {
      messageToggle(info.callback);
    });
    btn2.bind("click",function(event) {
      messageToggle();
    });
    btn1.toggle();
    btn2.toggle();
  };
  
  if(info.type==6){
    $("#modal").addClass('mess');
    $("#bars").addClass('bars');
    $("#bara").addClass('bar');
    $("#barb").addClass('bar');
    $("#barc").addClass('bar');
    $("#bard").addClass('bar');
    $(".lettersBars").show();
    $("#infotext").addClass('textPHelp');
    $("#btn1").addClass('btnSi').html("SI");
    $("#btn2").addClass('btnNo').html("NO");
    /*console.log("publico");*/
    btn1.bind("click",function(event) {
      info.callback();
    });
    btn2.bind("click",function(event) {
      messageToggle();
    });
    btn1.toggle();
    btn2.toggle();
  };

  if(info.type==7){
    $("#modal").addClass('messIntro');
    $("#char").addClass('charPersp');
    $("#infocenter").addClass('logoIntro');
    $("#infotext").addClass('textSiguiente');
    $("#btn1").addClass('btnContinuarLvl').html("CONTINUAR");
    console.log("respuesta Correcta, sgt nivel");
    btn1.bind("click",function(event) {
      if(info.callback){
        messageToggle(info.callback);
      }
      else{
        messageToggle();
      }
    });
    btn1.toggle();
  };

  if(info.type==8){
    $("#modal").addClass('messIntro');
    $("#char").addClass('charPersp');
    $("#infocenter").addClass('logoIntro');
    $("#infotext").addClass('textUltima');
    $("#btn1").addClass('btnContinuarLvl').html("CONTINUAR");
    console.log("respuesta Correcta, sgt nivel");
    btn1.bind("click",function(event) {
      if(info.callback){
        messageToggle(info.callback);
      }
      else{
        messageToggle();
      }
    });
    btn1.toggle();
  };

  if(info.type==9){
    $("#modal").addClass('messIntro');
    $("#char").addClass('charIntro');
    $("#infocenter").addClass('logoIntro');
    $("#infotext").addClass('textGanador');
    $("#btn1").addClass('btnWin').html("JUGAR DE NUEVO");
    console.log("respuesta Correcta, sgt nivel");
    btn1.bind("click",function(event) {
      if(info.callback){
        messageToggle(info.callback);
      }
      else{
        messageToggle();
      }
    });
    btn1.toggle();
  };

  //$("#mstit").html(info.tit);
  messageToggle();
};

//get a random number not in an array
var randNotInArray = function(len,ar){
  var value = -1;
  do{
    value = Math.floor(Math.random()*(len+1));
    ret = $.inArray(value, ar);
  }while(ret!=-1);
  return value;
};

//get x number of questions from a level in the array of questions
var getQuestions = function (x, level){
  var q = [];//preguntas a retornar
  var qxl = preguntas[level]//preguntas en el json
  var indexes = [];//indices de las preguntas agregadas
  var val //el indice a trabajar
  var quest;
  

  for (i = 0; i < x; i++) { 
    val = randNotInArray(qxl.length-1,indexes);
    indexes.push(val);
    q.push(qxl[val]);
  }
  return q;
};

var putQuestion = function(q){
  $("#question").html(q.pregunta);
  $(".answer").parent().removeClass('callRight');
  var indexes = [];
  
  for (i = 1; i <= 4; i++) {
    val = randNotInArray(q.respuestas.length-1,indexes);
    indexes.push(val);
    $(".answer").css("color","white");
    $("#answer"+i).html(q.respuestas[val]);
    if (q.correcta == val){
      $("#answer"+i).attr('right',"1");
    }
    else{
      $("#answer"+i).attr('right',"0");
    }
  }
  
};

var checkAnswer = function (elemn){
  if(elemn.attr("right")=="1") {
    
    if(qAns>qMax){
      message(mWinner);

    }
    else if(qAns==qMax){
      if(qCount+1 >= qPerLevel){
        message(mLast);
        qCount = 0;
        lvlCount++;
        quest = getQuestions(qPerLevel,'nivel'+lvlCount);
        putQuestion(quest[qCount]);
      }
      else{
        message(mLast);
        qCount = qCount +1;
        putQuestion(quest[qCount]);
      }
      $($('.point').get().reverse()[qAns]).removeClass("pointPlay");
      qAns++;
      $($('.point').get().reverse()[qAns]).addClass("pointPlay");
    }
    else{
      if(qCount+1 >= qPerLevel){
        message(mNewLvl);
        qCount = 0;
        lvlCount++;
        quest = getQuestions(qPerLevel,'nivel'+lvlCount);
        putQuestion(quest[qCount]);
      }
      else{
        message(mCongrat);
        qCount = qCount +1;
        putQuestion(quest[qCount]);
      }
      $($('.point').get().reverse()[qAns]).removeClass("pointPlay");
      qAns++;
      $($('.point').get().reverse()[qAns]).addClass("pointPlay");
    }
    

  }
  else{
    message(mError);
  }
};

$( document ).ready(function() {
    init();
    
   $(".aSize").click(function() {
      checkAnswer($($(this).children()[1]));
    });
    
});