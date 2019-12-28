class TodoHeaderComponent {

    constructor() {
    }

    view() {
        return s.markup('div', {
            attrs: {
                id: 'divTodoHeader'
            },
            children: [
                s.markup('h4', {
                    attrs: {
                        style: 'text-align:center;padding:1rem;font-family:Arial;line-height:58px;font-size:54px;font-weight:300;'
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