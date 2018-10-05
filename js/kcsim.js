var LINEAHEAD = {shellmod:1,torpmod:1,ASWmod:.6,AAmod:1, shellacc:1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:1};
var DOUBLELINE = {shellmod:.8,torpmod:.8,ASWmod:.8,AAmod:1.2, shellacc:1.2,torpacc:.8,NBacc:.9, shellev:1,torpev:1,NBev:1,ASWev:1, id:2};
var DIAMOND = {shellmod:.7,torpmod:.7,ASWmod:1.2,AAmod:1.6, shellacc:1,torpacc:.4,NBacc:.7, shellev:1.1,torpev:1.1,NBev:1,ASWev:1, id:3};
var ECHELON = {shellmod:.6,torpmod:.6,ASWmod:1,AAmod:1, shellacc:1.2,torpacc:.6,NBacc:.8, shellev:1.2,torpev:1.3,NBev:1.1,ASWev:1.3, id:4};
var LINEABREAST = {shellmod:.6,torpmod:.6,ASWmod:1.3,AAmod:1, shellacc:1.2,torpacc:.3,NBacc:.8, shellev:1.3,torpev:1.4,NBev:1.2,ASWev:1.1, id:5};

var CTFCOMBINED1M = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:2,shellbonusE:10,accbase:90, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:0, id:11};
var CTFCOMBINED1E = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:10,shellbonusE:5,accbase:55, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.35, id:11};
var CTFCOMBINED2M = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:2,shellbonusE:10,accbase:90, shellacc:.9,torpacc:.9,NBacc:1, shellev:1.1,torpev:1,NBev:1,ASWev:1, shellaccflat:0, id:12};
var CTFCOMBINED2E = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:10,shellbonusE:5,accbase:55, shellacc:1,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.35, id:12};
var CTFCOMBINED3M = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:2,shellbonusE:10,accbase:90, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:0, id:13};
var CTFCOMBINED3E = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:10,shellbonusE:5,accbase:55, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.35, id:13};
var CTFCOMBINED4M = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:2,shellbonusE:10,accbase:90, shellacc:1,torpacc:1,NBacc:1, shellev:.9,torpev:1,NBev:1,ASWev:1, shellaccflat:0, id:14};
var CTFCOMBINED4E = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:10,shellbonusE:5,accbase:55, shellacc:1,torpacc:1,NBacc:1, shellev:.9,torpev:1,NBev:1,ASWev:1, shellaccflat:-.35, id:14};

var STFCOMBINED1M = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:10,shellbonusE:5,accbase:50, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.4, id:11};
var STFCOMBINED1E = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:-5,shellbonusE:-5,accbase:75, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.15, id:11};
var STFCOMBINED2M = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:10,shellbonusE:5,accbase:50, shellacc:1.2,torpacc:.9,NBacc:1, shellev:1.1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.4, id:12};
var STFCOMBINED2E = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:-5,shellbonusE:-5,accbase:75, shellacc:1.2,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.15, id:12};
var STFCOMBINED3M = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:10,shellbonusE:5,accbase:50, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.4, id:13};
var STFCOMBINED3E = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:-5,shellbonusE:-5,accbase:75, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.15, id:13};
var STFCOMBINED4M = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:10,shellbonusE:5,accbase:50, shellacc:1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.4, id:14};
var STFCOMBINED4E = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:-5,shellbonusE:-5,accbase:75, shellacc:1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.15, id:14};

var TTFCOMBINED1M = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:-5,shellbonusE:10,accbase:50, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.4, id:11};
var TTFCOMBINED1E = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:10,shellbonusE:5,accbase:75, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:0, id:11};
var TTFCOMBINED2M = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:-5,shellbonusE:10,accbase:50, shellacc:1.2,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.4, id:12};
var TTFCOMBINED2E = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:10,shellbonusE:5,accbase:75, shellacc:1.2,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:0, id:12};
var TTFCOMBINED3M = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:-5,shellbonusE:10,accbase:50, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.4, id:13};
var TTFCOMBINED3E = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:10,shellbonusE:5,accbase:75, shellacc:1,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:0, id:13};
var TTFCOMBINED4M = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:-5,shellbonusE:10,accbase:50, shellacc:1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:-.4, id:14};
var TTFCOMBINED4E = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:10,shellbonusE:5,accbase:75, shellacc:1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, shellaccflat:0, id:14};

var ALLFORMATIONS = {1:LINEAHEAD,2:DOUBLELINE,3:DIAMOND,4:ECHELON,5:LINEABREAST,
	'111':CTFCOMBINED1M,'111E':CTFCOMBINED1E,'112':CTFCOMBINED2M,'112E':CTFCOMBINED2E,'113':CTFCOMBINED3M,'113E':CTFCOMBINED3E,'114':CTFCOMBINED4M,'114E':CTFCOMBINED4E,
	'211':STFCOMBINED1M,'211E':STFCOMBINED1E,'212':STFCOMBINED2M,'212E':STFCOMBINED2E,'213':STFCOMBINED3M,'213E':STFCOMBINED3E,'214':STFCOMBINED4M,'214E':STFCOMBINED4E,
	'311':TTFCOMBINED1M,'311E':TTFCOMBINED1E,'312':TTFCOMBINED2M,'312E':TTFCOMBINED2E,'313':TTFCOMBINED3M,'313E':TTFCOMBINED3E,'314':TTFCOMBINED4M,'314E':TTFCOMBINED4E,
};

var AACIDATA = {
	1:{num:7,rate:.65,mod:1.75},
	2:{num:6,rate:.58,mod:1.7},
	3:{num:4,rate:.5,mod:1.6},
	4:{num:6,rate:.52,mod:1.5},
	5:{num:4,rate:.55,mod:1.55},
	6:{num:4,rate:.4,mod:1.5},
	7:{num:3,rate:.45,mod:1.35},
	8:{num:4,rate:.5,mod:1.45},
	9:{num:2,rate:.4,mod:1.3},
	10:{num:8,rate:.6,mod:1.65},
	11:{num:6,rate:.55,mod:1.5},
	12:{num:3,rate:.45,mod:1.25},
	// 13:{num:4,rate:.35,mod:1.35},
	14:{num:4,rate:.58,mod:1.45},
	15:{num:3,rate:.58,mod:1.3},
	16:{num:4,rate:.5,mod:1.4},
	17:{num:2,rate:.5,mod:1.25},
	18:{num:2,rate:.6,mod:1.2},
	19:{num:5,rate:.4,mod:1.45},
	20:{num:3,rate:.5,mod:1.25},
	21:{num:5,rate:.6,mod:1.45},
	22:{num:2,rate:.6,mod:1.2},
	23:{num:1,rate:.6,mod:1.05},
	24:{num:3,rate:.6,mod:1.25},
	25:{num:7,rate:.6,mod:1.55},
	26:{num:8,rate:.6,mod:1.4},
	28:{num:4,rate:.6,mod:1.4},
	29:{num:5,rate:.6,mod:1.55},
	30:{num:3,rate:.6,mod:1.3},
	31:{num:2,rate:.6,mod:1.2},
	32:{num:3,rate:.6,mod:1.2},
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
}

