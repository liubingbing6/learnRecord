<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */

/*$news = array('05-17','news1','miaov.com');

print_r($news);

echo $news[0];
echo $news[1];
echo $news[2];

$news2 = array(
    'time' => '05-17',
    'title' => 'news1',
    'link' => 'miaov.com',
);

echo $news2['time'];
echo $news2['title'];
echo $news2['link'];*/

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

$newsList[] = array(
    'time' => '05-17',
    'title' => 'news1',
    'link' => 'miaov.com',
);

$newsList[0]['isNew'] = 'yes';

$newsList[1] = array(
    'time' => '05-11',
    'title' => 'news2',
    'link' => 'miaov.com'
);

$newsList[2]['title'] = 'news3';
$newsList[2]['time'] = '05-10';

unset($newsList[3]);


unset($newsList[0]['isNew']);

print_r($newsList[0]['link']);


//print_r($newsList);