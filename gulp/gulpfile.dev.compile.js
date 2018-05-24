const debug = require('debug')('com:dev-compile');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const tasks = require('./tasks');

const dist = 'dev';
let compileStream = null;

gulp.task('clean', () => tasks.clean(dist));

gulp.task('compile', () => tasks.compile(dist, debug));

gulp.task('cssCompile', () => tasks.cssCompile(dist, debug));

gulp.task('default', () => {
    runSequence('clean', ['compile', 'cssCompile']);
});
