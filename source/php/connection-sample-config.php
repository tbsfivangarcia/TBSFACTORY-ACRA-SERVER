<?php

    // Fill the fields and rename this file to 'connection.php'

    $dbhost = "database-address";
    $dbname = "dababase-name";
    $dbuser = "user-name";
    $dbpass = "user-password";
    
    $global_dbh = mysql_connect($dbhost, $dbuser, $dbpass)
            or die("Couldn't connect to database");
    mysql_select_db($dbname)
            or die("Couldn't select database");
    
?> 
