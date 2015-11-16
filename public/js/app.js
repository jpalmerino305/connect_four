$(document).ready(function(){
	var 	horizontal = 6,
		vertical = 7
		str_html = '';
		
	for (var x = 0; x < horizontal; x ++){
		str_html += '<tr>';
		for (var y = 0; y < vertical; y ++){
			str_html += '<td class="item unselected" data-x="' + x + '" data-y="' + y + '" id="' + x + '_' + y + '"></td>';
		}
		str_html += '</tr>';
	}
	$('#main').html(str_html);
	
	var current_color = 'red';
	var player = { color: 'red', name: '1' };
	var players = [
		{ id: 1, color: 'red', name: 'Player 1', moves: [] },
		{ id: 2, color: 'yellow', name: 'Player 2', moves: [] }
	];
	var all_moves = [];
	var current_player = players[0];
	$('#player-name').html(current_player.name);
	$('.item').on('click', function(){
		var 	next_player_id = exchange_turn(current_player.id),
			slot = 0,
			td = $(this),
			id = td.attr('id'),
			x = td.data('x'),
			y = td.data('y');
		slot = $('td[data-y="' + y + '"].unselected').length - 1;
		if (slot >= 0){
			$('td[id="' + slot + '_' + y + '"]')
				.addClass(current_player.color)
				.removeClass('unselected');

			player = _.findWhere(players, { id: current_player.id });
			if (checkWinner(player)){
				alert(player.name + ' is the winner!');
			}
	
		}
		current_player = _.findWhere(players, { id: next_player_id });
	});

	function exchange_turn(player) {
		return (player == 1)? 2 : 1;
	}
	
	function checkWinner(){
		// Rows
		for (var x = 0; x < horizontal; x ++){
			for (var y = 0; y < vertical; y ++){
				if (!$('#' + x + '_' + y).hasClass('unselected')){
					if ($('#' + x + '_' + y).hasClass(player.color) 
						&& $('#' + x + '_' + (y + 1)).hasClass(player.color) 
						&& $('#' + x + '_' + (y + 2)).hasClass(player.color) 
						&& $('#' + x + '_' + (y + 3)).hasClass(player.color)){
						return true;
					}
				}
			}
		}
		// Columns
		for (var x = 0; x < horizontal; x ++){
			for (var y = 0; y < vertical; y ++){
				if (!$('#' + x + '_' + y).hasClass('unselected')){
					if ($('#' + x + '_' + y).hasClass(player.color) 
						&& $('#' + (x + 1) + '_' + y).hasClass(player.color) 
						&& $('#' + (x + 2) + '_' + y).hasClass(player.color) 
						&& $('#' + (x + 3) + '_' + y).hasClass(player.color)){
						return true;
					}
				}
			}
		}
		// Diagonal
		for (var x = 0; x < horizontal; x ++){
			for (var y = 0; y < vertical; y ++){
				for (var d = -1; d <= 1; d += 2){
					if (!$('#' + x + '_' + y).hasClass('unselected')){
						if ($('#' + x + '_' + y).hasClass(player.color) 
							&& $('#' + (x + 1) + '_' + (y + 1 * d)).hasClass(player.color) 
							&& $('#' + (x + 2) + '_' + (y + 2 * d)).hasClass(player.color) 
							&& $('#' + (x + 3) + '_' + (y + 3 * d)).hasClass(player.color)){
							return true;
						}
					}
				}
			}
		}
	}

});