var numStars = 0;

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

	$('#expanddiv').click(function(){
		$('#advsearch').slideToggle('fast');
		icon = $('#chevron').attr("class");
		if (icon=="icon-chevron-up"){
			$("#chevron").removeClass().addClass("icon-chevron-down");
			$("#expanddiv").html(" Hide Advanced Search");
		} else{
			$("#chevron").removeClass().addClass("icon-chevron-up");
			$("#expanddiv").html(" Show Advanced Search");
		}
	});

	$('#charNameSearch').click(function (e) {
		checkOtherFields("charNameSearch");
		chartoSearch = $('#charNameSearch').val().toLowerCase();
		if(chartoSearch!="all"){
			$('#data tbody').children().each(function() {
				chara = $(this).children().children()[1].innerHTML.toLowerCase();
				if(chara!=chartoSearch){
					$(this).hide();
				}
			});
		}
		$("#"+prevHighlight).removeClass('active');
		name = $('#charNameSearch').val().split(" ")[0];
		if(name=="All"){name="allchars";}
		$("#"+name).addClass('active');
		prevHighlight = name;
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}
	});

	$('#comboNameSearch').keyup(function (e) {
		checkOtherFields("comboNameSearch");
		ctoSearch = $('#comboNameSearch').val().toLowerCase();
		if(ctoSearch!=""){
			$('#data tbody').children().each(function() {
				com = $(this).children()[1].innerHTML.toLowerCase();
				if(com.indexOf(ctoSearch)==-1){
					$(this).hide();
				}
			});
		}
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}
	});

	$('#typeSearch').click(function (e) {
		checkOtherFields("typeSearch");
		typetoSearch = $('#typeSearch').val().toLowerCase();
		if(typetoSearch!="all"){
			$('#data tbody').children().each(function() {
				type = $(this).children()[3].innerHTML.toLowerCase();
				if(type!=typetoSearch){
					$(this).hide();
				}
			});
		}
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}
	});

	$("#fireRating i").click(function(e){
		checkOtherFields("fireRating");
		numStars = $(e.target)[0].className[0];
		$('#data tbody').children().each(function() {
			var tableNumStars = 0;
			$(this).children().children().each(function(){
				if($(this).attr("class")=="icon-star"){
					tableNumStars++;
				}
			});
			if(!eval(tableNumStars.toString()+$("#fireRatingPars").val()+numStars)){
				$(this).hide();
			}
		});	
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}	
	});

	$("#damMin").keyup(function (e) {
		checkOtherFields("damMin");
		dammin = $('#damMin').val();
		if(dammin!=""){
			$('#data tbody').children().each(function() {
				dam = $(this).children()[4].innerHTML;
				if(parseInt(dammin)>parseInt(dam)){
					$(this).hide();
				}
			});
		}
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}
	});

	$("#damMax").keyup(function (e) {
		checkOtherFields("damMax");
		dammax = $('#damMax').val();
		if(dammax!=""){
			$('#data tbody').children().each(function() {
				dam = $(this).children()[4].innerHTML;
				if(parseInt(dammax)<parseInt(dam)){
					$(this).hide();
				}
			});
		}
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}
	});

	$("#gainMin").keyup(function (e) {
		checkOtherFields("gainMin");
		gainmin = $('#gainMin').val();
		if(gainmin!=""){
			$('#data tbody').children().each(function() {
				gain = $(this).children()[5].innerHTML;
				if(parseInt(gainmin)>parseInt(gain)){
					$(this).hide();
				}
			});
		}
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}
	});

	$("#gainMax").keyup(function (e) {
		checkOtherFields("gainMax");
		gainmax = $('#gainMax').val();
		if(gainmax!=""){
			$('#data tbody').children().each(function() {
				gain = $(this).children()[5].innerHTML;
				if(parseInt(gainmax)<parseInt(gain)){
					$(this).hide();
				}
			});
		}
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}
	});

	$("#drainMin").keyup(function (e) {
		checkOtherFields("drainMin");
		drainmin = $('#drainMin').val();
		if(drainmin!=""){
			$('#data tbody').children().each(function() {
				drain = $(this).children()[6].innerHTML;
				if(parseInt(drainmin)>parseInt(drain)){
					$(this).hide();
				}
			});
		}
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}
	});

	$("#drainMax").keyup(function (e) {
		checkOtherFields("gainMax");
		drainmax = $('#gainMax').val();
		if(drainmax!=""){
			$('#data tbody').children().each(function() {
				drain = $(this).children()[6].innerHTML;
				if(parseInt(drainmax)<parseInt(drain)){
					$(this).hide();
				}
			});
		}
		if($('tr:visible').length==1){
			$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
		}
	});

	$(".side").click(function() {
		dict = {'Labrys':'Labrys','Mitsuru':'Mitsuru Kirijo','Aigis':'Aigis',
		'Naoto':'Naoto Shirogane','Yukiko':'Yukiko Amagi','Yu':'Yu Narukami',
		'Elizabeth':'Elizabeth','Yosuke':'Yosuke Hanamura','Chie':'Chie Satonaka',
		'Kanji':'Kanji Tatsumi','Teddie':'Teddie','Akihiko':'Akihiko Sanada',
		'Shadow':'Shadow Labrys','allchars':'All'}
		$("#"+prevHighlight).removeClass('active');
		$("#"+this.id).addClass('active');
		$('#charNameSearch').val(dict[this.id]);
		prevHighlight = this.id;
		ComboData.initTable();
		ComboData.fillComboData(this.id);
	});

	$("#data").on("click", '.fav', function ()  {
		//shoud be some stuff with the database...this isn't real code for the final thing
		for (var i = 0; i < ComboData.comboData.length; i++) {
			var combo = ComboData.comboData[i];
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


    $.ajax({
      method: 'GET',
      url: '/p4u/getallcombos',
      dataType: 'json',
      success: function(data) {
        ComboData.comboData = data;
        ComboData.initTable();
        ComboData.fillComboData();
      },
    });
});


var ComboData = function() {
};

ComboData.attributes = ['character', 'name', 'combo', 'type', 'damage', 'meterGain', 'meterDrain', 'difficulty', 'favorite'];
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
		for (var i = 0; i< ComboData.comboData.length; i++) {
			query.toLowerCase();
			if(ComboData.comboData[i]["character"].toLowerCase().indexOf(query) !== -1 || ComboData.comboData[i]["name"].toLowerCase().indexOf(query) !== -1){
			   combos.push(ComboData.comboData[i]);
			}
		}
	} else {
		combos = ComboData.comboData;
	}

	for (var i = 0; i < combos.length; i++) {
		var combo = combos[i];

		if(i==0){
			$('#data').append($('<tbody>'));
		}
			
		var dataRow = $('<tr class="linkToComboPage">');
		var flag = false;
		for (var j = 0; j < ComboData.attributes.length; j++) {
			var attribute = ComboData.attributes[j];

			var firstName = combo.character.split(" ")[0];
			if(charac=="allchars" || charac==firstName || charac==combo["character"]){
				flag = true;
				if(attribute=="combo"){
					dataRow.append(convertToPicture(combo["combo"]));
				} else if(attribute=="favorite"){
					if(combo[attribute]){
						dataRow.append($('<td class="fav"><i class="icon-heart"></i></td>'));
					} else{
						dataRow.append($('<td class="fav"><i class="icon-heart-empty"></i></td>'));
					}
				} else if(attribute=="difficulty"){
                    var elt = $('<td>');
                    var span = $('<span class="difficulty">').text(combo['difficulty']);
                    elt.append(span);
                    for (var k = 0; k < 5; k++) {
                      if (k < combo['difficulty']) {
                        elt.append($('<i class="icon-star">'));
                      } else {
                        elt.append($('<i class="icon-star-empty">'));
                      }
                    }
                    dataRow.append(elt);
				} else if(attribute == "character") {
					var elt = $('<td>');
					var portrait = $('<img>').addClass('char-port img-rounded');
					portrait.attr('src', '/static/img/characters/' + firstName.toLowerCase() + '.png'); portrait.css({
						height: 40,
					});
					elt.append(portrait);
					elt.append($('<p>').text(combo.character));
					dataRow.append(elt);
				
				} else if (attribute == 'name') {
                    var elt = $('<td>')
                    var span = $('<span class="combo_id">').text(combo['id']);
                    elt.text(combo['name']);
                    elt.append(span);
					dataRow.append(elt);
                } else {
					dataRow.append($('<td>').text(combo[attribute]));
				}
			}
			
		}
		if(flag){
			$('#data tbody').append(dataRow);
		}
		
		
	}

	if($('#data tbody').children().length==0){
		$("#data tbody").append($("<tr><td colspan='9' style='text-align:center;'>No combos match your search</td></tr>"));
	}


	$('#data').tablesorter({ headers: { 2:{sorter:false} } });
    
    // add click handler
	$("#data tr").each(function(i, v) {
      console.log(v);
      $(v).click(function(e){
        var combo_id = $(this).find('.combo_id').text();
		$(location).attr('href',"/p4u/view/" + combo_id);
		
      });
    });
};
	
	
	






