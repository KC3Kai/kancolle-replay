// var o = document.createElement('option');
// o.setAttribute('value',options[i][1]);
// o.appendChild(document.createTextNode(options[i][0]));
// document.getElementById('Sh'+s+'F'+f).appendChild(o);
var STATNAMES = ['lvl','hp','fp','tp','aa','ar','ev','asw','los','luk','rng','spd'];
var PREVEQS = {};
var WROTESTATS = false;

var IMPROVEHTMLNONE = '<option value="0"></option>';
var IMPROVEHTMLAKASHI = '<option value="0">+0</option><option value="1">+1</option><option value="2">+2</option><option value="3">+3</option><option value="4">+4</option><option value="5">+5</option><option value="6">+6</option><option value="7">+7</option><option value="8">+8</option><option value="9">+9</option><option value="10">MAX</option>';
var IMPROVEHTMLPLANE = '<option value="0"></option><option value="1" style="color:#4A84B5">|</option><option value="2" style="color:#4A84B5">||</option><option value="3" style="color:#4A84B5">|||</option><option value="4" style="color:#D49C0A">/</option><option value="5" style="color:#D49C0A">//</option><option value="6" style="color:#D49C0A">///</option><option value="7" style="color:#D49C0A">&gt;&gt;</option>';
				
function genFleetHTML(rootid,fleetnum,fleetname) {
    var root = document.getElementById(rootid);
    PREVEQS[fleetnum] = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var tid = 'T'+fleetnum;
    var da = document.createElement('div');
    da.setAttribute('id',tid);
    // da.setAttribute('height',');
    da.setAttribute('style','width:980px; border:1px solid black');
     
    var dhead = document.createElement('div');
    dhead.setAttribute('id',tid+'head');
    dhead.setAttribute('class','clickable');
    dhead.setAttribute('style','background-color:#CCCCCC');
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
	dl.innerHTML = '<b>From .kc3 file:(<a href="#" id="{tid}qdq" onmouseover="$(\'#qdinfo{nt}\').css(\'display\',\'block\')" onmouseout="$(\'#qdinfo{nt}\').css(\'display\',\'none\')">?</a>):</b><br><input id="{tid}sfile" type="file" accept=".kc3" onChange="loadFile({nt},1)" /><br><br>'.replace(/{tid}/g,tid).replace(/{nt}/g,fleetnum);
	$(dl).append('<div style="display:none;position:absolute" id="qdinfo'+fleetnum+'"><div style="background-color:white;border:1px solid black;position:relative;top:-200px;left:140px;width:400px;height:250px"><p style="margin:10px 10px;font-size:12px">You can import your in-game fleet using KC3Kai\'s Quick Data file.<br><br>Go to Profile</p></div><div>');
	d.appendChild(dl);
	dl = document.createElement('div');
	// dl.setAttribute('style','float:left;width:250px');
	dl.innerHTML = '<b>From preset:</b><br>'; //<select id="{tid}pre1"></select> <select id="{tid}pre2"></select> <select id="{tid}pre3"></select>'.replace(/{tid}/g,tid);
	var sel1 = document.createElement('select');  //world+level
	sel1.setAttribute('id',tid+'pre1');
	sel1.setAttribute('onChange','changedPreset1('+fleetnum+')');
	var o = document.createElement('option');
	o.setAttribute('value','');
	sel1.appendChild(o);
	dl.appendChild(sel1);
	dl.appendChild(document.createTextNode(' '));
	var sel2 = document.createElement('select');  //nodes
	sel2.setAttribute('id',tid+'pre2');
	sel2.setAttribute('onChange','changedPreset2('+fleetnum+')');
	var o = document.createElement('option');
	o.setAttribute('value','');
	sel2.appendChild(o);
	dl.appendChild(sel2);
	dl.appendChild(document.createTextNode(' '));
	var sel3 = document.createElement('select');  //comps
	sel3.setAttribute('id',tid+'pre3');
	sel3.setAttribute('onChange','changedPreset3('+fleetnum+')');
	var o = document.createElement('option');
	o.setAttribute('value','');
	sel3.appendChild(o);
	dl.appendChild(sel3);
	dl.appendChild(document.createElement('br'));
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
		num.setAttribute('src','assets/stats/f'+(i+1)+'.png');
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
		$(sel).chosen({width:'160px',search_contains:true,allow_single_deselect:true});
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
        [['ev','ev.png',1,999],['asw','as.png',0,999]],
        [['spd','sp.png',0,1],['los','ls.png',0,999]],
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
			sp.innerHTML = '<img src="assets/stats/ac.png" style="float:left"/><input type="number" id="{plid}" style="width:40px;float:left" disabled="true"/><span style="float:right;font-size:12px">&#9733; <select id="{nid}" style="width:50px" onchange="updateFleetCode({f})"><option value="0"></option></select></span><br>'.replace('{nid}',nid).replace('{plid}',plid).replace('{f}',fleetnum);
			td.appendChild(sp);
			tr.appendChild(td);
        }
        t.appendChild(tr);
    }
    d.appendChild(t);
    d.appendChild(document.createElement('br'));
     
    var f = document.createElement('form');
    f.setAttribute('id',tid+'F');
    for (var i=0; i<5; i++) {
        var r = document.createElement('input');
        r.setAttribute('type','radio');
        r.setAttribute('id',tid+'r'+(i+1));
        r.setAttribute('name','formation');
        r.setAttribute('value',i+1);
        r.setAttribute('style','vertical-align:middle');
        r.setAttribute('onChange','updateFleetCode('+fleetnum+')');
        f.appendChild(r);
          
        var img = document.createElement('img');
        img.setAttribute('style','vertical-align:middle');
        img.setAttribute('src','assets/stats/form'+(i+1)+'.jpg');
        f.appendChild(img);
    }
    d.appendChild(f);
    d.appendChild(document.createElement('br'));
     
    da.appendChild(d);
    // da.appendChild(document.createElement('br'));
    // da.appendChild(document.createElement('br'));
    root.appendChild(da);
	// root.appendChild(document.createElement('br'));
}

