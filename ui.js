// var o = document.createElement('option');
// o.setAttribute('value',options[i][1]);
// o.appendChild(document.createTextNode(options[i][0]));
// document.getElementById('Sh'+s+'F'+f).appendChild(o);
var STATNAMES = ['lvl','hp','fp','tp','aa','ar','ev','asw','los','luk','rng','spd'];
var PREVEQS = {};
var WROTESTATS = false;
var TUTORIAL = false;

var IMPROVEHTMLNONE = '<option value="0"></option>';
var IMPROVEHTMLAKASHI = '<option value="0">+0</option><option value="1">+1</option><option value="2">+2</option><option value="3">+3</option><option value="4">+4</option><option value="5">+5</option><option value="6">+6</option><option value="7">+7</option><option value="8">+8</option><option value="9">+9</option><option value="10">MAX</option>';
var IMPROVEHTMLPLANE = '<option value="0"></option><option value="1" style="color:#4A84B5">|</option><option value="2" style="color:#4A84B5">||</option><option value="3" style="color:#4A84B5">|||</option><option value="4" style="color:#D49C0A">/</option><option value="5" style="color:#D49C0A">//</option><option value="6" style="color:#D49C0A">///</option><option value="7" style="color:#D49C0A">&gt;&gt;</option>';

function transNames(lang) {
	if (lang != 'JP' && lang != 'EN') return;
	if (lang=='JP') {
		for (var mid in SHIPDATA) {
			var ship = SHIPDATA[mid];
			if (ship.nameJP) { ship.nameEN = ship.name; ship.name = ship.nameJP; }
		}
		for (var eqid in EQDATA) {
			var eq = EQDATA[eqid];
			if (eq.nameJP) { eq.nameEN = eq.name; eq.name = eq.nameJP; }
		}
	} else if (lang == 'EN') {
		for (var mid in SHIPDATA) {
			var ship = SHIPDATA[mid];
			if (ship.nameEN) ship.name = ship.nameEN;
		}
		for (var eqid in EQDATA) {
			var eq = EQDATA[eqid];
			if (eq.nameEN) eq.name = eq.nameEN;
		}
	}
	$('.fleet').each(function() {
		var id = $(this).attr('id');
		for (var i=0; i<6; i++) {
			$('#'+id+'n'+i).children().each(function() {
				$(this).children().each(function() {
					$(this).text(SHIPDATA[$(this).val()].name);
				});
			});
			$('#'+id+'n'+i).trigger('chosen:updated');
			for (var j=0; j<4; j++) {
				$('#'+id+'e'+i+j).children().each(function() {
					$(this).children().each(function() {
						$(this).text(EQDATA[$(this).val()].name);
					});
				});
				$('#'+id+'e'+i+j).trigger('chosen:updated');
			}
		}
	});
}

$('#dialogselclass').dialog({autoOpen:false,width:690,height:600});
$('#dialogselship').dialog({autoOpen:false,width:720,height:480});
$('#dialogselequiptype').dialog({autoOpen:false,width:690,height:480});
$('#dialogselequip').dialog({autoOpen:false,width:400,height:600});
$('#dialogkc3file').dialog({autoOpen:false,width:720,height:400});
function showKC3QDpopup() {
	$('#dialogkc3file').dialog("open");
}
var SELFLEET, SELSLOT, SELEQ;
function dialogType(button,fleet,slot) {
	SELFLEET = fleet; SELSLOT = slot;
	$('#dialogselclass').dialog("option","position",{my:"center",at:"center",of:window});
	$('#dialogselclass').dialog("open");
	$('#dialogselship').dialog("close");
	$('#dialogselequiptype').dialog("close");
	$('#dialogselequip').dialog("close");
}
function dialogShip(types,side) {
	$('#dialogselship').html('');
	var table = $('<table class="dialog2"></table>');
	$('#dialogselship').append(table);
	var c=0, tr = $('<tr></tr>'), baseships = [], done = [];
	for (var mid in SHIPDATA) {
		var ship = SHIPDATA[mid];
		if ((side==0&&mid>=500)||(side==1&&(mid<500||mid>800))||types.indexOf(ship.type)==-1) continue;
		if (ship.prev && SHIPDATA[ship.prev].type==ship.type) continue;
		if (done.indexOf(mid)==-1) {
			var ships = [mid]; done.push(mid);
			while (ship.next) {
				mid = ship.next;
				ship = SHIPDATA[mid];
				if (ships.indexOf(mid)!=-1||types.indexOf(ship.type)==-1) break; else ships.push(mid);
				done.push(mid.toString());
			}
			baseships.push(ships);
		}
	}
	if (side==0) baseships.sort(function(a,b) {return (SHIPDATA[a[0]].nid<SHIPDATA[b[0]].nid)?-1:1;});
	for (var i=0; i<baseships.length; i++) {
		var shiplast = SHIPDATA[baseships[i][baseships[i].length-1]];
		var shipbase = SHIPDATA[baseships[i][0]];
		if (--c<=0) { c=4; table.append(tr); tr = $('<tr></tr>'); }
		var html = '<td><img src="assets/icons/'+shiplast.image+'" onclick="dSetShip('+baseships[i][baseships[i].length-1]+')"/><br>';
		if (side==1) html = html.replace('<td>','<td onclick="dSetShip('+baseships[i][baseships[i].length-1]+')" style="cursor:pointer">');
		var namechange = (shiplast.name.indexOf(shipbase.name)!=-1);
		if (namechange) html+='<span>'+shipbase.name+'</span><br>';
		else html+='<span>'+shiplast.name+'</span><br>';
		if (side==0) {
			if (namechange) html+='<span onclick="dSetShip('+baseships[i][0]+')" class="dialogkai">Base</span>';
			else html+='<span onclick="dSetShip('+baseships[i][0]+')" class="dialogkai">'+shipbase.name+'</span>';
			for (var j=1; j<baseships[i].length; j++) {
				var name = (SHIPDATA[baseships[i][j]].name.indexOf(shipbase.name)!=-1)? SHIPDATA[baseships[i][j]].name.substr(shipbase.name.length).trim() : SHIPDATA[baseships[i][j]].name;
				html+='<span onclick="dSetShip('+baseships[i][j]+')" class="dialogkai">'+name+'</span>';
			}
		} else html+='<br>'
		tr.append(html);
	}
	table.append(tr);
	// $('#dialogselclass').dialog("close");
	$('#dialogselship').dialog("open");
}

function dialogShipFog() {
	$('#dialogselship').html('<table class="dialog2"><tr><td onclick="dSetShip(901)"><img src="assets/icons/AIona.png"><br><span>Iona</span><br></td><td onclick="dSetShip(902)"><img src="assets/icons/ATakao.png"><br><span>Takao</span><br></td><td onclick="dSetShip(903)"><img src="assets/icons/AHaruna.png"><br><span>Haruna</span><br></td></tr><tr><td onclick="dSetShip(904)"><img src="assets/icons/AKirishima.png"><br><span>Kirishima</span><br></td><td onclick="dSetShip(905)"><img src="assets/icons/AMaya.png"><br><span>Maya</span><br></td><td onclick="dSetShip(906)"><img src="assets/icons/AKongou.jpg"><br><span>Kongou</span><br></td><td onclick="dSetShip(907)"><img src="assets/icons/ANagara.png"><br><span>Nagara-Class</span><br></td></tr></table>');
	$('#dialogselship').dialog("open");
}

function dialogShipSecret() {
	$('#dialogselship').html('<table class="dialog2"><tr><td onclick="dSetShip(1001)"><img src="assets/icons/KShinano.png"><br><span>???????</span><br></td></tr></table><br><br><table class="dialog2"><tr><td onclick="dSetShip(1002)"><img src="assets/icons/SBYamato.png"><br><span>????? ?????????? ??????</span><br></td></tr></table>');
	$('#dialogselship').dialog("open");
}

function dSetShip(mid) {
	if (SELFLEET===undefined || SELSLOT===undefined) return;
	$('#dialogselship').dialog("close");
	$('#dialogselclass').dialog("close");
	$('#T'+SELFLEET+'n'+SELSLOT).val(mid);
	$('#T'+SELFLEET+'n'+SELSLOT).trigger("chosen:updated");
	changedShipForm(SELFLEET,SELSLOT);
	updateFleetCode(SELFLEET);
	SELFLEET = SELSLOT = undefined;
}

function dSetEquip(eqid) {
	if (SELFLEET===undefined || SELSLOT===undefined || SELEQ===undefined) return;
	$('#dialogselequiptype').dialog("close");
	$('#dialogselequip').dialog("close");
	$('#T'+SELFLEET+'e'+SELSLOT+SELEQ).val(eqid);
	$('#T'+SELFLEET+'e'+SELSLOT+SELEQ).trigger("chosen:updated");
	changedEquip(SELFLEET,SELSLOT,SELEQ);
	updateFleetCode(SELFLEET);
	SELFLEET = SELSLOT = SELEQ = undefined;
}

function dialogEquipType(button,fleet,slot,equipslot) {
	SELFLEET = fleet; SELSLOT = slot; SELEQ = equipslot;
	$('#dialogselequiptype').dialog("open");
	$('#dialogselequiptype').dialog("option","position",{my:"center",at:"center",of:window});
	$('#dialogselship').dialog("close");
	$('#dialogselclass').dialog("close");
}

