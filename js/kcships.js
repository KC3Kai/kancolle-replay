
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
	this.DMGTOTALS = [0,0,0,0,0,0];
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
		}
		if (this.isescort) ships[i].isescort = true;
	}
	this.ships[0].isflagship = true;
}
Fleet.prototype.fleetAirPower = function(jetonly,includeScout) {  //get air power
	this.AP = 0;
	for (var i=0; i<this.ships.length; i++) {
		if (this.ships[i].HP <= 0 || this.ships[i].retreated) continue;
		this.AP += this.ships[i].airPower(jetonly,includeScout);
	}
	return this.AP;
}
Fleet.prototype.fleetAntiAir = function(alreadyCombined) {
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
				if (equip.AA) this._baseFAA += Math.floor(equip.AA * mod);
			}
			if (this.ships[i].improves.AAfleet) this._baseFAA += this.ships[i].improves.AAfleet;
		}
		if (this.side == 0) this._baseFAA /= 1.3; //player side fleetAA is lower?
	}
	var FAA = this._baseFAA*2*this.formation.AAmod;
	if (this.combinedWith) {
		FAA *= ((this.isescort)? .48 : .72);
		if (!alreadyCombined) FAA += this.combinedWith.fleetAntiAir(true);
	}
	// console.log('FLEET ANTI-AIR: '+FAA);
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
			this._fLoS += this.ships[i].LOS;
			for (var j=0; j<this.ships[i].equips.length; j++) {
				var equip = this.ships[i].equips[j];
				if (equip.LOS) {
					this._fLoS -= equip.LOS;
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
	if (!notShips) { for (var i=0; i<this.ships.length; i++) this.ships[i].reset();}
	this.AS = 0;
	this.DMGTOTALS = [0,0,0,0,0,0];
	this._baseFAA = undefined;
	this._fLoS = undefined;
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
	var planeexp = 0, planecount = 0;
	var installeqs = {DH1:0,DH2:0,DH3:0,WG:0,AP:0,T3:0,SB:0,SF:0,DH1stars:0,DH3stars:0};
	var fitcounts = {};
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
		if (eq.type == WG42) this.numWG = (this.numWG)? this.numWG+1 : 1;
		if (eq.type == MIDGETSUB) this.hasMidgetSub = true;
		if (eq.type == STARSHELL) this.hasStarShell = true;
		if (eq.type == SEARCHLIGHTS) this.hasSearchlight = 1;
		if (eq.type == SEARCHLIGHTL) this.hasSearchlight = 2;
		if (eq.isnightscout) this.hasNightScout = true;
		if (eq.type == PICKET) this.hasLookout = true;
		if (eq.type == DIVEBOMBER || eq.type == JETBOMBER) this.hasDivebomber = true;
		if (eq.type == FCF) this.hasFCF = equips[i];
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
		
		//add plane proficiency
		if (eq.APbonus) {
			if (!this.APbonus) this.APbonus = 0;
			this.APbonus += eq.APbonus;
		}
		if (eq.isdivebomber||eq.istorpbomber) {
			if (eq.rank > 5) {
				if (!this.critratebonus) this.critratebonus = 0;
				if (!this.critdmgbonus) this.critdmgbonus = 1;
				var mod;
				if (eq.rank == 7) mod = 8;
				else if (eq.rank == 6) mod = 5.6;
				this.critratebonus += mod*.75; //x.75????
				this.critdmgbonus += (Math.sqrt(eq.exp*1.2) + mod)/((i==0)? 100:200); //seems browser version is actually +.1 on max? added 1.2
			}
			if (eq.exp) planeexp += eq.exp;
			planecount++;
		}
		
		//installation equips
		if (eq.btype == B_LC1) { installeqs.DH1++; installeqs.DH1stars+=(eq.level||0); }
		else if(eq.btype == B_LC2) { installeqs.DH2++; this.hasDH2 = true; installeqs.DH1stars+=(eq.level||0); }
		else if(eq.btype == B_LC3) { installeqs.DH3++; this.hasDH3 = true; installeqs.DH3stars+=(eq.level||0); }
		else if(eq.type == APSHELL) installeqs.AP++;
		else if(eq.type == TYPE3SHELL) installeqs.T3++;
		else if(eq.type == SEAPLANEBOMBER) installeqs.SB++;
		else if(eq.type == SEAPLANEFIGHTER) installeqs.SB++;
		if (eq.mid == 230) installeqs.TDH11 = 1;
		if (eq.mid == 193) installeqs.TDH = 1;
		
		if (eq.LOS) this.LOSeq += eq.LOS;
		
		this.equips.push(eq);
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
	this.AACItype = this.getAACItype(atypes);
	if (addstats) {
		for (var i=0; i<equips.length; i++){
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
	
	this.pillboxMult = (this.type=='DD'||this.type=='CL')? 1.4 : 1;
	if (this.numWG >= 2) this.pillboxMult*=2.72;
	else if (this.numWG == 1) this.pillboxMult*=1.6;
	if (installeqs.DH2 >= 2) this.pillboxMult*=3*installbonus1;
	else if (installeqs.DH2 == 1) this.pillboxMult*=2.15*installbonus1;
	else if (installeqs.DH1) this.pillboxMult*=1.8*installbonus1;
	if (installeqs.DH3 >= 2) this.pillboxMult*=3.2*installbonus3;
	else if (installeqs.DH3) this.pillboxMult*=2.4*installbonus3;
	if (installeqs.AP) this.pillboxMult*=1.85;
	if (installeqs.SB) this.pillboxMult*=1.5;
	
	this.isoMult = 1;
	if (this.numWG >= 2) this.isoMult*=2.1;
	else if (this.numWG == 1) this.isoMult*=1.4;
	if (installeqs.DH2 >= 2) this.isoMult*=3*installbonus1;
	else if (installeqs.DH2 == 1) this.isoMult*=2.15*installbonus1;
	else if (installeqs.DH1) this.isoMult*=1.8*installbonus1;
	if (installeqs.DH3) this.isoMult*=2.4*installbonus3;
	if (installeqs.T3) this.isoMult*=1.75;
	
	this.northernMult = 1;
	if (this.numWG >= 2) this.northernMult*=2.1;
	else if (this.numWG == 1) this.northernMult*=1.4;
	if (installeqs.TDH) this.northernMult*=1.8;
	if (installeqs.TDH11) this.northernMult*=2.2;
	if (installeqs.T3) this.northernMult*=1.75;
	
	this.supplyPostMult = 1;
	if (this.numWG >= 2) this.supplyPostMult*=1.625;
	else if (this.numWG == 1) this.supplyPostMult*=1.25;
	if (installeqs.DH2 >= 2) this.supplyPostMult*=2;
	else if (installeqs.DH2 == 1) this.supplyPostMult*=1.3;
	if (installeqs.DH3) this.supplyPostMult*=1.7;
	
	this.ptDmgMod = 1;
	this.ptAccMod = 1;
	let numGuns = (this.equiptypes[MAINGUNS] || 0) + (this.equiptypes[MAINGUNSAA] || 0) + (this.equiptypes[SECGUN] || 0) + (this.equiptypes[AAGUN] || 0);
	if (numGuns >= 2) this.ptDmgMod *= 2;
	if (this.type == 'DD' && this.equiptypesB[B_MAINGUN]) this.ptAccMod *= 1.5;
	if (this.equiptypesB[SECGUN] && ['CL','CLT','CT','CA','CAV','FBB'].indexOf(this.type) != -1) this.ptAccMod *= 1.4;
	let numSGuns = (this.equiptypes[MAINGUNS] || 0) + (this.equiptypes[MAINGUNSAA] || 0);
	if (numSGuns >= 2) this.ptAccMod *= 1.2;
	else if (numSGuns == 1) this.ptAccMod *= 1.1;
	if (this.equiptypes[PICKET]) this.ptAccMod *= 2;
	if (this.equiptypes[AAGUN] >= 2) this.ptAccMod *= 2;
	else if (this.equiptypes[AAGUN] == 1) this.ptAccMod *= 1.5;
	if (this.equiptypes[SEAPLANEBOMBER]) this.ptAccMod *= 2;
	
	if (this.repairs) this.repairsOrig = this.repairs.slice();
}
Ship.prototype.getFormation = function() {
	if (!this.fleet || !this.fleet.formation) return null;
	if (this.fleet.formation.id != 6) return this.fleet.formation;
	let threshold = Math.floor(this.fleet.ships.length/2);
	return (this.num <= threshold)? VANGUARD1 : VANGUARD2;
}

Ship.prototype.canShell = function() { return (this.HP > 0); }
Ship.prototype.canStillShell = function() { return this.canShell(); }
Ship.prototype.canNB = function() { return (this.HP/this.maxHP > .25 && !this.retreated); }
Ship.prototype.canTorp = function() { return (this.HP/this.maxHP > .5); }
Ship.prototype.canOpTorp = function() { return this.hasMidgetSub; }
Ship.prototype.canASW = function() { return false; }
Ship.prototype.OASWstat = 100;
Ship.prototype.canOASW = function() { return this.canASW() && (this.alwaysOASW || (this.ASW >= this.OASWstat && this.equiptypesB[B_SONAR] && isPlayable(this.mid))); }
Ship.prototype.canAS = function() { 
	if (this.HP/this.maxHP <= .25) return false;
	for (var i=0; i<this.equips.length; i++) {
		if(this.equips[i].btype == B_RECON && this.planecount[i]) return true;
	}
	return false;
}
Ship.prototype.canNBAirAttack = function() { return false; }

Ship.prototype.NBtypes = function() {
	if (this._nbtypes) return this._nbtypes;
	this._nbtypes = [];
	var mguns = (this.equiptypesB[B_MAINGUN])? this.equiptypesB[B_MAINGUN] : 0;
	var sguns = (this.equiptypesB[B_SECGUN])? this.equiptypesB[B_SECGUN] : 0;
	var torps = (this.equiptypesB[B_TORPEDO])? this.equiptypesB[B_TORPEDO] : 0;
	
	if (MECHANICS.CVCI && this.canNBAirAttack() && this.equiptypesB[B_NIGHTFIGHTER]) {
		if (this.equiptypesB[B_NIGHTFIGHTER] >= 2 && this.equiptypesB[B_NIGHTBOMBER]) this._nbtypes.push(61);
		if (this.equiptypesB[B_NIGHTBOMBER]) this._nbtypes.push(62);
		if (this.equiptypesB[B_NIGHTFIGHTER] >= 3) {
			this._nbtypes.push(63);
		} else if (this.equiptypesB[B_NIGHTBOMBER2]) {
			if ((this.equiptypesB[B_NIGHTFIGHTER] || 0) + (this.equiptypesB[B_NIGHTBOMBER] || 0) + (this.equiptypesB[B_NIGHTBOMBER2] || 0) >= 3) {
				this._nbtypes.push(63);
			}
		}
		// if ((this.equiptypesB[B_NIGHTFIGHTER] || 0) + (this.equiptypesB[B_NIGHTBOMBER] || 0) + (this.equiptypesB[B_NIGHTBOMBER2] || 0) >= 3) {
			// this._nbtypes.push(63);
		// }
	}
	if (MECHANICS.destroyerNBCI && this.type == 'DD') {
		if (mguns && torps && this.equiptypesB[B_RADAR]) this._nbtypes.push(7);
		if (this.hasLookout && torps && this.equiptypesB[B_RADAR]) this._nbtypes.push(8);
	}
	
	if (torps >= 2) this._nbtypes.push(3);  //torp cut-in
	else if (mguns >= 3) this._nbtypes.push(5); //triple gun cut-in
	else if (mguns >= 2 && sguns) this._nbtypes.push(4);  //gun cut-in
	else if (torps && mguns) this._nbtypes.push(2);  //mix cut-in
	else if (mguns+sguns >= 2) this._nbtypes.push(1);  //double attack
	return this._nbtypes;
}

Ship.prototype.NBchance = function() {
	if (this._nbchance === undefined) {
		this._nbchance = (this.isflagship)? 15 : 0;
		if (this.hasLookout) this._nbchance += 5;
		if (this.LUK >= 50) this._nbchance += Math.floor(65+Math.sqrt(this.LUK-50)+Math.sqrt(this.LVL)*.8);
		else this._nbchance += Math.floor(this.LUK+15+Math.sqrt(this.LVL)*.75);
	}
	return this._nbchance;
}

Ship.prototype.AStype = function() {
	if (this._astype) return this._astype;
	this._astype = [];
	
	if (MECHANICS.CVCI && this.CVshelltype) {
		if (this.equiptypes[DIVEBOMBER] && this.equiptypes[TORPBOMBER] && this.equiptypes[FIGHTER]) this._astype.push(71);
		if (this.equiptypes[DIVEBOMBER] >= 2 && this.equiptypes[TORPBOMBER]) this._astype.push(72);
		if (this.equiptypes[DIVEBOMBER] && this.equiptypes[TORPBOMBER]) this._astype.push(73);
	}
	
	var mguns = this.equiptypesB[B_MAINGUN], sguns = this.equiptypesB[B_SECGUN], radars = this.equiptypesB[B_RADAR], apshells = this.equiptypesB[B_APSHELL];
	var recons = (this.equiptypesB[B_RECON])? this.equiptypesB[B_RECON] : 0;
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
		switch (target.installtype) {
			case 2: //artillery imp
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.pillboxMult) return this.FP*this.pillboxMult + shellbonus + bonus;
				break;
			case 3: //supply depot
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.hasT3Shell) return this.FP*2.5 + shellbonus + bonus;
				break;
			case 4: //isolated island
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.isoMult) return this.FP*this.isoMult + shellbonus + bonus;
				break;
			case 5: //northernmost
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.northernMult) return this.FP*this.northernMult + shellbonus + bonus;
				break;
			default: //regular soft
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.hasT3Shell) return this.FP*2.5 + shellbonus + bonus;
				break;
		}
	}
	return this.FP + shellbonus + bonus;
}

