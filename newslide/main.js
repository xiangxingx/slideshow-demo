let $buttons = $('#btn > svg')
console.log($buttons)
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()

$slides.hide().offset()
$slides.css({ transform: 'translateX(-400px)' }).show()
$buttons.eq(0).addClass('active')

bindEvents()

$(next).on('click', function () {
  goToSlide(current + 1)
})
$(previous).on('click', function () {
  goToSlide(current - 1)
})

let timer = setInterval(() => {
  goToSlide(current + 1)
}, 2000);

$('.container').on('mouseenter', function () {
  window.clearInterval(timer)
})
$('.container').on('mouseleave', function () {
  timer = setInterval(() => {
    goToSlide(current + 1)
  }, 2000);
})

document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    window.clearInterval(timer)
  }else{
    timer = setInterval(() => {
      goToSlide(current + 1)
    }, 2000);
  }
})

// 整理前的代码
/* $buttons.eq(0).on('click', function (ev) {
  if (current === 5) {
    console.log('最后一张来的')
    $slides.css({ transform: 'translateX(-2800px)' })
      .one('transitionend', function () {
        $slides.hide().offset()//解决切换时过渡动画的问题
        $slides.css({ transform: 'translateX(-400px)' }).show()
      })
  } else {
    $slides.css({ transform: 'translateX(-400px)' })
  }
  $buttons.removeClass('active')
  $(ev.currentTarget).addClass('active')
  current = 0
})

$buttons.eq(1).on('click', function (ev) {
  $slides.css({ transform: 'translateX(-800px)' })
  $buttons.removeClass('active')
  $(ev.currentTarget).addClass('active')
  current = 1
})

$buttons.eq(2).on('click', function (ev) {
  $slides.css({ transform: 'translateX(-1200px)' })
  $buttons.removeClass('active')
  $(ev.currentTarget).addClass('active')
  current = 2
})

$buttons.eq(3).on('click', function (ev) {
  $slides.css({ transform: 'translateX(-1600px)' })
  $buttons.removeClass('active')
  $(ev.currentTarget).addClass('active')
  current = 3
})

$buttons.eq(4).on('click', function (ev) {
  $slides.css({ transform: 'translateX(-2000px)' })
  $buttons.removeClass('active')
  $(ev.currentTarget).addClass('active')
  current = 4
})

$buttons.eq(5).on('click', function (ev) {
  if (current === 0) {
    console.log('第一张来的')
    $slides.css({ transform: 'translateX(0px)' })
      .one('transitionend', function () {
        $slides.hide().offset()//解决切换时过渡动画的问题
        $slides.css({ transform: 'translateX(-2400px)' }).show()
      })
  } else {
    $slides.css({ transform: 'translateX(-2400px)' })
  }
  $buttons.removeClass('active')
  $(ev.currentTarget).addClass('active')
  current = 5
}) */


function bindEvents() {
  $('#btn').on('click', 'svg', function (ev) {
    let $button = $(ev.currentTarget)
    let index = $button.index() // 
    goToSlide(index)

    $buttons.removeClass('active')
    $button.addClass('active')
  })
}

function goToSlide(index) {
  if (index > $buttons.length - 1) {
    index = 0
  } else if (index < 0) {
    index = $buttons.length - 1
  }
  if (current === $buttons.length - 1 && index === 0) {
    $slides.css({ transform: `translateX(${-($buttons.length + 1) * 400}px)` })
      .one('transitionend', function () {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` }).show()
      })
  } else if (current === 0 && index === $buttons.length - 1) {

    $slides.css({ transform: `translateX(0px)` })
      .one('transitionend', function () {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` }).show()
      })
  } else {
    $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` })
  }
  current = index
}

function makeFakeSlides() {
  let $firstCopy = $images.eq(0).clone(true) // 同时克隆子元素
  let $lastCopy = $images.eq($images.length - 1).clone(true)
  $slides.append($firstCopy)
  $slides.prepend($lastCopy) // 在前面加上
}