(document.onLoad = () => {
    let change = 0;

    let records = JSON.parse(window.localStorage.getItem('records')) || {};
    let cid = Object.keys(records).length;

    const positiveInstance = num => num < 0 ? 0 : num;
    const firstLine = str => str.substr(0, Math.max(positiveInstance(str.indexOf("\n")), positiveInstance(str.indexOf(".") + 1)) || 40);

    // const entries = Object.keys(records).reduce((acc, item) => [...acc, {...records[item][records[item].length - 1], stub: firstLine(records[item][records[item].length - 1].content)}], []).map(({cid, stub}) => ({cid, stub}));

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
        // document.querySelector('nav').append(stubs);
        console.log(document.querySelector('nav > ul'));
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
