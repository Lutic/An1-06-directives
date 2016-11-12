(function() {
    "use strict";

    angular.module("app")
      .directive("unorderedList1", unorderedList1)
      .directive("unorderedList2", unorderedList2)
      .directive("unorderedList3", unorderedList3)
      .directive("unorderedList4", unorderedList4)
      .directive("unorderedList5", unorderedList5)
      .directive("unorderedListAttrs", unorderedListAttrs)
      .directive("unorderedListScope", unorderedListScope)
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


})();