var NBATTACKDATA = {
	1: { dmgMod: 1.2, accMod: 1.1, chanceMod: 0, numHits: 2, name: 'DA' },
	2: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.15, numHits: 2, torpedo: true, name: 'Mixed CI' },
	3: { dmgMod: 1.5, accMod: 1.65, chanceMod: 1.22, numHits: 2, torpedo: true, name: 'Torpedo CI' },
	4: { dmgMod: 1.75, accMod: 1.5, chanceMod: 1.3, name: 'Sec. Gun CI' },
	5: { dmgMod: 2, accMod: 2, chanceMod: 1.4, name: 'Main Gun CI' },
	61: { dmgMod: 1.25, accMod: 1.25, chanceMod: 1.25, id: 6, name: 'CVCI (1.25)' },
	62: { dmgMod: 1.2, accMod: 1.2, chanceMod: 1.3, id: 6, name: 'CVCI (1.2)' },
	63: { dmgMod: 1.18, accMod: 1.2, chanceMod: 1.4, id: 6, name: 'CVCI (1.18)' },
	7: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.5, torpedo: true, name: 'DDCI (GTR)' },
	8: { dmgMod: 1.2, accMod: 1.65, chanceMod: 1.8, torpedo: true, name: 'DDCI (LTR)' },
}

var FLEETS1 = [];
var FLEETS2 = [];
var FLEETS1S = [null,null];
var LBAS = [null,null,null];
var ENGAGEMENT = 1;
const CRITMOD = 1.5;
var SHELLDMGBASE = 180;
var ASWDMGBASE = 150;
var FIXTORPEDOSUPPORT = false;
var SIMCONSTS = {
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
}
function setConst(key, val) {
	if (val == null) SIMCONSTS[key] = null;
	else SIMCONSTS[key] = parseInt(val);
}

var BUCKETPERCENT = 0;
var BUCKETTIME = 99*3600;

var C = true;
var DIDPROTECT = false;

var MECHANICS = {
	artillerySpotting: true,
	OASW: true,
	AACI: true,
	fitGun: true,
	morale: true,
	fixFleetAA: true,
	CVCI: true,
	destroyerNBCI: true,
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

function shell(ship,target,APIhou) {
	var da = false, cutin = false;
	var preMod = ship.fleet.formation.shellmod*ENGAGEMENT*ship.damageMod();
	var postMod = ship.APmod(target);
	var overrideCritDmgBonus = null, critRateBonus = null;
	
	var accMod = ship.moraleMod();
	if (!formationCountered(ship.fleet.formation.id,target.fleet.formation.id)) accMod *= ship.fleet.formation.shellacc;
	
	var accMod2 = ship.APacc(target);
	var evMod = target.fleet.formation.shellev;
	
	if (MECHANICS.artillerySpotting && ship.canAS() && ship.fleet.AS > 0) {
		var ASchance = ship.ASchance(ship.fleet.AS);
		if (C) console.log('AS chance: '+ASchance);
		
		var AStypes = ship.AStype();
		for (var i=0; i<AStypes.length; i++) {
			if (da || cutin) break;
			let attackData = ARTILLERYSPOTDATA[AStypes[i]];
			if (Math.random() < ASchance/attackData.chanceMod) {
				if (attackData.numHits) da = attackData.numHits;
				else cutin = attackData.id || AStypes[i];
				postMod *= attackData.dmgMod;
				accMod2 *= attackData.accMod;
				break;
			}
		}
		if (cutin == 7) { //special CVCI crit bonus
			overrideCritDmgBonus = 1;
			overrideCritDmgBonus += .1*(ship.ACCplane||0)/12.46; //base scaling on average proficiency
			if (ship.equips[0] && ship.equips[0].rank == 7) overrideCritDmgBonus += .15; //base scaling on 8 - 5.6 mods of standard crit dmg bonus
			else if (ship.equips[0] && ship.equips[0].rank == 6) overrideCritDmgBonus += .1;
			
			if (AStypes[i] == 71) critRateBonus = .1;
			else if (AStypes[i] == 72) critRateBonus = .07;
			else critRateBonus = .05;
		}
	}
	
	//PT Imp bonus
	if (target.isPT) {
		var sguns = 0;
		for (var i=0; i<ship.equips.length; i++) {
			if ([MAINGUNS,MAINGUNSAA,SECGUN,AAGUN].indexOf(ship.equips[i].type) != -1) sguns++;
		}
		if (sguns >= 2 && !(BREAKPTIMPS && ship.type == 'DD')) { accMod *= 1.5; postMod *= 1.2; } //acc is guess
		
		if (!NERFPTIMPS) accMod2 *= .5;
	}
	
	var accflat = (ship.ACC)? ship.ACC : 0;
	//if (ship.fleet.formation.shellaccflat) accflat += ship.fleet.formation.shellaccflat; //try global for enemy too
	if (ship.improves.ACCshell) accflat += ship.improves.ACCshell;
	
	var acc = hitRate(ship,(ship.fleet.baseaccshell||90),accflat,accMod); //use global hit acc
	if (MECHANICS.fitGun && ship.ACCfit) acc += ship.ACCfit*.01;
	acc *= accMod2;
	
	var FPfit = (ship.FPfit||0);
	
	if (C) console.log('PREMOD: '+preMod+' POSTMOD: '+postMod);
	
	if (da) {
		var res1 = rollHit(accuracyAndCrit(ship,target,acc,evMod,0,1.3,ship.CVshelltype));
		var dmg1 = getScratchDamage(target.HP), realdmg1 = 0;
		if (res1) {
			dmg1 = damage(ship,target,ship.shellPower(target,ship.fleet.basepowshell)+FPfit,preMod,res1*postMod,SHELLDMGBASE);
			realdmg1 = takeDamage(target,dmg1);
		} else { realdmg1 = takeDamage(target,dmg1) };
		var res2 = rollHit(accuracyAndCrit(ship,target,acc,evMod,0,1.3,ship.CVshelltype));
		var dmg2 = getScratchDamage(target.HP), realdmg2 = 0;
		if (res2) {
			dmg2 = damage(ship,target,ship.shellPower(target,ship.fleet.basepowshell)+FPfit,preMod,res2*postMod,SHELLDMGBASE);
			realdmg2 = takeDamage(target,dmg2);
		} else { realdmg2 = takeDamage(target,dmg2); }
		ship.fleet.giveCredit(ship,realdmg1+realdmg2);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg1+', '+dmg2+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIhou.api_at_eflag) {
				APIhou.api_at_eflag.push(ship.side);
				APIhou.api_at_list.push(ship.apiID2);
				APIhou.api_df_list.push([target.apiID2,target.apiID2]);
			} else {
				APIhou.api_at_list.push(ship.apiID);
				APIhou.api_df_list.push([target.apiID,target.apiID]);
			}
			APIhou.api_damage.push([realdmg1+DIDPROTECT*.1,realdmg2+DIDPROTECT*.1]);
			APIhou.api_at_type.push(2);
			APIhou.api_cl_list.push([((res1>1)?2:1),((res2>1)?2:1)]);
		}
	} else {
		var res = rollHit(accuracyAndCrit(ship,target,acc,evMod,0,1.3,ship.CVshelltype,critRateBonus),(overrideCritDmgBonus || ship.critdmgbonus));
		var dmg = (cutin)? getScratchDamage(target.HP) : 0, realdmg = 0;
		if (res) {
			dmg = damage(ship,target,ship.shellPower(target,ship.fleet.basepowshell)+FPfit,preMod,res*postMod,SHELLDMGBASE);
			realdmg = takeDamage(target,dmg);
		} else { realdmg = takeDamage(target,dmg); }
		ship.fleet.giveCredit(ship,realdmg);
	
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIhou.api_at_eflag) {
				APIhou.api_at_eflag.push(ship.side);
				APIhou.api_at_list.push(ship.apiID2);
				APIhou.api_df_list.push([target.apiID2]);
			} else {
				APIhou.api_at_list.push(ship.apiID);
				APIhou.api_df_list.push([target.apiID]);
			}
			APIhou.api_damage.push([realdmg+DIDPROTECT*.1]);
			APIhou.api_at_type.push(cutin || 0);
			APIhou.api_cl_list.push([((res>1)?2:1)]);
		}
	}
	return (target.HP <= 0);
}

