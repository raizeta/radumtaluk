echo date_format($delay, 'd-m-Y H:i:s');

$yesterday  = new \DateTime('1 day ago'); 	//yesterday
$today      = new \DateTime();				//today


$yesterday  = new \DateTime('1 day ago');
$today      = new \DateTime();

$delay      = new \DateTime();
$delay->setTimestamp(strtotime(date("Y-m-d 00:00:00", time())));

$delay1      = new \DateTime();
$delay1->setTimestamp(strtotime(date("Y-m-d 00:00:00", time() - (60*60*24*7))));

echo 'Yesterday  '.date_format($yesterday, 'd-m-Y H:i:s');
echo "<br/><br/>";
echo 'Today  '.date_format($today, 'd-m-Y H:i:s');
echo "<br/><br/>";
echo 'Delay  '.date_format($delay,'d-m-Y H:i:s');
echo "<br/><br/>";
echo 'Delay-1  '.date_format($delay1,'d-m-Y H:i:s');
echo "<br/><br/>";