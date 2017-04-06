function BATTLE(playerFleet, battle, node, isPVP){ 
	opponent = new FLEET();
	tab = $('#tab-'+node+' table');
	dbattle = battle.data;
	nightBattle = battle.yasen;
	combinedE = (dbattle.api_ship_ke_combined)? 1 : 0;
	fleet = playerFleet;
	
	start = function() {
		var body = document.createElement('tbody');
		if(combinedE) opponent.addCombinedFleet(dbattle.api_ship_ke, dbattle.api_nowhps.slice(7), dbattle.api_ship_ke_combined, dbattle.api_nowhps_combined.slice(7));
		else opponent.addFleet(dbattle.api_ship_ke, dbattle.api_nowhps.slice(7));
		
		appendPhase("FLEET PRACTICE");
		body.append(getTextRow("FLEET_COMPOSITION",[fleet.formatFleet(fleet.mainFleet)]));
		body.append(getTextRow("ENEMY_COMPOSITION",[opponent.formatFleet(opponent.mainFleet)]));
		

		tab.append(body);
	}
	
	formation = function() {
		var body = document.createElement('tbody');
		appendPhase("FORMATION");
		if (dbattle.api_formation) body.append(getTextRow("FORMATION_SELECT",[dbattle.api_formation[0]]));
		if (dbattle.api_search) {
			body.append(getTextRow("DETECTION_F", [dbattle.api_search[0]]));
			body.append(getTextRow("DETECTION_E", [dbattle.api_search[1]]));
		}

		if (dbattle.api_formation) body.append(getTextRow("ENEMY_FORMATION",[0, dbattle.api_formation[1]]));
		tab.append(body);
		
	}
	oasw = function() {
		
	}
	opTorp = function() {
		var body = document.createElement('tbody');
		appendPhase("OPENING TORPEDOS");
		
		showRaigeki(dbattle.api_opening_atack, body, true);
		tab.append(body);
	}
	
	/*hourai = function() {
		if(isPVP) {
			if(data.api_hourai_flag[0]) {
				getTextRow("SHELL_START",[1]);
				showHougeki(data.api_hougeki1,fleet);
				addText("");
			}
			if(data.api_hourai_flag[1]){
				getTextRow("SHELL_START",[2]));
				showHougeki(data.api_hougeki2,fleet);
				addText("");
			}
			if(data.api_hourai_flag[3]) showRaigeki(data.api_raigeki,fleet,false);
			if(battle.api_midnight_flag && yasen.length > 0) {
				
			}
		}
	}*/
/*	kouku = function(kouku, fleet, isbombing,isjet) {
		var stage1 = kouku.api_stage1;
		var stage2 = kouku.api_stage2;
		var stage3 = kouku.api_stage3;

		if (kouku && kouku.api_plane_from && (kouku.api_plane_from[0][0] != -1 || kouku.api_plane_from[1][0] != -1)){


			getTextRow("AIR_SUPERIORITY", [stage1.api_disp_seiku]));
			if(stage1.api_touch_plane[0] > 0) getTextRow("AIR_CONTACT_F",[getItemName(stage1.api_touch_plane[0])]));
			if(stage1.api_touch_plane[1] > 0) getTextRow("AIR_CONTACT_E",[getItemName(stage1.api_touch_plane[1])]));

			if(stage2 && stage2.api_air_fire) {
				var AAShip = (stage2.api_air_fire.api_idx > 5) ? fleet.ESCORT_FLEET[stage2.api_air_fire.api_idx - 6] : fleet.MAIN_FLEET[stage2.api_air_fire.api_idx];
				getTextRow("AIR_AACI", [AAShip.name, stage2.api_air_fire.api_kind]));
			}

			if (stage3) {
				var fTargets = [], fCTargets = [], eTargets = [], eCTargets = [];

				for (var i=0; i<6; i++) {
					if (kouku.api_stage3.api_fdam) {
						var dam = Math.floor(kouku.api_stage3.api_fdam[i+1]);  //remember later, .1 = protect
						fleet.MAIN_FLEET[i].curHP -= dam;
						if (kouku.api_stage3.api_frai_flag[i+1] || kouku.api_stage3.api_fbak_flag[i+1]) eTargets.push({
							ship: fleet.MAIN_FLEET[i],
							damage: (dam>0)? dam:0,
							protect: (dam!=kouku.api_stage3.api_fdam[i+1]),
							crit: kouku.api_stage3.api_fcl_flag[i+1],
							rai: kouku.api_stage3.api_frai_flag[i+1]
						});
					}

					if (kouku.api_stage3.api_edam) {
						var dam = Math.floor(kouku.api_stage3.api_edam[i+1]);  //remember later, .1 = protect
						opponent.MAIN_FLEET[i].curHP -= dam;
						if (stage3.api_erai_flag[i+1] || stage3.api_ebak_flag[i+1]) fTargets.push({
							ship: opponent.MAIN_FLEET[i],
							damage: (dam > 0)? dam : 0,
							protect: (dam != stage3.api_edam[i+1]),
							crit: stage3.api_ecl_flag[i+1],
							rai: stage3.api_erai_flag[i+1]
						});
					}

					if (kouku.api_stage3_combined) {
						if (kouku.api_stage3_combined.api_fdam) {
							var dam = parseInt(kouku.api_stage3_combined.api_fdam[i+1]);  //remember later, .1 = protect
							HPstate[i+12] -= Math.floor(dam);
							var hit = (kouku.api_stage3_combined.api_frai_flag[i+1] || kouku.api_stage3_combined.api_fbak_flag[i+1]);
							if (hit) targetdata.push([fleet1C[i],(dam>0)? dam:0,(dam!=kouku.api_stage3_combined.api_fdam[i+1]),kouku.api_stage3_combined.api_fcl_flag[i+1],kouku.api_stage3_combined.api_frai_flag[i+1]]);
						}
						if (kouku.api_stage3_combined.api_edam) {
							var dam = parseInt(kouku.api_stage3_combined.api_edam[i+1]);  //remember later, .1 = protect
							HPstate[i+18] -= Math.floor(dam);
							var hit = (kouku.api_stage3_combined.api_erai_flag[i+1] || kouku.api_stage3_combined.api_ebak_flag[i+1]);
							if (hit) targetdata.push([f2c[i],(dam>0)? dam:0,(dam!=kouku.api_stage3_combined.api_edam[i+1]),kouku.api_stage3_combined.api_ecl_flag[i+1],kouku.api_stage3_combined.api_erai_flag[i+1]]);
						}
					}
				}
				for(var f in fTargets){
					getTextRow("AIR_DAMAGE", [fTargets[f].rai, fTargets[f].crit, fTargets[f].ship.name, fTargets[f].damage]));
					if(fTargets[f].ship.curHP <= 0) {
						getTextRow("SHIP_END", [fTargets[f].ship.name, 2]));
					}
				}
			}
		}
	},*/
	showRaigeki = function(rai, table, opening) {
		
		var fTorpedos = [], fAttack = [], fTargets = [];
		var eTorpedos = [], eAttack = [], eTargets = [];

		var num = (combinedE)? 12 : 6;

		for (var i=0; i<num; i++) {
			if (rai.api_frai[i+1] > 0) {
				fTorpedos.push((i>=6)? fleet.escortFleet[i-6] : fleet.mainFleet[i]);
				fAttack.push((i>=6) ? rai.api_fydam[i-6] : rai.api_fydam[i+1]);

				if((opponent.escortFleet && rai.api_frai[i+1] >= 7)) {
					opponent.escortFleet[rai.api_frai[i+1]-7].curHP -= Math.floor(rai.api_fydam[i-6]);
					fTargets.push(opponent.escortFleet[rai.api_frai[i+1]-7]);
				} else {
					opponent.mainFleet[rai.api_frai[i+1]-1].curHP -= Math.floor(rai.api_fydam[i+1]);
					fTargets.push(opponent.mainFleet[rai.api_frai[i+1]-1]);
				}			
			}
			if (rai.api_erai[i+1] > 0) {
				eTorpedos.push((combinedE) ? opponent.escortFleet[i-6] : opponent.mainFleet[i]);
				eAttack.push((combinedE) ? rai.api_eydam[i-6] : rai.api_eydam[i+1]);

				if((opponent.escortFleet && rai.api_erai[i+1] >= 7)) {
					fleet.escortFleet[rai.api_erai[i+1]-7].curHP -= Math.floor(rai.api_eydam[i-6]);
					eTargets.push(fleet.escortFleet[rai.api_erai[i+1]-7]);
				} else {
					fleet.mainFleet[rai.api_erai[i+1]-1].curHP -= Math.floor(rai.api_eydam[i+1]);
					eTargets.push(fleet.mainFleet[rai.api_erai[i+1]-1]);
				}


			}
		}
		if(fTorpedos.length > 0) table.append(getTextRow((opening) ? "OPTORP_ATTACK": "TORP_ATTACK",[fleet.formatFleet(fTorpedos)]));
		if(eTorpedos.length > 0) table.append(getTextRow((opening) ? "OPTORP_ATTACK": "TORP_ATTACK",[fleet.formatFleet(eTorpedos)]));
		for(var j= 0; j < fTorpedos.length; j++) {
			table.append(getTextRow("TORP_DAMAGE", [fTorpedos[j].name, fTargets[j].name, fAttack[j]]));
		}

		for(var j= 0; j < eTorpedos.length; j++) {

		}

	}
	/*hougeki = function(hou, fleet) {

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

			getTextRow("SHELL_TARGET",[attacker.name, hou.api_at_type[j],defender.name]));

			if(hou.api_at_type[j] == 2) {
				getTextRow("SHELL_DAMAGE_DOUBLE",[attacker.name, hou.api_cl_list[j][0], 
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
						getTextRow("PROTECT_MISS",[defender.name, flagship]));
					} else {
						getTextRow("SHELL_MISS",[defender.name]));
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
						getTextRow("SHELL_PROTECT",[defender.name, flagship, hou.api_cl_list[j][0], damage]));
					} else {
						getTextRow("SHELL_DAMAGE",[defender.name, hou.api_cl_list[j][0], damage]));
					}

				}
			}
			if(defender.curHP <= 0) {
				getTextRow("SHIP_END", [defender.name, 2]));
			}
		}
	}*/

	function appendPhase(phase) {
		$("<thead><tr></tr></thead>")
		.find("tr").html('<th>'+ phase +'</th>')
		.end()
		.appendTo(tab);
	}
	function getTextRow(name, args) {
		var row = document.createElement('tr');
		row.innerHTML = '<td>'+ getText(name, args) +'</td>';
		//tab.append(row);
		return row;
	}
}

BATTLE.prototype.startBattle = function(playerFleet) {
	start();
	formation();
	if(dbattle.api_opening_flag) opTorp();
};