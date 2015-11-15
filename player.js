// var sim = function() {

var renderer = PIXI.autoDetectRenderer(800, 480,{backgroundColor : 0x000000});
document.getElementById('battlespace').appendChild(renderer.view);
// console.log(renderer);

// create the root of the scene graph
var stage = new PIXI.Container();
var SPRITEPOOL = {};
function recycle(graphic) {
	if (!SPRITEPOOL[graphic.name]) SPRITEPOOL[graphic.name] = [];
	SPRITEPOOL[graphic.name].push(graphic);
	if (graphic.parent) graphic.parent.removeChild(graphic);
}
//name = key for pool, path = optional path for image if want to make new sprite when not in pool
function getFromPool(name,path) {
	if (SPRITEPOOL[name] && SPRITEPOOL[name].length) return SPRITEPOOL[name].pop();
	if (!path) return null;
	var newsprite = PIXI.Sprite.fromImage(path);
	newsprite.name = name;
	return newsprite;
}

var loader = PIXI.loader;
loader.add('BG1','assets/82_res.images.ImgBackgroundDay.jpg')
	.add('BG2','assets/83_res.images.ImgBackgroundNight.jpg')
	.add('shutter1','assets/513_res.common.ImgShutterTopDark.png')
	.add('shutter2','assets/511_res.common.ImgShutterBottomDark.png')
	.add('radar','assets/375_res.battle.images.ImgRaderBG.png')
	.add('nmiss','assets/Nmiss.png')
	.add('ccrit','assets/Ccrit.png')
	.add('dminor','assets/d383.png')
	.add('dmedium','assets/d385.png')
	.add('dmajor','assets/d387.png')
	.add('938','assets/938.png')
	.add('914','assets/914.png')
	.add('916','assets/916.png')
	.add('918','assets/918.png')
	.add('920','assets/920.png')
	.add('922','assets/922.png')
	.add('924','assets/924.png')
	.add('926','assets/926.png')
	.add('440','assets/440.png')
	.add('445','assets/445.png')
	.add('447','assets/447.png')
	.add('449','assets/449.png')
	.add('433','assets/433.png')
	.add('488','assets/488.png')
	.add('493','assets/493.png')
	.add('498','assets/498.png')
	.add('465','assets/465.png')
	.add('467','assets/467.png')
	.add('469','assets/469.png')
	.add('471','assets/471.png')
	.add('473','assets/473.png')
	.add('216','assets/216.png')
	.add('aaci1','assets/aaci1.png')
	.add('aaci2','assets/aaci2.png')
	.add('mask','assets/mask.png');
for (var i=389; i <= 417; i+=2) loader.add(i.toString(),'assets/'+i+'.png');
for (var i=0; i<=9; i++) loader.add('C'+i,'assets/C'+i+'.png');
for (var i=0; i<=9; i++) loader.add('N'+i,'assets/N'+i+'.png');
var ALLLOADED = false;
loader.load(function() { ALLLOADED = true; });

// create a new Sprite using the texture
var bg = PIXI.Sprite.fromImage('assets/82_res.images.ImgBackgroundDay.jpg');
var bg2 = PIXI.Sprite.fromImage('assets/83_res.images.ImgBackgroundNight.jpg');

// stage.addChild(bunny);
stage.addChild(bg);

var frames_exp = [];
for (var i=389; i <= 417; i+=2) frames_exp.push(PIXI.Texture.fromImage('assets/'+i+'.png'));

var COMBINED = false;

var FLEET2ORIGIN = 631;

function ShipG(id,side,hpmax) {
	this.id = id;
	this.side = side;
	this.hp = this.hpmax = hpmax;
	this.graphic = null;
	this.status = 4;
	if (side==0) this.xorigin = 0;
	else this.xorigin = 631;
	this.planetypes = [];
}

// var code = '0.8,1,1~AkatsukiKai2,31|YuudachiKai2,31|AyanamiKai2,32|HatsushimoKai2,31|OoyodoKai,47|HaguroKai2,57~Nenohi,30|FusouKai,75|IseKai,77|HatsushimoKai2,31|WakabaKai,30|HatsuharuKai,30~T:~S:4,15,1,0|11,4,2,5,3|5,15,1,0|12,3,1,0|1,15,1,13|15,4,1,5|3,10,1,0|14,4,1,4|2,14,1,0|10,5,1,0|0,14,1,4|13,3,1,3~S:0,10,1,21|10,4,1,1|1,13,1,25|11,2,1,21|2,11,1,5|12,5,2,4,4|3,13,1,2|13,5,1,5|4,11,1,0|14,5,1,5|5,11,1,18|15,4,1,0~T:0,13,2|1,15,10|3,14,16|4,15,0|5,13,1|14,0,0|15,0,0~N:0,15,2,0,0|10,2,2,0,1|1,12,2,6,6|11,3,1,0|2,11,2,29,2|12,1,1,0|3,10,2,6,0|4,12,2,8,3|14,4,1,0|5,15,2,4,0~'
var fleet1 = [], fleet2 = [];
var allfleets2 = [];
var GEngage = 0, GAP1 = 0, GAP2 = 0;


var radar1 = PIXI.Sprite.fromImage('assets/375_res.battle.images.ImgRaderBG.png');
radar1.position.set(75,402);
radar1.anchor.set(.5);
radar1.scale.set(0);
stage.addChild(radar1);

var radar2 = PIXI.Sprite.fromImage('assets/375_res.battle.images.ImgRaderBG.png');
radar2.position.set(725,78);
radar2.anchor.set(.5);
radar2.scale.set(0);
stage.addChild(radar2);

var dots1 = new PIXI.Container();
dots1.alpha = 0;
dots1.position.set(radar1.x,radar1.y);
stage.addChild(dots1);
var dots2 = new PIXI.Container();
dots2.alpha = 0;
dots2.position.set(radar2.x,radar2.y);
stage.addChild(dots2);

