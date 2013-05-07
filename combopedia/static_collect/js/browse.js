$(document).ready(function() {

	prevHighlight = "allchars";

	$('#searchBar').keypress(function (e) {
  		if (e.which == 13) {
  			query = document.getElementById('searchBar').value;
  			if(query!=""){
				ComboData.initTable();
				ComboData.fillComboData("allchars",true,query);
  			}
    		document.getElementById('searchBar').value="";
  		}

	});


	$(".side").click(function() {
		$("#"+prevHighlight).removeClass('active');
		$("#"+this.id).addClass('active');
		prevHighlight = this.id;
		ComboData.initTable();
		ComboData.fillComboData(this.id);
	});

	$("#data").on("click", '.fav', function ()  {
		//shoud be some stuff with the database...this isn't real code for the final thing
		for (var i = 0; i < comboData.length; i++) {
			var combo = comboData[i];
			if(combo['name']==$(this).closest('tr').find('td').first().html()){
				if(combo['favorite']){
					combo['favorite']=false;
				} else{
					combo['favorite']=true;
				}
			}
		}
		ComboData.initTable();
		ComboData.fillComboData(prevHighlight);
	});

	$("#data").on("click",'.linkToComboPage',function(e){
		if(e.target.className!="icon-star" && e.target.className!="icon-star-empty" && e.target.className!="fav"){
			$(location).attr('href',"./fillerComboPage.html");
		}
	});

	ComboData.initTable();
	ComboData.fillComboData();

});


var ComboData = function() {};

ComboData.attributes = ['character', 'name', 'combo', 'type', 'damage', 'meterGain', 'meterDrain', 'difficulty', 'favorite'];

	// hard coded json data that would otherwise come from database
	var comboData = [
		{
			character: 'Teddie',
			name: 'Super combo A',
			combo: ["412","AB","1","AD","5","874"],
			type: 'jab',
			damage: 150,
			meterGain: 50,
			meterDrain: 80,
			difficulty: 1,
			favorite: false, 
		},
		{
			character: 'Teddie',
			name: 'Super combo B',
			combo: ["236","C","1","236"],
			type: 'kick',
			damage: 100,
			meterGain: 90,
			meterDrain: 30,
			difficulty: 1,
			favorite: false,		
		},
		{
			character: 'Aigis',
			name: 'Super combo C',
			combo: ["89632","ABD","7"],
			type: 'basic',
			damage: 240,
			meterGain: 10,
			meterDrain: 20,
			difficulty: 2,
			favorite: false,		
		},
		{
			character: 'Yu Narukami',	
			name: 'Super combo H',		
			combo: ["7","21478","ABC","A","1","BC"],
			type: 'jab',
			damage: 760,
			meterGain: 0,
			meterDrain: 90,
			difficulty: 4,
			favorite: false,		
		},
		{
			character: 'Yosuke Hanamura',
			name: 'Super combo D',
			combo: ["CD","3","89632",],
			type: 'kick',
			damage: 90,
			meterGain: 20,
			meterDrain: 0,
			difficulty: 1,
			favorite: false,		
		},
		{
			character: 'Chie Satonaka',
			name: 'Super combo E',
			combo: ["89632","D","9","2369874"],
			type: 'jab',
			damage: 670,
			meterGain: 5,
			meterDrain: 40,
			difficulty: 3,
			favorite: false,		
		},
		{
			character: 'Yukiko Amagi',
			name: 'Super combo F',
			combo: ["89632","AB","5"],
			type: 'basic',
			damage: 650,
			meterGain: 5,
			meterDrain: 20,
			difficulty: 4,
			favorite: false,		
		},
		{
			character: 'Kanji Tatsumi',
			name: 'Super combo G',
			combo: ["89632","AB","2","236","23698","CD","AB"],
			type: 'special',
			damage: 980,
			meterGain: 50,
			meterDrain: 20,
			difficulty: 5,
			favorite: false,		
		},
	];

ComboData.initTable = function() {
	$('#data').html("<thead>");

	var dataRow = $('<tr>');
	for (var j = 0; j < ComboData.attributes.length; j++) {
		var attribute = ComboData.attributes[j];
		var capitalized = attribute.charAt(0).toUpperCase() + attribute.slice(1);
		dataRow.append($('<th>').text(capitalized));
	}
	$('#data thead').append(dataRow);
};
		
ComboData.fillComboData = function(charac, search, query) {

	charac = typeof charac !== 'undefined' ? charac : "allchars";
	search = typeof search !== 'undefined' ? search : false;
	query = typeof query !== 'undefined' ? query : null;

	var combos = [];
	if (search){
		for (var i = 0; i< comboData.length; i++) {
			query.toLowerCase();
			if(comboData[i]["character"].toLowerCase().indexOf(query) !== -1 || comboData[i]["name"].toLowerCase().indexOf(query) !== -1){
			   combos.push(comboData[i]);
			}
		}
	} else {
		combos = comboData;
	}

	for (var i = 0; i < combos.length; i++) {
		var combo = combos[i];

		if(i==0){
			$('#data').append($('<tbody>'));
		}
			
		var dataRow = $('<tr class="linkToComboPage">');

		for (var j = 0; j < ComboData.attributes.length; j++) {
			var attribute = ComboData.attributes[j];

			var firstName = combo.character.split(" ")[0];
			if(charac=="allchars" || charac==firstName){
				if(attribute=="combo"){
					dataRow.append(convertToPicture(combo["combo"]));
				} else if(attribute=="favorite"){
					if(combo[attribute]){
						dataRow.append($('<td class="fav"><i class="icon-heart"></i></td>'));
					} else{
						dataRow.append($('<td class="fav"><i class="icon-heart-empty"></i></td>'));
					}
				} else if(attribute=="difficulty"){
					elem = "<td>";
					for(var k=0; k<combo[attribute]; k++){
						elem = elem + "<i class='icon-star'></i>";
					}
					elem = elem + "</td>";
					dataRow.append($(elem));
				} else if(attribute == "character") {
					elt = $('<td>');
					var portrait = $('<img>').addClass('char-port img-rounded');
					portrait.attr('src', '/static/img/characters/' + firstName.toLowerCase() + '.png'); portrait.css({
						height: 40,
					});
					elt.append(portrait);
					elt.append($('<p>').text(combo.character));
					dataRow.append(elt);
				
				} else {
					dataRow.append($('<td>').text(combo[attribute]));
				}
			}
			
		}
		$('#data tbody').append(dataRow);
		
		
	}


	$('#data').tablesorter({ headers: { 2:{sorter:false} } });
};
	
	
	






var dataRow = function() {
	this.name = undefined;
	this.

	return
}

var convertToPicture = function(listOfMoves){
	imgMoves = $("<td class='comboCol'>");
	for (var i = 0; i < listOfMoves.length; i++) {
		imgMoves.append($("<img class='imgMoves' src='/static/img/moves/"+listOfMoves[i]+".png' />"));
	}
	imgMoves.append($("<p></p><span>"+listOfMoves+"</span>"));
	return imgMoves;
}
