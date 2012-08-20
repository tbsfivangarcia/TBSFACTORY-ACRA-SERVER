<?php

    include("source/php/connection.php");
    if ($_POST['username'] && $_POST['password']) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        // To protect MySQL injection
        $username = stripslashes($username);
        $password = stripslashes($password);
        $username = mysql_real_escape_string($username);
        $password = mysql_real_escape_string($password);

        $sql = "SELECT user_name, password FROM Users WHERE user_name = '$username' and password = '$password'";
        $result = mysql_query($sql) or die(mysql_error());
        $row = mysql_fetch_array($result);
        if ($row) {
            $_SESSION["username"] = $row['user_name'];
            session_register("username");
            session_register("password");
            session_start();
            if (session_is_registered(username))
                header('Location: source/php/main.php');
        }
    }
    
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <!-- Le styles -->
    <link href="source/css/bootstrap.css" rel="stylesheet">
    <style>
      body {
        padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
      }
    </style>
    <link href="source/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="source/css/login.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
        
        <link rel="shortcut icon" href="source/ico/favicon.ico">
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="source/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="source/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="source/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="source/ico/apple-touch-icon-57-precomposed.png">
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
          <a class="brand" href="#">Acra Server</a>
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

    <div class="container">

      <div id="wrapper">
                <div class="user-icon"></div>
                <div class="pass-icon"></div>
                <form name="login-form" class="login-form" action="index.php" method="post">
                    <div class="header">
                        <h1>Login Acra Server</h1>
                    </div>
                    <div class="content">
                        <input name="username" type="text" class="input username" value="Username" onfocus="this.value=''" />
                        <input name="password" type="password" class="input password" value="Password" onfocus="this.value=''" />
                    </div>
                    <div class="footer">
                        <input type="submit" name="submit" value="Login" class="button" />
                    </div>
                </form>
            </div>

    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="source/js/jquery-1.7.2.min.js"></script>
    <script src="source/js/bootstrap-transition.js"></script>
    <script src="source/js/bootstrap-alert.js"></script>
    <script src="source/js/bootstrap-modal.js"></script>
    <script src="source/js/bootstrap-dropdown.js"></script>
    <script src="source/js/bootstrap-scrollspy.js"></script>
    <script src="source/js/bootstrap-tab.js"></script>
    <script src="source/js/bootstrap-tooltip.js"></script>
    <script src="source/js/bootstrap-popover.js"></script>
    <script src="source/js/bootstrap-button.js"></script>
    <script src="source/js/bootstrap-collapse.js"></script>
    <script src="source/js/bootstrap-carousel.js"></script>
    <script src="source/js/bootstrap-typeahead.js"></script>
    

  </body>
</html>