Ship.prototype.NBPower = function(target) {
	var bonus = (this.improves.Pnb)? Math.floor(this.improves.Pnb) : 0;
	if (target && target.isInstall) {
		switch (target.installtype) {
			case 2:
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.pillboxMult) return this.FP*this.pillboxMult + bonus;
				break;
			case 3:
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.hasT3Shell) return this.FP*2.5 + bonus;
				break;
			case 4:
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.isoMult) return this.FP*this.isoMult + bonus;
				break;
			case 5: //northernmost
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.northernMult) return this.FP*this.northernMult + this.TP + bonus;
				break;
			default:
				if (this.numWG) bonus += WGpower(this.numWG);
				if (this.hasT3Shell) return this.FP*2.5 + bonus;
				break;
		}
		return this.FP + bonus;
	}
	return this.FP + this.TP + bonus;
}

Ship.prototype.ASWPower = function() {
	if (this._aswpower) return this._aswpower;
	var equipASW = 0, hassonar = false, hasdc = false, hasdc2 = false;
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].ASW) equipASW += this.equips[i].ASW;
		if (this.equips[i].btype == B_SONAR) hassonar = true;
		if (this.equips[i].btype == B_DEPTHCHARGE) hasdc = true;
		if (this.equips[i].btype == B_DEPTHCHARGE2) hasdc2 = true;
	}
	var bonus = (this.improves.Pasw)? Math.floor(this.improves.Pasw) : 0;
	var mod2 = 1, synergyMod = 1;
	if (MECHANICS.aswSynergy) {
		if (hassonar && hasdc2) mod2 += .15;
		if (hasdc && hasdc2) mod2 += .1;
		synergyMod = (hassonar && hasdc)? 1.15 : 1;
	}
	this._aswpower = (2*Math.sqrt(this.ASW-equipASW)+1.5*equipASW+((this.planeasw)? 8 : 13)+bonus) * synergyMod * mod2;
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
Ship.prototype.weightedAntiAir = function() {
	if (this._wAA === undefined) {
		this._wAA = this.AA;
		for (var i=0; i<this.equips.length; i++) if (this.equips[i].AA) this._wAA -= this.equips[i].AA; //get base AA
		if (this.side==1) this._wAA = 2*Math.sqrt(this._wAA);
		for (var i=0; i<this.equips.length; i++) {
			var mod = 0;
			switch (this.equips[i].atype) {
				case A_HAGUN:
				case A_HAFD:
				case A_AAFD:
					mod = 4; break;
				case A_AAGUN:
					mod = 6; break;
				case A_AIRRADAR:
					mod = 3; break;
				default:
					continue;
			}
			this._wAA += this.equips[i].AA * mod;
		}
		this._wAA += (this.improves.AAself)? 2*this.improves.AAself : 0;
		if (this.fleet.combinedWith) {
			if (this.isescort) this._wAA*=.48;
			else this._wAA*=.72;
		}
	}
	return this._wAA;
}

