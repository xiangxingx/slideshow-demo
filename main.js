var allButtons = $('#buttons > button')

for (let i = 0; i < allButtons.length; i++) {
  $(allButtons[i]).on('click', function (x) {
    var index = $(x.currentTarget).index()
    var px = index * -300
    $(images).css({
      transform: 'translateX(' + px + 'px)'
    })
    n = index
    activeButton(allButtons.eq(n))
  })
}

var n = 0
var size = allButtons.length

playSlide(n % size)

var timerId = setTimer()

$('.window').on('mouseenter', function () {
  window.clearInterval(timerId)
})

$('.window').on('mouseleave', function () {
  timerId = setTimer()
})

function setTimer() {
  return setInterval(() => {
    n += 1
    playSlide(n % size)
  }, 1500);
}

function activeButton($button) {
  $button
    .addClass('red')
    .siblings('.red').removeClass('red')//siblings('.red')；前面需要加.
}

function playSlide(index) {
  allButtons.eq(index).trigger('click')// eq 找出对应的DOM，并把它封装成jQuery对象；trigger 可以接任何事件的名字；
}


/* $(p1).on('click', function () {
  $(images).css({
    transform: 'translateX(0)'
  })
})
$(p2).on('click', function () {
  $(images).css({
    transform: 'translateX(-300px)'
  })
})
$(p3).on('click', function () {
  $(images).css({
    transform: 'translateX(-600px)'
  })
})
$(p4).on('click', function () {
  $(images).css({
    transform: 'translateX(-900px)'
  })
}) */
