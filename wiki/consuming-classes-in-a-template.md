Instead of specifying the hyperscript for a view, like as follows:

```javascript
view() {
  return markup('h1', {
      attrs: {
          id: 'id-header'
      }
  });
}
```

and instead of calling the view() method of a class to return hyperscript, like as follows:

```javascript
view() {
  return markup('tbody', {
      attrs: {
          id: 'id-header'
      },
      children: [
          new TestRow1(1, false, 'Blue', this.select, this.delete).view() // return class hyperscript
      ]    
  });
}
```

you can consume a class in a template in the following manner:

```javascript
export class TestControllerComponent1 {
  constructor() {

  }

  slOnInit() {
      this.data = function () { return Store.data; };
      this.selected = function () { return Store.selected; };
      this.run = function () {
          Store.run();
      };
      this.add = function () {
          Store.add();
      };
      this.update = function () {
          Store.update();
      };
      this.select = function (id) {
          Store.select(id);
      };
      this.delete = function (id) {
          Store.remove(id);
      };
      this.runLots = function () {
          Store.runLots();
      };
      this.clear = function () {
          Store.clear();
      };
      this.swapRows = function () {
          Store.swapRows();
      };
  }

  view() {
      return markup('div', {
          attrs: {
              'class': 'container',
              'id': 'main'
          },
          children: [
              markup('table', {
                  attrs: {
                      'class': 'table table-hover table-striped test-data',
                      'id': 'idcontrollertable'
                  },
                  children: [
                      markup('tbody', {
                          children: [
                              ...Array.from(this.data(), (d, i) => {
                                  let sel = d.id === this.selected() ? 'danger' : '';
                                  return new TestRow1(d.id, sel, d.label, this.select, this.delete) // class consumed
                              })
                          ]
                      })
                  ]
              })
          ]
      });
  }
}
```

Consuming a class has advantages over calling a classes view() function. 

Namely, lifecycle hooks for the class are called when appropriate whereas calling the view() function of a class circumvents lifecycle hooks.