function createDots(container,form,num,side) {
	var name, path;
	if (side) { name = 'dotRed'; path = 'assets/467.png'; } //change path
	else { name = 'dotGreen'; path = 'assets/465.png'; }
	form = parseInt(form);
	switch(form) {
		case 0:
		case 1:
			var space = 15;
			for (var i=-space*(num-1)/2; i<=space*(num-1)/2; i+=space) {
				var dot = getFromPool(name,path);
				dot.x = i; dot.y = 0;
				dot.anchor.set(.5);
				dot.scale.set(.67);
				container.addChild(dot);
			}
			break;
		case 2:
			var c = 0;
			for (var i=-16; i<=16; i+=16) {
				for (var j=-8; j<=8; j+=16) {
					if (++c > num) break;
					var dot = getFromPool(name,path);
					dot.position.set(i,j);
					dot.anchor.set(.5);
					dot.scale.set(.67);
					container.addChild(dot);
				}
			}
			break;
		case 3:
			var coords;
			if (num >= 6) coords = [[23,0],[-23,0],[0,21],[0,-21],[-8,0],[8,0]];
			else coords = [[16,0],[-16,0],[0,16],[0,-16],[0,0]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(name,path);
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				dot.scale.set(.67);
				container.addChild(dot);
			}
			break;
		case 4:
			var space = 10;
			for (var i=-space*(num-1)/2; i<=space*(num-1)/2; i+=space) {
				var dot = getFromPool(name,path);
				dot.position.set(i);
				dot.anchor.set(.5);
				dot.scale.set(.67);
				container.addChild(dot);
			}
			break;
		case 5:
			var space = 15;
			for (var i=-space*(num-1)/2; i<=space*(num-1)/2; i+=space) {
				var dot = getFromPool(name,path);
				dot.y = i; dot.x = 0;
				dot.anchor.set(.5);
				dot.scale.set(.67);
				container.addChild(dot);
			}
			break;
		case 11:
			var coords = [[5,0],[10,30],[10,-30],[20,15],[20,-15],[30,0]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool('dotGreenC','assets/473.png');
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			coords = [[-10,23],[-10,7],[-10,-7],[-10,-23],[-24,7],[-24,-7]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool((COMBINED==2)?'dotYellow':'dotBlue',(COMBINED==2)?'assets/469.png':'assets/471.png');
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			break;
		case 12:
			break;
		case 13:
			var coords = [[32,0],[-32,0],[14,30],[14,-30],[-14,30],[-14,-30]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool('dotGreenC','assets/473.png');
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			coords = [[0,7],[0,-7],[-14,7],[-14,-7],[14,7],[14,-7]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool((COMBINED==2)?'dotYellow':'dotBlue',(COMBINED==2)?'assets/469.png':'assets/471.png');
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			break;
		case 14:
			var coords = [[12,7],[12,-7],[24,17],[24,0],[24,-17],[36,0]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool('dotGreenC','assets/473.png');
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			coords = [[0,0],[-12,0],[-24,7],[-24,-7],[-36,7],[-36,-7]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool((COMBINED==2)?'dotYellow':'dotBlue',(COMBINED==2)?'assets/469.png':'assets/471.png');
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			break;
	}
}

var shutterTop = PIXI.Sprite.fromImage('assets/513_res.common.ImgShutterTopDark.png');
var shutterBottom = PIXI.Sprite.fromImage('assets/511_res.common.ImgShutterBottomDark.png');


var eventqueue = [];
var battlestarts = [];
var HPtotal1 = 0, HPtotal2 = 0, HPnow1 = 0, HPnow2 = 0;

function createShip(data,side,i) {
	var ship = new ShipG(i+(side==1)?10:0,side,parseInt(data[1]));
	var graphic = new PIXI.Container();
	var sdata = SHIPDATA[parseInt(data[0])];
	var portrait = PIXI.Sprite.fromImage('assets/icons/'+sdata.image);
	portrait.position.set((side==1)?11:-3,2);
	var hpbar = new PIXI.Graphics();
	hpbar.beginFill(0x00ff00);
	hpbar.drawRect((side==1)?3:161,3,5,38);
	hptxt = new PIXI.Text(data[1]+'/'+data[1],{font:'13px "Arno Pro Semibold"',fill:'#ffffff'});
	hptxt.position.set((side==1)?-7-hptxt.width:177,12);
	var hpbarback = PIXI.Sprite.fromImage('assets/433.png');
	hpbarback.position.set((side==1)?2:160,2);
	graphic.addChild(hpbarback);
	graphic.addChild(hpbar);
	graphic.addChild(portrait);
	if (i==0) {
		var box = PIXI.Sprite.fromImage('assets/'+((side==1)?'449':'445')+'.png');
		box.y -= 5;
		graphic.addChild(box);
	} else graphic.addChild(PIXI.Sprite.fromImage('assets/'+((side==1)?'447':'440')+'.png'));
	graphic.addChild(hptxt);
	graphic.position.set((side==1)?FLEET2ORIGIN+220:-220,((side==1)?144:77)+45*i);
	ship.graphic = graphic;
	// var mask = PIXI.Sprite.fromImage('assets/mask.png');
	// graphic.addChild(mask);
	// mask.blendMode = PIXI.blendModes.ADD;

	if (data.length > 2) shipSetHP(ship,data[2]);
	var hasonlytorp;
	for (var j=3; j<=6; j++) {
		var eq = EQDATA[data[j]];
		if (eq) {
			if (eq.b_image) ship.planetypes.push(eq.b_image);
			else if (eq.isfighter||eq.istorpbomber||eq.isdivebomber) ship.planetypes.push(1);
			if (hasonlytorp == undefined && eq.type == TORPEDO) hasonlytorp = true;
			if ([MAINGUNS,MAINGUNM,MAINGUNL].indexOf(eq.type) != -1) hasonlytorp = false;
			if (eq.type == WG42) ship.hasWG = true;
			if (eq.atype && eq.atype != A_GUN) ship.hasAAgear = true;
		}
	}
	ship.hasbomber = (ship.planetypes.length > 0);
	ship.issub = (sdata.type == 'SS' || sdata.type == 'SSV');
	ship.isinstall = (sdata.type == 'Installation');
	ship.isCV = (sdata.type == 'CV' || sdata.type == 'CVL' || sdata.type == 'CVN' || sdata.type == 'CVB' || (sdata.type=='AO'&&ship.hasbomber));
	//ship.hasWG = 
	return ship;
}

function processAPI(root) {
	var data = root.battles[0].data; //get first battle for initial hp values
	if (Object.keys(data).length <= 0) {  //night only nodes
		data = root.battles[0].yasen;
		stage.removeChild(bg);
		stage.addChildAt(bg2,0);
	}
	console.log(root);
	COMBINED = root.combined;
	var HPstate = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	var HPbeginstate = null, battlenumstate = 0;
	var getState = function(newbattle) {
		if (newbattle) {
			HPbeginstate = HPstate.slice();
			battlenumstate++;
		}
		var state = {
			HP:HPbeginstate,
			bg:(bg.parent)? 1 : 2,
			battle:battlenumstate
			};
		HPbeginstate = HPstate.slice();
		return state;
	};
	battlestarts = [];
	//create skip buttons
	var bspace = $('#skipbuttonspace');
	if (bspace) {
		bspace.html('');
		for (var i=0; i<root.battles.length; i++) {
			bspace.append('<input type="button" value="'+(i+1)+'" onclick="skipToBattle(this.value)"/>');
		}
	}
	
	//load friendly ships
	var fleet = 'fleet'+root.fleetnum;
	var fships = [], fequips = [], fshipsC = [], fequipsC = [];
	for (var i=0; i<root[fleet].length; i++) {
		if(!root[fleet][i] || root[fleet][i] == -1) continue;
		fships.push(root[fleet][i].mst_id);
		fequips.push(root[fleet][i].equip);
	}
	if (root.combined) {
		for (var i=0; i<root.fleet2.length; i++) {
			if(!root.fleet2[i] || root.fleet2[i] == -1) continue;
			fshipsC.push(root.fleet2[i].mst_id);
			fequipsC.push(root.fleet2[i].equip);
		}
	}
	fleet1 = []; fleet2 = []; fleet1C = [];
	HPtotal1 = 0; HPtotal2 = 0;
	if (root.combined) {
		for (var i=0; i<fshipsC.length; i++) {  //create ship objects (combined)
			if (!fshipsC[i] || fshipsC[i]==-1) continue;
			var d = [fshipsC[i], data.api_maxhps_combined[i+1], data.api_nowhps_combined[i+1]]; //[id, maxhp, nowhp, plane1, plane2, plane3, plane4]
			for (var j=0; j<fequipsC[i].length; j++) {
				if (fequipsC[i][j] == -1) break;
				d.push(fequipsC[i][j]);
				
			}
			fleet1C.push(createShip(d,0,i));
			fleet1C[i].xorigin = 152; fleet1C[i].graphic.x = 152;
			var mask = new PIXI.Sprite.fromImage('assets/mask.png');
			fleet1C[i].graphic.mask = mask;
			fleet1C[i].mask = mask;
			fleet1C[i].graphic.addChild(mask);
			fleet1C[i].escort = true;
			fleet1C[i].graphic.y += 480;
			stage.addChild(fleet1C[i].graphic);
			HPstate[i+12] = data.api_nowhps_combined[i+1];
		}
	}
	for (var i=0; i<fships.length; i++) {  //create ship objects
		if (!fships[i] || fships[i]==-1) continue;
		var d = [fships[i], data.api_maxhps[i+1], data.api_nowhps[i+1]]; //[id, maxhp, nowhp, plane1, plane2, plane3, plane4]
		for (var j=0; j<fequips[i].length; j++) {
			if (fequips[i][j] == -1) break;
			d.push(fequips[i][j]);
		}
		fleet1.push(createShip(d,0,i));
		stage.addChild(fleet1[i].graphic);
		HPstate[i] = data.api_nowhps[i+1];
	}
	
	for (var b=0; b<root.battles.length; b++) {
		// console.log(root.battles[b]);
		data = root.battles[b].data;
		if (Object.keys(data).length <= 0) data = root.battles[b].yasen;
		var f2 = [];
		//load enemies
		if (data.api_ship_ke[0] == -1) data.api_ship_ke = data.api_ship_ke.slice(1);
		for (var i=0; i<data.api_ship_ke.length; i++) {
			if (!data.api_ship_ke[i] || data.api_ship_ke[i] == -1) continue;
			var d = [data.api_ship_ke[i],data.api_maxhps[i+7],data.api_nowhps[i+7]];
			if (data.api_eSlot[0] == -1) data.api_eSlot = data.api_eSlot.slice(1);
			for (var j=0; j<data.api_eSlot[i].length; j++) {
				if (data.api_eSlot[i][j] == -1) break;
				d.push(data.api_eSlot[i][j]);
			}
			var sh = createShip(d,1,i);
			f2.push(sh);
			HPstate[i+6] = data.api_nowhps[i+7];
			// stage.addChild(sh.graphic);
		}
		for (var i=0; i<fleet1.length; i++) HPstate[i] = data.api_nowhps[i+1];
		if (COMBINED) for (var i=0; i<fleet1C.length; i++) HPstate[i+12] = data.api_nowhps_combined[i+1];
		var NBonly = (!!data.api_hougeki || Object.keys(data).length <= 0);
		var battledata = [data.api_formation[2],data.api_formation[0],data.api_formation[1],0,0,(NBonly)?1:0];
		if (b>0) {
			eventqueue.push([wait,[3000]]);
			eventqueue.push([shuttersNextBattle,[battledata,f2]]);
		}
		eventqueue.push([battleStart,[battledata,f2],getState(true)]);
		battlestarts.push(eventqueue.length-1);
		allfleets2.push(f2);
		
		//for reading air phase
		var processKouku = function(kouku) {
			if (kouku && (kouku.api_plane_from[0][0] != -1 || kouku.api_plane_from[1][0] != -1)) {
			
				//air state
				var AS1 = {0:0,1:2,2:1,3:-1,4:-2}[kouku.api_stage1.api_disp_seiku];
				if (AS1 > 2) AS1 = -AS1+2;
				var AS2 = -AS1;
				var shots = [];
				//attackers
				if (kouku.api_plane_from[0][0] != -1) {
					for (var i=0; i<kouku.api_plane_from[0].length; i++)
						shots.push([fleet1[kouku.api_plane_from[0][i]-1],-1,-1,-1,-1,-1]);
				}
				if (kouku.api_plane_from[1][0] != -1) {
					for (var i=0; i<kouku.api_plane_from[1].length; i++)
						shots.push([f2[kouku.api_plane_from[1][i]-7],-1,-1,-1,-1,-1]);
				}
				//defenders
				if (kouku.api_plane_from[1][0] != -1) {
					var anyAA = false;
					for (var i=0; i<fleet1.length; i++) {
						if (fleet1[i].hasAAgear) { shots.push([-1,-1,-1,fleet1[i],-1,-1]); anyAA = true; }
					}
					if (!anyAA && kouku.api_stage3.api_e_lostcount) shots.push([-1,-1,-1,fleet1[0],-1,-1]);
				}
				if (kouku.api_plane_from[0][0] != -1) {
					var anyAA = false;
					for (var i=0; i<f2.length; i++) {
						if (f2[i].hasAAgear) { shots.push([-1,-1,-1,f2[i],-1,-1]); anyAA = true; }
					}
					if (!anyAA && kouku.api_stage3.api_f_lostcount) shots.push([-1,-1,-1,f2[0],-1,-1]);
				}
				//anti air cut-in
				var AACI1 = -1;
				if (kouku.api_stage2 && kouku.api_stage2.api_air_fire) AACI1 = kouku.api_stage2.api_air_fire.api_idx;
				//targets
				var show = false;
				if (kouku.api_stage3) {
					for (var i=0; i<6; i++) {
						var dam = parseInt(kouku.api_stage3.api_fdam[i+1]);  //remember later, .1 = protect
						HPstate[i] -= Math.floor(dam);
						var hit = (kouku.api_stage3.api_frai_flag[i+1] || kouku.api_stage3.api_fbak_flag[i+1]);
						if (hit) { shots.push([-1,fleet1[i],(dam>0)? dam:0,-1,-1,-1]); show=true; }
						
						dam = parseInt(kouku.api_stage3.api_edam[i+1]);
						HPstate[i+6] -= Math.floor(dam);
						hit = (kouku.api_stage3.api_erai_flag[i+1] || kouku.api_stage3.api_ebak_flag[i+1]);
						if (hit) { shots.push([-1,f2[i],(dam>0)? dam:0,-1,-1,-1]); show = true; }
						
						if (COMBINED) {
							var dam = parseInt(kouku.api_stage3_combined.api_fdam[i+1]);  //remember later, .1 = protect
							HPstate[i+12] -= Math.floor(dam);
							var hit = (kouku.api_stage3_combined.api_frai_flag[i+1] || kouku.api_stage3_combined.api_fbak_flag[i+1]);
							if (hit) { shots.push([-1,fleet1C[i],(dam>0)? dam:0,-1,-1,-1]); show=true; }
						}
					}
				}
				if (shots.length && show) {
					eventqueue.push([wait,[1000]]);
					eventqueue.push([GAirPhase,[shots,AACI1,undefined,undefined,undefined,AS1,AS2],getState()]);  //remember AACI
				}
			}
		};
		
		//for reading torpedo phase
		var processRaigeki = function(rai,f1) {
			var shots = [];
			for (var i=0; i<6; i++) {
				if (rai.api_frai[i+1] > 0) {
					var target = f2[rai.api_frai[i+1]-1];
					var attacker = f1[i];
					shots.push([attacker,target,rai.api_fydam[i+1]]);
					HPstate[i+6] -= Math.floor(rai.api_edam[i+1]);
				}
				if (rai.api_erai[i+1] > 0) {
					var target = f1[rai.api_erai[i+1]-1];
					var attacker = f2[i];
					shots.push([attacker,target,rai.api_eydam[i+1]]);
					HPstate[i+((COMBINED)?12:0)] -= Math.floor(rai.api_fdam[i+1]);
				}
			}
			if (shots.length) {
				eventqueue.push([wait,[1000]]);
				eventqueue.push([GTorpedoPhase,[shots],getState()]);
			}
		};
		
		//for reading shelling phase
		var processHougeki = function(hou,f1) {
			for (var j=1; j<hou.api_at_list.length; j++) {
				var d = [];
				d.push( (hou.api_at_list[j]>6)? f2[hou.api_at_list[j]-7] : f1[hou.api_at_list[j]-1] ); //attacker
				d.push( (hou.api_df_list[j][0]>6)? f2[hou.api_df_list[j][0]-7] : f1[hou.api_df_list[j][0]-1] ); //target
				for (var k=0; k<hou.api_damage[j].length; k++) {
					d.push(parseInt(hou.api_damage[j][k])); //damage
					HPstate[hou.api_df_list[j][0]-1+((f1[0].escort && hou.api_df_list[j][0] < 7)?12:0)] -= Math.floor(hou.api_damage[j][k]);
				}
				
				switch(hou.api_at_type[j]) {
					case 0:
						if (d[1].issub) {
							if (d[0].hasbomber) eventqueue.push([shootPlane,d,getState()]);
							else eventqueue.push([shootASW,d,getState()]);
						}
						else if (d[0].isCV) eventqueue.push([shootPlane,d,getState()]);
						else eventqueue.push([shoot,d,getState()]);
						break;
					case 1:
						break; //laser
					case 2:
						eventqueue.push([shootDA,d,getState()]); break;
					case 3:
					case 4:
					case 5:
					case 6:
						eventqueue.push([shootCutIn,d,getState()]); break;
				}
				
			}
		};
		
		//air phase
		if (data.api_kouku) processKouku(data.api_kouku);
		//if air node, second air phase
		if (data.api_kouku2) processKouku(data.api_kouku2);
		
		//support phase
		if (data.api_support_info) {
			if (data.api_support_info.api_support_hourai) {
				var support = data.api_support_info.api_support_hourai;
				var damages = [];
				for (var i=0; i<support.api_damage.length; i++) {
					damages.push(Math.floor(support.api_damage[i]));
				}
				if (damages[0] == -1) damages = damages.slice(1);
				for (var i=0; i<damages.length; i++) {
					HPstate[i+6] -= Math.floor(damages[i]);
				}
				eventqueue.push([GSupportPhase,[[],damages]]);
			}
		}
		
		//opening torp
		var f = (COMBINED)? fleet1C : fleet1;
		if (data.api_opening_atack) processRaigeki(data.api_opening_atack,f);
		
		//shelling 1, 2, 3
		f = (COMBINED == 1)? fleet1C : fleet1;
		if (data.api_hougeki1) processHougeki(data.api_hougeki1,f);
		//CTF does closing torpedo
		if (COMBINED == 1 && data.api_raigeki) processRaigeki(data.api_raigeki,f);
		
		if (data.api_hougeki2) processHougeki(data.api_hougeki2,fleet1); //always main fleet
		f = (COMBINED == 1)? fleet1 : fleet1C;
		if (COMBINED == 2) eventqueue.push([wait,[1000]]); //short pause between main and escort shelling if STF
		if (data.api_hougeki3) processHougeki(data.api_hougeki3,f);
		
		//closing torp (if not CTF)
		f = (COMBINED)? fleet1C : fleet1;
		if (COMBINED != 1 && data.api_raigeki) processRaigeki(data.api_raigeki,f);
		
		//night battle
		var f1 = (COMBINED)? fleet1C : fleet1;
		var yasen = (data.api_hougeki)? data : root.battles[b].yasen;
		if (Object.keys(yasen).length) {
			if (!data.api_hougeki) {
				eventqueue.push([wait,[1000],null]);
				eventqueue.push([shutters,[],null]);
			}
			eventqueue.push([NBstart,[]]);
			var hou = yasen.api_hougeki;
			for (var j=1; j<hou.api_at_list.length; j++) {
				var d = [];
				d.push( (hou.api_at_list[j]>6)? f2[hou.api_at_list[j]-7] : f1[hou.api_at_list[j]-1] ); //attacker
				d.push( (hou.api_df_list[j][0]>6)? f2[hou.api_df_list[j][0]-7] : f1[hou.api_df_list[j][0]-1] ); //target
				for (var k=0; k<hou.api_damage[j].length; k++) {
					d.push(parseInt(hou.api_damage[j][k])); //damage
					HPstate[hou.api_df_list[j][0]-1+((COMBINED && hou.api_df_list[j][0] < 7)?12:0)] -= Math.floor(hou.api_damage[j][k]);
				}
				
				switch(hou.api_sp_list[j]) {
					case 0:
						if (d[0].isCV) eventqueue.push([shootPlane,d,getState()]);
						else if (d[1].isinstall) eventqueue.push([shoot,d,getState()]);
						else if (d[1].issub) eventqueue.push([shootASW,d,getState()]);
						else if (d[0].issub || d[0].hasonlytorp) eventqueue.push([shootTorp,d,getState()]);
						else eventqueue.push([shoot,d,getState()]); break;  //add ASW and plane in somehow
					case 1:
						eventqueue.push([shootDA,d,getState()]); break;
					case 2:
					case 3:
						d[2] += d[3];
						eventqueue.push([shootBigTorp,d,getState()]); break;
					case 4:
					case 5:
						d[2] += d[3];
						eventqueue.push([shootBigGun,d,getState()]); break;
				}
				
			}
		}
	}
	
	stage.addChild(shutterTop); stage.addChild(shutterBottom);
	shutterTop.y = -246; shutterTop.alpha = .25;
	shutterBottom.y = 456; shutterBottom.alpha = .25;
	if (!started) animate();
}




var timeouts = [];
function addTimeout(f,time) {
	timeouts.push([f,time]);
}
var updates = [];

var e = 0;
var ecomplete = true;
var PAUSE = false;
var END = false;
var statechangefunc = null;

var prevtime = Date.now(), currtime = Date.now(), timeelapsed = 0, frameselapsed;
function animate() {
	if (END) return;
    requestAnimationFrame(animate);
	
	if (!ALLLOADED) return; //??????
	if (HASLOADTEXT) { $('#error').text(''); HASLOADTEXT = false; }
	
	frameselapsed++;
	currtime = Date.now();
	timeelapsed += currtime - prevtime;
	if (timeelapsed >= 1000) {
		timeelapsed -= 1000;
		$('#FPS').text(frameselapsed);
		frameselapsed = 0;
	}
	prevtime = currtime;
	
	if (PAUSE) return;
	if (statechangefunc) {
		statechangefunc();
		statechangefunc = null;
		return;
	}
	
	if (ecomplete && e < eventqueue.length) {
		eventqueue[e][0].apply(null,eventqueue[e][1]);
		e++;
		ecomplete = false;
	}
	
	for (i=0; i<updates.length; i++) {
		if( updates[i][0].apply(null,updates[i][1]) ) updates.splice(i,1);
	}
	
	for (var i=0; i<timeouts.length; i++) {
		timeouts[i][1] -= 1000/60;
		if (timeouts[i][1] <= 0) {
			var f = timeouts[i][0];
			timeouts.splice(i--,1);
			f();
		}
	}
	
    renderer.render(stage);
}

//-----------------------------------------

function createExplosion(x,y,scale) {
	if (!scale) scale = 1;
	var explosion = getFromPool('explosion');
	if (!explosion) explosion = new PIXI.extras.MovieClip(frames_exp);
	explosion.name = 'explosion';
	explosion.animationSpeed = .5;
	explosion.anchor.set(.5);
	explosion.loop = false;
	explosion.position.set(x,y);
	explosion.scale.set(scale);
	explosion.onComplete = function() { /*stage.removeChild(this);*/ this.gotoAndStop(0); recycle(this); }
	explosion.play();
	explosion.notpersistent = true;
	stage.addChild(explosion);
}

function createNumber(x,y,number) {
	var ng = new PIXI.Container;
	number = number.toString();
	if (number <= 0) {
		var sprite = getFromPool('Nmiss','assets/Nmiss.png');
		sprite.position.set(0);
		sprite.anchor.set(.5);
		sprite.vspeed = -2.5; sprite.bounce = 2; //updates.push([moveNumber,[sprite]]);
		ng.addChild(sprite);
	} else if (number < 40) {
		for (i=0; i<number.length; i++) {
			var j = 0;
			addTimeout(function(){
				var sprite = getFromPool('N'+number[j],'assets/N'+number[j]+'.png');
				sprite.x = -(number.length-1)*7 + j*14; sprite.y = 0;
				sprite.anchor.set(.5);
				sprite.vspeed = -2.5; sprite.bounce = 2; //updates.push([moveNumber,[sprite]]);
				ng.addChild(sprite);
				j++;
			}, i*100);
		}
	} else {
		for (i=0; i<number.length; i++) {
			var j = 0;
			addTimeout(function(){
				var sprite = getFromPool('C'+number[j],'assets/C'+number[j]+'.png');
				sprite.x = -(number.length-1)*7 + j*14;
				sprite.anchor.set(.5);
				sprite.y = -5;
				sprite.vspeed = -2.5; sprite.bounce = 2; //updates.push([moveNumber,[sprite]]);
				ng.addChild(sprite);
				j++;
			}, i*100);
		}
		var crit = getFromPool('Ccrit','assets/Ccrit.png');
		crit.x = -10;
		crit.y = 10;
		crit.iscrit = true;
		crit.anchor.set(.5);
		ng.addChild(crit);
	}
	ng.position.set(x,y);
	ng.lifetime = 70;
	ng.notpersistent = true;
	updates.push([moveNumber,[ng]]);
	stage.addChild(ng);
	
	// addTimeout(function(){ stage.removeChild(ng); }, 1000);
}

function moveNumber(numbers) {
	for (var i=0; i<numbers.children.length; i++) {
		var number = numbers.getChildAt(i);
		if (number.iscrit) continue;
		number.y += number.vspeed;
		if (number.bounce > 0) number.vspeed += .25;
		if (number.vspeed >= 2.5) {
			number.vspeed = -1.5;
			number.bounce = 1;
		}
		if (number.vspeed >= 1.5 && number.bounce == 1) {
			number.bounce = 0;
			number.vspeed = 0;
		}
	}
	if (numbers.parent==stage) {
		stage.removeChild(numbers); //bring to front
		stage.addChild(numbers);
	}
	numbers.lifetime--;
	if (numbers.lifetime <= 10) numbers.alpha-=.1;
	if (numbers.lifetime <= 0) {
		while(numbers.children.length) recycle(numbers.getChildAt(0));
		numbers.destroy();
		stage.removeChild(numbers);
		return true;
	}
	return false;
}

function createTorp(ship,target,speed,big) {
	if (!speed) speed = 4;
	var torp = (big)? getFromPool('torpedoBig','assets/493.png') : getFromPool('torpedo','assets/498.png');
	torp.pivot.set(0,(big)? 13:8);//torp.pivot.set(281,8);
	var x1 = (ship.side==1) ? 657 : (ship.escort||target.escort)? 295 : 143;
	var x2 = (target.side==1) ? 657 : (ship.escort||target.escort)? 295 : 143;
	torp.position.set(x1,ship.graphic.y+22);
	torp.rotation = Math.atan((ship.graphic.y - target.graphic.y)/(x1-x2))+Math.PI*ship.side;
	var msk = new PIXI.Graphics();
	msk.beginFill(0x000000);
	msk.drawRect((ship.escort||target.escort)? 321 : 169, 0, (ship.escort||target.escort)? 310 : 462, 480);
	torp.mask = msk;
	torp.alpha = 0;
	torp.notpersistent = true;
	stage.addChildAt(torp,1);
	
	updates.push([moveTorp,[torp,(ship.side==0) ? speed : -speed]]);
}

function moveTorp(torp,speed) {
	torp.x += speed;
	torp.y += speed*Math.tan(torp.rotation);
	if (torp.alpha < 1) torp.alpha += .05;
	
	if ( (speed > 0) ? (torp.x-torp.width > 657) : (torp.x+torp.width < 143) ) {
		recycle(torp);
		return true;
	}
	return false;
}

function shipSetHP(ship,hp) {
	if (hp > ship.hpmax) hp = ship.hpmax;
	if (hp < 0) hp = 0;
	
	if (ship.side==0) { HPnow1 -= ship.hp-hp; setHPBar(1,1-HPnow1/HPtotal1); } //update HP bars
	else { HPnow2 -= ship.hp-hp; setHPBar(0,1-HPnow2/HPtotal2); }

	var hpbar = ship.graphic.getChildAt(1);  //change bar
	var percent = hp/ship.hpmax;
	var cred = (percent <= .5) ? 255 : 255*(2*(1-percent));
	var cgreen = (percent >= .5) ? 255 : 255*(2*percent);
	var c = Math.round(cred)*65536 + Math.round(cgreen)*256;
	hpbar.clear();
	hpbar.beginFill(c);
	if (ship.side == 0) hpbar.drawRect(161,3+38*(1-percent),5,38*percent);
	else hpbar.drawRect(3,3+38*(1-percent),5,38*percent);
	
	ship.hp = hp;
	var dtext = ship.graphic.getChildAt(4);
	dtext.text = hp+'/'+ship.hpmax;  //change text
	if (ship.side == 1) dtext.x  = -7-dtext.width;
	
	if (hp <= 0) {
		if (ship.status != 0) {
			if (ship.status < 4) ship.graphic.removeChildAt(5);
			for (i=0; i<5; i++) ship.graphic.getChildAt(i).filters = [new PIXI.filters.GrayFilter()];
			var dam = PIXI.Sprite.fromImage('assets/d389.png'); dam.y += 2;
			ship.graphic.addChild(dam);
			ship.damg = dam;
			if (ship.side == 1) ship.graphic.getChildAt(5).x += 10;
			ship.status = 0;
		}
	} else if (hp <= ship.hpmax/4) {
		if (ship.status != 1) {
			if (ship.status < 4) ship.graphic.removeChild(ship.damg);
			if (ship.status == 0) for (i=0; i<5; i++) ship.graphic.getChildAt(i).filters = null;
			var dam = PIXI.Sprite.fromImage('assets/d387.png'); dam.y += 2;
			ship.graphic.addChild(dam);
			ship.damg = dam;
			if (ship.side == 1) dam.x += 10;
			ship.status = 1;
		}
	} else if (hp <= ship.hpmax/2) {
		if (ship.status != 2) {
			if (ship.status < 4) ship.graphic.removeChild(ship.damg);
			if (ship.status == 0) for (i=0; i<5; i++) ship.graphic.getChildAt(i).filters = null;
			var dam = PIXI.Sprite.fromImage('assets/d385.png'); dam.y += 2;
			ship.graphic.addChild(dam);
			ship.damg = dam;
			if (ship.side == 1) dam.x += 10;
			ship.status = 2;
		}
	} else if (hp <= ship.hpmax*.75) {
		if (ship.status != 3) {
			if (ship.status < 4) ship.graphic.removeChild(ship.damg);
			if (ship.status == 0) for (i=0; i<5; i++) ship.graphic.getChildAt(i).filters = null;
			var dam = PIXI.Sprite.fromImage('assets/d383.png'); dam.y += 2;
			ship.graphic.addChild(dam);
			ship.damg = dam;
			if (ship.side == 1) dam.x += 10;
			ship.status = 3;
		}
	} else {
		if (ship.status == 0) for (i=0; i<5; i++) ship.graphic.getChildAt(i).filters = null;
		ship.graphic.removeChild(ship.damg);
		ship.status = 4;
	}
}

function shipMoveTo(ship,targetx,speed) {
	// console.log(ship.id);
	if (ship.graphic.x < targetx) {
		ship.graphic.x += speed;
		if (ship.graphic.x > targetx) ship.graphic.x = targetx;
	} else {
		ship.graphic.x -= speed;
		if (ship.graphic.x < targetx) ship.graphic.x = targetx;
	}
	return (ship.graphic.x == targetx);
}

function shipShake(ship,amount,decay,time) {
	if (ship.shakepid) clearInterval(ship.shakepid);
	ship.graphic.pivot.x = (ship.side == 1) ? amount : -amount;
	ship.shakepid= setInterval(function(){
		ship.graphic.pivot.x *= -1;
		ship.graphic.pivot.x -= (ship.graphic.pivot.x > 0) ? decay : -decay;
		if (Math.abs(ship.graphic.pivot.x) < decay) {
			ship.graphic.pivot.x = 0;
			clearInterval(ship.shakepid);
			ship.shakepid = false;
		}
	},30);
	if (time) {
		addTimeout(function(){ ship.graphic.pivot.x = 0; clearInterval(ship.shakepid); ship.shakepid = false;}, time);
	}
}

function radarGrow(radar) {
	if (radar.scale.x >= 1) return true;
	radar.scale.set(radar.scale.x + .04);
	return (radar.scale.x >= 1);
}

function dotAppear(dots) {
	if (dots.alpha < 1) dots.alpha += .05;
	return (dots.alpha >= 1);
}

//--------------------
function battleStart(battledata,newships) {
	if (battledata[5] == '1' && !bg2.parent) {  //just in case background wasn't changed
		stage.removeChild(bg);
		stage.addChildAt(bg2,0);
	}
	fleet2 = newships;
	for (var i=newships.length-1; i>=0; i--) stage.addChildAt(newships[i].graphic,5/*ind*/);
	createDots(dots1,battledata[1],fleet1.length,0);
	createDots(dots2,battledata[2],fleet2.length,1);
	GEngage = battledata[0];
	GAP1 = battledata[3];
	GAP2 = battledata[4];
	
	dots1.alpha = dots2.alpha = 0;
	radar1.scale.set(0); radar2.scale.set(0);
	updates.push([radarGrow,[radar1]]);
	updates.push([radarGrow,[radar2]]);
	updates.push([dotAppear,[dots1]]);
	updates.push([dotAppear,[dots2]]);

	addTimeout(function() { showEngage(GEngage); }, 500);
	
	HPtotal1 = HPtotal2 = 0;
	for (var i=0; i<fleet1.length; i++) HPtotal1 += fleet1[i].hp;
	for (var i=0; i<fleet1C.length; i++) HPtotal1 += fleet1C[i].hp;
	for (var i=0; i<fleet2.length; i++) HPtotal2 += fleet2[i].hp;
	HPnow1 = HPtotal1; HPnow2 = HPtotal2;
	clearHPBar(0); clearHPBar(1);
	
	var j = 0;
	for (var i=0; i<fleet1.length; i++) {
		addTimeout(function(){
			updates.push([shipMoveTo,[fleet1[j],fleet1[j].xorigin,10]]);
			j++;
		},100+100*i);
	}
	for (var i=0; i<fleet2.length; i++) {
		var k = 0;
		addTimeout(function(){
			updates.push([shipMoveTo,[fleet2[k],fleet2[k].xorigin,10]]);
			k++;
		},1000+100*i);
	}
	if (COMBINED) {
		var jj = 0;
		for (var i=0; i<fleet1C.length; i++) {
			addTimeout(function(){
				updates.push([shipEscortEnter,[fleet1C[jj],77+45*jj]]);
				jj++;
			},1000+100*i);
		}
	}
	
	addTimeout(function(){ ecomplete = true; }, 2500);
}

function shipEscortEnter(ship,targety) {
	if (ship.graphic.y - targety > 100) {
		ship.graphic.y -= 10;
	} else {
		ship.graphic.y -= (ship.graphic.y - targety) * .1;
		if (ship.graphic.y - targety < 1) ship.graphic.y = targety;
	}
	
	return (ship.graphic.y - targety <= 1);
}

function battleEnd() {
	addTimeout(function() {
		END = true;
		console.log('end');
	}, 2000);
}

function standardHit(target,damage,move) {
	move = typeof move !== 'undefined' ? move : true;
	if (damage <= 10) standardExplosion(target,1);
	else if (damage < 40) {
		standardExplosion(target,2);
	} else {
		standardExplosion(target,3);
	}
	createNumber(target.xorigin+85,target.graphic.y+22,damage);
	shipSetHP(target,target.hp-Math.max(0,damage));
	if (move) {
		target.graphic.x = target.xorigin-25+50*target.side;
		updates.push([shipMoveTo,[target,target.xorigin,2]]);
		shipShake(target,5,.175);
	}
}

function standardExplosion(target,num) {
	switch(num) {
		case 1:
			createExplosion(target.xorigin+85,target.graphic.y+22,1);
			break;
		case 2:
			createExplosion(target.xorigin+65,target.graphic.y+42,1);
			addTimeout(function(){createExplosion(target.xorigin+105,target.graphic.y+2,1);},75);
			break;
		case 3:
			createExplosion(target.xorigin+85,target.graphic.y+42,1);
			addTimeout(function(){createExplosion(target.xorigin+115,target.graphic.y+2,1);},75);
			addTimeout(function(){createExplosion(target.xorigin+55,target.graphic.y+7,1);},150);
			break;
	}
}

function shoot(ship,target,damage) {
	// addTimeout(function(){ updates.push([shipMoveOut,fleet1[0],2]); }, 1000);
	// addTimeout(function(){ updates.push([shipMoveOut,fleet1[1],2]); }, 2000);
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	addTimeout(function(){
		standardHit(target,damage);
	},800);
	addTimeout(function(){updates.push([shipMoveTo,[ship,ship.xorigin,2]]);},1000);
	addTimeout(function(){ ecomplete = true; }, 1500);
}

function shootDA(ship,target,damage1,damage2) {
	updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	addTimeout(function(){ updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,3]]); }, 500);
	addTimeout(function(){
		standardHit(target,damage1);
	},650);
	addTimeout(function(){
		standardHit(target,damage2);
	},1500);
	addTimeout(function(){updates.push([shipMoveTo,[ship,ship.xorigin,2]]);},1800);
	addTimeout(function(){ ecomplete = true; }, 2300);
}

function shootPlane(ship,target,damage) {
	var planes = createPlane(ship.graphic.x+85,ship.graphic.y+22,ship.planetypes);
	
	var angle = Math.atan((ship.graphic.y-target.graphic.y)/(ship.graphic.x-target.graphic.x));
	updates.push([movePlane,[planes,angle,(ship.side==0) ? 5 : -5, (ship.escort||target.escort)]]);
	
	addTimeout(function(){ standardHit(target,damage); }, (ship.escort||target.escort)? 1600 : 2200);
	
	addTimeout(function(){stage.removeChild(planes); ecomplete=true;},3000);
}

function shootASW(ship,target,damage) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	addTimeout(function(){
		updates.push([shipMoveTo,[target,target.xorigin,4]]);
		shipShake(target,5,.125);
		target.graphic.x = target.xorigin-25+50*target.side;
		createExplosion(target.xorigin+65+40-80*target.side,target.graphic.y+42,1);
		addTimeout(function(){createExplosion(target.xorigin+105+40-80*target.side,target.graphic.y+2,1);},75);
	},1000);
	addTimeout(function(){
		standardHit(target,damage,false);
		updates.push([shipMoveTo,[ship,ship.xorigin,2]]);
	},1500);
	addTimeout(function(){ ecomplete = true; }, 2000);
}

function shootCutIn(ship,target,damage) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	addTimeout(function(){
		updates.push([shipMoveTo,[target,target.xorigin,4]]);
		shipShake(target,5,.125,650);
		target.graphic.x = target.xorigin-25+50*target.side;
		createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);
		addTimeout(function(){createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);},75);
		addTimeout(function(){createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);},150);
		addTimeout(function(){createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);},225);
		addTimeout(function(){createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);},300);
		// addTimeout(function(){createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);},250);
	},800);
	addTimeout(function(){
		standardHit(target,damage);
		updates.push([shipMoveTo,[ship,ship.xorigin,2]]);
	},1500);
	addTimeout(function(){ ecomplete = true; }, 2200);
}