function dialogEquip(types) {
	$('#dialogselequip').html('');
	for (var k=0; k<2; k++) {
		if (k==0) $('#dialogselequip').append('<span>Player:</span><br>');
		else $('#dialogselequip').append('<span>Abyssal:</span><br>');
		var table = $('<table class="dialog3"></table>');
		var STATS = ['DIVEBOMB','FP','TP','AA','AR','ACC','EV','ASW','LOS'];
		for (var eqid in EQDATA) {
			if ((k==0&&eqid>=500)||(k==1&&eqid<500)) continue;
			var equip = EQDATA[eqid];
			if (types.indexOf(equip.type)==-1) continue;
			var tr = $('<tr></tr>');
			tr.append('<td class="left" onclick="dSetEquip('+eqid+')"><img src="assets/items/'+EQIMAGES[equip.type]+'.png"/></td>');
			var td = $('<td onclick="dSetEquip('+eqid+')"></td>');
			td.append('<span>'+equip.name+'</span><br>');
			for (var j=0; j<STATS.length; j++) {
				if (equip[STATS[j]]) td.append('<span><img class="imgstat" src="assets/stats/'+STATS[j].toLowerCase()+'.png"/>'+equip[STATS[j]]+'</span>');
			}
			tr.append(td);
			table.append(tr);
		}
		$('#dialogselequip').append(table);
		if (k==0) $('#dialogselequip').append('<br>');
	}
	$('#dialogselequip').dialog("open");
}

