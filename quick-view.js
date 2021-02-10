$(document).ready(function(){
/*$( "body" ).delegate( ".Quick_view_button button", "click", function() {
	var url=$(this).attr('data-attr');
var handele=$(this).attr('data-handle');
	getproductinfo(url,handele);
  });*/
$('button.productpopup_close').on('click',function(){
popuphide();
  });

$(".product-page-popup").on('click',function(e){
if(!$(e.target).closest('.popup-dialog, .product-icons').length){
if($('.product-page-popup').hasClass('custom-ousidepopup')){
popuphide();
}
}
});
});


function getproductinfo(url,handele){
  $('.custom_loader').show();
  console.log('Producturl'+url);
  var urll='https://nykpearls.com/collections/new-arrivals'+url+handele;
  $.ajax({
    type: "GET",
    url: urll,
    success: function(data) {
      var newdata=$(data).find('div#shopify-section-product-template').html();   
      $('.productpopup-body .new-info').html(data);
      popupshow();
      QuickViewgalleryslider();  
      setTimeout(function(){
		swatch();
        quick_customslider();
        $('.custom_loader').hide();
        popupopacity(); 
      },3000);
    }
  });
}


function popupopacity(){
$('div#productpopup').css('opacity','1');
}

function popupshow(){
$('.product-page-popup').addClass('custom-ousidepopup');
$('div#productpopup').show();
  
}
function popuphide(){
$('.product-page-popup').removeClass('custom-ousidepopup');
$('div#productpopup').css('opacity','0');
$('div#productpopup').fadeOut();
$("#productpopup").removeClass('custom_variant_image');
}

function QuickViewgalleryslider(){
  $('.product-single-imagee').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-thumb-imagee'
  });
  $('.product-thumb-imagee').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.product-single-imagee',
    dots: false,
    arrows: true,
    focusOnSelect: true,
    prevArrow:"<button type='button' class='custom-slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
    nextArrow:"<button type='button' class='custom-slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    responsive: [               
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 2
        }
      }]
  });
}


function quick_customslider(){
$('.quick_view_slider_cus .hulkapps_option_value').slick({
  infinite: false,
  slidesToShow: 3,
arrow:true,
  slidesToScroll: 1,
prevArrow:"<button type='button' class='custom-slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='custom-slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
responsive: [
    {
      breakpoint: 1200,
      settings: {
  	  infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 769,
      settings: {
 		 infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
  		infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

}
function swatch(){
  $('.swatch :radio').change(function() {
    var optionIndex = $(this).closest('.swatch').attr('data-option-index');
    var optionValue = $(this).val();
    $(this)
      .closest('form')
      .find('.single-option-selector')
      .eq(optionIndex)
      .val(optionValue)
      .trigger('change');
$('.custom-quickview .product-form__variants option').removeAttr('selected');
$('.custom-quickview .product-form__variants [data-value="'+optionValue+'"]').attr('selected','selected').trigger('change');
  });
}

/*-------------------filter js------------*/
$('.custom_tag_filter h2').on('click',function(){
  if($(this).parents('.custom_tag_filter').hasClass('custom_active')){
$(this).parents('.custom_tag_filter').removeClass('custom_active').find('ul').hide();
}
  else{
$(this).parents('.custom_tag_filter').addClass('custom_active').find('ul').show();
  }
});


/*--------------product Page popup--------*/
$("body").delegate( "span.custom_popup_info", "click", function() {
	var title=$(this).attr('data-poptitle');
var img_url=$(this).attr('data-popimage');
	$("#productpopup").find('h4').html(title);
var qty=$(this).attr('data-check');
  if(qty){
var data_html=$('.custom_check_qty').html();
$("#productpopup").find(".custom_product_data").html('<div class="custom_nykqty_box">'+data_html+'</div>');
}
  else{
$("#productpopup").find(".custom_product_data").html('<img src="'+img_url+'">');
  }
popupshow();
popupopacity();
  });
/*-----------variant iamge popup---------*/
jQuery('.custom_swatch_images span').click(function(){
$("#productpopup").addClass('custom_variant_image');
var title=$(this).parents('.swatch-element').find('.custom-swtach-title').html();
console.log(title);
var img_url=$(this).attr('data-popimage');
	//$("#productpopup").find('h4').html(title);
$("#productpopup").find(".custom_product_data").html('<div class="custom-image"><img src="'+img_url+'"></div>'+title+'<div class="custom_variant_button"><button class="productpopup_close_button">Select this Option</button></div>');
popupshow();
popupopacity();
});
$("body").delegate( "button.productpopup_close_button", "click", function() {
popuphide();
  });

/*--------------mobile filter----------------------*/
$('.custom_filter_bottom').click(function(){
$(this).toggleClass('nyk_custom_button');
$(this).parents('body').toggleClass('mobile_filter_box');
});