function shootBigGun(ship,target,damage) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	addTimeout(function(){
		updates.push([shipMoveTo,[target,target.xorigin,4]]);
		shipShake(target,5,.175);
		target.graphic.x = target.xorigin-25+50*target.side;
		standardExplosion(target,3);
		addTimeout(function(){standardExplosion(target,3);},300);
		addTimeout(function(){standardExplosion(target,3);},600);
	},800);
	addTimeout(function(){
		standardHit(target,damage);
		updates.push([shipMoveTo,[ship,ship.xorigin,2]]);
	},2000);
	addTimeout(function(){ ecomplete = true; }, 2700);
}

function shootTorp(ship,target,damage) {
	shipShake(ship,2,0,600);
	addTimeout(function(){ createTorp(ship,target,6); }, 500);
	addTimeout(function(){ standardHit(target,damage); },1900);
	
	addTimeout(function(){ ecomplete = true; }, 2600);
}

function shootBigTorp(ship,target,damage) {
	shipShake(ship,2,0,600);
	addTimeout(function(){ createTorp(ship,target,12,true); }, 500);
	addTimeout(function(){ standardHit(target,damage); },1300);
	
	addTimeout(function(){ ecomplete = true; }, 2200);
}

var PLANESPRITES = ['938','914','916','918','920','922','924','926'];
function createPlane(x,y,planetypes,shots) {
	var num = Math.min(3,planetypes.length);
	
	var planes = new PIXI.Container();
	if (num == 3) {
		for (var i=0; i<3; i++) {
			var plane = PIXI.Sprite.fromImage('assets/'+PLANESPRITES[planetypes[i]-1]+'.png');
			plane.x = i*25-25;
			plane.y = (i==1) ? -15 : 15;
			plane.scale.set(.8);
			planes.addChild(plane);
			if (shots) plane.shot = shots[i];
		}
	} else if (num == 2) {
		for (var i=0; i<2; i++) {
			var plane = PIXI.Sprite.fromImage('assets/'+PLANESPRITES[planetypes[i]-1]+'.png');
			plane.x = i*30-15;
			plane.y = (i==1) ? -15 : 15;
			plane.scale.set(.8);
			planes.addChild(plane);
			if (shots) plane.shot = shots[i];
		}
	} else if (num == 1) {
		var plane = PIXI.Sprite.fromImage('assets/'+PLANESPRITES[planetypes[0]-1]+'.png');
		plane.scale.set(.8);
		planes.addChild(plane);
		if (shots) plane.shot = shots[0];
	}
	planes.position.set(x,y);
	planes.pivot.set(40);
	planes.scale.set(0);
	planes.notpersistent = true;
	stage.addChild(planes);
	return planes;
}

