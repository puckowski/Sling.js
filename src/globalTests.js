import { getRouteQueryVariables, setRouteStrategy, enableDetectOnThen, renderElementWithoutClass, renderElement, detectChanges, getState, m, markup, mount, route, setState, textNode, addRoute, getRouteParams, resolveAll, getRouteSegments, hydrate, renderToString, removeRoute, version, update, setDetectionStrategy, wrapWithChangeDetector, isDetectorAttached, detachDetector, getRoute } from "../dist_sling/sling.min";
import { BehaviorSubject, FormControl, Observable } from '../dist_sling/sling-reactive.min';
import { slGet } from '../dist_sling/sling-xhr.min';

class SqlHelpComponent {

    constructor() {
    }

    view() {

        let font = ' font: 400 20px Arial;';

        return markup('div', {
            attrs: {
                style: 'padding: 0.25rem; background-color: rgb(21, 24, 30); color: rgb(204, 204, 204); overflow: auto; height: calc(100% - 0.5rem); display: flex; flex-direction: column;'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: 'flex: 20; padding: 1rem;'
                    },
                    children: [
                        markup('h4', {
                            attrs: {
                                style: 'margin: 0px;'
                            },
                            children: [
                                textNode('Cloud SQLite Help')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('SQLite databases are temporary and are destroyed on browser tab refresh.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Export to export all SQLite database table, views, and table content.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Press Control/Command and J simultaneously to format your code. Press Control/Command and M simultaneously to run your code.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('The following page contains SQLite documentation: '),
                                markup('a', {
                                    attrs: {
                                        href: 'https://www.sqlite.org/docs.html'
                                    },
                                    children: [
                                        textNode('https://www.sqlite.org/docs.html')
                                    ]
                                })
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('To reset Cloud SQLite to original state, click the following button.'),
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('To switch between normal and low resolution mode, click the following toggle.'),
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('If you encounter any issues, please log an issue on GitHub: '),
                                markup('a', {
                                    attrs: {
                                        href: 'https://github.com/puckowski/Cloud-SQLite'
                                    },
                                    children: [
                                        textNode('https://github.com/puckowski/Cloud-SQLite')
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

class SqlPreviewComponent {

    constructor() {
        this.injectedList = '';
        this.isPreviewLoading = false;
    }

    slAfterInit() {
        const state = getState();
        if (state.afterinitsql2 === null || state.afterinitsql2 === undefined) {
            state.afterinitsql2 = 1;
        } else {
            state.afterinitsql2++;
        }
        setState(state);

    }

    slOnDestroy() {
        const state = getState();
        if (state.ondestroysql2 === null || state.ondestroysql2 === undefined) {
            state.ondestroysql2 = 1;
        } else {
            state.ondestroysql2++;
        }
        setState(state);
    }

    view() {
        const state = getState();

        let font = ' font: 400 20px Arial;';

        return markup('div', {
            attrs: {
                style: 'padding: 0.25rem; color: rgb(204, 204, 204); max-height: inherit; overflow: auto; display: flex; flex-direction: column; height: calc(100% - 0.5rem);'
            },
            children: [
                markup('h4', {
                    attrs: {
                        style: 'margin: 0px; flex-shrink: 1;'
                    },
                    children: [
                        ...(!this.isPreviewLoading ? textNode('Results') : []),
                        ...(this.isPreviewLoading ? textNode('Loading...') : [])
                    ]
                }),
                markup('iframe', {
                    attrs: {
                        frameborder: '0',
                        id: 'tryit-sling-iframe',
                        sldirective: 'onlyself',
                        style: 'background-color: #ffffff; width: 100%; flex: 15;'
                    }
                })
            ]
        });
    }
}

class SqlContentPanelComponent {

    constructor() {
        this.previewComp = new SqlPreviewComponent();
        this.sourceComp = new SqlSourcePanelComponent();
        this.helpComp = new SqlHelpComponent();
        this.showHelp = true;
        this.showPreview = false;
        this.collapsed = false;
        this.portrait = true;
    }

    view() {
        const heightStr = 'max-height: 480px; height: 480px;';
        const collapsedMode = this.collapsed;
        const showPreview = this.showPreview;
        const showHelp = this.showHelp;
        const portraitMode = this.portrait;

        let rootDisplayStyle = 'display: flex;';

        if (portraitMode) {
            rootDisplayStyle = 'display: block;'
        }

        return markup('div', {
            attrs: {
                id: 'divsqlcontentpanel'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: rootDisplayStyle + ' justify-content: flex-start;' + heightStr
                    },
                    children: [
                        ...(portraitMode === false ? [
                            ...(showHelp === false ? [
                                ...(collapsedMode === false ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 50%; max-height: inherit; height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.sourceComp
                                        ]
                                    }),
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 50%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.previewComp
                                        ]
                                    })
                                ] : []),
                                ...(collapsedMode === true ? [
                                    ...(showPreview === true ? [
                                        markup('div', {
                                            attrs: {
                                                style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                            },
                                            children: [
                                                this.previewComp
                                            ]
                                        })
                                    ] : []),
                                    ...(showPreview === false ? [
                                        markup('div', {
                                            attrs: {
                                                style: 'width: calc(100% - 0.5rem); max-height: inherit;  height: calc(200% - 1rem);'
                                            },
                                            children: [
                                                this.sourceComp
                                            ]
                                        })
                                    ] : []),
                                ] : [])
                            ] : [
                                markup('div', {
                                    attrs: {
                                        style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                    },
                                    children: [
                                        this.helpComp
                                    ]
                                })
                            ]),
                        ] : [
                            ...(showHelp === false ? [
                                ...(collapsedMode === false ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.sourceComp
                                        ]
                                    }),
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.previewComp
                                        ]
                                    })
                                ] : []),
                                ...(collapsedMode === true ? [
                                    ...(showPreview === true ? [
                                        markup('div', {
                                            attrs: {
                                                style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                            },
                                            children: [
                                                this.previewComp
                                            ]
                                        })
                                    ] : []),
                                    ...(showPreview === false ? [
                                        markup('div', {
                                            attrs: {
                                                style: 'width: calc(100% - 0.5rem); max-height: inherit;  height: calc(200% - 1rem);'
                                            },
                                            children: [
                                                this.sourceComp
                                            ]
                                        })
                                    ] : []),
                                ] : [])
                            ] : [
                                ...(collapsedMode === false && portraitMode === true ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.helpComp
                                        ]
                                    })
                                ] : []),
                                ...(collapsedMode === true ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.helpComp
                                        ]
                                    })
                                ] : []),
                                ...(collapsedMode === false && portraitMode === false ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.helpComp
                                        ]
                                    })
                                ] : []),
                            ]),
                        ])
                    ]
                })
            ]
        });
    }
}

class SqlSourcePanelComponent {

    constructor() {

    }

    slAfterInit() {
        const state = getState();
        if (state.afterinitsql1 === null || state.afterinitsql1 === undefined) {
            state.afterinitsql1 = 1;
        } else {
            state.afterinitsql1++;
        }
        setState(state);
    }

    slOnDestroy() {
        const state = getState();
        if (state.ondestroysql1 === null || state.ondestroysql1 === undefined) {
            state.ondestroysql1 = 1;
        } else {
            state.ondestroysql1++;
        }
        setState(state);
    }

    view() {
        let font = ' font: 400 20px Arial;';

        font += ' filter: brightness(190%);'

        return markup('div', {
            attrs: {
                style: 'padding: 0.25rem; background-color: rgb(21, 24, 30); color: rgb(204, 204, 204); height: calc(100% - 0.5rem); display: flex; flex-direction: column;'
            },
            children: [
                markup('h4', {
                    attrs: {
                        style: 'margin: 0px; flex-shrink: 1;'
                    },
                    children: [
                        textNode('Queries')
                    ]
                }),
                markup('div', {
                    attrs: {
                        style: 'width: 100%; background-color: rgb(0, 0, 0); border: none; color: rgb(204, 204, 204); flex: 19; white-space: pre; overflow: auto; padding: 0.25rem;' + font,
                        autocorrect: 'off',
                        autocomplete: 'off',
                        spellcheck: 'false',
                        id: 'tryit-sling-div',
                        sldirective: 'onlyself',
                        class: 'sql',
                        contenteditable: 'true'
                    }
                })
            ]
        });
    }
}


class HelpComponent {

    constructor() {
    }

    view() {
        let font = ' font: 400 13.3333px Arial;';

        return markup('div', {
            attrs: {
                style: 'padding: 0.25rem; background-color: rgb(21, 24, 30); color: rgb(204, 204, 204); overflow: auto; height: calc(100% - 0.5rem); display: flex; flex-direction: column;'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: 'flex: 20;'
                    },
                    children: [
                        markup('h4', {
                            attrs: {
                                style: 'margin: 0px;'
                            },
                            children: [
                                textNode('Code Editor Help')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Add File to add a new file. Toggle Inject Script to inject the file as a <script> tag in the <head> of the preview. Toggle Inject CSS to inject the file as a <style> tag in the <head> of the preview.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Expand and Shrink to change the size of the Code Editor.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Run to update the preview.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Export to export the preview page HTML.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Import File to import a file\'s contents into the source panel.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Import Workspace to import a previously exported HTML file. This may create multiple files.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Toggle Preview on small screens to toggle the preview.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Clear Console to clear the preview console.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Format Code to format the code in the file editor.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Toggle Mode to toggle collapsed editor mode.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Click Sling.js Demo to build a \'Hello, world!\' Sling.js project.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Press Control/Command and A or click on the suggested word popup to insert the suggested word.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Press Control/Command and J simultaneously to format your code. Press Control/Command and M simultaneously to run your code.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('The Share feature is limited to links that are 6,237 characters or less.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('A custom build of Less.js 4.1.3 is used that supports CSS Container Queries, Media Queries Level 4, and Cascading and Inheritance Level 6. '),
                                markup('a', {
                                    attrs: {
                                        href: 'https://github.com/puckowski/less.js'
                                    },
                                    children: [
                                        textNode('https://github.com/puckowski/less.js')
                                    ]
                                })
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Ness.js 1.5.0 supports SCSS-style CSS nesting, nested @media, and nested @layer queries. '),
                                markup('a', {
                                    attrs: {
                                        href: 'https://github.com/puckowski/Ness.js'
                                    },
                                    children: [
                                        textNode('https://github.com/puckowski/Ness.js')
                                    ]
                                })
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('To reset Code Editor to original state, click the following button.'),
                            ]
                        }),
                        markup('div', {
                            children: [
                                markup('button', {
                                    attrs: {
                                        style: 'background-color: rgba(255,255,255,0.3); border: none; color: rgb(204, 204, 204); align-self: center;' + font
                                    },
                                    children: [
                                        textNode('Reset')
                                    ]
                                })
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('To switch between normal and low resolution mode, click the following toggle.'),
                            ]
                        }),
                        markup('div', {
                            children: [
                                textNode('Low Resolution: '),
                                markup('input', {
                                    attrs: {
                                        id: 'low-resolution-checkbox',
                                        type: 'checkbox',
                                    }
                                })
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('If you encounter any issues, please log an issue on GitHub: '),
                                markup('a', {
                                    attrs: {
                                        href: 'https://github.com/puckowski/Tryit-Code-Editor'
                                    },
                                    children: [
                                        textNode('https://github.com/puckowski/Tryit-Code-Editor')
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

class FileTreeComponent {

    constructor() {
        this.editNameIndex = 0;
        this.editedFileName = 'edit';
    }

    applyCheckedValuesAfterRender() {
        const fileList = [{ index: 0, name: 'one', injectScript: false, injectCss: false }, { index: 1, name: 'two', injectScript: false, injectCss: false }];

        const divTreeElement = document.getElementById('div-file-tree');
        const checkboxElements = divTreeElement.querySelectorAll('input[type=checkbox]');

        for (let i = 0; i < checkboxElements.length; ++i) {
            const file = fileList[Math.floor(i / 2)];

            if (i % 2 === 0 && file.injectScript) {
                checkboxElements[i].checked = true;
            } else if (i % 2 !== 0 && file.injectCss) {
                checkboxElements[i].checked = true;
            } else {
                checkboxElements[i].checked = false;
            }
        }
    }

    view() {
        const fileList = [{ index: 0, name: 'one', injectScript: false, injectCss: false }, { index: 1, name: 'two', injectScript: false, injectCss: false }];
        const editIndex = 0;

        let font = ' font: 400 13.3333px Arial;';
        font += ' font-weight: 900;';

        setTimeout(() => {
            this.applyCheckedValuesAfterRender();
        }, 0);

        return markup('div', {
            attrs: {
                style: 'background-color: rgb(32, 35, 39); color: rgb(204, 204, 204); overflow: auto; max-height: inherit;' + font,
                id: 'div-file-tree'
            },
            children: [
                ...Array.from(fileList, (file, index) =>
                    markup('div', {
                        attrs: {
                            ...editIndex !== file.index && index % 2 === 0 && { style: 'padding: 0.5rem;' },
                            ...editIndex !== file.index && index % 2 !== 0 && { style: 'padding: 0.5rem; background-color: rgb(21, 24, 30);' },
                            ...editIndex === file.index && { style: 'padding: 0.5rem; background-color: rgb(60, 68, 83);' },
                        },
                        children: [
                            markup('button', {
                                attrs: {
                                    style: 'word-break: break-word; margin: 0 0.5rem 0.5rem 0; background-color: rgba(255,255,255,0.3); border: none; color: rgb(204, 204, 204);' + font,
                                },
                                children: [
                                    ...(file.index === this.editNameIndex ? [
                                        textNode('Save Name')
                                    ] : [
                                        textNode('Edit Name')
                                    ])
                                ],

                            }),
                            markup('button', {
                                attrs: {
                                    style: 'word-break: break-word; margin: 0 0.5rem 0.5rem 0; background-color: rgba(255,255,255,0.3); border: none; color: rgb(204, 204, 204);' + font,
                                },
                                children: [
                                    textNode('Remove File')
                                ],
                            }),
                            ...(file.index !== this.editNameIndex ? [
                                markup('div', {
                                    children: [
                                        ...(editIndex === file.index ? [
                                            markup('span', {
                                                attrs: {
                                                    style: 'word-break: break-word;'
                                                },
                                                children: [
                                                    textNode('File ' + (file.index + 1) + ': ' + file.name)
                                                ]
                                            })
                                        ] : [
                                            markup('div', {
                                                attrs: {
                                                    style: 'word-break: break-word;'
                                                },
                                                children: [
                                                    textNode('File ' + (file.index + 1) + ': ' + file.name)
                                                ]
                                            })
                                        ])
                                    ]
                                })
                            ] : []),
                            ...(file.index === this.editNameIndex ? [
                                markup('input', {
                                    attrs: {
                                        style: 'width: 100%; padding: 1px 2px;',
                                        value: this.editedFileName
                                    }
                                })
                            ] : []),
                            markup('div', {
                                children: [
                                    markup('span', {
                                        attrs: {
                                            style: 'margin-right: 0.25rem;'
                                        },
                                        children: [
                                            textNode('Inject Script')
                                        ]
                                    }),
                                    markup('input', {
                                        attrs: {
                                            id: 'file-inject-script-checkbox' + file.index,
                                            type: 'checkbox',
                                        }
                                    })
                                ]
                            }),
                            markup('div', {
                                children: [
                                    markup('span', {
                                        attrs: {
                                            style: 'margin-right: 0.25rem;'
                                        },
                                        children: [
                                            textNode('Inject CSS')
                                        ]
                                    }),
                                    markup('input', {
                                        attrs: {
                                            id: 'file-inject-css-checkbox' + file.index,
                                            type: 'checkbox',
                                        }
                                    })
                                ]
                            })
                        ]
                    })
                )
            ]
        });
    }
}

class ContentPanelComponent2 {

    constructor() {
        this.fileTreeComp = new FileTreeComponent();
        this.previewComp = new PreviewComponent();
        this.sourceComp = new SourcePanelComponent();
        this.helpComp = new HelpComponent();
    }

    view() {
        const state = getState();
        const collapsedMode = false;
        const showPreview = true;
        const showHelp = state.showTryItHelp;
        const portraitMode = false;
        const heightStr = 'max-height: 480px; height: 480px;';

        let rootDisplayStyle = 'display: flex;';
        let fileTreeStyle = 'width: 12%;';

        return markup('div', {
            attrs: {
                id: 'tryit-content-test1',
            },
            children: [
                markup('div', {
                    attrs: {
                        style: rootDisplayStyle + ' justify-content: flex-start;' + heightStr
                    },
                    children: [
                        markup('div', {
                            attrs: {
                                style: fileTreeStyle + ' min-width: 100px; max-height: inherit;'
                            },
                            children: [
                                this.fileTreeComp
                            ]
                        }),
                        ...(portraitMode === false ? [
                            ...(showHelp === false ? [
                                ...(collapsedMode === false ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 44%; max-height: inherit; height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.sourceComp
                                        ]
                                    }),
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 44%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.previewComp
                                        ]
                                    })
                                ] : []),
                                ...(collapsedMode === true ? [
                                    ...(showPreview === true ? [
                                        markup('div', {
                                            attrs: {
                                                style: 'width: calc(100% - max(12%, 100px)); max-height: inherit;  height: calc(200% - 1rem);'
                                            },
                                            children: [
                                                this.previewComp
                                            ]
                                        })
                                    ] : []),
                                    ...(showPreview === false ? [
                                        markup('div', {
                                            attrs: {
                                                style: 'width: calc(100% - max(12%, 100px) - 0.5rem); max-height: inherit;  height: calc(200% - 1rem);'
                                            },
                                            children: [
                                                this.sourceComp
                                            ]
                                        })
                                    ] : []),
                                ] : [])
                            ] : [
                                markup('div', {
                                    attrs: {
                                        style: 'width: calc(100% - max(12%, 100px)); max-height: inherit;  height: calc(200% - 1rem);'
                                    },
                                    children: [
                                        this.helpComp
                                    ]
                                })
                            ]),
                        ] : [
                            ...(showHelp === false ? [
                                ...(collapsedMode === false ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.sourceComp
                                        ]
                                    }),
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.previewComp
                                        ]
                                    })
                                ] : []),
                                ...(collapsedMode === true ? [
                                    ...(showPreview === true ? [
                                        markup('div', {
                                            attrs: {
                                                style: 'width: calc(100% - max(12%, 100px)); max-height: inherit;  height: calc(200% - 1rem);'
                                            },
                                            children: [
                                                this.previewComp
                                            ]
                                        })
                                    ] : []),
                                    ...(showPreview === false ? [
                                        markup('div', {
                                            attrs: {
                                                style: 'width: calc(100% - max(12%, 100px) - 0.5rem); max-height: inherit;  height: calc(200% - 1rem);'
                                            },
                                            children: [
                                                this.sourceComp
                                            ]
                                        })
                                    ] : []),
                                ] : [])
                            ] : [
                                ...(collapsedMode === false && portraitMode === true ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.helpComp
                                        ]
                                    })
                                ] : []),
                                ...(collapsedMode === true ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: 100%; max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.helpComp
                                        ]
                                    })
                                ] : []),
                                ...(collapsedMode === false && portraitMode === false ? [
                                    markup('div', {
                                        attrs: {
                                            style: 'width: calc(100% - max(12%, 100px)); max-height: inherit;  height: calc(200% - 1rem);'
                                        },
                                        children: [
                                            this.helpComp
                                        ]
                                    })
                                ] : []),
                            ]),
                        ])
                    ]
                })
            ]
        });
    }
}

class AfterInitCalledForRecycled1 {
    constructor() {
        this.toggle = true;
        this.comp1 = new AfterInitCalledForRecycled2();
        this.comp2 = new AfterInitCalledForRecycled3();
        this.comp3 = new AfterInitCalledForRecycled4();
    }

    slOnInit() {
        const state = getState();
        if (!state.recycle6) {
            state.recycle6 = 0;
        }
        state.recycle6++;
        setState(state);
    }

    flip() {
        this.toggle = !this.toggle;
    }

    view() {
        return markup("div", {
            attrs: {
                id: "divafterinitrecycle1"
            },
            children: [
                ...(this.toggle === true ? [this.comp1, this.comp2] : [this.comp3]),
                markup('button', {
                    attrs: {
                        id: 'btn-after-recycle-test-1',
                        onclick: this.flip.bind(this)
                    },
                    children: [
                        textNode('Test after recycle')
                    ]
                })
            ]
        });
    }
}

class AfterInitCalledForRecycled2 {
    slAfterInit() {
        const state = getState();
        if (!state.recycle3) {
            state.recycle3 = 0;
        }
        state.recycle3++;
        setState(state);
    }

    view() {
        return markup("div", {
            children: [
                markup('aside', {
                    children: [
                        textNode('Test recycling lifecycle hooks in aside.')
                    ]
                })
            ]
        });
    }
}

class AfterInitCalledForRecycled3 {
    slOnInit() {
        const state = getState();
        if (!state.recycle5) {
            state.recycle5 = 0;
        }
        state.recycle5++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        if (!state.recycle4) {
            state.recycle4 = 0;
        }
        state.recycle4++;
        setState(state);
    }

    view() {
        return markup("div", {
            children: [
                markup('p', {
                    children: [
                        textNode('Test recycling lifecycle hooks in p.')
                    ]
                })
            ]
        });
    }
}

class AfterInitCalledForRecycled4 {
    view() {
        return markup("div", {
            children: [
                markup('span', {
                    children: [
                        textNode('Test recycling lifecycle hooks in span.')
                    ]
                })
            ]
        });
    }
}

class OnDestroyCalledForRecycled1 {
    constructor() {
        this.toggle = true;
        this.comp1 = new OnDestroyCalledForRecycled2();
        this.comp2 = new OnDestroyCalledForRecycled3();
        this.comp3 = new OnDestroyCalledForRecycled4();
    }

    flip() {
        this.toggle = !this.toggle;
    }

    view() {
        return markup("div", {
            attrs: {
                id: "divondestroyrecycle1"
            },
            children: [
                ...(this.toggle === true ? [this.comp1, this.comp2] : [this.comp3]),
                markup('button', {
                    attrs: {
                        id: 'btn-recycle-test-1',
                        onclick: this.flip.bind(this)
                    },
                    children: [
                        textNode('Test recycle')
                    ]
                })
            ]
        });
    }
}

class OnDestroyCalledForRecycled2 {
    slOnDestroy() {
        const state = getState();
        if (!state.recycle1) {
            state.recycle1 = 0;
        }
        state.recycle1++;
        setState(state);
    }

    view() {
        return markup("div", {
            children: [
                markup('aside', {
                    children: [
                        textNode('Test recycling lifecycle hooks in aside.')
                    ]
                })
            ]
        });
    }
}

class OnDestroyCalledForRecycled3 {
    slOnDestroy() {
        const state = getState();
        if (!state.recycle2) {
            state.recycle2 = 0;
        }
        state.recycle2++;
        setState(state);
    }

    view() {
        return markup("div", {
            children: [
                markup('p', {
                    children: [
                        textNode('Test recycling lifecycle hooks in p.')
                    ]
                })
            ]
        });
    }
}

class OnDestroyCalledForRecycled4 {
    view() {
        return markup("div", {
            children: [
                markup('span', {
                    children: [
                        textNode('Test recycling lifecycle hooks in span.')
                    ]
                })
            ]
        });
    }
}

