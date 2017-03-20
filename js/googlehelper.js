const formId = '1FAIpQLScMXcNrvM_7PJfHfgoqbh_YoFtkeOfWpwuijDf8wrXCLe7fTQ';
const spreadsheetId = '1IL6sR-skGprULmjbPFcu8M7WDHMN4ucOM6bewGclu-4';
const sheetId = '235403108';

let formUrl = 'https://docs.google.com/forms/d/e/' + formId + '/formResponse';
let spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/edit#gid=' + sheetId;

$(document).ready(() => {
    console.info('googlehelper loaded!');

    // $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.0/jquery.min.js',
    //     () => { })

    // $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-sheetrock/1.1.4/dist/sheetrock.min.js',
    //     () => { console.info('sheetrock loaded!'); })
})

function postBattleData(playerId, battleId, battleJson, callback) {
    if (!playerId || !battleId) {
        return callback();
    }

    console.log('Posting data %s %s', playerId, battleId);

    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + formUrl,
        type: 'POST',
        data: {
            'entry.1997566516': playerId,
            'entry.625242511': battleId,
            'entry.1273988424': battleJson,
        },
        dataType: "xml",
    })
        .done(function () {
            console.log('promise done');
        })
        .fail(function (jqXHR) {
            console.log('promise fail');
            // console.log(jqXHR);

            let code = jqXHR.status;
            if (code !== 200) { }

            let html = jqXHR.responseText;
            let elm = $('.freebirdFormviewerViewResponseConfirmContentContainer', $(html));
            $('.freebirdFormviewerViewResponsePageTitle', $(elm)).remove();
            let msg = elm.html();

            // success
            let ielm = $('.freebirdFormviewerViewResponseConfirmationMessage', $(elm));
            if (ielm) {
                msg = $(ielm).html();
            }

            console.log(msg);
            callback(msg === 'success')
        })
}

function getBattleData(playerId, battleId, callback) {
    if (!playerId || !battleId) {
        return callback();
    }

    sheetrock({
        url: spreadsheetUrl,
        query: "select D where B = " + playerId + " and C = " + battleId + " limit 1",
        fetchSize: 0,
        callback: function (err, opt, res) {
            // console.log(err);
            // console.log(opt);
            // console.log(res);

            if (res && res.rows.length > 1) {
                let data = res.rows[1].cellsArray[0];
                callback(data);
            } else {
                callback();
            }
        }
    })
}
