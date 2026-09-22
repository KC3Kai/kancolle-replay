importScripts(
	'js/kcSHIPDATA.js',
	'js/kcEQDATA.js',
	'js/shared.js',
	'js/kcships.js',
	'js/kcsim.js',
	'js/kcsimcombined.js',
	'js/simulator-ui/common.js',
	'js/simulator-ui/time-battle.js',
	'js/simulator-ui/sim-interface.js',
);

onmessage = function(e) {
	switch (e.data.type) {
		case 'init':
			initEQDATA(function() {
				SIM.runStatsWorker(self,e.data.dataInput,e.data.dataReplay,e.data.numSim);
			});
			break;
		case 'cancel':
			SIM.cancelRun = true;
			break;
	}
}