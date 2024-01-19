(() => {
	
var CONST = window.COMMON.getConst({
	shipTypeIdToHull: { 1:'DE',2:'DD',3:'CL',4:'CLT',5:'CA',6:'CAV',7:'CVL',8:'FBB',9:'BB',10:'BBV',11:'CV',13:'SS',14:'SSV',15:'AT',16:'AV',17:'LHA',18:'CVB',19:'AR',20:'AS',21:'CT',22:'AO' },

	numSimDefault: 1000,
	numSimMax: 100000,
	numSimStep: 500,
	
	errorText: {
		'bad_data': { txt: 'Bad format data' },
		'no_ship_stats': { txt: 'Unknown ship: <0>, stats required' },
		'no_equip_stats': { txt: 'Unknown equip: <0>, stats required' },
		'no_fleet_f': { txt: 'Player fleet has no ships.' },
		'no_fleet_e': { txt: 'Node <0> Enemy fleet has no ships.' },
		'no_fleetc_f': { txt: 'Player escort fleet has no ships.' },
		'no_fleetc_e': { txt: 'Node <0> Enemy escort fleet has no ships.' },
		'no_combinetype': { txt: 'Unsupported combineType: <0>' },
		'bad_ship_type': { txt: 'Invalid ship type: <0>' },
		'bad_formation': { txt: 'Invalid formation: <0>' },
		'no_fcf_retreat': { txt: 'Initial fleet does not meet set FCF Settings requirements' },
		'no_smoke': { txt: 'Smoke activation is currently disabled, see Show Advanced for settings' },
		
		'warn_unknown_equiptype': { txt: 'Warning: Unknown equip type - <0>, effects may be missing' },
		'warn_unknown_ship': { txt: 'Warning: Unknown ship - <0>, unique effects may be missing' },
		'warn_unknown_equip': { txt: 'Warning: Unknown equip - <0>, unique effects may be missing' },
		'warn_ship_unknownstats': { txt: 'Warning: Real ship stats currently not known - <0>', excludeClient: true },
		'warn_bad_mechanic': { txt: 'Warning: Invalid mechanic: <0>' },
		'warn_bad_const': { txt: 'Warning: Invalid const: <0>' },
		'warn_no_nb': { txt: 'Warning: Night Battle not enabled on last node, intentional?' },
		'warn_nb_preboss': { txt: 'Warning: Night Battle enabled on Node <0> before last node, intentional?' },
		'warn_no_subonly': { txt: 'Warning: Sub-only supply cost not enabled on Node <0>, intentional?' },
		'warn_vanguard': { txt: 'Note: Destroyers have different vanguard evasion mods in event maps, see "Show Advanced" if simulating event maps', excludeImport: true },
		'warn_enemy_unset_stats': { txt: 'Warning: Node <0> has enemies with unknown and unset evasion/luck stats (still set to 0/1).', excludeImport: true },
		'warn_debuff_dmg': { txt: 'Warning: "Debuff Dmg" is a legacy setting and may be inaccurate to the mechanic, recommended to modify enemy\'s Armour stat instead.' },
	},
});
	
var SIM = {
	_results: null,
	_errors: [],
	_warnings: [],
	_saveErrors: true,
	_compListsEnemy: [],
	_compListFF: null,
	_inputPrev: {},
	_unsetEnemy: null,
	
	cancelRun: false,

	_addError: function(key,args) {
		let txt = CONST.errorText[key].txt;
		if (args) {
			for (let i=0; i<args.length; i++) {
				txt = txt.replace('<'+i+'>',(args[i] != null ? args[i].toString() : 'undefined'));
			}
		}
		if (this._saveErrors) {
			this._errors.push({ txt: txt, excludeClient: !!CONST.errorText[key].excludeClient, excludeImport: !!CONST.errorText[key].excludeImport });
		} else {
			console.log('error: ' + txt);
		}
	},
	_addWarning: function(key,args) {
		let txt = CONST.errorText[key].txt;
		if (args) {
			for (let i=0; i<args.length; i++) {
				txt = txt.replace('<'+i+'>',(args[i] != null ? args[i].toString() : 'undefined'));
			}
		}
		if (this._saveErrors) {
			this._warnings.push({ txt: txt, excludeClient: !!CONST.errorText[key].excludeClient, excludeImport: !!CONST.errorText[key].excludeImport });
		} else {
			console.log('warning: ' + txt);
		}
	},
	
	_getResults: function() {
		return this._results;
	},
	_resetResults: function(numNodes) {
		this._results = {
			totalnum: 0,
			totalFuelS: 0,
			totalAmmoS: 0,
			totalBauxS: 0,
			totalFuelR: 0,
			totalSteelR: 0,
			totalBuckets: 0,
			totalDamecon: 0,
			totalGaugeDamage: 0,
			totalEmptiedPlanes: 0,
			totalEmptiedLBAS: 0,
			totalTransport: 0,
			nodes: [],
		};
		for (let n=0; n<numNodes; n++) {
			this._results.nodes.push({
				num: 0,
				ranks: { 'S': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0 },
				flagsunk: 0,
				mvps: [0,0,0,0,0,0,0],
				mvpsC: [0,0,0,0,0,0],
				taiha: 0,
				taihaIndiv: [0,0,0,0,0,0,0],
				taihaIndivC: [0,0,0,0,0,0],
				undamaged: 0,
				airStates: [0,0,0,0,0],
			});
		}
	},
	_updateResultsNode: function(resultSim,battleInd) {
		let rNode = this._results.nodes[battleInd];
		rNode.num++;
		rNode.ranks[resultSim.rank]++;
		rNode.flagsunk += +!!resultSim.flagsunk;
		rNode.mvps[resultSim.MVP]++;
		if (resultSim.MVPC != null) rNode.mvpsC[resultSim.MVPC]++;
		rNode.taiha += +!!resultSim.redded;
		for (let i=0; i<resultSim.reddedIndiv.length; i++) {
			rNode.taihaIndiv[i] += +!!resultSim.reddedIndiv[i];
		}
		if (resultSim.reddedIndivC) {
			for (let i=0; i<resultSim.reddedIndivC.length; i++) {
				rNode.taihaIndivC[i] += +!!resultSim.reddedIndivC[i];
			}
		}
		rNode.undamaged += +!!resultSim.undamaged;
		rNode.airStates[FLEETS1[0].AS+2] += 1;
		if (battleInd == this._results.nodes.length-1 && (resultSim.rank == 'S' || resultSim.rank == 'A')) {
			let tp = FLEETS1[0].getTransport();
			if (FLEETS1[1]) tp += FLEETS1[1].getTransport();
			if (resultSim.rank == 'A') tp = Math.floor(tp*.7);
			this._results.totalTransport += tp;
		}
	},
	_updateResultsTotal: function(dataInput) {
		this._results.totalnum++;
		for (let fleet of FLEETS1) {
			if (!fleet) continue;
			for (let ship of fleet.ships) {
				let repairTime = window.getRepairTime(ship);
				let useBucket = (ship.HP/ship.maxHP <= window.BUCKETPERCENT || repairTime > window.BUCKETTIME) && repairTime >= (dataInput.bucketTimeIgnore || 0);
				if (!window.CARRYOVERHP || useBucket) {
					let cost = window.getRepairCost(ship);
					this._results.totalFuelR += cost[0];
					this._results.totalSteelR += cost[1];
				}
				if (useBucket) this._results.totalBuckets++;
				let fuelleft = ship.fuelleft - (ship._fuelUnderway || 0);
				let ammoleft = ship.ammoleft - (ship._ammoUnderway || 0);
				let costFuel = Math.round(ship.fuel * (10-fuelleft)/10);
				let costAmmo = Math.round(ship.ammo * (10-ammoleft)/10);
				if (ship.LVL >= 100) {
					costFuel = Math.floor(costFuel*.85) || 1;
					costAmmo = Math.floor(costAmmo*.85) || 1;
				}
				this._results.totalFuelS += costFuel;
				this._results.totalAmmoS += costAmmo;
				for (let i=0; i<ship.PLANESLOTS.length; i++) {
					this._results.totalBauxS += 5*(ship.PLANESLOTS[i]-ship.planecount[i]);
					this._results.totalEmptiedPlanes += +!!(ship.PLANESLOTS[i] && ship.planecount[i] <= 0);
				}
				this._results.totalSteelR += ship.jetSteelCost || 0;
				if (ship.repairs) this._results.totalDamecon += ship.repairsOrig.length - ship.repairs.length;
			}
		}
		for (let fleet of [FLEETS1S[0],FLEETS1S[1]]) {
			if (!fleet) continue;
			for (let ship of fleet.ships) {
				this._results.totalFuelS += Math.floor(ship.fuel*.5);
				this._results.totalAmmoS += Math.floor(ship.ammo*(fleet.supportType == 1 && fleet.useAirSupportCost ? .4 : .8));
				for (let i=0; i<ship.PLANESLOTS.length; i++) {
					this._results.totalBauxS += 5*(ship.PLANESLOTS[i]-ship.planecount[i]);
				}
				this._results.totalSteelR += ship.jetSteelCost || 0;
			}
		}
		let lbasUsed = [];
		for (let node of this._inputPrev.nodes) {
			if (node.lbas) {
				for (let num of node.lbas) {
					if (!lbasUsed.includes(num)) lbasUsed.push(num);
				}
			}
		}
		for (let num of lbasUsed) {
			let base = LBAS[num-1];
			if (!base) continue;
			let cost = base.getCost();
			this._results.totalFuelS += cost[0];
			this._results.totalAmmoS += cost[1];
			this._results.totalBauxS += cost[2];
			for (let equip of base.equips) {
				if (equip.emptied) this._results.totalEmptiedLBAS++;
			}
		}
		let shipBossFlag = FLEETS2.at(-1).ships[0];
		this._results.totalGaugeDamage += shipBossFlag.maxHP - Math.max(0,shipBossFlag.HP);
	},

	_inputEquivalent: function(v1,v2) {
		if (Array.isArray(v1) && Array.isArray(v2)) {
			if (v1.length != v2.length) return false;
			for (let i=0; i<v1.length; i++) {
				if (!this._inputEquivalent(v1[i],v2[i])) return false;
			}
			return true;
		} else if (typeof v1 === 'object' && v1 !== null && typeof v2 === 'object' && v2 !== null) {
			let keys = {};
			for (let key in v1) keys[key] = 1;
			for (let key in v2) keys[key] = 1;
			for (let key in keys) {
				if (!this._inputEquivalent(v1[key],v2[key])) return false;
			}
			return true;
		} else {
			return v1 === v2 || (v1 == null && v2 == null);
		}
	},
	
	_rollComp: function(compsList) {
		if (!compsList.length) return null;
		let weightTotal = compsList.reduce((a,b) => a + (b.weight || 0),0);
		if (weightTotal <= 0) {
			return compsList[Math.floor(Math.random()*compsList.length)].fleet;
		}
		let roll = Math.random()*weightTotal;
		for (let comp of compsList) {
			if (roll < comp.weight) return comp.fleet;
			roll -= comp.weight;
		}
		return null;
	},
	
	_setBonuses: function(shipSim,bonuses,bonusesDebuff,debuffOnId) {
		shipSim.bonusSpecial = shipSim.bonusSpecialAcc = shipSim.bonusSpecialEv = null;
		if (bonuses) {
			if (bonuses.bonusDmg != null && bonuses.bonusDmg != 1) shipSim.bonusSpecial = [{mod:bonuses.bonusDmg}];
			if (bonuses.bonusAcc != null && bonuses.bonusAcc != 1) shipSim.bonusSpecialAcc = [{mod:bonuses.bonusAcc}];
			if (bonuses.bonusEva != null && bonuses.bonusEva != 1) shipSim.bonusSpecialEv = [{mod:bonuses.bonusEva}];
		}
		if (bonusesDebuff) {
			if (bonusesDebuff.bonusDmg != null && bonusesDebuff.bonusDmg != 1) {
				if (!shipSim.bonusSpecial) shipSim.bonusSpecial = [];
				shipSim.bonusSpecial.push({ mod: bonusesDebuff.bonusDmg, on: [debuffOnId] });
			}
		}
	},
	
	
	
	_getSimEquipLists: function(equipsInput) {
		let result = { equips: [], improves: [], profs: [] };
		for (let equipInput of equipsInput) {
			if (!EQDATA[equipInput.masterId]) {
				if (equipInput.stats) {
					EQDATA[equipInput.masterId] = {};
					for (let stat in equipInput.stats) EQDATA[equipInput.masterId][stat] = equipInput.stats[stat];
					this._addWarning('warn_unknown_equip',[equipInput.masterId]);
					if (!EQTDATA[equipInput.stats.type]) {
						this._addWarning('warn_unknown_equiptype',[equipInput.stats.type]);
						EQDATA[equipInput.masterId].type = 99;
					}
				} else {
					this._addError('no_equip_stats',[equipInput.masterId]);
					continue;
				}
			}
			result.equips.push(equipInput.masterId);
			result.improves.push(equipInput.improve);
			result.profs.push(equipInput.proficiency);
		}
		return result;
	},
	_getSimShips: function(shipsInput,side,isSupport) {
		let shipsSim = [];
		for (let shipInput of shipsInput) {
			let stats = { HP: 0, FP: 0, TP: 0, AA: 0, AR: 0, LUK: 0, EV: 0, ASW: 0, LOS: 0, RNG: 0, SPD: 0, TACC: null, SLOTS: [] };
			let sdata = SHIPDATA[shipInput.masterId];
			let ShipType = null;
			let level = Math.max(0,shipInput.LVL) || (COMMON.isShipIdPlayable(shipInput.masterId) ? 99 : 1);
			if (sdata) {
				if (!shipInput.LVL && level == 1 && (sdata.type == 'SS' || sdata.type == 'SSV')) level = 50;
				stats.HP = COMMON.getHP(sdata.HP,sdata.HPmax,level);
				stats.FP = sdata.FP;
				stats.TP = sdata.TP;
				stats.AA = sdata.AA;
				stats.AR = sdata.AR;
				stats.LUK = sdata.LUK;
				stats.EV = (sdata.EVbase != null)? COMMON.getScaledStat(sdata.EVbase,sdata.EV,level) : sdata.EV;
				stats.ASW = (sdata.ASWbase != null)? COMMON.getScaledStat(sdata.ASWbase,sdata.ASW,level) : sdata.ASW;
				stats.LOS = (sdata.LOSbase != null)? COMMON.getScaledStat(sdata.LOSbase,sdata.LOS,level) : sdata.LOS;
				stats.RNG = sdata.RNG;
				stats.SPD = sdata.SPD;
				stats.SLOTS = sdata.SLOTS.slice();
				ShipType = window[sdata.type];
			}
			if (shipInput.stats) {
				for (let stat in stats) {
					if (shipInput.stats[stat] != null) stats[stat] = shipInput.stats[stat];
				}
				if (shipInput.stats.type) {
					let overrideType = (typeof shipInput.stats.type === 'number')? CONST.shipTypeIdToHull[shipInput.stats.type] : shipInput.stats.type;
					if (window[overrideType]) {
						ShipType = window[overrideType];
					} else {
						this._addError('bad_ship_type',[shipInput.stats.type]);
						continue;
					}
				}
				if (!sdata) {
					SHIPDATA[shipInput.masterId] = {};
					for (let stat in stats) SHIPDATA[shipInput.masterId][stat] = stats[stat];
					for (let stat in shipInput.stats) SHIPDATA[shipInput.masterId][stat] = shipInput.stats[stat];
				}
			}
			if (!ShipType || !stats.HP || !SHIPDATA[shipInput.masterId]) {
				this._addError('no_ship_stats',[shipInput.masterId]);
				continue;
			} else if (sdata && sdata.unknownstats) {
				this._addWarning('warn_ship_unknownstats',[shipInput.masterId]);
			} else if (!sdata) {
				this._addWarning('warn_unknown_ship',[shipInput.masterId]);
			}
			if (this._unsetEnemy && !this._unsetEnemy.found && sdata && sdata.unknownstats && (stats.EV == 0 || stats.LUK <= 1)) {
				this._addWarning('warn_enemy_unset_stats',[this._unsetEnemy.node]);
				this._unsetEnemy.found = true;
			}
			
			sdata = SHIPDATA[shipInput.masterId];
			let shipSim = new ShipType(shipInput.masterId,sdata.name,side,level,stats.HP,stats.FP,stats.TP,stats.AA,stats.AR,stats.EV,stats.ASW,stats.LOS,stats.LUK,stats.RNG,stats.SLOTS);
			if (stats.TACC) shipSim.TACC = stats.TACC;
			if (shipInput.HPInit != null) shipSim.HPDefault = shipInput.HPInit;
			if (shipInput.morale != null) shipSim.moraleDefault = shipSim.morale = shipInput.morale;
			if (shipInput.fuelInit != null) shipSim.fuelleft = shipSim.fuelDefault = sdata.fuel ? 10*Math.round(sdata.fuel*shipInput.fuelInit)/sdata.fuel : 10*shipInput.fuelInit;
			if (shipInput.ammoInit != null) shipSim.ammoleft = shipSim.ammoDefault = sdata.ammo ? 10*Math.round(sdata.ammo*shipInput.ammoInit)/sdata.ammo : 10*shipInput.ammoInit;
			if (shipInput.isFaraway) shipSim.isFaraway = true;
			
			if (shipInput.equips) {
				let r = this._getSimEquipLists(shipInput.equips);
				if (isSupport) r.profs = [];
				shipSim.loadEquips(r.equips,r.improves,r.profs,!shipInput.includesEquipStats);
			} else if (sdata.EQUIPS) {
				shipSim.loadEquips(sdata.EQUIPS,[],[],true);
			}
			for (let i=shipSim.PLANESLOTS.length; i<shipSim.equips.length; i++) {
				shipSim.PLANESLOTS.push(0);
				shipSim.planecount.push(0);
			}
			
			this._setBonuses(shipSim,shipInput.bonuses);
			
			shipSim._dataOrig = shipInput;
			
			shipsSim.push(shipSim);
		}
		return shipsSim;
	},
	_getSimFleet: function(fleetInput,side,isSupport) {
		let result = null;
		if (fleetInput) {
			let fleetSim = new Fleet(side);
			let shipsSim = this._getSimShips(fleetInput.ships,side,isSupport);
			if (!shipsSim.length) return null;
			fleetSim.loadShips(shipsSim);
			if (fleetInput.shipsC) {
				let fleetSimC = new Fleet(side,fleetSim);
				let shipsSimC = this._getSimShips(fleetInput.shipsC,side,isSupport);
				if (shipsSimC.length) fleetSimC.loadShips(shipsSimC);
				else fleetSim.combinedWith = null;
			}
			let formDef = fleetInput.shipsC ? 14 : 1;
			fleetSim.setFormation(fleetInput.formation || formDef, fleetInput.combineType || 1);
			if (!fleetSim.formation) {
				this._addError('bad_formation',[fleetInput.formation]);
			}
			fleetSim.reset();
			if (fleetSim.combinedWith) fleetSim.combinedWith.reset();
			result = fleetSim;
		}
		return result;
	},
	_getSimLBAS: function(lbasInput) {
		let result = [];
		if (lbasInput) {
			for (let baseInput of lbasInput) {
				let baseSim = null;
				if (baseInput) {
					let r = this._getSimEquipLists(baseInput.equips);
					if (r.equips.length) {
						baseSim = new LandBase(r.equips,r.improves,r.profs);
						if (baseInput.slots) {
							baseSim.PLANESLOTS = baseInput.slots.slice();
							baseSim.planecount = baseInput.slots.slice();
						}
						for (let i=0; i<baseSim.equips.length; i++) {
							let bonuses = baseInput.equips[i].bonuses;
							if (!bonuses) continue;
							if (bonuses.bonusDmg) baseSim.equips[i].bonusSpecialP = { 1: bonuses.bonusDmg };
							if (bonuses.bonusAcc) baseSim.equips[i].bonusSpecialAccP = { 1: bonuses.bonusAcc };
						}
					}
				}
				result.push(baseSim);
			}
		}
		return result;
	},
	_setMechanics: function(dataInput) {
		if (dataInput.mechanics) {
			for (let key in dataInput.mechanics) {
				if (key.indexOf('enable_') == 0) continue;
				if (MECHANICS[key] !== undefined) {
					MECHANICS[key] = dataInput.mechanics[key];
				} else {
					this._addWarning('warn_bad_mechanic',[key]);
				}
			}
			if (dataInput.mechanics.enable_echelon != null) window.toggleEchelon(dataInput.mechanics.enable_echelon);
			if (dataInput.mechanics.enable_DDCI != null) window.toggleDDCIBuff(dataInput.mechanics.enable_DDCI);
			if (dataInput.mechanics.enable_ASWPlaneAir != null) window.toggleASWPlaneAir(dataInput.mechanics.enable_ASWPlaneAir);
			if (dataInput.mechanics.enable_AACIRework != null) window.toggleAACIRework(dataInput.mechanics.enable_AACIRework);
		}
		
		if (dataInput.consts) {
			for (let key in dataInput.consts) {
				if (SIMCONSTS[key] !== undefined) {
					SIMCONSTS[key] = Array.isArray(dataInput.consts[key]) ? dataInput.consts[key].slice() : dataInput.consts[key];
				} else {
					this._addWarning('warn_bad_const',[key]);
				}
			}
		}
	},
	_load: function(dataInput) {
		this._saveErrors = true;
		this._errors = [];
		this._warnings = [];
		this._unsetEnemy = null;
		
		this._setMechanics(dataInput);
		
		if (dataInput.nodes.find(node => node.useSmoke) && !SIMCONSTS.smokeChance.reduce((a,b)=>a+b,0)) {
			this._addError('no_smoke');
		}
		
		FLEETS1[0] = this._getSimFleet(dataInput.fleetF,0);
		if (!FLEETS1[0]) {
			this._addError('no_fleet_f');
			return;
		}
		if (dataInput.fleetF.combineType && !FLEETS1[0].combinedWith) {
			this._addError('no_fleetc_f');
			return;
		}
		if (FLEETS1[0].combinedWith && (!dataInput.fleetF.combineType || ![1,2,3].includes(+dataInput.fleetF.combineType))) {
			this._addError('no_combinetype',[dataInput.fleetF.combineType]);
			return;
		}
		if (FLEETS1[0].combinedWith) FLEETS1[1] = FLEETS1[0].combinedWith;
		FLEETS1S[0] = this._getSimFleet(dataInput.fleetSupportN,0,true);
		FLEETS1S[1] = this._getSimFleet(dataInput.fleetSupportB,0,true);
		LBAS = this._getSimLBAS(dataInput.lbas);
		
		if (FLEETS1S[0] && FLEETS1S[0].getSupportType() == 0) FLEETS1S[0] = null;
		if (FLEETS1S[1] && FLEETS1S[1].getSupportType() == 0) FLEETS1S[1] = null;
		if (FLEETS1S[1]) FLEETS1S[1].supportBoss = true;
		
		FLEETS1S[2] = null;
		this._compListFF = null;
		if (dataInput.fleetFriendComps && dataInput.fleetFriendComps.length >= 2) {
			this._compListFF = [];
			for (let comp of dataInput.fleetFriendComps) {
				this._compListFF.push({ fleet: this._getSimFleet(comp.fleet,0), weight: comp.weight || 0 });
			}
		} else if (dataInput.fleetFriendComps) {
			FLEETS1S[2] = this._getSimFleet(dataInput.fleetFriendComps[0].fleet,0);
		} else if (dataInput.fleetFriend) {
			FLEETS1S[2] = this._getSimFleet(dataInput.fleetFriend,0);
		}
		
		FLEETS2 = [];
		this._compListsEnemy = [];
		for (let i=0; i<dataInput.nodes.length; i++) {
			this._unsetEnemy = { node: i+1, found: false };
			let node = dataInput.nodes[i];
			if (node.fleetEComps && node.fleetEComps.length >= 2) {
				let compsE = [];
				for (let comp of node.fleetEComps) {
					compsE.push({ fleet: this._getSimFleet(comp.fleet,1), weight: comp.weight || 0 });
				}
				this._compListsEnemy.push(compsE);
				FLEETS2[i] = null;
			} else if (node.fleetEComps) {
				this._compListsEnemy.push(null);
				FLEETS2[i] = this._getSimFleet(node.fleetEComps[0].fleet,1);
			} else if (node.fleetE) {
				this._compListsEnemy.push(null);
				FLEETS2[i] = this._getSimFleet(node.fleetE,1);
			} else {
				this._addError('no_fleet_e',[i+1]);
			}
			
			let fleetsSimE = [];
			if (this._compListsEnemy[i]) {
				for (let j=0; j<node.fleetEComps.length; j++) {
					if (!this._compListsEnemy[i][j].fleet) {
						this._addError('no_fleet_e',[i+1]);
					} else {
						if (node.fleetEComps[j].fleet.shipsC && !this._compListsEnemy[i][j].fleet.combinedWith) this._addError('no_fleetc_e',[i+1]);
						fleetsSimE.push(this._compListsEnemy[i][j].fleet);
					}
				}
			} else {
				if (!FLEETS2[i]) {
					this._addError('no_fleet_e',[i+1]);
				} else {
					let fleetE = node.fleetEComps ? node.fleetEComps[0].fleet : node.fleetE;
					if (fleetE.shipsC && !FLEETS2[i].combinedWith) this._addError('no_fleetc_e',[i+1]);
					fleetsSimE.push(FLEETS2[i]);
				}
			}
			if (!node.noAmmo && fleetsSimE.every(fleetSim => !fleetSim.combinedWith && fleetSim.ships.every(ship => (ship.type == 'SS' || ship.type == 'SSV') && !ship.isFaraway))) {
				this._addWarning('warn_no_subonly',[i+1]);
			}
		}
		
		window.DORETREAT = !dataInput.continueOnTaiha;
		window.CARRYOVERHP = !!dataInput.carryOverHP;
		window.CARRYOVERMORALE = !!dataInput.carryOverMorale;
		if (dataInput.bucketHPPercent != null) window.BUCKETPERCENT = dataInput.bucketHPPercent/100;
		if (dataInput.bucketTime != null) window.BUCKETTIME = dataInput.bucketTime*3600;
		
		if (dataInput.didSpecial) MECHANICS.specialAttacks = false;
		
		let nodeLast = dataInput.nodes.at(-1);
		if (dataInput.nodes.length > 1 && !nodeLast.doNB && !nodeLast.NBOnly && !nodeLast.airRaid) {
			this._addWarning('warn_no_nb');
		}
		for (let i=0; i<dataInput.nodes.length-1; i++) {
			let node = dataInput.nodes[i];
			if (node.doNB && !node.NBOnly && !node.airRaid) {
				this._addWarning('warn_nb_preboss',[i+1]);
			}
		}
		
		let hasVanguard = dataInput.fleetF.formation == 6;
		if (!hasVanguard) {
			for (let node of dataInput.nodes) {
				if (node.formationOverride == 6 || (node.fleetE && node.fleetE.formation == 6) || (node.fleetEComps && node.fleetEComps.find(comp => comp.fleet && comp.fleet.formation == 6))) {
					hasVanguard = true;
					break;
				}
			}
		}
		if (hasVanguard) {
			this._addWarning('warn_vanguard');
		}
		
		let shipsAll = dataInput.fleetF.ships;
		if (dataInput.fleetF.shipsC) shipsAll = shipsAll.concat(dataInput.fleetF.shipsC);
		if (dataInput.fleetFriendComps) {
			for (let comp of dataInput.fleetFriendComps) {
				if (comp.fleet && comp.fleet.ships) shipsAll = shipsAll.concat(comp.fleet.ships);
			}
		}
		if (shipsAll.find(ship => ship.bonusesDebuff && ship.bonusesDebuff.bonusDmg != null && ship.bonusesDebuff.bonusDmg != 1)) {
			this._addWarning('warn_debuff_dmg');
		}
		
		if (dataInput.settingsFCF) {
			if (!this._checkSettingsFCF(dataInput.settingsFCF,FLEETS1[0])) {
				this._addError('no_fcf_retreat');
			} else {
				if (dataInput.settingsFCF.rules) {
					for (let rule of dataInput.settingsFCF.rules) {
						if (!rule.types) continue;
						if (rule.types.includes('XX')) {
							rule.types = ['XX'];
						} else {
							rule.types = rule.types.filter((type,i,a) => a.indexOf(type) == i && COMMON.shipTypeHullToId[type]);
						}
					}
				}
			}
		}
	},
	
	_checkSettingsFCF: function(settingsFCF,fleetF,battleInd=-1) {
		if (settingsFCF.los != null && (!settingsFCF.losNode || battleInd+1 <= settingsFCF.losNode)) {
			let los = fleetF.fleetELoS(settingsFCF.losC || 1);
			if (fleetF.combinedWith) los += fleetF.combinedWith.fleetELoS(settingsFCF.losC || 1);
			if (los < settingsFCF.los) return false;
		}
		if (settingsFCF.radarCount && (!settingsFCF.radarNode || battleInd+1 <= settingsFCF.radarNode)) {
			let ships = fleetF.combinedWith ? fleetF.ships.concat(fleetF.combinedWith.ships) : fleetF.ships;
			let numRadarShips = ships.filter(ship => ship.HP > 0 && !ship.retreated && ship.equips.find(eq => eq.btype == B_RADAR && eq.LOS >= 5)).length;
			if (numRadarShips < settingsFCF.radarCount) return false;
		}
		if (settingsFCF.rules) {
			let counts = { 'XX': 0 };
			let ships = fleetF.combinedWith ? fleetF.ships.concat(fleetF.combinedWith.ships) : fleetF.ships;
			for (let ship of ships) {
				if (ship.HP <= 0 || ship.retreated) continue;
				counts[ship.type] = counts[ship.type] + 1 || 1;
				counts.XX++;
			}
			for (let rule of settingsFCF.rules) {
				if (!rule.types || rule.types.length <= 0) continue;
				if (rule.node && battleInd+1 > rule.node) continue;
				let count = rule.types.reduce((a,type) => a + (counts[type] ?? counts[CONST.shipTypeIdToHull[type]] ?? 0), 0);
				if (count < (rule.count || 0)) return false;
			}
		}
		return true;
	},
	
	_doSimSortie: function(dataInput,dataReplay) {
		for (let i=0; i<this._compListsEnemy.length; i++) {
			if (!this._compListsEnemy[i]) continue;
			FLEETS2[i] = this._rollComp(this._compListsEnemy[i]);
		}
		let shipBossFlag = FLEETS2.at(-1).ships[0];
		
		if (this._compListFF) {
			FLEETS1S[2] = this._rollComp(this._compListFF);
		}
		
		if (FLEETS1S[2]) {
			for (let ship of FLEETS1S[2].ships) {
				if (ship._dataOrig.bonusesDebuff && ship._dataOrig.bonusesDebuff.bonusDmg != null) {
					ship.bonusSpecial = ship.bonusSpecial ? ship.bonusSpecial.filter(b => !b.on) : [];
					ship.bonusSpecial.push({ mod: ship._dataOrig.bonusesDebuff.bonusDmg, on: [shipBossFlag.mid] });
				}
			}
		}
	
	
		for (let battleInd=0; battleInd<dataInput.nodes.length; battleInd++) {
			let node = dataInput.nodes[battleInd];
			let isBossNode = battleInd == dataInput.nodes.length-1;
			let fleetF = FLEETS1[0];
			let fleetE = FLEETS2[battleInd];
			let fleetFSupport = isBossNode && !dataInput.nodes[battleInd].useNormalSupport ? FLEETS1S[1] : FLEETS1S[0];
			let fleetFF = isBossNode ? FLEETS1S[2] : null;
			let lbWaves = [];
			if (node.lbas) {
				for (let num of node.lbas) {
					if (LBAS[num-1]) lbWaves.push(LBAS[num-1]);
				}
			}
			
			if (node.formationOverride) {
				fleetF.setFormation(node.formationOverride,dataInput.fleetF.combineType);
				if (+node.formationOverride < 10 && fleetF.combinedWith) fleetF.combinedWith.setFormation(node.formationOverride);
			} else {
				fleetF.setFormation(dataInput.fleetF.formation,dataInput.fleetF.combineType);
			}
			
			let shipsAll = fleetF.combinedWith ? fleetF.ships.concat(fleetF.combinedWith.ships) : fleetF.ships;
			for (let ship of shipsAll) {
				let bonus = {};
				if (ship._dataOrig.bonuses) {
					for (let key in ship._dataOrig.bonuses) bonus[key] = ship._dataOrig.bonuses[key];
				}
				if (ship._dataOrig.bonusesByNode && ship._dataOrig.bonusesByNode[battleInd+1]) {
					for (let key in ship._dataOrig.bonusesByNode[battleInd+1]) bonus[key] = ship._dataOrig.bonusesByNode[battleInd+1][key];
				}
				let bonusDebuff = isBossNode ? ship._dataOrig.bonusesDebuff : null;
				this._setBonuses(ship,bonus,bonusDebuff,isBossNode && shipBossFlag.mid);
			}
			
			if (node.addCostFuel || node.addCostAmmo) {
				for (let fleet of [fleetF,fleetF.combinedWith]) {
					if (!fleet) continue;
					for (let ship of fleet.ships) {
						ship.fuelleft -= 10*Math.floor(Math.round(ship.fuel*(ship.fuelleft/10))*(node.addCostFuel || 0))/ship.fuel;
						ship.ammoleft -= 10*Math.floor(Math.round(ship.ammo*(ship.ammoleft/10))*(node.addCostAmmo || 0))/ship.ammo;
					}
				}
			}
			
			if (isBossNode) {
				window.underwaySupply(fleetF);
			}
			
			fleetF.useBalloon = !!node.useBalloon;
			fleetE.useBalloon = !!node.useBalloon;
			
			if (fleetF.smokeType) fleetF.smokeUsed = true;
			fleetF.useSmoke = !node.NBOnly && !fleetF.smokeUsed && !!node.useSmoke;
			
			let result;
			let apiBattle = null;
			if (dataReplay) {
				apiBattle = {data:{},yasen:{},mvp:[],rating:'',node:battleInd+1};
				dataReplay.battles.push(apiBattle);
			}
			let doNB = node.doNB && !node.airRaid && !node.NBOnly;
			if (doNB && node.doNBCond && ['A','B','flagsunk'].includes(node.doNBCond)) doNB = node.doNBCond;
			if (fleetF.combinedWith) {
				fleetF.resetBattle();
				fleetF.combinedWith.resetBattle();
				if (fleetE.combinedWith) {
					result = sim12vs12(dataInput.fleetF.combineType,fleetF,fleetF.combinedWith,fleetE,fleetFSupport,lbWaves,doNB,node.NBOnly,node.airOnly,node.airRaid,node.noAmmo,apiBattle,false,fleetFF);
				} else {
					result = simCombined(dataInput.fleetF.combineType,fleetF,fleetF.combinedWith,fleetE,fleetFSupport,lbWaves,doNB,node.NBOnly,node.airOnly,node.airRaid,node.noAmmo,apiBattle,false,fleetFF);
				}
			} else {
				fleetF.resetBattle();
				if (fleetE.combinedWith) {
					result = sim6vs12(fleetF,fleetE,fleetFSupport,lbWaves,doNB,node.NBOnly,node.airOnly,node.airRaid,node.noAmmo,apiBattle,false,fleetFF);
				} else {
					result = sim(fleetF,fleetE,fleetFSupport,lbWaves,doNB,node.NBOnly,node.airOnly,node.airRaid,node.noAmmo,apiBattle,false,fleetFF);
				}
			}
			
			if (!dataReplay) {
				this._updateResultsNode(result,battleInd);
			}
			
			let ignoreDamecon = dataInput.settingsFCF && dataInput.settingsFCF.dameconNode && battleInd+1 <= dataInput.settingsFCF.dameconNode;
			let isRetreat = fleetF.combinedWith ? !canContinue(fleetF.ships,fleetF.combinedWith.ships,false,ignoreDamecon) : !canContinue(fleetF.ships,null,false,ignoreDamecon);
			if (!isRetreat) {
				let undoFCF = false;
				if (dataInput.settingsFCF && battleInd < dataInput.nodes.length-1) {
					if (!this._checkSettingsFCF(dataInput.settingsFCF,fleetF,battleInd)) {
						undoFCF = true;
					}
				}
				if (!undoFCF && shipsAll.find(ship => ship.retreated && ship._dataOrig.neverFCF)) {
					undoFCF = true;
				}
				if (undoFCF) {
					for (let ship of shipsAll) {
						if (ship._tempFCF) {
							ship.retreated = false;
							for (let key in ship._tempFCF) ship[key] = ship._tempFCF[key];
						}
					}
					isRetreat = fleetF.combinedWith ? !canContinue(fleetF.ships,fleetF.combinedWith.ships,true,ignoreDamecon) : !canContinue(fleetF.ships,null,true,ignoreDamecon);
				}
			}
			
			for (let ship of shipsAll) delete ship._tempFCF;
			if (isRetreat) break;
		}
		
		if (!dataReplay) {
			this._updateResultsTotal(dataInput);
		
			if (window.CARRYOVERHP || window.CARRYOVERMORALE) {
				for (let fleet of FLEETS1) {
					if (!fleet) continue;
					fleet.reset(true);
					for (let ship of fleet.ships) {
						let notHP = window.CARRYOVERHP && ship.HP/ship.maxHP > window.BUCKETPERCENT && window.getRepairTime(ship) <= window.BUCKETTIME;
						ship.reset(notHP, window.CARRYOVERMORALE);
						if (window.CARRYOVERMORALE) ship.morale = Math.max(49, ship.morale - 15);
					}
				}
			} else {
				for (let fleet of FLEETS1) fleet && fleet.reset();
			}
			for (let fleet of FLEETS1S) fleet && fleet.reset();
			for (let fleet of FLEETS2) {
				fleet && fleet.reset();
				fleet.combinedWith && fleet.combinedWith.reset();
			}
			for (let base of LBAS) base && base.reset();
		}
	},
	
	setMechanics: function(mechInput) {
		this._saveErrors = false;
		this._setMechanics(mechInput);
	},
	
	createSimFleet: function(fleetInput,side,isSupport) {
		this._saveErrors = false;
		return this._getSimFleet(fleetInput,side,isSupport);
	},
	createSimLBAS: function(lbasInput) {
		this._saveErrors = false;
		return this._getSimLBAS(lbasInput);
	},
	
	runStats: function(dataInput,callback) {
		console.log(dataInput)
		window.C = false;
		
		let n = 0;
		this._inputPrev.numSims = dataInput.numSims;
		let doReset = !this._inputEquivalent(dataInput,this._inputPrev);
		if (doReset) {
			this._resetResults(dataInput.nodes.length);
		}
		try {
			this._load(dataInput);
		} catch (e) {
			this._addError('bad_data');
			console.error(e);
		}
		if (this._errors.length) {
			callback({ errors: this._errors.slice() });
			return;
		}
		this._inputPrev = dataInput;
		
		let numSim = Math.min(CONST.numSimMax, dataInput.numSims || CONST.numSimDefault);
		callback({ progress: n, progressTotal: numSim, didReset: doReset, warnings: this._warnings.slice() });
		
		this.cancelRun = false;
		let timeStart = Date.now();
		let runStep = function() {
			let numStep = Math.min(CONST.numSimStep,numSim-n);
			for (let i=0; i<numStep; i++) {
				this._doSimSortie(dataInput);
			}
			n += numStep;
			if (n >= numSim || this.cancelRun) {
				callback({ progress: n, progressTotal: numSim, result: this._results });
				let timeTotal = Date.now() - timeStart;
				console.log('time: ' + (timeTotal/1000) + ' sec');
				this.cancelRun = false;
			} else {
				callback({ progress: n, progressTotal: numSim });
				setTimeout(runStep.bind(this),1);
			}
		}
		setTimeout(runStep.bind(this),1);
	},
	
	runReplay: function(dataInput,dataReplay) {
		console.log(dataInput);
		window.C = true;
		
		this._load(dataInput);
		if (this._errors.length) {
			return this._errors.slice();
		}
		
		this._doSimSortie(dataInput,dataReplay);
	},
	
	resetStats: function() {
		this._inputPrev = {};
	},
};

window.SIM = SIM;
	
})()