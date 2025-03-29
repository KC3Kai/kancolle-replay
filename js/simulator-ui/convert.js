(() => {

var CONST = window.COMMON.getConst({});


window.CONVERT = {
	_fleetPropsSaved: ['type','formation'],
	_shipPropsSaved: ['mstId','level','hp','hpInit','morale','fuelInit','ammoInit','statsBase','slots','bonusDmg','bonusAcc','bonusEva','bonusDmgDebuff','isFaraway','neverFCF','retreatOnChuuha','noRetreatOnTaiha'],
	_equipPropsSaved: ['mstId','level','rank','bonusDmg','bonusAcc','bonusGroups'],
	
	_UI_MAIN: null,
	_dataKC3: null,
	_dataSimSave: null,
	
	_SAVE_VERSION_CURRENT: 2,
	_SAVE_VERSION_EQUIP_SHIFT_20221109: 2,
	
	_copyObj: function(objFrom,keys,objTo) {
		keys = keys || Object.keys(objFrom);
		objTo = objTo || {};
		for (let key of keys) {
			if (objFrom[key] == null) continue;
			if (Array.isArray(objFrom[key])) objTo[key] = objFrom[key].slice();
			else if (typeof objFrom[key] === 'object') objTo[key] = this._copyObj(objFrom[key],null,objTo[key]);
			else objTo[key] = objFrom[key];
		}
		return objTo;
	},
	
	_convertEquipId20221109: function(equipMstId) {
		//abyssal eq id shift 2022-11-09
		if (equipMstId && equipMstId > 500 && equipMstId < 1000) equipMstId += 1000;
		return equipMstId;
	},
	
	saveIsEmpty: function(dataSave) {
		return !dataSave.fleetFMain && !dataSave.fleetFSupportN && !dataSave.fleetFSupportB
			&& (!dataSave.fleetsFFriend || !dataSave.fleetsFFriend.find(comp => comp.fleet))
			&& (!dataSave.landBases || !dataSave.landBases.find(base => base.equips.find(eq => eq)))
			&& (!dataSave.battles || !dataSave.battles.find(battle => battle.enemyComps.find(comp => comp.fleet)));
	},
	
	getSimBackupFile: function() {
		return this._dataSimSave;
	},
	setSimBackupFile: function(reader) {
		if (!reader) {
			this._dataSimSave = null;
			return;
		}
		let d;
		try {
			let txt = reader.result;
			if (txt[0] != '{') txt = LZString.decompressFromBase64(txt);
			d = JSON.parse(txt);
		} catch (e) {
			console.error(e);
			return;
		}
		if (d.source == CONST.simSaveKey) {
			this._dataSimSave = d;
		} else {
			this._dataSimSave = null;
		}
	},
	
	
	setKC3File: function(reader) {
		if (!reader) {
			this._dataKC3 = null;
			return;
		}
		let d;
		try {
			d = JSON.parse(reader.result);
		} catch (e) {
			console.error(e);
			return;
		}
		if (d.fleets && d.ships && d.gears) {
			this._dataKC3 = d;
		}
	},
	kc3ToSaveShips: function(shipsKC3) {
		let shipsSave = [];
		for (let id of shipsKC3) {
			if (!id || id <= 0) continue;
			let shipKC3 = this._dataKC3.ships['x'+id];
			let sdata = SHIPDATA[shipKC3.masterId];
			if (!sdata) {
				shipsSave.push(null);
				continue;
			}
			let shipSave = {
				mstId: shipKC3.masterId,
				level: shipKC3.level,
				hp: shipKC3.hp[1],
				hpInit: shipKC3.hp[1],
				statsBase: {
					fp: sdata.FPbase + (shipKC3.mod[0] || 0),
					tp: sdata.TPbase + (shipKC3.mod[1] || 0),
					aa: sdata.AAbase + (shipKC3.mod[2] || 0),
					ar: sdata.ARbase + (shipKC3.mod[3] || 0),
					ev: COMMON.getScaledStat(sdata.EVbase,sdata.EV,shipKC3.level),
					asw: COMMON.getScaledStat(sdata.ASWbase,sdata.ASW,shipKC3.level) + (shipKC3.mod[6] || 0),
					los: COMMON.getScaledStat(sdata.LOSbase,sdata.LOS,shipKC3.level),
					luk: shipKC3.lk[0],
				},
				equips: [],
			};
			let items = shipKC3.items.slice();
			if (shipKC3.ex_item) items.push(shipKC3.ex_item);
			for (let eid of items) {
				if (!eid || eid <= 0) continue;
				let equipKC3 = this._dataKC3.gears['x'+eid];
				let equipSave = {
					mstId: equipKC3.masterId,
					level: equipKC3.stars,
				};
				if (equipKC3.ace > 0) {
					equipSave.rank = equipKC3.ace;
				}
				shipSave.equips.push(equipSave);
			}
			shipsSave.push(shipSave);
		}
		return shipsSave;
	},
	kc3ToSaveFleet: function(fleetNum) {
		if (!this._dataKC3) return;
		let fleetSave = {
			version: this._SAVE_VERSION_CURRENT,
			type: 0,
		};
		if (+fleetNum == 10) {
			fleetSave.type = CONST.CTF;
			fleetSave.ships = this.kc3ToSaveShips(this._dataKC3.fleets[0].ships);
			fleetSave.shipsEscort = this.kc3ToSaveShips(this._dataKC3.fleets[1].ships);
		} else {
			fleetSave.ships = this.kc3ToSaveShips(this._dataKC3.fleets[+fleetNum-1].ships);
			if (fleetSave.ships.length >= 7) fleetSave.type = CONST.SF;
		}
		return fleetSave;
	},
	
	
	replayToSaveShipsF: function(shipsReplay,f_maxhps,fParam,useMorale) {
		if (f_maxhps) f_maxhps = f_maxhps.filter(x => x != -1);
		if (fParam) fParam = fParam.filter(x => x != -1);
		
		let shipsSave = [];
		for (let n=0; n<shipsReplay.length; n++) {
			let shipReplay = shipsReplay[n];
			let sdata = SHIPDATA[shipReplay.mst_id];
			if (!sdata) {
				shipsSave.push(null);
				continue;
			}
			let hp = f_maxhps && f_maxhps[n] ? f_maxhps[n] : COMMON.getHP(sdata.HP,sdata.HPmax,shipReplay.level) + (shipReplay.kyouka[5] || 0);
			let params = fParam && fParam[n];
			let shipSave = {
				mstId: shipReplay.mst_id,
				level: shipReplay.level,
				hp: hp,
				hpInit: hp,
				statsBase: {
					fp: (params && params[0]) ?? sdata.FPbase + (shipReplay.kyouka[0] || 0),
					tp: (params && params[1]) ?? sdata.TPbase + (shipReplay.kyouka[1] || 0),
					aa: (params && params[2]) ?? sdata.AAbase + (shipReplay.kyouka[2] || 0),
					ar: (params && params[3]) ?? sdata.ARbase + (shipReplay.kyouka[3] || 0),
					ev: (shipReplay.stats && shipReplay.stats.ev) ?? COMMON.getScaledStat(sdata.EVbase,sdata.EV,shipReplay.level),
					asw: (shipReplay.stats && shipReplay.stats.as) ?? COMMON.getScaledStat(sdata.ASWbase,sdata.ASW,shipReplay.level) + (shipReplay.kyouka[6] || 0),
					los: (shipReplay.stats && shipReplay.stats.ls) ?? COMMON.getScaledStat(sdata.LOSbase,sdata.LOS,shipReplay.level),
					luk: sdata.LUK + (shipReplay.kyouka[4] || 0)
				},
				equips: [],
			};
			if (useMorale && shipReplay.morale && shipReplay.morale >= 50) shipSave.morale = 85;
			if (shipReplay.stats) {
				if (shipReplay.stats.ev != null) shipSave.statsBase.ev = shipReplay.stats.ev;
				if (shipReplay.stats.as != null) shipSave.statsBase.asw = shipReplay.stats.as;
				if (shipReplay.stats.ls != null) shipSave.statsBase.los = shipReplay.stats.ls;
			}
			for (let i=0; i<shipReplay.equip.length; i++) {
				let equipSave = { mstId: shipReplay.equip[i] };
				if (shipReplay.stars && shipReplay.stars[i] > -1) equipSave.level = shipReplay.stars[i];
				if (shipReplay.ace != null) equipSave.rank = Math.max(0,shipReplay.ace[i]);
				shipSave.equips.push(equipSave);
			}
			shipsSave.push(shipSave);
		}
		return shipsSave;
	},
	replayToSaveShipsE: function(ship_ke,ship_lv,e_maxhps,eParam,eSlot) {
		ship_ke = ship_ke.filter(x => x != -1);
		ship_lv = ship_lv.filter(x => x != -1);
		e_maxhps = e_maxhps.filter(x => x != -1);
		eParam = eParam.filter(x => x != -1);
		eSlot = eSlot.filter(x => x != -1);
		
		let shipsSave = [];
		for (let i=0; i<ship_ke.length; i++) {
			let shipSave = {
				mstId: ship_ke[i],
				level: ship_lv[i],
				hp: e_maxhps[i] == 'N/A' ? null : e_maxhps[i],
				hpInit: e_maxhps[i] == 'N/A' ? null : e_maxhps[i],
				statsBase: {
					fp: eParam[i][0],
					tp: eParam[i][1],
					aa: eParam[i][2],
					ar: eParam[i][3],
				},
				equips: [],
			};
			for (let id of eSlot[i]) {
				if (id <= 0) continue;
				if (COMMON.isShipIdAbyssal(ship_ke[i])) id = this._convertEquipId20221109(id);
				shipSave.equips.push({ mstId: id, rank: 0 });
			}
			if (e_maxhps[i] == 'N/A') shipSave.isFaraway = true;
			shipsSave.push(shipSave);
		}
		return shipsSave;
	},
	replayToSave: function(dataReplay) {
		let dataSave = {};
		
		let bdataFirst = dataReplay.battles[0].data;
		if (!bdataFirst || Object.keys(bdataFirst).length <= 0) bdataFirst = dataReplay.battles[0].yasen;
		if (!bdataFirst || Object.keys(bdataFirst).length <= 0) bdataFirst = {};
		let f_maxhps = bdataFirst.api_f_maxhps;
		if (bdataFirst.api_maxhps) f_maxhps = bdataFirst.api_maxhps.slice(0 + +(bdataFirst.api_maxhps[0] == -1), 6 + +(bdataFirst.api_maxhps[0] == -1));
		dataSave.fleetFMain = {
			version: this._SAVE_VERSION_CURRENT,
			type: dataReplay.combined,
			ships: this.replayToSaveShipsF(dataReplay['fleet'+dataReplay.fleetnum],f_maxhps,bdataFirst.api_fParam),
		};
		if (dataSave.fleetFMain.type == 0 && dataSave.fleetFMain.ships.length >= 7) dataSave.fleetFMain.type = CONST.SF;
		if (dataReplay.combined) {
			let f_maxhps_combined = bdataFirst.api_f_maxhps_combined;
			if (bdataFirst.api_maxhps_combined) f_maxhps_combined = bdataFirst.api_maxhps_combined.slice(0 + +(bdataFirst.api_maxhps_combined[0] == -1), 6 + +(bdataFirst.api_maxhps_combined[0] == -1));
			dataSave.fleetFMain.shipsEscort = this.replayToSaveShipsF(dataReplay.fleet2,f_maxhps_combined,bdataFirst.api_fParam_combined);
		}
		
		if (dataReplay.support1) {
			dataSave.fleetFSupportN = { version: this._SAVE_VERSION_CURRENT, type: 0, ships: this.replayToSaveShipsF(dataReplay['fleet'+dataReplay.support1],null,null,true) };
			dataSave.useSupportN = true;
		}
		if (dataReplay.support2) {
			dataSave.fleetFSupportB = { version: this._SAVE_VERSION_CURRENT, type: 0, ships: this.replayToSaveShipsF(dataReplay['fleet'+dataReplay.support2],null,null,true) };
			dataSave.useSupportB = true;
		}
		
		if (dataReplay.lbas) {
			dataSave.landBases = [];
			for (let base of dataReplay.lbas) {
				let equipsSave = [], slotsSave = [];
				for (let plane of base.planes) {
					equipsSave.push({
						mstId: plane.mst_id,
						level: plane.stars,
						rank: plane.ace,
					});
					if (EQDATA[plane.mst_id]) {
						slotsSave.push(COMMON.getLBASSlotDefault(EQDATA[plane.mst_id].type));
					} else {
						slotsSave.push(0);
					}
				}
				dataSave.landBases.push({ equips: equipsSave, slots: slotsSave });
			}
		}
		
		let battleLast = dataReplay.battles.at(-1);
		if (battleLast.yasen && battleLast.yasen.api_friendly_info) {
			let info = battleLast.yasen.api_friendly_info;
			let api_Slot = info.api_Slot.map(a => a.slice());
			if (info.api_slot_ex) {
				for (let i=0; i<api_Slot.length; i++) api_Slot[i].push(info.api_slot_ex[i]);
			}
			let fleetFF = {
				version: this._SAVE_VERSION_CURRENT,
				type: (info.api_ship_id.length >= 7 ? CONST.SF : 0),
				ships: this.replayToSaveShipsE(info.api_ship_id,info.api_ship_lv,info.api_maxhps,info.api_Param,api_Slot),
			};
			for (let i=0; i<fleetFF.ships.length; i++) {
				fleetFF.ships[i].hpInit = info.api_nowhps[i];
			}
			dataSave.fleetsFFriend = [{ rate: 0, fleet: fleetFF }];
			dataSave.useFF = true;
		}
		
		dataSave.battles = [];
		for (let i=0; i<dataReplay.battles.length; i++) {
			let battle = dataReplay.battles[i];
			let bdata = battle.data;
			if (!bdata || Object.keys(bdata).length <= 0) bdata = battle.yasen;
			if (!bdata || Object.keys(bdata).length <= 0) continue;
			let ship_ke = bdata.api_ship_ke.filter(x => x != -1);
			if (dataReplay.world != -1 && dataReplay.world != 0) {
				ship_ke = ship_ke.map(id => id < 1000 ? id + 1000 : id);
			}
			
			let battleSave = {
				formation: +bdata.api_formation[0],
				nodeType: CONST.NODE_NORMAL,
				doNB: i == dataReplay.battles.length-1,
			};
			if (!battle.data || Object.keys(battle.data).length <= 0) {
				battleSave.nodeType = CONST.NODE_NIGHT;
			}
			if (bdata.api_kouku2) {
				battleSave.nodeType = CONST.NODE_AIR;
			}
			if ((bdata.api_name && bdata.api_name.includes('ld_airbattle')) || (!bdata.api_name && bdata.api_opening_atack === undefined && bdata.api_kouku2 === undefined)) {
				battleSave.nodeType = CONST.NODE_RAID;
			}
			if (ship_ke.every(id => SHIPDATA[id] && ['SS','SSV'].includes(SHIPDATA[id].type))) {
				battleSave.subOnly = true;
			}
			if (bdata.api_air_base_attack) {
				battleSave.lbasWaves = [false,false,false,false,false,false];
				for (let wave of bdata.api_air_base_attack) {
					let ind = 2*(wave.api_base_id-1);
					if (battleSave.lbasWaves[ind]) ind++;
					battleSave.lbasWaves[ind] = true;
				}
			}
			
			let keyWorldMap = dataReplay.world + '-' + dataReplay.mapnum;
			let letter = window.EDGES['World ' + keyWorldMap] && window.EDGES['World ' + keyWorldMap][battle.node] ? window.EDGES['World ' + keyWorldMap][battle.node][1] : null;
			if (letter && COMMON.BARRAGE_BALLOON_NODES.includes(keyWorldMap + '-' + letter)) {
				battleSave.useBalloon = true;
			}
			if (letter && COMMON.ATOLL_NODES.includes(keyWorldMap + '-' + letter)) {
				battleSave.useAtoll = true;
			}
			
			let e_maxhps = bdata.api_e_maxhps;
			if (bdata.api_maxhps) e_maxhps = bdata.api_maxhps.slice(6 + +(bdata.api_maxhps[0] == -1));
			let compSave = {
				rate: 0,
				fleet: {
					type: 0,
					formation: +bdata.api_formation[1],
					ships: this.replayToSaveShipsE(ship_ke,bdata.api_ship_lv,e_maxhps,bdata.api_eParam,bdata.api_eSlot),
				},
			};
			if (bdata.api_ship_ke_combined) {
				let ship_ke_combined = bdata.api_ship_ke_combined.filter(x => x != -1);
				if (dataReplay.world != -1) {
					ship_ke_combined = ship_ke_combined.map(id => id < 1000 ? id + 1000 : id);
				}
				let e_maxhps_combined = bdata.api_e_maxhps_combined;
				if (bdata.api_maxhps_combined) e_maxhps_combined = bdata.api_maxhps_combined.slice(6 + +(bdata.api_maxhps_combined[0] == -1));
				compSave.fleet.shipsEscort = this.replayToSaveShipsE(ship_ke_combined,bdata.api_ship_lv_combined,e_maxhps_combined,bdata.api_eParam_combined,bdata.api_eSlot_combined);
				compSave.fleet.type = 1;
			}
			battleSave.enemyComps = [compSave];
			
			dataSave.battles.push(battleSave);
		}
		
		return dataSave;
	},
	
	uiToReplayShips: function(shipsUI) {
		let shipsReplay = [];
		for (let shipUI of shipsUI) {
			if (FLEET_MODEL.shipIsEmpty(shipUI)) continue;
			let shipReplay = {
				mst_id: shipUI.mstId,
				level: shipUI.level,
				morale: shipUI.morale,
				equip: shipUI.equips.filter(eq => eq.mstId).map(eq => +eq.mstId),
				stars: shipUI.equips.filter(eq => eq.mstId).map(eq => eq.level || 0),
				ace: shipUI.equips.filter(eq => eq.mstId).map(eq => eq.rank || -1),
			};
			shipsReplay.push(shipReplay);
		}
		return shipsReplay;
	},
	uiToReplay: function(dataUI) {
		let dataReplay = {
			source: 11,
			fleet1: [],
			fleet2: [],
			fleet3: [],
			fleet4: [],
			fleetnum: 1,
			support1: 0,
			support2: 0,
			combined: dataUI.fleetFMain.combined ? dataUI.fleetFMain.type : 0,
			battles: [],
		};
		if (dataUI.fleetFMain.type == CONST.SF) {
			dataReplay.fleetnum = 3;
		}
		dataReplay['fleet'+dataReplay.fleetnum] = this.uiToReplayShips(dataUI.fleetFMain.ships);
		if (dataUI.fleetFMain.combined) {
			dataReplay.fleet2 = this.uiToReplayShips(dataUI.fleetFMain.shipsEscort);
		}
		if (dataUI.useSupportN) {
			let n = dataUI.fleetFMain.type == CONST.SF ? 2 : 3;
			dataReplay.support1 = n;
			dataReplay['fleet'+n] = this.uiToReplayShips(dataUI.fleetFSupportN.ships);
		}
		if (dataUI.useSupportB) {
			dataReplay.support2 = 4;
			dataReplay.fleet4 = this.uiToReplayShips(dataUI.fleetFSupportB.ships);
		}
		return dataReplay;
	},
	
	
	deckbuilderToSaveShips: function(shipsDb) {
		let shipsSave = [];
		for (let key in shipsDb) {
			let shipDb = shipsDb[key];
			let ind = +key.substr(1)-1;
			let shipSave = shipsSave[ind] = {
				mstId: +shipDb.id,
				equips: [],
			};
			if (shipDb.lv > 0) shipSave.level = shipDb.lv;
			let itemX = null;
			for (let keyI in shipDb.items) {
				let equipDb = shipDb.items[keyI];
				if (!equipDb) continue;
				let equipSave = {
					mstId: +equipDb.id,
				};
				if (equipDb.rf) equipSave.level = equipDb.rf;
				if (equipDb.mas) equipSave.rank = equipDb.mas;
				if (keyI == 'ix') {
					itemX = equipSave;
				} else {
					let indI = +keyI.substr(1)-1;
					shipSave.equips[indI] = equipSave;
				}
			}
			if (itemX) shipSave.equips.push(itemX);
			let statsBase = {};
			if (shipDb.luck > -1) statsBase.luk = shipDb.luck;
			if (shipDb.hp && shipDb.hp > -1) statsBase.hp = shipDb.hp;
			if (shipDb.asw && shipDb.asw > -1) {
				let eqs = shipSave.equips.filter(eq => !FLEET_MODEL.equipIsEmpty(eq));
				let statsBonus = window.getBonusStats(shipSave.mstId,eqs.map(eq => eq.mstId),eqs.map(eq => eq.level || 0));
				let asw = shipDb.asw - eqs.map(eq => EQDATA[eq.mstId].ASW || 0).reduce((a,b) => a+b,0) - (statsBonus.ASW || 0);
				if (asw > -1) statsBase.asw = asw;
			}
			if (Object.keys(statsBase).length) shipSave.statsBase = statsBase;
		}
		return shipsSave;
	},
	deckbuilderToSaveFleet: function(dataDb,fleetNum) {
		if (!fleetNum) fleetNum = dataDb.f2 && Object.keys(dataDb.f2).length ? 11 : 1;
		let type = fleetNum > 10 ? fleetNum - 10 : 0;
		let fleetKey = fleetNum > 10 ? 'f1' : 'f'+fleetNum;
		let fleetSave = { version: this._SAVE_VERSION_CURRENT, type: type };
		fleetSave.ships = this.deckbuilderToSaveShips(dataDb[fleetKey]);
		if (fleetSave.ships.length >= 7) {
			fleetSave.type = CONST.SF;
			type = 0;
		}
		if (type) fleetSave.shipsEscort = this.deckbuilderToSaveShips(dataDb.f2);
		return fleetSave;
	},
	deckbuilderToSaveLBAS: function(dataDb) {
		let basesSave = [];
		for (let i=1; i<=3; i++) {
			let keyBase = 'a'+i;
			if (!dataDb[keyBase]) {
				basesSave.push(null);
				continue;
			}
			let baseSave = {
				slots: [],
				equips: [],
			};
			for (let j=1; j<=4; j++) {
				let keyItem = 'i'+j;
				let equipDb = dataDb[keyBase].items[keyItem];
				if (!equipDb) {
					baseSave.equips.push({ mstId: 0 });
					baseSave.slots.push(0);
					continue;
				}
				baseSave.equips.push({
					mstId: equipDb.id,
					level: equipDb.rf,
					rank: equipDb.mas,
				});
				if (EQDATA[equipDb.id]) {
					baseSave.slots.push(COMMON.getLBASSlotDefault(EQDATA[equipDb.id].type));
				} else {
					baseSave.slots.push(0);
				}
			}				
			basesSave.push(baseSave);
		}
		return basesSave;
	},
	saveToDeckbuilderShips: function(shipsSave) {
		let shipsDb = {};
		for (let i=0; i<shipsSave.length; i++) {
			let shipSave = shipsSave[i];
			if (!shipSave) continue;
			let k = 's' + (i+1);
			let shipDb = shipsDb[k] = {
				id: shipSave.mstId.toString(),
				lv: shipSave.level,
				luck: shipSave.statsBase.luk,
				hp: shipSave.hp,
				asw: shipSave.statsBase.asw,
				items: {},
			};
			for (let j=0; j<shipSave.equips.length; j++) {
				let equipSave = shipSave.equips[j];
				if (!equipSave) continue;
				let kI = 'i' + (j+1);
				if (j >= shipSave.slots.length) kI = 'ix';
				let equipDb = shipsDb[k].items[kI] = { id: equipSave.mstId };
				if (equipSave.level > 0) equipDb.rf = equipSave.level;
				if (equipSave.rank > 0) equipDb.mas = equipSave.rank;
				shipDb.asw += EQDATA[equipSave.mstId].ASW || 0;
				if (kI == 'ix') break;
			}
			let eqs = shipSave.equips.filter(eq => !FLEET_MODEL.equipIsEmpty(eq));
			let statsBonus = window.getBonusStats(shipSave.mstId,eqs.map(eq => eq.mstId),eqs.map(eq => eq.level || 0));
			shipDb.asw += statsBonus.ASW || 0;
		}
		return shipsDb;
	},
	saveToDeckbuilderFleet: function(fleetSave) {
		let dataDb = {
			version: 4,
			f1: this.saveToDeckbuilderShips(fleetSave.ships),
		};
		if (fleetSave.shipsEscort) {
			dataDb.f2 = this.saveToDeckbuilderShips(fleetSave.shipsEscort);
		}
		return dataDb;
	},
	saveToDeckbuilderLBAS: function(basesSave) {
		let dataDb = { version: 4 };
		for (let i=0; i<=2; i++) {
			let keyBase = 'a'+(i+1);
			if (!basesSave[i]) continue;
			dataDb[keyBase] = { mode: 1, items: {} };
			for (let j=0; j<basesSave[i].equips.length; j++) {
				let equipSave = basesSave[i].equips[j];
				if (!equipSave) continue;
				let keyItem = 'i'+(j+1);
				dataDb[keyBase].items[keyItem] = {
					id: equipSave.mstId,
					rf: equipSave.level || 0,
					mas: equipSave.rank || 0,
				};
			}
		}
		return dataDb;
	},
	
	
	kcnavToSaveShips: function(shipsNav) {
		let shipsSave = [];
		for (let shipNav of shipsNav) {
			let shipSave = {
				mstId: shipNav.id,
				level: shipNav.lvl,
				hp: shipNav.hp,
				hpInit: shipNav.hp,
				statsBase: {
					fp: shipNav.fp,
					tp: shipNav.torp,
					aa: shipNav.aa,
					ar: shipNav.armor,
				},
				equips: shipNav.equips.filter(id => id != -1).map(id => ({ mstId: id, rank: 0 })),
			};
			if (shipNav.exslot && shipNav.exslot != -1) shipSave.equips.push({ mstId: shipNav.exslot, rank: 0 });
			if (COMMON.isShipIdAbyssal(shipSave.mstId)) {
				for (let equip of shipSave.equips) {
					equip.mstId = this._convertEquipId20221109(equip.mstId);
				}
			} else {
				if (SHIPDATA[shipSave.mstId] && SHIPDATA[shipSave.mstId].LUKmax) shipSave.statsBase.luk = SHIPDATA[shipSave.mstId].LUKmax;
			}
			shipsSave.push(shipSave);
		}
		return shipsSave;
	},
	//combine enemies with equip id shift, FF submissions without exslot (-2)
	_kcnavCombineEntries(compsNav) {
		let keys = {};
		for (let compNav of compsNav.entries) {
			let key = '', hasEx = false;
			for (let kFleet of ['fleet','mainFleet','escortFleet']) {
				if (!compNav[kFleet]) continue;
				for (let ship of compNav[kFleet]) {
					let keyShip = ship.id + ',' + ship.lvl + ',' + ship.hp + ',' + ship.fp + ',' + ship.torp + ',' + ship.aa + ',' + ship.armor;
					if (COMMON.isShipIdKanmusu(ship.id)) keyShip += ',' + ship.equips.join('_');
					key += keyShip + '|';
					if (ship.exslot != -2) hasEx = true;
				}
			}
			key += '|' + compNav.formation;
			if (!keys[key]) keys[key] = { comp: compNav, hasEx: hasEx, count: 0 };
			keys[key].count += compNav.count;
			if (!keys[key].hasEx && hasEx) {
				keys[key].comp = compNav;
				keys[key].hasEx = hasEx;
			}
		}
		compsNav.entries = [];
		for (let key in keys) {
			keys[key].comp.count = keys[key].count;
			compsNav.entries.push(keys[key].comp);
		}
		return compsNav;
	},
	kcnavToSaveComps: function(compsNav) {
		compsNav = this._kcnavCombineEntries(compsNav);
		let compsSave = [];
		for (let compNav of compsNav.entries) {
			let fleetSave = {
				version: this._SAVE_VERSION_CURRENT,
				formation: +compNav.formation,
				type: 0,
				ships: this.kcnavToSaveShips(compNav.mainFleet || compNav.fleet),
			};
			if (compNav.escortFleet && compNav.escortFleet.length) {
				fleetSave.type = CONST.CTF;
				fleetSave.shipsEscort = this.kcnavToSaveShips(compNav.escortFleet);
			}
			if (fleetSave.ships.length && compNav.map && +compNav.map.split('-')[0] >= 56) {
				let isAirSub = SHIPDATA[fleetSave.ships[0].mstId] && ['SS','SSV'].includes(SHIPDATA[fleetSave.ships[0].mstId].type);
				let foundCV = false;
				for (let ship of fleetSave.ships) {
					if (!SHIPDATA[ship.mstId]) { isAirSub = false; break; }
					let isSS = ['SS','SSV'].includes(SHIPDATA[ship.mstId].type);
					let isCV = ['CVL','CV','CVB','BBV'].includes(SHIPDATA[ship.mstId].type);
					if (!isSS && !isCV) isAirSub = false;
					if (isSS && foundCV) isAirSub = false;
					if (isCV) foundCV = true;
				}
				if (isAirSub && foundCV) {
					for (let ship of fleetSave.ships) {
						if (['CVL','CV','CVB','BBV'].includes(SHIPDATA[ship.mstId].type)) ship.isFaraway = true;
					}
				}
			}
			let compSave = {
				rate: compNav.count,
				fleet: fleetSave,
			}
			compsSave.push(compSave);
		}
		return compsSave;
	},
	
	
	uiToSimInputShips: function(shipsUI,nodeIdToNum) {
		let shipsInput = [];
		for (let shipUI of shipsUI) {
			if (FLEET_MODEL.shipIsEmpty(shipUI)) continue;
			let shipInput = {
				masterId: shipUI.mstId,
				LVL: shipUI.level,
				stats: {
					HP: shipUI.hp,
					FP: shipUI.statsBase.fp,
					TP: shipUI.statsBase.tp,
					AA: shipUI.statsBase.aa,
					AR: shipUI.statsBase.ar,
					EV: shipUI.statsBase.ev,
					ASW: shipUI.statsBase.asw,
					LOS: shipUI.statsBase.los,
					LUK: shipUI.statsBase.luk,
					RNG: shipUI.statsBase.range,
					SLOTS: [],
					TACC: shipUI.statsBase.tacc,
				},
				HPInit: shipUI.hpInit,
				fuelInit: shipUI.fuelInit/100,
				ammoInit: shipUI.ammoInit/100,
				morale: shipUI.morale,
				equips: [],
				includesEquipStats: 0,
				isFaraway: shipUI.isFaraway,
			};
			for (let i=0; i<shipUI.equips.length; i++) {
				let equipUI = shipUI.equips[i];
				if (FLEET_MODEL.equipIsEmpty(equipUI)) continue;
				let equipInput = {
					masterId: equipUI.mstId,
					improve: equipUI.level,
					proficiency: equipUI.rank,
				};
				if (equipUI.bonusGroups) {
					equipInput.bonusGroups = this._copyObj(equipUI.bonusGroups);
				}
				if (nodeIdToNum && equipUI.bonusByNode) {
					let bonusesByNode = {};
					for (let id in equipUI.bonusByNode) {
						if (!nodeIdToNum[id]) continue;
						if (equipUI.bonusByNode[id].bonusGroups) {
							bonusesByNode[nodeIdToNum[id]] = { bonusGroups: this._copyObj(equipUI.bonusByNode[id].bonusGroups) };
						}
					}
					if (Object.keys(bonusesByNode).length) equipInput.bonusesByNode = bonusesByNode;
				}
				shipInput.equips.push(equipInput);
				shipInput.stats.SLOTS.push(shipUI.slots[i] || 0);
			}
			
			let bonuses = {};
			if (shipUI.bonusDmg && shipUI.bonusDmg !== '' && shipUI.bonusDmg != 1) bonuses.bonusDmg = shipUI.bonusDmg;
			if (shipUI.bonusAcc && shipUI.bonusAcc !== '' && shipUI.bonusAcc != 1) bonuses.bonusAcc = shipUI.bonusAcc;
			if (shipUI.bonusEva && shipUI.bonusEva !== '' && shipUI.bonusEva != 1) bonuses.bonusEva = shipUI.bonusEva;
			if (Object.keys(bonuses).length) shipInput.bonuses = bonuses;
			let bonusesDebuff = {};
			if (shipUI.bonusDmgDebuff != null && shipUI.bonusDmgDebuff !== '' && shipUI.bonusDmgDebuff != 1) bonusesDebuff.bonusDmg = shipUI.bonusDmgDebuff;
			if (Object.keys(bonusesDebuff).length) shipInput.bonusesDebuff = bonusesDebuff;
			if (nodeIdToNum && shipUI.bonusByNode) {
				let bonusesByNode = {};
				for (let id in shipUI.bonusByNode) {
					if (!nodeIdToNum[id]) continue;
					let b = {};
					for (let k of ['bonusDmg','bonusAcc','bonusEva']) {
						if (shipUI.bonusByNode[id][k]) b[k] = shipUI.bonusByNode[id][k];
					}
					if (Object.keys(b).length) bonusesByNode[nodeIdToNum[id]] = b;
				}
				if (Object.keys(bonusesByNode).length) shipInput.bonusesByNode = bonusesByNode;
			}
			if (shipUI.neverFCF) shipInput.neverFCF = 1;
			if (shipUI.retreatOnChuuha) shipInput.retreatOnChuuha = 1;
			if (shipUI.noRetreatOnTaiha) shipInput.noRetreatOnTaiha = 1;
			
			shipsInput.push(shipInput);
		}			
		return shipsInput;
	},
	uiToSimInputFleet: function(fleetUI,nodeIdToNum) {
		if (FLEET_MODEL.fleetIsEmpty(fleetUI)) return null;
		let fleetInput = {
			combineType: fleetUI.combined ? fleetUI.type : 0,
			formation: fleetUI.formation,
			ships: [],
		};
		fleetInput.ships = this.uiToSimInputShips(fleetUI.ships,nodeIdToNum);
		if (fleetUI.combined) {
			fleetInput.shipsC = this.uiToSimInputShips(fleetUI.shipsEscort,nodeIdToNum);
		}
		return fleetInput;
	},
	uiToSimInputLBAS: function(landBasesUI) {
		let landBasesInput = [];
		for (let baseUI of landBasesUI) {
			let baseInput = {
				slots: [],
				equips: [],
			};
			for (let i=0; i<baseUI.equips.length; i++) {
				let equipUI = baseUI.equips[i];
				if (FLEET_MODEL.equipIsEmpty(equipUI)) continue;
				let equipInput = {
					masterId: equipUI.mstId,
					improve: equipUI.level,
					proficiency: equipUI.rank,
				};
				let bonuses = {};
				if (equipUI.bonusDmg && equipUI.bonusDmg != 1) {
					bonuses.bonusDmg = equipUI.bonusDmg;
				}
				if (equipUI.bonusAcc && equipUI.bonusAcc != 1) {
					bonuses.bonusAcc = equipUI.bonusAcc;
				}
				if (Object.keys(bonuses).length) equipInput.bonuses = bonuses;
				if (equipUI.bonusGroups) equipInput.bonusGroups = this._copyObj(equipUI.bonusGroups);
				baseInput.equips.push(equipInput);
				baseInput.slots.push(baseUI.slots[i]);
			}
			if (baseInput.equips.length <= 0) {
				landBasesInput.push(null);
				continue;
			}
			landBasesInput.push(baseInput);
		}
		return landBasesInput;
	},
	uiToSimInputComps: function(compsUI) {
		let compsInput = [];
		for (let compUI of compsUI) {
			compsInput.push({ fleet: this.uiToSimInputFleet(compUI.fleet), weight: compUI.rate });
		}
		return compsInput;
	},
	uiToSimInputMechanics: function(dataUI) {
		dataUI = dataUI || this._UI_MAIN;
		let mechInput = { mechanics: {}, consts: {} };
		for (let obj of dataUI.settings.mechanics) {
			mechInput.mechanics[obj.key] = obj.enabled;
		}
		for (let key in dataUI.settings) {
			if (SIMCONSTS[key] === undefined) continue;
			if (Array.isArray(dataUI.settings[key])) {
				mechInput.consts[key] = dataUI.settings[key].slice();
			} else {
				mechInput.consts[key] = dataUI.settings[key];
			}
		}
		if (dataUI.settings.nelsonTouchUseFormula) {
			mechInput.consts.nelsonTouchRate = dataUI.getNelsonTouchFormula();
		}
		if (dataUI.settings.nagatoSpecialUseFormula) {
			mechInput.consts.nagatoSpecialRate = dataUI.getNagatoSpecialFormula();
		}
		if (dataUI.settings.mutsuSpecialUseFormula) {
			mechInput.consts.mutsuSpecialRate = dataUI.getNagatoSpecialFormula();
		}
		if (dataUI.settings.kongouSpecialUseFormula) {
			mechInput.consts.kongouSpecialRate = dataUI.getKongouSpecialFormula();
		}
		if (dataUI.settings.yamatoSpecial2UseFormula) {
			mechInput.consts.yamatoSpecial2Rate = dataUI.getYamatoSpecial2Formula();
		}
		return mechInput;
	},
	uiToSimInput: function(dataUI) {
		let nodeIdToNum = {};
		for (let i=0; i<dataUI.battles.length; i++) nodeIdToNum[dataUI.battles[i].id] = i+1;
		let dataInput = {
			numSims: dataUI.numSim,
			fleetF: this.uiToSimInputFleet(dataUI.fleetFMain,nodeIdToNum),
			fleetSupportN: dataUI.useSupportN ? this.uiToSimInputFleet(dataUI.fleetFSupportN) : null,
			fleetSupportB: dataUI.useSupportB ? this.uiToSimInputFleet(dataUI.fleetFSupportB) : null,
			lbas: this.uiToSimInputLBAS(dataUI.landBases),
			fleetFriendComps: dataUI.useFF ? this.uiToSimInputComps(dataUI.fleetsFFriend) : null,
			nodes: [],
			continueOnTaiha: !dataUI.settings.retreatOnTaiha,
			dameconNumTaiha: dataUI.settings.dameconNumTaiha,
			retreatOnChuuhaIfAll: dataUI.settings.retreatOnChuuhaIfAll,
			allowAnyFormation: !dataUI.settings.replaceImpossibleFormations,
			bucketHPPercent: dataUI.settings.bucketPercent,
			bucketTime: dataUI.settings.bucketTime,
			bucketTimeIgnore: (dataUI.settings.bucketTimeIgnore||0)*60*60,
			carryOverHP: dataUI.settings.carryOverHP,
			carryOverMorale: dataUI.settings.carryOverMorale,
			tpFormula: dataUI.settings.tpFormula,
			mechanics: null,
			consts: null,
		};
		for (let battleUI of dataUI.battles) {
			let nodeInput = {
				fleetEComps: this.uiToSimInputComps(battleUI.enemyComps),
				doNB: battleUI.doNB,
				NBOnly: battleUI.nodeType == CONST.NODE_NIGHT,
				airOnly: battleUI.nodeType == CONST.NODE_AIR,
				airRaid: battleUI.nodeType == CONST.NODE_RAID,
				noAmmo: battleUI.subOnly,
				formationOverride: +battleUI.formation,
				addCostFuel: battleUI.addCostFuel/100,
				addCostAmmo: battleUI.addCostAmmo/100,
				addCostMax: battleUI.addCostMax,
				lbas: [],
				useBalloon: battleUI.useBalloon,
				useAtoll: battleUI.useAtoll,
				useSmoke: battleUI.useSmoke,
				useAnchorageRepair: battleUI.useAnchorageRepair,
				offrouteRate: battleUI.offrouteRate/100,
			};
			if (battleUI.doNBCond) nodeInput.doNBCond = battleUI.doNBCond;
			if (battleUI.formationUseLAIfNoSpAttack && COMMON.checkSpecialAttackUI(this._UI_MAIN,+battleUI.formation)) nodeInput.formationUseLAIfNoSpAttack = true;
			for (let i=0; i<battleUI.lbasWaves.length; i++) {
				if (battleUI.lbasWaves[i]) {
					nodeInput.lbas.push(Math.floor(i/2)+1);
				}
			}
			dataInput.nodes.push(nodeInput);
		}
		let iLast = dataUI.battles.length-1;
		if (+dataUI.battles[iLast].useNormalSupport) {
			dataInput.nodes[iLast].useNormalSupport = !!+dataUI.battles[iLast].useNormalSupport;
		}
		
		let mechInput = this.uiToSimInputMechanics(dataUI);
		dataInput.mechanics = mechInput.mechanics;
		dataInput.consts = mechInput.consts;
		if (dataUI.settingsFCF) {
			dataInput.settingsFCF = {}
			if (dataUI.settingsFCF.los != null && dataUI.settingsFCF.los !== '') {
				dataInput.settingsFCF.los = dataUI.settingsFCF.los;
				dataInput.settingsFCF.losC = dataUI.settingsFCF.losC;
				dataInput.settingsFCF.losNode = nodeIdToNum[dataUI.settingsFCF.losNode] || dataUI.battles.length;
			}
			if (dataUI.settingsFCF.radarCount) {
				dataInput.settingsFCF.radarCount = dataUI.settingsFCF.radarCount;
				dataInput.settingsFCF.radarNode = nodeIdToNum[dataUI.settingsFCF.radarNode];
			}
			if (dataUI.settingsFCF.rules && dataUI.settingsFCF.rules.length) {
				dataInput.settingsFCF.rules = [];
				for (let ruleUI of dataUI.settingsFCF.rules) {
					dataInput.settingsFCF.rules.push({
						types: ruleUI.shipStr.split('/'),
						count: ruleUI.count,
						node: nodeIdToNum[ruleUI.node] || dataUI.battles.length,
					});
				}
			}
			if (dataUI.settingsFCF.dameconNode && nodeIdToNum[dataUI.settingsFCF.dameconNode]) {
				dataInput.settingsFCF.dameconNode = nodeIdToNum[dataUI.settingsFCF.dameconNode];
			}
			if (!Object.keys(dataInput.settingsFCF).length) delete dataInput.settingsFCF;
		}
		return dataInput;
	},
	
	
	_uiToSaveBonusByNode: function(objUI) {
		let bonusByNode = {};
		let nodeIds = this._UI_MAIN.battles.map(b => b.id);
		for (let nodeId in objUI.bonusByNode) {
			if (!nodeIds.includes(+nodeId)) continue;
			if (!Object.values(objUI.bonusByNode[nodeId]).find(v => v)) continue;
			bonusByNode[nodeId] = this._copyObj(objUI.bonusByNode[nodeId]);
		}
		return bonusByNode;
	},
	uiToSaveEquip: function(equipUI) {
		if (equipUI.mstId <= 0) return null;
		let equipSave = this._copyObj(equipUI,this._equipPropsSaved);
		
		if (equipUI.bonusByNode) {
			let bonusByNode = this._uiToSaveBonusByNode(equipUI);
			if (Object.keys(bonusByNode).length) equipSave.bonusByNode = bonusByNode;
		}
		
		return equipSave;
	},
	uiToSaveShip: function(shipUI) {
		if (!shipUI.active) return null;
		if (shipUI.mstId <= 0) return null;
		let shipSave = this._copyObj(shipUI,this._shipPropsSaved);
		
		let bonusByNode = this._uiToSaveBonusByNode(shipUI);
		if (Object.keys(bonusByNode).length) shipSave.bonusByNode = bonusByNode;
		
		if (shipUI.equips) {
			shipSave.equips = [];
			for (let equip of shipUI.equips) {
				shipSave.equips.push(this.uiToSaveEquip(equip));
			}
		}
		return shipSave;
	},
	uiToSaveFleet: function(fleetUI) {
		let fleetSave = this._copyObj(fleetUI,this._fleetPropsSaved);
		fleetSave.ships = [];
		for (let ship of fleetUI.ships) fleetSave.ships.push(this.uiToSaveShip(ship));
		if (fleetUI.combined && fleetUI.shipsEscort) {
			fleetSave.shipsEscort = [];
			for (let ship of fleetUI.shipsEscort) fleetSave.shipsEscort.push(this.uiToSaveShip(ship));
		}
		fleetSave.version = this._SAVE_VERSION_CURRENT;
		return fleetSave;
	},
	uiToSaveComps: function(compsUI) {
		let compsSave = [];
		for (let compUI of compsUI) {
			let compSave = this._copyObj(compUI,Object.keys(compUI).filter(k => k != 'fleet'));
			compSave.fleet = FLEET_MODEL.fleetIsEmpty(compUI.fleet) ? null : this.uiToSaveFleet(compUI.fleet);
			compsSave.push(compSave);
		};
		return compsSave;
	},
	uiToSaveLBAS: function(basesUI) {
		let basesSave = [];
		for (let baseUI of basesUI) {
			let baseSave = this._copyObj(baseUI,Object.keys(baseUI).filter(k => k != 'equips'));
			baseSave.equips = [];
			for (let equipUI of baseUI.equips) baseSave.equips.push(this.uiToSaveEquip(equipUI));
			basesSave.push(baseSave);
		}
		return basesSave;
	},
	uiToSaveSettings: function(settingsUI) {
		let settingsSave = {};
		for (let key in settingsUI) {
			if (['mechanics','showAdvanced'].includes(key)) continue;
			if (Array.isArray(settingsUI[key])) {
				let a = [], found = false;
				for (let i=0; i<settingsUI[key].length; i++) {
					if (settingsUI[key][i] != SIMCONSTS.defaults[key][i]) {
						a.push(settingsUI[key][i]);
						found = true;
					} else {
						a.push(null);
					}
				}
				if (found) settingsSave[key] = a;
			} else {
				let v = settingsUI[key] === '' ? null : settingsUI[key];
				if (v != SIMCONSTS.defaults[key]) {
					settingsSave[key] = v;
				}
			}
		}
		let mechanicsSave = {};
		for (let mechanic of settingsUI.mechanics) {
			if (!mechanic.enabled) mechanicsSave[mechanic.key] = mechanic.enabled;
		}
		if (Object.keys(mechanicsSave).length) settingsSave.mechanics = mechanicsSave;
		return settingsSave;
	},
	uiToSave: function(dataUI) {
		let dataSave = {};
		for (let key of ['fleetFMain','fleetFSupportN','fleetFSupportB']) {
			if (FLEET_MODEL.fleetIsEmpty(dataUI[key])) continue;
			dataSave[key] = this.uiToSaveFleet(dataUI[key]);
		}
		dataSave.fleetsFFriend = this.uiToSaveComps(dataUI.fleetsFFriend);
		dataSave.useSupportN = dataUI.useSupportN;
		dataSave.useSupportB = dataUI.useSupportB;
		dataSave.useFF = dataUI.useFF;
		dataSave.landBases = this.uiToSaveLBAS(dataUI.landBases);
		
		dataSave.battles = [];
		for (let battleUI of dataUI.battles) {
			let battleSave = this._copyObj(battleUI,Object.keys(battleUI).filter(k => k != 'enemyComps'));
			battleSave.enemyComps = this.uiToSaveComps(battleUI.enemyComps);
			dataSave.battles.push(battleSave);
		}
		
		dataSave.settings = this.uiToSaveSettings(dataUI.settings);
		dataSave.settingsFCF = this._copyObj(dataUI.settingsFCF);
		if (dataUI.autoBonus) dataSave.autoBonus = this._copyObj(dataUI.autoBonus);
		
		let results = {};
		if (+dataUI.results.perHPRes != 1) results.perHPRes = dataUI.results.perHPRes;
		if (+dataUI.results.perTPRes != 1) results.perTPRes = dataUI.results.perTPRes;
		if (Object.keys(results).length) dataSave.results = results;
		
		dataSave.version = this._SAVE_VERSION_CURRENT;
		
		return dataSave;
	},
	
	_loadSaveShips: function(shipsSave,shipsUI,version) {
		for (let i=0; i<shipsSave.length; i++) {
			let shipSave = shipsSave[i];
			if (!shipSave) continue;
			let sdata = SHIPDATA[shipSave.mstId];
			if (!sdata) {
				shipsUI[i] = FLEET_MODEL.getDefaultShip(0,i);
				continue;
			}
			let shipUI = shipsUI[i] = FLEET_MODEL.getDefaultShip(shipSave.mstId,i,shipSave.level);
			this._copyObj(shipSave,Object.keys(shipSave).filter(k => k != 'equips'),shipUI);
			for (let j=0; j<shipSave.equips.length; j++) {
				let equipSave = shipSave.equips[j];
				if (!equipSave) continue;
				if ((version || 1) < this._SAVE_VERSION_EQUIP_SHIFT_20221109) {
					equipSave.mstId = this._convertEquipId20221109(equipSave.mstId);
				}
				if (!EQDATA[equipSave.mstId]) {
					shipUI.equips[j] = FLEET_MODEL.getDefaultEquip(0,shipUI,j);
					continue;
				}
				let equipUI = shipUI.equips[j] = FLEET_MODEL.getDefaultEquip(equipSave.mstId,shipUI,j);
				this._copyObj(equipSave,null,equipUI);
			}
			FLEET_MODEL.updateEquipStats(shipUI);
		}
	},
	loadSaveFleet: function(fleetSave,fleetUI,useAutoBonus) {
		fleetUI.formation = fleetSave.formation;
		FLEET_MODEL.setType(fleetUI,fleetSave.type);
		this._loadSaveShips(fleetSave.ships,fleetUI.ships,fleetSave.version);
		if (fleetUI.shipsEscort && fleetSave.shipsEscort) {
			this._loadSaveShips(fleetSave.shipsEscort,fleetUI.shipsEscort,fleetSave.version);
		}
		if (useAutoBonus) {
			if (fleetUI.isPlayer || fleetUI.isFriend) {
				COMMON.BONUS_MANAGER.applyAutoBonusFleet(fleetUI);
			}
			if (fleetUI.isEnemy) {
				COMMON.BONUS_MANAGER.applyAutoDebuff(fleetUI);
			}
		}
	},
	loadSaveComps: function(compsSave,compsUI,useAutoBonus) {
		for (let i=compsUI.length; i<compsSave.length; i++) {
			this._UI_MAIN.addNewComp(compsUI);
		}
		for (let i=0; i<compsSave.length; i++) {
			if (!compsUI[i]) continue;
			this._copyObj(compsSave[i],Object.keys(compsSave[i]).filter(k => k != 'fleet'),compsUI[i]);
			if (compsSave[i].fleet) {
				this.loadSaveFleet(compsSave[i].fleet,compsUI[i].fleet,useAutoBonus);
			}
		}
	},
	loadSaveLBAS: function(basesSave,basesUI) {
		basesUI = basesUI || this._UI_MAIN.landBases;
		for (let i=0; i<basesSave.length; i++) {
			if (!basesSave[i]) continue;
			this._copyObj(basesSave[i],Object.keys(basesSave[i]).filter(k => k != 'equips'),basesUI[i]);
			for (let j=0; j<basesSave[i].equips.length; j++) {
				let equipSave = basesSave[i].equips[j];
				if (!equipSave) continue;
				if (!EQDATA[equipSave.mstId]) {
					basesUI[i].equips[j] = FLEET_MODEL.getDefaultEquip(0,null,j);
					continue;
				}
				let equipUI = basesUI[i].equips[j] = FLEET_MODEL.getDefaultEquip(equipSave.mstId,null,j);
				this._copyObj(equipSave,null,equipUI);
			}
		}
	},
	loadSaveSettings(settingsSave,settingsUI) {
		for (let key in settingsSave) {
			if (key == 'mechanics') continue;
			if (settingsUI[key] === undefined) continue;
			if (Array.isArray(settingsUI[key])) {
				for (let i=0; i<settingsUI[key].length; i++) {
					if (settingsSave[key][i] != null) settingsUI[key][i] = settingsSave[key][i];
				}
			} else {
				settingsUI[key] = settingsSave[key];
			}
		}
		if (settingsSave.mechanics) {
			for (let mechanic of settingsUI.mechanics) {
				if (settingsSave.mechanics[mechanic.key] != null) mechanic.enabled = settingsSave.mechanics[mechanic.key];
			}
		}
	},
	loadSave: function(dataSave,dataUI) {
		this._UI_MAIN = dataUI;
		
		if (!dataSave) return;
		for (let key of ['fleetFMain','fleetFSupportN','fleetFSupportB']) {
			if (!dataSave[key]) continue;
			this.loadSaveFleet(dataSave[key],dataUI[key]);
		}
		if (dataSave.fleetsFFriend) {
			this.loadSaveComps(dataSave.fleetsFFriend,dataUI.fleetsFFriend,dataUI);
		}
		dataUI.useSupportN = dataSave.useSupportN;
		dataUI.useSupportB = dataSave.useSupportB;
		dataUI.useFF = dataSave.useFF;
		
		if (dataSave.landBases) {
			this.loadSaveLBAS(dataSave.landBases,dataUI.landBases);
		}
		
		if (dataSave.battles) {
			let idMax = 0, idMin = Number.MAX_SAFE_INTEGER;
			for (let i=dataUI.battles.length; i<dataSave.battles.length; i++) {
				this._UI_MAIN.addNewBattle();
			}
			for (let i=0; i<dataSave.battles.length; i++) {
				this._copyObj(dataSave.battles[i],Object.keys(dataSave.battles[i]).filter(k => k != 'enemyComps'),dataUI.battles[i]);
				this.loadSaveComps(dataSave.battles[i].enemyComps,dataUI.battles[i].enemyComps,dataUI);
				if (dataUI.battles[i].id > idMax) idMax = dataUI.battles[i].id;
				if (dataUI.battles[i].id < idMin) idMin = dataUI.battles[i].id;
			}
			if (idMax && idMin < Number.MAX_SAFE_INTEGER/10) COMMON.ID_GEN.setInit('battle',idMax);
		}
		
		if (dataSave.settings) {
			this.loadSaveSettings(dataSave.settings,dataUI.settings);
		}
		if (dataSave.settingsFCF) {
			this._copyObj(dataSave.settingsFCF,null,dataUI.settingsFCF);
		}
		if (dataSave.autoBonus) {
			dataUI.autoBonus = {};
			this._copyObj(dataSave.autoBonus,null,dataUI.autoBonus);
		}
		
		if (dataSave.results) {
			for (let key in dataSave.results) {
				dataUI.results[key] = dataSave.results[key];
			}
		}
	},
};

})();