

function select(element, path) {
    const snapshot = document.evaluate(
        path,
        element,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    const result = [];

    for (let i = 0; i < snapshot.snapshotLength; i++) {
        result.push(snapshot.snapshotItem(i));
    }

    return result;
}

function renderTemplate(templateElement, parent, data) {
    // make a clone of a template node
    const clone = templateElement.content.cloneNode(true);
    const fields = clone.querySelectorAll('x');

    parent.appendChild(clone);

    // replace fields in clone with text in the data object
    for (const node of fields) {
        const key = node.getAttribute('name');
        const value = data[key] ?? undefined;

        if (value !== undefined ) {
            node.replaceWith(value);
        }
        else {
            const path = node.getAttribute('path');
            if (path) {
                const victims = select(node, path);
                for (const v of victims) {
                    v.remove();
                }
            }
            else {
                node.remove();
            }
        }
    }
}