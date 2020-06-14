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