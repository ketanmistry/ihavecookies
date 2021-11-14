const {src, dest} = require("gulp");
const minify = require("gulp-minify");

function minifyjs() {

    return src('jquery.ihavecookies.js', {allowEmpty: true})
        .pipe(minify({
            noSource: true,
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(dest('./'))
}

exports.default = minifyjs;