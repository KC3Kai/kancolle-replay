var LINEAHEAD = {shellmod:1,torpmod:1,ASWmod:.6,AAmod:1, shellacc:1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:1};
var DOUBLELINE = {shellmod:.8,torpmod:.8,ASWmod:.8,AAmod:1.2, shellacc:1.2,torpacc:.8,NBacc:.9, shellev:1,torpev:1,NBev:1,ASWev:1, id:2};
var DIAMOND = {shellmod:.7,torpmod:.7,ASWmod:1.2,AAmod:1.6, shellacc:1,torpacc:.4,NBacc:.7, shellev:1.1,torpev:1.1,NBev:1,ASWev:1, id:3};
var ECHELON = {shellmod:.75,torpmod:.6,ASWmod:1.1,AAmod:1, shellacc:1.2,torpacc:.75,NBacc:.9, shellev:1.4,torpev:1.3,NBev:1.3,ASWev:1.3, id:4};
var LINEABREAST = {shellmod:.6,torpmod:.6,ASWmod:1.3,AAmod:1, shellacc:1.2,torpacc:.3,NBacc:.8, shellev:1.3,torpev:1.4,NBev:1.2,ASWev:1.1, id:5};
var VANGUARD1 = {shellmod:0.5,torpmod:1,ASWmod:1,AAmod:1.1, shellacc:.8,torpacc:.7,NBacc:.8,ASWacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:6};
var VANGUARD2 = {shellmod:1,torpmod:1,ASWmod:.6,AAmod:1.1, shellacc:1.2,torpacc:.9,NBacc:1.2,ASWacc:1.1, shellev:1,torpev:1,NBev:1,ASWev:1, id:6};

var COMBINEDCF1 = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellacc:.9,torpacc:.6,NBacc:1,ASWacc:1.25, shellev:1,torpev:1,NBev:1,ASWev:1, id:11};
var COMBINEDCF2 = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellacc:1,torpacc:1,NBacc:1,ASWacc:1, shellev:1.2,torpev:1,NBev:1,ASWev:1, id:12};
var COMBINEDCF3 = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellacc:.8,torpacc:.4,NBacc:1,ASWacc:1, shellev:1.1,torpev:1,NBev:1,ASWev:1, id:13};
var COMBINEDCF4 = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellacc:1.1,torpacc:1.2,NBacc:1,ASWacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:14};

var COMBINEDCONSTS = {
	0: {
		'ecombined': {
			'main': { 'shellDmgF': 5, 'shellDmgE': 10, 'shellAccF': 80, 'shellAccE': 90 },
			'escort': { 'shellDmgF': 5, 'shellDmgE': -5, 'shellAccF': 80, 'shellAccE': 75 },
		},
	},
	1: {
		'esingle': {
			'main': { 'shellDmgF': 2, 'shellDmgE': 10, 'shellAccF': 78, 'shellAccE': 90 },
			'escort': { 'shellDmgF': 10, 'shellDmgE': 5, 'shellAccF': 45, 'shellAccE': 60 },
		},
		'ecombined': {
			'main': { 'shellDmgF': 2, 'shellDmgE': 10, 'shellAccF': 77, 'shellAccE': 90 },
			'escort': { 'shellDmgF': -5, 'shellDmgE': -5, 'shellAccF': 67, 'shellAccE': 75 },
		},
	},
	2: {
		'esingle': {
			'main': { 'shellDmgF': 10, 'shellDmgE': 5, 'shellAccF': 45, 'shellAccE': 67 },
			'escort': { 'shellDmgF': -5, 'shellDmgE': -5, 'shellAccF': 67, 'shellAccE': 78 },
		},
		'ecombined': {
			'main': { 'shellDmgF': 2, 'shellDmgE': 10, 'shellAccF': 77, 'shellAccE': 90 },
			'escort': { 'shellDmgF': -5, 'shellDmgE': -5, 'shellAccF': 67, 'shellAccE': 75 },
		},
	},
	3: {
		'esingle': {
			'main': { 'shellDmgF': -5, 'shellDmgE': 10, 'shellAccF': 54, 'shellAccE': 90 },
			'escort': { 'shellDmgF': 10, 'shellDmgE': 5, 'shellAccF': 45, 'shellAccE': 60 },
		},
		'ecombined': {
			'main': { 'shellDmgF': -5, 'shellDmgE': 10, 'shellAccF': 54, 'shellAccE': 90 },
			'escort': { 'shellDmgF': -5, 'shellDmgE': -5, 'shellAccF': 67, 'shellAccE': 75 },
		},
	},
}

var ALLFORMATIONS = {1:LINEAHEAD,2:DOUBLELINE,3:DIAMOND,4:ECHELON,5:LINEABREAST,6:VANGUARD1, 11:COMBINEDCF1, 12:COMBINEDCF2, 13:COMBINEDCF3, 14:COMBINEDCF4,
	'111':COMBINEDCF1,'111E':COMBINEDCF1,'112':COMBINEDCF2,'112E':COMBINEDCF2,'113':COMBINEDCF3,'113E':COMBINEDCF3,'114':COMBINEDCF4,'114E':COMBINEDCF4,
	'211':COMBINEDCF1,'211E':COMBINEDCF1,'212':COMBINEDCF2,'212E':COMBINEDCF2,'213':COMBINEDCF3,'213E':COMBINEDCF3,'214':COMBINEDCF4,'214E':COMBINEDCF4,
	'311':COMBINEDCF1,'311E':COMBINEDCF1,'312':COMBINEDCF2,'312E':COMBINEDCF2,'313':COMBINEDCF3,'313E':COMBINEDCF3,'314':COMBINEDCF4,'314E':COMBINEDCF4,
};

var AACIDATA = {
	1:{num:7,rate:.65,mod:1.75,equip:'HHR',num1:3},
	2:{num:6,rate:.58,mod:1.7,equip:'HR',num1:3},
	3:{num:4,rate:.5,mod:1.6,equip:'HH',num1:2},
	4:{num:6,rate:.52,mod:1.5,equip:'MSAR',num1:5},
	5:{num:4,rate:.55,mod:1.55,equip:'BBR',num1:2},
	6:{num:4,rate:.4,mod:1.5,equip:'MSA',num1:4},
	7:{num:3,rate:.45,mod:1.35,equip:'HAR',num1:2},
	8:{num:4,rate:.5,mod:1.45,equip:'BR',num1:2},
	9:{num:2,rate:.4,mod:1.3,equip:'HA',num1:1},
	10:{num:8,rate:.6,mod:1.65,equip:'HCR',num1:3},
	11:{num:6,rate:.55,mod:1.5,equip:'HC',num1:2},
	12:{num:3,rate:.45,mod:1.25,equip:'CGR',num1:1},
	// 13:{num:4,rate:.35,mod:1.35,equip:'BCR',num1:1},
	14:{num:4,rate:.63,mod:1.45,equip:'HGR',num1:1},
	15:{num:3,rate:.55,mod:1.3,equip:'HG',num1:1},
	16:{num:4,rate:.6,mod:1.4,equip:'HGR',num1:1},
	17:{num:2,rate:.55,mod:1.25,equip:'HG',num1:1},
	18:{num:2,rate:.6,mod:1.2,equip:'C',num1:1},
	19:{num:5,rate:.55,mod:1.45,equip:'HC',num1:1},
	20:{num:3,rate:.65,mod:1.25,equip:'C',num1:1},
	21:{num:5,rate:.6,mod:1.45,equip:'HR',num1:1},
	22:{num:2,rate:.6,mod:1.2,equip:'C',num1:1},
	23:{num:1,rate:.8,mod:1.05,equip:'G',num1:1},
	24:{num:3,rate:.5,mod:1.25,equip:'HG',num1:1},
	25:{num:7,rate:.6,mod:1.55,equip:'GRS',num1:1},
	26:{num:8,rate:.6,mod:1.4,equip:'HR',num1:1},
	28:{num:4,rate:.55,mod:1.4,equip:'GR',num1:1},
	29:{num:5,rate:.6,mod:1.55,equip:'HR',num1:1},
	30:{num:3,rate:.4,mod:1.3,equip:'HHH',num1:1},
	31:{num:2,rate:.5,mod:1.25,equip:'HH',num1:1},
	32:{num:3,rate:.5,mod:1.2,equip:'CM',num1:1},
	33:{num:3,rate:.4,mod:1.35,equip:'HG',num1:1},
	34:{num:7,rate:.6,mod:1.6,equip:'BB',rollIndiv:true,num1:1},
	35:{num:6,rate:.55,mod:1.55,equip:'BH',rollIndiv:true,num1:1},
	36:{num:6,rate:.55,mod:1.55,equip:'HHR',rollIndiv:true,num1:1},
	37:{num:4,rate:.4,mod:1.45,equip:'HH',rollIndiv:true,num1:1},
	38:{num:10,rate:.58,mod:1.85,equip:'BB',rollIndiv:true,num1:5},
	39:{num:10,rate:.57,mod:1.7,equip:'BB',rollIndiv:true,num1:5},
	40:{num:10,rate:.56,mod:1.7,equip:'BBR',rollIndiv:true,num1:5},
	41:{num:9,rate:.55,mod:1.65,equip:'BB',rollIndiv:true,num1:5},
};

var ARTILLERYSPOTDATA = {
	2: { dmgMod: 1.2, accMod: 1.1, chanceMod: 1.3, numHits: 2, name: 'DA' },
	3: { dmgMod: 1.1, accMod: 1.3, chanceMod: 1.2, name: 'Sec. CI' },
	4: { dmgMod: 1.2, accMod: 1.5, chanceMod: 1.3, name: 'Radar CI' },
	5: { dmgMod: 1.3, accMod: 1.3, chanceMod: 1.4, name: 'AP+Sec. CI' },
	6: { dmgMod: 1.5, accMod: 1.2, chanceMod: 1.5, name: 'AP CI' },
	71: { dmgMod: 1.25, accMod: 1.2, chanceMod: 1.25, id: 7, name: 'CVCI (FBA)' },
	72: { dmgMod: 1.2, accMod: 1.2, chanceMod: 1.4, id: 7, name: 'CVCI (BBA)' },
	73: { dmgMod: 1.15, accMod: 1.2, chanceMod: 1.55, id: 7, name: 'CVCI (BA)' },
	200: { dmgMod: 1.35, accMod: 1.2, chanceMod: 1.2, name: 'Zuiun CI' },
	201: { dmgMod: 1.3, accMod: 1.2, chanceMod: 1.3, name: 'DB CI' },
}

var NBATTACKDATA = {
	1: { dmgMod: 1.2, accMod: 1.1, chanceMod: 0, numHits: 2, name: 'DA' },
	2: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.15, numHits: 2, torpedo: true, name: 'Mixed CI' },
	3: { dmgMod: 1.5, accMod: 1.65, chanceMod: 1.22, numHits: 2, torpedo: true, name: 'Torpedo CI' },
	4: { dmgMod: 1.75, accMod: 1.5, chanceMod: 1.3, name: 'Sec. Gun CI' },
	5: { dmgMod: 2, accMod: 2, chanceMod: 1.4, name: 'Main Gun CI' },
	61: { dmgMod: 1.25, accMod: 1.25, chanceMod: 1.05, id: 6, name: 'CVCI (1.25)' },
	62: { dmgMod: 1.2, accMod: 1.2, chanceMod: 1.2, id: 6, name: 'CVCI (1.2)' },
	63: { dmgMod: 1.2, accMod: 1.2, chanceMod: 1.2, id: 6, name: 'CVCI (1.2)' },
	64: { dmgMod: 1.18, accMod: 1.2, chanceMod: 1.3, id: 6, name: 'CVCI (1.18)' },
	7: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.15, name: 'DDCI (GTR) x1', replace: 11, replaceChance: .65 },
	8: { dmgMod: 1.2, accMod: 1.65, chanceMod: 1.4, name: 'DDCI (LTR) x1', replace: 12, replaceChance: .5 },
	9: { dmgMod: 1.5, accMod: 1.65, chanceMod: 1.22, torpedo: true, name: 'DDCI (TTL) x1', replace: 13, replaceChance: .875 },
	10: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.22, torpedo: true, name: 'DDCI (TDL) x1', replace: 14, replaceChance: .55 },
	11: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.3, numHits: 2, name: 'DDCI (GTR) x2' },
	12: { dmgMod: 1.2, accMod: 1.65, chanceMod: 1.4, numHits: 2, name: 'DDCI (LTR) x2' },
	13: { dmgMod: 1.5, accMod: 1.65, chanceMod: 1.22, numHits: 2, torpedo: true, name: 'DDCI (TTL) x2' },
	14: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.22, numHits: 2, torpedo: true, name: 'DDCI (TDL) x2' },
}

var FLEETS1 = [];
var FLEETS2 = [];
var FLEETS1S = [null,null];
var LBAS = [null,null,null];
var ENGAGEMENT = 1;
const CRITMOD = 1.5;
var FIXTORPEDOSUPPORT = false;
var SIMCONSTS = {
	shellDmgCap: 220,
	torpedoDmgCap: 180,
	nightDmgCap: 360,
	airDmgCap: 170,
	aswDmgCap: 170,
	supportDmgCap: 170,
	shellEcMF: null,
	shellEcME: null,
	shellEcEF: null,
	shellEcEE: null,
	accEcMF: null,
	accEcME: null,
	accEcEF: null,
	accEcEE: null,
	supportShellN: null,
	supportShellB: null,
	vanguardEvShellDD: [7,7,20,20,35,40,40],
	vanguardEvShellOther: [7,7,7,7,15,20,20],
	vanguardEvTorpDD: [15,15,45,50,65,75,75],
	vanguardEvTorpOther: [15,15,20,45,45,60,60],
	nelsonTouchRate: 60,
	nagatoSpecialRate: 60,
	mutsuSpecialRate: 60,
	coloradoSpecialRate: 60,
	kongouSpecialRate: null,
	airRaidCostW6: false,
	enableEnemyAACI: true,
	enableEnemyAACILBAS: false,
	enablePlaneBonus: true,
	enableModSummerBB: true,
	enableModSummerCA: true,
	enableModFrenchBB: true,
	echelonOld: {shellmod:.6,torpmod:.6,ASWmod:1,AAmod:1, shellacc:1.2,torpacc:.6,NBacc:.8, shellev:1.2,torpev:1.3,NBev:1.1,ASWev:1.3, id:4},
	echelonNew: {shellmod:.75,torpmod:.6,ASWmod:1.1,AAmod:1, shellacc:1.2,torpacc:.75,NBacc:.9, shellev:1.4,torpev:1.3,NBev:1.3,ASWev:1.3, id:4},
	nbattack7Old: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.3, name: 'DDCI (GTR)' },
	nbattack7New: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.15, name: 'DDCI (GTR) x1', replace: 11, replaceChance: .65 },
	nbattack8Old: { dmgMod: 1.2, accMod: 1.65, chanceMod: 1.5, name: 'DDCI (LTR)' },
	nbattack8New: { dmgMod: 1.2, accMod: 1.65, chanceMod: 1.4, name: 'DDCI (LTR) x1', replace: 12, replaceChance: .5 },
}
function setConst(key, val) {
	if (val == null) SIMCONSTS[key] = null;
	else SIMCONSTS[key] = parseInt(val);
}
function toggleEchelon(enable) {
	ALLFORMATIONS[4] = ECHELON = enable ? SIMCONSTS.echelonNew : SIMCONSTS.echelonOld;
}
function toggleDDCIBuff(enable) {
	NBATTACKDATA[7] = enable ? SIMCONSTS.nbattack7New : SIMCONSTS.nbattack7Old;
	NBATTACKDATA[8] = enable ? SIMCONSTS.nbattack8New : SIMCONSTS.nbattack8Old;
}

var BUCKETPERCENT = .5;
var BUCKETTIME = 99*3600;
var CARRYOVERHP = false;
var CARRYOVERMORALE = false;

var C = true;
var NEWFORMAT = true;
var DIDPROTECT = false;

var MECHANICS = {
	flagProtect: true,
	aswSynergy: true,
	artillerySpotting: true,
	OASW: true,
	APmod: true,
	AACI: true,
	fitGun: true,
	morale: true,
	fixFleetAA: true,
	newSupply: true,
	CVCI: true,
	destroyerNBCI: true,
	LBASBuff: true,
	aaci8Up: true,
	installRevamp: true,
	zuiunCI: true,
	aaResist: true,
	divebomberInstall: true,
	specialAttacks: true,
	hayabusa65Buff: true,
	subFleetAttack: true,
	kongouSpecialBuff: true,
	eqBonus: true,
	eqBonusTorp: true,
	anchorageTorpNerf: true,
	eqBonusASW: true,
	coloradoSpecialFix: true,
};
var NERFPTIMPS = false;
var BREAKPTIMPS = false;

function getRepairCost(ship) {
	var base = (ship.maxHP - ship.HP)*SHIPDATA[ship.mid].fuel;
	return [Math.floor(base*.032),Math.floor(base*.06)];
}

function getRepairTime(ship) {
	var mod, base;
	if (ship.LVL <= 12) base = 10*ship.LVL;
	else if (ship.LVL < 100) {
		base = 120;
		var extra = 0, count = 0, bm = 2;
		for (var i=13; i<=ship.LVL; i++) {
			base += 5;
			if (count++ >= bm) { bm += 2; count = 0; base += 10; }
		}
	} else if (ship.LVL <= 128) base = 650 + 5*(ship.LVL-100);
	else if (ship.LVL < 150) base = 800 + 5*(ship.LVL-128);
	else base = 915;
	switch (SHIPDATA[ship.mid].type) {
		case 'BB': case 'BBV': case 'CV': case 'AR': mod = 2; break;
		case 'CA': case 'CAV': case 'FBB': case 'CVL': case 'AS': mod = 1.5; break;
		case 'SS': mod = .5; break;
		default: mod = 1; break;
	}
	return (ship.maxHP - ship.HP)*base*mod+30;
}

function formationCountered(form1,form2) {
	if (form1==2 && form2==5) return true;
	if (form1==4 && form2==1) return true;
	if (form1==5 && form2==4) return true;
	return false;
}

