
//-------
function Fleet(id,isescort) {
	this.id = id;
	this.ships = [];
	if (isescort) this.isescort = true;
	
	this.formation = false;
	this.AP = 0;  //air (fighter) power
	this.FLoS = 0;  //fleet line of sight
	this.FAA = 0;  //fleet anti air
	this.AS = 0;  //air superiority
	this.DMGTOTALS = [0,0,0,0,0,0];
}
Fleet.prototype.loadShips = function(ships) {
	this.AP = 0; this.FLoS = 0; this.FAA = 0; this.noRedT = false;
	for(var i=0; i<ships.length; i++) {
		this.ships.push(ships[i]);
		ships[i].id = i+10*this.id;
		ships[i].apiID = (i+1)+6*this.id;
		ships[i].fleet = this;
		this.FLoS += ships[i].LOS;
		this.FAA += ships[i].AA;
		for (var j=0; j<ships[i].equips.length; j++) {
			if (ships[i].equips[j].noRedT) { this.noRedT = true; break; }
		}
		if (this.isescort) ships[i].isescort = true;
	}
	this.ships[0].isflagship = true;
}
Fleet.prototype.fleetAirPower = function() {  //get air power
	this.AP = 0;
	for (var i=0; i<this.ships.length; i++) {
		this.AP += this.ships[i].airPower();
	}
	return this.AP;
}
Fleet.prototype.fleetAntiAir = function() {
	var FAA = 0;
	for (var i=0; i<this.ships.length; i++) {
		for (var j=0; j<this.ships[i].equips.length; j++) {
			var equip = this.ships[i].equips[j];
			var mod = 0;
			switch(equip.atype) {
				case A_GUN:
				case A_AAGUN:
					mod = 6; break;
				case A_HAGUN:
				case A_HAFD:
				case A_AAFD:
					mod = .35; break;
				case A_AIRRADAR:
					mod = .4; break;
				case A_TYPE3SHELL:
					mod = .6; break;
				default:
					continue;
			}
			if (equip.AA) FAA += Math.floor(equip.AA * mod);
		}
	}
	FAA *= 2*this.formation.AAmod;
	// console.log('FLEET ANTI-AIR: '+FAA);
	return Math.floor(FAA);
}
Fleet.prototype.reset = function(notShips) {
	if (!notShips) { for (var i=0; i<this.ships.length; i++) this.ships[i].reset();}
	this.AS = 0;
	this.DMGTOTALS = [0,0,0,0,0,0];
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
			if (['image','type','EQUIPS','SLOTS'].indexOf(key) == -1) this[key] = SHIPDATA[id][key];
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
	this.equips = [];
	this.fleet = false;
	this.isflagship = false;
	this.iscarrier = false;
	if (!planeslots) planeslots = [0,0,0,0];
	this.PLANESLOTS = planeslots;
	this.planecount = planeslots.slice();
	this.AACItype = 0;
	this.fuelleft = 10;
	this.ammoleft = 10;
	this.protection = (side==0)?true:false;
	
	this._nbtype = false;
	this._astype = false;
	this._aswpower = false;
	this._apmod = false;
}
Ship.prototype.loadEquips = function(equips,levels,addstats) {
	if (!equips || this.equips.length > 0) return;  //don't load if already have equips, do removeEquips() first
	var atypes = {};
	var planeacc = 0, planetype = 0;
	for (var i=0; i<equips.length; i++){
		// console.log(typeof equips[i]);
		if (!equips[i]) continue;
		var eq = new Equip(equips[i],levels[i]);  //remember change 1 to actual level
		//eq.setImprovement(level);
		if (eq.RNG && eq.RNG > this.RNG) this.RNG = eq.RNG;
		if (eq.ACC) this.ACC += eq.ACC;
		if (eq.btype) {
			if (!this.equiptypes[eq.btype]) this.equiptypes[eq.btype]=1;
			else this.equiptypes[eq.btype]++;
		}
		if (eq.atype) {
			if (!atypes[eq.atype]) atypes[eq.atype]=1;
			else atypes[eq.atype]++;
			if (eq.atype == A_HAFD) {  //HAFD also counts as HAGUN
				atypes[A_HAGUN] = (!atypes[A_HAGUN])? 1 : atypes[A_HAGUN]+1;
			}
		}
		if (eq.type == TYPE3SHELL) this.hasT3Shell = true;
		if (eq.type == MIDGETSUB) this.hasMidgetSub = true;
		if (eq.type == STARSHELL) this.hasStarShell = true;
		if (eq.type == SEARCHLIGHTS || eq.type == SEARCHLIGHTL) this.hasSearchlight = true;
		if (eq.type == NIGHTSCOUT) this.hasNightScout = true;
		
		//add improvement stats
		for (var key in eq) {
			if (key.indexOf('bonus')==-1) continue;
			if (key=='planeaccbonus') {
				if (eq.isdivebomber) {
					if (planetype==0) { planetype = 1; planeacc = 0; }
					planeacc = Math.max(planeacc,eq.planeaccbonus);
				}
				else if (planetype==0 && eq.istorpbomber) planeacc = Math.max(planeacc,eq.planeaccbonus);
				continue;
			}
			if (this[key]) this[key] += eq[key];
			else this[key] = eq[key];
			if (i==0 && key=='critdmgbonus') this[key] += eq[key]; //double for first slot plane
		}
		
		this.equips.push(eq);
	}
	this.ACCbonus = (this.ACCbonus)? this.ACCbonus+planeacc : planeacc;
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
	// this.equips = equips;
}

