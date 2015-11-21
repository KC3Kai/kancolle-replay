var LINEAHEAD = {surfmod:1,ASWmod:.6,AAmod:.77, shellacc:1,torpacc:2,NBacc:.8, FSprot:.5, id:1};
var DOUBLELINE = {surfmod:.8,ASWmod:.8,AAmod:.91, shellacc:2,torpacc:1,NBacc:.75, FSprot:1, id:2};
var DIAMOND = {surfmod:.7,ASWmod:1.2,AAmod:1.2, shellacc:1,torpacc:.1,NBacc:.7, FSprot:2, id:3};
var ECHELON = {surfmod:.6,ASWmod:1,AAmod:.77, shellacc:1,torpacc:.2,NBacc:.7, FSprot:1, id:4};
var LINEABREAST = {surfmod:.6,ASWmod:1.3,AAmod:.77, shellacc:2,torpacc:.1,NBacc:.75, FSprot:1, id:5};
var ALLFORMATIONS = [false,LINEAHEAD,DOUBLELINE,DIAMOND,ECHELON,LINEABREAST];

var AACIDATA = {1:{num:7,rate:.67},2:{num:6,rate:.56},3:{num:4,rate:.61},4:{num:6,rate:.47},5:{num:4,rate:.62},6:{num:4,rate:47},7:{num:3,rate:.46},8:{num:4,rate:.52},9:{num:2,rate:.38},10:{num:8,rate:.6},11:{num:6,rate:.56}};

var FLEETS1 = [];
var FLEETS2 = [];
var ENGAGEMENT = 1;
const CRITMOD = 1.5;

var C = true;

function getRepairCost(ship) {
	var base = (ship.maxHP - ship.HP)*SHIPDATA[ship.mid].fuel;
	return [Math.floor(base*.032),Math.floor(base*.06)];
}

function shell(ship,target,APIhou) {
	var da = false, cutin = false;
	var preMod = ship.fleet.formation.surfmod*ENGAGEMENT*ship.damageMod();
	var postMod = ship.APmod(target);
	var evMod = 1/ship.fleet.formation.shellacc;
	if (C) console.log(preMod+' '+postMod);
	if (ship.canAS() && ship.fleet.AS > 0) {
		var ASchance = .5 + .15*(ship.isflagship) - .12*(ship.fleet.AS == 1);
		ASchance += .0005 * ship.fleet.FLoS;
		if (C) console.log(ASchance);
		switch(ship.AStype()) {
			case 2:  //DOUBLE ATTACK
				if (Math.random() < ASchance) {
					da = true;
				}
				break;
			case 3: //cut-in
				if (Math.random() < ASchance) {
					postMod*=1.1;
					evMod/=1.5; //guess, correct if new info
					cutin = true;
				}
				break;
			case 4:
				if (Math.random() < ASchance) {
					postMod*=1.2;
					evMod/=1.5; //guess, correct if new info
					cutin = true;
				} else if (Math.random() < ASchance) {
					postMod*=1.1;
					evMod/=1.5; //guess, correct if new info
					cutin = true;
				}
				break;
			case 5:
				if (Math.random() < ASchance) {
					postMod*=1.3;
					evMod/=1.5; //guess, correct if new info
					cutin = true;
				} else if (Math.random() < ASchance) {
					postMod*=1.1;
					evMod/=1.5; //guess, correct if new info
					cutin = true;
				}
				break;
			case 6:  //AP SHELL
				if (Math.random() < ASchance) {  //cut-in
					postMod*=1.5;
					evMod/=1.5; //guess, correct if new info
					cutin = true;
				} else if (Math.random() < ASchance) {  //or double attack
					da = true;
				}
				break;
			case 7:
				if (Math.random() < ASchance) {  //cut-in
					postMod*=1.1;
					evMod/=1.5; //guess, correct if new info
					cutin = true;
				} else if (Math.random() < ASchance) {  //or double attack
					da = true;
				}
				break;
		}
	}
	
	if (da) {
		var res = rollHit(accuracyAndCrit(ship,target,evMod));
		var dmg1 = Math.floor(target.HP*(.06+.08*Math.random())), realdmg1 = 0;
		if (res) {
			dmg1 = damage(ship,target,ship.shellPower(target.isInstall),preMod,1.2*res*postMod);
			realdmg1 = takeDamage(target,dmg1);
		} else { realdmg1 = takeDamage(target,dmg1) };
		res = rollHit(accuracyAndCrit(ship,target,evMod));
		var dmg2 = Math.floor(target.HP*(.06+.08*Math.random())), realdmg2 = 0;
		if (res) {
			dmg2 = damage(ship,target,ship.shellPower(target.isInstall),preMod,1.2*res*postMod);
			realdmg2 = takeDamage(target,dmg2);
		} else { realdmg2 = takeDamage(target,dmg2); }
		ship.fleet.giveCredit(ship,dmg1+dmg2);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg1+', '+dmg2+' damage, '+target.HP+'/'+target.maxHP+' left');
			// code += ship.id+','+target.id+',2,'+((target.side==0)? realdmg1+','+realdmg2:dmg1+','+dmg2)+'|';
			APIhou.api_at_list.push(ship.apiID);
			APIhou.api_df_list.push([target.apiID,target.apiID]);
			APIhou.api_damage.push([realdmg1,realdmg2]);
			APIhou.api_at_type.push(2);
			APIhou.api_cl_list.push(1);
		}
	} else {
		var res = rollHit(accuracyAndCrit(ship,target,evMod));
		var dmg = (cutin)? Math.floor(target.HP*(.06+.08*Math.random())) : 0, realdmg = 0;
		if (res) {
			dmg = damage(ship,target,ship.shellPower(target.isInstall),preMod,res*postMod);
			realdmg = takeDamage(target,dmg);
		} else { realdmg = takeDamage(target,dmg); }
		ship.fleet.giveCredit(ship,dmg);
	
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			var stype = (ship.CVshelltype)? '4' : (cutin)? '3' : '1';
			// code += ship.id+','+target.id+','+stype+','+((target.side==0)? realdmg:dmg)+'|';
			APIhou.api_at_list.push(ship.apiID);
			APIhou.api_df_list.push([target.apiID]);
			APIhou.api_damage.push([realdmg]);
			APIhou.api_at_type.push((cutin)? 3 : 0);
			APIhou.api_cl_list.push(1);
		}
	}
	return (target.HP <= 0);
}