function shell(ship,target,APIhou,attackSpecial) {
	var da = false, cutin = false, cutinR = 0;
	var preMod = ship.getFormation().shellmod*ENGAGEMENT*ship.damageMod();
	var postMod = (MECHANICS.APmod)? ship.APmod(target) : 1;
	var overrideCritDmgBonus = null, critRateBonus = null;
	
	var accMod = ship.moraleMod();
	if (!formationCountered(ship.fleet.formation.id,target.fleet.formation.id)) accMod *= ship.getFormation().shellacc;
	if (ship.fleet.formation.id == 6 && target.type == 'DD') {
		accMod *= 1.1;
	}
	
	var accMod2 = (MECHANICS.APmod)? ship.APacc(target) : 1;
	var evMod = target.getFormation().shellev;
	
	let AStypes;
	if (MECHANICS.artillerySpotting && (AStypes = ship.canAS()) && ship.fleet.AS > 0 && !attackSpecial) {
		var ASchance = ship.ASchance(ship.fleet.AS);
		if (C) console.log('AS chance: '+ASchance);
		
		for (var i=0; i<AStypes.length; i++) {
			if (da || cutin) break;
			let attackData = ARTILLERYSPOTDATA[AStypes[i]];
			if (attackData.id == 7 && target.isInstall) continue; //no CVCI on installation?
			if (Math.random() < ASchance/attackData.chanceMod) {
				if (attackData.numHits) da = attackData.numHits;
				else { cutin = attackData.id || AStypes[i]; cutinR = AStypes[i]; }
				postMod *= attackData.dmgMod;
				accMod2 *= attackData.accMod;
				break;
			}
		}
		if (cutin == 7) { //special CVCI crit bonus
			overrideCritDmgBonus = 1 + .1*(ship.ACCplane||0)/12.46; //base scaling on average proficiency
			critRateBonus = .13*(ship.ACCplane||0)/12.46 - ship.critratebonus*.01; //override normal rate bonus
			
			if (ship.equips[0]) {
				let type0 = ship.equips[0].type;
				if (type0 == DIVEBOMBER || type0 == TORPBOMBER || (type0 == FIGHTER && AStypes[i] == 71)) {
					if (ship.equips[0].rank == 7) {
						overrideCritDmgBonus += .15; //base scaling on 8 - 5.6 mods of standard crit dmg bonus
						critRateBonus += .08;
					} else if (ship.equips[0].rank == 6) {
						overrideCritDmgBonus += .1;
						critRateBonus += .056;
					}
				}
			}
		}
	}
	
	//PT Imp bonus
	if (target.isPT) {
		postMod *= ship.ptDmgMod || 1;
	}
	
	var evFlat = 0;
	if (target.fleet.formation.id == 6) {
		evFlat += (target.type == 'DD') ? SIMCONSTS.vanguardEvShellDD[target.num-1] || 0 : SIMCONSTS.vanguardEvShellOther[target.num-1] || 0;
		if (target.type == 'DD' && !isPlayable(target.mid) && accMod > 1) accMod = 1 + (accMod-1)/2;
	}
	evFlat += target.improves.EVshell || 0;
	
	var accflat = (ship.ACC)? ship.ACC : 0;
	if (ship.improves.ACCshell) accflat += ship.improves.ACCshell;
	
	var acc = hitRate(ship,(ship.fleet.baseaccshell||90),accflat,accMod); //use global hit acc
	if (MECHANICS.fitGun && ship.ACCfit) acc += ship.ACCfit*.01;
	acc *= accMod2;
	
	if (ship.bonusSpecialAcc && evFlat < 20) acc *= getBonusAcc(ship);
	
	if (target.isPT) {
		if (NERFPTIMPS) {
			acc *= ship.ptAccMod/.7;
		} else {
			acc = .42*acc + .24;
			acc *= ship.ptAccMod || 1;
			if (ship.fleet.formation.id == 6) acc *= 1.2;
		}
		if (BREAKPTIMPS && ship.type == 'DD') acc = 0;
	}
	
	if (ship.type == 'DE') acc -= .13;
	
	var FPfit = (ship.FPfit||0);
	
	if (attackSpecial) {
		postMod *= getSpecialAttackMod(ship,attackSpecial);
		if (ENGAGEMENT == .6 && attackSpecial == 100) postMod *= 1.25;
		if (attackSpecial >= 300 && attackSpecial <= 302) {
			preMod = 1;
			FPfit += ship.TP - ship.shellPower(target,ship.fleet.basepowshell);
		}
		cutin = attackSpecial;
	}
	
	if (target.isAnchorage) {
		postMod *= ship.anchoragePostMult;
	}
	if (SIMCONSTS.enableModSummerBB && target.isSummerBB) {
		if (ship.equiptypes[APSHELL]) postMod *= 1.2;
		if (ship.equiptypes[SEAPLANEBOMBER] || ship.equiptypes[SEAPLANEFIGHTER]) postMod *= 1.1;
	}
	if (SIMCONSTS.enableModSummerCA && target.isSummerCA) {
		if (ship.equiptypes[APSHELL]) postMod *= 1.1;
		if (ship.equiptypes[SEAPLANEBOMBER] || ship.equiptypes[SEAPLANEFIGHTER]) postMod *= 1.15;
	}
	if (SIMCONSTS.enableModFrenchBB && target.isFrenchBB) {
		if (ship.sclass == 79) postMod *= 1.17;
		if (ship.equiptypes[APSHELL]) postMod *= 1.2;
		if (ship.equiptypes[SEAPLANEBOMBER] || ship.equiptypes[SEAPLANEFIGHTER]) postMod *= 1.1;
		if (ship.equips.find(eq => eq.mid == 194)) postMod *= 1.3;
		if (ship.equiptypes[DIVEBOMBER]) postMod *= 1.1;
		if (ship.equiptypes[DIVEBOMBER] >= 2) postMod *= 1.15;
	}
	
	if (SIMCONSTS.enablePlaneBonus && ship.CVshelltype) postMod *= getBonusSpecialPlane(ship);
	
	if (C) console.log('PREMOD: '+preMod+' POSTMOD: '+postMod);
	
	if (da) {
		var res1 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,1.3,ship.CVshelltype));
		var dmg1 = getScratchDamage(target.HP), realdmg1 = 0;
		if (res1) {
			dmg1 = damage(ship,target,ship.shellPower(target,ship.fleet.basepowshell)+FPfit,preMod,res1*postMod,SIMCONSTS.shellDmgCap);
			realdmg1 = takeDamage(target,dmg1);
		} else { realdmg1 = takeDamage(target,dmg1) };
		var res2 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,1.3,ship.CVshelltype));
		var dmg2 = getScratchDamage(target.HP), realdmg2 = 0;
		if (res2) {
			dmg2 = damage(ship,target,ship.shellPower(target,ship.fleet.basepowshell)+FPfit,preMod,res2*postMod,SIMCONSTS.shellDmgCap);
			realdmg2 = takeDamage(target,dmg2);
		} else { realdmg2 = takeDamage(target,dmg2); }
		ship.fleet.giveCredit(ship,realdmg1+realdmg2);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg1+', '+dmg2+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIhou.api_at_eflag) {
				let off = (NEWFORMAT)? -1 : 0;
				APIhou.api_at_eflag.push(ship.side);
				APIhou.api_at_list.push(ship.apiID2+off);
				APIhou.api_df_list.push([target.apiID2+off,target.apiID2+off]);
			} else {
				APIhou.api_at_list.push(ship.apiID);
				APIhou.api_df_list.push([target.apiID,target.apiID]);
			}
			APIhou.api_damage.push([realdmg1+DIDPROTECT*.1,realdmg2+DIDPROTECT*.1]);
			APIhou.api_at_type.push(2);
			APIhou.api_cl_list.push([((res1>1)?2:1),((res2>1)?2:1)]);
			if (APIhou.api_si_list) {
				let si_list = [];
				for (let eq of ship.equips) {
					if (eq.btype == B_MAINGUN) si_list.push(eq.mid);
				}
				APIhou.api_si_list.push([si_list[0],si_list[1]]);
			}
		}
	} else {
		var res = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,1.3,ship.CVshelltype,critRateBonus),(overrideCritDmgBonus || ship.critdmgbonus));
		var dmg = (cutin)? getScratchDamage(target.HP) : 0, realdmg = 0;
		if (res) {
			dmg = damage(ship,target,ship.shellPower(target,ship.fleet.basepowshell)+FPfit,preMod,res*postMod,SIMCONSTS.shellDmgCap);
			realdmg = takeDamage(target,dmg);
		} else { realdmg = takeDamage(target,dmg); }
		ship.fleet.giveCredit(ship,realdmg);
	
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIhou.api_at_eflag) {
				let off = (NEWFORMAT)? -1 : 0;
				APIhou.api_at_eflag.push(ship.side);
				APIhou.api_at_list.push(ship.apiID2+off);
				APIhou.api_df_list.push([target.apiID2+off]);
			} else {
				APIhou.api_at_list.push(ship.apiID);
				APIhou.api_df_list.push([target.apiID]);
			}
			APIhou.api_damage.push([realdmg+DIDPROTECT*.1]);
			APIhou.api_at_type.push(cutin || 0);
			APIhou.api_cl_list.push([((res>1)?2:1)]);
			if (APIhou.api_si_list) {
				let si_list;
				if (cutinR < 70) {
					let btypeMap = { 1: [], 2: [], 3: [], 4: [], 5: [] };
					for (let eq of ship.equips) {
						if (btypeMap[eq.btype]) btypeMap[eq.btype].push(eq.mid);
					}
					switch (cutinR) {
						case 3:
							si_list = [btypeMap[B_RECON][0],btypeMap[B_MAINGUN][0],btypeMap[B_SECGUN][0]];
							break;
						case 4:
							si_list = [btypeMap[B_RECON][0],btypeMap[B_RADAR][0],btypeMap[B_MAINGUN][0]];
							break;
						case 5:
							si_list = [btypeMap[B_RECON][0],btypeMap[B_MAINGUN][0],btypeMap[B_APSHELL][0]];
							break;
						case 6:
							si_list = [btypeMap[B_RECON][0],btypeMap[B_MAINGUN][0],btypeMap[B_MAINGUN][1]];
							break;
						default:
							if (btypeMap[B_MAINGUN].length) si_list = [btypeMap[B_MAINGUN][0]];
							else if (btypeMap[B_SECGUN].length) si_list = [btypeMap[B_SECGUN][0]];
							else si_list = [-1];
							break;
					}
				} else {
					let ptypeMap = { 6: [], 7: [], 8: [] };
					for (let eq of ship.equips) {
						if (ptypeMap[eq.type]) ptypeMap[eq.type].push(eq.mid);
					}
					switch (cutinR) {
						case 71:
							si_list = [ptypeMap[FIGHTER][0],ptypeMap[DIVEBOMBER][0],ptypeMap[TORPBOMBER][0]];
							break;
						case 72:
							si_list = [ptypeMap[DIVEBOMBER][0],ptypeMap[DIVEBOMBER][1],ptypeMap[TORPBOMBER][0]];
							break;
						case 73:
							si_list = [ptypeMap[DIVEBOMBER][0],ptypeMap[TORPBOMBER][0]];
							break;
						default:
							si_list = [-1];
							break;
					}
				}
				APIhou.api_si_list.push(si_list);
			}
		}
	}
	return (target.HP <= 0);
}

function NBattack(ship,target,NBonly,NBequips,APIyasen,attackSpecial) {
	var starshells = NBequips[0], searchlights = NBequips[1], nightscouts = NBequips[2];
	if (!ship.canNB()) return false;
	var da = false; //1 = combined damage, 2 = separate damages
	var cutin = false, cutinR = 0;
	
	var preMod = ship.damageMod();
	var postMod = 1;
	var bonus = 5*nightscouts[0];//add if have night scout
	
	var accBase = (NBonly && ship.side == 0 && ship.fleet.combinedWith)? 90 : 69;
	accBase = (accBase + starshells[0]*5)*((nightscouts[0])? 1.1 : 1);
	var accMod = ship.getFormation().NBacc * ship.moraleMod();
	if (ship.fleet.formation.id == 6 && target.type == 'DD') accMod *= 1.1;
	var accFlat = ship.ACC;
	if (ship.improves.ACCnb) accFlat += ship.improves.ACCnb;
	
	var evMod = target.getFormation().NBev;
	var evFlat = (target.type == 'CA' || target.type == 'CAV')? 5 : 0;
	if (target.type == 'DD' && target.equiptypesB[B_RADAR] && target.hasLookout) evFlat += 10;
	if (target.hasSearchlight) { evMod *= .2; evFlat *= .2; }
	
	if (!attackSpecial) {
		var NBchance = ship.NBchance(); 
		NBchance += starshells[0]*4 - starshells[1]*10 + searchlights[0]*7 - searchlights[1]*5;
		if (ship.HP/ship.maxHP <= .5) NBchance += 18;
		NBchance *= .01;
		if (C) console.log('base NB chance: '+NBchance);

		for (let NBtype of ship.NBtypes()) {
			if (da || cutin) break;
			let attackData = NBATTACKDATA[NBtype];
			if (attackData.replace && ship.LVL >= 80) {
				if (Math.random() < attackData.replaceChance) {
					attackData = NBATTACKDATA[NBtype = attackData.replace];
				}
			}
			if (target.isInstall && attackData.torpedo) {
				if ((NBtype == 3 || NBtype == 2) && ship._hasNBDA) {
					attackData = NBATTACKDATA[NBtype = 1];
				} else {
					continue;
				}
			}
			let chance = (attackData.chanceMod == 0)? .99 : NBchance/attackData.chanceMod;
			if (NBtype == 3) {
				if (ship.numSpecialTorp && ship.hasSubRadar) chance = NBchance/1.05;
				else if (ship.numSpecialTorp >= 2) chance = NBchance/1.1;
			}
			if (Math.random() < chance) {
				if (attackData.numHits) da = attackData.numHits;
				cutin = attackData.id || NBtype;
				cutinR = NBtype;
				let dmgMod = attackData.dmgMod;
				if (NBtype == 3) { //special sub TCI
					if (ship.numSpecialTorp >= 2) dmgMod = 1.6;
					if (ship.numSpecialTorp && ship.hasSubRadar) dmgMod = 1.75;
				} else if (NBtype == 7 || NBtype == 8 || NBtype == 11 || NBtype == 12) { //D-gun bonus
					let count = 0, count2 = 0;
					for (let equip of ship.equips) {
						if (equip.mid == 267) { count++; }
						if (equip.mid == 366) { count++; count2++; }
					}
					if (count) dmgMod *= 1.25;
					if (count >= 2) dmgMod *= 1.125;
					if (count2) dmgMod *= 1.05;
				}
				preMod *= dmgMod;
				accMod *= attackData.accMod;
				if (C) console.log(attackData.name);
			}
		}
	}
	
	if (ship.getFormation() == VANGUARD1) {
		preMod *= .5;
	}
	if (target.fleet.formation.id == 6) {
		evFlat += (target.type == 'DD') ? SIMCONSTS.vanguardEvShellDD[target.num-1] || 0 : SIMCONSTS.vanguardEvShellOther[target.num-1] || 0;
	}
	
	//PT Imp bonus
	var accMod2 = 1;
	if (target.isPT) {
		postMod *= ship.ptDmgMod || 1;
	}
	
	var acc = hitRate(ship,accBase,accFlat,accMod);
	if (MECHANICS.fitGun && ship.ACCfitN) acc += ship.ACCfitN*.01;
	if (searchlights[0]) acc += .07;
	if (ship.ACCnbca) acc += ship.ACCnbca*.01;
	acc *= accMod2;
	
	if (ship.bonusSpecialAcc && evFlat < 20) acc *= getBonusAcc(ship);
	
	if (target.isPT) {
		if (NERFPTIMPS) {
			acc *= ship.ptAccMod/.7;
		} else {
			acc = .42*acc + .24;
			acc *= ship.ptAccMod || 1;
			if (ship.fleet.formation.id == 6) acc *= 1.2;
		}
		if (BREAKPTIMPS && ship.type == 'DD') acc = 0;
	}
	
	var critMod = 1.5;
	if (nightscouts[0]) critMod += .07;
	
	
	
	if (attackSpecial) {
		cutin = attackSpecial;
		preMod *= getSpecialAttackMod(ship,attackSpecial);
	}
	
	if (target.isAnchorage) {
		postMod *= ship.anchoragePostMult;
	}
	if (SIMCONSTS.enableModSummerBB && target.isSummerBB) {
		if (ship.equiptypes[APSHELL]) postMod *= 1.2;
		if (ship.equiptypes[SEAPLANEBOMBER] || ship.equiptypes[SEAPLANEFIGHTER]) postMod *= 1.1;
	}
	if (SIMCONSTS.enableModSummerCA && target.isSummerCA) {
		if (ship.equiptypes[APSHELL]) postMod *= 1.1;
		if (ship.equiptypes[SEAPLANEBOMBER] || ship.equiptypes[SEAPLANEFIGHTER]) postMod *= 1.15;
	}
	if (SIMCONSTS.enableModFrenchBB && target.isFrenchBB) {
		if (ship.sclass == 79) postMod *= 1.17;
		if (ship.equiptypes[APSHELL]) postMod *= 1.2;
		if (ship.equiptypes[SEAPLANEBOMBER] || ship.equiptypes[SEAPLANEFIGHTER]) postMod *= 1.1;
		if (ship.equips.find(eq => eq.mid == 194)) postMod *= 1.3;
		if (ship.equiptypes[DIVEBOMBER]) postMod *= 1.1;
		if (ship.equiptypes[DIVEBOMBER] >= 2) postMod *= 1.15;
	}
	
	if (SIMCONSTS.enablePlaneBonus && ship.canNBAirAttack()) postMod *= getBonusSpecialPlane(ship);
	
	let critdmgbonus = ship.canNBAirAttack() ? ship.critdmgbonus : 1;
	if (da) {
		var res1 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,critMod,ship.canNBAirAttack()),critdmgbonus);
		var dmg1 = getScratchDamage(target.HP), realdmg1 = 0;
		if (res1) {
			dmg1 = damage(ship,target,ship.NBPower(target)+bonus,preMod,res1*postMod,SIMCONSTS.nightDmgCap);
			realdmg1 = takeDamage(target,dmg1);
		} else { realdmg1 = takeDamage(target,dmg1) };
		var res2 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,critMod,ship.canNBAirAttack()),critdmgbonus);
		var dmg2 = getScratchDamage(target.HP), realdmg2 = 0;
		if (res2) {
			dmg2 = damage(ship,target,ship.NBPower(target)+bonus,preMod,res2*postMod,SIMCONSTS.nightDmgCap);
			realdmg2 = takeDamage(target,dmg2);
		} else { realdmg2 = takeDamage(target,dmg2); }
		ship.fleet.giveCredit(ship,realdmg1+realdmg2);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg1+', '+dmg2+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIyasen.api_at_eflag) {
				APIyasen.api_at_eflag.push(ship.side);
				APIyasen.api_at_list.push(ship.apiID2-1);
				APIyasen.api_df_list.push([target.apiID2-1,target.apiID2-1]);
			} else {
				APIyasen.api_at_list.push(ship.apiID);
				APIyasen.api_df_list.push([target.apiID,target.apiID]);
			}
			APIyasen.api_damage.push([realdmg1+DIDPROTECT*.1,realdmg2+DIDPROTECT*.1]);
			APIyasen.api_sp_list.push(cutin);
			APIyasen.api_cl_list.push([((res1>1)?2:1),((res2>1)?2:1)]);
			APIyasen.api_n_mother_list.push(0);
		}
	} else {
		var res = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,critMod,ship.canNBAirAttack()),critdmgbonus);
		var dmg = (cutin)? getScratchDamage(target.HP) : 0; var realdmg = 0;
		if (res) {
			dmg = damage(ship,target,ship.NBPower(target)+bonus,preMod,res*postMod,SIMCONSTS.nightDmgCap);
			realdmg = takeDamage(target,dmg);
		} else { realdmg = takeDamage(target,dmg); }
		ship.fleet.giveCredit(ship,realdmg);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIyasen.api_at_eflag) {
				APIyasen.api_at_eflag.push(ship.side);
				APIyasen.api_at_list.push(ship.apiID2-1);
				APIyasen.api_df_list.push([target.apiID2-1]);
			} else {
				APIyasen.api_at_list.push(ship.apiID);
				APIyasen.api_df_list.push([target.apiID]);
			}
			APIyasen.api_damage.push([realdmg+DIDPROTECT*.1]);
			APIyasen.api_sp_list.push(cutin || 0);
			APIyasen.api_cl_list.push([((res>1)?2:1)]);
			APIyasen.api_n_mother_list.push(+ship.canNBAirAttack());
		}
	}
	if (C) {
		if (APIyasen.api_si_list) {
			let si_list;
			if (cutinR < 60) {
				let btypeMap = { 1: [], 2: [], 8: [], 4: [] }, btypeAll = [];
				for (let eq of ship.equips) {
					if (btypeMap[eq.btype]) {
						btypeMap[eq.btype].push(eq.mid);
						btypeAll.push(eq.mid);
					}
				}
				switch (cutinR) {
					case 1:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_MAINGUN][1]];
						var ind = 0;
						if (!si_list[0]) si_list[0] = btypeMap[B_SECGUN][ind++];
						if (!si_list[1]) si_list[1] = btypeMap[B_SECGUN][ind++];
						break;
					case 2:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_TORPEDO][0]];
						break;
					case 3:
						si_list = [btypeMap[B_TORPEDO][0],btypeMap[B_TORPEDO][1]];
						break;
					case 4:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_MAINGUN][1],btypeMap[B_SECGUN][0]];
						break;
					case 5:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_MAINGUN][1],btypeMap[B_MAINGUN][2]];
						break;
					case 7:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_TORPEDO][0],btypeMap[B_RADAR][0]];
						break;
					case 8:
						si_list = [129,btypeMap[B_TORPEDO][0],btypeMap[B_RADAR][0]];
						break;
					default:
						if (btypeAll.length) si_list = [btypeAll[0]];
						else si_list = [-1];
						break;
				}
			} else {
				let btypeMap = { 14: [], 15: [], 16: [] }, btypeAll = [];
				for (let eq of ship.equips) {
					if (btypeMap[eq.btype]) {
						btypeMap[eq.btype].push(eq.mid);
						btypeAll.push(eq.mid);
					}
				}
				switch (cutinR) {
					case 61:
						si_list = [btypeMap[B_NIGHTFIGHTER][0],btypeMap[B_NIGHTFIGHTER][1],btypeMap[B_NIGHTBOMBER][0]];
						break;
					case 62:
						si_list = [btypeMap[B_NIGHTFIGHTER][0],btypeMap[B_NIGHTBOMBER][0]];
						break;
					case 63:
						si_list = [btypeAll[0],btypeAll[1],btypeAll[2]];
						break;
					default:
						si_list = [-1];
						break;
				}
			}
			APIyasen.api_si_list.push(si_list);
		}
	}
	return (target.HP <= 0);
}