class TestSvgComponent1 {
    view() {
        return markup("div", {
            attrs: {
                id: "divsvgtest1"
            },
            children: [
                markup("div", {
                    attrs: {
                        class: "header"
                    },
                    children: [
                        markup("div", {
                            attrs: {
                                class: "inner-header flex"
                            },
                            children: [
                                markup("svg", {
                                    attrs: {
                                        slns: 'http://www.w3.org/2000/svg',
                                        version: "1.1",
                                        class: "logo",
                                        "baseProfile": "tiny",
                                        id: "Layer_1",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        "x": "0px", "y": "0px",
                                        "viewBox": "0 0 500 500",
                                        "xml:space": "preserve",
                                        id: 'svg-test-1'
                                    },
                                    children: [
                                        markup("path", {
                                            attrs: {
                                                slns: 'http://www.w3.org/2000/svg',
                                                fill: "#FFFFFF",
                                                stroke: "#000000",
                                                "stroke-width": "10",
                                                "stroke-miterlimit": "10",
                                                d: "M57,283"
                                            }
                                        }),
                                        markup("g", {
                                            attrs: {
                                                slns: 'http://www.w3.org/2000/svg',

                                            },
                                            children: [
                                                markup("path", {
                                                    attrs: {
                                                        slns: 'http://www.w3.org/2000/svg',
                                                        fill: "#fff",
                                                        d:
                                                            "M250.4,0.8C112.7,0.8,1,112.4,1,250.2c0,137.7,111.7,249.4,249.4,249.4c137.7,0,249.4-111.7,249.4-249.4 C499.8,112.4,388.1,0.8,250.4,0.8z M383.8,326.3c-62,0-101.4-14.1-117.6-46.3c-17.1-34.1-2.3-75.4,13.2-104.1 c-22.4,3-38.4,9.2-47.8,18.3c-11.2,10.9-13.6,26.7-16.3,45c-3.1,20.8-6.6,44.4-25.3,62.4c-19.8,19.1-51.6,26.9-100.2,24.6l1.8-39.7		c35.9,1.6,59.7-2.9,70.8-13.6c8.9-8.6,11.1-22.9,13.5-39.6c6.3-42,14.8-99.4,141.4-99.4h41L333,166c-12.6,16-45.4,68.2-31.2,96.2 c9.2,18.3,41.5,25.6,91.2,24.2l1.1,39.8C390.5,326.2,387.1,326.3,383.8,326.3z"
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                markup("h1", {
                                    children: [textNode("Simple CSS Waves")]
                                })
                            ]
                        }),
                        markup("div", {
                            children: [
                                markup("svg", {
                                    attrs: {
                                        slns: 'http://www.w3.org/2000/svg',
                                        class: "waves",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                        "viewBox": "0 24 150 28",
                                        "preserveAspectRatio": "none",
                                        "shape-rendering": "auto",
                                        id: "svg-with-link-1"
                                    },
                                    children: [
                                        markup("defs", {
                                            attrs: {
                                                slns: 'http://www.w3.org/2000/svg'
                                            },
                                            children: [
                                                markup("path", {
                                                    attrs: {
                                                        slns: 'http://www.w3.org/2000/svg',
                                                        id: "gentle-wave",
                                                        d:
                                                            "M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                                                    }
                                                })
                                            ]
                                        }),
                                        markup("g", {
                                            attrs: {
                                                slns: 'http://www.w3.org/2000/svg',
                                                class: "parallax",
                                                id: 'g-use-1'
                                            },
                                            children: [
                                                markup("use", {
                                                    attrs: {
                                                        slns: 'http://www.w3.org/2000/svg',
                                                        slnsfor: '{ "xlink:href": { "namespace": "http://www.w3.org/1999/xlink", "value": "#gentle-wave" } }',
                                                        x: "48",
                                                        y: "0",
                                                        fill: "rgba(255,255,255,0.7)",
                                                        id: 'use-test-1'
                                                    }
                                                }),
                                                markup("use", {
                                                    attrs: {
                                                        slns: 'http://www.w3.org/2000/svg',
                                                        slnsfor: '{ "xlink:href": { "namespace": "http://www.w3.org/1999/xlink", "value": "#gentle-wave" } }',
                                                        x: "48",
                                                        y: "3",
                                                        fill: "rgba(255,255,255,0.5)"
                                                    }
                                                }),
                                                markup("use", {
                                                    attrs: {
                                                        slns: 'http://www.w3.org/2000/svg',
                                                        slnsfor: '{ "xlink:href": { "namespace": "http://www.w3.org/1999/xlink", "value": "#gentle-wave" } }',
                                                        x: "48",
                                                        y: "5",
                                                        fill: "rgba(255,255,255,0.3)"
                                                    }
                                                }),
                                                markup("use", {
                                                    attrs: {
                                                        slns: 'http://www.w3.org/2000/svg',
                                                        slnsfor: '{ "xlink:href": { "namespace": "http://www.w3.org/1999/xlink", "value": "#gentle-wave" } }',
                                                        x: "48",
                                                        y: "7",
                                                        fill: "#fff"
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
            ]
        });
    }
}

function _random(max, idx) {
    return Math.round((idx / 100) * 1000) % max;
}

var Store = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 10) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(10));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store2 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 10) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(10));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store3 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 8) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(8));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store4 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 8) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(8));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store5 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 8) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(8));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store6 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 10) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(10));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

class HelloWorldComponentAnimate {
    constructor() {
        this.welcomeHidden = false;
    }

    hideWelcome() {
        this.welcomeHidden = true;
    }

    showWelcome() {
        this.welcomeHidden = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divRouterOutletAnim',
                ...this.welcomeHidden !== true && { class: 'visible' },
                style: 'display: flex; justify-content: center; align-items: center; height: 100%;'
            },
            children: [
                ...(this.welcomeHidden === false ? [
                    markup('h1', {
                        attrs: {
                            slanimatedestroy: 'hide',
                        },
                        children: [
                            textNode('Hello, world!'),
                            markup('button', {
                                attrs: {
                                    onclick: this.hideWelcome.bind(this),
                                    id: 'btnanim1'
                                },
                                children: [
                                    textNode('Hide')
                                ]
                            })
                        ]
                    })
                ] : [
                    markup('button', {
                        attrs: {
                            onclick: this.showWelcome.bind(this),
                            id: 'btnanim2'
                        },
                        children: [
                            textNode('Show')
                        ]
                    })
                ])
            ]

        });
    }
}

class TestTerserMarkupOverloadComponent {
    view() {
        return m("div", {
            id: "divtersermarkup1"
        },
            [
                m("span", { style: 'color: blue;' }, [textNode('Blue text.')]),
                textNode('Regular text.')
            ]
        );
    }
}

class TestAttributeUserProfileComponent {
    constructor() {
        this.id = "Unknown";
    }

    slOnInit() {
        this.id = getRouteSegments()[1];
    }

    view() {
        return markup("div", {
            attrs: {
                id: "divTestAttr1"
            },
            children: [textNode("Your user ID: " + this.id)]
        });
    }
}

class TestAttributeDefaultRouteComponent {
    slDetachedOnNodeDestroy(node) {
        return node;
    }

    view() {
        return markup("div", {
            attrs: {
                id: "divTestAttr1",
                class: "visible",
                slanimatedestroy: "hide",
                slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this)
            },
            children: [
                markup("div", {
                    children: [textNode("Default route.")]
                })
            ]
        });
    }
}

class TestDestroyAnimateComponent1 {
    constructor() {
        this.hide = false;
        this.showhide = false;
    }

    slOnInit() {
    }

    slOnDestroy() {
        this.hide = true;
    }

    hidetemplate() {
        this.showhide = true;
        this.hide = true;
        const state = getState();
        state.animatecdr = 0;
        setState(state);
    }

    rehidetemplate() {
        this.hide = false;
        this.showhide = false;
    }

    view() {
        const state = getState();

        if (state.animatecdr !== null && state.animatecdr !== undefined) {
            state.animatecdr++;
            setState(state);
        }

        const mark = markup('div', {
            attrs: {
                id: 'divanimatedestroy',
                ...this.showhide !== true && { class: 'visible' }
            },
            children: [
                ...(this.hide === false ? [
                    markup('h1', {
                        attrs: {
                            id: 'h1toanimate',
                            slanimatedestroy: 'hide'
                        },
                        children: [
                            textNode('Hello, world!'),
                            markup('button', {
                                attrs: {
                                    id: 'startanimatedestroy',
                                    onclick: this.hidetemplate.bind(this)
                                },
                                children: [
                                    textNode('hide')
                                ]
                            })
                        ]
                    })

                ] : [
                    markup('button', {
                        attrs: {
                            onclick: this.rehidetemplate.bind(this)
                        },
                        children: [
                            textNode('rehide')
                        ]
                    })
                ])
            ]
        });

        return mark;
    }
}

export class TimeoutTestComponent1 {

    constructor() {
        this.count = 0;
    }

    slOnInit() {
        const state = getState();
        state.timeoutcdr = 0;
        setState(state);
    }

    view() {
        const state = getState();
        state.timeoutcdr++;
        setState(state);

        this.count++;

        return markup('div', {
            attrs: {
                id: 'divtimeoutcdr'
            },
            children: [
                textNode('Timeout Component View Count: ' + this.count)
            ]
        });
    }
}

export class AnimateKeyframesComponent1 {

    slStyle() {
        return `
        @keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
             }
        }
        button {
            background-color: #cacaca;
            animation: fadeInAnimation 1s;
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'animatekeyframesdiv1'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class AnimateKeyframesComponent2 {

    slStyle() {
        return `
        @keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
             }
        }
        button {
            background-color: #cacaca;
            animation: fadeInAnimation 1s;
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'animatekeyframesdiv2'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class AnimateKeyframesComponent3 {

    slStyle() {
        return `
        @keyframes fadeInAnimate {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
             }
        }
        button {
            background-color: #cacaca;
            animation: fadeInAnimate 1s;
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'animatekeyframesdiv3'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class AnimateKeyframesComponent4 {

    slStyle() {
        return `
        button {
            background-color: #cacaca;
        }
        @keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }}
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'animatekeyframesdiv4'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class AnimateKeyframesComponent5 {

    slStyle() {
        return `
        button {
            background-color: #cacaca;
        }
        @keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }}

            nav {
                background-color: #cacaca;
            }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'animatekeyframesdiv5'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello,')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode(' world!')
                    ]
                })
            ]
        })
    }
}

export class AnimateKeyframesComponent6 {

    slStyle() {
        return `
        @keyframes fadeInAnimate {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
             }
        }
        button {
            animation-name: fadeInAnimate;
            animation-duration: 1s;
            background-color: #cacaca;
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'animatekeyframesdiv6'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class TestRefComponent1 {

    constructor() {
        this.ref1 = null;
    }

    slAfterInit() {
        const state = getState();
        state.ref1 = this.ref1 !== null && this.ref1 !== undefined && this.ref1.id === 'divtestrefcomp1';
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divtestrefcomp1',
                slref: 'ref1'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class AtRuleMediaComponent1 {

    slStyle() {
        return `
        button {
            background-color: #cacaca;
        }

        @media (min-width: 1em), (min-height: 1em) {
            @media only screen and (min-resolution: 10dpi) {
                nav {
                    color: blue;
                }
                h5 {
                    color: blue;
                }
            }
        }

        nav {
            background-color: #cacaca;
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divatrulemedia1'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello,')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode(' world!')
                    ]
                }),
                markup('h5', {
                    children: [
                        textNode('A header.')
                    ]
                })
            ]
        })
    }
}

export class AtRuleMediaComponent2 {

    slStyle() {
        return `
        button {
            background-color: #cacaca;
        }

        @media (min-width: 1em), (min-height: 1em) {
            @media only screen and (min-resolution: 10dpi) {
                nav {
                    color: blue;
                }
                h5 {
                    color: blue;
                }
                @media (min-width: 2em) { 
                    h4 { color: blue; }
                } 
            }
        }

        nav {
            background-color: #cacaca;
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divatrulemedia2'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello,')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode(' world!')
                    ]
                }),
                markup('h5', {
                    children: [
                        textNode('A header.')
                    ]
                }),
                markup('h4', {
                    children: [
                        textNode('A header again.')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent1 {

    slStyle() {
        return `
        .foo {
            color: blue;
            & > .bar { color: red; }
            > .baz { color: green; }
          }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest1'
            },
            children: [
                markup('div', {
                    attrs: {
                        "class": "foo"
                    },
                    children: [
                        markup('div', {
                            attrs: {
                                "class": "baz"
                            },
                            children: [
                                textNode('Hello, world!')
                            ]
                        }),
                        markup('div', {
                            attrs: {
                                "class": "bar"
                            },
                            children: [
                                textNode('Hello, world!')
                            ]
                        }),
                    ]
                }),
            ]
        })
    }
}

export class CssNestingTestComponent2 {

    slStyle() {
        return `
        @layer images {
            .responsive-image {
              max-inline-size: 50ch;
              aspect-ratio: 16/9;
              
              > img {
                max-inline-size: 100%;
                block-size: 100%;
                object-fit: cover;
                object-position: bottom;
              }
              
              > figcaption {
                text-align: center;
                padding-block: 1ch;
              }
            }
          }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest2'
            },
            children: [
                markup('figure', {
                    attrs: {
                        "class": "responsive-image"
                    },
                    children: [
                        markup('img', {
                            attrs: {
                                "height": "192",
                                "width": "320",
                                "src": "https://www.oubliette3d.com/assets/images/screens/title_screen.png",
                                "alt": "An epic fantasy 2.5D RPG reviving the atmosphere of classic dungeons."
                            }
                        }),
                        markup('div', {
                            children: [
                                textNode('Hello, world!')
                            ]
                        }),
                    ]
                }),
            ]
        })
    }
}

export class CssNestingTestComponent3 {

    slStyle() {
        return `
        @layer demo, images, cards;

        @layer cards {
            display: grid;
            background: oklch(50% none none / 20%);
            border-radius: 10px;
            border: 1px solid oklch(50% none none / 20%);
              
            @media (prefers-color-scheme: light) {
                background: white;
                box-shadow: 0 30px 10px -20px oklch(0% none none / 25%);
            }
        
            > header {
                display: grid !important;
                gap: .5ch;
                padding: 2ch;
            }
        
            > article {
                max-inline-size: 50ch;
                line-height: 1.5;
                padding: 2ch 2ch 1ch;
            }
        
            > footer {
                display: flex;
                justify-content: flex-end;
                padding: 1ch 2ch;
                gap: 1ch;
            }
        }
        
        @layer images {
          .responsive-image {
            max-inline-size: 50ch;
            aspect-ratio: 16/9;
            
            > img {
              max-inline-size: 100%;
              block-size: 100%;
              object-fit: cover;
              object-position: bottom;
            }
            
            > figcaption {
              text-align: center;
              padding-block: 1ch;
            }
          }
        }
        
        @layer demo.support {
          * {
            box-sizing: border-box;
            margin: 0;
          }
        
          nav {
            block-size: 100%;
            color-scheme: dark light;
            
            @media (prefers-color-scheme: light) {
              background: #ccc;
            }
          }
        
          figure {
            min-block-size: 100%;
            font-family: system-ui, sans-serif;
        
            display: grid !important;
            place-content: center;
            place-items: center;
          }
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest3'
            },
            children: [
                markup('figure', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('header', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent4 {

    slStyle() {
        return `
        span {
            color: blue;
        }

        @layer demo, images, cards;

        nav {
            a {
                color: blue;
            }
        }

        @layer cards {
            display: grid;
            background: oklch(50% none none / 20%);
            border-radius: 10px;
            border: 1px solid oklch(50% none none / 20%);
              
            @media (prefers-color-scheme: light) {
                background: white;
                box-shadow: 0 30px 10px -20px oklch(0% none none / 25%);
            }
        
            > header {
                display: grid !important;
                gap: .5ch;
                padding: 2ch;
            }
        
            > article {
                max-inline-size: 50ch;
                line-height: 1.5;
                padding: 2ch 2ch 1ch;
            }
        
            > footer {
                display: flex;
                justify-content: flex-end;
                padding: 1ch 2ch;
                gap: 1ch;
            }
        }
        
        @layer images {
          .responsive-image {
            max-inline-size: 50ch;
            aspect-ratio: 16/9;
            
            > img {
              max-inline-size: 100%;
              block-size: 100%;
              object-fit: cover;
              object-position: bottom;
            }
            
            > figcaption {
              text-align: center;
              padding-block: 1ch;
            }
          }
        }
        
        @layer demo.support {
          * {
            box-sizing: border-box;
            margin: 0;
          }
        
          nav {
            block-size: 100%;
            color-scheme: dark light;
            
            @media (prefers-color-scheme: light) {
              background: #ccc;
            }
          }
        
          figure {
            min-block-size: 100%;
            font-family: system-ui, sans-serif;
        
            display: grid !important;
            place-content: center;
            place-items: center;
          }

          @nest .dark & {
            color: blue;
          }
        }

        img {
            width: 128px;
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest4'
            },
            children: [
                markup('figure', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('header', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('img', {
                    attrs: {
                        "height": "192",
                        "src": "https://www.oubliette3d.com/assets/images/screens/title_screen.png",
                        "alt": "An epic fantasy 2.5D RPG reviving the atmosphere of classic dungeons."
                    }
                }),
            ]
        })
    }
}

export class CssNestingTestComponent5 {

    slStyle() {
        return `
        span {
            color: blue;
        }

        @layer demo, images, cards;

        nav {
            a {
                color: blue;
            }
        }

        @layer cards {
            display: grid;
            background: oklch(50% none none / 20%);
            border-radius: 10px;
            border: 1px solid oklch(50% none none / 20%);
              
            @media (prefers-color-scheme: light) {
                background: white;
                box-shadow: 0 30px 10px -20px oklch(0% none none / 25%);
            }
        
            > header {
                display: grid !important;
                gap: .5ch;
                padding: 2ch;
            }
        
            > article {
                max-inline-size: 50ch;
                line-height: 1.5;
                padding: 2ch 2ch 1ch;
            }
        
            > footer {
                display: flex;
                justify-content: flex-end;
                padding: 1ch 2ch;
                gap: 1ch;
            }
        }
        
        @layer images {
          .responsive-image {
            max-inline-size: 50ch;
            aspect-ratio: 16/9;
            
            > img {
              max-inline-size: 100%;
              block-size: 100%;
              object-fit: cover;
              object-position: bottom;
            }
            
            > figcaption {
              text-align: center;
              padding-block: 1ch;
            }
          }
        }
        
        @layer demo.support {
          * {
            box-sizing: border-box;
            margin: 0;
          }
        
          nav {
            block-size: 100%;
            color-scheme: dark light;
            
            @media (prefers-color-scheme: light) {
              background: #ccc;
            }
          }
        
          figure {
            min-block-size: 100%;
            font-family: system-ui, sans-serif;
        
            display: grid !important;
            place-content: center;
            place-items: center;
          }

          @nest .dark & {
            color: blue;
          }

          img {
            width: 196px;
          }
        }

        img {
            width: 128px;
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest5'
            },
            children: [
                markup('figure', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('header', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('img', {
                    attrs: {
                        "height": "192",
                        "src": "https://www.oubliette3d.com/assets/images/screens/title_screen.png",
                        "alt": "An epic fantasy 2.5D RPG reviving the atmosphere of classic dungeons."
                    }
                }),
            ]
        })
    }
}

export class CssNestingTestComponent6 {

    slStyle() {
        return `
        span {
            color: blue;
        }

        @layer demo, images, cards;

        nav {
            > a, > h4, > h5 {
                color: blue;
            }
        }

        @layer cards {
            display: grid;
            background: oklch(50% none none / 20%);
            border-radius: 10px;
            border: 1px solid oklch(50% none none / 20%);
              
            @media (prefers-color-scheme: light) {
                background: white;
                box-shadow: 0 30px 10px -20px oklch(0% none none / 25%);
            }
        
            > header {
                display: grid !important;
                gap: .5ch;
                padding: 2ch;
            }
        
            > article, ul, li {
                max-inline-size: 50ch;
                line-height: 1.5;
                padding: 2ch 2ch 1ch;
            }
        
            > footer {
                display: flex;
                justify-content: flex-end;
                padding: 1ch 2ch;
                gap: 1ch;
            }
        }
        
        @layer images {
          .responsive-image {
            max-inline-size: 50ch;
            aspect-ratio: 16/9;
            
            > img {
              max-inline-size: 100%;
              block-size: 100%;
              object-fit: cover;
              object-position: bottom;
            }
            
            > figcaption {
              text-align: center;
              padding-block: 1ch;
            }
          }
        }
        
        @layer demo.support {
          * {
            box-sizing: border-box;
            margin: 0;
          }
        
          nav {
            block-size: 100%;
            color-scheme: dark light;
            
            @media (prefers-color-scheme: light) {
              background: #ccc;
            }
          }
        
          figure, aside {
            min-block-size: 100%;
            font-family: system-ui, sans-serif;
        
            display: grid !important;
            place-content: center;
            place-items: center;
          }

          @nest .dark &, article & {
            color: blue;
          }

          img, blockquote {
            width: 196px;
          }
        }

        img {
            width: 128px;
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest6'
            },
            children: [
                markup('figure', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('header', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('img', {
                    attrs: {
                        "height": "192",
                        "src": "https://www.oubliette3d.com/assets/images/screens/title_screen.png",
                        "alt": "An epic fantasy 2.5D RPG reviving the atmosphere of classic dungeons."
                    }
                }),
            ]
        })
    }
}

export class CssNestingTestComponent7 {

    slStyle() {
        return `
        nav {
            > a, > h4, > h5 {
                color: blue;
            }

            @layer bluetheme {
                h3 {
                    color: blue;
                }
            }
            
            @container (min-width: 100px) { 
                nav { 
                    background-color: #cacaca; 
                } 
            }

            @media (prefers-color-scheme: light) {
                background: #ccc;
            }

            @scope (.media-object) {
                .author-image { border-radius: 50%; }
            }

            @scope (.media-object) to (.content > *) {
                img { border-radius: 50%; }
                .content { padding: 1em; }
            }
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest7'
            },
            children: [
                markup('h4', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('header', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('nav', {
                    children: [
                        markup('h4', {
                            children: [
                                textNode('Hello, world!')
                            ]
                        }),
                    ]
                }),
            ]
        })
    }
}

export class CssNestingTestComponent9 {

    slStyle() {
        return `
        a, h4, h5 {
            color: blue;
        }

        @layer bluetheme {
            h3 {
                color: blue;
            }
        }
            
        @container (min-width: 100px) { 
            nav { 
                background-color: #cacaca; 
            } 
        }

        @media (prefers-color-scheme: light) {
            background: #ccc;
        }

        @media (min-width: 1em), (min-height: 1em) {
            nav {
                color: blue;
            }
            h5 {
                color: blue;
            }
            @media (min-width: 2em) { 
                h4 { color: blue; }
            } 
        }

        @scope (.media-object) {
            .author-image { border-radius: 50%; }
        }

        @scope (.media-object) to (.content > *) {
            img { border-radius: 50%; }
            .content { padding: 1em; }
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest9'
            },
            children: [
                markup('h4', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('header', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('nav', {
                    children: [
                        markup('h4', {
                            children: [
                                textNode('Hello, world!')
                            ]
                        }),
                    ]
                }),
            ]
        })
    }
}

export class CssNestingTestComponent10 {

    slStyle() {
        return `
        nav {
            @scope (.media-object) {
                .author-image { border-radius: 50%; }
            }

            @scope (.media-object) to (.content > *) {
                .author-image { color: blue; }
            }
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest10'
            },
            children: [
                markup('nav', {
                    children: [
                        markup('div', {
                            attrs: {
                                "class": "media-object"
                            },
                            children: [
                                markup('button', {
                                    attrs: {
                                        "class": "author-image"
                                    },
                                    children: [
                                        textNode('Hello, world!')
                                    ]
                                })
                            ]
                        }),
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent12 {

    slStyle() {
        return `
            @media ((1em < width) or (1em < height)) and (not (pointer: none)) {
                h5 {
                    color: blue;
                }
            }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest12'
            },
            children: [
                markup('h5', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent13 {

    slStyle() {
        return `
            figure, h4 {
                color: blue;
            }

            @media ((1em < width) or (1em < height)) and (not (pointer: none)) {
                h5 {
                    color: blue;
                }
            }

            nav {
                color: blue;
            }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest13'
            },
            children: [
                markup('h5', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('h4', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent14 {

    slStyle() {
        return `
            figure, h4 {
                nav {
                    color: red;
                }

                color: blue;
            }

            @media ((1em < width) or (1em < height)) and (not (pointer: none)) {
                h5 {
                    color: blue;
                }
            }

            nav {
                color: blue;

                a, span {
                    color: red;
                }
            }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest14'
            },
            children: [
                markup('h5', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('h4', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent15 {

    slStyle() {
        return `
            h4 {
                nav {
                    color: red;
                }

                color: blue;
            }

            @media ((1em < width) or (1em < height)) and (not (pointer: none)) {
                h5 {
                    color: blue;
                }
            }

            nav {
                color: blue;

                span {
                    color: red;
                }
            }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest15'
            },
            children: [
                markup('h5', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('h4', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent16 {

    slStyle() {
        return `
            h4 {
                nav {
                    color: red;
                }

                color: blue;
            }

            @media ((1em < width) or (1em < height)) and (not (pointer: none)) {
                h5 {
                    color: blue;
                }
            }

            nav, a {
                color: blue;

                span {
                    color: red;
                }
            }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest16'
            },
            children: [
                markup('h5', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('h4', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent11 {

    slStyle() {
        return `
            nav:dir(ltr) {
                @media (400px <= width < 900px) {
                    h4 {
                        color: blue;
                    }
                }
            }

            @media (400px <= width < 900px) {
                h5 {
                    color: blue;
                }
            }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest11'
            },
            children: [
                markup('nav', {
                    children: [
                        markup('h4', {
                            children: [
                                textNode('Hello, world!')
                            ]
                        })
                    ]
                }),
                markup('h5', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent17 {

    slStyle() {
        return `
            nav:dir(ltr) {
                @media (400px <= width < 900px) {
                    h4, figure {
                        color: blue;
                    }
                }
            }

            @media (400px <= width < 900px) {
                h5, span {
                    color: blue;
                }
            }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest17'
            },
            children: [
                markup('nav', {
                    children: [
                        markup('h4', {
                            children: [
                                textNode('Hello, world!')
                            ]
                        })
                    ]
                }),
                markup('h5', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent18 {

    slStyle() {
        return `
            figure { 
                span, a {
                    background-color: #cacaca;
                }
            }

            nav:dir(ltr) {
                @media (400px <= width < 900px) {
                    h4, figure {
                        color: blue;
                    }
                }
            }

            @media (400px <= width < 900px) {
                h5, span {
                    color: blue;
                }
            }

            nav { 
                ul, li {
                    background-color: #cacaca;
                }
            }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest18'
            },
            children: [
                markup('nav', {
                    children: [
                        markup('h4', {
                            children: [
                                textNode('Hello, world!')
                            ]
                        })
                    ]
                }),
                markup('h5', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}

export class CssNestingTestComponent8 {

    slStyle() {
        return `
        nav {
            > a, > h4, > h5 {
                color: blue;
            }

            @layer bluetheme {
                h3 {
                    color: blue;
                }

                @layer bluethemetwo {
                    h3 {
                        color: red;
                    }
                }
            }
            
            @container (min-width: 100px) { 
                nav { 
                    background-color: #cacaca; 
                } 

                @layer bluethemetwo {
                    h6 {
                        color: red;
                    }
                }

                figure, aside {
                    color: #cacaca;
                }
            }

            @media (prefers-color-scheme: light) {
                background: #ccc;
            }

            @scope (.media-object) {
                .author-image { border-radius: 50%; }
            }

            @scope (.media-object) to (.content > *) {
                img { border-radius: 50%; }
                .content { padding: 1em; }
            }
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divcssnestingtest8'
            },
            children: [
                markup('h4', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('header', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
                markup('nav', {
                    children: [
                        markup('h4', {
                            children: [
                                textNode('Hello, world!')
                            ]
                        }),
                    ]
                }),
            ]
        })
    }
}

class AnimateUserProfileComponent {
    constructor() {
        this.id = "Unknown";
    }

    slOnInit() {
        this.id = getRouteSegments()[1];
    }

    view() {
        return markup("div", {
            attrs: {
                id: "divAnimate2"
            },
            children: [textNode("Your user ID: " + this.id)]
        });
    }
}

class AnimateDefaultRouteComponent {
    slDetachedOnNodeDestroy(node) {
        return node;
    }

    view() {
        return markup("div", {
            attrs: {
                id: "divAnimate3",
                class: "visible",
                slanimatedestroy: "hide",
                slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this)
            },
            children: [
                markup("div", {
                    children: [textNode("Default route.")]
                })
            ]
        });
    }
}

export class TestRow1 {
    constructor(id, classList, label, onclick, ondelete) {
        this.id = id;
        this.classList = classList;
        this.label = label;
        this.onclick = onclick;
        this.ondelete = ondelete;
    }

    slOnInit() {
        this.click = function () {
            const id = this.id;
            this.onclick(id);
        };
        this.delete = function () {
            const id = this.id;
            this.ondelete(id);
        };
    }

    view() {
        return markup('tr', {
            attrs: {
                'class': this.classList,
                onclick: this.click.bind(this),
                onremove: this.delete.bind(this)
            },
            children: [
                markup('td', {
                    attrs: {
                        'class': 'col-md-1'
                    },
                    children: [
                        textNode(this.id)
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-4',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.click.bind(this),
                                slpreventdefault: true
                            },
                            children: [
                                textNode(this.label)
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-1',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                id: 'id-row-delete-' + String(this.id),
                                onclick: this.delete.bind(this),
                                slpreventdefault: true
                            },
                            children: [
                                markup('span', {
                                    attrs: {
                                        'class': 'glyphicon glyphicon-remove',
                                        'aria-hidden': 'true'
                                    }
                                })
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-6'
                    }
                })
            ]
        });
    }
}

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
        var ret = markup('div', {
            attrs: {
                'class': 'container',
                'id': 'main'
            },
            children: [
                markup('div', {
                    attrs: {
                        'class': 'jumbotron'
                    },
                    children: [
                        markup('div', {
                            attrs: {
                                'class': 'row'
                            },
                            children: [
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('h1', {
                                            children: [
                                                textNode('Sling.js')
                                            ]
                                        })
                                    ]
                                }),
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'run',
                                                        onclick: this.run.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 1,000 rows')
                                                    ]
                                                }),

                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'runlots',
                                                        onclick: this.runLots.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 10,000 rows')
                                                    ]
                                                })
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'add',
                                                        onclick: this.add.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Append 1,000 rows')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'update',
                                                        onclick: this.update.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Update every 10th row')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'clear',
                                                        onclick: this.clear.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Clear')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'swaprows',
                                                        onclick: this.swapRows.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Swap Rows')
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
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
                                    return new TestRow1(d.id, sel, d.label, this.select, this.delete)
                                })
                            ]
                        })
                    ]
                }),
                markup('span', {
                    attrs: {
                        'class': 'preloadicon glyphicon glyphicon-remove',
                        'aria-hidden': 'true'
                    }
                })
            ]
        });

        return ret;
    }
}

export class TestControllerComponent2 {
    constructor() {

    }

    slOnInit() {
        this.data = function () { return Store2.data; };
        this.selected = function () { return Store2.selected; };
        this.run = function () {
            Store2.run();
        };
        this.add = function () {
            Store2.add();
        };
        this.update = function () {
            Store2.update();
        };
        this.select = function (id) {
            Store2.select(id);
        };
        this.delete = function (id) {
            Store2.remove(id);
        };
        this.runLots = function () {
            Store2.runLots();
        };
        this.clear = function () {
            Store2.clear();
        };
        this.swapRows = function () {
            Store2.swapRows();
        };
        this.run();
    }

    view() {
        var ret = markup('div', {
            attrs: {
                'class': 'container',
                'id': 'main2'
            },
            children: [
                markup('div', {
                    attrs: {
                        'class': 'jumbotron'
                    },
                    children: [
                        markup('div', {
                            attrs: {
                                'class': 'row'
                            },
                            children: [
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('h1', {
                                            children: [
                                                textNode('Sling.js')
                                            ]
                                        })
                                    ]
                                }),
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'run2',
                                                        onclick: this.run.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 1,000 rows')
                                                    ]
                                                }),

                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'runlots2',
                                                        onclick: this.runLots.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 10,000 rows')
                                                    ]
                                                })
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'add2',
                                                        onclick: this.add.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Append 1,000 rows')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'update2',
                                                        onclick: this.update.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Update every 10th row')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'clear2',
                                                        onclick: this.clear.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Clear')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'swaprows2',
                                                        onclick: this.swapRows.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Swap Rows')
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data',
                        'id': 'idcontrollertable2'
                    },
                    children: [
                        markup('tbody', {
                            children: [
                                ...Array.from(this.data(), (d, i) => {
                                    let sel = d.id === this.selected() ? 'danger' : '';
                                    return new TestRow1(d.id, sel, d.label, this.select, this.delete)
                                })
                            ]
                        })
                    ]
                }),
                markup('span', {
                    attrs: {
                        'class': 'preloadicon glyphicon glyphicon-remove',
                        'aria-hidden': 'true'
                    }
                })
            ]
        });

        return ret;
    }
}

class TestSpanStylingLeakComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'divspanstylingleak1',
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Hello, world!')
                    ]
                }),
            ]
        });
    }
}

class TestComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testcomponent1',
                style: 'width: 100%;'
            },
            children: [
                textNode('Hello,'),
                markup('span', {
                    attrs: {
                        style: 'color: blue;'
                    },
                    children: [
                        textNode(' (nested <span>) ')
                    ]
                }),
                textNode(' world!')
            ]
        });
    }
}

class TestComponent2 {
    constructor() {
        this.counter = 0;
    }

    slAfterInit() {
        this.counter++;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testcomponent2',
                style: 'width: 100%;color: gray;'
            },
            children: [
                textNode('Hello,'),
                textNode(' world! Count: '),
                textNode(this.counter)
            ]
        });
    }
}

class TestFetchChangeDetectionComponent {
    constructor() {
        this.count = 0;
    }

    view() {
        const stateObj = getState();
        let countStr = stateObj.count ? String(stateObj.count) : String(this.count);

        if (stateObj.count !== null && stateObj.count !== undefined) stateObj.count++;
        setState(stateObj);

        return markup('div', {
            attrs: {
                id: 'testfetchcomponent',
                style: 'color: Coral;'
            },
            children: [
                textNode('Count: '),
                textNode(countStr)
            ]
        })
    }
}

class TestDestroyHookComponent {
    slOnDestroy() {
        const stateObj = getState();
        stateObj.onDestroyHookCalled = true;
        setState(stateObj);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testdestroyhookcomponent',
                style: 'color: red;'
            },
            children: [
                textNode('Should be removed.')
            ]
        })
    }
}

class TestDetachDetectorComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'testdetachdetectorcomponent',
            },
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class TestAfterDestroyHookComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'testdestroyhookcomponent',
                style: 'color: CornflowerBlue;'
            },
            children: [
                textNode('Displays after removal.')
            ]
        })
    }
}

class TestRemountComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testremountcomponent1',
            },
            children: [
                textNode('To be remounted.')
            ]
        })
    }
}

class TestNestedDestroyHookComponent2 {
    slOnDestroy() {
        const state = getState();
        state.nestedDestroy = true;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Nested destroy hook.')
            ]
        })
    }
}

class TestNestedDestroyHookComponent1 {
    slOnDestroy() {
        const state = getState();
        state.rootDestroy = true;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testnesteddestroyhook',
            },
            children: [
                textNode('Root component markup.'),
                new TestNestedDestroyHookComponent2()
            ]
        })
    }
}

class TestNestedDestroyHookComponent3 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnesteddestroyhook',
            },
            children: [
                textNode('Plain root component markup.')
            ]
        })
    }
}

class TestNestedAfterInitHookComponent2 {
    slOnInit() {
        const state = getState();
        state.nestedOnInit = true;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.nestedAfterInit = true;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Nested after init and on init hooks.')
            ]
        })
    }
}

class TestNestedAfterInitHookComponent1 {
    slOnInit() {
        const state = getState();
        state.rootOnInit = true;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.rootAfterInit = true;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedafterinithook',
            },
            children: [
                textNode('Root component markup.'),
                new TestNestedAfterInitHookComponent2()
            ]
        })
    }
}

class TestNestedAfterInitHookComponent3 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedafterinithook',
            },
            children: [
                textNode('Plain root component markup.')
            ]
        })
    }
}

class TestNestedConsumeClassComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedconsume',
            },
            children: [
                new TestNestedConsumeClassComponent2()
            ]
        })
    }
}

class TestNestedConsumeClassComponent2 {
    view() {
        return markup('div', {
            children: [
                new TestNestedConsumeClassComponent3()
            ]
        })
    }
}

class TestNestedConsumeClassComponent3 {
    view() {
        return markup('span', {
            children: [
                textNode('Consumed class text.')
            ]
        })
    }
}

class TestNestedConsumeClassComponent4 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedconsume2',
            },
            children: [
                new TestNestedConsumeClassComponent5()
            ]
        })
    }
}

class TestNestedConsumeClassComponent5 {
    view() {
        return markup('div', {
            children: [
                new TestNestedConsumeClassComponent6()
            ]
        })
    }
}

class TestNestedConsumeClassComponent6 {
    slAfterInit() {
        const state = getState();
        state.nestedConsumeHook = true;
        setState(state);
    }

    view() {
        return markup('span', {
            children: [
                textNode('Consumed class text with hook.')
            ]
        })
    }
}

class TestOnlySelfComponent1 {
    view() {
        return markup('iframe', {
            attrs: {
                frameborder: '0',
                id: 'tryit-sling-iframe',
                sldirective: 'onlyself',
                style: 'background-color: rgb(255, 255, 255);'
            }
        })
    }
}

class TestManualChangeDetectionComponent1 {
    constructor() {
        this.someValue = 0;
    }

    incrementSomeValue() {
        this.someValue++;
    }

    view() {
        const state = getState();
        if (state.manualChanges !== null && state.manualChanges !== undefined) state.manualChanges++;
        setState(state);

        return markup('div', {
            attrs: {
                id: 'testmanualchange',
            },
            children: [
                textNode('Plain root component markup.'),
                markup('button', {
                    attrs: {
                        id: 'manualincrementbutton',
                        onclick: this.incrementSomeValue.bind(this)
                    },
                    children: [
                        textNode('Increment Some Value')
                    ]
                })
            ]
        })
    }
}

class TestSsrHydrateComponent4 {
    hydratedFunction() {
        const state = getState();
        state.ishydrated2 = true;
        setState(state);
    }

    view() {
        const state = getState();
        const isFuncCalled = state.ishydrated2;

        return markup('div', {
            attrs: {
                id: 'testssrhydrate2',
                slssrclass: 'TestSsrHydrateComponent2'
            },
            children: [
                markup('button', {
                    attrs: {
                        id: 'ssrTest4',
                        onclick: this.hydratedFunction.bind(this)
                    },
                    children: [
                        textNode('Test Hydrate')
                    ]
                }),
                markup('div', {
                    attrs: {
                        id: 'ssrTest3'
                    },
                    children: [
                        ...(isFuncCalled === true ? [
                            textNode('Hydrated function called.')
                        ] : [
                            textNode('SSR placeholder.')
                        ])
                    ]
                })
            ]
        })
    }
}

class TestSsrHydrateComponent1 {
    hydratedFunction() {
        const state = getState();
        state.ishydrated = true;
        setState(state);
    }

    view() {
        const state = getState();
        const isFuncCalled = state.ishydrated;

        return markup('div', {
            attrs: {
                id: 'testssrhydrate',
                slssrclass: 'TestSsrHydrateComponent1'
            },
            children: [
                markup('button', {
                    attrs: {
                        id: 'ssrTest2',
                        onclick: this.hydratedFunction.bind(this)
                    },
                    children: [
                        textNode('Test Hydrate')
                    ]
                }),
                markup('div', {
                    attrs: {
                        id: 'ssrTest1'
                    },
                    children: [
                        ...(isFuncCalled === true ? [
                            textNode('Hydrated function called.')
                        ] : [
                            textNode('SSR placeholder.')
                        ])
                    ]
                })
            ]
        })
    }
}
window.TestSsrHydrateComponent1 = TestSsrHydrateComponent1;

class TestSsrHydrateComponent3 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testssrhydrate2',
                slssrclass: 'TestSsrHydrateComponent2'
            },
            children: [
                markup('div', {
                    children: [
                        textNode('Test consume class.')
                    ]
                })
            ]
        })
    }
}

class TestSsrHydrateComponent2 {
    view() {
        return new TestSsrHydrateComponent3();
    }
}
window.TestSsrHydrateComponent2 = TestSsrHydrateComponent2;

class TestNestedHookComponent4 {
    slOnInit() {
        const state = getState();
        state.nestedOnInit2++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.nestedAfterInit2++;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Nested after init and on init hooks.')
            ]
        })
    }
}

class TestNestedHookComponent2 {
    slOnInit() {
        const state = getState();
        state.nestedOnInit2++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.nestedAfterInit2++;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Nested after init and on init hooks.')
            ]
        })
    }
}

class TestNestedHookComponent1 {
    slOnInit() {
        const state = getState();
        state.rootOnInit2++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.rootAfterInit2++;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedhook',
            },
            children: [
                textNode('Root component markup.'),
                new TestNestedHookComponent2(),
                new TestNestedHookComponent4()
            ]
        })
    }
}

class TestNestedHookComponent3 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedhook',
            },
            children: [
                textNode('Plain root component markup.')
            ]
        })
    }
}

class TestCanDeactiveComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'testcandeactivate',
            },
            children: [
                textNode('Can deactivate component.')
            ]
        })
    }
}

class TestCanDeactiveComponent2 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testcandeactivate',
            },
            children: [
                textNode('Deactivated component result.')
            ]
        })
    }
}

class TestDefaultRouteComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testdefaultroute',
            },
            children: [
                textNode('Default route content.')
            ]
        })
    }
}

class TestRemoveRouteComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testremoveroute',
            },
            children: [
                textNode('Remove route content.')
            ]
        })
    }
}

class TestWrapDetectorComponent1 {
    view() {
        const state = getState();
        if (state.wrapDetector !== null && state.wrapDetector !== undefined) state.wrapDetector++;
        setState(state);

        return markup('div', {
            attrs: {
                id: 'testwrapdetector',
            },
            children: [
                textNode('Plain component text.')
            ]
        })
    }
}

class TestTrustDirectiveComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testtrustdirective',
                sldirective: 'trustchildren'
            },
            children: [
                '<div>First child.</div>',
                '<p>Second child.</p>'
            ]
        })
    }
}

class TestDebounceDetectionComponent {
    constructor() {
        this.dummy = false;
    }

    toggle() {
        this.dummy = !this.dummy;
    }

    view() {
        const state = getState();
        if (state.debounce !== undefined && state.debounce !== null) state.debounce++;
        setState(state);

        return markup('div', {
            attrs: {
                id: 'testdebouncecomponent',
            },
            children: [
                textNode('To be rendered.'),
                markup('button', {
                    attrs: {
                        id: 'debounceToggleButton',
                        onclick: this.toggle.bind(this)
                    },
                    children: [
                        textNode('Toggle')
                    ]
                })
            ]
        })
    }
}

class TestDomStringComponent {
    constructor() {
        this.stringMode = false;
    }

    toggle() {
        this.stringMode = !this.stringMode;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testdomstring',
            },
            children: [
                markup('button', {
                    attrs: {
                        id: 'domStringButton',
                        onclick: this.toggle.bind(this),
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                ...(this.stringMode === false ? [
                    markup('div', {
                        children: [
                            markup('label', {
                                attrs: {
                                    style: 'margin-right: 0.25rem;'
                                },
                                children: [
                                    textNode('Username:')
                                ]
                            }),
                            markup('input', {
                                attrs: {
                                    style: 'margin-left: 0.25rem;'
                                }
                            })
                        ]
                    })
                ] : []),
                ...(this.stringMode === true ? [
                    markup('div', {
                        children: [
                            textNode('Invalid username')
                        ]
                    })
                ] : []),
            ]
        })
    }
}

class TestTagChangeComponent {
    constructor() {
        this.inputMode = false;
    }

    toggleInputMode() {
        this.inputMode = !this.inputMode;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testtagcomponent1'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow1'
                            },
                            children: [
                                ...(this.inputMode === false ? [markup('td', {
                                    children: [
                                        textNode('Mode: '),
                                        textNode(String(this.inputMode))
                                    ]
                                })] : []),
                                ...(this.inputMode === true ? [
                                    markup('input', {
                                        attrs: {
                                            value: String(this.inputMode)
                                        },
                                        children: [
                                        ]
                                    })
                                ] : []),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class TestUpdateSingleComponent1 {
    view() {
        const state = getState();
        const isTestSingle = state.testSingle;

        return markup('div', {
            attrs: {
                id: 'testsinglecomponent1'
            },
            children: [
                ...(isTestSingle === false ? [
                    textNode('Is test single false.')
                ] : [
                    textNode('Is test single true.')
                ])
            ]
        })
    }
}

class TestUpdateSingleComponent2 {
    view() {
        const state = getState();
        const isTestSingle = state.testSingle2;

        return markup('div', {
            attrs: {
                id: 'testsinglecomponent2'
            },
            children: [
                ...(isTestSingle === false ? [
                    textNode('Is test single false.')
                ] : [
                    textNode('Is test single true.')
                ])
            ]
        })
    }
}

class AuthFailComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'authcomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('Authentication guard returned false.')
            ]
        })
    }
}

class NoRouteComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'routecomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('No route taken.')
            ]
        })
    }
}

class RouteBasicComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'routecomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('Basic route taken.')
            ]
        })
    }
}

class OnDestroyCallTestComponent {
    slOnDestroy() {
        const state = getState();
        if (!state.destroyCalls) state.destroyCalls = 1;
        else state.destroyCalls++;
        setState(state);
    }

    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'destroycallcomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.onDestroyCall ? [markup('p', {
                    children: [
                        textNode('Flag set.'),
                    ]
                })] : []),
                new OnDestroyCallTestComponent2()
            ]
        })
    }
}

class HooksGenericTestComponent {
    slOnInit() {
        const state = getState();
        if (!state.genericOnInit) state.genericOnInit = 1;
        else state.genericOnInit++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        if (!state.genericAfterInit) state.genericAfterInit = 1;
        else state.genericAfterInit++;
        setState(state);
    }

    view() {
        const state = getState();
        if (!state.renderCount) state.renderCount = 1;
        else state.renderCount++;
        setState(state);

        return markup('div', {
            attrs: {
                id: 'hooksgenericcomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.genericHookTemplate ? [markup('p', {
                    children: [
                        textNode('More plain text.')
                    ]
                })] : [])
            ]
        })
    }
}

class OnDestroyCallTemplateTestComponent {
    constructor() {
        this.comp = new OnDestroyCallTemplateTestComponent2();
    }

    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'destroycalltemplatecomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.onDestroyCallTemplate ? [markup('p', {
                    children: [
                        this.comp
                    ]
                })] : [])
            ]
        })
    }
}

class NewConsumedClassHooksCalledTestComponent1 {
    slAfterInit() {
        const state = getState();

        if (state.newConsumed1 === null || state.newConsumed1 === undefined) {
            state.newConsumed1 = 1;
        } else {
            state.newConsumed1++;
        }

        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class NewConsumedClassHooksCalledTestComponent2 {
    slAfterInit() {
        const state = getState();

        if (state.newConsumed2 === null || state.newConsumed2 === undefined) {
            state.newConsumed2 = 1;
        } else {
            state.newConsumed2++;
        }

        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class NewConsumedClassHooksCalledTestComponent3 {
    constructor() {
        this.showPreview = false;
        this.comp1 = new NewConsumedClassHooksCalledTestComponent1();
        this.comp2 = new NewConsumedClassHooksCalledTestComponent2();
    }

    togglePreview() {
        this.showPreview = !this.showPreview;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'newconsumeddiv1'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.togglePreview.bind(this),
                        id: 'newconsumedbutton1'
                    },
                    children: [
                        textNode('Toggle Preview')
                    ]
                }),
                ...(this.showPreview === true ? [
                    markup('div', {
                        attrs: {
                            style: 'width: 88%; max-height: inherit;'
                        },
                        children: [
                            this.comp2
                        ]
                    })
                ] : []),
                ...(this.showPreview === false ? [
                    markup('div', {
                        attrs: {
                            style: 'width: 88%; max-height: inherit;'
                        },
                        children: [
                            this.comp1
                        ]
                    })
                ] : []),
            ]
        })
    }
}

class OnDestroyCallTemplateTestComponent2 {
    slOnDestroy() {
        const state = getState();
        if (!state.destroyTemplateCalls) state.destroyTemplateCalls = 1;
        else state.destroyTemplateCalls++;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class OnDestroyCallTestComponent2 {
    slOnDestroy() {
        const state = getState();
        if (!state.destroyCalls) state.destroyCalls = 1;
        else state.destroyCalls++;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class OnInitThisTestComponent {
    constructor() {
        this.value = 2;
    }

    slOnInit() {
        const state = getState();
        state.onInitThis = this.value === 2 ? true : false;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'oninitthiscomponent'
            },
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class DestroyHookCalledTestComponent {
    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'destroyhookcalledcomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(!state.forceDestroyHook ? [markup('p', {
                    children: [
                        new DestroyHookCalledTestComponent2()
                    ]
                })] : []),
            ]
        })
    }
}

class DestroyHookCalledTestComponent2 {
    slOnDestroy() {
        const state = getState();
        state.destroyHook2Called = true;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class AfterInitCallTestComponent {
    slAfterInit() {
        const state = getState();
        if (!state.initCalls) state.initCalls = 1;
        else state.initCalls++;
        setState(state);
    }

    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'initcallcomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.afterInitCall ? [markup('p', {
                    children: [
                        textNode('Flag set.'),
                    ]
                })] : []),
            ]
        })
    }
}

class OnInitCallTestComponent {
    slOnInit() {
        const state = getState();
        if (!state.onInitCalls) state.onInitCalls = 1;
        else state.onInitCalls++;
        setState(state);
    }

    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'oninitcallcomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.onInitCall ? [markup('p', {
                    children: [
                        textNode('Flag set.'),
                    ]
                })] : []),
            ]
        })
    }
}

class OnBeforeRouteComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'onbeforeroutecomponent',
            },
            children: [
                textNode('Text should appear after onBeforeRoute called.')
            ]
        })
    }
}

class ConsumeClassComponent2 {
    view() {
        return markup('div', {
            attrs: {
                id: 'consumeclasscomponent',
            },
            children: [
                textNode('Consume class test.')
            ]
        })
    }
}

class ConsumeClassComponent1 {
    view() {
        return new ConsumeClassComponent2();
    }
}

class RouteComplexComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'routecomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('Complex route taken.')
            ]
        })
    }
}

class RouteParamsTestComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'routeparamscomponent',
                style: 'color: SteelBlue;'
            },
            children: [
                textNode('Test route params.')
            ]
        })
    }
}

class TestGuardComponent {
    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'authcomponent',
                style: 'color: DarkSeaGreen;'
            },
            children: [
                textNode('Authentication guard returned true.')
            ]
        })
    }
}

class TestTagChangeComponent2 {
    constructor() {
        this.inputMode = false;
        this.fakeChildArray = [0, 1];
    }

