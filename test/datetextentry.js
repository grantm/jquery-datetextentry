(function($) {
    "use strict";

    var initial_width, $date1, $dd, $mm, $yyyy, $tooltip, $errorbox;

    describe("jQuery datetextentry function", function() {

        it("is defined", function() {
            expect( typeof $('<input />').datetextentry ).toBe('function');
        });

        it("has defaults", function() {
            expect( typeof $.fn.datetextentry.defaults ).toBe('object');
        });

        it("has expected default separator", function() {
            expect( $.fn.datetextentry.defaults.separator ).toBe('/');
        });

    });

    describe("Target text input '#date1'", function() {

        it("is visible", function() {
            expect( visibility_check('#date1') ).toBe('visible');
        });

        it("is empty", function() {
            $date1 = $('#date1');
            $date1.val('');
            expect( $date1.val() ).toBe('');
        });

        it("has plausible initial width", function() {
            initial_width = $date1.outerWidth();
            expect( initial_width > 160 ).toBe(true);
            expect( initial_width < 170 ).toBe(true);
        });

        it("is the child of a p.p1 element", function() {
            expect( $date1.parent().attr('class') ).toBe('p1');
        });

    });

    describe("Date widget '#date1'", function() {

        runs(function() {
            $date1.datetextentry();
        });

        waitsFor(function() {
            return visibility_check('#date1') === 'hidden';
        }, "target input element to be hidden", 50);

        it("has hidden the original text input element", function() {
            expect( visibility_check('#date1') ).toBe('hidden');
        });

        it("and wrapped it with a span.jq-dte element", function() {
            expect( $date1.parent().attr('class') ).toBe('jq-dte');
        });

        it("containing a span.jq-dte-inner child element", function() {
            expect( $date1.next().attr('class') ).toBe('jq-dte-inner');
        });

        it("which wraps 3 input elements", function() {
            expect( $date1.next().find('input').length ).toBe(3);
        });

        it("and 2 span.separator elements", function() {
            expect( $date1.next().find('span.separator').length ).toBe(2);
        });

        it("tooltip element is initially hidden", function() {
            var $tooltip = $date1.parent().find('.jq-dte-tooltip');
            expect( visibility_check($tooltip) ).toBe('hidden');
        });

        it("errorbox element is initially hidden", function() {
            $errorbox = $date1.parent().find('.jq-dte-errorbox');
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        it("default initial hint text is displayed", function() {
            expect( widget_content('#date1') ).toBe('DD/MM/YYYY');
        });

    });

    describe("Date widget '#date1' DD sub-field", function() {

        it("contains hint text 'DD'", function() {
            $dd = $date1.next().find('input:first');
            expect( $dd.val() ).toBe('DD');
        });

        it("has 'hint' class", function() {
            expect( $dd.is('.hint') ).toBe(true);
        });

        it("has 'jq-dte-day' class", function() {
            expect( $dd.is('.jq-dte-day') ).toBe(true);
        });

        it("has 'aria-label'='Day (DD)'", function() {
            expect( $dd.attr('aria-label') ).toBe('Day (DD)');
        });

        runs(function() {
            $dd.focus();
        });

        waitsFor(function() {
            return $dd.is(':focus');
        }, "DD field to accept focus", 50);

        it("accepts focus", function() {
            expect( $dd.is(':focus') ).toBe(true);
        });

        it("hides 'DD' hint text", function() {
            expect( $dd.val() ).toBe('');
        });

        it("no longer has 'hint' class", function() {
            expect( $dd.is('.hint') ).toBe(false);
        });

        it("reveals tooltip element", function() {
            $tooltip = $date1.parent().find('.jq-dte-tooltip');
            expect( visibility_check($tooltip) ).toBe('visible');
        });

        it("with tooltip text 'Day'", function() {
            expect( $tooltip.text() ).toBe('Day');
        });

    });

    describe("Date widget '#date1' MM sub-field", function() {

        it("contains hint text 'MM'", function() {
            $mm = $( $date1.next().find('input')[1] );
            expect( $mm.val() ).toBe('MM');
        });

        it("has 'hint' class", function() {
            expect( $mm.is('.hint') ).toBe(true);
        });

        it("has 'jq-dte-month' class", function() {
            expect( $mm.is('.jq-dte-month') ).toBe(true);
        });

        it("has 'aria-label'='Month (MM)'", function() {
            expect( $mm.attr('aria-label') ).toBe('Month (MM)');
        });

        runs(function() {
            $mm.focus();
        });

        waitsFor(function() {
            return $mm.is(':focus');
        }, "MM field to accept focus", 50);

        it("accepts focus", function() {
            expect( $mm.is(':focus') ).toBe(true);
        });

        it("hides 'MM' hint text", function() {
            expect( $mm.val() ).toBe('');
        });

        it("no longer has 'hint' class", function() {
            expect( $mm.is('.hint') ).toBe(false);
        });

        it("reveals tooltip element", function() {
            $tooltip = $date1.parent().find('.jq-dte-tooltip');
            expect( visibility_check($tooltip) ).toBe('visible');
        });

        it("with tooltip text 'Month'", function() {
            expect( $tooltip.text() ).toBe('Month');
        });

    });

    describe("Date widget '#date1' YYYY sub-field", function() {

        it("contains hint text 'YYYY'", function() {
            $yyyy = $( $date1.next().find('input')[2] );
            expect( $yyyy.val() ).toBe('YYYY');
        });

        it("has 'hint' class", function() {
            expect( $yyyy.is('.hint') ).toBe(true);
        });

        it("has 'jq-dte-year' class", function() {
            expect( $yyyy.is('.jq-dte-year') ).toBe(true);
        });

        it("has 'aria-label'='Year (YYYY)'", function() {
            expect( $yyyy.attr('aria-label') ).toBe('Year (YYYY)');
        });

        runs(function() {
            $yyyy.focus();
        });

        waitsFor(function() {
            return $yyyy.is(':focus');
        }, "YYYY field to accept focus", 50);

        it("accepts focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("hides 'YYYY' hint text", function() {
            expect( $yyyy.val() ).toBe('');
        });

        it("no longer has 'hint' class", function() {
            expect( $yyyy.is('.hint') ).toBe(false);
        });

        it("reveals tooltip element", function() {
            $tooltip = $date1.parent().find('.jq-dte-tooltip');
            expect( visibility_check($tooltip) ).toBe('visible');
        });

        it("with tooltip text 'Year'", function() {
            expect( $tooltip.text() ).toBe('Year');
        });

    });

    describe("Hidden text input '#date1'", function() {

        it("is empty", function() {
            expect( $date1.val() ).toBe('');
        });

    });

    describe("Date widget '#date1' DD sub-field", function() {

        it("contains hint text 'DD'", function() {
            expect( $dd.val() ).toBe('DD');
        });

        it("has 'hint' class", function() {
            expect( $dd.is('.hint') ).toBe(true);
        });

        runs(function() {
            $dd.focus();
        });

        waitsFor(function() {
            return $dd.is(':focus');
        }, "DD field to accept focus", 50);

        it("accepts focus", function() {
            expect( $dd.is(':focus') ).toBe(true);
        });

        it("hides 'DD' hint text", function() {
            expect( $dd.val() ).toBe('');
        });

        it("no longer has 'hint' class", function() {
            expect( $dd.is('.hint') ).toBe(false);
        });

        it("reveals tooltip element", function() {
            expect( visibility_check($tooltip) ).toBe('visible');
        });

        it("with tooltip text 'Day'", function() {
            expect( $tooltip.text() ).toBe('Day');
        });

        it("still keeps errorbox element hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            add_char($dd, '1');
        });

        waits(50);

        it("accepts injected '1' character", function() {
            expect( $dd.val() ).toBe('1');
        });

        it("still keeps errorbox element hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            add_char($dd, 'a');
        });

        waits(50);

        it("accepts injected 'a' character", function() {
            expect( $dd.val() ).toBe('1a');
        });

        it("retains focus", function() {
            expect( $dd.is(':focus') ).toBe(true);
        });

        it("gains 'error' class", function() {
            expect( $dd.is('.error') ).toBe(true);
        });

        it("reveals errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
        });

        it("with error message about non-numeric content", function() {
            expect( $errorbox.text() ).toBe('Day must be a number');
        });

        runs(function() {
            $dd.val('');
            add_char($dd, '3');
        });

        waits(50);

        it("after clearing, accepts injected '3' character", function() {
            expect( $dd.val() ).toBe('3');
        });

        //it("hides errorbox element", function() {
        //    expect( visibility_check($errorbox) ).toBe('hidden');
        //});

        runs(function() {
            add_char($dd, '3');
        });

        waits(50);

        it("accepts another injected '3' character", function() {
            expect( $dd.val() ).toBe('33');
        });

        it("retains focus", function() {
            expect( $dd.is(':focus') ).toBe(true);
        });

        it("gains 'error' class", function() {
            expect( $dd.is('.error') ).toBe(true);
        });

        it("reveals errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
        });

        it("with error message about day value range", function() {
            expect( $errorbox.text() ).toBe('Day must be 1-31');
        });

        runs(function() {
            $dd.val('2');
            add_char($dd, '9');
        });

        waits(50);

        it("after clearing, accepts injected '29' characters", function() {
            expect( $dd.val() ).toBe('29');
        });

        it("loses focus", function() {
            expect( $dd.is(':focus') ).toBe(false);
        });

        it("still does not have 'hint' class", function() {
            expect( $dd.is('.hint') ).toBe(false);
        });

        it("hides errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

    });

    describe("Hidden text input '#date1'", function() {

        it("is empty", function() {
            expect( $date1.val() ).toBe('');
        });

    });

    describe("Date widget '#date1' MM sub-field", function() {

        it("now has focus", function() {
            expect( $mm.is(':focus') ).toBe(true);
        });

        it("hides 'MM' hint text", function() {
            expect( $mm.val() ).toBe('');
        });

        it("no longer has 'hint' class", function() {
            expect( $mm.is('.hint') ).toBe(false);
        });

        it("reveals tooltip element", function() {
            expect( visibility_check($tooltip) ).toBe('visible');
        });

        it("with tooltip text 'Month'", function() {
            expect( $tooltip.text() ).toBe('Month');
        });

        it("still keeps errorbox element hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $mm.val('2');
            add_char($mm, '2');
        });

        waits(50);

        it("accepts injected '22' characters", function() {
            expect( $mm.val() ).toBe('22');
        });

        it("retains focus", function() {
            expect( $mm.is(':focus') ).toBe(true);
        });

        it("gains 'error' class", function() {
            expect( $mm.is('.error') ).toBe(true);
        });

        it("reveals errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
        });

        it("with error message about month value range", function() {
            expect( $errorbox.text() ).toBe('Month must be 1-12');
        });

        runs(function() {
            $mm.val('0');
            add_char($mm, '2');
        });

        waits(50);

        it("accepts injected '02' characters", function() {
            expect( $mm.val() ).toBe('02');
        });

        it("loses focus", function() {
            expect( $mm.is(':focus') ).toBe(false);
        });

        it("loses 'error' class", function() {
            expect( $mm.is('.error') ).toBe(false);
        });

        it("still does not have 'hint' class", function() {
            expect( $mm.is('.hint') ).toBe(false);
        });

        it("hides errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

    });

    describe("Hidden text input '#date1'", function() {

        it("is empty", function() {
            expect( $date1.val() ).toBe('');
        });

    });

    describe("Date widget '#date1' YYYY sub-field", function() {

        it("now has focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("hides 'YYYY' hint text", function() {
            expect( $yyyy.val() ).toBe('');
        });

        it("no longer has 'hint' class", function() {
            expect( $yyyy.is('.hint') ).toBe(false);
        });

        it("reveals tooltip element", function() {
            expect( visibility_check($tooltip) ).toBe('visible');
        });

        it("with tooltip text 'Year'", function() {
            expect( $tooltip.text() ).toBe('Year');
        });

        it("still keeps errorbox element hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            add_char($yyyy, '1');
        });

        waits(50);

        it("accepts injected '1' characters", function() {
            expect( $yyyy.val() ).toBe('1');
        });

        it("retains focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("keeps errorbox element hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            add_char($yyyy, '9');
        });

        waits(50);

        it("accepts injected '9' characters", function() {
            expect( $yyyy.val() ).toBe('19');
        });

        it("retains focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("keeps errorbox element hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            add_char($yyyy, '9');
        });

        waits(50);

        it("accepts injected '9' characters", function() {
            expect( $yyyy.val() ).toBe('199');
        });

        it("retains focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("keeps errorbox element hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            add_char($yyyy, '9');
        });

        waits(50);

        it("accepts injected '9' characters", function() {
            expect( $yyyy.val() ).toBe('1999');
        });

        it("retains focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("reveals errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
        });

        it("with error message about days in Feb 1999", function() {
            expect( $errorbox.text() ).toBe('Only 28 days in February 1999');
        });

        it("does not add 'error' class to DD field", function() {
            expect( $dd.is('.error') ).toBe(false);
        });

        it("does not add 'error' class to MM field", function() {
            expect( $mm.is('.error') ).toBe(false);
        });

        it("does not add 'error' class to YYYY field", function() {
            expect( $yyyy.is('.error') ).toBe(false);
        });

        runs(function() {
            $yyyy.val('199');
            add_char($yyyy, '6');
        });

        waits(50);

        it("accepts injected '1996' characters", function() {
            expect( $yyyy.val() ).toBe('1996');
        });

        it("retains focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("hides errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

    });

    describe("Hidden text input '#date1'", function() {

        it("contains a valid ISO date", function() {
            expect( $date1.val() ).toBe('1996-02-29');
        });

    });

    describe("Date widget '#date1' YYYY sub-field", function() {

        it("still has focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("still keeps errorbox element hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $yyyy.val('19')
            add_char($yyyy, '9');
        });

        waits(50);

        it("accepts injected '1' characters", function() {
            expect( $yyyy.val() ).toBe('199');
        });

        it("retains focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("keeps errorbox element hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $mm.focus()
        });

        waits(50);

        it("surrenders focus to MM sub-field", function() {
            expect( $yyyy.is(':focus') ).toBe(false);
            expect( $mm.is(':focus') ).toBe(true);
        });

        it("gains 'error' class", function() {
            expect( $yyyy.is('.error') ).toBe(true);
        });

        it("and reveals errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
        });

        it("with error message about month value range", function() {
            expect( $errorbox.text() ).toBe('Year must be 4 digits');
        });

    });

    describe("Hidden text input '#date1'", function() {

        it("is empty again", function() {
            expect( $date1.val() ).toBe('');
        });

    });

    describe("Date widget '#date1' MM sub-field", function() {

        it("still has focus", function() {
            expect( $mm.is(':focus') ).toBe(true);
        });

        runs(function() {
            $mm.val('')
            add_char($mm, '2');
        });

        waits(50);

        it("after clear, accepts injected '2' character", function() {
            expect( $mm.val() ).toBe('2');
        });

        it("retains focus", function() {
            expect( $mm.is(':focus') ).toBe(true);
        });

        runs(function() {
            $yyyy.focus()
        });

        waits(50);

        it("surrenders focus to YYYY sub-field", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
            expect( $mm.is(':focus') ).toBe(false);
        });

        it("has leading '0' added", function() {
            expect( $mm.val() ).toBe('02');
        });

    });

    describe("Date widget '#date1' YYYY sub-field", function() {

        runs(function() {
            $yyyy.val('200')
            add_char($yyyy, '4');
        });

        waits(50);

        it("after resetting to '200', accepts injected '4' character", function() {
            expect( $yyyy.val() ).toBe('2004');
        });

        it("retains focus", function() {
            expect( $yyyy.is(':focus') ).toBe(true);
        });

        it("and hides errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

    });

    describe("Hidden text input '#date1'", function() {

        it("contains a valid ISO date", function() {
            expect( $date1.val() ).toBe('2004-02-29');
        });

    });

    describe("Date widget '#date1' DD & MM sub-fields", function() {

        runs(function() {
            $mm.val('').blur();
            $yyyy.val('')
            $dd.val('3').focus();
            add_char($dd, '1');
        });

        waits(50);

        it("after resetting, and entering '31' in DD, focus moves to MM", function() {
            expect( $mm.is(':focus') ).toBe(true);
        });

        it("leaving no 'error' class on DD", function() {
            expect( $dd.is('.error') ).toBe(false);
        });

        it("leaving no 'error' class on MM", function() {
            expect( $mm.is('.error') ).toBe(false);
        });

        it("leaving no 'error' class on YYYY", function() {
            expect( $yyyy.is('.error') ).toBe(false);
        });

        runs(function() {
            $mm.val('0')
            add_char($mm, '4');
        });

        waits(50);

        it("after entering '04', focus remains on MM", function() {
            expect( $mm.is(':focus') ).toBe(true);
        });

        it("which now has 'error' class", function() {
            expect( $mm.is('.error') ).toBe(false);
        });

        it("and errorbox element is revealed", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
        });

        it("with error message about days in April", function() {
            expect( $errorbox.text() ).toBe('Only 30 days in April');
        });

        runs(function() {
            $dd.val('').blur();
        });

        waits(50);

        it("after clearing day field, errorbox element is hidden", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

    });

})(jQuery);