function genOptions(fleetnum) {
	var num = (fleetnum == 2)? '1' : (fleetnum-20).toString();
	var html = '<tr id="options{f}"><td>Node {n}:</td><td><input id="NB{f}" type="checkbox" checked="true" onclick="updateOptionsCookies({f});raiseFleetChange()"/><label for="NB{f}">Night battle?</label></td><td><input id="NBonly{f}" type="checkbox" onclick="updateOptionsCookies({f});raiseFleetChange()"/><label for="NBonly{f}">Night Only Node</label></td><td><input id="aironly{f}" type="checkbox" onclick="updateOptionsCookies({f});raiseFleetChange()"/><label for="aironly{f}">Air Node</label></td></tr>'.replace('{n}',num).replace(/{f}/g,fleetnum.toString());
	$('#optionstable').append($(html));
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
		img.style = 'cursor:move';
	} else {
		img.draggable = false;
		img.title = '';
		img.style = '';
	}
	img.src = 'assets/icons/'+SHIPDATA[shipid].image;
	document.getElementById('T'+fleet+'i'+slot+'alt').src = 'assets/icons/'+SHIPDATA[shipid].image;
	for (var i=0; i<stats.length; i++) {
		document.getElementById('T'+fleet+STATNAMES[i]+slot).value = (stats[i])? stats[i] : '';
	}
	for (var i=0; i<4; i++) {
		var eqid = (equips[i])? equips[i] : '0';
		$('#T'+fleet+'e'+slot+i).val(eqid);
		$('#T'+fleet+'e'+slot+i).trigger("chosen:updated");
		PREVEQS[fleet][slot][i] = eqid;
		if (shipid!=0 && i<SHIPDATA[shipid].SLOTS.length)
			$('#T'+fleet+'plane'+slot+i).val(SHIPDATA[shipid].SLOTS[i]);
		else
			$('#T'+fleet+'plane'+slot+i).val('');
			
		if(EQDATA[eqid].improveType == 2) $('#T'+fleet+'imprv'+slot+i).html(IMPROVEHTMLPLANE);
		else if(EQDATA[eqid].improveType == 1) $('#T'+fleet+'imprv'+slot+i).html(IMPROVEHTMLAKASHI);
		else $('#T'+fleet+'imprv'+slot+i).html(IMPROVEHTMLNONE);
		if (improves && improves[i]) $('#T'+fleet+'imprv'+slot+i).val(improves[i]);
	}
}

