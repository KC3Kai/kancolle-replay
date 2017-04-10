function SHIP(n, hp, max) {
	this.name = n, this.curHP =
	hp, this.MaxHP =
	max
}

FLEET = function() {
	this.mainFleet = [];
	this.escortFleet = [];
	this.supportNode = [];
	this.supportBoss = [];

	getShipName = function(mid) {
		if (!SHIPDATA[mid])
			return mid;
		return SHIPDATA[mid].name + ' (' + mid + ')';
		// return SHIPDATA[mid].nameJP + ' (' + mid + ')';
	};
};

FLEET.prototype.addFleet = function(fleet, hp) {
	for (var i = 0; i < fleet.length; i++) {
		this.mainFleet.push({
			name : getShipName((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i]),
			curHP : hp[i]
		});
	}
};
FLEET.prototype.addCombinedFleet = function(main, escort, hp, ehp) {
	var shipList = [];
	for (var i = 0; i < main.length; i++) {
		this.mainFleet.push({
			name : getShipName((main[i].mst_id) ? main[i].mst_id : main[i]),
			curHP : hp[i]
		});
		this.escortFleet.push({
			name : getShipName((escort[i].mst_id) ? escort[i].mst_id : escort[i]),
			curHP : ehp[i]
		});
	}
};

FLEET.prototype.addSupport = function(fleet, boss) {

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

FLEET.prototype.toString = function() {
	return "";
};

