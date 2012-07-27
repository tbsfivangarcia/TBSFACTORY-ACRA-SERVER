(function($) {
    $.fn.dataTableExt.oApi.fnGetColumnData = function ( oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty ) {
        // check that we have a column id
        if ( typeof iColumn == "undefined" ) return new Array();
                    
        // by default we only wany unique data
        if ( typeof bUnique == "undefined" ) bUnique = true;
                    
        // by default we do want to only look at filtered data
        if ( typeof bFiltered == "undefined" ) bFiltered = true;
                    
        // by default we do not wany to include empty values
        if ( typeof bIgnoreEmpty == "undefined" ) bIgnoreEmpty = true;
                    
        // list of rows which we're going to loop through
        var aiRows;
                    
        // use only filtered rows
        if (bFiltered == true) aiRows = oSettings.aiDisplay; 
        // use all rows
        else aiRows = oSettings.aiDisplayMaster; // all row numbers
                    
        // set up data array	
        var asResultData = new Array();
                    
        for (var i=0,c=aiRows.length; i<c; i++) {
            iRow = aiRows[i];
            var aData = this.fnGetData(iRow);
            var sValue = aData[iColumn];
                        
            // ignore empty values?
            if (bIgnoreEmpty == true && sValue.length == 0) continue;
                        
            // ignore unique values?
            else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1) continue;
                        
            // else push the value onto the result data array
            else asResultData.push(sValue);
        }
                    
        return asResultData;
    }
}(jQuery));
            
            
function fnCreateSelect( aData )
{
    var r='<select><option value=""></option>', i, iLen=aData.length;
    for ( i=0 ; i<iLen ; i++ )
    {
        r += '<option value="'+aData[i]+'">'+aData[i]+'</option>';
    }
    return r+'</select>';
}

/* Formating function for row details */
function fnFormatDetails ( oTable, nTr )
{
    var aData = oTable.fnGetData( nTr );
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" id="detailsTable" >';
    sOut += '<tr><td>Stack Trace:</td><td>'+aData[6]+'</td></tr>';
    sOut += '<tr><td>Version Code:</td><td>'+aData[7]+'</td></tr>';
    sOut += '<tr><td>File Patch:</td><td>'+aData[8]+'</td></tr>';
    sOut += '<tr><td>Brand:</td><td>'+aData[9]+'</td></tr>';
    sOut += '<tr><td>Product:</td><td>'+aData[10]+'</td></tr>';
    sOut += '<tr><td>Build:</td><td>'+aData[11]+'</td></tr>';
    sOut += '<tr><td>Total Mem Size:</td><td>'+aData[12]+'</td></tr>';
    sOut += '<tr><td>Available Mem Size:</td><td>'+aData[13]+'</td></tr>';
    sOut += '<tr><td>Custom Data:</td><td>'+aData[14]+'</td></tr>';
    sOut += '<tr><td>Initial Configuration:</td><td>'+aData[15]+'</td></tr>';
    sOut += '<tr><td>Crash Configuration:</td><td>'+aData[16]+'</td></tr>';
    sOut += '<tr><td>Display:</td><td>'+aData[17]+'</td></tr>';
    sOut += '<tr><td>User Comment:</td><td>'+aData[18]+'</td></tr>';
    sOut += '<tr><td>User App Start Date:</td><td>'+aData[19]+'</td></tr>';
    sOut += '<tr><td>Dumpsys Meminfo:</td><td>'+aData[20]+'</td></tr>';
    sOut += '<tr><td>Dropbox:</td><td>'+aData[21]+'</td></tr>';
    sOut += '<tr><td>Logcat:</td><td>'+aData[22]+'</td></tr>';
    sOut += '<tr><td>Events Log:</td><td>'+aData[23]+'</td></tr>';
    sOut += '<tr><td>Radio Log:</td><td>'+aData[24]+'</td></tr>';
    sOut += '<tr><td>Is Silent:</td><td>'+aData[25]+'</td></tr>';
    sOut += '<tr><td>Device ID:</td><td>'+aData[26]+'</td></tr>';
    sOut += '<tr><td>Installation ID:</td><td>'+aData[27]+'</td></tr>';
    sOut += '<tr><td>User Mail:</td><td>'+aData[28]+'</td></tr>';
    sOut += '<tr><td>Device Features:</td><td>'+aData[29]+'</td></tr>';
    sOut += '<tr><td>Environment:</td><td>'+aData[30]+'</td></tr>';
    sOut += '<tr><td>Shared Preferences:</td><td>'+aData[31]+'</td></tr>';
    sOut += '<tr><td>Shared Preferences:</td><td>'+aData[32]+'</td></tr>';
    
    sOut += '</table>';
				
    return sOut;
}
			
$(document).ready(function() {
    /*
                 * Insert a 'details' column to the table
                 */
    var nCloneTh = document.createElement( 'th' );
    var nCloneTd = document.createElement( 'td' );
    nCloneTd.innerHTML = '<img src="./source/images/details_open.png">';
    nCloneTd.className = "center";
				
    $('#crashTable thead tr').each( function () {
        this.insertBefore( nCloneTh, this.childNodes[0] );
    } );
				
    $('#crashTable tbody tr').each( function () {
        this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
    } );
				
    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    var oTable = $('#crashTable').dataTable( {
        "bJQueryUI": true,
        
        "bAutoWidth": false,
      
        "sPaginationType": "full_numbers",
        
        "aaSorting": [[5, 'desc']],

        "aoColumnDefs": [
        {
            "bSortable": false, 
            "aTargets": [ 0 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 6 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 7 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 8 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 9 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 10 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 11 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 12 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 13 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 14 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 15 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 16 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 17 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 18 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 19 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 20 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 21 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 22 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 23 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 24 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 25 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 26 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 27 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 28 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 29 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 30 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 31 ]
        },
        {
            "bVisible": false, 
            "aTargets": [ 32 ]
        }
        ]
    });

    /* Add a select menu for each TH element in the table footer */
    $("tfoot th").each( function ( i ) {
        this.innerHTML = fnCreateSelect( oTable.fnGetColumnData(i) );
        $('select', this).change( function () {
            oTable.fnFilter( $(this).val(), i );
        } );
    } );	
                
    /* Add event listener for opening and closing details
     * Note that the indicator for showing which row is open is not controlled by DataTables,
     * rather it is done here
     */
    $('#crashTable tbody td img').live('click', function () {
        var nTr = this.parentNode.parentNode;
        if ( this.src.match('details_close') )
        {
            /* This row is already open - close it */
            this.src = "./source/images/details_open.png";
            oTable.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            this.src = "./source/images/details_close.png";
            oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
        }
    } );
} );