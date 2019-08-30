/**
 * Created by liubingbing on 2019/1/16.
 */
/*let a = function(){
    return {
        auto:function(pm){
            let loader = {
                num:3
            }
            let vpm = $.extend({},loader,pm);
            alert(vpm.num);
        },
        get:function(pm){
            let loader = {
                num:2
            }
            let vpm = $.extend({},loader,pm);
            alert(vpm.num);
        }
    }
}();*/

/*;(function ($) {
    $.fn.aaa = function (pm) {
        let defaults = {
            evenRowClass:'evenRow',
            oddRowClass:'oddRow',
            curRowClass:'curRow',
            eventType1:'mouseover',
            eventType2:'mouseout'
        }
        let endOptions = $.extend({},defaults,pm);
        this.each(function () {
            var _this = $( this );
            _this.find('tr:even').addClass(endOptions.evenRowClass);
            _this.find('tr:odd').addClass(endOptions.oddRowClass);
            //鼠标移入和移出，但实际开发中不直接使用mouseover这种方法
            /!*$(this).find('tr').mouseover(function () {
             $(this).addClass(endOptions.curRowClass);
             }).mouseout(function () {
             $(this).removeClass(endOptions.curRowClass);
             });*!/

            //实际开发中要用bian()方法绑定
            //因为用bind()方法绑定非常灵活，事件可以自己定义
            //mouseover mouseout...事件底层都是用bind()去实现的，mouseout 等只是快捷方式
            _this.find('tr').bind(endOptions.eventType1,function () {
                $(this).addClass(endOptions.curRowClass);
            });
            _this.find('tr').bind(endOptions.eventType2,function () {
                $(this).removeClass(endOptions.curRowClass);
            })
        });
    }
})(jQuery);*/

;(function (W,$) {
    let Beautify = function (ele,pm) {
        this.$element = ele;
        this.defaults = {
            'color':'#ff4343',
            'height':30,
            'width':120
        }
        this.options = Object.assign({},this.defaults,pm);
        console.log(this.options);
    }
    Beautify.prototype = {
        constructor : Beautify,
        change : function () {
            return this.$element.css({
                'color':this.options.color,
                'height':this.options.height,
                'width':this.options.width
            });
        },
        show:function () {
            console.log(this.options.color);
        }
    }
    // $.fn.beautify = new Beautify(this);
    //在插件中使用Beautifier对象
    $.fn.beautify = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautify(this, options);
        //调用其方法
        return beautifier;
    }

})(window,jQuery);