function NBattack(ship,target,NBonly,APIyasen) {
	if (!ship.canNB()) return false;
	var da = false; //1 = combined damage, 2 = separate damages
	var cutin = false;  //may contain movie info
	var preMod = ship.damageMod();
	if (NBonly) preMod *= ship.fleet.formation.surfmod*ENGAGEMENT;
	var postMod = ship.APmod(target);
	var evMod = 1/ship.fleet.formation.NBacc;
	var bonus = 0;//add if have night scout
	switch(ship.NBtype()) {
		case 2:  //double attack
			var NBchance = .99;
			if (Math.random() < NBchance) {
				da = 2;
				preMod*=1.2;
			}
			break;
		case 3:  //mixed cut-in
			var NBchance = softCap(ship.LUK,60) + 15 + 10*(ship.isflagship) + 20*(ship.HP/ship.maxHP <= .5); //add searchlight
			if (!target.isInstall && Math.random() < NBchance*.01) {
				cutin = 6;
				da = 1;
				preMod*=1.3;
			}
			break;
		case 4: //sec gun cut-in
			var NBchance = softCap(ship.LUK,40) + 15 + 10*(ship.isflagship) + 20*(ship.HP/ship.maxHP <= .5); //add searchlight
			if (Math.random() < NBchance*.01) {
				cutin = 7;
				preMod*=1.75;
			}
			break;
		case 5: //main gun cut-in
			var NBchance = softCap(ship.LUK,40) + 15 + 10*(ship.isflagship) + 20*(ship.HP/ship.maxHP <= .5); //add searchlight
			if (Math.random() < NBchance*.01) {
				cutin = 7;
				preMod*=2;
			}
			break;
		case 6: //torp cut-in
			var NBchance = softCap(ship.LUK,50) + 15 + 10*(ship.isflagship) + 20*(ship.HP/ship.maxHP <= .5); //add searchlight
			if (!target.isInstall && Math.random() < NBchance*.01) {
				cutin = 6;
				da = 1;
				preMod*=1.5;
				evMod/=1.25;
			}
			break;
	}
	
	if (da) {
		var res = rollHit(accuracyAndCrit(ship,target,evMod));
		var dmg1 = Math.floor(target.HP*(.06+.08*Math.random())), realdmg1 = 0;
		if (res) {
			dmg1 = damage(ship,target,ship.NBPower(target.isInstall)+bonus,preMod,res*postMod,300);
			realdmg1 = takeDamage(target,dmg1);
		} else { realdmg1 = takeDamage(target,dmg1) };
		res = rollHit(accuracyAndCrit(ship,target,evMod));
		var dmg2 = Math.floor(target.HP*(.06+.08*Math.random())), realdmg2 = 0;
		if (res) {
			dmg2 = damage(ship,target,ship.NBPower(target.isInstall)+bonus,preMod,res*postMod,300);
			realdmg2 = takeDamage(target,dmg2);
		} else { realdmg2 = takeDamage(target,dmg2); }
		ship.fleet.giveCredit(ship,dmg1+dmg2);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg1+', '+dmg2+' damage, '+target.HP+'/'+target.maxHP+' left');
			// if (da==1) code += ship.id+','+target.id+',6,'+((target.side==0)? realdmg1+realdmg2 : Math.max(0,dmg1)+Math.max(0,dmg2))+'|'
			// else if (da==2) code += ship.id+','+target.id+',2,'+((target.side==0)? realdmg1+','+realdmg2:dmg1+','+dmg2)+'|';
			APIyasen.api_at_list.push(ship.apiID);
			APIyasen.api_df_list.push([target.apiID,target.apiID]);
			APIyasen.api_damage.push([realdmg1,realdmg2]);
			APIyasen.api_sp_list.push((da==2)? 1 : (cutin==6)? 2 : 4);
			APIyasen.api_cl_list.push(1);
		}
	} else {
		var res = rollHit(accuracyAndCrit(ship,target,evMod));
		var dmg = (cutin)? Math.floor(target.HP*(.06+.08*Math.random())) : 0; var realdmg = 0;
		if (res) {
			dmg = damage(ship,target,ship.NBPower(target.isInstall)+bonus,preMod,res*postMod,300);
			realdmg = takeDamage(target,dmg);
		} else { realdmg = takeDamage(target,dmg); }
		ship.fleet.giveCredit(ship,dmg);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			//do the maingun thing a better way
			var stype = (ship.type == 'CV' || ship.type == 'CVL')? '4' : (cutin)? '7' : ((!ship.equiptypes[B_MAINGUN] && ship.equiptypes[B_TORPEDO] && !target.isInstall)||ship.type=='SS')? '8' : '1';
			// code += ship.id+','+target.id+','+stype+','+((target.side==0)? realdmg:dmg)+'|';
			APIyasen.api_at_list.push(ship.apiID);
			APIyasen.api_df_list.push([target.apiID]);
			APIyasen.api_damage.push([realdmg]);
			APIyasen.api_sp_list.push(0);
			APIyasen.api_cl_list.push(1);
		}
	}
	return (target.HP <= 0);
}

