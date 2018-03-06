var renderer = PIXI.autoDetectRenderer(800, 480,{backgroundColor : 0x000000});
document.getElementById('battlespace').appendChild(renderer.view);

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
	.add('shutter11','assets/512_res.common.ImgShutterTop.png')
	.add('shutter12','assets/510_res.common.ImgShutterBottom.png')
	.add('radar','assets/375_res.battle.images.ImgRaderBG.png')
	.add('nmiss','assets/Nmiss.png')
	.add('ccrit','assets/Ccrit.png')
	.add('dminor','assets/d383.png')
	.add('dmedium','assets/d385.png')
	.add('dmajor','assets/d387.png')
	.add('dfcf','assets/d403.png')
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
	.add('322','assets/322.png')
	.add('324','assets/324.png')
	.add('flare1','assets/86.png')
	.add('flaresmoke','assets/89.png')
	.add('flare2','assets/92.png')
	.add('flare3back','assets/478.png')
	.add('flare3','assets/481.png')
	.add('searchlight1','assets/96.png')
	.add('searchlight2','assets/100.png')
	.add('aswdown','assets/296.png')
	.add('aswup','assets/299.png')
	.add('dotOrange','assets/dotOrange.png')
	.add('216','assets/216.png')
	.add('aaci1','assets/aaci1.png')
	.add('aaci2','assets/aaci2.png')
	.add('tbomb1','assets/951.png')
	.add('tbomb2','assets/956.png')
	.add('shield','assets/221_shield_png$f90866d61f09304ed4b65cd1a8d0dbbc1744783129.png')
	.add('laser','assets/laser.png')
	.add('laserring','assets/laserring.png')
	.add('kleinfield','assets/kleinfield.png')
	.add('kleinfieldring','assets/kleinfieldring.png')
	.add('kleinfieldshine1','assets/kleinfieldshine1.png')
	.add('kleinfieldshine2','assets/kleinfieldshine2.png')
	.add('kleinfieldshine3','assets/kleinfieldshine3.png')
	.add('plane9','assets/plane9.png')
	.add('plane10','assets/plane10.png')
	.add('plane11','assets/plane11.png')
	.add('plane12','assets/plane12.png')
	.add('plane13','assets/plane13.png')
	.add('plane544','assets/plane544.png')
	.add('plane511','assets/plane511.png')
	.add('plane588','assets/plane588.png')
	.add('plane590','assets/plane590.png')
	.add('plane592','assets/plane592.png')
	.add('WG1','assets/684.png')
	.add('WG2','assets/687.png')
	.add('WG3','assets/690.png')
	.add('WG4','assets/693.png')
	.add('lc1','assets/LC1.png')
	.add('lc2','assets/LC2.png')
	.add('edou','assets/Edou.png')
	.add('ehan','assets/Ehan.png')
	.add('ekou','assets/Ekou.png')
	.add('esen','assets/Esen.png')
	.add('eT','assets/ET.png')
	.add('eji','assets/Eji.png')
	.add('eadv','assets/Eadv.png')
	.add('edisadv','assets/Edisadv.png')
	.add('airASP','assets/386_res.battle.images.SeikuuTextKakuhoImage.png')
	.add('airAD','assets/387_res.battle.images.SeikuuTextSoushitsuImage.png')
	.add('airAS','assets/388_res.battle.images.SeikuuTextYuseiImage.png')
	.add('contact','assets/contact.png')
	.add('contactnight','assets/contactnight.png')
	.add('p54','assets/p54.png')
	.add('p102','assets/p102.png')
	.add('p516','assets/p516.png')
	.add('p549','assets/p549.png')
	.add('repairteam','assets/Emergency_Repair_Personnel_042_Card.png')
	.add('repairgoddess','assets/Emergency_Repair_Goddess_043_Card.png')
	.add('bossbar','assets/bossbar.png')
	.add('mask','assets/mask.png');
for (var i=389; i <= 417; i+=2) loader.add(i.toString(),'assets/'+i+'.png');
for (var i=0; i<=9; i++) loader.add('C'+i,'assets/C'+i+'.png');
for (var i=0; i<=9; i++) loader.add('N'+i,'assets/N'+i+'.png');
var ALLLOADED = false;
loader.load(function() { ALLLOADED = true; });
var loader2 = new PIXI.loaders.Loader();
var SHIPSLOADED = true; //will be set to false in processAPI if PRELOADSHIPS == true
var PRELOADSHIPS = true;

// create a new Sprite using the texture
var bg = PIXI.Sprite.fromImage('assets/82_res.images.ImgBackgroundDay.jpg');
var bg2 = PIXI.Sprite.fromImage('assets/83_res.images.ImgBackgroundNight.jpg');

stage.addChild(bg);

var frames_exp = [];
for (var i=389; i <= 417; i+=2) frames_exp.push(PIXI.Texture.fromImage('assets/'+i+'.png'));

var COMBINED = false;
var PVPMODE = false;
var OLDFORMAT = false;

var FLEET2ORIGIN = 631;

var SM = new SoundManager();
if ($('#chkvoice')) $('#chkvoice').click(function() {
	if (this.checked) SM.turnOnVoice();
	else SM.turnOffVoice();
});

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

