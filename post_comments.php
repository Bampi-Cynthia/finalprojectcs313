<?php
$host="localhost";
$username="root";
$password="";
$databasename="sample";

$connect=mysql_connect($host,$username,$password);
$db=mysql_select_db($databasename);

if(isset($_POST['user_comm']) && isset($_POST['user_account_id']))
{
  $comment=$_POST['user_comm'];
  $account_id=$_POST['user_account_id'];
  $insert=mysql_query("insert into comments values('','$account_id','$content',CURRENT_TIMESTAMP)");
  
  $id=mysql_insert_id($insert);

  $select=mysql_query("select id,content,post_date from comment where account_id='$account_id' and content='$content' and id='$id'");
  
  if($row=mysql_fetch_array($select))
  {
	  $account_id=$row['account_id'];
	  $content=$row['content'];
      $time=$row['post_date'];
  ?>
      <div class="comment_div"> 
	    <p class="name">Posted By:<?php echo $account_id;?></p>
        <p class="comment"><?php echo $content;?></p>	
	    <p class="time"><?php echo $time;?></p>
	  </div>
  <?php
  }
exit;
}

?>