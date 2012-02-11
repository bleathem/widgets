(function ($) {

    var methods = {
        init : function( options ) {
            return this.each(function() {
                $("ol", this).selectable();
                var selectables = $(".selectable");
                var left = selectables.get(0);
                var right = selectables.get(1);
                $("button").button();
                $(".right", ".pickList").click(function () {
                    var elements = $(".ui-selected", left).detach().appendTo(right);
                });
                $(".left", ".pickList").click(function () {
                    var elements = $(".ui-selected", right).detach().appendTo(left);
                });
            })
        }

    };

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