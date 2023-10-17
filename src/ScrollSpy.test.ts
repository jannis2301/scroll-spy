import { ScrollSpy } from './ScrollSpy'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('ScrollSpy', () => {
  let scrollSpy: ScrollSpy

  beforeEach(() => {
    const mockElement = document.createElement('div')
    mockElement.innerHTML = `
     <header class="header">
      <nav class="nav">
        <a class="active nav-link" href="#section-1">Section-1</a>
        <a class="nav-link" href="#section-2">Section-2</a>
        <a class="nav-link" href="#section-3">Section-3</a>
      </nav>
    </header>

    <section id="section-1" class="section">Section 1</section>
    <section id="section-2" class="section">Section 2</section>
    <section id="section-3" class="section">Section 3</section>
    `

    document.body.appendChild(mockElement)
    scrollSpy = new ScrollSpy()
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('throw', () => {
    it('should throw an error for an invalid selector', () => {
      const invalidSelector = '.noElement'
      expect(() => scrollSpy.throw(invalidSelector)).toThrowError(
        `Element with selector ${invalidSelector} is missing`
      )
    })
  })
})
