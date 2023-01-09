const debounce = ( cb, delay ) => {
  let timer;

  return function( ...args ) {
    clearTimeout( timer );
    timer = setTimeout( () => {
      cb.apply( this, args );
    }, delay );
  };
};

const disableSubmitBtn = ( form ) => {
  form.querySelector( '[type="submit"]' ).setAttribute( 'disabled', 'disabled' );
};

const enableSubmitBtn = ( form ) => {
  form.querySelector( '[type="submit"]' ).removeAttribute( 'disabled' );
};

const formatNumber = ( value, separator = '.' ) => {
  const locale = navigator.language;
  if ( value.indexOf( ',' ) != -1 ) {
    return new Intl.NumberFormat( locale ).format( value.replace( ',', '.' ) ).replace( ',', separator );
  } else {
    return new Intl.NumberFormat( locale ).format( value ).replace( ',', separator );
  }
};

const isInt = ( value ) => Number( value ) === value && value % 1 === 0;

const getNumberValue = ( input ) => {
  return isInt( input ) ?
    parseInt( input, 10 ) :
    parseFloat( input.toFixed( 2 ) );
};

export {
  debounce,
  disableSubmitBtn,
  enableSubmitBtn,
  formatNumber,
  isInt,
  getNumberValue,
};
