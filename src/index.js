
(document.onLoad = () => {
    let change = 0;
    let metadata = {};

    let records = JSON.parse(window.localStorage.getItem('records')) || {};
    let cid = Object.keys(records).length;

    const saveData = async () => {
        records = {
            ...records,
            [cid]: {content: document.querySelector('textarea').value, cid}
        };
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

    document.querySelector('textarea').focus();
})();
