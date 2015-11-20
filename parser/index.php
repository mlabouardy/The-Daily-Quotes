<?php
require 'parser.php';

error_reporting(0);


$str='{"quotes":[]}';
$quotes = json_decode($str, true);

function getContents($category, $page){
	$url;
	if($page==1)
		$url="http://thedailyquotes.com/category/".$category."/";
	else
		$url="http://thedailyquotes.com/category/".$category."/page/".$page."/";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
	$html = curl_exec($ch);
	curl_close($ch);
	return $html;
}

function parseImgs($category, $page){
	global $quotes;
	$dom = new domDocument;
	$dom->loadHTML(getContents($category, $page));
	$dom->preserveWhiteSpace = false;
	$images=$dom->getElementsByTagName('img');
	$i=0;
	foreach ($images as $image) {
		if($i!=0){
			$quote['url'] = $image->getAttribute('src');
			array_push( $quotes["quotes"], $quote);
		}
		$i++;
	}
}



for($i=0;$i<=1;$i++){
	parseImgs('video-game-quotes',$i);
}

echo json_encode($quotes);
?>
