COMMON.promiseI18n.then(() => {

var CONST = window.COMMON.getConst({
	numBattlesMax: 9,
	numCompMax: 12,
	
	numSimDefault: 10000,
	numSimMax: 10000000,
	
	urlDeckbuilder: 'http://www.kancolle-calc.net/deckbuilder.html?predeck=',
	urlLBASSim: 'https://noro6.github.io/kc-web?predeck=',
	urlJervis: 'https://jervis.vercel.app/?predeck=',
	urlCompassSim: 'https://x-20a.github.io/compass/?predeck=',
	urlKCNavEnemyComps: 'https://tsunkit.net/api/routing/maps/{maps}/edges/{edges}/enemycomps',
	urlKCNavFriendFleets: 'https://tsunkit.net/api/routing/maps/{maps}/edges/{edges}/friendfleets',
	urlKCNavAbnormalDamage: 'https://tsunkit.net/api/routing/abnormaldamage',
	urlDewyAbnormalDamage: 'https://raw.githubusercontent.com/sorewachigauyo/kc-event-bonus/master',
	kcnavEventFirst: 42,
	// kcnavDaysMax: 30,
	kcnavDateStart: '2019-03-22',
});

var MECHANICS_LIST = [
	{ key: 'artillerySpotting', name: 'Artillery Spotting' },
	{ key: 'AACI', name: 'Anti-Air Cut-In' },
	{ key: 'fitGun', name: 'Fit Gun' },
	{ key: 'OASW', name: 'Opening ASW' },
	{ key: 'CVCI', name: 'Carrier Cut-In' },
	{ key: 'destroyerNBCI', name: 'Destroyer NB Cut-In' },
	{ key: 'LBASBuff', name: 'LBAS/Support Revamp (Fall 17)' },
	{ key: 'eqBonus', name: 'Equipment Bonus' },
	{ key: 'installRevamp', name: 'New Soft-Skin Installation Mods' },
	{ key: 'newSupply', name: 'New Fuel/Ammo Node Costs' },
	{ key: 'enable_echelon', name: 'New Echelon Mods' },
	{ key: 'aaResist', name: 'Anti-Air Resist' },
	{ key: 'divebomberInstall', name: 'Divebomber Installation Targeting' },
	{ key: 'enable_DDCI', name: 'Destroyer NB Cut-In Buff (Double Hit)' },
	{ key: 'subFleetAttack', name: 'Submarine Fleet Attack' },
	{ key: 'kongouSpecialBuff', name: 'Kongou Special Buff' },
	{ key: 'coloradoSpecialFix', name: 'Colorado Special Fix' },
	{ key: 'eqBonusTorp', name: 'Torpedo Airstrike Use Equipment Bonus' },
	{ key: 'eqBonusASW', name: 'ASW Use Equipment Bonus' },
	{ key: 'ffReroll', name: 'Friend Fleet Flagship Reroll' },
	{ key: 'eqBonusAA', name: 'Anti-Air Use Equipment Bonus' },
	{ key: 'antiSubRaid', name: 'Anti-Sub Air Raid' },
	{ key: 'enable_ASWPlaneAir', name: 'Autogyro/Liaison Air Battle' },
	{ key: 'enable_AACIRework', name: 'AACI Rework (Sequential Roll + New Priority)' },
];




var UI_MAIN = Vue.createApp({
	data: () => ({
		fleetFMain: FLEET_MODEL.getBlankFleet({ isPlayer: 1 }),
		fleetFSupportN: FLEET_MODEL.getBlankFleet({ isSupport: 1 }),
		fleetFSupportB: FLEET_MODEL.getBlankFleet({ isSupport: 1 }),
		fleetsFFriend: [],
		landBases: FLEET_MODEL.getBlankLandBases(),
		lbExpanded: false,
		useSupportN: true,
		useSupportB: true,
		useFF: true,
		
		battles: [],
		
		settings: {
			retreatOnTaiha: true,
			replaceImpossibleFormations: true,
			mechanics: [],
			shellDmgCap: SIMCONSTS.shellDmgCap,
			aswDmgCap: SIMCONSTS.aswDmgCap,
			torpedoDmgCap: SIMCONSTS.torpedoDmgCap,
			nightDmgCap: SIMCONSTS.nightDmgCap,
			airDmgCap: SIMCONSTS.airDmgCap,
			supportDmgCap: SIMCONSTS.supportDmgCap,
			airRaidCostW6: SIMCONSTS.airRaidCostW6,
			showAdvanced: false,
			vanguardEvShellDD: SIMCONSTS.vanguardEvShellDD.slice(),
			vanguardEvTorpDD: SIMCONSTS.vanguardEvTorpDD.slice(),
			vanguardEvShellOther: SIMCONSTS.vanguardEvShellOther.slice(),
			vanguardEvTorpOther: SIMCONSTS.vanguardEvTorpOther.slice(),
			vanguardEvShellDDMod: SIMCONSTS.vanguardEvShellDDMod.slice(),
			vanguardEvTorpDDMod: SIMCONSTS.vanguardEvTorpDDMod.slice(),
			vanguardEvShellOtherMod: SIMCONSTS.vanguardEvShellOtherMod.slice(),
			vanguardEvTorpOtherMod: SIMCONSTS.vanguardEvTorpOtherMod.slice(),
			vanguardUseType: SIMCONSTS.vanguardUseType,
			nelsonTouchRate: SIMCONSTS.nelsonTouchRate,
			nagatoSpecialRate: SIMCONSTS.nagatoSpecialRate,
			mutsuSpecialRate: SIMCONSTS.mutsuSpecialRate,
			coloradoSpecialRate: SIMCONSTS.coloradoSpecialRate,
			kongouSpecialRate: SIMCONSTS.kongouSpecialRate,
			yamatoSpecial3Rate: SIMCONSTS.yamatoSpecial3Rate,
			yamatoSpecial2Rate: SIMCONSTS.yamatoSpecial2Rate,
			subFleetAttackRate: SIMCONSTS.subFleetAttackRate,
			richelieuSpecialRate: SIMCONSTS.richelieuSpecialRate,
			nelsonTouchUseFormula: true,
			nagatoSpecialUseFormula: true,
			mutsuSpecialUseFormula: true,
			kongouSpecialUseFormula: true,
			yamatoSpecial2UseFormula: true,
			nightZuiunCIRate: SIMCONSTS.nightZuiunCIRate,
			arcticCamoAr: SIMCONSTS.arcticCamoAr,
			arcticCamoEva: SIMCONSTS.arcticCamoEva,
			bucketPercent: BUCKETPERCENT*100,
			bucketTime: BUCKETTIME/3600,
			bucketTimeIgnore: 0,
			carryOverHP: CARRYOVERHP,
			carryOverMorale: CARRYOVERMORALE,
			enableSkipTorpBonus: SIMCONSTS.enableSkipTorpBonus,
			airstrikeDmgMF: SIMCONSTS.airstrikeDmgMF,
			airstrikeDmgMFRaid: SIMCONSTS.airstrikeDmgMFRaid,
			airstrikeDmgME: SIMCONSTS.airstrikeDmgME,
			airstrikeDmgEF: SIMCONSTS.airstrikeDmgEF,
			airstrikeDmgEFRaid: SIMCONSTS.airstrikeDmgEFRaid,
			airstrikeDmgEE: SIMCONSTS.airstrikeDmgEE,
			airstrikeAccMF: SIMCONSTS.airstrikeAccMF,
			airstrikeAccMFRaid: SIMCONSTS.airstrikeAccMFRaid,
			airstrikeAccME: SIMCONSTS.airstrikeAccME,
			airstrikeAccEF: SIMCONSTS.airstrikeAccEF,
			airstrikeAccEFRaid: SIMCONSTS.airstrikeAccEFRaid,
			airstrikeAccEE: SIMCONSTS.airstrikeAccEE,
			smokeChance: SIMCONSTS.smokeChance.slice(),
			smokeChanceUseFormula: SIMCONSTS.smokeChanceUseFormula,
			smokeModShellAccF: SIMCONSTS.smokeModShellAccF.slice(),
			smokeModShellAccFRadar: SIMCONSTS.smokeModShellAccFRadar.slice(),
			smokeModShellAccE: SIMCONSTS.smokeModShellAccE.slice(),
			smokeModShellAccERadar: SIMCONSTS.smokeModShellAccERadar.slice(),
			smokeModASWAccF: SIMCONSTS.smokeModASWAccF.slice(),
			smokeModASWAccE: SIMCONSTS.smokeModASWAccE.slice(),
			smokeModTorpAccF: SIMCONSTS.smokeModTorpAccF.slice(),
			smokeModTorpAccE: SIMCONSTS.smokeModTorpAccE.slice(),
			smokeModAirAccF: SIMCONSTS.smokeModAirAccF.slice(),
			smokeModAirAccE: SIMCONSTS.smokeModAirAccE.slice(),
			enableRangeWeights: SIMCONSTS.enableRangeWeights,
			overrideSupportChanceDayN: SIMCONSTS.overrideSupportChanceDayN,
			overrideSupportChanceDayB: SIMCONSTS.overrideSupportChanceDayB,
			overrideSupportChanceNightN: SIMCONSTS.overrideSupportChanceNightN,
			overrideSupportChanceNightB: SIMCONSTS.overrideSupportChanceNightB,
			balloonSelfAirMod: SIMCONSTS.balloonSelfAirMod.slice(),
			balloonSelfAirFlat: SIMCONSTS.balloonSelfAirFlat.slice(),
			balloonSelfLBASMod: SIMCONSTS.balloonSelfLBASMod.slice(),
			balloonSelfLBASFlat: SIMCONSTS.balloonSelfLBASFlat.slice(),
			balloonOppoAirMod: SIMCONSTS.balloonOppoAirMod.slice(),
			balloonOppoAirFlat: SIMCONSTS.balloonOppoAirFlat.slice(),
			balloonOppoLBASMod: SIMCONSTS.balloonOppoLBASMod.slice(),
			balloonOppoLBASFlat: SIMCONSTS.balloonOppoLBASFlat.slice(),
		},
		settingsFCF: {
			los: null,
			losC: 4,
			losNode: 0,
			radarCount: 0,
			radarNode: 0,
			rules: [],
			dameconNode: 0,
		},
		autoBonus: null,
		
		canSim: true,
		numSim: CONST.numSimDefault,
		simProgressNum: 0,
		simProgressTotal: 0,
		results: {
			active: false,
			showCFWarning: false,
			isFromImport: false,
			errors: [],
			warnings: [],
			numNodes: 0,
			hasCF: false,
			hasSF: false,
			totalNum: 0,
			rankS: 0, rankA: 0, rankB: 0, rankC: 0, rankD: 0, rankE: 0, retreat: 0,
			flagSunk: 0, flagSunkHP: 0, flagSunkHPBoss: 0, transport: 0,
			rankSNode: [], rankANode: [], rankBNode: [], rankCNode: [], rankDNode: [], rankENode: [], flagSunkNode: [],
			mvp1: [], mvp2: [], mvp3: [], mvp4: [], mvp5: [], mvp6: [], mvp7: [],
			mvpE1: [], mvpE2: [], mvpE3: [], mvpE4: [], mvpE5: [], mvpE6: [],
			airASP: [], airAS: [], airAP: [], airAD: [], airAI: [],
			taiha: [],
			taiha1: [], taiha2: [], taiha3: [], taiha4: [], taiha5: [], taiha6: [], taiha7: [],
			taihaE1: [], taihaE2: [], taihaE3: [], taihaE4: [], taihaE5: [], taihaE6: [],
			noChuuha: [],
			fuelSupply: 0, ammoSupply: 0, bauxSupply: 0,
			fuelRepair: 0, steelRepair: 0, bucket: 0, damecon: 0,
			fuelS: 0, ammoS: 0, steelS: 0, bauxS: 0, bucketS: 0, dameconS: 0,
			fuelSunk: 0, ammoSunk: 0, steelSunk: 0, bauxSunk: 0, bucketSunk: 0, dameconSunk: 0,
			emptiedPlane: 0, emptiedLBAS: 0,
		},
		
		lang: 'en',
		canSave: false,
		
		showNoticeCount: 0,
		noticeTxt: '',
		showMechanics: false,
		
		isDragging: false,
		showDropdownPlayer: false,
		showDropdownBattles: false,
		showDropdownSettings: false,
	}),
	mounted: function() {
		this.$i18n.locale = localStorage.sim2_lang || 'en';
		
		this.addNewComp(this.fleetsFFriend,{ isFriend: 1 });
		
		SIMCONSTS.defaults = {};
		for (let key in this.settings) {
			if (['mechanics','showAdvanced'].includes(key)) continue;
			if (Array.isArray(this.settings[key])) {
				SIMCONSTS.defaults[key] = this.settings[key].slice();
			} else {
				SIMCONSTS.defaults[key] = this.settings[key];
			}
		}
		for (let obj of MECHANICS_LIST) {
			this.settings.mechanics.push({ key: obj.key, name: obj.name, enabled: true });
		}
		this.addNewBattle();
		
		COMMON.BONUS_MANAGER.init(this);
		
		initEQDATA(() => {
			document.body.style = '';
			let dataSave = null, dataReplay = null;
			let finishInit = function() {
				CONVERT.loadSave(dataSave,this);
				this.canSave = true;
				if (this.autoBonus) {
					UI_AUTOBONUS.doOpenPreloader(this.autoBonus);
				}
				if (dataReplay) {
					let autoBonus = COMMON.BONUS_MANAGER.getAutoBonusFromReplay(dataReplay) ;
					if (autoBonus) {
						UI_AUTOBONUS.doOpen(autoBonus);
					}
				}
				setTimeout(function() {
					if (document.querySelector('#divSettingsAdvanced input.changed')) this.settings.showAdvanced = true;
					if (document.querySelector('#divSettingsMechanics input.changed') || this.settings.mechanics.find(m => !m.enabled)) this.showMechanics = true;
				}.bind(this),1);
			}.bind(this);
			if (window.location.hash.length >= 3) {
				if (window.location.hash.substr(0,8) == '#backup=') {
					let ab;
					try {
						ab = COMMON.base64ToArrayBuffer(window.location.hash.substr(8));
					} catch(e) {
						console.log('bad backup url (buffer)');
						console.error(e);
					}
					if (ab) {
						document.body.style = 'display:none';
						window.location.hash = '';
						LZMA.decompress(ab, (dataStr) => {
							document.body.style = '';
							let dataJSON;
							if (dataStr === null) {
								console.log('bad backup url (null)')
							} else {
								try {
									dataJSON = JSON.parse(dataStr);
								} catch(e) {
									console.log('bad JSON backup url:');
									console.error(e);
								}
							}
							if (dataJSON) {
								console.log('backup url import');
								dataSave = dataJSON;
								if (localStorage.sim2 && !CONVERT.saveIsEmpty(JSON.parse(localStorage.sim2))) {
									let style = document.createElement('style');
									style.innerText = '#divMain > *, #divOther { display: none; }';
									document.head.appendChild(style);
									UI_BACKUP.doOpen(() => { document.head.removeChild(style); finishInit(); });
									return;
								} else {
									finishInit();
								}
							} else {
								if (!dataSave && localStorage.sim2) {
									dataSave = JSON.parse(localStorage.sim2);
								}
								finishInit();
							}
						});
						return;
					}
				} else {
					let dataHash;
					try {
						dataHash = JSON.parse(decodeURIComponent(window.location.hash.substr(1)));
					} catch(e) {
						console.log('bad JSON hash:');
						console.error(e);
					}
					window.location.hash = '';
					if (dataHash) {
						if (dataHash.fleet1 && dataHash.battles && !dataHash.source) { //replay import
							console.log('replay import');
							dataReplay = dataHash;
							dataSave = CONVERT.replayToSave(dataReplay);
							this.settings.airRaidCostW6 = dataReplay.world == 6;
							if (localStorage.sim2 && !CONVERT.saveIsEmpty(JSON.parse(localStorage.sim2))) {
								let style = document.createElement('style');
								style.innerText = '#divMain > *, #divOther { display: none; }';
								document.head.appendChild(style);
								UI_BACKUP.doOpen(() => { document.head.removeChild(style); finishInit(); });
								return;
							}
						} else if (dataHash.fleetF && dataHash.nodes) { //sim data
							console.log('sim data');
							this.initSimImport(dataHash);
							return;
						}
					}
				}
			}
			window.location.hash = '';
			if (!dataSave && localStorage.sim2) {
				dataSave = JSON.parse(localStorage.sim2);
			}
			finishInit();
		});
	},
	computed: {
		canDeleteBattles: function() {
			return this.battles.length > 1;
		},
		hasFCFSettings: function() {
			return !!(this.settingsFCF.los || this.settingsFCF.radarCount || this.settingsFCF.rules.length
				|| (this.fleetFMain.ships && this.fleetFMain.ships.find(s => s.neverFCF))
				|| (this.fleetFMain.shipsEscort && this.fleetFMain.shipsEscort.find(s => s.neverFCF))
			);
		},
		
		autoBonusStatus: function() {
			return !this.autoBonus ? this.$i18n.t('autobonus_off') : this.$i18n.t('autobonus_active');
		},
		classAutoBonusStatus: function() {
			return this.autoBonus ? 'good' : '';
		},
		autoBonusName: function() {
			if (!this.autoBonus) return '';
			if (this.autoBonus.type == 'preset') return this.$i18n.t('autobonus_preset') + ': ' + this.$i18n.t('bonus.' + COMMON.BONUS_MANAGER.PRESET_INDEX[this.autoBonus.key].name);
			if (this.autoBonus.type == 'dewy') return 'kc-event-bonus: ' + COMMON.BONUS_MANAGER.getDewyName(this.autoBonus.key);
			return '';
		},
		autoBonusNodes: function() {
			return this.autoBonus ? this.battles.map(battle => this.autoBonus.nodeToLetter[battle.id] || this.$i18n.t('autobonus_node_default')).join('\u2192') + (this.autoBonus.useDebuff ? this.$i18n.t('autobonus_debuffed') : '') : '';
		},
		
		numSimMax: function() {
			return CONST.numSimMax;
		},
		simProgressPercent: function() {
			return Math.round(100*this.simProgressNum/this.simProgressTotal);
		},
	},
	methods: {
		addNewBattle: function(indAt) {
			if (this.battles.length >= CONST.numBattlesMax) return;
			indAt = indAt != null ? indAt : this.battles.length;
			let battle = {
				id: COMMON.ID_GEN.nextId('battle'),
				ind: indAt,
				
				formation: this.fleetFMain.combined ? CONST.formationCombinedDefault : CONST.formationSingleDefault,
				nodeType: CONST.NODE_NORMAL,
				doNB: false,
				doNBCond: '',
				lbasWaves: [false,false,false,false,false,false],
				addCostFuel: null,
				addCostAmmo: null,
				addCostMax: null,
				subOnly: false,
				useNormalSupport: 0,
				useBalloon: false,
				useAtoll: false,
				useSmoke: false,
				useAnchorageRepair: false,
					
				enemyComps: [],
			};
			for (let i=indAt; i<this.battles.length; i++) {
				this.battles[i].ind++;
			}
			this.battles.splice(indAt,0,battle);
			this.addNewComp(battle.enemyComps,{ isEnemy: 1 });
		},
		deleteBattle: function(indAt,elFrom) {
			if (this.battles.length <= 1) return;
			COMMON.global.fleetEditorMoveTemp(elFrom);
			for (let i=indAt; i<this.battles.length; i++) {
				this.battles[i].ind--;
			}
			if (this.settingsFCF.dameconNode == this.battles[indAt].id) this.settingsFCF.dameconNode = 0;
			this.battles.splice(indAt,1);
		},
		addNewComp: function(comps,args) {
			if (comps.length >= CONST.numCompMax) return;
			let comp = {
				num: comps.length+1,
				rate: 0,
				fleet: FLEET_MODEL.getBlankFleet(args || (comps[0] && comps[0].fleet)),
			};
			comps.push(comp);
		},
		deleteComp: function(comps,elFrom) {
			if (comps.length <= 1) return;
			COMMON.global.fleetEditorMoveTemp(elFrom);
			comps.pop();
		},
		
		updateResults: function(resultSim) {
			for (let key in this.results) {
				if (key == 'errors' || key == 'warnings') continue;
				if (Array.isArray(this.results[key])) {
					this.results[key] = [];
				}
			}
					
			let formatNum = (num) => Math.round(1000*num)/1000;
			
			let totalNum = resultSim.totalnum;
			this.results.totalNum = totalNum;
			this.results.numNodes = resultSim.nodes.length;
			this.results.hasCF = this.fleetFMain.combined;
			this.results.hasSF = this.fleetFMain.type == CONST.SF;
			
			let nodeLast = resultSim.nodes.at(-1);
			for (let letter in nodeLast.ranks) {
				let key = 'rank'+letter;
				this.results[key] = formatNum(nodeLast.ranks[letter] / totalNum);
			}
			this.results.retreat = formatNum((totalNum-nodeLast.num) / totalNum);
			this.results.flagSunk = formatNum(nodeLast.flagsunk / totalNum);
			this.results.flagSunkHP = formatNum(resultSim.totalGaugeDamage / totalNum);
			this.results.flagSunkHPBoss = formatNum(resultSim.totalGaugeDamage / nodeLast.num);
			this.results.transport = formatNum(resultSim.totalTransport / totalNum);
			
			this.results.fuelSupply = formatNum(resultSim.totalFuelS / totalNum);
			this.results.ammoSupply = formatNum(resultSim.totalAmmoS / totalNum);
			this.results.bauxSupply = formatNum(resultSim.totalBauxS / totalNum);
			this.results.fuelRepair = formatNum(resultSim.totalFuelR / totalNum);
			this.results.steelRepair = formatNum(resultSim.totalSteelR / totalNum);
			this.results.bucket = formatNum(resultSim.totalBuckets / totalNum);
			this.results.damecon = formatNum(resultSim.totalDamecon / totalNum);
			
			let rateS = nodeLast.ranks.S / totalNum;
			this.results.fuelS = formatNum((resultSim.totalFuelS + resultSim.totalFuelR) / totalNum / rateS);
			this.results.ammoS = formatNum((resultSim.totalAmmoS) / totalNum / rateS);
			this.results.steelS = formatNum((resultSim.totalSteelR) / totalNum / rateS);
			this.results.bauxS = formatNum((resultSim.totalBauxS) / totalNum / rateS);
			this.results.bucketS = formatNum((resultSim.totalBuckets) / totalNum / rateS);
			this.results.dameconS = formatNum((resultSim.totalDamecon) / totalNum / rateS);
			
			this.results.emptiedPlane = formatNum(resultSim.totalEmptiedPlanes / totalNum);
			this.results.emptiedLBAS = formatNum(resultSim.totalEmptiedLBAS / totalNum);
			
			let rateSunk = nodeLast.flagsunk / totalNum;
			this.results.fuelSunk = formatNum((resultSim.totalFuelS + resultSim.totalFuelR) / totalNum / rateSunk);
			this.results.ammoSunk = formatNum((resultSim.totalAmmoS) / totalNum / rateSunk);
			this.results.steelSunk = formatNum((resultSim.totalSteelR) / totalNum / rateSunk);
			this.results.bauxSunk = formatNum((resultSim.totalBauxS) / totalNum / rateSunk);
			this.results.bucketSunk = formatNum((resultSim.totalBuckets) / totalNum / rateSunk);
			this.results.dameconSunk = formatNum((resultSim.totalDamecon) / totalNum / rateSunk);
			
			for (let i=0; i<resultSim.nodes.length; i++) {
				let node = resultSim.nodes[i];
				for (let letter in node.ranks) {
					let key = 'rank'+letter;
					this.results[key+'Node'][i] = formatNum(node.ranks[letter] / node.num);
				}
				this.results.flagSunkNode[i] = formatNum(node.flagsunk / node.num);
				this.results.taiha[i] = formatNum(node.taiha / node.num);
				this.results.noChuuha[i] = formatNum(node.undamaged / node.num);
				for (let num=1; num<=7; num++) {
					this.results['mvp'+num][i] = formatNum(node.mvps[num-1] / node.num);
					this.results['taiha'+num][i] = formatNum(node.taihaIndiv[num-1] / node.num);
				}
				for (let num=1; num<=6; num++) {
					this.results['mvpE'+num][i] = formatNum(node.mvpsC[num-1] / node.num);
					this.results['taihaE'+num][i] = formatNum(node.taihaIndivC[num-1] / node.num);
				}
				this.results.airAI[i] = formatNum(node.airStates[0] / node.num);
				this.results.airAD[i] = formatNum(node.airStates[1] / node.num);
				this.results.airAP[i] = formatNum(node.airStates[2] / node.num);
				this.results.airAS[i] = formatNum(node.airStates[3] / node.num);
				this.results.airASP[i] = formatNum(node.airStates[4] / node.num);
			}
		},
		
		onclickInsertBattle: function(ind) {
			this.addNewBattle(ind);
		},
		onchangeLang: function() {
			localStorage.sim2_lang = this.$i18n.locale;
		},
		
		onchangeMechanic: function(mechanic) {
			if (mechanic.key == 'eqBonus') {
				COMMON.global.fleetEditorToggleEquipBonus(mechanic.enabled);
			}
		},
		onclickRestoreSettings: function() {
			for (let key in SIMCONSTS.defaults) {
				if (Array.isArray(this.settings[key])) {
					this.settings[key] = SIMCONSTS.defaults[key].slice();
				} else {
					this.settings[key] = SIMCONSTS.defaults[key];
				}
			}
			for (let mechanic of this.settings.mechanics) {
				mechanic.enabled = true;
			}
		},
		getClassSetting: function(key,index) {
			return SIMCONSTS.defaults && (index != null ? this.settings[key][index] != SIMCONSTS.defaults[key][index] : this.settings[key] != SIMCONSTS.defaults[key]) ? { 'changed': true } : null;
		},
		onclickVanguardSet: function(type) {
			if (type == 'event') {
				for (let i=0; i<SIMCONSTS.vanguardEvShellDDModEvent.length; i++) {
					this.settings.vanguardEvShellDDMod[i] = SIMCONSTS.vanguardEvShellDDModEvent[i];
				}
				for (let i=0; i<SIMCONSTS.vanguardEvTorpDDModEvent.length; i++) {
					this.settings.vanguardEvTorpDDMod[i] = SIMCONSTS.vanguardEvTorpDDModEvent[i];
				}
			} else if (type == 'normal') {
				for (let i=0; i<SIMCONSTS.vanguardEvShellDDModNormal.length; i++) {
					this.settings.vanguardEvShellDDMod[i] = SIMCONSTS.vanguardEvShellDDModNormal[i];
				}
				for (let i=0; i<SIMCONSTS.vanguardEvTorpDDModNormal.length; i++) {
					this.settings.vanguardEvTorpDDMod[i] = SIMCONSTS.vanguardEvTorpDDModNormal[i];
				}
			}
		},
		onclickSmokeSet: function() {
			this.settings.smokeModShellAccF = SIMCONSTS.smokeEst.smokeModShellAccF.slice();
			this.settings.smokeModShellAccFRadar = SIMCONSTS.smokeEst.smokeModShellAccFRadar.slice();
			this.settings.smokeModShellAccE = SIMCONSTS.smokeEst.smokeModShellAccE.slice();
			this.settings.smokeModShellAccERadar = SIMCONSTS.smokeEst.smokeModShellAccERadar.slice();
			this.settings.smokeModASWAccF = SIMCONSTS.smokeEst.smokeModASWAccF.slice();
			this.settings.smokeModASWAccE = SIMCONSTS.smokeEst.smokeModASWAccE.slice();
			this.settings.smokeModTorpAccF = SIMCONSTS.smokeEst.smokeModTorpAccF.slice();
			this.settings.smokeModTorpAccE = SIMCONSTS.smokeEst.smokeModTorpAccE.slice();
			this.settings.smokeModAirAccF = SIMCONSTS.smokeEst.smokeModAirAccF.slice();
			this.settings.smokeModAirAccE = SIMCONSTS.smokeEst.smokeModAirAccE.slice();
		},
		
		_includeError(error) {
			return (this.results.isFromImport || !error.excludeClient) && (!this.results.isFromImport || !error.excludeImport);
		},
		callbackSimStats: function(res) {
			if (res.errors) {
				this.results.errors = res.errors.filter(obj => this._includeError(obj)).map(obj => ({ key: obj.key, args: obj.args }));
				this.canSim = true;
				return;
			}
			if (res.warnings) {
				this.results.warnings = res.warnings.filter(obj => this._includeError(obj)).map(obj => ({ key: obj.key, args: obj.args }));
			}
			if (res.didReset) {
				this.results.active = false;
			}
			if (res.progress != null) {
				this.simProgressNum = res.progress;
				this.simProgressTotal = res.progressTotal;
			}
			if (res.result) {
				this.results.active = true;
				this.updateResults(res.result);
				this.canSim = true;
				console.log(res.result);
			}
		},
		onclickGo: function() {
			if (!this.canSim) return;
			this.results.errors = [];
			this.numSim = Math.min(this.numSim,CONST.numSimMax);
			this.canSim = false;
			SIM.runStats(CONVERT.uiToSimInput(this),this.callbackSimStats);
			
			this.results.showCFWarning = !!(this.fleetFMain.combined || this.battles.find(battle => +battle.formation == 6 || battle.enemyComps.find(comp => comp.fleet.combined || comp.fleet.formation == 6)));
		},
		onclickWatch: function() {
			if (!this.canSim) return;
			this.results.errors = [];
			let replay = CONVERT.uiToReplay(this);
			let errors = SIM.runReplay(CONVERT.uiToSimInput(this),replay);
			if (errors) {
				this.results.errors = errors.filter(obj => this._includeError(obj)).map(obj => ({ key: obj.key, args: obj.args }));
				return;
			}
			console.log(replay)
			let s = JSON.stringify(replay);
			window.open('battleplayer.html#'+s,'_blank');
		},
		onclickClear: function() {
			if (!this.canSim) return;
			this.results.active = false;
			SIM.resetStats();
		},
		onclickCancel: function() {
			SIM.cancelRun = true;
		},
		
		onclickCopyResults: function(typeString) {
			let t = this.$i18n.t;
			let txt = '';
			if (typeString == 'S') {
				let rateNonS = 1 - this.results.rankS - this.results.retreat;
				txt += `${t('results.S_rate')}: ${Math.round(this.results.rankS*1000)/10}% (${t('results.retreat_rate')}: ${Math.round(this.results.retreat*1000)/10}%, ${t('results.non_S_rate')}: ${Math.round(rateNonS*1000)/10}%)
${t('results.avg_per_S')}
${t('results.fuel')}:	${this.results.fuelS}
${t('results.ammo')}:	${this.results.ammoS}
${t('results.steel')}:	${this.results.steelS}
${t('results.baux')}:	${this.results.bauxS}
${t('results.buckets')}:	${this.results.bucketS}`;
				if (this.results.dameconS) {
					txt += '\n' + t('results.damecon') + ':\t' + this.results.dameconS;
				}
			} else if (typeString == 'flagsunk') {
				let rateNonSunk = 1 - this.results.flagSunk - this.results.retreat;
				txt += `${t('results.flagsunk_rate')}: ${Math.round(this.results.flagSunk*1000)/10}% (${t('results.retreat_rate')}: ${Math.round(this.results.retreat*1000)/10}%, ${t('results.non_flagsunk_rate')}: ${Math.round(rateNonSunk*1000)/10}%)
${t('results.avg_per_flagsunk')}
${t('results.fuel')}:	${this.results.fuelSunk}
${t('results.ammo')}:	${this.results.ammoSunk}
${t('results.steel')}:	${this.results.steelSunk}
${t('results.baux')}:	${this.results.bauxSunk}
${t('results.buckets')}:	${this.results.bucketSunk}`;
				if (this.results.dameconSunk) {
					txt += '\n' + t('results.damecon') + ':\t' + this.results.dameconSunk;
				}
			}
			navigator.clipboard.writeText(txt);
			this.noticeTxt = t('copied_to_clipboard');
			let n = ++this.showNoticeCount;
			setTimeout(() => n == this.showNoticeCount && (this.showNoticeCount = 0), 1000);
		},
		onclickScreenShot: function() {
			this.$refs.divResults.style.backgroundColor = window.getComputedStyle(document.body).backgroundColor;
			html2canvas(this.$refs.divResults).then(canvas => {
				canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({ 'image/png':blob })]));
				this.noticeTxt = this.$i18n.t('copied_to_clipboard');
				let n = ++this.showNoticeCount;
				setTimeout(() => n == this.showNoticeCount && (this.showNoticeCount = 0), 1000);
				
				let filename = 'KanColle_Sortie_Simulator_Statistics_' + (new Date).toISOString().slice(0,19).replace(/:/g,'-') + '.png';
				let a = window.document.createElement('a');
				a.href = canvas.toDataURL('image/png');
				a.download = filename;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			});
			this.$refs.divResults.style.backgroundColor = '';
		},
		
		onclickDeckbuilder: function() {
			UI_DECKBUILDERIMPORTER.doOpen();
		},
		
		onclickBonusImporter: function() {
			UI_BONUSIMPORTER.doOpen();
		},
		onclickAutoBonus: function() {
			UI_AUTOBONUS.doOpen(this.autoBonus);
		},
		
		onclickBackup: function() {
			UI_BACKUP.doOpen();
		},
		
		initSimImport: function(dataInput) {
			let style = document.createElement('style');
			style.innerText = '#divMain > *, #divOther { display: none; }';
			document.head.appendChild(style);
			this.canSim = false;
			this.results.isFromImport = true;
			SIM.runStats(dataInput,this.callbackSimStats);
		},
		
		onclickSetFCF: function() {
			UI_FCFSETTINGS.doOpen(this.settingsFCF);
		},
		
		onclickNavButton: function(ref,idx) {
			let e = this.$refs[ref];
			if (idx != null) e = this.$refs[ref][idx];
			e.scrollIntoView({ behavior: 'smooth' });
		},
		onclickNavSim: function() {
			this.$refs.divSimulationScroll.scrollIntoView();
			this.onclickGo();
		},
		
		
		getNelsonTouchFormula: function() {
			if (FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[0]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[2]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[4])) return 0;
			let rate = 25;
			rate += 1.1*Math.sqrt(this.fleetFMain.ships[0].level) + 1.4*Math.sqrt(this.fleetFMain.ships[0].statsBase.luk);
			rate += Math.sqrt(this.fleetFMain.ships[2].level);
			rate += Math.sqrt(this.fleetFMain.ships[4].level);
			return Math.max(0, Math.min(100, Math.floor(rate)));
		},
		getNagatoSpecialFormula: function() {
			if (FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[0]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[1])) return 0;
			let rate = 25;
			rate += Math.sqrt(this.fleetFMain.ships[0].level) + 1.5*Math.sqrt(this.fleetFMain.ships[0].statsBase.luk);
			rate += Math.sqrt(this.fleetFMain.ships[1].level) + 1.5*Math.sqrt(this.fleetFMain.ships[1].statsBase.luk);
			return Math.max(0, Math.min(100, Math.floor(rate)));
		},
		getKongouSpecialFormula: function() {
			if (FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[0]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[1])) return 0;
			let rate = -33;
			rate += 3.5*Math.sqrt(this.fleetFMain.ships[0].level) + 1.1*Math.sqrt(this.fleetFMain.ships[0].statsBase.luk);
			rate += 3.5*Math.sqrt(this.fleetFMain.ships[1].level) + 1.1*Math.sqrt(this.fleetFMain.ships[1].statsBase.luk);
			if (this.fleetFMain.ships[0].mstId == 591) {
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 8)) rate += 30;
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [42].includes(EQDATA[eq.mstId].type))) rate += 10;
			} else if (this.fleetFMain.ships[0].mstId == 592) {
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 8)) rate += 10;
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [42].includes(EQDATA[eq.mstId].type))) rate += 30;
			} else if (this.fleetFMain.ships[0].mstId == 593) {
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 8)) rate += 15;
			} else if (this.fleetFMain.ships[0].mstId == 954) {
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 8)) rate += 20;
			}
			return Math.max(0, Math.min(100, Math.floor(rate)));
		},
		getYamatoSpecial2Formula: function() {
			if (FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[0]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[1])) return 0;
			let rate = 33;
			rate += Math.sqrt(this.fleetFMain.ships[0].level) + 1.25*Math.sqrt(this.fleetFMain.ships[0].statsBase.luk);
			rate += Math.sqrt(this.fleetFMain.ships[1].level) + 1.25*Math.sqrt(this.fleetFMain.ships[1].statsBase.luk);
			if ([911,916].includes(this.fleetFMain.ships[1].mstId)) rate += 4;
			if ([143,148,546].includes(this.fleetFMain.ships[1].mstId)) rate += 7;
			if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].ACC >= 8)) rate += 10;
			if (this.fleetFMain.ships[1].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].ACC >= 8)) rate += 10;
			return Math.max(0, Math.min(100, Math.floor(rate)));
		},
		
		getNelsonTouchFormulaJervis: function() {
			if (FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[0]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[2]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[4])) return 0;
			let rate = 12;
			rate += 2*Math.sqrt(this.fleetFMain.ships[0].level) + Math.sqrt(this.fleetFMain.ships[0].statsBase.luk);
			rate += Math.sqrt(this.fleetFMain.ships[2].level) + .5*Math.sqrt(this.fleetFMain.ships[2].statsBase.luk);
			rate += Math.sqrt(this.fleetFMain.ships[4].level) + .5*Math.sqrt(this.fleetFMain.ships[4].statsBase.luk);
			return Math.max(0, Math.min(100, Math.floor(rate)));
		},
		getNagatoSpecialFormulaJervis: function() {
			if (FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[0]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[1])) return 0;
			let rate = 30;
			rate += Math.sqrt(this.fleetFMain.ships[0].level) + 1.2*Math.sqrt(this.fleetFMain.ships[0].statsBase.luk);
			rate += Math.sqrt(this.fleetFMain.ships[1].level) + 1.2*Math.sqrt(this.fleetFMain.ships[1].statsBase.luk);
			return Math.max(0, Math.min(100, Math.floor(rate)));
		},
		getKongouSpecialFormulaJervis: function() {
			if (FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[0]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[1])) return 0;
			let rate = -55;
			rate += 6*Math.sqrt(this.fleetFMain.ships[0].level) + 1.2*Math.sqrt(this.fleetFMain.ships[0].statsBase.luk);
			rate += 3*Math.sqrt(this.fleetFMain.ships[1].level) + .6*Math.sqrt(this.fleetFMain.ships[1].statsBase.luk);
			if (this.fleetFMain.ships[0].mstId == 591) {
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 8)) rate += 31;
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [42].includes(EQDATA[eq.mstId].type))) rate += 10;
			} else if (this.fleetFMain.ships[0].mstId == 592) {
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 8)) rate += 10;
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [42].includes(EQDATA[eq.mstId].type))) rate += 31;
			} else if (this.fleetFMain.ships[0].mstId == 593) {
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 8)) rate += 16;
			} else if (this.fleetFMain.ships[0].mstId == 954) {
				if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 8)) rate += 21;
			}
			return Math.max(0, Math.min(100, Math.floor(rate)));
		},
		getYamatoSpecial2FormulaJervis: function() {
			if (FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[0]) || FLEET_MODEL.shipIsEmpty(this.fleetFMain.ships[1])) return 0;
			let rate = 35;
			rate += Math.sqrt(this.fleetFMain.ships[0].level) + Math.sqrt(this.fleetFMain.ships[0].statsBase.luk);
			rate += Math.sqrt(this.fleetFMain.ships[1].level) + Math.sqrt(this.fleetFMain.ships[1].statsBase.luk);
			if ([911,916].includes(this.fleetFMain.ships[0].mstId)) rate += 2;
			if (SHIPDATA[this.fleetFMain.ships[1].mstId].sclass == 37) rate += 5;
			if (this.fleetFMain.ships[0].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 5)) rate += 10;
			if (this.fleetFMain.ships[1].equips.find(eq => eq.mstId && [12,13,93].includes(EQDATA[eq.mstId].type) && EQDATA[eq.mstId].LOS >= 5)) rate += 10;
			return Math.max(0, Math.min(100, Math.floor(rate)));
		},
	},
}).component('vbattle',{
	props: ['battle','candelete','isboss'],
	data: () => ({
		
	}),
	mounted: function() {
		
	},
	computed: {
		hasNB: function() {
			return this.battle.nodeType == CONST.NODE_NORMAL || this.battle.nodeType == CONST.NODE_AIR;
		},
		battleClass: function() {
			return {
				normal: this.battle.nodeType==CONST.NODE_NORMAL,
				night: this.battle.nodeType==CONST.NODE_NIGHT,
				raid: this.battle.nodeType==CONST.NODE_RAID,
				air: this.battle.nodeType==CONST.NODE_AIR,
			};
		},
		hasCombinedFormations: function() {
			return this.battle.nodeType != CONST.NODE_NIGHT && UI_MAIN.fleetFMain.combined;
		},
	},
	methods: {
		hasBonusMain: function() {
			for (let key of ['ships','shipsEscort']) {
				if (UI_MAIN.fleetFMain[key] && UI_MAIN.fleetFMain[key].find(ship => !FLEET_MODEL.shipIsEmpty(ship) && ((ship.bonusByNode[this.battle.id] && Object.values(ship.bonusByNode[this.battle.id]).find(v => v))) || this.getShipHasPlaneBonus(ship))) return true;
			}
			return false;
		},
		hasBonusLBAS: function() {
			return false;
		},
		hasBonusFF: function() {
			return false;
		},
		hasSpecialAttack: function() {
			return COMMON.checkSpecialAttackUI(UI_MAIN,this.battle.formation);
		},
		getShipHasPlaneBonus: function(ship) {
			return !!(ship.equips && ship.equips.find(equip => equip.bonusByNode && equip.bonusByNode[this.battle.id] && equip.bonusByNode[this.battle.id].bonusGroups));
		},
		
		onclickDeleteBattle: function() {
			UI_MAIN.deleteBattle(this.battle.ind,this.$refs.comps);
		},
		onclickSetBonus: function() {
			UI_BONUSEDITOR.doOpen(this.battle.id,this.battle.ind == UI_MAIN.battles.length-1);
		},
		onclickImportBonus: function() {
			UI_BONUSIMPORTER.doOpen(this.battle.id);
		},
		
		onchangeLbasWaves: function(ind) {
			COMMON.BONUS_MANAGER.applyAutoLBAS(ind);
		},
	},
	watch: {
		hasCombinedFormations: function() {
			if (this.hasCombinedFormations) {
				if (this.battle.formation < 10) this.battle.formation = CONST.formationCombinedDefault;
			} else {
				if (this.battle.formation > 10) this.battle.formation = CONST.formationSingleDefault;
			}
		},
	},
	template: document.getElementById('tmpBattle')
}).component('vfleetcomps',{
	props: ['comps','fleetname','canimportkcnav','isfriendfleet'],
	data: () => ({
		
	}),
	computed: {
		canAddComp: function() {
			return this.comps.length < CONST.numCompMax;
		},
	},
	methods: {
		getCompPercent: function(comp) {
			let total = this.comps.reduce((a,b) => a + Math.max(0,b.rate),0);
			if (total <= 0) return Math.round(100/this.comps.length);
			return Math.round(100*Math.max(0,comp.rate)/total);
		},
		
		onclickAddComp: function() {
			UI_MAIN.addNewComp(this.comps);
		},
		onclickRemoveComp: function(battle) {
			UI_MAIN.deleteComp(this.comps,this.$refs['comp'+this.comps.length][0]);
		},
		onclickImportKCNav: function() {
			UI_KCNAVCOMPIMPORTER.doOpen(this.comps,this.isfriendfleet);
		},
	},
	template: document.getElementById('tmpFleetComps')
}).component('vfleet',CMP_FLEET).component('vlbaseditor',CMP_LBASEDITOR).use(COMMON.i18n).mount('#divMain');




