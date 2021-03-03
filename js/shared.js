var code = '';

var API = {};
var APIsample = '{"defeat_count":3,"diff":0,"world":3,"mapnum":5,"fleetnum":1,"combined":0,"fleet1":[{"mst_id":326,"level":75,"kyouka":[39,56,50,37,0],"morale":49,"equip":[63,63,106,0]},{"mst_id":188,"level":79,"kyouka":[31,50,50,31,0],"morale":49,"equip":[90,90,134,79]},{"mst_id":159,"level":72,"kyouka":[43,60,50,40,0],"morale":49,"equip":[90,90,102,0]},{"mst_id":144,"level":86,"kyouka":[56,56,43,38,0],"morale":49,"equip":[63,63,28,0]},{"mst_id":145,"level":89,"kyouka":[44,56,48,38,0],"morale":49,"equip":[3,3,58,0]},{"mst_id":437,"level":80,"kyouka":[46,58,40,36,0],"morale":49,"equip":[3,3,28,0]}],"fleet2":[{"mst_id":308,"level":42,"kyouka":[17,28,22,16,0],"morale":49,"equip":[0,0,0,0]},{"mst_id":7,"level":5,"kyouka":[6,4,4,4,0],"morale":49,"equip":[0,0,0,0]},{"mst_id":163,"level":7,"kyouka":[2,1,0,6,0],"morale":49,"equip":[0,0,0,0]},{"mst_id":28,"level":5,"kyouka":[3,2,4,2,0],"morale":49,"equip":[1,0,0,0]}],"fleet3":[{"mst_id":213,"level":53,"kyouka":[36,49,29,31,0],"morale":64,"equip":[6,75,6,0]},{"mst_id":250,"level":41,"kyouka":[22,32,20,23,0],"morale":49,"equip":[75,75,75,0]},{"mst_id":255,"level":42,"kyouka":[15,31,15,14,0],"morale":64,"equip":[2,2,75,0]},{"mst_id":236,"level":37,"kyouka":[28,51,11,36,0],"morale":64,"equip":[2,75,2,0]},{"mst_id":237,"level":36,"kyouka":[18,51,17,36,0],"morale":63,"equip":[2,2,75,0]},{"mst_id":6,"level":5,"kyouka":[5,6,5,0,0],"morale":49,"equip":[75,75,0,0]}],"fleet4":[{"mst_id":434,"level":69,"kyouka":[35,51,18,31,0],"morale":64,"equip":[75,75,75,0]},{"mst_id":31,"level":34,"kyouka":[19,25,22,13,0],"morale":49,"equip":[75,75,0,0]},{"mst_id":248,"level":40,"kyouka":[24,46,22,25,0],"morale":64,"equip":[75,75,75,0]},{"mst_id":402,"level":28,"kyouka":[4,9,0,5,0],"morale":49,"equip":[0,0,0,0]},{"mst_id":17,"level":37,"kyouka":[11,49,21,13,0],"morale":63,"equip":[75,75,0,0]},{"mst_id":42,"level":42,"kyouka":[18,36,25,13,0],"morale":64,"equip":[75,75,0,0]}],"support1":0,"support2":0,"time":1445741527,"hq":"8018568","id":1,"battles":[{"sortie_id":1,"node":6,"enemyId":0,"data":{"api_dock_id":1,"api_ship_ke":[555,527,521,521,576,576],"api_ship_lv":[-1,1,1,1,1,1,1],"api_nowhps":[-1,31,47,50,31,31,31,57,76,50,50,37,37],"api_maxhps":[-1,31,59,50,31,31,31,57,76,50,50,37,37],"api_midnight_flag":1,"api_eSlot":[[506,525,542,543,-1],[505,506,515,525,-1],[506,514,514,-1,-1],[506,514,514,-1,-1],[502,545,542,-1,-1],[502,545,542,-1,-1]],"api_eKyouka":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],"api_fParam":[[52,88,73,51],[77,82,82,79],[70,98,68,69],[73,93,59,52],[57,84,72,52],[60,90,59,50]],"api_eParam":[[48,80,30,39],[68,48,40,70],[35,72,20,34],[35,72,20,34],[38,66,32,26],[38,66,32,26]],"api_search":[1,1],"api_formation":[1,1,2],"api_stage_flag":[1,1,1],"api_kouku":{"api_plane_from":[[2],[-1]],"api_stage1":{"api_f_count":5,"api_f_lostcount":0,"api_e_count":0,"api_e_lostcount":0,"api_disp_seiku":1,"api_touch_plane":[-1,-1]},"api_stage2":{"api_f_count":5,"api_f_lostcount":0,"api_e_count":0,"api_e_lostcount":0},"api_stage3":{"api_frai_flag":[-1,0,0,0,0,0,0],"api_erai_flag":[-1,0,0,0,0,0,0],"api_fbak_flag":[-1,0,0,0,0,0,0],"api_ebak_flag":[-1,0,0,1,0,0,0],"api_fcl_flag":[-1,0,0,0,0,0,0],"api_ecl_flag":[-1,0,0,0,0,0,0],"api_fdam":[-1,0,0,0,0,0,0],"api_edam":[-1,0,0,11,0,0,0]}},"api_support_flag":0,"api_support_info":null,"api_opening_flag":0,"api_opening_atack":null,"api_hourai_flag":[1,0,0,1],"api_hougeki1":{"api_at_list":[-1,3,7,2,8,6,9,4,5,1,11],"api_at_type":[-1,0,0,0,0,0,0,0,0,0,0],"api_df_list":[-1,[9],[6],[10],[3],[12],[2],[9],[12],[7],[4]],"api_si_list":[-1,[90],[506],[90],[505],[3],[506],[63],[3],[63],[502]],"api_cl_list":[-1,[1],[0],[2],[1],[1],[0],[0],[1],[0],[0]],"api_damage":[-1,[32],[0],[102],[15],[33],[0.1],[0],[26],[0],[0]]},"api_hougeki2":null,"api_hougeki3":null,"api_raigeki":{"api_frai":[-1,1,2,3,3,3,2],"api_erai":[-1,4,2,0,0,2,0],"api_fdam":[-1,0,4,0,0,0,0],"api_edam":[-1,35,18,149,0,0,0],"api_fydam":[-1,35,10,51,48,50,8],"api_eydam":[-1,0,0,0,0,4,0],"api_fcl":[-1,1,1,1,1,1,1],"api_ecl":[-1,0,0,0,0,1,0]}},"yasen":{},"rating":"B","drop":0,"time":1445741527,"baseEXP":400,"hqEXP":75,"shizunde":[[],[]],"mvp":[2],"hq":"8018568","id":1},{"sortie_id":1,"node":7,"enemyId":0,"data":{"api_dock_id":1,"api_ship_ke":[560,527,522,577,575,575],"api_ship_lv":[-1,1,1,1,1,1,1],"api_nowhps":[-1,31,43,35,31,31,31,84,76,60,38,35,35],"api_maxhps":[-1,31,59,50,31,31,31,84,76,60,38,35,35],"api_midnight_flag":1,"api_eSlot":[[520,524,524,517,-1],[505,506,515,525,-1],[505,506,525,525,-1],[502,515,542,-1,-1],[502,545,542,-1,-1],[502,545,542,-1,-1]],"api_eKyouka":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],"api_fParam":[[52,88,73,51],[77,82,82,79],[70,98,68,69],[73,93,59,52],[57,84,72,52],[60,90,59,50]],"api_eParam":[[18,0,36,70],[68,48,40,70],[58,42,30,60],[44,72,36,29],[38,60,30,22],[38,60,30,22]],"api_search":[1,1],"api_formation":[1,3,1],"api_stage_flag":[1,1,1],"api_kouku":{"api_plane_from":[[2],[7]],"api_stage1":{"api_f_count":5,"api_f_lostcount":1,"api_e_count":88,"api_e_lostcount":2,"api_disp_seiku":4,"api_touch_plane":[-1,517]},"api_stage2":{"api_f_count":4,"api_f_lostcount":0,"api_e_count":66,"api_e_lostcount":21},"api_stage3":{"api_frai_flag":[-1,0,0,1,0,0,0],"api_erai_flag":[-1,0,0,0,0,0,0],"api_fbak_flag":[-1,1,0,0,1,0,0],"api_ebak_flag":[-1,0,0,0,0,1,0],"api_fcl_flag":[-1,0,0,0,0,0,0],"api_ecl_flag":[-1,0,0,0,0,0,0],"api_fdam":[-1,0,0,18,4,0,0],"api_edam":[-1,0,0,0,0,0,0]}},"api_support_flag":0,"api_support_info":null,"api_opening_flag":0,"api_opening_atack":null,"api_hourai_flag":[1,0,0,1],"api_hougeki1":{"api_at_list":[-1,2,8,3,9,5,1,12,4,10,6,7],"api_at_type":[-1,0,0,0,0,0,0,0,0,0,0,0],"api_df_list":[-1,[11],[4],[9],[1],[10],[12],[2],[8],[4],[12],[3]],"api_si_list":[-1,[90],[505],[90],[505],[3],[63],[502],[63],[502],[3],[-1]],"api_cl_list":[-1,[1],[0],[1],[0],[0],[0],[0],[0],[1],[0],[0]],"api_damage":[-1,[90.1],[0],[21],[0],[0],[0],[0],[0],[3],[0],[0]]},"api_hougeki2":null,"api_hougeki3":null,"api_raigeki":{"api_frai":[-1,3,6,0,1,4,1],"api_erai":[-1,0,3,6,3,0,4],"api_fdam":[-1,0,0,0,0,0,0],"api_edam":[-1,100,0,46,79.1,0,68.1],"api_fydam":[-1,46,68,0,62,79,38],"api_eydam":[-1,0,0,0,0,0,0],"api_fcl":[-1,1,1,0,2,1,1],"api_ecl":[-1,0,0,0,0,0,0]}},"yasen":{},"rating":"A","drop":41,"time":1445741660,"baseEXP":400,"hqEXP":120,"shizunde":[[],[]],"mvp":[2],"hq":"8018568","id":2},{"sortie_id":1,"node":11,"enemyId":0,"data":{"api_dock_id":1,"api_ship_ke":[591,558,558,543,578,578],"api_ship_lv":[-1,1,1,1,1,1,1],"api_nowhps":[-1,31,43,17,24,31,31,48,130,130,90,40,40],"api_maxhps":[-1,31,59,50,31,31,31,48,130,130,90,40,40],"api_midnight_flag":1,"api_eSlot":[[550,550,545,525,-1],[506,504,504,-1,-1],[506,504,504,-1,-1],[509,509,525,529,-1],[502,515,542,-1,-1],[502,515,542,-1,-1]],"api_eKyouka":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],"api_fParam":[[52,88,73,51],[77,82,82,79],[70,98,68,69],[73,93,59,52],[57,84,72,52],[60,90,59,50]],"api_eParam":[[58,84,88,55],[55,0,40,65],[55,0,40,65],[85,0,70,96],[48,84,38,33],[48,84,38,33]],"api_search":[1,1],"api_formation":[1,1,1],"api_stage_flag":[1,1,1],"api_kouku":{"api_plane_from":[[2],[-1]],"api_stage1":{"api_f_count":4,"api_f_lostcount":0,"api_e_count":0,"api_e_lostcount":0,"api_disp_seiku":1,"api_touch_plane":[-1,-1]},"api_stage2":{"api_f_count":4,"api_f_lostcount":3,"api_e_count":0,"api_e_lostcount":0},"api_stage3":{"api_frai_flag":[-1,0,0,0,0,0,0],"api_erai_flag":[-1,0,0,0,0,0,0],"api_fbak_flag":[-1,0,0,0,0,0,0],"api_ebak_flag":[-1,0,0,0,1,0,0],"api_fcl_flag":[-1,0,0,0,0,0,0],"api_ecl_flag":[-1,0,0,0,0,0,0],"api_fdam":[-1,0,0,0,0,0,0],"api_edam":[-1,0,0,0,11,0,0]}},"api_support_flag":0,"api_support_info":null,"api_opening_flag":0,"api_opening_atack":null,"api_hourai_flag":[1,1,0,1],"api_hougeki1":{"api_at_list":[-1,2,10,3,8,5,7,1,4,12,6,11],"api_at_type":[-1,2,0,0,0,0,0,0,0,0,0,0],"api_df_list":[-1,[9,9],[2],[12],[6],[10],[2],[8],[10],[2],[8],[5]],"api_si_list":[-1,[90,90],[509],[90],[506],[3],[550],[63],[63],[502],[3],[502]],"api_cl_list":[-1,[1,1],[0],[0],[0],[1],[0],[1],[0],[0],[2],[1]],"api_damage":[-1,[65.1,79.1],[0],[0],[0],[6],[0],[11],[0],[0],[36],[11]]},"api_hougeki2":{"api_at_list":[-1,1,7,2,8,3,10,4,5,12,6],"api_at_type":[-1,0,0,3,0,0,0,0,0,0,0],"api_df_list":[-1,[10],[6],[11],[2],[7],[4],[10],[7],[5],[8]],"api_si_list":[-1,[63],[550],[79,90,134],[506],[90],[509],[63],[3],[502],[3]],"api_cl_list":[-1,[2],[1],[1],[2],[0],[1],[1],[0],[0],[1]],"api_damage":[-1,[16],[8.1],[86],[21],[0],[15],[5],[0],[0],[11]]},"api_hougeki3":null,"api_raigeki":{"api_frai":[-1,4,0,0,0,6,6],"api_erai":[-1,3,0,0,0,0,2],"api_fdam":[-1,0,16,5,0,0,0],"api_edam":[-1,0,0,0,4,0,62],"api_fydam":[-1,4,0,0,0,0,62],"api_eydam":[-1,5,0,0,0,0,16],"api_fcl":[-1,1,0,0,0,0,1],"api_ecl":[-1,1,0,0,0,0,1]}},"yasen":{"api_deck_id":"1","api_nowhps":[-1,31,6,12,9,20,23,48,72,0,48,0,0],"api_ship_ke":[591,558,558,543,578,578],"api_ship_lv":[-1,1,1,1,1,1,1],"api_maxhps":[-1,31,59,50,31,31,31,48,130,130,90,40,40],"api_eSlot":[[550,550,545,525,-1],[506,504,504,-1,-1],[506,504,504,-1,-1],[509,509,525,529,-1],[502,515,542,-1,-1],[502,515,542,-1,-1]],"api_eKyouka":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],"api_fParam":[[52,88,73,51],[77,82,82,79],[70,98,68,69],[73,93,59,52],[57,84,72,52],[60,90,59,50]],"api_eParam":[[58,84,88,55],[55,0,40,65],[55,0,40,65],[85,0,70,96],[48,84,38,33],[48,84,38,33]],"api_touch_plane":[102,-1],"api_flare_pos":[-1,-1],"api_hougeki":{"api_at_list":[-1,1,7,8,4,6],"api_df_list":[-1,[10,10],[5,5],[2,-1,-1],[10,10],[7,7]],"api_si_list":[-1,[63,63],[550,550],[506,504,504],[63,63],[3,3]],"api_cl_list":[-1,[1,1],[1,1],[1,-1,-1],[1,1],[1,1]],"api_sp_list":[-1,1,1,5,1,1],"api_damage":[-1,[4,2],[1,12],[3,-1,-1],[2,23],[120,0]]}},"rating":"A","drop":52,"time":1445741789,"baseEXP":400,"hqEXP":2225,"shizunde":[[],[]],"mvp":[2],"hq":"8018568","id":3}]}';
var APIsample2 = '{"now_maphp":1,"max_maphp":2000,"fleet2": [{"morale": 68, "equip": [2, 2, 74, 0], "kyouka": [56, 56, 28, 38, 0], "mst_id": 144, "level": 71}, {"morale": 57, "equip": [50, 6, 102, 0], "kyouka": [43, 62, 50, 40, 0], "mst_id": 158, "level": 79}, {"morale": 62, "equip": [6, 6, 59, 30], "kyouka": [34, 55, 42, 31, 0], "mst_id": 273, "level": 73}, {"morale": 59, "equip": [114, 114, 59, 36], "kyouka": [25, 20, 35, 13, 0], "mst_id": 178, "level": 92}, {"morale": 62, "equip": [90, 6, 25, 28], "kyouka": [30, 45, 45, 30, 0], "mst_id": 272, "level": 75}, {"morale": 61, "equip": [58, 58, 101, 0], "kyouka": [47, 61, 43, 45, 0], "mst_id": 228, "level": 87}], "fleet3": [{"morale": 62, "equip": [2, 2, 2, 0], "kyouka": [26, 51, 26, 36, 0], "mst_id": 201, "level": 55}, {"morale": 62, "equip": [8, 76, 76, 28], "kyouka": [16, 0, 46, 17, 0], "mst_id": 286, "level": 65}, {"morale": 62, "equip": [8, 8, 8, 142], "kyouka": [16, 0, 39, 17, 0], "mst_id": 287, "level": 59}, {"morale": 62, "equip": [24, 24, 57, 30], "kyouka": [5, 0, 3, 10, 0], "mst_id": 282, "level": 29}, {"morale": 62, "equip": [24, 24, 30, 30], "kyouka": [46, 0, 39, 39, 0], "mst_id": 277, "level": 50}, {"morale": 62, "equip": [2, 27, 106, 0], "kyouka": [53, 57, 20, 39, 0], "mst_id": 195, "level": 75}], "fleet1": [{"morale": 69, "equip": [131, 71, 32, 85], "kyouka": [35, 50, 34, 30, 0], "mst_id": 428, "level": 86}, {"morale": 65, "equip": [8, 104, 59, 36], "kyouka": [9, 0, 61, 13, 0], "mst_id": 275, "level": 77}, {"morale": 62, "equip": [104, 8, 25, 36], "kyouka": [9, 0, 50, 13, 0], "mst_id": 276, "level": 64}, {"morale": 56, "equip": [57, 112, 57, 22], "kyouka": [39, 0, 40, 34, 0], "mst_id": 280, "level": 73}, {"morale": 62, "equip": [22, 22, 144, 57], "kyouka": [49, 0, 41, 39, 0], "mst_id": 278, "level": 68}, {"morale": 57, "equip": [111, 22, 22, 54], "kyouka": [40, 0, 38, 31, 0], "mst_id": 408, "level": 89}], "fleet4": [{"morale": 60, "equip": [24, 24, 24, 30], "kyouka": [29, 0, 19, 34, 0], "mst_id": 281, "level": 53}, {"morale": 55, "equip": [2, 2, 27, 0], "kyouka": [44, 56, 41, 38, 0], "mst_id": 145, "level": 67}, {"morale": 62, "equip": [7, 76, 7, 28], "kyouka": [19, 0, 22, 14, 0], "mst_id": 441, "level": 37}, {"morale": 62, "equip": [7, 7, 117, 30], "kyouka": [22, 0, 36, 24, 0], "mst_id": 149, "level": 78}, {"morale": 61, "equip": [2, 2, 2, 0], "kyouka": [45, 51, 40, 45, 0], "mst_id": 229, "level": 63}, {"morale": 54, "equip": [24, 24, 24, 30], "kyouka": [39, 0, 28, 30, 0], "mst_id": 288, "level": 44}], "hq": "13126679", "time": 1441510719, "mapnum": 7, "battles": [{"node": 5, "rating": "S", "hq": "13126679", "drop": 13, "enemyId": 0, "yasen": {}, "sortie_id": 1526, "time": 1441510719, "data": {"api_eKyouka": [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], "api_opening_flag": 0, "api_maxhps": [-1, 57, 90, 90, 65, 79, 55, 76, 80, 53, 46, 35, 35], "api_ship_lv": [-1, 1, 1, 1, 1, 1, 1], "api_fParam_combined": [[73, 93, 44, 52], [67, 88, 70, 69], [76, 79, 66, 77], [99, 36, 70, 95], [78, 69, 65, 75], [59, 89, 59, 59]], "api_opening_atack": null, "api_nowhps_combined": [-1, 31, 48, 56, 96, 57, 32], "api_hougeki1": {"api_si_list": [-1, [114, 114], [505], [6], [505], [90, 6], [50], [-1], [2]], "api_damage": [-1, [138, 139], [0], [0], [0], [4.1, 159.1], [0.1], [7], [0.1]], "api_at_list": [-1, 4, 7, 3, 8, 5, 2, 6, 1], "api_df_list": [-1, [10, 10], [1], [7], [5], [12, 12], [8], [8], [8]], "api_at_type": [-1, 2, 0, 0, 0, 2, 0, 0, 0], "api_cl_list": [-1, [1, 1], [0], [0], [0], [1, 2], [0], [1], [0]]}, "api_kouku": {"api_plane_from": [[4, 5, 6], [-1]], "api_stage3": {"api_ecl_flag": [-1, 0, 0, 0, 0, 1, 0], "api_frai_flag": [-1, 0, 0, 0, 0, 0, 0], "api_erai_flag": [-1, 0, 0, 0, 0, 1, 0], "api_ebak_flag": [-1, 0, 0, 1, 0, 1, 1], "api_fdam": [-1, 0, 0, 0, 0, 0, 0], "api_fcl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fbak_flag": [-1, 0, 0, 0, 0, 0, 0], "api_edam": [-1, 0, 0, 0, 0, 235, 0]}, "api_stage2": {"api_f_count": 143, "api_e_lostcount": 0, "api_f_lostcount": 6, "api_e_count": 0}, "api_stage1": {"api_touch_plane": [59, -1], "api_disp_seiku": 1, "api_f_count": 233, "api_e_lostcount": 0, "api_f_lostcount": 4, "api_e_count": 0}, "api_stage3_combined": {"api_fbak_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fcl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fdam": [-1, 0, 0, 0, 0, 0, 0], "api_frai_flag": [-1, 0, 0, 0, 0, 0, 0]}}, "api_hougeki2": {"api_si_list": [-1, [59, 8, 104], [505], [104, 8]], "api_damage": [-1, [137], [6], [105, 87]], "api_at_list": [-1, 2, 7, 3], "api_df_list": [-1, [8], [5], [7, 7]], "api_at_type": [-1, 6, 0, 2], "api_cl_list": [-1, [1], [1], [1, 1]]}, "api_midnight_flag": 0, "api_maxhps_combined": [-1, 31, 48, 56, 96, 57, 32], "api_support_info": {"api_support_airatack": null, "api_support_hourai": {"api_undressing_flag": [0, 0, 0, 0, 0, 0], "api_damage": [-1, 0, 0, 151, 0, 0, 0], "api_deck_id": 3, "api_ship_id": [1481, 224, 256, 93, 199, 1926], "api_cl_list": [-1, 0, 0, 2, 0, 0, 0]}}, "api_raigeki": {"api_frai": [-1, 1, 1, 1, 2, 1, 2], "api_fydam": [-1, 24, 6, 14, 8, 3, 14], "api_fcl": [-1, 1, 1, 1, 1, 1, 1], "api_fdam": [-1, 0, 0, 0, 0, 0, 0], "api_eydam": [-1, 0, 0, 0, 0, 0, 0], "api_edam": [-1, 47, 22, 0, 0, 0, 0], "api_erai": [-1, 1, 3, 0, 0, 0, 0], "api_ecl": [-1, 0, 0, 0, 0, 0, 0]}, "api_hourai_flag": [1, 1, 1, 0], "api_eSlot": [[505, 506, 515, 525, -1], [505, 505, 515, 525, -1], [504, 542, 543, -1, -1], [502, 559, 544, -1, -1], [502, 545, 542, -1, -1], [502, 545, 542, -1, -1]], "api_ship_ke": [527, 594, 554, 623, 575, 575], "api_support_flag": 2, "api_nowhps": [-1, 57, 90, 90, 61, 74, 55, 76, 80, 53, 46, 35, 35], "api_stage_flag": [1, 1, 1], "api_fParam": [[77, 84, 106, 78], [99, 0, 94, 98], [99, 0, 83, 98], [39, 0, 70, 69], [49, 0, 71, 79], [40, 0, 74, 62]], "api_formation": ["14", 2, 2], "api_search": [1, 1], "api_deck_id": "1", "api_eParam": [[68, 48, 40, 70], [73, 66, 72, 82], [42, 72, 27, 36], [58, 76, 48, 36], [38, 60, 30, 22], [38, 60, 30, 22]]}, "id": 3080}, {"node": 10, "rating": "S", "hq": "13126679", "drop": 0, "enemyId": 0, "yasen": {}, "sortie_id": 1526, "time": 1441510895, "data": {"api_eKyouka": [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], "api_opening_flag": 0, "api_maxhps": [-1, 57, 90, 90, 65, 79, 55, 160, 96, 80, 40, 35, 35], "api_ship_lv": [-1, 1, 1, 1, 1, 1, 1], "api_fParam_combined": [[73, 93, 44, 52], [67, 88, 70, 69], [76, 79, 66, 77], [99, 36, 70, 95], [78, 69, 65, 75], [59, 89, 59, 59]], "api_opening_atack": null, "api_hougeki3": {"api_si_list": [-1, [71], [-1], [8], [25, 104, 8]], "api_damage": [-1, [14], [18], [34], [114]], "api_at_list": [-1, 1, 7, 2, 3], "api_df_list": [-1, [7], [2], [7], [7]], "api_at_type": [-1, 0, 0, 0, 6], "api_cl_list": [-1, [1], [1], [1], [1]]}, "api_nowhps_combined": [-1, 31, 48, 56, 96, 57, 32], "api_hougeki1": {"api_si_list": [-1, [114], [505], [6, 6], [502], [90], [-1], [50, 6], [-1], [-1], [2]], "api_damage": [-1, [0], [0], [36, 3], [2], [0], [24], [11, 15], [0], [0], [0]], "api_at_list": [-1, 4, 9, 3, 10, 5, 7, 2, 8, 6, 1], "api_df_list": [-1, [8], [5], [9, 9], [6], [9], [2], [7, 7], [5], [9], [10]], "api_at_type": [-1, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], "api_cl_list": [-1, [0], [0], [1, 1], [1], [0], [1], [1, 1], [0], [0], [0]]}, "api_kouku": {"api_plane_from": [[4, 5, 6], [7, 8]], "api_stage3": {"api_ecl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_frai_flag": [-1, 0, 0, 0, 1, 0, 0], "api_erai_flag": [-1, 0, 0, 0, 0, 0, 1], "api_ebak_flag": [-1, 1, 1, 0, 1, 0, 0], "api_fdam": [-1, 0, 0, 11, 37, 0, 0], "api_fcl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fbak_flag": [-1, 0, 0, 1, 0, 0, 0], "api_edam": [-1, 0, 0, 0, 0, 0, 129]}, "api_stage2": {"api_f_count": 125, "api_e_lostcount": 28, "api_f_lostcount": 13, "api_e_count": 108}, "api_stage1": {"api_touch_plane": [-1, -1], "api_disp_seiku": 2, "api_f_count": 223, "api_e_lostcount": 98, "api_f_lostcount": 21, "api_e_count": 240}, "api_stage3_combined": {"api_fbak_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fcl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fdam": [-1, 0, 0, 0, 0, 0, 0], "api_frai_flag": [-1, 0, 0, 0, 0, 0, 1]}}, "api_hougeki2": {"api_si_list": [-1, [104], [8], [-1], [71], [-1], [-1]], "api_damage": [-1, [149], [5], [0], [11], [71], [5]], "api_at_list": [-1, 3, 2, 7, 1, 5, 6], "api_df_list": [-1, [9], [7], [4], [8], [8], [7]], "api_at_type": [-1, 0, 0, 0, 0, 0, 0], "api_cl_list": [-1, [2], [1], [0], [2], [1], [1]]}, "api_midnight_flag": 0, "api_maxhps_combined": [-1, 31, 48, 56, 96, 57, 32], "api_support_info": {"api_support_airatack": null, "api_support_hourai": {"api_undressing_flag": [0, 0, 0, 0, 0, 0], "api_damage": [-1, 0, 43, 0, 0, 93, 0], "api_deck_id": 3, "api_ship_id": [1481, 224, 256, 93, 199, 1926], "api_cl_list": [-1, 0, 1, 0, 0, 1, 0]}}, "api_raigeki": {"api_frai": [-1, 3, 0, 3, 1, 4, 4], "api_fydam": [-1, 3, 0, 4, 17, 18, 49], "api_fcl": [-1, 1, 0, 1, 1, 1, 1], "api_fdam": [-1, 0, 0, 0, 0, 0, 6], "api_eydam": [-1, 0, 0, 3, 3, 0, 0], "api_edam": [-1, 17, 0, 7, 67, 0, 0], "api_erai": [-1, 0, 0, 6, 6, 0, 0], "api_ecl": [-1, 0, 0, 2, 1, 0, 0]}, "api_hourai_flag": [1, 1, 1, 1], "api_eSlot": [[547, 548, 549, 549, -1], [547, 548, 549, 549, -1], [505, 505, 515, 525, -1], [502, 515, 542, -1, -1], [502, 545, 542, -1, -1], [502, 545, 542, -1, -1]], "api_ship_ke": [616, 579, 594, 578, 575, 575], "api_support_flag": 2, "api_nowhps": [-1, 57, 90, 90, 61, 68, 55, 160, 96, 80, 40, 35, 35], "api_stage_flag": [1, 1, 1], "api_fParam": [[77, 84, 106, 78], [99, 0, 94, 98], [99, 0, 83, 98], [39, 0, 70, 69], [49, 0, 71, 79], [40, 0, 74, 62]], "api_formation": ["14", 2, 2], "api_search": [1, 1], "api_deck_id": "1", "api_eParam": [[40, 0, 90, 120], [25, 0, 50, 80], [73, 66, 72, 82], [48, 84, 38, 33], [38, 60, 30, 22], [38, 60, 30, 22]]}, "id": 3081}, {"node": 13, "rating": "S", "hq": "13126679", "drop": 9, "enemyId": 0, "yasen": {}, "sortie_id": 1526, "time": 1441511102, "data": {"api_eKyouka": [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], "api_opening_flag": 0, "api_maxhps": [-1, 57, 90, 90, 65, 79, 55, 160, 160, 66, 49, 49, 80], "api_ship_lv": [-1, 1, 1, 1, 1, 1, 1], "api_fParam_combined": [[73, 93, 44, 52], [67, 88, 70, 69], [76, 79, 66, 77], [99, 36, 70, 95], [78, 69, 65, 75], [59, 89, 59, 59]], "api_opening_atack": null, "api_nowhps_combined": [-1, 31, 24, 56, 96, 57, 24], "api_hougeki1": {"api_si_list": [-1, [114, 114], [50, 6], [502], [6], [90], [-1], [2], [-1]], "api_damage": [-1, [133, 0], [4, 57], [10], [12], [0], [55], [52], [2]], "api_at_list": [-1, 4, 2, 10, 3, 5, 8, 1, 6], "api_df_list": [-1, [9, 9], [11, 11], [4], [8], [10], [4], [8], [8]], "api_at_type": [-1, 2, 2, 0, 0, 0, 0, 0, 0], "api_cl_list": [-1, [1, 1], [1, 1], [1], [1], [0], [2], [2], [1]]}, "api_kouku": {"api_plane_from": [[4, 5, 6], [7, 8]], "api_stage3": {"api_ecl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_frai_flag": [-1, 0, 0, 0, 0, 0, 0], "api_erai_flag": [-1, 0, 1, 0, 1, 0, 0], "api_ebak_flag": [-1, 0, 1, 0, 0, 1, 1], "api_fdam": [-1, 0, 0, 0, 0, 0, 0], "api_fcl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fbak_flag": [-1, 0, 0, 0, 0, 0, 0], "api_edam": [-1, 0, 0, 0, 0, 4, 20]}, "api_stage2": {"api_f_count": 101, "api_e_lostcount": 81, "api_f_lostcount": 30, "api_air_fire": {"api_kind": 10, "api_use_items": [71, 131, 32], "api_idx": 0}, "api_e_count": 111}, "api_stage1": {"api_touch_plane": [-1, -1], "api_disp_seiku": 2, "api_f_count": 189, "api_e_lostcount": 157, "api_f_lostcount": 17, "api_e_count": 288}, "api_stage3_combined": {"api_fbak_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fcl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fdam": [-1, 0, 0, 0, 0, 0, 0], "api_frai_flag": [-1, 0, 0, 1, 1, 0, 0]}}, "api_hougeki2": {"api_si_list": [-1, [59, 8, 104], [25, 104, 8], [71], [-1], [-1]], "api_damage": [-1, [117], [93], [7], [42], [20]], "api_at_list": [-1, 2, 3, 1, 5, 6], "api_df_list": [-1, [8], [7], [7], [7], [7]], "api_at_type": [-1, 6, 6, 0, 0, 0], "api_cl_list": [-1, [1], [1], [1], [1], [1]]}, "api_midnight_flag": 0, "api_maxhps_combined": [-1, 31, 48, 56, 96, 57, 32], "api_support_info": {"api_support_airatack": null, "api_support_hourai": {"api_undressing_flag": [0, 0, 0, 0, 0, 0], "api_damage": [-1, 0, 67, 0, 0, 0, 119], "api_deck_id": 3, "api_ship_id": [1481, 224, 256, 93, 199, 1926], "api_cl_list": [-1, 0, 2, 0, 0, 0, 1]}}, "api_raigeki": {"api_frai": [-1, 2, 0, 4, 0, 2, 4], "api_fydam": [-1, 3, 0, 32, 0, 1, 53], "api_fcl": [-1, 1, 0, 1, 0, 1, 1], "api_fdam": [-1, 4, 0, 0, 0, 0, 0], "api_eydam": [-1, 0, 0, 0, 4, 0, 0], "api_edam": [-1, 0, 4, 0, 85, 0, 0], "api_erai": [-1, 0, 0, 0, 1, 0, 0], "api_ecl": [-1, 0, 0, 0, 1, 0, 0]}, "api_hourai_flag": [1, 1, 1, 0], "api_eSlot": [[547, 548, 549, 549, -1], [547, 548, 549, 549, -1], [550, 550, 545, 525, -1], [502, 502, 559, -1, -1], [502, 502, 559, -1, -1], [501, 503, 503, -1, -1]], "api_ship_ke": [616, 616, 592, 624, 624, 526], "api_support_flag": 2, "api_nowhps": [-1, 57, 72, 79, 24, 68, 55, 160, 160, 66, 49, 49, 80], "api_stage_flag": [1, 1, 1], "api_fParam": [[77, 84, 106, 78], [99, 0, 94, 98], [99, 0, 83, 98], [39, 0, 70, 69], [49, 0, 71, 79], [40, 0, 74, 62]], "api_formation": ["14", 3, 1], "api_search": [1, 1], "api_deck_id": "1", "api_eParam": [[40, 0, 90, 120], [40, 0, 90, 120], [64, 92, 96, 68], [64, 98, 48, 48], [64, 98, 48, 48], [15, 0, 0, 35]]}, "id": 3082}, {"node": 26, "rating": "S", "hq": "13126679", "drop": 123, "enemyId": 0, "yasen": {"api_fParam": [[77, 84, 106, 78], [99, 0, 94, 98], [99, 0, 84, 98], [39, 0, 70, 69], [49, 0, 71, 79], [40, 0, 74, 62]], "api_eKyouka": [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], "api_fParam_combined": [[73, 93, 44, 52], [67, 88, 70, 69], [76, 79, 66, 77], [99, 36, 70, 95], [78, 69, 65, 75], [59, 89, 59, 59]], "api_eSlot": [[553, 553, 531, -1, -1], [509, 509, 512, 529, -1], [505, 505, 515, 525, -1], [505, 505, 515, 525, -1], [502, 515, 542, -1, -1], [502, 515, 542, -1, -1]], "api_hougeki": {"api_si_list": [-1, [2, 2], [553, 553], [50, 6], [6, 6], [114, 114], [90, 6]], "api_sp_list": [-1, 1, 1, 1, 1, 1, 1], "api_damage": [-1, [51, 7], [3, 1], [23, 18], [19, 7], [3, 29], [35, 35]], "api_at_list": [-1, 1, 7, 2, 3, 4, 5], "api_df_list": [-1, [7, 7], [6, 6], [8, 8], [7, 7], [7, 7], [7, 7]], "api_cl_list": [-1, [1, 1], [1, 2], [1, 1], [1, 1], [1, 2], [1, 1]]}, "api_ship_ke": [629, 557, 594, 594, 578, 578], "api_maxhps": [-1, 57, 90, 90, 65, 79, 55, 255, 400, 80, 80, 40, 40], "api_maxhps_combined": [-1, 31, 48, 56, 96, 57, 32], "api_flare_pos": [6, -1], "api_touch_plane": [-1, -1], "api_ship_lv": [-1, 1, 1, 1, 1, 1, 1], "api_deck_id": "1", "api_nowhps": [-1, 57, 72, 40, 24, 9, 55, 137, 7, 0, 0, 0, 0], "api_eParam": [[160, 90, 360, 303], [180, 0, 80, 160], [73, 66, 72, 82], [73, 66, 72, 82], [48, 84, 38, 33], [48, 84, 38, 33]], "api_nowhps_combined": [-1, 27, 21, 56, 31, 57, 5]}, "sortie_id": 1526, "time": 1441511314, "data": {"api_eKyouka": [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], "api_opening_flag": 0, "api_maxhps": [-1, 57, 90, 90, 65, 79, 55, 255, 400, 80, 80, 40, 40], "api_ship_lv": [-1, 1, 1, 1, 1, 1, 1], "api_fParam_combined": [[73, 93, 44, 52], [67, 88, 70, 69], [76, 79, 66, 77], [99, 36, 70, 95], [78, 69, 65, 75], [59, 89, 59, 59]], "api_opening_atack": null, "api_hougeki3": {"api_si_list": [-1, [71], [553], [8], [512], [25, 104, 8], [-1]], "api_damage": [-1, [3], [39], [3], [16], [44], [1]], "api_at_list": [-1, 1, 7, 2, 8, 3, 6], "api_df_list": [-1, [7], [3], [8], [5], [8], [8]], "api_at_type": [-1, 0, 0, 0, 0, 6, 0], "api_cl_list": [-1, [2], [1], [1], [1], [1], [1]]}, "api_nowhps_combined": [-1, 27, 24, 56, 31, 57, 24], "api_hougeki1": {"api_si_list": [-1, [114, 114], [509], [90, 6], [553], [50], [505], [6, 6], [502], [-1], [2]], "api_damage": [-1, [24, 23], [0], [60, 1], [0], [0], [3], [21, 13], [0], [45], [0]], "api_at_list": [-1, 4, 8, 5, 7, 2, 9, 3, 11, 6, 1], "api_df_list": [-1, [7, 7], [6], [9, 9], [6], [7], [2], [7, 7], [1], [11], [8]], "api_at_type": [-1, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0], "api_cl_list": [-1, [1, 1], [0], [1, 1], [0], [0], [1], [1, 1], [0], [1], [0]]}, "api_kouku": {"api_plane_from": [[4, 5, 6], [-1]], "api_stage3": {"api_ecl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_frai_flag": [-1, 0, 0, 0, 0, 0, 0], "api_erai_flag": [-1, 1, 0, 0, 0, 1, 0], "api_ebak_flag": [-1, 0, 0, 1, 1, 0, 1], "api_fdam": [-1, 0, 0, 0, 0, 0, 0], "api_fcl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fbak_flag": [-1, 0, 0, 0, 0, 0, 0], "api_edam": [-1, 24, 0, 9, 7, 0, 60]}, "api_stage2": {"api_f_count": 70, "api_e_lostcount": 0, "api_f_lostcount": 11, "api_e_count": 0}, "api_stage1": {"api_touch_plane": [59, -1], "api_disp_seiku": 1, "api_f_count": 142, "api_e_lostcount": 0, "api_f_lostcount": 1, "api_e_count": 0}, "api_stage3_combined": {"api_fbak_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fcl_flag": [-1, 0, 0, 0, 0, 0, 0], "api_fdam": [-1, 0, 0, 0, 0, 0, 0], "api_frai_flag": [-1, 0, 0, 0, 0, 0, 0]}}, "api_hougeki2": {"api_si_list": [-1, [25, 104, 8], [509], [59, 8, 104], [553], [71], [-1]], "api_damage": [-1, [109], [0], [84], [43], [4], [7]], "api_at_list": [-1, 3, 8, 2, 7, 1, 6], "api_df_list": [-1, [8], [5], [8], [5], [8], [8]], "api_at_type": [-1, 6, 0, 6, 0, 0, 0], "api_cl_list": [-1, [1], [0], [1], [1], [1], [1]]}, "api_midnight_flag": 1, "api_maxhps_combined": [-1, 31, 48, 56, 96, 57, 32], "api_support_info": {"api_support_airatack": null, "api_support_hourai": {"api_undressing_flag": [0, 0, 0, 0, 0, 0], "api_damage": [-1, 0, 87, 0, 73, 0, 0], "api_deck_id": 4, "api_ship_id": [325, 17, 889, 287, 456, 884], "api_cl_list": [-1, 0, 2, 0, 1, 0, 0]}}, "api_raigeki": {"api_frai": [-1, 2, 0, 1, 0, 2, 3], "api_fydam": [-1, 33, 0, 10, 0, 21, 32], "api_fcl": [-1, 1, 0, 1, 0, 1, 1], "api_fdam": [-1, 0, 0, 0, 0, 0, 19], "api_eydam": [-1, 19, 0, 0, 0, 0, 0], "api_edam": [-1, 10, 54.1, 32, 0, 0, 0], "api_erai": [-1, 6, 0, 0, 0, 0, 0], "api_ecl": [-1, 1, 0, 0, 0, 0, 0]}, "api_hourai_flag": [1, 1, 1, 1], "api_eSlot": [[553, 553, 531, -1, -1], [509, 509, 512, 529, -1], [505, 505, 515, 525, -1], [505, 505, 515, 525, -1], [502, 515, 542, -1, -1], [502, 515, 542, -1, -1]], "api_ship_ke": [629, 557, 594, 594, 578, 578], "api_support_flag": 2, "api_nowhps": [-1, 57, 72, 79, 24, 68, 55, 255, 400, 80, 80, 40, 40], "api_stage_flag": [1, 1, 1], "api_fParam": [[77, 84, 106, 78], [99, 0, 94, 98], [99, 0, 84, 98], [39, 0, 70, 69], [49, 0, 71, 79], [40, 0, 74, 62]], "api_formation": ["14", 1, 1], "api_search": [1, 1], "api_deck_id": "1", "api_eParam": [[160, 90, 360, 303], [180, 0, 80, 160], [73, 66, 72, 82], [73, 66, 72, 82], [48, 84, 38, 33], [48, 84, 38, 33]]}, "id": 3083}], "id": 1526, "fleetnum": 1, "combined": 1, "world": 31, "diff": 1, "support2": 4, "support1": 3}';
var started = false;

