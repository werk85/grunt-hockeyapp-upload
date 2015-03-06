# grunt-hockeyapp-upload

> Grunt plugin for uploading apps via the hockeyapp rest api.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hockeyapp-upload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hockeyapp-upload');
```

## The "hockeyapp" task

### Overview
In your project's Gruntfile, add a section named `hockeyapp_upload` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hockeyapp: {
    options: {
      token: 'MY_HOCKEYAPP_TOKEN'
    },
    ios: {
      options: {
        notify: true
      },
      file: 'app.ipa',
      mapping: 'app.dSYM.zip'
    },
    android: {
      file: 'app.apk',
      mapping: 'mapping.txt'
    }
  },
});
```

### Options

#### options.token
Type `String`
Required

Hockey App Token to authenticate yourself with the API.

#### options.downloadable
Type `Boolean`
Optional

Available values:
 * `true` to not allow users to download the version
 * `false` to make the version available for download

Download status (can only be set with full-access tokens)

#### options.notes
Type `String`
Optional

Release notes as Textile or Markdown

#### options.notesType
Type `String`
Optional

Available values:
 * `'textile'` for Textile
 * `'markdown'` for Markdown

Type of release notes

#### options.notify
Type `Boolean`
Optional

Available values:
 * `'testers'` for all testers
 * `'testers can install'` for all testers that can install this app
 * `'all'` notify all testers

Notify testers (can only be set with full-access tokens)

#### options.tags
Type `String` or `Array<String>`
Optional

Restrict download to comma-separated list of tags

#### options.teams
Type `String` or `Array<String>`
Optional

Restrict download to comma-separated list of team IDs

#### options.users
Type `String` or `Array<String>`
Optional

Restrict download to comma-separated list of user IDs.

#### options.mandatory
Type `String`
Optional

Available values:

 * `mandatory`
 * `not mandatory`

Set version as mandatory.

#### options.releaseType
Type `String`
Optional

Available values:

 * `aplpha`
 * `beta`
 * `store`
 * `enterprise`

Set the release type of the app.

#### options.private
Type `Boolean`
Default value `false`
Optional

Set to true to enable the private download page.

#### options.commitSha
Type `String`
Optional

Set to the git commit sha for this build.

#### options.buildServerUrl
Type `String`
Optional

Set to the URL of the build job on your build server


#### options.repositoryUrl
Type `String`
Optional

Set to your source repository.

### Target parameters

#### target.file
Type `String`
Required

File path of the ipa for iOS, .app.zip for OS X, or .apk file for Android.

#### target.mapping
Type `String`
Optional

Filepath of the .dSYM.zip file (iOS and OS X) or mapping.txt (Android); note that the extension has to be .dsym.zip (case-insensitive) for iOS and OS X and the file name has to be mapping.txt for Android.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