var UI_BONUSEDITOR = Vue.createApp({
	data: () => ({
		active: false,
		shipGroups: [],
		nodeId: 0,
		isBossNode: false,
	}),
	methods: {
		doOpen: function(nodeId,isBossNode) {
			this.active = true;
			this.nodeId = nodeId;
			this.isBossNode = isBossNode;
			this.shipGroups = [];
			this.shipGroups.push(UI_MAIN.fleetFMain.ships.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)));
			if (UI_MAIN.fleetFMain.shipsEscort && UI_MAIN.fleetFMain.combined) this.shipGroups.push(UI_MAIN.fleetFMain.shipsEscort.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)));
			for (let ships of this.shipGroups) {
				for (let ship of ships) {
					if (!ship.mstId) continue;
					if (!ship.bonusByNode[nodeId]) ship.bonusByNode[nodeId] = {};
				}
			}
		},
		doClose: function() {
			this.active = false;
		},
		
		getShipHasPlane: function(ship) {
			return !!ship.equips.find(equip => equip.mstId && EQTDATA[EQDATA[equip.mstId].type].isPlane);
		},
		getShipHasPlaneBonus: function(ship) {
			return !!ship.equips.find(equip => equip.bonusByNode && equip.bonusByNode[this.nodeId] && equip.bonusByNode[this.nodeId].bonusGroups);
		},
		getShipHasPlaneBonusMapwide: function(ship) {
			if (this.getShipHasPlaneBonus(ship)) return false;
			return !!ship.equips.find(equip => equip.bonusGroups);
		},
		onclickPlaneBonus: function(ship) {
			if (!this.getShipHasPlane(ship)) return;
			COMMON.global.fleetEditorOpenPlaneBonus(ship,this.nodeId);
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).use(COMMON.i18n).mount('#divBonusEditor');