function movePlane(planes,angle,speed,withescort) {
	planes.x += speed;
	planes.y += speed*Math.tan(angle);
	if (planes.scale.x < .8) planes.scale.set(planes.scale.x+.1);
	var x1 = (withescort)? 237 : 85;
	if (!withescort||planes.x > 120)
		planes.pivot.y = 40-100*Math.sin(Math.PI*(planes.x-x1)/(715-x1));
	else planes.pivot.y += 2.5; //so it doesn't start snaking
	for (var i=0; i<planes.children.length; i++) {
		var plane = planes.getChildAt(i);
		plane.pivot.y = 3*Math.sin(planes.x/80+Math.PI*2*i/3);
		if (plane.shot == 2 && ((speed > 0)? (planes.x > 320):(planes.x < 480))) {
			createExplosion(planes.x+plane.x,planes.y-planes.pivot.y+plane.y,.5);
			planes.removeChild(plane);
		}
	}
	
	return (speed > 0) ? (planes.x > 900) : (planes.x < -100);
}

function GTorpedoPhase(shots) {
	targets = []; damages = [];
	for (i=0; i<shots.length; i++) {
		var j = 0;
		var ship = shots[i][0]; var target = shots[i][1]; var damage = shots[i][2];
		if (targets.indexOf(target) == -1) { targets.push(target); damages.push(damage); }
		else damages[targets.indexOf(target)] += damage;
		shipShake(ship,2,0,500);
		var j2=0;
		addTimeout(function() {
			var sh = shots[j2][0];
			sh.graphic.x = sh.xorigin-8+16*sh.side;
			j2++;
		}, 450);
		addTimeout(function(){
			updates.push([shipMoveTo,[shots[j][0],shots[j][0].xorigin,4]]);
			createTorp(shots[j][0],shots[j][1],(COMBINED)? 3 : 4);
			j++;
		}, 500);
	}
	
	var k = 0;
	for (i=0; i<targets.length; i++) {
		addTimeout(function(){
			standardHit(targets[k],damages[k]);
			k++;
		},(COMBINED)? 2600 : 2700);
	}
	
	addTimeout(function(){ ecomplete = true; }, 4000);
}

