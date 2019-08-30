<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
class Tools{
    public static $titleSuffix = '妙味课堂';
    public $test = 'test';

    public function test(){
        echo 'test';
        self::parseTitle('test');
    }

    public static function parseTitle($title){
        return $title.'-'.self::$titleSuffix;
    }

}

//echo Tools::$titleSuffix;

echo Tools::parseTitle('VIP');


