var gulp       = require( 'gulp' );
var compass    = require( 'gulp-compass' );
var uglify     = require( 'gulp-uglify' );
var rename     = require( 'gulp-rename' );
var cleancss   = require("gulp-clean-css")
var typescript = require("gulp-typescript");

// output
var outputDIR = './_assets/';

// sass src
var sassSRC = "./_assets/sass/style.scss";


// compass/sass task
function sassTask () {
  return gulp
    .src(sassSRC)
    .pipe(
      compass({
        sass: "./_assets/sass",
        image: "./_assets/images",
        fonts: "./_assets/fonts",
        js: "./_assets/js",
        style: "expanded",
        sourcemap: true,
        css: "./_assets/css"
        // require: ["susy", "breakpoint"]
      })
    )
    .pipe(gulp.dest(outputDIR + "css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleancss())
    .pipe(gulp.dest(outputDIR + "css"))
}

function tsTask () {
	return gulp
    .src("_assets/ts/app.ts")
    .pipe(typescript())
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest(outputDIR + "js"))
}

function watchTask () {
	gulp.watch("./_assets/ts/app.ts", gulp.series(tsTask))
  gulp.watch("./_assets/sass/**/*.scss", gulp.series(sassTask))
}

exports.default = gulp.series(sassTask, tsTask, watchTask)