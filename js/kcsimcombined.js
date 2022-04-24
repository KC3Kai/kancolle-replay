function simCombined(type,F1,F1C,F2,Fsupport,LBASwaves,doNB,NBonly,aironly,bombing,noammo,BAPI,noupdate,friendFleet) {
	var ships1 = F1.ships, ships2 = F2.ships, ships1C = F1C.ships;
	var alive1 = [], alive1C = [], alive2 = [], subsalive1 = [], subsalive1C = [], subsalive2 = [];
	var hasInstall1 = false, hasInstall2 = false, hasInstall1C = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP <= 0) continue;
		if (ships1[i].retreated) continue;
		if(ships1[i].isSub) subsalive1.push(ships1[i]);
		else alive1.push(ships1[i]);
		ships1[i].HPprev = ships1[i].HP;
		if (!MECHANICS.morale) ships1[i].morale = 49;
		if (ships1[i].isInstall) hasInstall1 = true;
	}
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].HP <= 0) continue;
		if (ships1C[i].retreated) continue;
		if(ships1C[i].isSub) subsalive1C.push(ships1C[i]);
		else alive1C.push(ships1C[i]);
		ships1C[i].HPprev = ships1C[i].HP;
		if (!MECHANICS.morale) ships1C[i].morale = 49;
		if (ships1C[i].isInstall) hasInstall1C = true;
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
	
	if (F2.formation.id == 4) {
		F2.formation = SIMCONSTS.echelonOld;
	}
	
	var r = Math.random();
	if (r < .45) ENGAGEMENT = 1;
	else if (r < .6) ENGAGEMENT = 1.2;
	else if (r < .9 || F1.noRedT || F2.noRedT || F1C.noRedT) ENGAGEMENT = .8;
	else ENGAGEMENT = .6;
	
	F1.AS = F2.AS = F1C.AS = 0;
	
	// if (aironly && ships2.length <= 2 && [652,651,650].indexOf(ships2[0].mid) != -1) bombing = true;
	if (bombing) aironly = true;
	
	//code here
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = (NBonly)? BAPI.yasen : BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		apiSetBasic(dataroot,ships1,ships2,ships1C);
	}
	if (C) console.log(API);
	
	var doShell2 = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].enableSecondShelling) doShell2 = true;
	}
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].enableSecondShelling) doShell2 = true;
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
		if (C) BAPI.data.api_injection_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,'isjet');
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2,subsalive2,(C)? BAPI.data.api_injection_kouku:undefined,true);
		if (C) {
			if (!BAPI.data.api_injection_kouku.api_stage1) BAPI.data.api_injection_kouku = null;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].HP <= 0) { alive1C.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
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
		}
		removeSunk(alive2); removeSunk(subsalive2);
	}
	
	//opening airstrike
	if (!NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2);
		F1C.AS = F1.AS;
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2,subsalive2,(C)? BAPI.data.api_kouku:undefined,false,bombing);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_kouku = null;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].HP <= 0) { alive1C.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	//second airphase
	if (!NBonly && aironly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		compareAP(F1,F2);
		if (C) BAPI.data.api_kouku2 = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2,subsalive2,(C)? BAPI.data.api_kouku2:undefined);
		if (C) {
			if (!BAPI.data.api_kouku2.api_stage1) delete BAPI.data.api_kouku2;
			else BAPI.data.api_kouku2.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].HP <= 0) { alive1C.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	//support phase
	if (Fsupport && (!NBonly || (MECHANICS.LBASBuff && Fsupport.supportType != 1)) && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) {
			supportPhase(Fsupport.ships,alive2,subsalive2,Fsupport.supportType,BAPI,Fsupport.supportBoss,Fsupport.supportBoss);
			removeSunk(alive2); removeSunk(subsalive2);
		}
	}
	
	//opening asw
	if (MECHANICS.OASW && !NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		var attackers1 = [], order1 = [], attackers2 = [], order2 = [];
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].canOASW()) attackers1.push(alive1C[i]);
		}
		orderByRange(attackers1,order1,false,true);
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].canOASW()) attackers2.push(alive2[i]);
		}
		orderByRange(attackers2,order2,false,true);
		
		if (order1.length+order2.length) {
			if (C) BAPI.data.api_opening_taisen = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
			shellPhase(order1,order2,alive1C,subsalive1C,alive2,subsalive2,(C)? BAPI.data.api_opening_taisen:undefined,true);
		}
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1C,subsalive1C,alive2,subsalive2,true,(C)? BAPI.data.api_opening_atack : undefined);
	}
	
	//shelling functions
	var shellRange = function(escort1,api_hou) {
		var ships1f = (escort1)? ships1C : ships1;
		var alive1f = (escort1)? alive1C : alive1;
		var subsalive1f = (escort1)? subsalive1C : subsalive1;
		var hasInstall1f = (escort1)? hasInstall1C : hasInstall1;
		if (!NBonly && !aironly && alive1f.length+subsalive1f.length > 0 && alive2.length+subsalive2.length > 0) {
			var order1 = [], order2 = [];
			orderByRange(ships1f,order1,hasInstall2);
			orderByRange(alive2,order2,hasInstall1f);
			
			shellPhase(order1,order2,alive1f,subsalive1f,alive2,subsalive2,(C)? api_hou:undefined);
		}
	}
	
	var shellOrder = function(escort1,api_hou) {
		var ships1f = (escort1)? ships1C : ships1;
		var alive1f = (escort1)? alive1C : alive1;
		var subsalive1f = (escort1)? subsalive1C : subsalive1;
		var hasInstall1f = (escort1)? hasInstall1C : hasInstall1;
		if (!NBonly && !aironly && alive1f.length+subsalive1f.length > 0 && alive2.length+subsalive2.length > 0) {
			var order1 = [], order2 = [];
			for (var i=0; i<ships1f.length; i++) {
				if (!hasInstall2 && ships1f[i].isSub) continue;
				if (ships1f[i].retreated) continue;
				if (ships1f[i].canShell()) order1.push(ships1f[i]);
			}
			for (var i=0; i<ships2.length; i++) {
				if (!hasInstall1f && ships2[i].isSub) continue;
				if (ships2[i].retreated) continue;
				if (ships2[i].canShell()) order2.push(ships2[i]);
			}
			
			shellPhase(order1,order2,alive1f,subsalive1f,alive2,subsalive2,(C)? api_hou:undefined);
		}
	}
	
	//recalculate fLoS before shelling because recon may have been shot down
	F1.clearFleetLoS();
	F1C.clearFleetLoS();
	F2.clearFleetLoS();
	
	
	F1.basepowshell = COMBINEDCONSTS[type].esingle.main.shellDmgF;
	F1.baseaccshell = COMBINEDCONSTS[type].esingle.main.shellAccF;
	F1C.basepowshell = COMBINEDCONSTS[type].esingle.escort.shellDmgF;
	F1C.baseaccshell = COMBINEDCONSTS[type].esingle.escort.shellAccF;
	
	//shelling 1
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki1 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		if (type==2) {
			F2.basepowshell = COMBINEDCONSTS[type].esingle.main.shellDmgE;
			F2.baseaccshell = COMBINEDCONSTS[type].esingle.main.shellAccE;
			shellRange(false,(C)? BAPI.data.api_hougeki1 : undefined);
		} else {
			F2.basepowshell = COMBINEDCONSTS[type].esingle.escort.shellDmgE;
			F2.baseaccshell = COMBINEDCONSTS[type].esingle.escort.shellAccE;
			shellRange(true,(C)? BAPI.data.api_hougeki1 : undefined);
		}
	}
	
	// closing torpedo for CTF/TTF
	if (type!=2 && !NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1C,subsalive1C,alive2,subsalive2,false,(C)? BAPI.data.api_raigeki:undefined);
	}
	
	//shelling 2
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki2 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		F2.basepowshell = COMBINEDCONSTS[type].esingle.main.shellDmgE;
		F2.baseaccshell = COMBINEDCONSTS[type].esingle.main.shellAccE;
		if (type==2) {
			if (doShell2) shellOrder(false,(C)? BAPI.data.api_hougeki2 : undefined);
		} else {
			shellRange(false,(C)? BAPI.data.api_hougeki2 : undefined);
		}
	}
	
	//shelling 3
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki3 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		if (type==2) {
			F2.basepowshell = COMBINEDCONSTS[type].esingle.escort.shellDmgE;
			F2.baseaccshell = COMBINEDCONSTS[type].esingle.escort.shellAccE;
			shellRange(true,(C)? BAPI.data.api_hougeki3 : undefined);
		} else if (doShell2) {
			F2.basepowshell = COMBINEDCONSTS[type].esingle.main.shellDmgE;
			F2.baseaccshell = COMBINEDCONSTS[type].esingle.main.shellAccE;
			shellOrder(false,(C)? BAPI.data.api_hougeki3 : undefined);
		}
	}
	
	// closing torpedo for STF
	if (type==2 && !NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1C,subsalive1C,alive2,subsalive2,false,(C)? BAPI.data.api_raigeki:undefined);
	}
	
	var results = {};
	if (noupdate) {
		results.rankDay = getRank(ships1,ships2,ships1C);
		results.mvpDay = F1.getMVP();
		results.mvpDayC = F1C.getMVP();
		results.repairsDay = {};
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].repairs) results.repairsDay[i] = ships1[i].repairs.slice();
		}
		results.repairsDayC = {};
		for (var i=0; i<ships1C.length; i++) {
			if (ships1C[i].repairs) results.repairsDayC[i] = ships1C[i].repairs.slice();
		}
	}
	
	if (C) {
		apiUpdateFlag(BAPI.data,bombing,type);
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
		nightPhase(order1,order2,alive1C,subsalive1C,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);
	}
	
	//results
	if (!noupdate) {
		// var subonly = true;
		// for (var j=0; j<ships2.length; j++) if (ships2[j].type != 'SS') subonly = false;
		updateSupply(ships1,didNB,NBonly,bombing,noammo);
		updateSupply(ships1C,didNB,NBonly,bombing,noammo);
	}
	
	
	results.rank = (bombing)? getRankRaid(ships1,ships1C) : getRank(ships1,ships2,ships1C);
	
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
	
	//update morale
	if (MECHANICS.morale && !noupdate) {
		updateMorale(ships1,results.rank,((didNB)? 0 : results.MVP),NBonly,didNB);
		updateMorale(ships1C,results.rank,results.MVPC,NBonly,didNB);
	}
	
	return results;
}