Ship.prototype.getAACItype = function(atypes) {
	var types = [];
	if (this.side == 1) return types; //enemy can't do AACI?
	
	var concentrated = false, hasID = {};
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].isconcentrated) { concentrated = true; }
		hasID[this.equips[i].mid] = true;
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
	if (this.mid == 418 && concentrated) types.push(18); //Satsuki Kai Ni
	if (this.mid == 487 && concentrated) { //Kinu Kai Ni
		if (atypes[A_HAGUN]) types.push(19);
		types.push(20);
	}
	if (this.mid == 488 && atypes[A_HAGUN] && atypes[A_AIRRADAR]) types.push(21); //Yura Kai Ni
	if (this.mid == 548 && concentrated) types.push(22); //Fumizuki Kai Ni
	if ((this.mid == 539 || this.mid == 530) && atypes[A_AAGUN] && !concentrated) types.push(23); //UIT-25, I-504
	if (this.mid == 478 && atypes[A_HAGUN] && atypes[A_AAGUN] && !concentrated) types.push(24); //Tatsuta Kai Ni
	if ([77,82,87,88,553].indexOf(this.mid) != -1 && hasID[274] && atypes[A_AIRRADAR] && atypes[A_TYPE3SHELL]) types.push(25); //Ise-class
	if (this.mid == 546 && hasID[275] && atypes[A_AIRRADAR]) types.push(26); //Musashi Kai Ni
	if ([82,88,553,148,546].indexOf(this.mid) != -1 && hasID[274] && atypes[A_AIRRADAR]) types.push(28); //Ise-class + Musashi Kai
	if (this.mid == 477) { //Tenryuu Kai Ni
		if (atypes[A_HAGUN] >= 3) types.push(30);
		if (atypes[A_HAGUN] >= 2) types.push(31);
	}
	if ([149,150,151,152,439,364,515,393,519,394].indexOf(this.mid) != -1 && hasID[191] && (hasID[300] || hasID[301])) types.push(32); //royal navy + Kongou-class
	
	var add6 = false;
	if (this.type=='BB'||this.type=='BBV'||this.type=='FBB') {  //is BB
		if (atypes[A_GUN] && atypes[A_TYPE3SHELL] && atypes[A_AAFD]) {
			if (atypes[A_AIRRADAR]) types.push(4);
			add6 = true;
		}
	}
	if (atypes[A_HAFD] >= 2 && atypes[A_AIRRADAR]) types.push(5);
	if (add6) types.push(6);
	if (atypes[A_HAGUN] && atypes[A_AAFD] && atypes[A_AIRRADAR]) types.push(7);
	if (atypes[A_HAFD] && atypes[A_AIRRADAR]) types.push(8);
	if (atypes[A_HAGUN] && atypes[A_AAFD]) types.push(9);
	if (concentrated && atypes[A_AAGUN] >= 2 && atypes[A_AIRRADAR]) types.push(12);
	// if (concentrated && atypes[A_HAFD] && atypes[A_AIRRADAR]) return 13;
	if ((this.mid == 557 || this.mid == 558) && atypes[A_HAGUN] && atypes[A_AIRRADAR]) types.push(29); //Isokaze+Hamakaze B Kai
	return types;
}