function genFleetHTML(rootid,fleetnum,fleetname,tabcolor) {
	if (!tabcolor) tabcolor = '#CCCCCC';
    var root = document.getElementById(rootid);
    PREVEQS[fleetnum] = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var tid = 'T'+fleetnum;
    var da = document.createElement('div');
    da.setAttribute('id',tid);
    da.setAttribute('class','fleet');
    // da.setAttribute('height',');
    da.setAttribute('style','width:980px; border:1px solid black');
     
    var dhead = document.createElement('div');
    dhead.setAttribute('id',tid+'head');
    dhead.setAttribute('class','clickable');
    dhead.setAttribute('style','background-color:'+tabcolor);
    dhead.setAttribute('onClick','clickedExpandFleet('+fleetnum+')');
    var b = document.createElement('b');
    b.appendChild(document.createTextNode(fleetname));
    dhead.appendChild(b);
    var b2 = document.createElement('span');
    b2.innerHTML = '[<b>+</b>]';
    b2.setAttribute('id',tid+'headpm');
    b2.setAttribute('style','font-size:16px;float:right;padding-right:8px');
    dhead.appendChild(b2);
    da.appendChild(dhead);
     
    var dalt = document.createElement('div');
    // dalt.setAttribute('style','display:none');
    dalt.setAttribute('id',tid+'min');
	dalt.setAttribute('class','clickable');
	dalt.setAttribute('onClick','clickedExpandFleet('+fleetnum+')');
	var talt = document.createElement('table');
	talt.setAttribute('class','t1');
    var tralt = document.createElement('tr');
	for (var i=0; i<6; i++) {
		var td = document.createElement('td');
		var img = document.createElement('img');
		img.setAttribute('width','160');
		img.setAttribute('height','40');
		img.setAttribute('src','assets/icons/Kblank.png');
		img.setAttribute('id',tid+'i'+i+'alt');
		td.appendChild(img);
		tralt.appendChild(td);
	}
	talt.appendChild(tralt);
	dalt.appendChild(talt);
    da.appendChild(dalt);
     
    var d = document.createElement('div');
    d.setAttribute('style','display:none');
    d.setAttribute('id',tid+'full');
	
	var dl = document.createElement('div');
	dl.appendChild(document.createElement('br'));
	dl.appendChild(document.createTextNode('Load options:'));
	dl.setAttribute('style','float:left;width:200px');
	d.appendChild(dl);
	dl = document.createElement('div');
	dl.setAttribute('style','float:left;width:250px');
	dl.innerHTML = '<b>From code:</b><br><textarea id="{tid}tcode" cols="20" rows="2" autocomplete="off" ></textarea><br><input type="button" id="{tid}codeb" value="Load" onClick="clickedLoadFromCode({nt})"/><br><br>'.replace(/{tid}/g,tid).replace(/{nt}/g,fleetnum);
	d.appendChild(dl);
	dl = document.createElement('div');
	dl.setAttribute('style','float:left;width:250px');
	if (TUTORIAL && fleetnum==1) {
		$(dl).attr('id','flashingdiv');
		$(dl).css('border','3px solid red');
		$(dl).css('animation','flashing .75s linear 0s infinite alternate');
	}
	$(dl).append('<b>From .kc3 file:(<a href="#" id="'+tid+'qdq" onclick="showKC3QDpopup()">?</a>):</b><br>');
	$(dl).append('<span>Fleet: </span><select id="T'+fleetnum+'sfilefrom"><option>1</option><option>2</option><option>3</option><option>4</option></select><br>');
	$(dl).append('<input id="'+tid+'sfile" type="file" accept=".kc3" onChange="loadFile('+fleetnum+')" /><br>');
	// $(dl).append('<div style="display:none;position:absolute" id="qdinfo'+fleetnum+'"><div style="background-color:white;border:1px solid black;position:relative;top:-200px;left:140px;width:400px;height:250px"><p style="margin:10px 10px;font-size:12px">You can import your in-game fleet using KC3Kai\'s Quick Data file.<br><br>Go to Profile</p></div><div>');
	d.appendChild(dl);
	dl = document.createElement('div');
	// dl.setAttribute('style','float:left;width:250px');
	dl.innerHTML = '<b>From preset:</b><br>'; //<select id="{tid}pre1"></select> <select id="{tid}pre2"></select> <select id="{tid}pre3"></select>'.replace(/{tid}/g,tid);
	var sel1 = document.createElement('select');  //world+level
	sel1.setAttribute('id',tid+'pre1');
	sel1.setAttribute('title','Map');
	sel1.setAttribute('onChange','changedPreset1('+fleetnum+')');
	var o = document.createElement('option');
	o.setAttribute('value','');
	sel1.appendChild(o);
	dl.appendChild(sel1);
	dl.appendChild(document.createTextNode(' '));
	var sel2 = document.createElement('select');  //nodes
	sel2.setAttribute('id',tid+'pre2');
	sel2.setAttribute('title','Node');
	sel2.setAttribute('onChange','changedPreset2('+fleetnum+')');
	var o = document.createElement('option');
	o.setAttribute('value','');
	sel2.appendChild(o);
	dl.appendChild(sel2);
	dl.appendChild(document.createTextNode(' '));
	var sel3 = document.createElement('select');  //comps
	sel3.setAttribute('id',tid+'pre3');
	sel3.setAttribute('title','Comp');
	sel3.setAttribute('onChange','changedPreset3('+fleetnum+')');
	var o = document.createElement('option');
	o.setAttribute('value','');
	sel3.appendChild(o);
	dl.appendChild(sel3);
	dl.appendChild(document.createElement('br'));
	if (TUTORIAL && fleetnum==2) {
		$(sel1).css('border','3px solid red');
		$(sel1).css('animation','flashing .75s linear 0s infinite alternate');
	}
	// var btn = document.createElement('input');
	// btn.setAttribute('type','button');
	// btn.setAttribute('onClick','clickedLoadPreset('+fleetnum+');updateFleetCode('+fleetnum+')');
	// btn.setAttribute('value','Load');
	// dl.appendChild(btn);
	d.appendChild(dl);
	for (world in ENEMYCOMPS) {
		var g = document.createElement('optgroup');
		g.setAttribute('label',world);
		for (level in ENEMYCOMPS[world]) {
			var o = document.createElement('option');
			o.setAttribute('value',world+'|'+level);
			o.appendChild(document.createTextNode(level));
			g.appendChild(o);
		}
		sel1.appendChild(g);
	}
	var btnall = document.createElement('input');
	btnall.setAttribute('value','Clear All');
	btnall.setAttribute('type','button');
	btnall.setAttribute('style','float:right');
	btnall.setAttribute('onclick','clickedClear({f},1);clickedClear({f},2);clickedClear({f},3);clickedClear({f},4);clickedClear({f},5);clickedClear({f},0);'.replace(/{f}/g,fleetnum.toString()));
	d.appendChild(btnall);
	
    var t = document.createElement('table');
    t.setAttribute('class','t1');
    var tr = document.createElement('tr'); //number, clear button
    for (var i=0; i<6; i++) {
        var td = document.createElement('th');
        td.setAttribute('colspan','2');
        // var num = document.createTextNode((i+1).toString());
		var num = document.createElement('img');
		num.setAttribute('src','assets/stats/F'+(i+1)+'.png');
        // var b = document.createElement('input');
        // b.setAttribute('type','button');
        // b.setAttribute('value','Clear');
        // b.setAttribute('id',tid+'clb'+i);
        // b.setAttribute('onClick','clickedClear('+fleetnum+','+i+');updateFleetCode('+fleetnum+')');
        td.appendChild(num);
        // td.appendChild(b);
        tr.appendChild(td);
    }
    t.appendChild(tr);
     
    var tr = document.createElement('tr'); //name selecter
    for (var i=0; i<6; i++) {
        var td = document.createElement('td');
        td.setAttribute('colspan','2');
        var sel = document.createElement('select');
        sel.setAttribute('id',tid+'n'+i);
        var o = document.createElement('option');
        o.appendChild(document.createTextNode(''));
        o.setAttribute('value',0);
        sel.appendChild(o);
        // for (var j=0; j<SHIPIDSORTED.length; j++) {  //player ships
            // var o = document.createElement('option');
            // o.appendChild(document.createTextNode(SHIPDATA[SHIPIDSORTED[j]].name));
            // o.setAttribute('value',SHIPIDSORTED[j]);
            // sel.appendChild(o);
        // }
		for (type in SHIPCLASSSORTED) {  //player ships
			var g = document.createElement('optgroup');
			g.setAttribute('label',type);
			for (var j=0; j<SHIPCLASSSORTED[type].length; j++) {
				var o = document.createElement('option');
				o.setAttribute('value',SHIPCLASSSORTED[type][j]);
				o.appendChild(document.createTextNode(SHIPDATA[SHIPCLASSSORTED[type][j]].name));
				g.appendChild(o);
			}
			sel.appendChild(g);
		}
		var g1 = document.createElement('optgroup');
		g1.setAttribute('label','Abyssals');
		var g2 = document.createElement('optgroup');
		g2.setAttribute('label','???');
		var g3 = document.createElement('optgroup');
		g3.setAttribute('label','Fleet of Fog');
		for (shipid in SHIPDATA) {  //enemies
			if (shipid < 500) continue;
			var o = document.createElement('option');
			o.appendChild(document.createTextNode(SHIPDATA[shipid].name));
			o.setAttribute('value',shipid);
			if (shipid < 900) g1.appendChild(o);
			else if (shipid < 1000) g3.appendChild(o);
			else g2.appendChild(o);
		}
		sel.appendChild(g1);
		sel.appendChild(g3);
		sel.appendChild(g2);
		
        sel.setAttribute('onChange','changedShipForm('+fleetnum+','+i+');updateFleetCode('+fleetnum+')');
        td.appendChild(sel);
		$(sel).chosen({width:'140px',search_contains:true,allow_single_deselect:true});
		$(td).append('<img class="searchbutton" src="assets/stats/search.png" onclick="dialogType(this,'+fleetnum+','+i+')" />');
        tr.appendChild(td);
    }
    t.appendChild(tr);
     
    tr = document.createElement('tr'); //images
    for (var i=0; i<6; i++) {
        var td = document.createElement('td');
        td.setAttribute('colspan','2');
        var img = document.createElement('img');
        img.setAttribute('width','160');
        img.setAttribute('height','40');
        img.setAttribute('src','assets/icons/Kblank.png'); //
        img.setAttribute('id',tid+'i'+i);
        img.setAttribute('class','clear');
		img.setAttribute('draggable','false'); //change to true when ship loaded
		// img.setAttribute('style','cursor:move');
		img.setAttribute('ondragstart','shipDragStarted('+fleetnum+','+i+')');
		img.setAttribute('ondragover','event.preventDefault()');
		img.setAttribute('ondrop','event.preventDefault();shipDragDropped('+fleetnum+','+i+')');
		img.setAttribute('title',''); //Drag to swap slots, add later
        td.appendChild(img);
        tr.appendChild(td);
    }
    t.appendChild(tr);
     
    var stats = [  //stats
        [['lvl','lv.png',1,150],['hp','hp.png',1,999]],
        [['fp','fp.png',0,999],['tp','tp.png',0,999]],
        [['aa','aa.png',0,999],['ar','ar.png',0,999]],
        [['ev','ev.png',1,999],['asw','asw.png',0,999]],
        [['spd','sp.png',0,10],['los','los.png',0,999]],
        [['rng','rn.png',0,4],['luk','lk.png',0,99]],
    ];
    for (var i=0; i<stats.length; i++) {
        tr = document.createElement('tr');
        var id1 = stats[i][0][0], src1 = stats[i][0][1], id2 = stats[i][1][0], src2 = stats[i][1][1];
        for (var j=0; j<6; j++) {
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var s1 = document.createElement('input');
            s1.setAttribute('type','number');
            s1.setAttribute('id',tid+id1+j);
            s1.setAttribute('onChange','changedNum('+fleetnum+','+j+',"'+id1+'");updateFleetCode('+fleetnum+')');
            s1.setAttribute('min',stats[i][0][2]);
            s1.setAttribute('max',stats[i][0][3]);
			s1.setAttribute('ondragover','return false;');
            var simg1 = document.createElement('img');
            simg1.setAttribute('src','assets/stats/'+src1);
            var s2 = document.createElement('input');
            s2.setAttribute('type','number');
            s2.setAttribute('id',tid+id2+j);
            s2.setAttribute('onChange','changedNum('+fleetnum+','+j+',"'+id2+'");updateFleetCode('+fleetnum+')');
            s2.setAttribute('min',stats[i][1][2]);
            s2.setAttribute('max',stats[i][1][3]);
			s2.setAttribute('ondragover','return false;');
            var simg2 = document.createElement('img');
            simg2.setAttribute('src','assets/stats/'+src2);
            td1.appendChild(simg1);
            td1.appendChild(s1);
            td2.appendChild(simg2);
            td2.appendChild(s2);
            tr.appendChild(td1);
            tr.appendChild(td2);
        }
        t.appendChild(tr);
    }
     
	var EQSORTED = {};
	for (equipid in EQDATA) {
		var type = EQNAMES[EQDATA[equipid].type];
		if (!EQSORTED[type]) EQSORTED[type] = [];
		EQSORTED[type].push(equipid);
	}
    for (var i=0; i<4; i++) {  //equips
        var tr = document.createElement('tr');
        for (var j=0; j<6; j++) {
            var td = document.createElement('td');
            td.setAttribute('colspan','2');
			
            var sel = document.createElement('select');
            sel.setAttribute('id',tid+'e'+j+i);
            sel.setAttribute('onChange','changedEquip('+fleetnum+','+j+','+i+');updateFleetCode('+fleetnum+')');
            // for (equipid in EQDATA) { //load all equips?
                // var o = document.createElement('option');
                // o.setAttribute('value',equipid);
                // o.appendChild(document.createTextNode(EQDATA[equipid].name));
                // sel.appendChild(o);
            // }
			for (equiptype in EQSORTED) {
				var g = document.createElement('optgroup');
				g.setAttribute('label',equiptype);
				for (var k=0; k<EQSORTED[equiptype].length; k++) {
					var o = document.createElement('option');
					o.setAttribute('value',EQSORTED[equiptype][k]);
					o.appendChild(document.createTextNode(EQDATA[EQSORTED[equiptype][k]].name));
					g.appendChild(o);
				}
				sel.appendChild(g);
			}
            td.appendChild(sel);
			$(sel).chosen({width:'160px',search_contains:true,allow_single_deselect:true});
            
			var sp = document.createElement('span');
			var nid = tid+'imprv'+j+i;
			var plid = tid+'plane'+j+i;
			var imgid = tid+'eqimg'+j+i;
			$(sp).append('<div style="float:left;width:24px;height:24px"><img src="assets/items/0.png" style="position:absolute;width:24;height:24px"/><img id="'+imgid+'" src="assets/items/empty.png" style="position:absolute;width:24px;height:24px"/></div>');
			$(sp).append('<img class="searchbutton" style="float:right" src="assets/stats/search.png" onclick="dialogEquipType(this,'+fleetnum+','+j+','+i+')" />');
			$(sp).append('<input type="number" id="'+plid+'" style="width:35px;float:left" disabled="true"/>');
			$(sp).append('<span style="float:right;font-size:12px;color:#45A9A5">&#9733; <select id="'+nid+'" style="width:50px" onchange="updateFleetCode('+fleetnum+');changedImprove(this)"><option value="0"></option></select></span><br>');
			td.appendChild(sp);
			tr.appendChild(td);
        }
        t.appendChild(tr);
    }
    d.appendChild(t);
    d.appendChild(document.createElement('br'));
    
	if (fleetnum == 11) { //combined fleet, formation and type
		var f = $('<div style="float:left"></div>');
		for (var i=11; i<=14; i++) {
			f.append($('<input type="radio" id="T11r'+i+'" name="T11formation" value="'+i+'" style="vertical-align:middle" onchange="updateFleetCode(11)" '+((i==14)?'checked':'')+'/>'));
			f.append($('<label for="T11r'+i+'"><img src="assets/stats/form'+i+'.png" style="vertical-align:middle"/></label>'));
		}
		$(d).append(f);
		f = $('<div style="float:left;margin-left:50px"></div>');
		var names = ['Carrier Task Force', 'Surface Task Force', 'Transport Task Force'];
		for (var i=1; i<=3; i++) {
			f.append($('<input type="radio" id="T11t'+i+'" name="T11type" value="'+i+'" onchange="updateFleetCode(11)" '+((i==1)?'checked':'')+'/>'));
			f.append($('<label for="T11t'+i+'"><img src="assets/stats/combine'+i+'.png" title="'+names[i-1]+'"/> </label>'));
		}
		$(d).append(f);
		$(d).append('<br style="clear:both">');
	} else if (fleetnum == 12 || fleetnum == 13) {
		var f = $('<div></div>');
		f.append('<input type="radio" id="T12t2" name="T12type" value="2" checked/><label for="T12t2">Shelling</label>');
		f.append('<input type="radio" id="T12t1" name="T12type" value="1" disabled/><label for="T12t1">Airstrike</label>');
		f.append('<input type="radio" id="T12t3" name="T12type" value="3" disabled/><label for="T12t3">Torpedo</label>');
		f.append('<span style="color:red;margin-left:20px">In progress</span>');
		$(d).append(f);
	} else {  //normal formation select
		var f = document.createElement('form');
		f.setAttribute('id',tid+'F');
		for (var i=0; i<5; i++) {
			var r = document.createElement('input');
			r.setAttribute('type','radio');
			r.setAttribute('id',tid+'r'+(i+1));
			r.setAttribute('name',tid+'formation');
			r.setAttribute('value',i+1);
			r.setAttribute('style','vertical-align:middle');
			r.setAttribute('onChange','updateFleetCode('+fleetnum+')');
			if (i==0) r.checked = true;
			f.appendChild(r);
			
			var label = document.createElement('label');
			label.setAttribute('for',tid+'r'+(i+1));
			var img = document.createElement('img');
			img.setAttribute('style','vertical-align:middle');
			img.setAttribute('src','assets/stats/form'+(i+1)+'.jpg');
			label.appendChild(img);
			f.appendChild(label);
		}
		d.appendChild(f);
	}
    d.appendChild(document.createElement('br'));
     
    da.appendChild(d);
    // da.appendChild(document.createElement('br'));
    // da.appendChild(document.createElement('br'));
    root.appendChild(da);
	// root.appendChild(document.createElement('br'));
}

function changedImprove(e) {
	if ($(e).html()!=IMPROVEHTMLPLANE) return;
	var level = $(e).val();
	if (level>=4) $(e).css('color','#D49C0A');
	else if (level>=1) $(e).css('color','#4A84B5');
	else $(e).css('color','');
}

