(function($) {

    $('#dob2').datetextentry();

    $('#lbl2').click(function() { $('#dob2').datetextentry('focus'); });

    $('form').submit(function(e) {
        e.preventDefault();
    });

})(jQuery);