function NBattack(ship,target,NBonly,NBequips,APIyasen) {
	var starshells = NBequips[0], searchlights = NBequips[1], nightscouts = NBequips[2];
	if (!ship.canNB()) return false;
	var da = false; //1 = combined damage, 2 = separate damages
	var cutin = false;
	
	var preMod = ship.damageMod();
	var postMod = 1;
	var bonus = 5*nightscouts[0];//add if have night scout
	
	var accBase = (69 + starshells[0]*5)*((nightscouts[0])? 1.1 : 1);
	var accMod = ship.fleet.formation.NBacc * ship.moraleMod();
	var accFlat = ship.ACC;
	if (ship.improves.ACCnb) accFlat += ship.improves.ACCnb;
	
	var evMod = target.fleet.formation.NBev;
	var evFlat = (target.type == 'CA' || target.type == 'CAV')? 5 : 0;
	if (target.type == 'DD' && target.equiptypesB[B_RADAR] && target.hasLookout) evFlat += 5; //guess
	if (target.hasSearchlight) { evMod *= .2; evFlat *= .2; }
	
	var NBchance = ship.NBchance(); 
	NBchance += starshells[0]*4 - starshells[1]*10 + searchlights[0]*7 - searchlights[1]*5;
	if (ship.HP/ship.maxHP <= .5) NBchance += 18;
	NBchance *= .01;
	if (C) console.log('base NB chance: '+NBchance);

	for (let NBtype of ship.NBtypes()) {
		if (da || cutin) break;
		let attackData = NBATTACKDATA[NBtype];
		if (target.isInstall && attackData.torpedo) continue;
		let chance = (attackData.chanceMod == 0)? .99 : NBchance/attackData.chanceMod;
		if (Math.random() < chance) {
			if (attackData.numHits) da = attackData.numHits;
			cutin = attackData.id || NBtype;
			preMod *= attackData.dmgMod;
			accMod *= attackData.accMod;
			if (NBtype == 3) { //special sub TCI
				if (ship.numSpecialTorp >= 2) preMod = 1.6;
				if (ship.numSpecialTorp && ship.hasSubRadar) preMod = 1.75;
			} else if (NBtype == 7) { //D-gun bonus
				for (let equip of ship.equips) {
					if (equip.mid == 267) {
						preMod *= 1.25;
						break;
					}
				}
			}
		}
	}
	
	//PT Imp bonus
	var accMod2 = 1;
	if (target.isPT) {
		var sguns = 0;
		for (var i=0; i<ship.equips.length; i++) {
			if ([MAINGUNS,MAINGUNSAA,SECGUN,AAGUN].indexOf(ship.equips[i].type) != -1) sguns++;
		}
		if (sguns >= 2 && !(BREAKPTIMPS && ship.type == 'DD')) { accMod *= 1.5; postMod *= 1.2; } //acc is guess
		
		if (!NERFPTIMPS) accMod2 *= .5;
	}
	
	var acc = hitRate(ship,accBase,accFlat,accMod);
	if (MECHANICS.fitGun && ship.ACCfitN) acc += ship.ACCfitN*.01;
	if (searchlights[0]) acc += .07;
	if (ship.ACCnbca) acc += ship.ACCnbca*.01;
	acc *= accMod2;
	
	var critMod = 1.5;
	if (nightscouts[0]) critMod += .07;
	
	if (da) {
		var res1 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,critMod));
		var dmg1 = getScratchDamage(target.HP), realdmg1 = 0;
		if (res1) {
			dmg1 = damage(ship,target,ship.NBPower(target)+bonus,preMod,res1*postMod,300);
			realdmg1 = takeDamage(target,dmg1);
		} else { realdmg1 = takeDamage(target,dmg1) };
		var res2 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,critMod));
		var dmg2 = getScratchDamage(target.HP), realdmg2 = 0;
		if (res2) {
			dmg2 = damage(ship,target,ship.NBPower(target)+bonus,preMod,res2*postMod,300);
			realdmg2 = takeDamage(target,dmg2);
		} else { realdmg2 = takeDamage(target,dmg2); }
		ship.fleet.giveCredit(ship,realdmg1+realdmg2);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg1+', '+dmg2+' damage, '+target.HP+'/'+target.maxHP+' left');
			APIyasen.api_at_list.push(ship.apiID);
			APIyasen.api_df_list.push([target.apiID,target.apiID]);
			APIyasen.api_damage.push([realdmg1+DIDPROTECT*.1,realdmg2+DIDPROTECT*.1]);
			APIyasen.api_sp_list.push(cutin);
			APIyasen.api_cl_list.push([((res1>1)?2:1),((res2>1)?2:1)]);
			APIyasen.api_n_mother_list.push(0);
		}
	} else {
		var res = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,critMod,ship.canNBAirAttack()));
		var dmg = (cutin)? getScratchDamage(target.HP) : 0; var realdmg = 0;
		if (res) {
			dmg = damage(ship,target,ship.NBPower(target)+bonus,preMod,res*postMod,300);
			realdmg = takeDamage(target,dmg);
		} else { realdmg = takeDamage(target,dmg); }
		ship.fleet.giveCredit(ship,realdmg);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			APIyasen.api_at_list.push(ship.apiID);
			APIyasen.api_df_list.push([target.apiID]);
			APIyasen.api_damage.push([realdmg+DIDPROTECT*.1]);
			APIyasen.api_sp_list.push(cutin || 0);
			APIyasen.api_cl_list.push([((res>1)?2:1)]);
			APIyasen.api_n_mother_list.push(+ship.canNBAirAttack());
		}
	}
	return (target.HP <= 0);
}