function genOptions(fleetnum) {
	var num = (fleetnum == 2)? '1' : (fleetnum-20).toString();
	var html = $('<tr id="options'+fleetnum+'"></tr>');
	html.append('<td>Node '+num+':</td>');
	html.append('<td><input id="NB'+fleetnum+'" type="checkbox" checked="true" onclick="updateOptionsCookies('+fleetnum+');raiseFleetChange()"/><label for="NB'+fleetnum+'">Night battle?</label></td>');
	html.append('<td class="line"><input id="NBonly'+fleetnum+'" type="checkbox" onclick="updateOptionsCookies('+fleetnum+');raiseFleetChange()"/><label for="NBonly'+fleetnum+'">Night-Only Node</label></td>');
	html.append('<td><input id="aironly'+fleetnum+'" type="checkbox" onclick="updateOptionsCookies('+fleetnum+');raiseFleetChange()"/><label for="aironly'+fleetnum+'">Air Node</label></td>');
	html.append('<td class="line"><input value="0" id="oformdef'+fleetnum+'" type="radio" name="radform'+fleetnum+'" checked/><label for="oformdef'+fleetnum+'">Default</label></td>');
	html.append('<td class="ofsingle"'+((ADDEDCOMBINED)?' style="display:none"':'')+'><input value="1" id="o1form'+fleetnum+'" type="radio" name="radform'+fleetnum+'" onclick="raiseFleetChange()"/><label for="o1form'+fleetnum+'"><img src="assets/stats/form1.jpg"/></label></td>');
	html.append('<td class="ofsingle"'+((ADDEDCOMBINED)?' style="display:none"':'')+'><input value="2" id="o2form'+fleetnum+'" type="radio" name="radform'+fleetnum+'" onclick="raiseFleetChange()"/><label for="o2form'+fleetnum+'"><img src="assets/stats/form2.jpg"/></label></td>');
	html.append('<td class="ofsingle"'+((ADDEDCOMBINED)?' style="display:none"':'')+'><input value="3" id="o3form'+fleetnum+'" type="radio" name="radform'+fleetnum+'" onclick="raiseFleetChange()"/><label for="o3form'+fleetnum+'"><img src="assets/stats/form3.jpg"/></label></td>');
	html.append('<td class="ofsingle"'+((ADDEDCOMBINED)?' style="display:none"':'')+'><input value="4" id="o4form'+fleetnum+'" type="radio" name="radform'+fleetnum+'" onclick="raiseFleetChange()"/><label for="o4form'+fleetnum+'"><img src="assets/stats/form4.jpg"/></label></td>');
	html.append('<td class="ofsingle"'+((ADDEDCOMBINED)?' style="display:none"':'')+'><input value="5" id="o5form'+fleetnum+'" type="radio" name="radform'+fleetnum+'" onclick="raiseFleetChange()"/><label for="o5form'+fleetnum+'"><img src="assets/stats/form5.jpg"/></label></td>');
	html.append('<td class="ofcombined"'+((!ADDEDCOMBINED)?' style="display:none"':'')+'><input value="11" id="o11form'+fleetnum+'" type="radio" name="radform'+fleetnum+'" onclick="raiseFleetChange()"/><label for="o11form'+fleetnum+'"><img src="assets/stats/form11.png"/></label></td>');
	html.append('<td class="ofcombined"'+((!ADDEDCOMBINED)?' style="display:none"':'')+'><input value="12" id="o12form'+fleetnum+'" type="radio" name="radform'+fleetnum+'" onclick="raiseFleetChange()"/><label for="o12form'+fleetnum+'"><img src="assets/stats/form12.png"/></label></td>');
	html.append('<td class="ofcombined"'+((!ADDEDCOMBINED)?' style="display:none"':'')+'><input value="13" id="o13form'+fleetnum+'" type="radio" name="radform'+fleetnum+'" onclick="raiseFleetChange()"/><label for="o13form'+fleetnum+'"><img src="assets/stats/form13.png"/></label></td>');
	html.append('<td class="ofcombined"'+((!ADDEDCOMBINED)?' style="display:none"':'')+'><input value="14" id="o14form'+fleetnum+'" type="radio" name="radform'+fleetnum+'" onclick="raiseFleetChange()"/><label for="o14form'+fleetnum+'"><img src="assets/stats/form14.png"/></label></td>');
	$('#optionstable').append(html);
}

function updateOptionsCookies(num) {
	var optionstr = ''+($('#NB'+num).prop('checked')?1:0)+','+($('#NBonly'+num).prop('checked')?1:0)+','+($('#aironly'+num).prop('checked')?1:0);
	console.log(optionstr);
	document.cookie = 'option'+num+'='+optionstr+';';
}

var DRAGINFO = [];
function shipDragStarted(fleet,slot) {
	DRAGINFO = [fleet,slot];
}

function shipDragDropped(fleet,slot) {
	if (fleet == DRAGINFO[0] && slot == DRAGINFO[1]) return;
	var id1 = $('#T'+DRAGINFO[0]+'n'+DRAGINFO[1]).val();
	var id2 = $('#T'+fleet+'n'+slot).val();
	var s1 = [], s2 = [];
	for (var j=0; j<STATNAMES.length; j++) {
		var stat = $('#T'+DRAGINFO[0]+STATNAMES[j]+DRAGINFO[1]).val();
		s1.push((stat)? stat : 0);
		stat = $('#T'+fleet+STATNAMES[j]+slot).val();
		s2.push((stat)? stat : 0);
	}
	var equips1 = [], equips2 = [], improves1 = [], improves2 = [];
	for (var j=0; j<4; j++) {
		if (parseInt(PREVEQS[DRAGINFO[0]][DRAGINFO[1]][j])) equips1.push(parseInt(PREVEQS[DRAGINFO[0]][DRAGINFO[1]][j]));
		if (parseInt(PREVEQS[fleet][slot][j])) equips2.push(parseInt(PREVEQS[fleet][slot][j]));
		improves1.push($('#T'+DRAGINFO[0]+'imprv'+DRAGINFO[1]+j).val());
		improves2.push($('#T'+fleet+'imprv'+slot+j).val());
	}
	tableSetShip(DRAGINFO[0],DRAGINFO[1],id2,s2,equips2,improves2);
	tableSetShip(fleet,slot,id1,s1,equips1,improves1);
	updateFleetCode(fleet);
	if (fleet != DRAGINFO[0]) updateFleetCode(DRAGINFO[0]);
}

function tableSetShip(fleet,slot,shipid,stats,equips,improves) {
	document.getElementById('T'+fleet+'n'+slot).value = shipid;
	$('#T'+fleet+'n'+slot).trigger("chosen:updated");
	var img = document.getElementById('T'+fleet+'i'+slot);
	if (shipid != '0') {
		img.draggable = true;
		img.title = 'Drag to swap slots';
		$(img).css('cursor','move');
		$('#T'+fleet+'n'+slot+'_chosen').attr('title',SHIPDATA[shipid].name);
	} else {
		img.draggable = false;
		img.title = '';
		$(img).css('cursor','');
		$('#T'+fleet+'n'+slot+'_chosen').attr('title','');
	}
	img.src = 'assets/icons/'+SHIPDATA[shipid].image;
	document.getElementById('T'+fleet+'i'+slot+'alt').src = 'assets/icons/'+SHIPDATA[shipid].image;
	for (var i=0; i<stats.length; i++) {
		document.getElementById('T'+fleet+STATNAMES[i]+slot).value = (stats[i])? stats[i] : '';
		if (SHIPDATA[shipid].unknownstats && ['ev','asw','los','luk'].indexOf(STATNAMES[i])!=-1) { $('#T'+fleet+STATNAMES[i]+slot).css('background-color','yellow'); $('#T'+fleet+STATNAMES[i]+slot).attr('title',"This stat's true value is currently unknown."); }
		else { $('#T'+fleet+STATNAMES[i]+slot).css('background-color',''); $('#T'+fleet+STATNAMES[i]+slot).attr('title',""); }
	}
	for (var i=0; i<4; i++) {
		var eqid = (equips[i])? equips[i] : '0';
		$('#T'+fleet+'e'+slot+i).val(eqid);
		$('#T'+fleet+'e'+slot+i+'_chosen').attr('title',EQDATA[eqid].name);
		$('#T'+fleet+'e'+slot+i).trigger("chosen:updated");
		PREVEQS[fleet][slot][i] = eqid;
		if (shipid!=0 && i<SHIPDATA[shipid].SLOTS.length)
			$('#T'+fleet+'plane'+slot+i).val(SHIPDATA[shipid].SLOTS[i]);
		else
			$('#T'+fleet+'plane'+slot+i).val('');
			
		setImprove(fleet,slot,i,EQDATA[eqid].improveType,(improves)?improves[i]:0);
		if (eqid!='0') $('#T'+fleet+'eqimg'+slot+i).attr('src','assets/items/'+EQIMAGES[EQDATA[eqid].type]+'.png');
		else $('#T'+fleet+'eqimg'+slot+i).attr('src','assets/items/empty.png');
	}
}

function setImprove(fleet,ship,eqslot,type,level) {
	if(type == 2) {
		$('#T'+fleet+'imprv'+ship+eqslot).html(IMPROVEHTMLPLANE);
		$('#T'+fleet+'imprv'+ship+eqslot).css('font-weight','bold');
		if (level>=4) $('#T'+fleet+'imprv'+ship+eqslot).css('color','#D49C0A');
		else if (level>=1) $('#T'+fleet+'imprv'+ship+eqslot).css('color','#4A84B5');
		else $('#T'+fleet+'imprv'+ship+eqslot).css('color','');
	} else if(type == 1) {
		$('#T'+fleet+'imprv'+ship+eqslot).html(IMPROVEHTMLAKASHI);
		$('#T'+fleet+'imprv'+ship+eqslot).css('font-weight','');
		$('#T'+fleet+'imprv'+ship+eqslot).css('color','');
	} else {
		$('#T'+fleet+'imprv'+ship+eqslot).html(IMPROVEHTMLNONE);
		$('#T'+fleet+'imprv'+ship+eqslot).css('font-weight','');
		$('#T'+fleet+'imprv'+ship+eqslot).css('color','');
	}
	if (level) $('#T'+fleet+'imprv'+ship+eqslot).val(level);
}

