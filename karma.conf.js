// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-mocha-reporter'),
            require('karma-remap-istanbul'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),      
            require('karma-htmlfile-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        files: [
            {pattern: './src/test.ts', watched: false}
        ],
        preprocessors: {
            './src/test.ts': ['@angular/cli']
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        client:{
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        remapIstanbulReporter: {
            reports: {
                html: 'coverage',
                lcovonly: './coverage/coverage.lcov'
            }
        },
        angularCli: {
            config: './.angular-cli.json',
            environment: 'dev'
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
            ? ['mocha', 'karma-remap-istanbul','progress', 'html']
            : ['mocha','progress', 'html'],
        htmlReporter: {
            outputFile: 'coverage/tests/patientManagement.html',
                    
            // Optional
            pageTitle: 'Patient Management',
            subPageTitle: 'Patient Management Unit Test cases',
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: true
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
