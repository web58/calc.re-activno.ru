import {
  Options,
} from './options.js';

import {
  disableSubmitBtn,
  enableSubmitBtn,
} from './utils.js';

import {
  simpleModal,
} from './modal.js';

export const sendData = ( evt ) => {
  disableSubmitBtn( evt.target );
  fetch( Options.RequestOptions.HandlerURL, {
    method: Options.RequestOptions.MethodPost,
    body: new FormData( evt.target )
  } ).then( ( data ) => {
    if ( data.ok ) {
      simpleModal.open( '#modal-thanks' );
      evt.target.reset();
    } else {
      simpleModal.open( '#modal-error' );
    }
  } ).catch( () => {
    simpleModal.open( '#modal-error' );
  } ).finally( () => {
    enableSubmitBtn( evt.target );
  } );
};