function ASW(ship,target,isnight,APIhou) {
	var sonarAcc = 0;
	for (var i=0; i<ship.equips.length; i++) if (ship.equips[i].btype == B_SONAR) sonarAcc += 2*ship.equips[i].ASW;
	if (ship.improves.ACCasw) sonarAcc += ship.improves.ACCasw;
	var accMod = ship.moraleMod();
	if (!formationCountered(ship.fleet.formation.id,target.fleet.formation.id)) accMod *= ship.fleet.formation.shellacc;
	var acc = hitRate(ship,80,sonarAcc+(ship.ACC||0),accMod);
	var res = rollHit(accuracyAndCrit(ship,target,acc,target.fleet.formation.ASWev,0,1.3,ship.planeasw),ship.critdmgbonus);
	var dmg = 0, realdmg = 0;
	var premod = (isnight)? 0 : ship.fleet.formation.ASWmod*ENGAGEMENT*ship.damageMod();
	if (res) {
		dmg = damage(ship,target,ship.ASWPower(),premod,res,ASWDMGBASE);
		realdmg = takeDamage(target,dmg);
	}
	ship.fleet.giveCredit(ship,realdmg);
	if (C) {
		console.log(ship.name+' ASWs '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
		if (APIhou.api_at_eflag) {
			APIhou.api_at_eflag.push(ship.side);
			APIhou.api_at_list.push(ship.apiID2);
			APIhou.api_df_list.push([target.apiID2]);
		} else {
			APIhou.api_at_list.push(ship.apiID);
			APIhou.api_df_list.push([target.apiID]);
		}
		APIhou.api_damage.push([realdmg+DIDPROTECT*.1]);
		if(APIhou.api_at_type) APIhou.api_at_type.push(0);
		else APIhou.api_sp_list.push(0);
		if (APIhou.api_n_mother_list) APIhou.api_n_mother_list.push(0);
		APIhou.api_cl_list.push([((res>1)?2:1)]);
	}
	return (target.HP <= 0);
}

function laser(ship,targets,APIhou) {
	var preMod = ship.fleet.formation.shellmod*ENGAGEMENT*ship.damageMod();
	var accMod = ship.moraleMod();
	if (!formationCountered(ship.fleet.formation.id,targets[0].fleet.formation.id)) accMod *= ship.fleet.formation.shellacc;
	var acc = hitRate(ship,90,0,accMod);
	var evMod = ship.fleet.formation.shellev;
	var targetids = [], damages = [], crits = [];
	for (var i=0; i<targets.length; i++) {
		var postMod = ship.APmod(targets[i]); //want this?
		var res = rollHit(accuracyAndCrit(ship,targets[i],acc,evMod,0,1.3));
		var dmg = 0, realdmg = 0;
		if (res) {
			dmg = damage(ship,targets[i],ship.shellPower(targets[i]),preMod,res*postMod,SHELLDMGBASE);
			realdmg = takeDamage(targets[i],dmg);
		} else { realdmg = takeDamage(targets[i],dmg); }
		ship.fleet.giveCredit(ship,realdmg);
		if (C) {
			console.log(ship.name+' LASERS '+targets[i].name+' FOR '+dmg+' DAMAGE, '+targets[i].HP+'/'+targets[i].maxHP+' left');
			targetids.push((APIhou.api_at_eflag)? targets[i].apiID2 : targets[i].apiID);
			damages.push(realdmg);
			crits.push(((res>1)?2:1));
		}
	}
	if (C) {
		if (APIhou.api_at_eflag) {
			APIhou.api_at_eflag.push(ship.side);
			APIhou.api_at_list.push(ship.apiID2);
		} else {
			APIhou.api_at_list.push(ship.apiID);
		}
		APIhou.api_df_list.push(targetids);
		APIhou.api_damage.push(damages);
		APIhou.api_at_type.push(1);
		APIhou.api_cl_list.push(crits);
	}
}

function shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,APIhou,isOASW) {
	for (var i=0; i<6; i++) {
		if (i < order1.length && order1[i].canStillShell()) {
			if (subsalive2.length && order1[i].canASW() && (!order1[i].isASWlast||!alive2.length)) {
				var target = choiceWProtect(subsalive2);
				if (ASW(order1[i],target,false,APIhou)) subsalive2.splice(subsalive2.indexOf(target),1);
			} else if (alive2.length && !isOASW) {
				if (order1[i].canlaser && Math.random() < .5) {
					var temptargets = [];
					for (var j=0; j<alive2.length; j++) if (!alive2[j].isescort) temptargets.push(alive2[j]);
					if (temptargets.length <= 0) temptargets = alive2;
					var targets = shuffle(temptargets.slice()).slice(0,1+Math.max(0,Math.floor((temptargets.length-1)*Math.random())));
					laser(order1[i],targets,APIhou);
					for (var j=0; j<targets.length; j++) if (targets[j].HP <= 0) alive2.splice(alive2.indexOf(targets[j]),1);
				} else {
					var targets; //divebomber can't shell install, copy over to enemy?
					if (order1[i].hasDivebomber) {
						targets = [];
						for (var j=0; j<alive2.length; j++) if (!alive2[j].isInstall) targets.push(alive2[j]);
					} else if (order1[i].isSub) {
						targets = [];
						for (var j=0; j<alive2.length; j++) if (alive2[j].isInstall) targets.push(alive2[j]);
					} else targets = alive2;
					if (targets.length) {
						var target = choiceWProtect(targets);
						if (shell(order1[i],target,APIhou)) alive2.splice(alive2.indexOf(target),1);
					}
				}
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canStillShell()) {
			if (subsalive1.length && order2[i].canASW() && (!order2[i].isASWlast||!alive1.length)) {
				var target = choiceWProtect(subsalive1);
				if (ASW(order2[i],target,false,APIhou)) subsalive1.splice(subsalive1.indexOf(target),1);
			} else if (alive1.length && !isOASW) {
				if (order2[i].canlaser && Math.random() < .5) {
					var temptargets = [];
					for (var j=0; j<alive1.length; j++) if (!alive1[j].isescort) temptargets.push(alive1[j]);
					if (temptargets.length <= 0) temptargets = alive1;
					var targets = shuffle(temptargets.slice()).slice(0,1+Math.max(0,Math.floor((temptargets.length-1)*Math.random())));
					laser(order2[i],targets,APIhou);
					for (var j=0; j<targets.length; j++) if (targets[j].HP <= 0) alive1.splice(alive1.indexOf(targets[j]),1);
				} else if (order2[i].isSub) {
						targets = [];
						for (var j=0; j<alive1.length; j++) if (alive1[j].isInstall) targets.push(alive1[j]);
				} else {
					var target = choiceWProtect(alive1);
					if (shell(order2[i],target,APIhou)) alive1.splice(alive1.indexOf(target),1);
				}
			}
		}
		if (alive1.length+subsalive1.length <= 0) break;
	}
}

function nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,APIyasen) {
	var APIhou = (APIyasen)? APIyasen.api_hougeki : undefined;
	var star1 = false;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		if (alive1[i].hasStarShell && alive1[i].HP > 4 && Math.random() < .7) { star1 = true; if (C) APIyasen.api_flare_pos[0] = alive1[i].num; break; }
	}
	var star2 = false;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		if (alive2[i].hasStarShell && alive2[i].HP > 4 && Math.random() < .7) { star2 = true; if (C) APIyasen.api_flare_pos[1] = alive2[i].num; break; }
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
	for (var i=0; i<6; i++) {
		if (i < order1.length && order1[i].canNB()) {
			if (subsalive2.length && order1[i].canASW() && !order1[i].planeasw) {
				var target = choiceWProtect(subsalive2);
				if (ASW(order1[i],target,(!NBonly&&!order1[i].isescort),APIhou)) subsalive2.splice(subsalive2.indexOf(target),1);
			} else if (alive2.length) {
				var target = choiceWProtect(alive2,slrerolls2);
				// if (light2 && Math.random() < .2) target = alive2[lightship2];
				if (NBattack(order1[i],target,NBonly,[[star1,star2],[light1,light2],[scout1,scout2]],APIhou)) alive2.splice(alive2.indexOf(target),1);
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canNB()) {
			if (subsalive1.length && order2[i].canASW() && !order2[i].planeasw) {
				var target = choiceWProtect(subsalive1);
				if (ASW(order2[i],target,(!NBonly&&!order2[i].isescort),APIhou)) subsalive1.splice(subsalive1.indexOf(target),1);
			} else if (alive1.length) {
				var target = choiceWProtect(alive1,slrerolls1);
				// if (light1 && Math.random() < .2) target = alive1[lightship1];
				if (NBattack(order2[i],target,NBonly,[[star2,star1],[light2,light1],[scout2,scout1]],APIhou)) alive1.splice(alive1.indexOf(target),1);
			}
		}
		if (alive1.length+subsalive1.length <= 0) break;
	}
	if (C) {
		if (code[code.length-1]=='|') code = code.substr(0,code.length-1);
		code += '~';
	}
}

