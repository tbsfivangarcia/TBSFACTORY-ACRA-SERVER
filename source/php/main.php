<?php
    session_start();
    if(!session_is_registered(username)){
        header("location: ./../../index.php");
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />

        <title>Android Crash Log Server</title>
        <style type="text/css" title="currentStyle">
            @import "../css/page.css";
            @import "../css/table.css";
            @import "../themes/smoothness/jquery-ui-1.8.4.custom.css";

        </style>
        <script type="text/javascript" language="javascript" src="../js/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" language="javascript" src="../js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" language="javascript" src="../js/dataTablesSettings.js"></script>
    </head>
    <body id="dt_crashLogs">
        <div id="container">
            <div class="full_width big">Android Crash Logs</div>
            <a class="logout" href="logout.php">Logout</a>

            <div id="crashlogs">
                <table cellpadding="0" cellspacing="0" border="0" class="display" id="crashTable">
                    <?php
                        include("./core.php");

                        $names = array("Package Name", "Version Name", "Version Code", "Android Version", "Phone Model", "User Crash Date");

                        display_db_table($table, $global_dbh, $names);
                    ?>
                </table>
            </div>
            <div class="spacer"></div>

        </div>
    </body>
</html>
