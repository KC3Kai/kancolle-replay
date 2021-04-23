function getText(name, args) {
	var text = TEXTDATA[name].text;
	for (var i = 0; i < args.length; i++) {
		var val = args[i];
		if (TEXTDATA[name].values[i])
			val = TEXTDATA[name].values[i][args[i]];
		if (val === undefined) val = args[i];
		text = text.replace('<' + i + '>', val);
	}
	return text;
}

function addText(text) {
	console.log(text);
}

function getMapName(world, map) {
	return world + '-' + map;
	// if (!MAPDATA[world] || !MAPDATA[world].maps[map])
		// return world + '-' + map;
	// if (world > 6)
		// return MAPDATA[world].name + " " + MAPDATA[world].maps[map].name;
	// return MAPDATA[world].name;
}

function isBossNode(world, map, node) {
	if (!MAPDATA[world] || !MAPDATA[world].maps[map]) return false;
	var bossNode = MAPDATA[world].maps[map].bossnode;
	if (typeof bossNode == 'object') return bossNode.indexOf(node) != -1;
	return node == bossNode;
}

function getNodeLetter(world, map, num) {
	var edge;
	if (!( edge = EDGES['World ' + world + '-' + map]))
		return num;
	if (!( edge = edge[num]))
		return num;
	return edge[1];
}

const getShipName = function(id) {
    if (!SHIPDATA[id])
        return id;
    return (LANG_SHIP_NAME == 'JP') ? SHIPDATA[id].nameJP : SHIPDATA[id].name;
}
const getItem = function(mid) {
	if (!EQDATA[mid])
		return mid;
	return (LANG_SHIP_NAME == 'JP')? EQDATA[mid].nameJP : EQDATA[mid].name;
};

const exportBattle = function(battle) {
	var table = (battle == 'all') ? $('table') : $('#battle-' + battle); 
	var name = [];
	name.push(document.title);
	if(!isPvP && battle != 'all') {
		name.push("Node " + battle);
	}
	table.tableExport(
		{
			type:'txt',
			fileName: name.join(" ")
		});
};