function torpedoPhase(alive1,subsalive1,alive2,subsalive2,opening,APIrai) {
	var shots = []; //set up shots
	var targets2 = [];
	for (var i=0; i<alive2.length; i++) { if (!alive2[i].isInstall) targets2.push(alive2[i]); }
	var targets1 = [];
	for (var i=0; i<alive1.length; i++) { if (!alive1[i].isInstall) targets1.push(alive1[i]); }
	
	if (targets2.length) {  //any targets?
		for (var i=0; i<alive1.length+subsalive1.length; i++) {
			var ship = (i < alive1.length) ? alive1[i] : subsalive1[i-alive1.length];
			if (ship.fleet.combinedWith && !ship.isescort) continue;
			if ((opening)? ship.canOpTorp() : ship.canTorp()) {
				var target = choiceWProtect(targets2);
				shots.push([ship,target]);
			}
		}
	}
	if (targets1.length) {
		for (var i=0; i<alive2.length+subsalive2.length; i++) {
			var ship = (i < alive2.length) ? alive2[i] : subsalive2[i-alive2.length];
			if (ship.fleet.combinedWith && !ship.isescort) continue;
			if ((opening)? ship.canOpTorp() : ship.canTorp()) {
				var target = choiceWProtect(targets1);
				shots.push([ship,target]);
			}
		}
	}
	var damageMods = {};
	for (var i=0; i<shots.length; i++) damageMods[shots[i][0].id] = shots[i][0].damageMod(true);
	for (var i=0; i<shots.length; i++) {  //do the shots
		var ship = shots[i][0]; var target = shots[i][1];
		
		var power = (ship.isescort)? ship.TP : (ship.TP+5);
		power *= ship.fleet.formation.torpmod*ENGAGEMENT*damageMods[ship.id];
		if (power > 150) power = 150 + Math.sqrt(power-150);
		
		var accflat = (ship.ACC)? ship.ACC : 0;
		if (ship.improves.ACCtorp) accflat += Math.floor(ship.improves.ACCtorp);
		accflat += Math.floor(power/5);
		if (ship.TACC) accflat += ship.TACC;
		var ptMod = (target.isPT && !NERFPTIMPS)? .5 : 1;
		var acc = hitRate(ship,85,accflat,ship.fleet.formation.torpacc*ship.moraleMod(true)*ptMod);
		
		var evFlat = (target.improves.EVtorp)? ship.improves.EVtorp : 0;
		var res = rollHit(accuracyAndCrit(ship,target,acc,target.fleet.formation.torpev,evFlat,1.5));
		var realdmg = 0, dmg = 0;
		if (res) {
			var bonus = (ship.improves.Ptorp)? ship.improves.Ptorp : 0;
			dmg = damage(ship,target,power,1,res,10000); //power already capped
			realdmg = takeDamage(target,dmg);
		}
		ship.fleet.giveCredit(ship,realdmg);
		if (C) {
			console.log(ship.name+' torpedoes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			let shipidx = (APIrai.api_frai.length > 7)? ship.apiID2 : ship.num;
			let targetidx = (APIrai.api_frai.length > 7)? target.apiID2 : target.num;
			APIrai[(ship.side)?'api_erai':'api_frai'][shipidx] = targetidx;
			APIrai[(target.side)?'api_edam':'api_fdam'][targetidx] += realdmg;
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

function airstrike(ship,target,slot,contactMod,issupport) {
	if (!contactMod) contactMod = 1;
	var acc = (issupport)? .85 : .95;
	var res = rollHit(accuracyAndCrit(ship,target,acc,target.fleet.formation.AAmod,0,.2,true),ship.critdmgbonus);
	var equip = ship.equips[slot];
	var dmg = 0, realdmg = 0;
	var planebase = (equip.isdivebomber)? equip.DIVEBOMB : (target.isInstall)? 0 : equip.TP;
	planebase |= 0;
	if (C) console.log('		'+slot+' '+planebase);
	if (res) {
		var base = (issupport)? 3 : 25;
		if (target.fleet.airstrikeMod) base += target.fleet.airstrikeMod; //in enemy combined, main gets -10, escort -20
		var preMod = (equip.isdivebomber)? 1 : ((Math.random() < .5)? .8 : 1.5);
		if (equip.isjet) preMod *= 1/Math.sqrt(2);
		var postMod = 1;
		if (equip.isdivebomber) postMod *= target.divebombWeak || 1;
		dmg = damage(ship,target,base+Math.sqrt(ship.planecount[slot])*planebase,preMod,res*contactMod*postMod,150);
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
		else if (damage >= ship.HP) damage = Math.floor(ship.HP*.5+.3*Math.floor(Math.random()*ship.HP));  //overkill protection
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
	return (accBase + 2*Math.sqrt(ship.LVL) + Math.sqrt(ship.LUK*1.5) + accFlat)*accMod*.01;
}

function accuracyAndCrit(ship,target,hit,evMod,evFlat,critMod,isPlanes,critBonusFlat) {
	if (evMod===undefined) evMod = 1;
	
	var evade = (target.EV+Math.sqrt(target.LUK*2)) * evMod; //formation
	var dodge = (evade>65)? 55+2*Math.sqrt(evade-65) : ((evade>40)? 40+3*Math.sqrt(evade-40) : evade);
	dodge*=.01;
	if (target.fuelleft < 7.5) dodge -= (7.5-target.fuelleft)/10;
	if (evFlat) dodge += evFlat*.01;
	
	if (C) console.log('	hit: '+hit+' dodge: '+dodge);
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

function damage(ship,target,base,preMod,postMod,cap) {
	if (!cap) cap = 150;
	if (typeof preMod === 'undefined') preMod = 1;
	if (typeof postMod === 'undefined') postMod = 1;
	if (C) console.log('	'+ship.id+' '+target.id+' '+base+' '+preMod+' '+postMod+' '+cap);
	
	var dmg = base;
	dmg *= preMod;  //NB attack, torpedo bomber, formation mod
	
	if (dmg > cap) dmg = cap + Math.sqrt(dmg-cap);
	
	dmg *= postMod;  //artillery spotting, contact, AP shell, critical
	if (target.installtype == 3) { //supply depot type installations
		dmg *= (ship.supplyPostMult||1);
	}
	if (C) console.log('	before def: '+dmg);
	var ar = target.AR + (target.improves.AR || 0);
	dmg -= .7*ar+.6*Math.floor(Math.random()*ar) - (target.debuff||0);
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

function compareAP(fleet1,fleet2,isjetphase,includeEscort) {
	var ap1 = fleet1.fleetAirPower(isjetphase), ap2 = fleet2.fleetAirPower(isjetphase);
	if (includeEscort) {
		if (fleet1.combinedWith) ap1 += fleet1.combinedWith.fleetAirPower(isjetphase);
		if (fleet2.combinedWith) ap2 += fleet2.combinedWith.fleetAirPower(isjetphase);
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
	if (!target.isflagship || target.isInstall || target.isescort) return target;
	
	//flagship protection
	var rate = [0,.45,.6,.75,.6,.6][target.fleet.formation.id];
	if (!rate) rate = .6;
	if (Math.random() < rate) {
		var defenders = [];
		for (var i=0; i<targets.length; i++) {
			if (!targets[i].isflagship && targets[i].HP/targets[i].maxHP > .75 && targets[i].fleet.id==target.fleet.id) defenders.push(targets[i]);
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

function AADefenceFighters(carriers,showplanes,APIkouku,isjetphase) {
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i], hasfighter = false;
		for (var j=0; j<ship.equips.length; j++) {
			if ((ship.equips[j].isfighter||ship.equips[j].isdivebomber||ship.equips[j].istorpbomber)&&(!isjetphase||ship.equips[j].isjet)) {
				var lostcount;
				if (ship.side==0) {
					var rmin, rplus;
					switch(ship.airState()) {
						case 2: rmin = .025; rplus = .0333; break;
						case 1: rmin = .075; rplus = .1; break;
						case 0: rmin = .125; rplus = .1666; break;
						case -1: rmin = .175; rplus = .2333; break;
						case -2: rmin = .25; rplus = .3333; break;
					}
					var randplus = Math.floor((Math.floor(1000*rplus)+1)*Math.random())/1000;
					lostcount = Math.floor(ship.planecount[j]*(rmin+randplus));
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
					lostcount = Math.floor(ship.planecount[j]*mod/10);
				}
				if (C) {
					APIkouku.api_stage1[(ship.side)? 'api_e_count':'api_f_count'] += ship.planecount[j];
					APIkouku.api_stage1[(ship.side)? 'api_e_lostcount':'api_f_lostcount'] += lostcount;
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

function getAAShotProp(defender,slotsize) {
	return Math.floor(slotsize*defender.weightedAntiAir()/400);
}

function getAAShotFlat(defender) {
	var mod = (defender.side==0)? .1 : 0.09375;
	var fAA = (MECHANICS.fixFleetAA)? defender.fleet.fleetAntiAir() : 0;
	return (defender.weightedAntiAir()+fAA)*mod;
}

function getContact(carriers) {
	var losPower = 0;
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i];
		for (var j=0; j<ship.equips.length; j++) {
			var e = ship.equips[j];
			if (e.LOS && EQTDATA[e.type].isPlane) losPower += Math.floor(Math.sqrt(ship.planecount[j])*e.LOS);
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

function AADefenceBombersAndAirstrike(carriers,targets,defenders,APIkouku,issupport,isjetphase) {
	var bombers = [], hasbomber = false;
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i];
		bombers.push([]);
		for (var j=0; j<ship.equips.length; j++) {
			var e = ship.equips[j];
			if ((e.istorpbomber || e.isdivebomber) && ship.planecount[j]>0 && (!isjetphase||e.isjet)) {
				bombers[i].push(j);
				hasbomber = true;
				var side = (ship.side == 2 || ship.side == 3)? 0 : ship.side;
				if (C && APIkouku.api_plane_from[side].indexOf(ship.apiID2)==-1) APIkouku.api_plane_from[side].push(ship.apiID2);
			}
		}
	}
	if (!hasbomber) return;
	
	//get AACI
	var AACInum = 0, AACImod = 1;
	if (MECHANICS.AACI) {
		var AACIship, AACItype = 0;
		for (var i=0; i<defenders.length; i++) {
			if (defenders[i].AACItype.length) {
				var r = Math.random();
				for (var j=0; j<defenders[i].AACItype.length; j++) {
					var type = defenders[i].AACItype[j];
					if (type > AACItype && r < AACIDATA[type].rate) {
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
			if (C) APIkouku.api_stage2[(!AACIship.side)?'api_air_fire':'api_air_fire_e'] = {api_idx:AACIship.apiID2-1,api_kind:AACItype};
		}
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
			var shotProp = (Math.random() < .5)? Math.floor(getAAShotProp(defender,ship.planecount[slot])*supportMod) : 0;
			var shotFlat = (Math.random() < .5)? Math.floor(getAAShotFlat(defender)*AACImod*supportMod) : 0;
			var shotFix = ((defender.side==0 || AACInum)? 1 : 0) + AACInum;
			
			if (C) {
				APIkouku.api_stage2[(ship.side)?'api_e_count':'api_f_count'] += ship.planecount[slot];
				APIkouku.api_stage2[(ship.side)?'api_e_lostcount':'api_f_lostcount'] += shotProp+shotFlat+shotFix;
			}
			ship.planecount[slot] = Math.max(0,ship.planecount[slot]-shotProp-shotFlat-shotFix);
			if (C) console.log('	anti air: '+defender.name+' '+defender.AA+' '+shotProp+' '+shotFlat+' '+shotFix+' '+ship.planecount[slot]);
		
			if (ship.planecount[slot]<=0) {
				ship.planecount[slot] = 0;
				continue;
			}
			
			if (targets.length) {  //even if subs only, bombers still get shot down
				var target = choiceWProtect(targets);
				if (target._rocketTriggered) continue;
				var dmg = airstrike(ship,target,slot,contactMod,issupport);
				if (C) {
					if (target.isescort) {
						APIkouku.api_stage3_combined[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
						APIkouku.api_stage3_combined[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
						if (ship.equips[slot].istorpbomber) APIkouku.api_stage3_combined[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
						else APIkouku.api_stage3_combined[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
					} else {
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
	
	if (carriers1.length||carriers2.length) {
		if (C) {
			APIkouku.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0,api_touch_plane:[-1,-1]};
			APIkouku.api_stage2 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0};
			APIkouku.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_fbak_flag:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0],api_fcl_flag:[-1,0,0,0,0,0,0]};
			APIkouku.api_stage3_combined = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_fbak_flag:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0],api_fcl_flag:[-1,0,0,0,0,0,0]};
		}
		
		//fighter defence
		AADefenceFighters(carriers1,alive2.length,APIkouku,isjetphase);
		AADefenceFighters(carriers2,alive1.length,APIkouku,isjetphase);
		
		//bomber defence
		if (!isbombing) AADefenceBombersAndAirstrike(carriers1,alive2,alive2.concat(subsalive2),APIkouku,false,isjetphase);
		AADefenceBombersAndAirstrike(carriers2,alive1,alive1.concat(subsalive1),APIkouku,false,isjetphase);
	}
	if (C) {
		for (var i=0; i<2; i++)
			if (APIkouku && APIkouku.api_plane_from[i].length > 1)
				APIkouku.api_plane_from[i] = APIkouku.api_plane_from[i].slice(1);
	}
}

function supportPhase(shipsS,alive2,subsalive2,suptype,BAPI,isboss) {
	if (C) {
		BAPI.data.api_support_flag = suptype;
		BAPI.data.api_support_info = { api_support_airatack:null, api_support_hourai:null };
		if (suptype==2||suptype==3) {
			if (BAPI.data.api_ship_ke_combined)
				BAPI.data.api_support_info.api_support_hourai = { api_cl_list:[-1,0,0,0,0,0,0,0,0,0,0,0,0], api_damage:[-1,0,0,0,0,0,0,0,0,0,0,0,0], api_deck_id:3};
			else
				BAPI.data.api_support_info.api_support_hourai = { api_cl_list:[-1,0,0,0,0,0,0], api_damage:[-1,0,0,0,0,0,0], api_deck_id:3};
		} else if (suptype==1) {
			BAPI.data.api_support_info.api_support_airatack = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
			BAPI.data.api_support_info.api_support_airatack.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0};
			BAPI.data.api_support_info.api_support_airatack.api_stage2 = {api_f_count:0,api_f_lostcount:0};
			BAPI.data.api_support_info.api_support_airatack.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0]};
		}
	}
	if (!alive2.length) return;
	if (suptype==2||suptype==3) {
		var hou = (BAPI)? BAPI.data.api_support_info.api_support_hourai : undefined;
		for (var i=0; i<shipsS.length; i++) {
			var ship = shipsS[i];
			var target = choiceWProtect(alive2);
			var accCrit, torpDmg;
			if (suptype==3) {
				if (!ship.canTorp()) continue;
				torpDmg = (FIXTORPEDOSUPPORT)? ship.TP : 0;  //is this the bug in the browser version?
				for (var j=0; j<ship.equips.length; j++) if (ship.equips[j].TP) torpDmg -= ship.equips[j].TP; //is this correct?
				torpDmg += 8;
				accCrit = accuracyAndCrit(ship,target,hitRate(ship,54,ship.ACC+torpDmg*.35,ship.moraleMod()),target.fleet.formation.torpev,0,1.2);
			} else {
				var baseacc;
				if (isboss) baseacc = (SIMCONSTS.supportShellB != null)? SIMCONSTS.supportShellB : 64;
				else baseacc = (SIMCONSTS.supportShellN != null)? SIMCONSTS.supportShellN : 64;
				accCrit = accuracyAndCrit(ship,target,hitRate(ship,baseacc,ship.ACC,ship.moraleMod(true)),target.fleet.formation.shellev,0,1);
			}
			var res = rollHit(accCrit);
			var dmg = 0, realdmg = 0;
			if (res) {
				var dmg;
				if (suptype==3) dmg = damage(ship,target,torpDmg*.55,ENGAGEMENT,res,150);
				else dmg = damage(ship,target,ship.shellPower(target)-1,ENGAGEMENT,res,150);
				realdmg = takeDamage(target,dmg);
			} else { realdmg = 0; }
			if (C) {
				console.log(ship.name+' support attacks '+target.name+' for '+dmg+' damage');
				hou.api_cl_list[i+1] = (res>1)? 2 : (dmg)? 1 : 0;
				hou.api_damage[target.apiID2] += realdmg;
			}
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	} else if (suptype==1) {
		for (var i=0; i<shipsS.length; i++) shipsS[i].id = 1;
		var prevAS = alive2[0].fleet.AS;
		compareAP(shipsS[0].fleet,alive2[0].fleet);
		AADefenceFighters(shipsS,false,(C)? BAPI.data.api_support_info.api_support_airatack : null);
		AADefenceBombersAndAirstrike(shipsS,alive2,alive2.concat(subsalive2),(C)? BAPI.data.api_support_info.api_support_airatack : null,true);
		alive2[0].fleet.AS = prevAS;
	}
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
			if (!eq.isdivebomber && !eq.istorpbomber && !eq.isfighter) continue;
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
	AADefenceFighters([lbas],true,APIkouku,isjetphase);
	AADefenceFighters(carriers2,true,APIkouku,isjetphase);
	
	//bomber defence
	var defenders = [];
	var AACImod = 1;
	var AACInum = 0;
	for (var i=0; i<alive2.length; i++) defenders.push(alive2[i]);
	for (var i=0; i<subsalive2.length; i++) defenders.push(subsalive2[i]);
	for (var i=0; i<lbas.equips.length; i++) {
		var eq = lbas.equips[i];
		if (!eq.isdivebomber && !eq.istorpbomber) continue;
		var defender = defenders[Math.floor(Math.random()*defenders.length)];
		var supportMod = .8;
		var shotProp = (Math.random() < .5)? Math.floor(getAAShotProp(defender,lbas.planecount[i])*supportMod) : 0;
		var shotFlat = (Math.random() < .5)? Math.floor(getAAShotFlat(defender)*AACImod*supportMod) : 0;
		var shotFix = ((defender.side==0 || AACInum)? 1 : 0) + AACInum;
		
		if (C) {
			APIkouku.api_stage2.api_f_count += lbas.planecount[i];
			APIkouku.api_stage2.api_f_lostcount += shotProp+shotFlat+shotFix;
		}
		lbas.planecount[i] = Math.max(0,lbas.planecount[i]-shotProp-shotFlat-shotFix);
		if (lbas.planecount[i] < 0) continue;
		
		var contactMod = 1;
		if (lbas.airState() != -2 && lbas.airState() != 0) {
			var contactdata = getContact([lbas]);
			if (contactdata) {
				contactMod = contactdata.mod;
				if (C) APIkouku.api_stage1.api_touch_plane[0] = contactdata.id;
			}
		}
		
		if (alive2.length) {
			var target = choiceWProtect(alive2);
			var dmg = airstrikeLBAS(lbas,target,i,contactMod);
			if (C) {
				var showtorpedo = lbas.equips[i].istorpbomber;
				if (lbas.equips[i].type == LANDBOMBER && target.isInstall) showtorpedo = false;
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
	}
}

function airstrikeLBAS(lbas,target,slot,contactMod) {
	if (!contactMod) contactMod = 1;
	var equip = lbas.equips[slot];
	var acc = .95;
	var critdmgbonus = 1, critratebonus = 0, ACCplane = 0;
	if (equip.type != LANDBOMBER) {
		ACCplane = Math.sqrt(equip.exp*.1);
		var critval;
		switch(equip.rank) {
			case 7: ACCplane += 9; critval = 8; break;
			case 6: ACCplane += 6; critval = 5.6; break;
			case 5: ACCplane += 4; break;
			case 4: ACCplane += 3; break;
			case 3: ACCplane += 2; break;
			case 2: ACCplane += 1; break;
			case 0: ACCplane = 0; break;
		}
		critdmgbonus = (Math.sqrt(equip.exp*1.2)+critval)/((slot==0)?100:200);
		critratebonus = critval*.75;
	}
	lbas.critratebonus = critratebonus; lbas.ACCplane = ACCplane;
	var res = rollHit(accuracyAndCrit(lbas,target,acc,target.fleet.formation.AAmod,0,.2,true),critdmgbonus);
	lbas.critratebonus = 0; lbas.ACCplane = 0;
	var dmg = 0, realdmg = 0;
	var planebase;
	if (equip.type == LANDBOMBER) planebase = (target.isInstall)? equip.DIVEBOMB : equip.TP;
	else planebase = (equip.isdivebomber)? equip.DIVEBOMB : (target.isInstall)? 0 : equip.TP;
	planebase |= 0;
	if (res) {
		var dmgbase = 25+planebase*Math.sqrt(1.8*lbas.planecount[slot]);
		var preMod = (equip.type == LANDBOMBER)? .8 : 1;
		var postMod = (equip.type == LANDBOMBER)? 1.8 : 1;
		// if (target.isInstall) { //https://cdn.discordapp.com/attachments/178613137430282240/284476587783618560/isohime.PNG
			// if (equip.isdivebomber) postMod *= 2;
			// else postMod *= 1.18;
		// }
		preMod *= (target.LBWeak || 1);
		if (equip.isdivebomber) postMod *= (target.divebombWeak || 1);
		// postMod *= (target.divebombWeak || 1);
		dmg = damage(lbas,target,dmgbase,preMod,res*contactMod*postMod,150);
		if (target.installtype == 3) dmg += 100;
		realdmg = takeDamage(target,dmg);
	}
	if(C) {
		console.log('LBAS airstrikes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left, CONTACT: '+contactMod);
	}
	return realdmg;
}

function orderByRange(ships,order,includeSubs) {
	var ranges = []; //fleet 1
	for (var i=0; i<ships.length; i++) {
		if (!includeSubs && ships[i].isSub) continue;
		if (!ships[i].canShell()) continue;
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

function sim(F1,F2,Fsupport,LBASwaves,doNB,NBonly,aironly,bombing,noammo,BAPI,noupdate) {
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
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].HP <= 0) continue;
		if (ships2[i].retreated) continue;
		if(ships2[i].isSub) subsalive2.push(ships2[i]);
		else alive2.push(ships2[i]);
		ships2[i].HPprev = ships2[i].HP;
		if (ships2[i].isInstall) hasInstall2 = true;
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
	if (C) console.log(API);
	
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
			compareAP(jetLBAS,F2,true);
			LBASPhase(jetLBAS,alive2,subsalive2,true,(C)?BAPI.data.api_air_base_injection:undefined);
			removeSunk(alive2);
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
		compareAP(F1,F2,true);
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
				compareAP(LBASwaves[i],F2);
				var LBAPI = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
				LBASPhase(LBASwaves[i],alive2,subsalive2,false,(C)?LBAPI:undefined);
				removeSunk(alive2);
				if (C) {
					LBAPI.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[LBASwaves[i].AS+2];
					BAPI.data.api_air_base_attack.push(LBAPI);
				}
			}
		}
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
	if (Fsupport && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) {
			supportPhase(Fsupport.ships,alive2,subsalive2,Fsupport.supportType,BAPI,Fsupport.supportBoss);
			removeSunk(alive2);
		}	
	}
	
	//opening asw
	if (MECHANICS.OASW && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var attackers1 = [], order1 = [], attackers2 = [], order2 = [];
		for (var i=0; i<alive1.length; i++) {
			if (alive1[i].canOASW()) attackers1.push(alive1[i]);
		}
		orderByRange(attackers1,order1);
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].canOASW()) attackers2.push(alive2[i]);
		}
		orderByRange(attackers2,order2);
		
		if (order1.length+order2.length) {
			if (C) BAPI.data.api_opening_taisen = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
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
		
		if (C) BAPI.data.api_hougeki1 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
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
		
		if (C) BAPI.data.api_hougeki2 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
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
			BAPI.yasen.api_hougeki = {api_at_list:[-1],api_damage:[-1],api_df_list:[-1],api_sp_list:[-1],api_cl_list:[-1],api_n_mother_list:[-1]};
			BAPI.yasen.api_flare_pos = [-1,-1];
			BAPI.yasen.api_touch_plane = [-1,-1];
		}
		nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);
	}
	
	if (!noupdate) {
		// var subonly = true;
		// for (var j=0; j<ships2.length; j++) if (ships2[j].type != 'SS') subonly = false;
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].HP <= 0) continue;
			if (ships1[i].retreated) continue;
			if (bombing) {
				ships1[i].fuelleft -= .5;
				ships1[i].ammoleft -= .5;
			} else {
				ships1[i].fuelleft -= 2;
				if (!noammo) ships1[i].ammoleft -= (didNB)? 3 : 2;
				else if (didNB) ships1[i].ammoleft -= 1;
			}
			if (ships1[i].fuelleft < 0) ships1[i].fuelleft = 0;
			if (ships1[i].ammoleft < 0) ships1[i].ammoleft = 0;
			if (C) console.log('FUEL LEFT: '+ships1[i].fuelleft+' AMMO LEFT: '+ships1[i].ammoleft);
		}
	}
	
	
	results.rank = getRank(ships1,ships2);
	
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
		//if (ships1[i].repairsOrig && ships1[i].repairsOrig.length > ships1[i]
	}
	results.MVP = F1.getMVP();
	if (didNB) results.didNB = true;
	
	//update morale
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

// function loadFleet(side,ships,formation,isescort) {
	// var link = (isescort)? FLEETS1[0] : null; //better way to do this...?
	// var f = new Fleet(side,link);
	// f.ships = [];
	// f.loadShips(ships);
	// f.formation = ALLFORMATIONS[formation];
	// if (side==0) FLEETS1.push(f);
	// else if (side==1) FLEETS2.push(f);
	// else if (side==2) FLEETS1S[0] = f;
	// else if (side==3) FLEETS1S[1] = f;
// }

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
	var retreater = null, escorter = null;
	if (ships1C && ships1[0].hasFCF) { var d = getFCFShips(ships1,ships1C); retreater = d[0]; escorter = d[1]; }
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
			flagsunk: 0
		});
	}
	
	//var BAPI = {data:{},yasen:{},mvp:[],rating:''};
	C = false;
	var formdef = FLEETS1[0].formation;
	for (var i=0; i<numsims; i++) {
		for (var j=0; j<FLEETS2.length; j++) {
			var options = foptions[j];
			FLEETS1[0].DMGTOTALS = [0,0,0,0,0,0];
			if (options.formation != '0') FLEETS1[0].formation = ALLFORMATIONS[options.formation];
			else FLEETS1[0].formation = formdef;
			var supportNum = (j == FLEETS2.length-1)? 1 : 0;
			var LBASwaves = [];
			for (var k=0; k<options.lbas.length; k++) LBASwaves.push(LBAS[options.lbas[k]-1]);
			var res;
			if (FLEETS2[j].combinedWith) res = sim6vs12(FLEETS1[0],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo);
			else res = sim(FLEETS1[0],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo);//,BAPI);
			totalResult.nodes[j].num++;
			if (res.redded) totalResult.nodes[j].redded++;
			for (var k=0; k<res.reddedIndiv.length; k++) if (res.reddedIndiv[k]) totalResult.nodes[j].redIndiv[k]++;
			if (res.undamaged) totalResult.nodes[j].undamaged++;
			if (res.flagsunk) totalResult.nodes[j].flagsunk++;
			totalResult.nodes[j].ranks[res.rank]++;
			totalResult.nodes[j].MVPs[res.MVP]++;
			if (!canContinue(FLEETS1[0].ships)) break;
		}
		for (var j=0; j<FLEETS1[0].ships.length; j++) { //get refuel and repair costs
			var ship = FLEETS1[0].ships[j];
			var r = getRepairCost(ship);
			totalResult.totalFuelR += r[0];
			totalResult.totalSteelR += r[1];
			if (ship.HP/ship.maxHP <= BUCKETPERCENT || getRepairTime(ship) > BUCKETTIME) totalResult.totalBuckets++;
			totalResult.totalFuelS += Math.floor(ship.fuel * (10-ship.fuelleft)/10);
			totalResult.totalAmmoS += Math.floor(ship.ammo * (10-ship.ammoleft)/10);
			for (var k=0; k<ship.PLANESLOTS.length; k++) totalResult.totalBauxS += 5*(ship.PLANESLOTS[k]-ship.planecount[k]);
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
		}
		
		for (var j=0; j<FLEETS1.length; j++) FLEETS1[j].reset();
		for (var j=0; j<FLEETS2.length; j++) {
			FLEETS2[j].reset();
			if (FLEETS2[j].combinedWith) FLEETS2[j].combinedWith.reset();
		}
	}
	
	updateResults(totalResult);
	
	console.log(totalResult);

	
	return 0;
}
