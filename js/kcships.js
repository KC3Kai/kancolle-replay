
//-------
function Fleet(id,isescortfor) {
	this.id = id;
	this.side = id;
	this.ships = [];
	if (isescortfor) {
		this.isescort = true;
		this.combinedWith = isescortfor;
		isescortfor.combinedWith = this;
	}
	
	this.formation = false;
	this.AP = 0;  //air (fighter) power
	this.AS = 0;  //air superiority
	this.DMGTOTALS = null;
}
Fleet.prototype.loadShips = function(ships) {
	this.AP = 0; this.noRedT = false;
	for(var i=0; i<ships.length; i++) {
		this.ships.push(ships[i]);
		ships[i].id = i+10*this.id;
		ships[i].apiID = (i+1)+6*this.id;
		ships[i].apiID2 = (i+1)+6*(this.isescort||0);
		ships[i].num = i+1;
		ships[i].fleet = this;
		for (var j=0; j<ships[i].equips.length; j++) {
			if (ships[i].equips[j].noRedT) { this.noRedT = true; break; }
			if (ships[i].equips[j].type == OILDRUM) this.numUnderwaySupply = this.numUnderwaySupply + 1 || 1;
		}
		if (this.isescort) ships[i].isescort = true;
		
		if (ships[i].isAntiPTShip) {
			ships[i].isAntiPT = true;
			ships[i].ptAccMod *= 1.25;
			for (let ship of [ships[i-1],ships[i+1]]) {
				if (!ship) continue;
				if (ship.type == 'DD' || ship.type == 'DE') {
					ship.isAntiPT = true;
					ship.ptAccMod *= 1.2;
				}
			}
		}
	}
	this.ships[0].isflagship = true;
	this.DMGTOTALS = this.ships.map(s => 0);
}
Fleet.prototype.fleetAirPower = function(eqtFilter) {  //get air power
	this.AP = 0;
	for (var i=0; i<this.ships.length; i++) {
		if (this.ships[i].HP <= 0 || this.ships[i].retreated) continue;
		this.AP += this.ships[i].airPower(eqtFilter);
	}
	return this.AP;
}
Fleet.prototype.fleetAntiAir = function(alreadyCombined,isRaid) {
	if (this._baseFAA === undefined) {
		this._baseFAA = 0;
		for (var i=0; i<this.ships.length; i++) {
			if (this.ships[i].HP <= 0) { continue; }
			if (this.ships[i].retreated) continue;
			for (var j=0; j<this.ships[i].equips.length; j++) {
				var equip = this.ships[i].equips[j];
				var mod = 0;
				switch(equip.atype) {
					case A_HAGUN:
					case A_HAFD:
					case A_AAFD:
						mod = .35; break;
					case A_AIRRADAR:
						mod = .4; break;
					case A_TYPE3SHELL:
						mod = .6; break;
					case A_XLGUN:
						mod = .25; break;
					default:
						mod = .2; break;
				}
				if (equip.AA) this._baseFAA += equip.AA * mod;
			}
			if (this.ships[i].improves.AAfleet) this._baseFAA += this.ships[i].improves.AAfleet;
		}
		this._baseFAA = Math.floor(this._baseFAA);
	}
	var FAA = this._baseFAA;
	if (alreadyCombined) return FAA;
	if (this.combinedWith) {
		FAA += this.combinedWith.fleetAntiAir(true,isRaid);
	}
	FAA = Math.floor(FAA*this.formation.AAmod);
	if (this.side == 0) FAA = FAA/1.3;
	if (this.combinedWith) {
		if (this.isescort) FAA *= .48;
		else FAA *= (isRaid ? .72 : .8);
	}
	return FAA;
}
Fleet.prototype.clearFleetAntiAir = function() {
	this._baseFAA = undefined;
}
Fleet.prototype.fleetLoS = function() {
	if (this._fLoS === undefined) {
		this._fLoS = 0;
		for (var i=0; i<this.ships.length; i++) {
			if (this.ships[i].HP <= 0) continue;
			if (this.ships[i].retreated) continue;
			this._fLoS += this.ships[i].statsBase.LOS;
			for (var j=0; j<this.ships[i].equips.length; j++) {
				var equip = this.ships[i].equips[j];
				if (equip.LOS) {
					if (equip.btype == B_RECON) this._fLoS += equip.LOS*Math.floor(Math.sqrt(this.ships[i].planecount[j]));
				}
			}
		}
	}
	return this._fLoS;
}
Fleet.prototype.clearFleetLoS = function() {
	this._fLoS = undefined;
}
Fleet.prototype.supportChance = function(isboss) {
	var c = (isboss)? .85 : .5;
	if (this.ships[0].morale > 49) c += .15;
	for (var i=1; i<this.ships.length; i++) if (this.ships[i].morale > 49) c += .05;
	return c;
}
Fleet.prototype.reset = function(notShips) {
	if (!notShips) {
		for (var i=0; i<this.ships.length; i++) this.ships[i].reset();
	}
	delete this.didSpecial;
	delete this.numSpecialKongou;
	this.resetBattle();
}
Fleet.prototype.resetBattle = function() {
	this.AS = 0;
	LandBase.airStatePrev = 0;
	this.clearFleetAntiAir();
	this.clearFleetLoS();
	this.DMGTOTALS.fill(0);
}
Fleet.prototype.giveCredit = function(ship,damage) {
	this.DMGTOTALS[this.ships.indexOf(ship)] += damage;
}
Fleet.prototype.getMVP = function() {
	var m = this.DMGTOTALS[0], ship = this.ships[0];
	for(var i=1; i<this.DMGTOTALS.length; i++) {
		if(this.DMGTOTALS[i] > m) { m = this.DMGTOTALS[i]; ship = this.ships[i]; }
	}
	return ship.id;
}
Fleet.prototype.setFormation = function(formNum,combineType) {
	if (formNum > 10 && this.combinedWith) {
		if (this.isescort) {
			this.combinedWith.formation = ALLFORMATIONS[''+combineType+formNum];
			this.formation = ALLFORMATIONS[''+combineType+formNum+'E'];
		} else {
			this.formation = ALLFORMATIONS[''+combineType+formNum];
			this.combinedWith.formation = ALLFORMATIONS[''+combineType+formNum+'E'];
		}
	} else {
		this.formation = ALLFORMATIONS[formNum];
	}
}
Fleet.prototype.getSupportType = function() {
	if (this.supportType != null) return this.supportType;
	let numDD = 0, numCV = 0, numAir1 = 0, numAir2 = 0, numShell = 0, numBB = 0, numCA = 0, numTorpedo = 0, hasBomber = false;
	for (let ship of this.ships) {
		if (ship.type == 'DD') numDD++;
		if (['CVL','CV','CVB'].includes(ship.type)) numCV++;
		if (['AV','LHA'].includes(ship.type)) numAir1++;
		if (['BBV','CAV','AO'].includes(ship.type)) numAir2++;
		if (['BB','FBB','CA'].includes(ship.type)) numShell++;
		if (['BB','FBB','BBV'].includes(ship.type)) numBB++;
		if (['CA','CAV'].includes(ship.type)) numCA++;
		if (['DD','CL','CLT'].includes(ship.type)) numTorpedo++;
		if (!hasBomber && ['CVL','CV','CVB','AV','LHA','BBV','CAV','AO'].includes(ship.type)) {
			if (ship.equips.find(eq => (eq.isdivebomber || eq.istorpbomber) && !eq.isLB)) hasBomber = true;
		}
	}
	if (!MECHANICS.LBASBuff) {
		if (numCV + numAir1 >= 3) return this.supportType = 1;
		if (numTorpedo >= 4) return this.supportType = 3;
		return this.supportType = 2;
	}
	if (numDD < 2) return this.supportType = 0;
	if (numShell <= 0 && (numCV || numAir1 >= 2 || numAir2 >= 2)) return this.supportType = (hasBomber ? 1 : 0);
	if (numShell && numCV + numAir1 >= 2) return this.supportType = (hasBomber ? 1 : 0);
	if (numBB >= 2) return this.supportType = 2;
	if (numBB + numCA >= 4) return this.supportType = 2;
	return this.supportType = 3;
}
Fleet.prototype.fleetELoS = function(coef,hq=120) {
	let elos = 0;
	let numShips = 0;
	for (let ship of this.ships) {
		if (ship.HP <= 0 || ship.retreated) continue;
		numShips++;
		let losShip = ship.statsBase.LOS + (ship.statsEqBonus.LOS || 0);
		let equipsNoBonus = ship.equips.filter(eq => [315].includes(eq.mid));
		losShip -= getBonusStats(ship.mid,equipsNoBonus.map(eq => eq.mid),equipsNoBonus.map(eq => eq.improve || 0)).LOS || 0;
		elos += Math.sqrt(losShip);
		
		for (let equip of ship.equips) {
			let mod = { 8: .8, 9: 1, 10: 1.2, 11: 1.1, 94: 1 }[equip.type] || .6;
			elos += coef*mod*((equip.LOS || 0) + (equip.improves.LOS || 0));
		}
	}
	elos -= Math.ceil(.4*hq);
	elos += 2*(6-numShips);
	return elos;
}
Fleet.prototype.isTorpedoSquadron = function() {
	if (this._isTS != null) return this._isTS;
	if (!this.ships[0]) return null;
	if (this.ships[0].type == 'CL' || this.ships[0].type == 'DD') {
		let numDD = 0, numCLT = 0, numShips = 0;
		for (let i=1; i<this.ships.length; i++) {
			if (this.ships[i].type == 'DD') numDD++;
			if (this.ships[i].type == 'CLT') numCLT++;
			numShips++;
		}
		if (numDD + numCLT >= numShips && numCLT <= 3 && numDD + +(this.ships[0].type == 'DD')) return this._isTS = true;
	}
	return this._isTS = false;
}
//----------