function ASW(ship,target,isnight,APIhou) {
	var res = rollHit(accuracyAndCrit(ship,target,1/ship.fleet.formation.shellacc));
	var dmg = 0, realdmg = 0;
	var premod = (isnight)? 0 : ship.fleet.formation.ASWmod*ENGAGEMENT*ship.damageMod();
	if (res) {
		if (C) console.log(ship.ASWPower());
		dmg = damage(ship,target,ship.ASWPower(),premod,res,100);
		realdmg = takeDamage(target,dmg);
	}
	ship.fleet.giveCredit(ship,dmg);
	if (C) {
		console.log(ship.name+' shells '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
		var stype = (ship.iscarrier)? '4' : '5';
		// code += ship.id+','+target.id+','+stype+','+((target.side==0)? realdmg:dmg)+'|';
		APIhou.api_at_list.push(ship.apiID);
		APIhou.api_df_list.push([target.apiID]);
		APIhou.api_damage.push([realdmg]);
		if(APIhou.api_at_type) APIhou.api_at_type.push(0);
		else APIhou.api_sp_list.push(0);
		APIhou.api_cl_list.push(1);
	}
	return (target.HP <= 0);
}

function shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,APIhou) {
	if (C) code += 'S:';
	for (var i=0; i<6; i++) {
		if (i < order1.length && order1[i].canStillShell()) {
			if (subsalive2.length && order1[i].canASW()) {
				var target = choiceWProtect(subsalive2);
				if (ASW(order1[i],target,false,APIhou)) subsalive2.splice(subsalive2.indexOf(target),1);
			} else if (alive2.length) {
				var target = choiceWProtect(alive2);
				if (shell(order1[i],target,APIhou)) alive2.splice(alive2.indexOf(target),1);
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canStillShell()) {
			if (subsalive1.length && order2[i].canASW()) {
				var target = choiceWProtect(subsalive1);
				if (ASW(order2[i],target,false,APIhou)) subsalive1.splice(subsalive1.indexOf(target),1);
			} else if (alive1.length) {
				var target = choiceWProtect(alive1);
				if (shell(order2[i],target,APIhou)) alive1.splice(alive1.indexOf(target),1);
			}
		}
		if (alive1.length+subsalive1.length <= 0) break;
	}
	if (C) {
		if (code[code.length-1]=='|') code = code.substr(0,code.length-1);
		code += '~';
	}
}

function nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,APIyasen) {
	if (C) code += 'N:';
	for (var i=0; i<6; i++) {
		if (i < order1.length && order1[i].canNB()) {
			if (subsalive2.length && order1[i].canASW() && !order1[i].iscarrier) {
				var target = choiceWProtect(subsalive2);
				if (ASW(order1[i],target,!NBonly,APIyasen)) subsalive2.splice(subsalive2.indexOf(target),1);
			} else if (alive2.length) {
				var target = choiceWProtect(alive2);
				if (NBattack(order1[i],target,NBonly,APIyasen)) alive2.splice(alive2.indexOf(target),1);
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canNB()) {
			if (subsalive1.length && order2[i].canASW() && !order2[i].iscarrier) {
				var target = choiceWProtect(subsalive1);
				if (ASW(order2[i],target,!NBonly,APIyasen)) subsalive1.splice(subsalive1.indexOf(target),1);
			} else if (alive1.length) {
				var target = choiceWProtect(alive1);
				if (NBattack(order2[i],target,NBonly,APIyasen)) alive1.splice(alive1.indexOf(target),1);
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
	// if (C) code += 'T:';
	var shots = []; //set up shots
	var targets2 = [];
	for (var i=0; i<alive2.length; i++) { if (!alive2[i].isInstall) targets2.push(alive2[i]); }
	var targets1 = [];
	for (var i=0; i<alive1.length; i++) { if (!alive1[i].isInstall) targets1.push(alive1[i]); }
	
	if (targets2.length) {  //any targets?
		for (var i=0; i<alive1.length+subsalive1.length; i++) {
			var ship = (i < alive1.length) ? alive1[i] : subsalive1[i-alive1.length];
			if ((opening)? ship.canOpTorp() : ship.canTorp()) {
				var target = choiceWProtect(targets2);
				shots.push([ship,target]);
			}
		}
	}
	if (targets1.length) {
		for (var i=0; i<alive2.length+subsalive2.length; i++) {
			var ship = (i < alive2.length) ? alive2[i] : subsalive2[i-alive2.length];
			if ((opening)? ship.canOpTorp() : ship.canTorp()) {
				var target = choiceWProtect(targets1);
				shots.push([ship,target]);
			}
		}
	}
	for (var i=0; i<shots.length; i++) {  //do the shots
		var ship = shots[i][0]; var target = shots[i][1];
		var res = rollHit(accuracyAndCrit(ship,target,1/ship.fleet.formation.torpacc));
		var dmg = 0, realdmg = 0;
		if (res) {
			dmg = damage(ship,target,ship.TP+5,ship.fleet.formation.surfmod*ENGAGEMENT,res);
			realdmg = takeDamage(target,dmg);
		}
		ship.fleet.giveCredit(ship,dmg);
		if (C) {
			console.log(ship.name+' torpedoes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			// code += ship.id+','+target.id+','+((target.side==0)? realdmg:Math.max(0,dmg))+'|';
			APIrai[(ship.id>9)?'api_erai':'api_frai'][ship.apiID-6*(ship.id>9)] = target.apiID-6*(target.id>9);
			APIrai[(target.id>9)?'api_edam':'api_fdam'][target.apiID-6*(target.id>9)] += realdmg;
			APIrai[(ship.id>9)?'api_eydam':'api_fydam'][ship.apiID-6*(ship.id>9)] = realdmg;
		}
	}
	for (var i=0; i<alive1.length; i++) {   //remove dead things
		if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
	}
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
	}
	
	if (C) {
		if (code[code.length-1]=='|') code = code.substr(0,code.length-1);
		code += '~';
	}
}

function airstrike(ship,target,slot,contactMod) {
	if (!contactMod) contactMod = 1;
	var res = rollHit(accuracyAndCrit(PLANEDEFAULT,target));
	// var acc = accuracy(ship,target,2);
	var equip = ship.equips[slot];
	var dmg = 0, realdmg = 0;
	var planebase = (equip.isdivebomber)? equip.DIVEBOMB : equip.TP;
	if (C) console.log('		'+slot+' '+planebase);
	if (res) {
		dmg = damage(ship,target,25+Math.sqrt(ship.planecount[slot])*planebase,(equip.isdivebomber)? 1 : ((Math.random() < .5)? .8 : 1.5),res*contactMod,150);
		realdmg = takeDamage(target,dmg);
	}
	ship.fleet.giveCredit(ship,dmg);
	if(C) {
		console.log(ship.name+' airstrikes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left, CONTACT: '+contactMod);
	}
	return realdmg;
}

function takeDamage(ship,damage) {
	if (damage < 0) damage = 0;
	if (ship.side == 0) {
		if (ship.HP == 1) damage = 0;
		else if (damage >= ship.HP) damage = Math.floor(ship.HP*(.5+.3*Math.random()));  //overkill protection
	}
	ship.HP -= damage;
	return damage;
}

//old
function accuracy(ship,target,evademod) {
	if (!evademod) evademod = 1;
	// console.log("	evade:"+evademod);
	var acc = 1 + (Math.sqrt(ship.LVL)-1)/45 + ship.ACC*.01 + ship.LUK*.001;
	var evade = target.EV * evademod;
	var dodge = (evade > 37.5) ? evade/(evade+37.5) : evade/75;
	if (C) console.log('	acc: '+acc+' dodge: '+dodge);
	acc -= dodge;
	acc = Math.min(.975,acc);
	if (C) console.log('	accfinal: '+acc);
	return acc;
}

function accuracyAndCrit(ship,target,evademod) {
	if (!evademod) evademod = 1;
	// console.log("	evade:"+evademod);
	var acc = .95 + (Math.sqrt(ship.LVL)-1)/50 + ship.ACC*.01 + ship.LUK*.001;
	if (ship.ACCbonus) acc += ship.ACCbonus*.01;
	var evade = target.EV * evademod;
	var dodge = .03 + ((evade > 40) ? evade/(evade+40) : evade/80);
	if (C) console.log('	acc: '+acc+' dodge: '+dodge);
	acc = Math.max(acc-dodge,0);
	
	var crit = .05 + .1*acc;
	acc = Math.min(.975,acc+.05);
	if (C) console.log('	accfinal: '+acc+', crit: '+crit);
	return [acc,crit,ship];
}

function rollHit(accCrit) {
	var r = Math.random();
	if (r < accCrit[1]) return CRITMOD; //crit
	if (r < accCrit[0]) return 1; //normal hit
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
	// if (Math.random() < CRITCHANCE) dmg*=1.5;  included in postMod now, calculated outside function
	if (C) console.log('	before def: '+dmg);
	dmg -= target.AR*(.7+.6*Math.random());
	if (C) console.log('	after def: '+dmg);
	// ammo mod?
	dmg = Math.floor(dmg);
	if (dmg <= 0) dmg = Math.floor(target.HP*(.06+.08*Math.random())); //scratch damage
	if (C) console.log('	returned: '+dmg);
	return dmg;
}

function softCap(num,cap) {
	return (num > cap)? cap+Math.sqrt(num-cap) : num;
}

function compareAP(fleet1,fleet2) {
	var ap1 = fleet1.fleetAirPower(), ap2 = fleet2.fleetAirPower();
	if (ap1 == 0 && ap2 == 0) { fleet1.AS = fleet2.AS = 0; }
	else if (ap1 >= ap2*3) { fleet1.AS = 2; fleet2.AS = -2; }
	else if (ap1 >= ap2*1.5) { fleet1.AS = 1; fleet2.AS = -1; }
	else if (ap2 >= ap1*3) { fleet1.AS = -2; fleet2.AS = 2; }
	else if (ap2 >= ap1*1.5) { fleet1.AS = -1; fleet2.AS = 1; }
	else { fleet1.AS = fleet2.AS = 0; }
	if (C) console.log('AS: '+ap1+' '+ap2+' '+fleet1.AS + ' '+fleet2.AS);
}

function AADefend(ship,defender,slot,AACInum) {
	var shotdown1 = (Math.random() < .5)? Math.floor(ship.planecount[slot]*Math.floor(defender.weightedAntiAir()*.9)/360) : 0;
	var shotdown2 = (Math.random() < .5)? Math.floor((defender.weightedAntiAir()+defender.fleet.fleetAntiAir())*.1) : 0;
	var shotdown3 = ((defender.side==0)? 1 : 0) + ((AACInum)? AACInum : 0);
	ship.planecount[slot] = Math.max(0,ship.planecount[slot]-shotdown1-shotdown2-shotdown3);
	if (C) console.log('	anti air: '+defender.name+' '+defender.AA+' '+shotdown1+' '+shotdown2+' '+shotdown3+' '+ship.planecount[slot]);
	return [shotdown1, shotdown2, shotdown3];
}

function choiceWProtect(targets,rate) {
	var defenders = [];
	for (var i=0; i<targets.length; i++) {
		if (!targets[i].isflagship && targets[i].HP/targets[i].maxHP > .5) defenders.push(targets[i]);
	}
	var r = Math.floor(Math.random()*(targets.length+defenders.length));
	return (r < targets.length) ? targets[r] : defenders[r-targets.length];
}

function AADefenceFighters(carriers,showplanes,APIkouku) {
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i], hasfighter = false;
		for (var j=0; j<ship.equips.length; j++) {
			if (ship.equips[j].isfighter) {
				var rmin, rmax;
				switch(ship.fleet.AS) {
					case 2: rmin = 7/256; rmax = 15/256; break;
					case 1: rmin = 20/256; rmax = 45/256; break;
					case 0: rmin = 30/256; rmax = 75/256; break;
					case -1: rmin = 45/256; rmax = 105/256; break;
					case -2: rmin = 65/256; rmax = 150/256; break;
				}
				var lostcount = Math.floor(ship.PLANESLOTS[j]*(rmin+Math.random()*(rmax-rmin)));;
				if (C) {
					APIkouku.api_stage1[(ship.id>9)? 'api_e_count':'api_f_count'] += ship.planecount[j];
					APIkouku.api_stage1[(ship.id>9)? 'api_e_lostcount':'api_f_lostcount'] += lostcount;
				}
				ship.planecount[j] -= lostcount;
				if (ship.planecount[j] < 0) ship.planecount[j] = 0;
				// if (!ship.equips[j].istorpbomber&&!ship.equips[j].isdivebomber) hasfighter = true;
				hasfighter = true;
			}
		}
		// if (C && hasfighter && showplanes) code += ship.id+',-1,-1,-1,-1,-1|'
		if (C && hasfighter && showplanes) APIkouku.api_plane_from[(ship.id>9)?1:0].push(ship.apiID);
	}
}

function AADefenceBombersAndAirstrike(carriers,targets,defenders,APIkouku) {
	var bombers = [], hasbomber = false;
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i];
		bombers.push([]);
		for (var j=0; j<ship.equips.length; j++) {
			var e = ship.equips[j];
			if ((e.istorpbomber || e.isdivebomber) && ship.planecount[j]>0) { bombers[i].push(j); hasbomber = true; }
		}
	}
	if (!hasbomber) return;
	
	//get AACI
	var AACInum = 0;
	var AACIs = [];
	for (var i=0; i<defenders.length; i++) if (defenders[i].AACItype) AACIs.push(defenders[i]);
	AACIs.sort(function(a,b) { return (a.AACItype >= b.AACItype)? -1: 1; });
	var AACIid = -1;
	for (var i=0; i<AACIs.length; i++) {
		if (Math.random() < AACIDATA[AACIs[i].AACItype].rate) {
			AACIid = AACIs[i].id;
			AACInum = AACIDATA[AACIs[i].AACItype].num;
			// if (C) code = code.replace('{aaci'+(parseInt(defenders[0].fleet.id)+1)+'}',AACIid.toString());
			if (C) APIkouku.api_stage2[(AACIid<10)?'api_air_fire':'api_air_fire_e'] = {api_idx:AACIs[i].apiID,api_kind:AACInum};
			break;
		}
	}
	if (C) code = code.replace('{aaci'+(parseInt(defenders[0].fleet.id)+1)+'}','-1');
	//get contact
	var contactMod = 1;
	var allcontacts = [];
	for (var j=0; j<carriers.length; j++) {
		var ship = carriers[j];
		for (var i=0; i<ship.equips.length; i++) {
			var equip = ship.equips[i];
			var rate;
			switch (equip.type) {
				case TORPBOMBER: rate = .02; break;
				case NIGHTSCOUT: rate = .05; break;
				case SEAPLANE: rate = .2; break;
				case CARRIERSCOUT: rate = .6; break;
				case FLYINGBOAT: rate = .7; break;
				default: continue;
			}
			allcontacts.push([rate,equip]);
		}
	}
	allcontacts.sort(function(a,b) {
		var acc1 = (a[1].ACC)? a[1].ACC : 0;
		var acc2 = (b[1].ACC)? b[1].ACC : 0;
		return (acc1 > acc2)? -1 : 1;
	});
	var contacter = null;
	for (var i=0; i<allcontacts.length; i++) {
		if (Math.random() < allcontacts[i][0]) {
			contacter = allcontacts[i][1];
			if (contacter.ACC >= 3) contactMod = 1.2;
			else if(contacter.ACC==2) contactMod = 1.17;
			else contactMod = 1.12;
			break;
		}
	}
	
	for (var i=0; i<bombers.length; i++) {
		var ship = carriers[i];
		for (var j=0; j<bombers[i].length; j++) {
			var slot = bombers[i][j];
			var defender = defenders[Math.floor(Math.random()*defenders.length)];
			var shotProp = (Math.random() < .5)? Math.floor(ship.planecount[slot]*Math.floor(defender.weightedAntiAir()*.9)/360) : 0;
			var shotFlat = (Math.random() < .5)? Math.floor((defender.weightedAntiAir()+defender.fleet.fleetAntiAir())*.1) : 0;
			var shotFix = ((defender.side==0)? 1 : 0) + AACInum;
			if (defender.side==1) shotFlat = 0;  //TEMP NERF FOR ENEMY, REMEMBER CHANGE
			if (C) {
				APIkouku.api_stage2[(ship.id>9)?'api_e_count':'api_f_count'] += ship.planecount[slot];
				APIkouku.api_stage2[(ship.id>9)?'api_e_lostcount':'api_f_lostcount'] += shotProp+shotFlat+shotFix;
			}
			ship.planecount[slot] = Math.max(0,ship.planecount[slot]-shotProp-shotFlat-shotFix);
			if (C) console.log('	anti air: '+defender.name+' '+defender.AA+' '+shotProp+' '+shotFlat+' '+shotFix+' '+ship.planecount[slot]);
		
			if (ship.planecount[slot]<=0) {
				ship.planecount[slot] = 0;
				if (C) code += ship.id+',-1,-1,'+defender.id+',2,2|';
				continue;
			}
			
			if (targets.length) {  //even if subs only, bombers still get shot down
				var target = choiceWProtect(targets);
				var dmg = airstrike(ship,target,slot,contactMod);
				// if (C) code += ship.id+','+target.id+','+dmg+','+defender.id+',0,0|';
				if (C) {
					APIkouku.api_stage3[(target.id>9)?'api_ebak_flag':'api_fbak_flag'][(target.id>9)?target.id-9:target.id+1] = 1;
					APIkouku.api_stage3[(target.id>9)?'api_edam':'api_fdam'][(target.id>9)?target.id-9:target.id+1] += dmg;
				}
			}
		}
	}
}

