(() => {

var CONST = window.COMMON.getConst({
	numShipMax: 7,
	numEquipMax: 6,
	numLBASMax: 3,
	numLBASEquipMax: 4,
	
	numShipNormal: 6,
	numShipSF: 7,
	numShipLBAS: 3,
	
	shipImgNameDefault: 'Kblank.png',
	equipImgNameDefault: 'empty',
	
	tooltipUnknownStat: 'This stat\'s true value is currently unknown.',
	
	rankExceptTypes: [AUTOGYRO,ASWPLANE],
	rankDefaultSpecial: { 311: 0, 312: 2 },
	
	lbasTypesRecon: [SEAPLANE,CARRIERSCOUT,CARRIERSCOUT2,FLYINGBOAT,LANDSCOUT],
	lbasTypesHeavy: [LANDBOMBERL],
	lbasSlotDefault: 18,
	lbasSlotRecon: 4,
	lbasSlotHeavy: 9,
	
	modHPMax: 2,
	modASWMax: 9,
	
	statBList: [
		{ key: 'fp', name: 'Firepower' },
		{ key: 'tp', name: 'Torpedo' },
		{ key: 'aa', name: 'Anti-Air' },
		{ key: 'ar', name: 'Armour' },
		{ key: 'ev', name: 'Evasion', canAuto: true },
		{ key: 'asw', name: 'Anti-Submarine', canAuto: true },
		{ key: 'los', name: 'Line of Sight', canAuto: true },
	],
	
	urlDeckbuilder: 'http://www.kancolle-calc.net/deckbuilder.html?predeck=',
});

var FLEET_MODEL = {
	fleetCurrent: null,
	
	getBlankFleet: function(args) {
		args = args || {};
		let fleet = {
			type: 0,
			combined: false,
			isPlayer: !!args.isPlayer,
			isSupport: !!args.isSupport,
			isFriend: !!args.isFriend,
			isLBAS: !!args.isLBAS,
			isEnemy: !!args.isEnemy,
			formation: CONST.formationSingleDefault,
			ships: [],
			shipsEscort: null,
		};
		for (let i=0; i<CONST.numShipMax; i++) {
			fleet.ships.push(this.getBlankShip(i));
		}
		return fleet;
	},
	getBlankShip: function(ind) {
		return {
			ind: ind || 0,
			imgName: CONST.shipImgNameDefault,
			active: true,
			mstId: 0,
		};
	},
	getBlankEquip: function(ind) {
		return {
			ind: ind || 0,
			mstId: 0,
			imgName: CONST.equipImgNameDefault,
			level: 0,
		};
	},
	getBlankLandBases: function() {
		let bases = [];
		for (let i=0; i<CONST.numLBASMax; i++) {
			let obj = {
				ind: i,
				equips: [],
				slots: [],
			};
			for (let j=0; j<CONST.numLBASEquipMax; j++) {
				obj.equips.push(FLEET_MODEL.getBlankEquip(j));
				obj.slots.push(CONST.lbasSlotDefault);
			}
			bases.push(obj);
		}
		return bases;
	},
	
	getDefaultShip: function(mstId,ind,levelDefault) {
		if (!mstId || +mstId <= 0) {
			return this.getBlankShip(ind);
		}
		
		let isFriend = COMMON.isShipIdPlayable(mstId);
		let sdata = SHIPDATA[mstId];
		let level = levelDefault || (isFriend ? 99 : ['SS','SSV'].includes(sdata.type) ? 50 : 1);
		let obj = {
			ind: ind,
			imgName: sdata.image,
			active: true,
			
			mstId: +mstId,
			name: sdata.name,
			level: level,
			hp: sdata.HP,
			hpInit: sdata.HP,
			morale: 49,
			fuelInit: 100,
			ammoInit: 100,
			statsBase: {
				fp: sdata.FP || 0,
				tp: sdata.TP || 0,
				aa: sdata.AA || 0,
				ar: sdata.AR || 0,
				ev: sdata.EV || 0,
				asw: sdata.ASW || 0,
				los: sdata.LOS || 0,
				luk: sdata.LUK || 0,
				tacc: sdata.TACC || 0,
				range: sdata.RNG || 0,
			},
			statsEquip: {
				fp: 0,
				tp: 0,
				aa: 0,
				ar: 0,
				ev: 0,
				asw: 0,
				los: 0,
				range: sdata.RNG || 0,
			},
			statsBonus: {
				
			},
			statsUnknown: {},
			equips: [],
			slots: sdata.SLOTS.slice(),
			
			bonusDmg: 1,
			bonusDmgDebuff: 1,
			bonusAcc: 1,
			bonusEva: 1,
			bonusByNode: {},
		};
		obj._levelPrev = obj.level;
		if (levelDefault && sdata.EVbase) {
			obj.hp = obj.hpInit = COMMON.getHP(sdata.HP,sdata.HPmax,obj.level);
			obj.statsBase.ev = COMMON.getScaledStat(sdata.EVbase,sdata.EV,obj.level);
			obj.statsBase.asw = COMMON.getScaledStat(sdata.ASWbase,sdata.ASW,obj.level);
			obj.statsBase.los = COMMON.getScaledStat(sdata.LOSbase,sdata.LOS,obj.level);
		}
		if (sdata.unknownstats) {
			obj.statsUnknown.ev = obj.statsUnknown.asw = obj.statsUnknown.los = CONST.tooltipUnknownStat;
			if (!isFriend) obj.statsUnknown.luk = obj.statsUnknown.tacc = CONST.tooltipUnknownStat;
		}
		for (let i=0; i<CONST.numEquipMax; i++) {
			obj.equips.push(this.getBlankEquip(i));
		}
		return obj;
	},
	getDefaultEquip: function(mstId,ship,ind) {
		let obj = FLEET_MODEL.getBlankEquip(ind);
		if (+mstId > 0) {
			let edata = EQDATA[mstId];
			obj.mstId = +mstId;
			obj.name = edata.name;
			obj.imgName = '' + (edata.image || EQTDATA[edata.type].image);
			if (EQTDATA[edata.type].isPlane && !CONST.rankExceptTypes.includes(edata.type)) {
				obj.isPlane = true;
				obj.rank = ship && !COMMON.isShipIdPlayable(ship.mstId) ? 0 : 7;
				if (CONST.rankDefaultSpecial[mstId] != null) obj.rank = CONST.rankDefaultSpecial[mstId];
			}
			if (ship == null) obj.bonusDmg = 1;
		}
		return obj;
	},
	
	updateEquipStats: function(ship) {
		let rangeMax = 0;
		for (let stat in ship.statsEquip) {
			let statU = stat.toUpperCase();
			ship.statsEquip[stat] = 0;
			for (let equip of ship.equips) {
				if (!equip || !equip.mstId) continue;
				let edata = EQDATA[equip.mstId];
				if (edata[statU]) ship.statsEquip[stat] += edata[statU];
				if (edata.RNG > rangeMax) rangeMax = edata.RNG;
			}
		}
		ship.statsEquip.range = rangeMax;
		
		ship.statsBonus = {};
		let statsBonus = window.getBonusStats(ship.mstId,ship.equips.map(eq => eq.mstId),ship.equips.map(eq => eq.level));
		for (let stat in statsBonus) {
			let statUI = stat == 'RNG' ? 'range' : stat.toLowerCase();
			ship.statsBonus[statUI] = statsBonus[stat];
		}
	},
	
	fleetIsEmpty: function(fleet) {
		return !(fleet.ships.find(ship => ship.mstId > 0) || (fleet.shipsEscort && fleet.shipsEscort.find(ship => ship.mstId > 0)));
	},
	shipIsEmpty: function(ship) {
		return !ship || !ship.mstId || !ship.active; 
	},
	equipIsEmpty: function(equip) {
		return !equip || !equip.mstId;
	},
	
	setType: function(fleet,type) {
		fleet.type = +type;
		if (fleet.type && fleet.type != CONST.SF) {
			fleet.combined = true;
			if (!fleet.formation || fleet.formation < 10) fleet.formation = CONST.formationCombinedDefault;
			if (!fleet.shipsEscort) {
				fleet.shipsEscort = [];
				for (let i=0; i<CONST.numShipNormal; i++) {
					fleet.shipsEscort.push(this.getBlankShip(i));
				}
			}
			if (fleet.ships[6]) fleet.ships[6].active = false;
		} else {
			fleet.combined = false;
			if (!fleet.formation || fleet.formation > 10) fleet.formation = CONST.formationSingleDefault;
			if (fleet.ships[6]) fleet.ships[6].active = fleet.type == CONST.SF;
		}
	},
};
window.FLEET_MODEL = FLEET_MODEL;

window.CMP_FLEET = {
	props: ['fleet','fleetname'],
	data: () => ({
		expanded: false,
	}),
	computed: {
		numShipShow: function() {
			return this.fleet.type == CONST.SF ? CONST.numShipSF : CONST.numShipNormal;
		},
		fleetClass: function() {
			return {
				main: this.fleet.isPlayer,
				enemy: this.fleet.isEnemy,
				support: this.fleet.isSupport,
				friend: this.fleet.isFriend,
				lbas: this.fleet.isLBAS,
			};
		},
	},
	methods: {
		onclickExpand: function() {
			if (this.expanded = !this.expanded) {
				if (FLEET_MODEL.fleetCurrent) FLEET_MODEL.fleetCurrent.expanded = false;
				FLEET_MODEL.fleetCurrent = this;
				COMMON.global.fleetEditorOpen(this.fleet);
				this.$refs.editor.appendChild(document.getElementById('divFleetEditor'));
				setTimeout(() => this.$refs.header.scrollIntoViewIfNeeded(),1);
			} else {
				FLEET_MODEL.fleetCurrent = null;
				COMMON.global.fleetEditorClose();
			}
		},
	},
	watch: {
		
	},
	template: document.getElementById('tmpFleet')
};


var METHODS_COMMON = {
	methods: {
		onclickEquip: function(ship,equip,shipsProp) {
			this.selectedShipsProp = shipsProp;
			this.selectedShipInd = ship.ind;
			this.selectedEquipInd = equip.ind;
			this.openEquipSelector();
		},
		onkeypressEquip: function(e,ship,equip,shipsProp) {
			e.preventDefault();
			if (e.key == 'Enter') {
				this.selectedShipsProp = shipsProp;
				this.selectedShipInd = ship.ind;
				this.selectedEquipInd = equip.ind;
				this.openEquipSelector();
			}
			if (e.key.length == 1) {
				this.selectedShipsProp = shipsProp;
				this.selectedShipInd = ship.ind;
				this.selectedEquipInd = equip.ind;
				this.openEquipSelector(e.key);
			}
		},
		onclickDeleteEquip: function(ship,equip,shipsProp) {
			this.setNewEquip(0,ship.ind,equip.ind,shipsProp);
		},
		ondragstartEquip: function(ship,equip,shipsProp) {
			this.isDraggingEquip = true;
			this.selectedShipsProp = shipsProp;
			this.selectedShipInd = ship.ind;
			this.selectedEquipInd = equip.ind;
		},
		ondragendEquip: function() {
			this.isDraggingEquip = false;
		},
		
		onchangeStat: function(e,obj,key,allowFloat) {
			let min = +e.target.min, max = +e.target.max;
			obj[key] = Math.max(min,Math.min(max,obj[key]));
			if (!allowFloat) obj[key] = Math.floor(obj[key]);
		},
	},
};

var UI_FLEETEDITOR = Vue.createApp({
	data: () => ({
		active: false,
		
		selectedShipsProp: '',
		selectedShipInd: -1,
		selectedEquipInd: -1,
		isDraggingShip: false,
		isDraggingEquip: false,

		statBList: CONST.statBList,
		showStatTotal: false,
		showEquipBonus: true,
		autoScaleStats: true,
		
		loadCode: '',
		loadKC3Fleet: 1,
		loadPresetArea: null,
		loadPresetNode: null,
		loadPresetComp: null,
		
		showKC3ProfileHelp: false,
		
		presetListArea: [],
		presetListNode: [],
		presetListComp: [],
		
		fleet: FLEET_MODEL.getBlankFleet(),
	}),
	mounted: function() {
		for (let world in ENEMYCOMPS) {
			let options = [];
			for (let m in ENEMYCOMPS[world]) {
				options.push({
					name: m,
					value: world + '|' + m,
				});
			}
			this.presetListArea.push({
				name: world,
				options: options,
			});
		}
	},
	computed: {
		numShipShow: function() {
			return this.fleet.type == CONST.SF ? CONST.numShipSF : CONST.numShipNormal;
		},
		canCF: function() {
			return this.fleet.isPlayer || this.fleet.isEnemy;
		},
		canCFAll: function() {
			return this.fleet.isPlayer;
		},
		canSF: function() {
			return this.fleet.isPlayer || this.fleet.isFriend;
		},
		canFormation: function() {
			return this.fleet.isPlayer || this.fleet.isEnemy;
		},
		canBonus: function() {
			return this.fleet.isPlayer || this.fleet.isFriend;
		},
	},
	methods: {
		setNewShip: function(mstId,ind,shipsProp) {
			ind = ind != null ? ind : this.selectedShipInd;
			shipsProp = shipsProp || this.selectedShipsProp;
			
			let ship = this.fleet[shipsProp][ind] = FLEET_MODEL.getDefaultShip(mstId,ind);
			let eqDef;
			if (mstId > 0 && (eqDef = SHIPDATA[mstId].EQUIPS)) {
				for (let i=0; i<eqDef.length; i++) {
					ship.equips[i] = FLEET_MODEL.getDefaultEquip(eqDef[i],ship,i);
				}
				FLEET_MODEL.updateEquipStats(ship);
			}
		},
		setNewEquip: function(mstId,indShip,indEquip,shipsProp) {
			indShip = indShip != null ? indShip : this.selectedShipInd;
			indEquip = indEquip != null ? indEquip : this.selectedEquipInd;
			shipsProp = shipsProp || this.selectedShipsProp;
			let ship = this.fleet[shipsProp][indShip];
			if (!ship) return;
			
			ship.equips[indEquip] = FLEET_MODEL.getDefaultEquip(mstId,ship,indEquip);
			FLEET_MODEL.updateEquipStats(ship);
		},
		resetShips: function(deleteEscort) {
			for (let i=0; i<this.fleet.ships.length; i++) {
				this.fleet.ships[i] = FLEET_MODEL.getBlankShip(i);
			}
			if (this.fleet.shipsEscort) {
				if (deleteEscort) {
					this.fleet.shipsEscort = null;
				} else {
					for (let i=0; i<this.fleet.shipsEscort.length; i++) {
						this.fleet.shipsEscort[i] = FLEET_MODEL.getBlankShip(i);
					}
				}
			}
		},
		loadData: function(data) {
			if (!data) return;
			if (!this.canCF && [CONST.CTF,CONST.STF,CONST.TCF].includes(data.type)) {
				data.type = 0;
				data.formation = CONST.formationSingleDefault;
			}
			if (!this.canCFAll && [CONST.STF,CONST.TCF].includes(data.type)) {
				data.type = CONST.CTF;
			}
			if (!this.canSF && data.type == CONST.SF) {
				data.type = 0;
			}
			if (!this.canFormation) {
				data.formation = CONST.formationSingleDefault;
			}
			this.resetShips(true);
			CONVERT.loadSaveFleet(data,this.fleet);
			this.loadCode = JSON.stringify(data);
		},
		updateCode: function() {
			this.loadCode = JSON.stringify(CONVERT.uiToSaveFleet(this.fleet));
		},
		
		getStatTotal: function(ship,stat) {
			if (stat == 'range') return Math.max(ship.statsBase.range,ship.statsEquip.range) + (ship.statsBonus.range || 0);
			return (+ship.statsBase[stat] || 0) + (+ship.statsEquip[stat] || 0) + ((this.showEquipBonus && +ship.statsBonus[stat]) || 0);
		},
		getClassHP: function(ship) {
			if (ship.hpInit/ship.hp <= .25) return 'damage heavy';
			if (ship.hpInit/ship.hp <= .5) return 'damage medium';
			if (ship.hpInit/ship.hp <= .75) return 'damage light';
		},
		getClassMorale: function(ship) {
			if (ship.morale >= 50) return 'morale sparkled';
			if (ship.morale < 20) return 'morale red';
			if (ship.morale < 30) return 'morale orange';
		},
		
		doOpen: function(fleet) {
			this.active = true;
			this.fleet = fleet;
			this.updateCode();
			this.loadPresetArea = this.loadPresetNode = this.loadPresetComp = null;
		},
		doClose: function() {
			this.active = false;
		},
		onclickShip: function(ship,shipsProp) {
			this.selectedShipsProp = shipsProp;
			this.selectedShipInd = ship.ind;
			COMMON.global.shipSelectorOpen(this.receiveSelectShip,this.receiveCloseShip);
		},
		onkeypressShip: function(e,ship,shipsProp) {
			e.preventDefault();
			if (e.key == 'Enter') {
				this.selectedShipsProp = shipsProp;
				this.selectedShipInd = ship.ind;
				COMMON.global.shipSelectorOpen(this.receiveSelectShip,this.receiveCloseShip);
			}
			if (e.key.length == 1) {
				this.selectedShipsProp = shipsProp;
				this.selectedShipInd = ship.ind;
				COMMON.global.shipSelectorOpen(this.receiveSelectShip,this.receiveCloseShip,e.key);
			}
		},
		onclickDeleteShip: function(ship,shipsProp) {
			this.setNewShip(0,ship.ind,shipsProp);
		},
		ondragstartShip: function(ship,shipsProp) {
			this.isDraggingShip = true;
			this.selectedShipsProp = shipsProp;
			this.selectedShipInd = ship.ind;
		},
		ondropShip: function(shipTo,shipsPropTo) {
			if (!this.isDraggingShip) return;
			if (shipsPropTo == this.selectedShipsProp && shipTo.ind == this.selectedShipInd) return;
			let shipFrom = this.fleet[this.selectedShipsProp][this.selectedShipInd];
			this.fleet[this.selectedShipsProp][shipFrom.ind] = shipTo;
			this.fleet[shipsPropTo][shipTo.ind] = shipFrom;
			shipFrom.ind = shipTo.ind;
			shipTo.ind = this.selectedShipInd;
		},
		ondragendShip: function() {
			this.isDraggingShip = false;
		},
		
		onclickEquip: METHODS_COMMON.methods.onclickEquip,
		onkeypressEquip: METHODS_COMMON.methods.onkeypressEquip,
		onclickDeleteEquip: METHODS_COMMON.methods.onclickDeleteEquip,
		ondragstartEquip: METHODS_COMMON.methods.ondragstartEquip,
		ondropEquip: function(shipTo,equipTo) {
			if (!this.isDraggingEquip) return;
			let shipFrom = this.fleet[this.selectedShipsProp][this.selectedShipInd];
			let equipFrom = shipFrom.equips[this.selectedEquipInd];
			shipFrom.equips[equipFrom.ind] = equipTo;
			shipTo.equips[equipTo.ind] = equipFrom;
			equipFrom.ind = equipTo.ind;
			equipTo.ind = this.selectedEquipInd;
			if (shipTo != shipFrom) {
				FLEET_MODEL.updateEquipStats(shipTo);
				FLEET_MODEL.updateEquipStats(shipFrom);
			}
		},
		ondragendEquip: METHODS_COMMON.methods.ondragendEquip,
		
		onchangeStat: METHODS_COMMON.methods.onchangeStat,
		
		onchangeLevel: function(ship) {
			let levelPrev = ship._levelPrev;
			ship._levelPrev = ship.level;
			if (!this.autoScaleStats) return;
			
			let sdata = SHIPDATA[ship.mstId];
			if (sdata.HPmax) {
				let hpDiff = Math.max(0,Math.min(CONST.modHPMax,ship.hp - COMMON.getHP(sdata.HP,sdata.HPmax,levelPrev)));
				let hpPrev = ship.hp;
				ship.hp = COMMON.getHP(sdata.HP,sdata.HPmax,ship.level) + hpDiff;
				if (ship.hpInit == hpPrev || ship.hpInit > ship.hp) ship.hpInit = ship.hp;
			}
			if (!sdata.unknownstats) {
				if (sdata.ASWbase) {
					let aswDiff = Math.max(0,Math.min(CONST.modASWMax,ship.statsBase.asw - COMMON.getScaledStat(sdata.ASWbase,sdata.ASW,levelPrev)));
					ship.statsBase.asw = COMMON.getScaledStat(sdata.ASWbase,sdata.ASW,ship.level) + aswDiff;
				}
				if (sdata.EVbase) {
					ship.statsBase.ev = COMMON.getScaledStat(sdata.EVbase,sdata.EV,ship.level);
				}
				if (sdata.LOSbase) {
					ship.statsBase.los = COMMON.getScaledStat(sdata.LOSbase,sdata.LOS,ship.level);
				}
			}
		},
		
		onchangeEquipLevel: function(ship) {
			FLEET_MODEL.updateEquipStats(ship);
		},
		
		onchangeType: function() {
			FLEET_MODEL.setType(this.fleet,this.fleet.type);
		},
		
		onfocusCode: function() {
			this.updateCode();
		},
		onclickLoadCode: function() {
			if (!this.loadCode) return;
			let data;
			try {
				data = JSON.parse(this.loadCode);
			} catch (e) {
				console.error(e);
				return;
			}
			
			if (data.f1) {
				data = CONVERT.deckbuilderToSaveFleet(data);
			} else if (data.fleetnum && data.fleet1 && data.battles) {
				data = CONVERT.replayToSave(data).fleetFMain;
			}
			
			if (data.type != null && data.ships != null) {
				this.loadData(data);
			}
		},
		onchangeFileKC3: function(e) {
			if (!e.target.files.length) return;
			let reader = new FileReader();
			reader.readAsText(e.target.files[0]);
			reader.addEventListener('loadend',() => CONVERT.setKC3File(reader));
		},
		onclickLoadKC3: function() {
			this.loadData(CONVERT.kc3ToSaveFleet(this.loadKC3Fleet));
		},
		onchangePresetArea: function() {
			if (!this.loadPresetArea) return;
			let [w,m] = this.loadPresetArea.split('|');
			this.presetListNode = [];
			for (let node in ENEMYCOMPS[w][m]) {
				this.presetListNode.push({
					name: node,
					value: node,
				});
			}
			this.loadPresetNode = this.presetListNode[0].value;
			this.onchangePresetNode();
		},
		onchangePresetNode: function() {
			let [w,m] = this.loadPresetArea.split('|');
			this.presetListComp = [];
			for (let comp in ENEMYCOMPS[w][m][this.loadPresetNode]) {
				this.presetListComp.push({
					name: comp,
					value: comp,
				});
			}
			this.loadPresetComp = this.presetListComp[0].value;
			this.onchangePreset();
		},
		onchangePreset: function() {
			let [w,m] = this.loadPresetArea.split('|');
			let comp = ENEMYCOMPS[w][m][this.loadPresetNode][this.loadPresetComp];
			this.resetShips(true);
			this.fleet.formation = comp.f % 100;
			FLEET_MODEL.setType(this.fleet,comp.ce ? 1 : 0);
			for (let i=0; i<comp.c.length; i++) {
				this.setNewShip(comp.c[i],i,'ships');
			}
			if (comp.ce) {
				for (let i=0; i<comp.ce.length; i++) {
					this.setNewShip(comp.ce[i],i,'shipsEscort');
				}
			}
		},
		onclickReset: function() {
			this.resetShips();
		},
		onclickExportDb: function() {
			let dataDb = CONVERT.saveToDeckbuilderFleet(CONVERT.uiToSaveFleet(this.fleet));
			window.open(CONST.urlDeckbuilder + encodeURI(JSON.stringify(dataDb)));
		},
		
		onclickAdditionalStats: function(keyS) {
			SIM.setMechanics(CONVERT.uiToSimInputMechanics());
			let fleetInput = CONVERT.uiToSimInputFleet(this.fleet);
			let fleetSim = SIM.createSimFleet(fleetInput,+!!this.fleet.isEnemy);
			if (keyS == 'shipsEscort') fleetSim = fleetSim.combinedWith;
			if (!fleetSim || !fleetSim.ships || !fleetSim.ships.length) return;
			UI_ADDITIONALSTATS.doOpen(fleetSim);
		},
		
		refocusShip: function() {
			setTimeout(() => this.$refs[this.selectedShipsProp+this.selectedShipInd][0].focus(),1);
		},
		refocusEquip: function() {
			setTimeout(() => this.$refs[this.selectedShipsProp+this.selectedShipInd+'_'+this.selectedEquipInd][0].focus(),1);
		},
		
		openEquipSelector: function(keyInit) {
			COMMON.global.equipSelectorOpen(this.receiveSubmitEquip,this.receiveCloseEquip,keyInit);
		},
		
		receiveSelectShip: function(mstId) {
			UI_FLEETEDITOR.setNewShip(mstId);
		},
		receiveCloseShip: function() {
			UI_FLEETEDITOR.refocusShip();
		},
		receiveSubmitEquip: function(mstId) {
			UI_FLEETEDITOR.setNewEquip(mstId);
		},
		receiveCloseEquip: function() {
			UI_FLEETEDITOR.refocusEquip();
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).use(COMMON.i18n).mount('#divFleetEditor');


window.CMP_LBASEDITOR = {
	props: ['bases'],
	data: () => ({
		selectedShipInd: -1,
		selectedEquipInd: -1,
		selectedShipsProp: null,
		isDraggingEquip: false,
	}),
	mounted: function() {
		
	},
	methods: {
		setNewEquip: function(mstId,indBase,indEquip) {
			indBase = indBase != null ? indBase : this.selectedShipInd;
			indEquip = indEquip != null ? indEquip : this.selectedEquipInd;
			let base = this.bases[indBase];
			if (!base) return;
			
			base.equips[indEquip] = FLEET_MODEL.getDefaultEquip(mstId,null,indEquip);
			let edata = EQDATA[mstId];
			if (edata) {
				base.slots[indEquip] = COMMON.getLBASSlotDefault(edata.type);
			}
		},
		
		onclickEquip: METHODS_COMMON.methods.onclickEquip,
		onkeypressEquip: METHODS_COMMON.methods.onkeypressEquip,
		onclickDeleteEquip: METHODS_COMMON.methods.onclickDeleteEquip,
		ondragstartEquip: METHODS_COMMON.methods.ondragstartEquip,
		ondropEquip: function(baseTo,equipTo) {
			if (!this.isDraggingEquip) return;
			let baseFrom = this.bases[this.selectedShipInd];
			let equipFrom = baseFrom.equips[this.selectedEquipInd];
			
			baseFrom.equips[equipFrom.ind] = equipTo;
			baseTo.equips[equipTo.ind] = equipFrom;
			
			let temp = baseFrom.slots[equipFrom.ind];
			baseFrom.slots[equipFrom.ind] = baseTo.slots[equipTo.ind];
			baseTo.slots[equipTo.ind] = temp;
			
			equipFrom.ind = equipTo.ind;
			equipTo.ind = this.selectedEquipInd;
		},
		ondragendEquip: METHODS_COMMON.methods.ondragendEquip,
		
		onchangeStat: METHODS_COMMON.methods.onchangeStat,
		
		refocusEquip: function() {
			setTimeout(() => this.$refs[this.selectedShipInd+'_'+this.selectedEquipInd][0].focus(),1);
		},
		
		openEquipSelector: function(keyInit) {
			let uiThis = this;
			COMMON.global.equipSelectorOpen(function(mstId) { uiThis.setNewEquip(mstId); },function() { uiThis.refocusEquip(); },keyInit);
		},
		
		onclickAdditionalStats: function() {
			SIM.setMechanics(CONVERT.uiToSimInputMechanics());
			UI_ADDITIONALSTATSLBAS.doOpen(SIM.createSimLBAS(CONVERT.uiToSimInputLBAS(this.bases)));
		},
	},
	template: document.getElementById('tmpLBASEditor')
};


var UI_ADDITIONALSTATS = Vue.createApp({
	data: () => ({
		active: false,
		fleet: {
			airPower: null,
			airPowerCombined: null,
			airPowerLB: null,
			los1: null,
			los2: null,
			los3: null,
			los4: null,
		},
		ships: [],
	}),
	methods: {
		doOpen: function(fleetSim) {
			console.log(fleetSim);
			this.active = true;
			this.ships = [];
			for (let ship of fleetSim.ships) {
				let stats = {
					imgName: SHIPDATA[ship.mid].image,
					shellPower: ship.canShell() ? Math.floor(ship.shellPower()) : null,
					nbPower: ship.canNB() ? Math.floor(ship.NBPower()) : null,
					aswPower: ship.canASW() ? Math.floor(ship.ASWPower()) : null,
					canOASW: ship.canOASW(),
					accBasic: Math.round(10*(2*Math.sqrt(ship.LVL) + 1.5*Math.sqrt(ship.LUK) + ship.equips.reduce((a,b) => a + (b.ACC || 0),0)))/10,
					accFit: ship.ACCfit != null ? Math.round(100*ship.ACCfit)/100 : null,
					accFitNight: ship.ACCfitN != null ? Math.round(100*ship.ACCfitN)/100 : null,
					asTypes: null,
					nbTypes: null,
					aaProp: getAAShotProp(ship,10000)/100,
					aaFlat: Math.floor(getAAShotFlat(ship)),
					aaciTypes: null,
					rocketBarrage: ship.rocketBarrageChance() ? Math.floor(ship.rocketBarrageChance()*100) : null,
					profAcc: ship.ACCplane ? Math.round(100*ship.ACCplane)/100 : null,
					profCritRate: ship.critratebonus ? Math.round(10*ship.critratebonus)/10 : null,
					profCritMult: ship.critdmgbonus ? Math.round(100*ship.critdmgbonus)/100 : null,
					profAir: ship.APbonus ? Math.round(100*ship.APbonus)/100 : null,
					hasImprove: false,
					imprShellPow: ship.improves.Pshell ? Math.floor(ship.improves.Pshell*100)/100 : null,
					imprShellAcc: ship.improves.ACCshell ? Math.floor(ship.improves.ACCshell*100)/100 : null,
					imprShellEva: ship.improves.EVshell ? Math.floor(ship.improves.EVshell*100)/100 : null,
					imprNightPow: ship.improves.Pnb ? Math.floor(ship.improves.Pnb*100)/100 : null,
					imprNightAcc: ship.improves.ACCnb ? Math.floor(ship.improves.ACCnb*100)/100 : null,
					imprTorpedoPow: ship.improves.Ptorp ? Math.floor(ship.improves.Ptorp*100)/100 : null,
					imprTorpedoAcc: ship.improves.ACCtorp ? Math.floor(ship.improves.ACCtorp*100)/100 : null,
					imprTorpedoEva: ship.improves.EVtorp ? Math.floor(ship.improves.EVtorp*100)/100 : null,
					imprASWPow: ship.improves.Pasw ? Math.floor(ship.improves.Pasw*100)/100 : null,
					imprASWAcc: ship.improves.ACCasw ? Math.floor(ship.improves.ACCasw*100)/100 : null,
					imprAR: ship.improves.AR ? Math.floor(ship.improves.AR*100)/100 : null,
					hasInstall: ship.softSkinMult > 1 || ship.isoMult > 1,
					vsSoftSkin: Math.floor(ship.shellPower({isInstall:true})),
					vsPillbox: Math.floor(ship.shellPower({isInstall:true,installtype:2})),
					vsIso: Math.floor(ship.shellPower({isInstall:true,installtype:4})),
					vsHarbourSummer: Math.floor(ship.shellPower({isInstall:true,installtype:6})),
					modSupply: ship.supplyPostMult ? Math.round(100*ship.supplyPostMult)/100 : null,
					modAnchorage: ship.anchoragePostMult ? Math.round(100*ship.anchoragePostMult)/100 : null,
				};
				if (ship.AStype().length && ship.canAS()) {
					stats.asTypes = [];
					let baseASP = ship.ASchance(2), baseAS = ship.ASchance(1);
					let chanceLeftASP = 1, chanceLeftAS = 1;
					for (let id of ship.AStype()) {
						let rateASP = chanceLeftASP*baseASP/ARTILLERYSPOTDATA[id].chanceMod;
						let rateAS = chanceLeftAS*baseAS/ARTILLERYSPOTDATA[id].chanceMod;
						stats.asTypes.push({
							name: ARTILLERYSPOTDATA[id].name,
							rateASP: Math.floor(100*rateASP),
							rateAS: Math.floor(100*rateAS),
						});
						chanceLeftASP -= rateASP;
						chanceLeftAS -= rateAS;
					}
				}
				if (ship.NBtypes().length && ship.canNB()) {
					stats.nbTypes = [];
					let base = ship.NBchance()/100, chanceLeft = 1;
					for (let id of ship.NBtypes()) {
						let d = NBATTACKDATA[id];
						let rate = d.chanceMod > 0 ? chanceLeft*base/d.chanceMod : .99;
						if (d.replace && ship.LVL >= 80) {
							let rateBase = Math.floor(100*rate);
							stats.nbTypes.push({ name: NBATTACKDATA[d.replace].name, rate: Math.round(rateBase*d.replaceChance) });
							stats.nbTypes.push({ name: d.name, rate: Math.round(rateBase*(1-d.replaceChance)) });
						} else {
							stats.nbTypes.push({ name: d.name, rate: Math.floor(100*rate) });
						}
						chanceLeft -= rate;
					}
					stats.nbTypes.push({ name: 'Single', rate: Math.floor(100*chanceLeft) });
				}
				if (ship.AACItype.length) {
					stats.aaciTypes = [];
					let chanceUsed = 0, chanceMod = 1;
					for (let id of ship.AACItype) {
						let d = AACIDATA[id];
						if (chanceUsed > d.rate) continue;
						stats.aaciTypes.push({ id: id, num: d.num, mod: d.mod, rate: Math.round((d.rate-chanceUsed)*chanceMod*100) });
						if (d.rollIndiv) chanceMod *= 1-d.rate;
						else chanceUsed = d.rate;
					}
				}
				stats.hasImprove = !!Object.keys(stats).find(k => k.indexOf('impr') == 0 && stats[k]);
				this.ships.push(stats);
			}
			this.fleet.airPower = fleetSim.fleetAirPower();
			this.fleet.airPowerCombined = null;
			this.fleet.airPowerLB = fleetSim.fleetAirPower('isPlane');
			if (fleetSim.combinedWith) {
				this.fleet.airPowerCombined = fleetSim.fleetAirPower() + fleetSim.combinedWith.fleetAirPower();
				this.fleet.airPowerLB += fleetSim.combinedWith.fleetAirPower('isPlane');
			}
			for (let i=1; i<=4; i++) {
				let los = fleetSim.fleetELoS(i);
				this.fleet['los'+i] = (Math.round(10*los)/10).toString();
				if (fleetSim.combinedWith) {
					let losC = los + fleetSim.combinedWith.fleetELoS(i);
					this.fleet['los'+i] += ' (' + (Math.round(10*losC)/10).toString() + ')';
				}
			}
		},
		doClose: function() {
			this.active = false;
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).mount('#divAdditionalStats');


var UI_ADDITIONALSTATSLBAS = Vue.createApp({
	data: () => ({
		active: false,
		bases: [],
	}),
	methods: {
		doOpen: function(basesSim) {
			console.log(basesSim);
			this.active = true;
			this.bases = [];
			let n = 1;
			let numHA = 0;
			for (let base of basesSim) {
				if (base) numHA += base.equips.filter(eq => eq.isRocket).length;
			}
			let modHA = { 0: .5, 1: .8, 2: 1.1 }[numHA] || 1.2;
			for (let base of basesSim) {
				let stats = { imgName: 'LBAS'+(n++)+'.png' };
				this.bases.push(stats);
				if (!base || !base.equips || base.equips.length <= 0) continue;
				stats.airPowerSortie = base.airPower();
				stats.airPowerDefend = base.airPowerDefend();
				stats.airPowerDefendHA = Math.floor(base.airPowerDefend()*modHA);
				stats.range = 999;
				stats.rangePlus = 0;
				stats.costFuel = 0;
				stats.costAmmo = 0;
				let cost = base.getCost();
				stats.costFuel += cost[0];
				stats.costAmmo += cost[1];
				let rangeScoutMax = 0;
				for (let i=0; i<base.equips.length; i++) {
					let equip = base.equips[i];
					if (LBASDATA[equip.mid]) {
						let dist = LBASDATA[equip.mid].distance;
						if (dist < stats.range) stats.range = dist;
						if ([CARRIERSCOUT,SEAPLANE,FLYINGBOAT,LANDSCOUT].includes(equip.type) && dist > rangeScoutMax) rangeScoutMax = dist;
					}
				}
				stats.rangePlus = Math.min(3,Math.floor(Math.sqrt(rangeScoutMax-stats.range)));
			}
		},
		doClose: function() {
			this.active = false;
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).mount('#divAdditionalStatsLBAS');



COMMON.global.fleetEditorOpen = function(fleet) {
	UI_FLEETEDITOR.doOpen(fleet);
}
COMMON.global.fleetEditorClose = function() {
	UI_FLEETEDITOR.doClose();
}
COMMON.global.fleetEditorToggleEquipBonus = function(show) {
	UI_FLEETEDITOR.showEquipBonus = show;
}
COMMON.global.fleetEditorMoveTemp = function(elFrom) {
	elFrom = elFrom || document;
	let e = elFrom.querySelector('#divFleetEditor');
	if (e) {
		if (FLEET_MODEL.fleetCurrent) {
			FLEET_MODEL.fleetCurrent.expanded = false
			FLEET_MODEL.fleetCurrent = null;
		}
		UI_FLEETEDITOR.doClose();
		document.getElementById('divFleetEditorTemp').appendChild(e);
	}
}

})();