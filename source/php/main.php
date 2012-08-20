<?php
    session_start();
    if(!session_is_registered(username)){
        header("location: ../../index.php");
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Android Crash Log Server</title>
        <link rel="shortcut icon" type="image/ico" href="../img/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../css/DT_bootstrap.css">
        
        <link rel="stylesheet" type="text/css" href="../css/page.css">
        <link rel="stylesheet" type="text/css" href="../css/table.css">

        
        <style>
          body {
            padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
          }
        </style>

        <script type="text/javascript" language="javascript" src="../js/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" language="javascript" src="../js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" language="javascript" src="../js/DT_bootstrap.js"></script>
    </head> 
    <body>
        
        <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="main.php">Acra Server</a>
          <div class="nav-collapse">
            <ul class="nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
        
		<div class="container" style="margin-top: 10px">
			
<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="crashTable">
                    <?php
                        include("core.php");

                        $names = array("Package Name", "Version Name", "Version Code", "Android Version", "Phone Model", "User Crash Date");

                        display_db_table($global_dbh, $names);
                    ?>
                </table>
			
		</div>
	</body>
</html>