Ship.prototype.moraleMod = function(isTorp) {
	if (isTorp) {
		if (this.morale >= 53) return 1.3;
		if (this.morale >= 33) return 1;
		if (this.morale >= 23) return .7;
		return .35;
	}
	if (this.morale >= 53) return 1.2;
	if (this.morale >= 33) return 1;
	if (this.morale >= 23) return .8;
	return .5;
}

Ship.prototype.moraleModEv = function() {
	if (this.morale >= 53) return .7;
	if (this.morale >= 33) return 1;
	if (this.morale >= 23) return 1.2;
	return 1.4;
}

Ship.prototype.reset = function() {
	this.HP = (this.HPDefault != null)? this.HPDefault : this.maxHP;
	this.planecount = this.PLANESLOTS.slice();
	this.fuelleft = this.fuelDefault;
	this.ammoleft = this.ammoDefault;
	this.morale = this.moraleDefault;
	if (this.repairsOrig) this.repairs = this.repairsOrig.slice();
	if (this.side==0 && isPlayable(this.mid)) this.protection = true;
	if (this.retreated) this.retreated = false;
	// this._wAA = undefined;
}

Ship.prototype.airState = function() { return this.fleet.AS; }
Ship.prototype.airPower = function(jetonly,includeScout) {
	var ap = 0;
	for (var i=0; i<this.equips.length; i++) {
		if ((this.equips[i].isfighter && (!jetonly||this.equips[i].isjet)) || (includeScout && EQTDATA[this.equips[i].type].isPlane)) {
			ap += Math.floor(((this.equips[i].AA||0) + (this.equips[i].level||0)*.2) * Math.sqrt(this.planecount[i]) + (this.equips[i].APbonus||0));
		}
	}
	return Math.floor(ap);
}
Ship.prototype.numBombers = function () {
	var planes = [];
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].isdivebomber || this.equips[i].istorpbomber || this.equips[i].isfighter) {
			if (this.equips[i].b_image) planes.push(this.equips[i].b_image);
			else planes.push((this.fleet.id==0)? 1 : 2);
		}
	}
	return planes;
}
Ship.prototype.rocketBarrageChance = function() { return 0; }

