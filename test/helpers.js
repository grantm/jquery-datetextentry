
function visibility_check(selector) {
    var $match = $(selector);
    return $match.length === 0 ? "No match for selector: '" + selector + "'"
           : $(selector).is(':visible') ? 'visible' : 'hidden';
}

function widget_content(selector) {
    var text_val = [];
    var $wrapper = $(selector).next();
    if($wrapper.hasClass('jq-dte-inner')) {
        var separator = $wrapper.find('span.separator:first').text();
        $wrapper.find('input').each(function(i, el) {
            text_val.push( $(el).val() );
        });
        return text_val.join(separator);
    }
    else {
        return undefined;
    }
}

function add_char($input, character) {
    var val = '' + $input.val() + character;
    $input.val(val);
    $input.trigger({ type: 'keydown', which: character.charCodeAt(0) });
    $input.trigger({ type: 'keyup', which: character.charCodeAt(0) });
}

