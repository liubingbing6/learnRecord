<?php
/**
 * Created by miaov.com - PHP之旅.
 * User: miaov
 * Details: 
 */
class Comment{
    private $username;
    protected $content;

    public function setUsername($username){
        $this->username = $username;
    }

    public function getUsername(){
        return $this->username;
    }

    public function __set($name, $value){
        $this->$name = $value;
    }

    public function __get($name){
        return $this->$name;
    }

}

$comment = new Comment();
//var_dump($comment);
$comment->username = 'miaov';
echo $comment->username;

$comment->content = ' is good!';
echo $comment->content;
/*$comment->setUsername('miaov');
echo $comment->getUsername();*/

/*$comment->set('username','miaov');
echo $comment->get('username');

$comment->set('content',' is good!');
echo $comment->get('content');*/




class CommentBook{
    const FilePath = 'commnetBook.txt';

    public function getCommentList(){
        return unserialize(file_get_contents(self::FilePath));
    }

    public function write($commentData){
        $commentList = $this->getCommentList();
    }

}
echo '<br>';
$commentBook = new CommentBook();
echo $commentBook::FilePath;








