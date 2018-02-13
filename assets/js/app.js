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
var myTable,old,myTableModal;

$(document).ready(function() {
		myTable = $("#myTable").DataTable({ 
       		"scrollX": true,
        	"scrollCollapse": true,
    	});
    	myTableModal = $("#myTableModal").DataTable({ 
       		"scrollX": true,
        	"scrollCollapse": true,
    	});
		$('#list').click(function(e){
				e.stopPropagation();
				myTableModal.clear();
				$.ajax({
						url:'/json/list',
		                type: "POST",
		                data: {},
		                success: function (data)
		                {	      	
		                	$.each(data, function (key ,val) {
						        myTableModal.row.add( [
						        	val['id'],
						            val['name'],
						            val['email'],
						            val['gender'],
						            val['description'],
						            "<a href='#' data-id='"+val['id']+"' class='delete'>Delete</a>"
						        ] ).draw( false );
						    });
						    $('.static-content').hide();
						    $('.form-button').hide();
						    $('.table-content').show();
		                    $('#myModal').modal('show');
		                }
				})
				
		})	
		
		$('#form').click(function(e){
				e.stopPropagation();
				$.ajax({
						url:'/form',
		                type: "POST",
		                data: {},
		                success: function (data)
		                {	
		                	var $result = $(data).find('.mycontent');
		                	var response = $('.static-content').html($result);
		                	$('.static-content').show();
		                	$('.form-button').show();
		                	$('.table-content').hide();
		                    $('#myModal').modal('show');
		                }
				})
		})	
		$('#index').click(function(e){
				e.stopPropagation();
                // var $result = $('#index-tab').find('#index-tab');
            	var response = $('.static-content').html($('#index-tab').html());
            	$('.static-content').show();
            	$('.form-button').hide();
            	$('.table-content').hide();
                $('#myModal').modal('show');
		          
		})
		$('.nav-item').click(function() {
			$(".nav-item").removeClass("active");
			$(this).addClass('active');
		})
		// $('#index').hide();
		$('#main-form').click(function(e){
				e.preventDefault();
				$('#index').show();
				$('#list').show();
				$('#form').hide();
				$.ajax({
						url:'/form',
		                type: "POST",
		                data: {},
		                success: function (data)
		                {
		                    var $result = $(data).find('.mycontent');
		                	var response = $('#form-content').html($result);
		                }
				})
		})	
		$('#main-index').click(function(e){
				e.preventDefault();
				$('#form').show();
				$('#list').show();
				$('#index').hide();
				$.ajax({
						url:'/',
		                type: "POST",
		                data: {},
		                success: function (data)
		                {
		                    var $result = $(data).find('.mycontent');
		                	var response = $('#index-content').html($result);
		                }
				})
		})	
		$('#main-list').click(function(e){
				e.preventDefault();
				$('#form').show();
				$('#index').show();
				$('#list').hide();
				$('.js-controller').remove();
				myTable.clear();
				$.ajax({
						url:'/json/list',
		                type: "POST",
		                data: {},
		                success: function (data)
		                {	
		                	$.each(data, function (key ,val) {
						        myTable.row.add( [
						        	val['id'],
						            val['name'],
						            val['email'],
						            val['gender'],
						            val['description'],
						            "<a href='#' data-id='"+val['id']+"' class='delete'>Delete</a>"
						        ] ).draw( false );
						    });
		                }
				})
		})	
       
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
		myTableModal.column( 0 ).visible( false );
		$('#myTableModal').on( 'click', 'tbody tr td', function () {
    		var dat = $('#active').val();
    		if(!dat){
    			 dat = myTableModal.cell(this).data();
    		 	if(dat != myTableModal.row(this).data()[5]){
    		 		old = dat;
    		  		myTableModal.cell(this).data('<input type="text" id="active" value="'+dat+'"/>')
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
		$('#myTableModal').on('mouseleave', 'tbody tr td', function () {
			var dats = $("#active").val();
			if(dats){
				myTableModal.cell(this).data(dats);
				 var row_data = myTableModal.row(this).data();
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
		$('#form_submit').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				console.log('aw');
				$.ajax({
						url:'/form',
		                type: "POST",
		                data: $('.form').serializeArray(),
		                success: function (data)
		                {	
		                	var $result = $(data).find('.mycontent');
		                	var response = $('#form-content').html($result);
		                }
				})
		})	

		$('#form_submit_modal').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				console.log('aw');
				$.ajax({
						url:'/form',
		                type: "POST",
		                data: $('.static-content > .mycontent > .form').serializeArray(),
		                success: function (data)
		                {	
		                	var $result = $(data).find('.mycontent');
		                	var response = $('.static-content').html($result);
		                }
				})
		})	
		$('.goto-list').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				$('#myModal').modal('hide');
				$('#main-list').click();
		});
		$('.goto-form').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				$('#main-form').click();
		});
		$('.static-content').on('click','.goto-form',function(e){
				$('#myModal').modal('hide');
				$('#main-form').click();
		});
		 $('#myTable tbody').on( 'click', 'a', function () {
        	$.ajax({
				url:'/users/delete/'+ $(this).attr('data-id'),
                type: "POST",
                data: {},
                success: function (data)
                {
                   $('#main-list').click();
                }
			});
    	} );
    	$('#myTableModal tbody').on( 'click', 'a', function () {
        	$.ajax({
				url:'/users/delete/'+ $(this).attr('data-id'),
                type: "POST",
                data: {},
                success: function (data)
                {
                   $('#myModal').modal('hide');
                   $('#main-list').click();
                }
			});
    	} );		
		

});