function GAirPhase(shots,aaci1,aaci2,contact1,contact2,AS1,AS2) {
	var targets = [], damages = [], attackers = [], allplanes = []; defenders = []; statuses = [];
	for (var i=0; i<shots.length; i++) {
		var ship = shots[i][0]; var target = shots[i][1]; var damage = shots[i][2];
		var defender = shots[i][3]; var sd1 = shots[i][4]; var sd2 = shots[i][5];
		if (damage > -1 && targets.indexOf(target) == -1) { targets.push(target); damages.push(damage); }
		else damages[targets.indexOf(target)] += damage;
		if (ship != -1) {
			if (attackers.indexOf(ship) == -1) {
				attackers.push(ship);
				statuses.push([sd1]);
			} else {
				statuses[attackers.indexOf(ship)].push(sd1);
			}
		}
		if (defender !=-1 && defenders.indexOf(defender) == -1) defenders.push(defender);  //decide what to do with defenders, show them shooting or those with AA equips shooting?
	}
	
	for (var i=0; i<attackers.length; i++) {
		var ship = attackers[i];
		var planes = createPlane(ship.graphic.x+85,ship.graphic.y+22,ship.planetypes,statuses[i]);
		updates.push([movePlane,[planes,Math.PI*ship.side,(ship.side==0) ? 4 : -4]]);
		for (var j=0; j<statuses.length; j++) {  //remove graphics if plane completely shot down, may not need
			if (statuses[i][j] == 2) ship.planetypes.splice(i,1);
		}
		allplanes.push(planes);
	}
	
	if (aaci1 > -1 || aaci2 > -1) {  //AACI freeze
		addTimeout(function() {  
			var temp = [updates.slice(),timeouts.slice()];
			updates = [];
			timeouts = [];
			addTimeout(function() {
				for (var i=0; i<temp[0].length; i++)
					updates.push(temp[0][i]);
				timeouts = temp[1];
			}, 1000);
			if (aaci1 > -1) {
				createAACIfire(600,450);
				addTimeout(function() { createAACIfire(600,370); }, 100);
				addTimeout(function() { createAACIfire(600,290); }, 300);
				var aaciship = (aaci1 > 5)? fleet1C[aaci1-6] : fleet1[aaci1];
				updates.push([shipMoveTo,[aaciship,aaciship.xorigin+25-50*aaciship.side,3]]);
				addTimeout(function() { updates.push([shipMoveTo,[aaciship,aaciship.xorigin,3]]); }, 800);
			}
			if (aaci2 > -1) {
				createAACIfire(300,450);
				addTimeout(function() { createAACIfire(300,370); }, 100);
				addTimeout(function() { createAACIfire(300,290); }, 300);
				updates.push([shipMoveTo,[fleet2[aaci2-10],fleet2[aaci2-10].xorigin+25-50*fleet2[aaci2-10].side,3]]);
				addTimeout(function() { updates.push([shipMoveTo,[fleet2[aaci2-10],fleet2[aaci2-10].xorigin,3]]); }, 800);
			}
		},800);
	}
	
	addTimeout(function() {
		for (var i=0; i<defenders.length; i++) {
			var angle1 = Math.random()*Math.PI/12 + ((defenders[i].side==0)? Math.PI/6 : 4*Math.PI/6);
			var angle2 = -Math.random()*Math.PI/12 + ((defenders[i].side==0)? Math.PI/3 : 5*Math.PI/6);
			createAAfire(defenders[i].graphic.position.x+70,defenders[i].graphic.position.y+15,angle1);
			createAAfire(defenders[i].graphic.position.x+70,defenders[i].graphic.position.y+15,angle2);
			updates.push([shipMoveTo,[defenders[i],defenders[i].xorigin+25-50*defenders[i].side,3]]);
			var ii=0;
			addTimeout(function() {
				updates.push([shipMoveTo,[defenders[ii],defenders[ii].xorigin,3]]);
				ii++;
			}, 500);
		}
		if (AS1 && AS2) showAS(AS1,AS2);
	}, 900);
	
	var k = 0;
	for (var i=0; i<targets.length; i++) {
		addTimeout(function(){
			standardHit(targets[k],damages[k]);
			k++;
		},2700);
	}
	
	addTimeout(function(){ for(var i=0; i<allplanes.length; i++) stage.removeChild(allplanes[i]); ecomplete = true; }, 3700);
}

