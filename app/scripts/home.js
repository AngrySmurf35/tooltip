var $ = require('jquery'),
_ = require('underscore'),
Backbone = require('backbone'),
Tooltip = require("text!../templates/tooltip.html");

require("style!css!../styles/tooltip.css");

module.exports = Backbone.View.extend({
        tag: 'div',
        id: 'tool_tip_container',
        template: _.template(Tooltip),

        settings: {
            place: "right",
            message: "",
            element: null
        },

        /*
        * @param
        * options.element   - dom element to attach the tooltip to,
        * options.message   - the message to display inside the tooltip
        * options.place     - can be left, right, top, bottom - position of the tooltip related to the element
        */
        initialize: function(options) {

          this.settings = _.extend( {}, this.settings, options );

          this.caret_class = "";
        },

        /*
        * add a carret depending on where the tooltip is displayed
        */

        _addClass: function() {
          if ($(this.settings.element).offset().left < this.settings.tooltipWidth) {
            this.settings.place = "right";
          }

          switch(this.settings.place) {
            case 'right':
              this.caret_class = "caret-toggler-left";
              break;
            case 'left':
              this.caret_class = "caret-toggler-right";
              break;
            case 'top':
              this.caret_class = "caret-toggler-top";
              break;
            case 'bottom':
              this.caret_class = "caret-toggler-bottom";
              break;
            default:
              this.caret_class = "";
              break;
          }

        },

        /*
        * @function aligning the tooltip relative to the element
        */
        _align: function() {
          var caretSize = 10;
          var posValues = {
              verticalTop: $(this.settings.element).offset().top - this.$el.innerHeight() - caretSize,
              verticalMiddle: $(this.settings.element).offset().top - this.$el.innerHeight()/2 + $(this.settings.element).innerHeight()/2,
              verticalBottom: $(this.settings.element).offset().top + $(this.settings.element).innerHeight() + caretSize,

              horizontalLeft: $(this.settings.element).offset().left - this.$el.innerWidth() - caretSize,
              horizontalRight: $(this.settings.element).offset().left + $(this.settings.element).innerWidth() + caretSize,
              horizontalMiddle: $(this.settings.element).offset().left - $(this.settings.element).innerWidth()/2 + caretSize,

              caretHorizontalLeft: -caretSize,
              caretHorizontalRight: this.$el.innerWidth(),
              caretHorizontalMiddle: this.$el.innerHeight() + caretSize,

              caretVerticalTop: -caretSize,
              caretVerticalMiddle: this.$el.innerHeight()/2 - caretSize,
              caretVerticalBottom: this.$el.innerHeight()
          };
          var position;
          switch(this.settings.place) {
              case 'right':
                  position = {
                      left: posValues.horizontalRight,
                      top: posValues.verticalMiddle,
                      caret_top: posValues.caretVerticalMiddle,
                      caret_left: posValues.caretHorizontalLeft
                  };
                  break;
              case 'left':
                  position = {
                      left: posValues.horizontalLeft,
                      top: posValues.verticalMiddle,
                      caret_top: posValues.caretVerticalMiddle,
                      caret_left: posValues.caretHorizontalRight
                  };
                  break;
              case 'top':
                  position = {
                      left: posValues.horizontalMiddle,
                      top: posValues.verticalTop,
                      caret_top: posValues.caretVerticalBottom,
                      caret_left: posValues.caretHorizontalMiddle
                  };
                  break;
              case 'bottom':
                  position = {
                      left: posValues.horizontalMiddle,
                      top: posValues.verticalBottom,
                      caret_top: posValues.caretVerticalTop,
                      caret_left: posValues.caretHorizontalMiddle
                  };
                  break;
              default:
                  position = {
                      left: $(this.settings.element).position().left,
                      top: $(this.settings.element).position().top,
                      caret_pos: 0
                  };
                  break;
          }
          this.$el.offset({top:position.top,left:position.left});

          if (position && position.caret_top)
              this.$el.find('.caret-toggler').css('top', position.caret_top + 'px');

          if (position && position.caret_left)
              this.$el.find('.caret-toggler').css('left', position.caret_left + 'px');

      },

      /*
      * @function call this after render
      */
      display: function() {
        var _this = this;
        $(this.settings.element).on('mouseenter', function() {
          $('body').append(_this.render().el);
          _this._align();
        });

        $(this.settings.element).on('mouseout', function() {
          _this.render().el.remove();
        });

      },

      render: function() {

          // before render
          this._addClass();

          this.$el.html(this.template({ message: this.settings.message, caret_class: this.caret_class }));
          return this;
      }

    });
