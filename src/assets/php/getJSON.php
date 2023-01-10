<?php

$response_json = json_decode(file_get_contents("php://input"), true);

function get_application_cost($json) {
  $bud_m = $json['budget_month'];
  $m_cost = $json['maintenance_costs'];
  $apl_count = $json['applications_count'];
  if ( $bud_m && $m_cost && $apl_count ) {
    return ($bud_m + $m_cost) / $apl_count;
  }
  return 0;
}

function get_customer_cost($json) {
  $bud_m = $json['budget_month'];
  $m_cost = $json['maintenance_costs'];
  $cl_count = $json['clients_count'];
  if ( $bud_m && $m_cost && $cl_count ) {
    return ($bud_m + $m_cost) / $cl_count;
  }
  return 0;
}

function get_onetime_income($json) {
  $av_ch = $json['average_check'];
  if ( $av_ch && get_customer_cost($json) ) {
    return $av_ch - get_customer_cost($json);
  }
  return 0;
}

function get_LTV($json) {
  $av_ch = $json['average_check'];
  $av_per = $json['average_period'];
  if ( $av_ch && $av_per ) {
    return $av_ch * $av_per;
  }
  return 0;
}

function get_ROI($json) {
  $bud_m = $json['budget_month'];
  $m_cost = $json['maintenance_costs'];
  if ( $bud_m && $m_cost && get_LTV($json) ) {
    return ( (get_LTV($json) - $bud_m - $m_cost) / ($bud_m + $m_cost) * 100);
  }
  return 0;
}

function get_profit($json) {
  if ( get_ROI($json) ) {
    return ( get_ROI($json) / 100 );
  }
  return 0;
}

echo json_encode( array(
  'application_cost' => get_application_cost($response_json),
  'customer_cost' => get_customer_cost($response_json),
  'onetime_income' => get_onetime_income($response_json),
  'ltv_value' => get_LTV($response_json),
  'roi_value' => get_ROI($response_json),
  'profit_value' => get_profit($response_json)
), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