//var SHIPIDSORTED = [0,80,275,81,276,77,82,87,88,20,228,83,277,84,278,90,279,197,91,280,196,50,229,9,201,426,10,202,32,203,11,204,33,205,420,12,206,13,207,195,14,208,24,57,118,25,58,119,78,209,149,86,210,150,79,211,151,85,212,152,89,285,26,286,411,27,287,412,51,213,52,214,76,281,157,1,254,434,2,255,435,28,256,418,29,257,6,258,30,259,7,260,31,261,99,215,100,216,101,217,146,21,218,22,219,141,53,221,23,220,54,222,158,55,223,159,56,224,160,102,104,103,105,70,73,59,262,416,60,263,417,61,264,62,265,319,63,266,192,64,267,193,65,268,194,66,269,67,270,68,271,428,69,272,427,71,273,188,72,274,189,75,283,92,284,408,93,230,15,231,94,232,16,233,407,34,234,437,35,235,147,36,236,37,237,38,238,326,39,239,40,240,41,241,419,42,242,43,243,145,44,244,45,245,144,46,246,47,247,95,248,96,249,199,97,250,98,251,48,252,49,253,464,470,17,225,18,226,19,227,74,282,106,107,108,291,296,109,292,297,110,288,461,466,111,112,462,467,113,289,114,290,200,115,293,116,117,120,121,190,300,122,294,123,295,142,191,401,124,129,125,130,126,398,127,399,128,400,131,136,132,301,133,302,134,303,135,304,137,305,138,306,139,307,140,314,143,148,153,156,154,343,155,403,161,166,163,402,164,308,165,309,167,320,168,317,169,313,170,312,171,172,173,178,174,310,179,175,311,180,176,177,448,358,181,316,182,187,183,321,184,185,318,186,322,404,406,331,429,332,430,432,353,405,323,409,324,410,325,413,327,414,328,415,329,421,330,422,346,423,357,424,345,425,344,465,356,431,334,436,441,446,442,447,443,347,452,359,445,450,451,348,453,349,454,354,455,355,458,350,459,351,469,460,352];
var SHIPIDSORTED = [0], tempships = [];
for (var sid in SHIPDATA) {
	if (sid > 1500) continue;
	if (SHIPDATA[sid].prev) continue;
	tempships.push(sid);
}
tempships.sort(function(a,b) { return (SHIPDATA[a].nid < SHIPDATA[b].nid)? -1:1; });
for (var i=0; i<tempships.length; i++) {
	var sid = tempships[i];
	SHIPIDSORTED.push(parseInt(sid));
	while (SHIPDATA[sid].next) {
		sid = SHIPDATA[sid].next;
		if (SHIPIDSORTED.indexOf(sid) != -1) break;
		SHIPIDSORTED.push(sid);
	}
}
var SHIPCLASSSORTED = {'Battleships':[],'Carriers':[],'Light Carriers':[],'Heavy Cruisers':[],'Light Cruisers':[],'Destroyers':[],'Submarines':[],'Auxiliary':[]};
for (var i=0; i<SHIPIDSORTED.length; i++) {
	if (SHIPIDSORTED[i] < 1500) {
		switch(SHIPDATA[SHIPIDSORTED[i]].type) {
			case 'BB':
			case 'FBB':
			case 'BBV':
			case 'BBVT':
				SHIPCLASSSORTED['Battleships'].push(SHIPIDSORTED[i]);
				break;
			case 'CV':
			case 'CVB':
				SHIPCLASSSORTED['Carriers'].push(SHIPIDSORTED[i]);
				break;
			case 'CVL':
				SHIPCLASSSORTED['Light Carriers'].push(SHIPIDSORTED[i]);
				break
			case 'CA':
			case 'CAV':
				SHIPCLASSSORTED['Heavy Cruisers'].push(SHIPIDSORTED[i]);
				break;
			case 'CL':
			case 'CLT':
			case 'CT':
				SHIPCLASSSORTED['Light Cruisers'].push(SHIPIDSORTED[i]);
				break;
			case 'DD':
				SHIPCLASSSORTED['Destroyers'].push(SHIPIDSORTED[i]);
				break;
			case 'SS':
			case 'SSV':
				SHIPCLASSSORTED['Submarines'].push(SHIPIDSORTED[i]);
				break;
			default:
				SHIPCLASSSORTED['Auxiliary'].push(SHIPIDSORTED[i]);
				break;
		}
	}
}
// console.log(SHIPCLASSSORTED);