function ASW(ship,target,isnight,APIhou,isOASW) {
	var sonarAcc = 0;
	for (var i=0; i<ship.equips.length; i++) if (ship.equips[i].btype == B_SONAR) sonarAcc += 2*ship.equips[i].ASW;
	if (ship.improves.ACCasw) sonarAcc += ship.improves.ACCasw;
	var accMod = ship.moraleMod();
	if (!formationCountered(ship.fleet.formation.id,target.fleet.formation.id)) accMod *= ship.getFormation().ASWacc || ship.getFormation().shellacc;
	var evFlat = 0;
	if (target.fleet.formation.id == 6) {
		evFlat += (target.type == 'DD') ? SIMCONSTS.vanguardEvShellDD[target.num-1] || 0 : SIMCONSTS.vanguardEvShellOther[target.num-1] || 0;
	}
	var acc = hitRate(ship,80,sonarAcc,accMod);
	if (ship.bonusSpecialAcc) acc *= getBonusAcc(ship);
	var res = rollHit(accuracyAndCrit(ship,target,acc,target.getFormation().ASWev,evFlat,1.3,ship.planeasw && !isOASW),ship.planeasw && !isOASW ? ship.critdmgbonus : null);
	var dmg = 0, realdmg = 0;
	var premod = (isnight)? 0 : ship.getFormation().ASWmod*ENGAGEMENT*ship.damageMod();
	let postMod = 1;
	if (SIMCONSTS.enablePlaneBonus && ship.planeasw && !isOASW) postMod *= getBonusSpecialPlane(ship);
	if (res) {
		dmg = damage(ship,target,ship.ASWPower(),premod,res*postMod,SIMCONSTS.aswDmgCap);
		realdmg = takeDamage(target,dmg);
	}
	ship.fleet.giveCredit(ship,realdmg);
	if (C) {
		console.log(ship.name+' ASWs '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
		if (APIhou.api_at_eflag) {
			let off = (NEWFORMAT)? -1 : 0;
			APIhou.api_at_eflag.push(ship.side);
			APIhou.api_at_list.push(ship.apiID2+off);
			APIhou.api_df_list.push([target.apiID2+off]);
		} else {
			APIhou.api_at_list.push(ship.apiID);
			APIhou.api_df_list.push([target.apiID]);
		}
		APIhou.api_damage.push([realdmg+DIDPROTECT*.1]);
		if(APIhou.api_at_type) APIhou.api_at_type.push(0);
		else APIhou.api_sp_list.push(0);
		if (APIhou.api_n_mother_list) APIhou.api_n_mother_list.push(0);
		APIhou.api_cl_list.push([((res>1)?2:1)]);
		if (APIhou.api_si_list) {
			let si = -1;
			for (let eq of ship.equips) {
				if (eq.type == DEPTHCHARGE) { si = eq.mid; break; }
			}
			APIhou.api_si_list.push([si]);
		}
	}
	return (target.HP <= 0);
}

function laser(ship,targets,APIhou) {
	var preMod = ship.getFormation().shellmod*ENGAGEMENT*ship.damageMod();
	var accMod = ship.moraleMod();
	if (!formationCountered(ship.fleet.formation.id,targets[0].fleet.formation.id)) accMod *= ship.getFormation().shellacc;
	var acc = hitRate(ship,90,0,accMod);
	if (ship.bonusSpecialAcc) acc *= getBonusAcc(ship);
	var evMod = ship.getFormation().shellev;
	var targetids = [], damages = [], crits = [];
	for (var i=0; i<targets.length; i++) {
		var postMod = 1;//ship.APmod(targets[i]); //want this?
		var res = rollHit(accuracyAndCrit(ship,targets[i],acc,evMod,0,1.3));
		var dmg = 0, realdmg = 0;
		if (res) {
			dmg = damage(ship,targets[i],ship.shellPower(targets[i]),preMod,res*postMod,SIMCONSTS.shellDmgCap);
			realdmg = takeDamage(targets[i],dmg);
		} else { realdmg = takeDamage(targets[i],dmg); }
		ship.fleet.giveCredit(ship,realdmg);
		if (C) {
			let off = (NEWFORMAT)? -1 : 0;
			console.log(ship.name+' LASERS '+targets[i].name+' FOR '+dmg+' DAMAGE, '+targets[i].HP+'/'+targets[i].maxHP+' left');
			targetids.push((APIhou.api_at_eflag)? targets[i].apiID2+off : targets[i].apiID);
			damages.push(realdmg);
			crits.push(((res>1)?2:1));
		}
	}
	if (C) {
		if (APIhou.api_at_eflag) {
			let off = (NEWFORMAT)? -1 : 0;
			APIhou.api_at_eflag.push(ship.side);
			APIhou.api_at_list.push(ship.apiID2+off);
		} else {
			APIhou.api_at_list.push(ship.apiID);
		}
		APIhou.api_df_list.push(targetids);
		APIhou.api_damage.push(damages);
		APIhou.api_at_type.push(1);
		APIhou.api_cl_list.push(crits);
	}
}

function shellPhaseTarget(ship,alive,subsalive,isOASW) {
	var result = { type: 0, target: null, alive: null };
	if (subsalive.length && ship.canASW(isOASW) && (!ship.isASWlast||!alive.length)) {
		result.type = 2;
		result.target = choiceWProtect(subsalive);
		result.alive = subsalive;
		result.isOASW = isOASW;
	} else if (alive.length && !isOASW) {
		if (ship.canlaser && Math.random() < .5) {
			var temptargets = [];
			for (var j=0; j<alive.length; j++) if (!alive[j].isescort) temptargets.push(alive[j]);
			if (temptargets.length <= 0) temptargets = alive;
			var targets = shuffle(temptargets.slice()).slice(0,1+Math.max(0,Math.floor((temptargets.length-1)*Math.random())));
			result.type = 3;
			result.target = targets;
			result.alive = alive;
		} else {
			var targets;
			if (ship.hasDivebomber) {
				targets = [];
				for (var j=0; j<alive.length; j++) if (!alive[j].isInstall) targets.push(alive[j]);
			} else if (ship.isSub) {
				targets = [];
				for (var j=0; j<alive.length; j++) if (alive[j].isInstall) targets.push(alive[j]);
			} else targets = alive;
			if (ship.isAntiPT) {
				let targetsPT = alive.filter(ship => ship.isPT);
				if (targetsPT.length) targets = targetsPT;
			}
			if (targets.length) {
				result.type = 1;
				result.target = choiceWProtect(targets);
				result.alive = alive;
			}
		}
	}
	return result;
}

function shellPhaseAttack(ship,targetData,APIhou,attackSpecial) {
	switch (targetData.type) {
		case 1: //shell
			if (shell(ship,targetData.target,APIhou,attackSpecial)) targetData.alive.splice(targetData.alive.indexOf(targetData.target),1);
			break;
		case 2: //ASW
			if (ASW(ship,targetData.target,false,APIhou,targetData.isOASW)) targetData.alive.splice(targetData.alive.indexOf(targetData.target),1);
			break;
		case 3: //laser
			var targets = targetData.target;
			laser(ship,targets,APIhou);
			for (var j=0; j<targets.length; j++) if (targets[j].HP <= 0) targetData.alive.splice(targetData.alive.indexOf(targets[j]),1);
			break;
	}
}

function canSpecialAttack(ship,isNB) {
	if (!MECHANICS.specialAttacks) return false;
	if (MECHANICS.subFleetAttack && ship.type == 'AS' && ship.fleet.id == 0) {
		if (ship.fleet.ships[0] != ship) return false;
		if (ship.LVL < 30) return false;
		if (ship.fleet.formation.id != 4 && ship.fleet.formation.id != 5) return false;
		if (ship.HP/ship.maxHP <= .25) return false;
		let rate = .6;
		let types = { 300: { s1: 1, s2: 2 }, 301: { s1: 2, s2: 3 }, 302: { s1: 1, s2: 3 } };
		for (let id in types) {
			let ship1 = ship.fleet.ships[types[id].s1], ship2 = ship.fleet.ships[types[id].s2];
			if (!ship1 || !ship1.isSub || ship1.HP/ship1.maxHP <= .5) continue;
			if (!ship2 || !ship2.isSub || ship2.HP/ship2.maxHP <= .5) continue;
			if (Math.random() < rate) {
				ship.attackSpecial = +id;
				return true;
			}
		}
		return false;
	}
	
	if (ship.attackSpecial == 100) {
		if (ship.fleet.didSpecial) return false;
		if (ship.fleet.ships[0] != ship || (!isNB && ship.isescort)) return false;
		if (ship.fleet.ships.filter(ship => ship.HP > 0 && !ship.retreated && !ship.isSub).length < 6) return false;
		if (ship.fleet.formation.id != 12 && ship.fleet.formation.id != 2) return false;
		if (ship.HP/ship.maxHP <= .5) return false;
		if (ship.fleet.ships[2].CVshelltype || ship.fleet.ships[4].CVshelltype) return false;
		if (ship.fleet.ships[2].isSub || ship.fleet.ships[4].isSub) return false;
		let rate = SIMCONSTS.nelsonTouchRate;
		if (Math.random() < rate/100) {
			ship.fleet.didSpecial = 1;
			if (ship.fleet.combinedWith) ship.fleet.combinedWith.didSpecial = 2;
			return true;
		}
	} else if (ship.attackSpecial == 101 || ship.attackSpecial == 102) {
		if (ship.fleet.didSpecial) return false;
		if (ship.fleet.ships[0] != ship || (!isNB && ship.isescort)) return false;
		if (ship.fleet.ships.filter(ship => ship.HP > 0 && !ship.retreated && !ship.isSub).length < 6) return false;
		if (ship.fleet.formation.id != 12 && ship.fleet.formation.id != 4) return false;
		if (ship.HP/ship.maxHP <= .5) return false;
		if (['BB','FBB','BBV'].indexOf(ship.fleet.ships[1].type) == -1) return false;
		if (ship.fleet.ships[1].HP/ship.fleet.ships[1].maxHP <= .25) return false;
		let rate = (ship.attackSpecial == 101)? SIMCONSTS.nagatoSpecialRate : SIMCONSTS.mutsuSpecialRate;
		if (Math.random() < rate/100) {
			ship.fleet.didSpecial = 1;
			if (ship.fleet.combinedWith) ship.fleet.combinedWith.didSpecial = 2;
			return true;
		}
	} else if (ship.attackSpecial == 103) {
		if (ship.fleet.didSpecial) return false;
		if (ship.fleet.ships[0] != ship || (!isNB && ship.isescort)) return false;
		if (ship.fleet.ships.filter(ship => ship.HP > 0 && !ship.retreated && !ship.isSub).length < 6) return false;
		if (ship.fleet.formation.id != 12 && ship.fleet.formation.id != 4) return false;
		let damageThres = MECHANICS.coloradoSpecialFix ? .25 : .5;
		for (let i=0; i<=2; i++) {
			let s = ship.fleet.ships[i];
			if (s.HP/s.maxHP <= damageThres) return false;
		}
		if (['BB','FBB','BBV'].indexOf(ship.fleet.ships[1].type) == -1) return false;
		if (['BB','FBB','BBV'].indexOf(ship.fleet.ships[2].type) == -1) return false;
		let rate = SIMCONSTS.coloradoSpecialRate;
		if (Math.random() < rate/100) {
			ship.fleet.didSpecial = 1;
			if (ship.fleet.combinedWith) ship.fleet.combinedWith.didSpecial = 2;
			return true;
		}
	} else if (ship.attackSpecial == 104) {
		if (MECHANICS.kongouSpecialBuff && ship.fleet.numSpecialKongou >= 2) return false;
		if (!MECHANICS.kongouSpecialBuff && ship.fleet.didSpecial) return false;
		if (!isNB) return false;
		if (ship.fleet.ships[0] != ship) return false;
		if (ship.fleet.ships.filter(ship => ship.HP > 0 && !ship.retreated && !ship.isSub).length < 5) return false;
		let formations = MECHANICS.kongouSpecialBuff ? [1,4,12,14] : [1,14];
		if (formations.indexOf(ship.fleet.formation.id) == -1) return false;
		for (let i=0; i<=1; i++) {
			let s = ship.fleet.ships[i];
			if (s.HP/s.maxHP <= .5) return false;
		}
		if (ship.mid == 591 && [592,151,439,364].indexOf(ship.fleet.ships[1].mid) == -1) return false;
		if (ship.mid == 592 && [591,152].indexOf(ship.fleet.ships[1].mid) == -1) return false;
		let rate = SIMCONSTS.kongouSpecialRate;
		if (!rate) {
			rate = 45;
			if (ship.equips.find(eq => eq.type == RADARL && eq.LOS >= 8)) rate += (ship.mid == 591)? 35 : 10;
			if (ship.equiptypes[SEARCHLIGHTL]) rate += (ship.mid == 592)? 35 : 10;
		}
		if (Math.random() < rate/100) {
			if (MECHANICS.kongouSpecialBuff) {
				ship.fleet.didSpecial = 1;
				ship.fleet.numSpecialKongou = ship.fleet.numSpecialKongou + 1 || 1;
			} else {
				ship.fleet.didSpecial = 1;
				if (ship.fleet.combinedWith) ship.fleet.combinedWith.didSpecial = 2;
			}
			return true;
		}
	}
	return false;
}

function getSpecialAttackShips(ships,attackSpecial) {
	let attackers;
	if (attackSpecial == 101 || attackSpecial == 102) {
		attackers = [ships[0], ships[0], ships[1]];
	} else if (attackSpecial == 100) {
		attackers = [ships[0], ships[2], ships[4]];
	} else if (attackSpecial == 103) {
		attackers = [ships[0], ships[1], ships[2]];
	} else if (attackSpecial == 104) {
		attackers = [ships[0], ships[1]];
	} else if (attackSpecial == 300) {
		attackers = [ships[1], ships[2], ships[1], ships[2]];
	} else if (attackSpecial == 301) {
		attackers = [ships[2], ships[3], ships[2], ships[3]];
	} else if (attackSpecial == 302) {
		attackers = [ships[1], ships[3], ships[1], ships[3]];
	}
	return attackers;
}

function getSpecialAttackMod(ship,attackSpecial) {
	let mod = 1;
	if (attackSpecial == 100) {
		mod = 2;
	} else if (attackSpecial == 101) {
		mod = (ship.isflagship)? 1.4 : 1.2;
		if (ship.fleet.ships[1].mid == 81 || ship.fleet.ships[1].mid == 276) {
			mod *= ((ship.isflagship)? 1.15 : 1.35);
		} else if (ship.fleet.ships[1].mid == 573) {
			mod *= ((ship.isflagship)? 1.2 : 1.4);
		} else if (ship.fleet.ships[1].mid == 571 || ship.fleet.ships[1].mid == 576) {
			mod *= ((ship.isflagship)? 1.1 : 1.25);
		}
		if (ship.equiptypesB[B_APSHELL]) mod *= 1.35;
		if (ship.equiptypesB[B_RADAR]) mod *= 1.15;
	} else if (attackSpecial == 102) {
		mod = (ship.isflagship)? 1.4 : 1.2;
		if (ship.fleet.ships[1].mid == 80 || ship.fleet.ships[1].mid == 275) {
			mod *= ((ship.isflagship)? 1.15 : 1.35);
		} else if (ship.fleet.ships[1].mid == 541) {
			mod *= ((ship.isflagship)? 1.2 : 1.4);
		}
		if (ship.equiptypesB[B_APSHELL]) mod *= 1.35;
		if (ship.equiptypesB[B_RADAR]) mod *= 1.15;
	} else if (attackSpecial == 103) {
		let mod2 = 1;
		if (ship.isflagship) {
			mod = 1.3;
		} else {
			mod = 1.15;
			let ship2 = ship.fleet.ships[1];
			if ([19,88,93].indexOf(ship2.sclass) != -1) mod2 *= 1.1;
			if (ship2.equiptypesB[B_APSHELL]) mod2 *= 1.35;
			if (ship2.equiptypesB[B_RADAR]) mod2 *= 1.15;
			if (ship.num == 2) {
				mod *= mod2;
			}
			if (ship.num == 3) {
				if (MECHANICS.coloradoSpecialFix) mod2 = 1;
				if ([19,88,93].indexOf(ship.sclass) != -1) {
					mod *= 1.15;
					mod *= mod2;
				} else if (!MECHANICS.coloradoSpecialFix && SHIPDATA[ship2.mid].SLOTS.length == 5 && ship2.equips[4] && !ship2.equips[5]) {
					let mod5th = 1;
					if (ship2.equips[4].btype == B_APSHELL) mod5th *= 1.35;
					if (ship2.equips[4].btype == B_RADAR) mod5th *= 1.15;
					if (mod5th > 1) mod *= mod5th * mod2;
				}
			}
		}
		if (mod2 == 1) {
			if (ship.equiptypesB[B_APSHELL]) mod *= 1.35;
			if (ship.equiptypesB[B_RADAR]) mod *= 1.15;
		}
	} else if (attackSpecial == 104) {
		mod = 1.9;
		if (ENGAGEMENT == 1.2) mod *= 1.25;
		else if (ENGAGEMENT == .6) mod *= .75;
	} else if (attackSpecial == 300 || attackSpecial == 301 || attackSpecial == 302) {
		mod = 1.2 + 0.04*Math.sqrt(ship.LVL);
	}
	return mod;
}

function shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,APIhou,isOASW) {
	if (C && NEWFORMAT) {
		formatRemovePadding(APIhou);
		if (!APIhou.api_at_eflag) APIhou.api_at_eflag = [];
	}
	let numRounds = Math.max(order1.length,order2.length);
	for (var i=0; i<numRounds; i++) {
		if (i < order1.length && order1[i].canStillShell(isOASW)) {
			if (canSpecialAttack(order1[i])) {
				let ships = getSpecialAttackShips(order1[i].fleet.ships,order1[i].attackSpecial);
				let k = 0;
				for (; k<ships.length; k++) {
					if (alive2.length <= 0) break;
					ships[k].isSub = false;
					var targetData = shellPhaseTarget(ships[k],alive2,[]);
					delete ships[k].isSub;
					shellPhaseAttack(ships[k],targetData,APIhou,order1[i].attackSpecial);
				}
				if (C) {
					apiAdjustHougekiSpecial(APIhou,k);
				}
			} else {
				var targetData = shellPhaseTarget(order1[i],alive2,subsalive2,isOASW);
				shellPhaseAttack(order1[i],targetData,APIhou);
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canStillShell(isOASW)) {
			var targetData = shellPhaseTarget(order2[i],alive1,subsalive1,isOASW);
			shellPhaseAttack(order2[i],targetData,APIhou);
		}
		if (alive1.length+subsalive1.length <= 0) break;
	}
}

function doShellC(ship,targets,APIhou,isOASW,attackSpecial) {
	var targetData, targetCFirst = targets.alive2C && Math.random() < .5;
	if (targetCFirst) {
		targetData = shellPhaseTarget(ship,targets.alive2C,targets.subsalive2C,isOASW);
		if (!targetData.target) targetData = shellPhaseTarget(ship,targets.alive2,targets.subsalive2,isOASW);
	} else {
		targetData = shellPhaseTarget(ship,targets.alive2,targets.subsalive2,isOASW);
		if (!targetData.target && targets.alive2C) targetData = shellPhaseTarget(ship,targets.alive2C,targets.subsalive2C,isOASW);
	}
	shellPhaseAttack(ship,targetData,APIhou,attackSpecial);
}

function shellPhaseC(order1,order2,targets,APIhou,isOASW) {
	if (C && NEWFORMAT) {
		formatRemovePadding(APIhou);
		if (!APIhou.api_at_eflag) APIhou.api_at_eflag = [];
	}
	let numRounds = Math.max(order1.length,order2.length);
	for (var i=0; i<numRounds; i++) {
		if (i < order1.length && order1[i].canStillShell(isOASW)) {
			if (canSpecialAttack(order1[i])) {
				let ships = getSpecialAttackShips(order1[i].fleet.ships,order1[i].attackSpecial);
				let k=0;
				for (; k<ships.length; k++) {
					if (targets.alive2.length + targets.alive2C.length <= 0) break;
					ships[k].isSub = false;
					doShellC(ships[k],targets,APIhou,isOASW,order1[i].attackSpecial);
					delete ships[k].isSub;
				}
				if (C) {
					apiAdjustHougekiSpecial(APIhou,k);
				}
			} else {
				doShellC(order1[i],targets,APIhou,isOASW);
			}
		}
		var num2 = targets.alive2.length+targets.subsalive2.length;
		if (targets.alive2C) num2 += targets.alive2C.length+targets.subsalive2C.length;
		if (num2 <= 0) break;
		if (i < order2.length && order2[i].canStillShell(isOASW)) {
			var targetData, targetCFirst = targets.alive1C && Math.random() < .5;
			if (targetCFirst) {
				targetData = shellPhaseTarget(order2[i],targets.alive1C,targets.subsalive1C,isOASW);
				if (!targetData.target) targetData = shellPhaseTarget(order2[i],targets.alive1,targets.subsalive1,isOASW);
			} else {
				targetData = shellPhaseTarget(order2[i],targets.alive1,targets.subsalive1,isOASW);
				if (!targetData.target && targets.alive1C) targetData = shellPhaseTarget(order2[i],targets.alive1C,targets.subsalive1C,isOASW);
			}
			shellPhaseAttack(order2[i],targetData,APIhou);
		}
		var num1 = targets.alive1.length+targets.subsalive1.length;
		if (targets.alive1C) num1 += targets.alive1C.length+targets.subsalive1C.length;
		if (num1 <= 0) break;
	}
}

function nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,APIyasen) {
	var APIhou = (APIyasen)? APIyasen.api_hougeki : undefined;
	var star1 = false;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		let off = (NEWFORMAT)? -1 : 0;
		if (alive1[i].hasStarShell && alive1[i].HP > 4 && Math.random() < .7) { star1 = true; if (C) APIyasen.api_flare_pos[0] = alive1[i].num+off; break; }
	}
	var star2 = false;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		let off = (NEWFORMAT)? -1 : 0;
		if (alive2[i].hasStarShell && alive2[i].HP > 4 && Math.random() < .7) { star2 = true; if (C) APIyasen.api_flare_pos[1] = alive2[i].num+off; break; }
	}
	var light1 = false, lightship1 = 0, slrerolls1 = 0;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		if (alive1[i].hasSearchlight) { light1 = true; lightship1 = i; slrerolls1 = alive1[i].hasSearchlight; break; }
	}
	var light2 = false, lightship2 = 0, slrerolls2 = 0;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		if (alive2[i].hasSearchlight) { light2 = true; lightship2 = i; slrerolls2 = alive2[i].hasSearchlight; break; }
	}
	var scout1 = false;
	if (alive1[0] && alive1[0].fleet.AS != -2 && (NBonly || alive1[0].fleet.AS != 0)) {
		for (var i=0; i<alive1.length; i++) {
			if (alive1[i].retreated) continue;
			if (alive1[i].hasNightScout && Math.random() < Math.floor(Math.sqrt(alive1[i].LVL)*Math.sqrt(3))/25) { scout1 = true; if (C) APIyasen.api_touch_plane[0] = 102; break; }
		}
	}
	var scout2 = false;
	if (alive2[0] && alive2[0].fleet.AS != -2 && (NBonly || alive2[0].fleet.AS != 0)) {
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].retreated) continue;
			if (alive2[i].hasNightScout && Math.random() < Math.floor(Math.sqrt(alive2[i].LVL)*Math.sqrt(3))/25) { scout2 = true; if (C) APIyasen.api_touch_plane[1] = 102; break; }
		}
	}
	let numRounds = Math.max(order1.length,order2.length);
	for (var i=0; i<numRounds; i++) {
		if (i < order1.length && order1[i].canNB()) {
			if (canSpecialAttack(order1[i],true)) {
				let ships = getSpecialAttackShips(order1[i].fleet.ships,order1[i].attackSpecial);
				let k=0;
				for (; k<ships.length; k++) {
					if (alive2.length <= 0) break;
					var target = nightPhaseTarget(ships[k],alive2,[],slrerolls2,true).target;
					if (NBattack(ships[k],target,NBonly,[[star1,star2],[light1,light2],[scout1,scout2]],APIhou,order1[i].attackSpecial)) alive2.splice(alive2.indexOf(target),1);
				}
				if (C) {
					apiAdjustHougekiSpecial(APIhou,k);
				}
			} else {
				let target = nightPhaseTarget(order1[i],alive2,subsalive2,slrerolls2,light2).target;
				if (target) {
					if (target.isSub) {
						if (ASW(order1[i],target,(!NBonly&&!order1[i].isescort),APIhou)) subsalive2.splice(subsalive2.indexOf(target),1);
					} else {
						if (NBattack(order1[i],target,NBonly,[[star1,star2],[light1,light2],[scout1,scout2]],APIhou)) alive2.splice(alive2.indexOf(target),1);
					}
				}
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canNB()) {
			let target = nightPhaseTarget(order2[i],alive1,subsalive1,slrerolls1,light1).target;
			if (target) {
				if (target.isSub) {
					if (ASW(order2[i],target,(!NBonly&&!order2[i].isescort),APIhou)) subsalive1.splice(subsalive1.indexOf(target),1);
				} else {
					if (NBattack(order2[i],target,NBonly,[[star2,star1],[light2,light1],[scout2,scout1]],APIhou)) alive1.splice(alive1.indexOf(target),1);
				}
			}
		}
		if (alive1.length+subsalive1.length <= 0) break;
	}
}

function nightPhaseTarget(ship,alive,subsalive,slrerolls,light) {
	if (subsalive.length && ship.canASWNight() && (!ship.canNBAirAttack() || alive.length <= 0)) {
		return { type: 2, target: choiceWProtect(subsalive) };
	} else if (alive.length && (ship.nightattack != 3 || light)) {
		let targets = alive;
		if (ship.isAntiPT) {
			let targetsPT = alive.filter(ship => ship.isPT);
			if (targetsPT.length) targets = targetsPT;
		}
		return { type: 1, target: choiceWProtect(targets,slrerolls) };
	}
	return { type: 0, target: null };
}

function apiAdjustHougekiSpecial(APIhou,numAttack) {
	let ind = APIhou.api_damage.length - numAttack;
	let at_type = APIhou.api_at_type || APIhou.api_sp_list;
	let sp = at_type[at_type.length-1];
	while (at_type[ind] != sp) {
		ind++;
		numAttack--;
	}
	for (let i=1; i<numAttack; i++) {
		for (let key of ['api_damage','api_cl_list','api_df_list']) {
			APIhou[key][ind].push(APIhou[key][ind+i][0]);
		}
	}
	for (let i=1; i<numAttack; i++) {
		for (let key in APIhou) {
			APIhou[key].pop();
		}
	}
}

