<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
$arr = [0,1,2];
$status = 0;
switch($status){
    case $arr[0]:
        echo '请先登录';
        break;
    case 1:
        echo '欢迎登陆';
        break;
    case 2:
        echo '已禁言';
        break;
}