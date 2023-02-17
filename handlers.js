//function to get completely out of stock items
export function getOutOfStockItems(inventory) {
    let responseString = ''
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        let colors = item.colors;
        for (let j = 0; j < colors.length; j++) {
            let sizes = Object.values(colors[j].sizes);
            if (sizes.reduce((x, y) => x + y) == 0) {
                responseString += `the ${colors[j].color_name} ${item.name} is out of stock`
            }
        }
    }
    return(responseString);
};

export function contactSignUpPostHandler(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    console.log(`${name}'s email is ${email}`);
    res.send("thanks for signing up!")
};
export function contactSignUpGetHandler(req, res, pathToFile) {
    res.sendFile(pathToFile);
}
    