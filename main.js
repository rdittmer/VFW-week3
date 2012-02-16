// Ryan Dittmer
// Project 2
// VFW 1201
// Add Bill js 

window.addEventListener( "DOMContentLoaded", function(){

	function $( x ){
		var theElement = document.getElementById( x );
		return theElement;
	}
	
	function makeBillTypes(){
		var formTag    = document.getElementsByTagName( "form" ),
			selectLi   = $( 'billtype' ),
			makeSelect = document.createElement( 'select' );
			makeSelect.setAttribute( "id", "billTypes" );
		for( var i = 0, j = billTypes.length; i < j; i++ ){
			var makeOption = document.createElement( 'option' );
			var optText = billTypes[i];
			makeOption.setAttribute( "value", optText );
			makeOption.innerHTML = optText;
			makeSelect.appendChild( makeOption );
		}
		selectLi.appendChild( makeSelect );
	}
	
	function storeData()
	{
		var id         = Math.floor( Math.random() * 10001 );
		getSelectedRadio();
		var item       = {};
		
		item.billtype  = ["Bill Type:"  , $('billTypes').value];
		item.payto     = ["Pay To:"     , $('payto').value];
		item.payamount = ["Pay Amount:" , $('payamount').value];
		item.paywith   = ["Pay With:"   , paywithValue];
		item.paydate   = ["Pay Date:"   , $('paydate').value];
		item.notes     = ["Notes"       , $('notes').value];
		
		localStorage.setItem( id, JSON.stringify( item ) );
		alert( "Bill Added!" );
	}

	function getSelectedRadio()
	{
		var radios = document.forms[0].paytype;
		
		for ( var i = 0; i < radios.length; i++ )
		{
			if ( radios[i].checked )
				paywithValue = radios[i].value;
		}
	}
	
	function getData()
	{
		toggleControls( "on" );
		if( localStorage.length === 0 ){
			alert( "You currently have no saved bills." );
		}
		var makeDiv  = document.createElement( 'div' );
		makeDiv.setAttribute( "id", "items" );
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild( makeList );
		document.body.appendChild( makeDiv );
		$( 'items' ).style.display = "block";
		for( var i = 0, len = localStorage.length; i < len; i++ )
		{
			var makeli      = document.createElement( 'li' );
			var linksLi     = document.createElement( 'li' );
			makeList.appendChild( makeli );
			var key         = localStorage.key( i );
			var value       = localStorage.getItem( key );
			var obj         = JSON.parse( value );
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild( makeSubList );
			for( var n in obj )
			{
				var makeSubli       = document.createElement( 'li' );
				makeSubList.appendChild( makeSubli );
				var optSubText      = obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild( linksLi );
			} 
			makeItemLinks( localStorage.key( i ), linksLi );
		}
	}
	
	function makeItemLinks( key, linksLi )
	{
		var editLink         = document.createElement( 'n' );
		editLink.href        = "#";
		editLink.key         = key;
		var editText         = "Edit Bill";
		editLink.addEventListener( "click", editItem );
		editLink.innerHTML   = editText;
		linksLi.appendChild( editLink );
		
		var breakTag         = document.createElement( 'br' );
		linksLi.appendChild( breakTag );
		
		var deleteLink       = document.createElement( 'n' );
		deleteLink.href      = "#";
		deleteLink.key       = key;
		var deleteText       = "Delete Bill";
		deleteLink.addEventListener( "click", deleteItem );
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild( deleteLink );
	}
	
	function toggleControls( n )
	{
		switch( n )
		{
			case "on":
				$('billForm').style.display    = "none";
				$('clear').style.display       = "inline";
				$('displayData').style.display = "none";
				$('addNew').style.display      = "inline";
				break;
				
			case "off":
				$('billForm').style.display    = "block";
				$('clear').style.display       = "inline";
				$('displayData').style.display = "inline";
				$('addNew').style.display      = "none";
				$('items').style.display       = "none";
				break;
				
			default:
				return false;	
		}
	}
	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "You have no saved bills." );
		}else{
			localStorage.clear();
			alert( "All bills have been deleted!" );
			window.location.reload();
			return false;
		}
	}
	
	var billTypes = [ "<-Select Bill Type->", "Utilities", "Rent/House", "Auto", "Credit Card", "Other" ];
	makeBillTypes();
	var paywithValue;
	
	var displayLink = $( 'displayData' );
	displayLink.addEventListener( "click", getData );
	var clearLink   = $( 'clear' );
	clearLink.addEventListener( "click", clearLocal );
	var save        = $( 'submit' );
	save.addEventListener( "click", storeData );
	
});