$(document).ready(() => {
    // console.log('battleplayer2')

    $('[data-toggle="tooltip"]').tooltip()

	$('#btnBattle').click(function () {
		if(started) {
			var battleText = new PLAYERTEXT(API);
			prog_window = window.open("", "Battle Data", "width=600,height=600,scrollbars=yes");
			prog_window.document.write("<html><body><div id='table'></div></body></html>");
			prog_window.document.getElementById('#table').innerHTML = "yay";
		}
	});
	
    $('#btnPause').click(function () {
        if (started) {
            PAUSE = !PAUSE;
            if (PAUSE) {
                $(this).removeClass('mdl-button--colored');
                $(this).addClass('mdl-button--accent');
            } else {
                $(this).addClass('mdl-button--colored');
                $(this).removeClass('mdl-button--accent');
            }
        }
    })

    $('#btnReset').click(function () {
        if (started)
            reset(function () {
                processAPI(API);
            })
    })

    $('#rangeSpeed').on('input', function () {
        var num = $(this).val();
        RATE = (num < 40) ? num / 40 : (num - 40) / 10 + 1;
        $('#speednum').text('x' + RATE);
    })

    $('#switchSound').change(function () {
        if (!Howler._muted) {
            $(this).attr('checked', false)
            Howler.mute(true);
        } else {
            $(this).attr('checked', true)
            Howler.mute(false);
            Howler.volume($('#rangeVolume').val() / 100)
        }
    })

    $('#rangeVolume').on('input', function () {
        var num = $(this).val();
        num = num / 100;
        if (!Howler._muted)
            Howler.volume(num)
    })

})