<?php
try {
	$tw = file_get_contents('http://api.twitter.com/1/statuses/user_timeline.json?include_entities=false&include_rts=true&screen_name=citybells&count=1');
    echo urldecode($tw);
} catch (Exception $ex) {
    echo $ex;
}
?>