function changedShipForm(fleet,slot) {
	var shipid = document.getElementById('T'+fleet+'n'+slot).value;
	var img = document.getElementById('T'+fleet+'i'+slot);
	img.src = 'assets/icons/'+SHIPDATA[shipid].image;
	if (shipid != '0') {
		img.draggable = true;
		img.title = 'Drag to swap slots';
		img.style = 'cursor:move';
	} else {
		img.draggable = false;
		img.title = '';
		img.style = '';
	}
	document.getElementById('T'+fleet+'i'+slot+'alt').src = 'assets/icons/'+SHIPDATA[shipid].image;
	document.getElementById('T'+fleet+'lvl'+slot).value = (shipid=='0')? '' : (parseInt(shipid)<500)? 99 : (SHIPDATA[shipid].type == 'SS')? 50 : 1;
	for (var i=1; i<STATNAMES.length; i++) {
		document.getElementById('T'+fleet+STATNAMES[i]+slot).value = SHIPDATA[shipid][STATNAMES[i].toUpperCase()];
		// changedNum(fleet,slot,STATNAMES[i]);
	}
	// if (SHIPDATA[shipid].EQUIPS) {
	for (var i=0; i<4; i++) {
		var equipid = (SHIPDATA[shipid].EQUIPS && i < SHIPDATA[shipid].EQUIPS.length)? SHIPDATA[shipid].EQUIPS[i] : 0;
		$('#T'+fleet+'e'+slot+i).val(equipid);
		$('#T'+fleet+'e'+slot+i).trigger("chosen:updated");
		if (shipid!=0 && i<SHIPDATA[shipid].SLOTS.length)
			$('#T'+fleet+'plane'+slot+i).val(SHIPDATA[shipid].SLOTS[i]); //$('#T'+fleet+'e'+slot+i+'_chosen').attr('title','('+SHIPDATA[shipid].SLOTS[i]+')');
		else
			$('#T'+fleet+'plane'+slot+i).val('');//$('#T'+fleet+'e'+slot+i+'_chosen').attr('title','(-)');
		PREVEQS[fleet][slot][i] = 0;
		changedEquip(fleet,slot,i);
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

var SCALELEVEL = false;
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
	}
}

