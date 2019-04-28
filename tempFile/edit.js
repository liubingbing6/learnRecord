/**
 * Created by liubingbing on 2018/12/28.
 */
$(function () {
    let org = new OrgEdit();

    org.init();
    $("#js_tree_ul").on('click','.tree_add',org.treeAdd);//添加树节点操作
    $("#js_tree_ul").on('click','.tree_edit',org.treeEdit);//编辑树节点操作
    $("#js_tree_ul").on('click','.tree_del',org.treeDel);//删除树节点操作
    $(".js_add_close").on('click',org.closeBox);//关闭添加弹框
    $(".js_update_close").on('click',org.closeBox);//关闭更新弹框
    $("#js_save_add").on('click',org.throttle(org.saveAdd,2000,{trailing:false}));//保存新增
    $("#js_save_update").on('click',org.saveUpdate);//保存更新
    $("#js_tree_ul").on('click','.ico',org.controlLine);//收缩按钮点击操作
    $(window).scroll(org.scrollWindow);//页面滚动

});
class OrgEdit{
    constructor(){
        let self = this;
        this.editId = null;//编辑ID
        this.breadName = '组织架构管理';//面包屑标题

        this.init = function () {
            let dept_id = $("#js_dept_id").val();
            if(!dept_id){
                popupalert('参数错误！','error');
                return;
            }
            self.ajax('/org/index/depttree',{'dept_id':dept_id},function (res) {
                // console.log(res);
                if(res.result == '0'){
                    if(res.data && typeof res.data == 'object'){
                        // console.log(res.data);
                        //递归处理数据
                        self.recursive(res.data,self.recursiveCallback);
                        $("#js_bread_name").html(self.breadName);//修改面包屑名称
                    }
                }
            })
        }
        //递归处理数据
        this.recursive = function(data,fn,num=1,parentID='',parentAllID=''){
            if(!data.child){
                data.level_id = num;//设置层级数
                data.parentID = parentID+' '+data.dept_id+' '+parentAllID;//带上父节点及以上节点ID
                data.parentID = self.uniques(data.parentID);
                data.parentSelfId = parentID;//父级ID
                // console.log(data,num);
                fn(data,num);
            }else{
                data.level_id = num;
                data.parentID = parentID+' '+data.dept_id+' '+parentAllID;
                data.parentID = self.uniques(data.parentID);
                data.parentSelfId = parentID;
                fn(data,num);
                // console.log(data,num);
                ++num;
                data['child'].forEach(function (item) {
                    self.recursive(item,fn,num,data.dept_id,data.parentID)
                })
            }
        }
        //递归函数的回调函数
        this.recursiveCallback = function(data,nums){
            let treeContro = data.child?'tree_contro':'';
            let num = (nums * 24)+'px';
            let status = data.child?true:false;
            let onOff = '';
            let str = '';
            if(nums === 1){
                self.breadName = data.name;
            }
            if(nums>3){//进入第三层级后，后面子集全部隐藏
                onOff = 'none'
            }
            if(data.child && nums >=3){
                treeContro = 'tree_nav';
                status = false;
            }
           str = `<li data-id="${data.dept_id}" style="display:${onOff};">
                    <div data-id="${data.dept_id}" data-parent-id="${data.parentSelfId}" status=${status} class="tree_title ${treeContro} ${data.parentID}" style="padding-left:${num};">
                        <span>
                            <i class="ico"></i>
                            <strong class="ellipsis">${data.name}</strong>
                            <a href="javascript:;" class="tree_edit"  data-id="${data.dept_id}" style="display: ${nums==1?'inline-block':''}"></a>
                            <a href="javascript:;" class="tree_add" data-id="${data.dept_id}"  data-level="${data.level_id}" style="display: ${nums==1?'inline-block':''}"></a>
                            <a href="javascript:;" class="tree_del"  data-id="${data.dept_id}" data-parent-id="${data.parentSelfId}" style="display: ${nums==1?'inline-block':''}"></a>
                        </span>
                    </div>
                </li>`;
            $('#js_tree_ul').append(str);
        }
        //去重
        this.uniques =function (str) {
            const res = new Map();
            let arr = str.split(' ');
            //返回arr数组过滤后的结果，结果为一个数组
            //过滤条件是，如果res中没有某个键，就设置这个键的值为1
            let result = arr.filter((a) => !res.has(a) && res.set(a, 1));
            return result.join(' ');
        }

        this.treeAdd = function () {
            let id = $(this).attr('data-id');
            let num = $(this).attr('data-level');
            let attrClass = $(this).parent().parent().attr('class');
            attrClass = attrClass + ' '+ id;
            $(".mask").show();
            $("#js_add_box").show()
                .find('input[type="text"]').val('')
                .end()
                .find("#js_save_add").attr({
                'data-id':id,
                'data-num':num,
                'data-class':attrClass
            });
        }
        this.treeEdit = function () {
            let val = $(this).siblings('strong').text();
            self.editId = $(this).attr('data-id');
            $(".mask").show();
            $("#js_update_box").show()
                .find('input[type="text"]').val(val);
        }
        this.sendCount = 1;
        this.treeDel = function(){
            let id = $(this).attr('data-id');
            let parent_id = $(this).attr('data-parent-id');
            let length_child = $(`.${id}`).length;
            popupalert('确定删除？','alert',function(){
                if(self.sendCount == 1){
                    if( length_child >=2 ){
                        popupalert('该部门还有子部门(员工),不能删除！','notice');
                        return;
                    }
                    self.sendCount = 2;
                    self.ajax('/org/index/deldept',{'dept_id':id},function (res) {
                        self.sendCount = 1;
                        if(res.result === '0'){
                            $(`div[data-id=${id}]`).parent().remove();
                            let length_parent = $(`.${parent_id}`).length;
                            if(length_parent <= 1){
                                $(`div[data-id=${parent_id}]`).removeClass('tree_contro tree_nav');
                            }
                            return;
                        }else if(res.result === '5'){
                            popupalert('该部门还有子部门(员工),不能删除！','notice');
                            return;
                        }else{
                            popupalert('删除失败！','notice');
                        }
                    })
                }
            });
        }
        this.closeBox = function (e) {
            let ev = e || window.event;
            if(ev.currentTarget.className === 'js_add_close'){
                $(".mask").hide();
                $("#js_add_box").hide();
            }
            if(ev.currentTarget.className === 'js_update_close'){
                $(".mask").hide();
                $("#js_update_box").hide();
            }
        }

        this.saveAdd = function(){
            let val = $("#js_name_add").val();
            let id = $(this).attr('data-id');
            let attrClass = $(this).attr('data-class');
            let num = $(this).attr('data-num')||1;
            let nav = num>=1?'tree_contro':'';
            num =(num-0)+1;
            val = $.trim(val);
            if(!val){
                popupalert('名称不能为空！','notice');
                return;
            }
            val = val.replace(/>/g,'&#62;');
            val = val.replace(/</g,'&#60;');
            val = val.replace(/"/g,'“');
            val = val.replace(/'/g,'’');
            let data = {
                'name':val,
                'p_dept_id':id
            }
            self.ajax('/org/index/opdept',data,function (res) {
                let arr = attrClass.split(' ');
                let index = arr.indexOf('tree_contro');
                if(index>-1){
                    arr.splice(index,1);
                    attrClass = arr.join(' ');
                };
                res.parentID = self.uniques(attrClass);
                res.parentSelfId = id;

                if(res.result == '0'){
                    $(".mask").hide();
                    $("#js_add_box").hide();
                    const html = self.treeAddHtml(res,num);
                    $(`li[data-id=${id}]`).after(html)
                        .find(`div[data-id=${id}]`)
                        .addClass(nav)
                        .removeClass('tree_nav')
                        .attr('status',true);
                    $(`li[data-id=${res.dept_id}]`).removeClass('tree_nav tree_contro');
                    popupalert('添加成功！','message');
                    return;
                }
            });
        }
        this.saveUpdate = function () {
            let name = $("#js_name_update").val();
            let parent_id = $(this).attr('data-parent-id');
            name = $.trim(name);
            if(!name){
                popupalert('输入框不能为空！','notice');
                return;
            }
            name = name.replace(/>/g,'&#62;');
            name = name.replace(/</g,'&#60;');
            name = name.replace(/"/g,'“');
            name = name.replace(/'/g,'’');
            let data = {
                'name':name,
                'p_dept_id':parent_id,//父节点ID
                'dept_id':self.editId//子节点
            }
            self.ajax('/org/index/opdept',data,function (res) {
                if(res.result == '0'){
                    $(`div[data-id=${self.editId}]`).find('strong').html(name);
                    $(".mask").hide();
                    $("#js_update_box").hide();
                }
            })
        }

        this.controlLine = function () {
            let sibling = $(this).parent().parent();
            let curID = sibling.attr('data-id');
            let status = sibling.attr('status');
            if(status === 'true'){  //'tree_nav':平行箭头   'tree_contro':向下箭头
                sibling.attr('status',false);
                sibling.addClass('tree_nav').removeClass('tree_contro');
                $(`.${curID}:not(:first)`).parent().hide().end().has('.tree_contro').addClass('tree_nav').removeClass('tree_contro');
            }else{
                sibling.attr('status',true);//设置当前状态
                sibling.addClass('tree_contro').removeClass('tree_nav');
                //设置当前节点下的所有子节点的状态
                $(`div[data-parent-id=${curID}]`).parent().show().end().each(function(){
                    if($(this).hasClass('tree_nav') || $(this).hasClass('tree_contro') ){
                        $(this).addClass('tree_nav').removeClass('tree_contro').attr('status',false);
                    };
                });
            }
            return;
        }
        //页面滚动
        this.scrollWindow = function () {
            var objW = $(window);//当前窗口
            var objC = $('.add_box');//对话框,name是当前显示对话框的id名称

            var brsW = objW.width();
            var brsH = objW.height();
            var scrL = objW.scrollLeft();
            var scrT = objW.scrollTop();
            var curW = objC.width();
            var curH = objC.height();

            //计算对话框居中时距离左边的距离
            var left = scrL + (brsW - curW)/2;
            //计算对话框居中时距离顶部的距离
            var top = scrT + (brsH - curH)/2;

            objC.css({
                "left":left+'px',
                "top":top+'px',
                'margin':0+'px'
            });
            $('.mask').css({
                'width':brsW+scrL+'px',
                'height':brsH+scrT+'px'
            });
        }
        //获取当前时间戳
        this.now = Date.now || function() {
                return new Date().getTime();
            };
        //返回一个函数，在规定的时间最多只能触发一次;
        //如果你想禁用第一次首先执行的话，传递{leading: false}
        //如果你想禁用最后一次执行的话，传递{trailing: false}
        this.throttle = function(func, wait, options) {
            var context, args, result;
            var timeout = null;
            var previous = 0;
            if (!options)
                options = {};
            var later = function() {
                previous = options.leading === false ? 0 : self.now();
                timeout = null;
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            };
            return function() {
                var now = self.now();
                if (!previous && options.leading === false)
                    previous = now;
                var remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0 || remaining > wait) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    previous = now;
                    result = func.apply(context, args);
                    if (!timeout)
                        context = args = null;
                } else if (!timeout && options.trailing !== false) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        };
    }
    ajax(url,data,success){
        $.ajax({
            url:url,
            type:'post',
            async:true,
            cache:false,
            data:data,
            dataType:'json',
            success:function (response) {
                success(response);
            },
            error:function (e) {
                console.log('error:'+e);
            }
        });
    }
    treeAddHtml(data,nums){
        let treeContro = data.child?'tree_contro':'';
        let num = (nums * 24)+'px';
        let status = data.child?true:false;
        data.level_id = data.level_id?data.level_id:nums+1;
        let str = `<li data-id="${data.dept_id}">
                        <div data-id="${data.dept_id}" data-parent-id="${data.parentSelfId}" status=${status} class="tree_title ${treeContro} ${data.parentID}" style="padding-left:${num};">
                            <span>
                                <i class="ico"></i>
                                <strong class="ellipsis">${data.name}</strong>
                                <a href="javascript:;" class="tree_edit"  data-id="${data.dept_id}"></a>
                                <a href="javascript:;" class="tree_add" data-id="${data.dept_id}"  data-level="${data.level_id}"></a>
                                <a href="javascript:;" class="tree_del"  data-id="${data.dept_id}" data-parent-id="${data.parentSelfId}"></a>
                            </span>
                        </div>
                    </li>`;
        return str;
    }

}