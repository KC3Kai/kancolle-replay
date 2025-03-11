(() => {

COMMON.BONUS_MANAGER = {
	PRESET_INDEX: {
		'7-4': { name: 'World 7-4' },
		'7-5': { name: 'World 7-5' },
		'57-1': { name: 'Summer 2023 E1' },
		'57-2': { name: 'Summer 2023 E2' },
		'57-3': { name: 'Summer 2023 E3' },
		'57-4': { name: 'Summer 2023 E4' },
		'57-5': { name: 'Summer 2023 E5' },
		'57-6': { name: 'Summer 2023 E6' },
		'57-7': { name: 'Summer 2023 E7' },
		'58-1': { name: 'Early-Spring 2024 E1' },
		'58-2': { name: 'Early-Spring 2024 E2' },
		'58-3': { name: 'Early-Spring 2024 E3' },
		'58-4': { name: 'Early-Spring 2024 E4' },
		'59-1': { name: 'Summer 2024 E1' },
		'59-2': { name: 'Summer 2024 E2' },
		'59-3': { name: 'Summer 2024 E3' },
		'59-4': { name: 'Summer 2024 E4' },
		'59-5': { name: 'Summer 2024 E5' },
		'60-1': { name: 'Spring 2025 E1' },
		'60-2': { name: 'Spring 2025 E2' },
		'60-3': { name: 'Spring 2025 E3' },
	},
	_URL_DEWY_INDEX: 'https://api.github.com/repos/sorewachigauyo/kc-event-bonus/git/trees/master?recursive=1',
	_URL_DEWY_PATH: 'https://raw.githubusercontent.com/sorewachigauyo/kc-event-bonus/master/',
	
	_cache: {
		preset: {
			"none": { key: 'none', data: {
				"listBonus": [{ "bonuses": [{ "dmg": 1 }] }],
				"listBonusLBAS": [{ "bonuses": [{ "dmg": 1 }] }],
				"listDebuff": [{ "debuffs": [{ "amount": 0 }] }]
			}},
		},
		dewy: {},
		dewyIndex: null,
	},
	
	_UI_MAIN: null,
	_autoBonusOverride: null,
	
	init: function(dataUI) {
		this._UI_MAIN = dataUI;
		for (let key in this.PRESET_INDEX) {
			this.getPreset(key);
		}
	},
	
	_debugSlow: function(promise) {
		return new Promise(res => setTimeout(() => res(promise),2000));
	},
	
	_getFile: async function(url,keyType,keyFile) {
		if (this._cache[keyType][keyFile] && this._cache[keyType][keyFile].data) {
			return this._cache[keyType][keyFile];
		}
		if (this._cache[keyType][keyFile] && this._cache[keyType][keyFile].promise) {
			await this._cache[keyType][keyFile].promise;
		} else {
			let item = this._cache[keyType][keyFile] = {
				key: keyFile,
				data: null,
				hash: null,
				// promise: this._debugSlow( fetch(url).then(resp => resp.ok ? resp.text() : null) ),
				promise: fetch(url).then(resp => resp.ok ? resp.text() : null),
			};
			
			let txt = await item.promise;
			if (txt) {
				item.data = JSON.parse(txt);
				item.hash = COMMON.getHash(txt);
			}
			delete item.promise;
		}
		return this._cache[keyType][keyFile];
	},
	
	getPreset: function(key) {
		let url = 'js/data/bonus/' + key + '.json';
		return this._getFile(url,'preset',key);
	},
	getDewy: function(key) {
		let url = this._URL_DEWY_PATH + key + '.json';
		return this._getFile(url,'dewy',key);
	},
	
	getDewyIndex: async function(callback) {
		if (this._cache.dewyIndex) {
			return this._cache.dewyIndex;
		}
		return this._cache.dewyIndex = await fetch(this._URL_DEWY_INDEX).then(resp => resp.ok ? resp.json() : null);
	},
	getDewyName: function(key) {
		let w = key.split('-')[0], m = key.split('-')[1];
		return MAPDATA[w] && MAPDATA[w].maps[m] ? MAPDATA[w].name + ' ' + MAPDATA[w].maps[m].name : key;
	},
	
	getAutoBonusFromReplay: function(dataReplay) {
		let key = dataReplay.world + '-' + dataReplay.mapnum;
		if (!this.PRESET_INDEX[key]) return null;
		let battleLast = dataReplay.battles.at(-1);
		let autoBonus = {
			type: 'preset',
			key: key,
			nodeToLetter: {},
			useDebuff: !!(battleLast.data && battleLast.data.api_xal01),
		};
		let edgeToLetter = {}, edgesKey = 'World ' + key;
		for (let edgeId in EDGES[edgesKey]) {
			edgeToLetter[edgeId] = EDGES[edgesKey][edgeId][1];
		}
		for (let i=0; i<dataReplay.battles.length; i++) {
			autoBonus.nodeToLetter[this._UI_MAIN.battles[i].id] = edgeToLetter[dataReplay.battles[i].node] || '';
		}
		return autoBonus;
	},
	
	
	_applyAutoBonusCommonEnd: function(ship,autoBonus,isFF,bonusesTotal) {
		if ((!bonusesTotal[-1] && !isFF) || (isFF && Object.keys(bonusesTotal).length <= 0)) bonusesTotal[-1] = { dmg: 1, acc: 1, eva: 1 };
		for (let nodeId in bonusesTotal) {
			if (nodeId == -1 || isFF) {
				ship.bonusDmg = bonusesTotal[nodeId].dmg || 1;
				if (autoBonus.accEvaType == 1) {
					ship.bonusAcc = bonusesTotal[nodeId].acc || 1;
					ship.bonusEva = bonusesTotal[nodeId].eva || 1;
				}
				if (autoBonus.accEvaType == 0) {
					ship.bonusAcc = ship.bonusEva = 1;
				}
			} else {
				if (!ship.bonusByNode[nodeId]) ship.bonusByNode[nodeId] = { bonusDmg: null, bonusAcc: null, bonusEva: null };
				ship.bonusByNode[nodeId].bonusDmg = bonusesTotal[nodeId].dmg != bonusesTotal[-1].dmg ? bonusesTotal[nodeId].dmg : null;
				if (autoBonus.accEvaType == 1) {
					ship.bonusByNode[nodeId].bonusAcc = bonusesTotal[nodeId].acc != bonusesTotal[-1].acc ? bonusesTotal[nodeId].acc : null;
					ship.bonusByNode[nodeId].bonusEva = bonusesTotal[nodeId].eva != bonusesTotal[-1].eva ? bonusesTotal[nodeId].eva : null;
				}
				if (autoBonus.accEvaType == 0) {
					ship.bonusByNode[nodeId].bonusAcc = ship.bonusByNode[nodeId].bonusEva = null;
				}
			}
		}
		for (let nodeId in ship.bonusByNode) {
			if (!bonusesTotal[nodeId]) {
				ship.bonusByNode[nodeId].bonusDmg = null;
				if (autoBonus.accEvaType == 1) {
					ship.bonusByNode[nodeId].bonusAcc = ship.bonusByNode[nodeId].bonusEva = null;
				}
				if (autoBonus.accEvaType == 0) {
					ship.bonusByNode[nodeId].bonusAcc = ship.bonusByNode[nodeId].bonusEva = null;
				}
			}
		}
		if (autoBonus.accEvaType == 2) {
			ship.bonusAcc = ship.bonusEva = ship.bonusDmg;
			for (let id in ship.bonusByNode) {
				ship.bonusByNode[id].bonusAcc = ship.bonusByNode[id].bonusEva = ship.bonusByNode[id].bonusDmg;
			}
		}
		if (autoBonus.accEvaType == 3) {
			ship.bonusAcc = ship.bonusEva = 1+(ship.bonusDmg-1)/2;
			for (let id in ship.bonusByNode) {
				ship.bonusByNode[id].bonusAcc = ship.bonusByNode[id].bonusEva = ship.bonusByNode[id].bonusDmg ? 1+(ship.bonusByNode[id].bonusDmg-1)/2 : null;
			}
		}
		for (let obj of [ship].concat(Object.values(ship.bonusByNode))) {
			if (obj.bonusDmg) obj.bonusDmg = Math.round(1e10*obj.bonusDmg)/1e10;
			if (obj.bonusAcc) obj.bonusAcc = Math.round(1e10*obj.bonusAcc)/1e10;
			if (obj.bonusEva) obj.bonusEva = Math.round(1e10*obj.bonusEva)/1e10;
		}
	},
	_applyAutoBonusPresetPlaneEnd: function(ship,autoBonus,isFF,bonuses,nodeId,isLBAS) {
		let groupNum = 1;
		for (let bonus of bonuses) {
			let didBonus = false;
			for (let equip of ship.equips) {
				if (bonus.requireEquipId && !bonus.requireEquipId.includes(equip.mstId)) continue;
				if (bonus.requireEquipId && bonus.requireEquipIdNum && ship.equips.filter(eq => bonus.requireEquipId.includes(eq.mstId)).length < bonus.requireEquipIdNum) continue;
				if (bonus.requireEquipId && bonus.requireEquipIdNumX && ship.equips.filter(eq => bonus.requireEquipId.includes(eq.mstId)).length != bonus.requireEquipIdNumX) continue;
				if (bonus.requireEquipType && !bonus.requireEquipType.includes(EQDATA[equip.mstId].type)) continue;
				
				let equipObj = equip;
				if (nodeId != -1 && !isFF) {
					if (!equip.bonusByNode) equip.bonusByNode = {};
					if (!equip.bonusByNode[nodeId]) equip.bonusByNode[nodeId] = {};
					equipObj = equip.bonusByNode[nodeId];
				}
				if (!equipObj.bonusGroups) equipObj.bonusGroups = {};
				
				equipObj.bonusGroups[groupNum] = {
					bonusDmg: bonus.dmg || 1,
					bonusAcc: bonus.acc || 1,
					bonusEva: bonus.eva || 1,
					notAirOnly: !!bonus.notAirOnly,
				};
				if (autoBonus.accEvaType == 0 || autoBonus.accEvaType == 4) {
					equipObj.bonusGroups[groupNum].bonusAcc = equipObj.bonusGroups[groupNum].bonusEva = 1;
				}
				if (autoBonus.accEvaType == 2) {
					equipObj.bonusGroups[groupNum].bonusAcc = equipObj.bonusGroups[groupNum].bonusEva = equipObj.bonusGroups[groupNum].bonusDmg;
				}
				if (autoBonus.accEvaType == 3) {
					equipObj.bonusGroups[groupNum].bonusAcc = equipObj.bonusGroups[groupNum].bonusEva = Math.round(1e10*(1+(equipObj.bonusGroups[groupNum].bonusDmg-1)/2))/1e10;
				}
				if (isLBAS) {
					delete equipObj.bonusGroups[groupNum].bonusEva;
					delete equipObj.bonusGroups[groupNum].notAirOnly;
				}
				if (bonus.perEquip) {
					groupNum++;
				}
				didBonus = true;
			}
			if (!bonus.perEquip && didBonus) groupNum++;
		}
	},
	_applyAutoBonusPreset: async function(ship,autoBonus,isFF) {
		let result = await this.getPreset(autoBonus.key);
		let data = result.data;
		if (!data.listBonus) return;
		let bonusesTotal = {};
		let nodeIds = isFF ? [this._UI_MAIN.battles.at(-1).id] : [-1].concat(Object.keys(autoBonus.nodeToLetter));
		
		for (let equip of ship.equips) {
			delete equip.bonusGroups;
			if (equip.bonusByNode) {
				for (let id in equip.bonusByNode) delete equip.bonusByNode[id].bonusGroups;
			}
		}
		
		for (let nodeId of nodeIds) {
			let letter = autoBonus.nodeToLetter[nodeId];
			if (!isFF && nodeId != -1 && !data.listBonus.find(item => (item.nodes && item.nodes.includes(letter)) || (item.nodesExclude && item.nodesExclude.includes(letter)))) continue;
			
			let bonusesPlane = [];
			for (let item of data.listBonus) {
				if (item.nodes && !item.nodes.includes(letter)) continue;
				if (item.nodesExclude && item.nodesExclude.includes(letter)) continue;
				for (let bonus of item.bonuses) {
					if (bonus.unconfirmed && !autoBonus.useSpeculated) continue;
					if (bonus.shipType && !bonus.shipType.includes(COMMON.shipTypeHullToId[SHIPDATA[ship.mstId].type])) continue;
					if (bonus.shipClass && !bonus.shipClass.includes(SHIPDATA[ship.mstId].sclass)) continue;
					if (bonus.shipBase && !bonus.shipBase.includes(window.getBaseId(ship.mstId))) continue;
					if (bonus.shipId && !bonus.shipId.includes(ship.mstId)) continue;
					if (bonus.isPlane) {
						bonusesPlane.push(bonus);
						continue;
					}
					let numBonus = 0;
					if (bonus.requireEquipId) {
						numBonus = ship.equips.filter((eq,i) => bonus.requireEquipId.includes(eq.mstId) && (!bonus.requireSlot || ship.slots[i]) && (eq.level || 0) >= (bonus.requireEquipLevel || 0)).length;
						if (numBonus < (bonus.requireEquipIdNum || 1)) continue;
					}
					if (bonus.requireEquipType) {
						numBonus = ship.equips.filter((eq,i) => bonus.requireEquipType.includes(EQDATA[eq.mstId].type) && (!bonus.requireSlot || ship.slots[i])).length;
						if (numBonus < (bonus.requireEquipTypeNum || 1)) continue;
					}
					if (!bonus.perEquip) numBonus = 1;
					if (!bonusesTotal[nodeId]) bonusesTotal[nodeId] = { dmg: null, acc: null, eva: null };
					for (let key in bonusesTotal[nodeId]) {
						if (bonus[key] == null) continue;
						if (bonusesTotal[nodeId][key] == null) bonusesTotal[nodeId][key] = 1;
						for (let i=0; i<numBonus; i++) {
							bonusesTotal[nodeId][key] *= bonus[key];
						}
					}
				}
			}
			if (bonusesPlane.length) {
				this._applyAutoBonusPresetPlaneEnd(ship,autoBonus,isFF,bonusesPlane,nodeId);
			}
		}
		this._applyAutoBonusCommonEnd(ship,autoBonus,isFF,bonusesTotal);
	},
	_applyAutoBonusDewy: async function(ship,autoBonus,isFF) {
		if (autoBonus.files.length <= 0) return;
		let results = await Promise.all(autoBonus.files.map(file => this.getDewy(file.key)));
		
		let letterToBonus = {};
		for (let i=0; i<autoBonus.files.length; i++) letterToBonus[autoBonus.files[i].key.split('/')[1]] = results[i].data;
		let bonusesTotal = {};
		let nodeIds = isFF ? [this._UI_MAIN.battles.at(-1).id] : [-1].concat(Object.keys(autoBonus.nodeToLetter));
		for (let nodeId of nodeIds) {
			let letter = autoBonus.nodeToLetter[nodeId];
			if (!letterToBonus[letter]) continue;
			if (!letterToBonus[letter][ship.mstId]) continue;
			let bonus = letterToBonus[letter][ship.mstId];
			bonusesTotal[nodeId] = { dmg: null, acc: null, eva: null };
			if (+autoBonus.dmgType == 1) {
				bonusesTotal[nodeId].dmg = bonus[0];
			} else if (+autoBonus.dmgType == 2) {
				bonusesTotal[nodeId].dmg = bonus[1];
			} else {
				bonusesTotal[nodeId].dmg = (bonus[0] + bonus[1])/2;
			}
			if (bonusesTotal[nodeId].dmg < 1.02) bonusesTotal[nodeId].dmg = 1;
		}
		this._applyAutoBonusCommonEnd(ship,autoBonus,isFF,bonusesTotal);
	},
	
	applyAutoBonusShip: function(ship,isFF) {
		if (FLEET_MODEL.shipIsEmpty(ship)) return;
		let autoBonus = this._autoBonusOverride || this._UI_MAIN.autoBonus;
		if (!autoBonus) return;
		if (autoBonus.type == 'preset') {
			this._applyAutoBonusPreset(ship,autoBonus,isFF);
		}
		if (autoBonus.type == 'dewy') {
			this._applyAutoBonusDewy(ship,autoBonus,isFF);
		}
	},
	applyAutoBonusFleet: function(fleet) {
		for (let key of ['ships','shipsEscort']) {
			if (!fleet[key]) continue;
			for (let ship of fleet[key]) {
				this.applyAutoBonusShip(ship,fleet.isFriend);
			}
		}
	},
	
	applyAutoLBAS: async function(indOnly) {
		let autoBonus = this._autoBonusOverride || this._UI_MAIN.autoBonus;
		if (!autoBonus) return;
		if (autoBonus.type != 'preset') return;
		
		let result = await this.getPreset(autoBonus.key);
		if (!result.data.listBonusLBAS) return;
		
		let baseToNode = {};
		for (let battle of this._UI_MAIN.battles) {
			for (let i=0; i<battle.lbasWaves.length; i++) {
				if (!battle.lbasWaves[i]) continue;
				let indBase = Math.floor(i/2);
				baseToNode[indBase] = battle.id; //does not handle split waves, uses only closest-to-end node
			}
		}
		for (let base of this._UI_MAIN.landBases) {
			if (indOnly != null && base.ind != indOnly) continue;
			let equipsAll = base.equips.filter(eq => !FLEET_MODEL.equipIsEmpty(eq));
			for (let eq of equipsAll) {
				if (FLEET_MODEL.equipIsEmpty(eq)) continue;
				eq.bonusDmg = 1;
				if (autoBonus.accEvaType == 1) eq.bonusAcc = 1;
				delete eq.bonusGroups;
			}
			let letter = autoBonus.nodeToLetter[baseToNode[base.ind]];
			let bonusesPlane = [];
			for (let item of result.data.listBonusLBAS) {
				if (item.nodes && !item.nodes.includes(letter)) continue;
				if (item.nodesExclude && item.nodesExclude.includes(letter)) continue;
				for (let bonus of item.bonuses.filter(b => !b.isPlane)) {
					let equipsBonus = [];
					if (bonus.requireEquipId) {
						equipsBonus = equipsAll.filter((eq,i) => bonus.requireEquipId.includes(eq.mstId) && (!bonus.requireSlot || base.slots[i]));
						if (equipsBonus.length <= 0) continue;
					}
					if (bonus.requireEquipType) {
						equipsBonus = equipsAll.filter((eq,i) => bonus.requireEquipType.includes(EQDATA[eq.mstId].type) && (!bonus.requireSlot || base.slots[i]));
						if (equipsBonus.length <= 0) continue;
					}
					let numBonus = bonus.basewide && bonus.perEquip ? equipsBonus.length : 1;
					let equipsApply = bonus.basewide ? equipsAll : equipsBonus;
					for (let eq of equipsApply) {
						for (let i=0; i<numBonus; i++) {
							eq.bonusDmg *= bonus.dmg;
							if (autoBonus.accEvaType == 1 && bonus.acc) eq.bonusAcc *= bonus.acc;
						}
					}
				}
				this._applyAutoBonusPresetPlaneEnd(base,autoBonus,false,item.bonuses.filter(b => b.isPlane),-1,true);
			}
			for (let eq of equipsAll) {
				eq.bonusDmg = Math.round(1e10*eq.bonusDmg)/1e10;
				if (autoBonus.accEvaType == 0) eq.bonusAcc = 1;
				if (autoBonus.accEvaType == 2) eq.bonusAcc = eq.bonusDmg;
				if (autoBonus.accEvaType == 3) eq.bonusAcc = 1+(eq.bonusDmg-1)/2;
				if (autoBonus.accEvaType == 1 || autoBonus.accEvaType == 3) eq.bonusAcc = Math.round(1e10*eq.bonusAcc)/1e10;
			}
		}
	},
	
	applyAutoDebuff: async function(fleetOnly,shipOnly) {
		let autoBonus = this._autoBonusOverride || this._UI_MAIN.autoBonus;
		if (!autoBonus) return;
		if (autoBonus.type != 'preset') return;
		
		let result = await this.getPreset(autoBonus.key);
		if (!result.data.listDebuff) return;
		
		for (let item of result.data.listDebuff) {
			for (let battle of this._UI_MAIN.battles) {
				let letter = autoBonus.nodeToLetter[battle.id];
				if (item.nodes && !item.nodes.includes(letter)) continue;
				if (item.nodesExclude && item.nodesExclude.includes(letter)) continue;
				for (let comp of battle.enemyComps) {
					if (FLEET_MODEL.fleetIsEmpty(comp.fleet)) continue;
					if (fleetOnly && comp.fleet != fleetOnly) continue;
					for (let keyShips of ['ships','shipsEscort']) {
						if (!comp.fleet[keyShips]) continue;
						for (let ship of comp.fleet[keyShips]) {
							if (FLEET_MODEL.shipIsEmpty(ship)) continue;
							if (shipOnly && ship != shipOnly) continue;
							for (let debuff of item.debuffs) {
								if (debuff.shipId && !debuff.shipId.includes(ship.mstId)) continue;
								ship.statsBase.ar = autoBonus.useDebuff ? Math.max(1, SHIPDATA[ship.mstId].AR - debuff.amount) : SHIPDATA[ship.mstId].AR;
							}
						}
					}
				}
			}
		}
	},
	
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
	applyAutoAll: function(dmgOnly) {
		if (dmgOnly && (this._UI_MAIN.autoBonus.accEvaType == 0 || this._UI_MAIN.autoBonus == 1)) {
			this._autoBonusOverride = this._copyObj(this._UI_MAIN.autoBonus);
			this._autoBonusOverride.accEvaType = -1;
		}
		this.applyAutoBonusFleet(this._UI_MAIN.fleetFMain);
		for (let comp of this._UI_MAIN.fleetsFFriend) {
			this.applyAutoBonusFleet(comp.fleet);
		}
		this.applyAutoLBAS();
		this.applyAutoDebuff();
		this._autoBonusOverride = null;
	},
	
	resetAll: function() {
		this._autoBonusOverride = { type: 'preset', key: 'none', accEvaType: 2, useDebuff: true, nodeToLetter: {} };
		this.applyAutoAll();
		this._autoBonusOverride = null;
	},
};

})()