<html>
<head>
<link rel="stylesheet" type="text/css" href="comment_style.css">
<script type="text/javascript" src="jquery.js">
<script type="text/javascript">
function post()
{
  var content = document.getElementById("content").value;
  var name = document.getElementById("username").value;
  if(comment && name)
  {
    $.ajax
    ({
      type: 'post',
      url: 'post_content.php',
      data: 
      {
         user_comm:content,
	     user_name:name
      },
      success: function (response) 
      {
	    document.getElementById("all_comment").innerHTML=response+document.getElementById("all_comment").innerHTML;
	    document.getElementById("content").value="";
      document.getElementById("username").value="";
  
      }
    });
  }
  
  return false;
}
</script>

</head>

<body>

  <!-- Instant Comment System Using Ajax,PHP and MySQL -->

  <form method='post' action="" onsubmit="return post();">
  <textarea id="content" placeholder="Write Your Comment Here....."></textarea>
  <br>
  <input type="text" id="username" placeholder="Your Name">
  <br>
  <input type="submit" value="Post Comment">
  </form>

  <div id="all_comment">
  <?php
    $host="localhost";
    $username="root";
    $password="";
    $databasename="sample";

    $connect=mysql_connect($host,$username,$password);
    $db=mysql_select_db($databasename);
  
    $comm = mysql_query("select name,comment,post_time from comments order by post_time desc");
    while($row=mysql_fetch_array($comm))
    {
	  $name=$row['name'];
	  $comment=$row['comment'];
      $time=$row['post_time'];
    ?>
	
	<div class="comment_div"> 
	  <p class="name">Posted By:<?php echo $name;?></p>
      <p class="comment"><?php echo $content;?></p>	
	  <p class="time"><?php echo $time;?></p>
	</div>
  
    <?php
    }
    ?>
  </div>

</body>
</html>