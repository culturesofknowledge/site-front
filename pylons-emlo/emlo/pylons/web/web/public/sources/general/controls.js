function textClear(input){
	if( input.defaultValue === input.value ) {
        input.value = "";
    }
}

function textFill( input ) {
    if (!input.value) {
        input.value = input.defaultValue;
        input.className = input.className.replace( ' somethingentered', '' );
    }
    else {
        input.className = input.className + ' somethingentered';
    }
}