function airPhase(alive1,subsalive1,alive2,subsalive2,APIkouku) {
	// if (C) code += 'A:'
	var carriers1 = [], carriers2 = [];
	for (var i=0; i<alive1.length; i++) if (alive1[i].iscarrier) carriers1.push(alive1[i]);
	for (var i=0; i<subsalive1.length; i++) if (subsalive1[i].iscarrier) carriers1.push(subsalive1[i]);
	for (var i=0; i<alive2.length; i++) if (alive2[i].iscarrier) carriers2.push(alive2[i]);
	for (var i=0; i<subsalive2.length; i++) if (subsalive2[i].iscarrier) carriers2.push(subsalive2[i]);
	
	if (carriers1.length||carriers2.length) {
		// if (C) code += '{aaci1},{aaci2},0,0:'
		if (C) {
			APIkouku.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0,api_touch_plane:[-1,-1]};
			APIkouku.api_stage2 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0};
			APIkouku.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_fbak_flag:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai_flag:[-1,0,0,0,0,0,0]};
		}
		//fighter defence
		AADefenceFighters(carriers1,alive2.length,APIkouku);
		AADefenceFighters(carriers2,alive1.length,APIkouku);
		
		//bomber defence
		AADefenceBombersAndAirstrike(carriers1,alive2,alive2.concat(subsalive2),APIkouku);
		AADefenceBombersAndAirstrike(carriers2,alive1,alive1.concat(subsalive1),APIkouku);
	}
	if (C) {
		// if (code[code.length-1]=='|') code = code.substr(0,code.length-1);
		// code += '~';
		// code = code.replace('{aaci1},{aaci2},0,0:~','~').replace('{aaci1}','-1').replace('{aaci2}','-1');
		for (var i=0; i<1; i++)
			if (APIkouku && APIkouku.api_plane_from[i].length > 1)
				APIkouku.api_plane_from[i] = APIkouku.api_plane_from[i].slice(1);
	}
}

