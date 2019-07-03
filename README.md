# img-opts

Sandbox for testing different types of images compression.

Run: `yarn start`.

To change test image, replace it in `src/assets` with the new one with the same name and re-run server.

To add new image, add new image to `src/assets`, to `src/assets/index.js` and to `dist/index.html`:
```
<h2>New cool image title</h2>
<div class="image_examples" id="new_cool_image_id"></div>
```

You can change compression settings in `webpack.config.js` separately for lossy and lossless previews.