function torpedoPhase(alive1,subsalive1,alive2,subsalive2,opening,APIrai,combinedAll) {
	var shots = []; //set up shots
	var targets2 = [];
	for (var i=0; i<alive2.length; i++) { if (!alive2[i].isInstall) targets2.push(alive2[i]); }
	var targets1 = [];
	for (var i=0; i<alive1.length; i++) { if (!alive1[i].isInstall) targets1.push(alive1[i]); }
	
	if (C && NEWFORMAT) {
		for (let key in APIrai) APIrai[key].shift();
		for (let i=0; i<APIrai.api_frai.length; i++) APIrai.api_frai[i] = -1;
		for (let i=0; i<APIrai.api_erai.length; i++) APIrai.api_erai[i] = -1;
	}
	
	if (combinedAll) {
		var targetsM1 = [], targetsM2 = [], targetsE1 = [], targetsE2 = [];
		for (var i=0; i<targets1.length; i++) {
			if (targets1[i].isescort) targetsE1.push(targets1[i]);
			else targetsM1.push(targets1[i]);
		}
		for (var i=0; i<targets2.length; i++) {
			if (targets2[i].isescort) targetsE2.push(targets2[i]);
			else targetsM2.push(targets2[i]);
		}
	}
	
	if (targets2.length) {  //any targets?
		for (var i=0; i<alive1.length+subsalive1.length; i++) {
			var ship = (i < alive1.length) ? alive1[i] : subsalive1[i-alive1.length];
			if (ship.fleet.combinedWith && !ship.isescort && (!ship.canOpTorpMain || !opening)) continue;
			if ((opening)? ship.canOpTorp() : ship.canTorp()) {
				if (combinedAll) {
					if (!targetsE2.length) targets2 = targetsM2;
					else if (!targetsM2.length) targets2 = targetsE2;
					else targets2 = (Math.random() < .5)? targetsM2 : targetsE2;
				}
				var target = choiceWProtect(targets2);
				shots.push([ship,target]);
			}
		}
	}
	if (targets1.length) {
		for (var i=0; i<alive2.length+subsalive2.length; i++) {
			var ship = (i < alive2.length) ? alive2[i] : subsalive2[i-alive2.length];
			if (ship.fleet.combinedWith && !ship.isescort && (!ship.canOpTorpMain || !opening)) continue;
			if ((opening)? ship.canOpTorp() : ship.canTorp()) {
				if (combinedAll) {
					if (!targetsE1.length) targets1 = targetsM1;
					else if (!targetsM1.length) targets1 = targetsE1;
					else targets1 = (Math.random() < .5)? targetsM1 : targetsE1;
				}
				var target = choiceWProtect(targets1);
				shots.push([ship,target]);
			}
		}
	}
	var damageMods = {};
	for (var i=0; i<shots.length; i++) damageMods[shots[i][0].id] = shots[i][0].damageMod(true);
	for (var i=0; i<shots.length; i++) {  //do the shots
		var ship = shots[i][0]; var target = shots[i][1];
		
		var power = (combinedAll)? ship.TP+15 : (ship.isescort||target.isescort)? ship.TP : (ship.TP+5);
		power *= ship.getFormation().torpmod*ENGAGEMENT*(combinedAll? ship.damageMod(true) : damageMods[ship.id]);
		if (power > SIMCONSTS.torpedoDmgCap) power = SIMCONSTS.torpedoDmgCap + Math.sqrt(power-SIMCONSTS.torpedoDmgCap);
		
		var accflat = (ship.ACC)? ship.ACC : 0;
		if (ship.improves.ACCtorp) accflat += Math.floor(ship.improves.ACCtorp);
		accflat += Math.floor(power/5);
		if (ship.TACC) accflat += ship.TACC;
		if (combinedAll && target.fleet.combinedWith) {
			accflat -= 35;
			if (ship.side == 0 && ship.fleet.combinedWith) accflat -= 5;
			if (ship.side == 1 && ship.fleet.combinedWith) accflat += 5;
		}
		
		let accMod = ship.getFormation().torpacc*ship.moraleMod(true);
		if (ship.fleet.formation.id == 6 && target.type == 'DD') accMod *= 1.2;
		
		var evFlat = (target.improves.EVtorp)? ship.improves.EVtorp : 0;
		if (target.fleet.formation.id == 6) {
			evFlat += (target.type == 'DD') ? SIMCONSTS.vanguardEvTorpDD[target.num-1] || 0 : SIMCONSTS.vanguardEvTorpOther[target.num-1] || 0;
		}
		
		var acc = hitRate(ship,85,accflat,accMod);
		if (ship.bonusSpecialAcc) acc *= getBonusAcc(ship);
		if (target.isPT) {
			if (!NERFPTIMPS) {
				acc = .42*acc + .24;
				acc *= .7;
			}
			if (BREAKPTIMPS && ship.type == 'DD') acc = 0;
		}
		
		let postMod = 1;
		if (target.isAnchorage && !MECHANICS.anchorageTorpNerf) {
			postMod *= ship.anchoragePostMult;
		}
		
		var res = rollHit(accuracyAndCrit(ship,target,acc,target.getFormation().torpev,evFlat,1.5));
		var realdmg = 0, dmg = 0;
		if (res) {
			var bonus = (ship.improves.Ptorp)? ship.improves.Ptorp : 0;
			dmg = damage(ship,target,power,1,res*postMod,10000); //power already capped
			realdmg = takeDamage(target,dmg);
		}
		ship.fleet.giveCredit(ship,realdmg);
		if (C) {
			console.log(ship.name+' torpedoes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			let shipidx = (APIrai.api_frai.length > 7)? ship.apiID2 : ship.num;
			let targetidx = (APIrai.api_frai.length > 7)? target.apiID2 : target.num;
			if (NEWFORMAT) {
				shipidx = ship.apiID2-1; targetidx = target.apiID2-1;
			}
			APIrai[(ship.side)?'api_erai':'api_frai'][shipidx] = targetidx;
			let apidam = (target.side)?'api_edam':'api_fdam';
			APIrai[apidam][targetidx] = APIrai[apidam][targetidx] + realdmg || realdmg;
			APIrai[(ship.side)?'api_eydam':'api_fydam'][shipidx] = realdmg;
			APIrai[(ship.side)?'api_ecl':'api_fcl'][shipidx] = (res>1)? 2 : (dmg)? 1 : 0;
		}
	}
	for (var i=0; i<alive1.length; i++) {   //remove dead things
		if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
	}
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
	}
}

function airstrike(ship,target,slot,contactMod,issupport,isjetphase) {
	if (!contactMod) contactMod = 1;
	var acc = (issupport)? .85 : .95;
	if (ship.bonusSpecialAcc) acc *= getBonusAcc(ship,true);
	var res = rollHit(accuracyAndCrit(ship,target,acc,target.getFormation().AAmod,0,.2,!issupport && 2),!issupport && ship.critdmgbonus);
	var equip = ship.equips[slot];
	var dmg = 0, realdmg = 0;
	var planebase = (equip.isdivebomber)? equip.DIVEBOMB + (equip.airstrikePowerImprove || 0) : (target.isInstall)? 0 : equip.TP + (equip.airstrikePowerImprove || 0);
	planebase = planebase || 0;
	if (C) console.log('		'+slot+' '+planebase);
	if (res) {
		if (MECHANICS.eqBonusTorp && !issupport && !isjetphase) {
			let d = ship.getEquipBonusCVTorp();
			if (d && slot == d.slot) {
				planebase += d.bonus;
			}
		}
		var base = (issupport)? 3 : 25;
		if (target.fleet.airstrikeMod) base += target.fleet.airstrikeMod; //in enemy combined, main gets -10, escort -20
		var preMod = (equip.isdivebomber)? 1 : ((Math.random() < .5)? .8 : 1.5);
		if (equip.isjet && !isjetphase) preMod *= 1/Math.sqrt(2);
		var postMod = (issupport && MECHANICS.LBASBuff)? 1.35 : 1;
		if (equip.isdivebomber) postMod *= target.divebombWeak || 1;
		if (SIMCONSTS.enablePlaneBonus) postMod *= getBonusSpecialPlane(ship);
		dmg = damage(ship,target,base+Math.sqrt(ship.planecount[slot])*planebase,preMod,res*contactMod*postMod,SIMCONSTS.airDmgCap,true);
		realdmg = takeDamage(target,dmg);
	}
	ship.fleet.giveCredit(ship,realdmg);
	if(C) {
		console.log(ship.name+' airstrikes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left, CONTACT: '+contactMod);
	}
	return realdmg;
}

function takeDamage(ship,damage) {
	if (damage < 0) damage = 0;
	if (ship.protection) {
		if (ship.HP == 1) damage = 0;
		else if (damage >= ship.HP) damage = Math.floor(ship.HP*.5+.3*Math.floor(Math.random()*ship.HP)*+!ship.protectionFF);  //overkill protection
	}
	ship.HP -= damage;
	if (ship.HP <= 0 && ship.repairs && ship.repairs.length) {
		var repair = ship.repairs.shift();
		if (repair == 42) ship.HP = Math.floor(.2*ship.maxHP);
		else if (repair == 43) { ship.HP = ship.maxHP; ship.fuelleft = ship.ammoleft = 10; }
		if (ship.side==0) ship.protection = true;
	}
	
	return damage;
}

function hitRate(ship,accBase,accFlat,accMod) {
	if (C) console.log('hit: '+accBase+' '+accFlat+' '+accMod);
	return (accBase + 2*Math.sqrt(ship.LVL) + 1.5*Math.sqrt(ship.LUK) + accFlat)*accMod*.01;
}

function accuracyAndCrit(ship,target,hit,evMod,evFlat,critMod,isPlanes,critBonusFlat) {
	if (evMod===undefined) evMod = 1;
	
	var evade = (target.EV+Math.sqrt(target.LUK*2)) * evMod; //formation
	var dodge = (evade>65)? 55+2*Math.sqrt(evade-65) : ((evade>40)? 40+3*Math.sqrt(evade-40) : evade);
	dodge*=.01;
	if (target.fuelleft < 7.5) dodge -= (7.5-target.fuelleft)/10;
	if (evFlat) dodge += evFlat*.01;
	
	if (target.bonusSpecialEv) {
		let mod = 1;
		for (var i=0; i<target.bonusSpecialEv.length; i++) {
			if (target.bonusSpecialEv[i].type == 2) continue;
			if (!target.bonusSpecialEv[i].on || target.bonusSpecialEv[i].on.indexOf(target.mid) != -1) {
				mod *= target.bonusSpecialEv[i].mod;
			}
		}
		dodge *= mod;
	}
	if (target.bonusEvMod) {
		dodge *= target.bonusEvMod;
	}
	if (target.bonusEvFlat) {
		dodge += target.bonusEvFlat*.01;
	}
	
	if (C) console.log('	hit: '+hit+' dodge: '+dodge + ' (' + evFlat + ')');
	acc = Math.max(hit-dodge,.1);
	acc *= target.moraleModEv();
	acc = Math.min(.96,acc);
	
	var crit = Math.sqrt(100*acc)*critMod*.01;
	if (isPlanes) {
		if (ship.ACCplane) acc += ship.ACCplane*.01;
		if (ship.critratebonus) crit += ship.critratebonus*.01; //x.75 earlier, find real value?
	}
	crit += critBonusFlat || 0;
	if (C) console.log('	accfinal: '+acc+', crit: '+crit);
	return [acc,crit];
}

function rollHit(accCrit,critdmgbonus) {
	var r = Math.floor(Math.random()*100)/100;
	if (r <= accCrit[1]) return CRITMOD * ((critdmgbonus)? critdmgbonus : 1);
	if (r <= accCrit[0]) return 1; //normal hit
	return 0;  //miss
}

function getBonusAcc(ship,isAir) {
	let mod = 1;
	for (var i=0; i<ship.bonusSpecialAcc.length; i++) {
		if (isAir && ship.bonusSpecialAcc[i].type != 'air') continue;
		if (ship.bonusSpecialAcc[i].type == 2) continue;
		if (!ship.bonusSpecialAcc[i].on || ship.bonusSpecialAcc[i].on.indexOf(target.mid) != -1) {
			mod *= ship.bonusSpecialAcc[i].mod;
		}
	}
	return mod;
}

function getBonusSpecialPlane(ship) {
	let mod = 1, groups = {};
	for (let i=0; i<ship.equips.length; i++) {
		if (ship.planecount[i] <= 0) continue;
		let eq = ship.equips[i];
		if (eq.bonusSpecialP) {
			for (let group in eq.bonusSpecialP) {
				groups[group] = eq.bonusSpecialP[group];
			}
		}
	}
	for (let group in groups) {
		mod *= groups[group];
	}
	return mod;
}

function damage(ship,target,base,preMod,postMod,cap,isAirstrike,isSupport) {
	if (!cap) cap = 150;
	if (typeof preMod === 'undefined') preMod = 1;
	if (typeof postMod === 'undefined') postMod = 1;
	if (C) console.log('	'+ship.id+' '+target.id+' '+base+' '+preMod+' '+postMod+' '+cap);
	
	var dmg = base;
	dmg *= preMod;  //NB attack, torpedo bomber, formation mod
	
	if (dmg > cap) dmg = cap + Math.sqrt(dmg-cap);
	
	if (target.installtype == 3) { //supply depot type installations
		if (isAirstrike) {
			if (target.mid <= 1658 && !ship.mid) {
				dmg = dmg*target.divebombWeak + 100;
				postMod /= target.divebombWeak;
			}
		} else {
			dmg *= (ship.supplyPostMult||1);
		}
	}
	if (target.isPT && !NERFPTIMPS) {
		if (isAirstrike) {
			dmg *= (Math.random() < .5 ? .5 : .8);
		} else if (!isSupport) {
			dmg = dmg*.35 + 15;
		}
	}
	dmg *= postMod;  //artillery spotting, contact, AP shell, critical
	if (ship.bonusSpecial) { //e.g. event historical bonus
		for (var i=0; i<ship.bonusSpecial.length; i++) {
			if (!ship.bonusSpecial[i].on || ship.bonusSpecial[i].on.indexOf(target.mid) != -1) {
				dmg *= ship.bonusSpecial[i].mod;
			}
		}
	}
	if (C) console.log('	before def: '+dmg);
	var ar = target.AR + (target.improves.AR || 0);
	dmg -= .7*ar+.6*Math.floor(Math.random()*ar) - (target.debuff||0);
	if (target.isSub && ship.aswPenetrate) dmg += ship.aswPenetrate;
	if (C) console.log('	after def: '+dmg);
	
	if (ship.ammoleft < 5) dmg *= .2*ship.ammoleft;
	
	dmg = Math.floor(dmg);
	if (dmg <= 0) dmg = getScratchDamage(target.HP);
	if (C) console.log('	returned: '+dmg);
	return dmg;
}

function getScratchDamage(hp) {
	return Math.floor(hp*.06+.08*Math.floor(Math.random()*hp))
}

function softCap(num,cap) {
	return (num > cap)? cap+Math.sqrt(num-cap) : num;
}

function compareAP(fleet1,fleet2,eqtFilter1,includeEscort,eqtFilter2) {
	eqtFilter2 = eqtFilter2 || eqtFilter1;
	var ap1 = fleet1.fleetAirPower(eqtFilter1), ap2 = fleet2.fleetAirPower(eqtFilter2);
	if (includeEscort) {
		if (fleet1.combinedWith) ap1 += fleet1.combinedWith.fleetAirPower(eqtFilter1);
		if (fleet2.combinedWith) ap2 += fleet2.combinedWith.fleetAirPower(eqtFilter2);
	}
	if (ap1 == 0 && ap2 == 0) { fleet1.AS = fleet2.AS = 0; }
	else if (ap1 >= ap2*3) { fleet1.AS = 2; fleet2.AS = -2; }
	else if (ap1 >= ap2*1.5) { fleet1.AS = 1; fleet2.AS = -1; }
	else if (ap2 >= ap1*3) { fleet1.AS = -2; fleet2.AS = 2; }
	else if (ap2 >= ap1*1.5) { fleet1.AS = -1; fleet2.AS = 1; }
	else { fleet1.AS = fleet2.AS = 0; }
	if (C) console.log('AS: '+ap1+' '+ap2+' '+fleet1.AS + ' '+fleet2.AS);
}

function choiceWProtect(targets,searchlightRerolls) {
	DIDPROTECT = false; //disgusting hack, rework later?
	var target = targets[Math.floor(Math.random()*targets.length)];
	if (searchlightRerolls) {
		for (var i=0; i<searchlightRerolls; i++) {
			if (target.hasSearchlight) break;
			target = targets[Math.floor(Math.random()*targets.length)];
		}
	}
	if (target.getFormation() == VANGUARD1) {
		target = targets[Math.floor(Math.random()*targets.length)];
	}
	if (!target.isflagship || target.isInstall || target.isescort || !MECHANICS.flagProtect) return target;
	
	//flagship protection
	var rate = [0,.45,.6,.75,.6,.6,.75][target.fleet.formation.id];
	if (!rate) rate = .6;
	if (Math.random() < rate) {
		var defenders = [];
		for (var i=0; i<targets.length; i++) {
			if (!targets[i].isflagship && targets[i].HP/targets[i].maxHP > .75 && targets[i].fleet.id==target.fleet.id && !targets[i].isInstall) defenders.push(targets[i]);
		}
		if (C) { console.log('***FLAGSHIP PROTECT '+rate+' '+defenders.length); console.log(defenders); }
		if (defenders.length <= 0) return target;
		DIDPROTECT = true;
		let defender = defenders[Math.floor(Math.random()*(defenders.length))];
		if (defender.side == 1 && defender.fleet != target.fleet) DIDPROTECT = false; //no animation for enemy combined?
		return defender;
	}
	return target;
}

function AADefenceFighters(carriers,showplanes,APIkouku,eqtFilter) {
	eqtFilter = eqtFilter || 'isfighter';
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i], hasfighter = false;
		for (var j=0; j<ship.equips.length; j++) {
			if (ship.equips[j][eqtFilter]) {
				var lostcount;
				if (ship.side != 1) {
					var rmin, rplus;
					switch(ship.airState()) {
						case 2: rmin = .025; rplus = .0333; break;
						case 1: rmin = .075; rplus = .1; break;
						case 0: rmin = .125; rplus = .1666; break;
						case -1: rmin = .175; rplus = .2333; break;
						case -2: rmin = .25; rplus = .3333; break;
					}
					var randplus = Math.floor((Math.floor(1000*rplus)+1)*Math.random())/1000;
					let modJet = ship.equips[j].isjet ? .6 : 1;
					lostcount = Math.floor(ship.planecount[j]*(rmin+randplus)*modJet);
				} else {
					var rmax;
					switch(ship.fleet.AS) {
						case 2: rmax = 2; break;
						case 1: rmax = 5; break;
						case 0: rmax = 7; break;
						case -1: rmax = 9; break;
						case -2: rmax = 11; break;
					}
					var mod = Math.floor(Math.random()*rmax)*.35 + Math.floor(Math.random()*rmax)*.65;
					let modJet = ship.equips[j].isjet ? .6 : 1;
					lostcount = Math.floor(ship.planecount[j]*mod*modJet/10);
				}
				if (C) {
					APIkouku.api_stage1[(ship.side)? 'api_e_count':'api_f_count'] += ship.planecount[j];
					APIkouku.api_stage1[(ship.side)? 'api_e_lostcount':'api_f_lostcount'] += lostcount;
					if (!ship.equips[j].lostnums) ship.equips[j].lostnums = [];
					ship.equips[j].lostnums.push(lostcount);
				}
				ship.planecount[j] -= lostcount;
				if (ship.planecount[j] < 0) ship.planecount[j] = 0;
				// if (!ship.equips[j].istorpbomber&&!ship.equips[j].isdivebomber) hasfighter = true;
				hasfighter = true;
			}
		}
		if (C && hasfighter && showplanes && ship.apiID2) APIkouku.api_plane_from[ship.side].push(ship.apiID2);
	}
}

function getAAShotProp(defender,slotsize,resistMod,isRaid) {
	var sAA = defender.weightedAntiAir(isRaid);
	if (MECHANICS.aaResist && resistMod) sAA = Math.floor(sAA*resistMod);
	return Math.floor(slotsize*sAA/200);
}

function getAAShotFlat(defender,resistModShip,resistModFleet,isRaid) {
	var mod = (defender.side==0)? .2 : 0.1875;
	var fAA = (MECHANICS.fixFleetAA)? defender.fleet.fleetAntiAir(false,isRaid) : 0;
	var sAA = defender.weightedAntiAir(isRaid);
	if (MECHANICS.aaResist) {
		if (resistModShip) sAA = Math.floor(sAA*resistModShip);
		if (resistModFleet) fAA = Math.floor(fAA*resistModFleet);
	}
	return (sAA+fAA)*mod;
}

function getAACI(defenders,APIkouku) {
	var AACInum = 0, AACImod = 1;
	if (MECHANICS.AACI) {
		var AACIship, AACItype = 0;
		for (var i=0; i<defenders.length; i++) {
			if (defenders[i].AACItype.length) {
				var r = Math.random();
				for (var j=0; j<defenders[i].AACItype.length; j++) {
					var type = defenders[i].AACItype[j];
					let roll = (AACIDATA[type].rollIndiv)? Math.random() : r;
					if (type > AACItype && roll < AACIDATA[type].rate) {
						AACItype = type;
						AACIship = defenders[i];
						break;
					}
				}
			}
		}
		if (AACItype) {
			AACInum = AACIDATA[AACItype].num;
			AACImod = AACIDATA[AACItype].mod;
			if (C) {
				var apiAACI = APIkouku.api_stage2[(!AACIship.side)?'api_air_fire':'api_air_fire_e'] = {api_idx:AACIship.apiID2-1,api_kind:AACItype};
				apiAACI.api_use_items = [];
				if (AACItype == 34) {
					apiAACI.api_use_items = [308,308];
				} else if (AACItype == 35) {
					apiAACI.api_use_items = [308,313];
				} else if (AACItype == 36) {
					apiAACI.api_use_items = [313,313,307];
				} else if (AACItype == 37) {
					apiAACI.api_use_items = [313,313];
				} else if (AACItype == 39) {
					apiAACI.api_use_items = [363,362];
				} else if (AACItype == 40) {
					apiAACI.api_use_items = [362,362,307];
				} else if (AACItype == 41) {
					apiAACI.api_use_items = [362,362];
				} else if (AACItype == 32) {
					let mids = [];
					for (let equip of AACIship.equips) mids.push(equip.mid);
					for (let setup of [[191,300],[301,191],[301,301]]) {
						if (mids.indexOf(setup[0]) != -1 && mids.indexOf(setup[1]) != -1) {
							apiAACI.api_use_items = setup;
							break;
						}
					}
				} else {
					let equips = AACIship.equips.slice();
					for (let letter of AACIDATA[AACItype].equip) {
						let eqShow = null;
						for (let equip of equips) {
							if ((letter == 'B' && equip.atype == A_HAFD) 
								|| (letter == 'H' && (equip.atype == A_HAGUN || equip.atype == A_HAFD))
								|| (letter == 'C' && equip.isconcentrated)
								|| (letter == 'G' && equip.atype == A_AAGUN)
								|| (letter == 'R' && equip.atype == A_AIRRADAR)
								|| (letter == 'A' && equip.atype == A_AAFD)
								|| (letter == 'M' && equip.type == MAINGUNL)
								|| (letter == 'S' && equip.type == TYPE3SHELL)
								) {
								eqShow = equip;
								break;
							}
						}
						if (eqShow) {
							apiAACI.api_use_items.push(eqShow.mid);
							equips.splice(equips.indexOf(eqShow),1);
						}
					}
				}
			}
		}
	}
	return { num: AACInum, mod: AACImod, id: AACItype };
}

function getContact(carriers) {
	if (!MECHANICS.artillerySpotting) return null;
	var losPower = 0;
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i];
		for (var j=0; j<ship.equips.length; j++) {
			var e = ship.equips[j];
			if (e.LOS && EQTDATA[e.type].isPlane && e.type != TORPBOMBER) losPower += Math.floor(Math.sqrt(ship.planecount[j])*e.LOS);
		}
	}
	var chance, cmod;
	if (carriers[0].airState() == 2) { chance = losPower/25; cmod = 14; }
	else if (carriers[0].airState() == 1) { chance = losPower/40; cmod = 16; }
	else { chance = losPower/55; cmod = 18; }
	if (C) console.log('CONTACT CHANCE 1: '+chance);
	//phase 2
	if (Math.random() < chance) {
		var contacter = null;
		for (var j=0; j<carriers.length; j++) {
			var ship = carriers[j];
			for (var i=0; i<ship.equips.length; i++) {
				var equip = ship.equips[i];
				if (!EQTDATA[equip.type].canContact || !equip.LOS) continue;
				if (contacter && ((contacter.ACC||0) >= (equip.ACC||0))) continue;
				if (C) console.log('    CHANCE 2: '+(equip.LOS/cmod));
				if (Math.random() < equip.LOS/cmod) contacter = equip;
			}
		}
		if (contacter) {
			if (contacter.ACC >= 3) contactMod = 1.2;
			else if(contacter.ACC==2) contactMod = 1.17;
			else contactMod = 1.12;
			return {mod:contactMod, id:contacter.mid};
		}
	}
	return null;
}