function simStatsCombined(numsims,type,foptions) {
	console.log(type);
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
			redIndivC: [0,0,0,0,0,0],
			undamaged: 0,
			MVPs: [0,0,0,0,0,0],
			MVPsC: [0,0,0,0,0,0],
			ranks: {S:0,A:0,B:0,C:0,D:0,E:0},
			flagsunk: 0,
			airStates: [0,0,0,0,0],
			lbasKills: [0,0,0,0,0,0],
			lbasKillsC: [0,0,0,0,0,0],
			lbasWipes: [0,0,0,0,0,0,0,0,0,0,0,0],
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
	var formdef = FLEETS1[0].formation, formdefc = FLEETS1[1].formation;
	for (var i=0; i<numsims; i++) {
		for (var j=0; j<FLEETS2.length; j++) {
			var options = foptions[j];
			for (let n=0; n<2; n++) {
				for (let ship of FLEETS1[n].ships) {
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
			}
			if (options.formation != '0') {
				FLEETS1[0].formation = ALLFORMATIONS[type+options.formation];
				FLEETS1[1].formation = ALLFORMATIONS[type+options.formation+'E'];
			} else {
				FLEETS1[0].formation = formdef;
				FLEETS1[1].formation = formdefc;
			}
			FLEETS1[0].resetBattle(); FLEETS1[1].resetBattle();
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
			if (FLEETS2[j].combinedWith) res = sim12vs12(type,FLEETS1[0],FLEETS1[1],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo,null,false,friendFleet);
			else res = simCombined(type,FLEETS1[0],FLEETS1[1],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo,null,false,friendFleet);
			totalResult.nodes[j].num++;
			if (res.redded) totalResult.nodes[j].redded++;
			for (var k=0; k<res.reddedIndiv.length; k++) if (res.reddedIndiv[k]) totalResult.nodes[j].redIndiv[k]++;
			for (var k=0; k<res.reddedIndivC.length; k++) if (res.reddedIndivC[k]) totalResult.nodes[j].redIndivC[k]++;
			if (res.undamaged) totalResult.nodes[j].undamaged++;
			if (res.flagsunk) totalResult.nodes[j].flagsunk++;
			totalResult.nodes[j].ranks[res.rank]++;
			totalResult.nodes[j].MVPs[res.MVP]++;
			totalResult.nodes[j].MVPsC[res.MVPC]++;
			totalResult.nodes[j].airStates[FLEETS1[0].AS+2]++;
			if (res.lbasKills) {
				for (let k=0; k<6; k++) {
					if (res.lbasKills[k]) totalResult.nodes[j].lbasKills[k]++;
					if (res.lbasKillsC[k]) totalResult.nodes[j].lbasKillsC[k]++;
				}
			}
			if (res.lbasWipes) {
				for (let k=0; k<res.lbasWipes.length; k++) {
					if (res.lbasWipes[k]) totalResult.nodes[j].lbasWipes[k]++;
				}
			}
			//if ((res.redded && DORETREAT)||res.flagredded) break;
			if (!canContinue(FLEETS1[0].ships,FLEETS1[1].ships)) break;
		}
		let flagshipFinal = FLEETS2[FLEETS2.length-1].ships[0];
		totalResult.totalGaugeDamage += flagshipFinal.maxHP - Math.max(0,flagshipFinal.HP);
		for (var fl=0; fl<=1; fl++) {
			for (var j=0; j<FLEETS1[fl].ships.length; j++) { //get refuel and repair costs
				var ship = FLEETS1[fl].ships[j];
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
				if (eq.rank <= 0 && eq.rank != eq.rankInit) totalResult.totalEmptiedLBAS++;
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


//-------------------------------
function sim6vs12(F1,F2,Fsupport,LBASwaves,doNB,NBonly,aironly,bombing,noammo,BAPI,noupdate,friendFleet) {
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
	
	if (F1.formation.id == 4) {
		F1.formation = SIMCONSTS.echelonOld;
	}
	
	var r = Math.random();
	if (r < .45) ENGAGEMENT = 1;
	else if (r < .6) ENGAGEMENT = 1.2;
	else if (r < .9 || F1.noRedT || F2.noRedT || F2C.noRedT) ENGAGEMENT = .8;
	else ENGAGEMENT = .6;
	
	F1.AS = F2.AS = F2C.AS = 0;
	
	if (bombing) aironly = true;
	
	//initial
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = (NBonly)? BAPI.yasen : BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		apiSetBasic(dataroot,ships1,ships2,null,ships2C);
	}
	if (C) console.log(API);
	
	var doShell2 = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].enableSecondShelling) doShell2 = true;
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].enableSecondShelling) doShell2 = true;
	}
	for (var i=0; i<ships2C.length; i++) {
		if (ships2C[i].enableSecondShelling) doShell2 = true;
	}
	
	//jet lbas
	if (LBASwaves && LBASwaves.length && !NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_air_base_injection = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		var uniqueLBs = [];
		for (var i=0; i<LBASwaves.length; i++) {
			if (uniqueLBs.indexOf(LBASwaves[i]) == -1) uniqueLBs.push(LBASwaves[i]);
		}
		var jetLBAS = LandBase.createJetLandBase(uniqueLBs);
		if (jetLBAS.equips.length) {
			compareAP(jetLBAS,F2,'isjet',true);
			LBASPhase(jetLBAS,alive2.concat(alive2C),subsalive2.concat(subsalive2C),true,(C)?BAPI.data.api_air_base_injection:undefined);
			removeSunk(alive2); removeSunk(alive2C);
			removeSunk(subsalive2); removeSunk(subsalive2C);
			if (C) {
				BAPI.data.api_air_base_injection.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[jetLBAS.AS+2];
			}
			F2.AS = F2C.AS = 0;
		} else {
			if (C) delete BAPI.data.api_air_base_injection;
		}
	}
	
	//jet airstrike
	if (!NBonly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_injection_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,'isjet',true);
		airPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_injection_kouku:undefined,true,false,true);
		if (C) {
			if (!BAPI.data.api_injection_kouku.api_stage1) BAPI.data.api_injection_kouku = null;
		}
		
		removeSunk(alive1);
		removeSunk(alive2);
		removeSunk(alive2C);
	}
	
	//lbas
	if (LBASwaves && LBASwaves.length && !NBonly) {
		if (C) BAPI.data.api_air_base_attack = [];
		for (var i=0; i<LBASwaves.length; i++) LBASwaves[i]._currentSlots = LBASwaves[i].planecount.slice();
		for (var i=0; i<LBASwaves.length; i++) {
			if (LBASwaves[i].equips.length <= 0) continue;
			if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
				LBASwaves[i].planecount = LBASwaves[i]._currentSlots.slice();
				compareAP(LBASwaves[i],F2,'isPlane',true);
				var LBAPI = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
				LBASPhase(LBASwaves[i],alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)?LBAPI:undefined);
				removeSunk(alive2); removeSunk(alive2C);
				removeSunk(subsalive2); removeSunk(subsalive2C);
				if (C) {
					LBAPI.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[LBASwaves[i].AS+2];
					BAPI.data.api_air_base_attack.push(LBAPI);
				}
			}
		}
		F2.AS = F2C.AS = 0;
	}
	
	//friend fleet air
	if (!NBonly && friendFleet && friendFleet.air && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) {
			BAPI.data.api_friendly_info = apiGetFriendlyInfo(friendFleet.air.ships);
			BAPI.data.api_friendly_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		}
		compareAP(friendFleet.air,F2);
		F2C.AS = F2.AS;
		F2.airstrikeMod = -10; F2C.airstrikeMod = -20;
		airPhase(friendFleet.air.ships.filter(s => !s.isSub),friendFleet.air.ships.filter(s => s.isSub),alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_friendly_kouku:undefined,false,false,true);
		if (C) {
			if (BAPI.data.api_friendly_kouku.api_stage1) BAPI.data.api_friendly_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[friendFleet.air.AS+2];
			else BAPI.data.api_friendly_kouku = null;
		}
		removeSunk(alive2); removeSunk(subsalive2);
		F2.AS = F2C.AS = 0;
	}
	
	//opening airstrike
	if (!NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,null,true);
		F2C.AS = F2.AS;
		F2.airstrikeMod = -10; F2C.airstrikeMod = -20;
		airPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_kouku:undefined,false,bombing,true);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_kouku = null;
		}
		
		removeSunk(alive1);
		removeSunk(alive2);
		removeSunk(alive2C);
	}
	
	//second airphase
	if (!NBonly && aironly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		compareAP(F1,F2,null,true);
		F2C.AS = F2.AS;
		if (C) BAPI.data.api_kouku2 = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_kouku2:undefined,false,false,true);
		if (C) {
			if (!BAPI.data.api_kouku2.api_stage1) delete BAPI.data.api_kouku2;
			else BAPI.data.api_kouku2.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
		}
		
		removeSunk(alive1);
		removeSunk(alive2);
		removeSunk(alive2C);
	}
	
	//support phase
	if (Fsupport && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) {
			supportPhase(Fsupport.ships,alive2.concat(alive2C),subsalive2.concat(subsalive2C),Fsupport.supportType,BAPI,Fsupport.supportBoss);
			removeSunk(alive2); removeSunk(subsalive2);
			removeSunk(alive2C); removeSunk(subsalive2C);
		}
	}
	
	//opening asw
	if (MECHANICS.OASW && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var attackers1 = [], order1 = [], attackers2 = [], order2 = [];
		for (var i=0; i<alive1.length; i++) {
			if (alive1[i].canOASW()) attackers1.push(alive1[i]);
		}
		orderByRange(attackers1,order1,false,true);
		for (var i=0; i<alive2C.length; i++) {
			if (alive2C[i].canOASW()) attackers2.push(alive2C[i]);
		}
		orderByRange(attackers2,order2,false,true);
		
		if (order1.length+order2.length) {
			if (C) BAPI.data.api_opening_taisen = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
			var targets = {alive1:alive1,subsalive1:subsalive1,alive2:alive2,alive2C:alive2C,subsalive2:subsalive2,subsalive2C:subsalive2C};
			shellPhaseC(order1,order2,targets,(C)? BAPI.data.api_opening_taisen:undefined,true);
		}
		removeSunk(alive1);
		removeSunk(subsalive1);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && (alive2.length+subsalive2.length > 0 || alive2C.length+subsalive2C.length > 0)) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),true,(C)? BAPI.data.api_opening_atack : undefined,true);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}
	
	//recalculate fLoS before shelling because recon may have been shot down
	F1.clearFleetLoS();
	F2.clearFleetLoS();
	F2C.clearFleetLoS();
	
	F1.basepowshell = COMBINEDCONSTS[0].ecombined.main.shellDmgF;
	F1.baseaccshell = COMBINEDCONSTS[0].ecombined.main.shellAccF;
	F2.basepowshell = COMBINEDCONSTS[0].ecombined.main.shellDmgE;
	F2.baseaccshell = COMBINEDCONSTS[0].ecombined.main.shellAccE;
	F2C.basepowshell = COMBINEDCONSTS[0].ecombined.escort.shellDmgE;
	F2C.baseaccshell = COMBINEDCONSTS[0].ecombined.escort.shellAccE;
	
	//shelling 1
	if (C && !NBonly) BAPI.data.api_hougeki1 = null;
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2C.length+subsalive2C.length > 0) {
		var order1 = [], order2 = [];
		orderByRange(ships1,order1,hasInstall2C);
		orderByRange(ships2C,order2,hasInstall1);
		
		if (C) BAPI.data.api_hougeki1 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2C,subsalive2C,(C)? BAPI.data.api_hougeki1:undefined);
	}
	
	//closing torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && (alive2.length+subsalive2.length > 0 || alive2C.length+subsalive2C.length > 0)) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)? BAPI.data.api_raigeki:undefined,true);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}
	
	//shelling 2
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var order1 = [], order2 = [];
		orderByRange(ships1,order1,hasInstall2);
		orderByRange(ships2,order2,hasInstall1);
		
		if (C) BAPI.data.api_hougeki2 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_hougeki2:undefined);
	}
	
	//shelling 3
	if (doShell2 && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && (alive2.length+subsalive2.length > 0 || alive2C.length+subsalive2C.length > 0)) {
		var order1 = [], order2 = [];
		for (var i=0; i<ships1.length; i++) {
			if (!hasInstall2 && !hasInstall2C && ships1[i].isSub) continue;
			if (ships1[i].retreated) continue;
			if (ships1[i].canShell()) order1.push(ships1[i]);
		}
		for (var i=0; i<ships2.length; i++) {
			if (!hasInstall1 && ships2[i].isSub) continue;
			if (ships2[i].retreated) continue;
			if (ships2[i].canShell()) order2.push(ships2[i]);
		}
		
		if (C) BAPI.data.api_hougeki3 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		var targets = {alive1:alive1,subsalive1:subsalive1,alive2:alive2,alive2C:alive2C,subsalive2:subsalive2,subsalive2C:subsalive2C};
		shellPhaseC(order1,order2,targets,(C)? BAPI.data.api_hougeki3:undefined);
	
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}
	
	var results = {};
	if (noupdate) {
		results.rankDay = getRank(ships1,ships2.concat(ships2C));
		results.mvpDay = F1.getMVP();
		results.repairsDay = {};
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].repairs) results.repairsDay[i] = ships1[i].repairs.slice();
		}
	}
	
	if (C) {
		apiUpdateFlag(BAPI.data,bombing,null,true);
		if (!NBonly) BAPI.data.api_midnight_flag = +!!(!bombing && alive2.length + subsalive2.length + alive2C.length + subsalive2C.length);
	}
	
	//friend fleet
	if ((doNB||NBonly) && friendFleet && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		let ff = friendFleet.id != null ? friendFleet : friendFleet.night;
		if (ff) {
			friendFleetPhase(ff,F2,alive2.concat(alive2C),subsalive2.concat(subsalive2C),BAPI);
			removeSunk(alive2); removeSunk(subsalive2);
			removeSunk(alive2C); removeSunk(subsalive2C);
		}
	}
	
	//night battle
	var didNB = false;
	if ((doNB||NBonly) && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		didNB = !NBonly;
		var count = 0, allsunk = true;
		for (var i=0; i<ships2.length; i++) if (ships2[i].HP > 0) { allsunk = false; break; }
		for (var i=0; i<ships2C.length; i++) {
			let point = 0;
			if (ships2C[i].HP/ships2C[i].maxHP > .5) point = 1;
			else if (ships2C[i].HP/ships2C[i].maxHP > .25) point = .5;
			else if (ships2C[i].HP/ships2C[i].maxHP > 0) point = .25;
			count += point;
		}
		if (ships2C[0].HP > 0) count += 1;
		var fightescort = (allsunk || count >= 3);
		
		var order1 = [], order2 = [];
		for (var i=0; i<ships1.length; i++) {
			order1.push(ships1[i]);
		}
		if (fightescort) {
			for (var i=0; i<ships2C.length; i++) {
				order2.push(ships2C[i]);
			}
		} else {
			for (var i=0; i<ships2.length; i++) {
				order2.push(ships2[i]);
			}
		}	
		
		if (C) {
			if (!BAPI.yasen) BAPI.yasen = {};
			BAPI.yasen.api_hougeki = {api_at_list:[-1],api_damage:[-1],api_df_list:[-1],api_sp_list:[-1],api_cl_list:[-1],api_n_mother_list:[-1]};
			if (NEWFORMAT) {
				formatRemovePadding(BAPI.yasen.api_hougeki);
				BAPI.yasen.api_hougeki.api_at_eflag = [];
			}
			BAPI.yasen.api_flare_pos = [-1,-1];
			BAPI.yasen.api_touch_plane = [-1,-1];
			let n = (fightescort)? 2 : 1;
			BAPI.yasen.api_active_deck = [1,n];
			if (!NBonly) BAPI.yasen.api_ship_ke_combined = [];
		}
		if (fightescort) nightPhase(order1,order2,alive1,subsalive1,alive2C,subsalive2C,NBonly,(C)? BAPI.yasen:undefined);
		else nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);
	}
	
	//results
	if (!noupdate) {
		updateSupply(ships1,didNB,NBonly,bombing,noammo,true);
	}
	
	
	results.rank = (bombing)? getRankRaid(ships1) : getRank(ships1,ships2.concat(ships2C));
	
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
	results.MVP = F1.getMVP();
	if (didNB) results.didNB = true;
	
	//update morale
	if (MECHANICS.morale && !noupdate) {
		updateMorale(ships1,results.rank,results.MVP,NBonly,didNB);
	}
	
	return results;
}