var fleet1 = [], fleet2 = [], fleet1C, fleet2C;
var fleetFriend = null;
var allfleets2 = [], allfleets2c = [];
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
	var name, path, nameM, pathM;
	if (side) {
		name = 'dotRed'; path = 'assets/467.png';
		nameM = 'dotRedC'; pathM = 'assets/322.png';
	} else {
		name = 'dotGreen'; path = 'assets/465.png';
		nameM = 'dotGreenC'; pathM = 'assets/473.png';
	}
	var nameC = (COMBINED==2)? 'dotYellow' : (COMBINED==3)? 'dotOrange' : 'dotBlue';
	var pathC = (COMBINED==2)? 'assets/469.png' : (COMBINED==3)? 'assets/dotOrange.png' : 'assets/471.png';
	if (side) { nameC = 'dotRedEC'; pathC = 'assets/324.png'; }
	form = parseInt(form);
	switch(form) {
		case 0:
		case 1:
			var space = (num > 6)? 13 : 15;
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
			var x = 8*Math.floor((num-1)/2);
			for (var i=-x; i<=x; i+=16) {
				for (var j=-8; j<=8; j+=16) {
					if (++c > num) break;
					var dot = getFromPool(name,path);
					var ii = (side==0)? -i : i;
					if (num > 6 && c == num && num % 2 == 1) dot.position.set(ii,0);
					else dot.position.set(ii,j);
					dot.anchor.set(.5);
					dot.scale.set(.67);
					container.addChild(dot);
				}
			}
			break;
		case 3:
			var coords;
			if (num >= 7) coords = [[0,0],[-27,0],[27,0],[-14,-24],[14,-24],[-14,24],[14,24]];
			else if (num == 6) coords = [[23,0],[-23,0],[0,21],[0,-21],[-8,0],[8,0]];
			else if (num == 5) coords = [[16,0],[-16,0],[0,16],[0,-16],[0,0]];
			else coords = [[0,0],[-16,0],[8,-14],[8,14]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(name,path);
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				dot.scale.set(.67);
				container.addChild(dot);
			}
			break;
		case 4:
			var space = (num > 6)? 9 : 10;
			for (var i=-space*(num-1)/2; i<=space*(num-1)/2; i+=space) {
				var dot = getFromPool(name,path);
				dot.position.set(i);
				dot.anchor.set(.5);
				dot.scale.set(.67);
				container.addChild(dot);
			}
			break;
		case 5:
			var space = (num > 6)? 13 : 15;
			for (var i=-space*(num-1)/2; i<=space*(num-1)/2; i+=space) {
				var dot = getFromPool(name,path);
				dot.y = i; dot.x = 0;
				dot.anchor.set(.5);
				dot.scale.set(.67);
				container.addChild(dot);
			}
			break;
		case 6: 
			var coords = [[11,12],[11,-12],[18,0],[-2,0],[-17,0],[-32,0],[32,0]];
			for (var i=0; i<num; i++) {
				var cx = (num <= 6)? coords[i][0] + 7 : coords[i][0];
				if (side) cx *= -1;
				var dot = getFromPool(name,path);
				dot.position.set(cx, coords[i][1]);
				dot.anchor.set(.5);
				dot.scale.set(.67);
				container.addChild(dot);
			}
			break;
		case 11:
			var coords = [[5,0],[10,30],[10,-30],[20,15],[20,-15],[30,0]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(nameM,pathM);
				var cx = (side)? -coords[i][0] : coords[i][0];
				dot.position.set(cx,coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			coords = [[-10,23],[-10,7],[-10,-7],[-10,-23],[-24,7],[-24,-7]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(nameC,pathC);
				var cx = (side)? -coords[i][0] : coords[i][0];
				dot.position.set(cx,coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			break;
		case 12:
			var coords = [[3,7],[3,-7],[16,0],[30,0],[30,17],[30,-17]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(nameM,pathM);
				var cx = (side)? -coords[i][0] : coords[i][0];
				dot.position.set(cx,coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			coords = [[-10,7],[-10,-7],[-23,7],[-23,-7],[-36,7],[-36,-7]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(nameC,pathC);
				var cx = (side)? -coords[i][0] : coords[i][0];
				dot.position.set(cx,coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			break;
		case 13:
			var coords = [[32,0],[-32,0],[14,30],[14,-30],[-14,30],[-14,-30]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(nameM,pathM);
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			coords = [[0,7],[0,-7],[-14,7],[-14,-7],[14,7],[14,-7]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(nameC,pathC);
				dot.position.set(coords[i][0],coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			break;
		case 14:
			var coords = [[12,7],[12,-7],[24,17],[24,0],[24,-17],[36,0]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(nameM,pathM);
				var cx = (side)? -coords[i][0] : coords[i][0];
				dot.position.set(cx,coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			coords = [[0,0],[-12,0],[-24,7],[-24,-7],[-36,7],[-36,-7]];
			for (var i=0; i<coords.length; i++) {
				var dot = getFromPool(nameC,pathC);
				var cx = (side)? -coords[i][0] : coords[i][0];
				dot.position.set(cx,coords[i][1]);
				dot.anchor.set(.5);
				container.addChild(dot);
			}
			break;
	}
}

var shutterTop = PIXI.Sprite.fromImage('assets/513_res.common.ImgShutterTopDark.png');
var shutterBottom = PIXI.Sprite.fromImage('assets/511_res.common.ImgShutterBottomDark.png');
var shutterTop2 = PIXI.Sprite.fromImage('assets/512_res.common.ImgShutterTop.png');
var shutterBottom2 = PIXI.Sprite.fromImage('assets/510_res.common.ImgShutterBottom.png');

var bossbar = new PIXI.Container();
var bossbarback = new PIXI.Graphics();
bossbarback.position.set(80,18);
bossbar.addChild(bossbarback);
bossbarback.beginFill(0xff0000);
bossbarback.drawRect(0,0,1,7);
bossbar.addChild(PIXI.Sprite.fromImage('assets/bossbar.png'));
bossBarReset();

var eventqueue = [];
var battlestarts = [];
var HPtotal1 = 0, HPtotal2 = 0, HPnow1 = 0, HPnow2 = 0;

function createShip(data,side,i,damaged) {
	var ship = new ShipG(i+((side==1)?10:0),side,parseInt(data[1]));
	var graphic = new PIXI.Container();
	var sdata = SHIPDATA[parseInt(data[0])];
	if (!sdata) sdata = SHIPDATA[0];
	var imgname = ((damaged && sdata.imageDam)? sdata.imageDam : sdata.image)
	var portrait = PIXI.Sprite.fromImage('assets/icons/'+imgname);
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
	graphic.position.set((side==1)?FLEET2ORIGIN+240:-240,((side==1)?144:77)+45*i);
	ship.graphic = graphic;

	if (data.length > 2) shipSetHP(ship,data[2]);
	var hasonlytorp;
	for (var j=3; j<=7; j++) {
		if (!data[j]) continue;
		var eq = EQDATA[data[j]];
		if (eq) {
			var eqt = EQTDATA[eq.type];
			if (eq.b_image) ship.planetypes.push(eq.b_image);
			else if (eqt.isfighter||eqt.istorpbomber||eqt.isdivebomber||eq.type==AUTOGYRO||eq.type==ASWPLANE) ship.planetypes.push(1+side);
			//else if (eq.type==SEAPLANE||eq.type==FLYINGBOAT) ship.planetypes.push(11);
			if (eqt.istorpbomber||eqt.isdivebomber||eq.type==AUTOGYRO||eq.type==ASWPLANE) ship.hasbomber = true;
			if (eqt.istorpbomber) ship.hastorpbomber = true;
			if (hasonlytorp == undefined && eq.type == TORPEDO) hasonlytorp = true;
			if ([MAINGUNS,MAINGUNM,MAINGUNL].indexOf(eq.type) != -1) hasonlytorp = false;
			if (eq.type == WG42) ship.hasWG = true;
			if (data[j] == 68 || data[j] == 166) ship.haslandingcraft1 = true;
			if (data[j] == 167) ship.haslandingcraft2 = true;
			if (eq.atype && eq.atype != A_GUN) ship.hasAAgear = true;
			if (eq.type == SEARCHLIGHTS || eq.type == SEARCHLIGHTL) ship.hassearchlight = true;
			if (data[j]==42) ship.hasrepairteam = (ship.hasrepairteam)? ship.hasrepairteam+1 : 1;
			if (data[j]==43) ship.hasrepairgoddess = (ship.hasrepairgoddess)? ship.hasrepairgoddess+1 : 1;
		}
	}
	ship.hasonlytorp = hasonlytorp;
	ship.issub = (sdata.type == 'SS' || sdata.type == 'SSV');
	ship.isinstall = (sdata.type == 'Installation' || sdata.installtype > 0);
	ship.isCV = (sdata.type == 'CV' || sdata.type == 'CVL' || sdata.type == 'CVB' || (sdata.type=='AO'&&ship.hasbomber));
	ship.isfog = (parseInt(data[0]) >= 2000 && parseInt(data[0]) <= 2100);
	if (sdata.nightattack==2) ship.nightgun = true;
	ship.shakepid = 0;
	ship.mid = data[0];
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
	PVPMODE = (root.world <= 0);
	OLDFORMAT = !!data.api_maxhps; //new format 2017-11-17
	
	if (root.now_maphp && root.max_maphp) {
		bossbar.maxhp = root.max_maphp;
		bossbar.nowhp = root.now_maphp;
		bossbar.mode = 2;
		bossbar.show = true;
	} else if (root.defeat_count != undefined && MAPDATA[root.world] && MAPDATA[root.world].maps[root.mapnum] && root.defeat_count < MAPDATA[root.world].maps[root.mapnum].bossHP) {
		bossbar.maxhp = (MAPDATA[root.world].maps[root.mapnum].bossHP)? MAPDATA[root.world].maps[root.mapnum].bossHP : 5;
		bossbar.nowhp = Math.max(1,bossbar.maxhp - root.defeat_count);
		bossbar.mode = 1;
		bossbar.show = true;
	} else bossbar.show = false;
	
	var battlenumstate = 0;
	var getState = function(newbattle) {
		if (newbattle) {
			battlenumstate++;
		}
		var state = {
			HP: {
				fleet1: [],
				fleet1C: [],
			},
			bg:(bg.parent)? 1 : 2,
			battle:battlenumstate
		};
		for (var i=0; i<fleet1.length; i++) state.HP.fleet1.push(fleet1[i].hpTrack);
		for (var i=0; i<fleet1C.length; i++) state.HP.fleet1C.push(fleet1C[i].hpTrack);
		return state;
	};
	battlestarts = [];
	//create skip buttons
	var bspace = $('#skipbuttonspace');
	if (bspace.length) {
		bspace.html('');
		for (let i=0; i<root.battles.length; i++) {
			if (Object.keys(root.battles[i].data).length==0 && Object.keys(root.battles[i].yasen).length==0) continue;
			var letter, edges = EDGES['World '+root.world+'-'+root.mapnum];
			if (edges && edges[root.battles[i].node]) letter = edges[root.battles[i].node][1];
			else letter = (root.battles[i].node <= 26)? String.fromCharCode(64+root.battles[i].node) : '-';
			bspace.append(() => {
				return $('<input>')
					.attr('type', 'button')
					.addClass('mdl-button mdl-js-button mdl-button--raised mdl-button--colored')
					.val(letter)
					.click(() => {
						skipToBattle(i + 1)
					})
			})
		}
	}
	
	loader2.reset();
	if (PRELOADSHIPS) SHIPSLOADED = false;
	//load friendly ships
	var fleet = 'fleet'+root.fleetnum;
	var fships = [], fequips = [], fshipsC = [], fequipsC = [];
	for (var i=0; i<root[fleet].length; i++) {
		if(!root[fleet][i] || root[fleet][i] == -1) continue;
		fships.push(root[fleet][i].mst_id);
		fequips.push(root[fleet][i].equip);
		if (!SHIPDATA[root[fleet][i].mst_id]) continue;
		loader2.add('ship'+i,'assets/icons/'+SHIPDATA[root[fleet][i].mst_id].image);
	}
	if (root.combined) {
		for (var i=0; i<root.fleet2.length; i++) {
			if(!root.fleet2[i] || root.fleet2[i] == -1) continue;
			fshipsC.push(root.fleet2[i].mst_id);
			fequipsC.push(root.fleet2[i].equip);
			if (!SHIPDATA[root.fleet2[i].mst_id]) continue;
			loader2.add('ship'+i+'C','assets/icons/'+SHIPDATA[root.fleet2[i].mst_id].image);
		}
	}
	fleet1 = []; fleet2 = []; fleet1C = []; fleet2C = [];
	HPtotal1 = 0; HPtotal2 = 0;
	if (root.combined) {
		for (var i=0; i<fshipsC.length; i++) {  //create ship objects (combined)
			if (!fshipsC[i] || fshipsC[i]==-1) continue;
			var maxhp, nowhp;
			if (data.api_f_maxhps_combined) { //new format 2017-11-17
				maxhp = data.api_f_maxhps_combined[i];
				nowhp = data.api_f_nowhps_combined[i];
			} else {
				maxhp = data.api_maxhps_combined[i+1];
				nowhp = data.api_nowhps_combined[i+1];
			}
			var d = [fshipsC[i], maxhp, nowhp]; //[id, maxhp, nowhp, plane1, plane2, plane3, plane4]
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
			fleet1C[i].hpTrack = nowhp;
		}
	}
	for (var i=0; i<fships.length; i++) {  //create ship objects
		if (!fships[i] || fships[i]==-1) continue;
		var maxhp, nowhp;
		if (data.api_f_maxhps) { //new format 2017-11-17
			maxhp = data.api_f_maxhps[i];
			nowhp = data.api_f_nowhps[i];
		} else {
			maxhp = data.api_maxhps[i+1];
			nowhp = data.api_nowhps[i+1];
		}
		var d = [fships[i], maxhp, nowhp]; //[id, maxhp, nowhp, plane1, plane2, plane3, plane4]
		for (var j=0; j<fequips[i].length; j++) {
			if (fequips[i][j] == -1) break;
			d.push(fequips[i][j]);
		}
		fleet1.push(createShip(d,0,i));
		dots1.y = radar1.y = (fships.length >= 7)? 429 : 402;
		stage.addChild(fleet1[i].graphic);
		fleet1[i].hpTrack = nowhp;
	}
	
	for (var b=0; b<root.battles.length; b++) {
		// console.log(root.battles[b]);
		data = root.battles[b].data;
		if (Object.keys(data).length <= 0) data = root.battles[b].yasen;
		if (Object.keys(data).length <= 0) continue;
		if (!data.api_formation) continue; //Fall 2016 battles didn't have some boss node data recorded, skip it. Later, add a way to play just NB if recorded?
		
		var f2 = [], f2c = [];
		//load enemies
		if (data.api_ship_ke[0] == -1) data.api_ship_ke = data.api_ship_ke.slice(1);
		//2017-04-05 abyssal MIDs incremented by 1000, handle old replays (skip PVP and from simulator)
		if (!PVPMODE && !root.source) {
			for (var i=0; i<data.api_ship_ke.length; i++) {
				if (data.api_ship_ke[i] == -1) continue;
				if (data.api_ship_ke[i] < 1000) data.api_ship_ke[i] += 1000;
			}
		}
		for (var i=0; i<data.api_ship_ke.length; i++) {
			if (!data.api_ship_ke[i] || data.api_ship_ke[i] == -1) continue;
			if (SHIPDATA[data.api_ship_ke[i]])
				loader2.add('ship'+b+i,'assets/icons/'+SHIPDATA[data.api_ship_ke[i]].image);
			else
				loader2.add('ship'+b+i,'assets/icons/K.png');
			var maxhp, nowhp;
			if (data.api_e_maxhps) { //new format 2017-11-17
				maxhp = data.api_e_maxhps[i];
				nowhp = data.api_e_nowhps[i];
			} else {
				maxhp = data.api_maxhps[i+7];
				nowhp = data.api_nowhps[i+7];
			}
			var d = [data.api_ship_ke[i],maxhp,nowhp];
			if (data.api_eSlot[0] == -1) data.api_eSlot = data.api_eSlot.slice(1);
			for (var j=0; j<data.api_eSlot[i].length; j++) {
				if (data.api_eSlot[i][j] == -1) break;
				d.push(data.api_eSlot[i][j]);
			}
			var sh = createShip(d,1,i,data.api_boss_damaged);
			f2.push(sh);
		}
		//load enemy combined
		if (data.api_ship_ke_combined) {
			if (data.api_ship_ke_combined[0] == -1) data.api_ship_ke_combined = data.api_ship_ke_combined.slice(1);
			if (!PVPMODE && !root.source) {
				for (var i=0; i<data.api_ship_ke_combined.length; i++) {
					if (data.api_ship_ke_combined[i] == -1) continue;
					if (data.api_ship_ke_combined[i] < 1000) data.api_ship_ke_combined[i] += 1000;
				}
			}
			for (var i=0; i<data.api_ship_ke_combined.length; i++) {
				if (!data.api_ship_ke_combined[i] || data.api_ship_ke_combined[i] == -1) continue;
				if (SHIPDATA[data.api_ship_ke_combined[i]])
					loader2.add('shipc'+b+i,'assets/icons/'+SHIPDATA[data.api_ship_ke_combined[i]].image);
				else
					loader2.add('shipc'+b+i,'assets/icons/K.png');
				var maxhp, nowhp;
				if (data.api_e_maxhps_combined) { //new format 2017-11-17
					maxhp = data.api_e_maxhps_combined[i];
					nowhp = data.api_e_nowhps_combined[i];
				} else {
					maxhp = data.api_maxhps_combined[i+7];
					nowhp = data.api_nowhps_combined[i+7];
				}
				var d = [data.api_ship_ke_combined[i],maxhp,nowhp];
				if (data.api_eSlot_combined[0] == -1) data.api_eSlot_combined = data.api_eSlot_combined.slice(1);
				for (var j=0; j<data.api_eSlot_combined[i].length; j++) {
					if (data.api_eSlot_combined[i][j] == -1) break;
					d.push(data.api_eSlot_combined[i][j]);
				}
				var sh = createShip(d,1,i,data.api_boss_damaged);
				f2c.push(sh);
				sh.xorigin = 465; sh.graphic.x = 465;
				var mask = new PIXI.Sprite.fromImage('assets/mask.png');
				mask.scale.x = -1;
				mask.x = 175;
				sh.graphic.mask = mask;
				sh.mask = mask;
				sh.graphic.addChild(mask);
				sh.escorte = true;
				sh.graphic.y += 480;
			}
		}
		
		var nowhps = data.api_f_nowhps || data.api_nowhps.slice(1);
		for (var i=0, j=0; i<fleet1.length; i++) {
			if (fleet1[i].hpTrack <= 0) continue; //sunk ship not in api, known bug: does not handle shifted api IDs later (ship 5 sinks, ship 6 becomes 5), will not fix for now due to existing replays without all equipment included, and sinking is rare
			fleet1[i].hpTrack = nowhps[j];
			j++;
		}
		if (COMBINED) {
			nowhps = data.api_f_nowhps_combined || data.api_nowhps_combined.slice(1);
			for (var i=0, j=0; i<fleet1C.length; i++) {
				if (fleet1C[i].hpTrack <= 0) continue;
				fleet1C[i].hpTrack = nowhps[j];
				j++;
			}
		}
		var NBonly = (!!data.api_hougeki || Object.keys(data).length <= 0 || data.api_n_hougeki1);
		var battledata = [data.api_formation[2],data.api_formation[0],data.api_formation[1],0,0,(NBonly)?1:0];
		var escape = [[],[]];
		if (data.api_escape_idx) escape[0] = data.api_escape_idx;
		if (data.api_escape_idx_combined) escape[1] = data.api_escape_idx_combined;
		try {
			var bgm, map = MAPDATA[root.world].maps[root.mapnum];
			var letter = (window['EDGES'] && EDGES['World '+root.world+'-'+root.mapnum])? EDGES['World '+root.world+'-'+root.mapnum][root.battles[b].node][1].charCodeAt()-64 : root.battles[b].node;
			var letterOrig = (window['EDGES'] && EDGES['World '+root.world+'-'+root.mapnum])? EDGES['World '+root.world+'-'+root.mapnum][root.battles[b].node][1] : root.battles[b].node;
			var isboss = (Array.isArray(map.bossnode))? (map.bossnode.indexOf(letter) != -1 || map.bossnode.indexOf(letterOrig) != -1) : (map.bossnode==letter);
			if (isboss) bgm = (NBonly)? map.bgmNB : map.bgmDB;
			else bgm = (NBonly)? map.bgmNN : map.bgmDN;
			var orel = false; if (root.world==2 && root.mapnum==3) { //orel cruise
				var allsub = true;
				for (var i=0; i<fleet1.length; i++) if (!fleet1[i].issub) allsub = false;
				if (allsub) { bgm = 999; isboss = false; orel = true; }
			}
		} catch(e) { var bgm = (NBonly)?2:1, orel = false, isboss = false, map = {bgmNB:2,bgmDB:2,bgmNN:2,bgmDN:1}; }
		if (b>0) {
			eventqueue.push([wait,[3000,(isboss||(NBonly && map.bgmDN!=map.bgmNN))]]);
			eventqueue.push([shuttersNextBattle,[battledata,f2]]);
		}
		eventqueue.push([battleStart,[battledata,f2,f2c,escape,bgm,(isboss&&bossbar.show)],getState(true)]);
		battlestarts.push(eventqueue.length-1);
		allfleets2.push(f2);
		allfleets2c.push(f2c);
		
		var handleRepair = function(fleet) {
			for (var i=0; i<fleet.length; i++) {
				if (fleet[i].hpTrack <= 0) {
					if (fleet[i].hasrepairgoddess) {
						fleet[i].hpTrack = fleet[i].hpmax
						eventqueue.push([wait,[1000]]);
						eventqueue.push([repairTeam,[fleet[i],true]]);
						fleet[i].hasrepairgoddess--;
					} else if (fleet[i].hasrepairteam) {
						fleet[i].hpTrack = Math.floor(fleet[i].hpmax/5);
						eventqueue.push([wait,[1000]]);
						eventqueue.push([repairTeam,[fleet[i],false]]);
						fleet[i].hasrepairteam--;
					}
				}
			}
		}
		
		//for reading air phase
		var processKouku = function(kouku,isbombing,isjet) {
			if (kouku && kouku.api_plane_from && ((kouku.api_plane_from[0] && kouku.api_plane_from[0][0] != -1) || (kouku.api_plane_from[1] && kouku.api_plane_from[1][0] != -1))) {
				//air state
				var AS1 = {0:0,1:2,2:1,3:-1,4:-2}[kouku.api_stage1.api_disp_seiku];
				if (AS1 > 2) AS1 = -AS1+2;
				var AS2 = -AS1;
				var shots = [];
				//attackers
				var attackdata = [];
				var attackers = [];
				if (kouku.api_plane_from[0] && kouku.api_plane_from[0][0] != -1) {
					for (var i=0; i<kouku.api_plane_from[0].length; i++) {
						var ship = (isbombing)? kouku.api_plane_from[0][i] : (kouku.api_plane_from[0][i]<7 || fleet1.length >= 7)? fleet1[kouku.api_plane_from[0][i]-1] : fleet1C[kouku.api_plane_from[0][i]-7];
						if (isbombing && kouku.api_squadron_plane.length <= i) continue;
						attackdata.push([ship,[],[]]);
						if (isbombing) {
							var eqid = kouku.api_squadron_plane[i].api_mst_id;
							if (EQDATA[eqid]) attackdata[i].push((EQDATA[eqid].b_image)? EQDATA[eqid].b_image : 1);
							else attackdata[i].push(13);
						}
						attackers.push(ship);
					}
				}
				if (kouku.api_plane_from[1] && kouku.api_plane_from[1][0] != -1) {
					for (var i=0; i<kouku.api_plane_from[1].length; i++) {
						var slot = kouku.api_plane_from[1][i];
						if (slot > 6) slot -= 6;
						attackdata.push([f2[slot-1],[],[]]);
						attackers.push(f2[slot-1]);
					}
				}
				//defenders
				var defenders = [];
				if (kouku.api_plane_from[1] && kouku.api_plane_from[1][0] != -1) {
					var anyAA = false;
					for (var i=0; i<fleet1.length; i++) {
						if (fleet1[i].hasAAgear) { defenders.push(fleet1[i]); anyAA = true; }
					}
					if (!anyAA && ((kouku.api_stage1 && kouku.api_stage1.api_e_lostcount) || (kouku.api_stage2 && kouku.api_stage2.api_e_lostcount))) defenders.push(fleet1[0]);
				}
				if (kouku.api_plane_from[0] && kouku.api_plane_from[0][0] != -1) {
					var anyAA = false;
					for (var i=0; i<f2.length; i++) {
						if (f2[i].hasAAgear) { defenders.push(f2[i]); anyAA = true; }
					}
					if (!anyAA && ((kouku.api_stage1 && kouku.api_stage1.api_f_lostcount) || (kouku.api_stage2 && kouku.api_stage2.api_f_lostcount))) defenders.push(f2[0]);
				}
				//shoot down
				for (var i=0; i<2; i++) {
					for (var j=0; j<2; j++) {
						var fleet = (i==0)? fleet1 : f2; var l = (i==0)? 'f':'e';
						var kstage = (j==0)? kouku.api_stage1 : kouku.api_stage2;
						if (!kstage) continue;
						var carriers = [];
						if (isbombing && i==0) {
							for (var k=0; k<attackdata.length; k++) {
								if (!(attackdata[k][0]-1)) continue;
								carriers.push(attackdata[k][0]-7);
								carriers.push(attackdata[k][0]-7);
							}
						} else {
							for (var k=0; k<fleet.length; k++) {
								if (attackers.indexOf(fleet[k]) == -1) continue;
								for (var kk=0; kk<Math.min(3,fleet[k].planetypes.length); kk++) carriers.push(k);
							}
						}
						carriers = shuffle(carriers);
						//if (isbombing) console.log(carriers);
						var numplane = carriers.length;
						var percent = kstage['api_'+l+'_lostcount']/Math.max(1,kstage['api_'+l+'_count']);
						var num = 2*numplane*percent;
						var numshot = Math.min(numplane,Math.ceil(num));
						var numdestroy = Math.max(0,Math.floor(num-numplane));
						// console.log(''+i+j+' '+num+' '+numshot+' '+numdestroy+' '+numplane);
						// console.log(carriers);
						for (var k=0; k<carriers.length; k++) {
							var ship = (isbombing && i==0)? carriers[k]+7 : fleet[carriers[k]];
							var ind = attackers.indexOf(ship);
							if (k<numdestroy) attackdata[ind][j+1].push(2);
							else if (k<numshot) attackdata[ind][j+1].push(1);
							else attackdata[ind][j+1].push(0);
						}
					}
				}
				//anti air cut-in
				var AACI1 = -1;
				if (kouku.api_stage2 && kouku.api_stage2.api_air_fire) AACI1 = kouku.api_stage2.api_air_fire.api_idx;
				//targets
				var targetdata = [];
				if (kouku.api_stage3) {
					for (var i=0; i<Math.max(fleet1.length,f2.length); i++) {
						var ind = (OLDFORMAT)? i+1 : i;
						if (kouku.api_stage3.api_fdam) {
							var dam = parseInt(kouku.api_stage3.api_fdam[ind]);  //remember later, .1 = protect
							var hit = (kouku.api_stage3.api_frai_flag[ind] || kouku.api_stage3.api_fbak_flag[ind]);
							if (hit) {
								targetdata.push([fleet1[i],(dam>0)? dam:0,(dam!=kouku.api_stage3.api_fdam[ind]),kouku.api_stage3.api_fcl_flag[ind],kouku.api_stage3.api_frai_flag[ind]]);
								fleet1[i].hpTrack -= Math.floor(dam);
							}
						}
						
						if (kouku.api_stage3.api_edam) {
							var dam = parseInt(kouku.api_stage3.api_edam[ind]);
							hit = (kouku.api_stage3.api_erai_flag[ind] || kouku.api_stage3.api_ebak_flag[ind]);
							if (hit) targetdata.push([f2[i],(dam>0)? dam:0,(dam!=kouku.api_stage3.api_edam[ind]),kouku.api_stage3.api_ecl_flag[ind],kouku.api_stage3.api_erai_flag[ind]]);
						}
						
						if (kouku.api_stage3_combined) {
							if (kouku.api_stage3_combined.api_fdam) {
								var dam = parseInt(kouku.api_stage3_combined.api_fdam[ind]);  //remember later, .1 = protect
								var hit = (kouku.api_stage3_combined.api_frai_flag[ind] || kouku.api_stage3_combined.api_fbak_flag[ind]);
								if (hit) {
									targetdata.push([fleet1C[i],(dam>0)? dam:0,(dam!=kouku.api_stage3_combined.api_fdam[ind]),kouku.api_stage3_combined.api_fcl_flag[ind],kouku.api_stage3_combined.api_frai_flag[ind]]);
									fleet1C[i].hpTrack -= Math.floor(dam);
								}
							}
							if (kouku.api_stage3_combined.api_edam) {
								var dam = parseInt(kouku.api_stage3_combined.api_edam[ind]);  //remember later, .1 = protect
								var hit = (kouku.api_stage3_combined.api_erai_flag[ind] || kouku.api_stage3_combined.api_ebak_flag[ind]);
								if (hit) targetdata.push([f2c[i],(dam>0)? dam:0,(dam!=kouku.api_stage3_combined.api_edam[ind]),kouku.api_stage3_combined.api_ecl_flag[ind],kouku.api_stage3_combined.api_erai_flag[ind]]);
							}
						}
					}
				}
				var show = false;
				if (kouku.api_plane_from[0] && kouku.api_plane_from[0][0] != -1)
					for (var i=0; i<f2.length; i++) if (!f2[i].issub) { show = true; break; }
				if (!show && kouku.api_plane_from[1] && kouku.api_plane_from[1][0] != -1)
					for (var i=0; i<fleet1.length; i++) if (!fleet1[i].issub) { show = true; break; }
				if (targetdata.length || show) {
					eventqueue.push([wait,[1000]]);
					var contact1, contact2;
					if (kouku.api_stage1.api_touch_plane) {
						contact1 = kouku.api_stage1.api_touch_plane[0];
						contact2 = kouku.api_stage1.api_touch_plane[1];
					}
					eventqueue.push([GAirPhase,[attackdata,targetdata,defenders,AACI1,undefined,contact1,contact2,AS1,AS2,false,isbombing,isjet],getState()]);  //remember AACI
				}
				
				handleRepair(fleet1);
				handleRepair(fleet1C);
			}
		};
		
		//for reading torpedo phase
		var processRaigeki = function(rai,f1,ecombined) {
			var shots = [];
			var num = Math.max(rai.api_frai.length, rai.api_erai.length);
			for (var i=0; i<num; i++) {
				if (OLDFORMAT) {
					if (rai.api_frai[i+1] > 0) {
						var target;
						if (ecombined && rai.api_frai[i+1] >= 7) target = f2c[rai.api_frai[i+1]-7];
						else target = f2[rai.api_frai[i+1]-1];
						var attacker = (i>=6)? f1[i-6] : f1[i];
						var crit = (rai.api_fcl[i+1] == 2);
						shots.push([attacker,target,rai.api_fydam[i+1],crit]);
						target.hpTrack -= Math.floor(rai.api_edam[i+1]);
					}
					if (rai.api_erai[i+1] > 0) {
						var target;
						if (ecombined) target = (rai.api_erai[i+1]>=7)? f1[rai.api_erai[i+1]-7] : fleet1[rai.api_erai[i+1]-1];
						else target = f1[rai.api_erai[i+1]-1];
						var attacker = (ecombined)? f2c[i-6] : f2[i];
						var crit = (rai.api_ecl[i+1] == 2);
						shots.push([attacker,target,rai.api_eydam[i+1],crit]);
						target.hpTrack -= Math.floor(rai.api_fdam[i+1]);
					}
				} else {
					if (rai.api_frai[i] > -1) {
						var ind = rai.api_frai[i];
						var target = (ind >= 6 && f2.length < 7)? f2c[ind-6] : f2[ind];
						var attacker = (i >= 6 && fleet1.length < 7)? fleet1C[i-6] : fleet1[i];
						var crit = (rai.api_fcl[i] == 2);
						shots.push([attacker,target,rai.api_fydam[i],crit]);
						target.hpTrack -= Math.floor(rai.api_fydam[i]);
					}
					if (rai.api_erai[i] > -1) {
						var ind = rai.api_erai[i];
						var target = (ind >= 6 && fleet1.length < 7)? fleet1C[ind-6] : fleet1[ind];
						var attacker = (i >= 6 && f2.length < 7)? f2c[i-6] : f2[i];
						var crit = (rai.api_ecl[i] == 2);
						shots.push([attacker,target,rai.api_eydam[i],crit]);
						target.hpTrack -= Math.floor(rai.api_eydam[i]);
					}
				}
			}
			if (shots.length) {
				eventqueue.push([wait,[1000]]);
				eventqueue.push([GTorpedoPhase,[shots],getState()]);
			}
			
			handleRepair(fleet1);
			handleRepair(fleet1C);
		};
		
		//for reading shelling phase
		var processHougeki = function(hou,f1,ecombined) {
			for (var j=0; j<hou.api_at_list.length; j++) {
				if (hou.api_at_list[j] == -1) continue;
				var d = [];
				
				var attacker;
				if (ecombined) {
					if (OLDFORMAT) {
						if (hou.api_at_eflag[j]) attacker = (hou.api_at_list[j]>6)? f2c[hou.api_at_list[j]-7] : f2[hou.api_at_list[j]-1];
						else attacker = (hou.api_at_list[j]>6)? fleet1C[hou.api_at_list[j]-7] : fleet1[hou.api_at_list[j]-1];
					} else {
						var ind = hou.api_at_list[j];
						if (hou.api_at_eflag[j]) attacker = (ind >= 6 && f2.length < 7)? f2c[ind-6] : f2[ind];
						else attacker = (ind >= 6 && fleet1.length < 7)? fleet1C[ind-6] : fleet1[ind];
					}
				} else {
					if (hou.api_at_eflag) { //new format 2017-11-17
						var fleet = (hou.api_at_eflag[j])? f2 : f1;
						var ind = hou.api_at_list[j];
						if (ind >= 6 && fleet.length < 7) ind -= 6; //combined
						attacker = fleet[ind];
					} else {
						attacker = (hou.api_at_list[j]>6)? f2[hou.api_at_list[j]-7] : f1[hou.api_at_list[j]-1];
					}
				}
				d.push(attacker); //attacker
				
				var defender;
				if (ecombined) {
					if (OLDFORMAT) {
						if (!hou.api_at_eflag[j]) defender = (hou.api_df_list[j][0]>6)? f2c[hou.api_df_list[j][0]-7] : f2[hou.api_df_list[j][0]-1];
						else defender = (hou.api_df_list[j][0]>6)? fleet1C[hou.api_df_list[j][0]-7] : fleet1[hou.api_df_list[j][0]-1];
					} else {
						var ind = hou.api_df_list[j][0];
						if (hou.api_at_eflag[j]) defender = (ind >= 6 && fleet1.length < 7)? fleet1C[ind-6] : fleet1[ind];
						else defender = (ind >= 6 && f2.length < 7)? f2c[ind-6] : f2[ind];
					}
				} else {
					if (hou.api_at_eflag) { //new format 2017-11-17
						var fleet = (hou.api_at_eflag[j])? f1 : f2;
						var ind = hou.api_df_list[j][0];
						if (ind >= 6 && fleet.length < 7) ind -= 6;
						defender = fleet[ind];
					} else {
						defender = (hou.api_df_list[j][0]>6)? f2[hou.api_df_list[j][0]-7] : f1[hou.api_df_list[j][0]-1];
					}
				}
				d.push(defender); //target
				
				for (var k=0; k<hou.api_damage[j].length; k++) {
					d.push(parseInt(hou.api_damage[j][k])); //damage
					defender.hpTrack -= Math.max(0,Math.floor(hou.api_damage[j][k]));
				}
				for (var k=0; k<hou.api_cl_list[j].length; k++) d.push((hou.api_cl_list[j][k]==2));
				d.push((hou.api_damage[j][0] != Math.floor(hou.api_damage[j][0])));
				
				switch(hou.api_at_type[j]) {
					case 0:
						if (d[1].issub) {
							if (d[0].hasbomber) eventqueue.push([shootPlane,d,getState()]);
							else eventqueue.push([shootASW,d,getState()]);
						}
						else if (d[0].isCV) eventqueue.push([shootPlane,d,getState()]);
						else if (d[1].isinstall) {
							if (d[0].haslandingcraft2) { d.push(2); eventqueue.push([shootLandingCraft,d,getState()]); }
							else if (d[0].haslandingcraft1) { d.push(1); eventqueue.push([shootLandingCraft,d,getState()]); }
							else if (d[0].hasWG) eventqueue.push([shootWG,d,getState()]);
							else eventqueue.push([shoot,d,getState()]);
						} else eventqueue.push([shoot,d,getState()]);
						break;
					case 1:
						var targets = [];
						for (var t=0; t<hou.api_df_list[j].length; t++) {
							if (ecombined) {
								if (hou.api_at_eflag[j]) targets.push((hou.api_df_list[j][t]>6)? fleet1C[hou.api_df_list[j][t]-7] : fleet1[hou.api_df_list[j][t]-1]);
								else targets.push((hou.api_df_list[j][t]>6)? f2c[hou.api_df_list[j][t]-7] : f2[hou.api_df_list[j][t]-1]);
							} else {
								targets.push((hou.api_df_list[j][t]>6)? f2[hou.api_df_list[j][t]-7] : f1[hou.api_df_list[j][t]-1]);
							}
						}
						eventqueue.push([shootLaser,[d[0],targets,hou.api_damage[j]]]);
						break; //laser
					case 2:
						eventqueue.push([shootDA,d,getState()]); break;
					case 3:
					case 4:
					case 5:
					case 6:
						eventqueue.push([shootCutIn,d,getState()]); break;
					case 7:
						eventqueue.push([shootPlaneCutIn,d,getState()]); break;
				}
				
				handleRepair(fleet1);
				handleRepair(fleet1C);
				
			}
		};
		
		var processYasenHougeki = function(hou) {
			for (var j=0; j<hou.api_at_list.length; j++) {
				if (hou.api_at_list[j] == -1) continue;
				var d = [];
				if (hou.api_at_eflag) { //new format 2017-11-17
					var ind = hou.api_at_list[j], attacker;
					if (hou.api_at_eflag[j]) {
						attacker = (ind >= 6 && f2.length < 7)? f2c[ind-6] : f2[ind];
					} else {
						attacker = (ind >= 6 && fleet1.length < 7)? fleet1C[ind-6] : fleet1[ind];
					}
					d.push(attacker);
					var ind = hou.api_df_list[j][0], target;
					if (hou.api_at_eflag[j]) {
						target = (ind >= 6 && fleet1.length < 7)? fleet1C[ind-6] : fleet1[ind];
					} else {
						target = (ind >= 6 && f2.length < 7)? f2c[ind-6] : f2[ind];
					}
					d.push(target);
				} else {
					d.push( (hou.api_at_list[j]>6)? f2e[hou.api_at_list[j]-7] : f1[hou.api_at_list[j]-1] ); //attacker
					d.push( (hou.api_df_list[j][0]>6)? f2e[hou.api_df_list[j][0]-7] : f1[hou.api_df_list[j][0]-1] ); //target
				}
				for (var k=0; k<hou.api_damage[j].length; k++) {
					d.push(parseInt(hou.api_damage[j][k])); //damage
					d[1].hpTrack -= Math.max(0,Math.floor(hou.api_damage[j][k]));
				}
				for (var k=0; k<hou.api_cl_list[j].length; k++) d.push((hou.api_cl_list[j][k]==2));
				d.push((hou.api_damage[j][0] != Math.floor(hou.api_damage[j][0])));
				
				switch(hou.api_sp_list[j]) {
					case 0:
						if (d[0].isCV && (!d[0].nightgun || (hou.api_n_mother_list && hou.api_n_mother_list[j]))) eventqueue.push([shootPlane,d,getState()]);
						else if (d[1].isinstall) {
							if (d[0].haslandingcraft2) { d.push(2); eventqueue.push([shootLandingCraft,d,getState()]); }
							else if (d[0].haslandingcraft1) { d.push(1); eventqueue.push([shootLandingCraft,d,getState()]); }
							else if (d[0].hasWG) eventqueue.push([shootWG,d,getState()]);
							else eventqueue.push([shoot,d,getState()]);
						} else if (d[1].issub) eventqueue.push([shootASW,d,getState()]);
						else if (d[0].issub || d[0].hasonlytorp) eventqueue.push([shootTorp,d,getState()]);
						else eventqueue.push([shoot,d,getState()]); break;  //add ASW and plane in somehow
					case 1:
						eventqueue.push([shootDA,d,getState()]); break;
					case 2:
					case 3:
						d[2] += d[3]; d[3] = (d[4]||d[5]); d[4] = d[6];
						eventqueue.push([shootBigTorp,d,getState()]); break;
					case 4:
						d[2] += Math.max(0,d[3]); d[3] = (d[4]||d[5]); d[4] = d[6];
						eventqueue.push([shootBigGun,d,getState()]); break;
					case 5:
						d[2] += Math.max(0,d[3]); d[3] = (d[4]||d[5]); d[4] = d[6];
						eventqueue.push([shootSpecialGun,d,getState()]); break;
					case 6:
						d[2] += Math.max(0,d[3]); d[2] += Math.max(0,d[4]);
						d.splice(3,2);
						eventqueue.push([shootPlaneCutIn,d,getState()]); break;
					case 7:
					case 8:
						d[2] += Math.max(0,d[3]); d[2] += Math.max(0,d[4]);
						d.splice(3,2);
						eventqueue.push([shootBigTorp,d,getState()]); break;
				}
				
				handleRepair(fleet1);
				handleRepair(fleet1C);
			}
		}
		
		var processSupport = function(flag,info) {
			if (info.api_support_hourai) {
				var support = info.api_support_hourai;
				var damages = [];
				for (var i=0; i<support.api_damage.length; i++) {
					damages.push(Math.floor(support.api_damage[i]));
				}
				if (damages[0] == -1) damages = damages.slice(1);
				eventqueue.push([GSupportPhase,[[],damages,(flag==3)]]);
			} else if (info.api_support_airatack) {
				var stage3 = info.api_support_airatack.api_stage3;
				var targetdata = [];
				for (var i=0; i<stage3.api_edam.length; i++) {
					if (stage3.api_edam[i] == -1) continue;
					if (stage3.api_ebak_flag[i] || stage3.api_erai_flag[i]) {
						if (i<=5+1*OLDFORMAT) targetdata.push([f2[i-1*OLDFORMAT],Math.floor(stage3.api_edam[i])]);
						else targetdata.push([f2c[i-6-1*OLDFORMAT],Math.floor(stage3.api_edam[i])]);
					}
				}
				eventqueue.push([GAirPhase,[[1,1],targetdata,[],-1,-1,-1,-1,false,false,true]]);
			}
		}
		
		//------------------------------
		
		//night first
		if (data.api_n_hougeki1) {
			eventqueue.push([NBstart,[data.api_flare_pos,data.api_touch_plane,(orel)?999:(isboss)? map.bgmNB : map.bgmNN, data.api_ship_ke_combined]]);
			if (data.api_n_support_flag) {
				processSupport(data.api_n_support_flag, data.api_n_support_info);
			}
			if (data.api_n_hougeki1 && data.api_n_hougeki1.api_at_list) {
				processYasenHougeki(data.api_n_hougeki1);
			}
			if (data.api_n_hougeki2 && data.api_n_hougeki2.api_at_list) {
				processYasenHougeki(data.api_n_hougeki2);
			}
			if (data.api_day_flag) {
				eventqueue.push([wait,[1000]]);
				eventqueue.push([shutters,[true]]);
				eventqueue.push([enemyEscortExit,[]]);
			}
		}
		
		//jet LBAS phase
		if (data.api_air_base_injection) {
			data.api_air_base_injection.api_plane_from[1] = [];
			data.api_air_base_injection.api_squadron_plane = data.api_air_base_injection.api_air_base_data;
			for (var j=0; j<f2.length; j++)
				if (f2[j].planetypes.length) data.api_air_base_injection.api_plane_from[1].push(7+j);
			if (data.api_air_base_injection.api_plane_from[1].length <= 0) data.api_air_base_injection.api_plane_from[1] = [-1];
			if (!data.api_air_base_injection.api_plane_from[0]) data.api_air_base_injection.api_plane_from[0] = [-1]; //new format, add back
			for (var j=0; j<data.api_air_base_injection.api_squadron_plane.length; j++) 
				if (data.api_air_base_injection.api_squadron_plane[j].api_mst_id) data.api_air_base_injection.api_plane_from[0][j] = j+7;
			processKouku(data.api_air_base_injection,true); //no isjet=true for now
		}
		
		//jet phase
		if (data.api_injection_kouku) processKouku(data.api_injection_kouku,false,true);
		
		//land bombing
		if (data.api_air_base_attack) {
			for (var i=0; i<data.api_air_base_attack.length; i++) {
				data.api_air_base_attack[i].api_plane_from[1] = [];
				for (var j=0; j<f2.length; j++)
					if (f2[j].planetypes.length) data.api_air_base_attack[i].api_plane_from[1].push(7+j);
				if (data.api_air_base_attack[i].api_plane_from[1].length <= 0) data.api_air_base_attack[i].api_plane_from[1] = [-1];
				if (!data.api_air_base_attack[i].api_plane_from[0]) data.api_air_base_attack[i].api_plane_from[0] = [-1]; //new format, add back
				for (var j=0; j<data.api_air_base_attack[i].api_squadron_plane.length; j++) 
					if (data.api_air_base_attack[i].api_squadron_plane[j].api_mst_id) data.api_air_base_attack[i].api_plane_from[0][j] = j+7;
				processKouku(data.api_air_base_attack[i],true);
			}
		}
		
		//earlier air support for night-to-day
		if (data.api_n_hougeki1 && data.api_support_info) {
			processSupport(data.api_support_flag, data.api_support_info);
		}
		
		//air phase
		if (data.api_kouku) processKouku(data.api_kouku);
		
		//support phase
		if (data.api_support_info && !data.api_n_hougeki1) {
			processSupport(data.api_support_flag, data.api_support_info);
		}
		
		//opening asw
		var f = (COMBINED)? fleet1C : fleet1;
		if (data.api_opening_taisen) processHougeki(data.api_opening_taisen,f,(data.api_ship_ke_combined));
		
		//opening torp
		f = (COMBINED)? fleet1C : fleet1;
		if (data.api_opening_atack) processRaigeki(data.api_opening_atack,f,(data.api_ship_ke_combined));
		
		//engagement
		if (data.hasOwnProperty('api_hougeki1')) eventqueue.push([battleEngageShow,[data.api_formation[2]]]);
		
		//if air node, second air phase
		if (data.api_kouku2) processKouku(data.api_kouku2);
		
		

		//shelling 1, 2, 3
		if (COMBINED && data.api_ship_ke_combined) { //12vs12
			if (COMBINED == 2) {
				if (data.api_hougeki1) processHougeki(data.api_hougeki1,fleet1,true);
				if (data.api_hougeki2) processHougeki(data.api_hougeki2,fleet1,true);
				if (data.api_hougeki3) processHougeki(data.api_hougeki3,fleet1C,true);
				if (data.api_raigeki) processRaigeki(data.api_raigeki,f,true);
			} else {
				if (data.api_hougeki1) processHougeki(data.api_hougeki1,fleet1,true);
				if (data.api_hougeki2) processHougeki(data.api_hougeki2,fleet1C,true);
				if (data.api_raigeki) processRaigeki(data.api_raigeki,f,true);
				if (data.api_hougeki3) processHougeki(data.api_hougeki3,fleet1,true);
			}
		}
		else {
			var torpedoFirst = (data.api_ship_ke_combined && data.api_n_hougeki1 === undefined);
			f = (COMBINED == 1 || COMBINED == 3)? fleet1C : fleet1;
			if (data.api_hougeki1) processHougeki(data.api_hougeki1,f,torpedoFirst);
			//CTF does closing torpedo
			if ((COMBINED == 1 || COMBINED == 3 || torpedoFirst) && data.api_raigeki)
				processRaigeki(data.api_raigeki,f,torpedoFirst);
			
			if (data.api_hougeki2) processHougeki(data.api_hougeki2,fleet1,torpedoFirst); //always main fleet
			if (data.api_hougeki3) {
				f = (COMBINED == 2)? fleet1C : fleet1;
				if (COMBINED == 2) eventqueue.push([wait,[1000]]); //short pause between main and escort shelling if STF
				processHougeki(data.api_hougeki3,f,torpedoFirst);
			}
			
			//closing torp (if not CTF/TTF)
			f = (COMBINED)? fleet1C : fleet1;
			if (COMBINED != 1 && COMBINED != 3 && !torpedoFirst && data.api_raigeki)
				processRaigeki(data.api_raigeki,f,torpedoFirst);
		}
		
		
		//night battle
		var f1 = (COMBINED)? fleet1C : fleet1;
		var f2e = f2;
		var yasen = (data.api_hougeki)? data : root.battles[b].yasen;
		var combinedEType = (!yasen.api_ship_ke_combined)? 0 : (yasen.api_active_deck && yasen.api_active_deck[1] == 1)? 1 : 2;
		if (combinedEType==2) f2e = f2c;
		if (Object.keys(yasen).length) {
			if (!data.api_hougeki) {
				eventqueue.push([wait,[1000,(orel)?false:(isboss)?(map.bgmNB!=map.bgmDB):(map.bgmNN!=map.bgmDN)],null]);
				eventqueue.push([shutters,[],null]);
			}
			
			var bgm = (orel)?999:(isboss)? map.bgmNB : map.bgmNN
			
			if (yasen.api_friendly_info) {
				var data = yasen.api_friendly_info;
				if (!fleetFriend) {
					fleetFriend = [];
					for (var i=0; i<data.api_ship_id.length; i++) {
						var d = [data.api_ship_id[i],data.api_maxhps[i],data.api_nowhps[i]].concat(data.api_Slot[i]);
						var sh = createShip(d,0,i);
						fleetFriend.push(sh);
						// stage.addChild(sh.graphic);
					}
				}
			
				eventqueue.push([friendStart,[data.api_nowhps,bgm],null]);
				var fleet1Temp = fleet1, f1Temp = f1;
				f1 = fleet1 = fleetFriend;
				eventqueue.push([NBstart,[yasen.api_friendly_battle.api_flare_pos,yasen.api_friendly_battle.api_touch_plane,bgm,null,true]]);
				if (yasen.api_friendly_battle.api_hougeki) {
					processYasenHougeki(yasen.api_friendly_battle.api_hougeki);
				}
				fleet1 = fleet1Temp; f1 = f1Temp;
				eventqueue.push([friendExit,[],null]);
			}
			
			eventqueue.push([NBstart,[yasen.api_flare_pos,yasen.api_touch_plane,bgm, combinedEType]]);
			if (data.api_n_support_flag) {
				processSupport(data.api_n_support_flag, data.api_n_support_info);
			}
			if (yasen.api_hougeki && yasen.api_hougeki.api_at_list) processYasenHougeki(yasen.api_hougeki);
			if (!isboss && map.bgmNN != map.bgmDN) eventqueue.push([wait,[1,true]]);
		}
		
		if (b==root.battles.length-1) eventqueue.push([battleEnd,[],getState()]);
	}
	
	loader2.load(function() { SHIPSLOADED = true; });
	
	stage.addChild(shutterTop2); stage.addChild(shutterBottom2);
	shutterTop2.y = -246; shutterTop2.alpha = 1;
	shutterBottom2.y = 456; shutterBottom2.alpha = 1;
	stage.addChild(shutterTop); stage.addChild(shutterBottom);
	shutterTop.y = -246; shutterTop.alpha = 0;
	shutterBottom.y = 456; shutterBottom.alpha = 0;
	
	if (!started) animate();
	SM.stopBGM();
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
var SHOW = false;
var statechangefunc = null;
var STEPBYFRAME = false;
var RATE = 1, RCOUNTER = 0;

var prevtime = Date.now(), currtime = Date.now(), timeelapsed = 0, frameselapsed = 0;
function animate() {
	if (END) return;
    requestAnimationFrame(animate);
	
	if (!ALLLOADED || !SHIPSLOADED) return; //??????
	if (HASLOADTEXT) { $('#error').text(''); HASLOADTEXT = false; }
	
	frameselapsed++;
	currtime = Date.now();
	timeelapsed += currtime - prevtime;
	if (timeelapsed >= 1000) {
		timeelapsed = timeelapsed % 1000;
		$('#FPS').text(frameselapsed);
		frameselapsed = 0;
	}
	prevtime = currtime;
	
	if (PAUSE) return;
	if (STEPBYFRAME) PAUSE = true;
	
	if (statechangefunc) {
		statechangefunc();
		statechangefunc = null;
		return;
	}
	
	RCOUNTER += RATE;
	for (RCOUNTER; RCOUNTER >= 1; RCOUNTER--) {
		if (ecomplete && e < eventqueue.length) {
			eventqueue[e][0].apply(null,eventqueue[e][1]);
			e++;
			ecomplete = false;
		}
		
		for (i=0; i<updates.length; i++) {
			if( updates[i][0].apply(null,updates[i][1]) ) updates.splice(i--,1);
		}
		
		for (var i=0; i<timeouts.length; i++) {
			timeouts[i][1] -= 1000/60;
			if (timeouts[i][1] <= 0) {
				var f = timeouts[i][0];
				timeouts.splice(i--,1);
				f();
			}
		}
	}
	
    renderer.render(stage);
}

//-----------------------------------------

function createExplosion(x,y,scale,parent) {
	if (!scale) scale = 1;
	var explosion = getFromPool('explosion');
	if (!explosion) explosion = new PIXI.extras.MovieClip(frames_exp);
	explosion.name = 'explosion';
	explosion.animationSpeed = .5;
	explosion.loop = false;
	explosion.position.set(x,y);
	explosion.scale.set(scale);
	explosion.anchor.set(.5);
	explosion.onComplete = function() { this.gotoAndStop(0); recycle(this); }
	explosion.gotoAndPlay(0);
	explosion.notpersistent = true;
	if (parent) parent.addChild(explosion);
	else stage.addChild(explosion);
}

function createNumber(x,y,number,forcecrit) {
	var ng = new PIXI.Container;
	number = number.toString();
	if (number <= 0) {
		var sprite = getFromPool('Nmiss','assets/Nmiss.png');
		sprite.position.set(0);
		sprite.anchor.set(.5);
		sprite.vspeed = -2.5; sprite.bounce = 2; //updates.push([moveNumber,[sprite]]);
		ng.addChild(sprite);
	} else if (number <= 14 || (number < 40 && !forcecrit)) {
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
	torp.pivot.set(0,(big)? 13:8);
	var x1 = (ship.side==1) ? ((ship.escorte)? 482:657) : (ship.escort||target.escort)? 295 : 143;
	var x2 = (target.side==1) ? ((target.escorte)? 482:657) : (ship.escort||target.escort)? 295 : 143;
	torp.position.set(x1,ship.graphic.y+22);
	torp.rotation = Math.atan((ship.graphic.y - target.graphic.y)/(x1-x2))+Math.PI*ship.side;
	var msk = new PIXI.Graphics();
	msk.beginFill(0x000000);
	var rx = (ship.escort||target.escort)? 321 : 169;
	var rw = (ship.escort||target.escort)? 310 : 462;
	if (ship.escorte||target.escorte) rw -= 166;
	msk.drawRect(rx, 0, rw, 480);
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

function shipAddEscape(ship) {
	if (ship.escaped) return;
	ship.escaped = true;
	if (ship.damg) ship.graphic.removeChild(ship.damg);
	for (i=0; i<5; i++) ship.graphic.getChildAt(i).filters = [new PIXI.filters.GrayFilter()];
	var dam = PIXI.Sprite.fromImage('assets/d403.png'); dam.y += 2;
	ship.graphic.addChild(dam);
	ship.damg = dam;
	if (ship.side == 1) dam.x += 10;
	ship.status = 0;
}

function shipSetHP(ship,hp) {
	if (hp > ship.hpmax) hp = ship.hpmax;
	if (hp < 0) hp = 0;
	if (PVPMODE && hp <= 0) hp = 1;
	
	if (ship.side==0) { HPnow1 -= ship.hp-hp; setHPBar(1,1-HPnow1/HPtotal1); } //update HP bars
	else { HPnow2 -= ship.hp-hp; setHPBar(0,1-HPnow2/HPtotal2); }
	ship.escaped = false;
	// refactor into own class - Vultren
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
			if (ship.damg) ship.graphic.removeChild(ship.damg);
			for (i=0; i<5; i++) ship.graphic.getChildAt(i).filters = [new PIXI.filters.GrayFilter()];
			var dam = PIXI.Sprite.fromImage('assets/d389.png'); dam.y += 2;
			ship.graphic.addChild(dam);
			ship.damg = dam;
			if (ship.side == 1) dam.x += 10;
			ship.status = 0;
		}
	} else if (hp <= ship.hpmax/4) {
		if (ship.status != 1) {
			if (ship.damg) ship.graphic.removeChild(ship.damg);
			if (ship.status == 0) for (i=0; i<5; i++) ship.graphic.getChildAt(i).filters = null;
			var dam = PIXI.Sprite.fromImage('assets/d387.png'); dam.y += 2;
			ship.graphic.addChild(dam);
			ship.damg = dam;
			if (ship.side == 1) dam.x += 10;
			ship.status = 1;
		}
	} else if (hp <= ship.hpmax/2) {
		if (ship.status != 2) {
			if (ship.damg) ship.graphic.removeChild(ship.damg);
			if (ship.status == 0) for (i=0; i<5; i++) ship.graphic.getChildAt(i).filters = null;
			var dam = PIXI.Sprite.fromImage('assets/d385.png'); dam.y += 2;
			ship.graphic.addChild(dam);
			ship.damg = dam;
			if (ship.side == 1) dam.x += 10;
			ship.status = 2;
		}
	} else if (hp <= ship.hpmax*.75) {
		if (ship.status != 3) {
			if (ship.damg) ship.graphic.removeChild(ship.damg);
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


function shipShake(ship,amplitude,decay,time,halfperiod) {
	var pid = ++ship.shakepid;
	if (!halfperiod) halfperiod = 2;
	var step = (ship.side==1)? 0 : halfperiod;
	// decay = .175/2;
	updates.push([function() {
		if (pid != ship.shakepid) { ship.graphic.pivot.x = 0; return true; }//end if another shake is added
		ship.graphic.pivot.x = amplitude * Math.sin(Math.PI*step/halfperiod);
		// console.log(ship.graphic.pivot.x);
		step++;
		amplitude -= decay;
		if (amplitude <= 0) { ship.graphic.pivot.x = 0; return true; }
		if (time) { //if given time, end after timeout
			if (--time <= 0) { ship.graphic.pivot.x = 0; return true; }
		}
		return false;
	},[]]);
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
function battleStart(battledata,newships,newshipsC,escape,bgm,showbosshp) {
	if (battledata[5] == '1' && !bg2.parent) {  //just in case background wasn't changed
		stage.removeChild(bg);
		stage.addChildAt(bg2,0);
	}
	fleet2 = newships;
	if (newshipsC) for (var i=newshipsC.length-1; i>=0; i--) stage.addChildAt(newshipsC[i].graphic,5);
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
	
	if (showbosshp) {
		stage.addChildAt(bossbar,stage.getChildIndex(dots2));
		updates.push([bossBarAppear,[]]);
		bossbar.active = true;
	}

	addTimeout(function() { showEngage(GEngage); }, 500);
	
	var hps = eventqueue[e][2].HP;
	for (var i=0; i<fleet1.length; i++) shipSetHP(fleet1[i],hps.fleet1[i]);
	for (var i=0; i<fleet1C.length; i++) shipSetHP(fleet1C[i],hps.fleet1C[i]);
	
	HPtotal1 = HPtotal2 = 0;
	for (var i=0; i<fleet1.length; i++) HPtotal1 += fleet1[i].hp;
	for (var i=0; i<fleet1C.length; i++) HPtotal1 += fleet1C[i].hp;
	for (var i=0; i<fleet2.length; i++) HPtotal2 += fleet2[i].hp;
	HPnow1 = HPtotal1; HPnow2 = HPtotal2;
	clearHPBar(0); clearHPBar(1);
	
	if (escape) {
		for (var i=0; i<escape[0].length; i++) {
			ship = fleet1[escape[0][i]-1];
			shipAddEscape(ship);
		}
		for (var i=0; i<escape[1].length; i++) {
			ship = fleet1C[escape[1][i]-1];
			shipAddEscape(ship);
		}
	}
	
	if (VOICES[fleet2[0].mid] && VOICES[fleet2[0].mid].start && !isPlayable(fleet2[0].mid)) SM.playVoice(fleet2[0].mid,'start',10);
	else SM.playVoice(fleet1[0].mid,'start',0);
	var j = 0;
	for (var i=0; i<fleet1.length; i++) {
		addTimeout(function(){
			updates.push([shipMoveTo,[fleet1[j],fleet1[j].xorigin,10]]);
			j++; SM.play('enter');
		},100+100*i);
	}
	for (var i=0; i<fleet2.length; i++) {
		var k = 0;
		addTimeout(function(){
			updates.push([shipMoveTo,[fleet2[k],fleet2[k].xorigin,10]]);
			k++; SM.play('enter');
		},1000+100*i);
	}
	if (COMBINED) {
		var jj = 0;
		for (var i=0; i<fleet1C.length; i++) {
			fleet1C[i].graphic.visible = false;
			addTimeout(function(){
				updates.push([shipEscortEnter,[fleet1C[jj],77+45*jj]]);
				jj++;
			},1000+100*i);
		}
	}
	
	if (newshipsC) {
		fleet2C = newshipsC;
		var jj2 = 0;
		for (var i=0; i<fleet2C.length; i++) {
			fleet2C[i].graphic.visible = false;
			addTimeout(function(){
				updates.push([shipEscortEnter,[fleet2C[jj2],144+45*jj2]]);
				jj2++;
			},1000+100*i);
		}
	}
	
	if (SM.BGMnum!=bgm) {
		SM.stopBGM();
		addTimeout(function() { SM.playBGM(bgm); }, 1000);
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
	ship.graphic.visible = (ship.graphic.y+44 > 0) && (ship.graphic.y-5 < 480);
	
	return (ship.graphic.y - targety <= 1);
}

function battleEnd() {
	addTimeout(function() {
		// END = true;
		// console.log('end');
		SM.fadeBGM();
	}, 1000);
	if (bossbar.show && bossbar.nowhp <= -1) {
		addTimeout(function() {
			SM.playVoice(fleet2[0].mid,'sunk',10);
		}, 2000);
	}
	addTimeout(function() { ecomplete = true; }, 2000);
}

function battleEngageShow(engage) {
	var k1,k2,k4;
	switch (engage) {
		case 1:
			k1 = 'Edou'; k2 = 'Ekou'; break;
		case 2:
			k1 = 'Ehan'; k2 = 'Ekou'; break;
		case 3:
			k1 = 'ET'; k2 = 'Eji'; k4 = 'Eadv'; break;
		case 4:
			k1 = 'ET'; k2 = 'Eji'; k4 = 'Edisadv'; break;
		default:
			addTimeout(function() { ecomplete = true; }, 1); return;
	}
	var kg1 = getFromPool(k1,'assets/'+k1+'.png');
	var kg2 = getFromPool(k2,'assets/'+k2+'.png');
	var kg3 = getFromPool('Esen','assets/Esen.png');
	var kg4 = null;
	
	kg1.position.set(215,240);
	kg2.position.set(400,240);
	kg3.position.set(585,240);
	kg1.alpha = kg2.alpha = kg3.alpha = 0;
	kg1.notpersistent = kg2.notpersistent = kg3.notpersistent = true;
	kg1.pivot.set(64,70); kg2.pivot.set(64,70); kg3.pivot.set(64,70); 
	kg1.scale.set(2); kg2.scale.set(2); kg3.scale.set(2); 
	stage.addChild(kg1); stage.addChild(kg2); stage.addChild(kg3); 
	
	if (k4) {
		kg4 = getFromPool(k4,'assets/'+k4+'.png');
		kg1.y -= 25; kg2.y -= 25; kg3.y -= 25;
		kg4.position.set(401,306);
		kg4.pivot.set(128,33);
		kg4.alpha = 0; kg4.scale.set(2); kg4.notpersistent = true;
		stage.addChild(kg4);
	}
	
	addTimeout(function() {
		updates.push([engageAppear,[kg1]]);
	}, 200);
	addTimeout(function() {
		updates.push([engageAppear,[kg2]]);
	}, 450);
	addTimeout(function() {
		updates.push([engageAppear,[kg3]]);
	}, 700);
	if (kg4) addTimeout(function() {
		updates.push([engageAppear,[kg4,true]]);
	}, 950);
	
	var kgs = [kg1,kg2,kg3]; if (kg4) kgs.push(kg4);
	addTimeout(function() {
		updates.push([engageExit,[kgs]]);
	}, 1600);
	
	addTimeout(function() { ecomplete = true; }, 2500);
}

function engageAppear(kg,nosound) {
	kg.alpha += .2;
	if (kg.alpha > 1) kg.alpha = 1;
	kg.scale.set(kg.scale.x-.05);
	if (kg.scale.x <= 1) {
		if (!nosound) SM.play('text');
		kg.scale.set(1);
		return true;
	}
	return false;
}

function engageExit(kgs) {
	for (var i=0; i<kgs.length; i++) {
		kgs[i].x -= 25;
	}
	if (kgs[2].x <= -100) {
		for (var i=0; i<kgs.length; i++) recycle(kgs[i]);
		return true;
	}
	return false;
}

function standardHit(target,damage,move,protect,forcecrit) {
	move = typeof move !== 'undefined' ? move : true;
	if (damage <= 14) {
		standardExplosion(target,1);
		SM.play('fire');
	} else if (damage < 40) {
		standardExplosion(target,2);
		SM.play('hit');
	} else {
		standardExplosion(target,3);
		SM.play('crit');
	}
	if (!isPlayable(target.mid) && damage > 0) { if (target.hp-Math.max(0,damage) > 0) addTimeout(function() { SM.playVoice(target.mid,'damage',target.id); }, 100); }
	else if (target.side==0 && target.hp/target.hpmax > .5 && (target.hp-Math.max(0,damage))/target.hpmax <= .5)
		addTimeout(function() { SM.playVoice(target.mid,'damage3',target.id); }, 100);
	else if (target.side==0 && target.hp/target.hpmax > .75 && (target.hp-Math.max(0,damage))/target.hpmax <= .75)
		addTimeout(function() { SM.playVoice(target.mid,'damage'+((Math.random()<.5)? 1:2),target.id); }, 100);
	
	if (bossbar.active && target.id == 10 && target.hp > 0 && !target.escorte) {
		if (bossbar.mode == 2) {
			bossbar.nowhp = Math.max(0,bossbar.nowhp - Math.min(damage,target.hp));
			updates.push([bossBarMove,[]]);
		} else if (bossbar.mode == 1 && target.hp-damage <= 0) {
			bossbar.nowhp--;
			updates.push([bossBarMove,[]]);
		}
		if (target.hp-damage <= 0 && bossbar.nowhp <= 0) addTimeout(function() { updates.push([bossBarExplode,[]]); }, 500);
	}
	
	if (PVPMODE && damage > target.hp-1) damage = target.hp-1;
	if (target.isfog && damage <= 0) createKleinField(target); 
	else createNumber(target.xorigin+85,target.graphic.y+22,damage,forcecrit);
	shipSetHP(target,target.hp-Math.max(0,damage));
	if (protect) {
		createShield(target.graphic.x + ((target.side==0)? 180 : -10),target.side);
		if (move) addTimeout(function() { updates.push([shipMoveTo,[target,target.xorigin,3]]); }, 500);
		shipShake(target,12,.5,undefined,10);
	} else if (move) {
		target.graphic.x = target.xorigin-25+50*target.side;
		updates.push([shipMoveTo,[target,target.xorigin,2]]);
		shipShake(target,5,.175/2);
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

function shoot(ship,target,damage,forcecrit,protect) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	if (!protect) updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	else {
		// var flag = (target.side==0)? fleet1[0] : fleet2[0];  //for fun
		// updates.push([shipMoveTo,[flag,flag.xorigin+25-50*flag.side,2]]);
		// addTimeout(function(){updates.push([shipMoveTo,[flag,flag.xorigin,2]]);},1000);
		addTimeout(function() { updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,3]]); }, 675);
	}
	// addTimeout(function() { shipShake(ship,25,1,20,20); }, 500);
	// addTimeout(function() { SM.play('fire'); }, 400);
	addTimeout(function() { SM.play('fire'); }, 200);
	addTimeout(function() { SM.playVoice(ship.mid,'attack',ship.id); }, 200);
	addTimeout(function(){
		standardHit(target,damage,true,protect,forcecrit);
	},800);
	addTimeout(function(){updates.push([shipMoveTo,[ship,ship.xorigin,2]]);},1000);
	addTimeout(function(){ ecomplete = true; }, (protect)? 1600 : 1500);
}

function shootDA(ship,target,damage1,damage2,crit1,crit2,protect) {
	updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	addTimeout(function() { SM.playVoice(ship.mid,'nbattack',ship.id); }, 400);
	addTimeout(function(){ updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,3]]); }, 500);
	addTimeout(function(){
		standardHit(target,damage1,!protect,protect,crit1);
	},650);
	addTimeout(function(){
		standardHit(target,damage2,true,protect,crit2);
	},1500);
	addTimeout(function(){updates.push([shipMoveTo,[ship,ship.xorigin,2]]);},1800);
	addTimeout(function(){ ecomplete = true; }, 2300);
}

function shootPlane(ship,target,damage,forcecrit,protect) {
	var planes = createPlane(ship.graphic.x+85,ship.graphic.y+22,ship.planetypes,null,null,ship.side);
	
	var angle = Math.atan((ship.graphic.y-target.graphic.y)/(ship.graphic.x-target.graphic.x));
	updates.push([movePlane,[planes,angle,(ship.side==0) ? 5 : -5, planes.x, target.graphic.x+85]]);
	SM.play('planelaunch');
	SM.playVoice(ship.mid,'attack',ship.id);
	
	addTimeout(function() { SM.play('planeatk'); },(ship.escort||target.escort)? 1300 : 1900);
	if (protect) addTimeout(function() { updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,3]]); }, (ship.escort||target.escort)? 1475 : 2075);
	addTimeout(function(){ standardHit(target,damage,true,protect,forcecrit); }, (ship.escort||target.escort||ship.escorte||target.escorte)? 1600 : 2200);
	
	addTimeout(function(){stage.removeChild(planes); ecomplete=true;},3000);
}

function shootPlaneCutIn(ship,target,damage,forcecrit,protect) {
	var planes = createPlane(ship.graphic.x+85,ship.graphic.y+22,ship.planetypes,null,null,ship.side);
	
	var angle = Math.atan((ship.graphic.y-target.graphic.y)/(ship.graphic.x-target.graphic.x));
	
	shipShake(ship,3,0,36);
	SM.playVoice(ship.mid,'attack',ship.id);
	
	addTimeout(function() {
		updates.push([movePlane,[planes,angle,(ship.side==0) ? 5 : -5, planes.x, target.graphic.x+85]]);
		SM.play('planelaunch');
	}, 600);
	
	addTimeout(function() { SM.play('planeatk'); },(ship.escort||target.escort)? 1900 : 2500);
	if (protect) addTimeout(function() { updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,3]]); }, (ship.escort||target.escort)? 2075 : 2675);
	addTimeout(function(){ standardHit(target,damage,true,protect,forcecrit); }, (ship.escort||target.escort||ship.escorte||target.escorte)? 2200 : 2800);
	
	addTimeout(function(){stage.removeChild(planes); ecomplete=true;},3600);
}

function arcFade(arc) {
	arc.lifetime--;
	if (arc.lifetime >= 16) arc.alpha += .0625;
	else arc.alpha -= .0625;
	if (arc.lifetime <= 0) {
		stage.removeChild(arc);
		recycle(arc);
		return true;
	}
	return false;
}

function shootASW(ship,target,damage,forcecrit,protect) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	addTimeout(function() {
		var arc = getFromPool('aswup','assets/299.png');
		arc.scale.x = (ship.side==1)? -1 : 1;
		arc.position.set(ship.graphic.x+120-80*ship.side,ship.graphic.y-208);
		arc.alpha = 0;
		arc.lifetime = 30;
		arc.notpersistent = true;
		stage.addChild(arc);
		updates.push([arcFade,[arc]]);
		SM.playVoice(ship.mid,'attack',ship.id);
	}, 200);
	addTimeout(function() {
		var arc = getFromPool('aswdown','assets/296.png');
		arc.scale.x = (target.side==0)? -1 : 1;
		arc.position.set(target.graphic.x-50+260*(target.side==0),target.graphic.y-208);
		arc.alpha = 0;
		arc.lifetime = 30;
		arc.notpersistent = true;
		stage.addChild(arc);
		updates.push([arcFade,[arc]]);
	}, 1000);
	addTimeout(function(){
		if (!protect) updates.push([shipMoveTo,[target,target.xorigin,4]]);
		if (!protect) target.graphic.x = target.xorigin-25+50*target.side;
		shipShake(target,5,.125/2);
		createExplosion(target.xorigin+65+40-80*target.side,target.graphic.y+42,1);
		addTimeout(function(){
			createExplosion(target.xorigin+105+40-80*target.side,target.graphic.y+2,1);
			SM.play('hit');
		},75);
	},1400);
	addTimeout(function(){
		standardHit(target,damage,protect,protect,forcecrit);
		// if (protect) updates.push([shipMoveTo,[target,target.xorigin+50-100*target.side,3]]);
		updates.push([shipMoveTo,[ship,ship.xorigin,2]]);
	},1900);
	addTimeout(function(){ ecomplete = true; }, 2400 + ((protect)?100:0));
}

function shootCutIn(ship,target,damage,forcecrit,protect) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	if (!protect) updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	else addTimeout(function() { updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,3]]); }, 675);
	addTimeout(function(){
		if (!protect) updates.push([shipMoveTo,[target,target.xorigin,4]]);
		shipShake(target,5,.125,40);
		if (!protect) target.graphic.x = target.xorigin-25+50*target.side;
		createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);
		if (damage>14) addTimeout(function(){createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);},75);
		addTimeout(function(){createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);},150);
		if (damage>14) addTimeout(function(){createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);},225);
		addTimeout(function(){createExplosion(target.xorigin+40+80*Math.random(),target.graphic.y+42*Math.random(),1);},300);
		if (damage<=14) SM.play('fire');
		else if (damage<40) SM.play('hit');
		else { SM.play('crit'); SM.play('fire'); }
		SM.playVoice(ship.mid,'nbattack',ship.id);
	},800);
	addTimeout(function(){
		standardHit(target,damage,true,protect,forcecrit);
		updates.push([shipMoveTo,[ship,ship.xorigin,2]]);
	},1500);
	addTimeout(function(){ ecomplete = true; }, 2200);
}

