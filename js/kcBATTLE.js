function BATTLE(playerFleet, battle, node, isPVP) {
	player = playerFleet;
	opponent = new FLEET();
	tab = $('#battle-' + node + ' table');
	dbattle = battle.data;
	nightBattle = battle.yasen;

	combinedE = (dbattle.api_ship_ke_combined) ? 1 : 0;

	start = function() {//possible armor break state - api_xal01
		if (combinedE)
			opponent.addCombinedFleet(dbattle.api_ship_ke, dbattle.api_ship_ke_combined, dbattle.api_nowhps.slice(7), dbattle.api_nowhps_combined.slice(7));
		else
			opponent.addFleet(dbattle.api_ship_ke, dbattle.api_nowhps.slice(7));
	};

	formation = function() {
		var body = document.createElement('tbody');
		appendPhase("FORMATION");
		body.append(getTextRow("ENEMY_COMPOSITION", [opponent.toString()]));
		body.append(getTextRow("FORMATION_SELECT", [dbattle.api_formation[0]]));
		body.append(getTextRow("ENEMY_FORMATION", [combinedE, dbattle.api_formation[1]]));
		body.append(getTextRow("ENGAGEMENT", [dbattle.api_formation[2]]));
		tab.append(body);

	};

	detection = function() {
		var body = document.createElement('tbody');
		appendPhase("DETECTION");

		body.append(getTextRow("DETECTION_F", [dbattle.api_search[0]]));
		body.append(getTextRow("DETECTION_E", [dbattle.api_search[1]]));

		tab.append(body);
	};

	jetAttack = function() {
		var body = document.createElement('tbody');
		appendPhase("JET BATTLE");

		tab.append(body);
	};

	airAttack = function() {
		var kou = dbattle.api_kouku;
		var body = document.createElement('tbody');
		appendPhase("AIR BATTLE");
		if (kou && kou.api_plane_from && (kou.api_plane_from[0][0] != -1 || kou.api_plane_from[1][0] != -1)) {
			kouku(kou, body);
		} else {
			body.append(getTextRow("AIR_NONE", []));
		}

		tab.append(body);
	};

	support = function() {
		var body = document.createElement('tbody');
		appendPhase("SUPPORTING FIRE");

		tab.append(body);
	};

	oasw = function() {
		var body = document.createElement('tbody');
		appendPhase("OPENING ASW");

		tab.append(body);
	};

	opTorp = function() {
		var body = document.createElement('tbody');
		appendPhase("OPENING TORPEDOS");
		if (player.isCombined()) {
			raigeki(dbattle.api_opening_atack, body, player.escortFleet, true);
		} else {
			raigeki(dbattle.api_opening_atack, body, player.mainFleet, true);
		}

		tab.append(body);
	};

	engagement = function() {
		var body = document.createElement('tbody');
		appendPhase("ENGAGEMENT");

		tab.append(body);
	};

	hourai = function() {
		var body = document.createElement('tbody');
		appendPhase("SHELLING PHASE");
		if (isPVP) {
			if (dbattle.api_hourai_flag[0]) {
				body.append(getTextRow("SHELL_START", [1]));
				hougeki(dbattle.api_hougeki1, player);
				body.append(getTextRow("", []));
			}
			if (dbattle.api_hourai_flag[1]) {
				body.append(getTextRow("SHELL_START", [2]));
				hougeki(dbattle.api_hougeki2, player);
				body.append(getTextRow("", []));
			}
			if (dbattle.api_hourai_flag[3])
				raigeki(dbattle.api_raigeki, body, player, false);

		} else {
			if (player.combined && combinedE) {//12vs12
				if (player.combined == 2) {
					if (dbattle.api_hourai_flag[0]) {
						body.append(getTextRow("", []));
						hougeki(dbattle.api_hougeki1, player.mainFleet, body);
						body.append(getTextRow("", []));
					}
					if (dbattle.api_hourai_flag[1]) {
						hougeki(dbattle.api_hougeki2, player.mainFleet, body);
						body.append(getTextRow("", []));
					}
					if (dbattle.api_hourai_flag[2]) {
						hougeki(dbattle.api_hougeki3, player.escortFleet, body);
						body.append(getTextRow("", []));
					}
					if (dbattle.api_hourai_flag[3]) {
						raigeki(dbattle.api_raigeki, body, player.escortFleet);
					}
				} else {
					if (dbattle.api_hourai_flag[0]) {
						hougeki(dbattle.api_hougeki1, player.mainFleet, body);
						body.append(getTextRow("", []));
					}
					if (dbattle.api_hourai_flag[1]) {
						hougeki(dbattle.api_hougeki2, player.escortFleet, body);
						body.append(getTextRow("", []));
					}
					if (dbattle.api_hourai_flag[2]) {
						raigeki(dbattle.api_raigeki, body, player.escortFleet);
						body.append(getTextRow("", []));
					}
					if (dbattle.api_hourai_flag[3]) {
						hougeki(dbattle.api_hougeki3, player.mainFleet, body);
					}
				}
			} else {
				f = (player.combined == 1 || player.combined == 3) ? player.escortFleet : player.mainFleet;
				if (dbattle.api_hougeki1) {
					hougeki(dbattle.api_hougeki1, f, body);
					body.append(getTextRow("", []));
				}
				//CTF does closing torpedo
				if ((player.combined == 1 || player.combined == 3 || combinedE) && dbattle.api_raigeki) {
					raigeki(dbattle.api_raigeki, body, f);
					body.append(getTextRow("", []));
				}

				if (dbattle.api_hougeki2) {
					hougeki(dbattle.api_hougeki2, player.mainFleet, body);
					body.append(getTextRow("", []));
				}
				//always main player
				if (dbattle.api_hougeki3) {
					f = (player.combined == 2) ? player.escortFleet : player.mainFleet;
					hougeki(dbattle.api_hougeki3, f, body);
					body.append(getTextRow("", []));
				}

				//closing torp (if not CTF/TTF)
				f = (player.combined) ? player.escortFleet : player.mainFleet;
				if (player.combined != 1 && player.combined != 3 && !dbattle.api_ship_ke_combined && dbattle.api_raigeki) {
					raigeki(dbattle.api_raigeki, body, f);
					body.append(getTextRow("", []));
				}
			}
		}

		tab.append(body);
	};

	yasen = function() {
		var body = document.createElement('tbody');
		appendPhase("NIGHT BATTLE");

		var f1 = (player.isCombined) ? player.escortFleet : player.mainFleet;
		var f2 = (yasen.api_active_deck && yasen.api_active_deck[1] == 2) ? opponent.escortFleet : opponent.mainFleet;
		var hou = nightBattle.api_hougeki;

		for (var j = 1; j < hou.api_at_list.length; j++) {
			var attacker,
			    defender,
			    dam;

			attacker = (hou.api_at_list[j] > 6) ? f2[hou.api_at_list[j] - 7] : f1[hou.api_at_list[j] - 1];
			defender = (hou.api_df_list[j][0] > 6) ? f2[hou.api_df_list[j][0] - 7] : f1[hou.api_df_list[j][0] - 1];
			dam = (hou.api_damage[j].length == 2) ? hou.api_damage[j][0] + hou.api_damage[j][1] : hou.api_damage[j][0];
			body.append(getTextRow("NIGHT_TARGET", [attacker.name, defender.name, hou.api_sp_list[j]]));

			if ((hou.api_damage[j][0] != Math.floor(hou.api_damage[j][0]))) {
			}//protect
			else {
				if (dam < 1) {
					body.append(getTextRow("SHELL_MISS", [defender.name]));
				} else if (hou.api_sp_list[j] == 1) {
					body.append(getTextRow("SHELL_DAMAGE_DOUBLE", [defender.name, hou.api_cl_list[j][0], Math.floor(hou.api_damage[j][0]), hou.api_cl_list[j][1], Math.floor(hou.api_damage[j][1])]));
				} else {
					body.append(getTextRow("SHELL_DAMAGE", [defender.name, hou.api_cl_list[j][0], Math.floor(hou.api_damage[j][0])]));
				}
			}
			defender.damage(dam);
		}

		tab.append(body);
	};

	kouku = function(kouku, table, isbombing, isjet) {
		var stage1 = kouku.api_stage1;
		var stage2 = kouku.api_stage2;
		var stage3 = kouku.api_stage3;

		var fAttackers = [],
		    eAttackers = [];
		if (kouku.api_plane_from[0][0] != -1) {
			for (var i = 0; i < kouku.api_plane_from[0].length; i++) {
				var ship = (isbombing) ? kouku.api_plane_from[0][i] : (kouku.api_plane_from[0][i] < 7) ? player.mainFleet[kouku.api_plane_from[0][i] - 1] : player.escortFleet[kouku.api_plane_from[0][i] - 7];
				if (isbombing && kouku.api_squadron_plane.length <= i)
					continue;
				/*
				 if (isbombing) {
				 var eqid = kouku.api_squadron_plane[i].api_mst_id;
				 if (EQDATA[eqid]) attackdata[i].push((EQDATA[eqid].b_image)? EQDATA[eqid].b_image : 1);
				 else attackdata[i].push(13);
				 }*/

				fAttackers.push(ship);
			}
			table.append(getTextRow("AIR_START", [arrayToString(fAttackers), stage1.api_f_count, stage2.api_f_count]));
		}

		if (kouku.api_plane_from[1][0] != -1) {
			for (var i = 0; i < kouku.api_plane_from[1].length; i++) {
				var slot = kouku.api_plane_from[1][i];
				if (slot > 6)
					slot -= 6;
				eAttackers.push(opponent.mainFleet[slot - 1]);
			}
			table.append(getTextRow("AIR_START", [arrayToString(eAttackers), stage1.api_e_count, stage2.api_e_count]));
		}
		
		if(stage1.api_f_count > 0) table.append(getTextRow("AIR_STAGE1_LOSS", [0, stage1.api_f_lostcount, 1]));
		if(stage1.api_e_count > 0) table.append(getTextRow("AIR_STAGE1_LOSS", [1, stage1.api_e_lostcount, 0]));
		
		if(!isbombing && !isjet) {
		table.append(getTextRow("AIR_SUPERIORITY", [stage1.api_disp_seiku]));

		if (stage1.api_touch_plane[0] > 0)
			table.append(getTextRow("AIR_CONTACT_F", [getItem(stage1.api_touch_plane[0])]));
		if (stage1.api_touch_plane[1] > 0)
			table.append(getTextRow("AIR_CONTACT_E", [getItem(stage1.api_touch_plane[1])]));
		}
		table.append(getTextRow("", []));
		
		
		if (stage2 && stage2.api_air_fire) {
			var AAShip = (stage2.api_air_fire.api_idx > 5) ? player.escortFleet[stage2.api_air_fire.api_idx - 6] : player.mainFleet[stage2.api_air_fire.api_idx];
			table.append(getTextRow("AIR_AACI", [AAShip.name, stage2.api_air_fire.api_kind]));
		}
		
		if(stage2.api_f_count > 0) table.append(getTextRow("AIR_STAGE2_LOSS", [1, stage2.api_f_lostcount, 0]));
		if(stage2.api_e_count > 0) table.append(getTextRow("AIR_STAGE2_LOSS", [0, stage2.api_e_lostcount, 1]));
		table.append(getTextRow("", []));
	};

	/*	kouku = function(kouku, player, isbombing,isjet) {

	 if (kouku && kouku.api_plane_from && (kouku.api_plane_from[0][0] != -1 || kouku.api_plane_from[1][0] != -1)){

	 if (stage3) {
	 var fTargets = [], fCTargets = [], eTargets = [], eCTargets = [];

	 for (var i=0; i<6; i++) {
	 if (kouku.api_stage3.api_fdam) {
	 var dam = Math.floor(kouku.api_stage3.api_fdam[i+1]);  //remember later, .1 = protect
	 player.MAIN_FLEET[i].curHP -= dam;
	 if (kouku.api_stage3.api_frai_flag[i+1] || kouku.api_stage3.api_fbak_flag[i+1]) eTargets.push({
	 ship: player.MAIN_FLEET[i],
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
	 if (hit) targetdata.push([player.escortFleet[i],(dam>0)? dam:0,(dam!=kouku.api_stage3_combined.api_fdam[i+1]),kouku.api_stage3_combined.api_fcl_flag[i+1],kouku.api_stage3_combined.api_frai_flag[i+1]]);
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

	raigeki = function(rai, table, fleet, opening) {

		var fTorpedos = [],
		    fAttack = [],
		    fTargets = [];
		var eTorpedos = [],
		    eAttack = [],
		    eTargets = [];

		var num = (combinedE) ? 12 : 6;
		for (var i = 0; i < num; i++) {
			if (rai.api_frai[i + 1] > 0) {
				fTorpedos.push((i >= 6) ? fleet[i - 6] : fleet[i]);
				fAttack.push({
					atk : rai.api_fydam[i + 1],
					crit : (rai.api_fcl[i + 1] == 2)
				});

				if ((combinedE && rai.api_frai[i + 1] >= 7)) {
					fTargets.push(opponent.escortFleet[rai.api_frai[i + 1] - 7]);
				} else {
					fTargets.push(opponent.mainFleet[rai.api_frai[i + 1] - 1]);
				}
			}
			if (rai.api_erai[i + 1] > 0) {
				eTorpedos.push((combinedE) ? opponent.escortFleet[i - 6] : opponent.mainFleet[i]);
				eAttack.push({
					atk : rai.api_eydam[i + 1],
					crit : (rai.api_ecl[i + 1] == 2)
				});

				if ((opponent.escortFleet && rai.api_erai[i + 1] >= 7)) {
					eTargets.push(fleet[rai.api_erai[i + 1] - 7]);
				} else {
					eTargets.push(player.mainFleet[rai.api_erai[i + 1] - 1]);
				}

			}
		}

		if (fTorpedos.length > 0)
			table.append(getTextRow((opening) ? "OPTORP_ATTACK" : "TORP_ATTACK", [arrayToString(fTorpedos)]));
		if (eTorpedos.length > 0)
			table.append(getTextRow((opening) ? "OPTORP_ATTACK" : "TORP_ATTACK", [arrayToString(eTorpedos)]));
		for (var j = 0; j < fTorpedos.length; j++) {
			table.append(getTextRow("TORP_DAMAGE", [fTorpedos[j].name, fTargets[j].name, fAttack[j].atk]));
			fTargets[j].damage(fAttack[j].atk);
		}

		for (var j = 0; j < eTorpedos.length; j++) {
			table.append(getTextRow("TORP_DAMAGE", [eTorpedos[j].name, eTargets[j].name, eAttack[j].atk]));
			eTargets[j].damage(eAttack[j].atk);
		}

	};

	hougeki = function(hou, fleet, body) {
		for (var j = 1; j < hou.api_at_list.length; j++) {
			var attacker,
			    defender,
			    damage;

			if (combinedE) {
				if (hou.api_at_eflag[j])
					attacker = (hou.api_at_list[j] > 6) ? opponent.escortFleet[hou.api_at_list[j] - 7] : opponent.mainFleet[hou.api_at_list[j] - 1];
				else
					attacker = (hou.api_at_list[j] > 6) ? player.escortFleet[hou.api_at_list[j] - 7] : player.mainFleet[hou.api_at_list[j] - 1];
			} else {
				attacker = (hou.api_at_list[j] > 6) ? opponent.mainFleet[hou.api_at_list[j] - 7] : fleet[hou.api_at_list[j] - 1];
			}

			if (combinedE) {
				if (!hou.api_at_eflag[j])
					defender = (hou.api_df_list[j][0] > 6) ? opponent.escortFleet[hou.api_df_list[j][0] - 7] : opponent.mainFleet[hou.api_df_list[j][0] - 1];
				else
					defender = (hou.api_df_list[j][0] > 6) ? player.escortFleet[hou.api_df_list[j][0] - 7] : player.mainFleet[hou.api_df_list[j][0] - 1];
			} else {
				defender = (hou.api_df_list[j][0] > 6) ? opponent.mainFleet[hou.api_df_list[j][0] - 7] : fleet[hou.api_df_list[j][0] - 1];
			}

			body.append(getTextRow("SHELL_TARGET", [attacker.name, hou.api_at_type[j], defender.name]));

			for (var k in hou.api_damage[j]) {
				defender.damage(Math.floor(hou.api_damage[j][k]));
			}
			if (hou.api_at_type[j] == 2) {
				body.append(getTextRow("SHELL_DAMAGE_DOUBLE", [defender.name, hou.api_cl_list[j][0], hou.api_damage[j][0], hou.api_cl_list[j][1], hou.api_damage[j][1]]));
			} else {

				if (hou.api_damage[j][0] < 1) {// need protect
					var damage = Math.floor(hou.api_damage[j][0]);
					if (hou.api_damage[j][0] > damage) {
						body.append(getTextRow("SHELL_MISS", [defender.name]));
					} else {
						body.append(getTextRow("SHELL_MISS", [defender.name]));
					}
				} else {
					var damage = Math.floor(hou.api_damage[j][0]);
					if (hou.api_damage[j][0] > damage) {//protect
						body.append(getTextRow("SHELL_DAMAGE", [defender.name, hou.api_cl_list[j][0], damage]));
					} else {
						body.append(getTextRow("SHELL_DAMAGE", [defender.name, hou.api_cl_list[j][0], damage]));
					}
				}
			}
			if (defender.isSunk()) {
				body.append(getTextRow("SHIP_END", [defender.name, 0]));
			}
		}
	};

	function appendPhase(phase) {
		$("<thead><tr></tr></thead>").find("tr").html('<th>' + phase + '</th>').end().appendTo(tab);
	}

	function getTextRow(name, args) {
		var row = document.createElement('tr');
		if (name.length === 0) {
			row.className = 'blank_row';
			row.innerHTML = '<td> </td>';
		} else {
			row.innerHTML = '<td>' + getText(name, args) + '</td>';
		}
		return row;
	}

}

arrayToString = function(array) {
	var ships = "";
	if (array.length == 1)
		return array[0].name;

	for (var i = 0; i < array.length; i++) {
		if (i == (array.length - 1)) {
			ships = ships.concat("and ", array[i].name);
			continue;
		}
		ships = ships.concat(array[i].name, ", ");
	}
	return ships;
};

BATTLE.prototype.startBattle = function(playerFleet) {
	start();
	if (dbattle.api_formation)
		formation();
	if (dbattle.api_search)
		detection();
	if (dbattle.api_injection_kouku)
		jetAttack();
	if (dbattle.api_stage_flag)
		airAttack();
	if (dbattle.api_support_flag && dbattle.api_support_flag > 0)
		support();
	if (dbattle.api_opening_taisen_flag)
		oasw();
	if (dbattle.api_opening_flag)
		opTorp();
	if (dbattle.api_hourai_flag)
		hourai();
	if (dbattle.api_midnight_flag && nightBattle)
		yasen();
};
