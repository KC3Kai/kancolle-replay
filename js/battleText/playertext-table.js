function SHIP(mid, hp, max) {
	this.mid = mid;
	this.name = this.getShipName();
	this.curHP = hp;
	this.MaxHP = max;
}

SHIP.prototype.damage = function(dam) {
	this.curHP -= Math.floor(dam);
};

SHIP.prototype.isSunk = function() {
	return this.curHP <= 0;
};

SHIP.prototype.getShipName = function(includeID) {
	if (!SHIPDATA[this.mid])
		return this.mid;
	let name = (LANG_SHIP_NAME == 'JP') ? SHIPDATA[this.mid].nameJP : SHIPDATA[this.mid].name;
	if (includeID) name += ' ('+this.mid+')';
	return name;
	// return SHIPDATA[mid].nameJP + ' (' + mid + ')';
};

FLEET = function() {
	this.mainFleet;
	this.escortFleet;
	this.supportNode;
	this.supportBoss;
	this.combined = false;
};

FLEET.prototype.addFleet = function(fleet, hp) {
	this.mainFleet = [];
	for (var i = 0; i < fleet.length; i++) {
		if ((fleet[i].mst_id && fleet[i].mst_id == -1) || fleet[i] == -1)
			continue;
		this.mainFleet.push(new SHIP((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i], hp[i]));
	}
};
FLEET.prototype.addCombinedFleet = function(main, escort, hp, ehp, combinedType) {
	this.mainFleet = [], this.escortFleet = [];;
	this.combined = combinedType;
	for (var i = 0; i < main.length; i++) {
		this.mainFleet.push(new SHIP((main[i].mst_id) ? main[i].mst_id : main[i], hp[i]));
		this.escortFleet.push(new SHIP((escort[i].mst_id) ? escort[i].mst_id : escort[i], ehp[i]));
	}
};

FLEET.prototype.addSupport = function(fleet, boss) {
	if (boss) {
		this.supportBoss = [];
		for (var i = 0; i < fleet.length; i++) {
			this.supportBoss.push(new SHIP((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i]));
		}
	} else {
		this.supportNode = [];
		for (var i = 0; i < fleet.length; i++) {
			this.supportNode.push(new SHIP((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i]));
		}
	}
};

FLEET.prototype.formatFleet = function(fleet) {
	var ships = "";
	if (fleet.length == 1)
		return fleet[0].name;

	for (var i = 0; i < fleet.length; i++) {
		if (i == (fleet.length - 1)) {
			ships = ships.concat("and ", fleet[i].name);
			continue;
		}
		ships = ships.concat(fleet[i].name, ", ");
	}
	return ships;
};

FLEET.prototype.isCombined = function(){
	return (this.escortFleet);
};


FLEET.prototype.toString = function(delimiter) {
	if (delimiter === undefined) delimiter = "<br>";
	
	var ships = "";
	if (this.mainFleet.length == 1)
		return this.mainFleet[0].name;

	for (var i = 0; i < this.mainFleet.length; i++) {
		// if (i == (this.mainFleet.length - 1)) {
			// ships = ships.concat("and ", this.mainFleet[i].name);
			// continue;
		// }
		ships = ships.concat(this.mainFleet[i].name + ' (' + this.mainFleet[i].mid + ')');
		if (i < this.mainFleet.length - 1) ships = ships.concat(delimiter);
	}
	return ships;
};