//------------------

function DD(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
DD.prototype = Object.create(Ship.prototype);
DD.prototype.canASW = function() { return true; }

function CL(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 100;
}
CL.prototype = Object.create(Ship.prototype);
CL.prototype.canASW = function() { return true; }

function CLT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 100;
}
CLT.prototype = Object.create(Ship.prototype);
CLT.prototype.canASW = function() { return true; }

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
BB.prototype.canTorp = function() { return false; }
BB.prototype.APweak = true;

function FBB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	BB.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
FBB.prototype = Object.create(BB.prototype);


function CAV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.planeasw = true;
}
CAV.prototype = Object.create(Ship.prototype);
CAV.prototype.APweak = true;
CAV.prototype.canASW = function() {
	for (var i=0; i<this.equips.length; i++) {
		if (this.planecount[i] <= 0) continue;
		if (this.equips[i].isdivebomber || this.equips[i].istorpbomber) return true;
	}
	return false;
}
CAV.prototype.rocketBarrageChance = function() {
	let num = 0;
	for (let equip of this.equips) {
		if (equip.canBarrage) num++;
	}
	if (num <= 0) return 0;
	return (this.weightedAntiAir()+this.LUK)/(322-(40*num+70*this.rocketBonus));
}

function BBV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.planeasw = true;
}
BBV.prototype = Object.create(Ship.prototype);
BBV.prototype.APweak = true;
BBV.prototype.enableSecondShelling = true;
BBV.prototype.canTorp = function() { return false; }
BBV.prototype.canASW = CAV.prototype.canASW;
BBV.prototype.rocketBarrageChance = CAV.prototype.rocketBarrageChance;

