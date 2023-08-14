
    $(function () {
        var $ul = $('.sidebar-navigation > ul');

        $ul.find('li a').click(function (e) {
            var $li = $(this).parent();
          
            if ($li.find('ul').length > 0) {
                e.preventDefault();

                if ($li.hasClass('selected')) {
                    $li.removeClass('selected').find('li').removeClass('selected');
                    $li.find('ul').slideUp(400);
                    $li.find('a em').removeClass('mdi-flip-v');
                } else {

                    if ($li.parents('li.selected').length == 0) {
                        $ul.find('li').removeClass('selected');
                        $ul.find('ul').slideUp(400);
                        $ul.find('li a em').removeClass('mdi-flip-v');
                    } else {
                        $li.parent().find('li').removeClass('selected');
                        $li.parent().find('> li ul').slideUp(400);
                        $li.parent().find('> li a em').removeClass('mdi-flip-v');
                    }

                    $li.addClass('selected');
                    $li.find('>ul').slideDown(400);
                    $li.find('>a>em').addClass('mdi-flip-v');
                }
                
            }
        });


        $('.sidebar-navigation > ul ul').each(function (i) {
            if ($(this).find('>li>ul').length > 0) {
                var paddingLeft = $(this).parent().parent().find('>li>a').css('padding-left');
                var pIntPLeft = parseInt(paddingLeft);
                var result = pIntPLeft + 20;

                $(this).find('>li>a').css('padding-left', result);
            } else {
                var paddingLeft = $(this).parent().parent().find('>li>a').css('padding-left');
                var pIntPLeft = parseInt(paddingLeft);
                var result = pIntPLeft + 20;

                $(this).find('>li>a').css('padding-left', result).parent().addClass('selected--last');
            }
        });

        var t = ' li > ul ';
        for (var i = 1; i <= 10; i++) {
            $('.sidebar-navigation > ul > ' + t.repeat(i)).addClass('subMenuColor' + i);
        }

        var activeLi = $('li.selected');
        if (activeLi.length) {
            opener(activeLi);
        }

        function opener(li) {
            var ul = li.closest('ul');
            if (ul.length) {

                li.addClass('selected');
                ul.addClass('open');
                li.find('>a>em').addClass('mdi-flip-v');

                if (ul.closest('li').length) {
                    opener(ul.closest('li'));
                } else {
                    return false;
                }

            }
        }

    });



    var menu_link = document.querySelectorAll(".sidebar-navigation ul li a");
    for (i = 0; i < menu_link.length; i++) {
        var clicked = menu_link[i]
        clicked.addEventListener("click", function () {
            // modified in here
            // clicked.classList.remove("active");
            menu_link = document.querySelectorAll(".sidebar-navigation ul li a");
            for (i = 0; i < menu_link.length; i++) {
                menu_link[i].classList.remove("active-menu");
            }
            this.classList.add("active-menu");
        });
    }





    window.onload = function () {
        if (!navigator.userAgent.match('Macintosh')) {
            var element = document.querySelectorAll('.slimScroll');

          
            // Apply slim scroll plugin
            var one = new slimScroll(element[0], {
                'wrapperClass': 'scroll-wrapper unselectable mac',
                'scrollBarContainerClass': 'scrollBarContainer',
                'scrollBarContainerSpecialClass': 'animate',
                'scrollBarClass': 'scroll',
                'keepFocus': true
            });
            var two = new slimScroll(element[1], {
                'wrapperClass': 'wrapper',
                'scrollBarContainerClass': 'scrollBarContainer',
                'scrollBarClass': 'scrollBar'
            });

            var three = new slimScroll(element[2], {
                'wrapperClass': 'scroll-wrap',
                'scrollBarContainerClass': 'scroll-bar-wrap',
                'scrollBarClass': 'scroll-bar'
            });

            // resize example
            // To make the resizing work, set the height of the container in PERCENTAGE
            window.onresize = function () {
                one.resetValues();
                two.resetValues();
                three.resetValues();
            }
        }
        else {
            document.write("For Mac users, this custom slimscroll styles will not be applied");
        }
    }
