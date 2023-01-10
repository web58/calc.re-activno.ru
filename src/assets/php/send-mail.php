<?php
require_once 'settings.php';
require_once 'phpmailer/phpmailerautoload.php';

foreach ( $_POST as $key => $value ) {    
  if ( $value != "") {
    $message .= "
      " . ( ($c = !$c) ? '<tr>':'<tr style="'.$style_tr.'">' ) . "
      <td style='".$style_td."'><b>$key</b></td>
      <td style='".$style_td."'>$value</td>
    </tr>
    ";
  }
}

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->setFrom(	$sender_email );
$mail->addAddress( $admin_email );
$mail->Subject = $form_subject;
$mail->msgHTML( "<table style='".$style_table."'>$message</table>" );
if(!$mail->send()) {
  echo 'Ошибка Mailer: ' . $mail->ErrorInfo;
} else {
  echo $success_message;
}
$mail->clearAddresses();
