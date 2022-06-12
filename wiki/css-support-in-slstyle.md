Component scoped CSS with ```slStyle``` supports CSS Cascade Layers. Component scoped CSS with ```slStyle``` does not support the ```@import``` CSS at-rule.

```css
@layer layer-name {rules};
@layer layer-name;
@layer layer-name, layer-name, layer-name;
@layer {rules};
```

For more on CSS Cascade Layers, see the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).
