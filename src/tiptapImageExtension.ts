import { Node } from '@tiptap/core'
import { VueNodeViewRenderer, mergeAttributes, nodeInputRule } from '@tiptap/vue-3'
import tiptapImage from './tiptapImage.vue'

export interface tiptapImageOptions {
  src: string | null
  title: string
  id: string | number | null
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { [key: string]: string }) => ReturnType
    }
  }
}

export default Node.create<tiptapImageOptions>({
  name: 'image',
  draggable: true,
  inline: false,
  group: 'block',
  marks: '',
  addAttributes() {
    return {
      src: {
        default: null,
      },
      title: {
        default: '',
      },
      id: {
        default: null,
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'img[src]:not([src^="data:"])',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { 'data-tiptap-image': '' },
      ['img', mergeAttributes(HTMLAttributes)],
      ['p', { class: 'tiptap-content__image' }, HTMLAttributes.title],
    ]
  },
  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent([
            {
              type: this.name,
              attrs: options,
            },
          ])
        },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(tiptapImage)
  },
})
