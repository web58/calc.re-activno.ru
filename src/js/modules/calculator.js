import {
  getNumberValue,
  debounce,
} from './utils.js';

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
    return fetch( './php/getJSON.php', {
      method: 'POST',
      body: JSON.stringify( bodyObject ),
      headers: {
        'content-type': 'application/json'
      }
    } ).then( ( response ) => {
      if ( response.ok ) {
        return response.json();
      }
    } ).catch( simpleModal.open( '#modal-error' ) );
  };

  const renderData = ( data ) => {
    for ( let item in data ) {
      if ( data[ item ] != 0 ) {
        document.querySelector( `#${item}` ).value = getNumberValue( data[ item ] );
      }
    }
  };

  const getData = () => {
    sendCalcData( getObjectFromArrays( CALC_INPUTS ) )
      .then( data => {
        renderData( data );
      } )
      .catch( simpleModal.open( '#modal-error' ) );
  };

  CALC_INPUTS.forEach( ( input ) => {
    input.addEventListener( 'input', debounce( getData, 1500 ) );
  } );
};

ititCalculator();