function shootBigGun(ship,target,damage,forcecrit,protect) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	if (!protect) updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	else addTimeout(function() { updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,3]]); }, 675);
	addTimeout(function(){
		SM.playVoice(ship.mid,'nbattack',ship.id);
		if (!protect) updates.push([shipMoveTo,[target,target.xorigin,4]]);
		shipShake(target,5,.175/2);
		if (!protect) target.graphic.x = target.xorigin-25+50*target.side;
		standardExplosion(target,3); SM.play('crit');
		addTimeout(function(){standardExplosion(target,3);SM.play('crit');},300);
		addTimeout(function(){standardExplosion(target,3);SM.play('crit');},600);
	},800);
	addTimeout(function(){
		standardHit(target,damage,true,protect,forcecrit);
		updates.push([shipMoveTo,[ship,ship.xorigin,2]]);
	},2000);
	addTimeout(function(){ ecomplete = true; }, 2700);
}

function shootSpecialGun(ship,target,damage,forcecrit,protect) {
	shipShake(ship,3,0,36);
	SM.playVoice(ship.mid,'nbattack',ship.id);
	
	addTimeout(function() {
		updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,3]]);
		updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,3]]);
	},600);
	addTimeout(function(){ standardHit(target,damage,true,protect,forcecrit); },750);
	addTimeout(function(){ updates.push([shipMoveTo,[ship,ship.xorigin,2]]); }, 900);
	addTimeout(function(){ ecomplete = true; }, 2000);
}

