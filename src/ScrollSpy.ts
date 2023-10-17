export class ScrollSpy {
  private navLinks: NodeListOf<HTMLElement>
  private sections: NodeListOf<HTMLElement>

  constructor() {
    this.navLinks = this.getNavLinks()
    this.sections = this.getSections()

    this.hashHandler = this.hashHandler.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.init()
  }

  public throw(selector: string): never {
    throw new Error(`Element with selector ${selector} is missing`)
  }

  public getNavLinks(): NodeListOf<HTMLElement> {
    const navLinks = document.querySelectorAll<HTMLElement>('.nav-link')

    if (navLinks.length === 0) {
      this.throw('.nav-link')
    }
    return navLinks
  }

  public getSections(): NodeListOf<HTMLElement> {
    const sections = document.querySelectorAll<HTMLElement>('.section')

    if (sections.length === 0) {
      this.throw('.section')
    }
    return sections
  }

  private handleScroll(): void {
    const top = window.scrollY

    for (const section of this.sections) {
      const offset = section.offsetTop - 150
      const height = section.offsetHeight
      const id = section.getAttribute('id')

      if (top >= offset && top < offset + height) {
        for (const link of this.navLinks) {
          link.classList.remove('active')
          const navLinkId = link.getAttribute('href')?.substring(1)
          if (navLinkId === id) {
            link.classList.add('active')
          }
        }
      }
    }
  }

  private hashHandler(): void {
    //Hide the id in the url after a link click
    const location = window.location.hash.split('#')[1]
    window.history.pushState({}, 'Page Title', '/' + location)
  }

  private init(): void {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('hashchange', this.hashHandler, false)
  }
}
