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

        it("rejects call to non-existant 'set_color' method", function() {
            var try_set_color = function() {
                return $date2.datetextentry('set_color', 'red');
            };
            expect( try_set_color ).toThrow("jquery.datetextentry has no 'set_color' method");
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

    describe("Re-invoking the plugin with no initial value", function() {

        runs(function() {
            $date2.datetextentry('destroy');
            $date2.val('').attr('value', '');
            $date2.datetextentry({});
            $dd   = $( $date2.next().find('input')[0] );
            $mm   = $( $date2.next().find('input')[1] );
            $yyyy = $( $date2.next().find('input')[2] );
            $errorbox = $date2.parent().find('.jq-dte-errorbox');
        });

        it("initialised sub-fields to DD/MM/YYYY hint values", function() {
            expect( widget_content('#date2') ).toBe('DD/MM/YYYY');
        });

        it("did not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $dd.val('3');
            add_char($dd, '3');
        });
        waits(10);

        it("accepts injected '33' into DD field", function() {
            expect( $dd.val() ).toBe('33');
        });

        it("which triggers error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Day must be 1-31');
        });

        runs(function() {
            $dd.val('2');
            add_char($dd, '9');
        });
        waits(10);

        it("accepts injected '29' into DD field", function() {
            expect( $dd.val() ).toBe('29');
        });

        it("which clears error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $mm.val('0');
            add_char($mm, '2');
        });
        waits(10);

        it("accepts injected '02' into MM field", function() {
            expect( $mm.val() ).toBe('02');
        });

        it("which does not trigger error yet (because year is blank)", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $yyyy.val('197');
            add_char($yyyy, '7');
        });
        waits(10);

        it("accepts injected '1977' into YYYY field", function() {
            expect( $yyyy.val() ).toBe('1977');
        });

        it("which does  trigger an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Only 28 days in February 1977');
            expect( $date2.val() ).toBe('');
        });

        runs(function() {
            $dd.val('2');
            add_char($dd, '8');
        });
        waits(10);

        it("accepts injected '28' into DD field", function() {
            expect( $dd.val() ).toBe('28');
        });

        it("which clears error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        it("and sets a value in the underlying input element", function() {
            expect( $date2.val() ).toBe('1977-02-28');
        });

        it("accepts the method call: clear()", function() {
            $mm.blur();
            $date2.datetextentry('clear');
            expect( widget_content('#date2') ).toBe('DD/MM/YYYY');
            expect( $date2.val() ).toBe('');
        });

        runs(function() {
            $dd.val('2');
            add_char($dd, '9');
        });
        waits(10);

        it("accepts injected '29' into DD field", function() {
            expect( $dd.val() ).toBe('29');
        });

        it("which does not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
            expect( $errorbox.text() ).toBe('');
        });

        runs(function() {
            $mm.val('0');
            add_char($mm, '2');
        });
        waits(10);

        it("accepts injected '02' into MM field", function() {
            expect( $mm.val() ).toBe('02');
            expect( $errorbox.text() ).toBe('');
        });

        it("which still does not trigger error (because year is blank)", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $yyyy.val('197');
            add_char($yyyy, '6');
        });
        waits(10);

        it("accepts injected '1976' into YYYY field", function() {
            expect( $yyyy.val() ).toBe('1976');
        });

        it("and validates successfully", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
            expect( $date2.val() ).toBe('1976-02-29');
        });

    });

    describe("Re-invoking the plugin to test on_blur callback", function() {
        var on_blur_error = '';

        runs(function() {
            $date2.datetextentry('destroy');
            $date2.val('').attr('value', '');
            $date2.datetextentry({
                on_blur: function() {
                    on_blur_error = this.widget_error_text();
                }
            });
            $dd   = $( $date2.next().find('input')[0] );
            $mm   = $( $date2.next().find('input')[1] );
            $yyyy = $( $date2.next().find('input')[2] );
            $errorbox = $date2.parent().find('.jq-dte-errorbox');
        });

        it("initialised sub-fields to DD/MM/YYYY hint values", function() {
            expect( widget_content('#date2') ).toBe('DD/MM/YYYY');
        });

        it("did not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
            expect( on_blur_error ).toBe('');
        });

        runs(function() {
            $dd.val('3');
            add_char($dd, '3');
        });
        waits(10);

        it("accepts injected '33' into DD field", function() {
            expect( $dd.val() ).toBe('33');
        });

        it("which triggers error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Day must be 1-31');
        });

        it("but does not propagate through callback yet", function() {
            expect( on_blur_error ).toBe('');
        });

        runs(function() {
            $dd.blur();  // would happen automatically in real life
            $('#text1').focus();
        });
        waits(20);

        it("error is propagated after focus lost", function() {
            expect( on_blur_error ).toBe('Day must be 1-31');
        });

    });

    describe("Re-invoking the plugin to test set_readonly callback", function() {
        var on_blur_error = '';

        runs(function() {
            $date2.datetextentry('destroy');
            $date2.val('').attr('value', '1900-11-22');
            $date2.datetextentry({
                on_blur: function() {
                    on_blur_error = this.widget_error_text();
                }
            });
            $dd   = $( $date2.next().find('input')[0] );
            $mm   = $( $date2.next().find('input')[1] );
            $yyyy = $( $date2.next().find('input')[2] );
            $errorbox = $date2.parent().find('.jq-dte-errorbox');
        });

        it("initialised sub-fields to expected values", function() {
            expect( widget_content('#date2') ).toBe('22/11/1900');
        });

        it("did not make subfields readonly", function() {
            expect( $dd.prop('readonly') ).toBe(false);
            expect( $mm.prop('readonly') ).toBe(false);
            expect( $yyyy.prop('readonly') ).toBe(false);
        });

        it("accepts the method call: set_readonly(true)", function() {
            var try_set_readonly = function() {
                return $date2.datetextentry('set_readonly', true);
            };
            expect( try_set_readonly ).not.toThrow();
        });

        it("which did make subfields readonly", function() {
            expect( $dd.prop('readonly') ).toBe(true);
            expect( $mm.prop('readonly') ).toBe(true);
            expect( $yyyy.prop('readonly') ).toBe(true);
        });

        it("and did not mess with the underlying ISO date value", function() {
            expect( $date2.val() ).toBe('1900-11-22');
        });

        it("and added the 'readonly' class to the wrapper element", function() {
            expect( $date2.closest('.jq-dte').is('.readonly') ).toBe(true);
        });

        it("accepts the method call: set_readonly(false)", function() {
            var try_set_readonly = function() {
                return $date2.datetextentry('set_readonly', false);
            };
            expect( try_set_readonly ).not.toThrow();
        });

        it("which did make subfields readonly", function() {
            expect( $dd.prop('readonly') ).toBe(false);
            expect( $mm.prop('readonly') ).toBe(false);
            expect( $yyyy.prop('readonly') ).toBe(false);
        });

        it("and did not mess with the underlying ISO date value", function() {
            expect( $date2.val() ).toBe('1900-11-22');
        });

        it("and removed the 'readonly' class from the wrapper element", function() {
            expect( $date2.closest('.jq-dte').is('.readonly') ).toBe(false);
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

