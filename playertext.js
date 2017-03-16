var fleet = {}, opponent = {};
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
			"text": "Sortieing combined fleet consisting of <0> in the fleet.MAIN_FLEET fleet and <1> in the fleet.ESCORT_FLEET fleet.",
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
			"text": "Beginning <0> Shelling Phase",
			"values": {
				0:{
					1: "Main (Range)",
					2: "Main (Line-up)",
					3: "Escort"
				}
			}
		},
		"SHELL_DAMAGE": {
			"text": "<0> is hit with a <1> dealing <2> damagee",
			"values": {
				1: {
					1: "Normal Attack",
					2: "Critical Attack"
				}
			}
		},
		"SHELL_MISS": {
			"text": "<0> avoided the attack",
			"values": {}
		},
		"SHELL_DAMAGE_DOUBLE": {
			"text": "<0> is hit with a <1> dealing <2> damage and a <3> dealing <4> damage",
			"values": {
				1: {
					1: "Normal Attack",
					2: "Critical Attack"
				},
				3: {
					1: "Normal Attack",
					2: "Critical Attack"
				}
			}
		},
		"SHELL_TARGET": {
			"text": "<0> <1>attacks <2>",
			"values": {
				1: {
					0: "",
					1: "laser ",
					2: "double ", 
					3: "cut-in ",
					4: "radar cut-in ",
					5: "AP cut-in ",
					6: "gun cut-in "
				}
			}
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
		"PROTECT_DAMAGE": {
			"text": "<0> protects <1> from a <2> taking <3> damage",
			"values": {
				2: {
					1: "Normal Attack",
					2: "Critical Attack"
				}
			}
		},
		"PROTECT_MISS": {
			"text": "<0> gets <1> out of the line of fire",
			"values": {
				
			}
		},
		"DAY_END": {

		},
		"NIGHT_START": {
			"text": "Entering Night Battle.",
			"values": {}
		},
		"SHIP_END": {
			"text": "<0> <1>.",
			"values": {
				1: {
					1: "has been sunk",
					2: "is no longer able to continue fighting"
				}
			}
		},
		"BATTLE_END": {
			"text": "Battle Ending. Fleet has achieved <0> against the enemy.",
			"values": {
				0: {
					"S+": "Total Victory",
					"S": "Victory (S)",
					"A": "Victory (A)",
					"B": "Tactical Victory",
					"C": "Tactical Defeat",
					"D": "Defeat",
					"E": "Complete Defeat"
				}
			}
		}
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
	if(fleet.length == 1) return fleet[0].name;
	
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

function showRaigeki(rai, fleet, opening) {
	var fTorpedos = [], fAttack = [], fTargets = [];
	var eTorpedos = [], eAttack = [], eTargets = [];
	
	var num = (opponent.ESCORT_FLEET)? 12 : 6;
	
	for (var i=0; i<num; i++) {
		if (rai.api_frai[i+1] > 0) {
			fTorpedos.push((i>=6)? fleet.ESCORT_FLEET[i-6] : fleet.MAIN_FLEET[i]);
			fAttack.push((i>=6) ? rai.api_fydam[i-6] : rai.api_fydam[i+1]);
			
			if((opponent.ESCORT_FLEET && rai.api_frai[i+1] >= 7)) {
				opponent.ESCORT_FLEET[rai.api_frai[i+1]-7].curHP -= Math.floor(rai.api_fydam[i-6]);
				fTargets.push(opponent.ESCORT_FLEET[rai.api_frai[i+1]-7]);
			} else {
				opponent.MAIN_FLEET[rai.api_frai[i+1]-1].curHP -= Math.floor(rai.api_fydam[i+1]);
				fTargets.push(opponent.MAIN_FLEET[rai.api_frai[i+1]-1]);
			}			
		}
		if (rai.api_erai[i+1] > 0) {
			eTorpedos.push((opponent.ESCORT_FLEET) ? opponent.ESCORT_FLEET[i-6] : opponent.MAIN_FLEET[i]);
			eAttack.push((opponent.ESCORT_FLEET) ? rai.api_eydam[i-6] : rai.api_eydam[i+1]);
			
			if((opponent.ESCORT_FLEET && rai.api_erai[i+1] >= 7)) {
				fleet.ESCORT_FLEET[rai.api_erai[i+1]-7].curHP -= Math.floor(rai.api_eydam[i-6]);
				eTargets.push(fleet.ESCORT_FLEET[rai.api_erai[i+1]-7]);
			} else {
				fleet.MAIN_FLEET[rai.api_erai[i+1]-1].curHP -= Math.floor(rai.api_eydam[i+1]);
				eTargets.push(fleet.MAIN_FLEET[rai.api_erai[i+1]-1]);
			}
			
			
		}
	}
	if(fTorpedos.length > 0) addText(getText((opening) ? "OPTORP_ATTACK": "TORP_ATTACK",[getFleet(fTorpedos)]));
	if(eTorpedos.length > 0) addText(getText((opening) ? "OPTORP_ATTACK": "TORP_ATTACK",[getFleet(eTorpedos)]));
	for(var j= 0; j < fTorpedos.length; j++) {
		addText(getText("TORP_DAMAGE", [fTorpedos[j].name, fTargets[j].name, fAttack[j]]))
	}
	
/*	for(var j= 0; j = eTorpedos.length; j++) {
		
	}*/
	
}

function showHougeki(hou, fleet) {
	
	for (var j=1; j<hou.api_at_list.length; j++) {
		var attacker;
		var defender;
		
		if (opponent.ESCORT_FLEET) {
			if (hou.api_at_eflag[j]){
				attacker = (hou.api_at_list[j]>6)? opponent.ESCORT_FLEET[hou.api_at_list[j]-7] : opponent.MAIN_FLEET[hou.api_at_list[j]-1];
			} else {
				attacker = (hou.api_at_list[j]>6)? fleet.ESCORT_FLEET[hou.api_at_list[j]-7] : fleet.MAIN_FLEET[hou.api_at_list[j]-1];
			}
			
			if (!hou.api_at_eflag[j]) {
				if(hou.api_df_list[j][0]>6) {
					opponent.ESCORT_FLEET[hou.api_df_list[j][0]-1].curHP =- (hou.api_damage[j].length == 2) ? (hou.api_damage[j][0] + hou.api_damage[j][1]) 
							: hou.api_damage[j][0];
					defender = opponent.ESCORT_FLEET[hou.api_df_list[j][0]-7];
				} else {
					opponent.MAIN_FLEET[hou.api_df_list[j][0]-1].curHP =- (hou.api_damage[j].length == 2) ? (hou.api_damage[j][0] + hou.api_damage[j][1]) 
							: hou.api_damage[j][0];
					defender = opponent.MAIN_FLEET[hou.api_df_list[j][0]-1];
				}
				
			} else {
				if(hou.api_df_list[j][0]>6) {
					fleet.ESCORT_FLEET[hou.api_df_list[j][0]-7].curHP -= (hou.api_damage[j].length == 2) ? (hou.api_damage[j][0] + hou.api_damage[j][1]) 
							: hou.api_df_list[j][0];
					defender = fleet.ESCORT_FLEET[hou.api_df_list[j][0]-7];
				} else {
					fleet.MAIN_FLEET[hou.api_df_list[j][0]-1].curHP -= (hou.api_damage[j].length == 2) ? (hou.api_damage[j][0] + hou.api_damage[j][1]) 
							: hou.api_damage[j][0];
					defender = fleet.MAIN_FLEET[hou.api_df_list[j][0]-1];
				}
			}
		} else {
			attacker = (hou.api_at_list[j]>6)? opponent.MAIN_FLEET[hou.api_at_list[j]-7] : fleet.MAIN_FLEET[hou.api_at_list[j]-1]
			if((hou.api_df_list[j][0]>6)) {
				opponent.MAIN_FLEET[hou.api_df_list[j][0]-7].curHP -= (hou.api_damage[j].length == 2) ? (hou.api_damage[j][0] + hou.api_damage[j][1]) 
						: hou.api_damage[j][0];
				defender = opponent.MAIN_FLEET[hou.api_df_list[j][0]-7];
			} else {
				fleet.MAIN_FLEET[hou.api_df_list[j][0]-1].curHP -= (hou.api_damage[j].length == 2) ? (hou.api_damage[j][0] + hou.api_damage[j][1]) 
						: hou.api_damage[j][0];
				defender = fleet.MAIN_FLEET[hou.api_df_list[j][0]-1];
			}
			
		}
		
		addText(getText("SHELL_TARGET",[attacker.name, hou.api_at_type[j],defender.name]));
		
		if(hou.api_at_type[j] == 2) {
			addText(getText("SHELL_DAMAGE_DOUBLE",[attacker.name, hou.api_cl_list[j][0], 
			                                hou.api_damage[j][0], hou.api_cl_list[j][1], hou.api_damage[j][1]]));
		} else {
			if(hou.api_damage[j][0] < 1) {
				var damage = Math.floor(hou.api_damage[j][0])
				if(hou.api_damage[j][0] > damage) {
					var flagship;
					if (!hou.api_at_eflag[j]) {
						flagship = (hou.api_df_list[j][0]>6)? opponent.ESCORT_FLEET[0] : opponent.MAIN_FLEET[0];
					} else {
						flagship = (hou.api_df_list[j][0]>6)? fleet.ESCORT_FLEET[0] : fleet.MAIN_FLEET[0];
					}
					addText(getText("PROTECT_MISS",[defender.name, flagship]));
				} else {
					addText(getText("SHELL_MISS",[defender.name]));
				}
			} else {
				var damage = Math.floor(hou.api_damage[j][0])
				if(hou.api_damage[j][0] > damage) {
					var flagship;
					if (!hou.api_at_eflag[j]) {
						flagship = (hou.api_df_list[j][0]>6)? opponent.ESCORT_FLEET[0] : opponent.MAIN_FLEET[0];
					} else {
						flagship = (hou.api_df_list[j][0]>6)? fleet.ESCORT_FLEET[0] : fleet.MAIN_FLEET[0];
					}
					addText(getText("SHELL_PROTECT",[defender.name, flagship, hou.api_cl_list[j][0], damage]));
				} else {
					addText(getText("SHELL_DAMAGE",[defender.name, hou.api_cl_list[j][0], damage]));
				}
				
			}
		}
		if(defender.curHP <= 0) {
			addText(getText("SHIP_END", [defender.name, 2]));
		}
	}
}

function addText(text) {
	console.log(text);
}

function processPVP(fleet, battle) {
	var data = battle.data;
	var yasen = battle.yasen;

	opponent = {
			MAIN_FLEET : composeFleet(data.api_ship_ke, data.api_nowhps.slice(7)),
			ESCORT_FLEET: null
	}

	addText(getText("PVP_START",[]));
	addText(getText("FLEET_COMPOSITION",[getFleet(fleet.MAIN_FLEET)]));
	addText(getText("ENEMY_COMPOSITION",[getFleet(opponent.MAIN_FLEET)]));
	addText("");

	if (data.api_formation) addText(getText("FORMATION_SELECT",[data.api_formation[0]]));
	if (data.api_search) {
		addText(getText("DETECTION_F", [data.api_search[0]]));
		addText(getText("DETECTION_E", [data.api_search[1]]));
	}
	
	if (data.api_formation) addText(getText("ENEMY_FORMATION",[0, data.api_formation[1]]));
	addText("");
	if(data.api_opening_taisen_flag) {
		
	}
	addText("");
	if(data.api_opening_flag) {
		showRaigeki(data.api_opening_atack, fleet, true);
		addText("");
	}
	
	
	if(data.api_hourai_flag[0]) {
		addText(getText("SHELL_START",[1]));
		showHougeki(data.api_hougeki1,fleet);
		addText("");
	}
	if(data.api_hourai_flag[1]){
		addText(getText("SHELL_START",[2]));
		showHougeki(data.api_hougeki2,fleet);
		addText("");
	}
	if(data.api_hourai_flag[3]) showRaigeki(data.api_raigeki,fleet,false);


}

function processText(API) {
	var world = API.world;
	var map = API.mapnum;
	var combined = API.combined
	var startData = API.battles[0].data;
	
	fleet = {
			MAIN_FLEET: composeFleet(API['fleet'+API.fleetnum], startData.api_nowhps.slice(1,7)),
			ESCORT_FLEET: (combined) ? composeFleet(API.fleet2, startData.api_nowhps_combined.slice(1,7)) : null,
			NODE_SUPPORT: (API.support1 > 0)? composeFleet(API['fleet'+API.support1], [1,1,1,1,1,1]) : null,
			BOSS_SUPPORT: (API.support2 > 0)? composeFleet(API['fleet'+API.support2], [1,1,1,1,1,1]) :null 
			
	}
	if(world == 0) {
		processPVP(fleet, API.battles[0]);
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