var UI_DECKBUILDERIMPORTER = Vue.createApp({
	data: () => ({
		active: false,
		textImport: '',
		textExport: '',
		importMain: true,
		importSupportN: true,
		importSupportB: true,
		importLBAS: true,
		fleetNumMain: 11,
		fleetNumSupportN: 3,
		fleetNumSupportB: 4,
	}),
	methods: {
		doOpen: function() {
			this.active = true;
			let dataDb = this.getDataDb();
			this.textExport = JSON.stringify(dataDb);
		},
		
		getDataDb: function() {
			let dataDb = CONVERT.saveToDeckbuilderFleet(CONVERT.uiToSaveFleet(UI_MAIN.fleetFMain));
			dataDb.f3 = CONVERT.saveToDeckbuilderFleet(CONVERT.uiToSaveFleet(UI_MAIN.fleetFSupportN)).f1;
			dataDb.f4 = CONVERT.saveToDeckbuilderFleet(CONVERT.uiToSaveFleet(UI_MAIN.fleetFSupportB)).f1;
			if (UI_MAIN.fleetFMain.type == CONST.SF) {
				dataDb.f2 = dataDb.f3;
				dataDb.f3 = dataDb.f1;
			}
			let dataDbLBAS = CONVERT.saveToDeckbuilderLBAS(CONVERT.uiToSaveLBAS(UI_MAIN.landBases));
			for (let key in dataDbLBAS) {
				dataDb[key] = dataDb[key] || dataDbLBAS[key];
			}
			return dataDb;
		},
		loadDataDb: function(dataDb,fleetNum,fleetUI,isSupport) {
			if (isSupport) {
				if (+fleetNum >= 10) return;
				let fleetKey = 'f'+fleetNum;
				if (dataDb[fleetKey].s7) delete dataDb[fleetKey].s7;
			}
			CONVERT.loadSaveFleet(CONVERT.deckbuilderToSaveFleet(dataDb,fleetNum),fleetUI,true);
		},
		
		onclickImport: function() {
			if (!this.textImport) return;
			let dataDb;
			try {
				dataDb = JSON.parse(this.textImport);
			} catch (e) {
				console.error(e);
				return;
			}
			if (this.importMain) {
				UI_MAIN.fleetFMain = FLEET_MODEL.getBlankFleet(UI_MAIN.fleetFMain);
				this.loadDataDb(dataDb,this.fleetNumMain,UI_MAIN.fleetFMain);
			}
			if (this.importSupportN) {
				UI_MAIN.fleetFSupportN = FLEET_MODEL.getBlankFleet(UI_MAIN.fleetFSupportN);
				this.loadDataDb(dataDb,this.fleetNumSupportN,UI_MAIN.fleetFSupportN,true);
			}
			if (this.importSupportB) {
				UI_MAIN.fleetFSupportB = FLEET_MODEL.getBlankFleet(UI_MAIN.fleetFSupportB);
				this.loadDataDb(dataDb,this.fleetNumSupportB,UI_MAIN.fleetFSupportB,true);
			}
			if (this.importLBAS) {
				CONVERT.loadSaveLBAS(CONVERT.deckbuilderToSaveLBAS(dataDb),UI_MAIN.landBases);
			}
			COMMON.global.fleetEditorMoveTemp();
		},
		onclickExport: function() {
			let dataDb = this.getDataDb();
			this.textExport = JSON.stringify(dataDb);
			setTimeout(() => this.$refs.textExport.select());
		},
		onclickOpenDb: function() {
			let dataDb = this.getDataDb();
			window.open(CONST.urlDeckbuilder + encodeURI(JSON.stringify(dataDb)));
		},
		onclickOpenLBASSim: function() {
			let dataDb = this.getDataDb();
			window.open(CONST.urlLBASSim + encodeURI(JSON.stringify(dataDb)));
		},
		onclickOpenJervis: function() {
			let dataDb = this.getDataDb();
			window.open(CONST.urlJervis + encodeURI(JSON.stringify(dataDb)));
		},
		onclickOpenCompassSim: function() {
			let dataDb = this.getDataDb();
			window.open(CONST.urlCompassSim + encodeURI(JSON.stringify(dataDb)));
		},
		onclickSelectAll: function(event) {
			event.target.select();
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).use(COMMON.i18n).mount('#divDeckbuilderImporter');


var UI_KCNAVCOMPIMPORTER = Vue.createApp({
	data: () => ({
		active: false,
		canClose: true,
		showNoData: false,
		showError: false,
		showTimeout: false,
		txtLoading: '',
		comps: null,
		isFriendFleet: false,
		
		world: null,
		mapnum: null,
		edges: null,
		gaugeNum: null,
		gaugeHPMin: null,
		gaugeHPMax: null,
		diff: 0,
		hqMin: null,
		hqMax: null,
		ffSkipSame: true,
		ffStrong: true,
		dateStart: null,
		dateEnd: null,
		
		selectWorld: 0,
		selectLetter: 0,
		optionsWorld: [],
		optionsLetter: [],
	}),
	mounted: function() {
		let keys = [1,2,3,7,4,5,6].concat(Object.keys(MAPDATA).filter(id => +id > 7 && +id >= CONST.kcnavEventFirst).sort((a,b) => +b-+a));
		for (let id of keys) {
			this.optionsWorld.push({ id: +id, name: MAPDATA[id].name.replace('Event ','') });
		}
	},
	methods: {
		doOpen: function(compUI,isFriendFleet) {
			this.active = true;
			this.canClose = true;
			this.showNoData = this.showError = this.showTimeout = false;
			this.comps = compUI;
			this.isFriendFleet = !!isFriendFleet;
		},
		
		onchangeWorldMap: function() {
			this.optionsLetter = [];
			let key = 'World ' + this.world + '-' + this.mapnum;
			if (!EDGES[key]) return;
			let letterToEdges = {};
			for (let edgeId in EDGES[key]) {
				let letter = EDGES[key][edgeId][1];
				if (letter.indexOf('Start') == 0) continue;
				if (!letterToEdges[letter]) letterToEdges[letter] = [];
				letterToEdges[letter].push(edgeId);
			}
			for (let letter of Object.keys(letterToEdges).sort()) {
				this.optionsLetter.push({ letter: letter, edges: letterToEdges[letter].join(',') });
			}
		},
		onchangeSelectWorld: function() {
			if (this.selectWorld) {
				this.world = this.selectWorld;
				this.onchangeWorldMap();
			}
			this.selectWorld = 0;
		},
		onchangeSelectLetter: function() {
			if (this.selectLetter) {
				this.edges = this.selectLetter;
			}
			this.selectLetter = 0;
		},
		
		onclickLoad: function() {
			this.showNoData = this.showError = this.showTimeout = false;
			if (!this.world) {
				this.$refs.inputWorld.focus();
				return;
			}
			if (!this.mapnum) {
				this.$refs.inputMapnum.focus();
				return;
			}
			if (!this.edges || !this.edges.match(/^[0-9,]+$/g)) {
				this.$refs.inputEdges.focus();
				return;
			}
			this.canClose = false;
			
			let url = this.isFriendFleet ? CONST.urlKCNavFriendFleets : CONST.urlKCNavEnemyComps;
			url = url.replace('{maps}',this.world + '-' + this.mapnum);
			url = url.replace('{edges}',this.edges);
			if (!this.isFriendFleet) {
				url += '?start=' + (this.dateStart ? this.dateStart : +this.world < 10 ? CONST.kcnavDateStart : '');
				if (this.dateEnd != null && this.dateEnd !== '') url += '&end=' + this.dateEnd;
				if (this.gaugeHPMin != null && this.gaugeHPMin !== '' && this.gaugeHPMin != 0) url += '&minGaugeLevel=' + this.gaugeHPMin;
				if (this.gaugeHPMax != null && this.gaugeHPMax !== '' && this.gaugeHPMax != 99999) url += '&maxGaugeLevel=' + this.gaugeHPMax;
				if (this.gaugeNum != null && this.gaugeNum !== '' && this.gaugeNum != 1) url += '&minGauge=' + this.gaugeNum;
				if (this.gaugeNum != null && this.gaugeNum !== '' && this.gaugeNum != 5) url += '&maxGauge=' + this.gaugeNum;
				if (this.diff && +this.world > 10) url += '&difficulty=' + this.diff;
				if (this.hqMin) url += '&minHqLevel=' + this.hqMin;
				if (this.hqMax) url += '&maxHqLevel=' + this.hqMax;
			} else {
				url += '?start=' + (this.dateStart ? this.dateStart : '');
				if (this.dateEnd != null && this.dateEnd !== '') url += '&end=' + this.dateEnd;
			}
			// if (+this.world < 10) {
				// let d = new Date();
				// d.setDate(d.getDate() - CONST.kcnavDaysMax);
				// url += '&start=' + d.toISOString().split('T')[0];
			// }
			console.log(url);
			
			this.txtLoading = ' •';
			this.updateLoading();
			
			let xhr = new XMLHttpRequest();
			xhr.open('GET',url);
			xhr.onload = function() {
				this.txtLoading = '';
				this.canClose = true;
				if (xhr.status >= 500 && xhr.status < 600) {
					this.showTimeout = true;
					return;
				}
				let compsNav;
				try {
					compsNav = JSON.parse(xhr.response);
				} catch (e) {
					console.error(e);
					this.showError = true;
					return;
				}
				console.log(compsNav);
				if (!compsNav.result) {
					this.showError = true;
					return;
				}
				if (!compsNav.result.entries || compsNav.result.entries.length <= 0) {
					this.showNoData = true;
					return;
				}
				COMMON.global.fleetEditorMoveTemp();
				if (this.isFriendFleet) {
					compsNav.result.entries = compsNav.result.entries.filter(entry => !!entry.requestType == !!this.ffStrong);
					if (this.ffSkipSame) {
						let idsMain = UI_MAIN.fleetFMain.ships.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)).map(ship => ship.mstId);
						if (UI_MAIN.fleetFMain.combined) idsMain = idsMain.concat(UI_MAIN.fleetFMain.shipsEscort.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)).map(ship => ship.mstId));
						let idsAll = {};
						for (let idMain of idsMain) {
							let id = window.getBaseId(idMain);
							do {
								idsAll[id] = 1;
								id = SHIPDATA[id].next;
							} while (id && !idsAll[id]);
						}
						compsNav.result.entries = compsNav.result.entries.filter(entry => !entry.fleet.map(ship => ship.id).find(id => idsAll[id]));
					}
				}
				let compsSave = CONVERT.kcnavToSaveComps(compsNav.result);
				compsSave.sort((a,b) => b.rate - a.rate);
				for (let i=this.comps.length; i>compsSave.length; i--) UI_MAIN.deleteComp(this.comps);
				for (let comp of this.comps) comp.fleet = FLEET_MODEL.getBlankFleet(comp.fleet);
				for (let i=this.comps.length; i<compsSave.length; i++) UI_MAIN.addNewComp(this.comps);
				CONVERT.loadSaveComps(compsSave,this.comps,true);
				this.active = false;
			}.bind(this);
			xhr.onerror = function() {
				this.txtLoading = '';
				this.canClose = true;
				this.showError = true;
			}.bind(this);
			xhr.send();
		},
		
		updateLoading: function() {
			setTimeout(function() {
				if (!this.txtLoading) return;
				this.txtLoading += ' •';
				if (this.txtLoading.length > 6) this.txtLoading = ' •';
				this.updateLoading();
			}.bind(this),500);
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).use(COMMON.i18n).mount('#divKCNavCompImporter');


var UI_BONUSIMPORTER = Vue.createApp({
	data: () => ({
		active: false,
		canClose: true,
		showNoData: false,
		showError: false,
		showTimeout: false,
		showNoMatches: false,
		txtLoading: '',
		
		world: null,
		mapnum: null,
		letter: null,
		
		selectWorld: 0,
		selectLetter: 0,
		optionsWorld: [],
		optionsLetter: [],
		
		forNode: null,
		includeMain: true,
		includeFF: true,
		fromDebuffed: false,
		fromFF: false,
		fromBoss: false,
		bonusData: [],
	}),
	mounted: function() {
		let keys = [1,2,3,7,4,5,6].concat(Object.keys(MAPDATA).filter(id => +id > 7 && +id >= CONST.kcnavEventFirst).sort((a,b) => +a-+b));
		for (let id of keys) {
			this.optionsWorld.push({ id: +id, name: MAPDATA[id].name.replace('Event ','') });
		}
	},
	methods: {
		doOpen: function(forNode) {
			this.active = true;
			this.canClose = true;
			this.showNoData = this.showError = this.showTimeout = this.showNoMatches = false;
			this.forNode = forNode || null;
			this.bonusData = [];
		},
		
		onchangeWorldMap: function() {
			this.optionsLetter = [];
			let key = 'World ' + this.world + '-' + this.mapnum;
			if (!EDGES[key]) return;
			let letterToEdges = {};
			for (let edgeId in EDGES[key]) {
				let letter = EDGES[key][edgeId][1];
				if (letter.indexOf('Start') == 0) continue;
				if (!letterToEdges[letter]) letterToEdges[letter] = [];
				letterToEdges[letter].push(edgeId);
			}
			for (let letter of Object.keys(letterToEdges).sort()) {
				this.optionsLetter.push({ letter: letter, edges: letterToEdges[letter].join(',') });
			}
		},
		onchangeSelectWorld: function() {
			if (this.selectWorld) {
				this.world = this.selectWorld;
				this.onchangeWorldMap();
			}
			this.selectWorld = 0;
		},
		onchangeSelectLetter: function() {
			if (this.selectLetter) {
				this.letter = this.selectLetter;
			}
			this.selectLetter = 0;
		},
		
		onclickLoad: function(source='kcnav') {
			this.showNoData = this.showError = this.showTimeout = this.showNoMatches = false;
			if (!this.world) {
				this.$refs.inputWorld.focus();
				return;
			}
			if (!this.mapnum) {
				this.$refs.inputMapnum.focus();
				return;
			}
			if (!this.letter) {
				this.$refs.inputNode.focus();
				return;
			}
			this.canClose = false;
			
			let url;
			if (source == 'dewy') {
				url = CONST.urlDewyAbnormalDamage;
				url += '/' + this.world + '-' + this.mapnum;
				url += '/' + this.letter;
				if (this.fromFF) url += '_friendlyfleet';
				if (this.fromDebuffed) url += '_debuffed';
				if (this.fromBoss) url += '_vsboss';
				url += '.json';
			} else {
				url = CONST.urlKCNavAbnormalDamage;
				url += '?map=' + this.world + '-' + this.mapnum;
				url += '&node=' + this.letter;
			}
			
			this.txtLoading = ' •';
			this.updateLoading();
			
			let xhr = new XMLHttpRequest();
			xhr.open('GET',url);
			xhr.onload = function() {
				this.txtLoading = '';
				this.canClose = true;
				if (xhr.status >= 500 && xhr.status < 600) {
					this.showTimeout = true;
					return;
				}
				if (xhr.status >= 400 && xhr.status < 500) {
					this.showError = true;
					return;
				}
				let data = JSON.parse(xhr.response), result;
				if (source == 'dewy') {
					if (!Object.keys(data).length) {
						this.showNoData = true;
						return;
					}
					result = [];
					for (let id in data) {
						let obj = { id: +id, count: data[id][2], min: data[id][0], max: data[id][1] };
						if (SHIPDATA[id]) {
							obj.name = SHIPDATA[id].nameJP;
							obj.name_en = SHIPDATA[id].name;
						}
						result.push(obj);
					}
					result.sort((a,b) => b.count - a.count);
				} else {
					if (!data.result || data.result.length <= 0) {
						this.showNoData = true;
						return;
					}
					result = data.result;
				}
				let ids = [];
				if (this.forNode || this.includeMain) {
					ids = ids.concat(UI_MAIN.fleetFMain.ships.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)).map(ship => ship.mstId));
					if (UI_MAIN.fleetFMain.combined) ids = ids.concat(UI_MAIN.fleetFMain.shipsEscort.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)).map(ship => ship.mstId));
				}
				if (!this.forNode && this.includeFF) {
					for (let comp of UI_MAIN.fleetsFFriend) {
						ids = ids.concat(comp.fleet.ships.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)).map(ship => ship.mstId));
					}
				}
				this.bonusData = [];
				for (let obj of result) {
					if (!ids.includes(obj.id)) continue;
					let bonusShip = {
						id: obj.id,
						count: obj.count,
						max: Math.round(1000*obj.max)/1000,
						min: Math.round(1000*obj.min)/1000,
						name: (COMMON.i18n.global.locale == 'en' ? obj.name_en : obj.name),
						value: null,
					};
					this.bonusData.push(bonusShip);
				}
				this.onclickSetAll('avg');
				if (!this.bonusData.length) {
					this.showNoMatches = true;
				}
				
			}.bind(this);
			xhr.onerror = function() {
				this.txtLoading = '';
				this.canClose = true;
				this.showError = true;
			}.bind(this);
			xhr.send();
		},
		
		onclickSetAll: function(type) {
			for (let bonusShip of this.bonusData) {
				let value = type == 'max' ? bonusShip.max : type == 'min' ? bonusShip.min : (bonusShip.max+bonusShip.min)/2;
				bonusShip.value = Math.round(1000*value)/1000;
				if (bonusShip.value < 1.02) bonusShip.value = 1;
			}
		},
		onclickConfirm: function() {
			let idToBonus = {};
			for (let bonusShip of this.bonusData) {
				idToBonus[bonusShip.id] = bonusShip.value;
			}
			let ships = [];
			if (this.forNode || this.includeMain) {
				ships = ships.concat(UI_MAIN.fleetFMain.ships.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)));
				if (UI_MAIN.fleetFMain.combined) ships = ships.concat(UI_MAIN.fleetFMain.shipsEscort.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)));
			}
			if (!this.forNode && this.includeFF) {
				for (let comp of UI_MAIN.fleetsFFriend) {
					ships = ships.concat(comp.fleet.ships.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)));
				}
			}
			if (!this.forNode) COMMON.global.fleetEditorMoveTemp();
			for (let ship of ships) {
				if (!idToBonus[ship.mstId]) continue;
				if (this.forNode) {
					if (!ship.bonusByNode[this.forNode]) ship.bonusByNode[this.forNode] = {};
					ship.bonusByNode[this.forNode].bonusDmg = idToBonus[ship.mstId];
				} else {
					ship.bonusDmg = idToBonus[ship.mstId];
				}
			}
			this.active = false;
		},
		
		updateLoading: function() {
			setTimeout(function() {
				if (!this.txtLoading) return;
				this.txtLoading += ' •';
				if (this.txtLoading.length > 6) this.txtLoading = ' •';
				this.updateLoading();
			}.bind(this),500);
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).use(COMMON.i18n).mount('#divBonusImporter');


