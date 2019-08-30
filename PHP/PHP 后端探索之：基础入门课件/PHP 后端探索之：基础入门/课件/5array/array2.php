<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */

$newsList = array('news1', 'news2', 'news3');

$newsList2 = ['news1', 'news2', 'news3'];

/*var_dump($newsList);
echo '<br>';*/

$newsList3 = array(
    10 => 'news1',
    1 => 'news2',
    'string' => 'news3',
    'int' => 1,
    'float' => 1.5,
    'bool' => true,
    'array' => array(),
);

/*var_dump($newsList3);
echo '<br>';*/

$newsList3[] = 'new4';

$newsList3[-1] = 'news5';

$newsList3[-1] = 'news5-1';

$newsList3[11] = 'news4-1';

unset($newsList3[-1]);

echo $newsList3[11];

//print_r($newsList3);