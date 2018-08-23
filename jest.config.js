module.exports = {
  testURL: 'http://localhost/',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/shallowEqual.js',
  ],
};