var UI_BACKUP = Vue.createApp({
	data: () => ({
		active: false,
		canClose: true,
		isReplayImport: false,
		confirmReset: false,
		showImportError: false,
		shareURLLoading: false,
		showShareURLCopied: false,
		showShareURLError: false,
		
		callback: null,
	}),
	methods: {
		doOpen: function(callbackReplayImport) {
			this.active = true;
			this.confirmReset = false;
			this.showImportError = false;
			this.isReplayImport = false;
			this.canClose = true;
			if (callbackReplayImport) {
				this.isReplayImport = true;
				this.canClose = false;
				this.callback = callbackReplayImport;
			}
			this.shareURLLoading = false;
			this.showShareURLCopied = false;
			this.showShareURLError = false;
		},
		
		onclickDownload: function() {
			let data = this.isReplayImport ? localStorage.sim2 : JSON.stringify(CONVERT.uiToSave(UI_MAIN));
			let save = { data: data, source: CONST.simSaveKey };
			
			let filename = 'KanColle_Sortie_Simulator_Backup_' + (new Date).toISOString().slice(0,10) + '.kcsim';

			let a = window.document.createElement('a');
			a.href = window.URL.createObjectURL(new Blob([LZString.compressToBase64(JSON.stringify(save))], {type: 'application/json'}));
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		},
		
		onchangeFileBackup: function(e) {
			if (!e.target.files.length) return;
			let reader = new FileReader();
			reader.readAsText(e.target.files[0]);
			reader.addEventListener('loadend',() => CONVERT.setSimBackupFile(reader));
			this.showImportError = false;
		},
		
		onclickImportAll: function() {
			UI_MAIN.canSave = false;
			let save = CONVERT.getSimBackupFile();
			if (!save || !save.data) {
				this.showImportError = true;
				return;
			}
			localStorage.sim2 = save.data;
			window.location.reload();
		},
		
		onclickImportPlayer: function() {
			let save = CONVERT.getSimBackupFile();
			if (!save || !save.data) {
				this.showImportError = true;
				return;
			}
			let dataSave = JSON.parse(save.data);
			for (let key of ['fleetFMain','fleetFSupportN','fleetFSupportB']) {
				if (!dataSave[key]) continue;
				UI_MAIN[key] = FLEET_MODEL.getBlankFleet(UI_MAIN[key]);
				CONVERT.loadSaveFleet(dataSave[key],UI_MAIN[key],true);
			}
			if (dataSave.landBases) {
				CONVERT.loadSaveLBAS(dataSave.landBases,UI_MAIN.landBases);
			}
			COMMON.global.fleetEditorMoveTemp();
		},
		
		onclickContinue: function() {
			this.canClose = true;
			this.active = false;
			this.callback();
		},
		
		onclickResetAll: function() {
			if (!this.confirmReset) return;
			UI_MAIN.canSave = false;
			localStorage.sim2 = '';
			window.location.reload();
		},
		
		onclickShareURL: function() {
			this.shareURLLoading = true;
			LZMA.compress(JSON.stringify(CONVERT.uiToSave(UI_MAIN)), 9, (ab) => {
				// let url = window.location.href.split(/[?#]/)[0] + '#backup=' + COMMON.arrayBufferToBase64(ab);
				let url = 'https://kc3kai.github.io/kancolle-replay/simulator.html' + '#backup=' + COMMON.arrayBufferToBase64(ab);
				fetch('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url)).then(async(res) => {
					let txt = await res.text();
					console.log(txt);
					if (!res.ok) {
						throw new Error('tinyurl: ' + txt);
						return;
					}
					navigator.clipboard.writeText(txt + '+');
					this.showShareURLCopied = true;
					this.showShareURLError = false;
				}).catch(error => {
					console.log(error);
					this.showShareURLCopied = false;
					this.showShareURLError = true;
				});
			});
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).use(COMMON.i18n).mount('#divSimBackup');;


var UI_FCFSETTINGS = Vue.createApp({
	data: () => ({
		active: false,
		canClose: true,
		
		settings: null,
		nodes: [],
		ruleNew: { shipStr: '', count: 0, node: 0 },
		shipGroups: [],
	}),
	methods: {
		doOpen: function(settings) {
			this.active = true;
			this.settings = settings;
			
			this.ruleNew.shipStr = '';
			this.ruleNew.count = 0;
			this.ruleNew.node = 0;
			
			this.nodes = [];
			for (let battle of UI_MAIN.battles) {
				this.nodes.push(battle.id);
			}
			if (!this.nodes.includes(this.settings.losNode)) this.settings.losNode = 0;
			for (let rule of this.settings.rules) {
				if (!this.nodes.includes(rule.node)) rule.node = 0;
			}
			
			this.shipGroups = [];
			this.shipGroups.push(UI_MAIN.fleetFMain.ships.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)));
			if (UI_MAIN.fleetFMain.shipsEscort && UI_MAIN.fleetFMain.combined) this.shipGroups.push(UI_MAIN.fleetFMain.shipsEscort.filter(ship => !FLEET_MODEL.shipIsEmpty(ship)));
		},
		doClose: function() {
			this.active = false;
		},
		
		onclickAddRule: function() {
			let shipStr = this.ruleNew.shipStr.trim().replaceAll('"','').replaceAll(/[, ]+/g,'/').toUpperCase();
			if (!shipStr || (shipStr != 'XX' && shipStr.split('/').find(type => !COMMON.shipTypeHullToId[type]) != null)) {
				this.$refs.inputShipStrNew.focus();
				return;
			}
			if (this.ruleNew.count <= 0 || !+this.ruleNew.count) {
				this.$refs.inputCountNew.focus();
				return;
			}
			
			shipStr = shipStr.split('/').filter((type,i,a) => a.indexOf(type) == i).join('/');
			this.settings.rules.push({ shipStr: shipStr, count: this.ruleNew.count, node: this.ruleNew.node });
			this.ruleNew.shipStr = '';
			this.ruleNew.count = 0;
			this.ruleNew.node = 0;
		},
		onclickDelRule: function(rule) {
			this.settings.rules.splice(this.settings.rules.indexOf(rule),1);
		},
		onclickShipCanRetreat: function(ship) {
			ship.neverFCF = !ship.neverFCF;
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).use(COMMON.i18n).mount('#divFCFSettings');;





var UI_AUTOBONUS = Vue.createApp({
	data: () => ({
		active: false,
		canClose: true,
		hasError: false,
		
		type: 'preset',
		keyPreset: '',
		keyDewy: '',
		nodeToLetterListPreset: [],
		nodeToLetterListDewy: [],
		useDebuff: false,
		dmgType: 0,
		accEvaType: 4,
		useSpeculated: true,
		applyToCurrent: true,
		applyToCurrentDmgOnly: false,
		
		optionsPresetName: [],
		optionsPresetLetter: [],
		optionsDewyName: [],
		optionsDewyLetter: [],
		hasDebuff: false,
		hasAccEva: false,
		hasSpeculated: false,
		
		datePreset: '',
		notePreset: '',
		
		isPreloader: false,
		namePreloader: '',
		datePreloader: '',
		cancelledPreloader: false,
		isUpdate: false,
		
		hashes: { preset: {}, dewy: {} },
	}),
	mounted: function() {
		for (let key of Object.keys(COMMON.BONUS_MANAGER.PRESET_INDEX).sort((keyA,keyB) => {
			let sA = keyA.split('-'), sB = keyB.split('-');
			if (sA[0] == sB[0]) return +sA[1]-+sB[1];
			if (+sA[0] < 10 && +sB[0] < 10) return +sA[0]-+sB[0];
			if (+sA[0] > 10 && +sB[0] > 10) return +sB[0]-+sA[0];
			if (+sA[0] < 10 && +sB[0] > 10) return -1;
			if (+sA[0] > 10 && +sB[0] < 10) return 1;
		})) {
			this.optionsPresetName.push({ name: COMMON.BONUS_MANAGER.PRESET_INDEX[key].name, key: key });
		}
	},
	computed: {
		canStart: function() {
			if (this.type == 'preset') {
				return !this.keyPreset || this.hashes.preset[this.keyPreset] != null;
			} else if (this.type == 'dewy') {
				return Object.values(this.hashes.dewy).every(v => v != null);
			}
		},
		classApplyToCurrentDmgOnly: function() {
			return { 'invisible': !this.applyToCurrent || (this.accEvaType != 0 && this.accEvaType != 1) };
		},
	},
	methods: {
		doOpen: function(autoBonusInit) {
			this.isPreloader = this.isUpdate = false;
			this.canClose = true;
			this.active = true;
			this.hasError = false;
			this._initNodeToLetter();
			if (autoBonusInit) {
				this._initSettings(autoBonusInit)
			}
		},
		doOpenPreloader: async function(autoBonus) {
			if (!autoBonus) return;
			this.cancelledPreloader = false;
			this.hasError = false;
			let isUpdated = false;
			if (autoBonus.type == 'preset') {
				let result = await COMMON.BONUS_MANAGER.getPreset(autoBonus.key);
				if (this.cancelledPreloader) return;
				this.hasError = result.data == null;
				isUpdated = autoBonus.hash != result.hash;
				this.hashes.preset[autoBonus.key] = result.hash;
			} else if (autoBonus.type == 'dewy') {
				this.isPreloader = true;
				this.isUpdate = false;
				this.canClose = false;
				this.active = true;
				this.$refs.txtLoadingPL.start();
				
				let results = await Promise.all(autoBonus.files.map(file => COMMON.BONUS_MANAGER.getDewy(file.key)));
				if (this.cancelledPreloader) return;
				this.canClose = true;
				this.$refs.txtLoadingPL.stop();
				for (let i=0; i<results.length; i++) {
					if (results[i].data == null) this.hasError = true;
					if (autoBonus.files[i].hash != results[i].hash) isUpdated = true;
					this.hashes.dewy[autoBonus.files[i].key] = results[i].hash;
				}
			}
			if (this.hasError) {
				UI_MAIN.autoBonus = null;
				this.canClose = true;
			} else {
				this.active = false;
				this.canClose = true;
				if (isUpdated) {
					this.$nextTick(() => this.doOpenUpdate(autoBonus));
				}
			}
		},
		cancelPreload: function() {
			this.active = false;
			this.canClose = true;
			UI_MAIN.autoBonus = null;
			this.cancelledPreloader = true;
		},
		doOpenUpdate: function(autoBonus) {
			if (!autoBonus) return;
			this.isUpdate = true;
			this.isPreloader = false;
			this.canClose = true;
			this.active = true;
			
			this._initNodeToLetter();
			this._initSettings(autoBonus);
			this.applyToCurrent = true;
		},
		doClose: function() {
			this.active = false;
		},
		
		_initNodeToLetter: function() {
			let idToLetterPrev = {};
			for (let nodeToLetterListKey of ['nodeToLetterListPreset', 'nodeToLetterListDewy']) {
				for (let node of this[nodeToLetterListKey]) idToLetterPrev[node.id] = node.letter;
				this[nodeToLetterListKey] = [];
				for (let battle of UI_MAIN.battles) {
					let obj = { id: battle.id, letter: '' };
					if (idToLetterPrev[battle.id]) obj.letter = idToLetterPrev[battle.id];
					this[nodeToLetterListKey].push(obj);
				}
			}
		},
		_initSettings: function(autoBonus) {
			this.type = autoBonus.type;
			if (autoBonus.type == 'preset') {
				if (this.keyPreset != autoBonus.key) {
					this.keyPreset = autoBonus.key;
					this.onchangeNamePreset();
				}
				this.useDebuff = autoBonus.useDebuff != null ? autoBonus.useDebuff : true;
				this.accEvaType = autoBonus.accEvaType;
				for (let obj of this.nodeToLetterListPreset) {
					if (autoBonus.nodeToLetter[obj.id]) obj.letter = autoBonus.nodeToLetter[obj.id];
				}
				this.useSpeculated = autoBonus.useSpeculated != null ? autoBonus.useSpeculated : true;
			}
			if (autoBonus.type == 'dewy') {
				this.onclickDewy();
				if (this.keyDewy != autoBonus.key) {
					this.keyDewy = autoBonus.key;
					this.onchangeNameDewy();
				}
				this.dmgType = autoBonus.dmgType;
				this.accEvaType = autoBonus.accEvaType;
				for (let obj of this.nodeToLetterListDewy) {
					if (autoBonus.nodeToLetter[obj.id]) obj.letter = autoBonus.nodeToLetter[obj.id];
				}
			}
		},
		_applySettings: function() {
			let autoBonus = null;
			if (this.type == 'preset' && this.keyPreset) {
				autoBonus = {
					type: this.type,
					key: this.keyPreset,
					hash: this.hashes.preset[this.keyPreset],
					nodeToLetter: {},
					accEvaType: this.accEvaType,
				};
				if (this.hasDebuff) autoBonus.useDebuff = this.useDebuff;
				if (this.hasSpeculated) autoBonus.useSpeculated = this.useSpeculated;
				for (let node of this.nodeToLetterListPreset) {
					autoBonus.nodeToLetter[node.id] = node.letter;
					
					let keyB = this.keyPreset + '-' + node.letter;
					console.log(keyB, +COMMON.BARRAGE_BALLOON_NODES.includes(keyB))
					let battle = UI_MAIN.battles.find(battle => battle.id == node.id);
					if (battle) battle.useBalloon = COMMON.BARRAGE_BALLOON_NODES.includes(keyB);
					if (battle) battle.useAtoll = COMMON.ATOLL_NODES.includes(keyB);
				}
			}
			if (this.type == 'dewy' && this.keyDewy) {
				autoBonus = {
					type: this.type,
					key: this.keyDewy,
					files: [],
					nodeToLetter: {},
					dmgType: this.dmgType,
					accEvaType: this.accEvaType,
				};
				for (let node of this.nodeToLetterListDewy) {
					if (!node.letter) continue;
					let key = this.keyDewy + '/' + node.letter;
					autoBonus.nodeToLetter[node.id] = node.letter;
					if (this.hashes.dewy[key]) autoBonus.files.push({ key: key, hash: this.hashes.dewy[key] });
					
					let keyB = this.keyDewy + '-' + node.letter;
					let battle = UI_MAIN.battles.find(battle => battle.id == node.id);
					if (battle) battle.useBalloon = COMMON.BARRAGE_BALLOON_NODES.includes(keyB);
					if (battle) battle.useAtoll = COMMON.ATOLL_NODES.includes(keyB);
				}
			}
			UI_MAIN.autoBonus = autoBonus;
			
			if (this.applyToCurrent) {
				if (autoBonus) {
					COMMON.BONUS_MANAGER.applyAutoAll(false);
				} else {
					COMMON.BONUS_MANAGER.resetAll();
				}
			}
		},
		
		
		onclickDewy: async function() {
			if (this.type != 'dewy') return;
			if (this.accEvaType == 1) this.accEvaType = 4;
			if (this.optionsDewyName.length) return;
			
			let dataIndex = await COMMON.BONUS_MANAGER.getDewyIndex();
			if (!dataIndex) return;
			let objs = {};
			for (let item of dataIndex.tree.filter(obj => obj.path.indexOf('/') == -1)) {
				let name = COMMON.BONUS_MANAGER.getDewyName(item.path);
				let s = item.path.split('-');
				let keySort = '' + (1000 - +s[0]) + '-' + s[1];
				objs[keySort] = { name: name, key: item.path };
			}
			for (let keySort of Object.keys(objs).sort()) this.optionsDewyName.push(objs[keySort]);
		},
		_getLetterToEdges: function(keyEdges) {
			let letterToEdges = {};
			for (let edgeId in EDGES[keyEdges]) {
				let letter = EDGES[keyEdges][edgeId][1];
				if (letter.indexOf('Start') == 0) continue;
				if (!letterToEdges[letter]) letterToEdges[letter] = [];
				letterToEdges[letter].push(edgeId);
			}
			return letterToEdges;
		},
		onchangeNamePreset: async function() {
			this.optionsPresetLetter = [];
			for (let node of this.nodeToLetterListPreset) {
				node.letter = '';
			}
			
			if (this.keyPreset) {
				let keyNow = this.keyPreset;
				this.hashes.preset[this.keyPreset] = null;
				this.hasError = false;
				
				let result = await COMMON.BONUS_MANAGER.getPreset(this.keyPreset);
				if (!result.data) {
					delete this.hashes.preset[keyNow];
					if (this.keyPreset == keyNow) {
						this.hasError = true;
						this.keyPreset = '';
					}
				}
				if (result.key == this.keyPreset) {
					let keyEdges = 'World ' + result.data.world + '-' + result.data.mapnum;
					for (let letter of Object.keys(this._getLetterToEdges(keyEdges)).sort()) {
						this.optionsPresetLetter.push(letter);
					}
					this.hasDebuff = !!result.data.listDebuff;
					this.hasAccEva = !!(
						(result.data.listBonus && result.data.listBonus.find(item => item.bonuses.find(bonus => bonus.acc != null || bonus.eva != null))) ||
						(result.data.listBonusLBAS && result.data.listBonusLBAS.find(item => item.bonuses.find(bonus => bonus.acc != null)))
					);
					this.hasSpeculated = result.data.listBonus && result.data.listBonus.find(item => item.bonuses.find(bonus => bonus.unconfirmed));
					if (!this.accEvaType || this.accEvaType == 1 || this.accEvaType == 4) this.accEvaType = this.hasAccEva ? 1 : 4;
					// this.applyToCurrentDmgOnly = !this.hasAccEva;
					this.hashes.preset[this.keyPreset] = result.hash;
					this.datePreset = result.data.date || '';
					this.notePreset = result.data.note || '';
				}
			}
		},
		onchangeNameDewy: function() {
			this.optionsDewyLetter = [];
			for (let node of this.nodeToLetterListDewy) {
				node.letter = '';
			}
			if (this.keyDewy) {
				let keyEdges = 'World ' + this.keyDewy;
				for (let letter of Object.keys(this._getLetterToEdges(keyEdges)).sort()) {
					this.optionsDewyLetter.push(letter);
				}
			}
		},
		onchangeLetterDewy: async function(letter) {
			if (!letter) return;
			
			let dataIndex = await COMMON.BONUS_MANAGER.getDewyIndex();
			let key = this.keyDewy + '/' + letter;
			if (!dataIndex.tree.find(item => item.path == key + '.json')) return;
			this.hashes.dewy[key] = null;
			this.hasError = false;
			
			let result = await COMMON.BONUS_MANAGER.getDewy(key);
			this.hashes.dewy[key] = result.hash;
			if (!result.data) {
				this.hasError = true;
				delete this.hashes.dewy[key];
				for (let node of this.nodeToLetterListDewy) {
					if (node.letter == letter) node.letter = '';
				}
			}
		},
		onclickStart: function() {
			if (!this.canClose) return;
			if (!this.hasError) {
				this._applySettings();
			}
			this.active = false;
		},
		onclickDismiss: function() {
			let autoBonus = UI_MAIN.autoBonus;
			if (this.type == 'preset') {
				autoBonus.hash = this.hashes.preset[autoBonus.key];
			} else if (this.type == 'dewy') {
				for (file of autoBonus.files) {
					file.hash = this.hashes.dewy[file.key];
				}
			}
			this.active = false;
		},
	},
	watch: {
		canStart: function() {
			this.canStart ? this.$refs.txtLoading.stop() : this.$refs.txtLoading.start();
		},
	},
}).component('vmodal',COMMON.CMP_MODAL).component('vloading',COMMON.CMP_LOADING).use(COMMON.i18n).mount('#divAutoBonus');



var UI_OTHER = Vue.createApp({
	data: () => ({
		
	})
}).use(COMMON.i18n).mount('#divOther');



document.body.onunload = function() {
	if (UI_MAIN.canSave) {
		localStorage.sim2 = JSON.stringify(CONVERT.uiToSave(UI_MAIN));
	}
}

COMMON.UI_MAIN = UI_MAIN; //debug

})