function Ship(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	this.id = 0;
	this.mid = id;
	if (!(typeof SHIPDATA == 'undefined')) {
		for (var key in SHIPDATA[id]) {  //load extra data
			if (['image','EQUIPS','SLOTS'].indexOf(key) == -1) this[key] = SHIPDATA[id][key];
		}
	}
	this.side = side;
	this.LVL = LVL;
	this.HP = HP;
	this.FP = FP;
	this.TP = TP;
	this.AA = AA;
	this.AR = AR;
	this.EV = EV;
	this.ASW = ASW;
	this.LOS = LOS;
	this.LUK = LUK;
	this.RNG = RNG;
	this.ACC = 0;
	this.maxHP = HP;
	// this.equipstats = {FP:0,TP:0,AA:0,AR:0,ACC:0,EV:0,ASW:0,LOS:0,RNG:0,DIVEBOMB:0};
	this.equiptypes = {};
	this.equiptypesB = {};
	this.equips = [];
	this.improves = {};
	this.fleet = false;
	this.isflagship = false;
	if (!planeslots) planeslots = [0,0,0,0];
	this.PLANESLOTS = planeslots;
	this.planecount = planeslots.slice();
	this.AACItype = [];
	this.fuelleft = 10;
	this.fuelDefault = 10;
	this.ammoleft = 10;
	this.ammoDefault = 10;
	this.protection = (side==0 && isPlayable(this.mid));
	this.LOSeq = 0;
	this.APtype = false;
	this.morale = 49;
	this.moraleDefault = 49;
	this.statsEqBonus = {};
	this.statsBase = { 'FP':FP,'TP':TP,'AA':AA,'AR':AR,'EV':EV,'ASW':ASW,'LOS':LOS };
	
	this._nbtypes = false;
	this._astype = false;
	this._aswpower = false;
	
	if (this.installtype) {
		this.isInstall = true;
	}
}
Ship.prototype.loadEquips = function(equips,levels,profs,addstats) {
	if (!equips || this.equips.length > 0) return;  //don't load if already have equips, do removeEquips() first
	var atypes = {};
	var installeqs = {DH1:0,DH2:0,DH3:0,TDH:0,TDH11:0,WG:0,AP:0,T3:0,SB:0,DB:0,DH1stars:0,DH3stars:0};
	var fitcounts = {};
	var tpEquip = 0;
	var aswPenetrate = 0;
	for (var i=0; i<equips.length; i++){
		if (!equips[i]) continue;
		var eq = new Equip(equips[i],levels[i],profs[i]);
		
		if (eq.RNG && eq.RNG > this.RNG) this.RNG = eq.RNG;
		if (eq.ACC) this.ACC += eq.ACC;
		this.equiptypes[eq.type] = this.equiptypes[eq.type] + 1 || 1;
		if (eq.btype) {
			if (!this.equiptypesB[eq.btype]) this.equiptypesB[eq.btype]=1;
			else this.equiptypesB[eq.btype]++;
		}
		if (eq.atype) {
			if (!atypes[eq.atype]) atypes[eq.atype]=1;
			else atypes[eq.atype]++;
			if (eq.atype == A_HAFD) {  //HAFD also counts as HAGUN
				atypes[A_HAGUN] = (!atypes[A_HAGUN])? 1 : atypes[A_HAGUN]+1;
			}
		}
		if (eq.type == TYPE3SHELL) this.hasT3Shell = true;
		if (eq.type == MIDGETSUB && !eq.cannotOpTorp) this.hasMidgetSub = true;
		if (eq.type == STARSHELL) this.hasStarShell = true;
		if (eq.type == SEARCHLIGHTS) this.hasSearchlight = 1;
		if (eq.type == SEARCHLIGHTL) this.hasSearchlight = 2;
		if (eq.isnightscout) this.hasNightScout = true;
		if (eq.type == PICKET) this.hasLookout = true;
		if ((eq.type == DIVEBOMBER || eq.type == JETBOMBER) && this.CVshelltype) this.hasDivebomber = true;
		if (eq.type == FCF) !this.hasFCF && (this.hasFCF = {}), this.hasFCF[equips[i]] = 1;
		if (eq.type == SUBRADAR) this.hasSubRadar = true;
		if (eq.specialCutIn) this.numSpecialTorp = this.numSpecialTorp+1 || 1;
		if (eq.type == REPAIR) {
			if (this.repairs) this.repairs.push(equips[i]);
			else this.repairs = [equips[i]];
		}
		if (eq.isjet) this.hasjet = true;
		
		if (eq.CANBbonus && this.type=='CA'||this.type=='CAV') {
			if (!this.ACCnbca || this.ACCnbca > eq.CANBbonus) this.ACCnbca = eq.CANBbonus; //10 overrides 15
		}
		
		if (this.fitclass && eq.fitclass) {
			if (!fitcounts[eq.fitclass]) fitcounts[eq.fitclass] = 1;
			else fitcounts[eq.fitclass]++;
		}
		
		//add improvement stats
		for (var key in eq.improves) {
			if (this.improves[key]) this.improves[key] += eq.improves[key];
			else this.improves[key] = eq.improves[key];
		}
		
		//installation equips
		if (eq.btype == B_LC1) { installeqs.DH1++; installeqs.DH1stars+=(eq.level||0); }
		else if(eq.btype == B_LC2) { installeqs.DH2++; this.hasDH2 = true; installeqs.DH1stars+=(eq.level||0); }
		else if(eq.btype == B_LC3) { installeqs.DH3++; this.hasDH3 = true; installeqs.DH3stars+=(eq.level||0); }
		else if(eq.type == APSHELL) installeqs.AP++;
		else if(eq.type == TYPE3SHELL) installeqs.T3++;
		else if(eq.type == SEAPLANEBOMBER) installeqs.SB++;
		else if(eq.type == SEAPLANEFIGHTER) installeqs.SB++;
		else if (eq.type == DIVEBOMBER || eq.type == JETBOMBER) installeqs.DB++;
		if (eq.mid == 230) installeqs.TDH11++;
		if (eq.mid == 193) installeqs.TDH++;
		if (eq.mid == 346) installeqs.mortar = installeqs.mortar + 1 || 1;
		if (eq.mid == 347) installeqs.mortarC = installeqs.mortarC + 1 || 1;
		if (eq.mid == 348) installeqs.rocket4 = installeqs.rocket4 + 1 || 1;
		if (eq.mid == 349) installeqs.rocket4C = installeqs.rocket4C + 1 || 1;
		if (eq.mid == 355) installeqs.m4a1 = installeqs.m4a1 + 1 || 1;
		if (eq.mid == 408) installeqs.soukoutei = installeqs.soukoutei + 1 || 1;
		if (eq.mid == 409) installeqs.armedDaihatsu = installeqs.armedDaihatsu + 1 || 1;
		if (eq.mid == 436) installeqs.panzer = installeqs.panzer + 1 || 1;
		if (eq.mid == 449) installeqs.tokuT1 = installeqs.tokuT1 + 1 || 1;
		if (eq.mid == 126) this.numWG = this.numWG + 1 || 1;
		
		if (eq.LOS) this.LOSeq += eq.LOS;
		if (eq.TP) tpEquip += eq.TP;
		
		if ([226,227].includes(eq.mid)) {
			aswPenetrate += Math.max(0, Math.sqrt(eq.ASW - 2) + +(this.type == 'DE'));
		}
		
		this.equips.push(eq);
	}
	
	this.updateProficiencyBonus();
	
	this.AACItype = this.getAACItype(atypes);
	if (addstats) {
		for (var i=0; i<this.equips.length; i++){
			var eq = this.equips[i];
			if (eq.FP) this.FP += eq.FP;
			if (eq.TP) this.TP += eq.TP;
			if (eq.AA) this.AA += eq.AA;
			if (eq.AR) this.AR += eq.AR;
			if (eq.EV) this.EV += eq.EV;
			if (eq.ASW) this.ASW += eq.ASW;
			if (eq.LOS) this.LOS += eq.LOS;
			if (eq.LUK) this.LUK += eq.LUK;
		}
	}
	
	if (this.equiptypesB[B_APSHELL]&&this.equiptypesB[B_MAINGUN]) {
		if (this.equiptypesB[B_RADAR]&&this.equiptypesB[B_SECGUN]) this.APtype = 4;
		else if (this.equiptypesB[B_SECGUN]) this.APtype = 3;
		else if (this.equiptypesB[B_RADAR]) this.APtype = 2;
		else this.APtype = 1;
	}
	
	for (var eqfitclass in fitcounts) { //BB fit
		if (eqfitclass > 100) continue;
		if (!this.ACCfit) this.ACCfit = 0;
		this.ACCfit += FITDATA[this.fitclass][eqfitclass]*Math.sqrt(fitcounts[eqfitclass]);
		if (!this.ACCfitN) this.ACCfitN = 0;
		this.ACCfitN += FITDATAN[this.fitclass][eqfitclass]*Math.sqrt(fitcounts[eqfitclass]);
	}
	if (this.fitclass==100) { //CL fit
		this.ACCfit = -2; this.FPfit = 0;
		if (fitcounts[101]) { this.ACCfit += 4*Math.sqrt(fitcounts[101]); this.FPfit += Math.sqrt(fitcounts[101]); }
		if (fitcounts[102]) { this.ACCfit += 3*Math.sqrt(fitcounts[102]); this.FPfit += 2*Math.sqrt(fitcounts[102]); }
	}
	
	var installbonus1 = 1 + (installeqs.DH1stars / (installeqs.DH1+installeqs.DH2))/50;
	var installbonus3 = 1 + (installeqs.DH3stars / installeqs.DH3)/30;
	
	let installModAll = 1;
	this.installFlat = 0;
	if (installeqs.TDH11 || installeqs.tokuT1) {
		installModAll *= 1.8;
		this.installFlat *= 1.8;
		this.installFlat += 25;
	}
	if (installeqs.m4a1) {
		installModAll *= 1.4;
		this.installFlat *= 1.4;
		this.installFlat += 35;
	}
	if (installeqs.tokuT1) {
		installModAll *= 1.3;
		this.installFlat *= 1.3;
		this.installFlat += 42;
	}
	
	let abSynergyMult = 1, abSynergyFlat = 0, numAB = (installeqs.soukoutei || 0) + (installeqs.armedDaihatsu || 0);
	if ((installeqs.soukoutei == 1 || installeqs.armedDaihatsu == 1) && (installeqs.soukoutei || 0) < 2 && (installeqs.armedDaihatsu || 0) < 2) {
		let numA = this.equips.filter(eq => [68,166,193,449].includes(eq.mid)).length;
		let numB = this.equips.filter(eq => [167,230].includes(eq.mid)).length;
		if (numA + numB) {
			abSynergyMult *= 1.2;
			abSynergyFlat += 10;
		}
		if (installeqs.soukoutei == 1 && installeqs.armedDaihatsu == 1) {
			if (numA + numB >= 2) {
				abSynergyMult *= 1.3;
				abSynergyFlat += 5;
			} else if (numB) {
				abSynergyMult *= 1.2;
				abSynergyFlat += 3;
			} else if (numA) {
				abSynergyMult *= 1.1;
				abSynergyFlat += 2;
			}
		}
	}
	installModAll *= abSynergyMult;
	this.installFlat *= abSynergyMult;
	this.installFlat += abSynergyFlat;
	
	if (this.numWG) this.installFlat += WGpower(this.numWG);
	if (installeqs.mortarC >= 4) this.installFlat += 180;
	else if (installeqs.mortarC == 3) this.installFlat += 150;
	else if (installeqs.mortarC == 2) this.installFlat += 110;
	else if (installeqs.mortarC) this.installFlat += 60;
	if (installeqs.mortar >= 4) this.installFlat += 90;
	else if (installeqs.mortar == 3) this.installFlat += 75;
	else if (installeqs.mortar == 2) this.installFlat += 55;
	else if (installeqs.mortar) this.installFlat += 30;
	if (installeqs.rocket4 >= 4) this.installFlat += 190;
	else if (installeqs.rocket4 == 3) this.installFlat += 160;
	else if (installeqs.rocket4 == 2) this.installFlat += 115;
	else if (installeqs.rocket4) this.installFlat += 55;
	if (installeqs.rocket4C >= 4) this.installFlat += 260;
	else if (installeqs.rocket4C == 3) this.installFlat += 230;
	else if (installeqs.rocket4C == 2) this.installFlat += 170;
	else if (installeqs.rocket4C) this.installFlat += 80;
	
	let hasLC = installeqs.DH1 || installeqs.DH2;
	let numMortar = (installeqs.mortar || 0) + (installeqs.mortarC || 0);
	let numRocket4 = (installeqs.rocket4 || 0) + (installeqs.rocket4C || 0);
	
	this.softSkinMult = 1;
	if (this.hasT3Shell) this.softSkinMult *= 2.5;
	if (MECHANICS.installRevamp) {
		if (this.numWG) this.softSkinMult *= 1.3;
		if (this.numWG >= 2) this.softSkinMult *= 1.4;
		if (numMortar) this.softSkinMult *= 1.2;
		if (numMortar >= 2) this.softSkinMult *= 1.3;
		if (numRocket4) this.softSkinMult *= 1.25;
		if (numRocket4 >= 2) this.softSkinMult *= 1.5;
		if (hasLC) this.softSkinMult *= 1.4;
		if (installeqs.TDH) this.softSkinMult *= 1.15;
		if (installeqs.m4a1) this.softSkinMult *= 1.1;
		if (installeqs.panzer) this.softSkinMult *= 1.5;
		if (installeqs.DH2) this.softSkinMult *= 1.5;
		if (installeqs.DH2 >= 2) this.softSkinMult *= 1.3;
		if (installbonus1 > 1) this.softSkinMult *= installbonus1;
		if (installeqs.DH3) this.softSkinMult *= 1.5 * installbonus3;
		if (installeqs.DH3 >= 2) this.softSkinMult *= 1.2;
		if (installeqs.SB) this.softSkinMult *= 1.2;
		this.softSkinMult *= installModAll;
		if (numAB) this.softSkinMultDay = 1.1;
		if (numAB >= 2) this.softSkinMultDay *= 1.1;
	} else {
		if (installeqs.TDH11) this.softSkinMult *= 1.39;
	}
	
	this.pillboxMult = (this.type=='DD'||this.type=='CL')? 1.4 : 1;
	if (this.numWG >= 2) this.pillboxMult*=2.72;
	else if (this.numWG == 1) this.pillboxMult*=1.6;
	if (numMortar) this.pillboxMult *= 1.3;
	if (numMortar >= 2) this.pillboxMult *= 1.5;
	if (numRocket4) this.pillboxMult *= 1.5;
	if (numRocket4 >= 2) this.pillboxMult *= 1.8;
	if (MECHANICS.installRevamp) {
		if (hasLC) this.pillboxMult *= 1.8;
		if (installeqs.TDH) this.pillboxMult *= 1.15;
		if (installeqs.m4a1) this.pillboxMult *= 2;
		if (installeqs.panzer) this.pillboxMult *= 1.5;
		if (installeqs.DH2 > 0) this.pillboxMult *= 1.5;
		if (installeqs.DH2 >= 2) this.pillboxMult *= 1.4;
		if (installbonus1 > 1) this.pillboxMult *= installbonus1;
		if (installeqs.DH3) this.pillboxMult *= 2.4 * installbonus3;
		if (installeqs.DH3 >= 2) this.pillboxMult *= 1.35;
		if (installeqs.DB >= 2) this.pillboxMult *= 2;
		this.pillboxMult *= installModAll;
		if (numAB) this.pillboxMultDay = 1.3;
		if (numAB >= 2) this.pillboxMultDay *= 1.2;
	} else {
		if (installeqs.DH2 >= 2) this.pillboxMult*=3*installbonus1;
		else if (installeqs.TDH11) this.pillboxMult*=2.2*installbonus1;
		else if (installeqs.DH2 == 1) this.pillboxMult*=2.15*installbonus1;
		else if (installeqs.TDH) this.pillboxMult*=2.05*installbonus1;
		else if (installeqs.DH1) this.pillboxMult*=1.8*installbonus1;
		if (installeqs.DH3 >= 2) this.pillboxMult*=3.2*installbonus3;
		else if (installeqs.DH3) this.pillboxMult*=2.4*installbonus3;
	}
	if (installeqs.AP) this.pillboxMult*=1.85;
	if (installeqs.SB) this.pillboxMult*=1.5;
	if (installeqs.DB) this.pillboxMult*=1.5;
	
	this.isoMult = 1;
	if (this.numWG >= 2) this.isoMult*=2.1;
	else if (this.numWG == 1) this.isoMult*=1.4;
	if (numMortar) this.isoMult *= 1.2;
	if (numMortar >= 2) this.isoMult *= 1.4;
	if (numRocket4) this.isoMult *= 1.3;
	if (numRocket4 >= 2) this.isoMult *= 1.65;
	if (MECHANICS.installRevamp) {
		if (hasLC) this.isoMult *= 1.8;
		if (installeqs.TDH) this.isoMult *= 1.15;
		if (installeqs.m4a1) this.isoMult *= 1.8;
		if (installeqs.panzer) this.isoMult *= 1.2;
		if (installeqs.DH2) this.isoMult *= 1.2;
		if (installeqs.DH2 >= 2) this.isoMult *= 1.4;
		if (installbonus1 > 1) this.isoMult *= installbonus1;
		if (installeqs.DH3) this.isoMult *= 2.4 * installbonus3;
		if (installeqs.DH3 >= 2) this.isoMult *= 1.35;
		if (installeqs.DB >= 2) this.isoMult *= 1.75;
		this.isoMult *= installModAll;
		if (numAB) this.isoMultDay = 1.3;
		if (numAB >= 2) this.isoMultDay *= 1.1;
	} else {
		if (installeqs.DH2 >= 2) this.isoMult*=3*installbonus1;
		else if (installeqs.TDH11) this.isoMult*=2.2*installbonus1;
		else if (installeqs.DH2 == 1) this.isoMult*=2.15*installbonus1;
		else if (installeqs.DH1) this.isoMult*=1.8*installbonus1;
		if (installeqs.DH3) this.isoMult*=2.4*installbonus3;
	}
	if (installeqs.T3) this.isoMult*=1.75;
	if (installeqs.DB) this.isoMult *= 1.4;
	
	this.harbourSummerMult = 1;
	if (MECHANICS.installRevamp) {
		if (this.numWG) this.harbourSummerMult*=1.4;
		if (this.numWG >= 2) this.harbourSummerMult*=1.2;
		if (numRocket4) this.harbourSummerMult *= 1.25;
		if (numRocket4) this.harbourSummerMult *= 1.4;
		if (numMortar) this.harbourSummerMult *= 1.1;
		if (numMortar >= 2) this.harbourSummerMult *= 1.15;
		if (hasLC) this.harbourSummerMult *= 1.7;
		if (installeqs.TDH) this.harbourSummerMult *= 1.2;
		if (installeqs.m4a1) this.harbourSummerMult *= 2;
		if (installeqs.panzer) this.harbourSummerMult *= 1.6;
		if (installeqs.DH2) this.harbourSummerMult *= 1.6;
		if (installeqs.DH2 >= 2) this.harbourSummerMult *= 1.5;
		if (installbonus1 > 1) this.harbourSummerMult *= installbonus1;
		if (installeqs.DH3) this.harbourSummerMult *= 2.8 * installbonus3;
		if (installeqs.DH3 >= 2) this.harbourSummerMult *= 1.5;
		if (installeqs.T3) this.harbourSummerMult *= 1.75;
		if (installeqs.AP) this.harbourSummerMult *= 1.3;
		if (installeqs.DB) this.harbourSummerMult *= 1.3;
		if (installeqs.DB >= 2) this.harbourSummerMult *= 1.25;
		if (installeqs.SB) this.harbourSummerMult *= 1.3;
		this.harbourSummerMult *= installModAll;
		if (numAB) this.harbourSummerMultDay = 1.5;
		if (numAB >= 2) this.harbourSummerMultDay *= 1.1;
	} else {
		this.harbourSummerMult = this.isoMult;
	}
	
	this.northernMult = 1;
	if (this.numWG >= 2) this.northernMult*=2.1;
	else if (this.numWG == 1) this.northernMult*=1.4;
	if (installeqs.TDH) this.northernMult*=1.8;
	if (installeqs.TDH11) this.northernMult*=2.2;
	if (installeqs.T3) this.northernMult*=1.75;
	
	this.supplyPostMult = 1;
	if (MECHANICS.installRevamp) {
		if (this.numWG) this.supplyPostMult*=1.25;
		if (this.numWG >= 2) this.supplyPostMult*=1.3;
		if (numRocket4) this.supplyPostMult *= 1.2;
		if (numRocket4 >= 2) this.supplyPostMult *= 1.4;
		if (numMortar) this.supplyPostMult *= 1.15;
		if (numMortar >= 2) this.supplyPostMult *= 1.2;
		if (hasLC) this.supplyPostMult *= 1.7 * installbonus1;
		if (installeqs.TDH) this.supplyPostMult *= 1.2;
		if (installeqs.DH2) this.supplyPostMult *= 1.3 * installbonus1;
		if (installeqs.DH2 >= 2) this.supplyPostMult *= 1.6;
		if (installeqs.m4a1) this.supplyPostMult *= 1.2;
		if (installeqs.panzer) this.supplyPostMult *= 1.3 * installbonus1;
		if (installeqs.DH3) this.supplyPostMult *= 1.7 * installbonus3;
		if (installeqs.DH3 >= 2) this.supplyPostMult *= 1.5;
		if (numAB) this.supplyPostMult *= 1.5;
		if (numAB >= 2) this.supplyPostMult *= 1.1;
	} else {
		if (this.numWG >= 2) this.supplyPostMult*=1.625;
		else if (this.numWG == 1) this.supplyPostMult*=1.25;
		if (installeqs.TDH11) this.supplyPostMult*=3.5*installbonus1;
		else if (installeqs.DH2 >= 2) this.supplyPostMult*=2.08*installbonus1;
		else if (installeqs.DH2 == 1) this.supplyPostMult*=1.3*installbonus1;
		if (installeqs.DH3 >= 2) this.supplyPostMult*=2.5*installbonus3;
		else if (installeqs.DH3 == 1) this.supplyPostMult*=1.7*installbonus3;
	}
	
	this.anchoragePostMult = 1;
	if (numMortar) this.anchoragePostMult *= 1.15;
	if (numRocket4) this.anchoragePostMult *= 1.2;
	if (this.numWG) this.anchoragePostMult *= 1.25;
	if (this.numWG >= 2) this.anchoragePostMult *= 1.3;
	if (hasLC) this.anchoragePostMult *= 1.45 * installbonus1;
	if (installeqs.DH2) this.anchoragePostMult *= 1.15;
	if (installeqs.DH2 >= 2) this.anchoragePostMult *= 1.4;
	if (installeqs.DH3) this.anchoragePostMult *= 2.4 * installbonus3;
	if (installeqs.DH3 >= 2) this.anchoragePostMult *= 1.35;
	if (installeqs.m4a1) this.anchoragePostMult *= 1.75;
	if (installeqs.panzer) this.anchoragePostMult *= 1.15;
	if (installeqs.T3) this.anchoragePostMult *= 1.35;
	if (installeqs.DB) this.anchoragePostMult *= 1.4;
	if (installeqs.DB >= 2) this.anchoragePostMult *= 1.5;
	
	
	this.ptDmgMod = 1;
	let numGuns = (this.equiptypes[MAINGUNS] || 0) + (this.equiptypes[MAINGUNSAA] || 0);
	if (numGuns) this.ptDmgMod *= 1.5;
	if (numGuns >= 2) this.ptDmgMod *= 1.4;
	if (this.equiptypes[SECGUN]) this.ptDmgMod *= 1.3;
	let numDB = Math.max(this.equiptypes[DIVEBOMBER] || 0, this.equiptypes[JETBOMBER] || 0);
	if (numDB) this.ptDmgMod *= 1.4;
	if (numDB >= 2) this.ptDmgMod *= 1.3;
	if (this.equiptypes[SEAPLANEBOMBER] || this.equiptypes[SEAPLANEFIGHTER]) this.ptDmgMod *= 1.2;
	if (this.equiptypes[AAGUN]) this.ptDmgMod *= 1.2;
	if (this.equiptypes[AAGUN] >= 2) this.ptDmgMod *= 1.2;
	if (this.equiptypes[PICKET]) this.ptDmgMod *= 1.1;
	let numAD = this.equips.filter(eq => eq.mid == 408 || eq.mid == 409).length;
	if (numAD) this.ptDmgMod *= 1.2;
	if (numAD >= 2) this.ptDmgMod *= 1.1;
	
	this.ptAccMod = .7;
	if (this.type == 'DD' || this.type == 'DE') this.ptAccMod = 1;
	if (this.type == 'CL' || this.type == 'CLT' || this.type == 'CT') this.ptAccMod = .82;
	if (this.equiptypes[MAINGUNS]) this.ptAccMod *= 1.3;
	if (this.equiptypes[MAINGUNS] >= 2) this.ptAccMod *= 1.15;
	if (this.equiptypes[SECGUN]) this.ptAccMod *= 1.55;
	if (this.equiptypes[AAGUN]) this.ptAccMod *= 1.45;
	if (this.equiptypes[AAGUN] >= 2) this.ptAccMod *= 1.35;
	if (this.equiptypes[PICKET]) this.ptAccMod *= 1.75;
	if (this.equiptypes[DIVEBOMBER]) this.ptAccMod *= 1.4;
	if (this.equiptypes[SEAPLANEBOMBER] || this.equiptypes[SEAPLANEFIGHTER]) this.ptAccMod *= 1.5;
	if (numAD) this.ptAccMod *= 1.45;
	
	if (this.repairs) this.repairsOrig = this.repairs.slice();
	
	if (MECHANICS.divebomberInstall && this.hasDivebomber) {
		for (let eq of this.equips) {
			if (eq.canShellInstall) {
				this.hasDivebomber = false;
				break;
			}
		}
	}
	
	this.hasTorpStat = this.TP - tpEquip > 0 && SHIPDATA[this.mid].TP > 0;
	
	if (aswPenetrate > 0) this.aswPenetrate = aswPenetrate;
	
	if (MECHANICS.eqBonus) {
		let equipsCur = [], levelsCur = [], bonusesPrev = {};
		for (let i=0; i<equips.length; i++) {
			equipsCur.push(equips[i]);
			levelsCur.push(levels[i]);
			let bonuses = getBonusStats(this.mid,equipsCur,levelsCur);
			for (let stat in bonuses) {
				this.equips[i].statsEqBonus[stat] = bonuses[stat] - (bonusesPrev[stat] || 0);
			}
			bonusesPrev = bonuses;
		}
		this.statsEqBonus = bonusesPrev;
		if (addstats) {
			for (let stat in this.statsEqBonus) {
				this[stat] += this.statsEqBonus[stat];
			}
		}
	}
	
	for (let stat of ['FP','TP','AA','AR','EV','ASW','LOS']) {
		this.statsBase[stat] = this[stat];
		for (let eq of this.equips) {
			this.statsBase[stat] -= eq[stat] || 0;
		}
		this.statsBase[stat] -= this.statsEqBonus[stat] || 0;
		this.statsBase[stat] = Math.max(0,this.statsBase[stat]);
	}
}
Ship.prototype.updateProficiencyBonus = function() {
	delete this.APbonus;
	delete this.critratebonus;
	delete this.critdmgbonus;
	delete this.ACCplane;
	var planeexp = 0, planecount = 0;
	for (let i=0; i<this.equips.length; i++) {
		let eq = this.equips[i];
		if (eq.APbonus) {
			if (!this.APbonus) this.APbonus = 0;
			this.APbonus += eq.APbonus;
		}
		if (eq.isdivebomber||eq.istorpbomber) {
			if (eq.exp > 0) {
				if (!this.critratebonus) this.critratebonus = 0;
				if (!this.critdmgbonus) this.critdmgbonus = 1;
				var mod = 0;
				if (eq.rank == 7) mod = 10;
				else if (eq.rank == 6) mod = 7;
				else if (eq.rank == 5) mod = 5;
				else if (eq.rank == 4) mod = 4;
				else if (eq.rank == 3) mod = 3;
				else if (eq.rank == 2) mod = 2;
				else if (eq.rank == 1) mod = 1;
				this.critratebonus += mod*((i==0)? .8 : .6);
				this.critdmgbonus += Math.floor(Math.sqrt(eq.exp) + mod)/((i==0)? 100:200);
				planeexp += eq.exp;
			}
			planecount++;
		}
	}
	if (planecount) {
		var avgexp = planeexp/planecount;
		if (avgexp >= 10) this.ACCplane = Math.sqrt(avgexp*.1);
		if (avgexp >= 100) this.ACCplane += 9;
		else if (avgexp >= 80) this.ACCplane += 6;
		else if (avgexp >= 70) this.ACCplane += 4;
		else if (avgexp >= 55) this.ACCplane += 3;
		else if (avgexp >= 40) this.ACCplane += 2;
		else if (avgexp >= 25) this.ACCplane += 1;
	}
}
Ship.prototype.getEquipBonusCVTorp = function() {
	let bonusMin = null, statMax = 0, carryMax = 0, slot = -1;
	for (let i=0; i<this.equips.length; i++) {
		let eq = this.equips[i];
		if (!eq.isdivebomber && !eq.istorpbomber) continue;
		if (!bonusMin || bonusMin > eq.statsEqBonus.TP) bonusMin = eq.statsEqBonus.TP;
		let stat = eq.isdivebomber ? eq.DIVEBOMB : eq.TP;
		if (stat > statMax) {
			statMax = stat;
			carryMax = this.planecount[i];
			slot = i;
		} else if (stat == statMax && this.planecount[i] > carryMax) {
			carryMax = this.planecount[i];
			slot = i;
		}
	}
	return bonusMin ? { bonus: bonusMin, slot: slot } : null;
}
Ship.prototype.getFormation = function() {
	if (!this.fleet || !this.fleet.formation) return null;
	if (this.fleet.formation.id != 6) return this.fleet.formation;
	let threshold = Math.floor(this.fleet.ships.length/2);
	return (this.num <= threshold)? VANGUARD1 : VANGUARD2;
}
Ship.prototype.addJetSteelCost = function() {
	this.jetSteelCost = this.jetSteelCost || 0;
	for (let i=0; i<this.equips.length; i++) {
		let equip = this.equips[i];
		if (!equip.isjet) continue;
		this.jetSteelCost += Math.round(this.planecount[i]*LBASDATA[equip.mid].cost*.2);
	}
}

