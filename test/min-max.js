(function($) {
    "use strict";

    var initial_width, $date2, $dd, $mm, $yyyy, $tooltip, $errorbox;

    describe("'#date2' initialised with min_year/max_year", function() {

        it("is visible before init", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

        runs(function() {
            $date2 = $('#date2');
            $date2.datetextentry({
                min_year: '1995',
                max_year: 2005,
            });
            $dd   = $( $date2.next().find('input')[0] );
            $mm   = $( $date2.next().find('input')[1] );
            $yyyy = $( $date2.next().find('input')[2] );
            $errorbox = $date2.parent().find('.jq-dte-errorbox');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'hidden';
        }, "target input element to be hidden", 50);

        runs(function() {
            $dd.val('2003-02-01');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '2003-02-01'", function() {
            expect( widget_content('#date2') ).toBe('01/02/2003');
        });

        it("and does not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $dd.val('2008-07-06');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '2008-07-06'", function() {
            expect( widget_content('#date2') ).toBe('06/07/2008');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Year must not be after 2005');
        });

        it("set 'error' class on YYYY sub-field", function() {
            expect( $yyyy.is('.error') ).toBe(true);
        });

        runs(function() {
            $dd.val('1994-03-02');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1994-03-02'", function() {
            expect( widget_content('#date2') ).toBe('02/03/1994');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Year must not be before 1995');
        });

        it("set 'error' class on YYYY sub-field", function() {
            expect( $yyyy.is('.error') ).toBe(true);
        });

        runs(function() {
            $dd.val('1995-04-03');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1995-04-03'", function() {
            expect( widget_content('#date2') ).toBe('03/04/1995');
        });

        it("clears error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        it("clears 'error' class on YYYY sub-field", function() {
            expect( $yyyy.is('.error') ).toBe(false);
        });

        runs(function() {
            $date2.datetextentry('destroy');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'visible';
        }, "target input element to be visible", 50);

        it("returned to original state with 'destroy'", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

    });

    describe("'#date2' initialised with min_date/max_date strings", function() {

        it("is visible before init", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

        runs(function() {
            $date2 = $('#date2');
            $date2.datetextentry({
                min_date: '1992-12-25',
                max_date: '1993-01-18',
            });
            $dd   = $( $date2.next().find('input')[0] );
            $mm   = $( $date2.next().find('input')[1] );
            $yyyy = $( $date2.next().find('input')[2] );
            $errorbox = $date2.parent().find('.jq-dte-errorbox');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'hidden';
        }, "target input element to be hidden", 50);

        runs(function() {
            $dd.val('1993-01-01');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1993-01-01'", function() {
            expect( widget_content('#date2') ).toBe('01/01/1993');
        });

        it("and does not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $dd.val('1993-01-19');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1993-01-19'", function() {
            expect( widget_content('#date2') ).toBe('19/01/1993');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Date must not be later than 18/01/1993');
        });

        it("'error' class is not set on any sub-fields", function() {
            expect( $dd.is('.error') ).toBe(false);
            expect( $mm.is('.error') ).toBe(false);
            expect( $yyyy.is('.error') ).toBe(false);
        });

        runs(function() {
            $dd.val('1993-01-18');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1993-01-18'", function() {
            expect( widget_content('#date2') ).toBe('18/01/1993');
        });

        it("and does not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $dd.val('1992-12-24');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1992-12-24'", function() {
            expect( widget_content('#date2') ).toBe('24/12/1992');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Date must not be earlier than 25/12/1992');
        });

        it("'error' class is not set on any sub-fields", function() {
            expect( $dd.is('.error') ).toBe(false);
            expect( $mm.is('.error') ).toBe(false);
            expect( $yyyy.is('.error') ).toBe(false);
        });

        runs(function() {
            $dd.val('1992-12-25');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1992-12-25'", function() {
            expect( widget_content('#date2') ).toBe('25/12/1992');
        });

        it("and does not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $dd.val('1992-12-31');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1992-12-31'", function() {
            expect( widget_content('#date2') ).toBe('31/12/1992');
        });

        it("and does not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $date2.datetextentry('destroy');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'visible';
        }, "target input element to be visible", 50);

        it("returned to original state with 'destroy'", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

    });

    describe("'#date2' initialised with min_date/max_date functions returning date-objs", function() {

        it("is visible before init", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

        runs(function() {
            $date2 = $('#date2');
            $date2.datetextentry({
                min_date: function() {
                    return {
                        day: 6,
                        month: 6,
                        year: 2002
                    };
                },
                max_date: function() {
                    return {
                        day: 5,
                        month: 6,
                        year: 2003
                    };
                }
            });
            $dd   = $( $date2.next().find('input')[0] );
            $mm   = $( $date2.next().find('input')[1] );
            $yyyy = $( $date2.next().find('input')[2] );
            $errorbox = $date2.parent().find('.jq-dte-errorbox');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'hidden';
        }, "target input element to be hidden", 50);
        runs(function() {
            $dd.val('1993-01-01');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1993-01-01'", function() {
            expect( widget_content('#date2') ).toBe('01/01/1993');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Date must not be earlier than 06/06/2002');
        });

        it("'error' class is not set on any sub-fields", function() {
            expect( $dd.is('.error') ).toBe(false);
            expect( $mm.is('.error') ).toBe(false);
            expect( $yyyy.is('.error') ).toBe(false);
        });

        runs(function() {
            $dd.val('2002-06-04');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '2002-06-04'", function() {
            expect( widget_content('#date2') ).toBe('04/06/2002');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Date must not be earlier than 06/06/2002');
        });

        it("'error' class is not set on any sub-fields", function() {
            expect( $dd.is('.error') ).toBe(false);
            expect( $mm.is('.error') ).toBe(false);
            expect( $yyyy.is('.error') ).toBe(false);
        });


        runs(function() {
            $dd.val('2003-06-06');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '2003-06-06'", function() {
            expect( widget_content('#date2') ).toBe('06/06/2003');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Date must not be later than 05/06/2003');
        });

        it("'error' class is not set on any sub-fields", function() {
            expect( $dd.is('.error') ).toBe(false);
            expect( $mm.is('.error') ).toBe(false);
            expect( $yyyy.is('.error') ).toBe(false);
        });

        runs(function() {
            $dd.val('2003-01-18');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '2003-01-18'", function() {
            expect( widget_content('#date2') ).toBe('18/01/2003');
        });

        it("and does not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $date2.datetextentry('destroy');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'visible';
        }, "target input element to be visible", 50);

        it("returned to original state with 'destroy'", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

    });

    describe("'#date2' initialised with min_date/max_date functions returning strings", function() {

        it("is visible before init", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

        runs(function() {
            $date2 = $('#date2');
            $date2.datetextentry({
                min_date: function() {
                    return "2002-06-06";
                },
                max_date: function() {
                    return "2003-06-05";
                }
            });
            $dd   = $( $date2.next().find('input')[0] );
            $mm   = $( $date2.next().find('input')[1] );
            $yyyy = $( $date2.next().find('input')[2] );
            $errorbox = $date2.parent().find('.jq-dte-errorbox');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'hidden';
        }, "target input element to be hidden", 50);
        runs(function() {
            $dd.val('1993-01-01');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '1993-01-01'", function() {
            expect( widget_content('#date2') ).toBe('01/01/1993');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Date must not be earlier than 06/06/2002');
        });

        it("'error' class is not set on any sub-fields", function() {
            expect( $dd.is('.error') ).toBe(false);
            expect( $mm.is('.error') ).toBe(false);
            expect( $yyyy.is('.error') ).toBe(false);
        });

        runs(function() {
            $dd.val('2002-06-04');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '2002-06-04'", function() {
            expect( widget_content('#date2') ).toBe('04/06/2002');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Date must not be earlier than 06/06/2002');
        });

        it("'error' class is not set on any sub-fields", function() {
            expect( $dd.is('.error') ).toBe(false);
            expect( $mm.is('.error') ).toBe(false);
            expect( $yyyy.is('.error') ).toBe(false);
        });


        runs(function() {
            $dd.val('2003-06-06');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '2003-06-06'", function() {
            expect( widget_content('#date2') ).toBe('06/06/2003');
        });

        it("triggers an error", function() {
            expect( visibility_check($errorbox) ).toBe('visible');
            expect( $errorbox.text() ).toBe('Date must not be later than 05/06/2003');
        });

        it("'error' class is not set on any sub-fields", function() {
            expect( $dd.is('.error') ).toBe(false);
            expect( $mm.is('.error') ).toBe(false);
            expect( $yyyy.is('.error') ).toBe(false);
        });

        runs(function() {
            $dd.val('2003-01-18');
            $dd.trigger('paste');
        });

        waits(50);

        it("accepts pasted value '2003-01-18'", function() {
            expect( widget_content('#date2') ).toBe('18/01/2003');
        });

        it("and does not trigger error", function() {
            expect( visibility_check($errorbox) ).toBe('hidden');
        });

        runs(function() {
            $date2.datetextentry('destroy');
        });

        waitsFor(function() {
            return visibility_check('#date2') === 'visible';
        }, "target input element to be visible", 50);

        it("returned to original state with 'destroy'", function() {
            expect( visibility_check('#date2') ).toBe('visible');
        });

    });

})(jQuery);

