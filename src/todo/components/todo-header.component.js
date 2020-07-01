import { textNode, markup } from '../../../dist/sling.min';

class TodoHeaderComponent {

    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divTodoHeader'
            },
            children: [
                markup('h4', {
                    attrs: {
                        style: 'text-align:center;padding:1rem;font-family:Arial;line-height:58px;font-size:54px;font-weight:300;'
                    },
                    children: [
                        textNode('Todo App')
                    ]
                })
            ]
        });
    }
}

export default TodoHeaderComponent;
