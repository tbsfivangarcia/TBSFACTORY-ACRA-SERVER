<?php

include("./connection.php");

function display_db_query($query_string, $connection, $names) {
    $result_id = mysql_query($query_string, $connection)
            or die("display_db_query:" . mysql_error());
    $column_count = mysql_num_fields($result_id)
            or die("display_db_query:" . mysql_error());

    print "<thead>\n";
    print("<tr>\n");

    for ($column_number = 0; $column_number < $column_count; $column_number++) {
        $field_name = $names[$column_number];
        print("<th>$field_name</th>\n");
    }
    print("</tr>\n");
    print "</thead>\n";

    print("<tbody>\n");

    while ($row = mysql_fetch_row($result_id)) {
        print("<tr class=\"odd gradeA\">");
        for ($column_number = 0; $column_number < $column_count; $column_number++) {
            $cuttext = wordwrap($row[$column_number], 100, "\n", true);
            print("<td>$cuttext</td>\n");
        }
        print("</tr>\n");
    }

    print("</tbody>\n");


    print "<tfoot>\n";

    print("<tr>\n");
    print("<th></th>\n");
    for ($column_number = 0; $column_number < $column_count; $column_number++) {
                $field_name = $names[$column_number];
                print("<th>$field_name</th>\n");
                
                
    }
    print("</tr>\n");

    print "</tfoot>\n";
}

function display_db_table($connection, $names) {
    $fields = array("PACKAGE_NAME", "APP_VERSION_NAME", "APP_VERSION_CODE","ANDROID_VERSION", "PHONE_MODEL", "USER_CRASH_DATE",
        "STACK_TRACE", "FILE_PATH", "BRAND", "PRODUCT", "BUILD", "TOTAL_MEM_SIZE", "AVAILABLE_MEM_SIZE", "CUSTOM_DATA",
        "INITIAL_CONFIGURATION", "CRASH_CONFIGURATION", "DISPLAY", "USER_COMMENT", "USER_APP_START_DATE", "DUMPSYS_MEMINFO",
        "DROPBOX", "LOGCAT", "EVENTSLOG", "RADIOLOG", "IS_SILENT", "DEVICE_ID", "INSTALLATION_ID", "USER_EMAIL", "DEVICE_FEATURES",
        "ENVIRONMENT", "SHARED_PREFERENCES", "SETTINGS_SYSTEM", "SETTINGS_SECURE");

    $query_string = 'SELECT ' . implode(',', $fields) . ' FROM ReportContent';

    display_db_query($query_string, $connection, $names);
}

?>
