<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
$result = Calculator(10,'a','/');
if($result['code'] != 0){
    echo $result['msg'];
}else{
    echo $result['result'];
}

function calculator($num1, $num2, $op){
    if(!is_numeric($num1) || !is_numeric($num2)){
        return ['code'=>1,'msg'=>'数值不符合要求'];
    }else{
        switch ($op){
            case '+':
                return ['code'=>0,'result'=>$num1+$num2];
            case '-':
                return ['code'=>0,'result'=>$num1-$num2];
            case '*':
                return ['code'=>0,'result'=>$num1*$num2];
            case '/':
                if($num2 == 0){
                    return ['code'=>1,'msg'=>'除数不能为0'];
                }
                return ['code'=>0,'result'=>$num1/$num2];
            default :
                return ['code'=>1,'msg'=>'未知运算符'];
        }
    }
}
