function AADefenceBombersAndAirstrike(carriers,targets,defenders,APIkouku,issupport,isjetphase,combinedAll,isRaid) {
	var bombers = [], hasbomber = false;
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i];
		bombers.push([]);
		for (var j=0; j<ship.equips.length; j++) {
			var e = ship.equips[j];
			if ((e.istorpbomber || e.isdivebomber) && ship.planecount[j]>0 && (!isjetphase||e.isjet) && !e.isLB) {
				bombers[i].push(j);
				hasbomber = true;
				var side = (ship.side == 2 || ship.side == 3)? 0 : ship.side;
				if (C && APIkouku.api_plane_from[side].indexOf(ship.apiID2)==-1) APIkouku.api_plane_from[side].push(ship.apiID2);
			}
		}
	}
	if (!hasbomber) return;
	
	//get AACI
	var AACInum = 0, AACImod = 1, AACItype = 0;
	if (SIMCONSTS.enableEnemyAACI) {
		let AACIResult = getAACI(defenders,APIkouku);
		AACInum = AACIResult.num;
		AACImod = AACIResult.mod;
		AACItype = AACIResult.id;
	}
	
	//get contact
	var contactMod = 1;
	if (carriers[0].airState() != -2 && carriers[0].airState() != 0 && !issupport) {
		var contactdata = getContact(carriers);
		if (contactdata) {
			contactMod = contactdata.mod;
			if (C) APIkouku.api_stage1.api_touch_plane[carriers[0].side] = contactdata.id;
		}
	}
	
	//get rocket barrage
	for (let target of targets) {
		let chance = target.rocketBarrageChance();
		if (chance && Math.random() < chance) target._rocketTriggered = true;
	}
	
	for (var i=0; i<bombers.length; i++) {
		var ship = carriers[i];
		for (var j=0; j<bombers[i].length; j++) {
			var slot = bombers[i][j];
			var defender = defenders[Math.floor(Math.random()*defenders.length)];
			var supportMod = (issupport)? .8 : 1;
			var shotProp = (Math.random() < .5)? Math.floor(getAAShotProp(defender,ship.planecount[slot],ship.equips[slot].aaResistShip,isRaid)*supportMod) : 0;
			var shotFlat = (Math.random() < .5)? Math.floor(getAAShotFlat(defender,ship.equips[slot].aaResistShip,ship.equips[slot].aaResistFleet,isRaid)*AACImod*supportMod) : 0;
			var shotFix = ((defender.side==0 || AACInum)? 1 : 0) + AACInum;
			if (MECHANICS.aaResist && ship.equips[slot].aaResistShip && shotFix) {
				let n1 = shotFix, n2 = 0;
				if (AACItype) {
					n1 = AACIDATA[AACItype].num1;
					n2 = shotFix - AACIDATA[AACItype].num1;
				}
				shotFix = Math.floor(n1 * ship.equips[slot].aaResistShip + n2);
				if (C) console.log('AACI resist: ' + n1 + ' ' + n2 + ' ' + shotFix);
			}
			
			if (C) {
				APIkouku.api_stage2[(ship.side)?'api_e_count':'api_f_count'] += ship.planecount[slot];
				APIkouku.api_stage2[(ship.side)?'api_e_lostcount':'api_f_lostcount'] += shotProp+shotFlat+shotFix;
				if (!ship.equips[slot].lostnums) ship.equips[slot].lostnums = [];
				ship.equips[slot].lostnums.push(shotProp+shotFlat+shotFix);
			}
			ship.planecount[slot] = Math.max(0,ship.planecount[slot]-shotProp-shotFlat-shotFix);
			if (C) console.log('	anti air: '+defender.name+' '+defender.AA+' '+shotProp+' '+shotFlat+' '+shotFix+' '+ship.planecount[slot]);
		
			if (ship.planecount[slot]<=0) {
				ship.planecount[slot] = 0;
				ship.equips[slot].setProficiency(0);
				ship.updateProficiencyBonus();
				continue;
			}
			
			if (targets.length) {  //even if subs only, bombers still get shot down
				var targetsR = targets;
				if (combinedAll) {
					var targetsM = [], targetsE = [];
					for (var k=0; k<targets.length; k++) {
						if (targets[k].isescort) targetsE.push(targets[k]);
						else targetsM.push(targets[k]);
					}
					if (!targetsE.length) targetsR = targetsM;
					else if (!targetsM.length) targetsR = targetsE;
					else targetsR = (Math.random() < .5)? targetsM : targetsE;
				}
				var target = choiceWProtect(targetsR);
				if (target._rocketTriggered) continue;
				var dmg = airstrike(ship,target,slot,contactMod,issupport,isjetphase);
				if (C) {
					if (target.isescort) {
						APIkouku.api_stage3_combined[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
						APIkouku.api_stage3_combined[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
						if (ship.equips[slot].istorpbomber) APIkouku.api_stage3_combined[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
						else APIkouku.api_stage3_combined[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
					} else {
						if (!APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num]) APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] = 0;
						APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
						APIkouku.api_stage3[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
						if (ship.equips[slot].istorpbomber) APIkouku.api_stage3[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
						else APIkouku.api_stage3[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
					}
				}
			}
		}
	}
	
	for (let target of targets) {
		target._rocketTriggered = false;
	}
}

function airPhase(alive1,subsalive1,alive2,subsalive2,APIkouku,isjetphase,isbombing,includeEscort) {
	var carriers1 = [], carriers2 = [];
	for (var i=0; i<alive1.length; i++) if ((includeEscort||!alive1[i].isescort) && (!isjetphase||alive1[i].hasjet)) carriers1.push(alive1[i]);
	for (var i=0; i<subsalive1.length; i++) if ((includeEscort||!subsalive1[i].isescort) && (!isjetphase||subsalive1[i].hasjet)) carriers1.push(subsalive1[i]);
	for (var i=0; i<alive2.length; i++) if ((!isjetphase||alive2[i].hasjet)) carriers2.push(alive2[i]);
	for (var i=0; i<subsalive2.length; i++) if ((!isjetphase||subsalive2[i].hasjet)) carriers2.push(subsalive2[i]);
	
	if ((carriers1.length && (!isjetphase||alive2.length)) || (carriers2.length && (!isjetphase||alive1.length))) {
		if (C) {
			APIkouku.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0,api_touch_plane:[-1,-1]};
			APIkouku.api_stage2 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0};
			APIkouku.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_fbak_flag:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0],api_fcl_flag:[-1,0,0,0,0,0,0]};
			APIkouku.api_stage3_combined = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_fbak_flag:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0],api_fcl_flag:[-1,0,0,0,0,0,0]};
		}
		
		if (isjetphase) {
			for (let ship of carriers1) ship.addJetSteelCost();
		}
		
		//fighter defence
		let filter = isjetphase ? 'isjet' : 'isfighter';
		AADefenceFighters(carriers1,alive2.length,APIkouku,filter);
		AADefenceFighters(carriers2,alive1.length,APIkouku,filter);
		
		//bomber defence
		if (!isbombing) AADefenceBombersAndAirstrike(carriers1,alive2,alive2.concat(subsalive2),APIkouku,false,isjetphase,includeEscort);
		AADefenceBombersAndAirstrike(carriers2,alive1,alive1.concat(subsalive1),APIkouku,false,isjetphase,includeEscort,isbombing);
	}
	if (C) {
		for (var i=0; i<2; i++)
			if (APIkouku && APIkouku.api_plane_from[i].length > 1)
				APIkouku.api_plane_from[i] = APIkouku.api_plane_from[i].slice(1);
		if (NEWFORMAT) {
			formatRemovePadding(APIkouku.api_stage3);
			formatRemovePadding(APIkouku.api_stage3_combined);
		}
	}
}

function supportPhase(shipsS,alive2,subsalive2,suptype,BAPI,isboss) {
	if (C) {
		BAPI.data.api_support_flag = suptype;
		BAPI.data.api_support_info = { api_support_airatack:null, api_support_hourai:null };
		let apiSupport;
		if (suptype==2||suptype==3) {
			if (BAPI.data.api_ship_ke_combined)
				apiSupport = BAPI.data.api_support_info.api_support_hourai = { api_cl_list:[-1,0,0,0,0,0,0,0,0,0,0,0,0], api_damage:[-1,0,0,0,0,0,0,0,0,0,0,0,0], api_deck_id:(shipsS[0].fleet.deckId || 3)};
			else
				apiSupport = BAPI.data.api_support_info.api_support_hourai = { api_cl_list:[-1,0,0,0,0,0,0], api_damage:[-1,0,0,0,0,0,0], api_deck_id:(shipsS[0].fleet.deckId || 3)};
			if (NEWFORMAT) formatRemovePadding(BAPI.data.api_support_info.api_support_hourai);
		} else if (suptype==1) {
			apiSupport = BAPI.data.api_support_info.api_support_airatack = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
			BAPI.data.api_support_info.api_support_airatack.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0};
			BAPI.data.api_support_info.api_support_airatack.api_stage2 = {api_f_count:0,api_f_lostcount:0};
			BAPI.data.api_support_info.api_support_airatack.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0]};
			BAPI.data.api_support_info.api_support_airatack.api_stage3_combined = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0]};
		}
		apiSupport.api_ship_id = [];
		apiSupport.api_undressing_flag = [];
		for (let ship of shipsS) {
			apiSupport.api_ship_id.push(ship.mid); //actually roster ID
			apiSupport.api_undressing_flag.push(+(ship.HP/ship.maxHP <= .5));
		}
	}
	if (MECHANICS.LBASBuff && suptype == 1 && subsalive2.length && shipsS.find(ship => ship.type == 'CVL')) {
		for (let ship of shipsS) {
			if (ship.equips.find(eq => eq.canSupportASW)) {
				suptype = 4;
				break;
			}
		}
	}
	if (suptype != 4 && !alive2.length) return;
	if (suptype == 2 || suptype == 3) {
		var hou = (BAPI)? BAPI.data.api_support_info.api_support_hourai : undefined;
		for (var i=0; i<shipsS.length; i++) {
			var ship = shipsS[i];
			var targets = alive2;
			if (targets[0].fleet.combinedWith) {
				var targetsM = [], targetsE = [];
				for (var j=0; j<targets.length; j++) {
					if (targets[j].isescort) targetsE.push(targets[j]);
					else targetsM.push(targets[j]);
				}
				if (!targetsE.length) targets = targetsM;
				else if (!targetsM.length) targets = targetsE;
				else targets = (Math.random() < .5)? targetsM : targetsE;
			}
			var target = choiceWProtect(targets);
			var evFlat = 0;
			if (target.fleet.formation.id == 6) {
				evFlat += (target.type == 'DD') ? SIMCONSTS.vanguardEvShellDD[target.num-1] || 0 : SIMCONSTS.vanguardEvShellOther[target.num-1] || 0;
			}
			var accCrit, torpDmg;
			if (suptype==3) {
				if (!ship.canTorp()) continue;
				torpDmg = ship.TP;
				torpDmg += 8;
				accCrit = accuracyAndCrit(ship,target,hitRate(ship,54,ship.ACC/*+torpDmg*.35*/,ship.moraleMod(true)),target.getFormation().torpev,evFlat,1.2);
			} else if (suptype == 2) {
				var baseacc;
				if (isboss) baseacc = (SIMCONSTS.supportShellB != null)? SIMCONSTS.supportShellB : 64;
				else baseacc = (SIMCONSTS.supportShellN != null)? SIMCONSTS.supportShellN : 64;
				accCrit = accuracyAndCrit(ship,target,hitRate(ship,baseacc,ship.ACC,ship.moraleMod()),target.getFormation().shellev,evFlat,1);
			} else {
				if (!ship.CVshelltype || !ship.canASW()) continue;
				var baseacc;
				if (isboss) baseacc = (SIMCONSTS.supportShellB != null)? SIMCONSTS.supportShellB : 64;
				else baseacc = (SIMCONSTS.supportShellN != null)? SIMCONSTS.supportShellN : 64;
				accCrit = accuracyAndCrit(ship,target,hitRate(ship,baseacc,ship.ACC,ship.moraleMod()),target.getFormation().ASWev,evFlat,1.3,true);
			}
			var res = rollHit(accCrit);
			var dmg = 0, realdmg = 0;
			if (res) {
				var preMod = ENGAGEMENT;
				if (FLEETS1[0] && FLEETS1[0].formation && !FLEETS1[0].combinedWith && !target.fleet.combinedWith) preMod *= FLEETS1[0].formation.shellmod;
				if (suptype == 3 && !FIXTORPEDOSUPPORT) preMod = 0;
				var dmg;
				if (suptype==3) dmg = damage(ship,target,torpDmg,preMod,res,SIMCONSTS.supportDmgCap,false,true);
				else if (suptype == 2) dmg = damage(ship,target,ship.shellPower(target)-1,preMod,res,SIMCONSTS.supportDmgCap,false,true);
				else dmg = damage(ship,target,ship.ASWPower(),1,res,SIMCONSTS.supportDmgCap);
				realdmg = takeDamage(target,dmg);
			} else { realdmg = 0; }
			if (C) {
				console.log(ship.name+' support attacks '+target.name+' for '+dmg+' damage');
				let off = (NEWFORMAT)? -1 : 0;
				hou.api_cl_list[target.apiID2+off] = Math.max(hou.api_cl_list[target.apiID2+off],((res>1)? 2 : (dmg)? 1 : 0));
				hou.api_damage[target.apiID2+off] += realdmg;
			}
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	} else if (suptype == 1 || suptype == 4) {
		for (var i=0; i<shipsS.length; i++) shipsS[i].id = 1;
		if (suptype == 4) {
			compareAP(shipsS[0].fleet,subsalive2[0].fleet,'canSupportASW',false,'isfighter');
			AADefenceFighters(shipsS,false,(C)? BAPI.data.api_support_info.api_support_airatack : null,'canSupportASW');
			supportASW(shipsS,subsalive2,alive2.concat(subsalive2),(C)? BAPI.data.api_support_info.api_support_airatack : null,subsalive2[0].fleet.combinedWith);
		} else {
			for (let ship of shipsS) {
				if (ship.hasjet) ship.addJetSteelCost();
			}
			var prevAS = alive2[0].fleet.AS;
			compareAP(shipsS[0].fleet,alive2[0].fleet);
			AADefenceFighters(shipsS,false,(C)? BAPI.data.api_support_info.api_support_airatack : null);
			AADefenceBombersAndAirstrike(shipsS,alive2,alive2.concat(subsalive2),(C)? BAPI.data.api_support_info.api_support_airatack : null,true,false,alive2[0].fleet.combinedWith);
			alive2[0].fleet.AS = prevAS;
		}
		if (C) {
			let airatack = BAPI.data.api_support_info.api_support_airatack;
			let shipA = (alive2.length)? alive2[0] : subsalive2[0];
			if (shipA.fleet.combinedWith) {
				for (let prop in airatack.api_stage3_combined) {
					for (let i=0; i<airatack.api_stage3_combined[prop].length; i++) {
						if (airatack.api_stage3_combined[prop][i] == -1) continue;
						airatack.api_stage3[prop].push(airatack.api_stage3_combined[prop][i]);
					}
				}
				delete airatack.api_stage3_combined;
			}
			if (NEWFORMAT) {
				formatRemovePadding(airatack.api_stage3);
				formatRemovePadding(airatack.api_stage3_combined);
			}
		}
	}
}

