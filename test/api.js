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
            $date2.datetextentry();
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

        it("and hid errorbox element", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

    });

})(jQuery);

