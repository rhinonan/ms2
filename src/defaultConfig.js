module.exports = {
  model: 'proxy',
  target: null,
  port: 3000,
  https: false,
  changeOrigin: true,
  secure: false,
  cacheMock: false,
  mockDataPath: './__mock__',
  mockExtensions: ['json', 'html', 'xml'],
  staticPath: null,

  handleMapPath(req) {
    // 剔除query
    const url = req.url.split('?')[0];

    // 整理出相对路径以及文件名
    const paths = url.split('/').filter(item => item);
    const fileName = `${paths.pop()}.${req.method}`;

    return {
      relativePath: `./${paths.join('/')}`,
      fileName,
    };
  },
};