function shootTorp(ship,target,damage,forcecrit,protect) {
	shipShake(ship,3,0,36);
	SM.playVoice(ship.mid,'nbattack',ship.id);
	var speed = (Math.abs(ship.graphic.x-target.graphic.x) < 600)? 4 : 6;
	addTimeout(function(){ createTorp(ship,target,speed); SM.play('torpedo'); }, 500);
	if (protect) addTimeout(function() { updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,3]]); }, 1775);
	addTimeout(function(){ standardHit(target,damage,true,protect,forcecrit); },1900);
	
	addTimeout(function(){ ecomplete = true; }, 2600);
}

function shootBigTorp(ship,target,damage,forcecrit,protect) {
	shipShake(ship,3,0,36);
	SM.playVoice(ship.mid,'nbattack',ship.id);
	var speed = (Math.abs(ship.graphic.x-target.graphic.x) < 600)? 8 : 12;
	addTimeout(function(){ createTorp(ship,target,speed,true); SM.play('torpedo');}, 500);
	if (protect) addTimeout(function() { updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,3]]); }, 1175);
	addTimeout(function(){ standardHit(target,damage,true,protect,forcecrit); },1300);
	
	addTimeout(function(){ ecomplete = true; }, 2200);
}

function shootWG(ship,target,damage,forcecrit,protect) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	addTimeout(function() {
		var smoke = getFromPool('smoke','assets/89.png');
		smoke.position.set(ship.graphic.x+160-160*ship.side,ship.graphic.y); smoke.pivot.set(70,59);
		smoke.alpha = 0; smoke.lifetime = 40; smoke.notpersistent = true; smoke.scale.set(0);
		stage.addChild(smoke);
		updates.push([function(smoke) {
			smoke.lifetime--;
			smoke.scale.set(smoke.scale.x+.04);
			if (smoke.lifetime >= 20) smoke.alpha += .05;
			else smoke.alpha -= .05;
			if (smoke.lifetime <= 0) {
				recycle(smoke);
				return true;
			}
			return false;
		},[smoke]]);
		SM.playVoice(ship.mid,'attack',ship.id);
	}, 200);
	addTimeout(function() { createWGFire(target.graphic.x+140-120*target.side,target.graphic.y+20); }, 1000);
	addTimeout(function(){
		if (!protect) updates.push([shipMoveTo,[target,target.xorigin,4]]);
		if (!protect) target.graphic.x = target.xorigin-25+50*target.side;
		shipShake(target,5,.125/2);
		createExplosion(target.xorigin+65+40-80*target.side,target.graphic.y+42,1);
		addTimeout(function(){
			createExplosion(target.xorigin+105+40-80*target.side,target.graphic.y+2,1);
			SM.play('hit');
		},75);
	},1500);
	addTimeout(function(){
		standardHit(target,damage,protect,protect,forcecrit);
		// if (protect) updates.push([shipMoveTo,[target,target.xorigin+50-100*target.side,3]]);
		updates.push([shipMoveTo,[ship,ship.xorigin,2]]);
	},2000);
	addTimeout(function(){ ecomplete = true; }, 2500 + ((protect)?100:0));
}

