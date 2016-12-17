var TEXTDATA = {
	"SORTIE_START": {
		"text": "Sortied to <0>-<1> on <2>.",
		"values": {}
	},
	"FORMATION_SELECT": {
		"text": "Select your fleet formation (<0>).",
		"values": {
			0: {
				1: "Line Ahead",
				2: "Double Line",
				3: "Diamond",
				4: "Echelon",
				5: "Line Abreast",
				11: "Cruising Formation 1",
				12: "Cruising Formation 2",
				13: "Cruising Formation 3",
				14: "Cruising Formation 4",
			}
		}
	},
	"BATTLE_START": {
		"text": "You engage the Abyssal Fleet at Node <0>.",
		"values": {}
	},
	"DETECTION_F": {
		"text": "<0>.",
		"values": {
			0: {
				1: "Your plane successfully detected the enemy fleet",
				2: "Your plane successfully detected the enemy fleet but was shot down",
				3: "Your plane failed to detect the enemy fleet and was shot down",
				4: "Your plane failed to detect the enemy fleet",
				5: "Your fleet successfully detected the enemy fleet",
				6: "Your fleet failed to detect the enemy fleet",
			}
		}
	},
	"DETECTION_E": {
		"text": "<0>.",
		"values": {
			0: {
				1: "The enemy's plane successfully detected your fleet",
				2: "The enemy's plane successfully detected your fleet but was shot down",
				3: "The enemy's plane failed to detect your fleet and was shot down",
				4: "The enemy's plane failed to detect your fleet",
				5: "The enemy fleet successfully detected your fleet",
				6: "The enemy fleet failed to detect your fleet",
			}
		}
	},
	"ENEMY_FORMATION": {
		"text": "The enemy fleet is a <0> fleet in <1>.",
		"values": {
			0: {
				0: "single",
				1: "combined",
			},
			1: {
				1: "Line Ahead",
				2: "Double Line",
				3: "Diamond",
				4: "Echelon",
				5: "Line Abreast",
				11: "Cruising Formation 1",
				12: "Cruising Formation 2",
				13: "Cruising Formation 3",
				14: "Cruising Formation 4",
			}
		}
	},
	"ENEMY_COMPOSITION": {
		"text": "The enemy fleet formation is <0>.",
		"values": {}
	},
	"AIR_START": {
	
	},
	"AIR_STAGE1_LOSS": {
	
	},
	"AIR_SUPERIORITY": {
	
	},
	"AIR_CONTACT_F": {
	
	},
	"AIR_CONTACT_E": {
	
	},
	"AIR_AACI": {
	
	},
	"AIR_STAGE2_LOSS": {
	
	},
	"AIR_DAMAGE": {
	
	},
	"SUPPORT_START": {
	
	},
	"SUPPORT_DAMAGE": {
	
	},
	"OPTORP_ATTACK": {
	
	},
	"OPTORP_DAMAGE": {
	
	},
	"ENGAGEMENT": {
	
	},
	"SHELL_START": {
	
	},
	"SHELL_NORMAL": {
	
	},
	"SHELL_DOUBLE": {
	
	},
	"SHELL_CUTIN": {
	
	},
	"SHELL DAMAGE": {
	
	},
	"TORP_ATTACK": {
	
	},
	"TORP_DAMAGE": {
	
	},
	"DAY_END": {
	
	},
	"NIGHT_START": {
	
	},
}

function getText(name, args) {
	var text = TEXTDATA[name].text;
	for (var i=0; i<args.length; i++) {
		var val = args[i];
		if (TEXTDATA[name].values[i]) val = TEXTDATA[name].values[i][args[i]]
		text = text.replace('<'+i+'>',val);
	}
	return text;
}

function getShipName(mid) {
	if (!SHIPDATA[mid]) return mid;
	return SHIPDATA[mid].name + ' (' + mid + ')';
	// return SHIPDATA[mid].nameJP + ' (' + mid + ')';
}

function getItemName(mid) {
	if (!EQDATA[mid]) return mid;
	return EQDATA[mid].name + ' (' + mid + ')';
}

function getNodeLetter(world,map,num) {
	var edge;
	if (!(edge = EDGES['World '+world+'-'+map])) return num;
	if (!(edge = edge[num])) return num;
	return edge[1];
}

function addText(text) {
	console.log(text);
}

function processText(API) {
	var world = API.world;
	var map = API.mapnum;
	addText(getText("SORTIE_START",[world, map, new Date(API.time*1000)]));
	addText("");

	for (var b=0; b<API.battles.length; b++) {
		var battle = API.battles[b];
		var data = battle.data;
		
		var combinedE = (data.api_ship_ke_combined)? 1 : 0;
		
		if (data.api_formation) {
			addText(getText("FORMATION_SELECT",[data.api_formation[0]]));
		}
		
		addText(getText("BATTLE_START",[getNodeLetter(world,map,battle.node)]));
		
		if (data.api_search) {
			addText(getText("DETECTION_F", [data.api_search[0]]));
			addText(getText("DETECTION_E", [data.api_search[1]]));
		}
		
		if (data.api_formation) {
			addText(getText("ENEMY_FORMATION",[combinedE, data.api_formation[1]]));
		}
		
		if (data.api_ship_ke) {
			var enemyList = [];
			for (var i=0; i<data.api_ship_ke.length; i++) {
				if (data.api_ship_ke[i] == -1) continue;
				enemyList.push(getShipName(data.api_ship_ke[i]));
			}
			addText(getText("ENEMY_COMPOSITION",[enemyList]));
		}
		
		addText("");
	}
}


