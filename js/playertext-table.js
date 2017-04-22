function SHIP(n, hp, max) {
	this.name = n;
	this.curHP = hp;
	this.MaxHP = max;
}

SHIP.prototype.damage = function(dam) {
	this.curHP -= Math.floor(dam);
};

SHIP.prototype.isSunk = function() {
	return this.curHP <= 0;
};

FLEET = function() {
	this.mainFleet;
	this.escortFleet;
	this.supportNode;
	this.supportBoss;
	this.combined = false;
	
	getShipName = function(mid) {
		if (!SHIPDATA[mid])
			return mid;
		return SHIPDATA[mid].name;
		// return SHIPDATA[mid].nameJP + ' (' + mid + ')';
	};
};

FLEET.prototype.addFleet = function(fleet, hp) {
	this.mainFleet = [];
	for (var i = 0; i < fleet.length; i++) {
		if ((fleet[i].mst_id && fleet[i].mst_id == -1) || fleet[i] == -1)
			continue;
		this.mainFleet.push(new SHIP(getShipName((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i]), hp[i]));
	}
};
FLEET.prototype.addCombinedFleet = function(main, escort, hp, ehp, combinedType) {
	this.mainFleet = [], this.escortFleet = [];;
	this.combined = combinedType;
	for (var i = 0; i < main.length; i++) {
		this.mainFleet.push(new SHIP(getShipName((main[i].mst_id) ? main[i].mst_id : main[i]), hp[i]));
		this.escortFleet.push(new SHIP(getShipName((escort[i].mst_id) ? escort[i].mst_id : escort[i]), ehp[i]));
	}
};

FLEET.prototype.addSupport = function(fleet, boss) {
	if (boss) {
		this.supportBoss = [];
		for (var i = 0; i < fleet.length; i++) {
			this.supportBoss.push(new SHIP(getShipName((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i])));
		}
	} else {
		this.supportNode = [];
		for (var i = 0; i < fleet.length; i++) {
			this.supportNode.push(new SHIP(getShipName((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i])));
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


FLEET.prototype.toString = function() {
	var ships = "";
	if (this.mainFleet.length == 1)
		return this.mainFleet[0].name;

	for (var i = 0; i < this.mainFleet.length; i++) {
		if (i == (this.mainFleet.length - 1)) {
			ships = ships.concat("and ", this.mainFleet[i].name);
			continue;
		}
		ships = ships.concat(this.mainFleet[i].name, ", ");
	}
	return ships;
};