function createWGFire(x,y) {
	var WG1 = getFromPool('WG1','assets/684.png');
	var WG2 = getFromPool('WG2','assets/687.png');
	var WG4 = getFromPool('WG4','assets/693.png');
	var WG3a = getFromPool('WG3','assets/690.png');
	var WG3b = getFromPool('WG3','assets/690.png');
	WG1.scale.set(0); WG2.scale.set(0); WG4.scale.set(0);
	WG1.position.set(x,y); WG2.position.set(x,y); WG4.position.set(x,y);
	WG1.pivot.set(46,90); WG2.pivot.set(58,90); WG4.pivot.set(40,80);
	WG1.alpha = WG2.alpha = WG4.alpha = 1;
	WG1.notpersistent = WG2.notpersistent = WG4.notpersistent = true;
	WG1.timer = 0;
	WG3a.alpha = WG3b.alpha = 1;
	WG3a.position.set(x-20,y-20); WG3b.position.set(x+20,y-10);
	WG3a.pivot.set(17,35); WG3b.pivot.set(17,35);
	WG3a.scale.set(0); WG3b.scale.set(0);
	WG3a.notpersistent = WG3b.notpersistent = true;
	stage.addChild(WG4); stage.addChild(WG2); stage.addChild(WG1); stage.addChild(WG3a); stage.addChild(WG3b);
	updates.push([function(WG1,WG2,WG4,WG3a,WG3b) {
		WG1.timer++;
		if (WG1.timer < 8) WG1.scale.set(WG1.scale.x+.125);
		else {
			WG1.scale.set(WG1.scale.x+.01);
		}
		WG2.scale.set(WG1.scale.x); WG4.scale.set(WG1.scale.x);
		if (WG1.timer > 15 && WG1.alpha > 0) WG1.alpha -= .1;
		if (WG1.timer > 20 && WG2.alpha > 0) WG2.alpha -= .1;
		if (WG1.timer > 25 && WG4.alpha > 0) WG4.alpha -= .1;
		if (WG1.timer > 5) {
			if (WG3a.scale.x < 1) WG3a.scale.set(WG3a.scale.x += .2);
			else if (WG3a.alpha > 0) WG3a.alpha -= .2;
		}
		if (WG1.timer == 5) SM.play('fire',.5);
		if (WG1.timer > 10) {
			if (WG3b.scale.x < 1) WG3b.scale.set(WG3b.scale.x += .2);
			else if (WG3b.alpha > 0) WG3b.alpha -= .2;
		}
		if (WG1.timer == 10) SM.play('fire',.5);
		if (WG4.alpha <= 0) {
			recycle(WG1); recycle(WG2); recycle(WG4); recycle(WG3a); recycle(WG3b);
			return true;
		}
		return false;
	},[WG1,WG2,WG4,WG3a,WG3b]]);
}