Ship.prototype.canShell = function() { return (this.HP > 0); }
Ship.prototype.canStillShell = function() { return this.canShell(); }
Ship.prototype.canNB = function() { return (this.HP/this.maxHP > .25 && !this.retreated); }
Ship.prototype.canTorp = function() { return this.hasTorpStat && (this.HP/this.maxHP > .5); }
Ship.prototype.canOpTorp = function() { return this.hasMidgetSub; }
Ship.prototype.canASW = function() { return false; }
Ship.prototype.canOASW = function() { return this.canASW() && (this.alwaysOASW || (this.ASW >= 100 && this.equiptypesB[B_SONAR] && isPlayable(this.mid))); }
Ship.prototype.canASWNight = function() {
	if (this.planeasw == 1) return false;
	if (this.planeasw == 2) return this.statsBase.ASW > 0;
	return this.canASW();
}
Ship.prototype.canAS = function() { 
	if (this.HP/this.maxHP <= .25) return false;
	let hasRecon = null;
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].btype == B_RECON && this.planecount[i]) hasRecon = true;
	}
	if (MECHANICS.zuiunCI && this.canZuiunCI) {
		let types = this.AStype(), typesNow = [];
		for (let type of types) {
			if (type == 200 || type == 201) {
				if (this.canASZuiun(type)) typesNow.push(type);
			} else {
				if (hasRecon) typesNow.push(type);
			}
		}
		return typesNow.length ? typesNow : null;
	}
	return hasRecon && this.AStype();
}
Ship.prototype.canASZuiun = function(type) {
	if (!MECHANICS.zuiunCI || !this.canZuiunCI) return false;
	let numZuiun = 0, num634 = 0;
	for (let i=0; i<this.equips.length; i++) {
		let equip = this.equips[i];
		if ((!type || type == 200) && this.planecount[i] && equip.type == SEAPLANEBOMBER && equip.nameJP.indexOf('瑞雲') != -1) numZuiun++;
		if ((!type || type == 201) && this.planecount[i] && equip.type == DIVEBOMBER && equip.nameJP.indexOf('六三四空') != -1) num634++;
	}
	return numZuiun >= 2 ||	num634 >= 2;
}
Ship.prototype.canNBAirAttack = function() { return false; }
Ship.prototype.hasNBAirGear = function() { return false; }

