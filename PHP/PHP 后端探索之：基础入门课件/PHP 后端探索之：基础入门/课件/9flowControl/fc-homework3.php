<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<style>
    a {margin: 5px;}
    a.active {color: red;}
</style>
<body>

<?php

    $totalPage = 20;
    $page = 20;

    if($page<1){
        $page = 1;
    }

    if($page>$totalPage){
        $page = $totalPage;
    }

    echo '一共'.$totalPage.'页，当前第'.$page.'页。<br><br>';

    if($page != 1){
        echo "<a href='".($page-1)."'>上一页<a>";
    }

    if($totalPage > 10) {
        if($page - 7 < 0 ){
            $begin = 1;
            $end = 10;
        }elseif($totalPage - $page < 4 ){
            $end = $totalPage;
            $begin = $end - 9;
        } else {
            $end = $page + 4 ;
            $begin = $end -9;
        }
    } else {
        $begin = 1;
        $end = $totalPage;
    }

    for($i=$begin; $i<=$end; $i++){
        if($i == $page ){
            echo "<a class='active' href='".$i."'>".$i."<a>";
        } else {
            echo "<a href='".$i."'>".$i."<a>";
        }
    }

    if($page!=$totalPage){
        echo "<a href='".($page-1)."'>下一页<a>";
    }
?>

</body>
</html>