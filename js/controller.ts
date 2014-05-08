/**
 * Created by keigo on 2014/04/22.
 */
/// <reference path="jquery.d.ts" />
/// <reference path="bootstrap.d.ts" />
/// <reference path="angular.d.ts" />
'use strict';

var app = angular.module('snippets-viewer', []);


app.controller('snippetsCtrl', function ($scope, $http) {
    $scope.snippets = [];
    $scope.xmlTemplate;
    $http.get('methods.json').success(function (json) {
        $scope.snippets = json.methods;

        setTimeout(function () {
            $('body').scrollspy({ target: '.sidenav' })
        }, 10)
    });

    var uuid = function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    };

    $scope.convertType = function (lang:string, type:string) {

        var result:string = type;

        if (!result) {
            return result;
        }

        var isArray:boolean = type.lastIndexOf("[]") != -1;

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
    }

    $scope.monodevelopDownload = function () {

        var elements = $('.snippet');
        var xmlBody = "";
        elements.each(function (i, e) {
            var _xml = $(e).find("#" + $(e).attr('id') + "-monodevelop pre").text();
            if (!$scope.snippets[i].isStatic) {
                _xml = _xml.replace(/static /g, "")
            }
            _xml = _xml.replace(/, \)/g, ")");
            xmlBody += _xml + "\n";

            if (i == elements.length - 1) {
                var xml:string = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
                xml += "<CodeTemplates version=\"3.0\">\n";
                xml += xmlBody;
                xml += "</CodeTemplates>";
                console.log(xml)
                $("#monodevelop-download").attr({href: window.URL.createObjectURL(new Blob([xml]))});
            }
        })
    };
    $scope.vsDownload = function () {

        var elements = $('.snippet');
        var xmlBody = "";
        elements.each(function (i, e) {
            var _xml = $(e).find("#" + $(e).attr('id') + "-visualcsharp pre").text();
            if (!$scope.snippets[i].isStatic) {
                _xml = _xml.replace(/static /g, "")
            }
            _xml = _xml.replace(/, \)/g, ")");
            xmlBody += _xml + "\n";

            if (i == elements.length - 1) {
                var xml:string = "<CodeSnippets xmlns=\"http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet\">\n";
                xml += xmlBody;
                xml += "</CodeSnippets>";
                console.log(xml)
                $("#vs-download").attr({href: window.URL.createObjectURL(new Blob([xml]))});
            }
        })
    }
    $scope.reDownload = function () {

        var elements = $('.snippet');
        var xmlBody = "";
        elements.each(function (i, e) {
            var _xml = $(e).find("#" + $(e).attr('id') + "-resharper pre").text();
            if (!$scope.snippets[i].isStatic) {
                _xml = _xml.replace(/static /g, "")
            }
            _xml = _xml.replace(/, \)/g, ")");
            xmlBody += _xml + "\n";

            if (i == elements.length - 1) {
                var xml:string = "<wpf:ResourceDictionary xml:space=\"preserve\" xmlns:x=\"http://schemas.microsoft.com/winfx/2006/xaml\" xmlns:s=\"clr-namespace:System;assembly=mscorlib\" xmlns:ss=\"urn:shemas-jetbrains-com:settings-storage-xaml\" xmlns:wpf=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\">\n";
                xml += xmlBody;
                xml += "</wpf:ResourceDictionary>";
                console.log(xml)
                $("#re-download").attr({href: window.URL.createObjectURL(new Blob([xml]))});
            }
        })
    }
});
interface Window { URL:any;
}