Ship.prototype.NBtypes = function() {
	if (this._nbtypes) return this._nbtypes;
	this._nbtypes = [];
	var mguns = (this.equiptypesB[B_MAINGUN])? this.equiptypesB[B_MAINGUN] : 0;
	var sguns = (this.equiptypesB[B_SECGUN])? this.equiptypesB[B_SECGUN] : 0;
	var torps = (this.equiptypesB[B_TORPEDO])? this.equiptypesB[B_TORPEDO] : 0;
	
	if (this.canNBAirAttack()) {
		if (MECHANICS.CVCI) {
			let hasFuze = this.equips.some(eq => eq.mid == 320);
			if (this.equiptypesB[B_NIGHTFIGHTER] >= 2 && this.equiptypesB[B_NIGHTBOMBER]) {
				this._nbtypes.push(61);
			}
			if (this.equiptypesB[B_NIGHTFIGHTER] && this.equiptypesB[B_NIGHTBOMBER]) {
				this._nbtypes.push(62);
			}
			if ((this.equiptypesB[B_NIGHTFIGHTER] || this.equiptypesB[B_NIGHTBOMBER]) && hasFuze) {
				this._nbtypes.push(63);
			}
			if (this.equiptypesB[B_NIGHTFIGHTER]) {
				if ((this.equiptypesB[B_NIGHTFIGHTER] || 0) + (this.equiptypesB[B_NIGHTBOMBER] || 0) + (this.equiptypesB[B_NIGHTBOMBER2] || 0) >= 3) {
					this._nbtypes.push(64);
				}
			}
		}
		if (this.hasNBAirGear()) {
			return this._nbtypes;
		}
	}
	if (MECHANICS.destroyerNBCI && this.type == 'DD') {
		if (mguns && torps && this.equiptypesB[B_RADAR]) this._nbtypes.push(7);
		if (this.hasLookout && torps && this.equiptypesB[B_RADAR]) this._nbtypes.push(8);
		
		let hasTSLO = this.equips.some(eq => eq.mid == 412);
		let hasDrum = this.equips.some(eq => eq.mid == 75);
		if (hasTSLO && torps >= 2) this._nbtypes.push(9);
		if (hasTSLO && torps && hasDrum) this._nbtypes.push(10);
	}
	if (this.hasSubRadar && this.numSpecialTorp) torps++;
	
	if (mguns + sguns >= 2) this._hasNBDA = true;
	
	if (mguns >= 3) this._nbtypes.push(5); //triple gun cut-in
	else if (mguns >= 2 && sguns) this._nbtypes.push(4);  //gun cut-in
	else if (torps >= 2) this._nbtypes.push(3);  //torp cut-in
	else if (torps && mguns) this._nbtypes.push(2);  //mix cut-in
	else if (mguns+sguns >= 2) this._nbtypes.push(1);  //double attack
	return this._nbtypes;
}

