


$(function() {

$('#search').on('click', function(event) {
	event.preventDefault();

	var activity = $('#activity option:selected').val();
	var city = $('#city').val();
	
	$.ajax({
		type: 'GET',
		url: "https://outdoor-data-api.herokuapp.com/api.json?api_key=1fc0ab0d006bccd6e0fdf1856cea5b2c&q[city_cont]=" + city + '&q[activities_activity_type_name_cont]=' + activity + "&radius=1000",
		dataType: 'jsonp',
		jsonp: 'callback',
		jsonpCallback: 'query'
	})

		.done(function(data) {
			for (var i = 0; i < data.places.length; i++) {
				console.log(data);

				var city = data.places[i].city;
				var state = data.places[i].state;

				if (data.places[i].activities.length > 0) {

					var $table = $('<table/>');

					for (var x = 0; x < data.places[i].activities.length; x++) {
						
						var result = data.places[i].activities[x];
						console.log(result);

							var photo = result.thumbnail;
							var image = '<img src="' + photo + "\" class=\"photo\" alt=\"location image\">";
							var name = result.name;
							var url = result.url;
							var desc = result.description; 
							
								
							/*if (photo == "null") {
								image = '<p>No Image</p>'
							}
							else {
								
							}*/						
						$table.append( '<tr class="row"><td>' + image + '</td><td class="cell"><div class="desc"><b><a href="' + url + '">' + name + '</b></a><br>' + city + ', ' + state + '<br><br>' + desc + '</div></td></tr>' );
						$('.site').append($table);

						
					}
				}
			}
		})
})

});