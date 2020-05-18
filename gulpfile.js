var gulp = require('gulp');

var urbitrc = require('./.urbitrc');

gulp.task('urbit-copy', function () {
  let ret = gulp.src('urb/**/*');

  urbitrc.URBIT_PIERS.forEach(function(pier) {
    ret = ret.pipe(gulp.dest(pier));
  });

  return ret;
});

gulp.task('default', gulp.series('urbit-copy'));
