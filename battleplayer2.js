$(document).ready(() => {
    // console.log('battleplayer2')

    $('[data-toggle="tooltip"]').tooltip()

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