function BBVT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	BBV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
BBVT.prototype = Object.create(BBV.prototype);
BBVT.prototype.canTorp = function() { return (this.HP/this.maxHP > .5); }

function CV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CV.prototype = Object.create(Ship.prototype);
CV.prototype.canTorp = function() { return false; }
CV.prototype.canNB = function() { return (((this.nightattack && this.HP/this.maxHP > .25) || this.canNBAirAttack()) && !this.retreated); }
CV.prototype.canAS = function() {
	if (this.HP/this.maxHP <= .25) return false;
	let diveFlag = false, torpFlag = false;
	for (var i=0; i<this.equips.length; i++) {
		if(this.equips[i].type == DIVEBOMBER && this.planecount[i]) diveFlag = true;
		if(this.equips[i].type == TORPBOMBER && this.planecount[i]) torpFlag = true;
	}
	return diveFlag && torpFlag;
}
CV.prototype.APweak = true;
CV.prototype.canShell = function() {
	if (this.HP <= 0) return false;
	for (var i=0; i<this.equips.length; i++) {
		var equip = this.equips[i];
		if ((equip.isdivebomber || equip.istorpbomber) && this.planecount[i] > 0) return true;
	}
	return false;
}
CV.prototype.canStillShell = function () {
	return (this.HP > this.maxHP*.5 && this.canShell());
}
CV.prototype.CVshelltype = true;
CV.prototype.shellPower = function(target,base) {
	var dp = 0, tp = 0;
	for (var i=0; i<this.equips.length; i++) {
		if(this.equips[i].DIVEBOMB) dp += this.equips[i].DIVEBOMB;
		if(this.equips[i].TP) tp += this.equips[i].TP;
	}
	var bonus = (base||0) + 5;
	if (target && target.isInstall) tp = 0;
	var improvebonus = (this.improves.Pshell)? Math.floor(this.improves.Pshell) : 0;
	return 50 + bonus + 1.5*(this.FP + improvebonus + tp + Math.floor(1.3*dp));
}
CV.prototype.NBPower = function(target) {
	if (this.canNBAirAttack()) {
		let power = this.FP;
		for (let i=0; i<this.equips.length; i++) {
			let equip = this.equips[i];
			power -= (equip.FP || 0);
			if (equip.btype != B_NIGHTFIGHTER && equip.btype != B_NIGHTBOMBER && equip.btype != B_NIGHTBOMBER2) continue;
			let mod = .3*((equip.FP || 0) + (equip.TP || 0) + (equip.ASW || 0) + (equip.DIVEBOMB || 0));
			power += (equip.FP || 0) + (equip.TP || 0) + Math.sqrt(equip.level || 0);
			if (equip.btype != B_NIGHTBOMBER2) {
				power += this.planecount[i]*3;
				mod *= 1.5;
			}
			power += mod*Math.sqrt(this.planecount[i]);
		}
		return power;
	}
	return Ship.prototype.NBPower.call(this,target);
}
CV.prototype.canNBAirAttack = function() {
	return (this.equiptypesB[B_NIGHTCREW] || this.hasBuiltInNightCrew) && this.HP/this.maxHP > .5;
}
CV.prototype.rocketBarrageChance = CAV.prototype.rocketBarrageChance;