Ship.prototype.NBchance = function() {
	if (this._nbchance === undefined) {
		this._nbchance = (this.isflagship)? 15 : 0;
		if (this.hasLookout) this._nbchance += 5;
		if (['DD','CL','CLT'].includes(this.type) && this.equips.find(eq => eq.mid == 412)) this._nbchance += 4;
		if (this.LUK >= 50) this._nbchance += Math.floor(65+Math.sqrt(this.LUK-50)+Math.sqrt(this.LVL)*.8);
		else this._nbchance += Math.floor(this.LUK+15+Math.sqrt(this.LVL)*.75);
	}
	return this._nbchance;
}

Ship.prototype.AStype = function() {
	if (this._astype) return this._astype;
	this._astype = [];
	
	if (MECHANICS.zuiunCI && this.canZuiunCI && this.equiptypesB[B_MAINGUN]) {
		if (this.canASZuiun(201)) this._astype.push(201);
		if (this.canASZuiun(200)) this._astype.push(200);
	}
	
	if (MECHANICS.CVCI && this.CVshelltype && !this.cannotCVCI) {
		if (this.equiptypes[DIVEBOMBER] && this.equiptypes[TORPBOMBER] && this.equiptypes[FIGHTER]) this._astype.push(71);
		if (this.equiptypes[DIVEBOMBER] >= 2 && this.equiptypes[TORPBOMBER]) this._astype.push(72);
		if (this.equiptypes[DIVEBOMBER] && this.equiptypes[TORPBOMBER]) this._astype.push(73);
	}
	
	var mguns = this.equiptypesB[B_MAINGUN] || 0, sguns = this.equiptypesB[B_SECGUN] || 0, radars = this.equiptypesB[B_RADAR] || 0, apshells = this.equiptypesB[B_APSHELL] || 0;
	var recons = this.equiptypesB[B_RECON] || 0;
	if (recons <= 0 || mguns <= 0) return this._astype;
	
	if (mguns >= 2 && apshells) this._astype.push(6);
	if (sguns && apshells) this._astype.push(5);
	if (sguns && radars) this._astype.push(4);
	if (sguns) this._astype.push(3);
	if (mguns >= 2) this._astype.push(2); //double attack
	
	return this._astype;
}

Ship.prototype.ASchance = function(ASstate) {
	if (ASstate < 1 || !this.canAS() || !this.AStype().length) return 0;
	var fleetLOS = Math.floor(Math.sqrt(this.fleet.fleetLoS())+this.fleet.fleetLoS()*.1);
	var luckLOS = Math.floor(Math.sqrt(this.LUK)+10);
	var ASchance;
	if (ASstate == 2) ASchance = Math.floor(luckLOS + 10 + .7*(this.LOSeq*1.6 + fleetLOS));
	else ASchance = Math.floor(luckLOS + .6*(this.LOSeq*1.2 + fleetLOS));
	if (this.isflagship) ASchance += 15;
	ASchance *= .01;
	return ASchance;
}

Ship.prototype.APmod = function(target) {
	if (!target.APweak) return 1;
	switch(this.APtype) {
		case 1: return 1.08;
		case 2: return 1.1;
		case 3: case 4: return 1.15;
		default: return 1;
	}
}

Ship.prototype.APacc = function(target) {
	if (!target.APweak) return 1;
	switch(this.APtype) {
		case 1: return 1.1;
		case 2: return 1.25;
		case 3: return 1.2
		case 4: return 1.3;
		default: return 1;
	}
}

function WGpower(num) {
	switch (num) {
		case 1: return 75;
		case 2: return 110;
		case 3: return 140;
		case 4: return 160;
		default: return 0;
	}
}

Ship.prototype.shellPower = function(target,base) {
	var bonus = (this.improves.Pshell)? Math.floor(this.improves.Pshell) : 0;
	//var shellbonus = (this.fleet && this.fleet.formation.shellbonus!==undefined)? this.fleet.formation.shellbonus : 5;
	var shellbonus = (base != null)? base+5 : 5;
	if (target && target.isInstall) {
		let fp = ((this.isSub)? this.FP + 30 : this.FP) + shellbonus + bonus;
		switch (target.installtype) {
			case 2: //artillery imp
				if (this.pillboxMult) return fp*this.pillboxMult*(this.pillboxMultDay || 1) + this.installFlat;
				break;
			case 4: //isolated island
				if (this.isoMult) return fp*this.isoMult*(this.isoMultDay || 1) + this.installFlat;
				break;
			case 5: //northernmost
				if (this.northernMult) return fp*this.northernMult*(this.northernMultDay || 1) + this.installFlat;
				break;
			case 6:
				if (this.harbourSummerMult) return fp*this.harbourSummerMult*(this.harbourSummerMultDay || 1) + this.installFlat;
				break;
			case 3: //supply depot
			default: //regular soft
				if (this.softSkinMult) return fp*this.softSkinMult*(this.softSkinMultDay || 1) + this.installFlat;
				break;
		}
	}
	return this.FP + shellbonus + bonus;
}

Ship.prototype.NBPower = function(target) {
	var bonus = (this.improves.Pnb)? Math.floor(this.improves.Pnb) : 0;
	if (target && target.isInstall) {
		let fp = ((this.isSub)? this.FP + 30 : this.FP) + bonus;
		switch (target.installtype) {
			case 2:
				if (this.pillboxMult) return fp*this.pillboxMult + this.installFlat;
				break;
			case 4:
				if (this.isoMult) return fp*this.isoMult + this.installFlat;
				break;
			case 5: //northernmost
				if (this.northernMult) return fp*this.northernMult + this.TP + this.installFlat;
				break;
			case 6:
				if (this.harbourSummerMult) return fp*this.harbourSummerMult + this.installFlat;
				break;
			default:
				if (this.softSkinMult) return fp*this.softSkinMult + this.installFlat;
				break;
		}
		return this.FP + bonus;
	}
	return this.FP + this.TP + bonus;
}

Ship.prototype.ASWPower = function() {
	if (this._aswpower) return this._aswpower;
	var equipASW = 0, hassonar = false, hassonarS = false, hasdc = false, hasdcP = false, hasdcO = false;
	for (var i=0; i<this.equips.length; i++) {
		if (!EQTDATA[this.equips[i].type].canASWDamage) continue;
		if (this.equips[i].ASW) equipASW += this.equips[i].ASW;
		if (this.equips[i].btype == B_SONAR) hassonar = true;
		if (this.equips[i].type == SONARS) hassonarS = true;
		if (this.equips[i].btype == B_DEPTHCHARGE) hasdc = true;
		if (this.equips[i].isDCProjector) hasdcP = true;
		if (this.equips[i].isDCOnly) hasdcO = true;
	}
	if (MECHANICS.eqBonusASW) {
		equipASW += this.statsEqBonus.ASW || 0;
	}
	var bonus = (this.improves.Pasw)? Math.floor(this.improves.Pasw) : 0;
	var synergyMod = 1;
	if (MECHANICS.aswSynergy) {
		if (hasdcP && hasdcO) synergyMod *= (hassonarS ? 1.25 : 1.1);
		if (hassonar && hasdc) synergyMod *= 1.15;
	}
	let classASW = this.planeasw ? 8 : 13;
	this._aswpower = Math.max(0, (2*Math.sqrt(this.statsBase.ASW) + 1.5*equipASW + classASW + bonus) * synergyMod);
	return this._aswpower;
}