function changedShipForm(fleet,slot) {
	var shipid = document.getElementById('T'+fleet+'n'+slot).value;
	var img = document.getElementById('T'+fleet+'i'+slot);
	img.src = 'assets/icons/'+SHIPDATA[shipid].image;
	if (shipid != '0') {
		img.draggable = true;
		img.title = 'Drag to swap slots';
		$(img).css('cursor','move');
		$('#T'+fleet+'n'+slot+'_chosen').attr('title',SHIPDATA[shipid].name);
	} else {
		img.draggable = false;
		img.title = '';
		$(img).css('cursor','');
		$('#T'+fleet+'n'+slot+'_chosen').attr('title','');
	}
	document.getElementById('T'+fleet+'i'+slot+'alt').src = 'assets/icons/'+SHIPDATA[shipid].image;
	document.getElementById('T'+fleet+'lvl'+slot).value = (shipid=='0')? '' : (parseInt(shipid)<500)? 99 : (SHIPDATA[shipid].type == 'SS')? 50 : 1;
	for (var i=1; i<STATNAMES.length; i++) {
		document.getElementById('T'+fleet+STATNAMES[i]+slot).value = SHIPDATA[shipid][STATNAMES[i].toUpperCase()];
		if (SHIPDATA[shipid].unknownstats && ['ev','asw','los','luk'].indexOf(STATNAMES[i])!=-1) { $('#T'+fleet+STATNAMES[i]+slot).css('background-color','yellow'); $('#T'+fleet+STATNAMES[i]+slot).attr('title',"This stat's true value is currently unknown."); }
		else { $('#T'+fleet+STATNAMES[i]+slot).css('background-color',''); $('#T'+fleet+STATNAMES[i]+slot).attr('title',""); }
	}
	var equips;
	if (SHIPDATA[shipid].EQUIPS) equips = SHIPDATA[shipid].EQUIPS;
	else if (defaultEquips[SHIPDATA[shipid].type]) equips = defaultEquips[SHIPDATA[shipid].type];
	else equips = [0,0,0,0];
	for (var i=0; i<4; i++) {
		var equipid = (i < equips.length)? equips[i] : 0;
		$('#T'+fleet+'e'+slot+i).val(equipid);
		$('#T'+fleet+'e'+slot+i).trigger("chosen:updated");
		if (shipid!=0 && i<SHIPDATA[shipid].SLOTS.length)
			$('#T'+fleet+'plane'+slot+i).val(SHIPDATA[shipid].SLOTS[i]);
		else
			$('#T'+fleet+'plane'+slot+i).val('');
		PREVEQS[fleet][slot][i] = 0;
		changedEquip(fleet,slot,i);
		if (EQDATA[equipid].improveType == 2) { $('#T'+fleet+'imprv'+slot+i).val(7); changedImprove('#T'+fleet+'imprv'+slot+i); }
	}
	// }
}

function clickedClear(fleet,slot) {
	document.getElementById('T'+fleet+'n'+slot).value = 0;
	$('#T'+fleet+'n'+slot).trigger("chosen:updated");
	changedShipForm(fleet,slot);
	for (var i=0; i<4; i++) {
		document.getElementById('T'+fleet+'e'+slot+i).value = 0;
		changedEquip(fleet,slot,i);
	}
	for (var i=0; i<STATNAMES.length; i++) {
		document.getElementById('T'+fleet+STATNAMES[i]+slot).value = '';
		changedNum(fleet,slot,STATNAMES[i]);
	}
}

var SCALELEVEL = true;
function changedNum(fleet,slot,stat) {
	var nbox = document.getElementById('T'+fleet+stat+slot);
	if (parseInt(nbox.value) < parseInt(nbox.min)) nbox.value = nbox.min;
	if (parseInt(nbox.value) > parseInt(nbox.max)) nbox.value = nbox.max;
	//do other things
	if (SCALELEVEL && stat=='lvl') {
		var stats = ['asw','los','ev'];
		for (var i=0; i<stats.length; i++) {
			var mid = $('#T'+fleet+'n'+slot).val();
			if (!SHIPDATA[mid][stats[i].toUpperCase()+'base']) continue;
			var smax = SHIPDATA[mid][stats[i].toUpperCase()];
			var smin = SHIPDATA[mid][stats[i].toUpperCase()+'base'];
			var eqbonus = 0;
			for (var j=0; j<4; j++) {
				var eqid = $('#T'+fleet+'e'+slot+j).val();
				if (EQDATA[eqid][stats[i].toUpperCase()]) eqbonus += EQDATA[eqid][stats[i].toUpperCase()];
			}
			$('#T'+fleet+stats[i]+slot).val(Math.floor(smin+(smax-smin)*parseInt(nbox.value)/99 + eqbonus));
		}
		if (parseInt(nbox.value) >= 100) $('#T'+fleet+'hp'+slot).val(SHIPDATA[mid].HPmax);
		else $('#T'+fleet+'hp'+slot).val(SHIPDATA[mid].HP);
	}
}

function changedEquip(fleet,slot,equipslot) {
	var equipid = document.getElementById('T'+fleet+'e'+slot+equipslot).value;
	var equip = EQDATA[equipid];
	if (equipid) {  //add new equip
		$('#T'+fleet+'e'+slot+equipslot+'_chosen').attr('title',equip.name);
		for (var i=2; i<STATNAMES.length-2; i++) {
			var stat = equip[STATNAMES[i].toUpperCase()];
			if (stat) {
				var cstat = document.getElementById('T'+fleet+STATNAMES[i]+slot).value;
				if (cstat == '') cstat = 0;
				document.getElementById('T'+fleet+STATNAMES[i]+slot).value = parseInt(cstat) + parseInt(stat);
				changedNum(fleet,slot,STATNAMES[i]);
			}
		}
		// var previmprove = $('#T'+fleet+'imprv'+slot+equipslot).val();
		setImprove(fleet,slot,equipslot,equip.improveType,0);
		if(equipid!='0') $('#T'+fleet+'eqimg'+slot+equipslot).attr('src','assets/items/'+EQIMAGES[equip.type]+'.png');
		else  $('#T'+fleet+'eqimg'+slot+equipslot).attr('src','assets/items/empty.png');
	} else $('#T'+fleet+'e'+slot+equipslot+'_chosen').attr('title','');
	var pequipid = PREVEQS[fleet][slot][equipslot];
	if (pequipid && equipid != pequipid) {  //remove old equip
		var pequip = EQDATA[pequipid];
		for (var i=2; i<STATNAMES.length-2; i++) {
			var stat = pequip[STATNAMES[i].toUpperCase()];
			if (stat) {
				var cstat = document.getElementById('T'+fleet+STATNAMES[i]+slot).value;
				if (cstat == '') cstat = 0;
				document.getElementById('T'+fleet+STATNAMES[i]+slot).value = parseInt(cstat) - parseInt(stat);
				changedNum(fleet,slot,STATNAMES[i]);
			}
		}
	}
	
	PREVEQS[fleet][slot][equipslot] = equipid;
	
	//update range
	if ($('#T'+fleet+'n'+slot).val() != '0') {
		var maxrng = SHIPDATA[$('#T'+fleet+'n'+slot).val()].RNG;
		// console.log(maxrng);
		for (var i=0; i<PREVEQS[fleet][slot].length; i++) {
			if (EQDATA[PREVEQS[fleet][slot][i]].RNG > maxrng) maxrng = EQDATA[PREVEQS[fleet][slot][i]].RNG;
		}
		// console.log(maxrng);
		$('#T'+fleet+'rng'+slot).val(maxrng);
	}
}

function loadIntoSim(fleet,side,isescort) {
	var ships = [];
	for (var i=0; i<6; i++) {
		var mid = parseInt(document.getElementById('T'+fleet+'n'+i).value);
		if (mid) {
			var ShipType = window[SHIPDATA[mid].type];
			var s = {};
			for (var j=0; j<STATNAMES.length; j++) {
				var stat = parseInt(document.getElementById('T'+fleet+STATNAMES[j]+i).value);
				s[STATNAMES[j]] = (stat)? stat : 0;
			}
			var equips = [], levels = [];
			for (var j=0; j<4; j++) {
				if (parseInt(PREVEQS[fleet][i][j])) { equips.push(parseInt(PREVEQS[fleet][i][j])); levels.push(parseInt($('#T'+fleet+'imprv'+i+j).val())); }
			}
			
			console.log(levels);
			//do I want to do it like this?
			var protect = (mid < 500 && side==0)? 0 : 1;
			if (side == 0 && [901,902,903,1001].indexOf(mid) != -1) protect = 0;
			var ship = new ShipType(mid,SHIPDATA[mid].name,protect,s.lvl,s.hp,s.fp,s.tp,s.aa,s.ar,s.ev,s.asw,s.los,s.luk,s.rng,SHIPDATA[mid].SLOTS);
			ship.loadEquips(equips,levels);
			if (SHIPDATA[mid].isInstall) ship.isInstall = true;
			ships.push(ship);
		}
	}
	if (ships.length == 0) return fleet; //error, no ships filled
	
	if (ADDEDCOMBINED && side==0) {
		var type = $('input[name=T11type]:checked').val();
		var form = $('input[name=T11formation]:checked').val();
		var formation = type+form;
		if (isescort) formation += 'E';
	} else if (fleet==12||fleet==13) {
		var formation = 1;
	} else {
		var formation = 1;  //line ahead default
		for (var i=1; i<=5; i++) {
			if (document.getElementById('T'+fleet+'r'+i).checked) { formation = document.getElementById('T'+fleet+'r'+i).value; break; }
		}
	}
	
	loadFleet(side,ships,formation,isescort);
	
	return 0; //success
}

if (document.cookie.split(';')[0] == '') TUTORIAL = true;
genFleetHTML('fleetspace1', 1, 'Main Fleet', '#90ee90');
genFleetHTML('fleetspace2', 2, 'Enemy Fleet 1', '#ffaaaa');
genOptions(2);

