(() => {

var CONST = window.COMMON.getConst({});


window.CONVERT = {
	_fleetPropsSaved: ['type','formation'],
	_shipPropsSaved: ['mstId','level','hp','hpInit','morale','fuelInit','ammoInit','statsBase','slots','bonusDmg','bonusAcc','bonusEva','bonusDmgDebuff'],
	_equipPropsSaved: ['mstId','level','rank','bonusDmg'],
	
	_UI_MAIN: null,
	_dataKC3: null,
	_dataSimSave: null,
	
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
	
	
	replayToSaveShipsF: function(shipsReplay,useMorale) {
		let shipsSave = [];
		for (let shipReplay of shipsReplay) {
			let sdata = SHIPDATA[shipReplay.mst_id];
			if (!sdata) {
				shipsSave.push(null);
				continue;
			}
			let shipSave = {
				mstId: shipReplay.mst_id,
				level: shipReplay.level,
				hp: sdata.HP + (shipReplay.kyouka[5] || 0),
				hpInit: sdata.HP + (shipReplay.kyouka[5] || 0),
				statsBase: {
					fp: sdata.FPbase + (shipReplay.kyouka[0] || 0),
					tp: sdata.TPbase + (shipReplay.kyouka[1] || 0),
					aa: sdata.AAbase + (shipReplay.kyouka[2] || 0),
					ar: sdata.ARbase + (shipReplay.kyouka[3] || 0),
					ev: COMMON.getScaledStat(sdata.EVbase,sdata.EV,shipReplay.level),
					asw: COMMON.getScaledStat(sdata.ASWbase,sdata.ASW,shipReplay.level) + (shipReplay.kyouka[6] || 0),
					los: COMMON.getScaledStat(sdata.LOSbase,sdata.LOS,shipReplay.level),
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
				if (shipReplay.stars) equipSave.level = shipReplay.stars[i];
				if (shipReplay.ace && shipReplay.ace[i] > -1) equipSave.rank = shipReplay.ace[i];
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
				hp: e_maxhps[i],
				hpInit: e_maxhps[i],
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
				shipSave.equips.push({ mstId: id, rank: 0 });
			}
			shipsSave.push(shipSave);
		}
		return shipsSave;
	},
	replayToSave: function(dataReplay) {
		let dataSave = {};
		
		dataSave.fleetFMain = {
			type: dataReplay.combined,
			ships: this.replayToSaveShipsF(dataReplay['fleet'+dataReplay.fleetnum]),
		};
		if (dataSave.fleetFMain.type == 0 && dataSave.fleetFMain.ships.length >= 7) dataSave.fleetFMain.type = CONST.SF;
		if (dataReplay.combined) {
			dataSave.fleetFMain.shipsEscort = this.replayToSaveShipsF(dataReplay.fleet2);
		}
		
		if (dataReplay.support1) {
			dataSave.fleetFSupportN = { type: 0, ships: this.replayToSaveShipsF(dataReplay['fleet'+dataReplay.support1],true) };
			dataSave.useSupportN = true;
		}
		if (dataReplay.support2) {
			dataSave.fleetFSupportB = { type: 0, ships: this.replayToSaveShipsF(dataReplay['fleet'+dataReplay.support2],true) };
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
			if (dataReplay.world != -1) {
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
			if (bdata.api_name && bdata.api_name.includes('ld_airbattle')) {
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
			let statsBase = {};
			if (shipDb.luck > -1) statsBase.luk = shipDb.luck;
			if (shipDb.hp && shipDb.hp > -1) statsBase.hp = shipDb.hp;
			if (Object.keys(statsBase).length) shipSave.statsBase = statsBase;
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
		}
		return shipsSave;
	},
	deckbuilderToSaveFleet: function(dataDb) {
		let hasCombined = !!(dataDb.f2 && Object.keys(dataDb.f2).length);
		let fleetSave = { type: +hasCombined };
		fleetSave.ships = this.deckbuilderToSaveShips(dataDb.f1);
		if (fleetSave.ships.length >= 7) {
			fleetSave.type = CONST.SF;
			hasCombined = false;
		}
		if (hasCombined) fleetSave.shipsEscort = this.deckbuilderToSaveShips(dataDb.f2);
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
				if (kI == 'ix') break;
			}
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
			shipsSave.push(shipSave);
		}
		return shipsSave;
	},
	kcnavToSaveComps: function(compsNav) {
		let compsSave = [];
		for (let compNav of compsNav.entries) {
			let fleetSave = {
				formation: +compNav.formation,
				type: 0,
				ships: this.kcnavToSaveShips(compNav.mainFleet || compNav.fleet),
			};
			if (compNav.escortFleet && compNav.escortFleet.length) {
				fleetSave.type = CONST.CTF;
				fleetSave.shipsEscort = this.kcnavToSaveShips(compNav.escortFleet);
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
					TACC: shipUI.tacc,
				},
				HPInit: shipUI.hpInit,
				fuelInit: shipUI.fuelInit/100,
				ammoInit: shipUI.ammoInit/100,
				morale: shipUI.morale,
				equips: [],
				includesEquipStats: 0,
			};
			for (let i=0; i<shipUI.equips.length; i++) {
				let equipUI = shipUI.equips[i];
				if (FLEET_MODEL.equipIsEmpty(equipUI)) continue;
				shipInput.equips.push({
					masterId: equipUI.mstId,
					improve: equipUI.level,
					proficiency: equipUI.rank,
				});
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
				if (equipUI.bonusDmg && equipUI.bonusDmg != 1) {
					equipInput.bonuses = { bonusDmg: equipUI.bonusDmg };
				}
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
		for (let key of ['shellDmgCap','aswDmgCap','torpedoDmgCap','nightDmgCap','airDmgCap','supportDmgCap','airRaidCostW6','nelsonTouchRate','nagatoSpecialRate','mutsuSpecialRate','coloradoSpecialRate','kongouSpecialRate']) {
			mechInput.consts[key] = dataUI.settings[key];
		}
		for (let key of ['vanguardEvShellDD','vanguardEvTorpDD','vanguardEvShellOther','vanguardEvTorpOther']) {
			mechInput.consts[key] = dataUI.settings[key].slice();
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
			bucketHPPercent: dataUI.settings.bucketPercent,
			bucketTime: dataUI.settings.bucketTime,
			carryOverHP: dataUI.settings.carryOverHP,
			carryOverMorale: dataUI.settings.carryOverMorale,
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
				lbas: [],
			};
			for (let i=0; i<battleUI.lbasWaves.length; i++) {
				if (battleUI.lbasWaves[i]) {
					nodeInput.lbas.push(Math.floor(i/2)+1);
				}
			}
			dataInput.nodes.push(nodeInput);
		}
		let mechInput = this.uiToSimInputMechanics(dataUI);
		dataInput.mechanics = mechInput.mechanics;
		dataInput.consts = mechInput.consts;
		return dataInput;
	},
	
	
	uiToSaveEquip: function(equipUI) {
		if (equipUI.mstId <= 0) return null;
		return this._copyObj(equipUI,this._equipPropsSaved);
	},
	uiToSaveShip: function(shipUI) {
		if (!shipUI.active) return null;
		if (shipUI.mstId <= 0) return null;
		let shipSave = this._copyObj(shipUI,this._shipPropsSaved);
		
		let bonusByNode = {};
		let nodeIds = this._UI_MAIN.battles.map(b => b.id);
		for (let nodeId in shipUI.bonusByNode) {
			if (!nodeIds.includes(+nodeId)) continue;
			if (!Object.values(shipUI.bonusByNode[nodeId]).find(v => v)) continue;
			bonusByNode[nodeId] = this._copyObj(shipUI.bonusByNode[nodeId]);
		}
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
		
		return dataSave;
	},
	
	loadSaveShips: function(shipsSave,shipsUI) {
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
	loadSaveFleet: function(fleetSave,fleetUI) {
		fleetUI.formation = fleetSave.formation;
		FLEET_MODEL.setType(fleetUI,fleetSave.type);
		this.loadSaveShips(fleetSave.ships,fleetUI.ships);
		if (fleetUI.shipsEscort && fleetSave.shipsEscort) {
			this.loadSaveShips(fleetSave.shipsEscort,fleetUI.shipsEscort);
		}
	},
	loadSaveComps: function(compsSave,compsUI) {
		for (let i=compsUI.length; i<compsSave.length; i++) {
			this._UI_MAIN.addNewComp(compsUI);
		}
		for (let i=0; i<compsSave.length; i++) {
			if (!compsUI[i]) continue;
			this._copyObj(compsSave[i],Object.keys(compsSave[i]).filter(k => k != 'fleet'),compsUI[i]);
			if (compsSave[i].fleet) {
				this.loadSaveFleet(compsSave[i].fleet,compsUI[i].fleet);
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
	},
};

})();