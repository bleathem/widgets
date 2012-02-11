(function ($) {

    var methods = {
        init : function( options ) {
            var settings = $.extend( {
                  'leftButtonText' : '&larr;',
                  'rightButtonText' : '&rarr;'
                }, options);

            return this.each(function() {
                var picklist = $(this);
                if (picklist.hasClass("pickList")) {
                    picklist.addClass("pickList")
                }
                $("ol", picklist).selectable();
                var lists = $("ol", picklist);
                var listLeft = lists.get(0);
                var listRight = lists.get(1);
                $(listLeft).after(createButtons(settings));
                $(".buttons .right", picklist).click(function () {
                    var elements = $(".ui-selected", listLeft).detach().appendTo(listRight);
                });
                $(".buttons .left", picklist).click(function () {
                    var elements = $(".ui-selected", listRight).detach().appendTo(listLeft);
                });
            })
        }

    };

    var createButtons = function( settings ) {
        var container = $("<ul />", {
            class: "buttons"
        });

        var itemLeft = $("<li />").appendTo(container);
        var buttonLeft = $("<button />", {
            class: "left",
            html: settings.leftButtonText
        }).button().appendTo(itemLeft);
        
        var itemRight = $("<li />").appendTo(container);
        var buttonRight = $("<button />", {
            class: "right",
            html: settings.rightButtonText
        }).button().appendTo(itemRight);
        
        return container;
    }

    $.fn.picklist = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.picklist');
        }

    };

})(jQuery);