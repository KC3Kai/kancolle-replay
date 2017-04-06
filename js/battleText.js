
var API = window.opener.API;
var player = new FLEET();
var world = API.world;
var map = API.mapnum;
var combined = API.combined;
var isPvP = (world == 0);
var tabs = $('#tabNodes');

addTab = function(node) {
	tabs.append(() => {
		return $('<a>')
		.attr('href', '')
		.val(node)
		.addClass('mdl-tabs__tab');
	});
};

createTable = function() {
	
};

processPVP = function(battle) {
	addTab("PVP");
	//var PvP = new BATTLE(player, battle, "PVP", true);
	//PvP.startBattle(player);

};

processSortie = function(battles) {
	battles.forEach(function(b) {
		var battle = new BATTLE(player, b, getNodeLetter(world, map, b.node), false);
		battle.startBattle(player);
	});
};

processText = function() {
	processPVP(API.battles[0]);
	
	/*
	var startData = API.battles[0].data;
	
		if (combined)
			player.addCombinedFleet(API.fleet1, API.fleet2, startData.api_nowhps.slice(1, 7), startData.api_nowhps_combined.slice(1, 7));
		else
			player.addFleet(API['fleet' + API.fleetnum], startData.api_nowhps.slice(1, 7));
		if (API.support1 > 0)
			player.addSupport(API['fleet' + API.support1]);
		if (API.support2 > 0)
			player.addSupport(API['fleet' + API.support2], true);*/
	

	//getTextRow("FLEET_COMPOSITION",[player.mainFleet]));

	/*
	if (API.battles) {
			if (isPvP) {
				processPVP(API.battles[0]);
			} else {
				processSortie(API.battles);
			}
		}*/
	

};


function getText(name, args) {
	var text = TEXTDATA[name].text;
	for (var i = 0; i < args.length; i++) {
		var val = args[i];
		if (TEXTDATA[name].values[i])
			val = TEXTDATA[name].values[i][args[i]];
		text = text.replace('<' + i + '>', val);
	}
	return text;
}

setTitle = function() {
	var title = document.createElement('title');
	title.innerText = (isPvP) ? getText("PVP_TITLE", []) : getText("SORTIE_TITLE", [getMapName(world,map), new Date(API.time*1000)]);
	document.head.appendChild(title);
};

function addText(text) {
	console.log(text);
}

function getMapName(world, map) {
	if (!MAPDATA[map])
		return map;
	if(world > 6)
		return MAPDATA[world].name + " " + MAPDATA[world].maps[map].name;
	return MAPDATA[world].name;
}

function getNodeLetter(world, map, num) {
	var edge;
	if (!( edge = EDGES['World ' + world + '-' + map]))
		return num;
	if (!( edge = edge[num]))
		return num;
	return edge[1];
}

getItem = function(mid) {
	if (!EQDATA[mid])
		return mid;
	return EQDATA[mid].name + ' (' + mid + ')';
};


setTitle();
processText();

