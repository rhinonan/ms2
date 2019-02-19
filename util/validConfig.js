module.exports = function (configs) {

    // todo: 优化参数校验以及错误提示
    configs.forEach(config => {
        if (!config.target) {
            throw Error('target field is required!');
        }
    });
}