(() => {

COMMON.TIME_BATTLE = {
	VER: '0.1',
	ANIMATIONS: [
		{ key: 'airPhase1', time: 8.4, },
		{ key: 'airPhase2', time: 11.5, },
		{ key: 'aaci', time: 3.2, },
		{ key: 'jetPhase', time: 5.7, },
		// { key: 'lbasPhase', time: 0, }, //todo
		{ key: 'detectionNormal', time: 6, }, //4 is difference compared to fail
		{ key: 'detectionRecon', time: 7.1, }, //5.1 is difference compared to fail
		{ key: 'detectionFail', time: 2, },
		{ key: 'shellNormal', time: 1.7, },
		{ key: 'shellCV', time: 3.7, },
		{ key: 'shellASW', time: 2.7, },
		{ key: 'shellDLC', time: 3, },
		{ key: 'shellWG', time: 3.6, },
		{ key: 'shellDLCWG', time: 4.8, },
		{ key: 'shellDA', time: 2.8, },
		{ key: 'shellAPCI', time: 6.1, },
		{ key: 'shellCVCI', time: 6.3, },
		{ key: 'shellYamatoSpecial', time: 8.7, },
		{ key: 'shellSubSpecial', time: 11.3, },
		{ key: 'torpedoOpening', time: 3.5, },
		{ key: 'torpedoClosing', time: 5.3, },
		{ key: 'nightEnter', time: 6, },
		{ key: 'nightNormal', time: 1.7, }, //=shellNormal
		{ key: 'nightCV', time: 3.7, }, //=shellCV
		{ key: 'nightASW', time: 2.7, }, //=shellASW
		{ key: 'nightTorpedo', time: 0, }, //todo
		{ key: 'nightDA', time: 2.8, }, //=shellDA
		{ key: 'nightCVCI', time: 6.3, }, //=shellCVCI
		{ key: 'nightTCI', time: 5.5, },
		{ key: 'nightGCI', time: 3.8, },
		{ key: 'nightSGCI', time: 0, }, //todo
		{ key: 'nightZuiun', time: 8.3, },
		{ key: 'chuuha', time: 4.6, },
		{ key: 'damecon', time: 8, },
		{ key: 'sink', time: 7.8, },
		{ key: 'bucket', time: 3, },
	],
	ANIMATIONS_SIM_ONLY: ['bucket'],
	
	_IDS_HAYASUI: [352],
	_IDS_AO_CARRIER: [717,900,1003,1008],
	_IDS_FUSOU: [411,412],
	_IDS_NIGHT_SHELL_CV: [432,353,433,529,536,646,735,889,966,1025,1030,1679,1680,1681,1682,1683,1711,1712,1713],
	
	//0=shell, 1=plane, 2=asw
	_getAtTypeNormalDay: function(shipA,shipD) {
		let shipdA = SHIPDATA[shipA.mst_id], shipdD = SHIPDATA[shipD.mst_id];
		if (!shipdA || !shipdD) {
			console.log(shipA,shipD);
			return 0;
		}
		let isSubD = shipdD.type == 'SS' || shipdD.type == 'SSV';
		if (this._IDS_HAYASUI.includes(shipA.mst_id)) {
			let numTB = 0, numASW = 0;
			for (let id of shipA.equip) {
				let eqd = EQDATA[id];
				if (!eqd) continue;
				if (eqd.type == 8 || eqd.type == 58) {
					numTB++;
					if (eqd.ASW > 0) numASW++;
				}
				if (eqd.type == 11 || eqd.type == 25) {
					numASW++;
				}
			}
			if (isSubD) {
				return numASW ? 1 : 2;
			} else if (numTB) {
				return 1;
			}
		}
		if (this._IDS_AO_CARRIER.includes(shipA.mst_id) || this._IDS_FUSOU.includes(shipA.mst_id)) {
			let numASWPlane = 0, numASW = 0, numPlane = 0, numDC = 0;
			for (let id of shipA.equip) {
				let eqd = EQDATA[id];
				if (!eqd) continue;
				if ([7,8,11,25,26,41].includes(eqd.type) && eqd.ASW > 0) {
					numASWPlane++;
				} else if (eqd.ASW > 0) {
					numASW++;
				}
				if ([7,8].includes(eqd.type)) {
					numPlane++;
				}
				if ([15].includes(eqd.type)) {
					numDC++;
				}
			}
			if (this._IDS_AO_CARRIER.includes(shipA.mst_id)) {
				if (isSubD) {
					if (numASWPlane) return 1;
					if (numASW) return 2;
				} else {
					if (numPlane) return 1;
				}
			}
			if (this._IDS_FUSOU.includes(shipA.mst_id)) {
				if (isSubD) {
					if (numASWPlane) return 1;
					if (numDC) return 2;
				}
			}
		}
		if (shipdA.sclass == 120 && isSubD) {
			return 2;
		}
		if (['CVL','CV','CVB'].includes(shipdA.type)) {
			return 1;
		}
		if (isSubD) {
			if (['CAV','BBV','AV','LHA'].includes(shipdA.type)) {
				return 1;
			} else {
				return 2;
			}
		}
		return 0;
	},
	//0=shell, 1=plane, 2=asw, 3=torpedo
	_getAtTypeNormalNight: function(shipA,shipD) {
		let shipdA = SHIPDATA[shipA.mst_id], shipdD = SHIPDATA[shipD.mst_id];
		if (!shipdA || !shipdD) return 0;
		let isSubD = shipdD.type == 'SS' || shipdD.type == 'SSV';
		
		if (isSubD && (shipdA.type == 'CVL' || [646,411,412].includes(shipA.mst_id) || shipdA.sclass == 120)) {
			return 2;
		}
		if (['CVL','CV','CVB'].includes(shipdA.type)) {
			return this._IDS_NIGHT_SHELL_CV.includes(shipA.mst_id) ? 0 : 1;
		}
		if (['SS','SSV'].includes(shipdA.type)) {
			return 3;
		}
		if (isSubD) {
			return ['CAV','BBV','AV','LHA'].includes(shipdA.type) ? 1 : 2;
		}
		if (shipA.equip.find(id => EQDATA[id] && [5,32].includes(EQDATA[id].type)) && !shipA.equip.find(id => EQDATA[id] && [1,2,3,4,38,95].includes(EQDATA[id].type))) {
			return 3;
		}
		return 0;
	},
	_getHasWG: function(shipA,shipD) {
		return SHIPDATA[shipD.mst_id] && SHIPDATA[shipD.mst_id].installtype && shipA.equip.find(id => [126,346,347,348,349].includes(id));
	},
	_getHasDLC: function(shipA,shipD) {
		return (SHIPDATA[shipD.mst_id] && SHIPDATA[shipD.mst_id].installtype && shipA.equip.find(id => EQDATA[id] && [24,46].includes(EQDATA[id].type))) //approximation
			|| (SHIPDATA[shipD.mst_id] && SHIPDATA[shipD.mst_id].isPT && shipA.equip.find(id => [408,409].includes(id)));
	},
	
	_applyDamage: function(ship,dmg,result) {
		let isChuuhaBefore = ship.nowhp/ship.maxhp <= .5;
		ship.nowhp -= dmg;
		let isChuuhaAfter = ship.nowhp/ship.maxhp <= .5;
		if (!ship.isEnemy && !isChuuhaBefore && isChuuhaAfter) {
			result.chuuha++;
		}
		if (!ship.isEnemy && ship.nowhp <= 0) {
			if (ship.repair) {
				result.damecon++;
				if (ship.repair == 43) {
					ship.nowhp = ship.maxhp;
				} else if (ship.repair == 42) {
					ship.nowhp = Math.floor(ship.maxhp*.2);
				}
				ship.repair = null;
			} else {
				result.sink++;
			}
		}
	},
	_getDamageCountsHougeki(hougeki,api,hpF,hpE,result,replay) {
		for (let i=0; i<hougeki.api_at_list.length; i++) {
			for (let j=0; j<hougeki.api_df_list[i].length; j++) {
				let idxD = hougeki.api_df_list[i][j];
				let dmg = Math.max(0,Math.floor(hougeki.api_damage[i][j]));
				if (hpF && hougeki.api_at_eflag[i]) {
					if (idxD < 6 || (api.api_formation[0] < 10 && !replay.combined)) {
						this._applyDamage(hpF.main[idxD],dmg,result);
					} else {
						this._applyDamage(hpF.escort[idxD-6],dmg,result);
					}
				} else if (hpE) {
					if (idxD < 6 || api.api_formation[1] < 10) {
						this._applyDamage(hpE.main[idxD],dmg,result);
					} else {
						this._applyDamage(hpE.escort[idxD-6],dmg,result);
					}
				}
			}
		}
	},
	_getDamageCountsRaigeki(raigeki,api,hpF,hpE,result) {
		for (let i=0; i<raigeki.api_edam.length; i++) {
			let dmg = Math.max(0,Math.floor(raigeki.api_edam[i]));
			if (i < 6 || api.api_formation[1] < 10) {
				if (i < hpE.main.length) {
					this._applyDamage(hpE.main[i],dmg,result);
				}
			} else {
				if (i-6 < hpE.escort.length) {
					this._applyDamage(hpE.escort[i-6],dmg,result);
				}
			}
		}
		for (let i=0; i<raigeki.api_fdam.length; i++) {
			let dmg = Math.max(0,Math.floor(raigeki.api_fdam[i]));
			if (i < 6 || api.api_formation[0] < 10) {
				if (i < hpF.main.length) {
					this._applyDamage(hpF.main[i],dmg,result);
				}
			} else {
				if (i-6 < hpF.escort.length) {
					this._applyDamage(hpF.escort[i-6],dmg,result);
				}
			}
		}
	},
	_getDamageCountsInitHP: function(api,replay,hpF,hpE) {
		for (let i=0; i<api.api_f_maxhps.length; i++) {
			let obj = { isEnemy: false, nowhp: api.api_f_nowhps[i], maxhp: api.api_f_maxhps[i] };
			let ship = replay['fleet'+replay.fleetnum][i];
			if (SHIPDATA[ship.mst_id]) {
				let numSlots = SHIPDATA[ship.mst_id].SLOTS.length;
				let equipIds = ship.equip.slice(numSlots).concat(ship.equip.slice(0,numSlots));
				for (let id of equipIds) {
					if (id == 42) { obj.repair = 42; break; }
					if (id == 43) { obj.repair = 43; break; }
				}
			}
			hpF.main.push(obj);
		}
		if (api.api_f_maxhps_combined) {
			for (let i=0; i<api.api_f_maxhps_combined.length; i++) {
				let obj = { isEnemy: false, nowhp: api.api_f_nowhps_combined[i], maxhp: api.api_f_maxhps_combined[i] };
				let ship = replay.fleet2[i], equipIds = ship.equip;
				if (SHIPDATA[ship.mst_id]) {
					let numSlots = SHIPDATA[ship.mst_id].SLOTS.length;
					equipIds = ship.equip.slice(numSlots).concat(ship.equip.slice(0,numSlots));
				}
				for (let id of equipIds) {
					if (id == 42) { obj.repair = 42; break; }
					if (id == 43) { obj.repair = 43; break; }
				}
				hpF.escort.push(obj);
			}
		}
		for (let i=0; i<api.api_e_maxhps.length; i++) {
			let obj = { isEnemy: true, nowhp: api.api_e_nowhps[i], maxhp: api.api_e_maxhps[i] };
			if (obj.nowhp == 'N/A') obj.nowhp = 99999;
			if (obj.maxhp == 'N/A') obj.maxhp = 99999;
			hpE.main.push(obj);
		}
		if (api.api_e_maxhps_combined) {
			for (let i=0; i<api.api_e_maxhps_combined.length; i++) {
				let obj = { isEnemy: true, nowhp: api.api_e_nowhps_combined[i], maxhp: api.api_e_maxhps_combined[i] };
				if (obj.nowhp == 'N/A') obj.nowhp = 99999;
				if (obj.maxhp == 'N/A') obj.maxhp = 99999;
				hpE.escort.push(obj);
			}
		}
	},
	_getDamageCountsDay: function(api,replay) {
		let result = { chuuha: 0, sink: 0, damecon: 0 };
		let hpF = { main: [], escort: [] };
		let hpE = { main: [], escort: [] };
		this._getDamageCountsInitHP(api,replay,hpF,hpE);
		
		let waves = [];
		for (let key of ['api_air_base_injection','api_injection_kouku']) {
			if (api[key]) waves.push(api[key]);
		}
		if (api.api_air_base_attack) {
			waves = waves.concat(api.api_air_base_attack);
		}
		for (let key of ['api_kouku','api_kouku2']) {
			if (api[key]) waves.push(api[key]);
		}
		if (api.api_support_info && api.api_support_info.api_support_airatack) {
			wave.push(api.api_support_info.api_support_airatack);
		}
		for (let wave of waves) {
			for (let key of ['api_stage3','api_stage3_combined']) {
				if (!wave[key]) continue;
				let keyHP = key == 'api_stage3_combined' ? 'escort' : 'main';
				if (wave[key].api_edam) {
					for (let i=0; i<wave[key].api_edam.length; i++) {
						if (i >= hpE[keyHP].length) continue;
						let dmg = Math.max(0,Math.floor(wave[key].api_edam[i]));
						this._applyDamage(hpE[keyHP][i],dmg,result);
					}
				}
				if (wave[key].api_fdam) {
					for (let i=0; i<wave[key].api_fdam.length; i++) {
						if (i >= hpF[keyHP].length) continue;
						let dmg = Math.max(0,Math.floor(wave[key].api_fdam[i]));
						this._applyDamage(hpF[keyHP][i],dmg,result);
					}
				}
			}
		}
		
		if (api.api_support_info && api.api_support_info.api_support_hourai) {
			let support = api.api_support_info.api_support_hourai;
			for (let i=0; i<support.api_damage.length; i++) {
				if (i < 6 || api.api_formation[1] < 10) {
					this._applyDamage(hpE.main[i],Math.max(0,Math.floor(support.api_damage[i])),result);
				} else {
					this._applyDamage(hpE.escort[i-6],Math.max(0,Math.floor(support.api_damage[i])),result);
				}
			}
		}
		
		if (api.api_opening_taisen) {
			this._getDamageCountsHougeki(api.api_opening_taisen,api,hpF,hpE,result,replay);
		}
		
		if (api.api_opening_atack) {
			this._getDamageCountsRaigeki(api.api_opening_atack,api,hpF,hpE,result);
		}
		
		let raigekiPos;
		if ((replay.combined == 0 && api.api_formation[1] > 10) || ([1,3].includes(replay.combined) && api.api_formation[1] < 10)) {
			raigekiPos = 1;
		} else if ([1,3].includes(replay.combined) && api.api_formation[1] > 10) {
			raigekiPos = 2;
		} else {
			raigekiPos = 3;
		}
		if (api.api_hougeki1) {
			this._getDamageCountsHougeki(api.api_hougeki1,api,hpF,hpE,result,replay);
		}
		if (raigekiPos == 1 && api.api_raigeki) {
			this._getDamageCountsRaigeki(api.api_raigeki,api,hpF,hpE,result);
		}
		if (api.api_hougeki2) {
			this._getDamageCountsHougeki(api.api_hougeki2,api,hpF,hpE,result,replay);
		}
		if (raigekiPos == 2 && api.api_raigeki) {
			this._getDamageCountsRaigeki(api.api_raigeki,api,hpF,hpE,result);
		}
		if (api.api_hougeki3) {
			this._getDamageCountsHougeki(api.api_hougeki3,api,hpF,hpE,result,replay);
		}
		if (raigekiPos == 3 && api.api_raigeki) {
			this._getDamageCountsRaigeki(api.api_raigeki,api,hpF,hpE,result);
		}
		
		return result;
	},
	_getDamageCountsNight: function(api,replay) {
		let result = { chuuha: 0, sink: 0, damecon: 0 };
		let hpF = { main: [], escort: [] };
		let hpE = { main: [], escort: [] };
		this._getDamageCountsInitHP(api,replay,hpF,hpE);
		
		let phases = [];
		if (api.api_friendly_battle) {
			this._getDamageCountsHougeki(api.api_friendly_battle.api_hougeki,api,null,hpE,result,replay);
		}
		if (api.api_hougeki) {
			this._getDamageCountsHougeki(api.api_hougeki,api,hpF,hpE,result,replay);
		}
		
		return result;
	},
	
	getTimeStats: function(replay) {
		let animationsTotal = {};
		for (let obj of this.ANIMATIONS) {
			animationsTotal[obj.key] = 0;
		}
		
		let animationsByBattle = [];
		for (let battle of replay.battles) {
			let animations = {};
			for (let obj of this.ANIMATIONS) {
				animations[obj.key] = 0;
			}
			if (battle.data && Object.keys(battle.data).length) {
				let api = battle.data;
				if (api.api_search[0] == 5) {
					animations.detectionNormal++;
				} else if ([1,2,3,4].includes(api.api_search[0])) {
					animations.detectionRecon++;
				} else {
					animations.detectionFail++;
				}
				
				if (api.api_air_base_injection) {
					animations.jetPhase++;
				}
				
				if (api.api_injection_kouku) {
					animations.jetPhase++;
				}
				
				// if (api.api_air_base_attack) {
					// animations.lbasPhase += api.api_air_base_attack.length;
				// }
				
				for (let key of ['api_kouku','api_kouku2']) {
					let kouku = api[key];
					if (!kouku) continue;
					let fleetF = replay['fleet'+replay.fleetnum];
					let hasF = kouku.api_plane_from[0] && api.api_ship_ke.find(id => SHIPDATA[id] && !['SS','SSV'].includes(SHIPDATA[id].type));
					let hasE = kouku.api_plane_from[1] && fleetF.find(ship => SHIPDATA[ship.mst_id] && !['SS','SSV'].includes(SHIPDATA[ship.mst_id].type));
					if (hasF && hasE) {
						animations.airPhase2++;
					} else if (hasF || hasE) {
						animations.airPhase1++;
					}
					if (hasE && kouku.api_stage2 && kouku.api_stage2.api_air_fire) {
						animations.aaci++;
					}
				}
				
				if (api.api_opening_atack && (api.api_opening_atack.api_frai_list_items.some(n => n) || api.api_opening_atack.api_erai_list_items.some(n => n))) {
					animations.torpedoOpening++;
				}
				
				if (api.api_raigeki && (api.api_raigeki.api_frai.some(n => n > -1) || api.api_raigeki.api_erai.some(n => n > -1))) {
					animations.torpedoClosing++;
				}
				
				for (let key of ['api_opening_taisen','api_hougeki1','api_hougeki2','api_hougeki3']) {
					let hougeki = api[key];
					if (!hougeki) continue;
					for (let i=0; i<hougeki.api_at_type.length; i++) {
						let atType = hougeki.api_at_type[i];
						switch(atType) {
							case 0:
								let idxA = hougeki.api_at_list[i], idxD = hougeki.api_df_list[i][0];
								let idxF = hougeki.api_at_eflag[i] ? idxD : idxA;
								let idxE = hougeki.api_at_eflag[i] ? idxA : idxD;
								let shipF = idxF >= 6 && api.api_formation[0] > 10 ? replay.fleet2[idxF-6] : replay['fleet'+replay.fleetnum][idxF];
								let shipE = {
									mst_id: idxE >= 6 ? api.api_ship_ke_combined[idxE-6] : api.api_ship_ke[idxE],
									equip: idxE >= 6 ? api.api_eSlot_combined[idxE-6] : api.api_eSlot[idxE],
								};
								let shipA = hougeki.api_at_eflag[i] ? shipE : shipF;
								let shipD = hougeki.api_at_eflag[i] ? shipF : shipE;
								
								let type = this._getAtTypeNormalDay(shipA,shipD);
								let hasWG = type != 1 && this._getHasWG(shipA,shipD);
								let hasDLC = this._getHasDLC(shipA,shipD);
		
								if (hasWG && hasDLC) {
									animations.shellDLCWG++;
								} else if (hasDLC) {
									animations.shellDLC++;
								} else if (hasWG) {
									animations.shellWG++;
								} else if (type == 0) {
									animations.shellNormal++;
								} else if (type == 1) {
									animations.shellCV++;
								} else if (type == 2) {
									animations.shellASW++;
								}
								break;
							case 2:
								animations.shellDA++;
								break;
							case 3: case 4: case 5: case 6:
								animations.shellAPCI++;
								break;
							case 7:
								animations.shellCVCI++;
								break;
							case 300: case 301: case 302:
								animations.shellSubSpecial++;
								break;
							case 401:
								animations.shellYamatoSpecial++;
								break;
						}
					}
				}
				
				let resultDmg = this._getDamageCountsDay(api,replay);
				for (let key in resultDmg) animations[key] += resultDmg[key];
			}
		
			if (battle.yasen && Object.keys(battle.yasen).length) {
				if (battle.yasen.api_ship_ke_combined && !battle.yasen.api_ship_ke_combined.length && battle.data && battle.data.api_ship_ke_combined) battle.yasen.api_ship_ke_combined = battle.data.api_ship_ke_combined;
				let api = battle.yasen;
				
				if (battle.data) {
					animations.nightEnter++;
				}
				
				let hougeki = api.api_hougeki;
				for (let i=0; i<hougeki.api_sp_list.length; i++) {
					let atType = hougeki.api_sp_list[i];
					switch(atType) {
						case 0:
							let idxA = hougeki.api_at_list[i], idxD = hougeki.api_df_list[i][0];
							let idxF = hougeki.api_at_eflag[i] ? idxD : idxA;
							let idxE = hougeki.api_at_eflag[i] ? idxA : idxD;
							let shipF = idxF >= 6 && (api.api_formation[0] > 10 || replay.combined) ? replay.fleet2[idxF-6] : replay['fleet'+replay.fleetnum][idxF];
							let shipE = {
								mst_id: idxE >= 6 ? api.api_ship_ke_combined[idxE-6] : api.api_ship_ke[idxE],
								equip: idxE >= 6 ? api.api_eSlot_combined[idxE-6] : api.api_eSlot[idxE],
							};
							let shipA = hougeki.api_at_eflag[i] ? shipE : shipF;
							let shipD = hougeki.api_at_eflag[i] ? shipF : shipE;
							
							let type = hougeki.api_n_mother_list[i] ? 1 : this._getAtTypeNormalNight(shipA,shipD);
							let hasWG = type != 1 && this._getHasWG(shipA,shipD);
							let hasDLC = this._getHasDLC(shipA,shipD);
							
							if (hasWG && hasDLC) {
								animations.shellDLCWG++;
							} else if (hasDLC) {
								animations.shellDLC++;
							} else if (hasWG) {
								animations.shellWG++;
							} else if (type == 0) {
								animations.nightNormal++;
							} else if (type == 1) {
								animations.nightCV++;
							} else if (type == 2) {
								animations.nightASW++;
							} else if (type == 3) {
								animations.nightTorpedo++;
							}
							break;
						case 1:
							animations.nightDA++;
							break;
						case 2: case 3: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14:
							animations.nightTCI++;
							break;
						case 4:
							animations.nightSGCI++;
							break;
						case 5:
							animations.nightGCI++;
							break;
						case 6:
							animations.nightCVCI++;
							break;
						case 200:
							animations.nightZuiun++;
							break;
						case 300: case 301: case 302:
							animations.shellSubSpecial++;
							break;
						case 401:
							animations.shellYamatoSpecial++;
							break;
					}
				}
				
				let resultDmg = this._getDamageCountsNight(api,replay);
				for (let key in resultDmg) animations[key] += resultDmg[key];
			}
			
			animationsByBattle.push(animations);
			for (let key in animations) {
				animationsTotal[key] += animations[key];
			}
		}
		
		let timeTotal = 0;
		for (let obj of this.ANIMATIONS) {
			if (!animationsTotal[obj.key]) continue;
			timeTotal += animationsTotal[obj.key]*obj.time;
		}
		let result = {
			animations: animationsTotal,
			time: timeTotal,
			battles: [],
		};
		for (let animations of animationsByBattle) {
			let time = 0;
			for (let obj of this.ANIMATIONS) {
				if (!animations[obj.key]) continue;
				time += animations[obj.key]*obj.time;
			}
			result.battles.push({ time: time, animations: animations });
		}
		return result;
	},
};

})()