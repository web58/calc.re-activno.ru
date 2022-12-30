import {
  Options,
} from './options.js';

import {
  sendData,
} from './send-data.js';

new justPhoneMask( {
  bodyMask: ' (___) ___ __ __',
} );

const validateForms = () => {
  const forms = document.querySelectorAll( 'form[data-validate]' );
  if ( forms.length < 1 ) return;
  forms.forEach( ( form ) => {
    const formID = `#${form.id}`;
    const validationRules = new JustValidate( formID, Options.ValidationErrors );
    const requiredFields = document.querySelectorAll( `${formID} [required]` );

    if ( requiredFields.length < 1 ) return;

    requiredFields.forEach( ( input ) => {
      switch ( input.dataset.validate ) {
        case 'text':
          validationRules.addField( `${formID} [data-validate="text"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: 'Поле обязательно для заполнения'
          }, ] );
          break;
        case 'phone':
          validationRules.addField( `${formID} [data-validate="phone"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения',
            },
            {
              rule: 'minLength',
              value: document.querySelector( `${formID} [data-validate="phone"]` ).dataset.mask.length,
              errorMessage: 'Введите телефон в формате +7 (---) --- -- --',
            },
          ] );
          break;
        case 'confirm':
          validationRules.addField( `${formID} [data-validate="confirm"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: 'Подтвердите согласие с политикой конфидециальности',
          }, ] );
          break;
      }
    } );
    validationRules.onSuccess( ( evt ) => {
      sendData( evt );
    } );
  } );
};

validateForms();
