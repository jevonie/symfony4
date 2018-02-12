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
		$('.nav-link').click(function(e){
				$('.nav-link').removeClass('active');
				$(this).addClass('active');
				
		})	 
		$('.nav-link').popover(function(e){
				$('#myModal').modal('show');
		})	
		$('#list').click(function(e){
				e.preventDefault();
				$.ajax({
						url:'/users/list',
		                type: "POST",
		                data: {},
		                success: function (data)
		                {	

		                	var $result = $(data).find('.mycontent');
		                	var response = $('.modal-body').html($result);
		                	// var temp = response.find('.mycontent');
							
							// console.log(temp.html);
		                    $('#myModal').modal('show');
		                }
				})
				
		})	
		$('#form').click(function(e){
			console.log('nfge');
				e.preventDefault();
				$.ajax({
						url:'/form',
		                type: "POST",
		                data: {},
		                success: function (data)
		                {
		                    var $result = $(data).find('.mycontent');
		                	var response = $('.modal-body').html($result);
		                	// var temp = response.find('.mycontent');
							
							// console.log(temp.html);
		                    $('#myModal').modal('show');
		                }
				})
		})	
		$('#index').click(function(e){

				e.preventDefault();
				$.ajax({
						url:'/',
		                type: "POST",
		                data: {},
		                success: function (data)
		                {
		                    var $result = $(data).find('.mycontent');
		                	var response = $('.modal-body').html($result);
		                	// var temp = response.find('.mycontent');
							
							// console.log(temp.html);
		                    $('#myModal').modal('show');
		                }
				})
		})
		$(".nav-item").mouseover(function() {
			var link = $(this).attr("href");
			 
			 console.log('nge');

       	});
       	myTable = $("#myTable").DataTable({ 
       		"scrollY": "200px",
        	"scrollCollapse": true,
    	});
       	myTable.column( 0 ).visible( false );
    	$('#myTable').on( 'click', 'tbody tr td', function () {
    		var dat = $('#active').val();
    		if(!dat){
    			 dat = myTable.cell(this).data();
    		 	if(dat != myTable.row(this).data()[5]){
    		 		old = dat;
    		  		myTable.cell(this).data('<input type="text" id="active" value="'+dat+'"/>')
    		  		$("#active").focus();
    		 	}
    		}
		});
		$('#myTable').on('mouseleave', 'tbody tr td', function () {
			var dats = $("#active").val();
			if(dats){
				myTable.cell(this).data(dats);
				 var row_data = myTable.row(this).data();
				if(old != dats){
					var afields = new Array();
						var dat = {'name': row_data[1],'email':row_data[2],'gender':row_data[3],'description':row_data[4]}
					$.ajax({
						url:'/users/edit/'+row_data[0],
		                type: "POST",
		                data: dat,
		                success: function (data)
		                {
		                    // console.log(data)
		                    // $('div#ajax-results').html(data.output);

		                }
					})
				}
			}else{

			}
			
			
		});
});