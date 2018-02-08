// assets/js/app.js
require('../css/app.scss');
require('../DataTables/datatables.min.css');
require('../bootstrap/css/bootstrap.min.css');
// require('../bootstrap/js/bootstrap.js');
require('../DataTables/datatables.min.js');
// ...rest of JavaScript code here
var $ = require('jquery');
// JS is equivalent to the normal "bootstrap" package
// no need to set this to a variable, just require it
require('bootstrap-sass');
// or you can include specific pieces
// require('bootstrap-sass/javascripts/bootstrap/tooltip');
// require('bootstrap-sass/javascripts/bootstrap/popover');
var myTable,old;

$(document).ready(function() {

       	myTable = $("#myTable").DataTable();
       	myTable.column( 0 ).visible( false );
    	$('#myTable').on( 'click', 'tbody tr td', function () {
    		var dat = $('#active').val();
    		if(!dat){
    		   dat = myTable.cell(this).data();
    		   old = dat;
    		  myTable.cell(this).data('<input type="text" id="active" value="'+dat+'"/>')
    		  $("#active").focus();
    		}
		});
		$('#myTable').on('mouseleave', 'tbody tr td', function () {
			var dats = $("#active").val();
			if(dats){
				myTable.cell(this).data(dats);
				 var row_data = myTable.row(this).data();
				console.log(myTable.row(this).data());
				if(old != dats){
					$.ajax({
						url:'/users/edit/'+row_data[0],
		                type: "POST",
		                data: row_data,
		                async: true,
		                success: function (data)
		                {
		                    console.log(data)
		                    $('div#ajax-results').html(data.output);

		                }
					})
				}
			}else{

			}
			
			
		});
});