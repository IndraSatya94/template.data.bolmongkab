$( document ).ready(function() {
	var urlArray = window.location.href.split('/');

	if (urlArray[urlArray.length-2] == 'detail_data') {
		$.ajax({
			url: $('#renderUrl').val(),
			data: {
				url: $('#dataUrl').val()
			},
			success: function (response) {
				$("#example").DataTable({
					data:response.data, 
					columns:response.columns,
					scrollX: true,
					language: {
						url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Indonesian-Alternative.json"
					}
				});
			}
		});
	}

	//Get all un-parsed data time
	var allDateTime = document.querySelectorAll('input#dataTime');

	//Load all container parsed data time
	var resultParsedTime = document.querySelectorAll('span#parsedDataTime');

	$.each(allDateTime, function(index, val) {
		// Parsing
		var parsedDataTime = moment(val.value).fromNow();

		// Put data back
		resultParsedTime[index].insertAdjacentText('afterbegin',parsedDataTime);
	});

	function addToFolder(resourceId, url) {
		$.ajax({
			url: url,
			type: 'POST',
			data: {
				resource_id: resourceId
			},
			success: function (result) {
				$('#folderAddModal').modal('show');
			}
		});
	}

	function deleteData(resourceId, url) {
		$.ajax({
			url: url,
			type: 'POST',
			data: {
				resource_id: resourceId
			},
			success: function (result) {
				location.reload();
			}
		});
	}

	$(".my-rating").starRating({
		totalStars: 5,
		starShape: 'rounded',
		starSize: 30,
		strokeColor: 'lightgray',
		emptyColor: 'lightgray',
		hoverColor: '#FCBF49',
		activeColor: '#F77F00',
		ratedColor: '#FCBF49',
		useGradient: false,
		callback: function(currentRating, $el) {
			$.ajax({
				url: $('#ratingUrl').val(),
				type: 'POST',
				data: {
					resource_id: $('#resourceId').val(),
					rating: currentRating
				},
				success: function (result) {
					$('#feedbackModal').modal('show');
				}
			});
		}
	});

	var clipboard = new ClipboardJS('#salinAtribusi');

	clipboard.on('success', function(e) {
	    alert('Attribusi Berhasil di Salin !');
	    e.clearSelection();
	});
});