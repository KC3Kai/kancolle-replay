var TEXTDATA = {
		"SORTIE_START": {
			"text": "Sortied to <0>-<1> on <2>.",
			"values": {}
		},
		"PVP_START": {
			"text": "Beginning Fleet Practice.",
			"values": {}
		},
		"FLEET_COMPOSITION": {
			"text": "Sortieing fleet consisting of <0>",
			"values": {}
		},
		"COMBINDED_FLEET_COMPOSITION": {
			"text": "Sortieing combined fleet consisting of <0> in the main fleet and <1> in the escort fleet.",
			"values": {}
		},
		"SUPPORT_FLEET_COMPOSITION": {
			"text": "<0> are on standby with <1> Support.",
			"values": {
				1: {
					1: "Node",
					2: "Boss"
				}
			}
		},
		"FORMATION_SELECT": {
			"text": "Fleet engaging enemy in <0> formation.",
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
			"text": "Abyssal Fleet found at Node <0>.",
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
			"text": "The enemy fleet consists of <0>.",
			"values": {}
		},
		"AIR_START": {

		},
		"AIR_STAGE1_LOSS": {

		},
		"AIR_SUPERIORITY": {
			"text": "Fleet has gained <0> against the enemy.",
			"values": {
				0: {
					1: "Air Supremacy (AS+)",
					2: "Air Superiority (AS)",
					3: "Air Parity (AP)",
					//4: "Air Denial (AD)",
					4: "Air Incapability (AI)"
				}
			}
		},
		"AIR_CONTACT_F": {
			"text": "Ally <0> has made contact with the enemy.",
			"values": {}
		},
		"AIR_CONTACT_E": {
			"text": "Enemy <0> has made contact with the fleet.",
			"values": {}
		},
		"AIR_AACI": {

		},
		"AIR_STAGE2_LOSS": {

		},
		"AIR_DAMAGE": {

		},
		"SUPPORT_START": {
			"text": "The <0> support fleet has arrived with <1>",
			"values": {
				0 : {
					1: "Node",
					2: "Boss"
				},
				1: {
					1: "Aerial Support",
					2: "Long Range Torpedo Attack", 
					3:"Support Shelling"
				}
			}
		},
		"SUPPORT_DAMAGE": {

		},
		"OPTORP_ATTACK": {
			"text": "<0> launch a pre-emptive torpedo strike.",
			"values": {

			}
		},
		"OPTORP_DAMAGE": {
			"text": "<0> launch a pre-emptive torpedo strike.",
			"values": {

			}
		},
		"ENGAGEMENT": {
			"text": "Fleet has a <0> against the enemy",
			"values": {
				0:{
					1: "Parallel Engagement",
					2: "Head-on Engagement",
					3: "T Advantage",
					4:"T Disadvantage"
				}
			}
		},
		"SHELL_START": {
			"text": "<0> attacks <1>",
			"values": {

			}
		},
		"SHELL_NORMAL": {
			"text": "<0> attacks <1>",
			"values": {

			}
		},
		"SHELL_DOUBLE": {
			"text": "<0> attacks <1> twice",
			"values": {

			}
		},
		"SHELL_CUTIN": {
			"text": "<0> cut-in attacks <1>",
			"values": {

			}
		},
		"SHELL DAMAGE": {

		},
		"TORP_ATTACK": {
			"text": "<0> luanches torpedos",
			"values": {

			}
		},
		"TORP_DAMAGE": {
			"text": "<0>'s torpedoes hit <1> dealing <2> damage",
			"values": {

			}
		},
		"DAY_END": {

		},
		"NIGHT_START": {
			"text": "Entering Night Battle.",
			"values": {}
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

function composeFleet(fleet, hp) {
	var shipList = [];
	for (var i = 0; i < fleet.length; i++) {
		shipList.push({
			name: getShipName((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i]),
			curHP: hp[i]
		});
	}
	return shipList;	
}

function getFleet(fleet) {
	var ships = "";
	
	for(var i = 0; i < fleet.length; i++) {
		if(i == (fleet.length-1)) {
			ships = ships.concat("and ", fleet[i].name);
			continue;
		}
		ships = ships.concat(fleet[i].name, ", ");
	}
	return ships;
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

function getMapName(map) {
	if(!MAPDATA[map]) return map;
	return MAPDATA[map].name;
}

function getNodeLetter(world,map,num) {
	var edge;
	if (!(edge = EDGES['World '+world+'-'+map])) return num;
	if (!(edge = edge[num])) return num;
	return edge[1];
}

function showKouku(kouku,isbombing,isjet) {

}

function showRaigeki(rai,fleet,efleet1, efleet2) {

}

function showHougeki(hou, fleet, efleet) {
	for (var j=1; j<hou.api_at_list.length; j++) {
		var attacker;
		var defender;
		if (efleet2) {

		} else {
			attacker = (hou.api_at_list[j]>6)? efleet1[hou.api_at_list[j]-7] : fleet[hou.api_at_list[j]-1]
			defender = (hou.api_df_list[j][0]>6)? efleet1[hou.api_df_list[j][0]-7] : fleet[hou.api_df_list[j][0]-1];
		}


	}
}

function addText(text) {
	console.log(text);
}

function processPVP(fleet, battle) {
	var data = battle.data;
	var yasen = battle.yasen;

	var opponent = composeFleet(data.api_ship_ke, data.api_nowhps.slice(7));

	addText(getText("PVP_START",[]));
	addText(getText("FLEET_COMPOSITION",[getFleet(fleet)]));
	addText(getText("ENEMY_COMPOSITION",[getFleet(opponent)]));
	addText("");

	if (data.api_formation) addText(getText("FORMATION_SELECT",[data.api_formation[0]]));
	if (data.api_search) {
		addText(getText("DETECTION_F", [data.api_search[0]]));
		addText(getText("DETECTION_E", [data.api_search[1]]));
	}
	
	if (data.api_formation) addText(getText("ENEMY_FORMATION",[0, data.api_formation[1]]));

	//if(data.api_hourai_flag[0]) showHougeki(data.api_hougeki1,fleet,opponent,null);
	//if(data.api_hourai_flag[1]) showHougeki(data.api_hougeki2,fleet,opponent,null);
	//if(data.api_hourai_flag[3]) showRaigeki(data.api_raigeki,fleet,opponent 	,null);


}

function processText(API) {
	var world = API.world;
	var map = API.mapnum;
	var combined = API.combined
	var startData = API.battles[0].data;
	
	var fleet = {
			MAIN_FLEET: composeFleet(API['fleet'+API.fleetnum], startData.api_nowhps.slice(1,7)),
			ESCORT_FLEET: (combined) ? composeFleet(API.fleet2, startData.api_nowhps_combined.slice(1,7)) : {},
			NODE_SUPPORT: (API.support1 > 0)? composeFleet(API['fleet'+API.support1], [1,1,1,1,1,1]) : {},
			BOSS_SUPPORT: (API.support2 > 0)? composeFleet(API['fleet'+API.support2], [1,1,1,1,1,1]) :{} 
			
	}
	if(world == 0) {
		processPVP(fleet.MAIN_FLEET ,API.battles[0]);
	}
	else {
		
		addText(getText("SORTIE_START",[world, map, new Date(API.time*1000)]));
		
		if(!combined) {
			addText(getText("FLEET_COMPOSITION",[composeFleet(API['fleet'+API.fleetnum])]));
		} else {
			addText(getText("COMBINDED_FLEET_COMPOSITION",[composeFleet(API.fleet1), composeFleet(API.fleet2)]));
		}

		if(API.support1 > 0) {
			addText(getText("SUPPORT_FLEET_COMPOSITION", [composeFleet(API['fleet'+API.support1]), 1]));
		}

		if(API.support2 > 0) {
			addText(getText("SUPPORT_FLEET_COMPOSITION", [composeFleet(API['fleet'+API.support2]), 2]));
		}

		addText("");

		for (var b=0; b<API.battles.length; b++) {
			var battle = API.battles[b];
			var data = battle.data;
			var yasen = battle.yasen;
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

			//jet LBAS phase
			if (data.api_air_base_injection) {

			}

			//jet phase
			if (data.api_injection_kouku){}

			//land bombing
			if (data.api_air_base_attack) {

			}

			//air phase
			if (data.api_kouku) {
				var phase1 = data.api_kouku.api_stage1;
				var phase2 = data.api_kouku.api_stage2;
				var phase3 = data.api_kouku.api_stage3;


				addText(getText("AIR_SUPERIORITY", [phase1.api_disp_seiku]));

				if(phase1.api_touch_plane[0] > -1){
					addText(getText("AIR_CONTACT_F", [getItemName(phase1.api_touch_plane[0])]));
				}
				if(phase1.api_touch_plane[1] > -1){
					addText(getText("AIR_CONTACT_E", [getItemName(phase1.api_touch_plane[1])]));
				}
			}

			//support phase
			if (data.api_support_info) {

			}

			//opening asw
			if (data.api_opening_taisen){}

			//opening torp
			if (data.api_opening_flag){
				var fleet = (combined) ? API.fleet2 : API['fleet'+API.fleetnum];
				var ships = [];

				for(var i = 0; i < fleet.length; i++) {
					if(data.api_opening_atack.api_fcl[i+1] == 1) {
						var ship = fleet[i];
						ships.push(getShipName(ship.mst_id));
					}

				}
				if(ships.length > 0) {
					addText(getText("OPTORP_ATTACK", [ships]));	
				}
			}


			//if air node, second air phase
			if (data.api_kouku2){}

			if (data.api_formation) {
				addText(getText("ENGAGEMENT", [data.api_formation[2]]));
			}

			//shelling 1, 2, 3

			if(yasen.length > 0) {
				addText(getText("NIGHT_START",[]));

			}

			addText("");
		}
	}
}


