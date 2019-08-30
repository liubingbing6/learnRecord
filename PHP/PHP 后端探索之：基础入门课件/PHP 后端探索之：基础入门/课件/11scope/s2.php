<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
function test(){
    static $count = 0;
    $count++;

    echo $count.' ';

    if($count<10){
        test();
    }
}

test();
