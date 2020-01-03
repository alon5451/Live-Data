$(".btn-minimize").click(function(){
    $(this).toggleClass('btn-plus');
    $(".places").slideToggle();
    $(".place-props").slideToggle();
    if ($('.fa-window-restore').css('color')=='rgb(255, 255, 255)') {
        $('.fa-window-restore').css('color', '#27273C')
        $('.btn-minimize').css('background-color', 'white')
    } else {
        $('.fa-window-restore').css('color', 'rgb(255, 255, 255)')
        $('.btn-minimize').css('background-color', '#27273C')
    }
    // $(".btn-minimize").html('<i class="far fa-window-restore" style="color: white; font-size: 20px; padding: 5px;"></i>');
});