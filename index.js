"use strict";

module.exports = function (tasks) {

    //Save new --variables
    tasks.addTask({
        filter: 'CustomProperty',
        position: 'before',
        fn: function (property) {
            let rule = property.getAncestor('Rule');
            let name = '@var-' + property.name;

            if (
                rule
                .getChild('Selectors')
                .hasChild({
                    type: 'Selector',
                    string: [':root', 'html']
                })
            ) {
                rule.getAncestor('Root').setData(name, property.detach());
            } else {
                rule.setData(name, property.detach());
            }
        }
    });

    //Use var() function
    tasks.addTask({
        filter: {
            type: 'Function',
            name: 'var'
        },
        forBrowsersLowerThan: {
            firefox: 31,
            chrome: 49,
            safari: 9.1,
            ios: 9.3,
            explorer: false,
            android: 56,
            edge: 15,
            opera: 36
        },
        fn: function (fn) {
            var name = fn.get('ExtensionName');

            if (name) {
                let value = fn.getData('@var-' + name.name);

                if (value) {
                    replace(fn, value.clone(true));
                } else if (fn[1]) {
                    replace(fn, fn[1].clone(true));
                }
            }
        }
    });

    //Use @apply
    tasks.addTask({
        filter: {
            type: 'AtRule',
            name: 'apply'
        },
        fn: function (apply) {
            var name = apply.get('ExtensionName');

            if (name) {
                let value = apply.getData('@var-' + name.name);

                if (value) {
                    let block = value.getChild('Block');

                    if (!block) {
                        return tasks.log('Invalid custom property: ' + apply.toString(), apply);
                    }

                    block.forEach(node => apply.before(node.clone(true)));

                    apply.detach();
                }
            }
        }
    });



    function replace (fn, values) {
        var parent = fn.getParent();

        if (values.type === 'CustomProperty' && parent && parent.type === 'Value' && parent.length === 1) {
            while (values.length) {
                parent.after(values.pop());
            }

            parent.detach();
        } else {
            while (values.length) {
                fn.after(values.pop());
            }

            fn.detach();
        }
    }
};