var dataRow = function() {
	this.name = undefined;
	return
}

var convertToPicture = function(listOfMovesStr){
  
    listOfMoves = $.parseJSON(listOfMovesStr);
	imgMoves = $("<td class='comboCol'>");
	for (var i = 0; i < listOfMoves.length; i++) {
		imgMoves.append($("<img class='imgMoves' src='/static/img/moves/"+listOfMoves[i]+".png' />"));
	}
	imgMoves.append($("<p></p><span>"+listOfMoves+"</span>"));
	return imgMoves;
}

var checkOtherFields = function(currentElem){
	ComboData.initTable();
	if(currentElem!="charNameSearch" && $("#charNameSearch").val()!="All"){
		ComboData.fillComboData($("#charNameSearch").val());
	} else{
		ComboData.fillComboData();
	}

	if(currentElem!="fireRating" && numStars!=0){
		$('#data tbody').children().each(function() {
			var tableNumStars = 0;
			$(this).children().children().each(function(){
				if($(this).attr("class")=="icon-star"){
					tableNumStars++;
				}
			});
			if(!eval(tableNumStars.toString()+$("#fireRatingPars").val()+numStars.toString())){
				$(this).hide();
			}
		});	
	}
	$('#data tbody').children().each(function() {
		comboName = $(this).children()[1].innerHTML.toLowerCase();
		type = $(this).children()[3].innerHTML.toLowerCase();
		damage = $(this).children()[4].innerHTML;
		metergain = $(this).children()[5].innerHTML;
		meterdrain = $(this).children()[6].innerHTML;
		if(currentElem!="comboNameSearch" && $("#comboNameSearch").val()!="" && 
			comboName.indexOf($("#comboNameSearch").val().toLowerCase())==-1){
			$(this).hide();
		} else if(currentElem!="typeSearch" && $("#typeSearch").val()!="All" && 
			$("#typeSearch").val().toLowerCase()!=type){
			$(this).hide();
		} else if(currentElem!="damMin" && $("#damMin").val()!="" && parseInt($("#damMin").val())>parseInt(damage)){
			$(this).hide();
		} else if(currentElem!="damMax" && $("#damMax").val()!="" && parseInt($("#damMax").val())<parseInt(damage)){
			$(this).hide();
		} else if(currentElem!="gainMin" && $("#gainMin").val()!="" && parseInt($("#gainMin").val())>parseInt(metergain)){
			$(this).hide();
		} else if(currentElem!="gainMax" && $("#gainMax").val()!="" && parseInt($("#gainMax").val())<parseInt(metergain)){
			$(this).hide();
		} else if(currentElem!="drainMin" && $("#drainMin").val()!="" && parseInt($("#drainMin").val())>parseInt(meterdrain)){
			$(this).hide();
		} else if(currentElem!="drainMax" && $("#drainMax").val()!="" && parseInt($("#drainMax").val())<parseInt(meterdrain)){
			$(this).hide();
		} else {

		}
	});

}
