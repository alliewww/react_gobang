const getText = (str: string) => {
    if (str === "W") {
        return "白子"
    } else if (str === "B") {
        return "黑子"
    } else {
        return ""
    }
}

export const check = (info: Array<Array<string>>, xy: Array<number>) => {

    if (isNaN(xy[0])) return false;
    const check = info[xy[0]][xy[1]];

    //橫的
    let count1: number = 0;
    for (let value of info[xy[0]]) {
        if (value === check) {
            count1++;
            if (count1 === 5) {
                return getText(check) + "(1)"
            };
        } else {
            count1 = 0;
            continue;
        }
    }

    //直的
    let count2: number = 0;
    for (let value of info) {

        if (value[xy[1]] === check) {
            count2++;
            if (count2 === 5) {
                return getText(check) + "(2)"
            };
        } else {
            count2 = 0;
            continue;
        }
    }

    //斜的(往右斜19向)
    let ary19: string[] = [];
    let newX19: number = xy[0]
    let newY19: number = xy[1]
    while (info[newX19] && info[newX19][newY19]) {
        ary19.push(info[newX19][newY19])
        newX19++;
        newY19--;
    }
    newX19 = xy[0] - 1;
    newY19 = xy[1] + 1;
    while (info[newX19] && info[newX19][newY19]) {
        ary19.unshift(info[newX19][newY19])
        newX19--;
        newY19++;
    }

    let count3: number = 0;
    for (let value of ary19) {
        if (value === check) {
            count3++;
            if (count3 === 5) {
                return getText(check) + "(3)"
            }
        } else {
            count3 = 0;
            continue;
        }
    }

    //斜的(往右斜37向)
    let ary37: string[] = [];
    let newX37: number = xy[0]
    let newY37: number = xy[1]
    while (info[newX37] && info[newX37][newY37]) {
        ary37.push(info[newX37][newY37])
        newX37++;
        newY37++;
    }
    newX37 = xy[0] - 1;
    newY37 = xy[1] - 1;
    while (info[newX37] && info[newX37][newY37]) {
        ary37.unshift(info[newX37][newY37])
        newX37--;
        newY37--;
    }

    let count4: number = 0;
    for (let value of ary37) {
        if (value === check) {
            count4++;
            if (count4 === 5) {
                return getText(check) + ("4")
            }
        } else {
            count4 = 0;
            continue;
        }
    }


    return false;
}