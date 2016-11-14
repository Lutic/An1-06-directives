(function() {
    "use strict";

    angular.module("app")
        .directive("unorderedList1", unorderedList1)
        .directive("unorderedList2", unorderedList2)
        .directive("unorderedList3", unorderedList3)
        .directive("unorderedList4", unorderedList4)
        .directive("unorderedList5", unorderedList5)
        .directive("unorderedList6", unorderedList6)
        .directive("unorderedList7", unorderedList7)
        .directive("unorderedList8", unorderedList8)
        .directive("unorderedList9", unorderedList9)
        .directive("unorderedList10", unorderedList10)
        .directive("unorderedList11", unorderedList11)
        .directive("unorderedList12", unorderedList12)
        .directive("unorderedListAttrs", unorderedListAttrs)
        .directive("unorderedListScope", unorderedListScope)
        .directive("scopeDemoFalse", scopeDemoFalse)
        .directive("scopeDemoTrue", scopeDemoTrue)
        .directive("component", component)
        .directive("decor1", decor1)
        .directive("decor2", decor2)
        .directive("scopeDemoIsolated1", scopeDemoIsolated1)
        .directive("scopeDemoIsolated2", scopeDemoIsolated2)
        .directive("scopeDemoIsolated3", scopeDemoIsolated3)
        .directive("scopeDemoIsolated4", scopeDemoIsolated4)
    ;

    function unorderedList1() {
        return function(scope) {
            let data = scope.products;

            angular.forEach(data, (dataItem) => {
                console.log(`Item: ${dataItem.name}`);
        });
        };
    }

    function unorderedList2() {
        return {
            link: function(scope) {
                let data = scope.products;

                angular.forEach(data, (dataItem) => {
                    console.log(`Item: ${dataItem.name}`);
            });
            }
        };
    }

    function unorderedList3() {
        return {
            link: function(scope, elem, attrs) {
                let data = scope[attrs["unorderedList3"]],
                  propertyName = attrs["listProperty"];

                angular.forEach(data, (dataItem) => {
                    // console.log(`Item: ${dataItem[propertyName]}`);
                    console.log(`Item: ${scope.$eval(propertyName, dataItem)}`);
            });
            }
        };
    }

    function unorderedList4() {
        return {
            link: function(scope, elem, attrs) {
                let data = scope[attrs["unorderedList4"]],
                  propertyName = attrs["listProperty"];

                let listElem = angular.element("<ul>");

                angular.forEach(data, (dataItem) => {
                    listElem.append( angular.element("<li>")
                  .text(scope.$eval(propertyName, dataItem)) );
            });

                elem.append(listElem);
            }
        };
    }

    function unorderedList5() {
        return {
            link: function(scope, elem, attrs) {
                let data = scope[attrs["unorderedList5"]],
                  propertyName = attrs["listProperty"];

                let listElem = angular.element("<ul>");

                angular.forEach(data, (dataItem) => {
                    let itemElem = angular.element("<li>");
                listElem.append(itemElem);

                /*let watcherFn = function(watchScope) {
                 return watchScope.$eval(propertyName, dataItem);
                 };

                 scope.$watch(watcherFn, (newVal, oldVal) => {
                 itemElem.text(newVal);
                 });*/

                let watcherFn = function(watchScope) {
                    return dataItem;
                };

                scope.$watchCollection(watcherFn, (newVal, oldVal) => {
                    itemElem.text( scope.$eval(propertyName, newVal) );
            });

            });

                elem.append(listElem);
            }
        };
    }

    function unorderedListAttrs() {
        return {
            link: function(scope, elem, attrs) {
                let data = scope[attrs["unorderedListAttrs"]];

                attrs.$observe("listProperty", (newVal, oldVal) => {
                    elem.html("");

                let propertyName = newVal;

                let listElem = angular.element("<ul>");

                angular.forEach(data, (dataItem) => {
                    let itemElem = angular.element("<li>");
                listElem.append(itemElem);

                let watcherFn = function(watchScope) {
                    return dataItem;
                };

                scope.$watchCollection(watcherFn, (newVal, oldVal) => {
                    itemElem.text( scope.$eval(propertyName, newVal) );
            });

            });

                elem.append(listElem);

            });
            }
        };
    }

    function unorderedListScope() {
        return {
            scope: {
                unorderedListScope: "=",
                listProperty: "="
            },
            link: function(scope, elem, attrs) {
                let data = scope["unorderedListScope"];

                scope.$watch("listProperty", (newVal, oldVal) => {
                    elem.html("");

                let propertyName = newVal;

                let listElem = angular.element("<ul>");

                angular.forEach(data, (dataItem) => {
                    let itemElem = angular.element("<li>");
                listElem.append(itemElem);

                let watcherFn = function(watchScope) {
                    return dataItem;
                };

                scope.$watchCollection(watcherFn, (newVal, oldVal) => {
                    itemElem.text( scope.$eval(propertyName, newVal) );
            });

            });

                elem.append(listElem);

            });
            }
        };
    }

    function unorderedList6() {
        return {
            restrict: 'EACM',

            link: function(scope, elem, attrs) {
                let data = scope[attrs["unorderedList6"] || attrs["listSource"]],
                    propertyName = attrs["listProperty"] || "price | currency";

                let listElem = angular.element("<ul>");

                angular.forEach(data, (dataItem) => {
                    listElem.append( angular.element("<li>")
                    .text(scope.$eval(propertyName, dataItem)) );
            });

                console.log(elem, elem[0]);

                if (elem[0].nodeName === '#comment') {
                    elem.parent().append(listElem);
                } else {
                    elem.append(listElem);
                }
            }
        };
    }

    function unorderedList7() {
        return {
            restrict: 'A',

            link: function(scope, elem, attrs) {
                let markup = "<ul><li ng-repeat='item in data'>{{item.price | currency}}</li></ul>";
                scope.data = scope[attrs["unorderedList7"]];

                elem.append(markup);

            }
        };
    }

    function unorderedList8($compile) {
        return {
            restrict: 'A',

            link: function(scope, elem, attrs) {
                let markup = `<ul><li ng-repeat='item in data'>{{item.price | currency}}</li></ul>`;
                scope.data = scope[attrs["unorderedList8"]];

                elem.append($compile(markup)(scope));

            }
        };
    }

    function unorderedList9() {
        return {
            restrict: 'A',

            template: "<ul><li ng-repeat='item in data'>{{item.price | currency}}</li></ul>",

            link: function(scope, elem, attrs) {
                scope.data = scope[attrs["unorderedList9"]];
            }
        };
    }

    function unorderedList10() {
        return {
            restrict: 'A',

            template: function (tElem, tAttrs) {
                return angular.element( document.querySelector("#listTemplate").html() );
            },

            link: function(scope, elem, attrs) {
                scope.data = scope[attrs["unorderedList10"]];
            }
        };
    }

    function unorderedList11() {
        return {
            restrict: 'A',

            templateUrl: "templates/itemTemplate.html",

            link: function(scope, elem, attrs) {
                scope.data = scope[attrs["unorderedList11"]];
            }
        };
    }

    function unorderedList12() {
        return {
            restrict: 'A',

            templateUrl: function (tElem, tAttrs) {
                return tAttrs["template"] === "table"
                    ? "templates/tableTemplate.html"
                    : "templates/itemTemplate.html";
            },

            link: function(scope, elem, attrs) {
                scope.data = scope[attrs["unorderedList12"]];
            }
        };
    }

    function scopeDemoFalse () {
        return {
            restrict: 'A',
            scope: false, //controller scope
            templateUrl: "templates/scopeDemoFalseTemplate.html"
        };
    }

    function scopeDemoTrue () {
        return {
            restrict: 'A',
            scope: true, //directive scope
            templateUrl: "templates/scopeDemoFalseTemplate.html"
        };
    }

    function scopeDemoIsolated () {
        return {
            restrict: 'A',
            scope: { //isolated scope
            },
            templateUrl: "templates/userDataTemplate.html"
            // link: function (scope) {
            //     scope.user = {name: "Elnara"};
            //     console.log(scope.dataSource); // doesn`t find because it controller`s scope
            // }
        };
    }

    function component () {
        return {
            restrict: 'E',
            scope: {},
            link: function (scope) {
                scope.dataSource = "component";
                console.log("component");
                console.log(`dataSource = ${scope.dataSource}`);
            }
        };
    }

    function decor1 () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope) {
                console.log("decor1");
                console.log(`dataSource = ${scope.dataSource}`);
            }
        };
    }

    function decor2 () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope) {
                // scope.dataSource = "decor2"
                console.log("decor2");
                console.log(`dataSource = ${scope.dataSource}`);
            }
        };
    }

    function scopeDemoIsolated1 () {
        return {
            restrict: 'A',
            scope: {
                local: "@prop"
            },
            templateUrl: 'templates/scopeBindingsTemplate.html'
        };
    }

    function scopeDemoIsolated2 () {
        return {
            restrict: 'A',
            scope: {
                local: "=?prop"
            },
            templateUrl: 'templates/scopeBindingsTemplate.html'
        };
    }

    function scopeDemoIsolated3 () {
        return {
            restrict: 'A',
            scope: {
                local: "<prop"
            },
            // templateUrl: 'templates/scopeBindingsTemplate.html',
            template: `<p>
                        <strong>Data Value: </strong>
                        <input ng-model="local.name">
                       </p>`
        };
    }

    function scopeDemoIsolated4 () {
        return {
            restrict: 'A',
            scope: {
                // local: "<prop",
                cityFn: "&city"
            },
            // templateUrl: 'templates/scopeEvalTemplate.html'
            templateUrl: 'templates/scopeEvalDataTemplate.html'
        };
    }


})();