function sim(F1,F2,doNB,NBonly,aironly,BAPI) {
	var ships1 = F1.ships, ships2 = F2.ships;
	var alive1 = [], alive2 = [], subsalive1 = [], subsalive2 = [];
	for (var i=0; i<ships1.length; i++) {
		if(ships1[i].type == 'SS') subsalive1.push(ships1[i]);
		else alive1.push(ships1[i]);
	}
	for (var i=0; i<ships2.length; i++) {
		if(ships2[i].type == 'SS') subsalive2.push(ships2[i]);
		else alive2.push(ships2[i]);
	}
	
	var r = Math.random();
	if (r < .45) ENGAGEMENT = 1;
	else if (r < .6) ENGAGEMENT = 1.2;
	else if (r < .9 || F1.noRedT || F2.noRedT) ENGAGEMENT = .8;
	else ENGAGEMENT = .6;
	
	compareAP(F1,F2);
	
	//code here
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		// code += 'B:'+ENGAGEMENT + ',' + F1.formation.id + ',' + F2.formation.id + ',' + F1.AS + ',' + F2.AS + ',' + ((NBonly)? 1:0) + ',' + ((aironly)? 1:0) + '~';
		// for (var i=0; i<ships1.length; i++) {
			// code += ships1[i].mid + ',' + ships1[i].maxHP + ',' + ships1[i].HP;
			// if (ships1[i].iscarrier) code += ',' + ships1[i].numBombers().join();
			// code += '|';
		// }
		// code = code.substr(0,code.length-1) + '~';
		// for (var i=0; i<ships2.length; i++) {
			// code += ships2[i].mid + ',' + ships2[i].maxHP + ',' + ships2[i].HP ;
			// if (ships2[i].iscarrier) code += ',' + ships2[i].numBombers().join();
			// code += '|';
		// }
		// code = code.substr(0,code.length-1) + '~';
		var dataroot = (NBonly)? BAPI.yasen : BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		dataroot.api_dock_id = 1;
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
		if (ships1[i].type == 'BB' || ships1[i].type == 'BBV') doShell2 = true;
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].type == 'BB' || ships2[i].type == 'BBV') doShell2 = true;
	}
	
	//opening airstrike
	if (!NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_kouku:undefined);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:4,0:3}[F1.AS+2];
			else BAPI.data.api_kouku = null;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	if (!NBonly && aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_kouku2 = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_kouku2:undefined);
		if (C && !BAPI.data.api_kouku2.api_stage1) delete BAPI.data.api_kouku2;
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2,subsalive2,true,(C)? BAPI.data.api_opening_atack : undefined);
	}
	
	//shelling 1
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var ranges = [[],[],[],[],[]]; //fleet 1
		for (var i=0; i<alive1.length; i++) {
			if (!alive1[i].canShell()) continue;
			ranges[alive1[i].RNG].push(alive1[i]);
		}
		for (var i=0; i<ranges.length; i++) shuffle(ranges[i]);
		var order1 = [];
		for (var i=0; i<ranges[4].length; i++) order1.push(ranges[4][i]);
		for (var i=0; i<ranges[3].length; i++) order1.push(ranges[3][i]);
		for (var i=0; i<ranges[2].length; i++) order1.push(ranges[2][i]);
		for (var i=0; i<ranges[1].length; i++) order1.push(ranges[1][i]);
		for (var i=0; i<ranges[0].length; i++) order1.push(ranges[0][i]);
		ranges = [[],[],[],[],[]];  //fleet 2
		for (var i=0; i<alive2.length; i++) {
			if (!alive2[i].canShell()) continue;
			ranges[alive2[i].RNG].push(alive2[i]);
		}
		for (var i=0; i<ranges.length; i++) shuffle(ranges[i]);
		var order2 = [];
		for (var i=0; i<ranges[4].length; i++) order2.push(ranges[4][i]);
		for (var i=0; i<ranges[3].length; i++) order2.push(ranges[3][i]);
		for (var i=0; i<ranges[2].length; i++) order2.push(ranges[2][i]);
		for (var i=0; i<ranges[1].length; i++) order2.push(ranges[1][i]);
		for (var i=0; i<ranges[0].length; i++) order2.push(ranges[0][i]);
		
		if (C) BAPI.data.api_hougeki1 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_hougeki1:undefined);
	}
	
	//shelling 2
	if (!NBonly && !aironly && doShell2 && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var order1 = [], order2 = [];
		for (var i=0; i<alive1.length; i++) {
			if (alive1[i].canShell()) order1.push(alive1[i]);
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].canShell()) order2.push(alive2[i]);
		}
		
		if (C) BAPI.data.api_hougeki2 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_hougeki2:undefined);
	}
	
	// closing torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2,subsalive2,false,(C)? BAPI.data.api_raigeki:undefined);
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
			BAPI.yasen.api_hougeki = {api_at_list:[-1],api_damage:[-1],api_df_list:[-1],api_sp_list:[-1],api_cl_list:[-1]};
		}
		nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,(C)? BAPI.yasen.api_hougeki:undefined);
	}
	
	// console.log(code);
	var results = {};
	var rank = '';
	var dmg1 = 0, dmg2 = 0, sunk1 = 0, sunk2 = 0;
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].HP <= 0) sunk2++;
		dmg2 += ships2[i].maxHP - Math.max(0,ships2[i].HP);
	}
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP <= 0) sunk1++;
		dmg1 += ships1[i].maxHP - Math.max(0,ships1[i].HP);
	}
	if (sunk2 == ships2.length) rank = 'S';
	else if (ships2.length > 1 && sunk2 >= Math.floor(ships2.length*2/3)) rank = 'A';
	else if (ships2[0].HP <= 0 || dmg2 >= dmg1*2.5) rank = 'B';
	else if (dmg1 > dmg2) rank = 'C';
	else rank = 'D';
	results.rank = rank;
	
	results.redded = false;
	results.reddedIndiv = [false,false,false,false,false];
	results.flagsunk = (ships2[0].HP <= 0);
	results.undamaged = true;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP/ships1[i].maxHP <= .25) { results.redded = true; results.reddedIndiv[i] = true; }
		if (ships1[i].HP/ships1[i].maxHP <= .5) results.undamaged = false;
	}
	results.MVP = F1.getMVP();
	if (didNB) results.didNB = true;
	
	return results;
}

