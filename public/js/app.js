$(document).ready(function(){
	var 	horizontal = 6,
		vertical = 7,
		start = false,
		versus = 1;
	
	$('#versus').val(1);
	load_board();
	
	var player = {};
	var players = [];
	var current_player = {};
	$(document).on('click', '.item', function(){
		var 	slot = 0,
			td = $(this),
			id = td.attr('id'),
			x = td.data('x'),
			y = td.data('y');
		slot = $('td[data-y="' + y + '"].unselected').length - 1;
		if (slot >= 0 && start){

			$('#reset').removeAttr('disabled');
			var next_player_id = exchange_turn(current_player.id);

			$('td[id="' + slot + '_' + y + '"]')
				.addClass(current_player.color)
				.removeClass('unselected');

			player = _.findWhere(players, { id: current_player.id });
			if (checkWinner(player)){
				alert(player.name + ' is the winner!');
				load_board();
			}
			
			current_player = _.findWhere(players, { id: next_player_id });

			if (versus == 2){
				$('#loading').show();
				$('#reset').attr('disabled', 'disabled')
				setTimeout(function(){
					$('#loading').hide(); $('#reset').removeAttr('disabled');
					computer_move(current_player);
				},1000);
				
			}
	
		}
	});
	
	$('#start').on('click', function(){
		$('#main').removeClass('disabled');
		$('#versus').attr('disabled', 'disabled');
		$('#reset').removeAttr('disabled');
		$(this).attr('disabled', 'disabled');
		start = true;
		versus = $('#versus').val();
		if (versus == 1){
			players = [{ id: 1, color: 'red', name: 'Player 1' }, { id: 2, color: 'yellow', name: 'Player 2' }];
		} else {
			players = [{ id: 1, color: 'red', name: 'Player 1' }, { id: 2, color: 'yellow', name: 'Computer' }];
		}
		current_player = players[0];
	});
	
	$('#reset').on('click', function(){
		if (confirm('Are you sure?')){
			load_board();
		}
	});
	
	function load_board(){
		var str_html = '';
		for (var x = 0; x < horizontal; x ++){
			str_html += '<tr>';
			for (var y = 0; y < vertical; y ++){
				str_html += '<td class="item unselected" data-x="' + x + '" data-y="' + y + '" id="' + x + '_' + y + '"></td>';
			}
			str_html += '</tr>';
		}
		$('#main').html(str_html);
		$('#main').addClass('disabled');
		$('#reset').attr('disabled', 'disabled');
		$('#versus').removeAttr('disabled');
		$('#start').removeAttr('disabled');
		start = false;
	}

	function exchange_turn(player) {
		return (player == 1)? 2 : 1;
	}
	
	function computer_move(player){
		var moves = []
		for (var x = 0; x < horizontal; x ++){
			for (var y = 0; y < vertical; y ++){
				if ($('#' + x + '_' + y).hasClass('unselected')){
					moves.push(x + '_' + y);
				}
			}
		}

		var 	slot = 0,
			td = $('#' + moves[_.random(0, moves.length - 1)]),
			id = td.attr('id'),
			x = td.data('x'),
			y = td.data('y');
		slot = $('td[data-y="' + y + '"].unselected').length - 1;
		if (slot >= 0 && start){
			$('#reset').removeAttr('disabled');
			var next_player_id = exchange_turn(current_player.id);

			$('td[id="' + slot + '_' + y + '"]')
				.addClass(current_player.color)
				.removeClass('unselected');

			player = _.findWhere(players, { id: current_player.id });
			if (checkWinner(player)){
				alert(player.name + ' is the winner!');
				load_board();
			}
			
			current_player = _.findWhere(players, { id: next_player_id });
		}
	}
	
	function checkWinner(player){
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