function changedEquip(fleet,slot,equipslot) {
	var equipid = document.getElementById('T'+fleet+'e'+slot+equipslot).value;
	var equip = EQDATA[equipid];
	if (equipid) {  //add new equip
		for (var i=2; i<STATNAMES.length-2; i++) {
			var stat = equip[STATNAMES[i].toUpperCase()];
			if (stat) {
				var cstat = document.getElementById('T'+fleet+STATNAMES[i]+slot).value;
				if (cstat == '') cstat = 0;
				document.getElementById('T'+fleet+STATNAMES[i]+slot).value = parseInt(cstat) + parseInt(stat);
				changedNum(fleet,slot,STATNAMES[i]);
				
				var previmprove = $('#T'+fleet+'imprv'+slot+equipslot).val();
				if(equip.improveType == 2) $('#T'+fleet+'imprv'+slot+i).html(IMPROVEHTMLPLANE);
				else if(equip.improveType == 1) $('#T'+fleet+'imprv'+slot+equipslot).html(IMPROVEHTMLAKASHI);
				else $('#T'+fleet+'imprv'+slot+equipslot).html(IMPROVEHTMLNONE);
				if (equip.improveType && equip.improveType==EQDATA[PREVEQS[fleet][slot][equipslot]].improveType) $('#T'+fleet+'imprv'+slot+equipslot).val(previmprove);			
			}
		}
	}
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

function loadIntoSim(fleet,side) {
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
			var equips = [];
			for (var j=0; j<4; j++) {
				if (parseInt(PREVEQS[fleet][i][j])) equips.push(parseInt(PREVEQS[fleet][i][j]));
			}
			
			//do I want to do it like this?
			var protect = (mid < 500 && side==0)? 0 : 1;
			if (side == 0 && [901,902,903,1001].indexOf(mid) != -1) protect = 0;
			var ship = new ShipType(mid,SHIPDATA[mid].name,protect,s.lvl,s.hp,s.fp,s.tp,s.aa,s.ar,s.ev,s.asw,s.los,s.luk,s.rng,SHIPDATA[mid].SLOTS);
			ship.loadEquips(equips);
			if (SHIPDATA[mid].isInstall) ship.isInstall = true;
			ships.push(ship);
		}
	}
	if (ships.length == 0) return fleet; //error, no ships filled
	
	var formation = 1;  //line ahead default
	for (var i=1; i<=5; i++) {
		if (document.getElementById('T'+fleet+'r'+i).checked) { formation = document.getElementById('T'+fleet+'r'+i).value; break; }
	}
	
	loadFleet(side,ships,formation);
	
	return 0; //success
}

genFleetHTML('fleetspace1', 1, 'Main Fleet');
genFleetHTML('fleetspace2', 2, 'Enemy Fleet 1');
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
		genFleetHTML('fleetspace2', 20+NUMFLEETS2, 'Enemy Fleet '+NUMFLEETS2);
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
		genFleetHTML('fleetspace1', 11, 'Escort Fleet');
	} else {
		$('#T11').css('display','block');
		$('#plus').css('display','block');
	}
	ADDEDCOMBINED = true;
	if (update) updateFleetCode('11');
	$('#btnDelComb').css('display','');
	$('#btnAddComb').css('display','none');
}