function loadFleet(side,ships,formation) {
	var f = new Fleet(side);
	f.ships = [];
	f.loadShips(ships);
	f.formation = ALLFORMATIONS[formation];
	if (side==0) FLEETS1.push(f);
	else if (side==1) FLEETS2.push(f);
	// sim(FLEET1,FLEET2,true);
	// simStats(10000);
}

function createDefaultShip(mid) {
	var data = SHIPDATA[mid];
	var ShipType = window[data.type];
	var ship = new ShipType(mid,data.name,(mid>500)?1:0,(mid>500)?1:99,data.HP,data.FP,data.TP,data.AA,data.AR,data.EV,data.ASW,data.LOS,data.LUK,data.RNG,data.SLOTS);
	if (ship.type == 'SS' && (ship.name.indexOf('Elite')>0 || ship.name.indexOf('Flagship')>0)) ship.LVL = 50;
	if (data.EQUIPS) ship.loadEquips(data.EQUIPS,[],true);
	if (SHIPDATA[mid].isInstall) ship.isInstall = true;
	return ship;
}

// var sships = [];
// for (var i=501; i<636; i++) {
	// if (!SHIPDATA[i]) continue;	
	// sships.push(createDefaultShip(i));
// }
// sships.sort(function(a,b) { return (a.weightedAntiAir() > b.weightedAntiAir())? -1 : 1; });
// for (var i=0; i<sships.length; i++) {
	// var ship = sships[i];
	// console.log(ship.name+' '+ship.AA + ' '+ship.weightedAntiAir());
