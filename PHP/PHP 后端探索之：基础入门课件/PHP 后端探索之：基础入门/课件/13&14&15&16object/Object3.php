<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
class Pager{
    public $page;
    public $totalPage;
    public $link;

    public function __construct($totalPage, $link, $page = 1){
        $this->page = $page;
        $this->totalPage = $totalPage;
        $this->link = $link;
    }

}

$pager = new Pager(10, 'http:://miaov.com', 2);
print_r($pager);






















