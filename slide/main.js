
let n
initialize()

setInterval(() => {
  makeLeave(getImage(n))
    .one('transitionend', (e) => {
      makeEnter($(e.currentTarget))
    })
  makeCurrent(getImage(n + 1))
  n += 1
}, 1500);

function getImage(n) {
  return $(`.images > img:nth-child(${x(n)})`)
}

function makeCurrent($node) {
  return $node.removeClass('enter leave').addClass('current')
}
function makeLeave($node) {
  return $node.removeClass('current enter').addClass('leave')
}
function makeEnter($node) {
  return $node.removeClass('leave current').addClass('enter')
}

// 初始化状态
function initialize() {
  n = 1
  $(`.images > img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}

function x(n) {
  if (n > 6) {
    n = n % 6
    if (n === 0) {
      n = 6
    }
  }
  return n
}