function createAAfire(x,y,angle) {
	var fire = PIXI.Sprite.fromImage('assets/216.png');
	fire.pivot.y = 5;
	fire.position.set(x,y);
	fire.rotation = -angle+Math.PI;
	var msk = new PIXI.Graphics();
	msk.beginFill(0x000000);
	msk.drawRect(x-6,
		y-6-178*Math.sin(angle),
		178*Math.cos(angle)+12,
		178*Math.sin(angle)+12);
	// msk.endFill();
	fire.mask = msk;
	stage.addChild(msk);
	fire.notpersistent = true;
	stage.addChild(fire);
	
	updates.push([moveAAfire,[fire,angle]]);
}

function moveAAfire(fire,angle) {
	fire.x += Math.cos(angle)*15;
	fire.y -= Math.sin(angle)*15;
	
	if (fire.x < 0 || fire.x > 1000) {
		stage.removeChild(fire);
		return true;
	}
	return false;
}

function createAACIfire(x,y) {
	var firefront = PIXI.Sprite.fromImage('assets/aaci1.png');
	var fireback = PIXI.Sprite.fromImage('assets/aaci2.png');
	firefront.position.set(x,y);
	fireback.position.set(x,y);
	firefront.pivot.set(178,322);
	fireback.pivot.set(178,322);
	firefront.scale.set(0);
	fireback.scale.set(0);
	firefront.rotation = -Math.PI/4;
	fireback.rotation = -Math.PI/4;
	 
	updates.push([moveAACIfire,[firefront,.1]]);
	addTimeout(function() { updates.push([moveAACIfire,[fireback,.025]]); }, 100);
	firefront.notpersistent = true;
	fireback.notpersistent = true;
	stage.addChild(fireback);
	stage.addChild(firefront);
}
 
