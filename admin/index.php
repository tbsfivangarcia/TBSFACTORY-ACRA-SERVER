<!--
/*
 *  Copyright 2010 Felix Schulze
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />

        <title>Android ACRA Crash Log Server</title>
        <style type="text/css" title="currentStyle">
            @import "../source/css/page.css";
            @import "../source/css/table.css";
            @import "../source/themes/smoothness/jquery-ui-1.8.4.custom.css";

        </style>
        <script type="text/javascript" language="javascript" src="../source/js/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" language="javascript" src="../source/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" language="javascript" src="../source/js/dataTablesSettings2.js"></script>


    </head>
    <body id="dt_crashLogs">
        <div id="container">
            <div class="full_width big">Android Crash Logs</div>

            <div id="crashlogs">
                <table cellpadding="0" cellspacing="0" border="0" class="display" id="crashTable">
                    <?php
                    include("../source/php/core2.php");

                    $names = array("Package Name", "Version Name", "Version Code", "Android Version", "Phone Model", "User Crash Date");

                    display_db_table($table, $global_dbh, $names);
                    ?>
                </table>
            </div>
            <div class="spacer"></div>

        </div>
    </body>
</html>