function supportASW(carriers,targets,defenders,APIkouku,combinedAll) {
	var bombers = [], hasbomber = false;
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i];
		bombers.push([]);
		for (var j=0; j<ship.equips.length; j++) {
			var e = ship.equips[j];
			if (e.canSupportASW && ship.planecount[j]>0) {
				bombers[i].push(j);
				hasbomber = true;
				var side = (ship.side == 2 || ship.side == 3)? 0 : ship.side;
				if (C && APIkouku.api_plane_from[side].indexOf(ship.apiID2)==-1) APIkouku.api_plane_from[side].push(ship.apiID2);
			}
		}
	}
	if (!hasbomber) return;
	
	var AACInum = 0, AACImod = 1;
	
	for (var i=0; i<bombers.length; i++) {
		var ship = carriers[i];
		for (var j=0; j<bombers[i].length; j++) {
			var slot = bombers[i][j];
			var defender = defenders[Math.floor(Math.random()*defenders.length)];
			var supportMod = .8;
			var shotProp = (Math.random() < .5)? Math.floor(getAAShotProp(defender,ship.planecount[slot])*supportMod) : 0;
			var shotFlat = (Math.random() < .5)? Math.floor(getAAShotFlat(defender)*AACImod*supportMod) : 0;
			var shotFix = ((defender.side==0 || AACInum)? 1 : 0) + AACInum;
			
			if (C) {
				APIkouku.api_stage2[(ship.side)?'api_e_count':'api_f_count'] += ship.planecount[slot];
				APIkouku.api_stage2[(ship.side)?'api_e_lostcount':'api_f_lostcount'] += shotProp+shotFlat+shotFix;
				if (!ship.equips[slot].lostnums) ship.equips[slot].lostnums = [];
				ship.equips[slot].lostnums.push(shotProp+shotFlat+shotFix);
			}
			ship.planecount[slot] = Math.max(0,ship.planecount[slot]-shotProp-shotFlat-shotFix);
			if (C) console.log('	anti air: '+defender.name+' '+defender.AA+' '+shotProp+' '+shotFlat+' '+shotFix+' '+ship.planecount[slot]);
		
			if (ship.planecount[slot]<=0) {
				ship.planecount[slot] = 0;
				continue;
			}
			
			if (targets.length) { 
				var targetsR = targets;
				if (combinedAll) {
					var targetsM = [], targetsE = [];
					for (var k=0; k<targets.length; k++) {
						if (targets[k].isescort) targetsE.push(targets[k]);
						else targetsM.push(targets[k]);
					}
					if (!targetsE.length) targetsR = targetsM;
					else if (!targetsM.length) targetsR = targetsE;
					else targetsR = (Math.random() < .5)? targetsM : targetsE;
				}
				var target = choiceWProtect(targetsR);
				var dmg = airstrikeSupportASW(ship,target,slot,1);
				
				if (C) {
					if (target.isescort) {
						APIkouku.api_stage3_combined[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
						APIkouku.api_stage3_combined[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
						if (ship.equips[slot].istorpbomber) APIkouku.api_stage3_combined[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
						else APIkouku.api_stage3_combined[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
					} else {
						if (!APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num]) APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] = 0;
						APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
						APIkouku.api_stage3[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
						if (ship.equips[slot].istorpbomber) APIkouku.api_stage3[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
						else APIkouku.api_stage3[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
					}
				}
			}
		}
	}
}

function airstrikeSupportASW(ship,target,slot,contactMod) {
	if (!contactMod) contactMod = 1;
	var acc = .85;
	var res = rollHit(accuracyAndCrit(ship,target,acc,target.getFormation().AAmod,0,.2));
	var equip = ship.equips[slot];
	var dmg = 0, realdmg = 0;
	var planebase = equip.ASW;
	planebase = planebase || 0;
	if (C) console.log('		'+slot+' '+planebase);
	if (res) {
		var base = 3;
		var preMod = .9 + Math.random()*.75;
		if (equip.isjet) preMod *= 1/Math.sqrt(2);
		var postMod = 1.35;
		dmg = damage(ship,target,base+Math.sqrt(ship.planecount[slot])*planebase,preMod,res*contactMod*postMod,SIMCONSTS.airDmgCap);
		realdmg = takeDamage(target,dmg);
	}
	ship.fleet.giveCredit(ship,realdmg);
	if(C) {
		console.log(ship.name+' airstrikes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left, CONTACT: '+contactMod);
	}
	return realdmg;
}

function LBASPhase(lbas,alive2,subsalive2,isjetphase,APIkouku) {
	var carriers2 = [];
	for (var i=0; i<alive2.length; i++) if ((!isjetphase||alive2[i].hasjet)) carriers2.push(alive2[i]);
	for (var i=0; i<subsalive2.length; i++) if ((!isjetphase||subsalive2[i].hasjet)) carriers2.push(subsalive2[i]);
	
	if (C) {
		var apiname = (isjetphase)? 'api_air_base_data' : 'api_squadron_plane';
		APIkouku[apiname] = [];
		for (var i=0; i<lbas.equips.length; i++) {
			var eq = lbas.equips[i];
			if (!eq.isPlane) continue;
			var d = {api_mst_id:0, api_count:0};
			d.api_mst_id = lbas.equips[i].mid;
			d.api_count = lbas.planecount[i];
			APIkouku[apiname].push(d);
			APIkouku.api_plane_from[0].push(i+7);
		}
		APIkouku.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0,api_touch_plane:[-1,-1]};
		APIkouku.api_stage2 = {api_f_count:0,api_f_lostcount:0};
		APIkouku.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0]};
		APIkouku.api_stage3_combined = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0]};
	}
	
	//fighter defence
	let filter = isjetphase ? 'isjet' : 'isPlane';
	AADefenceFighters([lbas],true,APIkouku,filter);
	AADefenceFighters(carriers2,true,APIkouku,filter);
	
	//bomber defence
	var defenders = [];
	var AACImod = 1;
	var AACInum = 0;
	for (var i=0; i<alive2.length; i++) defenders.push(alive2[i]);
	for (var i=0; i<subsalive2.length; i++) defenders.push(subsalive2[i]);
	
	let airStateNow = lbas.AS;
	if (airStateNow == 0) {
		lbas.AS = LandBase.airStatePrev;
	} else {
		LandBase.airStatePrev = lbas.AS;
	}
	var contactMod = 1;
	if (lbas.airState() != -2 && lbas.airState() != 0) {
		var contactdata = getContact([lbas]);
		if (contactdata) {
			contactMod = contactdata.mod;
			if (C) APIkouku.api_stage1.api_touch_plane[0] = contactdata.id;
		}
	}
	let contactModLB = 1;
	for (let eq of lbas.equips) {
		if (eq.type == LANDSCOUT) {
			if (eq.ACC >= 3) contactModLB = 1.15;
			else if (eq.ACC <= 2 && contactModLB < 1.125) contactModLB = 1.125;
		}
	}
	contactMod *= contactModLB;
	lbas.AS = airStateNow;
	
	for (var i=0; i<lbas.equips.length; i++) {
		var eq = lbas.equips[i];
		if (!eq.isdivebomber && !eq.istorpbomber) continue;
		var defender = defenders[Math.floor(Math.random()*defenders.length)];
		var supportMod = 1;
		var shotProp = (Math.random() < .5)? Math.floor(getAAShotProp(defender,lbas.planecount[i],eq.aaResistShip)*supportMod) : 0;
		var shotFlat = (Math.random() < .5)? Math.floor(getAAShotFlat(defender,eq.aaResistShip,eq.aaResistFleet)*AACImod*supportMod) : 0;
		var shotFix = ((defender.side==0 || AACInum)? 1 : 0) + AACInum;
		
		if (C) {
			APIkouku.api_stage2.api_f_count += lbas.planecount[i];
			APIkouku.api_stage2.api_f_lostcount += shotProp+shotFlat+shotFix;
			console.log(lbas.planecount[i] + ' ' + defender.name + ' ' + shotProp + ' ' + shotFlat);
		}
		lbas.planecount[i] = Math.max(0,lbas.planecount[i]-shotProp-shotFlat-shotFix);
		if (lbas.planecount[i] <= 0) {
			lbas.equips[i].setProficiency(0);
			continue;
		}
		
		let isASWPlane = MECHANICS.LBASBuff && eq.ASW >= 7;
		var targets = (isASWPlane)? subsalive2.concat(alive2) : alive2;
		if (targets.length) {
			if (targets[0].fleet.combinedWith) {
				var targetsM = [], targetsE = [];
				for (var j=0; j<targets.length; j++) {
					if (targets[j].isescort) targetsE.push(targets[j]);
					else targetsM.push(targets[j]);
				}
				if (!targetsE.length) targets = targetsM;
				else if (!targetsM.length) targets = targetsE;
				else targets = (Math.random() < .5)? targetsM : targetsE;
			}
			if (isASWPlane) {
				let targetsSub = targets.filter(ship => ship.isSub);
				if (targetsSub.length) targets = targetsSub;
			}
			var target = choiceWProtect(targets);
			var dmg = airstrikeLBAS(lbas,target,i,contactMod);
			if (C) {
				var showtorpedo = lbas.equips[i].istorpbomber;
				if (lbas.equips[i].type == LANDBOMBER && target.isInstall) showtorpedo = false;
				if (target.isSub) showtorpedo = false;
				if (target.isescort) {
					APIkouku.api_stage3_combined[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
					APIkouku.api_stage3_combined[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
					if (showtorpedo) APIkouku.api_stage3_combined[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
					else APIkouku.api_stage3_combined[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
				} else {
					APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
					APIkouku.api_stage3[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
					if (showtorpedo) APIkouku.api_stage3[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
					else APIkouku.api_stage3[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
				}
			}
		}
	}
	
	if (C) {
		for (var i=0; i<2; i++)
			if (APIkouku && APIkouku.api_plane_from[i].length > 1)
				APIkouku.api_plane_from[i] = APIkouku.api_plane_from[i].slice(1);
		if (NEWFORMAT) {
			formatRemovePadding(APIkouku.api_stage3);
			formatRemovePadding(APIkouku.api_stage3_combined);
		}
	}
}

function airstrikeLBAS(lbas,target,slot,contactMod) {
	if (!contactMod) contactMod = 1;
	var equip = lbas.equips[slot];
	var acc = .95;
	var critdmgbonus = 1, critratebonus = 0, ACCplane = 0;
	if (equip.type != LANDBOMBER || MECHANICS.LBASBuff) {
		ACCplane = Math.sqrt(equip.exp*.1);
		var critval = 0;
		switch(equip.rank) {
			case 7: ACCplane += 9; critval = 10; break;
			case 6: ACCplane += 6; critval = 7; break;
			case 5: ACCplane += 4; break;
			case 4: ACCplane += 3; break;
			case 3: ACCplane += 2; break;
			case 2: ACCplane += 1; break;
			case 0: ACCplane = 0; break;
		}
		critdmgbonus += Math.floor(Math.sqrt(equip.exp)+critval)/100;
		critratebonus = critval*.6;
	}
	if (MECHANICS.LBASBuff) {
		acc += .07*(equip.ACC || 0);
	}
	lbas.critratebonus = critratebonus; lbas.ACCplane = ACCplane;
	var res = rollHit(accuracyAndCrit(lbas,target,acc,target.getFormation().AAmod,0,.2,true),critdmgbonus);
	lbas.critratebonus = 0; lbas.ACCplane = 0;
	var dmg = 0, realdmg = 0;
	var planebase;
	if (equip.type == LANDBOMBER || equip.type == LANDBOMBERL) planebase = (target.isInstall)? equip.DIVEBOMB : equip.TP + (equip.airstrikePowerImprove || 0);
	else planebase = (equip.isdivebomber)? equip.DIVEBOMB + (equip.airstrikePowerImprove || 0) : (target.isInstall)? 0 : equip.TP + (equip.airstrikePowerImprove || 0);
	if (target.isSub) planebase = equip.ASW;
	if (MECHANICS.hayabusa65Buff && equip.mid == 224) {
		if (['DD'].indexOf(target.type) != -1) planebase = 25;
	}
	planebase = planebase || 0;
	if (res) {
		if (equip.mid == 405 && !target.isInstall) {
			if (['DD'].indexOf(target.type) != -1) planebase *= 1.1;
		}
		if (equip.mid == 444 && !target.isInstall) {
			if (['DD','CL','CLT','CVL','FBB','BB','BBV'].includes(target.type)) planebase *= 1.15;
		}
		var dmgbase = 25+planebase*Math.sqrt(1.8*lbas.planecount[slot]);
		var preMod = (equip.type == LANDBOMBER)? .8 : 1;
		if (target.isSub) {
			preMod = (planebase >= 10)? .7 + Math.random()*.3 : .35 + Math.random()*.45;
		}
		var postMod = (equip.type == LANDBOMBER)? 1.8 : 1;
		// https://discordapp.com/channels/118339803660943369/425302689887289344/805523354844135494
		// CV/CVB unconfirmed, assumed based on ap shell weakness
		if (equip.mid == 406 && !target.isInstall) {
			if (['CA','CAV','CV','CVB'].indexOf(target.type) != -1) preMod *= 1.15;
			if (['FBB','BB','BBV'].indexOf(target.type) != -1) preMod *= 1.35;
		}
		// if (target.isInstall) { //https://cdn.discordapp.com/attachments/178613137430282240/284476587783618560/isohime.PNG
			// if (equip.isdivebomber) postMod *= 2;
			// else postMod *= 1.18;
		// }
		preMod *= (target.LBWeak || 1);
		if (equip.isdivebomber) postMod *= (target.divebombWeak || 1);
		// postMod *= (target.divebombWeak || 1);
		if (target.fleet.combinedWith) postMod *= 1.1;
		if (SIMCONSTS.enablePlaneBonus && equip.bonusSpecialP) {
			for (let group in equip.bonusSpecialP) postMod *= equip.bonusSpecialP[group];
		}
		dmg = damage(lbas,target,dmgbase,preMod,res*contactMod*postMod,SIMCONSTS.airDmgCap,true);
		realdmg = takeDamage(target,dmg);
	}
	if(C) {
		console.log('LBAS airstrikes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left, CONTACT: '+contactMod);
	}
	return realdmg;
}

function orderByRange(ships,order,includeSubs,isOASW) {
	var ranges = []; //fleet 1
	for (var i=0; i<ships.length; i++) {
		if (!includeSubs && ships[i].isSub) continue;
		if (!ships[i].canShell(isOASW)) continue;
		if (ships[i].retreated) continue;
		if (!ranges[ships[i].RNG]) ranges[ships[i].RNG] = [];
		ranges[ships[i].RNG].push(ships[i]);
	}
	for (var i=0; i<ranges.length; i++) if (ranges[i]) shuffle(ranges[i]);
	for (var i=ranges.length-1; i>=0; i--) {
		if (!ranges[i]) continue;
		for (var j=0; j<ranges[i].length; j++) order.push(ranges[i][j]);
	}
}

function apiSetBasic(dataroot,ships1,ships2,ships1C,ships2C) {
	dataroot.api_deck_id = 1;
	var retreatlist = [];
	for (var i=0; i<ships1.length; i++) if (ships1[i].retreated) retreatlist.push(i+1);
	if (retreatlist.length) dataroot.api_escape_idx = retreatlist;
	if (ships1C) {
		var retreatlistC = [];
		for (var i=0; i<ships1C.length; i++) if (ships1C[i].retreated) retreatlistC.push(i+1);
		if (retreatlistC.length) dataroot.api_escape_idx_combined = retreatlistC;
	}
	if (NEWFORMAT) {
		dataroot.api_f_maxhps = []; dataroot.api_f_nowhps = [];
		dataroot.api_e_maxhps = []; dataroot.api_e_nowhps = [];
		for (let ship of ships1) {
			dataroot.api_f_nowhps.push(ship.HP);
			dataroot.api_f_maxhps.push(ship.maxHP);
		}
	} else {
		dataroot.api_maxhps = [-1];
		dataroot.api_nowhps = [-1];
		for (var i=0; i<6; i++) {
			dataroot.api_nowhps.push((i<ships1.length)? ships1[i].HP : -1);
			dataroot.api_maxhps.push((i<ships1.length)? ships1[i].maxHP : -1);
		}
	}

	dataroot.api_ship_ke = [];
	dataroot.api_eSlot = [];
	for (var i=0; i<6; i++) {
		dataroot.api_ship_ke.push((i<ships2.length)? ships2[i].mid : -1);
		if (NEWFORMAT) {
			dataroot.api_e_nowhps.push((i<ships2.length)? ships2[i].HP : -1);
			dataroot.api_e_maxhps.push((i<ships2.length)? ships2[i].maxHP : -1);
		} else {
			dataroot.api_nowhps.push((i<ships2.length)? ships2[i].HP : -1);
			dataroot.api_maxhps.push((i<ships2.length)? ships2[i].maxHP : -1);
		}
		dataroot.api_eSlot.push([]);
		for (var j=0; j<5; j++)
			dataroot.api_eSlot[i].push((i<ships2.length && j<ships2[i].equips.length)? ships2[i].equips[j].mid : -1);
	}
	
	if (ships1C) {
		if (NEWFORMAT) {
			dataroot.api_f_maxhps_combined = []; dataroot.api_f_nowhps_combined = [];
			for (var i=0; i<6; i++) {
				dataroot.api_f_nowhps_combined.push((i<ships1C.length)? ships1C[i].HP : -1);
				dataroot.api_f_maxhps_combined.push((i<ships1C.length)? ships1C[i].maxHP : -1);
			}
		} else {
			dataroot.api_nowhps_combined = [-1];
			dataroot.api_maxhps_combined = [-1];
			for (var i=0; i<6; i++) {
				dataroot.api_nowhps_combined.push((i<ships1C.length)? ships1C[i].HP : -1);
				dataroot.api_maxhps_combined.push((i<ships1C.length)? ships1C[i].maxHP : -1);
			}
		}
	}
	
	if (ships2C) {
		dataroot.api_ship_ke_combined = [];
		dataroot.api_eSlot_combined = [];
		if (NEWFORMAT) {
			dataroot.api_e_maxhps_combined = []; dataroot.api_e_nowhps_combined = [];
		}
		for (var i=0; i<6; i++) {
			dataroot.api_ship_ke_combined.push((i<ships2C.length)? ships2C[i].mid : -1);
			if (NEWFORMAT) {
				dataroot.api_e_nowhps_combined.push((i<ships2C.length)? ships2C[i].HP : -1);
				dataroot.api_e_maxhps_combined.push((i<ships2C.length)? ships2C[i].maxHP : -1);
			} else {
				dataroot.api_nowhps_combined.push((i<ships2C.length)? ships2C[i].HP : -1);
				dataroot.api_maxhps_combined.push((i<ships2C.length)? ships2C[i].maxHP : -1);
			}
			dataroot.api_eSlot_combined.push([]);
			for (var j=0; j<5; j++)
				dataroot.api_eSlot_combined[i].push((i<ships2C.length && j<ships2C[i].equips.length)? ships2C[i].equips[j].mid : -1);
		}
	}
	
	dataroot.api_search = [0,1];
	dataroot.api_search[0] = getDetection(ships1,ships2); //watch mode only
	
	if (NEWFORMAT) {
		dataroot.api_fParam = [];
		for (let ship of ships1) {
			dataroot.api_fParam.push([ship.statsBase.FP,ship.statsBase.TP,ship.statsBase.AA,ship.statsBase.AR]);
		}
		dataroot.api_eParam = [];
		dataroot.api_ship_lv = [];
		for (let ship of ships2) {
			dataroot.api_eParam.push([ship.statsBase.FP,ship.statsBase.TP,ship.statsBase.AA,ship.statsBase.AR]);
			dataroot.api_ship_lv.push(ship.LVL);
		}
		if (ships1C) {
			dataroot.api_fParam_combined = [];
			for (let ship of ships1C) {
				dataroot.api_fParam_combined.push([ship.statsBase.FP,ship.statsBase.TP,ship.statsBase.AA,ship.statsBase.AR]);
			}
		}
		if (ships2C) {
			dataroot.api_eParam_combined = [];
			dataroot.api_ship_lv_combined = [];
			for (let ship of ships2C) {
				dataroot.api_eParam_combined.push([ship.statsBase.FP,ship.statsBase.TP,ship.statsBase.AA,ship.statsBase.AR]);
				dataroot.api_ship_lv_combined.push(ship.LVL);
			}
		}
		dataroot.api_stage_flag = [0,0,0];
		dataroot.api_opening_taisen_flag = 0;
		dataroot.api_opening_flag = 0;
		dataroot.api_hourai_flag = [0,0,0,0];
	}
}

function apiUpdateFlag(dataroot,isRaid,combineTypeF,combinedE) {
	if (!NEWFORMAT) return;
	for (let key of ['api_kouku','api_kouku2']) {
		let kouku = dataroot[key];
		if (!kouku) continue;
		let plane_from = kouku.api_plane_from;
		if (plane_from[0][0] == -1) plane_from[0] = null;
		if (plane_from[1][0] == -1) plane_from[1] = null;
		if (!plane_from[0] && !plane_from[1]) {
			kouku.api_stage2 = null;
			kouku.api_stage3 = null;
			delete kouku.api_stage3_combined;
		}
		if (kouku.api_stage1) dataroot.api_stage_flag[0] = 1;
		if (kouku.api_stage2) dataroot.api_stage_flag[1] = 1;
		if (kouku.api_stage3) dataroot.api_stage_flag[2] = 1;
	}
	for (let key of ['api_opening_atack','api_raigeki']) {
		let raigeki = dataroot[key];
		if (!raigeki) continue;
		if (raigeki.api_frai.find(n => n > -1) != null || raigeki.api_erai.find(n => n > -1) != null) {
			for (let i=0; i<raigeki.api_frai.length; i++) if (raigeki.api_frai[i] == null) raigeki.api_frai[i] = -1;
			for (let i=0; i<raigeki.api_erai.length; i++) if (raigeki.api_erai[i] == null) raigeki.api_erai[i] = -1;
		} else {
			dataroot[key] = null;
			if (isRaid) delete dataroot[key];
		}
	}
	for (let key of ['api_opening_taisen','api_hougeki1','api_hougeki2','api_hougeki3']) {
		let hougeki = dataroot[key];
		if (!hougeki) continue;
		if (hougeki.api_at_list.length <= 0 || (hougeki.api_at_list.length == 1 && hougeki.api_at_list[0] == -1)) {
			dataroot[key] = null;
			if (isRaid) delete dataroot[key];
		}
	}
	if (dataroot.api_opening_taisen) dataroot.api_opening_taisen_flag = 1;
	if (dataroot.api_opening_atack) dataroot.api_opening_flag = 1;
	let keysOrder = ['api_hougeki1','api_hougeki2','api_hougeki3','api_raigeki'];
	if (combineTypeF && !combinedE) {
		if (combineTypeF != 2) keysOrder = ['api_hougeki1','api_raigeki','api_hougeki2','api_hougeki3'];
	}
	if (!combineTypeF && combinedE) {
		keysOrder = ['api_hougeki1','api_raigeki','api_hougeki2','api_hougeki3'];
	}
	if (combineTypeF && combinedE) {
		if (combineTypeF != 2) keysOrder = ['api_hougeki1','api_hougeki2','api_raigeki','api_hougeki3'];
	}
	for (let i=0; i<keysOrder.length; i++) {
		if (dataroot[keysOrder[i]]) dataroot.api_hourai_flag[i] = 1;
	}
	if (isRaid) {
		if (!dataroot.api_opening_taisen) delete dataroot.api_opening_taisen_flag;
		if (!dataroot.api_opening_atack) delete dataroot.api_opening_flag;
		if (!dataroot.api_hougeki1) delete dataroot.api_hourai_flag;
	}
}

function sim(F1,F2,Fsupport,LBASwaves,doNB,NBonly,aironly,bombing,noammo,BAPI,noupdate,friendFleet) {
	var ships1 = F1.ships, ships2 = F2.ships;
	var alive1 = [], alive2 = [], subsalive1 = [], subsalive2 = [];
	var hasInstall1 = false, hasInstall2 = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP <= 0) continue;
		if (ships1[i].retreated) continue;
		if(ships1[i].isSub) subsalive1.push(ships1[i]);
		else alive1.push(ships1[i]);
		ships1[i].HPprev = ships1[i].HP;
		if (!MECHANICS.morale) ships1[i].morale = 49;
		if (ships1[i].isInstall) hasInstall1 = true;
		ships1[i].morale -= (NBonly ? 2 : 3);
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].HP <= 0) continue;
		if (ships2[i].retreated) continue;
		if(ships2[i].isSub) subsalive2.push(ships2[i]);
		else alive2.push(ships2[i]);
		ships2[i].HPprev = ships2[i].HP;
		if (ships2[i].isInstall) hasInstall2 = true;
	}
	
	if (F1.formation.id == 4) {
		F1.formation = ECHELON;
	}
	
	var r = Math.random();
	if (r < .45) ENGAGEMENT = 1;
	else if (r < .6) ENGAGEMENT = 1.2;
	else if (r < .9 || F1.noRedT || F2.noRedT) ENGAGEMENT = .8;
	else ENGAGEMENT = .6;
	
	F1.AS = F2.AS = 0;
	
	if (bombing) aironly = true;
	
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = (NBonly)? BAPI.yasen : BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		apiSetBasic(dataroot,ships1,ships2);
	}
	// if (C) console.log(API);
	
	var doShell2 = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].enableSecondShelling) doShell2 = true; //do retreated ships count?
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].enableSecondShelling) doShell2 = true;
	}
	
	//jet lbas
	if (LBASwaves && LBASwaves.length && !NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_air_base_injection = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		var uniqueLBs = [];
		for (var i=0; i<LBASwaves.length; i++) {
			if (uniqueLBs.indexOf(LBASwaves[i]) == -1) uniqueLBs.push(LBASwaves[i]);
		}
		var jetLBAS = LandBase.createJetLandBase(uniqueLBs);
		if (jetLBAS.equips.length) {
			compareAP(jetLBAS,F2,'isjet');
			LBASPhase(jetLBAS,alive2,subsalive2,true,(C)?BAPI.data.api_air_base_injection:undefined);
			removeSunk(alive2); removeSunk(subsalive2);
			if (C) {
				BAPI.data.api_air_base_injection.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[jetLBAS.AS+2];
			}
			F2.AS = 0;
		} else {
			if (C) delete BAPI.data.api_air_base_injection;
		}
	}
	
	//jet airstrike
	if (!NBonly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_injection_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		compareAP(F1,F2,'isjet');
		airPhase(alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_injection_kouku:undefined,true);
		if (C) {
			if (!BAPI.data.api_injection_kouku.api_stage1) delete BAPI.data.api_injection_kouku;
			if (BAPI.data.api_injection_kouku) delete BAPI.data.api_injection_kouku.api_stage3_combined;
		}
	
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; F1.clearFleetAntiAir(); }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; F2.clearFleetAntiAir(); }
		}
	}
	
	//lbas
	if (LBASwaves && LBASwaves.length && !NBonly) {
		if (C) BAPI.data.api_air_base_attack = [];
		for (var i=0; i<LBASwaves.length; i++) LBASwaves[i]._currentSlots = LBASwaves[i].planecount.slice();
		for (var i=0; i<LBASwaves.length; i++) {
			if (LBASwaves[i].equips.length <= 0) continue;
			if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
				LBASwaves[i].planecount = LBASwaves[i]._currentSlots.slice();
				compareAP(LBASwaves[i],F2,'isPlane');
				var LBAPI = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
				LBASPhase(LBASwaves[i],alive2,subsalive2,false,(C)?LBAPI:undefined);
				removeSunk(alive2); removeSunk(subsalive2);
				if (C) {
					LBAPI.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[LBASwaves[i].AS+2];
					BAPI.data.api_air_base_attack.push(LBAPI);
				}
			}
		}
		F2.AS = 0;
	}
	
	//friend fleet air
	if (!NBonly && friendFleet && friendFleet.air && alive2.length+subsalive2.length > 0) {
		if (C) {
			BAPI.data.api_friendly_info = apiGetFriendlyInfo(friendFleet.air.ships);
			BAPI.data.api_friendly_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		}
		compareAP(friendFleet.air,F2);
		airPhase(friendFleet.air.ships.filter(s => !s.isSub),friendFleet.air.ships.filter(s => s.isSub),alive2,subsalive2,(C)? BAPI.data.api_friendly_kouku:undefined);
		if (C) {
			if (BAPI.data.api_friendly_kouku.api_stage1) BAPI.data.api_friendly_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[friendFleet.air.AS+2];
			else BAPI.data.api_friendly_kouku = null;
			if (BAPI.api_friendly_kouku) delete BAPI.data.api_friendly_kouku.api_stage3_combined;
		}
		removeSunk(alive2); removeSunk(subsalive2);
		F2.AS = 0;
	}
	
	//opening airstrike
	if (!NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		compareAP(F1,F2);
		airPhase(alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_kouku:undefined,false,bombing);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_kouku = null;
			if (BAPI.api_kouku) delete BAPI.data.api_kouku.api_stage3_combined;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; F1.clearFleetAntiAir(); }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; F2.clearFleetAntiAir(); }
		}
	}
	
	//second airphase
	if (!NBonly && aironly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		compareAP(F1,F2);
		if (C) BAPI.data.api_kouku2 = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_kouku2:undefined);
		if (C) {
			if (!BAPI.data.api_kouku2.api_stage1) delete BAPI.data.api_kouku2;
			else BAPI.data.api_kouku2.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			delete BAPI.data.api_kouku.api_stage3_combined;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; F1.clearFleetAntiAir(); }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; F2.clearFleetAntiAir(); }
		}
	}
	
	//support phase
	if (Fsupport && (!NBonly || (MECHANICS.LBASBuff && Fsupport.supportType != 1)) && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) {
			supportPhase(Fsupport.ships,alive2,subsalive2,Fsupport.supportType,BAPI,Fsupport.supportBoss);
			removeSunk(alive2); removeSunk(subsalive2);
		}	
	}
	
	//opening asw
	if (MECHANICS.OASW && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var attackers1 = [], order1 = [], attackers2 = [], order2 = [];
		for (var i=0; i<alive1.length; i++) {
			if (alive1[i].canOASW()) attackers1.push(alive1[i]);
		}
		orderByRange(attackers1,order1,false,true);
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].canOASW()) attackers2.push(alive2[i]);
		}
		orderByRange(attackers2,order2,false,true);
		
		if (order1.length+order2.length) {
			if (C) BAPI.data.api_opening_taisen = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
			shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_opening_taisen:undefined,true);
		}
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2,subsalive2,true,(C)? BAPI.data.api_opening_atack : undefined);
	}
	
	//recalculate fLoS before shelling because recon may have been shot down
	F1.clearFleetLoS();
	F2.clearFleetLoS();
	
	//shelling 1
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var order1 = [], order2 = [];
		orderByRange(ships1,order1,hasInstall2);
		orderByRange(ships2,order2,hasInstall1);
		
		if (C) BAPI.data.api_hougeki1 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_hougeki1:undefined);
	}
	
	//shelling 2
	if (!NBonly && !aironly && doShell2 && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var order1 = [], order2 = [];
		for (var i=0; i<ships1.length; i++) {
			if (!hasInstall2 && ships1[i].isSub) continue;
			if (ships1[i].retreated) continue;
			if (ships1[i].canShell()) order1.push(ships1[i]);
		}
		for (var i=0; i<ships2.length; i++) {
			if (!hasInstall1 && ships2[i].isSub) continue;
			if (ships2[i].retreated) continue;
			if (ships2[i].canShell()) order2.push(ships2[i]);
		}
		
		if (C) BAPI.data.api_hougeki2 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_hougeki2:undefined);
	}
	
	// closing torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2,subsalive2,false,(C)? BAPI.data.api_raigeki:undefined);
	}
	
	var results = {};
	if (noupdate) {
		results.rankDay = getRank(ships1,ships2);
		results.mvpDay = F1.getMVP();
		results.repairsDay = {};
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].repairs) results.repairsDay[i] = ships1[i].repairs.slice();
		}
	}
	
	if (C) {
		apiUpdateFlag(BAPI.data,bombing);
		if (!NBonly) BAPI.data.api_midnight_flag = +!!(!bombing && alive2.length + subsalive2.length);
	}
	
	//friend fleet
	if ((doNB||NBonly) && friendFleet && alive2.length+subsalive2.length > 0) {
		let ff = friendFleet.id != null ? friendFleet : friendFleet.night;
		if (ff) {
			friendFleetPhase(ff,F2,alive2,subsalive2,BAPI);
			removeSunk(alive2); removeSunk(subsalive2);
		}
	}
		
	//night battle
	var didNB = false;
	if ((doNB||NBonly) && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		didNB = !NBonly;
		var order1 = [], order2 = [];
		for (var i=0; i<ships1.length; i++) {
			order1.push(ships1[i]);
		}
		for (var i=0; i<ships2.length; i++) {
			order2.push(ships2[i]);
		}
		
		if (C) {
			if (!BAPI.yasen) BAPI.yasen = {};
			BAPI.yasen.api_hougeki = {api_at_list:[-1],api_damage:[-1],api_df_list:[-1],api_sp_list:[-1],api_cl_list:[-1],api_n_mother_list:[-1],api_si_list:[-1]};
			if (NEWFORMAT) {
				formatRemovePadding(BAPI.yasen.api_hougeki);
				BAPI.yasen.api_hougeki.api_at_eflag = [];
			}
			BAPI.yasen.api_flare_pos = [-1,-1];
			BAPI.yasen.api_touch_plane = [-1,-1];
			if (NBonly && BAPI.data.api_support_flag) {
				BAPI.yasen.api_n_support_flag = BAPI.data.api_support_flag;
				BAPI.yasen.api_n_support_info = BAPI.data.api_support_info;
				delete BAPI.data.api_support_flag;
				delete BAPI.data.api_support_info;
			}
		}
		nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);
	}
	
	if (!noupdate) {
		// var subonly = true;
		// for (var j=0; j<ships2.length; j++) if (ships2[j].type != 'SS') subonly = false;
		updateSupply(ships1,didNB,NBonly,bombing,noammo);
	}
	
	
	results.rank = (bombing)? getRankRaid(ships1) : getRank(ships1,ships2);
	
	results.redded = false;
	results.flagredded = (ships1[0].HP/ships1[0].maxHP <= .25);
	results.reddedIndiv = [false,false,false,false,false];
	results.flagsunk = (ships2[0].HP <= 0);
	results.undamaged = true;
	results.buckets = 0;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP/ships1[i].maxHP <= .25) {
			results.redded = true;
			results.reddedIndiv[i] = true;
			if (!noupdate && !ships1[i].isflagship) ships1[i].protection = false;
		}
		if (ships1[i].HP/ships1[i].maxHP <= .5) results.undamaged = false;
		if (ships1[i].HP/ships1[i].maxHP <= BUCKETPERCENT || getRepairTime(ships1[i]) > BUCKETTIME) results.buckets++;
		//if (ships1[i].repairsOrig && ships1[i].repairsOrig.length > ships1[i]
	}
	results.MVP = F1.getMVP();
	if (didNB) results.didNB = true;
	
	//update morale
	for (let ship of ships1) ship.morale += (NBonly ? 2 : 3);
	if (MECHANICS.morale && !noupdate) {
		updateMorale(ships1,results.rank,results.MVP,NBonly,didNB);
	}
	
	return results;
}