var NUMFLEETS2 = 1;
function clickedAddNode(update) {
	if (NUMFLEETS2 >= 5) return;
	NUMFLEETS2++;
	console.log(NUMFLEETS2);
	if (!document.getElementById('T2'+NUMFLEETS2)) {
		console.log('a');
		var e = document.createElement('div');
		e.setAttribute('id','arrow'+NUMFLEETS2);
		e.setAttribute('style','margin-left:470px;font-size:50px');
		e.innerHTML = '&darr;';
		document.getElementById('fleetspace2').appendChild(e);
		genFleetHTML('fleetspace2', 20+NUMFLEETS2, 'Enemy Fleet '+NUMFLEETS2, '#ffaaaa');
		genOptions(20+NUMFLEETS2);
	} else {
		$('#T2'+NUMFLEETS2).css('display','block');
		$('#arrow'+NUMFLEETS2).css('display','block');
		$('#options2'+NUMFLEETS2).css('display','');
	}
	
	if (update) updateFleetCode('2'+NUMFLEETS2);
	$('#btnDelNode').css('visibility','visible');
	if (NUMFLEETS2 >= 5) $('#btnAddNode').css('visibility','hidden');
}

function clickedDelNode() {
	if (NUMFLEETS2 <= 1) return;
	
	$('#T2'+NUMFLEETS2).css('display','none');
	$('#arrow'+NUMFLEETS2).css('display','none');
	$('#options2'+NUMFLEETS2).css('display','none');
	
	document.cookie = 'fleet2'+NUMFLEETS2+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	NUMFLEETS2--;
	if (NUMFLEETS2 <= 1) $('#btnDelNode').css('visibility','hidden');
	$('#btnAddNode').css('visibility','visible');
	
	raiseFleetChange();
}

var ADDEDCOMBINED = false;
function clickedAddComb(update) {
	if (ADDEDCOMBINED) return;
	if (!document.getElementById('T11')) {
		var e = document.createElement('div');
		e.setAttribute('id','plus');
		e.setAttribute('style','margin-left:470px;font-size:50px');
		e.innerHTML = '+';
		document.getElementById('fleetspace1').appendChild(e);
		genFleetHTML('fleetspace1', 11, 'Escort Fleet', '#89C6FF');
	} else {
		$('#T11').css('display','block');
		$('#plus').css('display','block');
	}
	ADDEDCOMBINED = true;
	if (update) updateFleetCode('11');
	$('#btnDelComb').css('display','');
	$('#btnAddComb').css('display','none');
	$('.ofcombined').each(function(){ $(this).show(); });
	$('.ofsingle').each(function(){ $(this).hide(); });
	for (var i=1; i<=NUMFLEETS2; i++) { var fl = '2'+((i!=1)? i:''); $('#oformdef'+fl).prop('checked',true); }
	
	$('input[name=T1formation]').each(function() { $(this).prop('disabled',true); });
	raiseFleetChange();
}

function clickedDelComb() {
	if (!ADDEDCOMBINED) return;
	
	$('#T11').css('display','none');
	$('#plus').css('display','none');
	
	document.cookie = 'fleet11=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	ADDEDCOMBINED = false;
	$('#btnDelComb').css('display','none');
	$('#btnAddComb').css('display','');
	$('.ofcombined').each(function(){ $(this).hide(); });
	$('.ofsingle').each(function(){ $(this).show(); });
	for (var i=1; i<=NUMFLEETS2; i++) { var fl = '2'+((i!=1)? i:''); $('#oformdef'+fl).prop('checked',true); }
	
	$('input[name=T1formation]').each(function() { $(this).prop('disabled',false); });
	raiseFleetChange();
}

var ADDEDSUPPORTN = false;
function clickedAddSupportN(update) {
	if (ADDEDSUPPORTN) return;
	if (!document.getElementById('T12')) genFleetHTML('fleetspace1SN', 12, 'Support Fleet', '#AACCEE');
	else $('#T12').css('display','block');
	ADDEDSUPPORTN = true;
	if (update) updateFleetCode('12');
	$('#btnDelSupN').css('display','');
	$('#btnAddSupN').css('display','none');
	raiseFleetChange();
}

function clickedDelSupportN() {
	if (!ADDEDSUPPORTN) return;
	$('#T12').css('display','none');
	document.cookie = 'fleet12=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	ADDEDSUPPORTN = false;
	$('#btnDelSupN').css('display','none');
	$('#btnAddSupN').css('display','');
	raiseFleetChange();
}

function clickedAddSupportB() {

}

function clickedDelSupportB() {

}

// tableSetShip(1,2,1,[50,32,59,89,51,59,91,60,1,50,1,60]);
// for (shipid in SHIPDATA) {
	// if(SHIPDATA[shipid].image=='') console.log(SHIPDATA[shipid].name);
// }

var RESVALUES = {};

function resultAddWeight(id,numnew,totalnew) {
	if (!RESVALUES[id]) RESVALUES[id]=[0,0]; //[num,total]
	RESVALUES[id][0] += numnew;
	RESVALUES[id][1] += totalnew;
	document.getElementById(id).innerHTML = Math.round(1000*RESVALUES[id][0]/RESVALUES[id][1])/1000;
}

function updateResults(results) {
	console.log(results);
	var prevnum = parseInt(document.getElementById('rnumruns').innerHTML);
	
	if (ADDEDCOMBINED) $('.rescombined').each(function() { $(this).show(); });
	else $('.rescombined').each(function() { $(this).hide(); });
	
	if (results.nodes.length == 1) {
		var node = results.nodes[0];
		var addnum = node.num;
		for(var letter in node.ranks) resultAddWeight('rank'+letter,node.ranks[letter],addnum);
		resultAddWeight('rsunkfs',node.flagsunk,addnum);
		
		for(var i=1; i<=node.MVPs.length; i++) resultAddWeight('mvp'+i,node.MVPs[i-1],addnum);
		if (node.MVPsC) for(var i=1; i<=node.MVPsC.length; i++) resultAddWeight('mvpc'+i,node.MVPsC[i-1],addnum);
		
		resultAddWeight('rredany',node.redded,addnum);
		for(var i=0; i<node.redIndiv.length; i++) resultAddWeight('red'+(i+1),node.redIndiv[i],addnum);
		if (node.redIndivC) for(var i=0; i<node.redIndivC.length; i++) resultAddWeight('redc'+(i+1),node.redIndivC[i],addnum);
		resultAddWeight('rnodam',node.undamaged,addnum);
	
		$('.ressingle').each(function() { $(this).show(); });
		$('.resmulti').each(function() { $(this).hide(); });
		$('.rescolumn').each(function() { $(this).css('width','250px'); } );
	} else {
		for (var n=1; n<=results.nodes.length; n++) {
			var node = results.nodes[n-1];
			var addnum = node.num;
		
			for(var letter in node.ranks) resultAddWeight('rank'+letter+n,node.ranks[letter],addnum);
			resultAddWeight('rankflagsunk'+n,node.flagsunk,addnum);
			
			for(var i=1; i<=node.MVPs.length; i++) resultAddWeight('mvp'+i+n,node.MVPs[i-1],addnum);
			if(node.MVPsC) for(var i=1; i<=node.MVPsC.length; i++) resultAddWeight('mvpc'+i+n,node.MVPsC[i-1],addnum);
			
			resultAddWeight('redany'+n,node.redded,addnum);
			for(var i=0; i<node.redIndiv.length; i++) resultAddWeight('red'+(i+1)+n,node.redIndiv[i],addnum);
			if(node.redIndivC) for(var i=0; i<node.redIndivC.length; i++) resultAddWeight('redc'+(i+1)+n,node.redIndivC[i],addnum);
			resultAddWeight('nodam'+n,node.undamaged,addnum);
			
			$('.res'+n).each(function() { $(this).show(); } );
		}
		
		var node = results.nodes[results.nodes.length-1];
		var addnum = results.totalnum;
		for(var letter in node.ranks) resultAddWeight('rank'+letter,node.ranks[letter],addnum);
		resultAddWeight('rsunkfs',node.flagsunk,addnum);
		resultAddWeight('rankNone',addnum-node.num,addnum);
		
		for (var i=results.nodes.length; i<NUMNODESDEFAULT; i++) $('.res'+(i+1)).each(function() { $(this).hide(); } );
		
		$('.ressingle').each(function() { $(this).hide(); });
		$('.resmulti').each(function() { $(this).show(); });
		$('.rescolumn').each(function() { $(this).css('width',(results.nodes.length>3)?'300px':'250px'); } );
	}
	
	resultAddWeight('rfsup',results.totalFuelS,results.totalnum);
	resultAddWeight('rasup',results.totalAmmoS,results.totalnum);
	resultAddWeight('rbsup',results.totalBauxS,results.totalnum);
	resultAddWeight('rfrep',results.totalFuelR,results.totalnum);
	resultAddWeight('rsrep',results.totalSteelR,results.totalnum);
	resultAddWeight('bucketrep',results.totalBuckets,results.totalnum);
	
	var Srate = RESVALUES['rankS'][0]/results.totalnum;
	$('#rfpS').text(Math.round(1000*(RESVALUES['rfsup'][0]+RESVALUES['rfrep'][0])/results.totalnum/Srate)/1000);
	$('#rapS').text(Math.round(1000*RESVALUES['rasup'][0]/results.totalnum/Srate)/1000);
	$('#rspS').text(Math.round(1000*RESVALUES['rsrep'][0]/results.totalnum/Srate)/1000);
	$('#rbpS').text(Math.round(1000*RESVALUES['rbsup'][0]/results.totalnum/Srate)/1000);
	$('#bucketpS').text(Math.round(1000*RESVALUES['bucketrep'][0]/results.totalnum/Srate)/1000);
	
	var Frate = RESVALUES['rsunkfs'][0]/results.totalnum;
	$('#rfpF').text(Math.round(1000*(RESVALUES['rfsup'][0]+RESVALUES['rfrep'][0])/results.totalnum/Frate)/1000);
	$('#rapF').text(Math.round(1000*RESVALUES['rasup'][0]/results.totalnum/Frate)/1000);
	$('#rspF').text(Math.round(1000*RESVALUES['rsrep'][0]/results.totalnum/Frate)/1000);
	$('#rbpF').text(Math.round(1000*RESVALUES['rbsup'][0]/results.totalnum/Frate)/1000);
	$('#bucketpF').text(Math.round(1000*RESVALUES['bucketrep'][0]/results.totalnum/Frate)/1000);
	
	document.getElementById('rnumruns').innerHTML = prevnum + results.totalnum;
	
	WROTESTATS = true;
}

