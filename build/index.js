var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path');

module.exports = {
  register: function(config) {
    fs.readdirSync('./build/tasks/').forEach(function(task) {
      require('./tasks/' + task).default(config);
    });

    gulp.task('process-assets', gulp.parallel('sass')); // build fonts, compile css etc.

    gulp.task('verify', gulp.series('eslint'));
    // gulp.task('test', '');
    gulp.task('build', gulp.parallel('process-assets', gulp.series('transpile', 'html')));
    // gulp.task('deploy', '');

    gulp.task('default', gulp.series('clean', 'verify', 'build'));
  }
};
