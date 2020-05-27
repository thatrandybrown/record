(document.onLoad = () => {
    let change = 0;

    let records = JSON.parse(window.localStorage.getItem('records')) || {};
    let cid = Object.keys(records).length;

    const positiveInstance = num => num < 0 ? 0 : num;
    const firstLine = str => str.substr(0, Math.max(positiveInstance(str.indexOf("\n")), positiveInstance(str.indexOf(".") + 1)) || 40);

    const loadEntries = () => {
        const entries = Object.keys(records).reduce((acc, item) => [...acc, {...records[item][records[item].length - 1], stub: firstLine(records[item][records[item].length - 1].content)}], []).map(({cid, stub}) => ({cid, stub}));
        const stubs = entries.reduce((acc, item) => {
            const a = document.createElement('a');
            a.addEventListener("click", event => {
                // document.querySelector('textarea').value = "";
            });

            const li = document.createElement('li');
            li.appendChild(document.createTextNode(item.stub));
            acc.appendChild(li);
            return acc;
        }, document.createElement('ul'));
        document.querySelector('nav > ul') ? document.querySelector('nav').replaceChild(stubs, document.querySelector('nav > ul')) : document.querySelector('nav').append(stubs);
    }

    const saveData = async () => {
        records = {
            ...records,
            [cid]: [ ...(records[cid] ? records[cid] : []), {
                content: document.querySelector('textarea').value,
                cid,
                createTime: Date.now()
            }]
        };
        loadEntries();
        window.localStorage.setItem('records', JSON.stringify(records));
    }

    document.querySelector('textarea').addEventListener("input", async event => {
        if((++change % 5 === 0)) {
            await saveData();
        }
    });

    document.addEventListener("keydown", async event => {
        if ((event.ctrlKey || event.metaKey) && 's' === String.fromCharCode(event.which).toLowerCase()) {
            event.preventDefault();
            await saveData();
        }
    });

    loadEntries();
    document.querySelector('textarea').focus();
})();

/**
if(false && !document.querySelector("input[name=post_url]").value) {
    records = {
        ...records,
        [metadata.id ? metadata.id : cid]: {
            ...records[metadata.id ? metadata.id : cid],
            ...metadata,
            ...JSON.parse(document.querySelector("input[name=metadata]").value),
            content: document.querySelector('textarea').value,
            cid
        }
    };
    cid++;
    window.localStorage.setItem('records', JSON.stringify(records));
}

// metadata = await fetch(document.querySelector("input[name=post_url]").value,
//             {
//                 body: JSON.stringify({
//                     ...metadata,
//                     ...JSON.parse(document.querySelector("input[name=metadata]").value),
//                     content: document.querySelector('textarea').value
//                 }),
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${document.querySelector("input[name=post_key]").value}`
//                 }
//             }
//         ).then(rsp => rsp.json())
//          .then(rsp => ({...metadata, ...rsp}))
document.querySelector("input[name=metadata]").value = JSON.stringify({cid, ...metadata});



    // so we can store metadata on the shape of records
    // this should _always_ be a flat object

    // this whole thing probably needs to be wrapped in an if statement
    // to write the metadata back to localStorage
    let appMetadata = JSON.parse(window.localStorage.getItem("records_metadata")) || {
        version: "0.1.0",
        records: "array",
        record: ["content","cid"]
    };

    // if this has a metadata.id, that is either provided by the user
    // or sent from the service and should be preferred for consistency
*/