function shootLandingCraft(ship,target,damage,forcecrit,protect,image) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	updates.push([shipMoveTo,[target,target.xorigin+25-50*target.side,2]]);
	createLandingCraft(ship.graphic.x+230-ship.side*291,ship.graphic.y,Math.atan2(target.graphic.y-ship.graphic.y,target.graphic.x-ship.graphic.x-185+370*ship.side),image);
	addTimeout(function() { SM.playVoice(ship.mid,'attack',ship.id); }, 200);
	addTimeout(function(){
		standardHit(target,damage,true,protect,forcecrit);
		updates.push([shipMoveTo,[ship,ship.xorigin,2]]);
	},1700);
	addTimeout(function() { ecomplete = true; }, 2200);
}

function createLandingCraft(x,y,dir,image) {
	if (!image) image = 1;
	var craft = getFromPool('lc'+image,'assets/LC'+image+'.png');
	craft.pivot.set(30,11); craft.alpha = 0; craft.position.set(x,y); craft.scale.x = (Math.cos(dir)>0)? 1 : -1;
	craft.timer = 0; craft.speed = 0; craft.bounce = 0; craft.notpersistent = true;
	stage.addChild(craft);
	updates.push([function(craft) {
		craft.timer++;
		if (craft.timer < 10) craft.alpha += .1;
		if (craft.timer < 15) {
			craft.bounce += .05;
			craft.y += craft.bounce;
		} else if (craft.timer < 25) {
			craft.bounce -= .125;
			craft.y += craft.bounce;
		} else {
			if (craft.speed < 5) craft.speed += .075;
			craft.x += craft.speed*Math.cos(dir);
			craft.y += craft.speed*Math.sin(dir);
		}
		if (craft.timer >= 90) craft.alpha -= .1;
		if (craft.timer >= 100) {
			recycle(craft);
			return true;
		}
		return false;
	},[craft]]);
}

function shootLaser(ship,targets,damages) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	var fleet;
	if (targets[0].escort||targets[0].escorte) fleet = (targets[0].side==0)? fleet1C : fleet2C;
	else fleet = (targets[0].side==0)? fleet1 : fleet2;
	for (var i=0; i<fleet.length; i++) {
		updates.push([shipMoveTo,[fleet[i],fleet[i].xorigin+25-50*fleet[i].side,2]]);
	}
	SM.play('fire');
	SM.playVoice(ship.mid,'attack',ship.id);
	addTimeout(function(){
		if (Math.random()<.5) createLaser(ship,fleet[0],fleet[fleet.length-1]);
		else createLaser(ship,fleet[fleet.length-1],fleet[0]);
	},300);
	addTimeout(function(){ for (var i=0; i<targets.length; i++) standardHit(targets[i],damages[i]); },1800);
	addTimeout(function(){
		updates.push([shipMoveTo,[ship,ship.xorigin,2]]);
		for (var i=0; i<fleet.length; i++) if (targets.indexOf(fleet[i])==-1) updates.push([shipMoveTo,[fleet[i],fleet[i].xorigin,2]]);
	},2000);
	addTimeout(function(){ ecomplete = true; }, 2500);
}

function createLaser(ship,targetfirst,targetlast) {
	var laser = getFromPool('laser','assets/laser.png');
	stage.addChildAt(laser,1);
	laser.pivot.y = 45;
	laser.position.set(ship.graphic.x+(1-ship.side)*200,ship.graphic.y+20);
	laser.notpersistent = true;
	laser.rotation = Math.atan2(targetfirst.graphic.y+20-laser.y,targetfirst.graphic.x+80-laser.x);
	var anglelast = Math.atan2(targetlast.graphic.y+20-laser.y,targetlast.graphic.x+80-laser.x);
	if (anglelast-laser.rotation > Math.PI) anglelast -= 2*Math.PI;
	if (anglelast-laser.rotation < -Math.PI) anglelast += 2*Math.PI;
	var speed = (anglelast-laser.rotation)/90;
	laser.lifetime = 90; laser.phase = 0;
	var msk = new PIXI.Graphics();
	msk.beginFill(0x000000);
	var w = (ship.escort||targetfirst.escort)? 310 : 462;
	if (ship.escorte||targetfirst.escorte) w -= 152;
	msk.drawRect((ship.escort||targetfirst.escort)? 321 : 169, 0, w, 480);
	laser.mask = msk;
	updates.push([function(laser) {
		laser.rotation += speed;
		laser.scale.y = .9+.1*Math.sin(laser.phase*.5); laser.phase+=.4;
		laser.alpha = .9+.05*Math.sin(laser.phase*.6); laser.phase+=.4;
		if (laser.lifetime % 20 == 10) createLaserRing(laser);
		if (--laser.lifetime <= 0) {
			recycle(laser);
			return true;
		}
		return false;
	},[laser]]);
}

function createLaserRing(laser) {
	var ring = getFromPool('laserring','assets/laserring.png');
	ring.scale.set(0); ring.alpha = .8;
	ring.rotation = laser.rotation;
	ring.position.set(laser.x+Math.cos(laser.rotation)*25,laser.y+Math.sin(laser.rotation)*25);
	ring.lifetime = 40;
	ring.pivot.set(42,104);
	stage.addChild(ring);
	updates.push([function(ring,laser) {
		ring.lifetime--;
		ring.position.set(laser.x+Math.cos(laser.rotation)*25,laser.y+Math.sin(laser.rotation)*25);
		ring.rotation = laser.rotation;
		ring.scale.set(ring.scale.x+.025);
		if (ring.lifetime <= 16) ring.alpha-=.05;
		if (ring.lifetime <= 0) { recycle(ring); return true; }
		return false;
	},[ring,laser]]);
}

function createKleinField(ship) {
	var field = getFromPool('kleinfield','assets/kleinfield.png');
	field.pivot.set(64,41);
	field.position.set(ship.graphic.x+160-ship.side*140,ship.graphic.y+20);
	field.alpha = 0;
	field.timer = 70;
	field.notpersistent = true;
	var shines = [];
	for (var i=0; i<3; i++) {
		shines[i] = getFromPool('kleinfieldshine'+(i+1),'assets/kleinfieldshine'+(i+1)+'.png');
		shines[i].position.set(field.x - 37 + ship.side*74, field.y);
		shines[i].pivot.set(140,75);
		shines[i].scale.x = (ship.side == 0)? -1 : 1;
		stage.addChild(shines[i]);
	}
	stage.addChild(field);
	updates.push([function() {
		field.scale.set(1-.01*Math.sin(Math.PI*field.timer/5));
		if (ship.side == 0) field.scale.x *= -1;
		if (field.timer % 20 == 10 && field.timer > 10) createKleinFieldRing(field);
		field.timer--;
		if (field.timer >= 65) field.alpha += .1;
		else if (field.timer < 5) field.alpha -= .1;
		if (field.timer > 5) {
			for (var i=0; i<3; i++) shines[i].alpha = .6*Math.sin(Math.PI*field.timer/10 + i*2*Math.PI/3);
		} else {
			for (var i=0; i<3; i++) shines[i].alpha = Math.max(shines[i].alpha-.07,0);
		}
		if (field.timer <= 0) {
			recycle(field);
			for (var i=0; i<3; i++) recycle(shines[i]);
			return true;
		}
	},[]]);
}

function createKleinFieldRing(field) {
	var ring = getFromPool('kleinfieldring','assets/kleinfieldring.png');
	ring.pivot.set(118);
	ring.position.set(field.x,field.y+20);
	ring.position.x += (field.scale.x < 0)? -5 : 5;
	ring.scale.set(.4);
	ring.alpha = .35;
	ring.notpersistent = true;
	stage.addChildAt(ring,stage.getChildIndex(field)-1);
	updates.push([function() {
		ring.scale.set(ring.scale.x+.0125);
		ring.scale.y *= .25;
		if (ring.scale.x > .7) ring.alpha -= .05;
		if (ring.alpha <= 0) {
			recycle(ring);
			return true;
		}
	},[]]);
}

var PLANESPRITES = ['938','914','916','918','920','922','924','926','plane9','plane10','plane11','plane12','plane13','plane544','plane511','plane588','plane590','plane592'];
function createPlane(x,y,planetypes,shots,shots2,side) {
	var num = Math.min(3,planetypes.length);
	if (shots) shots = shuffle(shots);
	if (shots2) shots2 = shuffle(shots2);
	
	var planes = new PIXI.Container();
	if (num == 3) {
		for (var i=0; i<3; i++) {
			var plane = PIXI.Sprite.fromImage('assets/'+PLANESPRITES[planetypes[2-i]-1]+'.png');
			plane.x = i*25-25;
			plane.y = (i==1) ? -15 : 15;
			plane.scale.set(.8);
			if (side && [11,12,14].indexOf(planetypes[2-i])!=-1) { plane.scale.x = -plane.scale.x; plane.pivot.x = 50; }
			planes.addChild(plane);
			if (shots) plane.shot = shots[i];
			if (shots2) plane.shot2 = shots2[i];
			// plane.shot = 2;
		}
	} else if (num == 2) {
		for (var i=0; i<2; i++) {
			var plane = PIXI.Sprite.fromImage('assets/'+PLANESPRITES[planetypes[1-i]-1]+'.png');
			plane.x = i*30-15;
			plane.y = (i==1) ? -15 : 15;
			plane.scale.set(.8);
			if (side && [11,12,14].indexOf(planetypes[1-i])!=-1) { plane.scale.x = -plane.scale.x; plane.pivot.x = 50; }
			planes.addChild(plane);
			if (shots) plane.shot = shots[i];
			if (shots2) plane.shot2 = shots2[i];
			// plane.shot = 2;
		}
	} else if (num == 1) {
		var plane = PIXI.Sprite.fromImage('assets/'+PLANESPRITES[planetypes[0]-1]+'.png');
		plane.scale.set(.8);
		if (side && [11,12,14].indexOf(planetypes[0])!=-1) { plane.scale.x = -plane.scale.x; plane.pivot.x = 50; }
		planes.addChild(plane);
		if (shots) plane.shot = shots[0];
		if (shots2) plane.shot2 = shots2[0];
		// plane.shot = 2;
	}
	planes.position.set(x,y);
	planes.pivot.set(40);
	planes.scale.set(0);
	planes.notpersistent = true;
	planes.timer = 0;
	stage.addChild(planes);
	return planes;
}

function movePlane(planes,angle,speed,startX,targetX) {
	planes.timer++;
	planes.x += speed;
	planes.y += speed*Math.tan(angle);
	if (planes.scale.x < .8) planes.scale.set(planes.scale.x+.1);
	// var x1 = (withescort)? 237 : 85;
	// var x2 = (withescorte)? 549 : 715;
	var mid = (targetX - startX)/2;
	var halfX = mid + startX;
	// planes.pivot.y = 40-100*Math.sin(Math.PI*(planes.x-x1)/(x2-x1));
	planes.pivot.y = (planes.x-halfX)*(planes.x-halfX)/(mid*mid/100)-60;
	var fire = false;
	for (var i=0; i<planes.children.length; i++) {
		var plane = planes.getChildAt(i);
		plane.pivot.y = 3*Math.sin(planes.x/80+Math.PI*2*i/3);
		if (plane.shot >= 1 && planes.timer==59) {
			createExplosion(plane.x+30,-planes.pivot.y+plane.y-30,.5,planes); fire = true;
			// var removeplane = plane;
			// if (plane.shot==2) addTimeout(function() { planes.removeChild(removeplane); }, 200);
			plane.shot = -plane.shot;
		}
		if (plane.shot2 >= 1 && planes.timer==74) {
			createExplosion(plane.x+30,-planes.pivot.y+plane.y-30,.5,planes); fire = true;
			var removeplane = plane;
			if (plane.shot2==2||plane.shot==-2) addTimeout(function() { planes.removeChild(removeplane); }, 200);
			plane.shot2 = -1;
		}
	}
	if (fire) SM.play('fire');
	
	return (speed > 0) ? (planes.x > 900) : (planes.x < -100);
}

function createTorpedoBomber1(x,y,target) {
	var torp = getFromPool('tbomber','assets/956.png'); torp.notpersistent = true;
	torp.position.set(x,y); torp.scale.x = (target.side==1)? -1 : 1; torp.pivot.set(12,4);
	stage.addChild(torp); torp.lifetime = 45;
	updates.push([function(torp) {
		torp.y+=.075*(42-torp.lifetime); torp.lifetime--;
		if (torp.lifetime <= 0) {
			createTorpedoBomber2(torp.x,torp.y,target);
			recycle(torp);
			return true;
		}
		return false;
	},[torp]]);
}

function createTorpedoBomber2(x,y,target) {
	var torp = getFromPool('tbomber2','assets/951.png'); torp.notpersistent = true;
	torp.position.set(x,y); torp.pivot.set(75,8);
	torp.rotation = Math.atan((torp.y-target.graphic.y-20)/(torp.x-target.graphic.x-40-80*(1-target.side)))+Math.PI*(1-target.side);
	stage.addChild(torp); var speed = (target.graphic.x+(1-target.side)*160 - torp.x)/40;
	updates.push([function(torp,speed) {
		torp.x += speed; torp.y += Math.tan(torp.rotation)*speed;
		if (Math.abs(torp.x - target.graphic.x - (1-target.side)*160)<Math.max(Math.abs(speed),1.7)) {
			recycle(torp);
			return true;
		}
		return false;
	},[torp,speed]]);
}

function GTorpedoPhase(shots) {
	targets = []; damages = []; crits = [];
	for (i=0; i<shots.length; i++) {
		var j = 0;
		var ship = shots[i][0]; var target = shots[i][1]; var damage = shots[i][2]; var forcecrit = shots[i][3];
		if (targets.indexOf(target) == -1) { targets.push(target); damages.push(damage); crits.push(forcecrit); }
		else { damages[targets.indexOf(target)] += damage; crits[targets.indexOf(target)] = (crits[targets.indexOf(target)] || forcecrit); }
		shipShake(ship,3,0,30);
		var j2=0;
		addTimeout(function() {
			var sh = shots[j2][0];
			sh.graphic.x = sh.xorigin-10+20*sh.side;
			j2++;
		}, 500);
		addTimeout(function(){
			updates.push([shipMoveTo,[shots[j][0],shots[j][0].xorigin,4]]);
			var speed = 4;
			if (shots[j][0].escort||shots[j][1].escort) speed--;
			if (shots[j][0].escorte||shots[j][1].escorte) speed-=1.5;
			createTorp(shots[j][0],shots[j][1],speed);
			j++;
		}, 550);
	}
	var s; for (s=0; s<shots.length; s++) if (shots[s][0].id < 10) break;
	if (s < shots.length) SM.playVoice(shots[s][0].mid,'attack',shots[s][0].id);
	addTimeout(function() { SM.play('torpedo'); }, 550);
	
	var k = 0;
	for (i=0; i<targets.length; i++) {
		addTimeout(function(){
			standardHit(targets[k],damages[k],true,false,crits[k]);
			k++;
		},(COMBINED)? 2600 : 2700);
	}
	
	addTimeout(function(){ ecomplete = true; }, 4000);
}