Ship.prototype.damageMod = function(isTorp) {
	if (isTorp) {
		if (this.HP/this.maxHP <= .25) return 0;
		if (this.HP/this.maxHP <= .5) return .8;
		return 1;
	}
	if (this.HP/this.maxHP <= .25) return .4;
	if (this.HP/this.maxHP <= .5) return .7;
	return 1;
}
Ship.prototype.weightedAntiAir = function(isRaid) {
	if (this._wAA === undefined) {
		this._wAA = this.statsBase.AA/2;
		if (this.side==1) this._wAA = Math.sqrt(this.AA);
		if (this.equips.length) this._wAA = Math.floor(this._wAA);
		for (var i=0; i<this.equips.length; i++) {
			var mod = 0;
			switch (this.equips[i].atype) {
				case A_HAGUN:
				case A_HAFD:
				case A_AAFD:
					mod = 2; break;
				case A_AAGUN:
					mod = 3; break;
				case A_AIRRADAR:
					mod = 1.5; break;
				default:
					continue;
			}
			this._wAA += this.equips[i].AA * mod;
		}
		this._wAA += (this.improves.AAself)? this.improves.AAself : 0;
		this._wAA = Math.max(0,this._wAA);
	}
	let wAA = this._wAA;
	if (this.fleet.combinedWith) {
		if (this.isescort) wAA *= .48;
		else wAA *= (isRaid ? .72 : .8);
	}
	return wAA;
}

Ship.prototype.getAACItype = function(atypes) {
	var types = [];
	
	var concentrated = 0, hasID = {};
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].isconcentrated) { concentrated++; }
		hasID[this.equips[i].mid] = hasID[this.equips[i].mid] + 1 || 1;
	}
	
	if (this.hasBuiltInFD) {  //Akizuki-class
		if (atypes[A_HAGUN] >= 2 && atypes[A_AIRRADAR]) types.push(1);
		if (atypes[A_HAGUN] && atypes[A_AIRRADAR]) types.push(2);
		if (atypes[A_HAGUN] >= 2) types.push(3);
	}
	if (this.mid == 428 && concentrated && (atypes[A_HAGUN]||atypes[A_HAFD])) {   //428 = Maya Kai Ni
		if (atypes[A_AIRRADAR]) types.push(10);
		types.push(11);
	}
	if (this.mid == 141 && atypes[A_HAGUN] && atypes[A_AAGUN]) { //Isuzu Kai Ni
		if (atypes[A_AIRRADAR]) types.push(14);
		types.push(15);
	}
	if (this.mid == 470 && atypes[A_HAGUN] && atypes[A_AAGUN]) { //Kasumi Kai 2 B
		if (atypes[A_AIRRADAR]) types.push(16);
		types.push(17);
	}
	if (this.mid == 622 && atypes[A_HAGUN] && atypes[A_AAGUN] && atypes[A_AIRRADAR]) { //Yuubari Kai Ni
		types.push(16);
	}
	if (this.mid == 487 && concentrated && atypes[A_HAGUN] > (atypes[A_HAFD] || 0)) types.push(19); //Kinu Kai Ni (1)
	if (this.mid == 488 && atypes[A_HAGUN] && atypes[A_AIRRADAR]) types.push(21); //Yura Kai Ni
	if ([82,88,553,554].indexOf(this.mid) != -1 && hasID[274] && atypes[A_AIRRADAR] && atypes[A_TYPE3SHELL]) types.push(25); //Ise-class Kai

	if (this.sclass == 91) { //Fletcher-class
		let num5Mk30 = (hasID[313] || 0) + (hasID[284] || 0);
		if (hasID[308] >= 2) types.push(34);
		if (num5Mk30 >= 1 && hasID[308] >= 1) types.push(35);
		if (hasID[313] >= 2) types.push(37);
		if (num5Mk30 >= 2 && hasID[307]) types.push(36);
	}
	
	if (this.sclass == 99) { //Atlanta
		if (hasID[363] >= 2) types.push(38);
		if (hasID[363] && hasID[362]) types.push(39);
		if (hasID[307] && (hasID[363] || 0) + (hasID[362] || 0) >= 2) types.push(40);
		if ((hasID[363] || 0) + (hasID[362] || 0) >= 2) types.push(41);
	}
	
	var add6 = false;
	if (this.type=='BB'||this.type=='BBV'||this.type=='FBB') {  //is BB
		if (atypes[A_GUN] && atypes[A_TYPE3SHELL] && atypes[A_AAFD]) {
			if (atypes[A_AIRRADAR]) types.push(4);
			add6 = true;
		}
	}
	if (atypes[A_HAFD] >= 2 && atypes[A_AIRRADAR]) types.push(5);
	if (add6) types.push(6);
	if (MECHANICS.aaci8Up && atypes[A_HAFD] && atypes[A_AIRRADAR]) types.push(8); //changed 8 > 7 some time between 2018-04-21 - 2019-04-24?
	if (atypes[A_HAGUN] && atypes[A_AAFD] && atypes[A_AIRRADAR]) types.push(7);
	if (!MECHANICS.aaci8Up && atypes[A_HAFD] && atypes[A_AIRRADAR]) types.push(8);
	
	if (this.mid == 546 && hasID[275] && atypes[A_AIRRADAR]) types.push(26); //Musashi Kai Ni
	if ([82,88,553,554,148,546].indexOf(this.mid) != -1 && hasID[274] && atypes[A_AIRRADAR]) types.push(28); //Ise-class Kai + Musashi Kai
	if ((this.mid == 557 || this.mid == 558) && atypes[A_HAGUN] && atypes[A_AIRRADAR]) types.push(29); //Isokaze+Hamakaze B Kai
	
	if (atypes[A_HAGUN] && atypes[A_AAFD]) types.push(9);
	
	if((this.mid == 579 || this.mid == 630) && atypes[A_HAGUN] && atypes[A_AAGUN]) types.push(33); //Gotland Kai
	
	if (concentrated && atypes[A_AAGUN] >= 2 && atypes[A_AIRRADAR]) types.push(12);
	// if (concentrated && atypes[A_HAFD] && atypes[A_AIRRADAR]) return 13;
	
	if (this.mid == 418 && concentrated) types.push(18); //Satsuki Kai Ni
	if (this.mid == 487 && concentrated) types.push(20); //Kinu Kai Ni (2)
	if (this.mid == 548 && concentrated) types.push(22); //Fumizuki Kai Ni
	if ((this.mid == 539 || this.mid == 530) && atypes[A_AAGUN] > concentrated) types.push(23); //UIT-25, I-504
	if (this.mid == 477 || this.mid == 579 || this.mid == 630) { //Tenryuu Kai Ni + Gotland Kai
		if (atypes[A_HAGUN] >= 3) types.push(30);
		if (atypes[A_HAGUN] >= 2 && this.mid == 477) types.push(31);
	}
	if ((this.mid == 478 || this.mid == 477) && atypes[A_HAGUN] && atypes[A_AAGUN] > concentrated) types.push(24); //Tatsuta Kai Ni + Tenryuu Kai Ni
	if (([67,78,82,88,108].indexOf(this.sclass) != -1 || [149,150,151,152,591,592].indexOf(this.mid) != -1) && ((hasID[191] && hasID[300]) || (hasID[301] && hasID[191]) || (hasID[301] >= 2))) types.push(32); //royal navy + Kongou-class
	
	return types;
}

Ship.prototype.moraleMod = function(isTorp) {
	if (isTorp) {
		if (this.morale >= 50) return 1.3;
		if (this.morale >= 30) return 1;
		if (this.morale >= 20) return .7;
		return .35;
	}
	if (this.morale >= 50) return 1.2;
	if (this.morale >= 30) return 1;
	if (this.morale >= 20) return .8;
	return .5;
}

Ship.prototype.moraleModEv = function() {
	if (this.morale >= 50) return .7;
	if (this.morale >= 30) return 1;
	if (this.morale >= 20) return 1.2;
	return 1.4;
}

Ship.prototype.reset = function(notHP,notMorale) {
	if (!notHP) this.HP = (this.HPDefault != null)? this.HPDefault : this.maxHP;
	this.planecount = this.PLANESLOTS.slice();
	this.fuelleft = this.fuelDefault;
	this.ammoleft = this.ammoDefault;
	if (!notMorale) this.morale = this.moraleDefault;
	if (this.repairsOrig) this.repairs = this.repairsOrig.slice();
	if (this.side==0 && isPlayable(this.mid)) this.protection = true;
	if (this.retreated) this.retreated = false;
	delete this._fuelUnderway;
	delete this._ammoUnderway;
	let found = false;
	for (let eq of this.equips) {
		if (eq.rank != eq.rankInit) { eq.setProficiency(eq.rankInit || 0); found = true; }
	}
	if (found) this.updateProficiencyBonus();
	if (this.jetSteelCost) this.jetSteelCost = 0;
	// this._wAA = undefined;
}

Ship.prototype.airState = function() { return this.fleet.AS; }
Ship.prototype.airPower = function(eqtFilter) {
	eqtFilter = eqtFilter || 'isfighter';
	var ap = 0;
	for (var i=0; i<this.equips.length; i++) {
		if (this.planecount[i] <= 0) continue;
		if (this.equips[i][eqtFilter]) {
			ap += Math.floor(((this.equips[i].AA||0) + (this.equips[i].AAImprove||0)) * Math.sqrt(this.planecount[i]) + (this.equips[i].APbonus||0));
		}
	}
	return Math.floor(ap);
}
Ship.prototype.rocketBarrageChance = function() { return 0; }

//------------------

function DD(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
DD.prototype = Object.create(Ship.prototype);
DD.prototype.canASW = function() { return this.statsBase.ASW > 0; }

function CL(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 100;
}
CL.prototype = Object.create(Ship.prototype);
CL.prototype.canASW = DD.prototype.canASW;

function CLT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 100;
}
CLT.prototype = Object.create(Ship.prototype);
CLT.prototype.canASW = DD.prototype.canASW;

