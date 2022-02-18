var modWASM = (function () {
    var _module = {};


    // WARNING Check if load if finished before using js functions check 5 times 1 second    
    _module.load = async function (w, m) {
        return new Promise(async function (resolve, reject) {
            console.log("WASM Load " + w)

            const g = new Go();
            const d = await fetch(w); // data
            const result = await WebAssembly.instantiateStreaming(d, g.importObject);
            g.run(result.instance);
            var i = 0;

            function c() {
                i++;
                if (window[m]) {
                    resolve("ok");
                } else {
                    window.setTimeout(() => {
                        console.log("Wait for load " + i);
                        if (i < 6) {
                            c();
                        } else {
                            console.log("Problem load function " + m +  " in wasm " + w)
                            reject["not ok"];
                        };
                    }, 2000);
                }
            }

            c();
        });
    }  

    _module.hello123 = function () {
        alert('test');
    }

    return _module; // returns the Object with public methods
})();