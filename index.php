<?php

    include("./source/php/connection.php");
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
                header('Location:./source/php/main.php');
        }
    }
?>


<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />

        <title>Android Crash Log Server</title>
        <style type="text/css" title="currentStyle">
            @import "./source/css/login.css";

        </style>
        <script type="text/javascript" language="javascript" src="./source/js/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" language="javascript" src="./source/js/login.js"></script>
        
    </head>
    <body id="dt_crashLogs">
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
    </body>
</html>