function compileTemplate(templateNode) {
    // build a map of the name of template fields to functions that will fill them
    const templateFieldNodes = templateNode.content.querySelectorAll('[data-field]');
    const mapping = {};
    for (const node of templateFieldNodes) {
        const key = node.dataset.field;
        if (key === 'id') {
            throw new Error("cannot use 'id' as a template field name")
        }
        const value = (value) => {
            const nodes = templateFieldNodes;
            const nodePtr = node;
            nodePtr.innerText = value;
        };
        mapping[key] = value;
        node.removeAttribute('data-field'); // remove the data-field attribute so markup is cleaner
    }

    // create the function for rendering the template
    const render = (data) => {
        for (const k in mapping) {
            mapping[k](data[k]);
        }
        const orig = templateNode.content;
        const clone = orig.cloneNode(true);
        return clone;
    };

    return render;
}

function gatherAndCompileTemplates(parentNode) {
    // returns an object mapping the ids of template nodes to functions for rendering them
    const templateNodes = parentNode.getElementsByTagName('template');
    const map = {};

    for (const n of templateNodes) {
        map[n.id] = compileTemplate(n);
    }

    return map;
}