import {
  isInt,
} from './utils.js';

const getNumberValue = ( input ) => {
  return isInt( input ) ?
    parseInt( input, 10 ) :
    parseFloat( input.toFixed( 2 ) );
};

const ititCalculator = () => {
  const budgetMonthNode = document.querySelector( '#budget-month' );
  const maintenanceCostsNode = document.querySelector( '#maintenance-costs' );
  const applicationsCountNode = document.querySelector( '#applications-count' );
  const clientsCountNode = document.querySelector( '#clients-count' );
  const averageCheckNode = document.querySelector( '#average-check' );
  const averagePeriodNode = document.querySelector( '#average-period' );
  const applicationCostNode = document.querySelector( '#application-cost' );
  const customerCostNode = document.querySelector( '#customer-cost' );
  const oneTimeIncomeNode = document.querySelector( '#one-time-income' );
  const ltvValueNode = document.querySelector( '#ltv-value' );
  const roiValueNode = document.querySelector( '#roi-value' );
  const profitValueNode = document.querySelector( '#profit-value' );

  function getApplicationCost() {
    const BudM = +budgetMonthNode.value;
    const MCst = +maintenanceCostsNode.value;
    const ACnt = +applicationsCountNode.value;
    if ( !BudM || !MCst || !ACnt || !applicationCostNode ) return;
    const result = getNumberValue( ( getNumberValue( BudM ) + getNumberValue( MCst ) ) / getNumberValue( ACnt ) );
    return applicationCostNode.value = result;
  }

  function getCustomerCost() {
    const BudM = +budgetMonthNode.value;
    const MCst = +maintenanceCostsNode.value;
    const ClCnt = +clientsCountNode.value;
    if ( !BudM || !MCst || !ClCnt || !customerCostNode ) return;
    const result = getNumberValue( ( getNumberValue( BudM ) + getNumberValue( MCst ) ) / getNumberValue( ClCnt ) );
    return customerCostNode.value = result;
  }

  function getOneTimeIncome() {
    const AvCh = +averageCheckNode.value;
    if ( !AvCh || !oneTimeIncomeNode || !getCustomerCost() ) return;
    const result = getNumberValue( ( getNumberValue( AvCh ) - getCustomerCost() ) );
    return oneTimeIncomeNode.value = result;
  }

  function getLTV() {
    const AvCh = +averageCheckNode.value;
    const AvP = +averagePeriodNode.value;
    if ( !AvCh || !AvP || !ltvValueNode ) return;
    const result = getNumberValue( ( getNumberValue( AvCh ) * getNumberValue( AvP ) ) );
    return ltvValueNode.value = result;
  }

  function getROI() {
    const BudM = +budgetMonthNode.value;
    const MCst = +maintenanceCostsNode.value;
    if ( !BudM || !MCst || !roiValueNode || !getLTV() ) return;
    const result = getNumberValue( ( getLTV() - getNumberValue( BudM ) - getNumberValue( MCst ) ) / ( getNumberValue( BudM ) + getNumberValue( MCst ) ) * 100 );
    return roiValueNode.value = result;
  }

  function getProfit() {
    if ( !getROI() || !profitValueNode.value ) return;
    const result = getNumberValue( getROI() / 100 );
    return profitValueNode.value = result;
  }

  budgetMonthNode.addEventListener( 'input', () => {
    getApplicationCost();
    getCustomerCost();
    getOneTimeIncome();
    getROI();
    getProfit();
  } );

  maintenanceCostsNode.addEventListener( 'input', () => {
    getApplicationCost();
    getCustomerCost();
    getOneTimeIncome();
    getROI();
    getProfit();
  } );

  applicationsCountNode.addEventListener( 'input', () => {
    getApplicationCost();
  } );

  clientsCountNode.addEventListener( 'input', () => {
    getCustomerCost();
    getOneTimeIncome();
  } );

  averageCheckNode.addEventListener( 'input', () => {
    getOneTimeIncome();
    getLTV();
    getROI();
    getProfit();
  } );

  averagePeriodNode.addEventListener( 'input', () => {
    getLTV();
    getROI();
    getProfit();
  } );
};

ititCalculator();
