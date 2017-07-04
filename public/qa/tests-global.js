/**
 * Created by 1t8l7j2 on 2017/7/4.
 */
/**
 * mocha 页面测试代码
 */
suite('Global Tests',function () {
    test('page has a valid title',function () {
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO');
    })
});