Ship.prototype.canShell = function() { return (this.HP > 0); }
Ship.prototype.canStillShell = function() { return this.canShell(); }
Ship.prototype.canNB = function() { return (this.HP/this.maxHP > .25); }
Ship.prototype.canTorp = function() { return (this.HP/this.maxHP > .5); }
Ship.prototype.canOpTorp = function() { return this.hasMidgetSub; }
Ship.prototype.canASW = function() { return false; }
Ship.prototype.canAS = function() { return (this.HP/this.maxHP > .25); }

Ship.prototype.NBtype = function() {
	if (this._nbtype) return this._nbtype;
	var mguns = (this.equiptypes[B_MAINGUN])? this.equiptypes[B_MAINGUN] : 0;
	var sguns = (this.equiptypes[B_SECGUN])? this.equiptypes[B_SECGUN] : 0;
	var torps = (this.equiptypes[B_TORPEDO])? this.equiptypes[B_TORPEDO] : 0;
	if (torps >= 2) this._nbtype = 6;  //torp cut-in
	else if (mguns >= 3) this._nbtype = 5; //triple gun cut-in
	else if (mguns >= 2 && sguns) this._nbtype = 4;  //gun cut-in
	else if (torps && mguns) this._nbtype = 3;  //mix cut-in
	else if (mguns+sguns >= 2) this._nbtype = 2;  //double attack
	else this._nbtype = 1;  //single
	return this._nbtype;
}

Ship.prototype.AStype = function() {
	if (this._astype) return this._astype;
	var mguns = this.equiptypes[B_MAINGUN], sguns = this.equiptypes[B_SECGUN], radars = this.equiptypes[B_RADAR], apshells = this.equiptypes[B_APSHELL];
	var recons = (this.equiptypes[B_RECON])? this.equiptypes[B_RECON] : 0;
	if (recons <= 0) this._astype = 1;
	else if (mguns >= 2 && sguns) this._astype = 7;
	else if (mguns >= 2 && apshells) this._astype = 6; //AP shell either
	else if (mguns && sguns && apshells) this._astype = 5;
	else if (mguns && sguns && radars) this._astype = 4;
	else if (mguns && sguns) this._astype = 3;
	else if (mguns >= 2) this._astype = 2;  //double attack
	else this._astype = 1;
	return this._astype;
}

