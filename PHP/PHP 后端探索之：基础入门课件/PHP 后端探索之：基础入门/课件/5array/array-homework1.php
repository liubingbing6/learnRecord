<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
$newsList = array(
        array(
            'time' => '2017-05-07',
            'title' => '妙味新闻news1',
            'link' => 'http://miaov.com',
        ),
        array(
            'time' => '2017-04-07',
            'title' => '妙味新闻news2',
            'link' => 'http://miaov.com',
        ),
        array(
            'time' => '2017-03-07',
            'title' => '妙味新闻news3',
            'link' => 'http://miaov.com',
        ),
        array(
            'time' => '2016-12-07',
            'title' => '妙味新闻news1',
            'link' => 'http://miaov.com',
        ),
        array(
            'time' => '2016-11-07',
            'title' => '妙味新闻news2',
            'link' => 'http://miaov.com',
        ),
        array(
            'time' => '2016-10-07',
            'title' => '妙味新闻news3',
            'link' => 'http://miaov.com',
        ),
        array(
            'time' => '2015-11-07',
            'title' => '妙味新闻news1',
            'link' => 'http://miaov.com',
        ),
        array(
            'time' => '2015-08-07',
            'title' => '妙味新闻news2',
            'link' => 'http://miaov.com',
        ),
        array(
            'time' => '2015-06-07',
            'title' => '妙味新闻news3',
            'link' => 'http://miaov.com',
        ),
);

foreach ($newsList as $key => $news) {
    echo $news['time']."<a href='".$news['link']."'>".$news['title']."<a><br><br>";
}