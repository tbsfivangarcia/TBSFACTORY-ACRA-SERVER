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


/* Default class modification */
$.extend( $.fn.dataTableExt.oStdClasses, {
	"sWrapper": "dataTables_wrapper form-inline"
} );

/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
{
	return {
		"iStart":         oSettings._iDisplayStart,
		"iEnd":           oSettings.fnDisplayEnd(),
		"iLength":        oSettings._iDisplayLength,
		"iTotal":         oSettings.fnRecordsTotal(),
		"iFilteredTotal": oSettings.fnRecordsDisplay(),
		"iPage":          Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
		"iTotalPages":    Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
	};
}

/* Bootstrap style pagination control */
$.extend( $.fn.dataTableExt.oPagination, {
	"bootstrap": {
		"fnInit": function( oSettings, nPaging, fnDraw ) {
			var oLang = oSettings.oLanguage.oPaginate;
			var fnClickHandler = function ( e ) {
				e.preventDefault();
				if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
					fnDraw( oSettings );
				}
			};

			$(nPaging).addClass('pagination').append(
				'<ul>'+
					'<li class="prev disabled"><a href="#">&larr; '+oLang.sPrevious+'</a></li>'+
					'<li class="next disabled"><a href="#">'+oLang.sNext+' &rarr; </a></li>'+
				'</ul>'
			);
			var els = $('a', nPaging);
			$(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
			$(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
		},

		"fnUpdate": function ( oSettings, fnDraw ) {
			var iListLength = 5;
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			var i, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

			if ( oPaging.iTotalPages < iListLength) {
				iStart = 1;
				iEnd = oPaging.iTotalPages;
			}
			else if ( oPaging.iPage <= iHalf ) {
				iStart = 1;
				iEnd = iListLength;
			} else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
				iStart = oPaging.iTotalPages - iListLength + 1;
				iEnd = oPaging.iTotalPages;
			} else {
				iStart = oPaging.iPage - iHalf + 1;
				iEnd = iStart + iListLength - 1;
			}

			for ( i=0, iLen=an.length ; i<iLen ; i++ ) {
				// Remove the middle elements
				$('li:gt(0)', an[i]).filter(':not(:last)').remove();

				// Add the new list items and their event handlers
				for ( j=iStart ; j<=iEnd ; j++ ) {
					sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
					$('<li '+sClass+'><a href="#">'+j+'</a></li>')
						.insertBefore( $('li:last', an[i])[0] )
						.bind('click', function (e) {
							e.preventDefault();
							oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
							fnDraw( oSettings );
						} );
				}

				// Add / remove disabled classes from the static elements
				if ( oPaging.iPage === 0 ) {
					$('li:first', an[i]).addClass('disabled');
				} else {
					$('li:first', an[i]).removeClass('disabled');
				}

				if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
					$('li:last', an[i]).addClass('disabled');
				} else {
					$('li:last', an[i]).removeClass('disabled');
				}
			}
		}
	}
} );


function fnCreateSelect( aData , num)
{
    var r='<select id="select"><option value=""></option>', i, iLen=aData.length;
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
    var sOut = '<table class="table table-bordered" cellpadding="5" cellspacing="0" border="0" id="detailsTable" width="500px"; >';
        sOut += '<tr><td>Stack Trace:</td><td>'+aData[7]+'</td></tr>';
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
        sOut += '<tr><td>Eventslog:</td><td>'+aData[23]+'</td></tr>';
        sOut += '<tr><td>Radiolog:</td><td>'+aData[24]+'</td></tr>';
        sOut += '<tr><td>Is Silent:</td><td>'+aData[25]+'</td></tr>';
        sOut += '<tr><td>Device ID:</td><td>'+aData[26]+'</td></tr>';
        sOut += '<tr><td>Installation ID:</td><td>'+aData[27]+'</td></tr>';
        sOut += '<tr><td>User Mail:</td><td>'+aData[28]+'</td></tr>';
        sOut += '<tr><td>Device Features:</td><td>'+aData[29]+'</td></tr>';
        sOut += '<tr><td>Environment:</td><td>'+aData[30]+'</td></tr>';
        sOut += '<tr><td>Shared Preferences:</td><td>'+aData[31]+'</td></tr>';
        sOut += '<tr width=\"600px\"><td>Settings System:</td><td>'+aData[32]+'</td></tr>';
        sOut += '<tr width=\"600px\"><td>Settings Secure:</td><td>'+aData[33]+'</td></tr>';
        sOut += '</table>';			
    return sOut;
}

/* Table initialisation */
$(document).ready(function() {
    /*
                 * Insert a 'details' column to the table
                 */
    var nCloneTh = document.createElement( 'th' );
    var nCloneTd = document.createElement( 'td' );
    nCloneTd.innerHTML = '<img src="../img/open-icon.png">';
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

        "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
                "sLengthMenu": "_MENU_ records per page"
        },
        "aaSorting": [[6, 'desc']],
        "aoColumnDefs": [
        {
            "bSortable": false, 
            "aTargets": [ 0 ]
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
        ,
        {
            "bVisible": false, 
            "aTargets": [ 33 ]
        }
        ]
    });

    /* Add a select menu for each TH element in the table footer */
    $("tfoot th").each( function ( i ) {
        if (i != 0) {
        this.innerHTML = fnCreateSelect( oTable.fnGetColumnData(i) , i);
        $('select', this).change( function () {
            oTable.fnFilter( $(this).val(), i );
        } );
    }
    } );	
                
    /* Add event listener for opening and closing details
     * Note that the indicator for showing which row is open is not controlled by DataTables,
     * rather it is done here
     */
    $('#crashTable tbody td img').live('click', function () {
        var nTr = this.parentNode.parentNode;
        if ( this.src.match('close-icon') )
        {
            /* This row is already open - close it */
            this.src = "../img/open-icon.png";
            oTable.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            this.src = "../img/close-icon.png";
            oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
        }
    } );
} );