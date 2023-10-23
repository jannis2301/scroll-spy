import { ScrollSpy } from './ScrollSpy'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import sinon from 'sinon'

const simulateClick = (element: HTMLElement) => {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  })
  element.dispatchEvent(event)
}

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

  it('should return the correct number of navigation links', () => {
    const navLinks = scrollSpy.getNavLinks()
    expect(navLinks.length).toEqual(3)
  })

  it('should return HTMLElements for navigation links', () => {
    const navLinks = scrollSpy.getNavLinks()
    navLinks.forEach((link) => {
      expect(link).toBeInstanceOf(HTMLElement)
    })
  })

  it('should return the correct number of sections', () => {
    const sections = scrollSpy.getSections()
    expect(sections.length).toEqual(3)
  })

  it('should return HTMLElements for sections', () => {
    const sections = scrollSpy.getSections()
    sections.forEach((section) => {
      expect(section).toBeInstanceOf(HTMLElement)
    })
  })

  it('should update window location hash correctly', async () => {
    const secondLink = document.querySelectorAll<HTMLElement>('.nav-link')[1]
    const locationHash = window.location.hash
    expect(locationHash).toEqual('')
    simulateClick(secondLink)

    new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(locationHash).toEqual('#')
        resolve()
      }, 100)
    })
  })

  it('should update active navigation link when a section intersects', () => {
    const secondLink = document.querySelectorAll<HTMLElement>('.nav-link')[1]
    const secondSection = document.querySelector<HTMLElement>('#section-2')
    const sections = document.querySelectorAll<HTMLElement>('.section')
    for (const section of sections) {
      section.style.height = '200'
    }

    // Mock Intersection Observer
    const observeMock = sinon
      .stub(window, 'IntersectionObserver')
      .callsFake((callback) => {
        callback([
          {
            isIntersecting: true,
            target: secondSection,
          },
        ])
        return { observe: () => {} }
      })

    // Create a custom scroll event
    const scrollEvent = new WheelEvent('wheel', {
      deltaY: 300,
    })
    window.dispatchEvent(scrollEvent)

    new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(secondLink?.classList.contains('active')).toBe(true)
        observeMock.restore()
        resolve()
      }, 100)
    })
  })
})