function removeSunk(ships) {
	let c = ships.length;
	for (var i=0; i<ships.length; i++) {
		if (ships[i].HP <= 0) ships.splice(i--,1);
	}
	return c - ships.length;
}

function getRank(ships1,ships2,ships1C) {
	var rank = '';
	var dmg1 = 0, dmg2 = 0, sunk1 = 0, sunk2 = 0, dtotal1 = 0, dtotal2 = 0;
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].HP <= 0) sunk2++;
		dmg2 += ships2[i].HPprev - Math.max(0,ships2[i].HP);
		dtotal2 += ships2[i].HPprev;
	}
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].retreated) continue;
		if (ships1[i].HP <= 0) sunk1++;
		dmg1 += ships1[i].HPprev - Math.max(0,ships1[i].HP);
		dtotal1 += ships1[i].HPprev;
	}
	if (ships1C) {
		for (var i=0; i<ships1C.length; i++) {
			if (ships1C[i].retreated) continue;
			if (ships1C[i].HP <= 0) sunk1++;
			dmg1 += ships1C[i].HPprev - Math.max(0,ships1C[i].HP);
			dtotal1 += ships1C[i].HPprev;
		}
	}
	dmg1 /= dtotal1; dmg2 /= dtotal2;
	if (!sunk1) {
		if (sunk2 == ships2.length) return 'S';
		if (sunk2 >= Math.floor(ships2.length*.7) && ships2.length>1) return 'A';
	}
	if (sunk1 < sunk2 && ships2[0].HP <= 0) return 'B';
	if (dmg2 > dmg1*2.5) return 'B';
	if (dmg2 > dmg1*.9) return 'C';
	if (sunk1 > 0 && sunk1 >= ships1.length-1) return 'E';
	return 'D';
}

function getRankRaid(shipsF,shipsFC) {
	let ships = (shipsFC)? shipsF.concat(shipsFC) : shipsF;
	let hpNow = 0, hpPrev = 0;
	for (let ship of ships) {
		if (ship.retreated || ship.HP <= 0) continue;
		hpPrev += ship.HPprev;
		hpNow += ship.HP;
	}
	if (hpNow == hpPrev) return 'S';
	if (hpNow/hpPrev > .9) return 'A';
	if (hpNow/hpPrev > .8) return 'B';
	if (hpNow/hpPrev > .5) return 'C';
	if (hpNow/hpPrev > .2) return 'D';
	return 'E';
}

function updateSupply(ships,didNB,NBonly,bombing,noammo,isECombined) {
	let costSpecial = null, shipsSpecial = null;
	if (ships[0].fleet.didSpecial == 1) {
		if (ships[0].attackSpecial == 101 || ships[0].attackSpecial == 102) costSpecial = 1.5;
		else if (ships[0].attackSpecial == 104) costSpecial = MECHANICS.kongouSpecialBuff ? 1.2 : 1.3;
		if (costSpecial) shipsSpecial = getSpecialAttackShips(ships,ships[0].attackSpecial);
		ships[0].fleet.didSpecial = 2;
	}
	let costFuel = 0, costAmmo = 0;
	if (MECHANICS.newSupply) {
		let allPT = true;
		for (let ship of ships) { if (!ship.isPT) { allPT = false; break; } }
		if (allPT) {
			costFuel = .04;
			costAmmo = .08;
		} else if (bombing) {
			if (SIMCONSTS.airRaidCostW6) {
				costFuel = .04;
				costAmmo = .08;
			} else {
				costFuel = .06;
				costAmmo = .04;
			}
		} else if (noammo) {
			costFuel = .08;
		} else if (NBonly) {
			costFuel = .1;
			costAmmo = .1;
		} else {
			costFuel = .2;
			costAmmo = .2;
		}
	} else {
		if (bombing) {
			costFuel = .08;
			costAmmo = .04;
		} else {
			costFuel = .2;
			if (!noammo) costAmmo = .2;
		}
	}
	for (var i=0; i<ships.length; i++) {
		if (ships[i].HP <= 0) continue;
		if (ships[i].retreated) continue;
		
		let fuelMax = ships[i].fuel || 100;
		let ammoMax = ships[i].ammo || 100;
		if (costFuel > 0) {
			ships[i].fuelleft -= 10*(Math.floor(fuelMax * costFuel) || 1) / fuelMax;
			if (ships[i].fuelleft < 0) ships[i].fuelleft = 0;
		}
		if (costAmmo > 0) {
			let subAmmo = Math.floor(ammoMax * costAmmo) || 1;
			if (didNB && !isECombined) subAmmo += Math.ceil(ammoMax * costAmmo/2);
			if (costSpecial && shipsSpecial.indexOf(ships[i]) != -1 && (!isECombined || !didNB)) subAmmo = Math.floor(subAmmo*costSpecial);
			ships[i].ammoleft -= 10*subAmmo/ammoMax;
			if (ships[i].ammoleft < 0) ships[i].ammoleft = 0;
		}
		
		if (C) console.log('FUEL LEFT: '+ships[i].fuelleft+' AMMO LEFT: '+ships[i].ammoleft);
	}
}

function underwaySupply(fleet) {
	let ships = fleet.ships, num = fleet.numUnderwaySupply || 0;
	if (fleet.combinedWith) {
		ships = ships.concat(fleet.combinedWith.ships);
		num += (fleet.combinedWith.numUnderwaySupply || 0);
	}
	if (num == 0) return;
	let amount;
	if (num == 1) amount = (fleet.combinedWith)? .15 : .25;
	else if (num == 2) amount = (fleet.combinedWith)? .275 : .36;
	else amount = (fleet.combinedWith)? .4 : .47;
	for (let ship of ships) {
		let fuel = 10*(Math.floor(ship.fuel * amount) || 1) / ship.fuel;
		let ammo = 10*(Math.floor(ship.ammo * amount) || 1) / ship.ammo;
		if (ship.fuelleft + fuel > 10) fuel = 10 - ship.fuelleft;
		if (ship.ammoleft + ammo > 10) ammo = 10 - ship.ammoleft;
		ship.fuelleft += fuel;
		ship.ammoleft += ammo;
		ship._fuelUnderway = fuel;
		ship._ammoUnderway = ammo;
	}
}

function updateMorale(ships1,rank,mvp,NBonly,didNB) {
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].morale < 30) ships1[i].morale -= 6;
		switch(rank) {
			case 'S': ships1[i].morale += 1; break;
			case 'B': ships1[i].morale -= 1; break;
			case 'C': ships1[i].morale -= 2; break;
			case 'D': case 'E': ships1[i].morale -= 3; break;
		}
		if (NBonly) ships1[i].morale += 1;
		if (didNB) ships1[i].morale -= 2;
	}
	ships1[0].morale += 3;
	ships1[mvp].morale += 10;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].morale > 100) ships1[i].morale = 100;
		if (ships1[i].morale < 0) ships1[i].morale = 0;
		if (C) console.log(ships1[i].name+' '+ships1[i].morale);
	}
}



function createDefaultShip(mid,overrideStats) {
	var dataOrig = SHIPDATA[mid], data = {};
	if (overrideStats) {
		for (var stat in dataOrig) {
			if (overrideStats[stat]) data[stat] = overrideStats[stat];
			else data[stat] = dataOrig[stat];
		}
	} else {
		data = dataOrig;
	}
	var ShipType = window[data.type];
	var ship = new ShipType(mid,data.name,(isPlayable(mid))?0:1,(isPlayable(mid))?99:1,data.HP,data.FP,data.TP,data.AA,data.AR,data.EV,data.ASW,data.LOS,data.LUK,data.RNG,data.SLOTS);
	if (ship.isSub) ship.LVL = 50;
	if (data.EQUIPS) ship.loadEquips(data.EQUIPS,[0,0,0,0],[0,0,0,0],true);
	if (SHIPDATA[mid].isInstall) ship.isInstall = true;
	return ship;
}

function getFCFShips(ships1,ships1C) {
	var retreater = null, escorter = null;
	for (var i=1; i<ships1.length; i++) {
		if (ships1[i].retreated) continue;
		if (ships1[i].HP/ships1[i].maxHP <= .25 && ships1[i].HP > 0) {
			if (!retreater) retreater = ships1[i];
		}
	}
	for (var i=1; i<ships1C.length; i++) {
		if (ships1C[i].retreated) continue;
		if (ships1C[i].HP/ships1C[i].maxHP <= .25 && ships1C[i].HP > 0) {
			if (!retreater) retreater = ships1C[i];
		} else if (ships1C[i].type == 'DD' && ships1C[i].HP/ships1C[i].maxHP > .75) {
			if (!escorter) escorter = ships1C[i];
		}
	}
	if (!retreater) escorter = null;
	if (!escorter) retreater = null;
	return [retreater, escorter];
}

function canContinue(ships1,ships1C) {
	if (ships1[0].HP/ships1[0].maxHP <= .25) return false;
	
	if (!ships1C && ships1[0].hasFCF && ships1[0].hasFCF[272] && ships1[0].fleet.ships.length >= 7) {
		let taihaShips = ships1.filter(ship => ship.HP/ship.maxHP <= .25 && !ship.retreated);
		if (taihaShips.length >= 2) return false;
		if (taihaShips.length) {
			taihaShips[0].retreated = true;
			taihaShips[0].fuelleft = 0;
			taihaShips[0].HP = Math.max(1, taihaShips[0].HP - Math.floor(.2*taihaShips[0].maxHP));
		}
		return true;
	}
	
	if (!ships1C && ships1[0].hasFCF && ships1[0].hasFCF[413] && ships1[0].fleet.isTorpedoSquadron()) {
		let taihaShips = ships1.filter(ship => ship.HP/ship.maxHP <= .25 && !ship.retreated);
		if (taihaShips.length >= 2) return false;
		if (taihaShips.length) {
			taihaShips[0].retreated = true;
			taihaShips[0].fuelleft = taihaShips[0].ammoleft = 0;
			taihaShips[0].HP = Math.max(1, taihaShips[0].HP - Math.floor(.2*taihaShips[0].maxHP));
		}
		return true;
	}
	
	var retreater = null, escorter = null;
	if (ships1C && ships1[0].hasFCF && ships1[0].hasFCF[107]) { var d = getFCFShips(ships1,ships1C); retreater = d[0]; escorter = d[1]; }
	if (DORETREAT) {
		for (var i=1; i<ships1.length; i++) {
			if (ships1[i].retreated) continue;
			if (ships1[i].HP/ships1[i].maxHP <= .25 && (!ships1[i].repairs||!ships1[i].repairs.length) && ships1[i] != retreater) return false;
		}
		if (ships1C) {
			for (var i=1; i<ships1C.length; i++) {
				if (ships1C[i].retreated) continue;
				if (ships1C[i].HP/ships1C[i].maxHP <= .25 && (!ships1C[i].repairs||!ships1C[i].repairs.length) && ships1C[i] != retreater) return false;
			}
		}
	}
	if (retreater && escorter) {
		retreater.retreated = escorter.retreated = true;
		retreater.fuelleft = escorter.fuelleft = 0;
	}
	return true;
}

function simStats(numsims,foptions) {
	// if (FLEET1.ships.length <= 0) return 1;
	// if (FLEET2.ships.length <= 0) return 2;
	var totalResult = {
		totalnum: numsims,
		totalFuelS: 0,
		totalAmmoS: 0,
		totalBauxS: 0,
		totalFuelR: 0,
		totalSteelR: 0,
		totalBuckets: 0,
		totalEmptiedPlanes: 0,
		totalEmptiedLBAS: 0,
		totalGaugeDamage: 0,
		nodes: []
	};
	for (var i=0; i<FLEETS2.length; i++) {
		totalResult.nodes.push({
			num: 0,
			didNB: 0, //used for rsammo calc
			redded: 0,
			redIndiv: [0,0,0,0,0,0],
			undamaged: 0,
			MVPs: [0,0,0,0,0,0],
			ranks: {S:0,A:0,B:0,C:0,D:0,E:0},
			flagsunk: 0,
			airStates: [0,0,0,0,0],
		});
	}
	
	if (FLEETS1S[2]) {
		for (let ship of FLEETS1S[2].ships) {
			let bonus = ship.bonusBTemp || ship.bonusTemp;
			if (bonus) ship.bonusSpecial = [{mod:bonus}];
			if (ship.bonusDTemp) {
				if (!ship.bonusSpecial) ship.bonusSpecial = [];
				ship.bonusSpecial.push({mod:ship.bonusDTemp,on:[FLEETS2[FLEETS2.length-1].ships[0].mid]});
			}
			if (ship.bonusAccTemp) {
				ship.bonusSpecialAcc = [{mod:ship.bonusAccTemp}];
				ship.bonusSpecialEv  = [{mod:ship.bonusAccTemp}];
			}
		}
	}
	
	//var BAPI = {data:{},yasen:{},mvp:[],rating:''};
	C = false;
	var formdef = FLEETS1[0].formation;
	for (var i=0; i<numsims; i++) {
		for (var j=0; j<FLEETS2.length; j++) {
			var options = foptions[j];
			for (let ship of FLEETS1[0].ships) {
				let bonus = (j==FLEETS2.length-1 && ship.bonusBTemp)? ship.bonusBTemp : ship.bonusTemp;
				if (bonus && options.bonus) ship.bonusSpecial = [{mod:bonus}];
				else ship.bonusSpecial = null;
				if (ship.bonusDTemp) {
					if (!ship.bonusSpecial) ship.bonusSpecial = [];
					ship.bonusSpecial.push({mod:ship.bonusDTemp,on:[FLEETS2[FLEETS2.length-1].ships[0].mid]});
				}
				if (ship.bonusAccTemp && options.bonus) {
					ship.bonusSpecialAcc = [{mod:ship.bonusAccTemp}];
					ship.bonusSpecialEv  = [{mod:ship.bonusAccTemp}];
				} else {
					ship.bonusSpecialAcc = null;
					ship.bonusSpecialEv  = null;
				}
			}
			FLEETS1[0].resetBattle();
			if (options.formation != '0') FLEETS1[0].formation = ALLFORMATIONS[options.formation];
			else FLEETS1[0].formation = formdef;
			var supportNum = 0;
			let friendFleet = null;
			if (j == FLEETS2.length - 1) {
				supportNum = 1;
				friendFleet = FLEETS1S[2];
				underwaySupply(FLEETS1[0]);
			}
			var LBASwaves = [];
			for (var k=0; k<options.lbas.length; k++) LBASwaves.push(LBAS[options.lbas[k]-1]);
			var res;
			if (FLEETS2[j].combinedWith) res = sim6vs12(FLEETS1[0],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo,null,false,friendFleet);
			else res = sim(FLEETS1[0],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo,null,false,friendFleet);
			totalResult.nodes[j].num++;
			if (res.redded) totalResult.nodes[j].redded++;
			for (var k=0; k<res.reddedIndiv.length; k++) if (res.reddedIndiv[k]) totalResult.nodes[j].redIndiv[k]++;
			if (res.undamaged) totalResult.nodes[j].undamaged++;
			if (res.flagsunk) totalResult.nodes[j].flagsunk++;
			totalResult.nodes[j].ranks[res.rank]++;
			totalResult.nodes[j].MVPs[res.MVP]++;
			totalResult.nodes[j].airStates[FLEETS1[0].AS+2]++;
			if (!canContinue(FLEETS1[0].ships)) break;
		}
		let flagshipFinal = FLEETS2[FLEETS2.length-1].ships[0];
		totalResult.totalGaugeDamage += flagshipFinal.maxHP - Math.max(0,flagshipFinal.HP);
		for (var j=0; j<FLEETS1[0].ships.length; j++) { //get refuel and repair costs
			var ship = FLEETS1[0].ships[j];
			var useBucket = ship.HP/ship.maxHP <= BUCKETPERCENT || getRepairTime(ship) > BUCKETTIME;
			if (!CARRYOVERHP || useBucket) {
				var r = getRepairCost(ship);
				totalResult.totalFuelR += r[0];
				totalResult.totalSteelR += r[1];
			}
			if (useBucket) totalResult.totalBuckets++;
			let fuelleft = ship.fuelleft - (ship._fuelUnderway || 0);
			let ammoleft = ship.ammoleft - (ship._ammoUnderway || 0);
			totalResult.totalFuelS += Math.floor(ship.fuel * (10-fuelleft)/10);
			totalResult.totalAmmoS += Math.floor(ship.ammo * (10-ammoleft)/10);
			for (var k=0; k<ship.PLANESLOTS.length; k++) {
				totalResult.totalBauxS += 5*(ship.PLANESLOTS[k]-ship.planecount[k]);
				if (ship.PLANESLOTS[k] && ship.planecount[k] <= 0) totalResult.totalEmptiedPlanes++;
			}
			totalResult.totalSteelR += ship.jetSteelCost || 0;
		}
		//support
		for (var s=0; s<=1; s++) {
			if (FLEETS1S[s]) {
				for (var j=0; j<FLEETS1S[s].ships.length; j++) {
					var shipS = FLEETS1S[s].ships[j];
					totalResult.totalFuelS += Math.floor(shipS.fuel * .5);
					if (FLEETS1S[s].supportType == 1) totalResult.totalAmmoS += Math.floor(shipS.ammo * .4);
					else totalResult.totalAmmoS += Math.floor(shipS.ammo * .8);
					for (var k=0; k<shipS.PLANESLOTS.length; k++) totalResult.totalBauxS += 5*(shipS.PLANESLOTS[k]-shipS.planecount[k]);
					totalResult.totalSteelR += shipS.jetSteelCost || 0;
				}
				FLEETS1S[s].reset();
			}
		}
		//lbas
		var alllbas = [];
		for (var j=0; j<foptions.length; j++) {
			for (var k=0; k<foptions[j].lbas.length; k++) {
				if (alllbas.indexOf(foptions[j].lbas[k]) == -1) alllbas.push(foptions[j].lbas[k]);
			}
		}
		for (var j=0; j<alllbas.length; j++) {
			var cost = LBAS[alllbas[j]-1].getCost();
			totalResult.totalFuelS += cost[0];
			totalResult.totalAmmoS += cost[1];
			totalResult.totalBauxS += cost[2];
			for (let eq of LBAS[alllbas[j]-1].equips) {
				if (eq.rank <= 0 && eq.rank != eq.rankInit) totalResult.totalEmptiedLBAS++; //doesn't count rankInit = 0
			}
			LBAS[alllbas[j]-1].reset();
		}
		
		if (CARRYOVERHP || CARRYOVERMORALE) {
			for (var j=0; j<FLEETS1.length; j++) {
				FLEETS1[j].reset(true);
				for (var k=0; k<FLEETS1[j].ships.length; k++) {
					var ship = FLEETS1[j].ships[k];
					var notHP = CARRYOVERHP && ship.HP/ship.maxHP > BUCKETPERCENT && getRepairTime(ship) <= BUCKETTIME;
					ship.reset(notHP, CARRYOVERMORALE);
					if (CARRYOVERMORALE) ship.morale = Math.max(49, ship.morale - 15);
				}
			}
		} else {
			for (var j=0; j<FLEETS1.length; j++) FLEETS1[j].reset();
		}
		for (var j=0; j<FLEETS2.length; j++) {
			FLEETS2[j].reset();
			if (FLEETS2[j].combinedWith) FLEETS2[j].combinedWith.reset();
		}
	}
	
	updateResults(totalResult);
	
	console.log(totalResult);

	
	return 0;
}


