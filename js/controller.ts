/**
 * Created by keigo on 2014/04/22.
 */
/// <reference path="jquery.d.ts" />
/// <reference path="bootstrap.d.ts" />
/// <reference path="angular.d.ts" />
'use strict';

var app = angular.module('snippets-viewer', []);


app.controller('snippetsCtrl', function ($scope, $filter, $http) {
    $scope.snippets = [];
    $scope.xmlTemplate;

    var uuid = function () {
        var time = new Date().getTime(), sixteen = 16;
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (match) {
            var remainder = (time + sixteen * Math.random()) % sixteen | 0;
            time = Math.floor(time / sixteen);
            return (match == "x" ? remainder : remainder & 7 | 8).toString(sixteen);
        });
    };


    $http.get('methods.json').success(function (json) {

        for (var i = 0; i < json.methods.length; i++) {
            json.methods[i]["guid"] = uuid().toUpperCase();
        }

        $scope.snippets = json.methods;

        setTimeout(function () {
            $('body').scrollspy({target: '.sidenav'})
        }, 10)
    });


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

    $scope.stDownload = function () {

        var elements = $('.snippet');
        var json = JSON.parse("{}");
        json.completions = []
        json.scope = "source.cs";
        console.log(json);
        elements.each(function (i, e) {
            var _json = $(e).find("#" + $(e).attr('id') + "-sublime pre").text();
            if (!$scope.snippets[i].isStatic) {
                _json = _json.replace(/static /g, "")
            }
            _json = _json.replace(/, \)/g, ")");

            json['completions'].push(JSON.parse(_json))

            if (i == elements.length - 1) {
                console.log(json)
                $("#st-download").attr({href: window.URL.createObjectURL(new Blob([JSON.stringify(json)]))});
            }
        })
    }
});
interface Window { URL:any;
}