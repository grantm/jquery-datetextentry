(function($) {
    "use strict";

    var initial_width, $date2, $dd, $mm, $yyyy, $tooltip, $errorbox;

    describe("Target text input '#date2'", function() {

        it("is visible", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

        it("contains a valid ISO date", function() {
            $date2 = $('#date2');
            $date2.val('1975-03-18');
            expect( $date2.val() ).toBe('1975-03-18');
        });

        it("is the child of a p.p2 element", function() {
            expect( $date2.parent().attr('class') ).toBe('p2');
        });

    });

    describe("Date widget '#date2'", function() {

        runs(function() {
            $date2.datetextentry({
                max_year: '1999'
            });
            $dd   = $( $date2.next().find('input')[0] );
            $mm   = $( $date2.next().find('input')[1] );
            $yyyy = $( $date2.next().find('input')[2] );
            $errorbox = $date2.parent().find('.jq-dte-errorbox');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'hidden';
        }, "target input element to be hidden", 50);

        it("has hidden the original text input element", function() {
            expect( visibility_check('#date2') ).toBe('hidden');
        });

        it("has attached a DateTextEntry object to the original element", function() {
            var obj = $date2.data('datetextentry');
            expect( typeof obj ).toBe('object');
        });

        it("initialised sub-fields to expected date components", function() {
            expect( widget_content('#date2') ).toBe('18/03/1975');
        });

        it("left underlying ISO date value unchanged", function() {
            expect( $date2.val() ).toBe('1975-03-18');
        });

        it("accepts the method call: clear()", function() {
            $date2.datetextentry('clear');
            expect( widget_content('#date2') ).toBe('DD/MM/YYYY');
        });

        it("which also cleared the underlying ISO date value", function() {
            expect( $date2.val() ).toBe('');
        });

        it("accepts the method call: set_date('1982-10-31')", function() {
            $date2.datetextentry('set_date', '1982-10-31');
            expect( widget_content('#date2') ).toBe('31/10/1982');
        });

        it("which also set the underlying ISO date value", function() {
            expect( $date2.val() ).toBe('1982-10-31');
        });

        it("accepts the method call: set_date('1999-99-99')", function() {
            $date2.datetextentry('set_date', '1999-99-99');
            expect( widget_content('#date2') ).toBe('99/99/1999');
        });

        it("which cleared the underlying ISO date value", function() {
            expect( $date2.val() ).toBe('');
        });

        it("set 'error' class on DD sub-field", function() {
            expect( $dd.is('.error') ).toBe(true);
        });

        it("set 'error' class on MM sub-field", function() {
            expect( $mm.is('.error') ).toBe(true);
        });

        it("did not set 'error' class on YYYY sub-field", function() {
            expect( $yyyy.is('.error') ).toBe(false);
        });

        it("and revealed errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
        });

        it("does not have focus", function() {
            $('#text1').focus();
            expect( $dd.is(':focus') ).toBe(false);
            expect( $mm.is(':focus') ).toBe(false);
            expect( $yyyy.is(':focus') ).toBe(false);
            expect( $date2.parent().is('.focus') ).toBe(false);
        });

        it("accepts the method call: focus()", function() {
            $date2.datetextentry('focus');
            expect(true).toBe(true);
        });

        it("which sets the focus to the DD sub-field", function() {
            expect( $dd.is(':focus') ).toBe(true);
            expect( $date2.parent().is('.focus') ).toBe(true);
        });

        runs(function() {
            $dd.val('2006-06-16');
            $dd.trigger('paste');
        });

        waits(50);

        it("paste event in DD field triggered setting of date", function() {
            expect( widget_content('#date2') ).toBe('16/06/2006');
        });

        it("and revealed errorbox element due to max_year", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Year must not be after 1999');
        });

        runs(function() {
            $dd.val('1996-06-16');
            $dd.trigger('paste');
        });

        waits(50);

        it("paste event in DD field triggered setting of date", function() {
            expect( widget_content('#date2') ).toBe('16/06/1996');
        });

        it("and hid errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

    });

    describe("Calling the 'destroy' method", function() {

        runs(function() {
            $date2.datetextentry('destroy');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'visible';
        }, "target input element to be visible", 50);

        it("has revealed the original text input element", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

        it("has removed the DD, MM, YYYY input elements", function() {
            expect( $('.p2 input').length ).toBe(1);
        });

        it("has removed the extra span elements", function() {
            expect( $('.p2 span').length ).toBe(0);
        });

        it("has detached the DateTextEntry object from the original element", function() {
            var obj = $date2.data('datetextentry');
            expect( typeof obj ).toBe('undefined');
        });

        it("leaves text input populated with last known good date", function() {
            expect( $date2.val() ).toBe('1996-06-16');
        });

    });

    describe("Re-invoking the plugin", function() {

        runs(function() {
            $date2.datetextentry({});
            $dd   = $( $date2.next().find('input')[0] );
            $mm   = $( $date2.next().find('input')[1] );
            $yyyy = $( $date2.next().find('input')[2] );
            $errorbox = $date2.parent().find('.jq-dte-errorbox');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'hidden';
        }, "target input element to be hidden", 50);

        it("has hidden the original text input element again", function() {
            expect( visibility_check('#date2') ).toBe('hidden');
        });

        it("has attached a new DateTextEntry object to the original element", function() {
            var obj = $date2.data('datetextentry');
            expect( typeof obj ).toBe('object');
        });

        it("initialised sub-fields to expected date components", function() {
            expect( widget_content('#date2') ).toBe('18/03/1975');
        });

        runs(function() {
            $dd.val('2006-06-16');
            $dd.trigger('paste');
        });

        waits(50);

        it("paste event in DD field triggered setting of date", function() {
            expect( widget_content('#date2') ).toBe('16/06/2006');
        });

        it("without triggering error due to previous max_date", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

    });

    describe("Final clean-up", function() {

        runs(function() {
            $date2.datetextentry('destroy');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'visible';
        }, "target input element to be visible", 50);

        it("has revealed the original text input element", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

        it("has removed the DD, MM, YYYY input elements", function() {
            expect( $('.p2 input').length ).toBe(1);
        });

        it("has removed the extra span elements", function() {
            expect( $('.p2 span').length ).toBe(0);
        });

        it("has detached the DateTextEntry object from the original element", function() {
            var obj = $date2.data('datetextentry');
            expect( typeof obj ).toBe('undefined');
        });

        runs(function() {
            $date2.val('');
        });

    });

})(jQuery);

