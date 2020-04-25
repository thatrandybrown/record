
(document.onLoad = () => {
    let change = 0;
    let metadata = {};
    document.querySelector('textarea').addEventListener("input", event => {
        if((++change % 5 === 0)) {
            metadata = await fetch(document.querySelector("input[name=post_url]").value,
                    {
                        body: JSON.stringify({...metadata, content: document.querySelector('textarea').value}),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${document.querySelector("input[name=post_key]").value}`
                        }
                    }
                ).then(rsp => rsp.json())
                 .then(rsp => ({...metadata, ...rsp}))
                // .catch(err => console.log("something went wrong", err));
        }
    });
})();
