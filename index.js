var Metalsmith  = require('metalsmith');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var layouts = require('metalsmith-layouts');
var sass = require('metalsmith-sass');
var markdown = require('metalsmith-markdown');
var drafts = require('metalsmith-drafts');

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Pocket Pip',
      description: 'Live better with Pip in your Pocket',
      generator: 'Metalsmith',
      url: 'http://pocketpip.com/'
    }
  })

  .source('./src')
  .destination('./build')
  .clean(true) // rebuild everything

  .use(sass({
    outputDir: 'assets/',   // This changes the output dir to 'build/assets/'
    sourceMap: true
  }))

  .use(drafts())
  .use(markdown())

  .use(layouts({
    engine: 'handlebars'
  }))

  .use(serve())

  .use(
    watch({
      paths: {
        '${source}/**/*': true,
        'layouts/**/*': true,
      }
    })
  )

  .build(function(err, files) {
    if (err) { throw err; }
  });
