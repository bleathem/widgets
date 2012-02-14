(function ($) {

    var methods = {
        init:function (options) {
            var settings = $.extend({
                'leftButtonText':'&larr;',
                'rightButtonText':'&rarr;'
            }, options);

            return this.each(function () {
                var picklist = $(this);
                picklist.hasClass("pickList") || picklist.addClass("pickList");
                var lists = picklist.children("ol");
                lists.sortable({connectWith:lists, handle:".handle"});
                lists.selectable().children("li").prepend("<div class='handle'><span class='ui-icon ui-icon-carat-2-n-s'></span></div>");
                createButtons(picklist, lists, settings);
            })
        }

    };

    var createButtons = function (picklist, lists, settings) {
        var container = $("<ul />", {
            class:"buttons"
        });

        var itemLeft = $("<li />").appendTo(container);
        var buttonLeft = $("<button />", {
            class:"left",
            html:settings.leftButtonText
        }).button().click(function () {
            var elements = $(".ui-selected", lists[0]).detach().appendTo(lists[1]);
        }).appendTo(itemLeft);

        var itemRight = $("<li />").appendTo(container);
        var buttonRight = $("<button />", {
            class:"right",
            html:settings.rightButtonText
        }).button().click(function () {
            var elements = $(".ui-selected", lists[1]).detach().appendTo(lists[0]);
        }).appendTo(itemRight);

        $(lists[0]).after(container);

        return picklist;
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