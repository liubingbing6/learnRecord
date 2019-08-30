<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
$a = 1;

echo $a;
echo '<br>';

function test($a){
    /*$a = 2;
    echo $a;
    echo '<br>';*/

//    global $a,$b;
    $b = 2;
    echo $GLOBALS['a'].','.$b;
    echo '<br>';
//    print_r($GLOBALS);
}

test($a);
echo $a;
echo '<br>';
