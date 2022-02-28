
export function sketch(p: any) {
    p.setup = function () {
        p.createCanvas(400, 400);
    }

    let x = 0;
    let y = 0;

    p.draw = function () {
        p.background(0);

        const arr = (window as any).current;

        if (x !== arr[0] || y !== arr[1]) {

            x = arr[0];
            y = arr[1];
        }

        p.circle(100, x * 3, y * 3);

    }
}