function CA(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CA.prototype = Object.create(Ship.prototype);
CA.prototype.APweak = true;

function BB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
BB.prototype = Object.create(Ship.prototype);
BB.prototype.enableSecondShelling = true;
BB.prototype.APweak = true;

function FBB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	BB.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
FBB.prototype = Object.create(BB.prototype);


function CAV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CAV.prototype = Object.create(Ship.prototype);
CAV.prototype.planeasw = 1;
CAV.prototype.APweak = true;
CAV.prototype.canASW = function() {
	for (var i=0; i<this.equips.length; i++) {
		if (this.planecount[i] <= 0) continue;
		if (EQTDATA[this.equips[i].type].isASWPlane && this.equips[i].ASW > 0) return true;
	}
	return false;
}
CAV.prototype.rocketBarrageChance = function() {
	let num = 0;
	for (let equip of this.equips) {
		if (equip.canBarrage) num++;
	}
	if (num <= 0) return 0;
	let base = 48, numBonus = 30 + 40*num, classBonus = 70*(this.sclass == 2);
	return (2*this.weightedAntiAir() + .9*this.LUK)/(400 - (base + numBonus + classBonus));
}

function BBV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	
	if (this.installtype) {
		this.shellPower = CV.prototype.shellPower;
		this.canShell = CV.prototype.canShell;
		this.canStillShell = CV.prototype.canStillShell;
		this.canStillShellDamage = CV.prototype.canStillShellDamage;
	}
}
BBV.prototype = Object.create(Ship.prototype);
BBV.prototype.planeasw = 1;
BBV.prototype.APweak = true;
BBV.prototype.enableSecondShelling = true;
BBV.prototype.canASW = CAV.prototype.canASW;
BBV.prototype.canOASW = function() {
	if (this.mid == 554) {
		if (this.equips.find(eq => eq.mid == 326 || eq.mid == 327)) return true;
		if (this.equips.filter(eq => eq.mid == 69 || eq.mid == 324 || eq.mid == 325).length >= 2) return true;
		return false;
	}
	return Ship.prototype.canOASW.call(this);
}
BBV.prototype.rocketBarrageChance = CAV.prototype.rocketBarrageChance;



function CV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CV.prototype = Object.create(Ship.prototype);
CV.prototype.canNB = function() { return (((this.nightattack && this.HP/this.maxHP > .25) || this.canNBAirAttack()) && !this.retreated); }
CV.prototype.canAS = function() {
	if (this.HP/this.maxHP <= .25) return false;
	let diveFlag = false, torpFlag = false;
	for (var i=0; i<this.equips.length; i++) {
		if(this.equips[i].type == DIVEBOMBER && this.planecount[i]) diveFlag = true;
		if(this.equips[i].type == TORPBOMBER && this.planecount[i]) torpFlag = true;
	}
	return diveFlag && torpFlag && this.AStype();
}
CV.prototype.APweak = true;
CV.prototype.canShell = function(isOASW) {
	if (this.HP <= 0) return false;
	if (isOASW) return true;
	for (let i=0; i<this.equips.length; i++) {
		if ((this.equips[i].isdivebomber || this.equips[i].istorpbomber) && this.planecount[i] > 0 && !this.equips[i].isLB) {
			return true;
		}
	}
	return false;
}
CV.prototype.canStillShell = function(isOASW) {
	if (isOASW) return this.HP > 0;
	return this.canStillShellDamage();
}
CV.prototype.canStillShellDamage = function() {
	return this.HP > this.maxHP*.5;
}
CV.prototype.CVshelltype = true;
CV.prototype.shellPower = function(target,base) {
	var dp = 0, tp = 0;
	let installOnly = MECHANICS.divebomberInstall && target && target.isInstall;
	for (var i=0; i<this.equips.length; i++) {
		if(this.equips[i].DIVEBOMB && (!installOnly || this.equips[i].canShellInstall)) dp += this.equips[i].DIVEBOMB;
		if(this.equips[i].TP) tp += this.equips[i].TP;
	}
	if (MECHANICS.eqBonusTorp) {
		let d = this.getEquipBonusCVTorp();
		if (d) {
			tp += d.bonus;
		}
	}
	var bonus = (base||0) + 5;
	if (target && target.isInstall) tp = 0;
	var improvebonus = (this.improves.Pshell)? Math.floor(this.improves.Pshell) : 0;
	let fp = this.FP + bonus + improvebonus;
	if (installOnly) {
		switch (target.installtype) {
			case 2: //artillery imp
				fp = fp*this.pillboxMult + this.installFlat;
				break;
			case 4: //isolated island
				fp = fp*this.isoMult + this.installFlat;
				break;
			case 5: //northernmost
				fp = fp*this.northernMult + this.installFlat;
				break;
			case 6:
				fp = fp*this.harbourSummerMult + this.installFlat;
				break;
			case 3: //supply depot
			default: //regular soft
				fp = fp*this.softSkinMult + this.installFlat;
				break;
		}
	}
	return 25 + Math.floor(1.5*(15 + fp + tp + Math.floor(1.3*dp)));   
}
CV.prototype.NBPower = function(target) {
	if (this.canNBAirAttack()) {
		let power = this.statsBase.FP;
		if (this.hasNBAirGear()) {
			for (let i=0; i<this.equips.length; i++) {
				let equip = this.equips[i];
				if (equip.btype != B_NIGHTFIGHTER && equip.btype != B_NIGHTBOMBER && equip.btype != B_NIGHTBOMBER2) continue;
				let mod = .3*((equip.FP || 0) + (equip.TP || 0) + (equip.ASW || 0) + (equip.DIVEBOMB || 0));
				power += (equip.FP || 0) + (equip.TP || 0) + Math.sqrt(equip.level || 0);
				if (equip.btype != B_NIGHTBOMBER2) {
					power += this.planecount[i]*3;
					mod *= 1.5;
				}
				power += mod*Math.sqrt(this.planecount[i]);
			}
		} else if (this.sclass == 78) {
			for (let i=0; i<this.equips.length; i++) {
				let equip = this.equips[i];
				if (equip.isSwordfish) {
					power += (equip.FP || 0) + (equip.TP || 0) + Math.sqrt(equip.level || 0);
				}
			}
		}
		return Math.max(0,power);
	}
	return Ship.prototype.NBPower.call(this,target);
}
CV.prototype.canNBAirAttack = function() {
	return (this.hasNBAirGear() || (this.sclass == 78 && this.equips.find(eq => eq.isSwordfish))) && (this.canStillShellDamage() || (!isPlayable(this.mid) && this.HP/this.maxHP > .25));
}
CV.prototype.hasNBAirGear = function() {
	return (this.equiptypesB[B_NIGHTCREW] || this.hasBuiltInNightCrew) && (this.equiptypesB[B_NIGHTFIGHTER] || this.equiptypesB[B_NIGHTBOMBER]);
}
CV.prototype.rocketBarrageChance = CAV.prototype.rocketBarrageChance;