function clickedDelComb() {
	if (!ADDEDCOMBINED) return;
	
	$('#T11').css('display','none');
	$('#plus').css('display','none');
	
	document.cookie = 'fleet11=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	ADDEDCOMBINED = false;
	$('#btnDelComb').css('display','none');
	$('#btnAddComb').css('display','');
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
	
	if (results.nodes.length == 1) {
		var node = results.nodes[0];
		var addnum = node.num;
		for(var letter in node.ranks) resultAddWeight('rank'+letter,node.ranks[letter],addnum);
		resultAddWeight('rsunkfs',node.flagsunk,addnum);
		
		for(var i=1; i<=node.MVPs.length; i++) resultAddWeight('mvp'+i,node.MVPs[i-1],addnum);
		
		resultAddWeight('rredany',node.redded,addnum);
		for(var i=0; i<node.redIndiv.length; i++) resultAddWeight('red'+(i+1),node.redIndiv[i],addnum);
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
			
			resultAddWeight('redany'+n,node.redded,addnum);
			for(var i=0; i<node.redIndiv.length; i++) resultAddWeight('red'+(i+1)+n,node.redIndiv[i],addnum);
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
	
	//damage lists and table
	var dmglist = $('#dmglist');
	for (var i=1; i<=NUMNODESDEFAULT; i++) {
		dmglist.append($('<span class="res'+i+'">'+i+': <span id="redany'+i+'">0.222</span></span>'));
		dmglist.append($('<br>'));
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
	var nodmglist = $('#nodmglist');
	for (var i=1; i<=NUMNODESDEFAULT; i++) {
		nodmglist.append($('<span class="res'+i+'">'+i+': <span id="nodam'+i+'">0.222</span></span>'));
		nodmglist.append($('<br>'));
	}
	
	$('.ressingle').each(function() { $(this).hide(); } );
	$('.resmulti').each(function() { $(this).show(); } );
}
genStatTableHTML();

function changedCBRedRetr(checked) {
	if (!checked) $('#redretrkuso').show();
	else $('#redretrkuso').hide();
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
	document.getElementById('T'+fleet+'r'+form).checked = true;
	if (fleet.toString()[0] == '2') {
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
	var formation = 1;
	for (var i=1; i<=5; i++) {
		if (document.getElementById('T'+fleet+'r'+i).checked) { formation = document.getElementById('T'+fleet+'r'+i).value; break; }
	}
	var c = formation+',0,0|';
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
	document.getElementById('T'+fleet+'r'+s[0]).checked = true;
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
	FLEETS1 = []; FLEETS2 = [];
	var numsims = parseInt(document.getElementById('simnum').value);
	console.log(document.getElementById('simnum').value);
	var error = loadIntoSim(1,0);
	if (error) { document.getElementById('simnotespace').innerHTML = 'Fleet '+error+' has no ships.'; return; }
	error = loadIntoSim(2,1);
	if (error) { document.getElementById('simnotespace').innerHTML = 'Fleet '+error+' has no ships.'; return; }
	for (var i=2; i<=NUMFLEETS2; i++) {
		error = loadIntoSim(20+NUMFLEETS2,1);
		if (error) { document.getElementById('simnotespace').innerHTML = 'Fleet '+error+' has no ships.'; return; }
	}
	
	var doNB = [$('#NB2').prop('checked')]; 
	for (var i=2; i<=NUMFLEETS2; i++) doNB.push($('#NB2'+i).prop('checked'));
	var NBonly = [$('#NBonly2').prop('checked')]; 
	for (var i=2; i<=NUMFLEETS2; i++) NBonly.push($('#NBonly2'+i).prop('checked'));
	var aironly = [$('#aironly2').prop('checked')]; 
	for (var i=2; i<=NUMFLEETS2; i++) aironly.push($('#aironly2'+i).prop('checked'));
	
	simStats(numsims,doNB,NBonly,aironly);
	
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
	var letters = ['S','A','B','C','D'];
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

//player-----------------------------------
function clickedWatchBattle() {
	if (!CANRESET) return;
	
	// if (started) {
		// reset(true);
	// }
	console.log('butts');
	FLEETS1 = []; FLEETS2 = [];
	var error = loadIntoSim(1,0);
	if (error) { document.getElementById('simnotespace').innerHTML = 'Fleet '+error+' has no ships.'; return; }
	error = loadIntoSim(2,1);
	if (error) { document.getElementById('simnotespace').innerHTML = 'Fleet '+error+' has no ships.'; return; }
	for (var i=2; i<=NUMFLEETS2; i++) {
		error = loadIntoSim(20+i,1);
		if (error) { document.getElementById('simnotespace').innerHTML = 'Fleet '+error+' has no ships.'; return; }
	}
	$('#btnWatch').val('New Battle');
	
	C=true;
	code = '';
	
	API = {battles:[],fleetnum:1,support1:3,support2:4};
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
	
	var doNB = [$('#NB2').prop('checked')]; 
	for (var i=2; i<=NUMFLEETS2; i++) doNB.push($('#NB2'+i).prop('checked'));
	var NBonly = [$('#NBonly2').prop('checked')]; 
	for (var i=2; i<=NUMFLEETS2; i++) NBonly.push($('#NBonly2'+i).prop('checked'));
	var aironly = [$('#aironly2').prop('checked')]; 
	for (var i=2; i<=NUMFLEETS2; i++) aironly.push($('#aironly2'+i).prop('checked'));
	for (var j=0; j<FLEETS2.length; j++) {
		var BAPI = {data:{},yasen:{},mvp:[],rating:''};
		var res = sim(FLEETS1[0],FLEETS2[j],doNB[j],NBonly[j],aironly[j],BAPI);
		API.battles.push(BAPI);
		console.log('c');
		if (res.redded) break;
	}
	console.log(API);
	// return;
	// if (!started) {
		// started = true;
		// setup();
		// processAPI(API);
	$('#code').val(JSON.stringify(API));
	loadCode(true);
	// }
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