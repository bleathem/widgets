(function ($) {

    var methods = {
        init : function( options ) {
            var settings = $.extend( {
                  'leftButtonText' : '&larr;',
                  'rightButtonText' : '&rarr;'
                }, options);

            return this.each(function() {
                $("ol", this).selectable();
                var selectables = $(".selectable");
                var left = selectables.get(0);
                var right = selectables.get(1);
                $(left).after(createButtons(settings));
                $(".right", ".pickList").click(function () {
                    var elements = $(".ui-selected", left).detach().appendTo(right);
                });
                $(".left", ".pickList").click(function () {
                    var elements = $(".ui-selected", right).detach().appendTo(left);
                });
            })
        }

    };

    var createButtons = function( settings ) {
        var container = $("<ol />", {
            class: "buttons"
        });
        container.append("<li />").append($("<button />", {
            class: "left",
            html: settings.leftButtonText
        }).button());
        container.append("<li />").append($("<button />", {
            class: "right",
            html: settings.rightButtonText
        }).button());
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