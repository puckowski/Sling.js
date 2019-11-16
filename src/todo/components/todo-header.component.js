class TodoHeaderComponent {

    constructor() {
    }

    view() {
        return s.markup('div', {
            attrs: {
                
            },
            children: [
                s.markup('h4', {
                    attrs: {
                        style: 'text-align:center;padding:1rem;'
                    },
                    children: [
                        s.textNode('Todo App')
                    ]
                })
            ]
        });
    }
}

export default TodoHeaderComponent;