//------------------
function sim12vs12(type,F1,F1C,F2,Fsupport,LBASwaves,doNB,NBonly,aironly,bombing,noammo,BAPI,noupdate,friendFleet) {
	var F2C = F2.combinedWith;
	var ships1 = F1.ships, ships2 = F2.ships, ships1C = F1C.ships, ships2C = F2C.ships;
	var alive1 = [], alive1C = [], alive2 = [], alive2C = [], subsalive1 = [], subsalive1C = [], subsalive2 = [], subsalive2C = [];
	var hasInstall1 = false, hasInstall2 = false, hasInstall1C = false, hasInstall2C = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP <= 0) continue;
		if (ships1[i].retreated) continue;
		if(ships1[i].isSub) subsalive1.push(ships1[i]);
		else alive1.push(ships1[i]);
		ships1[i].HPprev = ships1[i].HP;
		if (!MECHANICS.morale) ships1[i].morale = 49;
		if (ships1[i].isInstall) hasInstall1 = true;
	}
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].HP <= 0) continue;
		if (ships1C[i].retreated) continue;
		if(ships1C[i].isSub) subsalive1C.push(ships1C[i]);
		else alive1C.push(ships1C[i]);
		ships1C[i].HPprev = ships1C[i].HP;
		if (!MECHANICS.morale) ships1C[i].morale = 49;
		if (ships1C[i].isInstall) hasInstall1C = true;
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
	else if (r < .9 || F1.noRedT || F2.noRedT || F1C.noRedT || F2C.noRedT) ENGAGEMENT = .8;
	else ENGAGEMENT = .6;
	
	F1.AS = F2.AS = F1C.AS = F2C.AS = 0;
	
	if (bombing) aironly = true;
	
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = (NBonly)? BAPI.yasen : BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		apiSetBasic(dataroot,ships1,ships2,ships1C,ships2C);
	}
	if (C) console.log(API);
	
	var doShell2 = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].enableSecondShelling) doShell2 = true;
	}
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].enableSecondShelling) doShell2 = true;
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].enableSecondShelling) doShell2 = true;
	}
	for (var i=0; i<ships2C.length; i++) {
		if (ships2C[i].enableSecondShelling) doShell2 = true;
	}
	
	//jet lbas
	if (LBASwaves && LBASwaves.length && !NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_air_base_injection = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		var uniqueLBs = [];
		for (var i=0; i<LBASwaves.length; i++) {
			if (uniqueLBs.indexOf(LBASwaves[i]) == -1) uniqueLBs.push(LBASwaves[i]);
		}
		var jetLBAS = LandBase.createJetLandBase(uniqueLBs);
		if (jetLBAS.equips.length) {
			compareAP(jetLBAS,F2,'isjet',true);
			LBASPhase(jetLBAS,alive2.concat(alive2C),subsalive2.concat(subsalive2C),true,(C)?BAPI.data.api_air_base_injection:undefined);
			removeSunk(alive2); removeSunk(alive2C);
			removeSunk(subsalive2); removeSunk(subsalive2C);
			if (C) {
				BAPI.data.api_air_base_injection.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[jetLBAS.AS+2];
			}
			F2.AS = F2C.AS = 0;
		} else {
			if (C) delete BAPI.data.api_air_base_injection;
		}
	}
	
	//jet airstrike
	if (!NBonly && !bombing && alive1.length+subsalive1.length+alive2C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_injection_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,'isjet',true);
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_injection_kouku:undefined,true,false,true);
		if (C) {
			if (!BAPI.data.api_injection_kouku.api_stage1) BAPI.data.api_injection_kouku = null;
		}
		
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(alive2); removeSunk(alive2C);
	}
	
	//lbas
	if (LBASwaves && LBASwaves.length && !NBonly) {
		if (C) BAPI.data.api_air_base_attack = [];
		for (var i=0; i<LBASwaves.length; i++) LBASwaves[i]._currentSlots = LBASwaves[i].planecount.slice();
		for (var i=0; i<LBASwaves.length; i++) {
			if (LBASwaves[i].equips.length <= 0) continue;
			if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
				LBASwaves[i].planecount = LBASwaves[i]._currentSlots.slice();
				compareAP(LBASwaves[i],F2,'isPlane',true);
				var LBAPI = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
				LBASPhase(LBASwaves[i],alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)?LBAPI:undefined);
				removeSunk(alive2); removeSunk(alive2C);
				removeSunk(subsalive2); removeSunk(subsalive2C);
				if (C) {
					LBAPI.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[LBASwaves[i].AS+2];
					BAPI.data.api_air_base_attack.push(LBAPI);
				}
			}
		}
		F2.AS = F2C.AS = 0;
	}
	
	//friend fleet air
	if (!NBonly && friendFleet && friendFleet.air && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) {
			BAPI.data.api_friendly_info = apiGetFriendlyInfo(friendFleet.air.ships);
			BAPI.data.api_friendly_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		}
		compareAP(friendFleet.air,F2);
		F2C.AS = F2.AS;
		F2.airstrikeMod = -10; F2C.airstrikeMod = -20;
		airPhase(friendFleet.air.ships.filter(s => !s.isSub),friendFleet.air.ships.filter(s => s.isSub),alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_friendly_kouku:undefined,false,false,true);
		if (C) {
			if (BAPI.data.api_friendly_kouku.api_stage1) BAPI.data.api_friendly_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[friendFleet.air.AS+2];
			else BAPI.data.api_friendly_kouku = null;
		}
		removeSunk(alive2); removeSunk(subsalive2);
		F2.AS = F2C.AS = 0;
	}
	
	//opening airstrike
	if (!NBonly && alive1.length+subsalive1.length+alive2C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,null,true);
		F1C.AS = F1.AS;
		F2C.AS = F2.AS;
		F2.airstrikeMod = -10; F2C.airstrikeMod = -20;
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(alive2C),(C)? BAPI.data.api_kouku:undefined,false,bombing,true);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_kouku = null;
		}
		
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(alive2); removeSunk(alive2C);
	}
	
	//second airphase
	if (!NBonly && aironly && !bombing && alive1.length+subsalive1.length+alive2C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		compareAP(F1,F2,null,true);
		if (C) BAPI.data.api_kouku2 = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_kouku2:undefined,false,false,true);
		if (C) {
			if (!BAPI.data.api_kouku2.api_stage1) delete BAPI.data.api_kouku2;
			else BAPI.data.api_kouku2.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
		}
		
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(alive2); removeSunk(alive2C);
	}
	
	//support phase
	if (Fsupport && !NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) supportPhase(Fsupport.ships,alive2.concat(alive2C),subsalive2.concat(subsalive2C),Fsupport.supportType,BAPI);
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	//opening asw
	if (MECHANICS.OASW && !NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var attackers1 = [], order1 = [], attackers2 = [], order2 = [];
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].canOASW()) attackers1.push(alive1C[i]);
		}
		orderByRange(attackers1,order1,false,true);
		for (var i=0; i<alive2C.length; i++) {
			if (alive2C[i].canOASW()) attackers2.push(alive2C[i]);
		}
		orderByRange(attackers2,order2,false,true);
		
		if (order1.length+order2.length) {
			if (C) BAPI.data.api_opening_taisen = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
			var targets = {alive1:alive1,alive1C:alive1C,subsalive1:subsalive1,subsalive1C:subsalive1C,alive2:alive2,alive2C:alive2C,subsalive2:subsalive2,subsalive2C:subsalive2C};
			shellPhaseC(order1,order2,targets,(C)? BAPI.data.api_opening_taisen:undefined,true);
		}
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),true,(C)? BAPI.data.api_opening_atack : undefined,true);
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	//shelling functions
	var shellRange = function(d1,d2,api_hou) {
		if (!NBonly && !aironly && d1.alive1f.length+d1.subsalive1f.length > 0 && d2.alive2f.length+d2.subsalive2f.length > 0) {
			var order1 = [], order2 = [];
			orderByRange(d1.ships1f,order1,d2.hasInstall2f);
			orderByRange(d2.alive2f,order2,d1.hasInstall1f);
			
			shellPhase(order1,order2,d1.alive1f,d1.subsalive1f,d2.alive2f,d2.subsalive2f,(C)? api_hou:undefined);
		}
	}
	
	var shellOrder = function(d1,d2,api_hou) {
		var d1length = d1.alive1f.length+d1.subsalive1f.length;
		if (d1.alive1fC) d1length += d1.alive1fC.length + d1.subsalive1fC.length;
		var d2length = d2.alive2f.length+d2.subsalive2f.length;
		if (d2.alive2fC) d2length += d2.alive2fC.length + d2.subsalive2fC.length;
		if (!NBonly && !aironly && d1length > 0 && d2length > 0) {
			var order1 = [], order2 = [];
			for (var i=0; i<d1.ships1f.length; i++) {
				if (!d2.hasInstall2f && d1.ships1f[i].isSub) continue;
				if (d1.ships1f[i].retreated) continue;
				if (d1.ships1f[i].canShell()) order1.push(d1.ships1f[i]);
			}
			for (var i=0; i<d2.ships2f.length; i++) {
				if (!d1.hasInstall1f && d2.ships2f[i].isSub) continue;
				if (d2.ships2f[i].retreated) continue;
				if (d2.ships2f[i].canShell()) order2.push(d2.ships2f[i]);
			}
			
			if (d1.alive1fC) {
				var targets = {alive1:d1.alive1f,alive1C:d1.alive1fC,subsalive1:d1.subsalive1f,subsalive1C:d1.subsalive1fC,alive2:d2.alive2f,alive2C:d2.alive2fC,subsalive2:d2.subsalive2f,subsalive2C:d2.subsalive2fC};
				shellPhaseC(order1,order2,targets,(C)? api_hou:undefined);
			} else {
				shellPhase(order1,order2,d1.alive1f,d1.subsalive1f,d2.alive2f,d2.subsalive2f,(C)? api_hou:undefined);
			}
		}
	}
	
	//recalculate fLoS before shelling because recon may have been shot down
	F1.clearFleetLoS();
	F1C.clearFleetLoS();
	F2.clearFleetLoS();
	F2C.clearFleetLoS();
	
	F1.basepowshell = COMBINEDCONSTS[type].ecombined.main.shellDmgF;
	F1.baseaccshell = COMBINEDCONSTS[type].ecombined.main.shellAccF;
	F1C.basepowshell = COMBINEDCONSTS[type].ecombined.escort.shellDmgF;
	F1C.baseaccshell = COMBINEDCONSTS[type].ecombined.escort.shellAccF;
	
	F2.basepowshell = COMBINEDCONSTS[type].ecombined.main.shellDmgE;
	F2.baseaccshell = COMBINEDCONSTS[type].ecombined.main.shellAccE;
	F2C.basepowshell = COMBINEDCONSTS[type].ecombined.escort.shellDmgE;
	F2C.baseaccshell = COMBINEDCONSTS[type].ecombined.escort.shellAccE;
	
	//shelling 1
	var d1M = {ships1f: ships1, alive1f: alive1, subsalive1f: subsalive1, hasInstall1f: hasInstall1};
	var d1E = {ships1f: ships1C, alive1f: alive1C, subsalive1f: subsalive1C, hasInstall1f: hasInstall1C};
	var d2M = {ships2f: ships2, alive2f: alive2, subsalive2f: subsalive2, hasInstall2f: hasInstall2};
	var d2E = {ships2f: ships2C, alive2f: alive2C, subsalive2f: subsalive2C, hasInstall2f: hasInstall2C};
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki1 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		if (type==2) {
			shellRange(d1M, d2M, (C)? BAPI.data.api_hougeki1 : undefined);
		} else {
			shellRange(d1M, d2M, (C)? BAPI.data.api_hougeki1 : undefined);
		}
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	//shelling 2
	var d1A = {ships1f: ships1, alive1f: alive1, subsalive1f: subsalive1, alive1fC: alive1C, subsalive1fC: subsalive1C, hasInstall1f: hasInstall1||hasInstall1C};
	var d2A = {ships2f: ships2, alive2f: alive2, subsalive2f: subsalive2, alive2fC: alive2C, subsalive2fC: subsalive2C, hasInstall2f: hasInstall2||hasInstall2C};
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki2 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		if (type==2) {
			if (doShell2) shellOrder(d1A, d2A, (C)? BAPI.data.api_hougeki2 : undefined);
		} else {
			shellRange(d1E, d2E, (C)? BAPI.data.api_hougeki2 : undefined);
		}
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	// closing torpedo for CTF/TTF
	if (type!=2 && !NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)? BAPI.data.api_raigeki:undefined,true);
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	//shelling 3
	var d1A = {ships1f: ships1, alive1f: alive1, subsalive1f: subsalive1, alive1fC: alive1C, subsalive1fC: subsalive1C, hasInstall1f: hasInstall1||hasInstall1C};
	var d2A = {ships2f: ships2, alive2f: alive2, subsalive2f: subsalive2, alive2fC: alive2C, subsalive2fC: subsalive2C, hasInstall2f: hasInstall2||hasInstall2C};
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki3 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		if (type==2) {
			shellRange(d1E, d2E, (C)? BAPI.data.api_hougeki3 : undefined);
		} else if (doShell2) {
			shellOrder(d1A, d2A, (C)? BAPI.data.api_hougeki3 : undefined);
		}
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	// closing torpedo for STF
	if (type==2 && !NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)? BAPI.data.api_raigeki:undefined,true);
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	var results = {};
	if (noupdate) {
		results.rankDay = getRank(ships1,ships2.concat(ships2C),ships1C);
		results.mvpDay = F1.getMVP();
		results.mvpDayC = F1C.getMVP();
		results.repairsDay = {};
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].repairs) results.repairsDay[i] = ships1[i].repairs.slice();
		}
		results.repairsDayC = {};
		for (var i=0; i<ships1C.length; i++) {
			if (ships1C[i].repairs) results.repairsDayC[i] = ships1C[i].repairs.slice();
		}
	}
	
	if (C) {
		apiUpdateFlag(BAPI.data,bombing,type,true);
		if (!NBonly) BAPI.data.api_midnight_flag = +!!(!bombing && alive2.length + subsalive2.length + alive2C.length + subsalive2C.length);
	}
	
	//friend fleet
	if ((doNB||NBonly) && friendFleet && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		let ff = friendFleet.id != null ? friendFleet : friendFleet.night;
		if (ff) {
			friendFleetPhase(ff,F2,alive2.concat(alive2C),subsalive2.concat(subsalive2C),BAPI);
			removeSunk(alive2); removeSunk(subsalive2);
			removeSunk(alive2C); removeSunk(subsalive2C);
		}
	}
	
	//night battle
	var didNB = false;
	if ((doNB||NBonly) && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		didNB = !NBonly;
		var count = 0, allsunk = true;
		for (var i=0; i<ships2.length; i++) if (ships2[i].HP > 0) { allsunk = false; break; }
		for (var i=0; i<ships2C.length; i++) {
			let point = 0;
			if (ships2C[i].HP/ships2C[i].maxHP > .5) point = 1;
			else if (ships2C[i].HP/ships2C[i].maxHP > .25) point = .5;
			else if (ships2C[i].HP/ships2C[i].maxHP > 0) point = .25;
			count += point;
		}
		if (ships2C[0].HP > 0) count += 1;
		var fightescort = (allsunk || count >= 3);
		
		var order1 = [], order2 = [];
		for (var i=0; i<ships1C.length; i++) {
			order1.push(ships1C[i]);
		}
		if (fightescort) {
			for (var i=0; i<ships2C.length; i++) {
				order2.push(ships2C[i]);
			}
		} else {
			for (var i=0; i<ships2.length; i++) {
				order2.push(ships2[i]);
			}
		}	
		
		if (C) {
			if (!BAPI.yasen) BAPI.yasen = {};
			BAPI.yasen.api_hougeki = {api_at_list:[-1],api_damage:[-1],api_df_list:[-1],api_sp_list:[-1],api_cl_list:[-1],api_n_mother_list:[-1]};
			if (NEWFORMAT) {
				formatRemovePadding(BAPI.yasen.api_hougeki);
				BAPI.yasen.api_hougeki.api_at_eflag = [];
			}
			BAPI.yasen.api_flare_pos = [-1,-1];
			BAPI.yasen.api_touch_plane = [-1,-1];
			let n = (fightescort)? 2 : 1;
			BAPI.yasen.api_active_deck = [1,n];
			if (!NBonly) BAPI.yasen.api_ship_ke_combined = [];
		}
		if (fightescort) nightPhase(order1,order2,alive1C,subsalive1C,alive2C,subsalive2C,NBonly,(C)? BAPI.yasen:undefined);
		else nightPhase(order1,order2,alive1C,subsalive1C,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);
	}
	
	//results
	if (!noupdate) {
		// var subonly = true;
		// for (var j=0; j<ships2.length; j++) if (ships2[j].type != 'SS') subonly = false;
		updateSupply(ships1,didNB,NBonly,bombing,noammo,true);
		updateSupply(ships1C,didNB,NBonly,bombing,noammo,true);
	}
	
	
	results.rank = (bombing)? getRankRaid(ships1,ships1C) : getRank(ships1,ships2.concat(ships2C),ships1C);
	
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
	
	//update morale
	if (MECHANICS.morale && !noupdate) {
		updateMorale(ships1,results.rank,((didNB)? 0 : results.MVP),NBonly,didNB);
		updateMorale(ships1C,results.rank,results.MVPC,NBonly,didNB);
	}
	
	return results;
}