Ship.prototype.APmod = function(target) {
	if (!target.APweak) return 1;
	else {
		if (!this._apmod) {
			if (this.equiptypes[B_APSHELL]) {
				if (this.equiptypes[B_MAINGUN]==2) {
					if (this.equiptypes[B_RADAR]) this._apmod=1.1;
					else if (this.equiptypes[B_SECGUN]) this._apmod=1.15;
					else this._apmod=1.08;
				} else if (this.equiptypes[B_MAINGUN]==1 && this.equiptypes[B_SECGUN]==1) {
					if (this.equiptypes[B_RADAR]) this._apmod=1.14;
					else if(this.equiptypes[B_RECON]) this._apmod=1.15;
					else this._apmod=1.08;
				}
				else this._apmod=1;
			} else
				this._apmod = 1;
		}
		return this._apmod;
	}
}

Ship.prototype.shellPower = function(onInstallation) {
	var bonus = (this.FPDbonus)? Math.floor(this.FPDbonus) : 0;
	var shellbonus = (this.fleet && this.fleet.formation.shellbonus!==undefined)? this.fleet.formation.shellbonus : 5;
	if (onInstallation) {
		if (this.hasT3Shell) return this.FP*2.5 + shellbonus + bonus;
	}
	return this.FP + shellbonus + bonus;
}

Ship.prototype.NBPower = function(onInstallation) {
	var bonus = (this.FPNbonus)? Math.floor(this.FPNbonus) : 0;
	if (onInstallation) {
		if (this.hasT3Shell) return this.FP*2.5 + bonus;
		return this.FP+bonus;
	}
	return this.FP+this.TP+bonus;
}

Ship.prototype.ASWPower = function() {
	if (this._aswpower) return this._aswpower;
	var equipASW = 0, hassonar = false, hasdc = false;
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].ASW) equipASW += this.equips[i].ASW;
		if (this.equips[i].btype == B_SONAR) hassonar = true;
		if (this.equips[i].btype == B_DEPTHCHARGE) hasdc = true;
	}
	var bonus = (this.ASWbonus)? Math.floor(this.ASWbonus) : 0;
	this._aswpower = (2*Math.sqrt(this.ASW-equipASW)+1.5*equipASW+((this.iscarrier)? 8 : 13))* ((hassonar && hasdc)? 1.15 : 1) + bonus;
	return this._aswpower;
}

Ship.prototype.airPower = function() { return 0; }

Ship.prototype.damageMod = function() {
	if (this.HP/this.maxHP <= .25) return .4;
	if (this.HP/this.maxHP <= .5) return .7;
	return 1;
}
Ship.prototype.weightedAntiAir = function() {
	var aa = this.AA;
	for (var i=0; i<this.equips.length; i++) {
		var mod = 0;
		switch (this.equips[i].atype) {
			case A_HAGUN:
			case A_HAFD:
			case A_AAFD:
				mod = 3; break;
			case A_AAGUN:
				mod = 5; break;
			case A_AIRRADAR:
				mod = 2; break;
			default:
				continue;
		}
		aa += this.equips[i].AA * mod;
	}
	aa += (this.AAbonus)? this.AAbonus : 0;
	return aa;
}

Ship.prototype.getAACItype = function(atypes) {
	var concentrated = false;
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].isconcentrated) { concentrated = true; break; }
	}
	if (this.mid == 428 && concentrated && (atypes[A_HAGUN]||atypes[A_HAFD])) {   //428 = Maya Kai Ni
		if (atypes[A_AIRRADAR]) return 11; 
		else return 10;
	}
	if (this.hasBuiltInFD) {  //Akizuki, Teruzuki, Tsu, AA Hime
		if (atypes[A_HAGUN] >= 2 && atypes[A_AIRRADAR]) return 1;
		else if (atypes[A_HAGUN] && atypes[A_AIRRADAR]) return 2;
		else if (atypes[A_HAGUN] >= 2) return 3;
	}
	if (this.type=='BB'||this.type=='BBV'||this.type=='BBT') {  //is BB
		if (atypes[A_GUN] && atypes[A_TYPE3SHELL] && atypes[A_AAFD]) {
			if (atypes[A_AIRRADAR]) return 4;
			else return 6;
		}
	}
	if (atypes[A_HAFD] >= 2 && atypes[A_AIRRADAR]) return 5;
	if (atypes[A_HAFD] && atypes[A_AIRRADAR]) return 8;
	if (atypes[A_HAGUN] && atypes[A_AAFD] && atypes[A_AIRRADAR]) return 7;
	if (atypes[A_HAGUN] && atypes[A_AAFD]) return 9;
	return 0;
}