function moveAACIfire(fire,fade) {
	if (fire.scale.x < .8) fire.scale.set(fire.scale.x+.05);
	else {
		fire.alpha -= fade;
		fire.scale.set(fire.scale.x+.01);
	}
	 
	if (fire.alpha <= 0) {
		stage.removeChild(fire);
		return true;
	}
	return false;
}


function GSupportPhase(ships,damages) {
	for (var i=0; i<12; i++) {
		addTimeout(function() {
			createSupportShell(200,-20,Math.PI*(.15+.1*Math.random()));
		}, 100+i*50);
	}
	
	addTimeout(function() {
		for (var i=0; i<damages.length; i++) {
			standardHit(fleet2[i],damages[i]);
		}
	}, 1000);
	
	addTimeout(function() { ecomplete = true; }, 2000);
}

function createSupportShell(x,y,angle) {
	var shell = getFromPool('supportShell','assets/488.png');
	shell.alpha = 1;
	shell.scale.set(.5);
	shell.position.set(x,y);
	shell.lifetime = 30;
	shell.rotation = angle;
	shell.notpersistent = true;
	stage.addChild(shell);
	updates.push([moveSupportShell,[shell,angle]]);
}

function moveSupportShell(shell,angle) {
	shell.x += 15*Math.cos(angle);
	shell.y += 15*Math.sin(angle);
	shell.lifetime--;
	if (shell.lifetime <= 20) shell.alpha -= .05;
	if(shell.lifetime <= 0) { recycle(shell); return true; }
	return false;
}

function escortFadeIn(ship) {
	ship.graphic.mask.x -= 10;
	if (ship.graphic.mask.x <= -110) {
		ship.graphic.removeChild(ship.graphic.mask);
		ship.graphic.mask = null;
		return true;
	}
	return false;
}

function NBstart() {
	if (COMBINED) {
		for (var i=0; i<fleet1.length; i++) {
			var j = 0;
			addTimeout(function() {
				updates.push([shipMoveTo,[fleet1[j],-220,10]]);
				j++;
			}, 100+i*100);
		}
		for (var i=0; i<fleet1C.length; i++) {
			var k = 0;
			addTimeout(function() {
				updates.push([shipMoveTo,[fleet1C[k],0,10]]);
				k++;
			}, 200+i*100);
			var kk = 0;
			addTimeout(function() {
				updates.push([escortFadeIn,[fleet1C[kk]]]);
				fleet1C[kk].xorigin = 0;
				fleet1C[kk].escort = false;
				kk++;
			}, 500+i*100);
		}
		addTimeout(function() { ecomplete = true; }, 1500);
	} else {
		addTimeout(function() { ecomplete = true; }, 1);
	}
}

function resetBattle() {
	if (!bg.parent) {
		stage.removeChild(bg2);
		stage.addChildAt(bg,0);
	}
	for (var i=0; i<fleet1.length; i++) fleet1[i].graphic.x = -220;
	for (var i=0; i<fleet1C.length; i++) {
		fleet1C[i].graphic.y = 557+44*i;
		fleet1C[i].graphic.x = 152;
		if (!fleet1C[i].graphic.mask) {
			fleet1C[i].graphic.mask = fleet1C[i].mask;
			fleet1C[i].graphic.addChild(fleet1C[i].graphic.mask);
		}
		fleet1C[i].mask.x = 0;
		fleet1C[i].xorigin = 152;
		fleet1C[i].escort = true;
	}

	for (var i=0; i<fleet2.length; i++) stage.removeChild(fleet2[i].graphic);
	
	dots1.removeChildren(); dots2.removeChildren();
	dots1.alpha = dots2.alpha = 0;
	radar1.scale.set(0); radar2.scale.set(0);
	
	$('#plEngage').text('');
	$('#plEngageT').text('');
	if (ENGAGEPIDS[0]) { clearInterval(ENGAGEPIDS[0]); ENGAGEPIDS[0] = null; }
	if (ENGAGEPIDS[1]) { clearTimeout(ENGAGEPIDS[1]); ENGAGEPIDS[1] = null; }
	$('#plAS1').text('');
	$('#plAS2').text('');
}

function shuttersNextBattle(battledata, newships) {
	shutterTop.alpha = shutterBottom.alpha = 1;
	updates.push([closeShutters,[]]);
	addTimeout(function(){
		resetBattle();
		if (battledata[5]=='1') { stage.removeChild(bg); stage.addChildAt(bg2,0); } //must be done ahead of time if shutters going up
		
		updates.push([openShutters,[]]);
	},1000);
	addTimeout(function(){ ecomplete = true; }, 1500);
}

function shutters() {
	// shutterTop.y = -shutterTop.height;
	// shutterBottom.y = 480;
	shutterTop.alpha = shutterBottom.alpha = 1;
	updates.push([closeShutters,[]]);
	addTimeout(function(){
		stage.removeChild(bg);
		stage.addChildAt(bg2,0);
		updates.push([openShutters,[]]);
	},1000);
	
	addTimeout(function(){ ecomplete = true; }, 2000);
}

function closeShutters() {
	shutterTop.y += 20;
	shutterBottom.y -= 20;
	if (shutterTop.y >= 0) {
		shutterTop.y = 0;
		shutterBottom.y = 210;
		return true;
	}
	return false;
}

function openShutters() {
	shutterTop.y -= 20;
	shutterBottom.y += 20;
	if (shutterTop.y <= -246) {
		shutterTop.y = -246;
		shutterBottom.y = 456;
		shutterTop.alpha = shutterBottom.alpha = .25;
		return true;
	}
	return false;
}

function wait(time) {
	addTimeout(function(){ ecomplete = true; }, time);
}

