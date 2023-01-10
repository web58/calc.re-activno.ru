const setCurrentYear = () => {
  const yearNode = document.querySelector( '#current-footer-year' );
  if ( !yearNode ) return;
  yearNode.textContent = new Date().getFullYear();
};

setCurrentYear();