Ship.prototype.reset = function() {
	this.HP = this.maxHP;
	this.planecount = this.PLANESLOTS.slice();
	this.fuelleft = 10;
	this.ammoleft = 10;
	if (this.side==0) this.protection = true;
}
//-----------------


/* any ship that can launch bombers */
function Carrier(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.iscarrier = true;
}
Carrier.prototype = Object.create(Ship.prototype);
Carrier.prototype.airPower = function() {
	var ap = 0;
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].isfighter) {
			ap += this.equips[i].AA * Math.sqrt(this.planecount[i]);
			// if (this.side==0&&this.equips[i].type == FIGHTER) ap += 24; //PLACEHOLDER FOR RANKS
		}
	}
	if (this.APbonus) ap += Math.floor(this.APbonus);
	return Math.floor(ap);
}
Carrier.prototype.numBombers = function () {
	var planes = [];
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].isdivebomber || this.equips[i].istorpbomber || this.equips[i].isfighter) {
			if (this.equips[i].b_image) planes.push(this.equips[i].b_image);
			else planes.push((this.fleet.id==0)? 1 : 2);
		}
	}
	return planes;
}
//------------------

function DD(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'DD';
}
DD.prototype = Object.create(Ship.prototype);
DD.prototype.canASW = function() { return true; }

function CL(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'CL';
}
CL.prototype = Object.create(Ship.prototype);
CL.prototype.canASW = function() { return true; }

function CLT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'CL';
}
CLT.prototype = Object.create(Ship.prototype);
CLT.prototype.canASW = function() { return true; }
// CLT.prototype.canOpTorp = function() { return (this.HP > 0); }

function CA(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'CA';
}
CA.prototype = Object.create(Ship.prototype);
CA.prototype.APweak = true;

function BB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'BB';
}
BB.prototype = Object.create(Ship.prototype);
BB.prototype.canTorp = function() { return false; }
BB.prototype.APweak = true;

function FBB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	BB.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'BB';
}
FBB.prototype = Object.create(BB.prototype);


function CAV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Carrier.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'CAV';
}
CAV.prototype = Object.create(Carrier.prototype);
CAV.prototype.APweak = true;
CAV.prototype.canASW = function() {
	for (var i=0; i<this.equips.length; i++) { if (this.equips[i].isdivebomber || this.equips[i].istorpbomber) return true; }
	return false;
}

function BBV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Carrier.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'BBV';
}
BBV.prototype = Object.create(Carrier.prototype);
BBV.prototype.APweak = true;
BBV.prototype.canTorp = function() { return false; }
BBV.prototype.canASW = function() {
	for (var i=0; i<this.equips.length; i++) { if (this.equips[i].isdivebomber || this.equips[i].istorpbomber) return true; }
	return false;
}

function BBVT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	BBV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'BBV';
}
BBVT.prototype = Object.create(BBV.prototype);
BBVT.prototype.canTorp = function() { return (this.HP/this.maxHP > .5); }

function CV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Carrier.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'CV';
	
}
CV.prototype = Object.create(Carrier.prototype);
CV.prototype.canTorp = function() { return false; }
CV.prototype.canNB = function() { return false; }
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
CV.prototype.shellPower = function() {
	var dp = 0;
	for (var i=0; i<this.equips.length; i++) {
		if(this.equips[i].DIVEBOMB) dp += this.equips[i].DIVEBOMB;
	}
	var bonus = (this.fleet && this.fleet.formation.shellbonus!==undefined)? this.fleet.formation.shellbonus : 5;
	return 50 + bonus + 1.5*this.FP + 1.5*this.TP + 2*dp;
}