function GAirPhase(attackdata,targetdata,defenders,aaci1,aaci2,contact1,contact2,AS1,AS2,issupport,isbombing,isjet) {
	if (!isbombing) isbombing = 0;
	if (!isjet) isjet = 0;
	var allplanes = [];
	if (!issupport) {
		var side1 = false, side2 = false;
		for (var i=0; i<attackdata.length; i++) {
			var ship = attackdata[i][0]; var statuses = attackdata[i][1]; var statuses2 = attackdata[i][2];
			var planes;
			if (isbombing&&(attackdata[i][0]-6)) {
				//console.log(statuses);
				planes = createPlane(-100,180+(attackdata[i][0]-7)*60,[attackdata[i][3],attackdata[i][3]],statuses,statuses2);
				updates.push([movePlane,[planes,-Math.PI/30,5,85,715]]);
			} else if (isjet) {
				if (ship.hp <= 0) continue;
				var planetypes = [];
				for (var j=0; j<ship.planetypes.length; j++) if (!isjet || ship.planetypes[j] == 14) planetypes.push(ship.planetypes[j]);
				if (planetypes.length<=0) planetypes = ship.planetypes; //new jets, not updated yet, just show something
				planes = createPlane(ship.graphic.x+85,ship.graphic.y+22,planetypes,statuses,statuses2,ship.side);
				planes.timer = 30;
				updates.push([movePlane,[planes,-Math.PI+2*Math.PI*ship.side,(ship.side==0) ? 8 : -8, planes.x, (ship.side==0)? 715:85]]);
			} else {
				if (ship.hp <= 0) continue;
				planes = createPlane(ship.graphic.x+85,ship.graphic.y+22,ship.planetypes,statuses,statuses2,ship.side);
				updates.push([movePlane,[planes,-Math.PI/30-(28*Math.PI/30)*ship.side,(ship.side==0) ? 4 : -4, planes.x, (ship.side==0)? 715:85]]);
			}
			// for (var j=0; j<statuses.length; j++) {  //remove graphics if plane completely shot down, may not need
				// if (statuses[i][j] == 2) ship.planetypes.splice(i,1);
			// }
			allplanes.push(planes);
			if (isbombing&&(attackdata[i][0]-6)) { side1 = true; continue; }
			if (ship.side==0) side1 = true;
			if (ship.side==1) side2 = true;
		}
		if (isjet) SM.play('jet');
		else SM.play('airphase');
		if (side1 && side2) addTimeout(function() { SM.play('planeatk'); }, 400);
	} else {
		var planes = createPlane(-200,-120,[1]);
		updates.push([movePlane,[planes,Math.PI/8,6,85,800]]);
		allplanes.push(planes);
		addTimeout(function() {
			var planes2 = createPlane(-200,-120,[1,1,1]);
			updates.push([movePlane,[planes2,Math.PI/8,6,85,800]]);
			allplanes.push(planes2);
		}, 250);
	}
	
	if (contact1 > 0) addTimeout(function() { showContact(contact1,0); }, 250);
	if (contact2 > 0) addTimeout(function() { showContact(contact2,1); }, 250);
	
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
				var aaciship = (aaci1 > 5 && fleet1.length < 7)? fleet1C[aaci1-6] : fleet1[aaci1];
				SM.playVoice(aaciship.mid,'nbattack',aaciship.id);
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
			for (var s=0; s<5; s++) addTimeout(function() { SM.play('aaci'); }, s*110);
			addTimeout(function() { SM.play('fire'); }, 800);
		},700 - 350*isjet);
	}
	
	addTimeout(function() {
		for (var i=0; i<defenders.length; i++) {
			if (defenders[i].hp <= 0 || defenders[i].escaped) { defenders.splice(i--,1); continue; }
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
		if (AS1!==false && AS2!==false) showAS(AS1,AS2);
		if (!issupport && AS1!==false) createAirText(AS1);
	}, 900 - 450*isjet);
	
	if (!issupport) addTimeout(function() {
		var pos = [[],[]];
		for (var i=0; i<attackdata.length; i++) {
			if (isbombing&&(attackdata[i][0]-6)) pos[0].push(180+(attackdata[i][0]-7)*60);
			else if (attackdata[i][0].hastorpbomber) pos[attackdata[i][0].side].push(attackdata[i][0].graphic.y);
		}
		for (var i=0; i<targetdata.length; i++) {
			var target = targetdata[i][0];
			if (targetdata[i][4])
				createTorpedoBomber1(380+40*target.side-isbombing*70,pos[(1-target.side)][Math.floor(Math.random()*pos[(1-target.side)].length)],target);
		}
	}, 1400 - 700*isjet);
	
	var k = 0;
	for (var i=0; i<targetdata.length; i++) {
		addTimeout(function(){
			standardHit(targetdata[k][0],targetdata[k][1],true,targetdata[k][2],targetdata[k][3]);
			k++;
		},2700 - 1350*isjet);
	}
	
	addTimeout(function(){ for(var i=0; i<allplanes.length; i++) stage.removeChild(allplanes[i]); ecomplete = true; }, (isbombing)? 3000 : 3700 - 1900*isjet);
}

function createAAfire(x,y,angle) {
	var fire = getFromPool('aafire','assets/216.png');
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
	// stage.addChild(msk);
	fire.notpersistent = true;
	stage.addChild(fire);
	
	updates.push([moveAAfire,[fire,angle]]);
}