    toggleInputMode() {
        this.inputMode = !this.inputMode;
        if (!this.inputMode) {
            this.fakeChildArray = [0, 1];
        } else {
            this.fakeChildArray = [0];
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testtagcomponent2'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton2'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow2'
                            },
                            children: [
                                ...Array.from(this.fakeChildArray, (fakeChildItem) =>
                                    markup('div', {
                                        children: [
                                            ...(this.inputMode === false ? [markup('td', {
                                                children: [
                                                    textNode('Mode: '),
                                                    textNode(String(this.inputMode))
                                                ]
                                            })] : []),
                                            ...(this.inputMode === true ? [
                                                markup('input', {
                                                    attrs: {
                                                        value: String(this.inputMode)
                                                    },
                                                    children: [
                                                    ]
                                                })
                                            ] : [])
                                        ]
                                    })
                                ),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class TestRebindDetectionComponent {
    constructor() {
        this.fakeChildArray = [0, 1, 0];
    }

    toggleInputMode() {
        if (this.fakeChildArray.length === 3) {
            this.fakeChildArray = [0];
        } else {
            this.fakeChildArray = [0, 1, 0];
        }
    }

    toggleEditingMode() {
        if (this.fakeChildArray.length === 3 && this.fakeChildArray[1] === 1) {
            this.fakeChildArray = [0, 0, 0];
        } else {
            this.fakeChildArray = [0, 1, 0];
        }
    }

    view() {
        const stateObj = getState();
        if (stateObj.count2 !== null && stateObj.count2 !== undefined) stateObj.count2++;
        setState(stateObj);

        return markup('div', {
            attrs: {
                id: 'testtagcomponent3'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton3'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow3'
                            },
                            children: [
                                ...Array.from(this.fakeChildArray, (fakeChildFlag) =>
                                    markup('div', {
                                        children: [
                                            ...(fakeChildFlag === 1 ? [markup('button', {
                                                attrs: {
                                                    onclick: this.toggleEditingMode.bind(this),
                                                    id: 'toggleModeButton4'
                                                },
                                                children: [
                                                    textNode('Toggle')
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 0 ? [markup('td', {
                                                children: [
                                                    textNode('Mode: '),
                                                    textNode(String(fakeChildFlag))
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 1 ? [
                                                markup('input', {
                                                    attrs: {
                                                        value: String(fakeChildFlag)
                                                    },
                                                    children: [
                                                    ]
                                                })
                                            ] : [])
                                        ]
                                    })
                                ),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class TestRebindDetectionComplexComponent {
    constructor() {
        this.fakeChildArray = [0, 1, 0, 1, 0];
    }

    toggleInputMode() {
        if (this.fakeChildArray.length === 5) {
            this.fakeChildArray = [0];
        } else {
            this.fakeChildArray = [0, 1, 0, 1, 0];
        }
    }

    toggleEditingMode() {
        if (this.fakeChildArray.length === 3 && this.fakeChildArray[1] === 1) {
            this.fakeChildArray = [0, 0, 0, 0, 0];
        } else {
            this.fakeChildArray = [0, 1, 0, 1, 0];
        }
    }

    view() {
        const stateObj = getState();
        if (stateObj.count4 !== null && stateObj.count4 !== undefined) stateObj.count4++;
        setState(stateObj);

        return markup('div', {
            attrs: {
                id: 'testtagcomponent5'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton7'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow5'
                            },
                            children: [
                                ...Array.from(this.fakeChildArray, (fakeChildFlag) =>
                                    markup('div', {
                                        children: [
                                            ...(fakeChildFlag === 1 ? [markup('button', {
                                                attrs: {
                                                    onclick: this.toggleEditingMode.bind(this),
                                                    id: 'toggleModeButton8'
                                                },
                                                children: [
                                                    textNode('Toggle')
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 0 ? [markup('td', {
                                                children: [
                                                    textNode('Mode: '),
                                                    textNode(String(fakeChildFlag)),
                                                    markup('span', {
                                                        children: [
                                                            textNode(' some markup')
                                                        ]
                                                    }),
                                                    textNode(' and a text node')
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 1 ? [
                                                markup('input', {
                                                    attrs: {
                                                        value: String(fakeChildFlag)
                                                    },
                                                    children: [
                                                    ]
                                                })
                                            ] : [])
                                        ]
                                    })
                                ),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class TestRebindDetectionComponent2 {
    constructor() {
        this.fakeChildArray = [0, 1, 0];
    }

    toggleInputMode() {
        if (this.fakeChildArray.length === 3) {
            this.fakeChildArray = [0];
        } else {
            this.fakeChildArray = [0, 1, 0];
        }
    }

    toggleEditingMode() {
        if (this.fakeChildArray.length === 3 && this.fakeChildArray[1] === 1) {
            this.fakeChildArray = [0, 0, 0];
        } else {
            this.fakeChildArray = [0, 1, 0];
        }
    }

    view() {
        const stateObj = getState();
        if (stateObj.count3 !== null && stateObj.count3 !== undefined) stateObj.count3++;
        setState(stateObj);

        return markup('div', {
            attrs: {
                id: 'testtagcomponent4'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton5'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow4'
                            },
                            children: [
                                ...Array.from(this.fakeChildArray, (fakeChildFlag) =>
                                    markup('div', {
                                        children: [
                                            ...(fakeChildFlag === 1 ? [markup('button', {
                                                attrs: {
                                                    onclick: this.toggleEditingMode.bind(this),
                                                    id: 'toggleModeButton6'
                                                },
                                                children: [
                                                    textNode('Toggle')
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 0 ? [markup('td', {
                                                children: [
                                                    textNode('Mode: '),
                                                    textNode(String(fakeChildFlag)),
                                                    markup('span', {
                                                        children: [
                                                            textNode(' <span>')
                                                        ]
                                                    })
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 1 ? [
                                                markup('input', {
                                                    attrs: {
                                                        value: String(fakeChildFlag)
                                                    },
                                                    children: [
                                                    ]
                                                })
                                            ] : [])
                                        ]
                                    })
                                ),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class PartSupplyComponent {

    constructor() {
        this.data = [];
        this.MOCK_DATA_MAX_VALUE_EXCLUSIVE = 101;
        this.MOCK_DATA_MONTH_RANGE = 24;
    }

    formatMockDate(dateToFormat) {
        if (dateToFormat.getMonth() === 0) {
            return '12/' + dateToFormat.getDate() + '/' + dateToFormat.getFullYear();
        } else {
            return dateToFormat.getMonth() + '/' + dateToFormat.getDate() + '/' + dateToFormat.getFullYear();
        }
    }

    getMockYData(targetMonths) {
        const mockYData = [];

        for (let i = 0; i < targetMonths; ++i) {
            // Random [0 - 100]
            mockYData.push(Math.floor(Math.random() * this.MOCK_DATA_MAX_VALUE_EXCLUSIVE));
        }

        return mockYData;
    }

    getMockXData(targetMonths) {
        const mockXData = [];
        const currentDate = new Date();

        currentDate.setMonth(currentDate.getMonth() - targetMonths);

        for (let i = 0; i < targetMonths; ++i) {
            currentDate.setMonth(currentDate.getMonth() + 1);
            mockXData.push(this.formatMockDate(currentDate));
        }

        return mockXData;
    }

    slOnInit() {
        this.data = [
            {
                x: this.getMockXData(this.MOCK_DATA_MONTH_RANGE),
                y: this.getMockYData(this.MOCK_DATA_MONTH_RANGE),
                type: 'bar'
            }
        ];
    }

    slAfterInit() {
        if (document.getElementById('chartDiv')) {
            Plotly.newPlot('chartDiv', this.data, {}, { responsive: true, displaylogo: false });
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divsheetcontent'
            },
            children: [
                markup('div', {
                    attrs: {
                        id: 'chartDiv',
                        sldirective: 'useexisting',
                        style: 'width: 90vw;'
                    }
                })
            ]
        })
    }
}

class PreviewComponent {

    constructor() {
        this.injectedList = 'Injected files: 2';
    }

    slOnInit() {
        const state = getState();
        if (state.oninit1 === null || state.oninit1 === undefined) {
            state.oninit1 = 0;
        }
        state.oninit1++;
        setState(state);
    }

    slOnDestroy() {
        const state = getState();
        if (state.ondestroy1 === null || state.ondestroy1 === undefined) {
            state.ondestroy1 = 0;
        }
        state.ondestroy1++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        if (state.afterinit1 === null || state.afterinit1 === undefined) {
            state.afterinit1 = 0;
        }
        state.afterinit1++;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                style: 'padding: 0.25rem; color: rgb(204, 204, 204); max-height: inherit; overflow: auto; display: flex; flex-direction: column; height: calc(100% - 0.5rem);'
            },
            children: [
                markup('h4', {
                    attrs: {
                        style: 'margin: 0px; flex: 1;'
                    },
                    children: [
                        textNode('Preview')
                    ]
                }),
                ...(this.injectedList.length > 16 ? [
                    markup('div', {
                        attrs: {
                            style: 'background-color: rgb(46, 49, 56); padding: 0.25rem; flex: 1;'
                        },
                        children: [
                            textNode(this.injectedList)
                        ]
                    })
                ] : []),
                markup('iframe', {
                    attrs: {
                        frameborder: '0',
                        id: 'tryit-sling-iframe',
                        sldirective: 'onlyself',
                        ...this.injectedList.length > 16 && { style: 'background-color: #ffffff; width: 100%; flex: 14;' },
                        ...this.injectedList.length <= 16 && { style: 'background-color: #ffffff; width: 100%; flex: 15;' }
                    }
                }),
                markup('textarea', {
                    attrs: {
                        id: 'tryit-sling-console',
                        sldirective: 'onlyself',
                        style: 'width: 100%; flex: 4;',
                        placeholder: 'Text will appear when logged'
                    }
                })
            ]
        });
    }
}

class SourcePanelComponent {

    constructor() {
    }

    slOnInit() {
        const state = getState();
        if (state.oninit2 === null || state.oninit2 === undefined) {
            state.oninit2 = 0;
        }
        state.oninit2++;
        setState(state);
    }

    slOnDestroy() {
        const state = getState();
        if (state.ondestroy2 === null || state.ondestroy2 === undefined) {
            state.ondestroy2 = 0;
        }
        state.ondestroy2++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.sourcePanelAfterInit = true;

        if (state.afterinit2 === null || state.afterinit2 === undefined) {
            state.afterinit2 = 0;
        }
        state.afterinit2++;

        setState(state);
    }

    view() {
        const file = {
            index: 0,
            name: 'test'
        };

        return markup('div', {
            attrs: {
                style: 'padding: 0.25rem; background-color: rgb(21, 24, 30); color: rgb(204, 204, 204); overflow: auto; height: calc(100% - 0.5rem); display: flex; flex-direction: column;'
            },
            children: [
                markup('h4', {
                    attrs: {
                        style: 'margin: 0px; flex: 1;'
                    },
                    children: [
                        ...(file ? [
                            textNode('File ' + (file.index + 1) + ': ' + file.name)
                        ] : []),
                    ]
                }),
                markup('textarea', {
                    attrs: {
                        style: 'width: 100%; background-color: rgb(0, 0, 0); border: none; color: rgb(204, 204, 204); flex: 19;',
                        id: 'tryit-sling-textarea'
                    }
                })
            ]
        });
    }
}

class ContentPanelComponent {

    constructor() {
        this.previewComp = new PreviewComponent();
        this.sourceComp = new SourcePanelComponent();
    }

    view() {
        const state = getState();
        const showPreview = state.showPreview;

        return markup('div', {
            attrs: {
                id: 'divcontentpanel'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: 'display: flex; justify-content: space-between;'
                    },
                    children: [
                        ...(showPreview === true ? [
                            markup('div', {
                                attrs: {
                                    style: 'width: 88%; max-height: inherit;'
                                },
                                children: [
                                    this.previewComp
                                ]
                            })
                        ] : []),
                        ...(showPreview === false ? [
                            markup('div', {
                                attrs: {
                                    style: 'width: 88%; max-height: inherit;'
                                },
                                children: [
                                    this.sourceComp
                                ]
                            })
                        ] : []),
                    ]
                })
            ]
        });
    }
}

class TestRenderElement1 {

    view() {
        return markup('span', {
            children: [
                textNode('Hello')
            ]
        });
    }
}

class TestRenderElement2 {

    constructor() {
        const state = getState();
        if (state.rendertoele1 === undefined) {
            state.rendertoele1 = 0;
        }
        setState(state);
    }

    slOnInit() {
        const state = getState();
        if (state.rendertoele1 === undefined) {
            state.rendertoele1 = 0;
        }
        state.rendertoele1++;
        setState(state);
    }

    view() {
        return markup('span', {
            children: [
                textNode('Hello')
            ]
        });
    }
}

class TestRenderElement4 {

    constructor() {
        const state = getState();
        if (state.rendertoele3 === undefined) {
            state.rendertoele3 = 0;
        }
        setState(state);
    }

    slOnInit() {
        const state = getState();
        if (state.rendertoele3 === undefined) {
            state.rendertoele3 = 0;
        }
        state.rendertoele3++;
        setState(state);
    }

    view() {
        return markup('span', {
            children: [
                textNode('Hello')
            ]
        });
    }
}

class TestRenderElement6 {

    constructor() {
        const state = getState();
        if (state.rendertoele4 === undefined) {
            state.rendertoele4 = 0;
        }
        setState(state);
    }

    slOnDestroy() {
        const state = getState();
        if (state.rendertoele4 === undefined) {
            state.rendertoele4 = 0;
        }
        state.rendertoele4++;
        setState(state);
    }

    view() {
        return markup('span', {
            children: [
                textNode('Hello')
            ]
        });
    }
}

export class TestRenderElement3 {
    constructor() {
        this.data = function () { return Store3.data; };
        this.selected = function () { return Store3.selected; };
        this.run = function () {
            Store3.run();
        };
        this.add = function () {
            Store3.add();
        };
        this.update = function () {
            Store3.update();
        };
        this.select = function (id) {
            Store3.select(id);
        };
        this.delete = function (id) {
            Store3.remove(id);
        };
        this.runLots = function () {
            Store3.runLots();
        };
        this.clear = function () {
            Store3.clear();
        };
        this.swapRows = function () {
            Store3.swapRows();
        };

        this.add();
    }

    updateRow(ctx, v) {
        if (this.$foo === undefined) {
            this.$foo = this.childNodes[1];
            this.$label = this.children[2].childNodes[0];
        }

        this.children[2].children[0].onclick = wrapWithChangeDetector(ctx.delete.bind(this, v.id), { slpreventdefault: true });

        if (this.$label.childNodes[0].data !== v.label) {
            this.$label.removeChild(this.$label.childNodes[0]);
            this.$label.append(v.label);
        }
        const idStr = String(v.id);
        if (this.$foo.childNodes[0].data !== idStr) {
            this.$foo.removeChild(this.$foo.childNodes[0]);
            this.$foo.append(v.id);
        }
        var className = (v.id === ctx.selected()) ? 'danger' : ''
        if (this.className !== className) this.className = className
    }

    makeRow(d) {
        let $label;

        const node = markup('tr', {
            attrs: {
                ...d.id === this.selected() && { class: 'danger' },
                onclick: this.select.bind(this, d.id),
                onremove: this.delete.bind(this, d.id)
            },
            children: [
                new TestRenderElement4(),
                markup('td', {
                    attrs: {
                        'class': 'col-md-1'
                    },
                    children: [
                        textNode(d.id)
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-4',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.select.bind(this, d.id),
                                slpreventdefault: true
                            },
                            children: [
                                textNode(d.label)
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-1',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.delete.bind(this, d.id),
                                slpreventdefault: true
                            },
                            children: [
                                markup('span', {
                                    attrs: {
                                        'class': 'glyphicon glyphicon-remove',
                                        'aria-hidden': 'true'
                                    }
                                })
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-6'
                    }
                })
            ]
        });

        return node;
    }

    view() {
        return markup('div', {
            attrs: {
                'class': 'container',
                'id': 'rendertoelement3'
            },
            children: [
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data'
                    },
                    children: [
                        markup('tbody', {
                            attrs: {
                                'slfor': 'myfor2:data:makeRow:updateRow'
                            }
                        })
                    ]
                })
            ]
        });
    }
}


export class TestRenderElement5 {
    constructor() {
        this.data = function () { return Store4.data; };
        this.selected = function () { return Store4.selected; };
        this.run = function () {
            Store4.run();
        };
        this.add = function () {
            Store4.add();
        };
        this.update = function () {
            Store4.update();
        };
        this.select = function (id) {
            Store4.select(id);
        };
        this.delete = function (id) {
            Store4.remove(id);
        };
        this.runLots = function () {
            Store4.runLots();
        };
        this.clear = function () {
            Store4.clear();
        };
        this.swapRows = function () {
            Store4.swapRows();
        };

        if (this.data().length === 0) {
            this.add();
        }

        this.show = true;
    }

    updateRow(ctx, v) {
        if (this.$foo === undefined) {
            this.$foo = this.childNodes[1];
            this.$label = this.children[2].childNodes[0];
        }

        this.children[2].children[0].onclick = wrapWithChangeDetector(ctx.delete.bind(this, v.id), { slpreventdefault: true });

        if (this.$label.childNodes[0].data !== v.label) {
            this.$label.removeChild(this.$label.childNodes[0]);
            this.$label.append(v.label);
        }
        const idStr = String(v.id);
        if (this.$foo.childNodes[0].data !== idStr) {
            this.$foo.removeChild(this.$foo.childNodes[0]);
            this.$foo.append(v.id);
        }
        var className = (v.id === ctx.selected()) ? 'danger' : ''
        if (this.className !== className) this.className = className
    }

    makeRow(d) {
        let $label;

        const node = markup('tr', {
            attrs: {
                ...d.id === this.selected() && { class: 'danger' },
                onclick: this.select.bind(this, d.id),
                onremove: this.delete.bind(this, d.id)
            },
            children: [
                new TestRenderElement6(),
                markup('td', {
                    attrs: {
                        'class': 'col-md-1'
                    },
                    children: [
                        textNode(d.id)
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-4',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.select.bind(this, d.id),
                                slpreventdefault: true
                            },
                            children: [
                                textNode(d.label)
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-1',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.delete.bind(this, d.id),
                                slpreventdefault: true
                            },
                            children: [
                                markup('span', {
                                    attrs: {
                                        'class': 'glyphicon glyphicon-remove',
                                        'aria-hidden': 'true'
                                    }
                                })
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-6'
                    }
                })
            ]
        });

        return node;
    }

    hideSlFor() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                'class': 'container',
                'id': 'rendertoelement4'
            },
            children: [
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data'
                    },
                    children: [
                        markup('button', {
                            attrs: {
                                onclick: this.hideSlFor.bind(this),
                                'id': 'renderele4btn'
                            },
                            children: [
                                textNode('Hide slFor')
                            ]
                        }),
                        ...(this.show === true ? [
                            markup('tbody', {
                                attrs: {
                                    'slfor': 'myfor3:data:makeRow:updateRow'
                                }
                            })
                        ] : [])
                    ]
                })
            ]
        });
    }
}

export class TestPreventDefault1 {
    constructor() {

    }

    simpleFunction() {
        console.log('Hello');
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divpreventdefault1'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Prevent default test.')
                    ]
                }),
                markup('a', {
                    attrs: {
                        slpreventdefault: true,
                        id: 'preventdefaultanchor1',
                        onclick: this.simpleFunction.bind(this)
                    },
                    children: [
                        textNode('Prevent default anchor.')
                    ]
                })
            ]
        });
    }
}

export class TestPreserveScrollPosition1 {
    constructor() {

    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divpreservescroll1'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Preserve scroll test.')
                    ]
                }),
                markup('a', {
                    attrs: {
                        slpreventdefault: true,
                        id: 'preservescrollanchor1',
                        href: '#'
                    },
                    children: [
                        textNode('Preserve scroll anchor.')
                    ]
                })
            ]
        });
    }
}

export class TestNoPreserveScrollPosition1 {
    constructor() {

    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divnopreservescroll1'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('No preserve scroll test.')
                    ]
                }),
                markup('a', {
                    attrs: {
                        id: 'nopreservescrollanchor1',
                        href: '#'
                    },
                    children: [
                        textNode('No preserve scroll anchor.')
                    ]
                })
            ]
        });
    }
}

export class TestRenderHydrate1 {
    constructor() {
        this.data = function () { return Store5.data; };
        this.selected = function () { return Store5.selected; };
        this.run = function () {
            Store5.run();
        };
        this.add = function () {
            Store5.add();
        };
        this.update = function () {
            Store5.update();
        };
        this.select = function (id) {
            Store5.select(id);
        };
        this.delete = function (id) {
            Store5.remove(id);
        };
        this.runLots = function () {
            Store5.runLots();
        };
        this.clear = function () {
            Store5.clear();
        };
        this.swapRows = function () {
            Store5.swapRows();
        };

        if (this.data().length === 0) {
            this.add();
        }
    }

    updateRow(ctx, v) {
        if (this.$foo === undefined) {
            this.$foo = this.childNodes[0];
            this.$label = this.children[1].childNodes[0];
        }

        this.children[2].children[0].onclick = wrapWithChangeDetector(ctx.delete.bind(this, v.id), { slpreventdefault: true });

        if (this.$label.childNodes[0].data !== v.label) {
            this.$label.removeChild(this.$label.childNodes[0]);
            this.$label.append(v.label);
        }
        const idStr = String(v.id);
        if (this.$foo.childNodes[0].data !== idStr) {
            this.$foo.removeChild(this.$foo.childNodes[0]);
            this.$foo.append(v.id);
        }
        var className = (v.id === ctx.selected()) ? 'danger' : ''
        if (this.className !== className) this.className = className
    }

    makeRow(d) {
        let $label;

        const node = markup('tr', {
            attrs: {
                ...d.id === this.selected() && { class: 'danger' },
                onclick: this.select.bind(this, d.id),
                onremove: this.delete.bind(this, d.id)
            },
            children: [
                markup('td', {
                    attrs: {
                        'class': 'col-md-1'
                    },
                    children: [
                        textNode(d.id)
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-4',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.select.bind(this, d.id),
                                slpreventdefault: true
                            },
                            children: [
                                textNode(d.label)
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-1',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.delete.bind(this, d.id),
                                slpreventdefault: true
                            },
                            children: [
                                markup('span', {
                                    attrs: {
                                        'class': 'glyphicon glyphicon-remove',
                                        'aria-hidden': 'true'
                                    }
                                })
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-6'
                    }
                })
            ]
        });

        return node;
    }

    view() {
        return markup('div', {
            attrs: {
                'class': 'container',
                'id': 'divrenderhydrate',
                'slssrclass': 'TestRenderHydrate1'
            },
            children: [
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data'
                    },
                    children: [
                        markup('tbody', {
                            attrs: {
                                'slfor': 'myfor4:data:makeRow:updateRow'
                            }
                        })
                    ]
                })
            ]
        });
    }
}

export class TestSlForCleanupComponent1 {
    constructor() {
        this.show = true;
        this.data = ['a', 'b', 'c'];
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    hideList() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslforcleanup'
            },
            children: [
                ...(this.show === true ? [
                    markup('div', {
                        attrs: {
                            'slfor': 'cleanupfor:data:makeRow:updateRow'
                        }
                    })
                ] : []),
                markup('button', {
                    attrs: {
                        onclick: this.hideList.bind(this),
                        id: 'slforcleanupbtn'
                    },
                    children: [
                        textNode('Hide List')
                    ]
                })
            ]
        })
    }
}

export class TestSlForCleanupComponent2 {
    constructor() {
        this.show = true;
        this.data = ['a', 'b', 'c'];
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    hideList() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslforcleanup2'
            },
            children: [
                ...(this.show === true ? [
                    markup('div', {
                        attrs: {
                            'slfor': 'cleanupfor2:data:makeRow:updateRow'
                        },
                        children: [
                            textNode('Testing...'),
                            markup('span', {
                                attrs: {
                                    'slfor': 'cleanupfor3:data:makeRow:updateRow'
                                }
                            })
                        ]
                    })
                ] : []),
                markup('button', {
                    attrs: {
                        onclick: this.hideList.bind(this),
                        id: 'slforcleanupbtn2'
                    },
                    children: [
                        textNode('Hide List')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponentSameTagSlFor {
    constructor() {
        this.data = ['a', 'b', 'c'];
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    slStyle() {
        return 'div { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslforstyle1'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfor': 'slstylefor1:data:makeRow:updateRow'
                    }
                })
            ]
        })
    }
}

export class TestSlStyleComponentDifferentTagSlFor {
    constructor() {
        this.data = ['a', 'b', 'c'];
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    slStyle() {
        return 'div { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslforstyle2'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfor': 'slstylefor2:data:makeRow:updateRow'
                    }
                })
            ]
        })
    }
}

export class SetIntervalTestComponent1 {
    constructor() {
        this.sub = BehaviorSubject(0);
        this.interval = null;
        this.count = 0;
    }

    slOnInit() {
        this.interval = setInterval(() => {
            this.sub.next(this.sub.getData() + 1);
            this.count++;

            detectChanges();

            if (this.count > 2) {
                clearInterval(this.interval);
            }
        }, 500);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'setintervaltestdiv1'
            }, children: [
                textNode(this.sub.getData())
            ]
        })
    }
}

export class TestManualChangeDetectionComponent2 {
    constructor() {
        this.data = function () { return Store6.data; };
        this.selected = function () { return Store6.selected; };
        this.run = function () {
            Store6.run();
        };
        this.add = function () {
            Store6.add();
        };
        this.update = function () {
            Store6.update();
        };
        this.select = function (id) {
            Store6.select(id);
        };
        this.delete = function (id) {
            Store6.remove(id);
        };
        this.runLots = function () {
            Store6.runLots();
        };
        this.clear = function () {
            Store6.clear();
        };
        this.swapRows = function () {
            Store6.swapRows();
        };

        this.add();
    }

    updateTableRow(context, d) {
        if (this.$label.childNodes[0].data !== d.label) {
            this.$label.removeChild(this.$label.childNodes[0]);
            this.$label.append(d.label);
        }

        this.children[2].children[0].onclick = wrapWithChangeDetector(context.delete.bind(this, d.id), { slpreventdefault: true });

        const idStr = String(d.id);

        if (this.$id.childNodes[0].data !== idStr) {
            this.$id.removeChild(this.$id.childNodes[0]);
            this.$id.append(d.id);
        }

        const className = (d.id === context.selected()) ? 'danger' : '';

        if (this.className !== className) {
            this.className = className;
        }
    }

    makeTableRow(d) {
        const rootNode = renderElement(markup('tr', {
            attrs: {
                ...d.id === this.selected() && { class: 'danger' },
                onclick: this.select.bind(this, d.id),
                onremove: this.delete.bind(this, d.id)
            },
            children: [
                markup('td', {
                    attrs: {
                        'class': 'col-md-1'
                    },
                    children: [
                        textNode(d.id)
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-4',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.select.bind(this, d.id),
                                slpreventdefault: true
                            },
                            children: [
                                textNode(d.label)
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-1',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.delete.bind(this, d.id),
                                slpreventdefault: true
                            },
                            children: [
                                markup('span', {
                                    attrs: {
                                        'class': 'glyphicon glyphicon-remove',
                                        'aria-hidden': 'true'
                                    }
                                })
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-6'
                    }
                })
            ]
        }));

        rootNode.$label = rootNode.children[1].children[0];
        rootNode.$id = rootNode.children[0];

        return rootNode;
    }

    view() {
        return markup('div', {
            attrs: {
                'class': 'container',
                'id': 'divtestmanual1'
            },
            children: [
                markup('div', {
                    attrs: {
                        'class': 'jumbotron'
                    },
                    children: [
                        markup('div', {
                            attrs: {
                                'class': 'row'
                            },
                            children: [
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('h1', {
                                            children: [
                                                textNode('Sling.js 14.0.0')
                                            ]
                                        })
                                    ]
                                }),
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'run',
                                                        onclick: this.run.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 1,000 rows')
                                                    ]
                                                }),

                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'runlots',
                                                        onclick: this.runLots.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 10,000 rows')
                                                    ]
                                                })
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'add',
                                                        onclick: this.add.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Append 1,000 rows')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'update',
                                                        onclick: this.update.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Update every 10th row')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'clear',
                                                        onclick: this.clear.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Clear')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'swaprows',
                                                        onclick: this.swapRows.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Swap Rows')
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data'
                    },
                    children: [
                        markup('tbody', {
                            attrs: {
                                'slfor': 'bodyfor:data:makeTableRow:updateTableRow'
                            }
                        })
                    ]
                }),
                markup('span', {
                    attrs: {
                        'class': 'preloadicon glyphicon glyphicon-remove',
                        'aria-hidden': 'true'
                    }
                })
            ]
        });
    }
}

class RenderToStringConditional1 {
    constructor() {
        this.show = true;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divrendertostring1'
            },
            children: [
                ...(this.show === true ? [textNode('Hello')] : []),
                textNode(', world!')
            ]
        })
    }
}

class RenderToStringConditional2 {
    constructor() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divrendertostring2'
            },
            children: [
                ...(this.show === true ? [textNode('Hello')] : []),
                textNode(', world!')
            ]
        })
    }
}

class HydrateSlForComponent1 {
    constructor() {
        this.list = ['a', 'b', 'c', 'd', 'e'];

        const state = getState();
        state.hydrateslformake = 0;
        state.hydrateslforupdate = 0;
        setState(state);
    }

    makeRow(data) {
        const state = getState();
        state.hydrateslformake++;
        setState(state);

        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        const state = getState();
        state.hydrateslforupdate++;
        setState(state);

        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divhydrateslfor1'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfor': 'hydratefor:list:makeRow:updateRow'
                    }
                })
            ]
        });
    }
}

class NamedSlForComponent1 {
    constructor() {
        this.list = ['a', 'b', 'c'];
    }

    slOnInit() {
        this.makeRow.slfor = 'make';
        this.updateRow.slfor = 'update';
        this.getData.slfor = 'data';
    }

    getData() {
        return this.list;
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divnamedslfor1'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfornamed': 'namedfor:data:make:update'
                    }
                })
            ]
        });
    }
}

export class TestSlForCleanupComponent3 {
    constructor() {
        this.show = true;
        this.data = ['a', 'b', 'c'];
    }

    slOnInit() {
        this.getData.slfor = 'data';
        this.makeRow.slfor = 'make';
        this.updateRow.slfor = 'update';
    }

    getData() {
        return this.data;
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    hideList() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslforcleanup3'
            },
            children: [
                ...(this.show === true ? [
                    markup('div', {
                        attrs: {
                            'slfornamed': 'cleanupfornamed:data:make:update'
                        }
                    })
                ] : []),
                markup('button', {
                    attrs: {
                        onclick: this.hideList.bind(this),
                        id: 'slfornamedcleanupbtn'
                    },
                    children: [
                        textNode('Hide List')
                    ]
                })
            ]
        })
    }
}

export class TestSlForMapComponent1 {
    constructor() {
        this.data = ['a', 'b', 'c'];
    }

    slOnInit() {
        this.getData.slfor = 'data';
        this.makeRow.slfor = 'make';
        this.updateRow.slfor = 'update';
    }

    slOnDestroy() {
        console.log('Named slFor destroy hook...');
    }

    getData() {
        return this.data;
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslfornamedmap'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfornamed': 'cleanupfornamedmap:data:make:update'
                    }
                })
            ]
        })
    }
}

export class TestSlForRenderWithoutClass1 {
    constructor() {
        this.data = ['a', 'b', 'c'];
        this.count = 0;
    }

    slOnInit() {
        this.getData.slfor = 'data';
        this.makeRow.slfor = 'make';
        this.updateRow.slfor = 'update';
    }

    simpleClick() {
        this.count++;
    }

    getData() {
        return this.data;
    }

    makeRow(data) {
        const rootNode = renderElementWithoutClass('tr', {
            onclick: this.simpleClick.bind(this),
            id: 'trwithoutclass1'
        }, [
            renderElementWithoutClass('td', {
                'class': 'col-md-1'
            }, [
                data
            ]
            )
        ]
        );

        return rootNode;
    }

    updateRow(context, data) {
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslforrenderwithoutclass'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfornamed': 'slforwithoutclass:data:make:update'
                    }
                })
            ]
        })
    }
}

export class TestEleDestroyMapComponent1 {
    constructor() {

    }

    view() {
        return markup('div', {
            attrs: {
                id: 'diveledestroymap1'
            },
            children: [
                markup('p', {
                    children: [
                        textNode('Destroy Map Test')
                    ]
                }),
                new TestSlForMapComponent1()
            ]
        })
    }
}

export class TestRenderNamedSlForComponent2 {
    constructor() {
        this.data = ['a', 'b', 'c'];
        this.show = true;
        this.secondShow = false;
    }

    slOnInit() {
        this.getData.slfor = 'data';
        this.makeRow.slfor = 'make';
        this.updateRow.slfor = 'update';
    }

    slOnDestroy() {
        console.log('Named slFor destroy hook...');
    }

    getData() {
        return this.data;
    }

    makeRow(data) {
        return markup('p', {
            children: [
                ...(this.show === true ? [
                    markup('span', {
                        children: [
                            markup('kbd', {
                                children: [
                                    textNode('Ctrl')
                                ]
                            }),
                            markup('ul', {
                                children: [
                                    markup('li', {
                                        children: [
                                            textNode('Konnichiwa')
                                        ]
                                    }),
                                    markup('li', {
                                        children: [
                                            textNode('Guten Tag')
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ] : []),
                ...(this.secondShow === true ? [
                    textNode('Bonjour')
                ] : []),
                markup('form', {
                    children: [
                        markup('fieldset', {
                            children: [
                                markup('legend', {
                                    children: [
                                        textNode('Choose your favorite monster')
                                    ]
                                }),
                                markup('input', {
                                    attrs: {
                                        'type': 'radio',
                                        'name': 'monster',
                                        'id': 'kraken'
                                    }
                                }),
                                markup('label', {
                                    attrs: {
                                        'for': 'kraken'
                                    },
                                    children: [
                                        textNode('Kraken')
                                    ]
                                }),
                                markup('div', {
                                    attrs: {
                                        'sldirective': 'trustchildren'
                                    },
                                    children: [
                                        textNode('<br>')
                                    ]
                                }),
                                markup('input', {
                                    attrs: {
                                        'type': 'radio',
                                        'name': 'monster',
                                        'id': 'sasquatch'
                                    }
                                }),
                                markup('label', {
                                    attrs: {
                                        'for': 'sasquatch'
                                    },
                                    children: [
                                        textNode('Sasquatch')
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }

    updateRow(context, data) {

    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslfornamedrender2'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfornamed': 'namedslforrender:data:make:update'
                    }
                })
            ]
        })
    }
}

export class TestLifecycleHookConsumedComponent2 {
    constructor() {
        this.count1 = 0;
        this.count2 = 0;
        this.count3 = 0;
    }

    slOnInit() {
        this.count1++;
    }

    slAfterInit() {
        this.count2++;
    }

    slOnDestroy() {
        this.count3++;
    }

    view() {
        return markup('div', {
            children: [
                markup('p', {
                    children: [
                        textNode('Consumed Lifecycle Component')
                    ]
                })
            ]
        })
    }
}

export class TestLifecycleHookConsumedComponent1 {
    constructor() {
        this.show = true;
    }

    onHide() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divlifecycleconsumed1'
            },
            children: [
                ...(this.show === true ? [
                    markup('p', {
                        children: [
                            textNode('Lifecycle Hook Test')
                        ]
                    }),
                    new TestLifecycleHookConsumedComponent2(),
                    markup('button', {
                        attrs: {
                            'id': 'lifecyclehookconsumedbtn',
                            onclick: this.onHide.bind(this)
                        },
                        children: [
                            textNode('Hide Children')
                        ]
                    })
                ] : [])

            ]
        })
    }
}

export class TestRenderDetachedComponent1 {
    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divtestrenderdetached1'
            },
            children: [
                markup('p', {
                    children: [
                        textNode('Test Render Detached'),
                        new TestRenderDetachedComponent2()
                    ]
                })
            ]
        })
    }
}

export class TestRenderDetachedComponent2 {
    constructor() {
    }

    slOnDestroy() {
        console.log('Render detached destroy...');
    }

    view() {
        return markup('div', {
            children: [
                markup('p', {
                    children: [
                        textNode('Render Detached Destroy Component')
                    ]
                })
            ]
        })
    }
}

export class TestChildViewConsumedComponent2 {
    constructor() {
    }

    view() {
        const state = getState();
        if (state.childviewconsume === undefined) state.childviewconsume = 1;
        else state.childviewconsume++;
        setState(state);

        return markup('p', {
            children: [
                markup('kbd', {
                    children: [
                        textNode('Tab')
                    ]
                })
            ]
        })
    }
}

export class TestChildViewConsumedComponent1 {
    constructor() {
        this.childComp = new TestChildViewConsumedComponent2();
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divchildviewconsume1'
            },
            children: [
                markup('p', {
                    children: [
                        textNode('Test Child View Consumed'),
                        this.childComp.view()
                    ]
                })
            ]
        })
    }
}

export class TestChildViewConsumedComponent3 {
    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divchildviewconsume2'
            },
            children: [
                markup('p', {
                    children: [
                        textNode('Test Child View Consumed'),
                        new TestChildViewConsumedComponent2().view()
                    ]
                })
            ]
        })
    }
}

export class TestConsumeStringComponent1 {
    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divconsumestring1'
            },
            children: [
                markup('kbd', {
                    children: [
                        'Shift'
                    ]
                })
            ]
        })
    }
}

export class TestRenderElementWithoutClassComponent1 {
    constructor() {
        this.data = ['a', 'b', 'c', 'd'];
    }

    slOnInit() {
        this.getData.slfor = 'data';
        this.makeRow.slfor = 'make';
        this.updateRow.slfor = 'update';
    }

    getData() {
        return this.data;
    }

    makeRow(data) {
        return renderElementWithoutClass('p', {
            style: 'color: #cacaca;'
        }, [
            renderElementWithoutClass('kbd', {
            }, [
                textNode(data)
            ]),
            renderElementWithoutClass('span', {
                style: 'color: #6D6D6D;'
            }, [
                textNode(data)
            ])
        ]);
    }

    updateRow(context, data) {
        if (this.childNodes[0].childNodes[0].data !== data) {
            this.childNodes[0].removeChild(this.childNodes[0].childNodes[0]);
            this.childNodes[0].append(data);
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divrenderwithoutclass'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfornamed': 'forrenderwithoutclass:data:make:update'
                    }
                })
            ]
        })
    }
}

export class TestTagRenameComponent1 {
    constructor() {
    }

    view() {
        return markup('nav', {
            attrs: {
                'id': 'divchecktagrename1'
            },
            children: [
                textNode('Tag Rename Test')
            ]
        })
    }
}

export class TestSlStyleComponentSameTag {
    constructor() {
    }

    slStyle() {
        return 'div { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstylesametag'
            },
            children: [
                textNode('Styled div')
            ]
        })
    }
}

export class TestSlStyleComponentDifferentTag {
    constructor() {
    }

    slStyle() {
        return 'nav { background-color: #cacaca; }';
    }

    view() {
        return markup('nav', {
            attrs: {
                'id': 'divslstyledifferenttag'
            },
            children: [
                textNode('Styled nav')
            ]
        })
    }
}

export class TestConsumedSlStyleComponent2 {
    constructor() {
    }

    slStyle() {
        return 'nav { background-color: #cacaca; }';
    }

    view() {
        return markup('nav', {
            children: [
                textNode('slStyle Test')
            ]
        })
    }
}

