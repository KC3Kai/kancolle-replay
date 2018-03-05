var BATTLE = (function() {
	var player;
	var opponent;
	var tab;
	var dbattle;
	var nightBattle;
	var combinedE;
	var isPVP;
	var node;
	var bossNode;
	var version; //1 - Before 2017-11-17 api_maxhps, 2 - After 2017-11-17 api_f_maxhps
	var nightFirst;
	
	function BATTLE(playerFleet, battle, battleNode, PVP, boss) {
		player = playerFleet;
		opponent = new FLEET();
		tab = $('#battle-' + battleNode + ' table');
		dbattle = battle.data;
		nightBattle = battle.yasen;
		combinedE = (dbattle.api_ship_ke_combined) ? 1 : 0;
		isPVP = PVP | 0;
		node = battleNode;
		bossNode = boss | 0;
		version = (dbattle.api_maxhps) ? 1 : 2;
		nightFirst = !!dbattle.api_n_hougeki1;
	};

	start = function() {//possible armor break state - api_xal01
		var body = document.createElement('tbody');
		appendPhase("TITLE_BATTLE_START");
		var enemyId = (dbattle.api_ship_ke) ? dbattle.api_ship_ke: nightBattle.api_ship_ke;
		
		var enemyHp;
		if (version == 1) {
			enemyHp = (dbattle.api_ship_ke) ? dbattle.api_nowhps.slice(7) : nightBattle.api_nowhps.slice(7);
		} else {
			enemyHp = (dbattle.api_ship_ke) ? dbattle.api_e_nowhps : nightBattle.api_e_nowhps;
		}
		if (combinedE){
			var enemyCId = (dbattle.api_ship_ke_combined) ? dbattle.api_ship_ke_combined: nightBattle.api_ship_ke_combined;
			var enemyCHp;
			if (version == 1) {
				enemyCHp = (dbattle.api_nowhps_combined) ? dbattle.api_nowhps_combined.slice(7) : nightBattle.api_nowhps_combined.slice(7);
			} else {
				enemyCHp = (dbattle.api_e_nowhps_combined) ? dbattle.api_e_nowhps_combined : nightBattle.api_e_nowhps_combined;
			}

			opponent.addCombinedFleet(enemyId, enemyCId, enemyHp, enemyCHp);
		}
		else
			opponent.addFleet(enemyId, enemyHp);
			
		if(isPVP)
			body.append(getTextRow("PVP_START",[]));
		else 
			body.append(getTextRow("NODE_START",[node]));
		tab.append(body);
	};

	formation = function() {
		var body = document.createElement('tbody');
		appendPhase("TITLE_FORMATION");
		body.append(getTextRow("ENEMY_COMPOSITION", [opponent.toString()]));
		body.append(getTextRow("FORMATION_SELECT", [dbattle.api_formation[0]]));
		body.append(getTextRow("ENEMY_FORMATION", [combinedE, dbattle.api_formation[1]]));
		body.append(getTextRow("ENGAGEMENT", [dbattle.api_formation[2]]));
		tab.append(body);

	};

	detection = function() {
		var body = document.createElement('tbody');
		appendPhase("TITLE_DETECTION");

		body.append(getTextRow("DETECTION_F", [dbattle.api_search[0]]));
		body.append(getTextRow("DETECTION_E", [dbattle.api_search[1]]));

		tab.append(body);
	};

	jetLbas = function() {
		var body = document.createElement('tbody');
		appendPhase("TITLE_LAND_BASE_JET_BOMBING");
		/*
		 data.api_air_base_injection.api_plane_from[1] = [];
		 data.api_air_base_injection.api_squadron_plane = data.api_air_base_injection.api_air_base_data;
		 for (var j=0; j<f2.length; j++)
		 if (f2[j].planetypes.length) data.api_air_base_injection.api_plane_from[1].push(7+j);
		 if (data.api_air_base_injection.api_plane_from[1].length <= 0) data.api_air_base_injection.api_plane_from[1] = [-1];
		 for (var j=0; j<data.api_air_base_injection.api_squadron_plane.length; j++)
		 if (data.api_air_base_injection.api_squadron_plane[j].api_mst_id) data.api_air_base_injection.api_plane_from[0][j] = j+7;
		 processKouku(data.api_air_base_injection,true); //no isjet=true for now
		 tab.append(body);*/
		kouku(dbattle.api_air_base_injection, body, null, false, true, true);
		body.append(getTextRow("", []));
		tab.append(body);
	};

	jetAttack = function() {
		var body = document.createElement('tbody');
		appendPhase("TITLE_JET_BATTLE");
		kouku(dbattle.api_injection_kouku, body, player.mainFleet, false, true);
		tab.append(body);
	};

	lbas = function() {
		var body = document.createElement('tbody');
		appendPhase("TITLE_LAND_BASE_BOMBING");
		/*
		 for (var i=0; i<dbattle.api_air_base_attack.length; i++) {
		 dbattle.api_air_base_attack[i].api_plane_from[1] = [];
		 for (var j=0; j<opponent.mainFleet.length; j++)
		 if (f2[j].planetypes.length) dbattle.api_air_base_attack[i].api_plane_from[1].push(7+j);
		 if (dbattle.api_air_base_attack[i].api_plane_from[1].length <= 0) dbattle.api_air_base_attack[i].api_plane_from[1] = [-1];
		 for (var j=0; j<dbattle.api_air_base_attack[i].api_squadron_plane.length; j++)
		 if (dbattle.api_air_base_attack[i].api_squadron_plane[j].api_mst_id) dbattle.api_air_base_attack[i].api_plane_from[0][j] = j+7;
		 processKouku(dbattle.api_air_base_attack[i],true);
		 }*/
		for (let i=0; i<dbattle.api_air_base_attack.length; i++) {
			kouku(dbattle.api_air_base_attack[i], body, null, false, false, true);
			body.append(getTextRow("", []));
		}
		
		tab.append(body);
	};

	airAttack = function() {
		var kou = dbattle.api_kouku;
		var body = document.createElement('tbody');
		appendPhase("TITLE_AIR_BATTLE");
		if (kou && kou.api_plane_from && ((kou.api_plane_from[0] && kou.api_plane_from[0][0] != -1) || (kou.api_plane_from[1] && kou.api_plane_from[1][0] != -1))) {
			kouku(kou, body, player.mainFleet);
		} else {
			body.append(getTextRow("AIR_NONE", []));
		}

		tab.append(body);
	};

	support = function(support_flag, support_info) {
		var body = document.createElement('tbody');
		appendPhase("TITLE_SUPPORTING_FIRE");
		body.append(getTextRow("SUPPORT_START", [bossNode, support_flag]));
		if(support_flag == 1) {
			var fleet = (bossNode) ? player.supportBoss : player.supportNode;
			
			kouku(support_info.api_support_airatack, body, fleet);
		} else {
			var support = support_info.api_support_hourai;
			var damages = [], crits = [];
			for (var i=0; i<support.api_damage.length; i++) {
					damages.push(Math.floor(support.api_damage[i]));
					crits.push(((support.api_cl_list[i] == 2)? 2 : 1));
				}
				if (damages[0] == -1) { damages = damages.slice(1); crits = crits.slice(1); }
				for (var i=0; i<damages.length; i++) {
					var ship = (i<6) ? opponent.mainFleet[i] : (opponent.escortFleet) ? opponent.escortFleet[i-6] : null;
					if (!ship) continue;
					ship.damage(Math.floor(damages[i]));
					
					if(support_flag == 2) {
						if(damages[i] >= 1) body.append(getTextRow("SHELL_DAMAGE", [ship.name, crits[i], damages[i]]));
					} else if (support_flag == 3) {
						if(damages[i] >= 1) body.append(getTextRow("TORP_DAMAGE", ["Support Fleet", ship.name, damages[i], crits[i]]));
					}
					
					if(ship.isSunk()) {
						body.append(getTextRow("SHIP_END", [ship.name, isPVP]));
					}
				}
			
		}
		tab.append(body);
	};

	oasw = function() {
		var body = document.createElement('tbody');
		appendPhase("TITLE_OPENING_ASW");
		if (player.isCombined()) {
			hougeki(dbattle.api_opening_taisen, player.escortFleet, body);
		} else {
			hougeki(dbattle.api_opening_taisen, player.mainFleet, body);
		}
		tab.append(body);
	};

	opTorp = function() {
		var body = document.createElement('tbody');
		appendPhase("TITLE_OPENING_TORPEDO");
		if (player.isCombined()) {
			raigeki(dbattle.api_opening_atack, body, player.escortFleet, true);
		} else {
			raigeki(dbattle.api_opening_atack, body, player.mainFleet, true);
		}

		tab.append(body);
	};

	hourai = function() {
		var body = document.createElement('tbody');
		appendPhase("TITLE_SHELLING_PHASE");
		if (isPVP) {
			if (dbattle.api_hourai_flag[0]) {
				body.append(getTextRow("SHELL_START", [1]));
				hougeki(dbattle.api_hougeki1, player.mainFleet, body);
				body.append(getTextRow("", []));
			}
			if (dbattle.api_hourai_flag[1]) {
				body.append(getTextRow("SHELL_START", [2]));
				hougeki(dbattle.api_hougeki2, player.mainFleet, body);
				body.append(getTextRow("", []));
			}
			if (dbattle.api_hourai_flag[3])
				raigeki(dbattle.api_raigeki, body, player.mainFleet, false);

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
		if (nightBattle.api_friendly_info && nightBattle.api_friendly_battle) {
			var friendFleet = new FLEET();
			friendFleet.addFleet(nightBattle.api_friendly_info.api_ship_id, nightBattle.api_friendly_info.api_nowhps);
			yasenHougeki(nightBattle.api_friendly_battle.api_hougeki, friendFleet);
		}
	
		if (nightBattle.api_n_support_flag && nightBattle.api_n_support_flag > 0) {
			support(nightBattle.api_n_support_flag, nightBattle.api_n_support_info);
		}
		
		var hou = nightBattle.api_hougeki;
		if (hou.api_at_list) yasenHougeki(hou);
	};
	
	yasenHougeki = function(hou, playerFleet) {
		playerFleet = playerFleet || player;
	
		var body = document.createElement('tbody');
		appendPhase("TITLE_NIGHT_BATTLE");
		
		var f1 = (playerFleet.isCombined()) ? playerFleet.escortFleet : playerFleet.mainFleet;
		var f2 = (yasen.api_active_deck && yasen.api_active_deck[1] == 2) ? opponent.escortFleet : opponent.mainFleet;
	
		for (var j = 0; j < hou.api_at_list.length; j++) {
			if (hou.api_at_list[j] == -1) continue;
			
			var attacker,
			    defender,
			    dam;

			if (version == 1) {
				attacker = (hou.api_at_list[j] > 6) ? f2[hou.api_at_list[j] - 7] : f1[hou.api_at_list[j] - 1];
				defender = (hou.api_df_list[j][0] > 6) ? f2[hou.api_df_list[j][0] - 7] : f1[hou.api_df_list[j][0] - 1];
			} else {
				if (hou.api_at_eflag[j]) {
					attacker = (hou.api_at_list[j] >= 6 && opponent.mainFleet.length <= 6) ? opponent.escortFleet[hou.api_at_list[j] - 6] : opponent.mainFleet[hou.api_at_list[j]];
					defender = (hou.api_df_list[j][0] >= 6 && playerFleet.mainFleet.length <= 6) ? playerFleet.escortFleet[hou.api_df_list[j][0] - 6] : playerFleet.mainFleet[hou.api_df_list[j][0]];
				} else {
					attacker = (hou.api_at_list[j] >= 6 && playerFleet.mainFleet.length <= 6) ? playerFleet.escortFleet[hou.api_at_list[j] - 6] : playerFleet.mainFleet[hou.api_at_list[j]];
					defender = (hou.api_df_list[j][0] >= 6 && opponent.mainFleet.length <= 6) ? opponent.escortFleet[hou.api_df_list[j][0] - 6] : opponent.mainFleet[hou.api_df_list[j][0]];
				}
			}
			dam = 0;
			for (var k=0; k<hou.api_damage[j].length; k++) {
				if (hou.api_damage[j][k] > 0) dam += hou.api_damage[j][k];
			}
			body.append(getTextRow("NIGHT_TARGET", [attacker.name, defender.name, hou.api_sp_list[j]]));

			if ((hou.api_damage[j][0] != Math.floor(hou.api_damage[j][0]))) {
			}//protect
			else {
				if (dam < 1) {
					body.append(getTextRow("SHELL_MISS", [defender.name]));
				} else if (hou.api_damage[j].length > 1 && hou.api_damage[j][1] != -1) {
					body.append(getTextRow("SHELL_DAMAGE_DOUBLE", [defender.name, hou.api_cl_list[j][0], Math.floor(hou.api_damage[j][0]), hou.api_cl_list[j][1], Math.floor(hou.api_damage[j][1])]));
				} else {
					body.append(getTextRow("SHELL_DAMAGE", [defender.name, hou.api_cl_list[j][0], Math.floor(hou.api_damage[j][0])]));
				}
			}
			defender.damage(dam);
			if (defender.isSunk()) {
				body.append(getTextRow("SHIP_END", [defender.name, isPVP]));
			}
		}

		tab.append(body);
	};

	kouku = function(kouku, table, fleet, isbombing, isjet, islbas) {
		var stage1 = kouku.api_stage1;
		var stage2 = kouku.api_stage2;
		var stage3 = kouku.api_stage3;
		var stage3_combined = kouku.api_stage3_combined;
		var fAttackers = [],
		    eAttackers = [];
		if (!islbas && kouku.api_plane_from[0] && kouku.api_plane_from[0][0] != -1) {
			for (var i = 0; i < kouku.api_plane_from[0].length; i++) {
				var ship = (isbombing) ? kouku.api_plane_from[0][i] : (kouku.api_plane_from[0][i] < 7 || player.mainFleet.length >= 7) ? fleet[kouku.api_plane_from[0][i] - 1] : player.escortFleet[kouku.api_plane_from[0][i] - 7];
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
			table.append(getTextRow("AIR_START", [arrayToString(fAttackers), stage1.api_f_count, (stage2 && stage2.api_f_count) ? stage2.api_f_count : 0]));
		}

		if (!islbas && kouku.api_plane_from[1] && kouku.api_plane_from[1][0] != -1) {
			for (var i = 0; i < kouku.api_plane_from[1].length; i++) {
				var slot = kouku.api_plane_from[1][i];
				if (slot > 6)
					slot -= 6;
				eAttackers.push(opponent.mainFleet[slot - 1]);
			}
			table.append(getTextRow("AIR_START", [arrayToString(eAttackers), stage1.api_e_count, (stage2 && stage2.api_e_count) ? stage2.api_e_count: 0]));
		}

		if (stage1.api_f_count > 0)
			table.append(getTextRow("AIR_STAGE1_LOSS", [0, stage1.api_f_lostcount, 1]));
		if (stage1.api_e_count > 0)
			table.append(getTextRow("AIR_STAGE1_LOSS", [1, stage1.api_e_lostcount, 0]));

		if (!isbombing && !isjet) {
			if(stage1.api_disp_seiku != null) table.append(getTextRow("AIR_SUPERIORITY", [stage1.api_disp_seiku]));
			if(stage1.api_touch_plane) {
				if (stage1.api_touch_plane[0] > 0)
					table.append(getTextRow("AIR_CONTACT_F", [getItem(stage1.api_touch_plane[0])]));
				if (stage1.api_touch_plane[1] > 0)
					table.append(getTextRow("AIR_CONTACT_E", [getItem(stage1.api_touch_plane[1])]));	
			}
			
		}
		table.append(getTextRow("", []));

		if (stage2 && stage2.api_air_fire) {
			var AAShip = (stage2.api_air_fire.api_idx > 5) ? player.escortFleet[stage2.api_air_fire.api_idx - 6] : player.mainFleet[stage2.api_air_fire.api_idx];
			table.append(getTextRow("AIR_AACI", [AAShip.name, stage2.api_air_fire.api_kind]));
		}

		if (stage2 && stage2.api_f_count > 0)
			table.append(getTextRow("AIR_STAGE2_LOSS", [1, stage2.api_f_lostcount, 0]));
		if (stage2 && stage2.api_e_count > 0)
			table.append(getTextRow("AIR_STAGE2_LOSS", [0, stage2.api_e_lostcount, 1]));
		table.append(getTextRow("", []));

		if (stage3) {
			var fTargets = [],
			    fCTargets = [],
			    eTargets = [],
			    eCTargets = [];

			for (var i = 0; i < Math.max(player.mainFleet.length,opponent.mainFleet.length); i++) {
				var ind = (version == 1) ? i + 1 : i;
				if (kouku.api_stage3.api_fdam && fleet[i]) {
					var dam = Math.floor(kouku.api_stage3.api_fdam[ind]);
					//remember later, .1 = protect
					player.mainFleet[i].curHP -= dam;
					if (kouku.api_stage3.api_frai_flag[ind] || kouku.api_stage3.api_fbak_flag[ind])
						eTargets.push({
							ship : player.mainFleet[i],
							damage : (dam > 0) ? dam : 0,
							protect : (dam != kouku.api_stage3.api_fdam[ind]),
							crit : kouku.api_stage3.api_fcl_flag[ind],
							rai : kouku.api_stage3.api_frai_flag[ind]
						});
				}

				if (kouku.api_stage3.api_edam && opponent.mainFleet[i]) {
					var dam = Math.floor(kouku.api_stage3.api_edam[ind]);
					//remember later, .1 = protect
					opponent.mainFleet[i].curHP -= dam;
					if (stage3.api_erai_flag[ind] || stage3.api_ebak_flag[ind])
						fTargets.push({
							ship : opponent.mainFleet[i],
							damage : (dam > 0) ? dam : 0,
							protect : (dam != stage3.api_edam[ind]),
							crit : stage3.api_ecl_flag[ind],
							rai : stage3.api_erai_flag[ind]
						});
				}

				if (stage3_combined) {
					if (stage3_combined.api_fdam && player.escortFleet && player.escortFleet[i]) {
						var dam = Math.floor(stage3_combined.api_fdam[ind]);
						//remember later, .1 = protect
						player.escortFleet[i].curHP -= dam;
						if (stage3_combined.api_frai_flag[ind] || stage3_combined.api_fbak_flag[ind])
							eTargets.push({
								ship : player.escortFleet[i],
								damage : (dam > 0) ? dam : 0,
								protect : (dam != stage3_combined.api_fdam[ind]),
								crit : stage3_combined.api_fcl_flag[ind],
								rai : stage3_combined.api_frai_flag[ind]
							});
					}
					if (stage3_combined.api_edam && opponent.escortFleet && opponent.escortFleet[i]) {
						var dam = Math.floor(stage3_combined.api_edam[ind]);
						//remember later, .1 = protect
						opponent.escortFleet[i].curHP -= dam;
						if (stage3_combined.api_erai_flag[ind] || stage3_combined.api_ebak_flag[ind])
							fTargets.push({
								ship : opponent.escortFleet[i],
								damage : (dam > 0) ? dam : 0,
								protect : (dam != stage3.api_edam[ind]),
								crit : stage3_combined.api_ecl_flag[ind],
								rai : stage3_combined.api_erai_flag[ind]
							});
					}
				}
			}
			for (var f in fTargets) {
				table.append(getTextRow("AIR_DAMAGE", [fTargets[f].rai, fTargets[f].crit, fTargets[f].ship.name, fTargets[f].damage]));
				if (fTargets[f].ship.curHP <= 0) {
					table.append(getTextRow("SHIP_END", [fTargets[f].ship.name, isPVP]));
				}
			}

			for (var e in eTargets) {
				table.append(getTextRow("AIR_DAMAGE", [eTargets[e].rai, eTargets[e].crit, eTargets[e].ship.name, eTargets[e].damage]));
				if (eTargets[e].ship.isSunk()) {
					table.append(getTextRow("SHIP_END", [eTargets[e].ship.name, isPVP]));
				}
			}
		}

	};

	raigeki = function(rai, table, fleet, opening) {

		var fTorpedos = [],
		    fAttack = [],
		    fTargets = [];
		var eTorpedos = [],
		    eAttack = [],
		    eTargets = [];

		var num = Math.max(rai.api_frai.length, rai.api_erai.length);
		for (var i = 0; i < num; i++) {
			if (version == 1) {
				if (rai.api_frai[i + 1] > 0) {
					fTorpedos.push((i >= 6) ? fleet[i - 6] : fleet[i]);
					fAttack.push({
						atk : rai.api_fydam[i + 1],
						crit : ((rai.api_fcl[i + 1] == 2)? 2 : 1)
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
						crit : ((rai.api_ecl[i + 1] == 2)? 2 : 1)
					});

					if ((opponent.escortFleet && rai.api_erai[i + 1] >= 7)) {
						eTargets.push(fleet[rai.api_erai[i + 1] - 7]);
					} else {
						eTargets.push(player.mainFleet[rai.api_erai[i + 1] - 1]);
					}

				}
			} else {
				if (rai.api_frai[i] > -1) {
					fTorpedos.push((i >= 6 && player.mainFleet.length <= 6) ? player.escortFleet[i - 6] : player.mainFleet[i]);
					fAttack.push({
						atk : rai.api_fydam[i],
						crit : ((rai.api_fcl[i] == 2)? 2 : 1)
					});

					if (rai.api_frai[i] >= 6 && opponent.mainFleet.length <= 6) {
						fTargets.push(opponent.escortFleet[rai.api_frai[i] - 6]);
					} else {
						fTargets.push(opponent.mainFleet[rai.api_frai[i]]);
					}
				}
				if (rai.api_erai[i] > -1) {
					eTorpedos.push((i >= 6 && opponent.mainFleet.length <= 6) ? opponent.escortFleet[i - 6] : opponent.mainFleet[i]);
					eAttack.push({
						atk : rai.api_eydam[i],
						crit : ((rai.api_ecl[i] == 2)? 2 : 1)
					});

					if (rai.api_erai[i] >= 6 && player.mainFleet.length <= 6) {
						eTargets.push(player.escortFleet[rai.api_erai[i] - 6]);
					} else {
						eTargets.push(player.mainFleet[rai.api_erai[i]]);
					}
				}
			}
		}

		if (fTorpedos.length > 0)
			table.append(getTextRow((opening) ? "OPTORP_ATTACK" : "TORP_ATTACK", [arrayToString(fTorpedos)]));
		if (eTorpedos.length > 0)
			table.append(getTextRow((opening) ? "OPTORP_ATTACK" : "TORP_ATTACK", [arrayToString(eTorpedos)]));
		for (var j = 0; j < fTorpedos.length; j++) {
			table.append(getTextRow("TORP_DAMAGE", [fTorpedos[j].name, fTargets[j].name, fAttack[j].atk, fAttack[j].crit]));
			fTargets[j].damage(fAttack[j].atk);
			if (fTargets[j].isSunk()) {
				table.append(getTextRow("SHIP_END", [fTargets[j].name, isPVP]));
			}
		}

		for (var j = 0; j < eTorpedos.length; j++) {
			table.append(getTextRow("TORP_DAMAGE", [eTorpedos[j].name, eTargets[j].name, eAttack[j].atk, eAttack[j].crit]));
			eTargets[j].damage(eAttack[j].atk);

			if (eTargets[j].isSunk()) {
				table.append(getTextRow("SHIP_END", [eTargets[j].name, isPVP]));
			}
		}

	};

	hougeki = function(hou, fleet, body) {
		for (var j = 0; j < hou.api_at_list.length; j++) {
			if (hou.api_at_list[j] == -1) continue;
			
			var attacker,
			    defender,
			    damage;
			
			if (version == 1) {
				if (combinedE) {
					if (hou.api_at_eflag[j])
						attacker = (hou.api_at_list[j] > 6) ? opponent.escortFleet[hou.api_at_list[j] - 7] : opponent.mainFleet[hou.api_at_list[j] - 1];
					else
						attacker = (hou.api_at_list[j] > 6) ? player.escortFleet[hou.api_at_list[j] - 7] : player.mainFleet[hou.api_at_list[j] - 1];
				} else {
					attacker = (hou.api_at_list[j] > 6) ? opponent.mainFleet[hou.api_at_list[j] - 7] : fleet[hou.api_at_list[j] - 1];
				}
			} else {
				if (hou.api_at_eflag[j]) {
					attacker = (hou.api_at_list[j] >= 6 && opponent.mainFleet.length <= 6) ? opponent.escortFleet[hou.api_at_list[j] - 6] : opponent.mainFleet[hou.api_at_list[j]];
				} else {
					attacker = (hou.api_at_list[j] >= 6 && player.mainFleet.length <= 6) ? player.escortFleet[hou.api_at_list[j] - 6] : player.mainFleet[hou.api_at_list[j]];
				}
			}
			
			if (version == 1) {
				if (combinedE) {
					if (!hou.api_at_eflag[j])
						defender = (hou.api_df_list[j][0] > 6) ? opponent.escortFleet[hou.api_df_list[j][0] - 7] : opponent.mainFleet[hou.api_df_list[j][0] - 1];
					else
						defender = (hou.api_df_list[j][0] > 6) ? player.escortFleet[hou.api_df_list[j][0] - 7] : player.mainFleet[hou.api_df_list[j][0] - 1];
				} else {
					defender = (hou.api_df_list[j][0] > 6) ? opponent.mainFleet[hou.api_df_list[j][0] - 7] : fleet[hou.api_df_list[j][0] - 1];
				}
			} else {
				if (!hou.api_at_eflag[j]) {
					defender = (hou.api_df_list[j][0] >= 6 && opponent.mainFleet.length <= 6) ? opponent.escortFleet[hou.api_df_list[j][0] - 6] : opponent.mainFleet[hou.api_df_list[j][0]];
				} else {
					defender = (hou.api_df_list[j][0] >= 6 && player.mainFleet.length <= 6) ? player.escortFleet[hou.api_df_list[j][0] - 6] : player.mainFleet[hou.api_df_list[j][0]];
				}
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
				body.append(getTextRow("SHIP_END", [defender.name, isPVP]));
			}
		}
	};

	function appendPhase(phase) {
		let title = (TEXTDATA[phase]) ? TEXTDATA[phase].text : phase.replace('TITLE_','').replace('_',' ');
		$("<thead><tr></tr></thead>").find("tr").attr('data-tableexport-display', 'always').html('<th>' + title + '</th>').end().appendTo(tab);
	}

	function getTextRow(name, args) {
		var row = document.createElement('tr');
		if (name.length === 0) {
			var attr = document.createAttribute('data-tableexport-display');
			attr.value = 'always';
			row.setAttributeNode(attr);
			row.className = 'blank_row';
			row.innerHTML = '<td> </td>';
		} else {
			row.innerHTML = '<td>' + getText(name, args) + '\r\n</td>';
		}
		return row;
	}

	arrayToString = function(array) {
		var ships = "";
		if (array.length == 1)
			return array[0].name;

		for (var i = 0; i < array.length; i++) {
			if (i == (array.length - 1)) {
				// ships = ships.concat("and ", array[i].name);
				ships = ships.concat(array[i].name);
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
		if (dbattle.api_n_support_flag && dbattle.api_n_support_flag > 0)
			support(dbattle.api_n_support_flag, dbattle.api_n_support_info);
		if (dbattle.api_n_hougeki1 && dbattle.api_n_hougeki1.api_at_list) {
			yasenHougeki(dbattle.api_n_hougeki1);
		}
		if (dbattle.api_n_hougeki2 && dbattle.api_n_hougeki2.api_at_list) {
			yasenHougeki(dbattle.api_n_hougeki2);
		}
		if (dbattle.api_air_base_injection)
			jetLbas();
		if (dbattle.api_injection_kouku)
			jetAttack();
		if (dbattle.api_air_base_attack)
			lbas();
		if (nightFirst && dbattle.api_support_flag && dbattle.api_support_flag > 0)
			support(dbattle.api_support_flag, dbattle.api_support_info);
		if (dbattle.api_stage_flag)
			airAttack();
		if (!nightFirst && dbattle.api_support_flag && dbattle.api_support_flag > 0)
			support(dbattle.api_support_flag, dbattle.api_support_info);
		if (dbattle.api_opening_taisen_flag)
			oasw();
		if (dbattle.api_opening_flag)
			opTorp();
		if (dbattle.api_hourai_flag)
			hourai();
		if ((dbattle.api_midnight_flag && nightBattle.length && nightBattle.length != 0) || (!dbattle.length && nightBattle.api_deck_id))
			yasen();
	};

	return BATTLE;
})();

