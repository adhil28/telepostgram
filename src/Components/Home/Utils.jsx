export function getImage(files) {
    return new Promise((r) => {
        var oFReader = new FileReader();
        oFReader.readAsArrayBuffer(files[0]);
        oFReader.onload = function (oFREvent) {
            console.log(oFREvent.target.result);
            r(oFREvent.target.result)
        };
    })
};