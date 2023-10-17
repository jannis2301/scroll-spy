import { ScrollSpy } from './ScrollSpy'

const bootstrapper = (): void => {
  new ScrollSpy()
}

window.addEventListener('load', bootstrapper)
