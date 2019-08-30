<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
class CommentBook {
    const FilePath = 'commentBook.txt';

    public function getAllCommentList(){
        return unserialize(file_get_contents(self::FilePath));
    }

    public function write($commentData){
        $commentList = $this->getAllCommentList();

        if(is_array($commentList)){
            array_unshift($commentList,$commentData);
        }else{
            $commentList = [$commentData];
        }

        $commentFile = fopen(self::FilePath,'w');
        fwrite($commentFile,serialize($commentList));
        fclose($commentFile);
    }

    public function view($page, $limit, $link){
        $commentList = $this->getAllCommentList();
        $totalCount= count($commentList);

        $totalPage = ceil($totalCount/$limit);
        if($page<1){
            $page = 1;
        }

        if($page > $totalPage){
            $page = $totalPage;
        }

        $from = ($page-1)*$limit;
        for($i=$from;$i<$from+$limit;$i++){
            if(isset($commentList[$i])){
                echo '用户名：'.$commentList[$i]['username'].'<br>评论内容：'.$commentList[$i]['content'].'<hr>';
            }else{
                break;
            }
        }

        for($i=1;$i<=$totalPage;$i++){
            echo "<a href='$link?page=$i&limit=$limit'>$i</a>  ";
        }
    }
}