export class TestConsumedSlStyleComponent1 {
    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyleconsumed1'
            },
            children: [
                new TestConsumedSlStyleComponent2(),
                textNode('slStyle Consumed Test Parent'),
                markup('nav', {
                    attrs: {
                        id: 'styleconsumedcleannav'
                    },
                    children: [
                        textNode('Unscoped nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent1 {
    constructor() {
    }

    slStyle() {
        return 'div span { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle1'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent6 {
    constructor() {
    }

    slStyle() {
        return '@layer foo { div span { background-color: #cacaca; }}';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle6'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent7 {
    constructor() {
    }

    slStyle() {
        return '@layer foo { @layer bar{div span { background-color: #cacaca; }}}';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle7'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent8 {
    constructor() {
    }

    slStyle() {
        return '@layer foo; div span { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle8'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent9 {
    constructor() {
    }

    slStyle() {
        return '@layer foo, bar, baz; div span { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle9'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent10 {
    constructor() {
    }

    slStyle() {
        return '@layer foo { div span { background-color: #cacaca; } @layer bar { table a { color: red; } } }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle10'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent11 {
    constructor() {
    }

    slStyle() {
        return '@layer utilities { [data-color=\'brand\'] { color: #ca2222; } }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle11'
            },
            children: [
                markup('span', {
                    attrs: {
                        'data-color': 'brand'
                    },
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent12 {
    constructor() {
    }

    slStyle() {
        return 'a:first-child:any-link { border: 1px solid blue; color: orange; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle12'
            },
            children: [
                markup('a', {
                    attrs: {
                        'href': 'www.google.com',
                        slpreventdefault: true
                    },
                    children: [
                        textNode('Google')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent13 {
    constructor() {
    }

    slStyle() {
        return '@layer foo{a:first-child:any-link { border: 1px solid blue; color: orange !important; }}';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle13'
            },
            children: [
                markup('a', {
                    attrs: {
                        'href': 'www.google.com',
                        slpreventdefault: true
                    },
                    children: [
                        textNode('Google')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent14 {
    constructor() {
    }

    slStyle() {
        return '@layer foo { div span { background-color: #cacaca; } @layer bar { @layer baz { table div { background-color: #fafafa; } } table a { color: red; } } }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle14'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('div', {
                            children: [
                                textNode('Text with background color.')
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent15 {
    constructor() {
    }

    slStyle() {
        return '@layer foo { div span { background-color: #cacaca; } @layer bar { table p { color: blue; } @layer baz { table div { background-color: #fafafa; } } table a { color: red; } } }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle15'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('div', {
                            children: [
                                textNode('Text with background color.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Blue paragraph.')
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent16 {
    constructor() {
    }

    slStyle() {
        return '@layer foo { div span { background-color: #cacaca; } @layer bar { table p { color: blue; } @layer baz { a kbd { color: green; } @layer quzzy { table div { background-color: #fafafa; } } } table a { color: red; } } }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle16'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('div', {
                            children: [
                                textNode('Text with background color.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Blue paragraph.')
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent17 {
    constructor() {
    }

    slStyle() {
        return '@layer foo { div span { background-color: #cacaca; } @layer bar { table p { color: blue; } @layer baz { a kbd { color: green; } @layer quzzy { table div { background-color: #fafafa; } @layer fake { ul li { background-color: #fafafa; } } kbd { background-color: #888888; } } } table a { color: red; } @layer util { input { border: 1px solid; }  } }}';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle17'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('div', {
                            children: [
                                textNode('Text with background color.')
                            ]
                        }),
                        markup('p', {
                            children: [
                                textNode('Blue paragraph.')
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent18 {
    constructor() {
    }

    slStyle() {
        return 'span { background-color: #fafafa; } button { --handle: { pointerdown(event) { console.log(event.type, event.target); }, async click(event) { console.log( await Promise.resolve(\'CSS can do that.\') ); }, }; } nav { background-color: #fafafa; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle18'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('button', {
                    children: [
                        textNode('A button.')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent19 {
    constructor() {
    }

    slStyle() {
        return 'span { background-color: #fafafa; } button { --handle: { pointerdown(event) { console.log(event.type, event.target); }, async click(event) { console.log( await Promise.resolve(\'CSS can do that.\') ); }, }; --test: { async click(event) { console.log(\'test\'); } }; } nav { background-color: #fafafa; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle19'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('button', {
                    children: [
                        textNode('A button.')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent20 {
    constructor() {
    }

    slStyle() {
        return 'span { background-color: #fafafa; } button { --handle: #444444; --test: #888888; } nav { background-color: #fafafa; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle20'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('Styled span')
                    ]
                }),
                markup('button', {
                    children: [
                        textNode('A button.')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent21 {
    constructor() {
    }

    slStyle() {
        return 'p { color: blue; } table { & td { background-color: #888888; } & th { background-color: #229999; } } span { color: blue; }';
    }

    view() {
        return markup('table', {
            attrs: {
                'id': 'divslstyle21'
            },
            children: [
                markup('tr', {
                    children: [
                        markup('th', {
                            children: [
                                textNode('Header')
                            ]
                        })
                    ]
                }),
                markup('tr', {
                    children: [
                        markup('td', {
                            children: [
                                textNode('Data')
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent22 {
    constructor() {
    }

    slStyle() {
        return 'p { color: blue; } table { & td { background-color: #888888; &:first-child { color: blue; } } & th { background-color: #229999; } @nest .dark & { background-color: blue; } } span { color: blue; }';
    }

    view() {
        return markup('table', {
            attrs: {
                'id': 'divslstyle22'
            },
            children: [
                markup('tr', {
                    children: [
                        markup('th', {
                            children: [
                                textNode('Header')
                            ]
                        })
                    ]
                }),
                markup('tr', {
                    children: [
                        markup('td', {
                            children: [
                                markup('span', {
                                    children: [
                                        textNode('Data span')
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent23 {
    constructor() {
    }

    slStyle() {
        return 'p { color: blue; } table { & td { background-color: #888888; &:first-child { color: blue; }} & :where(tr) { padding: 0.25rem; display: block; } & th { background-color: #229999;} @nest .dark & { background-color: blue; } } span { color: blue; }';
    }

    view() {
        return markup('table', {
            attrs: {
                'id': 'divslstyle23'
            },
            children: [
                markup('tr', {
                    children: [
                        markup('th', {
                            children: [
                                textNode('Header')
                            ]
                        })
                    ]
                }),
                markup('tr', {
                    children: [
                        markup('td', {
                            children: [
                                markup('span', {
                                    children: [
                                        textNode('Data span')
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent24 {
    constructor() {
    }

    slStyle() {
        return 'p { color: blue; } button { --handle: { pointerdown(event) { console.log(event.type, event.target); }, async click(event) { console.log( await Promise.resolve(\'CSS can do that.\') ); }, }; --test: { async click(event) { console.log(\'test\'); } }; } table { & td { background-color: #888888; &:first-child { color: blue; }} & :where(tr) { padding: 0.25rem; display: block; } & th { background-color: #229999;} @nest .dark & { background-color: blue; } } span { color: blue; }';
    }

    view() {
        return markup('table', {
            attrs: {
                'id': 'divslstyle24'
            },
            children: [
                markup('tr', {
                    children: [
                        markup('th', {
                            children: [
                                textNode('Header')
                            ]
                        })
                    ]
                }),
                markup('tr', {
                    children: [
                        markup('td', {
                            children: [
                                markup('span', {
                                    children: [
                                        textNode('Data span')
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent25 {
    constructor() {
    }

    slStyle() {
        return `p { color: blue; } 
        table { 
            button { 
                --handle: { 
                    pointerdown(event) { 
                        console.log(event.type, event.target); 
                    }, 
                    async click(event) { 
                        console.log( await Promise.resolve(\'CSS can do that.\') ); 
                    }, 
                }; 
                --test: { 
                    async click(event) { 
                        console.log(\'test\'); 
                    } 
                }; 
            } 
            & td { 
                background-color: #888888; 
                
                &:first-child { 
                    color: blue; 
                }
            } 
            & :where(tr) { 
                padding: 0.25rem; 
                display: block; 
            } 
            & th { 
                background-color: #229999;
            } 
            @nest .dark & { 
                background-color: blue; 
            } 
        } 
        span { 
            color: blue; 
        }`;
    }

    view() {
        return markup('table', {
            attrs: {
                'id': 'divslstyle25'
            },
            children: [
                markup('tr', {
                    children: [
                        markup('th', {
                            children: [
                                textNode('Header')
                            ]
                        })
                    ]
                }),
                markup('tr', {
                    children: [
                        markup('td', {
                            children: [
                                markup('span', {
                                    children: [
                                        textNode('Data span')
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponentQuoted1 {
    constructor() {
    }

    slStyle() {
        return `
        div a[target="_complex{"], nav {
            background-color: #cacaca; 
        }
        
        @layer bluetheme {
            h3[target="_complex{"] {
                color: blue;
            }

            @layer bluethemetwo {
                h3[target="_complex{"], nav[target="_complex{"] {
                    color: red;
                }
            }
        }
        
        @container (min-width: 100px) { 
            nav[target="_complex{"] { 
                background-color: #cacaca; 
            } 

            @layer bluethemetwo {
                h6[target="_complex{"], nav[target="_complex{"] {
                    color: red;
                }
            }

            figure[target="_complex{"], aside[target="_complex{"] {
                color: #cacaca;
            }
        }

        @media (prefers-color-scheme: light) {
            background: #ccc;

            nav[target="_complex{"] {
                color: blue;
            }
        }

        @scope (.media-object) {
            .author-image[target="_complex{"] { 
                border-radius: 50%; 
            }
        }
        `;
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstylequoted1'
            },
            children: [
                markup('a', {
                    attrs: {
                        target: "_complex{",
                        slpreventdefault: true
                    },
                    children: [
                        textNode('Styled a')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Styled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent2 {
    constructor() {
    }

    slStyle() {
        return 'div a[target="_complex{"] { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle2'
            },
            children: [
                markup('a', {
                    attrs: {
                        target: "_complex{",
                        slpreventdefault: true
                    },
                    children: [
                        textNode('Styled a')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleContainer1 {
    constructor() {
    }

    slStyle() {
        return '#divslstylecontainer1 { container-type: inline-size; } @container (min-width: 100px) { nav { background-color: #cacaca; } }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstylecontainer1'
            },
            children: [
                markup('nav', {
                    children: [
                        textNode('Styled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent3 {
    constructor() {
    }

    slStyle() {
        return 'div a[target="_complex{"], nav { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle3'
            },
            children: [
                markup('a', {
                    attrs: {
                        target: "_complex{",
                        slpreventdefault: true
                    },
                    children: [
                        textNode('Styled a')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent4 {
    constructor() {
    }

    slStyle() {
        return 'div a[target="_complex{"], nav { background-color: #cacaca; } kbd { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle4'
            },
            children: [
                markup('a', {
                    attrs: {
                        target: "_complex{",
                        slpreventdefault: true
                    },
                    children: [
                        textNode('Styled a')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                }),
                markup('kbd', {
                    children: [
                        textNode('Tab')
                    ]
                })
            ]
        })
    }
}

export class TestSlStyleComponent5 {
    constructor() {
    }

    slStyle() {
        return 'div a[target="_complex{"], nav background-color: #cacaca; kbd background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle5'
            },
            children: [
                markup('a', {
                    attrs: {
                        target: "_complex{",
                        slpreventdefault: true
                    },
                    children: [
                        textNode('Styled a')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                }),
                markup('kbd', {
                    children: [
                        textNode('Tab')
                    ]
                })
            ]
        })
    }
}

export class TestSlDetachedInAutomaticMode1 {
    constructor() {
        this.count = 0;
    }

    slDetachedIncrementCount() {
        this.count++;
    }

    view() {
        const state = getState();
        if (state.detachfncount === undefined) state.detachfncount = 1;
        else state.detachfncount++;
        setState(state);

        return markup('div', {
            attrs: {
                'id': 'divtestdetachedinautomatic1'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.slDetachedIncrementCount.bind(this),
                        id: 'detachedbtn1'
                    },
                    children: [
                        textNode('Detached Button')
                    ]
                })
            ]
        })
    }
}

export class TestSlDetachedInAutomaticMode2 {
    constructor() {
        this.count = 0;
    }

    slDetachedIncrementCount() {
        console.log('Detached count function.');
    }

    view() {
        const state = getState();
        if (state.detachfncount === undefined) state.detachfncount = 1;
        else state.detachfncount++;
        setState(state);

        return markup('div', {
            attrs: {
                'id': 'divtestdetachedinautomatic2'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.slDetachedIncrementCount,
                        id: 'detachedbtn2'
                    },
                    children: [
                        textNode('Detached Button')
                    ]
                })
            ]
        })
    }
}

export class TestThenDetectComponent1 {
    constructor() {
        this.data = '';
    }

    slAfterInit() {
        slGet('https://www.apimock.live').then(xhrResp => {
            this.data = xhrResp.response;

            if (this.data.length > 50) {
                this.data = this.data.substring(0, 50);
            }
        });
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divdetectthen1'
            },
            children: [
                textNode(this.data)
            ]
        })
    }
}

export class TestKeyedHideAnimation1 {
    constructor() {
        this.list = ['a', 'b', 'c'];
        this.toRemoveIndex = 1;
    }

    slDetachedOnNodeDestroy(proposedNode) {
        const parent = proposedNode.parentNode;
        return parent.childNodes[this.toRemoveIndex];
    }

    onHide() {
        this.list.splice(1, 1);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divkeyedanimation1'
            },
            children: [
                ...Array.from(this.list, (note) =>
                    markup('div', {
                        attrs: {
                            slanimatedestroy: 'animExit',
                            slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this)
                        },
                        children: [
                            markup('p', {
                                children: [
                                    textNode(note)
                                ]
                            })
                        ]
                    })
                ),
                markup('button', {
                    attrs: {
                        id: 'keyedhidebtn1',
                        onclick: this.onHide.bind(this)
                    },
                    children: [
                        textNode('Keyed Hide Button')
                    ]
                })
            ]
        });
    }
}

export class TestReapplyScopedCss2 {
    constructor() {
    }

    slStyle() {
        return 'nav { background-color: #cacaca; }';
    }

    view() {
        return markup('nav', {
            children: [
                textNode('Styled nav')
            ]
        });
    }
}

export class TestReapplyScopedCss1 {
    constructor() {
        this.show = true;
    }

    onToggle() {
        this.show = !this.show;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divscopedcssreapply1'
            },
            children: [
                ...(this.show === true ? [
                    new TestReapplyScopedCss2()
                ] : []),
                markup('button', {
                    attrs: {
                        id: 'reapplycssbtn1',
                        onclick: this.onToggle.bind(this)
                    },
                    children: [
                        textNode('Toggle Scoped CSS')
                    ]
                })
            ]
        });
    }
}

export class TestMutationObserver1 {
    constructor() {
        this.show = true;
        this.label = 'Hello, ';
    }

    onToggle() {
        this.show = !this.show;

        if (this.label === 'Hello, ') {
            this.label = 'world!';
        } else {
            this.label = 'Hello, ';
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divmutationobserver1'
            },
            children: [
                ...(this.show === true ? [
                    markup('kbd', {
                        children: [
                            textNode('Tab')
                        ]
                    })
                ] : []),
                markup('button', {
                    attrs: {
                        id: 'mutationobserverbtn1',
                        onclick: this.onToggle.bind(this),
                        ...this.show === true && { style: 'background-color: #cacaca;' },
                        ...this.show === false && { style: 'background-color: #135ac0;' }
                    },
                    children: [
                        textNode('Toggle Hidden Elements')
                    ]
                }),
                ...(this.show === true ? [
                    markup('span', {
                        children: [
                            textNode('A <span>')
                        ]
                    })
                ] : [
                    markup('div', {
                        children: [
                            textNode('A <div>')
                        ]
                    })
                ])
            ]
        });
    }
}

export class TestMutationObserver2 {
    constructor() {
        this.show = true;
        this.label = 'Hello, ';
    }

    onToggle() {
        this.show = !this.show;

        if (this.label === 'Hello, ') {
            this.label = 'world!';
        } else {
            this.label = 'Hello, ';
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divmutationobserver2'
            },
            children: [
                markup('span', {
                    children: [
                        textNode('<span> to preserve')
                    ]
                }),
                markup('kbd', {
                    children: [
                        textNode('Tab')
                    ]
                }),
                markup('button', {
                    attrs: {
                        id: 'mutationobserverbtn2',
                        onclick: this.onToggle.bind(this),
                        ...this.show === true && { style: 'background-color: #cacaca;' },
                        ...this.show === false && { style: 'background-color: #135ac0;' }
                    },
                    children: [
                        textNode('Toggle Hidden Elements')
                    ]
                }),
                ...(this.show === true ? [
                    markup('span', {
                        children: [
                            textNode('A <span>')
                        ]
                    })
                ] : [
                    markup('div', {
                        children: [
                            textNode('A <div>')
                        ]
                    })
                ]),
                markup('div', {
                    children: [
                        textNode('<div> to preserve')
                    ]
                }),
            ]
        });
    }
}

export class TestMutationObserver3 {
    constructor() {
        this.show = true;
        this.label = 'Hello, ';
    }

    onToggle() {
        this.show = !this.show;

        if (this.label === 'Hello, ') {
            this.label = 'world!';
        } else {
            this.label = 'Hello, ';
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divmutationobserver3'
            },
            children: [
                markup('button', {
                    attrs: {
                        id: 'mutationobserverbtn3',
                        onclick: this.onToggle.bind(this)
                    },
                    children: [
                        textNode('Toggle Hidden Elements')
                    ]
                }),
                ...(this.show === true ? [
                    markup('nav', {
                        children: [
                            textNode('A <nav>')
                        ]
                    }),
                    markup('span', {
                        children: [
                            textNode(this.label)
                        ]
                    })
                ] : [
                    markup('p', {
                        children: [
                            textNode('A <p>')
                        ]
                    }),
                    markup('span', {
                        children: [
                            textNode(this.label)
                        ]
                    })
                ])
            ]
        });
    }
}

export class TestQueryStringComponent1 {
    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divquerystring1'
            },
            children: [
                textNode('Query String Test')
            ]
        });
    }
}

export class TestPathNameComponent1 {
    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divpathname1'
            },
            children: [
                textNode('Path Name Test')
            ]
        });
    }
}

export class TestAnimateRoute1 {
    slDetachedOnNodeDestroy(proposedNode) {
        return proposedNode;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divanimateroute',
                class: 'visible',
                slanimatedestroy: 'hide',
                slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this)
            },
            children: [
                markup('kbd', {
                    children: [
                        textNode('Tab')
                    ]
                }),
                textNode('Test Animate Route 1')
            ]
        })
    }
}

export class TestAnimateRoute2 {
    slDetachedOnNodeDestroy(proposedNode) {
        return proposedNode;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divanimateroute',
                class: 'visible',
                slanimatedestroy: 'hide',
                slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this)
            },
            children: [
                textNode('Test Animate Route 2'),
                markup('button', {
                    children: [
                        textNode('Tab')
                    ]
                })
            ]
        })
    }
}

export class TestAnimateRoute3 {
    view() {
        return markup('div', {
            attrs: {
                id: 'divanimateroute',
                class: 'visible',
                slanimatedestroy: 'hide',
            },
            children: [
                markup('kbd', {
                    children: [
                        textNode('Tab')
                    ]
                }),
                textNode('Test Animate Route 1')
            ]
        })
    }
}

export class TestAnimateRoute4 {
    view() {
        return markup('div', {
            attrs: {
                id: 'divanimateroute',
                class: 'visible',
                slanimatedestroy: 'hide',
            },
            children: [
                textNode('Test Animate Route 2'),
                markup('button', {
                    children: [
                        textNode('Tab')
                    ]
                })
            ]
        })
    }
}

export class TestAnimateRoute5 {
    view() {
        return markup('div', {
            attrs: {
                id: 'divanimateroute',
                class: 'visible',
                slanimatedestroy: 'hide',
            },
            children: [
                markup('kbd', {
                    children: [
                        textNode('Tab')
                    ]
                }),
                textNode('Test Animate Route 1')
            ]
        })
    }
}

export class TestAnimateRoute6 {
    view() {
        return markup('div', {
            attrs: {
                id: 'divanimateroute',
                class: 'visible',
                slanimatedestroy: 'hide',
            },
            children: [
                textNode('Test Animate Route 2'),
                markup('button', {
                    children: [
                        textNode('Tab')
                    ]
                })
            ]
        })
    }
}

export class TestAnimationFunctionsPreserved1 {
    constructor() {
        this.show = true;
    }

    slAfterInit() {
        const ele = document.getElementById('animpreservebtn1');
        ele.onanimationstart = () => {
            const state = getState();
            if (state.animationstartpreserve === undefined) state.animationstartpreserve = 1;
            else state.animationstartpreserve++;
            setState(state);
        }
        ele.onanimationend = () => {
            const state = getState();
            if (state.animationendpreserve === undefined) state.animationendpreserve = 1;
            else state.animationendpreserve++;
            setState(state);
        }
    }

    hideMarkup() {
        this.show = false;
    }

    showMarkup() {
        this.show = true;
    }

    slDetachedOnNodeDestroy(node) {
        return node;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divanimationfunctions1',
            },
            children: [
                ...(this.show === true ? [
                    markup('button', {
                        children: [
                            textNode('Test Animation Functions 1')
                        ]
                    }),
                    markup('button', {
                        attrs: {
                            id: 'animpreservebtn1',
                            onclick: this.hideMarkup.bind(this),
                            slanimatedestroy: 'hide',
                            slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this)
                        },
                        children: [
                            textNode('Hide')
                        ]
                    })
                ] : [
                    markup('button', {
                        attrs: {
                            id: 'animpreservebtn1',
                            onclick: this.showMarkup.bind(this),
                            slanimatedestroy: 'hide'
                        },
                        children: [
                            textNode('Show')
                        ]
                    })
                ])
            ]
        })
    }
}

class TestCanUpdateDuringAnimation1 {
    constructor() {
        this.updated = false;
    }

    slAfterInit() {
        const state = getState();
        state.duringanimation = 0;
        setState(state);
    }

    view() {
        const state = getState();
        if (state.duringanimation !== null && state.duringanimation !== undefined
            && state.duringanimationcanproceed === true) {
            state.duringanimation++;
            this.updated = true;
            setState(state);
        }

        return markup('div', {
            attrs: {
                id: 'divduringanimation',
            },
            children: [
                ...(this.updated === false ? [
                    markup('h1', {
                        children: [
                            textNode('Hello, world!'),
                        ],
                    }),
                ] : [
                    markup('h1', {
                        children: [
                            textNode('Updated during animation'),
                        ],
                    }),
                ])
            ],
        });
    }
}

class TestAnimateRouteToggle3 {
    constructor() {
        this.welcomeHidden = false;
    }

    hideWelcome() {
        route('animroutetoggle4');
    }

    slDetachedOnNodeDestroy(node) {
        return node;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divRouterOutlet3',
                class: 'visible',
                style:
                    'display: flex; justify-content: center; align-items: center; height: 100%;',
                slanimatedestroy: 'hide',
                slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this),
            },
            children: [
                markup('h1', {
                    children: [
                        textNode('Hello, world!'),
                        markup('button', {
                            attrs: {
                                id: 'toggleanimroute3',
                                onclick: this.hideWelcome.bind(this),
                            },
                            children: [textNode('Hide')],
                        })
                    ],
                }),
            ],
        });
    }
}

class TestAnimateRouteToggle4 {
    constructor() {
        this.welcomeHidden = false;
    }

    hideWelcome() {
        route('animroutetoggle3');
    }

    slDetachedOnNodeDestroy(node) {
        return node;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divRouterOutlet3',
                class: 'visible',
                style:
                    'display: flex; justify-content: center; align-items: center; height: 100%;',
                slanimatedestroy: 'hide',
                slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this),
            },
            children: [
                markup('h1', {
                    children: [
                        textNode('Hello, world 2!'),
                        markup('button', {
                            attrs: {
                                id: 'toggleanimroute4',
                                onclick: this.hideWelcome.bind(this),
                            },
                            children: [textNode('Hide 2')],
                        })
                    ],
                }),
            ],
        });
    }
}

class TestAnimateRouteToggle1 {
    constructor() {
        this.welcomeHidden = false;
    }

    hideWelcome() {
        route('animroutetoggle2');
    }

    slDetachedOnNodeDestroy(node) {
        return node;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divRouterOutlet2',
                class: 'visible',
                style:
                    'display: flex; justify-content: center; align-items: center; height: 100%;',
                slanimatedestroy: 'hide',
                slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this),
            },
            children: [
                markup('h1', {
                    children: [
                        textNode('Hello, world!'),
                        markup('button', {
                            attrs: {
                                id: 'toggleanimroute1',
                                onclick: this.hideWelcome.bind(this),
                            },
                            children: [textNode('Hide')],
                        })
                    ],
                }),
            ],
        });
    }
}

class TestAnimateRouteToggle2 {
    constructor() {
        this.welcomeHidden = false;
    }

    hideWelcome() {
        route('animroutetoggle1');
    }

    slDetachedOnNodeDestroy(node) {
        return node;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divRouterOutlet2',
                class: 'visible',
                style:
                    'display: flex; justify-content: center; align-items: center; height: 100%;',
                slanimatedestroy: 'hide',
                slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this),
            },
            children: [
                markup('h1', {
                    children: [
                        textNode('Hello, world 2!'),
                        markup('button', {
                            attrs: {
                                id: 'toggleanimroute1',
                                onclick: this.hideWelcome.bind(this),
                            },
                            children: [textNode('Hide 2')],
                        })
                    ],
                }),
            ],
        });
    }
}

export class GlobalTestRunner {

    constructor() {
        this.someClassMember = 123;
    }

    isElement(obj) {
        try {
            //Using W3 DOM2 (works for FF, Opera and Chrome)
            return obj instanceof HTMLElement;
        }
        catch (e) {
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have (works on IE7)
            return (typeof obj === 'object') &&
                (obj.nodeType === 1) && (typeof obj.style === 'object') &&
                (typeof obj.ownerDocument === 'object');
        }
    }

    testFinalize100NewConsumedClassHookCalled() {
        const result = {
            test: 'test new consumed class hook is called',
            success: false,
            message: ''
        };

        mount('newconsumeddiv1', new NewConsumedClassHooksCalledTestComponent3());

        const buttonEle = document.getElementById('newconsumedbutton1');
        buttonEle.click();

        setTimeout(() => {
            const state = getState();
            const count1 = state.newConsumed1 === 1;
            const count2 = state.newConsumed2 === 1;

            result.success = count1 && count2;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 25);
    }

    testFinalize100PreventDefault() {
        const result = {
            test: 'test prevent default applies one event listener',
            success: false,
            message: ''
        };

        mount('divpreventdefault1', new TestPreventDefault1());

        let anchorEle = document.getElementById('preventdefaultanchor1');
        anchorEle.click();

        setTimeout(() => {
            detectChanges();

            setTimeout(() => {
                anchorEle = document.getElementById('preventdefaultanchor1');
                const evtListeners = anchorEle['onclick'];

                let listenerCount = 0;

                if (evtListeners) {
                    const evtListenerArray = Array.isArray(evtListeners) ? evtListeners : [evtListeners];
                    listenerCount = evtListenerArray.length;
                }

                result.success = listenerCount === 1;

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 25);
        }, 25);
    }

    testFinalize100PreserveScrollPosition() {
        const result = {
            test: 'test scroll position preserved',
            success: false,
            message: ''
        };

        const scrollPosition = window.pageYOffset;

        mount('divpreservescroll1', new TestPreserveScrollPosition1());

        const scrollPosition2 = window.pageYOffset;

        let anchorEle = document.getElementById('preservescrollanchor1');
        anchorEle.click();

        const scrollPosition3 = window.pageYOffset;

        setTimeout(() => {
            detectChanges();

            const scrollPosition4 = window.pageYOffset;

            setTimeout(() => {
                result.success = scrollPosition === scrollPosition2 && scrollPosition === scrollPosition3 && scrollPosition === scrollPosition4;

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 25);
        }, 25);
    }

    testFinalize100NoPreserveScrollPosition() {
        const result = {
            test: 'test scroll position not preserved',
            success: false,
            message: ''
        };

        let scrollPosition = window.pageYOffset;

        if (scrollPosition === 0) {
            window.scrollTo(0, 10);
            scrollPosition = window.pageYOffset;
        }

        mount('divnopreservescroll1', new TestNoPreserveScrollPosition1());

        const scrollPosition2 = window.pageYOffset;

        let anchorEle = document.getElementById('nopreservescrollanchor1');
        anchorEle.click();

        const scrollPosition3 = window.pageYOffset;

        setTimeout(() => {
            detectChanges();

            const scrollPosition4 = window.pageYOffset;

            setTimeout(() => {
                result.success = scrollPosition === scrollPosition2 && scrollPosition !== scrollPosition3 && scrollPosition !== scrollPosition4;

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 25);
        }, 25);
    }

    testFinalize100AnimateWithinSameRoute() {
        const result = {
            test: 'test keyed animation within same route',
            success: false,
            message: ''
        };

        mount('divRouterOutletAnim', new HelloWorldComponentAnimate());

        setTimeout(() => {
            const btn1 = document.getElementById('btnanim1');
            btn1.click();

            setTimeout(() => {
                const btn2 = document.getElementById('btnanim2');
                btn2.click();

                setTimeout(() => {
                    const ele = document.getElementById('divRouterOutletAnim');

                    result.success = ele && ele.children && ele.children.length === 1 && ele.children[0] && ele.children[0].childNodes.length === 2;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                }, 550);
            }, 550);
        }, 500);
    }

    testFinalize300TerserMarkupFunctionOverload() {
        const result = {
            test: 'test terser markup function overload',
            success: false,
            message: ''
        };

        mount('divtersermarkup1', new TestTerserMarkupOverloadComponent());

        const ele = document.getElementById('divtersermarkup1');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        result.success = ele && ele.childNodes && ele.childNodes.length === 2 && ele.children[0] && ele.children[0].tagName === 'SPAN'
            && ele.children[0].childNodes[0].textContent === 'Blue text.'
            && ele.childNodes[1] && ele.childNodes[1].textContent === 'Regular text.'
            && color === 'rgb(0, 0, 255)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRunLastDestroyMapNoDuplicates() {
        const result = {
            test: 'test destroy map contains no duplicate nodes',
            success: false,
            message: ''
        };

        const nodeSet = new Set();
        let hasDuplicates = false;

        for (const [key, value] of s._destroyNodeMap) {
            if (value !== null && value !== undefined && value.length > 0) {
                for (let i = 0; i < value.length; ++i) {
                    if (nodeSet.has(value[i])) {
                        hasDuplicates = true;

                        break;
                    } else {
                        nodeSet.add(value[i]);
                    }
                }
            }

            if (hasDuplicates) {
                break;
            }
        }

        result.success = !hasDuplicates;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRunLastDestroyFunctionReferenceNoDuplicates() {
        const result = {
            test: 'test there are no duplicate destroy function references',
            success: false,
            message: ''
        };

        const fnSet = new Set();
        const nodeSet = new Set();
        let hasDuplicates = false;
        let count = 0;

        const stack = [];

        for (const bodyChild of document.body.children) {
            stack.push(bodyChild);
        }

        while (stack.length > 0) {
            const node = stack.pop();

            if (node.id !== undefined && node.id !== null && nodeSet.has(node.id)) {
                continue;
            } else {
                nodeSet.add(node.id);
            }

            count++;
            const fn = node.slOnDestroyFn;

            if (fn !== undefined && fn !== null) {
                if (fnSet.has(fn)) {
                    hasDuplicates = true;

                    break;
                } else {
                    fnSet.add(fn);
                }
            }

            if (hasDuplicates) {
                break;
            }

            for (const child of node.children) {
                stack.push(child);
            }
        }

        console.log('Evaluated ' + count + ' nodes in body for duplicate destroy functions');

        result.success = !hasDuplicates;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRunLastUnboundDestroyFunctionReferenceNoDuplicates() {
        const result = {
            test: 'test there are no duplicate unbound destroy function references',
            success: false,
            message: ''
        };

        const fnSet = new Set();
        const nodeSet = new Set();
        let hasDuplicates = false;
        let count = 0;

        const stack = [];

        for (const bodyChild of document.body.children) {
            stack.push(bodyChild);
        }

        while (stack.length > 0) {
            const node = stack.pop();

            if (node.id !== undefined && node.id !== null && nodeSet.has(node.id)) {
                continue;
            } else {
                nodeSet.add(node.id);
            }

            count++;
            const fn = node.slUnboundOnDestroy;

            if (fn !== undefined && fn !== null) {
                console.log(fn);
                console.log(node);

                if (fnSet.has(fn)) {
                    hasDuplicates = true;

                    break;
                } else {
                    fnSet.add(fn);
                }
            }

            if (hasDuplicates) {
                break;
            }

            for (const child of node.children) {
                stack.push(child);
            }
        }

        console.log('Evaluated ' + count + ' nodes in body for duplicate unbound destroy functions');

        result.success = !hasDuplicates;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRunLastAfterInitFunctionReferenceNoDuplicates() {
        const result = {
            test: 'test there are no duplicate unbound after init function references',
            success: false,
            message: ''
        };

        const fnSet = new Set();
        const nodeSet = new Set();
        let hasDuplicates = false;
        let count = 0;

        const stack = [];

        for (const bodyChild of document.body.children) {
            stack.push(bodyChild);
        }

        while (stack.length > 0) {
            const node = stack.pop();

            if (node.id !== undefined && node.id !== null && nodeSet.has(node.id)) {
                continue;
            } else {
                nodeSet.add(node.id);
            }

            count++;
            const fn = node.slUnboundAfterInit;

            if (fn !== undefined && fn !== null) {
                if (fnSet.has(fn)) {
                    hasDuplicates = true;

                    break;
                } else {
                    fnSet.add(fn);
                }
            }

            if (hasDuplicates) {
                break;
            }

            for (const child of node.children) {
                stack.push(child);
            }
        }

        console.log('Evaluated ' + count + ' nodes in body for duplicate unbound after init functions');

        result.success = !hasDuplicates;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRunLastOnInitFunctionReferenceNoDuplicates() {
        const result = {
            test: 'test there are no duplicate unbound on init function references',
            success: false,
            message: ''
        };

        const fnSet = new Set();
        const nodeSet = new Set();
        let hasDuplicates = false;
        let count = 0;

        const stack = [];

        for (const bodyChild of document.body.children) {
            stack.push(bodyChild);
        }

        while (stack.length > 0) {
            const node = stack.pop();

            if (node.id !== undefined && node.id !== null && nodeSet.has(node.id)) {
                continue;
            } else {
                nodeSet.add(node.id);
            }

            count++;
            const fn = node.slUnboundOnInit;

            if (fn !== undefined && fn !== null) {
                if (fnSet.has(fn)) {
                    hasDuplicates = true;

                    break;
                } else {
                    fnSet.add(fn);
                }
            }

            if (hasDuplicates) {
                break;
            }

            for (const child of node.children) {
                stack.push(child);
            }
        }

        console.log('Evaluated ' + count + ' nodes in body for duplicate unbound on init functions');

        result.success = !hasDuplicates;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRunLastFunctionMapNoDuplicates() {
        const result = {
            test: 'test destroy function map contains no duplicates',
            success: false,
            message: ''
        };

        const fnSet = new Set();
        let hasDuplicates = false;

        for (const [key, value] of s._destroyFuncMap) {
            if (value !== null && value !== undefined && value.length > 0) {
                for (let i = 0; i < value.length; ++i) {
                    if (fnSet.has(value[i])) {
                        hasDuplicates = true;

                        break;
                    } else {
                        fnSet.add(value[i]);
                    }
                }
            }

            if (hasDuplicates) {
                break;
            }
        }

        result.success = !hasDuplicates;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRunLastToggleBetweenAnimatedRoutes() {
        const result = {
            test: 'test toggling between animated routes',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            const state = getState();

            if (window.globalAsyncCount === 0 && window.globalTestCount >= state.testCount && window.runAnimRouteToggle) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);
                mount('divanimationfunctions1', new TestAnimationFunctionsPreserved1());

                addRoute('animroutetoggle1', {
                    component: new TestAnimateRouteToggle1(),
                    root: 'divRouterOutlet2',
                    animateDestroy: true
                });
                addRoute('animroutetoggle2', {
                    component: new TestAnimateRouteToggle2(),
                    root: 'divRouterOutlet2',
                    animateDestroy: true
                });

                route('animroutetoggle1');

                setTimeout(() => {
                    let rootEle = document.getElementById('divRouterOutlet2');
                    const rootCorrect = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                    const h1Correct = rootCorrect && rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                        && rootEle.children[0].childNodes[0].textContent === 'Hello, world!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                        && rootEle.children[0].childNodes[1].textContent === 'Hide';

                    setTimeout(() => {
                        // Animation ended
                        rootEle = document.getElementById('divRouterOutlet2');
                        const rootCorrectFinal = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                        const h1CorrectFinal = rootCorrect && rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                            && rootEle.children[0].childNodes[0].textContent === 'Hello, world!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                            && rootEle.children[0].childNodes[1].textContent === 'Hide';

                        route('animroutetoggle2');

                        setTimeout(() => {
                            const rootCorrectFinal2 = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                            const h1CorrectFinal2 = rootCorrect && rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                                && rootEle.children[0].childNodes[0].textContent === 'Hello, world!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                                && rootEle.children[0].childNodes[1].textContent === 'Hide';

                            setTimeout(() => {
                                const rootCorrectFinal3 = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                                const h1CorrectFinal3 = rootCorrect && rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                                    && rootEle.children[0].childNodes[0].textContent === 'Hello, world!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                                    && rootEle.children[0].childNodes[1].textContent === 'Hide';

                                setTimeout(() => {
                                    const rootCorrectFinal4 = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                                    const h1CorrectFinal4 = rootCorrect && rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                                        && rootEle.children[0].childNodes[0].textContent === 'Hello, world 2!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                                        && rootEle.children[0].childNodes[1].textContent === 'Hide 2';

                                    route('animroutetoggle1');

                                    setTimeout(() => {
                                        const rootCorrectFinal5 = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                                        const h1CorrectFinal5 = rootCorrect && rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                                            && rootEle.children[0].childNodes[0].textContent === 'Hello, world 2!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                                            && rootEle.children[0].childNodes[1].textContent === 'Hide 2';

                                        setTimeout(() => {
                                            const rootCorrectFinal6 = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                                            const h1CorrectFinal6 = rootCorrect && rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                                                && rootEle.children[0].childNodes[0].textContent === 'Hello, world 2!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                                                && rootEle.children[0].childNodes[1].textContent === 'Hide 2';

                                            setTimeout(() => {
                                                const rootCorrectFinal7 = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                                                const h1CorrectFinal7 = rootCorrect && rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                                                    && rootEle.children[0].childNodes[0].textContent === 'Hello, world!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                                                    && rootEle.children[0].childNodes[1].textContent === 'Hide';

                                                result.success = rootCorrect && h1Correct && rootCorrectFinal && h1CorrectFinal
                                                    && rootCorrectFinal2 && rootCorrectFinal3 && rootCorrectFinal4 && rootCorrectFinal5 && rootCorrectFinal6 && rootCorrectFinal7
                                                    && h1CorrectFinal2 && h1CorrectFinal3 && h1CorrectFinal4 && h1CorrectFinal5 && h1CorrectFinal6 && h1CorrectFinal7;

                                                window.globalTestResults.push(result);
                                                window.globalTestCount++;
                                                window.globalAsyncCount--;
                                            }, 600);
                                        }, 750);
                                    }, 25);
                                }, 1300);
                            }, 750);
                        }, 25);
                    }, 1050);
                }, 25);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize999IslandCanUpdateDuringAnimation() {
        const result = {
            test: 'test island can update during keyed animation',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            const state = getState();

            if (window.globalAsyncCount === 0 && window.globalTestCount >= state.testCount && window.runAnimRouteToggle) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);
                mount('divduringanimation', new TestCanUpdateDuringAnimation1());

                addRoute('animroutetoggle3', {
                    component: new TestAnimateRouteToggle3(),
                    root: 'divRouterOutlet3',
                    animateDestroy: true
                });
                addRoute('animroutetoggle4', {
                    component: new TestAnimateRouteToggle4(),
                    root: 'divRouterOutlet3',
                    animateDestroy: true
                });

                route('animroutetoggle3');

                setTimeout(() => {
                    let rootEle = document.getElementById('divRouterOutlet3');

                    setTimeout(() => {
                        // Animation ended
                        route('animroutetoggle4');

                        let state = getState();
                        state.duringanimationcanproceed = true;
                        setState(state);

                        detectChanges();

                        const duringAnimationCount = state.duringanimation;

                        const duringRoot = document.getElementById('divduringanimation');
                        const duringRootCorrect = duringRoot && duringRoot.children && duringRoot.children.length === 1 && duringRoot.children[0].textContent === 'Updated during animation';

                        setTimeout(() => {
                            rootEle = document.getElementById('divRouterOutlet3');
                            const rootCorrectFinal2 = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                            const h1CorrectFinal2 = rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                                && rootEle.children[0].childNodes[0].textContent === 'Hello, world!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                                && rootEle.children[0].childNodes[1].textContent === 'Hide';

                            setTimeout(() => {
                                rootEle = document.getElementById('divRouterOutlet3');
                                const rootCorrectFinal3 = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                                const h1CorrectFinal3 = rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                                    && rootEle.children[0].childNodes[0].textContent === 'Hello, world!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                                    && rootEle.children[0].childNodes[1].textContent === 'Hide';

                                detectChanges();

                                setTimeout(() => {
                                    rootEle = document.getElementById('divRouterOutlet3');
                                    const rootCorrectFinal4 = rootEle && rootEle.children && rootEle.children.length === 1 && rootEle.children[0].tagName === 'H1';
                                    const h1CorrectFinal4 = rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
                                        && rootEle.children[0].childNodes[0].textContent === 'Hello, world 2!' && rootEle.children[0].childNodes[1].tagName === 'BUTTON'
                                        && rootEle.children[0].childNodes[1].textContent === 'Hide 2';

                                    result.success = rootCorrectFinal2 && rootCorrectFinal3 && rootCorrectFinal4
                                        && h1CorrectFinal2 && h1CorrectFinal3 && h1CorrectFinal4
                                        && duringAnimationCount === 1 && duringRootCorrect;

                                    window.globalTestResults.push(result);
                                    window.globalTestCount++;
                                    window.globalAsyncCount--;
                                }, 1300);
                            }, 750);
                        }, 25);
                    }, 1050);
                }, 25);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testRunLastAnimationFunctionsPreserved() {
        const result = {
            test: 'test animation functions preserved',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            const state = getState();

            if (window.globalAsyncCount === 0 && window.globalTestCount >= state.testCount && window.runAnimFunctionPreserve) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);
                mount('divanimationfunctions1', new TestAnimationFunctionsPreserved1());

                let btnEle = document.getElementById('animpreservebtn1');
                btnEle.click();

                setTimeout(() => {
                    setTimeout(() => {
                        // Animation ended
                        let state = getState();
                        const startCount = state.animationstartpreserve;
                        const endCount = state.animationendpreserve;

                        btnEle = document.getElementById('animpreservebtn1');

                        state = getState();
                        const startCountFinal = state.animationstartpreserve;
                        const endCountFinal = state.animationendpreserve;

                        result.success = startCount === undefined && endCount === 1 && startCountFinal === undefined && endCountFinal === 1
                            && btnEle.onanimationstart === null && btnEle.onanimationend === null;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                        window.runAnimRouteToggle = true;
                    }, 1050);
                }, 25);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
                window.runAnimRouteToggle = true;
            }
        }, 500);
    }

    testRunLastAnimateRouteChangeWithoutTargetAndNoPrevious() {
        const result = {
            test: 'test animating a route change without target directive and no existing target directive',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            const state = getState();

            if (window.globalAsyncCount === 0 && window.globalTestCount >= state.testCount && window.runLastAnimateRoute) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                removeRoute('.*');

                addRoute('animateroute5', { component: new TestAnimateRoute5(), root: 'divanimateroute', animateDestroy: true });
                addRoute('animateroute6', { component: new TestAnimateRoute6(), root: 'divanimateroute', animateDestroy: true });

                route('animateroute5');

                setTimeout(() => {
                    route('animateroute6');

                    setTimeout(() => {
                        setTimeout(() => {
                            const isAnimatingKeyed = s._isAnimatingKeyed;

                            let rootEle = document.getElementById('divanimateroute');
                            const rootCorrect = rootEle && rootEle.children && rootEle.childNodes.length === 2 && rootEle.childNodes[0].tagName === 'KBD'
                                && rootEle.childNodes[0].textContent === 'Tab' && rootEle.childNodes[1].textContent === 'Test Animate Route 1';
                            const rootCorrect2 = rootEle && rootEle.children && rootEle.childNodes.length === 2 && rootEle.childNodes[1].tagName === 'BUTTON'
                                && rootEle.childNodes[1].textContent === 'Tab' && rootEle.childNodes[0].textContent === 'Test Animate Route 2';

                            setTimeout(() => {
                                const isAnimatingKeyedFinal = s._isAnimatingKeyed;

                                rootEle = document.getElementById('divanimateroute');
                                const rootCorrectFinal = rootEle && rootEle.children && rootEle.childNodes.length === 2 && rootEle.childNodes[1].tagName === 'BUTTON'
                                    && rootEle.childNodes[1].textContent === 'Tab' && rootEle.childNodes[0].textContent === 'Test Animate Route 2';

                                result.success = !isAnimatingKeyed && !rootCorrect && rootCorrect2 && !isAnimatingKeyedFinal && rootCorrectFinal;

                                setTimeout(() => {
                                    // Animation finished
                                    window.globalTestResults.push(result);
                                    window.globalTestCount++;
                                    window.globalAsyncCount--;
                                    window.runAnimFunctionPreserve = true;
                                }, 1001);
                            }, 500);
                        }, 750);
                    }, 25);
                }, 25);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
                window.runAnimFunctionPreserve = true;
            }
        }, 500);
    }

    testRunLastAnimateRouteChangeWithoutTarget() {
        const result = {
            test: 'test animating a route change without target directive',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            const state = getState();

            if (window.globalAsyncCount === 0 && window.globalTestCount >= state.testCount) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                removeRoute('.*');

                addRoute('animateroute3', { component: new TestAnimateRoute3(), root: 'divanimateroute', animateDestroy: true });
                addRoute('animateroute4', { component: new TestAnimateRoute4(), root: 'divanimateroute', animateDestroy: true });

                route('animateroute3');

                setTimeout(() => {
                    route('animateroute4');

                    setTimeout(() => {
                        setTimeout(() => {
                            const isAnimatingKeyed = s._isAnimatingKeyed;

                            let rootEle = document.getElementById('divanimateroute');
                            const rootCorrect = rootEle && rootEle.children && rootEle.childNodes.length === 2 && rootEle.childNodes[0].tagName === 'KBD'
                                && rootEle.childNodes[0].textContent === 'Tab' && rootEle.childNodes[1].textContent === 'Test Animate Route 1';
                            const rootCorrect2 = rootEle && rootEle.children && rootEle.childNodes.length === 2 && rootEle.childNodes[1].tagName === 'BUTTON'
                                && rootEle.childNodes[1].textContent === 'Tab' && rootEle.childNodes[0].textContent === 'Test Animate Route 2';


                            setTimeout(() => {
                                const isAnimatingKeyedFinal = s._isAnimatingKeyed;

                                rootEle = document.getElementById('divanimateroute');
                                const rootCorrectFinal = rootEle && rootEle.children && rootEle.childNodes.length === 2 && rootEle.childNodes[1].tagName === 'BUTTON'
                                    && rootEle.childNodes[1].textContent === 'Tab' && rootEle.childNodes[0].textContent === 'Test Animate Route 2';

                                result.success = isAnimatingKeyed && !rootCorrect && rootCorrect2 && !isAnimatingKeyedFinal && rootCorrectFinal;

                                setTimeout(() => {
                                    // Animation finished
                                    window.globalTestResults.push(result);
                                    window.globalTestCount++;
                                    window.globalAsyncCount--;
                                    window.runLastAnimateRoute = true;
                                }, 1001);
                            }, 500);
                        }, 750);
                    }, 25);
                }, 25);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
                window.runLastAnimateRoute = true;
            }
        }, 500);
    }

    testRunLastAnimateRouteChange() {
        const result = {
            test: 'test animating a route change',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            const state = getState();

            if (window.globalAsyncCount === 0 && window.globalTestCount >= state.testCount) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                removeRoute('.*');

                addRoute('animateroute1', { component: new TestAnimateRoute1(), root: 'divanimateroute', animateDestroy: true });
                addRoute('animateroute2', { component: new TestAnimateRoute2(), root: 'divanimateroute', animateDestroy: true });

                route('animateroute1');

                setTimeout(() => {
                    route('animateroute2');

                    setTimeout(() => {
                        setTimeout(() => {
                            const isAnimatingKeyed = s._isAnimatingKeyed;

                            let rootEle = document.getElementById('divanimateroute');
                            const rootCorrect = rootEle && rootEle.children && rootEle.childNodes.length === 2 && rootEle.childNodes[0].tagName === 'KBD'
                                && rootEle.childNodes[0].textContent === 'Tab' && rootEle.childNodes[1].textContent === 'Test Animate Route 1';

                            setTimeout(() => {
                                const isAnimatingKeyedFinal = s._isAnimatingKeyed;

                                rootEle = document.getElementById('divanimateroute');
                                const rootCorrectFinal = rootEle && rootEle.children && rootEle.childNodes.length === 2 && rootEle.childNodes[1].tagName === 'BUTTON'
                                    && rootEle.childNodes[1].textContent === 'Tab' && rootEle.childNodes[0].textContent === 'Test Animate Route 2';

                                result.success = isAnimatingKeyed && rootCorrect && !isAnimatingKeyedFinal && rootCorrectFinal;

                                setTimeout(() => {
                                    // Animation finished
                                    window.globalTestResults.push(result);
                                    window.globalTestCount++;
                                    window.globalAsyncCount--;
                                }, 1001);
                            }, 500);
                        }, 750);
                    }, 25);
                }, 25);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize998RouteByPathNameBack() {
        const result = {
            test: 'test route by path name history',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                window.history.pushState(null, document.title, '/todo.html#');

                setRouteStrategy('');
                route('docs/1/2/bar');
                setRouteStrategy('#');
                window.history.back();

                setTimeout(() => {
                    const pathHref = window.location.pathname;

                    result.success = pathHref && pathHref !== '' && pathHref === '/todo.html';

                    if (!result.success) {
                        window.history.pushState(null, document.title, '/todo.html#');
                    }

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
                }, 300);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize998RouteByQueryStringBack() {
        const result = {
            test: 'test route by query string history',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                window.history.pushState(null, document.title, '/todo.html#');

                setRouteStrategy('?');
                route('querystring=2&foo=some+text');
                setRouteStrategy('#');
                window.history.back();

                setTimeout(() => {
                    const pathHref = window.location.pathname;

                    result.success = pathHref && pathHref !== '' && pathHref === '/todo.html';

                    if (!result.success) {
                        window.history.pushState(null, document.title, '/todo.html#');
                    }

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
                }, 300);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize101RouteByPathName() {
        const result = {
            test: 'test route by path name',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let originalHref = window.location.href;

                setRouteStrategy('');
                addRoute('docs/:someId/:someId2/bar', { component: new TestPathNameComponent1(), root: 'divpathname1' });
                route('docs/1/2/bar');

                const segments = getRouteSegments();
                const rootEle = document.getElementById('divpathname1');

                result.success = segments && segments.length === 4 && segments[0] === 'docs' && segments[1] === '1'
                    && segments[2] === '2' && segments[3] === 'bar' && rootEle && rootEle.childNodes && rootEle.childNodes.length === 1
                    && rootEle.childNodes[0].textContent === 'Path Name Test' && /http:\/\/localhost:\d+\/docs\/1\/2\/bar/.test(window.location.href);

                setRouteStrategy('#');

                if (originalHref.includes('todo.html')) {
                    originalHref = originalHref.substring(originalHref.indexOf('todo.html'));
                }

                window.history.pushState(null, document.title, '/' + originalHref);

                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize100RouteByQueryString() {
        const result = {
            test: 'test route by query string',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let originalHref = window.location.href;

                setRouteStrategy('?');
                addRoute('querystring=:someId&foo=:someId2', { component: new TestQueryStringComponent1(), root: 'divquerystring1' });
                route('querystring=2&foo=some+text');

                setTimeout(() => {
                    const variableList = getRouteQueryVariables();
                    const rootEle = document.getElementById('divquerystring1');

                    result.success = variableList && variableList.length === 2 && variableList[0].var === 'querystring' && variableList[0].value === '2'
                        && variableList[1].var === 'foo' && variableList[1].value === 'some+text' && rootEle && rootEle.childNodes && rootEle.childNodes.length === 1
                        && rootEle.childNodes[0].textContent === 'Query String Test' && /http:\/\/localhost:\d+\/\?\/querystring=2&foo=some\+text/.test(window.location.href);

                    setRouteStrategy('#');

                    if (originalHref.includes('todo.html')) {
                        originalHref = originalHref.substring(originalHref.indexOf('todo.html'));
                    }

                    window.history.pushState(null, document.title, '/' + originalHref);

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
                }, 25);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize100MutationObserverChangesTextCorrectly() {
        const result = {
            test: 'test text updated correctly with MutationObserver',
            success: false,
            message: ''
        };

        const targetNode = document.getElementById('divmutationobserver3');
        const config = { attributes: true, childList: true, subtree: true, characterData: true };

        let mutateCount = 0;

        let addPText = false;
        let removeNav = false;
        let addP = false;
        let correctSecondCount = false;
        let mutateText = false;

        const callback = function (mutationsList, observer) {
            if (mutateCount === 1) {
                let index = 0;
                correctSecondCount = mutationsList.length === 4;

                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].data === 'A <p>') {
                            addPText = true;
                        } else if (mutation.removedNodes && mutation.removedNodes.length > 0 && mutation.removedNodes[0].tagName === 'NAV') {
                            removeNav = true;
                        } else if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'P') {
                            addP = true;
                        }
                    }
                    else if (mutation.type === 'characterData') {
                        if (mutation.target && mutation.target.data === 'world!') {
                            mutateText = true;
                        }
                    }

                    index++;
                }
            }

            mutateCount++;
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

        mount('divmutationobserver3', new TestMutationObserver3());

        const firstMutateInterval = setInterval(() => {
            if (mutateCount === 1) {
                clearInterval(firstMutateInterval);

                const buttonEle = document.getElementById('mutationobserverbtn3');
                buttonEle.click();

                setTimeout(() => {
                    const secondMutateInterval = setInterval(() => {
                        if (mutateCount === 2) {
                            clearInterval(secondMutateInterval);

                            result.success = addPText && addP && removeNav && correctSecondCount && mutateText;

                            window.globalTestResults.push(result);
                            window.globalTestCount++;
                            observer.disconnect();
                        }
                    }, 500);
                }, 25);
            }
        }, 500);
    }

    testFinalize100MutationObserverPreservesCorrectly() {
        const result = {
            test: 'test correct elements and attributes updated with MutationObserver and other nodes preserved correctly',
            success: false,
            message: ''
        };

        const targetNode = document.getElementById('divmutationobserver2');
        const config = { attributes: true, childList: true, subtree: true, characterData: true };

        let mutateCount = 0;

        let removedSpan = false;
        let addDivSecond = false;
        let addDivText = false;
        let modifiedStyle = false;
        let correctSecondCount = false;

        const callback = function (mutationsList, observer) {
            if (mutateCount === 1) {
                let index = 0;
                correctSecondCount = mutationsList.length === 4;

                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'DIV') {
                            addDivSecond = true;
                        } else if (mutation.removedNodes && mutation.removedNodes.length > 0 && mutation.removedNodes[0].tagName === 'SPAN') {
                            removedSpan = true;
                        } else if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].data === 'A <div>') {
                            addDivText = true;
                        }
                    }
                    else if (mutation.type === 'attributes') {
                        if (mutation.attributeName === 'style') {
                            modifiedStyle = true;
                        }
                    }

                    index++;
                }
            }

            mutateCount++;
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

        mount('divmutationobserver2', new TestMutationObserver2());

        const firstMutateInterval = setInterval(() => {
            if (mutateCount === 1) {
                clearInterval(firstMutateInterval);

                const buttonEle = document.getElementById('mutationobserverbtn2');
                buttonEle.click();

                setTimeout(() => {
                    const secondMutateInterval = setInterval(() => {
                        if (mutateCount === 2) {
                            clearInterval(secondMutateInterval);

                            result.success = addDivSecond && removedSpan && addDivText && correctSecondCount && modifiedStyle;

                            window.globalTestResults.push(result);
                            window.globalTestCount++;
                            observer.disconnect();
                        }
                    }, 500);
                }, 25);
            }
        }, 500);
    }

    testFinalize100MutationObserver() {
        const result = {
            test: 'test correct elements and attributes updated with MutationObserver',
            success: false,
            message: ''
        };

        const targetNode = document.getElementById('divmutationobserver1');
        const config = { attributes: true, childList: true, subtree: true, characterData: true };

        let mutateCount = 0;

        let addKbdOriginal = false;
        let addButtonOriginal = false;
        let addSpanOriginal = false;
        let correctFirstCount = false;

        let removedSpan = false;
        let addDivSecond = false;
        let removedButtonSecond = false;
        let addDivText = false;
        let addedButtonSecond = false;
        let removedKbd = false;
        let modifiedId = false;
        let modifiedStyle = false;
        let addHiddenText = false;
        let correctSecondCount = false;

        const callback = function (mutationsList, observer) {
            if (mutateCount === 0) {
                let index = 0;
                correctFirstCount = mutationsList.length === 3;

                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'KBD') {
                            addKbdOriginal = true;
                        } else if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'BUTTON') {
                            addButtonOriginal = true;
                        } else if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'SPAN') {
                            addSpanOriginal = true;
                        }
                    }

                    index++;
                }

                mutateCount++;
            } else if (mutateCount === 1) {
                let index = 0;
                correctSecondCount = mutationsList.length === 9;

                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        if (mutation.removedNodes && mutation.removedNodes.length > 0 && mutation.removedNodes[0].tagName === 'SPAN') {
                            removedSpan = true;
                        } else if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'DIV') {
                            addDivSecond = true;
                        } else if (mutation.removedNodes && mutation.removedNodes.length > 0 && mutation.removedNodes[0].tagName === 'BUTTON') {
                            removedButtonSecond = true;
                        } else if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].data === 'A <div>') {
                            addDivText = true;
                        } else if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'BUTTON') {
                            addedButtonSecond = true;
                        } else if (mutation.removedNodes && mutation.removedNodes.length > 0 && mutation.removedNodes[0].tagName === 'KBD') {
                            removedKbd = true;
                        } else if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0].data === 'Toggle Hidden Elements') {
                            addHiddenText = true;
                        }
                    }
                    else if (mutation.type === 'attributes') {
                        if (mutation.attributeName === 'id') {
                            modifiedId = true;
                        } else if (mutation.attributeName === 'style') {
                            modifiedStyle = true;
                        }
                    }

                    index++;
                }

                mutateCount++;
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

        mount('divmutationobserver1', new TestMutationObserver1());

        const firstMutateInterval = setInterval(() => {
            if (mutateCount === 1) {
                clearInterval(firstMutateInterval);

                const buttonEle = document.getElementById('mutationobserverbtn1');
                buttonEle.click();

                setTimeout(() => {
                    const secondMutateInterval = setInterval(() => {
                        if (mutateCount === 2) {
                            clearInterval(secondMutateInterval);

                            result.success = addKbdOriginal && addButtonOriginal && addSpanOriginal && correctFirstCount && removedSpan && addDivSecond
                                && removedButtonSecond && addDivText && addedButtonSecond && removedKbd && modifiedId && modifiedStyle
                                && addHiddenText && correctSecondCount;

                            window.globalTestResults.push(result);
                            window.globalTestCount++;
                            observer.disconnect();
                        }
                    }, 500);
                }, 25);
            }
        }, 500);
    }

    manualTestDetectOnThen() {
        const result = {
            test: 'test change detection runs after Promise.then',
            success: false,
            message: ''
        };

        enableDetectOnThen();

        mount('divdetectthen1', new TestThenDetectComponent1());

        setTimeout(() => {
            const ele = document.getElementById('divdetectthen1');

            result.success = ele && ele.textContent && ele.textContent.length > 0;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 1500);
    }

    testFinalize100SlStyleReapply() {
        const result = {
            test: 'test slStyle reapply for same component',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                const originalIdentifierSet = new Set();
                s._scopedCssSet.forEach(identifier => {
                    originalIdentifierSet.add(identifier);
                });

                let head = document.head || document.getElementsByTagName('head')[0];
                const headChildCountOriginal = head.childNodes.length;

                mount('divscopedcssreapply1', new TestReapplyScopedCss1());

                detectChanges();

                const buttonEle = document.getElementById('reapplycssbtn1');
                buttonEle.click();

                setTimeout(() => {
                    buttonEle.click();

                    setTimeout(() => {
                        head = document.head || document.getElementsByTagName('head')[0];
                        const headChildCountFinal = head.childNodes.length;

                        const finalIdentifierSet = new Set();
                        s._scopedCssSet.forEach(identifier => {
                            finalIdentifierSet.add(identifier);
                        });

                        let ele = document.getElementById('divscopedcssreapply1');

                        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
                        const bgColor = cssObj.getPropertyValue('background-color');

                        result.success = headChildCountFinal === (headChildCountOriginal + 1) && bgColor === 'rgb(202, 202, 202)'
                            && finalIdentifierSet.size === (originalIdentifierSet.size + 1);

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 25);
                }, 25);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testRunLastKeyedAnimation() {
        const result = {
            test: 'test keyed hide animation',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            const state = getState();

            if (window.globalAsyncCount === 0 && window.globalTestCount >= state.testCount) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                mount('divkeyedanimation1', new TestKeyedHideAnimation1());

                const hideBtn = document.getElementById('keyedhidebtn1');
                hideBtn.click();

                setTimeout(() => {
                    const isAnimating = s._isAnimatingKeyed;

                    let rootEle = document.getElementById('divkeyedanimation1');
                    let child = rootEle.childNodes[1];

                    const correctData = child.textContent === 'b';
                    const correctCount = rootEle.children.length === 4;

                    setTimeout(() => {
                        rootEle = document.getElementById('divkeyedanimation1');
                        child = rootEle.childNodes[1];

                        const correctFinalData = child.textContent === 'c';
                        const correctFinalData2 = rootEle && rootEle.childNodes.length > 0 && rootEle.childNodes[0].textContent === 'a';
                        const correctTag = rootEle && rootEle.childNodes.length > 2 && rootEle.childNodes[2].tagName === 'BUTTON';
                        const correctFinalData3 = rootEle && rootEle.childNodes.length > 2 && rootEle.childNodes[2].textContent === 'Keyed Hide Button';
                        const isAnimatingFinal = s._isAnimatingKeyed;

                        setTimeout(() => {
                            const correctFinalCount = rootEle.children.length === 3;

                            result.success = isAnimating && correctData && correctCount && correctFinalData && correctFinalCount && !isAnimatingFinal
                                && correctFinalData2 && correctTag && correctFinalData3;

                            window.globalTestResults.push(result);
                            window.globalTestCount++;
                            window.globalAsyncCount--;
                        }, 500);
                    }, 550);
                }, 25);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize997DetachedFunctionInAutomaticMode() {
        const result = {
            test: 'test detached bound function in automatic mode',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                mount('divtestdetachedinautomatic1', new TestSlDetachedInAutomaticMode1());

                let state = getState();
                const originalCount = state.detachfncount;

                const detachedBtn = document.getElementById('detachedbtn1');
                detachedBtn.click();

                setTimeout(() => {
                    state = getState();
                    const finalCount = state.detachfncount;

                    result.success = originalCount === finalCount;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
                }, 19);
            }

            attempts++;

            if (attempts === 120 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize798DetachedFunctionInAutomaticModeWithoutBind() {
        const result = {
            test: 'test detached function in automatic mode',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                mount('divtestdetachedinautomatic2', new TestSlDetachedInAutomaticMode2());

                let state = getState();
                const originalCount = state.detachfncount;

                const detachedBtn = document.getElementById('detachedbtn2');
                detachedBtn.click();

                setTimeout(() => {
                    state = getState();
                    const finalCount = state.detachfncount;

                    result.success = originalCount === finalCount;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
                }, 18);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize100SlStyleIsEmptyOrInvalid() {
        const result = {
            test: 'test slStyle for invalid CSS specification',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle5', new TestSlStyleComponent5());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle5');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal && bgColor === 'rgba(0, 0, 0, 0)'
            && bgColorClean === 'rgba(0, 0, 0, 0)' && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleAnimateKeyframesOnMount() {
        const result = {
            test: 'test slStyle for @keyframes animation on mount',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('animatekeyframesdiv2', new AnimateKeyframesComponent2());

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('animatekeyframesdiv2');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleAnimateKeyframesOnMountWithReservedWord() {
        const result = {
            test: 'test slStyle for @keyframes animation on mount with reserved word',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('animatekeyframesdiv3', new AnimateKeyframesComponent3());

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('animatekeyframesdiv3');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;
        const slCount = textContentStyle.split('slcss-').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && slCount === 3;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleAnimateKeyframesWithAnimationName() {
        const result = {
            test: 'test slStyle for @keyframes animation with animation name declared',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('animatekeyframesdiv6', new AnimateKeyframesComponent6());

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('animatekeyframesdiv6');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;
        const slCount = textContentStyle.split('slcss-').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && slCount === 3;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleAnimateKeyframes() {
        const result = {
            test: 'test slStyle for @keyframes animation',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('animatekeyframesdiv1', new AnimateKeyframesComponent1());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('animatekeyframesdiv1');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;
        const slCount = textContentStyle.split('slcss-').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && slCount === 3;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleAnimateKeyframesWithoutUsage() {
        const result = {
            test: 'test slStyle for @keyframes animation without animation property',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('animatekeyframesdiv4', new AnimateKeyframesComponent4());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('animatekeyframesdiv4');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;
        const slCount = textContentStyle.split('slcss-').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && slCount === 2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleAnimateKeyframesComplexCss() {
        const result = {
            test: 'test slStyle for @keyframes animation surrounded by declarations',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('animatekeyframesdiv5', new AnimateKeyframesComponent5());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('animatekeyframesdiv5');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const cssObjNav = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorNav = cssObjNav.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;
        const slCount = textContentStyle.split('slcss-').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorNav === 'rgb(202, 202, 202)' && slCount === 3;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleAtRuleMediaComplexCss() {
        const result = {
            test: 'test slStyle for @media query surrounded by declarations',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divatrulemedia1', new AtRuleMediaComponent1());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divatrulemedia1');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const cssObjNav = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorNav = cssObjNav.getPropertyValue('background-color');
        const colorNav = cssObjNav.getPropertyValue('color');

        const cssObjHeader = window.getComputedStyle(ele.childNodes[2], null);
        const colorHeader = cssObjHeader.getPropertyValue('color');

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorNav === 'rgb(202, 202, 202)' && colorNav === 'rgb(0, 0, 255)' && colorHeader === 'rgb(0, 0, 255)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize999AnimateRouteRootNotDestroyed() {
        const result = {
            test: 'test animate destroy root not destroyed when reusing same root',
            success: false,
            message: ''
        };

        addRoute("useranim/:userId", {
            component: new AnimateUserProfileComponent(),
            root: "divAnimate2",
            onCanDeactivate: () => {
                return true;
            }
        });
        addRoute("defaultanim", {
            component: new AnimateDefaultRouteComponent(),
            root: "divAnimate3",
            animateDestroy: true
        });

        route('defaultanim');

        setTimeout(() => {
            route('useranim/5');

            setTimeout(() => {
                let ele = document.getElementById('divAnimate2');

                result.success = ele.textContent === 'Your user ID: 5';

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 18);
        }, 2050);
    }

    testFinalize100AnimateRouteAttributesCorrect() {
        const result = {
            test: 'test animate destroy attributes are correct',
            success: false,
            message: ''
        };

        addRoute("useranim2/:userId", {
            component: new TestAttributeUserProfileComponent(),
            root: "divTestAttr1",
            onCanDeactivate: () => {
                return true;
            }
        });
        addRoute("defaultanim2", {
            component: new TestAttributeDefaultRouteComponent(),
            root: "divTestAttr1",
            animateDestroy: true
        });

        route('defaultanim2');

        setTimeout(() => {
            route('useranim2/5');

            let ele = document.getElementById('divTestAttr1');

            const hasDirective = ele.hasAttribute('slanimatedestroy');
            const hasClass = ele.hasAttribute('class');

            setTimeout(() => {
                ele = document.getElementById('divTestAttr1');

                const hasDirective2 = ele.hasAttribute('slanimatedestroy');
                const hasClass2 = ele.hasAttribute('class');

                result.success = !hasDirective && !hasDirective2 && !hasClass && !hasClass2;

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 2250);
        }, 500);
    }

    testFinalize100SlStyleAtRuleMediaComplexCssWithNesting() {
        const result = {
            test: 'test slStyle for @media query surrounded by declarations and @media nesting',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divatrulemedia2', new AtRuleMediaComponent2());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divatrulemedia2');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const cssObjNav = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorNav = cssObjNav.getPropertyValue('background-color');
        const colorNav = cssObjNav.getPropertyValue('color');

        const cssObjHeader = window.getComputedStyle(ele.childNodes[2], null);
        const colorHeader = cssObjHeader.getPropertyValue('color');

        const cssObjHeader2 = window.getComputedStyle(ele.childNodes[3], null);
        const colorHeader2 = cssObjHeader.getPropertyValue('color');

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorNav === 'rgb(202, 202, 202)' && colorNav === 'rgb(0, 0, 255)' && colorHeader === 'rgb(0, 0, 255)'
            && colorHeader2 === 'rgb(0, 0, 255)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssNestingSyntaxChildren() {
        const result = {
            test: 'test slStyle with CSS Nesting Module syntax for descendants',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest1', new CssNestingTestComponent1());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest1');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const parentDiv = ele.childNodes[0];

        const cssObj2 = window.getComputedStyle(parentDiv.childNodes[0], null);
        const color2 = cssObj2.getPropertyValue('color');

        const cssObj3 = window.getComputedStyle(parentDiv.childNodes[1], null);
        const color3 = cssObj3.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && color === 'rgb(0, 0, 255)'
            && color2 === 'rgb(0, 128, 0)' && color3 === 'rgb(255, 0, 0)'
            && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssNestingSyntaxWithLayer() {
        const result = {
            test: 'test slStyle with CSS Nesting Module syntax with @layer',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest2', new CssNestingTestComponent2());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest2');

        const cssObj = window.getComputedStyle(ele.childNodes[0].childNodes[0], null);
        const objectFit = cssObj.getPropertyValue('object-fit');

        result.success = headChildCountFinal === headChildCountOriginal + 1 && objectFit === 'cover';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssNestingSyntaxWithLayerComplex() {
        const result = {
            test: 'test slStyle with CSS Nesting Module syntax with @layer and nesting',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest3', new CssNestingTestComponent3());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest3');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const display = cssObj.getPropertyValue('display');

        result.success = headChildCountFinal === headChildCountOriginal + 1 && display === 'grid';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssNestingSyntaxWithLayerComplexAndDeclarations() {
        const result = {
            test: 'test slStyle with CSS Nesting Module syntax with @layer and nesting surrounded by declarations',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest4', new CssNestingTestComponent4());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest4');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const display = cssObj.getPropertyValue('display');

        const cssObj2 = window.getComputedStyle(ele.childNodes[2], null);
        const width = cssObj2.getPropertyValue('width');

        result.success = headChildCountFinal === headChildCountOriginal + 1 && display === 'grid'
            && width === '128px';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssNestingSyntaxWithDeclarationAfterNest() {
        const result = {
            test: 'test slStyle with CSS Nesting Module syntax with declaration after @nest',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest5', new CssNestingTestComponent5());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest5');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const display = cssObj.getPropertyValue('display');

        const cssObj2 = window.getComputedStyle(ele.childNodes[2], null);
        const width = cssObj2.getPropertyValue('width');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && display === 'grid'
            && width === '128px' && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssNestingSyntaxWithCompoundSelectors() {
        const result = {
            test: 'test slStyle with CSS Nesting Module syntax with compound selectors',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest6', new CssNestingTestComponent6());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest6');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const display = cssObj.getPropertyValue('display');

        const cssObj2 = window.getComputedStyle(ele.childNodes[2], null);
        const width = cssObj2.getPropertyValue('width');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && display === 'grid'
            && width === '128px' && countSlCss === 17 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssNestingSyntaxWithNestedAtRules() {
        const result = {
            test: 'test slStyle with CSS Nesting Module syntax with nested at-rules',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest7', new CssNestingTestComponent7());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest7');

        const cssObj = window.getComputedStyle(ele.childNodes[2].childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && color === 'rgb(0, 0, 255)'
            && countSlCss === 4 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssSyntaxWithAtRules() {
        const result = {
            test: 'test slStyle with CSS syntax with at-rules',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest9', new CssNestingTestComponent9());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest9');

        const cssObj = window.getComputedStyle(ele.childNodes[2].childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && color === 'rgb(0, 0, 255)'
            && countSlCss === 11 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssNestingModuleWithScope() {
        const result = {
            test: 'test slStyle with CSS Nesting Module syntax with scope at-rule',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest10', new CssNestingTestComponent10());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1
            && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssDirAndComplexMediaQuery() {
        const result = {
            test: 'test slStyle with CSS :dir pseudo-class and media query syntax improvements',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest11', new CssNestingTestComponent11());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest11');

        const cssObj = window.getComputedStyle(ele.childNodes[0].childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const cssObj2 = window.getComputedStyle(ele.childNodes[1], null);
        const color2 = cssObj2.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1
            && countSlCss === 2 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssDirAndComplexMediaQueryWithCompoundSelectors() {
        const result = {
            test: 'test slStyle with CSS :dir pseudo-class and media query syntax improvements and compound selectors',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest17', new CssNestingTestComponent17());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest17');

        const cssObj = window.getComputedStyle(ele.childNodes[0].childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const cssObj2 = window.getComputedStyle(ele.childNodes[1], null);
        const color2 = cssObj2.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1
            && countSlCss === 3 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssDirAndComplexMediaQueryWithCompoundSelectorsSurroundedWithNesting() {
        const result = {
            test: 'test slStyle with CSS :dir pseudo-class and media query syntax improvements and compound selectors surrounded with nesting',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest18', new CssNestingTestComponent18());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest18');

        const cssObj = window.getComputedStyle(ele.childNodes[0].childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const cssObj2 = window.getComputedStyle(ele.childNodes[1], null);
        const color2 = cssObj2.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1
            && countSlCss === 5 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleMediaQueryComplex() {
        const result = {
            test: 'test slStyle with complex media query syntax',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest12', new CssNestingTestComponent12());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest12');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1
            && countSlCss === 1 && countOpen === countClose && color === 'rgb(0, 0, 255)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleMediaQueryComplex() {
        const result = {
            test: 'test slStyle with complex media query syntax surrounded by declarations',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest13', new CssNestingTestComponent13());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest13');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const cssObj2 = window.getComputedStyle(ele.childNodes[1], null);
        const color2 = cssObj2.getPropertyValue('color');

        const cssObj3 = window.getComputedStyle(ele.childNodes[2], null);
        const color3 = cssObj3.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1
            && countSlCss === 4 && countOpen === countClose && color === 'rgb(0, 0, 255)'
            && color2 === 'rgb(0, 0, 255)' && color3 === 'rgb(0, 0, 255)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleMediaQueryComplex() {
        const result = {
            test: 'test slStyle with complex media query syntax surrounded by declarations with nesting',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest14', new CssNestingTestComponent14());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest14');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const cssObj3 = window.getComputedStyle(ele.childNodes[2], null);
        const color3 = cssObj3.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1
            && countSlCss === 4 && countOpen === countClose && color === 'rgb(0, 0, 255)'
            && color3 === 'rgb(0, 0, 255)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleMediaQueryComplexAndNoCompoundSelectors() {
        const result = {
            test: 'test slStyle with complex media query syntax surrounded by declarations without compound selectors with nesting',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest15', new CssNestingTestComponent15());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest15');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const cssObj3 = window.getComputedStyle(ele.childNodes[2], null);
        const color3 = cssObj3.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1
            && countSlCss === 3 && countOpen === countClose && color === 'rgb(0, 0, 255)'
            && color3 === 'rgb(0, 0, 255)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleMediaQueryComplexAndOuterLevelCompoundSeelctor() {
        const result = {
            test: 'test slStyle with complex media query syntax surrounded by declarations with nesting and root-level compound selector',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest16', new CssNestingTestComponent16());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest16');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const cssObj3 = window.getComputedStyle(ele.childNodes[2], null);
        const color3 = cssObj3.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1
            && countSlCss === 4 && countOpen === countClose && color === 'rgb(0, 0, 255)'
            && color3 === 'rgb(0, 0, 255)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCssNestingSyntaxWithNestedAtRulesAndCompoundSelectors() {
        const result = {
            test: 'test slStyle with CSS Nesting Module syntax with nested at-rules and compound selectors',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divcssnestingtest8', new CssNestingTestComponent8());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divcssnestingtest8');

        const cssObj = window.getComputedStyle(ele.childNodes[2].childNodes[0], null);
        const color = cssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && color === 'rgb(0, 0, 255)'
            && countSlCss === 4 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithBracesAndCommaAndMultipleClauses() {
        const result = {
            test: 'test slStyle for parent class for selector with braces and comma and multiple clauses',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle4', new TestSlStyleComponent4());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle4');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const kbdCssObj = window.getComputedStyle(ele.childNodes[2], null);
        const kbdColorClean = kbdCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean === 'rgb(202, 202, 202)' && kbdColorClean === 'rgb(202, 202, 202)'
            && countSlCss === 3 && countOpen === countClose + 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleContainer() {
        const result = {
            test: 'test slStyle with container query',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstylecontainer1', new TestSlStyleContainer1());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstylecontainer1');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && countSlCss === 2 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithBracesAndComma() {
        const result = {
            test: 'test slStyle for parent class for selector with braces and comma',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle3', new TestSlStyleComponent3());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle3');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean === 'rgb(202, 202, 202)' && countSlCss === 2 && countOpen === countClose + 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithQuotedBraces() {
        const result = {
            test: 'test slStyle for parent class for selector with braces and nesting',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstylequoted1', new TestSlStyleComponentQuoted1());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstylequoted1');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean === 'rgb(202, 202, 202)' && countSlCss === 12 && countOpen === countClose + 11;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithBraces() {
        const result = {
            test: 'test slStyle for parent class for selector with braces',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle2', new TestSlStyleComponent2());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle2');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && countSlCss === 1 && countOpen === countClose + 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyle() {
        const result = {
            test: 'test slStyle for parent class',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle1', new TestSlStyleComponent1());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle1');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleSameTag() {
        const result = {
            test: 'test slStyle for same tag',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstylesametag', new TestSlStyleComponentSameTag());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstylesametag');

        const cssObj = window.getComputedStyle(ele, null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleDifferentTag() {
        const result = {
            test: 'test slStyle for different tag',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyledifferenttag', new TestSlStyleComponentDifferentTag());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyledifferenttag');

        const cssObj = window.getComputedStyle(ele, null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleSameTagSlFor() {
        const result = {
            test: 'test slStyle for same tag with slfor',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslforstyle1', new TestSlStyleComponentSameTagSlFor());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslforstyle1');

        const cssObj = window.getComputedStyle(ele, null);
        const bgColor = cssObj.getPropertyValue('background-color');

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleDifferentTagSlFor() {
        const result = {
            test: 'test slStyle for different tag',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslforstyle2', new TestSlStyleComponentDifferentTagSlFor());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslforstyle2');

        const cssObj = window.getComputedStyle(ele, null);
        const bgColor = cssObj.getPropertyValue('background-color');

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithLayer() {
        const result = {
            test: 'test slStyle with layer',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle6', new TestSlStyleComponent6());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle6');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithLayerInLayer() {
        const result = {
            test: 'test slStyle with layer in layer',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle7', new TestSlStyleComponent7());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle7');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithLayerDefined() {
        const result = {
            test: 'test slStyle with layer defined',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle8', new TestSlStyleComponent8());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle8');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithMultipleLayersDefined() {
        const result = {
            test: 'test slStyle with multiple layers defined',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle9', new TestSlStyleComponent9());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle9');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithMultipleLayersDefinedOutOfOrder() {
        const result = {
            test: 'test slStyle with multiple layers defined in mixed order',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle10', new TestSlStyleComponent10());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle10');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && countSlCss === 2 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithDataAttributeStyle() {
        const result = {
            test: 'test slStyle with data attribute',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle11', new TestSlStyleComponent11());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle11');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const fgColor = cssObj.getPropertyValue('color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const fgColorClean = navCssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && fgColor === 'rgb(202, 34, 34)'
            && fgColorClean === 'rgb(33, 37, 41)' && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithPseudoClass() {
        const result = {
            test: 'test slStyle with CSS pseudo-class',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle12', new TestSlStyleComponent12());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle12');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const fgColor = cssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && fgColor === 'rgb(255, 165, 0)'
            && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithPseudoClassAndLayer() {
        const result = {
            test: 'test slStyle with CSS pseudo-class and layer',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle13', new TestSlStyleComponent13());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle13');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const fgColor = cssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && fgColor === 'rgb(255, 165, 0)'
            && countSlCss === 1 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithMultipleNestedLayers() {
        const result = {
            test: 'test slStyle with multiple nested layers',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle14', new TestSlStyleComponent14());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle14');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const divCssObj = window.getComputedStyle(ele.childNodes[2].childNodes[0], null);
        const bgColorDiv = divCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && bgColorDiv === 'rgb(250, 250, 250)' && countSlCss === 3 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithMultipleNestedLayersAndRules() {
        const result = {
            test: 'test slStyle with multiple nested layers and rules',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle15', new TestSlStyleComponent15());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle15');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const divCssObj = window.getComputedStyle(ele.childNodes[2].childNodes[0], null);
        const bgColorDiv = divCssObj.getPropertyValue('background-color');

        const pCssObj = window.getComputedStyle(ele.childNodes[2].childNodes[1], null);
        const bgColorP = pCssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && bgColorDiv === 'rgb(250, 250, 250)'
            && bgColorP === 'rgb(0, 0, 255)' && countSlCss === 4 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithManyNestedLayers() {
        const result = {
            test: 'test slStyle with many nested layers',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle16', new TestSlStyleComponent16());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle16');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const divCssObj = window.getComputedStyle(ele.childNodes[2].childNodes[0], null);
        const bgColorDiv = divCssObj.getPropertyValue('background-color');

        const pCssObj = window.getComputedStyle(ele.childNodes[2].childNodes[1], null);
        const bgColorP = pCssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && bgColorDiv === 'rgb(250, 250, 250)'
            && bgColorP === 'rgb(0, 0, 255)' && countSlCss === 5 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleWithManyNestedLayersAndRules() {
        const result = {
            test: 'test slStyle with many nested layers and rules',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle17', new TestSlStyleComponent17());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle17');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const navCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        const divCssObj = window.getComputedStyle(ele.childNodes[2].childNodes[0], null);
        const bgColorDiv = divCssObj.getPropertyValue('background-color');

        const pCssObj = window.getComputedStyle(ele.childNodes[2].childNodes[1], null);
        const bgColorP = pCssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)' && bgColorDiv === 'rgb(250, 250, 250)'
            && bgColorP === 'rgb(0, 0, 255)' && countSlCss === 8 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleCustomPropertyWithBraces() {
        const result = {
            test: 'test slStyle with custom property with braces',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle18', new TestSlStyleComponent18());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle18');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const btnCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const code = btnCssObj.getPropertyValue('--handle').trim();

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(250, 250, 250)'
            && code === '{ pointerdown(event) { console.log(event.type, event.target); }, async click(event) { console.log( await Promise.resolve(\'CSS can do that.\') ); },  }'
            && countSlCss === 3 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleMultipleCustomPropertyWithBraces() {
        const result = {
            test: 'test slStyle with multiple custom properties with braces',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle19', new TestSlStyleComponent19());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle19');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const btnCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const code = btnCssObj.getPropertyValue('--handle').trim();

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(250, 250, 250)'
            && code === '{ pointerdown(event) { console.log(event.type, event.target); }, async click(event) { console.log( await Promise.resolve(\'CSS can do that.\') ); },  }'
            && countSlCss === 3 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleMultipleCustomProperties() {
        const result = {
            test: 'test slStyle with multiple custom properties',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle20', new TestSlStyleComponent20());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle20');

        const cssObj = window.getComputedStyle(ele.childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const btnCssObj = window.getComputedStyle(ele.childNodes[1], null);
        const handleValue = btnCssObj.getPropertyValue('--handle').trim();

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(250, 250, 250)'
            && handleValue === '#444444' && countSlCss === 3 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleNestedCss() {
        const result = {
            test: 'test slStyle with nested CSS',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle21', new TestSlStyleComponent21());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle21');

        const cssObj = window.getComputedStyle(ele.childNodes[0].childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const tdCssObj = window.getComputedStyle(ele.childNodes[1].childNodes[0], null);
        const tdBgColor = tdCssObj.getPropertyValue('background-color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && countSlCss === 3 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleDeeplyNestedCss() {
        const result = {
            test: 'test slStyle with deeply nested CSS',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle22', new TestSlStyleComponent22());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle22');

        const cssObj = window.getComputedStyle(ele.childNodes[0].childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const tdCssObj = window.getComputedStyle(ele.childNodes[1].childNodes[0], null);
        const tdBgColor = tdCssObj.getPropertyValue('background-color');

        const spanCssObj = window.getComputedStyle(ele.childNodes[1].childNodes[0].childNodes[0], null);
        const spanColor = spanCssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && countSlCss === 3 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleDeeplyNestedCssAndWhere() {
        const result = {
            test: 'test slStyle with deeply nested CSS and :where() pseudo-class',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle23', new TestSlStyleComponent23());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle23');

        const cssObj = window.getComputedStyle(ele.childNodes[0].childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const tdCssObj = window.getComputedStyle(ele.childNodes[1].childNodes[0], null);
        const tdBgColor = tdCssObj.getPropertyValue('background-color');

        const spanCssObj = window.getComputedStyle(ele.childNodes[1].childNodes[0].childNodes[0], null);
        const spanColor = spanCssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && countSlCss === 3 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleDeeplyNestedCssAndComplexProperty() {
        const result = {
            test: 'test slStyle with deeply nested CSS and complex custom property',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle24', new TestSlStyleComponent24());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle24');

        const cssObj = window.getComputedStyle(ele.childNodes[0].childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const tdCssObj = window.getComputedStyle(ele.childNodes[1].childNodes[0], null);
        const tdBgColor = tdCssObj.getPropertyValue('background-color');

        const spanCssObj = window.getComputedStyle(ele.childNodes[1].childNodes[0].childNodes[0], null);
        const spanColor = spanCssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && countSlCss === 4 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleDeeplyNestedCssWithComplexProperty() {
        const result = {
            test: 'test slStyle with deeply nested CSS with complex custom property',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyle25', new TestSlStyleComponent25());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyle25');

        const cssObj = window.getComputedStyle(ele.childNodes[0].childNodes[0], null);
        const bgColor = cssObj.getPropertyValue('background-color');

        const tdCssObj = window.getComputedStyle(ele.childNodes[1].childNodes[0], null);
        const tdBgColor = tdCssObj.getPropertyValue('background-color');

        const spanCssObj = window.getComputedStyle(ele.childNodes[1].childNodes[0].childNodes[0], null);
        const spanColor = spanCssObj.getPropertyValue('color');

        const styleTags = document.querySelectorAll('style');
        const lastStyleTag = styleTags[styleTags.length - 1];
        const textContentStyle = lastStyleTag.textContent;

        const countSlCss = textContentStyle.split('slcss-').length - 1;
        const countOpen = textContentStyle.split('{').length - 1;
        const countClose = textContentStyle.split('}').length - 1;

        result.success = headChildCountFinal === headChildCountOriginal + 1 && countSlCss === 3 && countOpen === countClose;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100SlStyleConsumedClass() {
        const result = {
            test: 'test slStyle for consumed class',
            success: false,
            message: ''
        };

        let head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountOriginal = head.childNodes.length;

        mount('divslstyleconsumed1', new TestConsumedSlStyleComponent1());

        detectChanges();

        head = document.head || document.getElementsByTagName('head')[0];
        const headChildCountFinal = head.childNodes.length;

        let ele = document.getElementById('divslstyleconsumed1');
        ele = ele.childNodes[0];

        const cssObj = window.getComputedStyle(ele, null);
        const bgColor = cssObj.getPropertyValue('background-color');

        let cleanNav = document.getElementById('styleconsumedcleannav');
        const navCssObj = window.getComputedStyle(cleanNav, null);
        const bgColorClean = navCssObj.getPropertyValue('background-color');

        result.success = headChildCountFinal === headChildCountOriginal + 1 && bgColor === 'rgb(202, 202, 202)'
            && bgColorClean !== 'rgb(202, 202, 202)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100TagRenameWithMount() {
        const result = {
            test: 'test tag rename with mount',
            success: false,
            message: ''
        };

        mount('divchecktagrename1', new TestTagRenameComponent1());

        const ids = Array.from(document.querySelectorAll('[id]'))
            .map(v => v.id)
            .reduce((acc, v) => { acc[v] = (acc[v] || 0) + 1; return acc }, {});
        const duplicteIds = Object.entries(ids)
            .filter(([key, value]) => value > 1)
            .map(([key, value]) => key);

        result.success = duplicteIds['divchecktagrename1'] === undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100RenderWithoutClassSimple() {
        const result = {
            test: 'test render element without classes to be consumed for simple cases',
            success: false,
            message: ''
        };

        const ele = renderElementWithoutClass('kbd', {}, []);
        const ele2 = renderElementWithoutClass('span', { style: 'color: #cacaca' }, []);
        const ele3 = renderElementWithoutClass('div', {}, [textNode('a')]);
        const ele4 = renderElementWithoutClass('p', {}, [renderElementWithoutClass('header', {}, ['header'])]);
        const ele5 = renderElementWithoutClass('p', {}, [renderElementWithoutClass('header', {}, ['header']), 'b', textNode('c')]);

        const eleCorrect = ele && ele.children && ele.children.length === 0 && ele.tagName === 'KBD';
        const ele2Correct = ele2 && ele2.children && ele2.children.length === 0 && ele2.style.color === 'rgb(202, 202, 202)' && ele2.tagName === 'SPAN';
        const ele3Correct = ele3 && ele3.childNodes && ele3.childNodes.length === 1 && ele3.childNodes[0].textContent === 'a' && ele3.tagName === 'DIV';
        const ele4Correct = ele4 && ele4.childNodes && ele4.childNodes.length === 1 && ele4.childNodes[0].tagName === 'HEADER' && ele4.childNodes[0].textContent === 'header'
            && ele4.tagName === 'P';
        const ele5Correct = ele5 && ele5.childNodes && ele5.childNodes.length === 3 && ele5.childNodes[0].tagName === 'HEADER' && ele5.childNodes[0].textContent === 'header'
            && ele5.tagName === 'P' && ele5.childNodes[1].textContent === 'b' && ele5.childNodes[2].textContent === 'c';

        result.success = eleCorrect && ele2Correct && ele3Correct && ele4Correct && ele5Correct;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100RenderWithoutClass() {
        const result = {
            test: 'test render element without classes to be consumed',
            success: false,
            message: ''
        };

        mount('divrenderwithoutclass', new TestRenderElementWithoutClassComponent1());

        let rootEle = document.getElementById('divrenderwithoutclass');

        if (rootEle && rootEle.children && rootEle.children.length === 1) {
            rootEle = rootEle.children[0];
        }

        const childrenCorrect = rootEle && rootEle.children && rootEle.children.length === 4;
        const firstEleCorrect = childrenCorrect && rootEle.children[0].tagName === 'P' && rootEle.children[0].childNodes && rootEle.children[0].childNodes.length === 2
            && rootEle.children[0].childNodes[0].tagName === 'KBD' && rootEle.children[0].childNodes[1].tagName === 'SPAN'
            && rootEle.children[0].childNodes[0].textContent === 'a' && rootEle.children[0].childNodes[1].textContent === 'a'
            && rootEle.children[0].style.color === 'rgb(202, 202, 202)' && rootEle.children[0].childNodes[1].style.color === 'rgb(109, 109, 109)';
        const secondEleCorrect = childrenCorrect && rootEle.children[1].tagName === 'P' && rootEle.children[1].childNodes && rootEle.children[1].childNodes.length === 2
            && rootEle.children[1].childNodes[0].tagName === 'KBD' && rootEle.children[1].childNodes[1].tagName === 'SPAN'
            && rootEle.children[1].childNodes[0].textContent === 'b' && rootEle.children[1].childNodes[1].textContent === 'b'
            && rootEle.children[1].style.color === 'rgb(202, 202, 202)' && rootEle.children[1].childNodes[1].style.color === 'rgb(109, 109, 109)';
        const thirdEleCorrect = childrenCorrect && rootEle.children[2].tagName === 'P' && rootEle.children[2].childNodes && rootEle.children[2].childNodes.length === 2
            && rootEle.children[2].childNodes[0].tagName === 'KBD' && rootEle.children[2].childNodes[1].tagName === 'SPAN'
            && rootEle.children[2].childNodes[0].textContent === 'c' && rootEle.children[2].childNodes[1].textContent === 'c'
            && rootEle.children[2].style.color === 'rgb(202, 202, 202)' && rootEle.children[2].childNodes[1].style.color === 'rgb(109, 109, 109)';
        const fourthEleCorrect = childrenCorrect && rootEle.children[3].tagName === 'P' && rootEle.children[3].childNodes && rootEle.children[3].childNodes.length === 2
            && rootEle.children[3].childNodes[0].tagName === 'KBD' && rootEle.children[3].childNodes[1].tagName === 'SPAN'
            && rootEle.children[3].childNodes[0].textContent === 'd' && rootEle.children[3].childNodes[1].textContent === 'd'
            && rootEle.children[3].style.color === 'rgb(202, 202, 202)' && rootEle.children[3].childNodes[1].style.color === 'rgb(109, 109, 109)';

        result.success = childrenCorrect && firstEleCorrect && secondEleCorrect && thirdEleCorrect && fourthEleCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100ConsumeStringInTemplate() {
        const result = {
            test: 'test consuming a string in a template',
            success: false,
            message: ''
        };

        mount('divconsumestring1', new TestConsumeStringComponent1());

        const rootEle = document.getElementById('divconsumestring1');

        const rootAndChild = rootEle && rootEle.children && rootEle.children.length === 1;
        const kbdEle = rootAndChild && rootEle.children[0].tagName === 'KBD';
        const kbdContent = kbdEle && rootEle.children[0].textContent === 'Shift';

        result.success = rootAndChild && kbdEle && kbdContent;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100ChildViewConsumedProperlyWithoutProperty() {
        const result = {
            test: 'test child view is consumed properly without passing an object and without property',
            success: false,
            message: ''
        };

        let state = getState();
        const originalViewCount = state.childviewconsume ? state.childviewconsume : 0;

        mount('divchildviewconsume2', new TestChildViewConsumedComponent3());

        state = getState();
        const firstViewCount = state.childviewconsume ? state.childviewconsume : 0;

        detectChanges('divchildviewconsume2');

        setTimeout(() => {
            state = getState();
            const finalViewCount = state.childviewconsume ? state.childviewconsume : 0;

            result.success = firstViewCount > originalViewCount && finalViewCount > firstViewCount;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize100ChildViewConsumedProperly() {
        const result = {
            test: 'test child view is consumed properly without passing an object',
            success: false,
            message: ''
        };

        let state = getState();
        const originalViewCount = state.childviewconsume ? state.childviewconsume : 0;

        mount('divchildviewconsume1', new TestChildViewConsumedComponent1());

        state = getState();
        const firstViewCount = state.childviewconsume ? state.childviewconsume : 0;

        detectChanges('divchildviewconsume1');

        setTimeout(() => {
            state = getState();
            const finalViewCount = state.childviewconsume ? state.childviewconsume : 0;

            result.success = originalViewCount === 0 && firstViewCount > originalViewCount && finalViewCount > firstViewCount;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize100RenderDetachedConsumeComponent() {
        const result = {
            test: 'test render detached consumes component but does not mount',
            success: false,
            message: ''
        };

        const currentRoute = s._router.mountRoute;
        const destroyEleList = s._destroyNodeMap.get(currentRoute) ? s._destroyNodeMap.get(currentRoute).length : 0;

        const compStr = renderElement(new TestRenderDetachedComponent1().view(), true);

        const destroyEleListFinal = s._destroyNodeMap.get(currentRoute) ? s._destroyNodeMap.get(currentRoute).length : 0;

        result.success = destroyEleList === destroyEleListFinal;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100LifecycleHooksConsumedProperly() {
        const result = {
            test: 'test consumed component lifecycle hooks called and bound to model properly',
            success: false,
            message: ''
        };

        mount('divlifecycleconsumed1', new TestLifecycleHookConsumedComponent1());

        const btnEle = document.getElementById('lifecyclehookconsumedbtn');

        if (btnEle) {
            btnEle.click();

            setTimeout(() => {
                // If no exceptions thrown
                result.success = true;

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 100);
        } else {
            window.globalTestResults.push(result);
            window.globalTestCount++;
        }
    }

    testFinalize100RenderComplexNamedSlFor() {
        const result = {
            test: 'test render to string of complex slFor',
            success: false,
            message: ''
        };

        const compStr = renderToString(new TestRenderNamedSlForComponent2());

        result.success = compStr === '<div id="divslfornamedrender2"><div slfornamed="namedslforrender:data:make:update"><p><span><kbd>Ctrl</kbd><ul><li>Konnichiwa</li><li>Guten Tag</li></ul></span><form><fieldset><legend>Choose your favorite monster</legend><input type="radio" name="monster" id="kraken"></input><label for="kraken">Kraken</label><div sldirective="trustchildren"><br></div><input type="radio" name="monster" id="sasquatch"></input><label for="sasquatch">Sasquatch</label></fieldset></form></p><p><span><kbd>Ctrl</kbd><ul><li>Konnichiwa</li><li>Guten Tag</li></ul></span><form><fieldset><legend>Choose your favorite monster</legend><input type="radio" name="monster" id="kraken"></input><label for="kraken">Kraken</label><div sldirective="trustchildren"><br></div><input type="radio" name="monster" id="sasquatch"></input><label for="sasquatch">Sasquatch</label></fieldset></form></p><p><span><kbd>Ctrl</kbd><ul><li>Konnichiwa</li><li>Guten Tag</li></ul></span><form><fieldset><legend>Choose your favorite monster</legend><input type="radio" name="monster" id="kraken"></input><label for="kraken">Kraken</label><div sldirective="trustchildren"><br></div><input type="radio" name="monster" id="sasquatch"></input><label for="sasquatch">Sasquatch</label></fieldset></form></p></div></div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100ElementDestroyMapByRoute() {
        const result = {
            test: 'test element destroy map by route',
            success: false,
            message: ''
        };

        const originalCount = s._destroyNodeMap.get('diveledestroymap1') ? s._destroyNodeMap.get('diveledestroymap1').length : 0;

        mount('diveledestroymap1', new TestEleDestroyMapComponent1());

        const finalCount = s._destroyNodeMap.get('diveledestroymap1') ? s._destroyNodeMap.get('diveledestroymap1').length : 0;

        result.success = finalCount === originalCount + 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100NamedSlForMapCount() {
        const result = {
            test: 'test named slFor directive internal map count and correctness',
            success: false,
            message: ''
        };

        mount('divslfornamedmap', new TestSlForMapComponent1());

        const namedList = s._structureForMap.get('cleanupfornamedmap');

        const nodesCorrect = namedList && namedList.map && this.isElement(namedList.map[0]) && this.isElement(namedList.map[1]) && this.isElement(namedList.map[2]);

        result.success = namedList && namedList.map && Object.keys(namedList.map).length === 3 && nodesCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100NamedSlForDirectiveRender() {
        const result = {
            test: 'test named slFor directive render',
            success: false,
            message: ''
        };

        const compStr = renderToString(new NamedSlForComponent1());

        result.success = compStr === '<div id="divnamedslfor1"><div slfornamed="namedfor:data:make:update"><p>a</p><p>b</p><p>c</p></div></div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100NamedSlForDirective() {
        const result = {
            test: 'test named slFor directive',
            success: false,
            message: ''
        };

        mount('divnamedslfor1', new NamedSlForComponent1());

        const rootEle = document.getElementById('divnamedslfor1');
        const childDiv = rootEle.children[0];
        const pChildren = childDiv.querySelectorAll('p');

        result.success = childDiv && pChildren && pChildren.length === 3 && pChildren[0].textContent === 'a'
            && pChildren[1].textContent === 'b' && pChildren[2].textContent === 'c';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100HydrateSlForCounts() {
        const result = {
            test: 'test hydrate slfor markup with correct update and make counts',
            success: false,
            message: ''
        };

        window.HydrateSlForComponent1 = HydrateSlForComponent1;
        hydrate('divhydrateslfor1');

        const state = getState();
        const makeCountCorrect = state.hydrateslformake === 2;
        const updateCountCorrect = state.hydrateslforupdate === 3;

        result.success = makeCountCorrect && updateCountCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRenderToStringConditional() {
        const result = {
            test: 'test render to string with truthy conditional in template',
            success: false,
            message: ''
        };

        const compStr = renderToString(new RenderToStringConditional1());

        result.success = compStr === '<div id="divrendertostring1">Hello, world!</div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRenderToStringConditional2() {
        const result = {
            test: 'test render to string with falsy conditional in template',
            success: false,
            message: ''
        };

        const compStr = renderToString(new RenderToStringConditional2());

        result.success = compStr === '<div id="divrendertostring2">, world!</div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100NamedSlForCleanup() {
        const result = {
            test: 'test named slFor cleanup',
            success: false,
            message: ''
        };

        mount('divslforcleanup3', new TestSlForCleanupComponent3());

        const originalExists = s._structureForMap.has('cleanupfornamed');

        const hideBtn = document.getElementById('slfornamedcleanupbtn');
        hideBtn.click();

        setTimeout(() => {
            const existsAfterHide = s._structureForMap.has('cleanupfornamed');

            result.success = originalExists === true && existsAfterHide === false;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize100SlForCleanup() {
        const result = {
            test: 'test slFor cleanup with multiple directives',
            success: false,
            message: ''
        };

        mount('divslforcleanup2', new TestSlForCleanupComponent2());

        const originalExists = s._structureForMap.has('cleanupfor2');
        const originalExists2 = s._structureForMap.has('cleanupfor3');

        const hideBtn = document.getElementById('slforcleanupbtn2');
        hideBtn.click();

        setTimeout(() => {
            const existsAfterHide = s._structureForMap.has('cleanupfor2');
            const existsAfterHide2 = s._structureForMap.has('cleanupfor3');

            result.success = originalExists === true && originalExists2 === true && existsAfterHide === false && existsAfterHide2 === false;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize100SlForCleanup() {
        const result = {
            test: 'test slFor cleanup',
            success: false,
            message: ''
        };

        mount('divslforcleanup', new TestSlForCleanupComponent1());

        const originalExists = s._structureForMap.has('cleanupfor');

        const hideBtn = document.getElementById('slforcleanupbtn');
        hideBtn.click();

        setTimeout(() => {
            const existsAfterHide = s._structureForMap.has('cleanupfor');

            result.success = originalExists === true && existsAfterHide === false;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testRenderHydrate() {
        const result = {
            test: 'test render element with hydrate',
            success: false,
            message: ''
        };

        window.TestRenderHydrate1 = TestRenderHydrate1;
        hydrate('divrenderhydrate');

        const eleDiv = document.getElementById('divrenderhydrate');
        const tbody = eleDiv.querySelector('tbody');

        const originalTrCount = tbody.querySelectorAll('tr').length;

        if (tbody && tbody.children && tbody.children.length > 1) {
            const tr = tbody.children[1];

            if (tr && tr.children && tr.children.length > 2 && tr.children[2].children && tr.children[2].children.length > 0) {
                // 3rd <td> and first <a>
                const deleteEle = tr.children[2].children[0];

                if (deleteEle) {
                    deleteEle.click();

                    setTimeout(() => {
                        const finalTrCount = tbody.querySelectorAll('tr').length;

                        if (finalTrCount === originalTrCount - 1) {
                            result.success = true;
                        }

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                    }, 100);
                }
            }
        }
    }

    testRenderElementWithClass3() {
        const result = {
            test: 'test render element function with class and after init hook',
            success: false,
            message: ''
        };

        let state = getState();
        const correctHookCount = state.rendertoele3 === undefined;

        mount('rendertoelement3', new TestRenderElement3());

        state = getState();
        const correctHookCountAfter = state.rendertoele3 === 8;

        result.success = correctHookCount && correctHookCountAfter;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRenderElementWithClass4() {
        const result = {
            test: 'test render element function with class and on destroy hook',
            success: false,
            message: ''
        };

        let state = getState();
        const correctHookCount = state.rendertoele4 === undefined;

        mount('rendertoelement4', new TestRenderElement5());

        const hideBtn = document.getElementById('renderele4btn');
        hideBtn.click();

        setTimeout(() => {
            state = getState();
            const correctHookCountAfter = state.rendertoele4 === 8;

            result.success = correctHookCount && correctHookCountAfter;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testRenderElementWithClass2() {
        const result = {
            test: 'test render element function with class and on init hook',
            success: false,
            message: ''
        };

        const nodeMarkup = markup('tr', {
            attrs: {
                'style': 'color:red;',
                'class': 'some-fake-class',
                onclick: this.dummyOnClickFunction
            },
            children: [
                new TestRenderElement2()
            ]
        });

        let state = getState();
        const correctHookCount = state.rendertoele1 === 0;

        const node = renderElement(nodeMarkup);

        const correctTag = node.tagName && node.tagName === 'TR';
        const correctStyle = node.getAttribute('style') === 'color:red;';
        const correctClass = node.getAttribute('class') === 'some-fake-class';
        const correctChildren = node.children && node.children.length === 1;
        const correctChildren2 = node.children && node.children.length === 1 && node.children[0].tagName === 'SPAN' && node.children[0].childNodes.length === 1
            && node.children[0].childNodes[0].data === 'Hello';
        const correctOnClick = node.onclick && typeof node.onclick === 'function';

        state = getState();
        const correctHookCountAfter = state.rendertoele1 === 1;

        result.success = correctTag && correctStyle && correctClass && correctChildren && correctOnClick && correctChildren2
            && correctHookCount && correctHookCountAfter;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRenderElementWithClass1() {
        const result = {
            test: 'test render element function with class text node',
            success: false,
            message: ''
        };

        const nodeMarkup = markup('tr', {
            attrs: {
                'style': 'color:red;',
                'class': 'some-fake-class',
                onclick: this.dummyOnClickFunction
            },
            children: [
                new TestRenderElement1()
            ]
        });
        const node = renderElement(nodeMarkup);

        const correctTag = node.tagName && node.tagName === 'TR';
        const correctStyle = node.getAttribute('style') === 'color:red;';
        const correctClass = node.getAttribute('class') === 'some-fake-class';
        const correctChildren = node.children && node.children.length === 1;
        const correctChildren2 = node.children && node.children.length === 1 && node.children[0].tagName === 'SPAN' && node.children[0].childNodes.length === 1
            && node.children[0].childNodes[0].data === 'Hello';
        const correctOnClick = node.onclick && typeof node.onclick === 'function';

        result.success = correctTag && correctStyle && correctClass && correctChildren && correctOnClick && correctChildren2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize999ManualChangeDetection() {
        const result = {
            test: 'test delete with manual change detection mode',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                setDetectionStrategy(s.CHANGE_STRATEGY_MANUAL);

                mount('divtestmanual1', new TestManualChangeDetectionComponent2());

                setDetectionStrategy(s.CHANGE_STRATEGY_AUTOMATIC);

                const rootEle = document.getElementById('divtestmanual1');
                const tbody = rootEle.querySelector('tbody');

                const originalTrCount = rootEle.querySelectorAll('tr');

                if (tbody && tbody.children && tbody.children.length > 0) {
                    const tr = tbody.children[0];

                    if (tr && tr.children && tr.children.length > 2) {
                        const deleteTd = tr.children[2];

                        if (deleteTd && deleteTd.children && deleteTd.children.length > 0) {
                            const deleteEle = deleteTd.children[0];

                            if (deleteEle) {
                                deleteEle.click();

                                setTimeout(() => {
                                    const finalTrCount = rootEle.querySelectorAll('tr');

                                    if (originalTrCount.length === finalTrCount.length) {
                                        result.success = true;
                                    }

                                    window.globalTestResults.push(result);
                                    window.globalTestCount++;
                                    window.globalAsyncCount--;
                                }, 19);
                            }
                        }
                    }
                }
            }

            attempts++;

            if (attempts === 110 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testSlingExists() {
        const result = {
            test: 'test sling exists',
            success: false,
            message: ''
        };

        if (window.s !== null && window.s !== undefined) {
            result.success = true;
            result.message = 'basic sling object exists on window';
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testDetachedTimeoutExists() {
        const result = {
            test: 'test detached timeout exists',
            success: false,
            message: ''
        };

        if (setTimeout !== null && setTimeout !== undefined) {
            result.success = true;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testDetachedTimeout() {
        const result = {
            test: 'test detached timeout functions as expected',
            success: false,
            message: ''
        };

        if (setTimeout !== null && setTimeout !== undefined) {
            let initiallyExists = null;

            window.globalAsyncCount++;
            wrapWithChangeDetector(() => setTimeout(() => {
                window.globalAsyncCount--;
                const fakeEle = document.getElementById('fakeEle1');
                initiallyExists = fakeEle !== null && fakeEle !== undefined;
            }, 25))();

            setTimeout(() => {
                const fakeEle = document.createElement('div');
                fakeEle.id = 'fakeEle1';
                document.body.appendChild(fakeEle);
            }, 50);

            window.globalAsyncCount++;
            wrapWithChangeDetector(() => setTimeout(() => {
                window.globalAsyncCount--;
                const fakeEle = document.getElementById('fakeEle1');
                const finallyExists = fakeEle !== null && fakeEle !== undefined;

                if (initiallyExists === false && finallyExists === true) {
                    result.success = true;
                }

                window.globalTestCount++;
            }, 100))();
        }

        window.globalTestResults.push(result);
    }

    testDetachedSetInterval() {
        const result = {
            test: 'test detached interval exists',
            success: false,
            message: ''
        };

        if (setInterval !== null && setInterval !== undefined) {
            result.success = true;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize998SetInterval() {
        const result = {
            test: 'test interval triggers change detection',
            success: false,
            message: ''
        };

        mount('setintervaltestdiv1', new SetIntervalTestComponent1());

        let ele = document.getElementById('setintervaltestdiv1');
        const initialValue = ele.textContent;

        setTimeout(() => {
            ele = document.getElementById('setintervaltestdiv1');
            const initialValue2 = ele.textContent;

            setTimeout(() => {
                ele = document.getElementById('setintervaltestdiv1');
                const initialValue3 = ele.textContent;

                result.success = initialValue === '0' && initialValue2 === '1' && initialValue3 === '2';

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 600);
        }, 600);
    }

    testFinalize990RouteBasic() {
        const result = {
            test: 'test basic route with parameter',
            success: false,
            message: ''
        };

        mount('divtestrefcomp1', new TestRefComponent1());

        setTimeout(() => {
            const ref = s._updateMap.get('divtestrefcomp1').ref1;
            const state = getState();

            result.success = state.ref1 && ref !== null && ref !== undefined && ref.id === 'divtestrefcomp1';

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 18);
    }

    testFinalize990WithSimpleRef() {
        const result = {
            test: 'test simple reference',
            success: false,
            message: ''
        };

        mount('routecomponent', new NoRouteComponent());
        addRoute('basictest/:someId', { component: new RouteBasicComponent(), root: 'routecomponent' });
        route('basictest/5');

        const divEle = document.getElementById('routecomponent');

        const correctText = divEle.textContent === 'Basic route taken.';

        result.success = correctText;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996OnBeforeRoute() {
        const result = {
            test: 'test onBeforeRoute called before component mounted to DOM',
            success: false,
            message: ''
        };

        const checkMountedInDomFunc = () => {
            const ele = document.getElementById('onbeforeroutecomponent');

            const state = getState();
            state.onBeforeRouteCorrect = ele && ele.children && ele.children.length === 0 && ele.textContent === '';
            setState(state);
        };

        addRoute('onbeforeroute1', { component: new OnBeforeRouteComponent(), onBeforeRoute: checkMountedInDomFunc, root: 'onbeforeroutecomponent' });
        route('onbeforeroute1');

        const state = getState();

        result.success = state.onBeforeRouteCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996ConsumeClass() {
        const result = {
            test: 'test consume class',
            success: false,
            message: ''
        };

        addRoute('consumeclass', { component: new ConsumeClassComponent1(), root: 'consumeclasscomponent' });
        route('consumeclass');

        const ele = document.getElementById('consumeclasscomponent');

        result.success = ele && ele.children && ele.children.length === 0 && ele.textContent === 'Consume class test.';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996DetachDetector() {
        const result = {
            test: 'test consume class',
            success: false,
            message: ''
        };

        const detachDetectorComp = new TestDetachDetectorComponent();
        mount('testdetachdetectorcomponent', detachDetectorComp, true);

        const isCompAttached = isDetectorAttached('testdetachdetectorcomponent');

        detachDetector('testdetachdetectorcomponent');

        const isCompAttachedFinal = isDetectorAttached('testdetachdetectorcomponent');

        result.success = isCompAttached && !isCompAttachedFinal;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testStateExists() {
        const result = {
            test: 'test internal state exists',
            success: false,
            message: ''
        };

        const stateDefined = s._state;

        result.success = stateDefined !== null && stateDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testDestroyFunctionMapExists() {
        const result = {
            test: 'test internal destroy function map exists',
            success: false,
            message: ''
        };

        const mapDefined = s._destroyFuncMap;

        result.success = mapDefined !== null && mapDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testUpdateMapExists() {
        const result = {
            test: 'test internal update map exists',
            success: false,
            message: ''
        };

        const mapDefined = s._updateMap;

        result.success = mapDefined !== null && mapDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100OnDestroyLifecycleHookWithRecycling() {
        const result = {
            test: 'test slOnDestroy is called for recycled DOM nodes',
            success: false,
            message: ''
        };

        const comp = new OnDestroyCalledForRecycled1();

        mount('divondestroyrecycle1', comp);

        let btnEle = document.getElementById('btn-recycle-test-1');
        btnEle.click();

        setTimeout(() => {
            btnEle = document.getElementById('btn-recycle-test-1');
            btnEle.click();

            setTimeout(() => {
                const state = getState();

                result.success = state.recycle1 === 1 && state.recycle2 === 2;

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 17);
        }, 17);
    }

    testFinalize100AfterInitLifecycleHookWithRecycling() {
        const result = {
            test: 'test slAfterInit is called for recycled DOM nodes',
            success: false,
            message: ''
        };

        const comp = new AfterInitCalledForRecycled1();

        mount('divafterinitrecycle1', comp);

        let btnEle = document.getElementById('btn-after-recycle-test-1');
        btnEle.click();

        setTimeout(() => {
            btnEle = document.getElementById('btn-after-recycle-test-1');
            btnEle.click();

            setTimeout(() => {
                const state = getState();

                result.success = state.recycle3 === 1 && state.recycle4 === 2 && state.recycle5 === 2 && state.recycle6 === 1;

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 17);
        }, 17);
    }

    testFinalize100TryItRecycleDomNodes() {
        const result = {
            test: 'test recycling of DOM nodes and verify that lifecycle hooks are called',
            success: false,
            message: ''
        };

        let state = getState();
        state.showTryItHelp = false;
        setState(state);

        const comp = new ContentPanelComponent2();
        mount('tryit-content-test1', comp);

        state = getState();
        state.showTryItHelp = true;
        setState(state);

        detectChanges();

        state = getState();
        state.showTryItHelp = false;
        setState(state);

        detectChanges();

        state = getState();

        result.success = state.oninit1 === 2 && state.oninit2 === 2 && state.ondestroy1 === 1 && state.ondestroy2 === 1 && state.afterinit1 === 2 && state.afterinit2 === 2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100TryItRecycleDomNodesForSql() {
        const result = {
            test: 'test recycling of DOM nodes and verify that lifecycle hooks are called when node tagName and child count unchanged',
            success: false,
            message: ''
        };

        const comp = new SqlContentPanelComponent();
        mount('divsqlcontentpanel', comp);

        comp.collapsed = false;
        comp.portrait = false;

        detectChanges('divsqlcontentpanel');

        comp.collapsed = true;

        detectChanges('divsqlcontentpanel');

        comp.showHelp = false;

        detectChanges('divsqlcontentpanel');

        comp.showPreview = true;

        detectChanges('divsqlcontentpanel');

        comp.showPreview = false;

        detectChanges('divsqlcontentpanel');

        comp.showPreview = true;

        detectChanges('divsqlcontentpanel');

        comp.showPreview = false;

        detectChanges('divsqlcontentpanel');

        const state = getState();

        result.success = state.afterinitsql1 === 3 && state.ondestroysql1 === 2 && state.afterinitsql2 === 2 && state.ondestroysql2 === 2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRunLastRenderWithoutClassFunctionBinding() {
        const result = {
            test: 'test renderElementWithoutClass correctly binds function to DOM node',
            success: false,
            message: ''
        };

        const comp = new TestSlForRenderWithoutClass1();
        mount('divslforrenderwithoutclass', comp);

        const trEle = document.getElementById('trwithoutclass1');
        trEle.click();

        setTimeout(() => {
            result.success = comp.count === 1;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 17);
    }

    testClearSubscriptionForSubjectWorks() {
        const result = {
            test: 'test clearSubscription for BehaviorSubject works',
            success: false,
            message: ''
        };

        const sub = BehaviorSubject(0);
        let subscriberRuns = 0;
        const subscriber = () => {
            subscriberRuns++;
        };
        const subscriberToClear = () => {
            return;
        };
        sub.subscribe(subscriber);
        sub.subscribe(subscriberToClear);
        sub.next(1);
        sub.clearSubscription(subscriberToClear);
        sub.next(2);

        result.success = subscriberRuns === 2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testAfterInitListExists() {
        const result = {
            test: 'test internal slAfterInit list exists',
            success: false,
            message: ''
        };

        const listDefined = s._afterInitArr;

        result.success = listDefined !== null && listDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testDestroyNodeMapExists() {
        const result = {
            test: 'test internal destroy node map exists',
            success: false,
            message: ''
        };

        const mapDefined = s._destroyNodeMap;

        result.success = mapDefined !== null && mapDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testChangeDetectorConstants() {
        const result = {
            test: 'test change detection constants',
            success: false,
            message: ''
        };

        const manualDefined = s.CHANGE_STRATEGY_MANUAL !== null && s.CHANGE_STRATEGY_MANUAL !== undefined;
        const automaticDefined = s.CHANGE_STRATEGY_AUTOMATIC !== null && s.CHANGE_STRATEGY_AUTOMATIC !== undefined;

        result.success = manualDefined && automaticDefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize999DefaultRoute() {
        const result = {
            test: 'test default route',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            const state = getState();

            if (window.globalAsyncCount === 0 && window.globalTestCount >= state.testCount - 1) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                addRoute('.*', { component: new TestDefaultRouteComponent1(), root: 'testdefaultroute' });

                route('abcdefghijklmnopqrstuvwxyz');

                const ele = document.getElementById('testdefaultroute');
                const correctTextAfterRoute = ele && ele.childNodes && ele.childNodes.length === 1 && ele.innerText === 'Default route content.';

                result.success = ele && correctTextAfterRoute;

                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize696WrapDetector() {
        const result = {
            test: 'test wrap function with change detector',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                setTimeout(() => {
                    let state = getState();
                    state.wrapDetector = 0;
                    setState(state);

                    addRoute('wrapdetector', { component: new TestWrapDetectorComponent1(), root: 'testwrapdetector' });
                    route('wrapdetector');

                    setTimeout(() => {
                        state = getState();
                        const originalWrapCount = state.wrapDetector;

                        const someFunc = () => { console.log('Wrap detector'); };
                        const wrappedFunc = wrapWithChangeDetector(someFunc);

                        wrappedFunc();

                        setTimeout(() => {
                            state = getState();
                            const correctCount = state.wrapDetector >= originalWrapCount + 1;

                            result.success = correctCount;

                            window.globalTestResults.push(result);
                            window.globalTestCount++;
                            window.globalAsyncCount--;
                        }, 18);
                    }, 18);
                }, 18);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize999RemoveRoute() {
        const result = {
            test: 'test remove route',
            success: false,
            message: ''
        };

        addRoute('routetoremove', { component: new TestRemoveRouteComponent1(), root: 'testremoveroute' });
        removeRoute('routetoremove');

        route('routetoremove');

        const ele = document.getElementById('testremoveroute');

        result.success = !ele || !ele.children || ele.children.length === 0;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testVersionTruthy() {
        const result = {
            test: 'test version truthy',
            success: false,
            message: ''
        };

        const slingVersion = version();

        result.success = slingVersion !== null && slingVersion !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996ManualChangeDetection() {
        const result = {
            test: 'test manual change detection',
            success: false,
            message: ''
        };

        let state = getState();
        state.manualChanges = 0;
        setState(state);

        const manualChangeComp = new TestManualChangeDetectionComponent1();

        addRoute('manualchange', { component: manualChangeComp, root: 'testmanualchange' });
        const attachDetector = false;
        const params = {};
        route('manualchange', params, attachDetector);

        const isCompAttached = isDetectorAttached('testmanualchange');

        state = getState();
        const changeCountCorrect = state.manualChanges === 1;

        const buttonEle = document.getElementById('manualincrementbutton');
        buttonEle.click();

        state = getState();
        const changeCountCorrect2 = state.manualChanges === 1;

        detectChanges();

        state = getState();
        const changeCountCorrect3 = state.manualChanges === 1;

        update('testmanualchange', manualChangeComp);

        state = getState();
        const changeCountCorrect4 = state.manualChanges === 2;

        result.success = changeCountCorrect && changeCountCorrect2 && changeCountCorrect3 && changeCountCorrect4 && !isCompAttached;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize999ManualChangeDetection() {
        const result = {
            test: 'test manual change detection strategy',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                const attachDetector = true;
                const params = {};
                route('manualchange', params, attachDetector);

                let state = getState();
                const changeCountCorrect = state.manualChanges > 0;
                const originalChangeCount = state.manualChanges;

                setDetectionStrategy(s.CHANGE_STRATEGY_MANUAL);

                const buttonEle = document.getElementById('manualincrementbutton');
                buttonEle.click();

                setTimeout(() => {
                    state = getState();
                    const changeCountCorrect2 = state.manualChanges === originalChangeCount;

                    setDetectionStrategy(s.CHANGE_STRATEGY_AUTOMATIC);

                    buttonEle.click();

                    setTimeout(() => {
                        state = getState();
                        const changeCountCorrect3 = state.manualChanges >= originalChangeCount + 1;

                        result.success = changeCountCorrect && changeCountCorrect2 && changeCountCorrect3;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 18);
                }, 18);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize996SsrHydrate() {
        const result = {
            test: 'test SSR hydration',
            success: false,
            message: ''
        };

        hydrate('testssrhydrate');

        const buttonEle = document.getElementById('ssrTest2');
        buttonEle.click();

        setTimeout(() => {
            const ssrDivEle = document.getElementById('ssrTest1');
            const nodeDefined = ssrDivEle && ssrDivEle.childNodes;
            const contentCorrect = nodeDefined && ssrDivEle.childNodes[0].textContent === 'Hydrated function called.';

            result.success = contentCorrect;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 0);
    }

    testFinalize996SsrHydrateWithThis() {
        const result = {
            test: 'test SSR hydration using this',
            success: false,
            message: ''
        };

        this.TestSsrHydrateComponent4 = TestSsrHydrateComponent4;
        const boundHydrate = hydrate.bind(this, 'testssrhydrate2');
        boundHydrate();

        const buttonEle = document.getElementById('ssrTest4');
        buttonEle.click();

        setTimeout(() => {
            const ssrDivEle = document.getElementById('ssrTest3');
            const nodeDefined = ssrDivEle && ssrDivEle.childNodes;
            const contentCorrect = nodeDefined && ssrDivEle.childNodes[0].textContent === 'Hydrated function called.';

            result.success = contentCorrect;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 0);
    }

    testFinalize997SsrToString() {
        const result = {
            test: 'test SSR render markup to string',
            success: false,
            message: ''
        };

        const compStr = renderToString(new TestSsrHydrateComponent1());

        result.success = compStr === '<div id="testssrhydrate" slssrclass="TestSsrHydrateComponent1"><button id="ssrTest2" onclick="">Test Hydrate</button><div id="ssrTest1">Hydrated function called.</div></div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997GenericHooksCallCount() {
        const result = {
            test: 'test slOnInit and slAfterInit hooks are not called needlessly',
            success: false,
            message: ''
        };

        let state = getState();
        state.genericHookTemplate = true;
        setState(state);

        mount('hooksgenericcomponent', new HooksGenericTestComponent());

        state = getState();
        const initCount = state.genericOnInit;
        const afterInitCount = state.genericAfterInit;
        state.genericHookTemplate = false;
        setState(state);

        detectChanges('hooksgenericcomponent');

        state = getState();
        const initCountFinal = state.genericOnInit;
        const afterInitCountFinal = state.genericAfterInit;

        result.success = initCount === 1 && afterInitCount === 1 && initCountFinal === 1 && afterInitCountFinal === 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997DestroyHookByTemplate() {
        const result = {
            test: 'test slOnDestroy hook called for template changes',
            success: false,
            message: ''
        };

        let state = getState();
        state.onDestroyCallTemplate = true;
        state.destroyTemplateCalls = 0;
        setState(state);

        mount('destroycalltemplatecomponent', new OnDestroyCallTemplateTestComponent());

        state = getState();
        const originalCalls = state.destroyTemplateCalls;
        state.onDestroyCallTemplate = false;

        detectChanges('destroycalltemplatecomponent');

        state = getState();
        const finalCalls = state.destroyTemplateCalls;

        result.success = originalCalls === 0 && finalCalls === 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997DestroyHookWithoutRouter() {
        const result = {
            test: 'test slOnDestroy hook called without router call',
            success: false,
            message: ''
        };

        let state = getState();
        state.destroyHook2Called = false;
        setState(state);

        mount('destroyhookcalledcomponent', new DestroyHookCalledTestComponent());

        state = getState();
        const initiallyFalse = state.destroyHook2Called === false;
        state.forceDestroyHook = true;
        setState(state);

        detectChanges('destroyhookcalledcomponent');

        state = getState();

        result.success = initiallyFalse && state.destroyHook2Called === true;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997OnInitThis() {
        const result = {
            test: 'test slOnInit this reference',
            success: false,
            message: ''
        };

        mount('oninitthiscomponent', new OnInitThisTestComponent());

        const state = getState();

        result.success = state.onInitThis === true;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997OnDestroyCalls() {
        const result = {
            test: 'test slOnDestroy called correct number of times',
            success: false,
            message: ''
        };

        const originalRoute = getRoute();

        addRoute('testdestroycalls', { component: new OnDestroyCallTestComponent(), root: 'destroycallcomponent' });
        route('testdestroycalls');

        let state = getState();
        state.onDestroyCall = true;
        setState(state);

        detectChanges('destroycallcomponent');

        route(originalRoute);

        state = getState();
        const destroyCalls = state.destroyCalls;

        result.success = destroyCalls === 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997AfterInitCalls() {
        const result = {
            test: 'test slAfterInit called correct number of times',
            success: false,
            message: ''
        };

        mount('initcallcomponent', new AfterInitCallTestComponent());

        let state = getState();
        state.afterInitCall = true;
        setState(state);

        detectChanges('initcallcomponent');

        state = getState();
        const initCalls = state.initCalls;

        result.success = initCalls === 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997OnInitCalls() {
        const result = {
            test: 'test slOnInit called correct number of times',
            success: false,
            message: ''
        };

        mount('oninitcallcomponent', new OnInitCallTestComponent());

        let state = getState();
        state.onInitCall = true;
        setState(state);

        detectChanges('oninitcallcomponent');

        state = getState();
        const initCalls = state.onInitCalls;

        result.success = initCalls === 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997UseExisting() {
        const result = {
            test: 'test use existing directive',
            success: false,
            message: ''
        };

        mount('divsheetcontent', new PartSupplyComponent());

        detectChanges();

        let chartEle = document.getElementById('divsheetcontent');

        if (chartEle && chartEle.children && chartEle.children.length > 0) {
            chartEle = chartEle.children[0];
        }

        const classList = chartEle.classList;
        const hasChartClass = classList.contains('js-plotly-plot');

        let child = null;
        let childHasClass1 = false;
        let childHasClass2 = false;

        if (chartEle && chartEle.children && chartEle.children.length > 0) {
            child = chartEle.children[0];
            childHasClass1 = child.classList.contains('plot-container');
            childHasClass2 = child.classList.contains('plotly');
        }

        result.success = chartEle && chartEle.children && chartEle.children.length > 0 && hasChartClass && child && childHasClass1 && childHasClass2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997SingleComponentUpdate() {
        const result = {
            test: 'test update single component',
            success: false,
            message: ''
        };

        let state = getState();
        state.testSingle = false;
        state.testSingle2 = false;
        setState(state);

        mount('testsinglecomponent1', new TestUpdateSingleComponent1());
        mount('testsinglecomponent2', new TestUpdateSingleComponent2());

        let firstEle = document.getElementById('testsinglecomponent1');
        const firstEleCorrect = firstEle && firstEle.textContent === 'Is test single false.';

        let secondEle = document.getElementById('testsinglecomponent2');
        const secondEleCorrect = secondEle && secondEle.textContent === 'Is test single false.';

        state = getState();
        state.testSingle = true;
        state.testSingle2 = true;
        setState(state);

        detectChanges('testsinglecomponent1');

        firstEle = document.getElementById('testsinglecomponent1');
        const firstEleCorrect2 = firstEle && firstEle.textContent === 'Is test single true.';

        secondEle = document.getElementById('testsinglecomponent2');
        const secondEleCorrect2 = secondEle && secondEle.textContent === 'Is test single false.';

        result.success = firstEleCorrect && secondEleCorrect && firstEleCorrect2 && secondEleCorrect2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997InsertBeforeDomStructure() {
        const result = {
            test: 'test insert before call on tag name change does not adversely impact DOM structure',
            success: false,
            message: ''
        };

        let state = getState();
        state.showPreview = false;
        setState(state);

        const contentComp = new ContentPanelComponent();
        mount('divcontentpanel', contentComp);

        state = getState();
        state.showPreview = true;
        setState(state);

        detectChanges();

        const contentEle = document.getElementById('divcontentpanel');

        state = getState();
        const afterInitCalled = state.sourcePanelAfterInit === true;

        const correctChild = contentEle && contentEle.children && contentEle.children.length === 1
            && contentEle.children[0].tagName === 'DIV';
        const correctNestedChild = contentEle && contentEle.children && contentEle.children.length === 1
            && contentEle.children[0].children && contentEle.children[0].children.length === 1 && contentEle.children[0].children[0].tagName === 'DIV';

        let nestedChild = null;
        let previewChildren = null;
        let hasPreviewChildren = false;

        if (contentEle && contentEle.children && contentEle.children.length === 1 && contentEle.children[0].children
            && contentEle.children[0].children.length === 1) {
            nestedChild = contentEle.children[0].children[0];

            if (nestedChild && nestedChild.children && nestedChild.children.length === 1) {
                hasPreviewChildren = true;
                previewChildren = nestedChild.children[0];
            }
        }

        let correctFirstEle = false;
        let correctSecondEle = false;
        let correctThirdEle = false;
        let correctFourthEle = false;

        let firstEleAttr1 = false;
        let secondEleAttr1 = false;
        let thirdEleAttr1 = false;
        let thirdEleAttr2 = false;
        let thirdEleAttr3 = false;
        let thirdEleAttr4 = false;
        let fourthEleAttr1 = false;
        let fourthEleAttr2 = false;
        let fourthEleAttr3 = false;
        let fourthEleAttr4 = false;

        if (hasPreviewChildren) {
            correctFirstEle = previewChildren && previewChildren.children && previewChildren.children.length > 0 && previewChildren.children[0].tagName === 'H4';
            correctSecondEle = previewChildren && previewChildren.children && previewChildren.children.length > 1 && previewChildren.children[1].tagName === 'DIV';
            correctThirdEle = previewChildren && previewChildren.children && previewChildren.children.length > 2 && previewChildren.children[2].tagName === 'IFRAME';
            correctFourthEle = previewChildren && previewChildren.children && previewChildren.children.length > 3 && previewChildren.children[3].tagName === 'TEXTAREA';
        }

        if (correctFirstEle) {
            firstEleAttr1 = previewChildren.children[0].getAttribute('style') !== null;
        }

        if (correctSecondEle) {
            secondEleAttr1 = previewChildren.children[1].getAttribute('style') !== null;
        }

        if (correctThirdEle) {
            thirdEleAttr1 = previewChildren.children[2].getAttribute('style') !== null;
            thirdEleAttr2 = previewChildren.children[2].getAttribute('sldirective') !== null;
            thirdEleAttr3 = previewChildren.children[2].getAttribute('id') !== null;
            thirdEleAttr4 = previewChildren.children[2].getAttribute('frameborder') !== null;
        }

        if (correctFourthEle) {
            fourthEleAttr1 = previewChildren.children[3].getAttribute('style') !== null;
            fourthEleAttr2 = previewChildren.children[3].getAttribute('placeholder') !== null;
            fourthEleAttr3 = previewChildren.children[3].getAttribute('sldirective') !== null;
            fourthEleAttr4 = previewChildren.children[3].getAttribute('id') !== null;
        }

        result.success = afterInitCalled && correctChild && correctNestedChild && hasPreviewChildren && correctFirstEle && correctSecondEle && correctThirdEle && correctFourthEle
            && firstEleAttr1 && secondEleAttr1 && thirdEleAttr1 && thirdEleAttr2 && thirdEleAttr3 && thirdEleAttr4 && fourthEleAttr1
            && fourthEleAttr2 && fourthEleAttr3 && fourthEleAttr4;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997OnlySelf() {
        const result = {
            test: 'test only self directive',
            success: false,
            message: ''
        };

        const onlySelfComp = new TestOnlySelfComponent1();
        mount('tryit-sling-iframe', onlySelfComp);

        const iframe = document.getElementById('tryit-sling-iframe');

        const htmlContainer = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
        htmlContainer.document.open();
        htmlContainer.document.write('<p>Hello, world!</p>');
        htmlContainer.document.close();

        detectChanges();

        const iframeEle = document.getElementById('tryit-sling-iframe');

        const correctBorder = iframeEle && iframeEle.getAttribute('frameborder') === '0';
        const correctId = iframeEle && iframeEle.id === 'tryit-sling-iframe';
        const onlySelfDirective = iframeEle && iframeEle.getAttribute('sldirective') === 'onlyself';
        const correctStyle = iframeEle && iframeEle.style.cssText === 'background-color: rgb(255, 255, 255);';

        result.success = correctBorder && correctId && onlySelfDirective && correctStyle;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997NestedConsumeClass() {
        const result = {
            test: 'test nested consume class',
            success: false,
            message: ''
        };

        const nestedComp = new TestNestedConsumeClassComponent1();
        mount('testnestedconsume', nestedComp);

        const ele = document.getElementById('testnestedconsume');

        const eleCorrect = ele && ele.tagName === 'DIV' && ele.children && ele.children.length === 1;
        const childCorrect = ele && ele.children && ele.children.length > 0 && ele.children[0].tagName === 'DIV'
            && ele.children[0].children && ele.children[0].children.length === 1;
        const secondChildCorrect = ele && ele.children && ele.children.length > 0 && ele.children[0].children
            && ele.children[0].children.length > 0 && ele.children[0].children[0].tagName === 'SPAN'
            && ele.children[0].children[0].textContent === 'Consumed class text.';

        result.success = eleCorrect && childCorrect && secondChildCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997NestedConsumeClassWithHook() {
        const result = {
            test: 'test nested consume class hook called',
            success: false,
            message: ''
        };

        const nestedComp = new TestNestedConsumeClassComponent4();
        mount('testnestedconsume2', nestedComp);

        const state = getState();
        const ele = document.getElementById('testnestedconsume2');

        const eleCorrect = ele && ele.tagName === 'DIV' && ele.children && ele.children.length === 1;
        const childCorrect = ele && ele.children && ele.children.length > 0 && ele.children[0].tagName === 'DIV'
            && ele.children[0].children && ele.children[0].children.length === 1;
        const secondChildCorrect = ele && ele.children && ele.children.length > 0 && ele.children[0].children
            && ele.children[0].children.length > 0 && ele.children[0].children[0].tagName === 'SPAN'
            && ele.children[0].children[0].textContent === 'Consumed class text with hook.';
        const hookCalled = state.nestedConsumeHook === true;

        result.success = eleCorrect && childCorrect && secondChildCorrect && hookCalled;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997SsrConsumeClass() {
        const result = {
            test: 'test SSR consume class',
            success: false,
            message: ''
        };

        const compStr = renderToString(new TestSsrHydrateComponent2());

        result.success = compStr === '<div id="testssrhydrate2" slssrclass="TestSsrHydrateComponent2"><div>Test consume class.</div></div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996TestTrustDirective() {
        const result = {
            test: 'test trust directive',
            success: false,
            message: ''
        };

        addRoute('testtrust', { component: new TestTrustDirectiveComponent1(), root: 'testtrustdirective' });

        route('testtrust');

        const ele = document.getElementById('testtrustdirective');

        const correctChildCount = ele && ele.children && ele.children.length === 2;

        result.success = correctChildCount;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996NestedDestroyHook() {
        const result = {
            test: 'test nested destroy hook called',
            success: false,
            message: ''
        };

        addRoute('nesteddestroy1', { component: new TestNestedDestroyHookComponent1(), root: 'testnesteddestroyhook' });
        addRoute('nesteddestroy2', { component: new TestNestedDestroyHookComponent3(), root: 'testnesteddestroyhook' });

        route('nesteddestroy1');

        let state = getState();

        const origEle = document.getElementById('testnesteddestroyhook');
        const correctOriginalText = origEle && origEle.childNodes && origEle.childNodes.length > 0 && origEle.innerText === 'Root component markup.\nNested destroy hook.';
        const rootDestroyCalledOriginally = state.rootDestroy === undefined || state.rootDestroy === null;
        const nestedDestroyCalledOriginally = state.nestedDestroy === undefined || state.nestedDestroy === null;

        route('nesteddestroy2');

        const rootDestroyCalled = state.rootDestroy === true;
        const nestedDestroyCalled = state.nestedDestroy === true;
        const ele = document.getElementById('testnesteddestroyhook');
        const correctTextAfterRoute = ele && ele.childNodes && ele.childNodes.length === 1 && ele.innerText === 'Plain root component markup.';

        result.success = rootDestroyCalledOriginally && nestedDestroyCalledOriginally && rootDestroyCalled && nestedDestroyCalled && correctTextAfterRoute
            && correctOriginalText;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996NestedHooks() {
        const result = {
            test: 'test nested on init and after init hooks called',
            success: false,
            message: ''
        };

        addRoute('nestedhook1', { component: new TestNestedAfterInitHookComponent1(), root: 'testnestedafterinithook' });
        addRoute('nestedhook2', { component: new TestNestedAfterInitHookComponent3(), root: 'testnestedafterinithook' });

        let state = getState();

        const rootAfterInitCalledOriginally = state.rootAfterInit === undefined || state.rootAfterInit === null;
        const nestedAfterInitCalledOriginally = state.nestedAfterInit === undefined || state.nestedAfterInit === null;
        const rootOnInitCalledOriginally = state.rootOnInit === undefined || state.rootOnInit === null;
        const nestedOnInitCalledOriginally = state.nestedOnInit === undefined || state.nestedOnInit === null;

        route('nestedhook1');

        const origEle = document.getElementById('testnestedafterinithook');
        const correctOriginalText = origEle && origEle.childNodes && origEle.childNodes.length > 0 && origEle.innerText === 'Root component markup.\nNested after init and on init hooks.';
        const rootAfterInitCalled = state.rootAfterInit === true;
        const nestedAfterInitCalled = state.nestedAfterInit === true;
        const rootOnInitCalled = state.rootOnInit === true;
        const nestedOnInitCalled = state.nestedOnInit === true;

        route('nestedhook2');

        const ele = document.getElementById('testnestedafterinithook');
        const correctTextAfterRoute = ele && ele.childNodes && ele.childNodes.length === 1 && ele.innerText === 'Plain root component markup.';

        result.success = rootAfterInitCalledOriginally && nestedAfterInitCalledOriginally && rootOnInitCalledOriginally && nestedOnInitCalledOriginally
            && correctOriginalText && rootAfterInitCalled && nestedAfterInitCalled && rootOnInitCalled && nestedOnInitCalled && correctTextAfterRoute;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996NestedHooksMultipleComponents() {
        const result = {
            test: 'test nested on init and after init hooks called with multiple components',
            success: false,
            message: ''
        };

        addRoute('nestedhook3', { component: new TestNestedHookComponent1(), root: 'testnestedhook' });
        addRoute('nestedhook4', { component: new TestNestedHookComponent3(), root: 'testnestedhook' });

        let state = getState();

        const rootAfterInitCalledOriginally = state.rootAfterInit2 === undefined || state.rootAfterInit2 === null;
        const nestedAfterInitCalledOriginally = state.nestedAfterInit2 === undefined || state.nestedAfterInit2 === null;
        const rootOnInitCalledOriginally = state.rootOnInit2 === undefined || state.rootOnInit2 === null;
        const nestedOnInitCalledOriginally = state.nestedOnInit2 === undefined || state.nestedOnInit2 === null;

        state.rootAfterInit2 = 0;
        state.rootOnInit2 = 0;
        state.nestedOnInit2 = 0;
        state.nestedAfterInit2 = 0;
        setState(state);

        route('nestedhook3');

        const rootAfterInitCalled = state.rootAfterInit2 === 1;
        const nestedAfterInitCalled = state.nestedAfterInit2 === 2;
        const rootOnInitCalled = state.rootOnInit2 === 1;
        const nestedOnInitCalled = state.nestedOnInit2 === 2;

        result.success = rootAfterInitCalledOriginally && nestedAfterInitCalledOriginally && rootOnInitCalledOriginally && nestedOnInitCalledOriginally
            && rootAfterInitCalled && nestedAfterInitCalled && rootOnInitCalled && nestedOnInitCalled;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996CanDeactivateRouterHook() {
        const result = {
            test: 'test can deactivate router hook',
            success: false,
            message: ''
        };

        addRoute('deactivate1', {
            component: new TestCanDeactiveComponent(), root: 'testcandeactivate', onCanDeactivate: () => {
                const state = getState();
                return state.canDeactivate === true;
            }
        });
        addRoute('deactivate2', { component: new TestCanDeactiveComponent2(), root: 'testcandeactivate' });

        route('deactivate1');

        let ele = document.getElementById('testcandeactivate');
        const correctText = ele && ele.innerText === 'Can deactivate component.';

        route('deactivate2');

        ele = document.getElementById('testcandeactivate');
        const correctFinalText = ele && ele.innerText === 'Can deactivate component.';

        result.success = correctText && correctFinalText;

        const state = getState();
        state.canDeactivate = true;
        setState(state);

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996ObserableRoute() {
        const result = {
            test: 'test route observable changes correctly',
            success: false,
            message: ''
        };

        let state = getState();
        state.observable = 0;
        setState(state);

        route('');

        let routeObservable = Observable(getRouteSegments());
        routeObservable.subscribe(function (routeArr) {
            state = getState();
            if (state.observable !== undefined && state.observable !== null) state.observable++;
            setState(state);
        });

        state = getState();
        const correctOriginalCount = state.observable === 0;

        route('basictest/5');

        state = getState();
        const correctCount = state.observable === 1;

        const segments = getRouteSegments();
        const correctSegment1 = segments && segments.length > 0 && segments[0] === 'basictest';
        const correctSegment2 = segments && segments.length > 1 && segments[1] === '5';

        result.success = correctOriginalCount && correctCount && correctSegment1 && correctSegment2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996RouteSegments() {
        const result = {
            test: 'test get route segments',
            success: false,
            message: ''
        };

        route('basictest/5');

        const currentRoute = getRoute();
        const correctRoute = currentRoute === 'basictest/5';

        const segments = getRouteSegments();
        const correctSegment1 = segments && segments.length > 0 && segments[0] === 'basictest';
        const correctSegment2 = segments && segments.length > 1 && segments[1] === '5';

        result.success = segments && correctSegment1 && correctSegment2 && correctRoute;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize995DebouncedDetection() {
        const result = {
            test: 'test debounced change detection',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let state = getState();
                state.debounce = 0;
                setState(state);

                mount('testdebouncecomponent', new TestDebounceDetectionComponent());
                const buttonEle = document.getElementById('debounceToggleButton');

                state = getState();
                const originalCount = state.debounce;

                setTimeout(() => {
                    const startTime = new Date();

                    buttonEle.click();
                    buttonEle.click();
                    buttonEle.click();
                    buttonEle.click();
                    buttonEle.click();

                    const endTime = new Date();

                    let ellapsedMillis = endTime - startTime;
                    let changeCycles = 0;

                    while (ellapsedMillis > 17) {
                        changeCycles++;
                        ellapsedMillis -= 17;
                    }

                    if (changeCycles === 0) {
                        changeCycles++;
                    }

                    setTimeout(() => {
                        state = getState();
                        // Initial mount, one call for 5 clicks, plus final debounced call
                        result.success = state.debounce === originalCount + changeCycles + 1;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 19);
                }, 19);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize990RouteComplex() {
        const result = {
            test: 'test basic route with parameter',
            success: false,
            message: ''
        };

        mount('routecomponent', new NoRouteComponent());
        addRoute('complextest/:someId/static/:someParam', { component: new RouteComplexComponent(), root: 'routecomponent' });
        route('complextest/5/static/foo');

        const currentRoute = getRoute();
        const correctRoute = currentRoute === 'complextest/5/static/foo';

        const divEle = document.getElementById('routecomponent');

        const correctText = divEle.textContent === 'Complex route taken.';

        result.success = correctText && correctRoute;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize896RebindDetection() {
        const result = {
            test: 'test rebinding change detection to bound functions',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let stateObj = getState();
                stateObj.count2 = 0;
                setState(stateObj);

                mount('testtagcomponent3', new TestRebindDetectionComponent());

                const ele = document.getElementById('toggleModeButton4');
                ele.click();
                setTimeout(() => {
                    ele.click();

                    setTimeout(() => {
                        stateObj = getState();

                        const updateCountCorrect = stateObj.count2 && stateObj.count2 >= 3;

                        const removeElementsButton = document.getElementById('toggleModeButton3');
                        removeElementsButton.click();

                        setTimeout(() => {
                            const rowEle = document.getElementById('testTagRow3');
                            const rowsReducedCorrect = rowEle && rowEle.children.length === 1 && rowEle.children[0].childNodes.length === 1;

                            removeElementsButton.click();

                            setTimeout(() => {
                                const rowsRestoredCorrect = rowEle && rowEle.children.length === 3;

                                ele.click();

                                setTimeout(() => {
                                    const correctDiv1 = rowEle && rowEle.children.length === 3 && rowEle.children[0].textContent === 'Mode: 0';
                                    const correctDiv2 = rowEle && rowEle.children.length === 3 && rowEle.children[1].textContent === 'Mode: 0';
                                    const correctDiv3 = rowEle && rowEle.children.length === 3 && rowEle.children[2].textContent === 'Mode: 0';

                                    setTimeout(() => {
                                        const changeDetectionCalled = stateObj.count2 && stateObj.count2 >= 6;

                                        result.success = updateCountCorrect && rowsReducedCorrect && rowsRestoredCorrect && changeDetectionCalled
                                            && correctDiv1 && correctDiv2 && correctDiv3;

                                        window.globalTestResults.push(result);
                                        window.globalTestCount++;
                                        window.globalAsyncCount--;
                                    }, 18);
                                }, 18);
                            }, 18);
                        }, 18);
                    }, 18);
                }, 18);
            }

            attempts++;

            if (attempts === 110 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize990DomStringReplacement() {
        const result = {
            test: 'test DOMString replacement of a child node',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                const domStringComp = new TestDomStringComponent();
                mount('testdomstring', domStringComp);

                const domStrRoot = document.getElementById('testdomstring');

                const correctOriginalChildCount = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2;
                const correctOriginalDivCount = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                    && domStrRoot.children[1].childNodes && domStrRoot.children[1].childNodes.length === 2;
                const correctOriginalTag = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                    && domStrRoot.children[1].childNodes && domStrRoot.children[1].childNodes[0].tagName === 'LABEL';
                const correctOriginalTag2 = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                    && domStrRoot.children[1].childNodes && domStrRoot.children[1].childNodes[1].tagName === 'INPUT';

                const domStrButton = document.getElementById('domStringButton');
                domStrButton.click();

                setTimeout(() => {
                    const correctChildCount = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2;
                    const correctDivCount = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                        && domStrRoot.children[1].childNodes && domStrRoot.children[1].childNodes.length === 1;
                    const correctTag = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                        && domStrRoot.children[1].childNodes.tagName === undefined;

                    result.success = correctOriginalChildCount && correctOriginalDivCount && correctOriginalTag && correctOriginalTag2
                        && correctChildCount && correctDivCount && correctTag;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;

                    clearInterval(waitForStableInterval);
                }, 100);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    dummyOnClickFunction() {
        console.log('Testing...');
    }

    testRenderElement() {
        const result = {
            test: 'test render element function',
            success: false,
            message: ''
        };

        const nodeMarkup = markup('tr', {
            attrs: {
                'style': 'color:red;',
                'class': 'some-fake-class',
                onclick: this.dummyOnClickFunction
            },
            children: [
                textNode('Hello, world!')
            ]
        });
        const node = renderElement(nodeMarkup);

        const correctTag = node.tagName && node.tagName === 'TR';
        const correctStyle = node.getAttribute('style') === 'color:red;';
        const correctClass = node.getAttribute('class') === 'some-fake-class';
        const correctChildren = node.childNodes && node.childNodes.length === 1 && node.childNodes[0].data === 'Hello, world!';
        const correctOnClick = node.onclick && typeof node.onclick === 'function';

        result.success = correctTag && correctStyle && correctClass && correctChildren && correctOnClick;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize960AnimateDestroy() {
        const result = {
            test: 'test animation of element before destroy',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);
                mount('divanimatedestroy', new TestDestroyAnimateComponent1());

                const originalEle = document.getElementById('h1toanimate');
                const originallyExists = originalEle !== null && originalEle !== undefined && originalEle.tagName === 'H1';

                const startAnimateButton = document.getElementById('startanimatedestroy');
                startAnimateButton.click();

                setTimeout(() => {
                    const delayedEle = document.getElementById('h1toanimate');
                    const delayedExists = delayedEle !== null && delayedEle !== undefined && delayedEle.tagName === 'H1';

                    setTimeout(() => {
                        const deletedEle = document.getElementById('h1toanimate');
                        const deletedSuccess = deletedEle == undefined || deletedEle === null;

                        result.success = originallyExists && delayedExists && deletedSuccess;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 600);
                }, 500);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize960XhrReuse() {
        const result = {
            test: 'test XMLHttpRequest object reuse with multiple send requests',
            success: false,
            message: ''
        };

        const xhr1 = new XMLHttpRequest();

        xhr1.onload = function () {
            console.log('testFinalize960XhrReuse XHR load completed');

            onloadCount++;
            if (this.response !== null && this.response !== undefined && this.response !== '') responseNotEmptyCount++;

            result.success = onloadCount === NUMBER_OF_REQUESTS && responseNotEmptyCount === NUMBER_OF_REQUESTS;

            if (onloadCount === NUMBER_OF_REQUESTS) {
                addedResult = true;
                window.globalTestResults.push(result);
                window.globalTestCount++;
            } else {
                xhr1.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

                console.log('testFinalize960XhrReuse before send');
                xhr1.send(null);
                console.log('testFinalize960XhrReuse after send');
            }
        };

        let onloadCount = 0;
        let responseNotEmptyCount = 0;
        let addedResult = false;
        const NUMBER_OF_REQUESTS = 2;

        xhr1.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

        console.log('testFinalize960XhrReuse before send');
        xhr1.send(null);
        console.log('testFinalize960XhrReuse after send');

        setTimeout(() => {
            if (!addedResult) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        }, 12000);
    }

    testFinalize960TimeoutFunctionTriggersChanges() {
        const result = {
            test: 'test setTimeout function argument does not trigger change detection',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                mount('divtimeoutcdr', new TimeoutTestComponent1());

                wrapWithChangeDetector(() => setTimeout(() => {
                    let state = getState();
                    const cdrcount = state.timeoutcdr;

                    result.success = cdrcount === 2;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
                }, 250))();
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize960NestedClassRenderedToString() {
        const result = {
            test: 'test nested class rendered to string properly',
            success: false,
            message: ''
        };

        const compStr = renderToString(new TestControllerComponent2());

        result.success = compStr === '<div class="container" id="main2"><div class="jumbotron"><div class="row"><div class="col-md-6"><h1>Sling.js</h1></div><div class="col-md-6"><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="run2" onclick="">Create 1,000 rows</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="runlots2" onclick="">Create 10,000 rows</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="add2" onclick="">Append 1,000 rows</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="update2" onclick="">Update every 10th row</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="clear2" onclick="">Clear</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="swaprows2" onclick="">Swap Rows</button></div></div></div></div><table class="table table-hover table-striped test-data" id="idcontrollertable2"><tbody><tr class="" onclick="" onremove=""><td class="col-md-1">1</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">pretty red table</a></td><td class="col-md-1"><a href="#" id="id-row-delete-1" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">2</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">clean orange pizza</a></td><td class="col-md-1"><a href="#" id="id-row-delete-2" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">3</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">important black cookie</a></td><td class="col-md-1"><a href="#" id="id-row-delete-3" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">4</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">short white desk</a></td><td class="col-md-1"><a href="#" id="id-row-delete-4" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">5</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">helpful brown chair</a></td><td class="col-md-1"><a href="#" id="id-row-delete-5" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">6</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">pretty purple mouse</a></td><td class="col-md-1"><a href="#" id="id-row-delete-6" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">7</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">clean brown sandwich</a></td><td class="col-md-1"><a href="#" id="id-row-delete-7" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">8</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">important pink car</a></td><td class="col-md-1"><a href="#" id="id-row-delete-8" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">9</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">short green house</a></td><td class="col-md-1"><a href="#" id="id-row-delete-9" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">10</td><td class="col-md-4"><a href="#" onclick="" slpreventdefault="true">helpful blue keyboard</a></td><td class="col-md-1"><a href="#" id="id-row-delete-10" onclick="" slpreventdefault="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr></tbody></table><span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span></div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize960NestedClassConsumedInChild() {
        const result = {
            test: 'test nested class consumed in child properly',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                mount('testnestedchild1', new TestControllerComponent1());

                const addBtn = document.getElementById('add');
                addBtn.click();

                setTimeout(() => {
                    let tableEle = document.getElementById('idcontrollertable');
                    let tbodyEle = tableEle.children[0];

                    const correctRowCount = tbodyEle && tbodyEle.children && tbodyEle.children.length === 10;

                    const deleteBtn = document.getElementById('id-row-delete-2');
                    deleteBtn.click();

                    setTimeout(() => {
                        tableEle = document.getElementById('idcontrollertable');
                        tbodyEle = tableEle.children[0];

                        const correctRowCountAfterDelete = tbodyEle && tbodyEle.children && tbodyEle.children.length === 9;

                        result.success = correctRowCount && correctRowCountAfterDelete;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 200);
                }, 200);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize897RebindDetection() {
        const result = {
            test: 'test rebinding change detection to bound functions with complex markup',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let stateObj = getState();
                stateObj.count4 = 0;
                setState(stateObj);

                mount('testtagcomponent5', new TestRebindDetectionComplexComponent());

                const ele = document.getElementById('toggleModeButton8');
                ele.click();
                setTimeout(() => {
                    ele.click();

                    setTimeout(() => {
                        stateObj = getState();

                        const updateCountCorrect = stateObj.count4 && stateObj.count4 === 3;

                        const removeElementsButton = document.getElementById('toggleModeButton7');
                        removeElementsButton.click();

                        setTimeout(() => {
                            const rowEle = document.getElementById('testTagRow5');
                            const rowsReducedCorrect = rowEle && rowEle.children.length === 1 && rowEle.children[0].childNodes.length === 1;

                            removeElementsButton.click();

                            setTimeout(() => {
                                const rowsRestoredCorrect = rowEle && rowEle.children.length === 5;

                                ele.click();

                                setTimeout(() => {
                                    const correctDiv1 = rowEle && rowEle.children.length === 5 && rowEle.children[0].textContent === 'Mode: 0 some markup and a text node';
                                    const correctDiv2 = rowEle && rowEle.children.length === 5 && rowEle.children[1].textContent === 'Toggle';
                                    const correctDiv3 = rowEle && rowEle.children.length === 5 && rowEle.children[2].textContent === 'Mode: 0 some markup and a text node';
                                    const correctDiv4 = rowEle && rowEle.children.length === 5 && rowEle.children[3].textContent === 'Toggle';
                                    const correctDiv5 = rowEle && rowEle.children.length === 5 && rowEle.children[4].textContent === 'Mode: 0 some markup and a text node';

                                    const changeDetectionCalled = stateObj.count4 && stateObj.count4 >= 6;

                                    result.success = updateCountCorrect && rowsReducedCorrect && rowsRestoredCorrect && changeDetectionCalled
                                        && correctDiv1 && correctDiv2 && correctDiv3 && correctDiv4 && correctDiv5;

                                    window.globalTestResults.push(result);
                                    window.globalTestCount++;
                                    window.globalAsyncCount--;
                                }, 18);
                            }, 18);
                        }, 18);
                    }, 18);
                }, 18);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize980RebindDetectionWithNonNodeType3() {
        const result = {
            test: 'test rebinding change detection to bound functions where components have markup',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let stateObj = getState();
                stateObj.count3 = 0;
                setState(stateObj);

                mount('testtagcomponent4', new TestRebindDetectionComponent2());

                const ele = document.getElementById('toggleModeButton6');
                ele.click();
                setTimeout(() => {
                    ele.click();

                    setTimeout(() => {
                        stateObj = getState();

                        const updateCountCorrect = stateObj.count3 && stateObj.count3 === 3;

                        const removeElementsButton = document.getElementById('toggleModeButton5');
                        removeElementsButton.click();

                        setTimeout(() => {
                            const rowEle = document.getElementById('testTagRow4');
                            const rowsReducedCorrect = rowEle && rowEle.children.length === 1 && rowEle.children[0].childNodes.length === 1;

                            removeElementsButton.click();

                            setTimeout(() => {
                                const rowsRestoredCorrect = rowEle && rowEle.children.length === 3;
                                const correctTd1 = rowEle && rowEle.children.length === 3 && rowEle.children[0].textContent === 'Mode: 0 <span>';
                                const correctTd3 = rowEle && rowEle.children.length === 3 && rowEle.children[2].textContent === 'Mode: 0 <span>';
                                const correctActiveRowCount = rowEle && rowEle.children.length === 3 && rowEle.children[1].children.length === 2;
                                const correctButton = rowEle && rowEle.children.length === 3 && rowEle.children[1].children.length === 2
                                    && rowEle.children[1].children[0].textContent === 'Toggle';
                                const correctInput = rowEle && rowEle.children.length === 3 && rowEle.children[1].children.length === 2
                                    && rowEle.children[1].children[1].value === '1';
                                ele.click();

                                setTimeout(() => {
                                    const changeDetectionCalled = stateObj.count3 && stateObj.count3 >= 6;

                                    result.success = updateCountCorrect && rowsReducedCorrect && rowsRestoredCorrect && changeDetectionCalled
                                        && correctTd1 && correctTd3 && correctActiveRowCount && correctButton && correctInput;

                                    window.globalTestResults.push(result);
                                    window.globalAsyncCount--;
                                    window.globalTestCount++;
                                }, 18);
                            }, 18);
                        }, 18);
                    }, 18);
                }, 18);
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalAsyncCount--;
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testDetachedInterval() {
        const result = {
            test: 'test detached interval functions as expected',
            success: false,
            message: ''
        };

        if (setInterval !== null && setInterval !== undefined) {
            let initiallyExists = null;
            let slingIntervalCount = 0;

            window.globalAsyncCount++;
            wrapWithChangeDetector(() => setTimeout(() => {
                window.globalAsyncCount--;
                const fakeEles = document.getElementsByClassName('fakeclass1')
                initiallyExists = fakeEles.length !== 0;
            }, 25))();

            const slingInterval = setInterval(() => {
                const fakeEle = document.createElement('div');
                fakeEle.classList.add('fakeclass1');
                document.body.appendChild(fakeEle);
                slingIntervalCount++;

                if (slingIntervalCount === 2) {
                    clearInterval(slingInterval);
                }
            }, 80);

            window.globalAsyncCount++;
            wrapWithChangeDetector(() => setTimeout(() => {
                window.globalAsyncCount--;
                const fakeEles = document.getElementsByClassName('fakeclass1')
                const correctFinalCount = fakeEles.length === 2;

                if (initiallyExists === false && correctFinalCount === true) {
                    result.success = true;
                }

                window.globalTestCount++;
            }, 2000))();
        }

        window.globalTestResults.push(result);
    }

    testPriority10BoundAddNoteFunctionNotCalledNeedlessly() {
        const result = {
            test: 'test bound add note function not called needlessly',
            success: false,
            message: ''
        };

        const stateObj = getState();
        const originalAddedCount = stateObj.getNoteAddedCount();

        result.success = originalAddedCount === 0;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    addNoteManually() {
        const textArea = document.getElementById('noteInputTextArea');
        textArea.value = 'test';
        const inputEvent = {
            bubbles: true,
            cancelBubble: false,
            cancelable: false,
            composed: true,
            currentTarget: null,
            data: "h",
            dataTransfer: null,
            defaultPrevented: false,
            detail: 0,
            eventPhase: 2,
            inputType: "insertText",
            isComposing: false,
            isTrusted: true,
            path: [],
            sourceCapabilities: null,
            srcElement: null,
            target: textArea,
            timeStamp: 87124.19999999925,
            type: "input",
            view: null,
            which: 0
        };
        textArea.oninput(inputEvent);

        const addNoteButton = document.getElementById('addNoteButton');
        addNoteButton.click();

        detectChanges();
    }

    testAddNoteButton() {
        const result = {
            test: 'test add note button function runs once',
            success: false,
            message: ''
        };

        const stateObj = getState();
        const originalAddedCount = stateObj.getNoteAddedCount();

        this.addNoteManually();

        result.success = (stateObj.getNoteAddedCount() - 1) === originalAddedCount && originalAddedCount >= 0;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testAddNoteButtonRendering() {
        const result = {
            test: 'test add note button rendering is performed successfully',
            success: false,
            message: ''
        };

        route('all');

        let eles = document.querySelectorAll('.input-group-text input');
        const originalCount = eles.length;

        this.addNoteManually();

        eles = document.querySelectorAll('.input-group-text input');

        result.success = (originalCount + 1) === eles.length;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testUpdateMapDefined() {
        const result = {
            test: 'test update map defined',
            success: false,
            message: ''
        };

        if (s !== null && s !== undefined && s._updateMap !== null && s._updateMap !== undefined) {
            result.success = true;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testUpdateMapCorrectCount() {
        const result = {
            test: 'test update map has correct count',
            success: false,
            message: ''
        };

        if (s && s._updateMap && s._updateMap.size === 8) {
            result.success = true;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testPriority20MarkTwoAsCompleteAndRoute() {
        const result = {
            test: 'test manually marking notes and routing to completed route',
            success: false,
            message: ''
        };

        route('all');

        let eles = document.querySelectorAll('.input-group-text input');

        if (eles) {
            while (eles.length < 3) {
                this.addNoteManually();
                eles = document.querySelectorAll('.input-group-text input');
            }

            const notes = getState().getNotes();

            if (notes) {
                notes.forEach(note => {
                    note.completed = false;
                });

                if (notes.length > 2) {
                    notes[0].completed = true;
                    notes[1].completed = true;
                }

                getState().setNotes(notes);
                detectChanges();
            }

            route('completed');

            eles = document.querySelectorAll('.input-group-text input');

            result.success = eles.length === 2;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    block(millis = 18) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, millis);
        });
    }

    testFinalize100ClearCompletedAndVerifyRendering() {
        const result = {
            test: 'test clearing completed notes and verify rendering',
            success: false,
            message: ''
        };

        route('all');

        let eles = document.querySelectorAll('.input-group-text input');

        if (eles) {
            while (eles.length < 3) {
                this.addNoteManually();
                eles = document.querySelectorAll('.input-group-text input');
            }

            const notes = getState().getNotes();

            if (notes) {
                notes.forEach(note => {
                    note.completed = false;
                });

                if (notes.length > 2) {
                    notes[0].completed = true;
                    notes[1].completed = true;
                }

                getState().setNotes(notes);
                detectChanges();
            }

            eles = document.querySelectorAll('.input-group-text input');
            const originalNoteCount = eles.length;

            const clearNotesButton = document.getElementById('clearNotesButton');
            clearNotesButton.click();

            window.globalAsyncCount++;
            setTimeout(() => {
                window.globalAsyncCount--;
                eles = document.querySelectorAll('.input-group-text input');

                result.success = (originalNoteCount - 2) === eles.length;

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 1);
        }
    }

    testCorrectNumberOfInputElements() {
        const result = {
            test: 'test correct number of input elements rendered',
            success: false,
            message: ''
        };

        route('all');

        const inputEles = document.querySelectorAll('.input-group input');

        const stateObj = getState();
        const noteCount = stateObj.getNotes().length;

        result.success = (noteCount * 2) === inputEles.length;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100ChangeDetectionOnTextWithHook() {
        const result = {
            test: 'test mounting component with lifecycle hook and calling change detection',
            success: false,
            message: ''
        };

        mount('testcomponent2', new TestComponent2());

        window.globalAsyncCount++;
        setTimeout(() => {
            window.globalAsyncCount--;
            let ele = document.getElementById('testcomponent2');
            const firstPass = ele.textContent === 'Hello, world! Count: 1';
            detectChanges();
            ele = document.getElementById('testcomponent2');
            const secondPass = ele.textContent === 'Hello, world! Count: 1';
            detectChanges();
            ele = document.getElementById('testcomponent2');
            const thirdPass = ele.textContent === 'Hello, world! Count: 1';
            detectChanges();
            ele = document.getElementById('testcomponent2');
            const fourthPass = ele.textContent === 'Hello, world! Count: 1';

            result.success = firstPass && secondPass && thirdPass && fourthPass;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 1);
    }

    testFinalize800ChangeTag() {
        const result = {
            test: 'test changing the tag of a node',
            success: false,
            message: ''
        };

        mount('testtagcomponent1', new TestTagChangeComponent());
        let rowEle = document.getElementById('testTagRow1');
        let rowChildren = rowEle ? rowEle.children : [];

        let initialCorrect = rowChildren.length > 0 && rowChildren[0].tagName === 'TD';
        let initialTdCorrect = rowChildren.length > 0 && rowChildren[0].childNodes.length > 0 && rowChildren[0].textContent === 'Mode: false';

        const buttonEle = document.getElementById('toggleModeButton');
        buttonEle.click();
        setTimeout(() => {
            rowEle = document.getElementById('testTagRow1');
            rowChildren = rowEle ? rowEle.children : [];

            let changeCorrect = rowChildren.length > 0 && rowChildren[0].tagName === 'INPUT' && rowChildren[0].childNodes.length === 0;
            let changeInputCorrect = rowChildren.length > 0 && rowChildren[0].value === 'true';

            result.success = initialCorrect && initialTdCorrect && changeCorrect && changeInputCorrect;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize300DestroyHookCalled() {
        const result = {
            test: 'test destroy hook called on route change',
            success: false,
            message: ''
        };

        addRoute('destroycomp', { component: new TestDestroyHookComponent(), root: 'testdestroyhookcomponent' });
        addRoute('afterdestroy', { component: new TestAfterDestroyHookComponent(), root: 'testdestroyhookcomponent' });

        route('destroycomp');
        route('afterdestroy');

        const stateObj = getState();

        result.success = stateObj && stateObj.onDestroyHookCalled;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize900FetchTriggersChangeDetection() {
        const result = {
            test: 'test fetch triggers change detection',
            success: false,
            message: ''
        };

        const originalState = getState();
        originalState.count = 0;
        setState(originalState);

        let attempts = 0;
        const waitForStableInterval = setInterval(() => {
            if (window.globalAsyncCount === 0) {
                clearInterval(waitForStableInterval);
                window.globalAsyncCount++;
                mount('testfetchcomponent', new TestFetchChangeDetectionComponent());

                const requestPromises = [
                    fetch('todo.html')
                ];

                resolveAll(requestPromises).then((results) => {
                    const successfulPromises = results.filter(p => p.status === 'fulfilled');
                    const hadSuccess = successfulPromises && successfulPromises.length === 1;

                    setTimeout(() => {
                        const ele = document.getElementById('testfetchcomponent');

                        const stateObj = getState();
                        const correctText = ele.textContent === 'Count: 1';
                        const countIncremented = stateObj && stateObj.count === 2;

                        result.success = hadSuccess && correctText && countIncremented;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 18);
                });
            }

            attempts++;

            if (attempts === 90 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize300SvgIsRendered() {
        const result = {
            test: 'test SVG is rendered',
            success: false,
            message: ''
        };

        mount('divsvgtest1', new TestSvgComponent1());
        const ele1 = document.getElementById('svg-test-1');
        const n1 = ele1.namespaceURI === 'http://www.w3.org/2000/svg';

        const ele2 = document.getElementById('use-test-1');
        const xlinkAttribute = ele2.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
        const attr1 = xlinkAttribute === '#gentle-wave';

        const ele3 = document.getElementById('g-use-1');
        const bbox = ele3.getBBox();

        const isNotZeroSize = bbox.height * bbox.width;
        const contains1 = document.contains(ele3);

        detectChanges();

        const contains2 = document.contains(ele3);

        result.success = n1 && attr1 && !isNaN(isNotZeroSize) && (isNotZeroSize > 0) && contains1 && contains2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testResolveAll() {
        const result = {
            test: 'test resolve all promises',
            success: false,
            message: ''
        };

        const requestPromises = [
            fetch('todo.html'),
            fetch('http://does-not-exist')
        ];

        resolveAll(requestPromises).then((results) => {
            const successfulPromises = results.filter(p => p.status === 'fulfilled');

            result.success = successfulPromises && successfulPromises.length === 1;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        });
    }

    testResolveAllOrdering() {
        const result = {
            test: 'test resolve all promises are in correct order',
            success: false,
            message: ''
        };

        const requestPromises = [
            fetch('todo.html'),
            fetch('http://does-not-exist')
        ];

        resolveAll(requestPromises).then((results) => {
            const firstSuccess = results[0].status === 'fulfilled';
            const secondFailure = results[1].status === 'rejected';

            result.success = firstSuccess && secondFailure;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        });
    }

    testFinalize100RouteParams() {
        const result = {
            test: 'test route params are set correctly',
            success: false,
            message: ''
        };

        addRoute('foobarbaz', { component: new RouteParamsTestComponent(), root: 'routeparamscomponent' });
        route('foobarbaz', { a: 1, b: true, c: 'abc', d: 3.14, e: () => { console.log('hello'); } });

        const params = getRouteParams();

        const aCorrect = params.a && params.a === 1;
        const bCorrect = params.b && params.b === true;
        const cCorrect = params.c && params.c === 'abc';
        const dCorrect = params.d && params.d === 3.14;
        const eCorrect = params.e && params.e.toString().replace(/\s+/g, '').replace(/["';]/g, '') === "()=>{console.log(hello)}";

        result.success = aCorrect && bCorrect && cCorrect && dCorrect && eCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100AuthenticationGuard() {
        const result = {
            test: 'test authentication guard failure routing',
            success: false,
            message: ''
        };

        addRoute('dashboard', { component: new TestGuardComponent(), root: 'authcomponent', onActivationCheck: () => { return false; }, onActivationFail: { route: 'noauth' } });
        addRoute('noauth', { component: new AuthFailComponent(), root: 'authcomponent' });

        route('dashboard');

        let ele = document.getElementById('authcomponent');

        const correctText = ele && ele.textContent === 'Authentication guard returned false.';

        result.success = correctText;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize800ChangeTagAndRemoveNode() {
        const result = {
            test: 'test changing the tag of a node and test removal of a node',
            success: false,
            message: ''
        };

        mount('testtagcomponent2', new TestTagChangeComponent2());
        let rowEle = document.getElementById('testTagRow2');
        let rowChildren = rowEle ? rowEle.children : [];

        let initialCorrect = rowChildren.length > 0 && rowChildren[0].tagName === 'DIV';
        let hasInitialTd = rowChildren.length > 0 && rowChildren[0].children.length === 1;
        let hasInitialTd2 = rowChildren.length > 1 && rowChildren[1].children.length === 1;
        let initialTdCorrect = false;
        let initialTd2Correct = false;

        if (hasInitialTd) {
            initialTdCorrect = rowChildren[0].children[0].tagName === 'TD' && rowChildren[0].children[0].textContent === 'Mode: false';
        }

        if (hasInitialTd2) {
            initialTd2Correct = rowChildren[1].children[0].tagName === 'TD' && rowChildren[1].children[0].textContent === 'Mode: false';
        }

        const buttonEle = document.getElementById('toggleModeButton2');
        buttonEle.click();

        setTimeout(() => {
            rowEle = document.getElementById('testTagRow2');
            rowChildren = rowEle ? rowEle.children : [];

            let changeCorrect = rowChildren.length > 0 && rowChildren[0].tagName === 'DIV';
            let changeInputCorrect = rowChildren.length === 1 && rowChildren[0].children.length === 1 && rowChildren[0].children[0].tagName === 'INPUT';
            let changeInputValueCorrect = rowChildren.length === 1 && rowChildren[0].children.length === 1 && rowChildren[0].children[0].value === 'true';
            let changeInputChildrenCorrect = rowChildren.length === 1 && rowChildren[0].children.length === 1 && rowChildren[0].children[0].childNodes.length === 0;

            result.success = initialCorrect && initialTdCorrect && initialTd2Correct && changeCorrect && changeInputCorrect
                && changeInputValueCorrect && changeInputChildrenCorrect;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize100RemountComponent() {
        const result = {
            test: 'test remounting a component',
            success: false,
            message: ''
        };

        mount('testremountcomponent1', new TestRemountComponent1());
        detectChanges();
        mount('testremountcomponent1', new TestRemountComponent1());

        const ele = document.getElementById('testremountcomponent1');

        result.success = ele.textContent === 'To be remounted.';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testSetAndGetState() {
        const result = {
            test: 'test set and get state functions',
            success: false,
            message: ''
        };

        const someObj = {
            a: 1,
            b: 'abc',
            c: false,
            d: () => console.log('hello'),
            e: 3.14
        };

        const originalState = getState();

        setState(someObj);
        const newState = getState();

        const correctA = newState.a && newState.a === 1;
        const correctB = newState.b && newState.b === 'abc';
        const correctC = newState.c !== null && newState.c !== undefined && newState.c === false;
        const correctD = newState.d && newState.d.toString().replace(/\s+/g, '').replace(/["';]/g, '') === '()=>console.log(hello)'.replace(/\s+/g, '');
        const correctE = newState.e && newState.e === 3.14;

        result.success = correctA && correctB && correctC && correctD && correctE;

        setState(originalState);

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testXhrMultipleRequests() {
        const result = {
            test: 'test XHR multiple requests',
            success: false,
            message: ''
        };

        let onloadCount = 0;
        let responseNotEmptyCount = 0;
        let addedResult = false;

        const xhr1 = new XMLHttpRequest();
        xhr1.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

        xhr1.onload = function () {
            console.log('testXhrMultipleRequests XHR load completed');

            onloadCount++;
            if (this.response !== undefined && this.response !== null && this.response !== '') responseNotEmptyCount++;

            result.success = onloadCount === 2 && responseNotEmptyCount === 2;

            if (onloadCount === 2) {
                addedResult = true;
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        };

        const xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

        xhr2.onload = function () {
            console.log('testXhrMultipleRequests XHR load completed');

            onloadCount++;
            if (this.response !== undefined && this.response !== null && this.response !== '') responseNotEmptyCount++;

            result.success = onloadCount === 2 && responseNotEmptyCount === 2;

            if (onloadCount === 2) {
                addedResult = true;
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        };

        console.log('testXhrMultipleRequests before send');
        xhr1.send(null);
        console.log('testXhrMultipleRequests after send');

        console.log('testXhrMultipleRequests before send');
        xhr2.send(null);
        console.log('testXhrMultipleRequests after send');

        setTimeout(() => {
            if (!addedResult) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        }, 6000);
    }

    testXhrMultipleRequestsAutomated() {
        const result = {
            test: 'test XHR multiple requests in automated manner',
            success: false,
            message: ''
        };

        let onloadCount = 0;
        let addedResult = false;
        const NUMBER_OF_REQUESTS = 8;

        for (let i = 0; i < NUMBER_OF_REQUESTS; ++i) {
            const xhr1 = new XMLHttpRequest();
            xhr1.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

            xhr1.onload = function () {
                console.log('testXhrMultipleRequestsAutomated XHR load completed');

                onloadCount++;
                result.success = onloadCount === NUMBER_OF_REQUESTS;

                if (onloadCount === NUMBER_OF_REQUESTS) {
                    addedResult = true;
                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                }
            };

            console.log('testXhrMultipleRequestsAutomated before send');
            xhr1.send(null);
            console.log('testXhrMultipleRequestsAutomated after send');
        }

        setTimeout(() => {
            if (!addedResult) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        }, 12000);
    }

    testXhrMaximumCallStackExceeded() {
        const result = {
            test: 'test XHR maximum call stack exceeded',
            success: false,
            message: ''
        };

        let addedResult = false;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);

        xhr.onreadystatechange = function () {
            try {
                console.log('testXhrMaximumCallStackExceeded onready before send');
                xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
                xhr.send(null);
                console.log('testXhrMaximumCallStackExceeded onready after send');
            } catch (error) {
                addedResult = true;
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        }

        xhr.onload = function () {
            console.log('testXhrMaximumCallStackExceeded XHR load completed');

            result.success = true;

            setTimeout(() => {
                if (!addedResult) {
                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                }
            }, 5000);
        };

        console.log('testXhrMaximumCallStackExceeded before send');
        xhr.send(null);
        console.log('testXhrMaximumCallStackExceeded after send');
    }

    testMarkupFunction() {
        const result = {
            test: 'test markup function',
            success: false,
            message: ''
        };

        const markupObj = markup('div', { attrs: { style: 'width: 100%', id: 'someId', class: 'someclass', oninput: this.someFunctionToBind.bind(this) }, children: [] });

        const correctTag = markupObj.tagName === 'DIV';

        const hasAttrs = markupObj.attrs !== null && markupObj.attrs !== undefined;
        if (!hasAttrs) {
            markupObj.attrs = {};
        }

        const correctStyle = markupObj.attrs.style && markupObj.attrs.style === 'width: 100%';
        const correctId = markupObj.attrs.id && markupObj.attrs.id === 'someId';
        const correctClass = markupObj.attrs.class && markupObj.attrs.class === 'someclass';
        const onInputDefined = markupObj.attrs.oninput !== null && markupObj.attrs.oninput !== undefined;
        let onInputCorrect = false;

        if (onInputDefined) {
            const results = markupObj.attrs.oninput();
            onInputCorrect = results && results.test && results.test === 'test';
        }

        result.success = correctTag && hasAttrs && correctStyle && correctId && correctClass && onInputDefined && onInputCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testMarkupFunction() {
        const result = {
            test: 'test terse markup function',
            success: false,
            message: ''
        };

        const markupObj = m('div', { attrs: { style: 'width: 100%', id: 'someId', class: 'someclass', oninput: this.someFunctionToBind.bind(this) }, children: [] });

        const correctTag = markupObj.tagName === 'DIV';

        const hasAttrs = markupObj.attrs !== null && markupObj.attrs !== undefined;
        if (!hasAttrs) {
            markupObj.attrs = {};
        }

        const correctStyle = markupObj.attrs.style && markupObj.attrs.style === 'width: 100%';
        const correctId = markupObj.attrs.id && markupObj.attrs.id === 'someId';
        const correctClass = markupObj.attrs.class && markupObj.attrs.class === 'someclass';
        const onInputDefined = markupObj.attrs.oninput !== null && markupObj.attrs.oninput !== undefined;
        let onInputCorrect = false;

        if (onInputDefined) {
            const results = markupObj.attrs.oninput();
            onInputCorrect = results && results.test && results.test === 'test';
        }

        result.success = correctTag && hasAttrs && correctStyle && correctId && correctClass && onInputDefined && onInputCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testMarkupFunctionWithBoundFunction() {
        const result = {
            test: 'test markup function with bound function',
            success: false,
            message: ''
        };

        const markupObj = markup('div', { attrs: { style: 'width: 100%', id: 'someId', class: 'someclass', oninput: this.someFunctionToBindWithThis.bind(this) }, children: [] });

        const correctTag = markupObj.tagName === 'DIV';

        const hasAttrs = markupObj.attrs !== null && markupObj.attrs !== undefined;
        if (!hasAttrs) {
            markupObj.attrs = {};
        }

        const correctStyle = markupObj.attrs.style && markupObj.attrs.style === 'width: 100%';
        const correctId = markupObj.attrs.id && markupObj.attrs.id === 'someId';
        const correctClass = markupObj.attrs.class && markupObj.attrs.class === 'someclass';
        const onInputDefined = markupObj.attrs.oninput !== null && markupObj.attrs.oninput !== undefined;
        let onInputCorrect = false;

        if (onInputDefined) {
            const results = markupObj.attrs.oninput();
            onInputCorrect = results && results.test && results.test === this.someClassMember;
        }

        result.success = correctTag && hasAttrs && correctStyle && correctId && correctClass && onInputDefined && onInputCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testMarkupFunctionWithChildren() {
        const result = {
            test: 'test markup function with children',
            success: false,
            message: ''
        };

        const markupObj = markup('div', {
            attrs: { style: 'width: 100%', id: 'someId', class: 'someclass', oninput: this.someFunctionToBind.bind(this) }, children: [
                markup('span', { attrs: { style: 'height: 20px;' }, children: [] })
            ]
        });

        const correctTag = markupObj.tagName === 'DIV';

        const hasAttrs = markupObj.attrs !== null && markupObj.attrs !== undefined;
        if (!hasAttrs) {
            markupObj.attrs = {};
        }

        const correctStyle = markupObj.attrs.style && markupObj.attrs.style === 'width: 100%';
        const correctId = markupObj.attrs.id && markupObj.attrs.id === 'someId';
        const correctClass = markupObj.attrs.class && markupObj.attrs.class === 'someclass';
        const onInputDefined = markupObj.attrs.oninput !== null && markupObj.attrs.oninput !== undefined;
        let onInputCorrect = false;

        if (onInputDefined) {
            const results = markupObj.attrs.oninput();
            onInputCorrect = results && results.test && results.test === 'test';
        }

        const childCountCorrect = markupObj.children && markupObj.children.length === 1;
        const childTagCorrect = markupObj.children && markupObj.children[0].tagName === 'SPAN';
        const childStyleCorrect = markupObj.children && markupObj.children[0].attrs.style && markupObj.children[0].attrs.style === 'height: 20px;';
        const childChildrenCountCorrect = markupObj.children && markupObj.children[0].children.length === 0;

        result.success = correctTag && hasAttrs && correctStyle && correctId && correctClass && onInputDefined && onInputCorrect
            && childCountCorrect && childTagCorrect && childStyleCorrect && childChildrenCountCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100InnerTextAppendsDomString() {
        const result = {
            test: 'test inner text function works correctly',
            success: false,
            message: ''
        };

        const comp = new TestComponent1();
        mount('testcomponent1', comp);

        detectChanges();

        const ele = document.getElementById('testcomponent1');

        result.success = ele.innerText === 'Hello, (nested <span>) world!';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testMountWithChangeDetectorDetached() {
        const result = {
            test: 'test mount with change detector detached',
            success: false,
            message: ''
        };

        if (s) {
            const originalMapLength = s._updateMap ? s._updateMap.length : 0;

            const comp = new TestComponent1();
            mount('testcomponent1', comp, false);

            detectChanges();

            result.success = s._updateMap && s._updateMap.length === originalMapLength;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFormControl() {
        const result = {
            test: 'test general form control functions',
            success: false,
            message: ''
        };

        const formControl = FormControl(200);
        const validatorFn1 = (val) => {
            if (!isNaN(val) && isFinite(val)) {
                return null;
            } else {
                return { nonNumeric: true };
            }
        }
        const validatorFn2 = (val) => {
            if (val < 100) {
                return { lessThan100: true };
            } else {
                return null;
            }
        }

        const stateObj = getState();
        stateObj.controlCount = 0;
        setState(stateObj);

        formControl.setValidators([validatorFn1, validatorFn2]);
        formControl.getValueChanges().subscribe((val) => {
            const stateObj = getState();
            stateObj.controlCount++;
            setState(stateObj);
        });

        const valid1 = formControl.getValid() === true;
        const pristine1 = formControl.getPristine() === true;
        const errorLength1 = formControl.getErrors().length === 0;

        formControl.setValue(2);

        const valid2 = formControl.getValid() === false;
        const pristine2 = formControl.getPristine() === false;
        const errorLength2 = formControl.getErrors().length === 1;
        const hasLessThanError = formControl.getError('lessThan100') !== null;

        formControl.setValue('abc');

        const valid3 = formControl.getValid() === false;
        const pristine3 = formControl.getPristine() === false;
        const errorLength3 = formControl.getErrors().length === 1;
        const hasNonNumericError = formControl.getError('nonNumeric') !== null;

        formControl.setValue(500);

        const valid4 = formControl.getValid() === true;
        const pristine4 = formControl.getPristine() === false;
        const errorLength4 = formControl.getErrors().length === 0;

        const finalControlCountCorrect = getState().controlCount === 3;

        result.success = valid1 && pristine1 && errorLength1 && valid2 && pristine2 && errorLength2 && hasLessThanError
            && valid3 && pristine3 && errorLength3 && hasNonNumericError && valid4 && pristine4 && errorLength4 && finalControlCountCorrect

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    manualTestCheckSpanStyling() {
        const result = {
            test: 'check styling for span has not leaked from component scoped CSS',
            success: false,
            message: ''
        };

        const comp = new TestSpanStylingLeakComponent1();
        mount('divspanstylingleak1', comp);

        const ele = document.getElementById('divspanstylingleak1');
        const span = ele.childNodes[0];

        const cssObj = window.getComputedStyle(span, null);
        const color = cssObj.getPropertyValue('color');
        const bgColor = cssObj.getPropertyValue('background-color');

        result.success = color === 'rgb(33, 37, 41)' && bgColor === 'rgba(0, 0, 0, 0)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    manualTestCheckNavbarImageDimensions() {
        const result = {
            test: 'check styling for navbar image has not leaked from component scoped CSS',
            success: false,
            message: ''
        };

        let ele = document.querySelector('.navbar.navbar-light');
        ele = ele.childNodes[0];
        ele = ele.childNodes[0];

        const cssObj = window.getComputedStyle(ele, null);
        const width = cssObj.getPropertyValue('width');
        const height = cssObj.getPropertyValue('height');

        result.success = width === '30px' && height === '30px';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    manualTestCheckTodoHeaderStyling() {
        const result = {
            test: 'check styling for Todo header has not leaked from component scoped CSS',
            success: false,
            message: ''
        };

        let ele = document.querySelector('#divTodoHeader');
        ele = ele.childNodes[0];

        const cssObj = window.getComputedStyle(ele, null);
        const color = cssObj.getPropertyValue('color');

        result.success = color === 'rgb(33, 37, 41)';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    dummyTest() {
        const result = {
            test: 'test ',
            success: false,
            message: ''
        };

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    someFunctionToBind() {
        const result = {
            test: 'test',
            success: false,
            message: ''
        };

        return result;
    }

    someFunctionToBindWithThis() {
        const result = {
            test: this.someClassMember,
            success: false,
            message: ''
        };

        return result;
    }

    init() {
        window.globalTestResults = [];
        window.globalTestCount = 0;
        window.globalAsyncCount = 0;

        const runTestsButton = document.createElement('button');
        runTestsButton.innerText = 'Run Tests';
        runTestsButton.id = 'runtestsbutton';
        document.body.appendChild(runTestsButton);
        runTestsButton.onclick = this.run.bind(this);
    }

    createResultList(timeDiff) {
        const unorderedList = document.createElement('ul');

        window.globalTestResults.sort((first, second) => first.success === false ? -1 : 1);

        window.globalTestResults.forEach(testResult => {
            const listItem = document.createElement('li');
            let itemHtml = '';

            if (testResult.success === false) itemHtml += '<span><strong>' + String(testResult.success) + '</strong></span><span> - ' + testResult.test + '</span>';
            else itemHtml += '<span>' + String(testResult.success) + '</span><span> - ' + testResult.test + '</span>';

            if (testResult.message !== null && testResult.message !== undefined && testResult.message.length > 0) {
                itemHtml += '<br><span>' + testResult.message + '</span>';
            }

            listItem.innerHTML = itemHtml;
            unorderedList.appendChild(listItem);
        });

        const summaryEle = document.createElement('p');
        summaryEle.innerHTML = '<span>Elapsed time: ' + timeDiff + 'ms</span><br>';

        const testsPassing = window.globalTestResults.filter(testResult => testResult.success === true).length;
        summaryEle.innerHTML += '<span><strong>Tests passing: ' + testsPassing + '/' + window.globalTestResults.length + '</strong></span><br>';
        summaryEle.innerHTML += '<span><strong>Tests failing: ' + (window.globalTestResults.length - testsPassing) + '/' + window.globalTestResults.length + '</strong></span>';

        if (testsPassing === window.globalTestResults.length) {
            summaryEle.innerHTML += '<br><span style="color: green;">All tests passed.</span>';
        } else {
            summaryEle.innerHTML += '<br><span style="color: red;">There are failing tests.</span>';
        }

        document.body.appendChild(summaryEle);
        document.body.appendChild(unorderedList);
    }

    showError() {
        const errorDiv = document.createElement('div');
        errorDiv.innerText = 'Failed to run tests.';

        document.body.appendChild(errorDiv);
    }

    showProcessing() {
        const procDiv = document.createElement('div');
        procDiv.innerText = 'Processing...';
        procDiv.id = 'runningtestsdiv';

        document.body.appendChild(procDiv);
    }

    removeProcessing() {
        document.getElementById('runningtestsdiv').outerHTML = '';
    }

    getAllFuncs(toCheck) {
        const props = [];
        let obj = toCheck;
        do {
            props.push(...Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));

        return props.sort().filter((e, i, arr) => {
            if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
        });
    }

    removeRunTestsButton() {
        document.getElementById('runtestsbutton').outerHTML = '';
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    run() {
        this.showProcessing();

        const testFuncList = this.getAllFuncs(this).filter(key => key && key.startsWith('test')).filter(key => key && key !== 'dummyTest')
            .sort((firstName, secondName) => {
                if (firstName && firstName.toLowerCase().includes('runlast')) {
                    return 1;
                } else if (secondName && secondName.toLowerCase().includes('runlast')) {
                    return -1;
                } else if (firstName && firstName.toLowerCase().includes('finalize')) {
                    if (secondName && secondName.toLowerCase().includes('finalize')) {
                        const p1 = firstName.substring(firstName.indexOf('finalize') + 8, firstName.indexOf('finalize') + 11);
                        const p2 = secondName.substring(secondName.indexOf('finalize') + 8, secondName.indexOf('finalize') + 11);

                        return p1 > p2;
                    } else {
                        return 1;
                    }
                } else if (secondName && secondName.toLowerCase().includes('finalize')) {
                    return -1;
                } else if (firstName && firstName.toLowerCase().includes('priority')) {
                    if (secondName && secondName.toLowerCase().includes('priority')) {
                        const p1 = firstName.substring(firstName.indexOf('priority') + 8, firstName.indexOf('priority') + 11);
                        const p2 = secondName.substring(secondName.indexOf('priority') + 8, secondName.indexOf('priority') + 11);

                        return p1 > p2;
                    } else {
                        return -1;
                    }
                } else {
                    return 1;
                }
            });

        let runLastCount = 0;
        testFuncList.forEach(testFuncName => {
            if (testFuncName.toLowerCase().includes('runlast')) {
                runLastCount++;
            }
        });

        const state = getState();
        state.testCount = testFuncList.length - runLastCount;
        setState(state);

        testFuncList.forEach(async testFuncName => {
            this[testFuncName]();
            await this.sleep(50);
        });

        let testCount = this.getAllFuncs(this).filter(key => key && key.startsWith('test')).filter(key => key && key !== 'dummyTest').length;

        let checkCount = 0;
        let startTime = new Date();

        const checkInterval = setInterval(async () => {
            if (window.globalTestCount === testCount) {
                this.manualTestCheckSpanStyling();
                testCount++;

                this.manualTestCheckNavbarImageDimensions();
                testCount++;

                this.manualTestCheckNavbarImageDimensions();
                testCount++;

                this.manualTestDetectOnThen();
                clearInterval(checkInterval);
                await this.sleep(1750);
                testCount++;

                this.removeProcessing();
                this.createResultList(new Date() - startTime);
                this.removeRunTestsButton();
            }

            checkCount++;

            if (checkCount === 500) {
                this.removeProcessing();
                this.showError();
                clearInterval(checkInterval);
                this.removeRunTestsButton();
            }
        }, 100);
    }
}

export default GlobalTestRunner;
