
(document.onLoad = () => {
    let change = 0;
    let metadata = {};

    const saveData = async () => {
        if(false && !document.querySelector("input[name=post_url]").value) {
            window.localStorage.setItem('records', JSON.stringify([
                ...JSON.parse(window.localStorage.getItem('records')),
                {
                    ...metadata,
                    ...JSON.parse(document.querySelector("input[name=metadata]").value),
                    content: document.querySelector('textarea').value
                }
            ]));
        }

        metadata = await fetch(document.querySelector("input[name=post_url]").value,
                    {
                        body: JSON.stringify({
                            ...metadata,
                            ...JSON.parse(document.querySelector("input[name=metadata").value),
                            content: document.querySelector('textarea').value
                        }),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${document.querySelector("input[name=post_key]").value}`
                        }
                    }
                ).then(rsp => rsp.json())
                 .then(rsp => ({...metadata, ...rsp}))
        document.querySelector("input[name=metadata]").value = JSON.stringify(metadata);
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
})();
