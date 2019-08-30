<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
include('CommentBook.php');

$username = $_POST['username'];
$content = $_POST['content'];

if($username == '' || $content == ''){
//    echo '用户名或评论内容不能为空，<a href="commentBook.php">返回评论区</a>';
    echo json_encode(array('code'=>1,'msg'=>'用户名或评论内容不能为空'));
}else{
    $comment = array('username'=>$username,'content'=>$content);
    $commentBook = new CommentBook();
    $commentBook->write($comment);

    echo json_encode(array('code'=>0,'msg'=>'评论成功'));
}