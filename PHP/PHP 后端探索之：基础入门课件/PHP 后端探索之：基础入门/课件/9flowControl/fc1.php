<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
$status = 2;
if($status == 0){
    echo '请先登陆';
}elseif($status == 2){
    echo '已被禁言';
}else{
    echo '欢迎登陆';
}


