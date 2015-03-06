/*
 * grunt-hockeyapp-upload
 * https://github.com/mwerk85/grunt-hockeyapp-upload
 *
 * Copyright (c) 2015 werk85
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

var _ = require('lodash');
var FormData = require('form-data');

var NOTES_TYPE = {
  'textile': 0,
  'markdown': 1
};
var NOTIFY = {
  'testers': 0,
  'testers can install': 1,
  'all': 2
};
var MANDATORY_TYPE = {
  'not mandatory': 0,
  'mandatory': 1
};
var RELEASE_TYPE = {
  beta: 0,
  store: 1,
  alpha: 2,
  enterprice: 3
};
var STATUS_TYPE = {
  true: 1,
  false: 2
};
var HOCKEY_APP_HOST = 'rink.hockeyapp.net';
var HOCKEY_APP_PATH = '/api/2/apps/upload';
var HOCKEY_APP_PORT = 443;

module.exports = function(grunt) {
  grunt.registerMultiTask('hockeyapp', 'Grunt plugin for uploading apps via the hockeyapp rest api.', function () {
    var done = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      buildServerUrl: null,
      commitSha: null,
      downloadable: true,
      mandatory: 'not mandatory',
      notes: null,
      notesType: 0,
      notify: 'testers',
      onDone: function (response) {
        grunt.log.debug(response);
      },
      private: false,
      releaseType: 0,
      repositoryUrl: null,
      tags: null,
      teams: null,
      token: null,
      users: null
    });

    var hasError = false;
    if (!this.data.file) {
      grunt.log.error('Missing required parameter: file');
      hasError = true;
    }

    if (!options.token) {
      grunt.log.error('Missing required option: token');
      hasError = true;
    }

    if (hasError) {
      return done(false);
    }

    var form = new FormData();

    if (options.buildServerUrl !== null) {
      form.append('build_server_url', options.buildServerUrl);
    }

    if (options.commitSha !== null) {
      form.append('commit_sha', options.commitSha);
    }

    if (options.downloadable !== null) {
      form.append('status', STATUS_TYPE[options.downloadable]);
    }

    form.append('mandatory', MANDATORY_TYPE[options.mandatory]);

    if (options.notes !== null) {
      form.append('notes', options.notes);
      form.append('notes_type', NOTES_TYPE[options.notesType]);
    }

    form.append('notify', NOTIFY[options.notify]);
    form.append('private', options.private);
    form.append('release_type', RELEASE_TYPE[options.releaseType]);

    if (options.repositoryUrl !== null) {
      form.append('repository_url', options.repositoryUrl);
    }

    formAppendArray(form, options.tags, 'tags');
    formAppendArray(form, options.teams, 'teams');
    formAppendArray(form, options.users, 'users');

    // Append required fiels
    form.append('ipa', fs.createReadStream(this.data.file));
    if (this.data.mapping) {
      form.append('dsym', fs.createReadStream(this.data.mapping));
    }

    form.submit({
      host: HOCKEY_APP_HOST,
      path: HOCKEY_APP_PATH,
      port: HOCKEY_APP_PORT,
      headers: { 'X-HockeyAppToken': options.token }
    }, function (err, res) {
      if (err) {
        grunt.log.error(err);
        return done(false);
      }
      if (res.statusCode !== 200) {
        grunt.log.error('Uploading failed with status ' + res.statusCode);
        res.on('data', function (chunk) {
          grunt.log.error(chunk);
        });
        return done(false);
      }
      grunt.log.ok('Uploaded ' + options.file.cyan + ' to hockeyapp');
      res.on('data', function (buffer) {
        var jsonString = String.fromCharCode.apply(null, new Uint16Array(buffer));
        var jsonObject = JSON.parse(jsonString);
        options.onDone(jsonObject);
        done();
      });
    })
  });
};

function formAppendArray(form, field, array) {
    if (_.isArray(array)) {
      array = array.join(',');
    }
    if (array !== null) {
      form.append(field, array);
    }
}
