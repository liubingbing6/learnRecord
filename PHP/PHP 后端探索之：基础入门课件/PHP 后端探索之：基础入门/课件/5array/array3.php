<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
$newsList = array('news1','news2','news3','news4');

foreach($newsList as $news) {
    echo '<br>'.$news;
}

foreach($newsList as $key => $value) {
    echo '<br>'.$key.'=>'.$value;
}