function CVL(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	CV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CVL.prototype = Object.create(CV.prototype);
CVL.prototype.planeasw = 2;
CVL.prototype.canASW = function(isOASW) {
	if (isOASW && !isPlayable(this.mid)) return true;
	for (var i=0; i<this.equips.length; i++) {
		if (this.planecount[i] <= 0) continue;
		if (EQTDATA[this.equips[i].type].isASWPlane && this.equips[i].ASW > 0) return true;
	}
	return false;
}
CVL.prototype.canOASW = function() {
	if (!this.equips.find(eq => [DIVEBOMBER,TORPBOMBER,AUTOGYRO,ASWPLANE].indexOf(eq.type) != -1 && eq.ASW)) return false;
	if (this.alwaysOASW) return true;
	
	if (this.equips.find(eq => [TORPBOMBER,AUTOGYRO,ASWPLANE].indexOf(eq.type) != -1 && eq.ASW >= 7)) {
		let threshold = (this.equiptypesB[B_SONAR])? 50 : 65;
		let asw = this.ASW;
		if (!MECHANICS.eqBonusASW) {
			asw -= (this.statsEqBonus.ASW || 0);
		}
		if (asw >= threshold) return true;
	}
	
	return this.equiptypesB[B_SONAR] && this.ASW >= 100;
}
CVL.prototype.APweak = false;

function CVB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	CV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CVB.prototype = Object.create(CV.prototype);
CVB.prototype.canStillShellDamage = function() {
	return this.HP > this.maxHP*.25;
}


function SS(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
SS.prototype = Object.create(Ship.prototype);
SS.prototype.isSub = true;
SS.prototype.canShell = function() { return this.HP > 0 && (this.numWG || this.hasDH3); }
SS.prototype.canOpTorp = function() { return (this.HP > 0 && (this.LVL >= 10 || this.hasMidgetSub)); }

function SSV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	SS.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
SSV.prototype = Object.create(SS.prototype);

function AV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AV.prototype = Object.create(Ship.prototype);
AV.prototype.planeasw = 1;
AV.prototype.canASW = CAV.prototype.canASW;
AV.prototype.rocketBarrageChance = CAV.prototype.rocketBarrageChance;

function AO(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AO.prototype = Object.create(Ship.prototype);
AO.prototype.loadEquips = function(equips,levels,profs,addstats) {
	Ship.prototype.loadEquips.call(this,equips,levels,profs,addstats);
	
	if (this.canTBAirAttack && this.equips.find(eq => eq.type == TORPBOMBER)) {
		this.planeasw = 2;
		this.CVshelltype = true;
		this.shellPower = CV.prototype.shellPower;
		this.canShell = CV.prototype.canShell;
		this.canStillShell = CV.prototype.canStillShell;
		this.canStillShellDamage = CV.prototype.canStillShellDamage;
	}
}
AO.prototype.canASW = DD.prototype.canASW;

function AS(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AS.prototype = Object.create(Ship.prototype);

function AR(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AR.prototype = Object.create(Ship.prototype);

function CT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 100;
};
CT.prototype = Object.create(Ship.prototype);
CT.prototype.canASW = DD.prototype.canASW;

function LHA(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
LHA.prototype = Object.create(Ship.prototype);
LHA.prototype.planeasw = 1;
LHA.prototype.canASW = CAV.prototype.canASW;

function DE(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
DE.prototype = Object.create(Ship.prototype);
DE.prototype.canASW = DD.prototype.canASW;
DE.prototype.canOASW = function() {
	if (this.equiptypesB[B_SONAR] && this.ASW >= 60) return true;
	let aswEq = 0;
	for (let eq of this.equips) aswEq += eq.ASW || 0;
	return this.ASW >= 75 && aswEq >= 4;
}


function LandBase(equips,levels,profs) {
	this.side = 0;
	this.HP = 200;
	this.AR = 0;
	this.PLANESLOTS = [18,18,18,18];
	this.planecount = this.PLANESLOTS.slice();
	this.equips = [];
	for (var i=0; i<equips.length; i++) {
		this.equips.push(new Equip(equips[i],levels[i],profs[i],true));
	}
	this.AS = 0;
}
LandBase.prototype.airState = function() { return this.AS; }
LandBase.prototype.airPower = function(eqtFilter) {
	eqtFilter = eqtFilter || 'isPlane';
	var ap = 0, landscoutmod = 1;
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].type == LANDSCOUT) {
			if (this.equips[i].ACC >= 3) landscoutmod = 1.18;
			else if (this.equips[i].ACC <= 2 && landscoutmod < 1.15) landscoutmod = 1.15;
		}
		if (this.equips[i][eqtFilter]) {
			var base = (this.equips[i].AA||0) + (this.equips[i].AAImprove||0);
			if (this.equips[i].type == INTERCEPTOR) base += (this.equips[i].EV||0)*1.5;
			ap += Math.floor(base * Math.sqrt(this.planecount[i]) + (this.equips[i].APbonus||0));
		}
	}
	return Math.floor(ap * landscoutmod);
}
LandBase.prototype.fleetAirPower = LandBase.prototype.airPower;
LandBase.prototype.airPowerDefend = function() {
	var ap = 0, mod = 1;
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].isPlane) {
			var base = (this.equips[i].AA||0) + (this.equips[i].AAImprove||0);
			if (this.equips[i].type == INTERCEPTOR) base += (this.equips[i].EV||0) + (this.equips[i].ACC||0)*2;
			ap += Math.floor(base * Math.sqrt(this.planecount[i]) + (this.equips[i].APbonus||0));
		}
		var newmod = 1;
		if (this.equips[i].type == SEAPLANE || this.equips[i].type == FLYINGBOAT) {
			if (this.equips[i].LOS >= 9) newmod = 1.16;
			else if (this.equips[i].LOS == 8) newmod = 1.13;
			else newmod = 1.1;
		} else if (this.equips[i].type == CARRIERSCOUT) {
			if (this.equips[i].LOS >= 9) newmod = 1.3;
			else newmod = 1.2;
		} else if (this.equips[i].type == LANDSCOUT) {
			if (this.equips[i].ACC >= 3) newmod = 1.23;
			else if (this.equips[i].ACC <= 2) newmod = 1.18;
		}
		if (newmod > mod) mod = newmod;
	}
	return Math.floor(ap*mod);
}
LandBase.prototype.reset = function() {
	this.planecount = this.PLANESLOTS.slice();
	for (let eq of this.equips) {
		if (eq.rank != eq.rankInit) eq.setProficiency(eq.rankInit || 0);
	}
}
LandBase.prototype.getCost = function() {
	var cost = [0,0,0]; //fuel,ammo,baux
	for (var i=0; i<this.equips.length; i++) {
		var eq = this.equips[i];
		//sortie cost
		switch(eq.type) {
			case LANDBOMBER:
				cost[0] += Math.ceil(1.5*this.PLANESLOTS[i]);
				cost[1] += Math.floor(.7*this.PLANESLOTS[i]);
				break;
			case LANDBOMBERL:
				cost[0] += Math.ceil(2*this.PLANESLOTS[i]);
				cost[1] += Math.ceil(2*this.PLANESLOTS[i]);
				break;
			default:
				cost[0] += Math.ceil(this.PLANESLOTS[i]);
				cost[1] += Math.ceil(.6*this.PLANESLOTS[i]);
		}
		//resupply cost
		cost[0] += (this.PLANESLOTS[i] - this.planecount[i])*3;
		cost[2] += (this.PLANESLOTS[i] - this.planecount[i])*5;
	}
	return cost;
}
LandBase.createJetLandBase = function(landbases) {
	var equips = [], planecounts = [];
	for (var i=0; i<landbases.length; i++) {
		for (var j=0; j<landbases[i].equips.length; j++) {
			if (landbases[i].equips[j].isjet) { equips.push(landbases[i].equips[j]); planecounts.push(landbases[i].planecount[j]); }
		}
	}
	var jetLBAS = new LandBase([],[],[],);
	jetLBAS.equips = equips;
	jetLBAS.planecount = planecounts;
	jetLBAS.PLANESLOTS = planecounts.slice();
	return jetLBAS;
}

var PLANEDEFAULT = new Ship(0,'PLANEDEFAULT',0, 1,1, 0,0,0,0, 0, 0,0,3, 1);
PLANEDEFAULT.CVshelltype = true;

function Equip(equipid,level,rank,forLBAS) {
	for(var key in EQDATA[equipid]) this[key] = EQDATA[equipid][key];
	this.mid = +equipid;
	this.improves = {};
	this.statsEqBonus = {};
	
	var eq = EQDATA[equipid];
	if (EQTDATA[eq.type].isfighter) this.isfighter = true;
	if (EQTDATA[eq.type].isdivebomber) this.isdivebomber = true;
	if (EQTDATA[eq.type].istorpbomber) this.istorpbomber = true;
	if (EQTDATA[eq.type].isjet) this.isjet = true;
	if (EQTDATA[eq.type].isPlane) this.isPlane = true;
	if (EQTDATA[eq.type].isLB) this.isLB = true;
	if (EQTDATA[eq.type].canContact) this.canContact = true;
	if (EQTDATA[eq.type].canDetect) this.canDetect = true;
	if (EQTDATA[eq.type].canSupportASW && eq.ASW) this.canSupportASW = true;
	
	if (eq.btype == null && EQTDATA[eq.type].btype) {
		this.btype = EQTDATA[eq.type].btype;
		if (this.btype == B_RADAR && this.AA >= 2) this.atype = A_AIRRADAR;
	}
	if (eq.atype == null && EQTDATA[eq.type].atype) {
		this.atype = EQTDATA[eq.type].atype;
		if (this.image == 16) this.atype = A_HAGUN;
		if (this.atype == A_HAGUN && this.AA >= 8) this.atype = A_HAFD;
		if (this.atype == A_AAGUN && this.AA >= 9) this.isconcentrated = true;
	}
	
	if (level) this.setImprovement(level);
	if (rank) {
		this.setProficiency(rank,forLBAS);
		this.rankInit = rank;
	}
}
Equip.prototype.setImprovement = function(level) {
	this.level = level;
	switch (this.type) {
		case FIGHTER:
		case SEAPLANEFIGHTER:
		case INTERCEPTOR:
			this.AAImprove = .2*level;
			break;
		case DIVEBOMBER:
		case TORPBOMBER:
		case JETBOMBER:
			if (this.isFighterBomber) {
				this.AAImprove = .25*level;
			} else {
				this.improves.Pshell = .2*level;
				this.improves.Pasw = .2*level;
				this.airstrikePowerImprove = .2*level;
			}
			break;
		case SEAPLANEBOMBER:
			this.airstrikePowerImprove = .2*level;
			break;
		case AUTOGYRO:
			if (this.ASW >= 11) {
				this.improves.Pasw = .3*level;
			} else {
				this.improves.Pasw = .2*level;
			}
			break;
			
		case LANDBOMBER:
		case LANDBOMBERL:
			this.AAImprove = .5*Math.sqrt(level);
			this.airstrikePowerImprove = .7*Math.sqrt(level);
			break;
			
		case BULGEM:
			this.improves.AR = .2*level;
			break;
		case BULGEL:
			this.improves.AR = .3*level;
			break;
	}
	
	var improve = (this.improve)? this.improve : EQTDATA[this.type].improve;
	if (!improve) return;
	for (var key in improve) {
		this.improves[key] = improve[key]*Math.sqrt(level);
	}
	
	if (this.atype == A_HAGUN) {
		this.improves.AAfleet = 2*Math.sqrt(level);
		this.improves.AAself = Math.sqrt(level);
	}
	if (this.atype == A_HAFD) {
		this.improves.AAfleet = 3*Math.sqrt(level);
		this.improves.AAself = 1.5*Math.sqrt(level);
	}
	if (this.atype == A_AAGUN) {
		let mod = this.AA >= 8 ? 3 : 2;
		this.improves.AAself = mod*Math.sqrt(level);
	}
	if (this.atype == A_AAFD) {
		let mod = this.AA >= 8 ? 1.5 : 1;
		this.improves.AAself = mod*Math.sqrt(level);
	}
	
	if ([12,234].includes(this.mid)) {
		this.improves.Pshell = .3*level;
	}
	if ([10,66,220,275,358].includes(this.mid)) {
		this.improves.Pshell = .2*level;
	}
	
	if (this.type == RADARS || this.type == RADARL) {
		if (this.ACC >= 3) {
			this.improves.ACCshell = 1.7*Math.sqrt(level);
			this.improves.ACCnb = 1.6*Math.sqrt(level);
		}
		if (this.AA >= 2) {
			this.improves.AAfleet = 1.5*Math.sqrt(level);
		}
	}
	
	if (this.isDCOnly) {
		this.improves.Pshell = 0;
	}
}
Equip.prototype.setProficiency = function(rank,forLBAS) {
	if (!EQTDATA[this.type].isPlane) return;
	if (rank > 1000) {
		rank -= 1000;
		this.exp = rank;
		if (this.exp >= 100) this.rank = 7;
		else if (this.exp >= 80) this.rank = 6;
		else if (this.exp >= 70) this.rank = 5;
		else if (this.exp >= 55) this.rank = 4;
		else if (this.exp >= 40) this.rank = 3;
		else if (this.exp >= 25) this.rank = 2;
		else if (this.exp >= 10) this.rank = 1;
		else this.rank = 0;
	} else {
		this.rank = rank;
		this.exp = [0,10,25,40,55,70,80,120][rank];
	}
	this.APbonus = Math.sqrt(this.exp*.1);
	switch (this.type) {
		case FIGHTER:
		case SEAPLANEFIGHTER:
		case INTERCEPTOR:
			this.APbonus += [0,0,2,5,9,14,14,22][this.rank]; break;
		case SEAPLANEBOMBER:
			this.APbonus += [0,0,1,1,1,3,3,6][this.rank]; break;
		case TORPBOMBER:
		case DIVEBOMBER:
		case JETBOMBER:
			break;
		default:
			if (!forLBAS) this.APbonus = 0;
			break;
	}
}