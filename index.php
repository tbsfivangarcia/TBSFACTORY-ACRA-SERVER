<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />

        <title>Android Crash Log Server</title>
        <style type="text/css" title="currentStyle">
            @import "./source/css/page.css";
            @import "./source/css/table.css";
            @import "./source/themes/smoothness/jquery-ui-1.8.4.custom.css";

        </style>
        <script type="text/javascript" language="javascript" src="./source/js/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" language="javascript" src="./source/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" language="javascript" src="./source/js/dataTablesSettings.js"></script>
    </head>
    <body id="dt_crashLogs">
        <div id="container">
            <div class="full_width big">Android Crash Logs</div>

            <div id="crashlogs">
                <table cellpadding="0" cellspacing="0" border="0" class="display" id="crashTable">
                    <?php
                    include("./source/php/core.php");

                    $names = array("Package Name", "Version Name", "Android Version", "Phone Model", "User Crash Date");

                    display_db_table($table, $global_dbh, $names);
                    ?>
                </table>
            </div>
            <div class="spacer"></div>

        </div>
    </body>
</html>