function CVL(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	CV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'CVL';
}
CVL.prototype = Object.create(CV.prototype);
CVL.prototype.canASW = function() {
	if (this.HP/this.maxHP <= .5) return false;
	for (var i=0; i<this.equips.length; i++) { if (this.equips[i].isdivebomber || this.equips[i].istorpbomber) return true; }
	return false;
}
CVL.prototype.APweak = false;

function CVB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	CV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'CV';
}
CVB.prototype = Object.create(CV.prototype);
CVB.prototype.canStillShell = function() {
	return (this.HP > this.maxHP*.25 && this.canShell());
}

function CVN(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	CV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'CV';
}
CVN.prototype = Object.create(CV.prototype);
CVN.prototype.canNB = function() { return (this.HP/this.maxHP > .25); }
CVN.prototype.NBtype = function() { return 1; }


function SS(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'SS';
}
SS.prototype = Object.create(Ship.prototype);
SS.prototype.canShell = function() { return false; }
SS.prototype.canOpTorp = function() { return (this.HP > 0 && (this.LVL >= 10 || this.hasMidgetSub)); }

function SSV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	SS.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'SS';
	this.iscarrier = true;
}
SSV.prototype = Object.create(SS.prototype);
SSV.prototype.airPower = Carrier.prototype.airPower;
SSV.prototype.numBombers = Carrier.prototype.numBombers;

function AV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Carrier.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'AV';
};
AV.prototype = Object.create(Carrier.prototype);

function AO(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.type = 'AO';
};
AO.prototype = Object.create(Ship.prototype);
AO.prototype.canTorp = function() { return false; }
AO.prototype.loadEquips = function(equips,addstats) {
	Ship.prototype.loadEquips.call(this,equips,addstats);
	for (var i=0; i<equips.length; i++) {
		if (equips[i] && (EQDATA[equips[i]].istorpbomber||EQDATA[equips[i]].isdivebomber)) {
			this.iscarrier = true;
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
	BBV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.isInstall = true;
};
Installation.prototype = Object.create(BBV.prototype);
//want CVshelltype=true? impossible to know ingame
Installation.prototype.shellPower = CV.prototype.shellPower;
Installation.prototype.canShell = CV.prototype.canShell;
Installation.prototype.canStillShell = CV.prototype.canStillShell;

function AS() {};
function AR() {};
function CT() {};
function LHA() {};


var PLANEDEFAULT = new Ship(0,'PLANEDEFAULT',0, 1,1, 0,0,0,0, 0, 0,0,0, 1);
PLANEDEFAULT.CVshelltype = true;

function Equip(equipid,level) {
	for(var key in EQDATA[equipid]) this[key] = EQDATA[equipid][key];
	this.mid = equipid;
	if (level) this.setImprovement(level);
}
Equip.prototype.setImprovement = function(level) {
	if (this.improveType == 1) {
		var improve = IMPROVEDATA[this.type];
		if (!improve) return;
		for (var key in improve) {
			this[key+'bonus'] = improve[key]*Math.sqrt(level);
		}
	} else if (this.improveType == 2) {
		if (this.type == FIGHTER) this.APbonus = [0,1,3,7,11,16,16,25][level];
		else if (this.isfighter) this.APbonus = [0,1,2,3,3,5,5,9][level];
		else if (this.istorpbomber||this.isdivebomber) this.APbonus = [0,1,1,2,2,2,2,3][level];
		//add crit bonus, crit rate bonus, acc bonus
		if (this.istorpbomber) this.planeaccbonus = 4.7*Math.sqrt(level);
		else if (this.isdivebomber) this.planeaccbonus = 3*Math.sqrt(level);
		if (this.istorpbomber || this.isdivebomber) {
			this.critratebonus = 2.25*Math.sqrt(level);
			this.critdmgbonus = [0,2.5,3,4.5,6,7.5,8,10][level];
		}
	} else return;
	this.level = level;
}