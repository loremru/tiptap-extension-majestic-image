# Image extension for tiptap & majestic-ui

[npm package](https://www.npmjs.com/package/tiptap-extension-majestic-image)

```ts
import tiptapImageExtension from 'tiptap-extension-majestic-image'

const editor = ref()

onMounted(() => {
	editor.value = new Editor({
		extensions: [
            tiptapImageExtension,
		]
	})	
})

const addImage = ({ path, id }: { path: string; id: number }) => {
	editor.value
		?.chain()
		.focus()
		.setImage({ src: path, id: `image-${id}` })
		.run()
}
```
