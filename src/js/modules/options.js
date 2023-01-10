export const Options = {
  SmoothScroll: {
    speed: 900,
    speedAsDuration: true,
    updateURL: false,
  },
  Modal: {
    linkAttributeName: false,
    catchFocus: true,
    closeOnEsc: true,
    backscroll: true,
  },
  ValidationErrors: {
    errorFieldCssClass: 'invalid',
    errorLabelStyle: {
      color: '#E30613',
      marginTop: '6px',
      fontSize: '12px',
      textAlign: 'left',
    },
  },
  ObserveScrollTop: {
    rootMargin: '600px',
    threshold: 1,
  },
  RequestOptions: {
    HandlerURL: './php/send-mail.php',
    CalcHandler: './php/getJSON.php',
    MethodGet: 'GET',
    MethodPost: 'POST',
  },
};
