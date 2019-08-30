<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<label>用户名：</label><input type="text" name="username" size="35" id="username"><br><br>
<label>评论内容：</label><textarea rows="10" cols="30" name="content" id="content"></textarea><br><br>
<input type="submit" value="提交" id="submit"><br><br>

<?php
include('CommentBook.php');

$page = isset($_GET['page'])?intval($_GET['page']):1;
$limit = isset($_GET['limit'])?intval($_GET['limit']):3;

$commentBook = new CommentBook();
$commentBook->view($page, $limit, 'viewAjaxComment.php');
?>
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script>
    $('#submit').on('click',function(){
        $.ajax({
            type:'POST',
            url:'addAjaxComment.php',
            dataType:'json',
            data:{'username':$('#username').val(),'content':$('#content').val()},
            success:function(data){
                alert(data.msg);
                if(!data.code){
                    window.location.reload();
                }
            }
        });
    });
</script>
</body>
</html>