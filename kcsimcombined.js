function simCombined(type,F1,F1C,F2,Fsupport,doNB,NBonly,aironly,BAPI) {
	bombing = false;
	var ships1 = F1.ships, ships2 = F2.ships, ships1C = F1C.ships;
	var alive1 = [], alive1C = [], alive2 = [], subsalive1 = [], subsalive1C = [], subsalive2 = [];
	for (var i=0; i<ships1.length; i++) {
		if(ships1[i].type == 'SS') subsalive1.push(ships1[i]);
		else alive1.push(ships1[i]);
	}
	for (var i=0; i<ships1C.length; i++) {
		if(ships1C[i].type == 'SS') subsalive1C.push(ships1C[i]);
		else alive1C.push(ships1C[i]);
	}
	for (var i=0; i<ships2.length; i++) {
		if(ships2[i].type == 'SS') subsalive2.push(ships2[i]);
		else alive2.push(ships2[i]);
	}
	
	var r = Math.random();
	if (r < .45) ENGAGEMENT = 1;
	else if (r < .6) ENGAGEMENT = 1.2;
	else if (r < .9 || F1.noRedT || F2.noRedT || F1C.noRedT) ENGAGEMENT = .8;
	else ENGAGEMENT = .6;
	
	compareAP(F1,F2);
	F1C.AS = F1.AS;
	
	if (aironly && ships2.length <= 2 && [652,651,650].indexOf(ships2[0].mid) != -1) bombing = true;
	
	//code here
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
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
		dataroot.api_nowhps_combined = [-1];
		dataroot.api_maxhps_combined = [-1];
		for (var i=0; i<6; i++) {
			dataroot.api_nowhps_combined.push((i<ships1C.length)? ships1C[i].HP : -1);
			dataroot.api_maxhps_combined.push((i<ships1C.length)? ships1C[i].maxHP : -1);
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
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2,subsalive2,(C)? BAPI.data.api_kouku:undefined);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_kouku = null;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	//second airphase
	if (!NBonly && aironly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
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
	
	//support phase
	if (Fsupport && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var shipsS = Fsupport.ships;
		if (C) {
			BAPI.data.api_support_flag = 2;
			BAPI.data.api_support_info = { api_support_airatack:null, api_support_hourai:null };
			/*if type == 2*/ BAPI.data.api_support_info.api_support_hourai = { api_cl_list:[0,0,0,0,0,0,0], api_damage:[0,0,0,0,0,0,0], api_deck_id:3};
		}
		var hou = (BAPI)? BAPI.data.api_support_info.api_support_hourai : undefined;
		for (var i=0; i<shipsS.length; i++) {
			var ship = shipsS[i];
			var target = choiceWProtect(alive2);
			var res = rollHit(accuracyAndCrit(ship,target,1,.5),(ship.CVshelltype)? ship.critdmgbonus:0);
			var dmg = 0, realdmg = 0;
			if (res) {
				dmg = damage(ship,target,ship.shellPower(target.isInstall),1,res);
				realdmg = takeDamage(target,dmg);
			} else { realdmg = 0; }
			if (C) {
				hou.api_cl_list[i+1] = 1;
				hou.api_damage[target.apiID-7] += realdmg;
			}
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1C,subsalive1C,alive2,subsalive2,true,(C)? BAPI.data.api_opening_atack : undefined);
	}
	
	//shelling functions
	var shellRange = function(alive1f,subsalive1f,api_hou) {
		if (!NBonly && !aironly && alive1f.length+subsalive1f.length > 0 && alive2.length+subsalive2.length > 0) {
			var ranges = [[],[],[],[],[]]; //fleet 1
			for (var i=0; i<alive1f.length; i++) {
				if (!alive1f[i].canShell()) continue;
				ranges[alive1f[i].RNG].push(alive1f[i]);
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
			
			shellPhase(order1,order2,alive1f,subsalive1f,alive2,subsalive2,(C)? api_hou:undefined);
		}
	}
	
	var shellOrder = function(alive1f,subsalive1f,api_hou) {
		if (!NBonly && !aironly && alive1f.length+subsalive1f.length > 0 && alive2.length+subsalive2.length > 0) {
			var order1 = [], order2 = [];
			for (var i=0; i<alive1f.length; i++) {
				if (alive1f[i].canShell()) order1.push(alive1f[i]);
			}
			for (var i=0; i<alive2.length; i++) {
				if (alive2[i].canShell()) order2.push(alive2[i]);
			}
			
			shellPhase(order1,order2,alive1f,subsalive1f,alive2,subsalive2,(C)? api_hou:undefined);
		}
	}
	
	//shelling 1
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki1 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		if (type==2) shellRange(alive1,subsalive1,(C)? BAPI.data.api_hougeki1 : undefined);
		else shellRange(alive1C,subsalive1C,(C)? BAPI.data.api_hougeki1 : undefined);
	}
	
	// closing torpedo for CTF/TTF
	if (type!=2 && !NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1C,subsalive1C,alive2,subsalive2,false,(C)? BAPI.data.api_raigeki:undefined);
	}
	
	//shelling 2
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki2 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		if (type==2 && doShell2) shellOrder(alive1,subsalive1,(C)? BAPI.data.api_hougeki2 : undefined);
		else shellRange(alive1,subsalive1,(C)? BAPI.data.api_hougeki2 : undefined);
	}
	
	//shelling 3
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki3 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		if (type==2) shellRange(alive1C,subsalive1C,(C)? BAPI.data.api_hougeki3 : undefined);
		else if (doShell2) shellOrder(alive1,subsalive1,(C)? BAPI.data.api_hougeki3 : undefined);
	}
	
	// closing torpedo for STF
	if (type==2 && !NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1C,subsalive1C,alive2,subsalive2,false,(C)? BAPI.data.api_raigeki:undefined);
	}
	
	//night battle
	var didNB = false;
	if ((doNB||NBonly) && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		didNB = !NBonly;
		var order1 = [], order2 = [];
		for (var i=0; i<ships1C.length; i++) {
			order1.push(ships1C[i]);
		}
		for (var i=0; i<ships2.length; i++) {
			order2.push(ships2[i]);
		}
		
		if (C) {
			if (!BAPI.yasen) BAPI.yasen = {};
			BAPI.yasen.api_hougeki = {api_at_list:[-1],api_damage:[-1],api_df_list:[-1],api_sp_list:[-1],api_cl_list:[-1]};
			BAPI.yasen.api_flare_pos = [-1,-1];
		}
		nightPhase(order1,order2,alive1C,subsalive1C,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);
	}
	
	//results
	for (var i=0; i<ships1.length; i++) {
		ships1[i].fuelleft -= 2;
		ships1[i].ammoleft -= (didNB)? 3 : 2;
		if (C) console.log('aaaaaaaaaaaaaaaaaaaaa'+ships1[i].fuelleft);
	}
	for (var i=0; i<ships1C.length; i++) {
		ships1C[i].fuelleft -= 2;
		ships1C[i].ammoleft -= (didNB)? 3 : 2;
	}
	
	var results = {};
	var rank = '';
	var dmg1 = 0, dmg2 = 0, sunk1 = 0, sunk2 = 0, dtotal1 = 0, dtotal2 = 0;
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].HP <= 0) sunk2++;
		dmg2 += ships2[i].maxHP - Math.max(0,ships2[i].HP);
		dtotal2 += ships2[i].maxHP;
	}
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP <= 0) sunk1++;
		dmg1 += ships1[i].maxHP - Math.max(0,ships1[i].HP);
		dtotal1 += ships1[i].maxHP;
	}
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].HP <= 0) sunk1++;
		dmg1 += ships1C[i].maxHP - Math.max(0,ships1C[i].HP);
		dtotal1 += ships1C[i].maxHP;
	}
	dmg1 /= dtotal1; dmg2 /= dtotal2;
	if (!sunk1) {
		if (sunk2 == ships2.length) rank = 'S';
		else if (ships2.length > 1 && sunk2 >= Math.floor(ships2.length*2/3)) rank = 'A';
		else if (ships2[0].HP <= 0 || dmg2 >= dmg1*2.5) rank = 'B';
		else if (dmg1 > dmg2) rank = 'C';
		else rank = 'D';
	} else {
		if (sunk1 >= Math.floor(ships1.length*2/3)) rank = 'E';
		else if (ships2[0].HP <= 0) {
			if (sunk1 < sunk2) rank = 'B';
			else rank = 'C';
		} else {
			if (dmg1 <= dmg2) rank = 'D';
			else if (sunk2 >= Math.floor(ships2.length*2/3)) {
				if (dmg1 > 2.5*dmg2) rank = 'B';
				else rank = 'C';
			} else {
				if (dmg1 > 3*dmg2) rank = 'B';
				else rank = 'C';
			}
		}
	}
	results.rank = rank;
	
	results.redded = false;
	results.flagredded = (ships1[0].HP/ships1[0].maxHP <= .25);
	results.reddedIndiv = [false,false,false,false,false];
	results.reddedIndivC = [false,false,false,false,false];
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
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].HP/ships1C[i].maxHP <= .25) {
			if (!ships1C[i].isflagship) results.redded = true; //don't count escort flag taiha as retreat
			results.reddedIndivC[i] = true;
			if (!ships1C[i].isflagship) ships1C[i].protection = false;
		}
		if (ships1C[i].HP/ships1C[i].maxHP <= .5) results.undamaged = false;
		if (ships1C[i].HP/ships1C[i].maxHP <= BUCKETPERCENT || getRepairTime(ships1C[i]) > BUCKETTIME) results.buckets++;
	}
	results.MVP = F1.getMVP();
	results.MVPC = F1C.getMVP();
	if (didNB) results.didNB = true;
	
	return results;
}

