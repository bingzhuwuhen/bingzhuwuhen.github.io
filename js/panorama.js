 var fullwrap = document.getElementById('fullwrap');
    var picArr = [];
    if ($render_data && $render_data.data && $render_data.data.img_url) {
        var img = new Image();
        var img_url = $render_data.data.img_url;
        img.src = img_url;
        fullwrap.appendChild(img);
        if (img.complete) {
            imgLoaded(img_url);
            fullwrap.removeChild(img);
        }
        else {
            img.addEventListener('load', function () {
                imgLoaded(img_url);
                fullwrap.removeChild(img);
            });
        }
        img.addEventListener('error', function() {
            // 展示错误信息
            var errors = document.getElementById('errors');
            if (errors) {
                errors.className = 'errors';

            }
            if(fullwrap){
                fullwrap.className = 'wrap';
                fullwrap.removeChild(img);
            }
        });
    }

    function imgLoaded(url) {
        picArr.push(url);
        if (fullwrap) {
            var t = new Panorama({
                el: fullwrap,
                picArray: picArr,
                canvasW: fullwrap.offsetWidth,
                canvasH: fullwrap.offsetHeight,
                autoRander: true,
                closeDeviceOri: false,
            });
            // pc如果需要兼容屏幕改变事件示例:
            window.addEventListener('resize', function () {
                if (t) {
                    t.onResize(fullwrap.offsetWidth, fullwrap.offsetHeight);
                }
            }, false);
            fullwrap.classList = 'wrap';
        }
    }