// }

var fucky = new DD(0,'FubukiKai',0, 50,30, 49,79,49,49, 57, 50,0,10, 1);
fucky.loadEquips([EQDATA[47],EQDATA[2],EQDATA[2]],true);
var akagi = new CV(1,'AkagiKai',0, 70,77, 49,0,79,79, 57, 0,0,10, 1, [20,20,32,10]);
akagi.loadEquips([EQDATA[52],EQDATA[52],EQDATA[52],EQDATA[22]],true);
var mogamin = new CAV(2,'MogamiKai',0, 50,50, 75,69,59,71, 57, 0,0,10, 2, [5,6,3,3]);
mogamin.loadEquips([EQDATA[35],EQDATA[26],EQDATA[50],EQDATA[50]],true);
var bongou = new BB(3,'KongouKai2',0, 75,82, 98,0,80,94, 60, 0,0,14, 3);
bongou.loadEquips([EQDATA[7],EQDATA[7],EQDATA[25],EQDATA[36]],true);
var kaga = new CV(1,'KagaKai',0, 75,79, 49,0,79,79, 57, 0,0,10, 1, [20,20,46,12]);
kaga.loadEquips([EQDATA[52],EQDATA[52],EQDATA[52],EQDATA[22]],true);
var hiei = new BB(3,'HieiKai2',0, 75,83, 98,0,76,95, 60, 0,0,11, 3);
hiei.loadEquips([EQDATA[7],EQDATA[7],EQDATA[25],EQDATA[35]],true);
var haguro = new CA(194,'HaguroKai2',0, 72,57, 84,84,52,75, 59, 0,0,15, 2);
haguro.loadEquips([EQDATA[50],EQDATA[50],EQDATA[25],EQDATA[35]],true);
var spukikaze = new DD(228,'YukikazeKai',0, 75,32, 59,89,59,59, 91, 0,0,60, 1);
spukikaze.loadEquips([EQDATA[15], EQDATA[15], EQDATA[15]], true);
var imuya = new SS(1,'I-168Kai',0, 71,15, 11,69,0,18, 45, 0,0,10, 1);
var goya = new SSV(1,'I-58Kai',0, 73,18, 12,84,0,19, 45, 0,0,50, 1);
var iku = new SSV(1,'I-19Kai',0, 72,18, 12,89,0,19, 45, 0,0,13, 1);
var hachi = new SSV(1,'I-8Kai',0, 74,19, 14,84,0,19, 45, 0,0,25, 1,[3,3]);
imuya.loadEquips([EQDATA[15],EQDATA[15]],true);
goya.loadEquips([EQDATA[15],EQDATA[15]],true);
iku.loadEquips([EQDATA[15],EQDATA[15]],true);
hachi.loadEquips([EQDATA[26],EQDATA[15]],true);

var taihue = new CVB(156,'TaihouKai',0, 70,70, 59,0,86,84, 50, 0,0,4, 1,[30,24,24,8]);
taihue.loadEquips([EQDATA[52],EQDATA[52],EQDATA[52],EQDATA[22]],true);
var tomato = new BB(136,'YamatoKai',0, 70,96, 199,0,106,118, 53, 0,0,13, 4, [7,7,7,7]);
tomato.loadEquips([EQDATA[9],EQDATA[9], EQDATA[25],EQDATA[36]]);
var musushi = new BB(148,'MusashiKai',0, 70,97, 199,0,102,119, 53, 0,0,10, 4, [7,7,7,7]);
musushi.loadEquips([EQDATA[9],EQDATA[9], EQDATA[25],EQDATA[36]]);
var bisco = new BB(178,'Bismarckdrei',0, 75,96, 141,36,70,95, 64, 0,0,22, 3, [4,4,4,4]);
bisco.loadEquips([EQDATA[76],EQDATA[76], EQDATA[25],EQDATA[35]]);

// FLEET1.loadShips([aBBH,aBBH2,aBBH3,aBBH4,aBBH5,akagi]);
// FLEET1.loadShips([bisco,tomato,musushi,spukikaze,haguro,taihue]);
// FLEET1.loadShips([imuya,iku,hachi,fucky,goya]);
// FLEET1.formation = LINEAHEAD;

