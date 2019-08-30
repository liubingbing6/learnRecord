<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */

$a = 5;

//echo $a;

//+,-,*,/,%

$c = -$a;

$b = 1;

//@$c = $a % $b;

$c = $b != 0 ? $a%$b : $c;
echo $c;