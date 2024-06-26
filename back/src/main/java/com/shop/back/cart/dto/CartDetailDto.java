package com.shop.back.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class CartDetailDto {
	
	 private Long cartItemId; //장바구니 상품 아이디

	    private String name; 

	    private int price; 

	    private int count;

	    private String path;

		private Long itemId;

		private Long itemGroupId;
	    
	    public CartDetailDto(Long cartItemId, String name, int price, int count, String path, Long itemId, Long itemGroupId){
	        this.cartItemId = cartItemId;
	        this.name = name;
	        this.price = price;
	        this.count = count;
	        this.path = path;
			this.itemId = itemId;
			this.itemGroupId = itemGroupId;
	    }
}
