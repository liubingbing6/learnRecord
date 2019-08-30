<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
$newsList = array(
    array(
        'time' => '05-17',
        'title' => 'news1',
        'link' => 'miaov.com',
//        'isNew' => 'yes'
    ),
    array(
        'time' => '05-17',
        'title' => 'news1',
        'link' => 'miaov.com',
    ),
    array(
        'time' => '05-17',
        'title' => 'news1',
        'link' => 'miaov.com',
    )
);

foreach($newsList as $value) {
   /* echo $value['time'].$value['title'].$value['link'];
    echo '<br>';*/
//    print_r($value);

    foreach($value as $v) {
        echo $v;
    }
    echo '<br>';
}

foreach($newsList as $key => $value) {
    echo '这是第'.($key+1).'条新闻:';
    echo $value['time'].$value['title'].$value['link'].'<br>';
}