function simLBRaid(F1,F2,BAPI) {
	var ships1 = F1.ships, ships2 = F2.ships;
	if (C) {
		var dataroot = BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,1];
		dataroot.api_deck_id = 1;
		dataroot.api_maxhps = [-1];
		dataroot.api_nowhps = [-1];
		for (var i=0; i<6; i++) {
			dataroot.api_nowhps.push((i<ships1.length)? ships1[i].HP : -1);
			dataroot.api_maxhps.push((i<ships1.length)? ships1[i].maxHP : -1);
		}
		dataroot.api_ship_ke = [];
		dataroot.api_eSlot = [];
		for (var i=0; i<6; i++) {
			dataroot.api_ship_ke.push((i<ships2.length)? ships2[i].mid : -1);
			dataroot.api_nowhps.push((i<ships2.length)? ships2[i].HP : -1);
			dataroot.api_maxhps.push((i<ships2.length)? ships2[i].maxHP : -1);
			dataroot.api_eSlot.push([]);
			for (var j=0; j<5; j++)
				dataroot.api_eSlot[i].push((i<ships2.length && j<ships2[i].equips.length)? ships2[i].equips[j].mid : -1);	
		}
	}
	
	if (C) {
		// var APIkouku = BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		var APIkouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		BAPI.data.api_air_base_attack = [APIkouku];
	}
	
	var ap1 = 0; for (let ship of ships1) if (ship.lbas) ap1 += ship.lbas.airPowerDefend();
	if (F2.ships.find(ship => ship.equips.find(eq => eq.highAltitude)) || F2.highAltitude) {
		let numRocket = 0;
		for (let ship of ships1) {
			if (ship.lbas) numRocket += ship.lbas.equips.filter(eq => eq.isRocket).length;
		}
		if (numRocket >= 3) {
			ap1 *= 1.2;
		} else if (numRocket == 2) {
			ap1 *= 1.1;
		} else if (numRocket == 1) {
			ap1 *= .8;
		} else {
			ap1 *= .5;
		}
		ap1 = Math.floor(ap1);
	}
	var ap2 = F2.fleetAirPower('isPlane');
	if (ap1 == 0 && ap2 == 0) { F1.AS = F2.AS = 0; }
	else if (ap1 >= ap2*3) { F1.AS = 2; F2.AS = -2; }
	else if (ap1 >= ap2*1.5) { F1.AS = 1; F2.AS = -1; }
	else if (ap2 >= ap1*3) { F1.AS = -2; F2.AS = 2; }
	else if (ap2 >= ap1*1.5) { F1.AS = -1; F2.AS = 1; }
	else { F1.AS = F2.AS = 0; }
	// console.log(F1.AS + ' ' + F2.AS);
	// console.log(ap1 + ' ' + ap2);
	
	if (C) {
		APIkouku.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0,api_touch_plane:[-1,-1]};
		APIkouku.api_stage2 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0};
		APIkouku.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_fbak_flag:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0],api_fcl_flag:[-1,0,0,0,0,0,0]};
		APIkouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
	}
	
	//fighter defence
	var lbas1 = [];
	for (let i=0; i<ships1.length; i++) {
		if (ships1[i].lbas) {
			lbas1.push(ships1[i].lbas);
			ships1[i].lbas.apiID2 = i+1;
		}
	}
	for (let lbas of lbas1) lbas.AS = F1.AS;
	AADefenceFighters(lbas1,true,APIkouku,'isPlane');
	for (let ship of ships2) {
		let lbSlot = 0, hasfighter;
		for (let j=0; j<ship.equips.length; j++) {
			if (ship.equips[j].isPlane) {
				hasfighter = true;
				let interceptor = null;
				for (; lbSlot < 4; lbSlot++) {
					for (let k=0; k<lbas1.length; k++) {
						let equip = lbas1[k].equips[lbSlot];
						if (!equip) continue;
						if (lbas1[k].planecount[lbSlot]) {
							var currentACC = (interceptor)? interceptor.ACC || 0 : 0;
							var currentEV = (interceptor)? interceptor.EV || 0 : 0;
							if (equip.type == INTERCEPTOR && (equip.ACC > currentACC || (equip.ACC == currentACC && equip.EV > currentEV))) interceptor = equip;
						}
					}
					if (interceptor) break;
				}
				lbSlot++;
				let airStateMod = [1, 4, 6, 8, 10][F1.AS + 2] || 6;
				let antiBomber = 0, intercept = 0;
				if (interceptor) {
					antiBomber = interceptor.ACC || 0;
					intercept = interceptor.EV || 0;
				}
				let sRatio = 6.5*airStateMod + 3.5*(antiBomber + airStateMod*Math.min(1,intercept) + Math.random()*(airStateMod+antiBomber));
				let lostcount = Math.ceil(ship.planecount[j]*sRatio/100);
				if (C) {
					APIkouku.api_stage1[(ship.side)? 'api_e_count':'api_f_count'] += ship.planecount[j];
					APIkouku.api_stage1[(ship.side)? 'api_e_lostcount':'api_f_lostcount'] += lostcount;
					console.log('slot: '+lbSlot+' ratio: '+sRatio+' lost: '+lostcount+'/'+ship.planecount[j]);
					console.log(interceptor);
				}
				ship.planecount[j] -= lostcount;
				if (ship.planecount[j] < 0) ship.planecount[j] = 0;
			}
		}
		// if (C && hasfighter && ship.apiID2) APIkouku.api_plane_from[ship.side].push(ship.apiID2);
	}
	
	//airstrike
	var contactMod = 1;
	if (ships2[0].airState() != -2 && ships2[0].airState() != 0) {
		var contactdata = getContact(ships2);
		if (contactdata) {
			contactMod = contactdata.mod;
			if (C) APIkouku.api_stage1.api_touch_plane[1] = contactdata.id;
		}
	}
	for (let ship of ships2) {
		for (let slot=0; slot<ship.equips.length; slot++) {
			if (ship.planecount[slot] <= 0) continue;
			let equip = ship.equips[slot];
			if (!equip.isdivebomber && !equip.istorpbomber) continue;
			var target = ships1[Math.floor(Math.random()*ships1.length)];
			var dmg = airstrike(ship,target,slot,contactMod);
			if (target.HP <= 0) {
				dmg -= 1 - target.HP;
				target.HP = 1;
			}
			if (C) {
				APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
				APIkouku.api_stage3[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
				if (ship.equips[slot].istorpbomber) APIkouku.api_stage3[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
				else APIkouku.api_stage3[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
			}
		}
	}
	
	
	if (C) {
		for (var i=0; i<2; i++)
			if (APIkouku && APIkouku.api_plane_from[i].length > 1)
				APIkouku.api_plane_from[i] = APIkouku.api_plane_from[i].slice(1);
		
		APIkouku.api_squadron_plane = [];
		for (let lbas of lbas1) {
			for (let i=0; i<lbas.equips.length; i++) {
				APIkouku.api_squadron_plane.push({ api_mst_id: lbas.equips[i].mid, api_count: lbas.planecount[i] });
			}
		}
	}
}

function getNightEquips(alive1,alive2,APIyasen) {
	APIyasen.api_flare_pos = [-1,-1]; APIyasen.api_touch_plane = [-1,-1];
	var star1 = false;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		let off = (NEWFORMAT)? -1 : 0;
		if (alive1[i].hasStarShell && alive1[i].HP > 4 && Math.random() < .7) { star1 = true; if (C) APIyasen.api_flare_pos[0] = alive1[i].num+off; break; }
	}
	var star2 = false;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		let off = (NEWFORMAT)? -1 : 0;
		if (alive2[i].hasStarShell && alive2[i].HP > 4 && Math.random() < .7) { star2 = true; if (C) APIyasen.api_flare_pos[1] = alive2[i].num+off; break; }
	}
	var light1 = false, lightship1 = 0, slrerolls1 = 0;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		if (alive1[i].hasSearchlight) { light1 = true; lightship1 = i; slrerolls1 = alive1[i].hasSearchlight; break; }
	}
	var light2 = false, lightship2 = 0, slrerolls2 = 0;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		if (alive2[i].hasSearchlight) { light2 = true; lightship2 = i; slrerolls2 = alive2[i].hasSearchlight; break; }
	}
	var scout1 = false;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		if (alive1[i].hasNightScout && Math.random() < Math.floor(Math.sqrt(alive1[i].LVL)*Math.sqrt(3))/25) { scout1 = true; if (C) APIyasen.api_touch_plane[0] = 102; break; }
	}
	var scout2 = false;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		if (alive2[i].hasNightScout && Math.random() < Math.floor(Math.sqrt(alive2[i].LVL)*Math.sqrt(3))/25) { scout2 = true; if (C) APIyasen.api_touch_plane[1] = 102; break; }
	}
	return [[star1,star2],[light1,light2],[scout1,scout2],[slrerolls1,slrerolls2]];
}

function simNightFirstCombined(F1,F2,Fsupport,LBASwaves,BAPI) {
	var F2C = F2.combinedWith;
	var ships1 = F1.ships, ships2 = F2.ships, ships2C = F2C.ships;
	var alive1 = [], alive2 = [], alive2C = [], subsalive1 = [], subsalive2 = [], subsalive2C = [];
	var hasInstall1 = false, hasInstall2 = false, hasInstall2C = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP <= 0) continue;
		if (ships1[i].retreated) continue;
		if(ships1[i].isSub) subsalive1.push(ships1[i]);
		else alive1.push(ships1[i]);
		ships1[i].HPprev = ships1[i].HP;
		if (!MECHANICS.morale) ships1[i].morale = 49;
		if (ships1[i].isInstall) hasInstall1 = true;
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].HP <= 0) continue;
		if (ships2[i].retreated) continue;
		if(ships2[i].isSub) subsalive2.push(ships2[i]);
		else alive2.push(ships2[i]);
		ships2[i].HPprev = ships2[i].HP;
		if (!MECHANICS.morale) ships2[i].morale = 49;
		if (ships2[i].isInstall) hasInstall2 = true;
	}
	for (var i=0; i<ships2C.length; i++) {
		if (ships2C[i].HP <= 0) continue;
		if (ships2C[i].retreated) continue;
		if(ships2C[i].isSub) subsalive2C.push(ships2C[i]);
		else alive2C.push(ships2C[i]);
		ships2C[i].HPprev = ships2C[i].HP;
		if (!MECHANICS.morale) ships2C[i].morale = 49;
		if (ships2C[i].isInstall) hasInstall2C = true;
	}
	
	var r = Math.random();
	if (r < .45) ENGAGEMENT = 1;
	else if (r < .6) ENGAGEMENT = 1.2;
	else if (r < .9 || F1.noRedT || F2.noRedT || F2C.noRedT) ENGAGEMENT = .8;
	else ENGAGEMENT = .6;
	
	F1.AS = F2.AS = F2C.AS = 0;
	
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		dataroot.api_dock_id = 1;
		var retreatlist = [];
		for (var i=0; i<ships1.length; i++) if (ships1[i].retreated) retreatlist.push(i+1);
		if (retreatlist.length) dataroot.api_escape_idx = retreatlist;
		dataroot.api_f_maxhps = []; dataroot.api_f_nowhps = [];
		dataroot.api_e_maxhps = []; dataroot.api_e_nowhps = [];
		dataroot.api_e_maxhps_combined = []; dataroot.api_e_nowhps_combined = [];
		for (let ship of ships1) {
			dataroot.api_f_nowhps.push(ship.HP);
			dataroot.api_f_maxhps.push(ship.maxHP);
		}
		dataroot.api_ship_ke = [];
		dataroot.api_ship_ke_combined = [];
		dataroot.api_eSlot = [];
		dataroot.api_eSlot_combined = [];
		for (var i=0; i<6; i++) {
			dataroot.api_ship_ke.push((i<ships2.length)? ships2[i].mid : -1);
			dataroot.api_e_nowhps.push((i<ships2.length)? ships2[i].HP : -1);
			dataroot.api_e_maxhps.push((i<ships2.length)? ships2[i].maxHP : -1);
			dataroot.api_eSlot.push([]);
			for (var j=0; j<5; j++)
				dataroot.api_eSlot[i].push((i<ships2.length && j<ships2[i].equips.length)? ships2[i].equips[j].mid : -1);
		}
		for (var i=0; i<6; i++) {
			dataroot.api_ship_ke_combined.push((i<ships2C.length)? ships2C[i].mid : -1);
			dataroot.api_e_nowhps_combined.push((i<ships2C.length)? ships2C[i].HP : -1);
			dataroot.api_e_maxhps_combined.push((i<ships2C.length)? ships2C[i].maxHP : -1);
			dataroot.api_eSlot_combined.push([]);
			for (var j=0; j<5; j++)
				dataroot.api_eSlot_combined[i].push((i<ships2C.length && j<ships2C[i].equips.length)? ships2C[i].equips[j].mid : -1);
		}
	}
	
	if (Fsupport && MECHANICS.LBASBuff && Fsupport.supportType != 1 && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) {
			supportPhase(Fsupport.ships,alive2.concat(alive2C),subsalive2.concat(subsalive2C),Fsupport.supportType,BAPI,Fsupport.supportBoss);
			BAPI.data.api_n_support_flag = BAPI.data.api_support_flag;
			BAPI.data.api_n_support_info = BAPI.data.api_support_info;
			delete BAPI.data.api_support_flag; delete BAPI.data.api_support_info;
			removeSunk(alive2); removeSunk(subsalive2);
			removeSunk(alive2C); removeSunk(subsalive2C);
		}
	}
	
	var APIyasen = BAPI.data;
	var nightEquips = getNightEquips(alive1,alive2,APIyasen);
	
	if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		APIyasen.api_n_hougeki1 = {api_at_eflag:[],api_at_list:[],api_damage:[],api_df_list:[],api_sp_list:[],api_cl_list:[],api_n_mother_list:[],api_si_list:[]};
		var order1 = [], order2 = [];
		orderByRange(alive1.concat(subsalive1),order1,true,true);
		orderByRange(alive2C.concat(subsalive2C),order2,true,true);
		nightPhaseCombined(order1,order2,alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),nightEquips,APIyasen.api_n_hougeki1);
		removeSunk(alive1); removeSunk(subsalive1);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}
	
	if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		APIyasen.api_n_hougeki2 = {api_at_eflag:[],api_at_list:[],api_damage:[],api_df_list:[],api_sp_list:[],api_cl_list:[],api_n_mother_list:[],api_si_list:[]};
		var order1 = [], order2 = [];
		orderByRange(alive1.concat(subsalive1),order1,true,true);
		orderByRange(alive2.concat(subsalive2),order2,true,true);
		nightPhaseCombined(order1,order2,alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),nightEquips,APIyasen.api_n_hougeki2);
		removeSunk(alive1); removeSunk(subsalive1);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}
	
	var count = 0, allsunk = true;
	for (var i=0; i<ships2.length; i++) if (ships2[i].HP > 0) { allsunk = false; break; }
	for (var i=0; i<ships2C.length; i++) {
		if (ships2C[i].HP/ships2C[i].maxHP > .5) count++;
	}
	var doDay = !allsunk && count <= 3;
	
	APIyasen.api_day_flag = 0;
	if (doDay && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		APIyasen.api_day_flag = 1;
		let BAPIDay = {data:{}};
		sim(F1,F2,Fsupport,LBASwaves,false,false,false,false,false,BAPIDay,true,null,true);
		for (let key in BAPIDay.data) {
			if (!APIyasen[key]) APIyasen[key] = BAPIDay.data[key];
		}
		BAPI.data.api_formation[2] = {1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT];
	}
	
	var results = {};
	results.rankDay = results.rank = getRank(ships1,ships2.concat(ships2C));
	results.redded = false;
	results.flagredded = (ships1[0].HP/ships1[0].maxHP <= .25);
	results.reddedIndiv = [false,false,false,false,false];
	results.flagsunk = (ships2[0].HP <= 0);
	results.undamaged = true;
	results.buckets = 0;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP/ships1[i].maxHP <= .25) {
			results.redded = true;
			results.reddedIndiv[i] = true;
			if (!ships1[i].isflagship) ships1[i].protection = false;
		}
		if (ships1[i].HP/ships1[i].maxHP <= .5) results.undamaged = false;
		if (ships1[i].HP/ships1[i].maxHP <= BUCKETPERCENT || getRepairTime(ships1[i]) > BUCKETTIME) results.buckets++;
	}
	results.mvpDay = results.MVP = F1.getMVP();
	
	return results;
}

function nightPhaseCombined(order1,order2,alive1,subsalive1,alive2,subsalive2,nightEquips,APIhou) {
	let numRounds = Math.max(order1.length,order2.length);
	for (var i=0; i<numRounds; i++) {
		if (i < order1.length && order1[i].canNB()) {
			//does not pick fleet first, escorts can protect main flag
			if (subsalive2.length && order1[i].canASWNight() && (!order1[i].canNBAirAttack() || alive2.length <= 0)) {
				var target = choiceWProtect(subsalive2);
				ASW(order1[i],target,false,APIhou);
				removeSunk(subsalive2);
			} else if (alive2.length) {
				var target = choiceWProtect(alive2,nightEquips[3][1]);
				NBattack(order1[i],target,false,nightEquips,APIhou);
				removeSunk(alive2);
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canNB()) {
			if (subsalive1.length && order2[i].canASWNight() && (!order2[i].canNBAirAttack() || alive1.length <= 0)) {
				var target = choiceWProtect(subsalive1);
				ASW(order2[i],target,false,APIhou);
				removeSunk(subsalive1);
			} else if (alive1.length) {
				var target = choiceWProtect(alive1,nightEquips[3][0]);
				NBattack(order2[i],target,false,nightEquips,APIhou);
				removeSunk(alive1);
			}
		}
		if (alive1.length+subsalive1.length <= 0) break;
	}
}

function apiGetFriendlyInfo(ships) {
	let info = {
		api_production_type: 1,
		api_ship_id: [],
		api_ship_lv: [],
		api_nowhps: [],
		api_maxhps: [],
		api_Slot: [],
		api_voice_id: [],
		api_voice_p_no: [],
	};
	for (let ship of ships) {
		info.api_ship_id.push(ship.mid);
		info.api_ship_lv.push(ship.LVL);
		info.api_nowhps.push(ship.HP);
		info.api_maxhps.push(ship.maxHP);
		let equips = [];
		for (let equip of ship.equips) equips.push(equip.mid);
		info.api_Slot.push(equips);
		if (ship.voiceFriend) {
			info.api_voice_id.push(ship.voiceFriend[0]);
			info.api_voice_p_no.push(ship.voiceFriend[1]);
		} else {
			info.api_voice_id.push(141);
			info.api_voice_p_no.push(0);
		}
	}
	return info;
}

function friendFleetPhase(fleet1,fleet2,alive2,subsalive2,BAPI) {
	if (!BAPI) BAPI = { yasen: {} };
	var APIyasen = BAPI.yasen;
	APIyasen.api_friendly_info = apiGetFriendlyInfo(fleet1.ships);
	
	APIyasen.api_friendly_battle = {};
	var nightEquips = getNightEquips(fleet1.ships,alive2,APIyasen.api_friendly_battle);
	
	let APIhou = APIyasen.api_friendly_battle.api_hougeki = {api_at_eflag:[],api_at_list:[],api_damage:[],api_df_list:[],api_sp_list:[],api_cl_list:[],api_n_mother_list:[],api_si_list:[]};
	
	let ind1 = 0; ind2 = 0;
	let ships1 = fleet1.ships, ships2 = (fleet2.combinedWith)? fleet2.combinedWith.ships.concat(fleet2.ships) : fleet2.ships;
	let alive1 = [], subsalive1 = [];
	for (let ship of ships1) {
		if (ship.isSub) subsalive1.push(ship);
		else alive1.push(ship);
	}
	for (let i=0; i<ships1.length; i++) {
		if (ind1 < ships1.length) {
			let attacker = ships1[ind1];
			if (attacker.canNB()) {
				if (alive2.length + subsalive2.length == 1) { //friend fleet can't sink all
					let ship = (alive2.length)? alive2[0] : subsalive2[0];
					ship.protection = true;
					ship.protectionFF = true;
				}
				let target = nightPhaseTarget(attacker,alive2,subsalive2,nightEquips[3][1],nightEquips[1][1]).target;
				if (target) {
					if (target.isSub) {
						ASW(attacker,target,false,APIhou);
						removeSunk(subsalive2);
					} else {
						NBattack(attacker,target,false,nightEquips,APIhou);
						removeSunk(alive2);
					}
				}
			}
			ind1++;
		}
		if (ind1 >= ships1.length || alive2.length + subsalive2.length <= 0) break;
		
		for (; ind2<ships2.length; ind2++) { //enemy always skips to next capable
			if (ships2[ind2].canNB() && (ships2[ind2].nightattack != 3 || nightEquips[1][0] || subsalive1.length)) { break; }
		}
		if (ind2 < ships2.length) {
			let attacker = ships2[ind2];
			let target = nightPhaseTarget(attacker,alive1,subsalive1,nightEquips[3][0],true).target;
			if (target) {
				if (target.isSub) {
					ASW(attacker,target,false,APIhou);
					removeSunk(subsalive1);
				} else {
					NBattack(attacker,target,false,nightEquips,APIhou);
					removeSunk(alive1);
				}
			}
			ind2++;
		}
		
		if (alive1.length + subsalive1.length <= 0) break;
	}
	
	for (let ship of ships2) {
		ship.protection = false;
		delete ship.protectionFF;
	}
}

function formatRemovePadding(obj) {
	for (let key in obj) {
		if (Array.isArray(obj[key])) obj[key].shift();
	}
}

function chLoadFriendFleet(friendData) {
	let fleet = new Fleet(0);
	let simShips = [];
	for (let ship of friendData.ships) {
		let sdata = SHIPDATA[ship.mid];
		let ShipType = window[sdata.type];
		let ev = sdata.EVbase + Math.floor((sdata.EV - sdata.EVbase)*ship.LVL/99);
		let asw = sdata.ASWbase + Math.floor((sdata.ASW - sdata.ASWbase)*ship.LVL/99);
		let los = sdata.LOSbase + Math.floor((sdata.LOS - sdata.LOSbase)*ship.LVL/99);
		let simShip = new ShipType(ship.mid,'',0,ship.LVL,sdata.HP,ship.FP,ship.TP,ship.AA,ship.AR,ev,asw,los,sdata.LUK,sdata.RNG,sdata.SLOTS);
		simShip.loadEquips(ship.equips,[],[],true);
		
		if (ship.damage) {
			let percent = ship.damage[0] + Math.random()*(ship.damage[1]-ship.damage[0]);
			simShip.HP = Math.floor(simShip.HP*percent);
		}
		simShips.push(simShip);
		
		// if (ship.mid == friendData.voice[0]) simShip.voiceFriend = [friendData.voice[1],1];
	}
	fleet.loadShips(simShips);
	fleet.formation = LINEAHEAD;
	return fleet;
}

//extra
var DetectionResult = {
	'Success': 1,
	'SuccessLost': 2,
	'FailureLost': 3,
	'Failure': 4,
	'Found': 5,
	'NotFound': 6
};
function getDetection(shipsF,shipsE) {
	let weights = [2,5,8,8,8,8], ind = 0;
	let weightedLOS = 0, numReconSlots = 0, numCarriers = 0, numShips = 0, reconSlots = [];
	for (let ship of shipsF) {
		if (ship.HP <= 0 || ship.retreated) continue;
		weightedLOS += ship.LOS/weights[ind++] || 0;
		for (let i=0; i<ship.equips.length; i++) {
			if (ship.planecount[i] <= 0) continue;
			let eq = ship.equips[i];
			if ([CARRIERSCOUT,SEAPLANE,SEAPLANEBOMBER,FLYINGBOAT].indexOf(eq.type) != -1) {
				numReconSlots += ship.planecount[i];
				if (eq.rank >= 7) numReconSlots += 30;
				else if (eq.rank >= 4) numReconSlots += 15;
				else if (eq.rank >= 2) numReconSlots += 5;
				reconSlots.push({ ship: ship, slot: i });
				if (!eq.lostnums) eq.lostnums = [];
				eq.lostnums.push(0);
			}
		}
		if (['CV','CVL','CVB'].indexOf(ship.type) != -1) numCarriers++;
		numShips++;
	}
	if (numCarriers) numReconSlots += 20 + 10*numCarriers;
	let numShipBonus = Math.max(0,numShips - 2);
	
	let numFighterSlots = 0, defence = 0;
	for (let ship of shipsE) {
		if (ship.HP <= 0 || ship.retreated) continue;
		for (let i=0; i<ship.equips.length; i++) {
			if (ship.equips[i].type == FIGHTER) numFighterSlots += ship.planecount[i];
		}
	}
	if (numFighterSlots) {
		if (numFighterSlots <= 30) defence = 1 + numFighterSlots/9;
		else if (numFighterSlots <= 120) defence = 2 + numFighterSlots/20;
		else defence = 6 + (numFighterSlots-120)/40;
	}
	
	let detectVal = weightedLOS + numShipBonus - 20 + Math.floor(Math.sqrt(10*numReconSlots));
	let shotdownVal = numReconSlots - Math.floor(defence*(1 + .1*Math.floor(Math.random()*5)));
	
	if (shotdownVal <= 0) {
		for (let recon of reconSlots) {
			let num = Math.min(recon.ship.planecount[recon.slot], Math.floor(Math.random()*3));
			recon.ship.planecount[recon.slot] -= num;
		}
	}
	
	let r = Math.floor(Math.random()*20);
	if (r <= detectVal) {
		if (numReconSlots <= 0) return DetectionResult.Found;
		return (shotdownVal <= 0)? DetectionResult.SuccessLost : DetectionResult.Success;
	}
	if (numReconSlots <= 0) return DetectionResult.NotFound;
	return (shotdownVal <= 0)? DetectionResult.Failure : DetectionResult.FailureLost;
}