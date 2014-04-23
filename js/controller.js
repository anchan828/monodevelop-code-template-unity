/**
* Created by keigo on 2014/04/22.
*/
/// <reference path="jquery.d.ts" />
/// <reference path="bootstrap.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="jszip.d.ts" />
'use strict';
var app = angular.module('snippets-viewer', []);

app.controller('snippetsCtrl', function ($scope, $http) {
    $scope.snippets = [];
    $scope.xmlTemplate;
    $http.get('methods.json').success(function (json) {
        $scope.snippets = json.methods;

        setTimeout(function () {
            $('body').scrollspy({ target: '.sidenav' });
        }, 10);
    });

    $http.get('xmlTemplate.html').success(function (text) {
        $scope.xmlTemplate = text + "";
    });

    $scope.convertType = function (lang, type) {
        var result = type;

        if (!result) {
            return result;
        }

        var isArray = type.lastIndexOf("[]") != -1;

        if (isArray) {
            result = type.substring(0, type.length - 2);
        }

        switch (result) {
            case 'bool':
                result = 'boolean';
                break;
        }

        if (lang === 'js') {
            switch (result) {
                case 'void':
                    result = 'function';
                    break;
                case 'string':
                    result = 'String';
                    break;
            }
        }

        if (isArray) {
            result += '[]';
        }

        return result;
    };

    $scope.download = function () {
        var elements = $('.snippet');
        var xmlBody = "";
        elements.each(function (i, e) {
            var _xml = $(e).find("#" + $(e).attr('id') + "-xml pre").text();
            if (!$scope.snippets[i].isStatic) {
                _xml = _xml.replace(/static /g, "");
            }
            _xml = _xml.replace(/, \)/g, ")");
            xmlBody += _xml + "\n";

            if (i == elements.length - 1) {
                var xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
                xml += "<CodeTemplates version=\"3.0\">\n";
                xml += xmlBody;
                xml += "</CodeTemplates>";
                console.log(xml);
                $("#temp-download").attr({ href: window.URL.createObjectURL(new Blob([xml])) });
            }
        });
    };
});
//# sourceMappingURL=controller.js.map