function moveAAfire(fire,angle) {
	fire.x += Math.cos(angle)*15;
	fire.y -= Math.sin(angle)*15;
	
	if (fire.x < 0 || fire.x > 1000) {
		recycle(fire);
		// stage.removeChild(fire.mask);
		fire.mask.destroy();
		fire.mask = null;
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


function GSupportPhase(ships,damages,istorpedo) {
	if (!istorpedo) {
		for (var i=0; i<12; i++) {
			addTimeout(function() {
				createSupportShell(200,-20,Math.PI*(.15+.1*Math.random()));
			}, 100+i*50);
		}
	} else {
		var targets = shuffle(fleet2.slice());
		for (var i=0; i<targets.length; i++) {
			var j=0;
			addTimeout(function() {
				createSupportTorp(0,-200,Math.atan((targets[j].graphic.y+200)/(targets[j].graphic.x)));
				j++;
			}, i*100);
		}
	}
	
	addTimeout(function() {
		for (var i=0; i<damages.length; i++) {
			if (i<6) {
				if (i < fleet2.length) standardHit(fleet2[i],damages[i]);
			} else {
				if (i-6 < fleet2C.length) standardHit(fleet2C[i-6],damages[i]);
			}
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

function createSupportTorp(x,y,angle) {
	var torp = getFromPool('torpedoBig','assets/493.png');
	torp.alpha = 1;
	torp.position.set(x,y);
	torp.pivot.set(0,13);
	torp.lifetime = 50;
	torp.rotation = angle;
	torp.notpersistent = true;
	torp.mask = null;
	stage.addChild(torp);
	updates.push([function() {
		torp.x += 12*Math.cos(angle);
		torp.y += 12*Math.sin(angle);
		torp.lifetime--;
		if (torp.lifetime <= 20) torp.alpha -= .05;
		if(torp.lifetime <= 0) { recycle(torp); return true; }
		return false;
	},[]]);
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

function escortFadeInE(ship) {
	ship.graphic.mask.x += 10;
	if (ship.graphic.mask.x >= 300) {
		ship.graphic.removeChild(ship.graphic.mask);
		ship.graphic.mask = null;
		return true;
	}
	return false;
}

function createShield(x,side) {
	var shield = getFromPool('shield','assets/221_shield_png$f90866d61f09304ed4b65cd1a8d0dbbc1744783129.png');
	shield.position.set(x,(side==0)? 60 : 127);
	shield.alpha = 0;
	shield.lifetime = 30;
	if (side==1) shield.scale.x = -1;
	else shield.scale.x = 1;
	shield.notpersistent = true;
	updates.push([animShield,[shield]]);
	stage.addChild(shield);
}

function animShield(shield) {
	shield.lifetime--;
	if (shield.lifetime >= 25) shield.alpha += .2;
	else if (shield.lifetime <= 5) shield.alpha -= .2;
	// else shield.tint += 0x111111;
	if (shield.lifetime <= 0) {
		recycle(shield);
		return true;
	}
	return false;
}

function createFlare1(x,y,side) {
	var flare = getFromPool('flare1','assets/86.png');
	flare.pivot.set(0,18); flare.scale.set(0); flare.alpha = 1; flare.rotation = (side==0)? Math.PI*5/3 : Math.PI*4/3;
	flare.position.set(x,y);
	updates.push([moveFlare1,[flare]]); stage.addChild(flare); flare.notpersistent = true;
}
function createFlare3(x,y,dir,rate) {
	var flare = getFromPool('flare3','assets/481.png');
	flare.pivot.set(40,40); flare.scale.set(.5); flare.alpha = 1;
	flare.position.set(x,y); flare.xorigin = x; flare.yorigin = y; flare.lifetime = 200; flare.glowpos = 0;
	var flareback = getFromPool('flareback','assets/478.png');
	flareback.position.set(flare.x,flare.y); flareback.pivot.set(37,37); flareback.scale.set(4); flareback.alpha = .33;
	updates.push([moveFlare3,[flare,flareback,dir,rate]]); stage.addChild(flareback); stage.addChild(flare); flare.notpersistent = true; flareback.notpersistent = true;
}

function shootFlare(ship, noflash) {
	updates.push([shipMoveTo,[ship,ship.xorigin+25-50*ship.side,2]]);
	addTimeout(function() {
		createFlare1(ship.graphic.x+160*(1-ship.side),ship.graphic.y+5,ship.side);
		addTimeout(function() {
			flare = getFromPool('flare1','assets/86.png');
			createFlare1(ship.graphic.x+130-100*ship.side,ship.graphic.y+10,ship.side);
		}, 100);
		SM.play('planeatk');
	}, 300);
	addTimeout(function() { updates.push([shipMoveTo,[ship,ship.xorigin,2]]); }, 1000);
	if (!noflash) addTimeout(function() {
		var flash = new PIXI.Graphics();
		flash.beginFill(0xffffff);
		flash.drawRect(0,0,800,480);
		flash.lifetime = 20; flash.alpha = 0;
		stage.addChild(flash);
		updates.push([function(flash) {
			flash.lifetime--;
			if (flash.lifetime >= 10) flash.alpha += .06;
			else if (flash.lifetime > 0) flash.alpha -= .06;
			else { stage.removeChild(flash); return true; }
			return false;
		}, [flash]]);
	}, 1000);
	addTimeout(function() {
		createFlare3((ship.side==0)?600:90,150-40*ship.side,-1,1);
		createFlare3((ship.side==0)?670:160,140-40*ship.side,1,.85);
	}, 1100);
}

function moveFlare1(flare) {
	if (flare.scale.x < 1.2) {
		flare.scale.set(flare.scale.x + .08);
	} else if (flare.alpha > 0) {
		if (flare.alpha == 1) {
			var flare2 = getFromPool('flare2','assets/92.png');
			flare2.pivot.set(0,15); flare2.alpha = 1; flare2.rotation = flare.rotation; flare2.position.set(flare.x,flare.y);
			flare2.speed = 4; updates.push([moveFlare2,[flare2]]); stage.addChild(flare2); flare2.notpersistent = true;
			var smoke = getFromPool('smoke','assets/89.png');
			smoke.pivot.set(70,59); smoke.alpha = 0; smoke.scale.set(1); smoke.lifetime = 40; smoke.position.set(flare.x,flare.y);
			updates.push([moveSmoke,[smoke,.05,.05,0,0]]); stage.addChild(smoke); smoke.notpersistent = true;
		}
		flare.alpha -= .1;
	} else {
		recycle(flare);
		return true;
	}
	return false;
}

function moveFlare2(flare) {
	flare.x += flare.speed*Math.cos(flare.rotation);
	flare.y += flare.speed*Math.sin(flare.rotation);
	flare.speed = Math.max(0,flare.speed-.25);
	if (flare.speed <= 2) {
		flare.alpha -= .05;
	}
	if (flare.alpha <= 0) {
		recycle(flare);
		return true;
	}
	return false;
}

function moveFlare3(flare,flareback,dir,rate) {
	flare.x = flare.xorigin + dir*20*Math.sin(rate*(flare.y-flare.yorigin)*Math.PI/100);
	flare.y += 1;
	flare.lifetime--;
	if (flare.lifetime <= 20) {
		flare.alpha -= .05;
		flareback.alpha -= .0125;
	} else {
		flare.alpha = .9+.1*Math.sin(flare.glowpos/4);
		flare.scale.set(flare.alpha/2);
		flare.glowpos++;
		if (flare.glowpos % 20 == 0 && flare.glowpos != 100) {
			var smoke = getFromPool('smoke','assets/89.png');
			smoke.pivot.set(70,59); smoke.alpha = 0; smoke.scale.set(.5); smoke.lifetime = 260-flare.glowpos; smoke.position.set(flare.x,flare.y);
			updates.push([moveSmoke,[smoke,.004,.025,(Math.random()<.5)? -.03:.03,.0002]]); stage.addChild(smoke); smoke.notpersistent = true;
		}
	}
	flareback.x = flare.x; flareback.y = flare.y;
	if (flare.lifetime <= 0) {
		recycle(flare);
		recycle(flareback);
		return true;
	}
	return false;
}

function moveSmoke(smoke,fadeinspeed,fadeoutspeed,spinspeed,growspeed) {
	smoke.rotation += spinspeed;
	smoke.scale.set(smoke.scale.x+growspeed);
	if (smoke.lifetime <= smoke.alpha/fadeoutspeed) smoke.alpha -= fadeoutspeed;
	else if (smoke.alpha < 1) smoke.alpha += fadeinspeed;
	smoke.lifetime--;
	if (smoke.lifetime <= 0) {
		recycle(smoke);
		return true;
	}
	return false;
}

function createSearchlight(ship) {
	var light = getFromPool('searchlight','assets/96.png'); light.notpersistent = true;
	if (ship.side == 0) { light.position.set(ship.graphic.x+160,ship.graphic.y-15); light.dir = 1; }
	else { light.position.set(ship.graphic.x+10,ship.graphic.y-15); light.dir = -1; }
	stage.addChild(light); light.alpha = 0; light.lifetime = 150; updates.push([moveSearchlight,[light]]);
}
function moveSearchlight(light) {
	light.lifetime--;
	if (light.lifetime < 20) light.alpha -= .05;
	else light.alpha += .015;
	if (light.alpha > 1) light.alpha = 0;
	light.scale.x = light.dir - light.dir*.05*Math.cos(light.lifetime*.075);
	if (light.lifetime <= 0) {
		recycle(light);
		return true;
	}
	return false;
}

function NBstart(flares,contact,bgm,combinedEType,isFriend) {
	flares = flares || [-1,-1];
	contact = contact || [-1,-1];
	var wait = false;
	if (COMBINED && !isFriend) {
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
		wait = true;
	}
	if (combinedEType==1) { //fight main fleet
		var k2 = 0;
		for (var i=0; i<3; i++) {
			if (i >= fleet2C.length) break;
			addTimeout(function() {
				updates.push([shipMoveToV,[fleet2C[k2],-100,-10]]);
				k2++;
			}, 200+i*100);
		}
		var kk2 = fleet2C.length-1;
		for (var i=5; i>=3; i--) {
			if (i >= fleet2C.length) continue;
			addTimeout(function() {
				updates.push([shipMoveToV,[fleet2C[kk2],600,10]]);
				kk2--;
			}, 200+(5-i)*100);
		}
		wait = true;
	} else if (combinedEType==2) { //fight escort
		for (var i=0; i<fleet2.length; i++) {
			var j2 = 0;
			addTimeout(function() {
				updates.push([shipMoveTo,[fleet2[j2],1020,10]]);
				j2++;
			}, 100+i*100);
		}
		for (var i=0; i<fleet2C.length; i++) {
			var k2 = 0;
			addTimeout(function() {
				updates.push([shipMoveTo,[fleet2C[k2],631,10]]);
				k2++;
			}, 200+i*100);
			var kk2 = 0;
			addTimeout(function() {
				updates.push([escortFadeInE,[fleet2C[kk2]]]);
				fleet2C[kk2].xorigin = 631;
				fleet2C[kk2].escorte = false;
				kk2++;
			}, 500+i*100);
		}
		wait = true;
	}
	var nbtimer = 0;
	var f1 = (isFriend)? fleetFriend : (COMBINED)? fleet1C : fleet1;
	if (flares[0] != -1 || flares[1] != -1) {
		nbtimer = 5000;
		if (!OLDFORMAT) {
			if (flares[0] > -1) {
				if (flares[0] >= 6) flares[0] -= 6;
				flares[0]++;
			}
			if (flares[1] > -1) {
				if (flares[1] >= 6) flares[1] -= 6;
				flares[1]++;
			}
		}
		if (flares[0] != -1 || flares[1] != -1) { //star shell
			var ship = f1[flares[0]-1], shipE = fleet2[flares[1]-1];
			addTimeout(function() { if (ship) shootFlare(ship); if (shipE) shootFlare(shipE,!!ship); }, (wait)? 1600 : 1);
		}
	}
	var light1 = null, light2 = null;
	for (var i=0; i<f1.length; i++) if (f1[i].hassearchlight && f1[i].hp > 1 && !f1[i].escaped) { light1 = f1[i]; break; }
	for (var i=0; i<fleet2.length; i++) if (fleet2[i].hassearchlight && fleet2[i].hp > 1) { light2 = fleet2[i]; break; }
	if (light1 || light2) {
		if (nbtimer < 2500) nbtimer = 2500;
		addTimeout(function() {
			if (light1) createSearchlight(light1);
			if (light2) createSearchlight(light2);
		}, ((flares[0] != -1 || flares[1] != -1)? 2000 : 1) + ((wait)? 1499:0));
	}
	if (contact[0] > 0) addTimeout(function() { showContact(contact[0],0,true); }, ((wait)? 1499:0));
	if (contact[1] > 0) addTimeout(function() { showContact(contact[1],1,true); }, ((wait)? 1499:0));
	
	if (bgm != SM.BGMnum) {
		SM.stopBGM();
		SM.playBGM(bgm);
	}
		
	addTimeout(function() { ecomplete = true; }, 1+((wait)? 1499:0)+nbtimer);
}

function enemyEscortExit() { //for night-to-day
	var k2 = 0;
	for (var i=0; i<3; i++) {
		if (i >= fleet2C.length) break;
		addTimeout(function() {
			updates.push([shipMoveToV,[fleet2C[k2],-100,-10]]);
			k2++;
		}, 200+i*100);
	}
	var kk2 = fleet2C.length-1;
	for (var i=5; i>=3; i--) {
		if (i >= fleet2C.length) continue;
		addTimeout(function() {
			updates.push([shipMoveToV,[fleet2C[kk2],600,10]]);
			kk2--;
		}, 200+(5-i)*100);
	}
	
	addTimeout(function() { ecomplete = true; }, 1000);
}

function shipMoveToV(ship,target,speed) {
	ship.graphic.y += speed;
	ship.graphic.visible = (ship.graphic.y+44 > 0) && (ship.graphic.y-5 < 480);
	return (speed < 0)? (ship.graphic.y < target) : (ship.graphic.y > target);
}


function friendStart(hps,bgm) {
	if (bgm != SM.BGMnum) {
		SM.stopBGM();
		SM.playBGM(bgm);
	}

	for (var i=0; i<fleetFriend.length; i++) {
		fleetFriend[i].graphic.position.set(-240,77+45*i);
		stage.addChild(fleetFriend[i].graphic);
		shipSetHP(fleetFriend[i],hps[i]);
	}

	for (var i=0; i<fleet1.length; i++) {
		var j = 0;
		addTimeout(function() {
			updates.push([shipMoveTo,[fleet1[j],-220,10]]);
			j++;
		}, 100+i*100);
	}

	if (fleet1C) {
		var k2 = 0;
		for (var i=0; i<3; i++) {
			if (i >= fleet1C.length) break;
			addTimeout(function() {
				updates.push([shipMoveToV,[fleet1C[k2],-100,-10]]);
				k2++;
			}, 200+i*100);
		}
		var kk2 = fleet1C.length-1;
		for (var i=5; i>=3; i--) {
			if (i >= fleet1C.length) continue;
			addTimeout(function() {
				updates.push([shipMoveToV,[fleet1C[kk2],600,10]]);
				kk2--;
			}, 200+(5-i)*100);
		}
	}
	
	addTimeout(function() {
		var j = 0;
		for (var i=0; i<fleetFriend.length; i++) {
			fleetFriend[i].graphic.visible = true;
			addTimeout(function(){
				updates.push([shipMoveTo,[fleetFriend[j],fleetFriend[j].xorigin,10]]);
				j++; SM.play('enter');
			},100+100*i);
		}
	},1000);
	
	addTimeout(function() {
		ecomplete = true;
	}, 2000);
}

function friendExit() {
	var k2 = 0;
	for (var i=0; i<fleetFriend.length; i++) {
		if (i >= fleetFriend.length) break;
		addTimeout(function() {
			updates.push([shipMoveToV,[fleetFriend[k2],-100,-10]]);
			k2++;
		}, 200+i*100);
	}
	
	addTimeout(function() {
		var j = 0;
		for (var i=0; i<fleet1.length; i++) {
			addTimeout(function(){
				updates.push([shipMoveTo,[fleet1[j],fleet1[j].xorigin,10]]);
				j++; SM.play('enter');
			},100+100*i);
		}
		if (fleet1C) {
			for (var i=0; i<fleet1C.length; i++) fleet1C[i].graphic.y = 557+44*i;
			var jj = 0;
			for (var i=0; i<fleet1C.length; i++) {
				addTimeout(function(){
					updates.push([shipEscortEnter,[fleet1C[jj],77+45*jj]]);
					jj++;
				},1000+100*i);
			}
		}
	},1000);
	
	addTimeout(function() {
		for (var i=0; i<fleetFriend.length; i++) stage.removeChild(fleetFriend[i].graphic);
		ecomplete = true;
	}, 3000);
}

function repairTeam(ship,isgoddess) {
	var repairteam;
	if (isgoddess) repairteam = getFromPool('repairgoddess','assets/Emergency_Repair_Goddess_043_Card.png');
	else repairteam = getFromPool('repairteam','assets/Emergency_Repair_Personnel_042_Card.png');
	stage.addChild(repairteam); repairteam.pivot.set(130,130); repairteam.position.set(ship.graphic.x+80,ship.graphic.y+20);
	repairteam.alpha = 0; repairteam.scale.set(1); repairteam.timer = 120; repairteam.notpersistent = true;
	updates.push([function(repairteam) {
		repairteam.timer--;
		if (repairteam.timer > 70) {
			repairteam.alpha += .02;
			repairteam.scale.set(repairteam.scale.x-.0125);
		} else if (repairteam.timer < 30) {
			repairteam.alpha -= .05;
			repairteam.scale.set(repairteam.scale.x+.03);
		} else if (repairteam.timer <= 0) {
			recycle(repairteam);
			return true;
		}
		return false;
	},[repairteam]]);
		
	addTimeout(function() {
		shipSetHP(ship,(isgoddess)? ship.hpmax : Math.floor(ship.hpmax/5));
	}, 1500);
	
	addTimeout(function() { ecomplete = true; }, 2000);
}

function resetBattle() {
	if (!bg.parent) {
		stage.removeChild(bg2);
		stage.addChildAt(bg,0);
	}
	for (var i=0; i<fleet1.length; i++) {
		fleet1[i].graphic.x = -240;
		fleet1[i].shakepid = 0;
		fleet1[i].graphic.pivot.x = 0;
	}
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
		fleet1C[i].shakepid = 0;
		fleet1C[i].graphic.pivot.x = 0;
	}
	if (fleetFriend) {
		for (var i=0; i<fleetFriend.length; i++) stage.removeChild(fleetFriend[i].graphic);
	}

	for (var i=0; i<fleet2.length; i++) {
		stage.removeChild(fleet2[i].graphic);
		fleet2[i].shakepid = 0;
		fleet2[i].graphic.pivot.x = 0;
		fleet2[i].graphic.x = 871;
		if (fleet2[i].hp != fleet2[i].hpmax) shipSetHP(fleet2[i],fleet2[i].hpmax);
	}
	for (var i=0; i<fleet2C.length; i++) {
		stage.removeChild(fleet2C[i].graphic);
		fleet2C[i].shakepid = 0;
		fleet2C[i].graphic.pivot.x = 0;
		fleet2C[i].graphic.x = fleet2C[i].xorigin = 465;
		fleet2C[i].graphic.y = 624+44*i;
		fleet2C[i].escorte = true;
		if (fleet2C[i].hp != fleet2C[i].hpmax) shipSetHP(fleet2C[i],fleet2C[i].hpmax);
		if (!fleet2C[i].graphic.mask) {
			fleet2C[i].graphic.mask = fleet2C[i].mask;
			fleet2C[i].graphic.addChild(fleet2C[i].graphic.mask);
		}
		fleet2C[i].mask.x = 175;
	}
	
	dots1.removeChildren(); dots2.removeChildren();
	dots1.alpha = dots2.alpha = 0;
	radar1.scale.set(0); radar2.scale.set(0);
	
	$('#plEngage').text('');
	$('#plEngageT').text('');
	if (ENGAGEPIDS[0]) { clearInterval(ENGAGEPIDS[0]); ENGAGEPIDS[0] = null; }
	if (ENGAGEPIDS[1]) { clearTimeout(ENGAGEPIDS[1]); ENGAGEPIDS[1] = null; }
	$('#plAS1').text('');
	$('#plAS2').text('');
	bossBarReset();
}

function shuttersNextBattle(battledata, newships) {
	shutterTop.alpha = shutterBottom.alpha = 1;
	updates.push([closeShutters,[]]);
	SM.play('shutters');
	addTimeout(function(){
		resetBattle();
		if (battledata[5]=='1') { stage.removeChild(bg); stage.addChildAt(bg2,0); } //must be done ahead of time if shutters going up
		
		updates.push([openShutters,[]]);
		SM.play('shutters');
	},1000);
	addTimeout(function(){ ecomplete = true; }, 1500);
}

function shutters(nightToDay) {
	// shutterTop.y = -shutterTop.height;
	// shutterBottom.y = 480;
	shutterTop.alpha = shutterBottom.alpha = 1;
	updates.push([closeShutters,[]]);
	SM.play('shutters');
	addTimeout(function(){
		if (nightToDay) {
			stage.removeChild(bg2);
			stage.addChildAt(bg,0);
		} else {
			stage.removeChild(bg);
			stage.addChildAt(bg2,0);
		}
		updates.push([openShutters,[]]);
		SM.play('shutters');
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
		shutterTop.alpha = shutterBottom.alpha = 0;
		return true;
	}
	return false;
}

function wait(time,stopBGM) {
	addTimeout(function(){ ecomplete = true; }, time);
	if (stopBGM) SM.fadeBGM();
}

function skipToBattle(battle) {
	if (battle > battlestarts.length) battle = battlestarts.length;
	// console.log(battle);
	statechangefunc = function() {
		updates = [];
		timeouts = [];
		ecomplete = true;
		
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
			if (fleet1[i].hp != hps.fleet1[i] || fleet1[i].escaped) shipSetHP(fleet1[i],hps.fleet1[i]);
		}
		if (COMBINED) {
			for (var i=0; i<fleet1C.length; i++) {
				if (fleet1C[i].hp != hps.fleet1C[i] || fleet1C[i].escaped) shipSetHP(fleet1C[i],hps.fleet1C[i]);
			}
		}
		shutterTop.y = -246; shutterTop.alpha = 0;
		shutterBottom.y = 456; shutterBottom.alpha = 0;
		SM.stopBGM();
	}
}

var CANRESET = true;
function reset(callback) {
	if (!CANRESET) return;
	// END = true;
	CANRESET = false;
	statechangefunc = function() {
		PAUSE = true;
		stage.removeChildren();
		for (var i=0; i<fleet1.length; i++) {
			fleet1[i].shakepid = 0; if (fleet1[i].graphic.pivot) fleet1[i].graphic.pivot.x = 0;
			for (var j=0; j<fleet1[i].graphic.children.length; j++) fleet1[i].graphic.getChildAt(j).destroy();
			fleet1[i].graphic.destroy();
		}
		for (var i=0; i<fleet1C.length; i++) {
			fleet1C[i].shakepid = 0; if (fleet1C[i].graphic.pivot) fleet1C[i].graphic.pivot.x = 0;
			for (var j=0; j<fleet1C[i].graphic.children.length; j++) fleet1C[i].graphic.getChildAt(j).destroy();
			fleet1C[i].graphic.destroy();
		}
		fleet1C = [];
		for (var k=0; k<allfleets2.length; k++) {
			for (var i=0; i<allfleets2[k].length; i++) {
				var ship = allfleets2[k][i];
				ship.shakepid = 0; if (ship.graphic.pivot) ship.graphic.pivot.x = 0;
				for (var j=0; j<ship.graphic.children.length; j++) ship.graphic.getChildAt(j).destroy();
				ship.graphic.destroy();
			}
		}
		allfleets2 = [];
		for (var k=0; k<allfleets2c.length; k++) {
			for (var i=0; i<allfleets2c[k].length; i++) {
				var ship = allfleets2c[k][i];
				ship.shakepid = 0; if (ship.graphic.pivot) ship.graphic.pivot.x = 0;
				for (var j=0; j<ship.graphic.children.length; j++) ship.graphic.getChildAt(j).destroy();
				ship.graphic.destroy();
			}
		}
		allfleets2c = [];
		stage.addChild(bg);
		radar1.scale.set(0); radar2.scale.set(0);
		stage.addChild(radar1);
		stage.addChild(radar2);
		// for (var i=0; i<dots1.children.length; i++) dots1.getChildAt(i).destroy();
		// for (var i=0; i<dots2.children.length; i++) dots2.getChildAt(i).destroy();
		// dots1.removeChildren(); dots2.removeChildren();
		while (dots1.children.length) recycle(dots1.getChildAt(0));
		while (dots2.children.length) recycle(dots2.getChildAt(0));
		dots1.alpha = dots2.alpha = 0;
		stage.addChild(dots1);
		stage.addChild(dots2);
		$('#plEngage').text('');
		$('#plEngageT').text('');
		$('#plAS1').text('');
		$('#plAS2').text('');
		bossBarReset();
		updates = [];
		timeouts = [];
		eventqueue = [];
		fleet1 = [];
		fleet2 = [];
		fleetFriend = null;
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
	$('#plAS1').text(['AI','AD','AP','AS','AS+'][AS1+2]);
	$('#plAS1').css('opacity','0');
	$('#plAS2').text(['AI','AD','AP','AS','AS+'][AS2+2]);
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
	c.fillStyle = (side==0)?'#00ff00':'#ff0000';
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
		shutterTop.y = -246; shutterBottom.y = 456; shutterTop.alpha = shutterBottom.alpha = 0;
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
function loadCode(fromOwn,callback) {
	if (!CANRESET) return;
	var f = function() {
		CANRESET = false;
		$('#error').text('');
		try { 
			if (!fromOwn) {
				var apitxt = document.getElementById("code").value;
				if (apitxt[apitxt.length-1] != '}') {  //try clean random trailing characters
					apitxt = apitxt.slice(0,apitxt.lastIndexOf('}')+1); 
					$('#code').val(apitxt);
				}
				API = JSON.parse(apitxt);
			}
			processAPI(API);
			if (callback) callback(API);
		} catch(e) {
			console.log(e);
			document.getElementById("error").innerHTML = 'Error';
			CANRESET = true;
			return;
		}
		started = true;
		CANRESET = true;
	};
	$('#error').text('Loading');
	HASLOADTEXT = true;
	if (started) reset(f);
	else f();
}

function bossBarReset() {
	stage.removeChild(bossbar);
	bossbar.alpha = 0;
	bossbar.position.set(540,-4);
	bossbarback.scale.x = 146;
	bossbar.active = false;
	bossbar.timer = 30;
	bossbar.nowhp = (bossbar.mode==2)? API.now_maphp : Math.max(1,bossbar.maxhp - API.defeat_count);
}

function bossBarAppear() {
	if (bossbar.alpha < 1) bossbar.alpha += .05;
	else bossbar.alpha = 1;
	bossbar.y += 1;
	if (bossbar.y >= 16) {
		bossbar.y = 16;
		updates.push([bossBarMove,[]]);
		return true;
	}
	return false;
}

function bossBarMove() {
	bossbarback.scale.x--;
	var percentbar = bossbarback.scale.x/146;
	var percenthp = bossbar.nowhp/bossbar.maxhp;
	if (percentbar < percenthp) {
		bossbarback.scale.x++;
		return true;
	}
	return false;
}

function bossBarExplode() {
	bossbar.nowhp = -1;
	bossbar.timer--;
	bossbar.alpha = bossbar.timer/30;
	if (bossbar.timer == 29) { createExplosion(bossbar.x+100,Math.random()*35+31); SM.play('fire'); }
	if (bossbar.timer == 19) { createExplosion(bossbar.x+160,Math.random()*35+31); SM.play('fire'); }
	if (bossbar.timer == 14) { createExplosion(bossbar.x+220,Math.random()*35+31); SM.play('fire'); }
	if (bossbar.timer <= 0) {
		//bossBarReset();
		return true;
	}
	return false;
}

function createAirText(num) {
	var text;
	switch (num) {
		case -2: text = getFromPool('AI','assets/387_res.battle.images.SeikuuTextSoushitsuImage.png'); break;
		case 1: text = getFromPool('AS','assets/388_res.battle.images.SeikuuTextYuseiImage.png'); break;
		case 2: text = getFromPool('AS+','assets/386_res.battle.images.SeikuuTextKakuhoImage.png'); break;
		default: return;
	}
	text.position.set(301,369);
	text.alpha = 0;
	text.notpersistent = true;
	stage.addChild(text);
	
	updates.push([function() {
		text.alpha += .05;
		if (text.alpha >= 1) {
			text.alpha = 1;
			return true;
		}
		return false;
	},[]]);
	
	addTimeout(function() {
		updates.push([function() {
			text.alpha -= .05;
			if (text.alpha <= 0) {
				recycle(text);
				return true;
			}
			return false;
		},[]]);
	}, 1500);
}

function showContact(planeid,side,nightscout) {
	var text;
	if (nightscout) {
		text = getFromPool('contactnight','assets/contactnight.png');
		if (side==0) text.position.set(668,101);
		else text.position.set(18,radar1.y+23);
	} else {
		text = getFromPool('contact','assets/contact.png');
		if (side==0) text.position.set(689,101);
		else text.position.set(39,radar1.y+23);
	}
	text.alpha = 0; text.counter = 0; text.notpersistent = true;
	
	var plane;
	if (nightscout) {
		plane = getFromPool('p102','assets/p102.png');
	} else {
		switch (EQDATA[planeid] && EQDATA[planeid].b_image) {
			case 3: case 4: case 5: plane = getFromPool('p516','assets/p516.png'); break;
			case 6: case 7: case 8: case 9: case 10: plane = getFromPool('p549','assets/p549.png'); break;
			default:
				if (planeid < 500) plane = getFromPool('p54','assets/p54.png');
				else plane = getFromPool('p516','assets/p516.png');
				break;
		}
	}
	plane.pivot.set(36,54);
	if (nightscout) plane.rotation = (side==0)? -2*Math.PI/14.4 : 2*Math.PI/14.4;
	if (side==0) { plane.position.set(725,80); plane.scale.x = -1; }
	else { plane.position.set(75,radar1.y+2); plane.scale.x = 1; }
	plane.alpha = 0; plane.notpersistent = true;
	plane.yorig = plane.y;
	
	stage.addChild(plane);
	stage.addChild(text);
	
	updates.push([function() {
		if (text.counter%60 < 10) text.alpha += .1;
		else if (text.counter%60 >= 40 && text.counter%60 < 50) text.alpha -= .1;
		
		plane.y = plane.yorig + 3*Math.sin(text.counter/15);
		if (text.counter%4==0) plane.x += 1;
		else if (text.counter%4==2) plane.x -= 1;
		if (text.counter < 5) plane.alpha += .2;
		// else if (text.counter == 20) plane.alpha = 0;
		// else if (text.counter == 60) plane.alpha = 1;
		else if (text.counter >= 220 && text.counter < 230) plane.alpha -= .1;
		
		text.counter++;
		if (text.counter >= 240) {
			recycle(text); recycle(plane);
			return true;
		}
		return false;
	},[]]);
}