function simStatsCombined(numsims,type,doNB,NBonly,aironly,forms) {
	console.log(type);
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
			redIndivC: [0,0,0,0,0,0],
			undamaged: 0,
			MVPs: [0,0,0,0,0,0],
			MVPsC: [0,0,0,0,0,0],
			ranks: {S:0,A:0,B:0,C:0,D:0,E:0},
			flagsunk: 0
		});
	}
	
	//var BAPI = {data:{},yasen:{},mvp:[],rating:''};
	C = false;
	var formdef = FLEETS1[0].formation, formdefc = FLEETS1[1].formation;
	for (var i=0; i<numsims; i++) {
		var totalDidNB = 0;
		for (var j=0; j<FLEETS2.length; j++) {
			if (forms[j] != '0') {
				FLEETS1[0].formation = ALLFORMATIONS[type+forms[j]];
				FLEETS1[1].formation = ALLFORMATIONS[type+forms[j]+'E'];
			} else {
				FLEETS1[0].formation = formdef;
				FLEETS1[1].formation = formdefc;
			}
			var res = simCombined(type,FLEETS1[0],FLEETS1[1],FLEETS2[j],FLEETS1S[0],doNB[j],NBonly[j],aironly[j]);//,BAPI);
			totalResult.nodes[j].num++;
			if (res.redded) totalResult.nodes[j].redded++;
			for (var k=0; k<res.reddedIndiv.length; k++) if (res.reddedIndiv[k]) totalResult.nodes[j].redIndiv[k]++;
			for (var k=0; k<res.reddedIndivC.length; k++) if (res.reddedIndivC[k]) totalResult.nodes[j].redIndivC[k]++;
			if (res.undamaged) totalResult.nodes[j].undamaged++;
			if (res.flagsunk) totalResult.nodes[j].flagsunk++;
			totalResult.nodes[j].ranks[res.rank]++;
			totalResult.nodes[j].MVPs[res.MVP]++;
			totalResult.nodes[j].MVPsC[res.MVPC]++;
			if (res.didNB) totalDidNB++;
			if ((res.redded && DORETREAT)||res.flagredded) break;
		}
		// console.log(totalDidNB);
		for (var fl=0; fl<=1; fl++) {
			for (var j=0; j<FLEETS1[fl].ships.length; j++) { //get refuel and repair costs
				var ship = FLEETS1[fl].ships[j];
				var r = getRepairCost(ship);
				totalResult.totalFuelR += r[0];
				totalResult.totalSteelR += r[1];
				if (ship.HP/ship.maxHP <= BUCKETPERCENT || getRepairTime(ship) > BUCKETTIME) totalResult.totalBuckets++;
				totalResult.totalFuelS += Math.floor(ship.fuel * .2 * FLEETS2.length);
				totalResult.totalAmmoS += Math.floor(ship.ammo * (.2*FLEETS2.length + .1*totalDidNB));
				for (var k=0; k<ship.PLANESLOTS.length; k++) totalResult.totalBauxS += 5*(ship.PLANESLOTS[k]-ship.planecount[k]);
			}
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