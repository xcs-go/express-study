/**
 * Created by 1t8l7j2 on 2017/7/4.
 */
suite('"About" Page Tests',function () {
    test('page should contain link to contact page',function () {
        assert($('a[href="/contact"]').length);
    });
});