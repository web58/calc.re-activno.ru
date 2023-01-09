const debounce = ( cb, delay ) => {
  let timer;

  return function( ...args ) {
    clearTimeout( timer );
    timer = setTimeout( () => {
      cb.apply( this, args );
    }, delay );
  };
};

const throttle = ( cb, delay ) => {
  let isWaiting = false;
  let savedThis = null;
  let savedArgs = null;

  return function wrapper( ...args ) {
    if ( isWaiting ) {
      savedThis = this;
      savedArgs = args;
      return;
    }

    cb.apply( this, args );
    isWaiting = true;
    setTimeout( () => {
      isWaiting = false;
      if ( savedThis ) {
        wrapper.apply( savedThis, savedArgs );
        savedThis = null;
        savedArgs = null;
      }
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
  throttle,
  disableSubmitBtn,
  enableSubmitBtn,
  formatNumber,
  isInt,
  getNumberValue,
};
