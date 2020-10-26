const defaults = {
    MAX_WIDTH: 50
}

export const fileReader = (file) => {
    return new Promise((res, rej) => {
        const reader  = new FileReader();
        let canvas = null;
        let srcEncoded = null;
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            try {
            const imageEle = document.createElement('img');
            imageEle.src = event.target.result;
            imageEle.onload = function(e) {
                canvas = document.createElement('canvas');
                canvas.width = defaults.MAX_WIDTH;
                const scale = defaults.MAX_WIDTH / e.target.width;
                canvas.height = e.target.height * scale;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
                const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg", 0.1);
                res({
                    canvas,
                    srcEncoded
                });
            }
            }  catch(error) {
                rej({
                    message: 'There was some error.'
                })
            }
        }
    })
}