var defaultEquips = {
	'DD': [122,122,29],
	'CL': [90,90,59],
	'CLT': [90,90,41],
	'CA': [50,90,59,31],
	'CAV': [50,90,79,79],
	'BB': [8,8,59,36],
	'BBV': [8,8,36,79],
	'FBB': [7,7,59,36],
	'SS': [15,15,15,15],
	'SSV': [15,15,15,15],
	'CV': [52,52,22,22],
	'CVB': [52,52,22,22],
	'CVL': [52,52,22,22],
	'AV': [12,12,12,12],
	'LHA': [22,22,22,22],
};



function shuffle(o) {
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function loadFile(fleet) {
	if ($('#flashingdiv')) { $('#flashingdiv').css('animation',''); $('#flashingdiv').css('border',''); }
	var files = document.getElementById('T'+fleet+'sfile').files;
	var fromfleet = $('#T'+fleet+'sfilefrom').val();
	var reader = new FileReader();
	reader.readAsText(files[0]);
	reader.addEventListener('loadend',function() { processFile(fleet,reader,fromfleet); });
	// document.getElementById('fleetchoose'+hide).style.display = 'none';
}

function processFile(fleetnum,reader,fromfleet) {
	var kcdata = JSON.parse(reader.result);
	
	var fleet = kcdata.fleets[parseInt(fromfleet)-1].ships;
	for (var i=0; i<fleet.length; i++) {
		var fid = fleet[i];
		if (fid <= 0) { clickedClear(fleetnum,i); continue; }
		var mid = kcdata.ships['x'+fid].masterId;
		var ship = kcdata.ships['x'+fid];
		if (!SHIPDATA[mid]) continue;
		var name = SHIPDATA[mid].name;
		if (!name) name = '';
		
		var equips = [],improves = [], profs = [];
		for (var j=0; j<4; j++) {  //get equip mids
			// console.log(ship.items[j]);
			if (ship.items[j] == -1) { equips.push(0); improves.push(0); profs.push(0); }
			else {
				var idata = kcdata.gears['x'+ship.items[j]];
				var eq = EQDATA[idata.masterId];
				if (!eq) continue;
				equips.push(idata.masterId);
				improves.push((idata.stars>=0)? idata.stars : 0);
				profs.push((idata.ace>=0)? idata.ace : 0);
			}
		}
		if (ship.ex_item && ship.ex_item>0) {
			var idata = kcdata.gears['x'+ship.ex_item];
			if (EQDATA[idata.masterId]) {
				equips.push(idata.masterId);
				improves.push((idata.stars>=0)? idata.stars : 0);
				profs.push((idata.ace>=0)? idata.ace : 0);
			}
		} else {
			equips.push(0);
			improves.push(0);
			profs.push(0);
		}
		
		tableSetShip(fleetnum,i,mid,[ship.level,ship.hp[1],ship.fp[0],ship.tp[0],ship.aa[0],ship.ar[0],ship.ev[0],ship.as[0],ship.ls[0],ship.lk[0],ship.range,SHIPDATA[mid].SPD],equips,improves,profs);  
	}
	updateFleetCode(fleetnum);
}

function getHP(ship, lv) {
    if (lv <= 99) return ship.HP
    var ret
    if (ship.HP >= 90) ret = ship.HP + 9
    else if (ship.HP >= 70) ret = ship.HP + 8
    else if (ship.HP >= 50) ret = ship.HP + 7
    else if (ship.HP >= 40) ret = ship.HP + 6
    else if (ship.HP >= 30) ret = ship.HP + 5
    else ret = ship.HP + 4
    if (ret > ship.HPmax) ret = ship.HPmax
    return ret
}

//old, now loads directly in loadFleetFromCode
function processDeckbuilderCode(fleet,dbcode) {
	try {
		var data = JSON.parse(dbcode);
	} catch(e) {
		return;
	}
	
	for (var slot in data.f1) {
		var ship = data.f1[slot];
		var slotn = parseInt(slot.substr(1))-1;
		var shipd = SHIPDATA[ship.id];
		var stats = [ship.lv,getHP(shipd,ship.lv),shipd.FP,shipd.TP,shipd.AA,shipd.AR,shipd.EV,shipd.ASW,shipd.LOS,(ship.luck)? ship.luck : shipd.LUK,shipd.RNG,shipd.SPD];
		var equips = [0,0,0,0], improvs = [0,0,0,0];
		for (var item in ship.items) {
			var islot = item.substr(1);
			if (islot=='x') continue;
			equips[islot-1] = ship.items[item].id;
			improvs[islot-1] = ship.items[item].rf;
		}
		tableSetShip(fleet,slotn,ship.id,stats,equips,improvs);
		for (var i=0; i<5; i++) changedEquip(fleet,slotn,i,true);
	}
	
	updateFleetCode(fleet);
}

function exportDeckbuilder(fleet) {
	var data = {version:4,f1:{}};
	for (var i=0; i<6; i++) {
		var mid = parseInt($('#T'+fleet+'n'+i).val());
		if (mid >= 2000) return;
		if (!mid) continue;
		//temp fix for abyssal id shift, see how deckbuilder handles it
		if (mid > 1500) mid -= 1000;
		var ship = data.f1['s'+(i+1)] = {};
		ship.id = mid;
		ship.lv = parseInt($('#T'+fleet+'lvl'+i).val());
		ship.luck = parseInt($('#T'+fleet+'luk'+i).val());
		ship.items = {};
		for (var j=0; j<4; j++) {
			var eq = parseInt(PREVEQS[fleet][i][j]);
			if (!eq) continue;
			var impr = parseInt($('#T'+fleet+'imprv'+i+j).val());
			var prof = parseInt($('#T'+fleet+'prof'+i+j).val());
			ship.items['i'+(j+1)] = {id:eq};
			if (impr) ship.items['i'+(j+1)].rf = impr;
			if (prof) ship.items['i'+(j+1)].mas = prof;
		}
		if (parseInt(PREVEQS[fleet][i][4])) {
			var impr = parseInt($('#T'+fleet+'imprv'+i+'4').val());
			var prof = parseInt($('#T'+fleet+'prof'+i+'4').val());
			ship.items.ix = {id:parseInt(PREVEQS[fleet][i][4])};
			if (impr) ship.items.ix.rf = impr;
			if (prof) ship.items.ix.mas = prof;
		}
	}
	
	var url = 'http://www.kancolle-calc.net/deckbuilder.html?predeck='+encodeURI(JSON.stringify(data));
	window.open(url);
}

function isPlayable(shipid) {
	return (shipid < 1500 || (shipid >= 9001 && shipid <= 9003));
}

function sameShip(mid1,mid2) {
	if (mid1==mid2) return true;
	var shipd1 = SHIPDATA[mid1];
	var done = [];
	while (shipd1.prev) {
		if (shipd1.prev == mid2) return true;
		done.push(shipd1.prev);
		shipd1 = SHIPDATA[shipd1.prev];
		if (done.indexOf(shipd1.prev) != -1) break;
	}
	while (shipd1.next) {
		if (shipd1.next == mid2) return true;
		done.push(shipd1.next);
		shipd1 = SHIPDATA[shipd1.next];
		if (done.indexOf(shipd1.next) != -1) break;
	}
	return false;
}