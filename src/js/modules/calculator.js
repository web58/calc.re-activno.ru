import {
  getNumberValue,
  debounce,
  formatNumber,
} from './utils.js';

import {
  Options,
} from './options.js';

import {
  simpleModal,
} from './modal.js';

const ititCalculator = () => {
  const CALC_INPUTS = document.querySelectorAll( '.caclculator__data .caclculator-field__input' );

  const getObjectFromArrays = ( ARRAY_NODES ) => {
    const ARRAY_KEYS = Array.from( ARRAY_NODES ).map( item => item.id.toLowerCase().replace( '-', '_' ) );
    const ARRAY_VALUES = Array.from( ARRAY_NODES ).map( item => Number( item.value ) );
    const RESULT_OBJECT = {};
    for ( let i = 0; i < ARRAY_KEYS.length; i++ ) {
      RESULT_OBJECT[ ARRAY_KEYS[ i ] ] = ARRAY_VALUES[ i ];
    }
    return RESULT_OBJECT;
  };

  const sendCalcData = ( bodyObject ) => {
    return fetch( Options.RequestOptions.CalcHandler, {
      method: Options.RequestOptions.MethodPost,
      body: JSON.stringify( bodyObject ),
      headers: {
        'content-type': 'application/json'
      }
    } ).then( ( response ) => {
      if ( response.ok ) {
        return response.json();
      }
    } ).catch( () => {
      simpleModal.open( '#modal-error' );
    } );
  };

  const renderData = ( data ) => {
    for ( let item in data ) {
      if ( data[ item ] !== 0 ) {
        document.querySelector( `#${item}` ).value = formatNumber( `${getNumberValue( data[ item ] )}` );
      }
    }
  };

  const getData = () => {
    sendCalcData( getObjectFromArrays( CALC_INPUTS ) )
      .then( data => {
        renderData( data );
      } )
      .catch( () => {
        simpleModal.open( '#modal-error' );
      } );
  };

  const onClearFieldClick = ( evt ) => {
    evt.target.previousElementSibling.value = '';
    evt.target.style.display = 'none';
    evt.target.removeEventListener( 'click', onClearFieldClick );
  };

  const showClearBtn = ( evt ) => {
    if ( !evt.target.nextElementSibling && !evt.target.nextElementSibling.style.display !== 'inline-block' ) return;
    evt.target.nextElementSibling.style.display = 'inline-block';
    evt.target.nextElementSibling.addEventListener( 'click', onClearFieldClick );
  };
  const hideClearBtn = ( evt ) => {
    if ( !evt.target.nextElementSibling && !evt.target.nextElementSibling.style.display !== 'none' ) return;
    evt.target.nextElementSibling.style.display = 'none';
    evt.target.nextElementSibling.removeEventListener( 'click', onClearFieldClick );
  };

  CALC_INPUTS.forEach( ( input ) => {
    input.addEventListener( 'input', debounce( getData, 1500 ) );
    input.addEventListener( 'input', ( evt ) => {
      if ( evt.target.value ) {
        showClearBtn( evt );
      } else {
        hideClearBtn( evt );
      }
    } );
  } );
};

ititCalculator();
