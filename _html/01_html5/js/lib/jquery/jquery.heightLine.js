/*!

 * heightLine JavaScript Library beta4 (http://www.webcreativepark.net)
 * Copyright 2013 Kazuma Nishihata
 * Licensed under MIT (https://github.com/to-r/jquery.heightLine.js/blob/master/LICENSE)

*/


(function (factory) {
	if (typeof module === "object" && typeof module.exports === "object") {
		factory(require("jquery"), window, document)
	} else {
		factory(jQuery, window, document)
	}
}(function ($, window, document, undefined) {
	$.fn.heightLine = function () {
		var target         = this,
			fontSizeChangeTimer,
			windowResizeId = Math.random();
		var heightLineObj = {
			create     : function (op) {
				var self        = this,
					maxHeight   = 0,
					windowWidth = $(window).width();
				self.setOption(op);
				if (windowWidth <= self.op.maxWidth && windowWidth >= self.op.minWidth) {
					target
						.each(function () {
							if ($(this).outerHeight() > maxHeight) {
								maxHeight = $(this).outerHeight()
							}
						})
						.each(function () {
							var height = maxHeight - parseInt($(this).css("padding-top")) - parseInt($(this).css("padding-bottom"));
							$(this).height(height)
						})
				}
			},
			destroy    : function () {
				target.css("height", "")
			},
			op         : {
				"fontSizeCheck": false,
				"maxWidth"     : 10000,
				"minWidth"     : 0
			},
			refresh    : function (op) {
				this.destroy();
				this.create(op)
			},
			removeEvent: function () {
				$(window).off("resize." + windowResizeId);
				target.off("destroy refresh");
				clearInterval(fontSizeChangeTimer)
			},
			setOption  : function (op) {
				this.op = $.extend(this.op, op)
			}
		};
		if (typeof arguments[0] === "string" && arguments[0] === "destroy") {
			target.trigger("destroy")
		} else if (typeof arguments[0] === "string" && arguments[0] === "refresh") {
			target.trigger("refresh")
		} else {
			heightLineObj["create"](arguments[0]);
			$(window).on("resize." + windowResizeId, function () {
				heightLineObj["refresh"]()
			});
			target.on("destroy", function () {
				heightLineObj["removeEvent"]();
				heightLineObj["destroy"]()
			})
				.on("refresh", function () {
					heightLineObj["refresh"]()
				});
			if (heightLineObj.op.fontSizeCheck) {
				if ($("#fontSizeChange").length <= 0) {
					var fontSizeChange = $("<span id='fontSizeChange'></span>")
						.css({height: "1em", left: 0, position: "absolute", top: 0, width: 0})
						.appendTo("body")
				}
				var defaultFontSize = $("#fontSizeChange").height();
				fontSizeChangeTimer = setInterval(function () {
					if (defaultFontSize != $("#fontSizeChange").height()) {
						heightLineObj["refresh"]()
					}
				}, 100)
			}
		}
		return target
	}
}));