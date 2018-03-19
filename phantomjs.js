var page = require('webpage').create();


page.open('http://127.0.0.1:8000/login', function (status) {
    if (status === 'success') {
        page.includeJs("https://code.jquery.com/jquery-3.3.1.min.js", function() {
            // evaluate里面是一个沙箱，主要的DOM操作地
            page.evaluate(function() {
                var form = $("form");
                form.find("input[name=username]").val("*");
                form.find("input[name=password]").val("*");
                form.trigger("submit");
            });
            // 等待5秒后收集结果
            window.setTimeout(function() {
                //console.log(page.content);
                 
                var cookies = page.cookies;
                var saveData = '';
                for(var i in cookies) {
                    console.log(cookies[i].name + '=+' + cookies[i].value);
                    saveData += cookies[i].name+"="+cookies[i].value+"&";
                }
                page.render('text.png');
                // 1 
                // 如果供外部程序使用，这里把cookie送出
                var save = require('webpage').create();

                save.open('http://127.0.0.1:8000/*', 'GET', saveData, function (status) {
                    console.log(status)
                    if (status == "success") {
                        save.viewportSize = { width: 1200, height: 1100 };//设置长宽
                        var output = './rebug.png';//存储文件路径和名称

                        window.setTimeout(function () {
                            save.render(output);
                            phantom.exit();
                        }, 12000);
                    }else{
                        console('----');
                        phantom.exit();
                    }
                    
                });
            }, 15000);
        });
    } else {
        phantom.exit();
    }
});