const NUMNODESDEFAULT = 5;
function genStatTableHTML() {
	// console.log('tables');
	
	//rank table
	var ranktab = $('#ranktab');
	var tr = $('<tr><th></th></tr>');
	ranktab.append(tr);
	for (var i=1; i<=NUMNODESDEFAULT; i++) {
		tr.append($('<th class="res'+i+'">'+i+'</th>'));
	}
	var letters = ['S','A','B','C','D','E','flagsunk'];
	for (var i=0; i<letters.length; i++) {
		var tr = $('<tr><th><img src="assets/stats/'+letters[i]+'.png" /></th></tr>');
		for (var j=1; j<=NUMNODESDEFAULT; j++) {
			tr.append($('<td id="rank'+letters[i]+j+'" class="res'+j+'">0.222</td>'));
		}
		ranktab.append(tr);
	}
	
	//MVP table
	var mvptab = $('#mvptab');
	var tr = $('<tr><th></th></tr>');
	mvptab.append(tr);
	for (var i=1; i<=NUMNODESDEFAULT; i++) {
		tr.append($('<th class="res'+i+'">'+i+'</th>'));
	}
	for (var i=1; i<=6; i++) {
		var tr = $('<tr><th><img src="assets/stats/F'+i+'.png" /></th></tr>');
		for (var j=1; j<=NUMNODESDEFAULT; j++) {
			tr.append($('<td id="mvp'+i+j+'" class="res'+j+'">0.222</td>'));
		}
		mvptab.append(tr);
	}
	mvptab.append('<tr class="rescombined" style="height:20px"></tr>');
	for (var i=1; i<=6; i++) {
		var tr = $('<tr class="rescombined"><th><img src="assets/stats/F'+i+'.png" /></th></tr>');
		for (var j=1; j<=NUMNODESDEFAULT; j++) {
			tr.append($('<td id="mvpc'+i+j+'" class="res'+j+'">0.222</td>'));
		}
		mvptab.append(tr);
	}
	
	
	//damage lists and table
	var dmglist = $('#dmglist');
	for (var i=1; i<=NUMNODESDEFAULT; i++) {
		dmglist.append($('<span class="res'+i+'">'+i+': <span id="redany'+i+'">0.222</span><br></span>'));
	}
	var dmgtab = $('#dmgtab');
	var tr = $('<tr><th></th></tr>');
	dmgtab.append(tr);
	for (var i=1; i<=NUMNODESDEFAULT; i++) {
		tr.append($('<th class="res'+i+'">'+i+'</th>'));
	}
	for (var i=1; i<=6; i++) {
		var tr = $('<tr><th><img src="assets/stats/F'+i+'.png" /></th></tr>');
		for (var j=1; j<=NUMNODESDEFAULT; j++) {
			tr.append($('<td id="red'+i+j+'" class="res'+j+'">0.222</td>'));
		}
		dmgtab.append(tr);
	}
	dmgtab.append('<tr class="rescombined" style="height:20px"></tr>');
	for (var i=1; i<=6; i++) {
		var tr = $('<tr class="rescombined"><th><img src="assets/stats/F'+i+'.png" /></th></tr>');
		for (var j=1; j<=NUMNODESDEFAULT; j++) {
			tr.append($('<td id="redc'+i+j+'" class="res'+j+'">0.222</td>'));
		}
		dmgtab.append(tr);
	}
	var nodmglist = $('#nodmglist');
	for (var i=1; i<=NUMNODESDEFAULT; i++) {
		nodmglist.append($('<span class="res'+i+'">'+i+': <span id="nodam'+i+'">0.222</span></span>'));
		nodmglist.append($('<br>'));
	}
	
	$('.ressingle').each(function() { $(this).hide(); } );
	$('.resmulti').each(function() { $(this).show(); } );
}
genStatTableHTML();

var DORETREAT = true;
function changedCBRedRetr(checked) {
	if (!checked) { $('#redretrkuso').show(); DORETREAT = false; }
	else { $('#redretrkuso').hide(); DORETREAT = true; }
}

// updateResults(10000,{S:.2,A:.2,B:.2,C:.2,D:.2},.3,[.5,.1,.1,.1,.1,.1],[.2,.01,.01,.01,.01,.01,.01],.1,[10,20,30,40,50]);
// updateResults(7000,{S:.4,A:.3,B: .1,C:.1,D:.1},.3,[.5,.1,.1,.1,.1,.1],[.2,.01,.01,.01,.01,.01,.01],.1,[10,20,30,40,50]);
// updateResults(1,{S:1,A:0,B:0,C:0,D:0},.3,[.5,.1,.1,.1,.1,.1],[.2,.01,.01,.01,.01,.01,.01],.1,[10,20,30,40,50]);

function clickedExpandFleet(fleet) {
	document.getElementById('T'+fleet+'full').style.display = 'block';
	document.getElementById('T'+fleet+'min').style.display = 'none';
	document.getElementById('T'+fleet+'head').setAttribute('onClick','clickedCollapseFleet('+fleet+')');
	document.getElementById('T'+fleet+'headpm').innerHTML = '[<b>&#8722;</b>]';
}

function clickedCollapseFleet(fleet) {
	document.getElementById('T'+fleet+'full').style.display = 'none';
	document.getElementById('T'+fleet+'min').style.display = 'block';
	document.getElementById('T'+fleet+'head').setAttribute('onClick','clickedExpandFleet('+fleet+')');
	document.getElementById('T'+fleet+'headpm').innerHTML = '[<b>+</b>]';
}

function changedPreset1(fleet) {
	var s = document.getElementById('T'+fleet+'pre1').value.split('|');
	if ($('#T'+fleet+'pre1').css('animation')) { $('#T'+fleet+'pre1').css('animation',''); $('#T'+fleet+'pre1').css('border',''); }
	var world = s[0], level = s[1];
	var preset2 = document.getElementById('T'+fleet+'pre2');
	preset2.innerHTML = '';
	for (node in ENEMYCOMPS[world][level]) {
		var o = document.createElement('option');
		o.setAttribute('value',node);
		o.appendChild(document.createTextNode(node));
		preset2.appendChild(o);
	}
	changedPreset2(fleet);
}

function changedPreset2(fleet) {
	var s = document.getElementById('T'+fleet+'pre1').value.split('|');
	var world = s[0], level = s[1];
	var node = document.getElementById('T'+fleet+'pre2').value;
	var preset3 = document.getElementById('T'+fleet+'pre3');
	preset3.innerHTML = '';
	for (version in ENEMYCOMPS[world][level][node]) {
		var o = document.createElement('option');
		o.setAttribute('value',version);
		o.appendChild(document.createTextNode(version));
		preset3.appendChild(o);
	}
	changedPreset3(fleet);
}

function changedPreset3(fleet) {
	var s = document.getElementById('T'+fleet+'pre1').value.split('|');
	var world = s[0], level = s[1];
	var node = document.getElementById('T'+fleet+'pre2').value;
	var version = document.getElementById('T'+fleet+'pre3').value;
	var comp = ENEMYCOMPS[world][level][node][version].c;
	for (var i=0; i<6; i++) {
		if (i < comp.length) {
			document.getElementById('T'+fleet+'n'+i).value = comp[i];
			$('#T'+fleet+'n'+i).trigger("chosen:updated");
			changedShipForm(fleet,i);
		} else {
			clickedClear(fleet,i);
		}
	}
	var form = ENEMYCOMPS[world][level][node][version].f;
	if (fleet.toString()[0] == '2') {
		document.getElementById('T'+fleet+'r'+form).checked = true;
		if (node.toLowerCase().indexOf('boss') != -1) $('#NB'+fleet).prop('checked',true);
		else $('#NB'+fleet).prop('checked',false);
		if (ENEMYCOMPS[world][level][node][version].NB) $('#NBonly'+fleet).prop('checked',true);
		else $('#NBonly'+fleet).prop('checked',false);
		if (ENEMYCOMPS[world][level][node][version].AIR) $('#aironly'+fleet).prop('checked',true);
		else $('#aironly'+fleet).prop('checked',false);
	}
	
	updateFleetCode(fleet);
	if (fleet.toString()[0] == '2') updateOptionsCookies(fleet);
}

function updateFleetCode(fleet) {
	var formation = $('input[name=T'+fleet+'formation]:checked').val();
	var c = formation+',0,0|';
	if (fleet==11) {
		var type = $('input[name=T'+fleet+'type]:checked').val();
		c = formation+','+type+',0|';
	}
	for (var i=0; i<6; i++) {
		var shipid = document.getElementById('T'+fleet+'n'+i).value;
		if (parseInt(shipid)) {
			c += shipid+',';
			for (var j=0; j<STATNAMES.length; j++) {
				c += document.getElementById('T'+fleet+STATNAMES[j]+i).value+',';
			}
			for (var j=0; j<4; j++) {
				var equipid = document.getElementById('T'+fleet+'e'+i+j).value;
				if (EQDATA[equipid]) c += equipid + ',';
				else c += '0,';
			}
			for (var j=0; j<4; j++) {
				var imprv = document.getElementById('T'+fleet+'imprv'+i+j).value;
				if (parseInt(imprv)) c += imprv + ',';
				else c += '0,';
			}
			c = c.substr(0,c.length-1) + '|';
		} else {
			c += '0|'
		}
	}
	document.getElementById('T'+fleet+'tcode').value = c;
	document.cookie = 'fleet'+fleet+'='+c;
	console.log(fleet);
	
	if (WROTESTATS) {
		raiseFleetChange();
	}
}

