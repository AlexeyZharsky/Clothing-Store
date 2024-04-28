'use strict';

$('.header-production-button').click(function() {
	$('.header-production-menu').slideToggle(200);
});


$('.main-section').mouseover(function() {
	hideMenu();
})

$('.info-section').mouseover(function() {
	hideMenu();
})

$('.products-section').mouseover(function() {
	hideMenu();
})

function hideMenu() {
	$('.header-production-menu').slideUp(200);
}

$('.catalog-button').click(function() {
	$('.catalog-button').slideUp(100);
	$('.main-section').slideUp(300);
	$('.products-section').slideDown(200);
})

$('.cart-button').click(function() {
	$('.cart-section').slideToggle(300);
});

var cart = [];
var totalPrice = 0;

$(document).ready(function() {
    getXML();
});
 
function getXML(){
    $.ajax({
        type: "GET",
        url: "clothes.xml",
        dataType: "xml",

        success: function(data) {
            let productItem = "";
            $(data).find('item').each(function(){
                let itemName = $(this).find('name').html();
                let itemCost = $(this).find('cost').html();
                let itemImg = $(this).find('img').html();
				let itemGender = $(this).find('gender').html();

				if(itemGender === $('.products-section-list').attr('id') || $('.products-section-list').attr('id') === undefined )
				{
					productItem += '<div class="product-item">'
					productItem += '<div class="product-item-image">'
					productItem += '<img src="' + itemImg + '">'
					productItem += '</div>'
					productItem += '<h2>' + itemCost + 'р</h2>'
					productItem += '<p>' + itemName + '</p>';
					productItem += '<button class="add" item-id="' + itemName + '" item-cost="' + itemCost + '"><i class="fa-solid fa-cart-shopping"></i>В корзину</button>'
					productItem += '</div>';
				}
            });         
            $('.products-section-list').html(productItem);
			$('.add').on('click', addToCart);
        }         
    });
}

function addToCart() {
	$(this).html('<i class="fa-solid fa-check"></i></i>Добавлено');
	$(this).removeClass();

	let itemId = $(this).attr('item-id');
	let itemCost = $(this).attr('item-cost');
	totalPrice += Number(itemCost);

	if (cart[itemId] == undefined) {
		cart[itemId] = 1;
	}
	else {
		cart[itemId]++;
	}

	showCart();
}

function showCart() {
	let out = '';

	for (let item in cart) {
		out += '<p>' + item + ': ' + cart[item] + ' шт.</p>';
	}
	out += '<a href="order.html"><button>Заказать - ' + totalPrice + 'BYN</button></a>';

	$('.cart-section-items').html(out);
}