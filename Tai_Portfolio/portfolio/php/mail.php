<?php

$mailto = "taichen.rose0@gmail.com";
if( isset($_POST['mailto']) ){
	$mailto = $_POST['mailto'];
}

$subject = 'Default Subject Line';
if( isset($_POST['subject']) ){
	$subject = $_POST['subject'];
}

$from_str   = '';
$from_email = '';
if( isset($_POST['email']) ){
	$from_email = $_POST['email'];
	$from_str = $from_email;
	if( isset($_POST['name']) ){
		$from_str = $_POST['name'] . " <" . $from_email . ">";
	}
}

$body = "<html><body>\r\n";
$body .= "<table style='border: 1px solid #ccc;border-collapse: collapse;width:100%;' cellpadding='10' cellspacing='0'>\r\n";
foreach ($_POST['items'] as $key => $value) {
	$body .= "<tr><td style='border: 1px solid #ccc;text-transform: capitalize;vertical-align: top;width:100px'><b>" . $key . "</b></td><td style='border: 1px solid #ccc;'>" . $value . "</td></tr>\r\n";
}
$body .= "</table>\r\n";
$body .= "</html></body>";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

//Send email & retrieve status
$IsSent = mail($mailto, $subject, $body, $headers);

//Status message (message accepted by SMTP server, may still fail for other reasons).
if ($IsSent) {
    $status = "<br>HTML email sent to $toEmail";
} else {
    $status = "Please enter email address for recipient and sender";
}

echo "</div>$status</div>";

?>
