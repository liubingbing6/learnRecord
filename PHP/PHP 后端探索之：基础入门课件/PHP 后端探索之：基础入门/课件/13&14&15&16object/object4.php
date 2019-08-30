<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
class BaseClass{
    public $user;

    public function __construct(){
        echo '验证登陆';
    }

    public function error(){
        echo "404<br>";
    }
}

class SubClass extends BaseClass{
    public function __construct(){
        parent::__construct();
        echo '验证权限';
    }

    public function test(){
        $this->user;
        $this->error();
    }

    public function error(){
        echo 'error';
    }

}

$subClass = new SubClass();