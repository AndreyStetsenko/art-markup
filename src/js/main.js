var background = {}

background.initializr = function (){

  var $this = this;



  //option
  $this.id = "background_css3";
  $this.style = {bubbles_color:"#000",stroke_width:"1px", stroke_color :"red"};
  $this.bubbles_number = 30;
  $this.speed = [1500,8000]; //milliseconds
  $this.max_bubbles_height = $this.height;
  $this.shape = false // 1 : circle | 2 : triangle | 3 : rect | false :random

  if($("#"+$this.id).lenght > 0){
    $("#"+$this.id).remove();
  }
  $this.object = $("<div style='z-index:1;margin:0;padding:0; overflow:hidden;position:absolute;bottom:0' id='"+$this.id+"'> </div>'").appendTo(".content--home");

  $this.ww = $(window).width()
  $this.wh = $(window).height()
  $this.width = $this.object.width($this.ww);
  $this.height = $this.object.height($this.wh);


  $(".content--home").prepend("<style>.shape_background {transform-origin:center; width:80px; height:80px; background: "+$this.style.bubbles_color+"; position: absolute}</style>");


  for (i = 0; i < $this.bubbles_number; i++) {
      $this.generate_bubbles()
  }

}

 background.generate_bubbles = function() {
   var $this = this;
   var base = $("<div class='shape_background'></div>");
   var shape_type = $this.shape ? $this.shape : Math.floor($this.rn(1,3));
   if(shape_type == 1) {
     var bolla = base.css({borderRadius: "50%"})
   }else if (shape_type == 2){
     var bolla = base.css({width:0, height:0, "border-style":"solid","border-width":"0 40px 69.3px 40px","border-color":"transparent transparent "+$this.style.bubbles_color+" transparent", background:"transparent"});
   }else{
     var bolla = base;
   }
   var rn_size = $this.rn(.8,1.2);
   bolla.css({"transform":"scale("+rn_size+") rotate("+$this.rn(-360,360)+"deg)", top:$this.wh+100, left:$this.rn(-60, $this.ww+60)});
   bolla.appendTo($this.object);
   bolla.transit({top: $this.rn($this.wh/2,$this.wh/2-60), "transform":"scale("+rn_size+") rotate("+$this.rn(-360,360)+"deg)", opacity: 0},$this.rn($this.speed[0],$this.speed[1]), function(){
     $(this).remove();
     $this.generate_bubbles();
   })

  }

background.rn = function(from, to, arr) {
if(arr){
        return Math.random() * (to - from + 1) + from;
}else{
  return Math.floor(Math.random() * (to - from + 1) + from);
}
  }
background.initializr()

var t;
function up() {
	var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(top > 0) {
		window.scrollBy(0,-100);
		t = setTimeout('up()',20);
	} else clearTimeout(t);
	return false;
}

var hellopreloader = document.getElementById("hellopreloader_preload");function fadeOutnojquery(el){el.style.opacity = 1;var interhellopreloader = setInterval(function(){el.style.opacity = el.style.opacity - 0.05;if (el.style.opacity <=0.05){ clearInterval(interhellopreloader);hellopreloader.style.display = "none";}},16);}window.onload = function(){setTimeout(function(){fadeOutnojquery(hellopreloader);},1000);};

// =======

function imageRecenter(){
	$('.modal-img').css('margin-top', -1*($('.modal-img').height()/2));
	$('.modal-img-move').css('margin-top', -1*($('.modal-img-move').height()/2) - $('.modal-img-move').height()/2);
	$('.modal-img, .modal-img-move').css('opacity', '1');
	$('.modal-right-art-bg-area').css('top', $('.modal-img-move').height());
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.modal-right-art-bg-move').css('background-image', "url('"+e.target.result+"')");
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function(){

	imageRecenter();
	$(window).on('resize', function(){
		imageRecenter();
	});

	$('.button-pattern').click(function(){
		$('.modal-img').removeClass().addClass('modal-img modal-img-pattern'+$(this).attr('data-id'));
		$('.modal-img').attr('data-id', $(this).attr('data-id'));
	});

	$('.button-pattern-ready').click(function(){
		$('#pattern-form-id').val($('.modal-img').attr('data-id'));
		$('.modal-background, .modal-background-move').hide();
	});

	$('.modal-img-move').draggable({
		cursor: "move",
		containment: ".modal-right-art-bg-area",
		scroll: false
	});


	$('.button-move-upload').click(function(){
		$('.input-move-upload').click();
	});

	$(".input-move-upload").change(function(){
    	readURL(this);
    });

    $('.modal-close, .button-move-ready').click(function(){
    	$('.modal-background, .modal-background-move').hide();
    });

    var startWidth = 0;

    $('.open-button').click(function(){
    	$('.'+$(this).attr('data-class')).show();
    	imageRecenter();
    	if(startWidth == 0){
	    	startWidth = $('.modal-img-move').width();
    	}

    	if($(this).attr('data-class') == 'modal-background-move'){
	    	$('.modal-img-move').find("img").resizable({
				containment: ".modal-right-art-bg-area",
				maxWidth: $('.modal-right-art-bg-area').width()*0.8,
				maxHeight: $('.modal-right-art-bg-area').height()*0.8,
				minHeight: 50,
				minWidth: 50,
				aspectRatio: true,
				resize: function(e, ui) {
			      $('.modal-right-art-bg-area').css('right', (ui.size.width - startWidth)*1.25);
			    }
			});
    	}
    });

    $('.modal-img-move img').resize(function(){
	    console.log("saadsdsaadsasdsaijashjadshsakjhsakjasn");
	});

});