function CVL(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	CV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.planeasw = true;
}
CVL.prototype = Object.create(CV.prototype);
CVL.prototype.OASWstat = 65;
CVL.prototype.canASW = function() {
	if (this.HP/this.maxHP <= .5) return false;
	for (var i=0; i<this.equips.length; i++) { if (this.equips[i].isdivebomber || this.equips[i].istorpbomber) return true; }
	return false;
}
CVL.prototype.canOASW = function() {
	if (this.alwaysOASW) return true;
	
	if (this.CVEtype != 2) { //non-Taiyou Kai needs high ASW bomber
		let found = false;
		for (let equip of this.equips) {
			if (equip.ASW >= 7 && EQTDATA[equip.type].isPlane) {
				found = true;
				break;
			}
		}
		if (!found) return false;
	}
	let threshold = (this.equiptypes[SONARL])? 50 : 65;
	return this.ASW >= threshold;
}
CVL.prototype.rocketBarrageChance = Ship.prototype.rocketBarrageChance;
CVL.prototype.APweak = false;

function CVB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	CV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CVB.prototype = Object.create(CV.prototype);
CVB.prototype.canStillShell = function() {
	return (this.HP > this.maxHP*.25 && this.canShell());
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
AV.prototype.canASW = CAV.prototype.canASW;
AV.prototype.rocketBarrageChance = CAV.prototype.rocketBarrageChance;

function AO(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AO.prototype = Object.create(Ship.prototype);
AO.prototype.canTorp = function() { return false; }
AO.prototype.loadEquips = function(equips,levels,profs,addstats) {
	Ship.prototype.loadEquips.call(this,equips,levels,profs,addstats);
	for (var i=0; i<equips.length; i++) {
		if (!equips[i]) continue;
		var d = EQTDATA[EQDATA[equips[i]].type];
		if (d && (d.istorpbomber||d.isdivebomber)) {
			this.planeasw = true;
			this.CVshelltype = true;
			this.shellPower = CV.prototype.shellPower;
			this.canShell = CV.prototype.canShell;
			this.canStillShell = CV.prototype.canStillShell;
			this.numBombers = CV.prototype.numBombers;
			break;
		}
	}
}

function Installation(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	this.isInstall = true;
	BBV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
Installation.prototype = Object.create(BBV.prototype);
//want CVshelltype=true? impossible to know ingame
Installation.prototype.shellPower = CV.prototype.shellPower;
Installation.prototype.canShell = CV.prototype.canShell;
Installation.prototype.canStillShell = CV.prototype.canStillShell;

function AS(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AS.prototype = Object.create(Ship.prototype);
AS.prototype.canTorp = function() { return false; }

function AR(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AR.prototype = Object.create(Ship.prototype);
AR.prototype.canTorp = function() { return false; }

function CT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 100;
};
CT.prototype = Object.create(Ship.prototype);
CT.prototype.canASW = function() { return true; }

function LHA(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
LHA.prototype = Object.create(Ship.prototype);
LHA.prototype.canTorp = function() { return false; }

function DE(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
DE.prototype = Object.create(Ship.prototype);
DE.prototype.canTorp = function() { return false; }
DE.prototype.canASW = function() { return true; }
DE.prototype.OASWstat = 60;


function LandBase(equips,levels,profs) {
	this.side = 0;
	this.HP = 200;
	this.AR = 0;
	this.PLANESLOTS = [18,18,18,18];
	this.planecount = this.PLANESLOTS.slice();
	this.equips = [];
	for (var i=0; i<equips.length; i++) this.equips.push(new Equip(equips[i],levels[i],profs[i],true));
	this.AS = 0;
}
LandBase.prototype.airState = function() { return this.AS; }
LandBase.prototype.airPower = function(jetonly) {
	var ap = 0;
	for (var i=0; i<this.equips.length; i++) {
		if (EQTDATA[this.equips[i].type].isPlane && (!jetonly||this.equips[i].isjet)) {
			var base = (this.equips[i].AA||0) + (this.equips[i].level||0)*.2;
			if (this.equips[i].type == LANDBOMBER || this.equips[i].type == INTERCEPTOR) base += (this.equips[i].EV||0)*1.5;
			ap += Math.floor(base * Math.sqrt(this.planecount[i]) + (this.equips[i].APbonus||0));
		}
	}
	return Math.floor(ap);
}
LandBase.prototype.fleetAirPower = LandBase.prototype.airPower;
LandBase.prototype.airPowerDefend = function() {
	var ap = 0, mod = 1;
	for (var i=0; i<this.equips.length; i++) {
		if (EQTDATA[this.equips[i].type].isPlane) {
			var base = (this.equips[i].AA||0) + (this.equips[i].level||0)*.2;
			if (this.equips[i].type == LANDBOMBER || this.equips[i].type == INTERCEPTOR) base += (this.equips[i].EV||0) + (this.equips[i].ACC||0)*2;
			ap += Math.floor(base * Math.sqrt(this.planecount[i]) + (this.equips[i].APbonus||0));
		}
		var newmod = 1;
		if (this.equips[i].type == SEAPLANE) {
			if (this.equips[i].LOS >= 9) newmod = 1.16;
			else if (this.equips[i].LOS == 8) newmod = 1.13;
			else newmod = 1.1;
		} else if (this.equips[i].type == CARRIERSCOUT) {
			if (this.equips[i].LOS >= 9) newmod = 1.3;
			else newmod = 1.2;
		}
		if (newmod > mod) mod = newmod;
	}
	return Math.floor(ap*mod);
}
LandBase.prototype.reset = function() {
	this.planecount = this.PLANESLOTS.slice();
}
LandBase.prototype.getCost = function() {
	var cost = [0,0,0]; //fuel,ammo,baux
	for (var i=0; i<this.equips.length; i++) {
		var eq = this.equips[i];
		//sortie cost
		switch(eq.type) {
			case LANDBOMBER:
			case INTERCEPTOR:
				cost[0] += Math.floor(1.5*this.PLANESLOTS[i]);
				cost[1] += Math.floor(2*this.PLANESLOTS[i]/3);
				break;
			case SEAPLANE:
			case CARRIERSCOUT:
			case FLYINGBOAT:
				cost[0] += Math.floor(this.PLANESLOTS[i]);
				cost[1] += Math.floor(.75*this.PLANESLOTS[i]);
				break;
			default:
				cost[0] += Math.floor(this.PLANESLOTS[i]);
				cost[1] += Math.floor(.66*this.PLANESLOTS[i]);
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
	this.mid = equipid;
	this.improves = {};
	if (level) this.setImprovement(level);
	if (rank) this.setProficiency(rank,forLBAS);
	
	var eq = EQDATA[equipid];
	if (EQTDATA[eq.type].isfighter && eq.AA) this.isfighter = true;
	if (EQTDATA[eq.type].isdivebomber) this.isdivebomber = true;
	if (EQTDATA[eq.type].istorpbomber) this.istorpbomber = true;
	
	if (eq.btype == null && EQTDATA[eq.type].btype) {
		this.btype = EQTDATA[eq.type].btype;
		if (this.btype == B_RADAR && this.AA >= 2) this.atype = A_AIRRADAR;
	}
	if (eq.atype == null && EQTDATA[eq.type].atype) {
		this.atype = EQTDATA[eq.type].atype;
		if (this.atype == A_HAGUN && this.AA >= 8) this.atype = A_HAFD;
		if (this.atype == A_AAGUN && this.AA >= 9) this.isconcentrated = true;
	}
}
Equip.prototype.setImprovement = function(level) {
	this.level = level;
	var improve = (this.improve)? this.improve : EQTDATA[this.type].improve;
	if (!improve) return;
	for (var key in improve) {
		this.improves[key] = improve[key]*Math.sqrt(level);
	}
	
	var special = null;
	if (this.type == RADARS || this.type == RADARL) {
		if (this.atype) special = IMPROVESPECIAL['AIRRADAR'];
		else special = IMPROVESPECIAL['SURFACERADAR'];
	}
	if ((this.type == MAINGUNSAA || this.type == SECGUNAA) && this.AA >= 8) special = IMPROVESPECIAL['HAFDGUN'];
	if (special) {
		for (var key in special) this.improves[key] = improve[key]*Math.sqrt(level);
	}
}
Equip.prototype.setProficiency = function(rank,forLBAS) {
	if (!EQTDATA[this.type].isPlane) return;
	this.rank = rank;
	this.exp = [0,10,25,40,55,70,80,120][rank];
	this.APbonus = Math.sqrt(this.exp*.1);
	switch (this.type) {
		case FIGHTER:
		case SEAPLANEFIGHTER:
		case INTERCEPTOR:
			this.APbonus += [0,0,2,5,9,14,14,22][rank]; break;
		case SEAPLANEBOMBER:
			this.APbonus += [0,0,1,1,1,3,3,6][rank]; break;
		case TORPBOMBER:
		case DIVEBOMBER:
		case JETBOMBER:
			break;
		default:
			if (!forLBAS) this.APbonus = 0;
			break;
	}
	if (this.APbonus) this.isfighter = true;
}