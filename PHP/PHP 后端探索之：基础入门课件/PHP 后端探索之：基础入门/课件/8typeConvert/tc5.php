<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */

$str = '2017miaov';

var_dump($str);

$int1 = (int)$str;

var_dump($int1);

$int2 = intval($str);

var_dump($int2);

var_dump(settype($str,"int"));

var_dump($str);