// var a = new DD(0,'I',1, 1,20, 10,10,10,10, 30, 25,0,0, 1);
// var a2 = new DD(0,'I',1, 1,20, 10,10,10,10, 30, 25,0,0, 1);
// var b = new BB(1,'RuF',1, 1,98, 135,0,80,99, 40, 0,0,20, 3);
// var b2 = new BB(1,'RuE',1, 1,90, 137,0,80,85, 16, 0,0,10, 3);
// var c = new CL(1,'HeF',1, 1,57, 50,80,30,39, 46, 80,0,20, 2);
// c.loadEquips([EQDATA[47],EQDATA[45]],true);
// var w = new CVN(1,'WoF',1, 1,96, 25,0,50,80, 45, 0,0,20, 1, [32,32,32]);
// w.loadEquips([EQDATA[21],EQDATA[18],EQDATA[18]],true);
// var BBH = new BB(1,'BBH',1, 50,400, 180,0,80,160, 30, 0,0,40, 3);
// BBH.loadEquips([EQDATA[8],EQDATA[8],EQDATA[10],EQDATA[141]],true);
// BBH.ACC = 15;
// var wanko = new BBV(1,'HarbourH2',1, 1,490, 221,0,170,183, 1, 0,100,65, 3, [0,0,0,180]);
// wanko.loadEquips([EQDATA[8],EQDATA[8],EQDATA[36],EQDATA[18]]);
// wanko.ACC = 15;
// wanko.isInstall = true;
// var s = new SS(1,'YoF',1, 50,44, 0,96,0,36, 10, 0,0,20, 1);
// var s2 = new SS(1,'KaE',1, 50,27, 0,90,0,20, 10, 0,0,0, 1);
// var s3 = new SS(1,'KaE',1, 50,27, 0,90,0,20, 10, 0,0,0, 1);
// var s4 = new SS(1,'KaE',1, 50,27, 0,90,0,20, 10, 0,0,0, 1);
// var s5 = new SS(1,'KaE',1, 50,27, 0,90,0,20, 10, 0,0,0, 1);
// var s6 = new SS(1,'KaE',1, 50,27, 0,90,0,20, 10, 0,0,0, 1);
// s.loadEquips([EQDATA[15],EQDATA[15],EQDATA[13]]);
// s2.loadEquips([EQDATA[15],EQDATA[15]]);
// s3.loadEquips([EQDATA[15],EQDATA[15]]);
// s4.loadEquips([EQDATA[15],EQDATA[15]]);
// s5.loadEquips([EQDATA[15],EQDATA[15]]);
// s6.loadEquips([EQDATA[15],EQDATA[15]]);
// FLEET2.loadShips([s,s2,s3,s4,s5,s6]);
// FLEET2.formation = ECHELON;
// FLEET2.loadShips([wanko,BBH,b2,c,a,a2]);
// FLEET2.formation = DOUBLELINE;
var d1 = createDefaultShip(545);
var d2 = createDefaultShip(544);
var d3 = createDefaultShip(527);
var d4 = createDefaultShip(554);
var d5 = createDefaultShip(520);
var d6 = createDefaultShip(553);
// var d1 = createDefaultShip(532);
// var d2 = createDefaultShip(531);
// var d3 = createDefaultShip(530);
// var d4 = createDefaultShip(572);
// var d5 = createDefaultShip(571);
// var d6 = createDefaultShip(570);
// FLEET2.loadShips([d1,d2,d3,d4,d5,d6]);
// FLEET2.formation = DIAMOND;


// sim(FLEET1,FLEET2,true);

function simStats(numsims,doNB,NBonly,aironly) {
	// if (FLEET1.ships.length <= 0) return 1;
	// if (FLEET2.ships.length <= 0) return 2;
	var totalResult = {
		totalnum: numsims,
		totalFuelS: 0,
		totalAmmoS: 0,
		totalBauxS: 0,
		totalFuelR: 0,
		totalSteelR: 0,
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
			ranks: {S:0,A:0,B:0,C:0,D:0},
			flagsunk: 0
		});
	}
	
	C = false;
	for (var i=0; i<numsims; i++) {
		var totalDidNB = 0;
		for (var j=0; j<FLEETS2.length; j++) {
			var res = sim(FLEETS1[0],FLEETS2[j],doNB[j],NBonly[j],aironly[j]);
			
			totalResult.nodes[j].num++;
			if (res.redded) totalResult.nodes[j].redded++;
			for (var k=0; k<res.reddedIndiv.length; k++) if (res.reddedIndiv[k]) totalResult.nodes[j].redIndiv[k]++;
			if (res.undamaged) totalResult.nodes[j].undamaged++;
			if (res.flagsunk) totalResult.nodes[j].flagsunk++;
			totalResult.nodes[j].ranks[res.rank]++;
			totalResult.nodes[j].MVPs[res.MVP]++;
			if (res.didNB) totalDidNB++;
			if (res.redded) break;
		}
		// console.log(totalDidNB);
		for (var j=0; j<FLEETS1[0].ships.length; j++) { //get refuel and repair costs
			var ship = FLEETS1[0].ships[j];
			var r = getRepairCost(ship);
			totalResult.totalFuelR += r[0];
			totalResult.totalSteelR += r[1];
			totalResult.totalFuelS += Math.floor(ship.fuel * .2 * FLEETS2.length);
			totalResult.totalAmmoS += Math.floor(ship.ammo * (.2*FLEETS2.length + .1*totalDidNB));
			for (var k=0; k<ship.PLANESLOTS.length; k++) totalResult.totalBauxS += 5*(ship.PLANESLOTS[k]-ship.planecount[k]);
		}
		
		for (var j=0; j<FLEETS1.length; j++) FLEETS1[j].reset();
		for (var j=0; j<FLEETS2.length; j++) FLEETS2[j].reset();
	}
	
	// totalResult.totalFuelR/=numsims;
	// totalResult.totalSteelR/=numsims;
	// totalResult.totalFuelS/=numsims;
	// totalResult.totalAmmoS/=numsims;
	// totalResult.totalBauxS/=numsims;
	// for (var j=0; j<FLEET2.length; j++) {
		// totalResult.nodes[j].redded/=numsims;
		// totalResult.nodes[j].undamaged/=numsims;
		// totalResult.nodes[j].flagsunk/=numsims;
		// for (rank in totalResult.nodes[j].ranks) totalResult.nodes[j].RANKS[rank]/=numsims;
		// for (var i=0; i<totalResult.nodes[j].MVPs.length; i++) totalResult.nodes[j].MVPs[i]/=numsims;
		// for (var i=0; i<totalResult.nodes[j].redIndiv.length; i++) totalResult.nodes[j].redIndiv[i]/=numsims;
	// }
	
	updateResults(totalResult);
	
	console.log(totalResult);
	// console.log('RED RATE: '+totalResult.RED);
	// console.log('UNDAMAGED: '+totalResult.UNDAMAGED);
	// console.log('FLAG SUNK: '+totalResult.FLAGSUNK);
	// console.log('AVG REPAIR FUEL: '+totalResult.totalFuelR);
	// console.log('AVG REPAIR STEEL: '+totalResult.totalSteelR);
	// console.log('AVG SUPPLY FUEL: '+totalResult.totalFuelS);
	// console.log('AVG SUPPLY AMMO: '+totalResult.totalAmmoS);
	// console.log('AVG SUPPLY BAUX: '+totalResult.totalBauxS);
	// console.log(totalResult.RANKS);
	// console.log(totalResult.MVPS);
	
	return 0;
}
