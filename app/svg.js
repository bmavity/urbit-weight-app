import { registerElement } from 'svelte-native/dom'
import { NativeViewElementNode } from "svelte-native/dom";
import { SVGImage, } from '@teammaestro/nativescript-svg'

export default class SvgImageElement extends NativeViewElementNode {
  constructor() {
    super('SvgImage', SVGImage);
  }

  static register() {
    registerElement('SvgImage', () => new SvgImageElement());
  }
}
