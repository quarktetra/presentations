/*
 * MathJax 3 equation preview, works with MathJax V3
 *
 * Copyright (c) 2020 Mauricio Poppe
 * Licensed under the MIT license.
 */

var container = document.body

var tooltip = document.createElement('div')
tooltip.classList.add('mathjax-tooltip')
Object.assign(tooltip.style, {
  display: 'none',
  width: '100%',
  position: 'absolute'
})
container.appendChild(tooltip)

function getTarget(ev) {
  return ev.currentTarget.closest('a')
}

function onMouseOver(ev) {
  var href = getTarget(ev)
  if (!href) return
  var number = document.querySelector(href.hash)
  var equation = number.closest('.MathJax')
  alert(equation)
  var equationBounds = equation.getBoundingClientRect()
  Object.assign(tooltip.style, {
    top: href.closest('.MathJax').offsetTop - equationBounds.height - 50 + 'px',
    display: 'block'
  })

  tooltip.appendChild(equation.cloneNode(true))
}

function onMouseOut(ev) {
  var href = getTarget(ev)
  if (!href) return
  tooltip.innerHTML = ''
  Object.assign(tooltip.style, { display: 'none' })
}

document.addEventListener('DOMContentLoaded', function () {
  ;(async function afterMathJaxRender() {
    await MathJax.startup.promise
    Array.from(document.querySelectorAll('.MathJax_ref')).forEach((el) => {
      el.addEventListener('mouseover', onMouseOver)
      el.addEventListener('mouseout', onMouseOut)
    })
  })()
})
