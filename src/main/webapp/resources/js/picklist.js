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
                var listLeft = $(lists.get(0));
                var listRight = $(lists.get(1));
                listLeft.hasClass("left") || listLeft.addClass("left");
                listRight.hasClass("right") || listRight.addClass("right");
                var selected = $([]), offset = {top:0, left:0};
                lists.sortable({connectWith:lists, handle:".handle",
                    start:function (ev, ui) {
                        var dragItem = ui.item;
                        var dragItemElement = ui.item.get(0);
                        var dy = -40;
                        if (ui.item.hasClass("ui-selected")) {
                            selected = $(".ui-selected").not(dragItemElement).not(".ui-sortable-placeholder").each(function () {
                                var item = $(this);
                                item.data("offset", item.offset());
                                item.css({
                                    position: "relative"
                                });
                            }).detach();
                        }
                        else {
                            selected = $([]);
                            $("#selectable > div").removeClass("ui-selected");
                        }
                        offset = dragItem.offset();
                    },
                    change: function (ev, ui) {
//                        console.log(ui);
                    },
                    sort:function (ev, ui) {
                        var dragItem = ui.item;
                        var dragItemElement = ui.item.get(0);
                        var ref_position = ui.item.position();
                        var dt = ref_position.top - offset.top;
                        var dl = ref_position.left - offset.left;

                        selected.not(dragItemElement).not(".ui-sortable-placeholder").each(function () {
                            var item = $(this), off = item.data("offset");
                            item.css({top:dt, left:dl});
                        });
                    },
                    update: function(event, ui) {
                        var dragItem = ui.item;
                        var dragItemElement = ui.item.get(0);
                        var newParent = $(dragItemElement.parentElement);
                        selected.not(dragItemElement).not(".ui-sortable-placeholder").detach().insertAfter(dragItem);
                        selected.not(dragItemElement).each(function () {
                            $(this).css({top:0, left:0});
                        });
                        newParent.sortable("refreshPositions");

                    },
                    remove:function (event, ui) {
                        var dragItem = ui.item;
                        var dragItemElement = ui.item.get(0);
                        var newParent = $(dragItemElement.parentElement);
                        selected.not(dragItemElement).not(".ui-sortable-placeholder").detach().insertAfter(dragItem);
                        selected.not(dragItemElement).each(function () {
                            $(this).css({top:0, left:0});
                        });
                        newParent.sortable("refreshPositions");
                    },
                    beforeStop:function (event, ui) {
                    },
                    stop:function (event, ui) {
                    }

                });
                lists.selectable().children("li").prepend("<div class='handle'><span class='ui-icon ui-icon-carat-2-n-s'></span></div>");
                listLeft.after(createButtons(settings));
                $(".buttons .right", picklist).click(function () {
                    var elements = $(".ui-selected", listLeft).detach().appendTo(listRight);
                });
                $(".buttons .left", picklist).click(function () {
                    var elements = $(".ui-selected", listRight).detach().appendTo(listLeft);
                });
            })
        }

    };

    var createButtons = function (settings) {
        var container = $("<ul />", {
            class:"buttons"
        });

        var itemLeft = $("<li />").appendTo(container);
        var buttonLeft = $("<button />", {
            class:"left",
            html:settings.leftButtonText
        }).button().appendTo(itemLeft);

        var itemRight = $("<li />").appendTo(container);
        var buttonRight = $("<button />", {
            class:"right",
            html:settings.rightButtonText
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