function raiseFleetChange() {
	if (!WROTESTATS) return;
	document.getElementById('simnotespace').innerHTML = 'A fleet has been changed. Reset statistics? <input type="button" value="Reset" onClick="clickedResetStats()"/>';
	document.getElementById('simgo').disabled = true;
}

function loadFleetFromCode(fleet,fcode) {
	var parts = fcode.split('|');
	var s = parts[0].split(',');
	if(document.getElementById('T'+fleet+'r'+s[0])) document.getElementById('T'+fleet+'r'+s[0]).checked = true;
	if(document.getElementById('T'+fleet+'t'+s[1])) document.getElementById('T'+fleet+'t'+s[1]).checked = true;
	for (var i=0; i<6; i++) {
		var s = parts[i+1].split(',');
		tableSetShip(fleet,i,parseInt(s[0]),s.slice(1,13),s.slice(13,17),s.slice(17,21));
	}
	
}

function clickedLoadFromCode(fleet) {
	console.log(fleet);
	var fcode = document.getElementById('T'+fleet+'tcode').value;
	try {
		loadFleetFromCode(fleet,fcode);
		document.cookie = 'fleet'+fleet+'='+fcode;
	} catch (e) { console.log('load failed\n'+e.toString()); }
	
}


function clickedSimGo() {
	var numsims = parseInt(document.getElementById('simnum').value);
	
	var options = extractForSim();
	if (!options) return;
	$('#simnotespace').text('');
	
	if (ADDEDCOMBINED) simStatsCombined(numsims,parseInt($('input[name=T11type]:checked').val()),options.doNB,options.NBonly,options.aironly,options.formover);
	else simStats(numsims,options.doNB,options.NBonly,options.aironly,options.formover);
	
	document.getElementById('resultspace').style.display = 'block';
	document.getElementById('simnotespace').innerHTML = '';
}

function changedSimNumber() {
	var e = document.getElementById('simnum');
	if (!parseInt(e.value)) e.value = 10000;
	else if (parseInt(e.value) < parseInt(e.min)) e.value = e.min;
	else if (parseInt(e.value) > parseInt(e.max)) e.value = e.max;
}

function clickedResetStats() {
	RESVALUES = {};
	document.getElementById('rnumruns').innerHTML = '0';
	var letters = ['S','A','B','C','D','E'];
	for(var i=0; i<letters.length; i++) document.getElementById('rank'+letters[i]).innerHTML = '0';
	document.getElementById('rsunkfs').innerHTML = '0';
	
	for(var i=1; i<=6; i++) document.getElementById('mvp'+i).innerHTML = '0';
	
	document.getElementById('rredany').innerHTML = '0';
	for(var i=1; i<=6; i++) document.getElementById('red'+i).innerHTML = '0';
	document.getElementById('rnodam').innerHTML = '0';

	document.getElementById('resultspace').style.display = 'none';
	document.getElementById('simnotespace').innerHTML = '';
	document.getElementById('simgo').disabled = false;
	WROTESTATS = false;
}

function extractForSim() {
	FLEETS1 = []; FLEETS2 = [];
	var error = loadIntoSim(1,0);
	if (error) { document.getElementById('simnotespace').innerHTML = 'Main Fleet has no ships.'; return; }
	if (ADDEDCOMBINED) {
		var error = loadIntoSim(11,0,true);
		if (error) { document.getElementById('simnotespace').innerHTML = 'Escort Fleet has no ships.'; return; }
	}
	error = loadIntoSim(2,1);
	if (error) { document.getElementById('simnotespace').innerHTML = 'Enemy Fleet 1 has no ships.'; return; }
	for (var i=2; i<=NUMFLEETS2; i++) {
		error = loadIntoSim(20+i,1);
		if (error) { document.getElementById('simnotespace').innerHTML = 'Enemy Fleet '+(error-20)+' has no ships.'; return; }
	}
	
	FLEETS1S = [null,null];
	if (ADDEDSUPPORTN) {
		var error = loadIntoSim(12,2);
		if (error) FLEETS1S[0] = null;
	}
	
	var options = {};
	options.doNB = [$('#NB2').prop('checked')]; 
	for (var i=2; i<=NUMFLEETS2; i++) options.doNB.push($('#NB2'+i).prop('checked'));
	options.NBonly = [$('#NBonly2').prop('checked')]; 
	for (var i=2; i<=NUMFLEETS2; i++) options.NBonly.push($('#NBonly2'+i).prop('checked'));
	options.aironly = [$('#aironly2').prop('checked')]; 
	for (var i=2; i<=NUMFLEETS2; i++) options.aironly.push($('#aironly2'+i).prop('checked'));
	options.formover = [$('input[name=radform2]:checked').val()];
	for (var i=2; i<=NUMFLEETS2; i++) options.formover.push($('input[name=radform2'+i+']:checked').val());
	
	return options;
}

//player-----------------------------------
function clickedWatchBattle() {
	if (!CANRESET) return;
	
	C=true;
	code = '';
	
	var options = extractForSim();
	if (!options) return;
	$('#simnotespace').text('');
	$('#btnWatch').val('New Battle');
	
	//set up API info
	API = {battles:[],fleetnum:1,support1:3,support2:4,source:1};
	for (var i=0; i<4; i++) {
		if (i >= FLEETS1.length) break;
		API['fleet'+(i+1)] = [];
		for (var j=0; j<FLEETS1[i].ships.length; j++) {
			var ship = FLEETS1[i].ships[j];
			var obj = {equip:[],kyouka:[]};
			obj.mst_id = ship.mid;
			for (var k=0; k<5; k++) {
				if (k<ship.equips.length) obj.equip.push(ship.equips[k].mid);
				else obj.equip.push(-1);
			}
			API['fleet'+(i+1)].push(obj);
		}
	}
	if (ADDEDCOMBINED) {
		API.combined = parseInt($('input[name=T11type]:checked').val()); //change later for type
		var formdefc = FLEETS1[1].formation;
	}
	
	var supportN = (ADDEDSUPPORTN)? FLEETS1S[0] : null;
	
	var formdef = FLEETS1[0].formation;
	for (var j=0; j<FLEETS2.length; j++) {
		var BAPI = {data:{},yasen:{},mvp:[],rating:''};
		if (options.formover[j] != '0') {
			if (ADDEDCOMBINED) { FLEETS1[0].formation = ALLFORMATIONS[API.combined+options.formover[j]]; FLEETS1[1].formation = ALLFORMATIONS[API.combined+options.formover[j]+'E']; }
			else FLEETS1[0].formation = ALLFORMATIONS[options.formover[j]];
		} else {
			FLEETS1[0].formation = formdef;
			if (ADDEDCOMBINED) FLEETS1[1].formation = formdefc;
		}
		
		var res;
		if (ADDEDCOMBINED)
			res = simCombined(API.combined,FLEETS1[0],FLEETS1[1],FLEETS2[j],supportN,options.doNB[j],options.NBonly[j],options.aironly[j],BAPI);
		else
			res = sim(FLEETS1[0],FLEETS2[j],supportN,options.doNB[j],options.NBonly[j],options.aironly[j],BAPI);
		API.battles.push(BAPI);
		if ((res.redded && DORETREAT) || res.flagredded) break;
	}
	console.log(API);
	
	$('#code').val(JSON.stringify(API));
	loadCode(true);
}



//load fleets from cookies, make sure done after genFleetFromHTML
var fs = document.cookie.split(';');
//gen fleets if saved
for (var i=2; i<=5; i++) {
	var found = false;
	for (var j=0; j<fs.length; j++) {
		if (fs[j].indexOf('fleet2'+i+'=')!=-1) {
			console.log('asdf');
			clickedAddNode();
			found = true;
			break;
		}
	}
	if (!found) break;
}
for (var i=0; i<fs.length; i++) {
	if (fs[i].indexOf('fleet11=')!=-1) clickedAddComb();
	if (fs[i].indexOf('fleet12=')!=-1) clickedAddSupportN();
}
for (var i=0; i<fs.length; i++) {
	if (fs[i].indexOf('=') != -1) {
		var s = fs[i].split('=');
		//load fleets
		if (s[0].indexOf('fleet') != -1) {
			var fleet = s[0].substr(s[0].indexOf('fleet')+5);
			if (!document.getElementById('T'+fleet+'tcode')) {
				document.cookie = s[0]+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //remove invalid fleet cookie
				continue;
			}
			var fcode = s[1];
			loadFleetFromCode(fleet,fcode);
			document.getElementById('T'+fleet+'tcode').value = fcode;
			continue;
		}
		//load options
		if (s[0].indexOf('option') != -1) {
			var optionnum = s[0].substr(s[0].indexOf('option')+6);
			if (!document.getElementById('options'+optionnum)) {
				document.cookie = s[0]+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //remove invalid option cookie
				continue;
			}
			var checks = s[1].split(',');
			$('#NB'+optionnum).prop('checked',(checks[0]=='1')?true:false);
			$('#NBonly'+optionnum).prop('checked',(checks[1]=='1')?true:false);
			$('#aironly'+optionnum).prop('checked',(checks[2]=='1')?true:false);
			continue;
		}
		document.cookie = s[0]+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //remove cookie that shouldn't be there
	}
}

$('#simgo').attr('disabled',false);

$('#numbucketpercent').change(function() {
	if (parseInt(this.value) < parseInt(this.min)) this.value = this.min;
	if (parseInt(this.value) > parseInt(this.max)) this.value = this.max;
	BUCKETPERCENT = parseInt(this.value)/100;
	raiseFleetChange();
});
$('#numbucketrepair').change(function() {
	if (parseFloat(this.value) < parseInt(this.min)) this.value = this.min;
	if (parseFloat(this.value) > parseInt(this.max)) this.value = this.max;
	BUCKETTIME = 3600*parseFloat(this.value);
	raiseFleetChange();
});