function skipToBattle(battle) {
	if (battle > battlestarts.length) battle = battlestarts.length;
	console.log(battle);
	statechangefunc = function() {
		console.log('doing stuff');
		updates = [];
		timeouts = [];
		ecomplete = true;
		for (var i=0; i<fleet2.length; i++) fleet2[i].graphic.x = 851;
		for (var i=0; i<stage.children.length; i++) {
			var child = stage.getChildAt(i);
			if (child.notpersistent) {
				if (child.name) recycle(child);
				else stage.removeChild(child);
				i--;
			}
		}
		resetBattle();
		e = battlestarts[battle-1];
		var hps = eventqueue[e][2].HP;
		for (var i=0; i<fleet1.length; i++) {
			if (fleet1[i].hp != hps[i]) shipSetHP(fleet1[i],hps[i]);
		}
		for (var i=0; i<fleet2.length; i++) {
			if (fleet2[i].hp != hps[i+6]) shipSetHP(fleet2[i],fleet2[i].hpmax);
		}
		if (COMBINED) {
			for (var i=0; i<fleet1C.length; i++) {
				if (fleet1C[i].hp != hps[i+12]) shipSetHP(fleet1C[i],hps[i+12]);
			}
		}
		shutterTop.y = -246; shutterTop.alpha = .25;
		shutterBottom.y = 456; shutterBottom.alpha = .25;
	}
}

var CANRESET = true;
function reset(callback) {
	if (!CANRESET) return;
	// END = true;
	CANRESET = false;
	statechangefunc = function() {
		// while(stage.children.length) {
			// var child = stage.getChildAt(0);
			// stage.removeChild(child);
			// console.log(child);
			// if ([bg,bg2,radar1,radar2,dots1,dots2,shutterTop,shutterBottom].indexOf(child) == -1) {
				// if
			// }
		// }
		PAUSE = true;
		stage.removeChildren();
		for (var i=0; i<fleet1.length; i++) {
			if (fleet1[i].shakepid) clearInterval(fleet1[i].shakepid);
			for (var j=0; j<fleet1[i].graphic.children.length; j++) fleet1[i].graphic.getChildAt(j).destroy();
			fleet1[i].graphic.destroy();
		}
		for (var i=0; i<fleet1C.length; i++) {
			if (fleet1C[i].shakepid) clearInterval(fleet1C[i].shakepid);
			for (var j=0; j<fleet1C[i].graphic.children.length; j++) fleet1C[i].graphic.getChildAt(j).destroy();
			fleet1C[i].graphic.destroy();
		}
		for (var k=0; k<allfleets2.length; k++) {
			for (var i=0; i<allfleets2[k].length; i++) {
				var ship = allfleets2[k][i];
				if (ship.shakepid) clearInterval(ship.shakepid);
				for (var j=0; j<ship.graphic.children.length; j++) ship.graphic.getChildAt(j).destroy();
				ship.graphic.destroy();
			}
		}
		allfleets2 = [];
		stage.addChild(bg);
		radar1.scale.set(0); radar2.scale.set(0);
		stage.addChild(radar1);
		stage.addChild(radar2);
		// for (var i=0; i<dots1.children.length; i++) dots1.getChildAt(i).destroy();
		// for (var i=0; i<dots2.children.length; i++) dots2.getChildAt(i).destroy();
		// dots1.removeChildren(); dots2.removeChildren();
		while (dots1.children.length) recycle(dots1.getChildAt(0));
		while (dots2.children.length) recycle(dots2.getChildAt(0));
		console.log(SPRITEPOOL.dotGreen);
		dots1.alpha = dots2.alpha = 0;
		stage.addChild(dots1);
		stage.addChild(dots2);
		$('#plEngage').text('');
		$('#plEngageT').text('');
		$('#plAS1').text('');
		$('#plAS2').text('');
		updates = [];
		timeouts = [];
		eventqueue = [];
		fleet1 = [];
		fleet2 = [];
		e = 0;
		END = false;
		ecomplete = true;
		if (callback) callback();//setup();
		PAUSE = false;
		CANRESET = true;
	};
}

//-----------------------
function showAS(AS1,AS2) {
	AS1 = parseInt(AS1); AS2 = parseInt(AS2);
	$('#plAS1').text(['AD','AI','AP','AS','AS+'][AS1+2]);
	$('#plAS1').css('opacity','0');
	$('#plAS2').text(['AD','AI','AP','AS','AS+'][AS2+2]);
	$('#plAS2').css('opacity','0');
	
	if (AS1 > 0) $('#plAS1').css('color','green');
	else if (AS1 < 0) $('#plAS1').css('color','red');
	else $('#plAS1').css('color','black');
	
	if (AS2 > 0) $('#plAS2').css('color','green');
	else if (AS2 < 0) $('#plAS2').css('color','red');
	else $('#plAS2').css('color','black');
	
	var pid = setInterval(function() {
        var alph = parseFloat($('#plAS1').css('opacity'));
        if (alph >= 1) { clearInterval(pid); return; }
        $('#plAS1').css('opacity',alph+.02);
		alph = parseFloat($('#plAS2').css('opacity'));
        $('#plAS2').css('opacity',alph+.02);
    }, 1000/60);
}

var ENGAGEPIDS = [null,null];
function showEngage(engage) {
	$('#plEngage').text('');
	$('#plEngageT').text('');
	if (ENGAGEPIDS[0]) { clearInterval(ENGAGEPIDS[0]); ENGAGEPIDS[0] = null; }
	if (ENGAGEPIDS[1]) { clearTimeout(ENGAGEPIDS[1]); ENGAGEPIDS[1] = null; }
	var txt = '', extra = '';
	switch(parseFloat(engage)) {
		case 1:
			txt = 'Parallel'; break;
		case 0.8: 
		case 2:
			txt = 'Head-on'; break;
		case 0.6:
		case 4:
			txt = 'T-Cross: ';
			extra = 'Disadvantage';
			$('#plEngageT').css('color','red');
			break;
		case 1.2:
		case 3:
			txt = 'T-Cross: ';
			extra = 'Advantage';
			$('#plEngageT').css('color','green');
			break;
	}
	var i=0;
    ENGAGEPIDS[0] = setInterval(function() {
        var intxt = $('#plEngage').text();
        $('#plEngage').text(intxt+txt[i]);
        i++;
        if (i >= txt.length) {
            if (extra) {
				ENGAGEPIDS[1] = setTimeout(function() {
					$('#plEngageT').text(extra);
					ENGAGEPIDS[1] = null;
				},500);
			}
            clearInterval(ENGAGEPIDS[0]);
			ENGAGEPIDS[0] = null;
        }
    }, 150);
}

function setHPBar(side,percent) {
	// $('#plHP'+(side+1)).css('width',240*percent);
	var canvas = document.getElementById('plHP'+(side+1));
	if (!canvas || canvas.tagName != 'CANVAS') return;
	var c = canvas.getContext('2d');
	c.fillStyle = (side==0)?'#008000':'#ff0000';
	c.fillRect(0,0,canvas.width*percent,canvas.height);
}

function clearHPBar(side) {
	var canvas = document.getElementById('plHP'+(side+1));
	if (!canvas || canvas.tagName != 'CANVAS') return;
	var c = canvas.getContext('2d');
	c.clearRect(0,0,canvas.width,canvas.height);
}

function clickedBack() {
	if (e <= 1 || !started) return;
	PAUSE = true;
	console.log(e);
	setTimeout(function() {
		e--;
		while (!eventqueue[e][2] && e > 1) e--;
		console.log(e);
		updates = [];
		timeouts = [];
		ecomplete = true;
		// addTimeout(function() { ecomplete = true; }, 100);
		PAUSE = false;
		
		for (var i=0; i<stage.children.length; i++) {
			if (stage.getChildAt(i).notpersistent) { recycle(stage.getChildAt(i)); i--; }
		}
		shutterTop.y = -246; shutterBottom.y = 456; shutterTop.alpha = shutterBottom.alpha = .25;
		for (var i=0; i<fleet1.length; i++) {
			fleet1[i].graphic.x = fleet1[i].xorigin;
			if (fleet1[i].shakepid) clearInterval(fleet1[i].shakepid);
		}
		for (var i=0; i<fleet2.length; i++) {
			fleet2[i].graphic.x = fleet2[i].xorigin;
			if (fleet2[i].shakepid) clearInterval(fleet2[i].shakepid);
		}
		
		if (END) { END = false; animate(); }
	}, 100);
}

function clickedSkip() {

}

var HASLOADTEXT = false;
function loadCode(fromOwn) {
	if (!CANRESET) return;
	var f = function() {
		CANRESET = false;
		$('#error').text('');
		try { 
			if (!fromOwn) API = JSON.parse(document.getElementById("code").value);
			processAPI(API);
		} catch(e) {
			console.log(e);
			document.getElementById("error").innerHTML = 'Error';
			CANRESET = true;
			return;
		}
		started = true;
		CANRESET = true;
	};
	if (started) reset(f);
	else f();
	$('#error').text('Loading');
	HASLOADTEXT = true;

}



// }

console.log(code);
// setup();