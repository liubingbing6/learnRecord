<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
for($i=0;$i<11;$i++){
    if($i==3){
        echo '不输出3';
        continue;
    }
    if($i>6){
        break;
    }
    echo $i.'<br>';
}

echo '<hr>';
exit('over');

$i = 0;
while($i<11){
    echo $i.'<br>';
    $i=$i+2;
}


echo '<hr>';

$i = 11;
do{
    echo $i.'<br>';
    $i++;
}while($i<11);